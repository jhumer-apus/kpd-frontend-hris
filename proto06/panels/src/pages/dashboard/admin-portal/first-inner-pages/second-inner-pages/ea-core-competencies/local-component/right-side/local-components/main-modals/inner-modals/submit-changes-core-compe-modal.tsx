import { useEffect, useState, Dispatch, SetStateAction, Fragment } from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Transition } from 'react-transition-group';
import { CORECOMPEEditInterface, CORECOMPEViewInterface } from '@/types/types-employee-and-applicants';
import { Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { CORECOMPEEditAction, CORECOMPEEditActionFailureCleanup } from '@/store/actions/employee-and-applicants';



interface EditCORECOMPEModalInterface {
    singleCORECOMPEDetailsData: CORECOMPEViewInterface;
    EditSubmitCORECOMPEOpenModal: boolean; 
    setEditSubmitCORECOMPEOpenModal: Dispatch<SetStateAction<boolean>>;
    setSingleCORECOMPEDetailsData: Dispatch<SetStateAction<CORECOMPEViewInterface>>;
}

export default function EditSubmitCORECOMPEModal(props: EditCORECOMPEModalInterface) {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState)=> state.auth.employee_detail);
  const CORECOMPEEditState = useSelector((state: RootState)=> state.employeeAndApplicants.CORECOMPEEdit)
  const {EditSubmitCORECOMPEOpenModal, setEditSubmitCORECOMPEOpenModal, singleCORECOMPEDetailsData, setSingleCORECOMPEDetailsData} = props;

  const [editObject, setEditObject] = useState<CORECOMPEEditInterface>({
    id: NaN,
    checklist_title: '',
    checklist_limit: ''
  })

  const EditCORECOMPE = () => {
    if(singleCORECOMPEDetailsData.id){
      dispatch(CORECOMPEEditAction(editObject))
    } else {
      window.alert('No Core Competency ID found.')
    } 
  }
  useEffect(()=>{
    if(CORECOMPEEditState.status === 'succeeded'){
      window.alert(`Success: ${CORECOMPEEditState.status?.charAt(0).toUpperCase()}${CORECOMPEEditState.status.slice(1)}`)
      setTimeout(()=>{
        window.location.reload();
      }, 800)
    } else if(CORECOMPEEditState.status === 'failed') {
      window.alert(`Error: ${CORECOMPEEditState.error}`)
      dispatch(CORECOMPEEditActionFailureCleanup());
    }
  }, [CORECOMPEEditState])

  useEffect(()=> {
    setTimeout(()=> {
        setEditObject((prevState)=> {
            return (
                {
                    ...prevState,
                    checklist_limit: `${singleCORECOMPEDetailsData.checklist_limit}`,
                    checklist_title: `${singleCORECOMPEDetailsData.checklist_title}`,
                    id: singleCORECOMPEDetailsData.id,
                    added_by: state?.emp_no
                }
            )
        })
    }, 400)

  }, [singleCORECOMPEDetailsData])



  return (
    <Fragment>
      <Transition in={EditSubmitCORECOMPEOpenModal} timeout={400}>
      {(state: string) => (
      <Modal
        keepMounted
        open={!['exited', 'exiting'].includes(state)}
        onClose={() => {
          setEditSubmitCORECOMPEOpenModal(false);
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
            <div className='flex flex-col justify-between w-full h-4/4'>
              <div className='flex justify-center flex-col items-center gap-2 mb-8'>
                <Typography>Are you sure you want to submit the edited changes of this Core Competency?</Typography>
                <Typography className='italic' variant='caption'>Please review the details carefully before submitting .</Typography>
                <Typography className='italic' variant='caption'>Your ID will be recorded on audit trail for submitting the changes.</Typography>
              </div>
              <div className='flex justify-around'>
                <Button variant={'contained'} color="success" onClick={EditCORECOMPE}>Confirm</Button>
                <Button variant={'outlined'} color="warning" onClick={()=>{setEditSubmitCORECOMPEOpenModal(false)}}>Cancel</Button>
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