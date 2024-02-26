import {useEffect, Dispatch, SetStateAction, ChangeEvent, Fragment}from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Transition } from 'react-transition-group';
import { DEPARTMENTViewInterface } from '@/types/types-pages';
import { Button, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, globalReducerFailed } from '@/store/configureStore';
import { DEPARTMENTEditAction, DEPARTMENTEditActionFailureCleanup, DEPARTMENTViewAction } from '@/store/actions/categories';
import EmployeeAutoCompleteRight from './autocomplete-fields/employee-autocomplete-right';
import BranchAutoCompleteRight from './autocomplete-fields/branch-autocomplete-right';



interface EditDEPARTMENTModalInterface {
    singleDEPARTMENTDetailsData: DEPARTMENTViewInterface;
    editDEPARTMENTOpenModal: boolean; 
    setSingleDEPARTMENTOpenModal: Dispatch<SetStateAction<boolean>>;
    setEditDEPARTMENTOpenModal: Dispatch<SetStateAction<boolean>>;
    setSingleDEPARTMENTDetailsData: Dispatch<SetStateAction<DEPARTMENTViewInterface>>;
}

export default function EditDEPARTMENTModal(props: EditDEPARTMENTModalInterface) {
  const dispatch = useDispatch();
  const DEPARTMENTEditState = useSelector((state: RootState)=> state.categories.DEPARTMENTEdit)
  const curr_user = useSelector((state: RootState) => state.auth.employee_detail?.emp_no);
  const {
    editDEPARTMENTOpenModal, 
    setEditDEPARTMENTOpenModal, 
    singleDEPARTMENTDetailsData, 
    setSingleDEPARTMENTDetailsData,
    setSingleDEPARTMENTOpenModal
  } = props;


  const editDEPARTMENT = () => { 
    dispatch(DEPARTMENTEditAction({
      ...singleDEPARTMENTDetailsData,
      added_by: curr_user || NaN
    }))
  }

  useEffect(()=>{  
    if(DEPARTMENTEditState.status === 'succeeded'){
      window.alert(`${DEPARTMENTEditState.status.charAt(0).toUpperCase()}${DEPARTMENTEditState.status.slice(1)}`)
      setEditDEPARTMENTOpenModal(false);
      setSingleDEPARTMENTOpenModal(false);
      dispatch(DEPARTMENTViewAction());
      setTimeout(()=>{
        dispatch(DEPARTMENTEditActionFailureCleanup())
      }, 200)
    } else if (DEPARTMENTEditState.status === `${globalReducerFailed}`){
      window.alert(`Request Failed, ${DEPARTMENTEditState.error}`)
      setTimeout(()=> {
        dispatch(DEPARTMENTEditActionFailureCleanup())
      }, 200)
    }
  }, [DEPARTMENTEditState.status])
  return (
    <Fragment>
      <Transition in={editDEPARTMENTOpenModal} timeout={400}>
      {(state: string) => (
      <Modal
        open={!['exited', 'exiting'].includes(state)}
        onClose={() => {
          setEditDEPARTMENTOpenModal(false);
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
              ...editDEPARTMENTArea,
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
          <Typography variant='h6' className='border-b-2 border-blue-700'>Editing Department Details</Typography>
          <div className='flex flex-col items-center justify-around h-full'>
            <div className='flex flex-col w-full gap-10'>
              <div className='flex justify-center item-center'>
                <Typography>Please Enter New Details</Typography>
              </div>
              <div className='flex flex-col justify-center items-center gap-5'>
                <TextField
                sx={{width: '90%'}}
                  label='Branch Name'
                  type='text'
                  required
                  value={singleDEPARTMENTDetailsData.dept_name}
                  onChange={(event: ChangeEvent<HTMLInputElement>)=> {
                    setSingleDEPARTMENTDetailsData((prevState)=> {
                      const value = event.target.value;
                      return({
                        ...prevState,
                        dept_name: value,
                      })
                    })
                  }}
                />
                <EmployeeAutoCompleteRight createDEPARTMENT={singleDEPARTMENTDetailsData} setCreateDEPARTMENT={setSingleDEPARTMENTDetailsData}/>
                <BranchAutoCompleteRight createDEPARTMENT={singleDEPARTMENTDetailsData} setCreateDEPARTMENT={setSingleDEPARTMENTDetailsData}/>
              </div>
              <div className='flex justify-around'>
                <Button variant={'contained'} onClick={editDEPARTMENT}>Submit</Button>
                <Button 
                  variant={'outlined'} 
                  onClick={()=>{
                    setEditDEPARTMENTOpenModal(false)
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
const editDEPARTMENTArea = {
  height: '164.5mm',
  width: '180mm',
  margin: '0 auto',
  background: 'white',
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
};