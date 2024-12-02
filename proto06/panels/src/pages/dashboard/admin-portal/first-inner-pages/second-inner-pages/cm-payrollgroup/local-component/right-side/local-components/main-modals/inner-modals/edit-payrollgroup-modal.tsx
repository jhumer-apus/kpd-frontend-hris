import {useEffect, Dispatch, SetStateAction, ChangeEvent, Fragment}from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Transition } from 'react-transition-group';
import { PAYROLLGROUPViewInterface } from '@/types/types-pages';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, globalReducerFailed, globalReducerSuccess } from '@/store/configureStore';
import dayjs from 'dayjs';
import { PAYROLLGROUPEditAction, PAYROLLGROUPEditActionFailureCleanup, PAYROLLGROUPViewAction } from '@/store/actions/categories';
import EmployeeAutoCompleteRight from './autocomplete-fields/employee-autocomplete-right';
import BranchAutoCompleteRight from './autocomplete-fields/branch-autocomplete-right';
import { clearFields } from '@/helpers/utils';



interface AllowedDaysPAYROLLGROUPModalInterface {
    singlePAYROLLGROUPDetailsData: PAYROLLGROUPViewInterface;
    allowedDaysPAYROLLGROUPOpenModal: boolean; 
    setSinglePAYROLLGROUPOpenModal: Dispatch<SetStateAction<boolean>>;
    setAllowedDaysPAYROLLGROUPOpenModal: Dispatch<SetStateAction<boolean>>;
    setSinglePAYROLLGROUPDetailsData: Dispatch<SetStateAction<PAYROLLGROUPViewInterface>>;
}

export default function AllowedDaysPAYROLLGROUPModal(props: AllowedDaysPAYROLLGROUPModalInterface) {
  const dispatch = useDispatch();
  const PAYROLLGROUPState = useSelector((state: RootState)=> state.categories.PAYROLLGROUPEdit)
  const curr_user = useSelector((state: RootState) => state.auth.employee_detail?.emp_no);
  const {
    allowedDaysPAYROLLGROUPOpenModal, 
    setAllowedDaysPAYROLLGROUPOpenModal, 
    singlePAYROLLGROUPDetailsData, 
    setSinglePAYROLLGROUPDetailsData,
    setSinglePAYROLLGROUPOpenModal
  } = props;


  const allowedDaysPAYROLLGROUP = () => { 
    dispatch(PAYROLLGROUPEditAction({
      ...singlePAYROLLGROUPDetailsData,
      added_by: curr_user || NaN
    }))
  }

  useEffect(()=>{
    if(PAYROLLGROUPState.status === `${globalReducerSuccess}`){
      window.alert(`${PAYROLLGROUPState.status.charAt(0).toUpperCase()}${PAYROLLGROUPState.status.slice(1)}`)
      // window.location.reload();
      setAllowedDaysPAYROLLGROUPOpenModal(false);
      setSinglePAYROLLGROUPOpenModal(false);
      dispatch(PAYROLLGROUPViewAction());
      setTimeout(()=>{
        dispatch(PAYROLLGROUPEditActionFailureCleanup());
      }, 200)
    } else if (PAYROLLGROUPState.status === `${globalReducerFailed}`){
      window.alert(`${PAYROLLGROUPState.error}`)
      setTimeout(()=>{
        dispatch(PAYROLLGROUPEditActionFailureCleanup());
      }, 200)
    }
  }, [PAYROLLGROUPState.status])
  return (
    <Fragment>
      <Transition in={allowedDaysPAYROLLGROUPOpenModal} timeout={400}>
      {(state: string) => (
      <Modal
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
                  label='Payroll Name'
                  type='text'
                  required
                  value={singlePAYROLLGROUPDetailsData.name}
                  onChange={(event: ChangeEvent<HTMLInputElement>)=> {
                    setSinglePAYROLLGROUPDetailsData((prevState)=> {
                      const value = event.target.value;
                      return({
                        ...prevState,
                        name: value,
                      })
                    })
                  }}
                />
                <FormControl sx={{width: '90%'}} >
                    <InputLabel id="payroll_type">Payroll Type</InputLabel>
                    <Select
                        sx={{width: '100%'}} 
                        required 
                        labelId="payroll_type"
                        label="Payroll Type"
                        aria-required  
                        value={singlePAYROLLGROUPDetailsData?.payroll_type}
                        onChange={(event: any) => {
                            const value = event.target.value
                            setSinglePAYROLLGROUPDetailsData((prevState)=> ({
                                ...prevState,
                                payroll_type: value
                            }));
                        }}
                    >
                        <MenuItem value="Monthly">Monthly</MenuItem>
                        <MenuItem value="Semi-Monthly">Semi-Monthly</MenuItem>
                        <MenuItem value="Weekly">Weekly</MenuItem>
                        {/* <MenuItem value="Daily">Daily</MenuItem> */}
                    </Select>    
                </FormControl>
                {/* <TextField
                sx={{width: '90%'}}
                  label='Pay Frequency(Per Month)'
                  placeholder='1 - Monthly | 2 - Bi-Monthly | 3 - Daily'
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
                /> */}
                <TextField
                  sx={{width: '90%'}}
                  label='Description (optional)'
                  type='text'
                  multiline
                  rows={3}
                  variant='outlined'
                  value={singlePAYROLLGROUPDetailsData.description}
                  onChange={(event: ChangeEvent<HTMLInputElement>)=> {
                    setSinglePAYROLLGROUPDetailsData((prevState)=> {
                      const value = event.target.value;
                      return({
                        ...prevState,
                        description: value,
                      })
                    })
                  }}
                />
              </div>
              <div className='flex justify-around'>
                <Button variant={'contained'} onClick={allowedDaysPAYROLLGROUP}>Submit</Button>
                <Button 
                  variant={'outlined'} 
                  onClick={()=>{
                    // Edit Fields Are Should Not Have ClearFields // 
                    // clearFields(setSinglePAYROLLGROUPDetailsData, ['name', 'payroll_freq', 'payroll_description'], ['', NaN, null])
                    setAllowedDaysPAYROLLGROUPOpenModal(false)
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
const allowedDaysPAYROLLGROUPArea = {
  height: '164.5mm',
  width: '180mm',
  margin: '0 auto',
  background: 'white',
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
};