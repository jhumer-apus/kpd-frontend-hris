import { Fragment, Dispatch, SetStateAction } from 'react';
import { SCHEDULEDAILYViewInterface } from '@/types/types-pages';
import dayjs from 'dayjs';
import {TextField} from '@mui/material';
interface SCHEDULEDAILYModalUIInterface {
    singleSCHEDULEDAILYDetailsData: SCHEDULEDAILYViewInterface;
    multiplePayslipMode?: boolean;
    setSingleSCHEDULEDAILYDetailsData: Dispatch<SetStateAction<SCHEDULEDAILYViewInterface>>;
}

function SCHEDULEDAILYModalUI(props: SCHEDULEDAILYModalUIInterface) {
    const ThisProps = props.singleSCHEDULEDAILYDetailsData;

    return (
        <Fragment>
            <div className='flex gap-10 overflow-auto relative'>
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
            </div>
        </Fragment>
    );
}

export default SCHEDULEDAILYModalUI;