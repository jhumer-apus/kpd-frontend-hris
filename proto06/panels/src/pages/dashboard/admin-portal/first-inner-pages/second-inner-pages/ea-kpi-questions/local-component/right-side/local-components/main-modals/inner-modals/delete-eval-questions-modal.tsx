import * as React from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Transition } from 'react-transition-group';
import { EVALQUESTIONSViewInterface } from '@/types/types-employee-and-applicants';
import { Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { EVALQUESTIONSDeleteAction, EVALQUESTIONSDeleteActionFailureCleanup } from '@/store/actions/employee-and-applicants';



interface DeactivateEVALQUESTIONSModalInterface {
    singleEVALQUESTIONSDetailsData: EVALQUESTIONSViewInterface;
    DeactivateEVALQUESTIONSOpenModal: boolean; 
    setDeactivateEVALQUESTIONSOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    setSingleEVALQUESTIONSDetailsData: React.Dispatch<React.SetStateAction<EVALQUESTIONSViewInterface>>;
}

export default function DeactivateEVALQUESTIONSModal(props: DeactivateEVALQUESTIONSModalInterface) {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState)=> state.auth.employee_detail);
  const EVALQUESTIONSDeactivateState = useSelector((state: RootState)=> state.employeeAndApplicants.EVALQUESTIONSDelete)
  const {DeactivateEVALQUESTIONSOpenModal, setDeactivateEVALQUESTIONSOpenModal, singleEVALQUESTIONSDetailsData, setSingleEVALQUESTIONSDetailsData} = props;

  const DeactivateEVALQUESTIONS = () => {
    if(singleEVALQUESTIONSDetailsData.id){
      dispatch(EVALQUESTIONSDeleteAction({eq_id: singleEVALQUESTIONSDetailsData.id, curr_user: (state?.emp_no as number)}))
    } else {
      window.alert('No Core Competency ID found.')
    } 
  }

  React.useEffect(()=>{
    if(EVALQUESTIONSDeactivateState.status === 'succeeded'){
      window.alert(`Success: ${EVALQUESTIONSDeactivateState.status?.charAt(0).toUpperCase()}${EVALQUESTIONSDeactivateState.status.slice(1)}`)
      setTimeout(()=>{
        window.location.reload();
      }, 800)
    } else if(EVALQUESTIONSDeactivateState.status === 'failed') {
      window.alert(`Error: ${EVALQUESTIONSDeactivateState.error}`)
      dispatch(EVALQUESTIONSDeleteActionFailureCleanup());
    }
  }, [EVALQUESTIONSDeactivateState])

  console.log(EVALQUESTIONSDeactivateState.status, "haha?")
  return (
    <React.Fragment>
      <Transition in={DeactivateEVALQUESTIONSOpenModal} timeout={400}>
      {(state: string) => (
      <Modal
        keepMounted
        open={!['exited', 'exiting'].includes(state)}
        onClose={() => {
          setDeactivateEVALQUESTIONSOpenModal(false);
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
                <Typography>Are you sure you want to deactivate this Evaluation Question?</Typography>
                <Typography className='italic' variant='caption'>Users can no longer see this in the tables afterwards.</Typography>
                <Typography className='italic' variant='caption'>Assigned ID will be skipped and recorded on audit trail.</Typography>
              </div>
              <div className='flex justify-around'>
                <Button variant={'contained'} color="error" onClick={DeactivateEVALQUESTIONS}>Confirm</Button>
                <Button variant={'outlined'} color="warning" onClick={()=>{setDeactivateEVALQUESTIONSOpenModal(false)}}>Cancel</Button>
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