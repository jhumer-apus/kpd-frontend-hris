import { useState, Fragment, Dispatch, SetStateAction } from 'react';
import { PAYROLLGROUPViewInterface } from '@/types/types-pages';
import { Button } from '@mui/material';
import dayjs from 'dayjs';
import {TextField} from '@mui/material';
// import ApprovePAYROLLGROUPModal from '../main-modals/inner-modals/approve-leave-modal';
import AllowedDaysPAYROLLGROUPModal from '../main-modals/inner-modals/edit-payrollgroup-modal';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';

interface PAYROLLGROUPModalUIInterface {
    singlePAYROLLGROUPDetailsData: PAYROLLGROUPViewInterface;
    multiplePayslipMode?: boolean;
    setSinglePAYROLLGROUPDetailsData: Dispatch<SetStateAction<PAYROLLGROUPViewInterface>>;
}

function PAYROLLGROUPModalUI(props: PAYROLLGROUPModalUIInterface) {
    const [ approvePAYROLLGROUPOpenModal, setApprovePAYROLLGROUPOpenModal ] = useState(false);
    const [ allowedDaysPAYROLLGROUPOpenModal, setAllowedDaysPAYROLLGROUPOpenModal ] = useState(false);
    const { setSinglePAYROLLGROUPDetailsData, singlePAYROLLGROUPDetailsData } = props;
    const ThisProps = props.singlePAYROLLGROUPDetailsData;
    const curr_user = useSelector((state: RootState)=> state.auth.employee_detail);
    const onClickModal = (mode: number) => {
        switch(mode){
            case 0: setApprovePAYROLLGROUPOpenModal(true);
            break;
            case 1: setAllowedDaysPAYROLLGROUPOpenModal(true);
            break;
        }   
        
    };

    return (
        <Fragment>
            <AllowedDaysPAYROLLGROUPModal singlePAYROLLGROUPDetailsData={singlePAYROLLGROUPDetailsData} setSinglePAYROLLGROUPDetailsData={setSinglePAYROLLGROUPDetailsData} allowedDaysPAYROLLGROUPOpenModal={allowedDaysPAYROLLGROUPOpenModal} setAllowedDaysPAYROLLGROUPOpenModal={setAllowedDaysPAYROLLGROUPOpenModal}/>
            <div className='flex overflow-auto justify-around gap-4 relative'>
                <div className='flex gap-3 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px'}} label='Payroll Group ID:' value={ThisProps.id ? ThisProps.id : '-'} InputProps={{readOnly: true,}} variant='filled'/>
                    <TextField sx={{width: '100%'}} label='Accounts Linked' value={(ThisProps?.used_account || "-")} InputProps={{readOnly: true,}} variant='standard'/>
                </div>
                <div className='flex gap-3 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px', color: 'green'}} label='Payroll Name' value={ThisProps.name || '-'} InputProps={{readOnly: true,}} variant='filled' focused/>
                    <TextField sx={{width: '100%'}} label='Date Added:' value={ThisProps.date_added? dayjs(ThisProps.date_added).format('MM-DD-YYYY - HH:mm a') : '-'} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%'}} label='Date Deactivated:' value={ThisProps.date_deleted? dayjs(ThisProps.date_deleted).format('MM-DD-YYYY - HH:mm a') : '-'} InputProps={{readOnly: true,}} variant='standard'/>
                </div>
                <div className='flex gap-3 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px'}} label='Pay Frequency(Per Month)' value={ThisProps.payroll_freq || '-'} InputProps={{readOnly: true,}} variant='filled'/>
                    <TextField sx={{width: '100%', minWidth: '160px'}} multiline rows={4} label='Description' value={ThisProps.payroll_description || '-'} InputProps={{readOnly: true,}} variant='outlined'/>
                </div>
            </div>
            <div className='flex flex-col justify-center items-center'>
                <div className='flex justify-center mt-6' container-name='leave_buttons_container'>
                    <div className='flex justify-between' style={{width:'200px', marginTop: '20px'}} container-name='leave_buttons'>
                        <Button variant='contained' onClick={()=> onClickModal(1)}>Edit Details</Button>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default PAYROLLGROUPModalUI;