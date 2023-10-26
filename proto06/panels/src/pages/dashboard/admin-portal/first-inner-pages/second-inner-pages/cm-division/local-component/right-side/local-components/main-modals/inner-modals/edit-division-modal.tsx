import {useEffect, Dispatch, SetStateAction, ChangeEvent, Fragment}from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Transition } from 'react-transition-group';
import { DIVISIONViewInterface } from '@/types/types-pages';
import { Button, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { DIVISIONEditAction } from '@/store/actions/categories';
import EmployeeAutoCompleteRight from './autocomplete-fields/employee-autocomplete-right';
import BranchAutoCompleteRight from './autocomplete-fields/branch-autocomplete-right';



interface AllowedDaysDIVISIONModalInterface {
    singleDIVISIONDetailsData: DIVISIONViewInterface;
    allowedDaysDIVISIONOpenModal: boolean; 
    setAllowedDaysDIVISIONOpenModal: Dispatch<SetStateAction<boolean>>;
    setSingleDIVISIONDetailsData: Dispatch<SetStateAction<DIVISIONViewInterface>>;
}

export default function AllowedDaysDIVISIONModal(props: AllowedDaysDIVISIONModalInterface) {
  const dispatch = useDispatch();
  const DIVISIONAllowedDaysState = useSelector((state: RootState)=> state.categories.DIVISIONEdit.status)
  const curr_user = useSelector((state: RootState) => state.auth.employee_detail?.emp_no);
  const {allowedDaysDIVISIONOpenModal, setAllowedDaysDIVISIONOpenModal, singleDIVISIONDetailsData, setSingleDIVISIONDetailsData} = props;


  const allowedDaysDIVISION = () => { 
    dispatch(DIVISIONEditAction({
      ...singleDIVISIONDetailsData,
      added_by: curr_user || NaN
    }))
  }

  useEffect(()=>{
    if(DIVISIONAllowedDaysState){      
      if(DIVISIONAllowedDaysState === 'succeeded'){
        window.alert(`${DIVISIONAllowedDaysState.charAt(0).toUpperCase()}${DIVISIONAllowedDaysState.slice(1)}`)
        setTimeout(()=>{
          window.location.reload();
        }, 800)
      }
    }
  }, [DIVISIONAllowedDaysState])
  return (
    <Fragment>
      <Transition in={allowedDaysDIVISIONOpenModal} timeout={400}>
      {(state: string) => (
      <Modal
        keepMounted
        open={!['exited', 'exiting'].includes(state)}
        onClose={() => {
          setAllowedDaysDIVISIONOpenModal(false);
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
              ...allowedDaysDIVISIONArea,
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
          <Typography variant='h6' className='border-b-2 border-blue-700'>Editing Division Details</Typography>
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
                  value={singleDIVISIONDetailsData.div_name}
                  onChange={(event: ChangeEvent<HTMLInputElement>)=> {
                    setSingleDIVISIONDetailsData((prevState)=> {
                      const value = event.target.value;
                      return({
                        ...prevState,
                        div_name: value,
                      })
                    })
                  }}
                />
                <EmployeeAutoCompleteRight createDIVISION={singleDIVISIONDetailsData} setCreateDIVISION={setSingleDIVISIONDetailsData}/>
                <BranchAutoCompleteRight createDIVISION={singleDIVISIONDetailsData} setCreateDIVISION={setSingleDIVISIONDetailsData}/>
              </div>
              <div className='flex justify-around'>
                <Button variant={'contained'} onClick={allowedDaysDIVISION}>Submit</Button>
                <Button variant={'outlined'} onClick={()=>{setAllowedDaysDIVISIONOpenModal(false)}}>Cancel</Button>
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
const allowedDaysDIVISIONArea = {
  height: '164.5mm',
  width: '180mm',
  margin: '0 auto',
  background: 'white',
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
};