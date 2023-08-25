import { useState, Fragment, Dispatch, SetStateAction } from 'react';
import { LEAVECREDITViewInterface } from '@/types/types-pages';
import { Button } from '@mui/material';
import dayjs from 'dayjs';
import {TextField} from '@mui/material';
import ApproveLEAVECREDITModal from '../main-modals/inner-modals/approve-leave-modal';
import AllowedDaysLEAVECREDITModal from '../main-modals/inner-modals/leave-credit-allowed-days-modal';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';

interface LEAVECREDITModalUIInterface {
    singleLEAVECREDITDetailsData: LEAVECREDITViewInterface;
    multiplePayslipMode?: boolean;
    setSingleLEAVECREDITDetailsData: Dispatch<SetStateAction<LEAVECREDITViewInterface>>;
}

function LEAVECREDITModalUI(props: LEAVECREDITModalUIInterface) {
    const [ approveLEAVECREDITOpenModal, setApproveLEAVECREDITOpenModal ] = useState(false);
    const [ allowedDaysLEAVECREDITOpenModal, setAllowedDaysLEAVECREDITOpenModal ] = useState(false);
    const { setSingleLEAVECREDITDetailsData, singleLEAVECREDITDetailsData } = props;
    const ThisProps = props.singleLEAVECREDITDetailsData;
    const curr_user = useSelector((state: RootState)=> state.auth.employee_detail);
    const onClickModal = (mode: number) => {
        switch(mode){
            case 0: setApproveLEAVECREDITOpenModal(true);
            break;
            case 1: setAllowedDaysLEAVECREDITOpenModal(true);
            break;
        }   
        
    };

    return (
        <Fragment>
            <AllowedDaysLEAVECREDITModal singleLEAVECREDITDetailsData={singleLEAVECREDITDetailsData} setSingleLEAVECREDITDetailsData={setSingleLEAVECREDITDetailsData} allowedDaysLEAVECREDITOpenModal={allowedDaysLEAVECREDITOpenModal} setAllowedDaysLEAVECREDITOpenModal={setAllowedDaysLEAVECREDITOpenModal}/>
            <div className='flex gap-10 overflow-auto relative'>
                <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px'}} label='Expiry Date:' value={ThisProps.expiry ? dayjs(ThisProps.expiry).format('MM-DD-YYYY') : '-'} InputProps={{readOnly: false,}} variant='filled'/>
                    <TextField sx={{width: '100%'}} label='Credit Used:' value={(ThisProps?.credit_used || 0).toFixed(2)} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%'}} label='Credit Remaining:' value={(ThisProps?.credit_remaining || 0).toFixed(2)} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%'}} label='Converted To Cash:' value={ThisProps.is_converted === true ? 'Converted' : 'Not Converted Yet'} InputProps={{readOnly: true,}} variant='standard'/>
                </div>
                <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px', color: 'green'}} label='Leave Name' value={ThisProps.leave_name || 'No Leave Name'} InputProps={{readOnly: true,}} variant='filled' focused/>
                    <TextField sx={{width: '100%'}} label='Date Added:' value={ThisProps.date_added? dayjs(ThisProps.date_added).format('MM-DD-YYYY - HH:mm a') : '-'} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%'}} label='Date Deactivated:' value={ThisProps.date_deleted? dayjs(ThisProps.date_deleted).format('MM-DD-YYYY - HH:mm a') : '-'} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%'}} label='Allowed Days' value={(ThisProps.allowed_days || 0).toFixed(2)} focused={!!ThisProps.allowed_days} color={(ThisProps.allowed_days || 0) > 1? 'success' : 'warning'} InputProps={{readOnly: true,}} variant='standard'/>
                </div>
                <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px'}} label='Employee #:' value={ThisProps.emp_no || '-'} InputProps={{readOnly: true,}} variant='filled'/>
                    <TextField sx={{width: '100%', minWidth: '160px'}} label='LEAVECREDIT Type:' value={ThisProps.leave_type_code || '-'} InputProps={{readOnly: true,}} variant='standard'/>
                </div>
            </div>
            <div className='flex flex-col justify-center items-center'>
            <div className='flex justify-center mt-6' container-name='leave_buttons_container'>
                <div className='flex justify-between' style={{width:'200px', marginTop: '20px'}} container-name='leave_buttons'>
                    <Button variant='contained' onClick={()=> onClickModal(1)}>Apply Allowed Days</Button>
                </div>
                
            </div>
            </div>
        </Fragment>
    );
}

export default LEAVECREDITModalUI;