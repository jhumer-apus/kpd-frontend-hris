import {useEffect, Dispatch, SetStateAction, ChangeEvent, Fragment}from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Transition } from 'react-transition-group';
import { LEAVECREDITViewInterface } from '@/types/types-pages';
import { Button, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { APILink, RootState } from '@/store/configureStore';
import dayjs from 'dayjs';
import { LEAVECREDITEditAction, LEAVECREDITViewAction } from '@/store/actions/procedurals';
import { beautifyJSON, clearFields } from '@/helpers/utils';
import axios from 'axios';



interface AllowedDaysLEAVECREDITModalInterface {
    singleLEAVECREDITDetailsData: LEAVECREDITViewInterface;
    allowedDaysLEAVECREDITOpenModal: boolean; 
    setAllowedDaysLEAVECREDITOpenModal: Dispatch<SetStateAction<boolean>>;
    setSingleLEAVECREDITDetailsData: Dispatch<SetStateAction<LEAVECREDITViewInterface>>;
}

export default function AllowedDaysLEAVECREDITModal(props: AllowedDaysLEAVECREDITModalInterface) {
  const dispatch = useDispatch();
  const LEAVECREDITAllowedDaysState = useSelector((state: RootState)=> state.procedurals.LEAVECREDITEdit)
  const {allowedDaysLEAVECREDITOpenModal, setAllowedDaysLEAVECREDITOpenModal, singleLEAVECREDITDetailsData, setSingleLEAVECREDITDetailsData} = props;

  const allowedDaysLEAVECREDIT = () => { 
    // updateLeaveCredits()
    if(singleLEAVECREDITDetailsData.allowed_days){
        return(
          setSingleLEAVECREDITDetailsData((prevState)=> {
            const value = prevState.allowed_days as number;
            dispatch(LEAVECREDITEditAction({
              ...prevState,
              allowed_days: value
            }))  
            return({
              ...prevState,
              allowed_days: value
            })
          })
        )
      } else {
        window.alert('Please insert allowed days');
      }
  }

  useEffect(()=>{
    if(LEAVECREDITAllowedDaysState.status) {      

      if(LEAVECREDITAllowedDaysState.status == 'succeeded') {

        window.alert(`${LEAVECREDITAllowedDaysState.status.charAt(0).toUpperCase()}${LEAVECREDITAllowedDaysState.status.slice(1)}`)
        dispatch(LEAVECREDITViewAction())
        setAllowedDaysLEAVECREDITOpenModal(false)
        // setTimeout(()=>{
        //   window.location.reload();
        // }, 800)

      }  else if (LEAVECREDITAllowedDaysState.status == 'failed') {


        window.alert(LEAVECREDITAllowedDaysState?.error)
        setAllowedDaysLEAVECREDITOpenModal(false)
      }
    }
  }, [LEAVECREDITAllowedDaysState])

  // const updateLeaveCredits = async  () => {
  //   const payload = {
  //     ...singleLEAVECREDITDetailsData
  //   }
  //   console.log(payload)
  //   await axios.put(`${APILink}leave_credit/${singleLEAVECREDITDetailsData.emp_no}/${singleLEAVECREDITDetailsData.id}/`, payload).then(res => {
      
  //     window.alert("Request Succesful")
  //     window.location.reload()

  //   }).catch((err:any) => {

  //     window.alert(beautifyJSON(err.response.data))
  //   })
  // }
  return (
    <Fragment>
      <Transition in={allowedDaysLEAVECREDITOpenModal} timeout={400}>
      {(state: string) => (
      <Modal
        open={!['exited', 'exiting'].includes(state)}
        onClose={() => {
          setAllowedDaysLEAVECREDITOpenModal(false);
        }}
        slotProps={{
            backdrop: {
              sx: {
                opacity: 0,
                backdropFilter: 'none',
                transition: `opacity 400ms, backdrop-filter 400ms`,
                ...{
                  entering: { opacity: 1, backdropFilter: 'blur(8px)' },
                  entered: { opacity: 1, backdropFilter: 'blur(8px)' },
                }[state],
              },
            },
          }}
          sx={{
            visibility: state === 'exited' ? 'hidden' : 'visible',
          }}
      >
        <ModalDialog 
            aria-labelledby="dialog-vertical-scroll-title" 
            layout={'center'}
            sx={{
              ...allowedDaysLEAVECREDITArea,
                opacity: 0,
                transition: `opacity 300ms`,
                ...{
                  entering: { opacity: 1 },
                  entered: { opacity: 1 },
                }[state],
                overflow: 'auto',
            }}
            size='sm'
        > 
          <Typography variant='h6' className='border-b-2 border-blue-700'>Allowing Leave Usage</Typography>
          <div className='flex justify-center flex-col item-center h-full'>
            <div className='flex flex-col justify-around w-full h-2/4 gap-14'>
              <div className='flex justify-center item-center'>
                <Typography>Please Insert Number of Allowed Usage</Typography>
              </div>
              <div className='flex justify-center item-center'>
                <TextField
                sx={{width: '90%'}}
                  label='New Total Allowed Days'
                  type='number'
                  required
                  focused
                  value={singleLEAVECREDITDetailsData.allowed_days}
                  onChange={(event: ChangeEvent<HTMLInputElement>)=> {
                    setSingleLEAVECREDITDetailsData((prevState)=> {
                      const value = parseInt(event.target.value);
                      return({
                        ...prevState,
                        allowed_days: value,
                      })
                    })
                  }}
                />
              </div>
              <div className='flex justify-around'>
                <Button variant={'contained'} onClick={allowedDaysLEAVECREDIT}>Submit</Button>
                <Button variant={'outlined'} onClick={()=>{
                  clearFields(setSingleLEAVECREDITDetailsData, ['allowed_days'], [null])
                  setAllowedDaysLEAVECREDITOpenModal(false)
                }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </ModalDialog>
      </Modal>
        )}
      </Transition>
    </Fragment>
  );
}


// Styles
const allowedDaysLEAVECREDITArea = {
  height: '124.5mm',
  width: '100mm',
  margin: '0 auto',
  background: 'white',
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
};