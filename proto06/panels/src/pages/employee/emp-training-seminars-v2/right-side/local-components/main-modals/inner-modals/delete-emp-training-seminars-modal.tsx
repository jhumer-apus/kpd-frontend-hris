import * as React from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Transition } from 'react-transition-group';
import { EMPSEMINARSViewInterface } from '@/types/types-employee-and-applicants';
import { Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { EMPSEMINARSDeleteAction, EMPSEMINARSDeleteActionFailureCleanup, EMPSEMINARSViewSpecificAction } from '@/store/actions/employee-and-applicants';



interface DeactivateEMPSEMINARSModalInterface {
    singleEMPSEMINARSDetailsData: EMPSEMINARSViewInterface;
    setSingleEMPSEMINARSOpenModal: React.Dispatch<React.SetStateAction<boolean>>; 
    DeactivateEMPSEMINARSOpenModal: boolean; 
    setDeactivateEMPSEMINARSOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    setSingleEMPSEMINARSDetailsData: React.Dispatch<React.SetStateAction<EMPSEMINARSViewInterface>>;
}

export default function DeactivateEMPSEMINARSModal(props: DeactivateEMPSEMINARSModalInterface) {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState)=> state.auth.employee_detail);
  const EMPSEMINARSDeactivateState = useSelector((state: RootState)=> state.employeeAndApplicants.EMPSEMINARSDelete)
  const {DeactivateEMPSEMINARSOpenModal, setDeactivateEMPSEMINARSOpenModal, singleEMPSEMINARSDetailsData, setSingleEMPSEMINARSOpenModal, setSingleEMPSEMINARSDetailsData} = props;

  const DeactivateEMPSEMINARS = () => {
    setDeactivateEMPSEMINARSOpenModal(false) //to close the second modal
    dispatch(EMPSEMINARSDeleteAction({es_id: singleEMPSEMINARSDetailsData.id, added_by: (state?.emp_no as number)}))
  }

  React.useEffect(()=>{
    if(EMPSEMINARSDeactivateState.status === 'succeeded'){
      window.alert(`Success: ${EMPSEMINARSDeactivateState.status?.charAt(0).toUpperCase()}${EMPSEMINARSDeactivateState.status.slice(1)}`)
      setTimeout(()=>{
        dispatch((EMPSEMINARSViewSpecificAction({emp_no: singleEMPSEMINARSDetailsData.emp_no})))
        // window.location.reload();
      }, 200) //let's reduce the waiting time and do the func
      setTimeout(()=> {
        dispatch((EMPSEMINARSDeleteActionFailureCleanup()));
      }, 300)
      setSingleEMPSEMINARSOpenModal(false) //to close the first modal
    } else if(EMPSEMINARSDeactivateState.status === 'failed') {
      window.alert(`Error: ${EMPSEMINARSDeactivateState.error}`)
      dispatch(EMPSEMINARSDeleteActionFailureCleanup());
    }
  }, [EMPSEMINARSDeactivateState])

  return (
    <React.Fragment>
      <Transition in={DeactivateEMPSEMINARSOpenModal} timeout={400}>
      {(state: string) => (
      <Modal
        keepMounted
        open={!['exited', 'exiting'].includes(state)}
        onClose={() => {
          setDeactivateEMPSEMINARSOpenModal(false);
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
                <Typography>Are you sure you want to deactivate this Training/Seminar Record?</Typography>
                <Typography className='italic' variant='caption'>All Users can no longer see this in the tables afterwards.</Typography>
                <Typography className='italic' variant='caption'>Assigned ID will be skipped and recorded on audit trail.</Typography>
              </div>
              <div className='flex justify-around'>
                <Button variant={'contained'} color="error" onClick={DeactivateEMPSEMINARS}>Confirm</Button>
                <Button variant={'outlined'} color="warning" onClick={()=>{setDeactivateEMPSEMINARSOpenModal(false)}}>Cancel</Button>
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