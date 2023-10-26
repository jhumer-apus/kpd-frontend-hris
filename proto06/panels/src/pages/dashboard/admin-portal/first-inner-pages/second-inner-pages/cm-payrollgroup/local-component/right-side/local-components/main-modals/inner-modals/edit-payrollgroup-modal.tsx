import {useEffect, Dispatch, SetStateAction, ChangeEvent, Fragment}from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Transition } from 'react-transition-group';
import { PAYROLLGROUPViewInterface } from '@/types/types-pages';
import { Button, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import dayjs from 'dayjs';
import { PAYROLLGROUPEditAction } from '@/store/actions/categories';
import EmployeeAutoCompleteRight from './autocomplete-fields/employee-autocomplete-right';
import BranchAutoCompleteRight from './autocomplete-fields/branch-autocomplete-right';



interface AllowedDaysPAYROLLGROUPModalInterface {
    singlePAYROLLGROUPDetailsData: PAYROLLGROUPViewInterface;
    allowedDaysPAYROLLGROUPOpenModal: boolean; 
    setAllowedDaysPAYROLLGROUPOpenModal: Dispatch<SetStateAction<boolean>>;
    setSinglePAYROLLGROUPDetailsData: Dispatch<SetStateAction<PAYROLLGROUPViewInterface>>;
}

export default function AllowedDaysPAYROLLGROUPModal(props: AllowedDaysPAYROLLGROUPModalInterface) {
  const dispatch = useDispatch();
  const PAYROLLGROUPAllowedDaysState = useSelector((state: RootState)=> state.categories.PAYROLLGROUPEdit.status)
  const curr_user = useSelector((state: RootState) => state.auth.employee_detail?.emp_no);
  const {allowedDaysPAYROLLGROUPOpenModal, setAllowedDaysPAYROLLGROUPOpenModal, singlePAYROLLGROUPDetailsData, setSinglePAYROLLGROUPDetailsData} = props;


  const allowedDaysPAYROLLGROUP = () => { 
    dispatch(PAYROLLGROUPEditAction({
      ...singlePAYROLLGROUPDetailsData,
      added_by: curr_user || NaN
    }))
  }

  useEffect(()=>{
    if(PAYROLLGROUPAllowedDaysState){      
      if(PAYROLLGROUPAllowedDaysState === 'succeeded'){
        window.alert(`${PAYROLLGROUPAllowedDaysState.charAt(0).toUpperCase()}${PAYROLLGROUPAllowedDaysState.slice(1)}`)
        setTimeout(()=>{
          window.location.reload();
        }, 800)
      }
    }
  }, [PAYROLLGROUPAllowedDaysState])
  return (
    <Fragment>
      <Transition in={allowedDaysPAYROLLGROUPOpenModal} timeout={400}>
      {(state: string) => (
      <Modal
        keepMounted
        open={!['exited', 'exiting'].includes(state)}
        onClose={() => {
          setAllowedDaysPAYROLLGROUPOpenModal(false);
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
              ...allowedDaysPAYROLLGROUPArea,
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
          <Typography variant='h6' className='border-b-2 border-blue-700'>Editing Payroll Group Details</Typography>
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
                  value={singlePAYROLLGROUPDetailsData.name}
                  onChange={(event: ChangeEvent<HTMLInputElement>)=> {
                    setSinglePAYROLLGROUPDetailsData((prevState)=> {
                      const value = event.target.value;
                      return({
                        ...prevState,
                        div_name: value,
                      })
                    })
                  }}
                />
                <TextField
                sx={{width: '90%'}}
                  label='Pay Frequency(Per Month)'
                  type='number'
                  required
                  value={singlePAYROLLGROUPDetailsData.payroll_freq}
                  onChange={(event: ChangeEvent<HTMLInputElement>)=> {
                    setSinglePAYROLLGROUPDetailsData((prevState)=> {
                      const value = parseInt(event.target.value);
                      return({
                        ...prevState,
                        payroll_freq: value,
                      })
                    })
                  }}
                />
                <TextField
                sx={{width: '90%'}}
                  label='Description (optional)'
                  type='text'
                  multiline
                  rows={3}
                  variant='outlined'
                  value={singlePAYROLLGROUPDetailsData.payroll_description}
                  onChange={(event: ChangeEvent<HTMLInputElement>)=> {
                    setSinglePAYROLLGROUPDetailsData((prevState)=> {
                      const value = event.target.value;
                      return({
                        ...prevState,
                        payroll_description: value,
                      })
                    })
                  }}
                />
              </div>
              <div className='flex justify-around'>
                <Button variant={'contained'} onClick={allowedDaysPAYROLLGROUP}>Submit</Button>
                <Button variant={'outlined'} onClick={()=>{setAllowedDaysPAYROLLGROUPOpenModal(false)}}>Cancel</Button>
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
const allowedDaysPAYROLLGROUPArea = {
  height: '164.5mm',
  width: '180mm',
  margin: '0 auto',
  background: 'white',
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
};