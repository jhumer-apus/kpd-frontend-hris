import { useState, Fragment, Dispatch, SetStateAction } from 'react';
import { SCHEDULEDAILYViewInterface } from '@/types/types-pages';
import { Button, Typography } from '@mui/material';
import dayjs from 'dayjs';
import {TextField} from '@mui/material';
import AllowedDaysSCHEDULEDAILYModal from '../main-modals/inner-modals/schedule-daily-allowed-days-modal';
import { DesktopTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

interface SCHEDULEDAILYModalUIInterface {
    singleSCHEDULEDAILYDetailsData: SCHEDULEDAILYViewInterface;
    multiplePayslipMode?: boolean;
    setSingleSCHEDULEDAILYDetailsData: Dispatch<SetStateAction<SCHEDULEDAILYViewInterface>>;
}

function SCHEDULEDAILYModalUI(props: SCHEDULEDAILYModalUIInterface) {
    const [ approveSCHEDULEDAILYOpenModal, setApproveSCHEDULEDAILYOpenModal ] = useState(false);
    const [ allowedDaysSCHEDULEDAILYOpenModal, setAllowedDaysSCHEDULEDAILYOpenModal ] = useState(false);
    const { setSingleSCHEDULEDAILYDetailsData, singleSCHEDULEDAILYDetailsData } = props;
    const ThisProps = props.singleSCHEDULEDAILYDetailsData;
    const onClickModal = (mode: number) => {
        switch(mode){
            case 0: setApproveSCHEDULEDAILYOpenModal(true);
            break;
            case 1: setAllowedDaysSCHEDULEDAILYOpenModal(true);
            break;
        }
    };


    return (
        <Fragment>
            { singleSCHEDULEDAILYDetailsData &&
                <AllowedDaysSCHEDULEDAILYModal 
                    singleSCHEDULEDAILYDetailsData={singleSCHEDULEDAILYDetailsData} 
                    setSingleSCHEDULEDAILYDetailsData={setSingleSCHEDULEDAILYDetailsData} 
                    allowedDaysSCHEDULEDAILYOpenModal={allowedDaysSCHEDULEDAILYOpenModal} 
                    setAllowedDaysSCHEDULEDAILYOpenModal={setAllowedDaysSCHEDULEDAILYOpenModal}
                />
            }
            <div className='flex flex-col gap-8 overflow-auto relative'>
                <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px'}} label='Business Date:' value={ThisProps.business_date ? dayjs(ThisProps.business_date).format('MM-DD-YYYY') : '-'} InputProps={{readOnly: false,}} variant='filled'/>
                    <TextField sx={{width: '100%'}} label='Employee Number:' value={(ThisProps?.emp_no || 0)} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%'}} label='Is Restday:' value={(ThisProps?.is_restday === true ? 'Yes' : 'No')} InputProps={{readOnly: true,}} variant='standard'/>
                </div>
                <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px', color: 'green'}} label='Shift ID' value={ThisProps.id || 'No Shift ID'} InputProps={{readOnly: true,}} variant='filled' focused/>
                    <TextField sx={{width: '100%'}} label='Time In:' value={ThisProps?.schedule_shift_code?.time_in? dayjs(ThisProps?.schedule_shift_code?.time_in, "HH:mm:ss").format('hh:mm a') : 'Rest Day'} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%'}} label='Time Out:' value={ThisProps?.schedule_shift_code?.time_out? dayjs(ThisProps?.schedule_shift_code?.time_out, "HH:mm:ss").format('hh:mm a') : 'Rest Day'} InputProps={{readOnly: true,}} variant='standard'/>
                </div>
                <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px'}} label='Shift Name:' value={ThisProps.schedule_shift_code?.name || 'No Schedule'} InputProps={{readOnly: true,}} variant='filled'/>
                    <TextField sx={{width: '100%'}} label='Is Processed:' value={ThisProps.is_processed === true ? 'Yes' : 'No'} InputProps={{readOnly: true,}} variant='standard'/>

                </div>

                <div>
                    <Typography >Lunch Break Time:</Typography><br></br>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <div className='flex gap-4'>
                        
                        <DesktopTimePicker 
                            label="Time Start" 
                            defaultValue={ThisProps.schedule_shift_code?.lunch_break_start ? dayjs(ThisProps.schedule_shift_code.lunch_break_start, "HH:mm:ss"): ""} 
                            minTime={ThisProps.schedule_shift_code?.time_in ? dayjs(ThisProps.schedule_shift_code.time_in, 'HH:mm:ss'): null}
                            maxTime={ThisProps.schedule_shift_code?.time_out ? dayjs(ThisProps.schedule_shift_code.time_out, 'HH:mm:ss'): null}
                            // onChange={(newValue) => handleChangeTime("lunch_break_start", dayjs(newValue).format("HH:mm:ss"))}
                            disabled
    
                        />
                        <DesktopTimePicker 
                            label="Time End" 
                            defaultValue={ThisProps.schedule_shift_code?.lunch_break_end? dayjs(ThisProps.schedule_shift_code.lunch_break_end, "HH:mm:ss"): ""}
                            minTime={ThisProps.lunch_break_start ? dayjs(ThisProps.lunch_break_start): null}
                            maxTime={ThisProps.schedule_shift_code?.time_out ? dayjs(ThisProps.schedule_shift_code.time_out, "HH:mm:ss"): null}
                            disabled
                            // onChange={(newValue) => handleChangeTime("lunch_break_end", dayjs(newValue).format("HH:mm:ss"))}
                        />
                        
                    </div>
                    </LocalizationProvider>
                </div>
            </div>
            <div className='flex flex-col justify-center items-center'>
            <div className='flex justify-center mt-12' container-name='leave_buttons_container'>
                <div className='flex justify-between' style={{width:'200px', marginTop: '20px'}} container-name='leave_buttons'>
                    <Button variant='contained' onClick={()=> onClickModal(1)}>Edit Daily Schedule</Button>
                </div>
            </div>
            </div>
        </Fragment>
    );
}

export default SCHEDULEDAILYModalUI;