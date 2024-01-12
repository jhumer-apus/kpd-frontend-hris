import * as React from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Transition } from 'react-transition-group';
import { CORECOMPEViewInterface } from '@/types/types-employee-and-applicants';
import { Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { CORECOMPEDeleteAction, CORECOMPEDeleteActionFailureCleanup } from '@/store/actions/employee-and-applicants';



interface DeactivateCORECOMPEModalInterface {
    singleCORECOMPEDetailsData: CORECOMPEViewInterface;
    DeactivateCORECOMPEOpenModal: boolean; 
    setDeactivateCORECOMPEOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    setSingleCORECOMPEDetailsData: React.Dispatch<React.SetStateAction<CORECOMPEViewInterface>>;
}

export default function DeactivateCORECOMPEModal(props: DeactivateCORECOMPEModalInterface) {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState)=> state.auth.employee_detail);
  const CORECOMPEDeactivateState = useSelector((state: RootState)=> state.employeeAndApplicants.CORECOMPEDelete)
  const {DeactivateCORECOMPEOpenModal, setDeactivateCORECOMPEOpenModal, singleCORECOMPEDetailsData, setSingleCORECOMPEDetailsData} = props;

  const DeactivateCORECOMPE = () => {
    if(singleCORECOMPEDetailsData.id){
      dispatch(CORECOMPEDeleteAction({cc_id: singleCORECOMPEDetailsData.id, curr_user: (state?.emp_no as number)}))
    } else {
      window.alert('No Core Competency ID found.')
    } 
  }

  React.useEffect(()=>{
    if(CORECOMPEDeactivateState.status === 'succeeded'){
      window.alert(`Success: ${CORECOMPEDeactivateState.status?.charAt(0).toUpperCase()}${CORECOMPEDeactivateState.status.slice(1)}`)
      setTimeout(()=>{
        window.location.reload();
      }, 800)
    } else if(CORECOMPEDeactivateState.status === 'failed') {
      window.alert(`Error: ${CORECOMPEDeactivateState.error}`)
      dispatch(CORECOMPEDeleteActionFailureCleanup());
    }
  }, [CORECOMPEDeactivateState])

  return (
    <React.Fragment>
      <Transition in={DeactivateCORECOMPEOpenModal} timeout={400}>
      {(state: string) => (
      <Modal
        keepMounted
        open={!['exited', 'exiting'].includes(state)}
        onClose={() => {
          setDeactivateCORECOMPEOpenModal(false);
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
              ...modalArea,
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
                <Typography>Are you sure you want to deactivate this Core Competency?</Typography>
                <Typography className='italic' variant='caption'>Users can no longer see this in the tables afterwards.</Typography>
                <Typography className='italic' variant='caption'>Assigned ID will be skipped and recorded on audit trail.</Typography>
              </div>
              <div className='flex justify-around'>
                <Button variant={'contained'} color="error" onClick={DeactivateCORECOMPE}>Confirm</Button>
                <Button variant={'outlined'} color="warning" onClick={()=>{setDeactivateCORECOMPEOpenModal(false)}}>Cancel</Button>
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
const modalArea = {
  height: '74.5mm',
  width: '130mm',
  margin: '0 auto',
  background: 'white',
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
};