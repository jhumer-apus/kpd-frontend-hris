import * as React from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Transition } from 'react-transition-group';
import { UAViewInterface, ViewPayrollPayPerEmployee } from '@/types/types-pages';
import SinglePayslip from './ua-modal-component';
import { Button, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import dayjs from 'dayjs';
import { UAEditAction } from '@/store/actions/procedurals';



interface DenyUAModalInterface {
    singleUADetailsData: UAViewInterface;
    denyUAOpenModal: boolean; 
    setDenyUAOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    setSingleUADetailsData: React.Dispatch<React.SetStateAction<UAViewInterface>>;
}

export default function DenyUAModal(props: DenyUAModalInterface) {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState)=> state.auth.employee_detail);
  const UADenyData = useSelector((state: RootState)=> state.procedurals.UAEdit)
  const {denyUAOpenModal, setDenyUAOpenModal, singleUADetailsData, setSingleUADetailsData} = props;
  const DateNow = new Date();
  const denyDate = dayjs(DateNow).format('MMM-DD-YY LT');

  const denyUA = () => { 
    if(singleUADetailsData.ua_reason_disapproval){
        return(
          setSingleUADetailsData((prevState)=> {
            dispatch(UAEditAction({
              ...prevState,
              ua_reason_disapproval: `${prevState.ua_reason_disapproval}  <Updated: ${denyDate}>`
            }))  
            return({
              ...prevState,
              ua_reason_disapproval: `${prevState.ua_reason_disapproval} <Updated: ${denyDate}>`
            })
          })
        )
      } else {
        window.alert('Please insert reason');
      }
    }

    React.useEffect(()=>{
      if(UADenyData.status === 'succeeded'){
        window.alert(`${UADenyData.status.charAt(0).toUpperCase()}${UADenyData.status.slice(1)}`)
        setTimeout(()=>{
          window.location.reload();
        }, 800)
      } else if(UADenyData.status === 'failed'){
        window.alert(UADenyData.error)
      }
    }, [])
  return (
    <React.Fragment>
      <Transition in={denyUAOpenModal} timeout={400}>
      {(state: string) => (
      <Modal
        keepMounted
        open={!['exited', 'exiting'].includes(state)}
        onClose={() => {
          setDenyUAOpenModal(false);
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
              ...denyUAArea,
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
          <Typography variant='h6' className='border-b-2 border-red-700'>REJECTING UA</Typography>
          <div className='flex justify-center flex-col item-center h-full'>
            <div className='flex flex-col justify-around w-full h-2/4 gap-14'>
              <div className='flex justify-center item-center'>
                <Typography>Please Insert Reason for Disapproving UA</Typography>
              </div>
              <div className='flex justify-center item-center'>
                <TextField
                sx={{width: '90%'}}
                  label='Reason'
                  multiline
                  rows={4}
                  required
                  focused
                  value={singleUADetailsData.ua_reason_disapproval}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>)=> {
                    setSingleUADetailsData((prevState)=> {
                      return({
                        ...prevState,
                        ot_reason_disapproval: `${event.target.value}`
                      })
                    })
                  }}
                />
              </div>
              <div className='flex justify-around'>
                <Button variant={'contained'} onClick={denyUA}>Submit</Button>
                <Button variant={'outlined'} onClick={()=>{setDenyUAOpenModal(false)}}>Cancel</Button>
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
const denyUAArea = {
  height: '124.5mm',
  width: '100mm',
  margin: '0 auto',
  background: 'white',
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
};