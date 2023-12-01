import { useEffect, useState, Dispatch, SetStateAction, Fragment } from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Transition } from 'react-transition-group';
import { OFFBOARDINGREQUIREMENTSEditInterface, OFFBOARDINGREQUIREMENTSViewInterface } from '@/types/types-employee-and-applicants';
import { Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { OFFBOARDINGREQUIREMENTSEditAction, OFFBOARDINGREQUIREMENTSEditActionFailureCleanup } from '@/store/actions/employee-and-applicants';



interface EditOFFBOARDINGREQUIREMENTSModalInterface {
    initialState: OFFBOARDINGREQUIREMENTSViewInterface;
    setInitialState: Dispatch<SetStateAction<OFFBOARDINGREQUIREMENTSViewInterface>>;
    openModal: boolean; 
    setOpenModal: Dispatch<SetStateAction<boolean>>;
}

export default function EditSubmitOFFBOARDINGREQUIREMENTSModal(props: EditOFFBOARDINGREQUIREMENTSModalInterface) {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState)=> state.auth.employee_detail);
  const OFFBOARDINGREQUIREMENTSEditState = useSelector((state: RootState)=> state.employeeAndApplicants.OFFBOARDINGREQUIREMENTSEdit)
  const { openModal, setOpenModal, initialState } = props;

  const [editObject, setEditObject] = useState<OFFBOARDINGREQUIREMENTSEditInterface>({
    offboarding_title: '',
    facilitator: NaN,
    id: NaN,
  })

  const EditOFFBOARDINGREQUIREMENTS = () => {
    if(initialState.id){
      dispatch(OFFBOARDINGREQUIREMENTSEditAction(editObject))
    } else {
      window.alert('No Evaluation Question ID found.')
    } 
  }

  useEffect(()=>{
    if(OFFBOARDINGREQUIREMENTSEditState.status === 'succeeded'){
      window.alert(`Success: ${OFFBOARDINGREQUIREMENTSEditState.status?.charAt(0).toUpperCase()}${OFFBOARDINGREQUIREMENTSEditState.status.slice(1)}`)
      setTimeout(()=>{
        window.location.reload();
      }, 800)
    } else if(OFFBOARDINGREQUIREMENTSEditState.status === 'failed') {
      window.alert(`Error: ${OFFBOARDINGREQUIREMENTSEditState.error}`)
      dispatch(OFFBOARDINGREQUIREMENTSEditActionFailureCleanup());
    }
  }, [OFFBOARDINGREQUIREMENTSEditState])

  useEffect(()=> {
    setTimeout(()=> {
        setEditObject((prevState)=> {
            return (
                {
                    ...prevState,
                    offboarding_title: `${initialState.offboarding_title}`,
                    facilitator: initialState.facilitator,
                    id: initialState.id,
                    added_by: state?.emp_no
                }
            )
        })
    }, 400)

  }, [initialState])



  return (
    <Fragment>
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
          <Typography variant='h6' className='border-b-2 border-green-700'>Confirmation</Typography>
          <div className='flex justify-center flex-col item-center h-full'>
            <div className='flex flex-col justify-between w-full h-2/4'>
              <div className='flex justify-center flex-col items-center gap-2 mb-4'>
                <Typography className="text-center">Are you sure you want to submit the edited changes of this Offboarding Requirement?</Typography>
                <Typography className='italic' variant='caption'>Please review the details carefully before submitting .</Typography>
                <Typography className='italic' variant='caption'>Your ID will be recorded on audit trail for submitting the changes.</Typography>
              </div>
              <div className='flex justify-around'>
                <Button variant={'contained'} color="success" onClick={EditOFFBOARDINGREQUIREMENTS}>Confirm</Button>
                <Button variant={'outlined'} color="warning" onClick={()=>{setOpenModal(false)}}>Cancel</Button>
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
const modalArea = {
  height: '74.5mm',
  width: '130mm',
  margin: '0 auto',
  background: 'white',
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
};