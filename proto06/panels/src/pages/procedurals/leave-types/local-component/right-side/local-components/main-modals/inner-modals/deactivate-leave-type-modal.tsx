import * as React from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Transition } from 'react-transition-group';
import { LEAVETYPEViewInterface, ViewPayrollPayPerEmployee } from '@/types/types-pages';
import { Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import dayjs from 'dayjs';
import { LEAVETYPEDeleteAction, LEAVETYPEDeleteActionFailureCleanup, LEAVETYPEEditAction } from '@/store/actions/procedurals';



interface DeactivateLEAVETYPEModalInterface {
    singleLEAVETYPEDetailsData: LEAVETYPEViewInterface;
    DeactivateLEAVETYPEOpenModal: boolean; 
    setDeactivateLEAVETYPEOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    setSingleLEAVETYPEDetailsData: React.Dispatch<React.SetStateAction<LEAVETYPEViewInterface>>;
}

export default function DeactivateLEAVETYPEModal(props: DeactivateLEAVETYPEModalInterface) {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState)=> state.auth.employee_detail);
  const LEAVETYPEDeactivateState = useSelector((state: RootState)=> state.procedurals.LEAVETYPEDelete)
  const {DeactivateLEAVETYPEOpenModal, setDeactivateLEAVETYPEOpenModal, singleLEAVETYPEDetailsData, setSingleLEAVETYPEDetailsData} = props;

  const DeactivateLEAVETYPE = () => {
    if(singleLEAVETYPEDetailsData.id){
      dispatch(LEAVETYPEDeleteAction({lt_id: singleLEAVETYPEDetailsData.id}))
    } else {
      window.alert('No Leave Type ID found, please contact your software support')
    } 
  }

  React.useEffect(()=>{
    if(LEAVETYPEDeactivateState.status === 'succeeded'){
      window.alert(`Success: ${LEAVETYPEDeactivateState.status?.charAt(0).toUpperCase()}${LEAVETYPEDeactivateState.status.slice(1)}`)
      setTimeout(()=>{
        window.location.reload();
      }, 800)
    } else if(LEAVETYPEDeactivateState.status === 'failed') {
      window.alert(`Error: ${LEAVETYPEDeactivateState.error}`)
      dispatch(LEAVETYPEDeleteActionFailureCleanup());
    }
  }, [LEAVETYPEDeactivateState])
  return (
    <React.Fragment>
      <Transition in={DeactivateLEAVETYPEOpenModal} timeout={400}>
      {(state: string) => (
      <Modal
        keepMounted
        open={!['exited', 'exiting'].includes(state)}
        onClose={() => {
          setDeactivateLEAVETYPEOpenModal(false);
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
              ...paySlipArea,
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
          <Typography variant='h6' className='border-b-2 border-red-700'>Confirmation</Typography>
          <div className='flex justify-center flex-col item-center h-full'>
            <div className='flex flex-col justify-between w-full h-2/4'>
              <div className='flex justify-center flex-col items-center gap-2 mb-4'>
                <Typography>Are you sure you want to deactivate this LEAVETYPE?</Typography>
                <Typography className='italic' variant='caption'>Users can no longer see this in the tables afterwards.</Typography>
                <Typography className='italic' variant='caption'>Assigned ID will be skipped and recorded on audit trail.</Typography>
              </div>
              <div className='flex justify-around'>
                <Button variant={'contained'} color="error" onClick={DeactivateLEAVETYPE}>Confirm</Button>
                <Button variant={'outlined'} color="warning" onClick={()=>{setDeactivateLEAVETYPEOpenModal(false)}}>Cancel</Button>
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
const paySlipArea = {
  height: '74.5mm',
  width: '130mm',
  margin: '0 auto',
  background: 'white',
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
};