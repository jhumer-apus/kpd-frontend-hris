import * as React from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Transition } from 'react-transition-group';
import { OFFBOARDINGREQUIREMENTSViewInterface } from '@/types/types-employee-and-applicants';
import { Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { OFFBOARDINGREQUIREMENTSDeleteAction, OFFBOARDINGREQUIREMENTSDeleteActionFailureCleanup } from '@/store/actions/employee-and-applicants';



interface DeactivateOFFBOARDINGREQUIREMENTSModalInterface {
    initialState: OFFBOARDINGREQUIREMENTSViewInterface;
    openModal: boolean; 
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    setInitialState: React.Dispatch<React.SetStateAction<OFFBOARDINGREQUIREMENTSViewInterface>>;
}

export default function DeactivateOFFBOARDINGREQUIREMENTSModal(props: DeactivateOFFBOARDINGREQUIREMENTSModalInterface) {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState)=> state.auth.employee_detail);
  const OFFBOARDINGREQUIREMENTSDeactivateState = useSelector((state: RootState)=> state.employeeAndApplicants.OFFBOARDINGREQUIREMENTSDelete)
  const {openModal, setOpenModal, initialState, setInitialState} = props;

  const DeactivateOFFBOARDINGREQUIREMENTS = () => {
    if(initialState.id){
      dispatch(OFFBOARDINGREQUIREMENTSDeleteAction({or_id: initialState.id, curr_user: (state?.emp_no as number)}))
    } else {
      window.alert('No Core Competency ID found.')
    } 
  }

  React.useEffect(()=>{
    if(OFFBOARDINGREQUIREMENTSDeactivateState.status === 'succeeded'){
      window.alert(`Success: ${OFFBOARDINGREQUIREMENTSDeactivateState.status?.charAt(0).toUpperCase()}${OFFBOARDINGREQUIREMENTSDeactivateState.status.slice(1)}`)
      setTimeout(()=>{
        window.location.reload();
      }, 800)
    } else if(OFFBOARDINGREQUIREMENTSDeactivateState.status === 'failed') {
      window.alert(`Error: ${OFFBOARDINGREQUIREMENTSDeactivateState.error}`)
      dispatch(OFFBOARDINGREQUIREMENTSDeleteActionFailureCleanup());
    }
  }, [OFFBOARDINGREQUIREMENTSDeactivateState])

  return (
    <React.Fragment>
      <Transition in={openModal} timeout={400}>
      {(state: string) => (
      <Modal
        keepMounted
        open={!['exited', 'exiting'].includes(state)}
        onClose={() => {
          setOpenModal(false);
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
              <div className='flex justify-center text-center flex-col items-center gap-2 mb-4'>
                <Typography>Are you sure you want to deactivate this Offboarding Requirement?</Typography>
                <Typography className='italic' variant='caption'>Users can no longer see this in the tables afterwards.</Typography>
                <Typography className='italic' variant='caption'>Assigned ID will be skipped and recorded on audit trail.</Typography>
              </div>
              <div className='flex justify-around'>
                <Button variant={'contained'} color="error" onClick={DeactivateOFFBOARDINGREQUIREMENTS}>Confirm</Button>
                <Button variant={'outlined'} color="warning" onClick={()=>{setOpenModal(false)}}>Cancel</Button>
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