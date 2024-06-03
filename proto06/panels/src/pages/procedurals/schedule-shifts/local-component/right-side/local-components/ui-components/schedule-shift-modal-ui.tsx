import { useState, Fragment, Dispatch, SetStateAction } from 'react';
import { SCHEDULESHIFTViewInterface } from '@/types/types-pages';
import { Button } from '@mui/material';
import dayjs from 'dayjs';
import {TextField} from '@mui/material';
import EditSCHEDULESHIFTModal from '../main-modals/inner-modals/edit-schedule-shift-modal';

interface SCHEDULESHIFTModalUIInterface {
    singleSCHEDULESHIFTDetailsData: SCHEDULESHIFTViewInterface;
    multiplePayslipMode?: boolean;
    setSingleSCHEDULESHIFTDetailsData: Dispatch<SetStateAction<SCHEDULESHIFTViewInterface>>;
}

function SCHEDULESHIFTModalUI(props: SCHEDULESHIFTModalUIInterface) {
    const [ approveSCHEDULESHIFTOpenModal, setApproveSCHEDULESHIFTOpenModal ] = useState(false);
    const [ editSCHEDULESHIFTOpenModal, setEditSCHEDULESHIFTOpenModal ] = useState(false);
    const { setSingleSCHEDULESHIFTDetailsData, singleSCHEDULESHIFTDetailsData } = props;
    const ThisProps = props.singleSCHEDULESHIFTDetailsData;
    const onClickModal = (mode: number) => {
        switch(mode){
            case 0: setApproveSCHEDULESHIFTOpenModal(true);
            break;
            case 1: setEditSCHEDULESHIFTOpenModal(true);
            break;
        }   
        
    };

    return (
        <Fragment>
            <EditSCHEDULESHIFTModal 
                singleSCHEDULESHIFTDetailsData={singleSCHEDULESHIFTDetailsData} 
                setSingleSCHEDULESHIFTDetailsData={setSingleSCHEDULESHIFTDetailsData} 
                editSCHEDULESHIFTOpenModal={editSCHEDULESHIFTOpenModal} 
                setEditSCHEDULESHIFTOpenModal={setEditSCHEDULESHIFTOpenModal}
            />
            <div className='flex gap-10 overflow-auto relative'>
                <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px'}} label='Overtime:' value={ThisProps.with_overtime ? 'With Overtime' : 'No Overtime'} InputProps={{readOnly: false,}} variant='filled'/>
                    <TextField sx={{width: '100%'}} label='Grace Period(mins):' value={(ThisProps?.grace_period || 0)} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%'}} label='Night Shift:' value={(ThisProps?.is_night_shift ? 'Yes' : 'No')} InputProps={{readOnly: true,}} variant='standard'/>
                </div>
                <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px', color: 'green'}} label='Shift ID' value={ThisProps.id || 'No Shift ID'} InputProps={{readOnly: true,}} variant='filled' focused/>
                    <TextField sx={{width: '100%'}} label='Time In:' value={ThisProps.time_in? dayjs(ThisProps.time_in, "HH:mm:ss").format('hh:mm a') : '-'} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%'}} label='Time Out:' value={ThisProps.time_out? dayjs(ThisProps.time_out, "HH:mm:ss").format('hh:mm a') : '-'} InputProps={{readOnly: true,}} variant='standard'/>
                </div>
                <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px'}} label='Shift Name:' value={ThisProps.name || '-'} InputProps={{readOnly: true,}} variant='filled'/>
                    <TextField sx={{width: '100%'}} label='Date Deleted:' value={ThisProps.date_deleted? dayjs(ThisProps.date_deleted).format('MM:DD:YYYY - hh:mm a') : '-'} InputProps={{readOnly: true,}} variant='standard'/>
                </div>
            </div>
            <div className='flex flex-col justify-center items-center'>
            <div className='flex justify-center mt-6' container-name='leave_buttons_container'>
                <div className='flex justify-between' style={{width:'200px', marginTop: '20px'}} container-name='leave_buttons'>
                    <Button variant='contained' onClick={()=> onClickModal(1)}>Edit Schedule Shift</Button>
                </div>
            </div>
            </div>
        </Fragment>
    );
}

export default SCHEDULESHIFTModalUI;