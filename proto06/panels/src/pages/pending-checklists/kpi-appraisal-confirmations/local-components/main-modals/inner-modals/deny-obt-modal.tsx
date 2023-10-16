import * as React from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Transition } from 'react-transition-group';
import { OBTViewInterface, ViewPayrollPayPerEmployee } from '@/types/types-pages';
import SinglePayslip from './evaluation-modal-component';
import { Button, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import dayjs from 'dayjs';
import { OBTEditAction } from '@/store/actions/procedurals';



interface DenyOBTModalInterface {
    singleOBTDetailsData: OBTViewInterface;
    denyOBTOpenModal: boolean; 
    setDenyOBTOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    setSingleOBTDetailsData: React.Dispatch<React.SetStateAction<OBTViewInterface>>;
}

export default function DenyOBTModal(props: DenyOBTModalInterface) {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState)=> state.auth.employee_detail);
  const OBTDenyState = useSelector((state: RootState)=> state.procedurals.OBTEdit.status)
  const {denyOBTOpenModal, setDenyOBTOpenModal, singleOBTDetailsData, setSingleOBTDetailsData} = props;
  const DateNow = new Date();
  const denyDate = dayjs(DateNow).format('MMM-DD-YY LT');

  const denyOBT = () => { 
    if(singleOBTDetailsData.obt_reason_disapproval){
        return(
          setSingleOBTDetailsData((prevState)=> {
            dispatch(OBTEditAction({
              ...prevState,
              obt_reason_disapproval: `${prevState.obt_reason_disapproval}  <Updated: ${denyDate}>`
            }))  
            return({
              ...prevState,
              obt_reason_disapproval: `${prevState.obt_reason_disapproval} <Updated: ${denyDate}>`
            })
          })
        )
      } else {
        window.alert('Please insert reason');
      }
    }

  React.useEffect(()=>{
    if(OBTDenyState){      
      if(OBTDenyState === 'succeeded'){
        window.alert(`${OBTDenyState.charAt(0).toUpperCase()}${OBTDenyState.slice(1)}`)
        setTimeout(()=>{
          window.location.reload();
        }, 800)
      }
    }
  }, [OBTDenyState])
  return (
    <React.Fragment>
      <Transition in={denyOBTOpenModal} timeout={400}>
      {(state: string) => (
      <Modal
        keepMounted
        open={!['exited', 'exiting'].includes(state)}
        onClose={() => {
          setDenyOBTOpenModal(false);
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
              ...denyOBTArea,
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
          <Typography variant='h6' className='border-b-2 border-red-700'>REJECTING OBT</Typography>
          <div className='flex justify-center flex-col item-center h-full'>
            <div className='flex flex-col justify-around w-full h-2/4 gap-14'>
              <div className='flex justify-center item-center'>
                <Typography>Please Insert Reason for Disapproving OBT</Typography>
              </div>
              <div className='flex justify-center item-center'>
                <TextField
                sx={{width: '90%'}}
                  label='Reason'
                  multiline
                  rows={4}
                  required
                  focused
                  value={singleOBTDetailsData.obt_reason_disapproval}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>)=> {
                    setSingleOBTDetailsData((prevState)=> {
                      return({
                        ...prevState,
                        obt_reason_disapproval: `${event.target.value}`
                      })
                    })
                  }}
                />
              </div>
              <div className='flex justify-around'>
                <Button variant={'contained'} onClick={denyOBT}>Submit</Button>
                <Button variant={'outlined'} onClick={()=>{setDenyOBTOpenModal(false)}}>Cancel</Button>
              </div>
            </div>
          </div>
        </ModalDialog>
      </Modal>
        )}
      </Transition>
    </React.Fragment>
  );
}


// Styles
const denyOBTArea = {
  height: '124.5mm',
  width: '100mm',
  margin: '0 auto',
  background: 'white',
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
};