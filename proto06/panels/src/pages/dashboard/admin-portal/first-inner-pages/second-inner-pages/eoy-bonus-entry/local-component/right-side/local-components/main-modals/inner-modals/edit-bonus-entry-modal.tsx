import {useEffect, Dispatch, SetStateAction, Fragment}from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Transition } from 'react-transition-group';
import { BONUSENTRYViewInterface } from '@/types/types-payroll-eoy';
import { Button, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, globalReducerFailed, globalReducerSuccess } from '@/store/configureStore';
import { BONUSENTRYEditAction, BONUSENTRYEditActionFailureCleanup, BONUSENTRYViewAction } from '@/store/actions/payroll-eoy';
import EmployeeAutoCompleteRight from './autocomplete-fields/employee-autocomplete-right';
import CutoffAutoCompleteRight from './autocomplete-fields/cutoff-code-autocomplete-right';
import BonusListAutoCompleteRight from './autocomplete-fields/bonus-type-autocomplete-right';


interface EditBONUSENTRYModalInterface {
    singleBONUSENTRYDetailsData: BONUSENTRYViewInterface;
    editBONUSENTRYOpenModal: boolean;
    setSingleBONUSENTRYOpenModal: Dispatch<SetStateAction<boolean>>;
    setEditBONUSENTRYOpenModal: Dispatch<SetStateAction<boolean>>;
    setSingleBONUSENTRYDetailsData: Dispatch<SetStateAction<BONUSENTRYViewInterface>>;
}

export default function EditBONUSENTRYModal(props: EditBONUSENTRYModalInterface) {
  const dispatch = useDispatch();
  const BONUSENTRYEditState = useSelector((state: RootState)=> state.payrollEOY.BONUSENTRYEdit)
  const curr_user = useSelector((state: RootState) => state.auth.employee_detail?.emp_no);
  const {
    editBONUSENTRYOpenModal, 
    setEditBONUSENTRYOpenModal, 
    singleBONUSENTRYDetailsData, 
    setSingleBONUSENTRYDetailsData,
    setSingleBONUSENTRYOpenModal
  } = props;


  const editBONUSENTRY = () => { 
    dispatch(BONUSENTRYEditAction({
      ...singleBONUSENTRYDetailsData,
      added_by: curr_user || NaN
    }))
  }

  useEffect(()=>{ 
      if(BONUSENTRYEditState.status === `${globalReducerSuccess}`){
        window.alert(`${BONUSENTRYEditState.status.charAt(0).toUpperCase()}${BONUSENTRYEditState.status.slice(1)}`)
        // window.location.reload();
        setEditBONUSENTRYOpenModal(false);
        setSingleBONUSENTRYOpenModal(false);
        dispatch(BONUSENTRYViewAction());
        setTimeout(()=>{
          dispatch(BONUSENTRYEditActionFailureCleanup());
        }, 200)
      }else if(BONUSENTRYEditState.status === `${globalReducerFailed}`){
        window.alert(`${BONUSENTRYEditState.error}`)
        setTimeout(()=>{
          dispatch(BONUSENTRYEditActionFailureCleanup());
        }, 200)
      }
  }, [BONUSENTRYEditState.status])
  return (
    <Fragment>
      <Transition in={editBONUSENTRYOpenModal} timeout={400}>
      {(state: string) => (
      <Modal
        open={!['exited', 'exiting'].includes(state)}
        onClose={() => {
          setEditBONUSENTRYOpenModal(false);
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
              ...editBONUSENTRYArea,
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
          <Typography variant='h6' className='border-b-2 border-blue-700'>Editing User Details</Typography>
          <div className='flex flex-col items-center justify-around h-full'>
            <div className='flex flex-col w-full gap-10'>
              <div className='flex justify-center item-center'>
                <Typography>Please Enter New Details</Typography>
              </div>
              <div className='flex flex-col gap-5'>
                    <div className='flex flex-col gap-6 pt-4'>
                      <EmployeeAutoCompleteRight createBONUSENTRY={singleBONUSENTRYDetailsData} setCreateBONUSENTRY={setSingleBONUSENTRYDetailsData}/>
                      <CutoffAutoCompleteRight createBONUSENTRY={singleBONUSENTRYDetailsData} setCreateBONUSENTRY={setSingleBONUSENTRYDetailsData}/>
                      <BonusListAutoCompleteRight createBONUSENTRY={singleBONUSENTRYDetailsData} setCreateBONUSENTRY={setSingleBONUSENTRYDetailsData}/>

                    </div>
              </div>
              <div className='flex justify-around'>
                <Button variant={'contained'} onClick={editBONUSENTRY}>Submit</Button>
                <Button variant={'outlined'} onClick={()=>{setEditBONUSENTRYOpenModal(false)}}>Cancel</Button>
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
const editBONUSENTRYArea = {
  height: '150mm',
  width: '180mm',
  margin: '0 auto',
  background: 'white',
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
};