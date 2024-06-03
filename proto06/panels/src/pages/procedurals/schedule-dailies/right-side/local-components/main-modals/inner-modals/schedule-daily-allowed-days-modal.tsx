import {useEffect, Dispatch, SetStateAction, useState, Fragment, CSSProperties}from 'react';
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
import { DatePicker } from '@mui/x-date-pickers';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import SCHEDULESHIFTFetchAutoCompleteOnSCHEDULEDAILYEditPage from './schedule-shift-autocomplete/schedule-shift-autocomplete';


import { Box } from '@mui/material';
import { CircularProgress } from '@mui/material';

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
  const [ circular, setCircular ] = useState({
    show: true,
    transition: true,
  });
  const CircularProgressStyle: CSSProperties = {
    display: circular.show? 'flex' : 'none', 
    zIndex: "999", 
    position: "absolute", 
    top: "0", 
    left: "0", 
    background: "white", 
    height: "100%", 
    width: "100%", 
    opacity: circular.transition? '1': '0', 
    transition: 'opacity 0.5s ease',
  };

  const [ initialEditState, setInitialEditState ] = useState<SCHEDULEDAILYEditInterface>(
    {
      id: singleSCHEDULEDAILYDetailsData.id,
      business_date: singleSCHEDULEDAILYDetailsData.business_date,
      is_restday: singleSCHEDULEDAILYDetailsData.is_restday,
      emp_no: singleSCHEDULEDAILYDetailsData.emp_no,
      schedule_shift_code: singleSCHEDULEDAILYDetailsData.schedule_shift_code?.id ?? 0,
      sched_default: singleSCHEDULEDAILYDetailsData.sched_default,
    }
  );

  const nullValues = Object.values(singleSCHEDULEDAILYDetailsData).filter(
    value => typeof value === null
  );

  const allowedDaysSCHEDULEDAILY = () => { 
    dispatch(SCHEDULEDAILYEditAction(initialEditState))
  };

  useEffect(()=>{
    if(SCHEDULEDAILYAllowedDaysState.status){      
      if(SCHEDULEDAILYAllowedDaysState.status === 'succeeded'){
        window.alert(`${SCHEDULEDAILYAllowedDaysState.status.charAt(0).toUpperCase()}${SCHEDULEDAILYAllowedDaysState.status.slice(1)}`)
        setTimeout(()=>{
          window.location.reload();
        }, 400)
      }else if (SCHEDULEDAILYAllowedDaysState.status === 'failed'){
        window.alert(`${SCHEDULEDAILYAllowedDaysState.error}`)
        dispatch(SCHEDULEDAILYCreateActionFailureCleanup());
      }
    };

    if(SCHEDULEDAILYAllowedDaysState.status === 'loading' || SCHEDULEDAILYAllowedDaysState.status === 'succeeded'){
      return
    } else {
      setInitialEditState({
        id: singleSCHEDULEDAILYDetailsData.id,
        business_date: singleSCHEDULEDAILYDetailsData.business_date,
        is_restday: singleSCHEDULEDAILYDetailsData.is_restday,
        emp_no: singleSCHEDULEDAILYDetailsData.emp_no,
        schedule_shift_code: singleSCHEDULEDAILYDetailsData.schedule_shift_code?.id || 0,
        sched_default: singleSCHEDULEDAILYDetailsData.sched_default,
      });
    };
  }, [SCHEDULEDAILYAllowedDaysState.status, singleSCHEDULEDAILYDetailsData]);


  useEffect(()=> {

    setTimeout(()=> {
      setCircular((prevState) => ({
        ...prevState,
        show: false
      }));
    }, 2600);
    setTimeout(()=> {
      setCircular((prevState) => ({
        ...prevState,
        transition: false
      }));
    }, 2000);

    return(()=>{
      setCircular(() => ({
        show: true,
        transition: true
      }));
    })

  }, [allowedDaysSCHEDULEDAILYOpenModal])

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
              <div>
                {/* <Box sx={CircularProgressStyle}>
                    <span style={{marginLeft: "50%", marginTop: "20%"}}><CircularProgress /></span>
                </Box> */}
                <div className='flex flex-col gap-10 overflow-auto relative mt-4 p-4'>
                    <DatePicker
                      label="Business Date:"
                      value={dayjs(initialEditState.business_date)}
                      onChange={(newValue) => {
                          const formattedDate = dayjs(newValue).format('YYYY-MM-DDTHH:mm:ss');
                          return (
                            setInitialEditState((prevState)=> {
                              return (
                                {
                                  ...prevState,
                                  business_date: formattedDate,
                                }
                              )
                            })
                          )
                      }}
                    />
                    <SCHEDULESHIFTFetchAutoCompleteOnSCHEDULEDAILYEditPage createSCHEDULEDAILYEdit={initialEditState} setSCHEDULEDAILYEdit={setInitialEditState}/>
                    <FormControl>
                        <FormLabel id="demo-controlled-radio-buttons-group">Is Restday</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={`${initialEditState.is_restday}`}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = (event.target.value=== 'true' ? true : false);
                                setInitialEditState((prevState)=> {
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
                    {/* <TextField 
                      sx={{width: '100%'}} 
                      label='Shift Code:'
                      value={(initialEditState.schedule_shift_code)}
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
                    /> */}
                </div>
                <div className='flex flex-col justify-center items-center'>
                  <div className='flex justify-center mt-6' container-name='leave_buttons_container'>
                      <div className='flex justify-between' style={{width:'200px', marginTop: '20px'}} container-name='leave_buttons'>
                          <Button variant={'contained'} onClick={allowedDaysSCHEDULEDAILY}>Submit</Button>
                          <Button variant={'outlined'} onClick={()=>{setAllowedDaysSCHEDULEDAILYOpenModal(false)}}>Cancel</Button>
                      </div>
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
  height: '128.5mm',
  width: '120mm',
  margin: '0 auto',
  background: 'white',
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
};


