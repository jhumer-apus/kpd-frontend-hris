import { useState, Fragment, Dispatch, SetStateAction } from 'react';
import { USERViewInterface } from '@/types/types-pages';
import { Button } from '@mui/material';
import dayjs from 'dayjs';
import {TextField} from '@mui/material';
import EditUSERModal from '../main-modals/inner-modals/edit-users-modal';
import ResetPasswordUSERModal from '../main-modals/inner-modals/reset-password-users-modal';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';

interface USERModalUIInterface {
    singleUSERDetailsData: USERViewInterface;
    multiplePayslipMode?: boolean;
    setSingleUSERDetailsData: Dispatch<SetStateAction<USERViewInterface>>;
}

function USERModalUI(props: USERModalUIInterface) {
    const [ resetPasswordUSEROpenModal, setResetPasswordUSEROpenModal ] = useState(false);
    const [ editUSEROpenModal, setEditUSEROpenModal ] = useState(false);
    const { setSingleUSERDetailsData, singleUSERDetailsData } = props;
    const ThisProps = props.singleUSERDetailsData;
    const curr_user = useSelector((state: RootState)=> state.auth.employee_detail);
    const onClickModal = (mode: number) => {
        switch(mode){
            case 0: setResetPasswordUSEROpenModal(true);
            break;
            case 1: setEditUSEROpenModal(true);
            break;
        }   
        
    };

    return (
        <Fragment>
            <EditUSERModal singleUSERDetailsData={singleUSERDetailsData} setSingleUSERDetailsData={setSingleUSERDetailsData} editUSEROpenModal={editUSEROpenModal} setEditUSEROpenModal={setEditUSEROpenModal}/>
            <ResetPasswordUSERModal primaryKey={ThisProps.id} resetPasswordUSEROpenModal={resetPasswordUSEROpenModal} setResetPasswordUSEROpenModal={setResetPasswordUSEROpenModal}/>
            <div className='flex overflow-auto justify-around gap-4 relative'>
                <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px'}} label='Primary Key (ID):' value={ThisProps.id ? ThisProps.id : '-'} InputProps={{readOnly: true,}} variant='filled'/>
                    <TextField sx={{width: '100%'}} label='Role #:' value={(ThisProps?.role || "-")} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%'}} label='Is Active:' value={(ThisProps?.is_active? "Yes" : "No")} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%'}} label='Is Logged In:' value={(ThisProps?.is_logged_in? "Yes" : "No")} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%'}} label='Old Password:' value={(ThisProps?.old_password || "-" )} InputProps={{readOnly: true,}} variant='standard'/>

                </div>
                <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px', color: 'green'}} label='Username' value={ThisProps.username || '-'} InputProps={{readOnly: true,}} variant='filled' focused/>
                    <TextField sx={{width: '100%'}} label='Date Added:' value={ThisProps.date_added? dayjs(ThisProps.date_added).format('MM-DD-YYYY - HH:mm a') : '-'} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%'}} label='Last Login:' value={ThisProps.last_login? dayjs(ThisProps.last_login).format('MM-DD-YYYY - HH:mm a') : '-'} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%'}} label='Is Locked:' value={ThisProps.is_locked?  "Yes" : "No" } InputProps={{readOnly: true,}} variant='standard'/>
                </div>
                <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px'}} label='Employee #:' value={ThisProps.emp_no || '-'} InputProps={{readOnly: true,}} variant='filled'/>
                    <TextField sx={{width: '100%'}} label='Date Deactivated:' value={ThisProps.date_deleted? dayjs(ThisProps.date_deleted).format('MM-DD-YYYY - HH:mm a') : '-'} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%'}} label='Date Password Changed:' value={ThisProps.date_password_changed? dayjs(ThisProps.date_password_changed).format('MM-DD-YYYY - HH:mm a') : '-'} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%'}} label='Failed Login Attempts:' value={ThisProps.failed_login_attempts || '0'} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%'}} label='Is Superuser:' value={ThisProps.is_superuser? "Yes" : "No"} InputProps={{readOnly: true,}} variant='standard'/>
                </div>
            </div>
            <div className='flex flex-col justify-center items-center'>
                <div className='flex justify-center mt-6' container-name='leave_buttons_container'>
                    <div className='flex justify-between' style={{width:'400px', marginTop: '20px'}} container-name='leave_buttons'>
                        <Button variant='contained' onClick={()=> onClickModal(1)}>Edit Details</Button>
                        <Button variant='outlined' color={'error'} onClick={()=> onClickModal(0)}>Reset Password</Button>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default USERModalUI;