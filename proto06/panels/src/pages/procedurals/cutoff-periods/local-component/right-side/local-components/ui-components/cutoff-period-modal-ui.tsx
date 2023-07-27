import { useState, Fragment, Dispatch, SetStateAction } from 'react';
import { CUTOFFPERIODViewInterface } from '@/types/types-pages';
import { Button } from '@mui/material';
import dayjs from 'dayjs';
import {TextField} from '@mui/material';
import ApproveCUTOFFPERIODModal from '../main-modals/inner-modals/leave-credit-allowed-days-modal';
import AllowedDaysCUTOFFPERIODModal from '../main-modals/inner-modals/leave-credit-allowed-days-modal';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';

interface CUTOFFPERIODModalUIInterface {
    singleCUTOFFPERIODDetailsData: CUTOFFPERIODViewInterface;
    multiplePayslipMode?: boolean;
    setSingleCUTOFFPERIODDetailsData: Dispatch<SetStateAction<CUTOFFPERIODViewInterface>>;
}

function CUTOFFPERIODModalUI(props: CUTOFFPERIODModalUIInterface) {
    const [ approveCUTOFFPERIODOpenModal, setApproveCUTOFFPERIODOpenModal ] = useState(false);
    const [ allowedDaysCUTOFFPERIODOpenModal, setAllowedDaysCUTOFFPERIODOpenModal ] = useState(false);
    const { setSingleCUTOFFPERIODDetailsData, singleCUTOFFPERIODDetailsData } = props;
    const ThisProps = props.singleCUTOFFPERIODDetailsData;
    const curr_user = useSelector((state: RootState)=> state.auth.employee_detail);
    const onClickModal = (mode: number) => {
        switch(mode){
            case 0: setApproveCUTOFFPERIODOpenModal(true);
            break;
            case 1: setAllowedDaysCUTOFFPERIODOpenModal(true);
            break;
        }   
        
    };

    return (
        <Fragment>
            <AllowedDaysCUTOFFPERIODModal 
                singleCUTOFFPERIODDetailsData={singleCUTOFFPERIODDetailsData} 
                setSingleCUTOFFPERIODDetailsData={setSingleCUTOFFPERIODDetailsData} 
                allowedDaysCUTOFFPERIODOpenModal={allowedDaysCUTOFFPERIODOpenModal} 
                setAllowedDaysCUTOFFPERIODOpenModal={setAllowedDaysCUTOFFPERIODOpenModal}
            />
            <div className='flex gap-10 overflow-auto relative'>
                <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px'}} label='Credit (Pay) Date:' value={ThisProps.credit_date ? dayjs(ThisProps.credit_date).format('MM-DD-YYYY') : '-'} InputProps={{readOnly: false,}} variant='filled'/>
                    <TextField sx={{width: '100%'}} label='Payroll Group Code:' value={(ThisProps?.payroll_group_code || 0)} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%'}} label='Division Code:' value={(ThisProps?.division_code || 0)} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%'}} label='Processed:' value={ThisProps.co_is_processed === true ? 'Yes' : 'No'} InputProps={{readOnly: true,}} variant='standard'/>
                </div>
                <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px', color: 'green'}} label='Cutoff Code ID' value={ThisProps.id || 'No Cutoff Period ID'} InputProps={{readOnly: true,}} variant='filled' focused/>
                    <TextField sx={{width: '100%'}} label='Date Range From:' value={ThisProps.co_date_from? dayjs(ThisProps.co_date_from).format('MM-DD-YYYY - HH:mm a') : '-'} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%'}} label='Date Range Until:' value={ThisProps.co_date_to? dayjs(ThisProps.co_date_to).format('MM-DD-YYYY - HH:mm a') : '-'} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%'}} label='# of Regular (Non-Holiday) days' value={(ThisProps.reg_days_total || 0)} focused={!!ThisProps.reg_days_total} color={(ThisProps.reg_days_total || 0) > 1? 'success' : 'warning'} InputProps={{readOnly: true,}} variant='standard'/>
                </div>
                <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px'}} label='Cutoff Name:' value={ThisProps.co_name || '-'} InputProps={{readOnly: true,}} variant='filled'/>
                    <TextField sx={{width: '100%', minWidth: '160px'}} label='Cutoff Period Description' value={ThisProps.co_description || '-'} multiline rows={4} InputProps={{readOnly: true,}} variant='outlined'/>
                </div>
            </div>
            <div className='flex flex-col justify-center items-center'>
            <div className='flex justify-center mt-6' container-name='leave_buttons_container'>
                <div className='flex justify-between' style={{width:'200px', marginTop: '20px'}} container-name='leave_buttons'>
                    <Button variant='contained' onClick={()=> onClickModal(1)}>Edit Cutoff Period</Button>
                </div>
            </div>
            </div>
        </Fragment>
    );
}

export default CUTOFFPERIODModalUI;