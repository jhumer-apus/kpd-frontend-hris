import {useEffect, Dispatch, SetStateAction, useState, ChangeEvent, Fragment}from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Transition } from 'react-transition-group';
import { SCHEDULEDAILYEditInterface, SCHEDULEDAILYViewInterface } from '@/types/types-pages';
import { Button, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import dayjs from 'dayjs';
import { SCHEDULEDAILYCreateActionFailureCleanup, SCHEDULEDAILYEditAction } from '@/store/actions/procedurals';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

interface AllowedDaysSCHEDULEDAILYModalInterface {
    singleSCHEDULEDAILYDetailsData: SCHEDULEDAILYViewInterface;
    allowedDaysSCHEDULEDAILYOpenModal: boolean; 
    setAllowedDaysSCHEDULEDAILYOpenModal: Dispatch<SetStateAction<boolean>>;
    setSingleSCHEDULEDAILYDetailsData: Dispatch<SetStateAction<SCHEDULEDAILYViewInterface>>;
}

export default function AllowedDaysSCHEDULEDAILYModal(props: AllowedDaysSCHEDULEDAILYModalInterface) {
  const dispatch = useDispatch();
  const SCHEDULEDAILYAllowedDaysState = useSelector((state: RootState)=> state.procedurals.SCHEDULEDAILYEdit)
  const {allowedDaysSCHEDULEDAILYOpenModal, setAllowedDaysSCHEDULEDAILYOpenModal, singleSCHEDULEDAILYDetailsData, setSingleSCHEDULEDAILYDetailsData} = props;
  const [ initialEditState, setInitialEditState ] = useState<SCHEDULEDAILYViewInterface>(singleSCHEDULEDAILYDetailsData)
  const nullValues = Object.values(singleSCHEDULEDAILYDetailsData).filter(
    value => typeof value === null
  );
  const allowedDaysSCHEDULEDAILY = () => { 
    if(nullValues.length === 0 ){
      dispatch(SCHEDULEDAILYEditAction(singleSCHEDULEDAILYDetailsData))
      } else {
      window.alert('A field has found to have no value, make sure to supplement it a value.');
    }
  }

  useEffect(()=>{
    if(SCHEDULEDAILYAllowedDaysState.status){      
      if(SCHEDULEDAILYAllowedDaysState.status === 'succeeded'){
        window.alert(`${SCHEDULEDAILYAllowedDaysState.status.charAt(0).toUpperCase()}${SCHEDULEDAILYAllowedDaysState.status.slice(1)}`)
        setTimeout(()=>{
          window.location.reload();
        }, 800)
      }else if (SCHEDULEDAILYAllowedDaysState.status === 'failed'){
        window.alert(`${SCHEDULEDAILYAllowedDaysState.error}`)
        dispatch(SCHEDULEDAILYCreateActionFailureCleanup());
      }
    }
  }, [SCHEDULEDAILYAllowedDaysState.status])
  return (
    <Fragment>
      <Transition in={allowedDaysSCHEDULEDAILYOpenModal} timeout={400}>
      {(state: string) => (
      <Modal
        open={!['exited', 'exiting'].includes(state)}
        onClose={() => {
          setAllowedDaysSCHEDULEDAILYOpenModal(false);
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
              ...allowedDaysSCHEDULEDAILYArea,
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
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Typography variant='h6' className='border-b-2 border-green-700'>Editing Daily Schedule</Typography>
            <div className='flex gap-10 overflow-auto relative mt-4 p-4'>
                <div className='flex gap-6 flex-col'>
                    <DateTimePicker
                      label="Business Date:"
                      value={dayjs(singleSCHEDULEDAILYDetailsData.business_date)}
                      onChange={(newValue) => {
                          const formattedDate = dayjs(newValue).format('YYYY-MM-DDTHH:mm:ss');
                          setInitialEditState((prevState)=> {
                            return (
                              {
                                ...prevState,
                                business_date: formattedDate,
                              }
                            )
                          })
                          return (
                            setSingleSCHEDULEDAILYDetailsData((prevState)=>{
                                  return(
                                      {
                                          ...prevState,
                                          business_date: formattedDate
                                      }
                                  )
                              })
                          )
                      }}
                    />
                    <FormControl>
                        <FormLabel id="demo-controlled-radio-buttons-group">Is Restday</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={`${!!singleSCHEDULEDAILYDetailsData.is_restday}`}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = (event.target.value=== 'true' ? true : false);
                                setSingleSCHEDULEDAILYDetailsData((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            is_restday: value
                                        }
                                    )
                                })
                            }}
                        >
                            <FormControlLabel value="true" control={<Radio />} label="Yes" />
                            <FormControlLabel value="false" control={<Radio />} label="No" />
                        </RadioGroup>
                    </FormControl>
                </div>
                <div className='flex gap-5 flex-col'>
                    <TextField 
                      sx={{width: '100%'}} 
                      label='Shift Code:'
                      value={(singleSCHEDULEDAILYDetailsData?.schedule_shift_code?.id)}
                      type='number'
                      onChange={(newValue)=> {
                        const value = parseInt(newValue.target.value);
                        setInitialEditState((prevState)=> {
                          return (
                            {
                              ...prevState,
                              schedule_shift_code: value,
                            }
                          )
                        })
                      }}
                      variant='standard'
                    />
                </div>
            </div>
            <div className='flex flex-col justify-center items-center'>
            <div className='flex justify-center mt-6' container-name='leave_buttons_container'>
                <div className='flex justify-between' style={{width:'200px', marginTop: '20px'}} container-name='leave_buttons'>
                    <Button variant={'contained'} onClick={allowedDaysSCHEDULEDAILY}>Submit</Button>
                    <Button variant={'outlined'} onClick={()=>{setAllowedDaysSCHEDULEDAILYOpenModal(false)}}>Cancel</Button>
                </div>
            </div>
            </div>
        </LocalizationProvider>
        </ModalDialog>
      </Modal>
        )}
      </Transition>
    </Fragment>
  );
}


// Styles
const allowedDaysSCHEDULEDAILYArea = {
  height: '98.5mm',
  width: '120mm',
  margin: '0 auto',
  background: 'white',
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
};