import {useEffect, Dispatch, SetStateAction, ChangeEvent, Fragment}from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Transition } from 'react-transition-group';
import { SCHEDULESHIFTViewInterface } from '@/types/types-pages';
import { Button, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import dayjs from 'dayjs';
import { SCHEDULESHIFTCreateActionFailureCleanup, SCHEDULESHIFTEditAction } from '@/store/actions/procedurals';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { SCHEDULESHIFTCreateInterface } from '@/types/types-pages';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { HandleAlertAction } from '@/store/actions/components';
import { beautifyJSON } from '@/helpers/utils';
import { DesktopTimePicker } from '@mui/x-date-pickers';



interface EditSCHEDULESHIFTModalInterface {
    singleSCHEDULESHIFTDetailsData: SCHEDULESHIFTViewInterface;
    editSCHEDULESHIFTOpenModal: boolean; 
    setEditSCHEDULESHIFTOpenModal: Dispatch<SetStateAction<boolean>>;
    setSingleSCHEDULESHIFTDetailsData: Dispatch<SetStateAction<SCHEDULESHIFTViewInterface>>;
}

export default function EditSCHEDULESHIFTModal(props: EditSCHEDULESHIFTModalInterface) {
  const dispatch = useDispatch();
  const user = useSelector((state:RootState) => state.auth.employee_detail)
  const SCHEDULESHIFTEditState = useSelector((state: RootState)=> state.procedurals.SCHEDULESHIFTEdit)
  const {editSCHEDULESHIFTOpenModal, setEditSCHEDULESHIFTOpenModal, singleSCHEDULESHIFTDetailsData, setSingleSCHEDULESHIFTDetailsData} = props;

  const nullValues = Object.values(singleSCHEDULESHIFTDetailsData).filter(
    value => typeof value === null
  );

  const editSCHEDULESHIFT = (e:any) => { 

    e.preventDefault()
    const payload:any = {
      ...singleSCHEDULESHIFTDetailsData,
      added_by: user?.emp_no,
  }
    if(nullValues.length === 0){

      if(validateShift(payload)) return

      dispatch(SCHEDULESHIFTEditAction(payload))
      } else {
      window.alert('A field has found to have no value, make sure to supplement it a value.');
    }
  }

  useEffect(() => {})

  const validateShift = (payload:any) => {
    const errors:any = {}

    const timeIn = dayjs(payload.time_in, 'HH:mm:ss')
    const timeOut = dayjs(payload.time_out, 'HH:mm:ss')

    const timeDiff = Math.abs(timeIn.diff(timeOut))
    const limitHours = hoursToMilliseconds(4)

    if(timeDiff < limitHours) 
      errors['Schedule Shift'] = "Schedule shift must be greater than 4 hours"

    if(Object.keys(errors).length > 0) {
      dispatch(HandleAlertAction({
        open: true,
        status: "error",
        message: beautifyJSON(errors)
      }))
      return true
    }

    if(!payload.lunch_break_start) {
      dispatch(HandleAlertAction({
          open: true,
          status: "error",
          message: "Lunch break time start is required!"
      }))
      return true
    }

    if(!payload.lunch_break_end) {
      dispatch(HandleAlertAction({
          open: true,
          status: "error",
          message: "Lunch break time end is required!"
      }))
        return true
    }
    return false
  }

  const hoursToMilliseconds = (hours:number) => hours * 60 * 60 * 1000;

  useEffect(()=>{
    if(SCHEDULESHIFTEditState.status){      
      if(SCHEDULESHIFTEditState.status === 'succeeded'){
        window.alert(`${SCHEDULESHIFTEditState.status.charAt(0).toUpperCase()}${SCHEDULESHIFTEditState.status.slice(1)}`)
        setTimeout(()=>{
          window.location.reload();
        }, 800)
      }else if (SCHEDULESHIFTEditState.status === 'failed'){

        dispatch(HandleAlertAction({
          open: true,
          status: "error",
          message: SCHEDULESHIFTEditState?.error
        }))
        // window.alert(`${SCHEDULESHIFTEditState.error}`)
        dispatch(SCHEDULESHIFTCreateActionFailureCleanup());
      }
    }
  }, [SCHEDULESHIFTEditState.status])

  const handleChangeTime = (name:string, value:any) => {
    setSingleSCHEDULESHIFTDetailsData(curr => ({
        ...curr,
        [name]: value
    }))
  }

  return (
    <Fragment>
      <Transition in={editSCHEDULESHIFTOpenModal} timeout={400}>
      {(state: string) => (
      <Modal
        open={!['exited', 'exiting'].includes(state)}
        onClose={() => {
          setEditSCHEDULESHIFTOpenModal(false);
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
              ...editSCHEDULESHIFTArea,
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
        <form onSubmit={editSCHEDULESHIFT}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Typography variant='h6' className='border-b-2 border-green-700'>Editing Schedule Shift</Typography>
              <div className='flex  flex-col gap-10 relative mt-4 p-4'>
                  <div className='flex gap-6 flex-col'>
                      {/* <FormControl>
                          <FormLabel id="demo-controlled-radio-buttons-group">Overtime</FormLabel>
                          <RadioGroup
                              row
                              aria-labelledby="demo-controlled-radio-buttons-group"
                              name="controlled-radio-buttons-group"
                              value={`${!!singleSCHEDULESHIFTDetailsData.with_overtime}`}
                              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                  const value = (event.target.value=== 'true' ? true : false);
                                  setSingleSCHEDULESHIFTDetailsData((prevState)=> {
                                      return (
                                          {
                                              ...prevState,
                                              with_overtime: value
                                          }
                                      )
                                  })
                              }}
                          >
                              <FormControlLabel value="true" control={<Radio />} label="With" />
                              <FormControlLabel value="false" control={<Radio />} label="Without" />
                          </RadioGroup>
                      </FormControl> */}
                      <TextField 
                        // sx={{width: '100%', border: "1px solid red"}} 
                        label='Grace Period(mins):'
                        type='number' 
                        value={(singleSCHEDULESHIFTDetailsData?.grace_period)}
                        onChange={(newValue)=> {
                          return (
                            setSingleSCHEDULESHIFTDetailsData((prevState:any) => {
                              const value = parseInt(newValue.target.value);
                              return (
                                {
                                  ...prevState,
                                  grace_period: value
                                }
                              )
                            })
                          )
                        }}  
                        variant='standard'
                      />

                  </div>
                  <div className='flex gap-5 flex-col'>
                      <TimePicker
                        label="Time In:"
                        value={dayjs(singleSCHEDULESHIFTDetailsData.time_in, "HH:mm:ss")}
                        // value={`${dayjs().format('YYYY-MM-DD')}T${(singleSCHEDULESHIFTDetailsData.time_in)}`}
                        onChange={(newValue) => {
                            const formattedDate = dayjs(newValue).format('HH:mm:ss');
                            return (
                              setSingleSCHEDULESHIFTDetailsData((prevState:any)=>{
                                    return(
                                        {
                                            ...prevState,
                                            time_in: formattedDate
                                        }
                                    )
                                })
                            )
                        }}
                      />
                      <TimePicker
                        label="Time Out:"
                        value={dayjs(singleSCHEDULESHIFTDetailsData.time_out, "HH:mm:ss")}
                        // value={`${dayjs().format('YYYY-MM-DD')}T${(singleSCHEDULESHIFTDetailsData.time_out)}`}
                        onChange={(newValue) => {
                            const formattedDate = dayjs(newValue).format('HH:mm:ss');
                            return (
                              setSingleSCHEDULESHIFTDetailsData((prevState:any)=>{
                                    return(
                                        {
                                            ...prevState,
                                            time_out: formattedDate
                                        }
                                    )
                                })
                            )
                        }}
                      />
                  </div>
                  <div>
                          <Typography >Lunch Break Time:</Typography><br></br>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <div className='flex gap-4'>
                              
                              <DesktopTimePicker 
                                  label="Time Start" 
                                  defaultValue={dayjs(singleSCHEDULESHIFTDetailsData?.lunch_break_start, "HH:mm:ss")} 
                                  minTime={singleSCHEDULESHIFTDetailsData?.time_in ? dayjs(singleSCHEDULESHIFTDetailsData.time_in, "HH:mm:ss"): null}
                                  maxTime={singleSCHEDULESHIFTDetailsData?.time_out ? dayjs(singleSCHEDULESHIFTDetailsData.time_out, "HH:mm:ss"): null}
                                  onChange={(newValue) => handleChangeTime("lunch_break_start", dayjs(newValue).format("HH:mm:ss"))}
                              />
                              <DesktopTimePicker 
                                  label="Time End" 
                                  defaultValue={dayjs(singleSCHEDULESHIFTDetailsData?.lunch_break_end, "HH:mm:ss")}
                                  minTime={singleSCHEDULESHIFTDetailsData?.lunch_break_start ? dayjs(singleSCHEDULESHIFTDetailsData?.lunch_break_start, "HH:mm:ss"): null}
                                  maxTime={singleSCHEDULESHIFTDetailsData?.time_out ? dayjs(singleSCHEDULESHIFTDetailsData.time_out, "HH:mm:ss"): null}
                                  disabled={!singleSCHEDULESHIFTDetailsData?.lunch_break_end}
                                  onChange={(newValue) => handleChangeTime("lunch_break_end", dayjs(newValue).format("HH:mm:ss"))}
                              />
                              
                          </div>
                          </LocalizationProvider>
                    </div>
                  <div className='flex gap-6 flex-col'>
                      <TextField 
                        sx={{width: '100%', minWidth: '160px'}} 
                        label='Shift Name:' 
                        value={singleSCHEDULESHIFTDetailsData?.name}  
                        variant='outlined'
                        onChange={(newValue)=> {
                          return (
                            setSingleSCHEDULESHIFTDetailsData((prevState) => {
                              const value = newValue.target.value;
                              return (
                                {
                                  ...prevState,
                                  name: value
                                }
                              )
                            })
                          )
                        }}
                      />
                      {/* <FormControl>
                          <FormLabel id="demo-controlled-radio-buttons-group">Night Shift</FormLabel>
                          <RadioGroup
                              row
                              aria-labelledby="demo-controlled-radio-buttons-group"
                              name="controlled-radio-buttons-group"
                              value={`${!!singleSCHEDULESHIFTDetailsData.is_night_shift}`}
                              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                  const value = (event.target.value=== 'true' ? true : false);
                                  setSingleSCHEDULESHIFTDetailsData((prevState)=> {
                                      return (
                                          {
                                              ...prevState,
                                              is_night_shift: value
                                          }
                                      )
                                  })
                              }}
                          >
                              <FormControlLabel value="true" control={<Radio />} label="Yes" />
                              <FormControlLabel value="false" control={<Radio />} label="No" />
                          </RadioGroup>
                      </FormControl> */}
                  </div>
              </div>
              <div className='flex flex-col justify-center items-center'>
                <div className='flex justify-center mt-6' container-name='leave_buttons_container'>
                    <div className='flex justify-between' style={{width:'200px', marginTop: '20px'}} container-name='leave_buttons'>
                        {/* <Button variant='contained' color={'success'} onClick={()=> onClickModal(1)}>Edit Cutoff Period</Button> */}
                        <Button variant={'contained'} onClick={editSCHEDULESHIFT}>Submit</Button>
                        <Button variant={'outlined'}>Cancel</Button>
                    </div>
                </div>
              </div>
            </LocalizationProvider>
          </form>
        </ModalDialog>
      </Modal>
        )}
      </Transition>
    </Fragment>
  );
}


// Styles
const editSCHEDULESHIFTArea = {
  // height: '98.5mm',
  maxWidth: '400px',
  margin: '0 auto',
  background: 'white',
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
};