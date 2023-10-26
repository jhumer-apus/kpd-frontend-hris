import { useState, Fragment, Dispatch, SetStateAction } from 'react';
import { ANNOUNCEMENTViewInterface } from '@/types/types-payroll-eoy';
import { Button } from '@mui/material';
import {TextField} from '@mui/material';
import EditANNOUNCEMENTModal from '../main-modals/inner-modals/edit-announcement-modal';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import dayjs from 'dayjs';
import MultiDepartmentAutoCompleteRight from './autocomplete.tsx/multiple-departments-choose-modal';

interface ANNOUNCEMENTModalUIInterface {
    singleANNOUNCEMENTDetailsData: ANNOUNCEMENTViewInterface;
    multiplePayslipMode?: boolean;
    setSingleANNOUNCEMENTDetailsData: Dispatch<SetStateAction<ANNOUNCEMENTViewInterface>>;
}

function ANNOUNCEMENTModalUI(props: ANNOUNCEMENTModalUIInterface) {
    const [ resetPasswordANNOUNCEMENTOpenModal, setResetPasswordANNOUNCEMENTOpenModal ] = useState(false);
    const [ editANNOUNCEMENTOpenModal, setEditANNOUNCEMENTOpenModal ] = useState(false);
    const { setSingleANNOUNCEMENTDetailsData, singleANNOUNCEMENTDetailsData } = props;
    const ThisProps = props.singleANNOUNCEMENTDetailsData;
    const curr_user = useSelector((state: RootState)=> state.auth.employee_detail);
    const onClickModal = (mode: number) => {
        switch(mode){
            case 0: setResetPasswordANNOUNCEMENTOpenModal(true);
            break;
            case 1: setEditANNOUNCEMENTOpenModal(true);
            break;
        }   
        
    };

    return (
        <Fragment>
            <EditANNOUNCEMENTModal singleANNOUNCEMENTDetailsData={singleANNOUNCEMENTDetailsData} setSingleANNOUNCEMENTDetailsData={setSingleANNOUNCEMENTDetailsData} editANNOUNCEMENTOpenModal={editANNOUNCEMENTOpenModal} setEditANNOUNCEMENTOpenModal={setEditANNOUNCEMENTOpenModal}/>
            <div className='flex overflow-auto justify-around gap-4 relative'>
                <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px'}} label='Announcement ID:' value={ThisProps.id ? ThisProps.id : '-'} InputProps={{readOnly: true,}} variant='filled'/>
                    <TextField sx={{width: '100%'}} label='Message:' multiline rows={5} value={(ThisProps?.message ? `${ThisProps?.message}` : '-')} InputProps={{readOnly: true,}} variant='outlined'/>
                </div>
                <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px', color: 'green'}} label='Order By Number:' value={ThisProps.order_by_no || '-'} InputProps={{readOnly: true,}} variant='filled' focused/>
                    <TextField sx={{width: '100%'}} label='Date Added:' value={ThisProps.date_added? dayjs(ThisProps.date_added).format('MM-DD-YYYY - HH:mm a') : '-'} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%'}} label='Is Posted:' value={ThisProps.is_posted? 'Yes' : 'No'} InputProps={{readOnly: true,}} variant='standard'/>
                </div>
                <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px'}} label='Created By Emp #:' value={ThisProps.emp_no || '-'} InputProps={{readOnly: true,}} variant='filled'/>
                    <TextField sx={{width: '100%'}} label='Date Posted:' value={ThisProps.date_posted? dayjs(ThisProps.date_posted).format('MM-DD-YYYY - HH:mm a') : '-'} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%'}} label='Expiry Date:' value={ThisProps.expiry_date? dayjs(ThisProps.expiry_date).format('MM-DD-YYYY - HH:mm a') : '-'} InputProps={{readOnly: true,}} variant='standard'/>
                    {/* <MultiDepartmentAutoCompleteRight viewANNOUNCEMENT={singleANNOUNCEMENTDetailsData} setViewANNOUNCEMENT={setSingleANNOUNCEMENTDetailsData}/> */}
                </div>
            </div>
            <div className='flex flex-col justify-center items-center'>
                <div className='flex justify-center mt-6' container-name='leave_buttons_container'>
                    <div className='flex justify-center' style={{width:'400px', marginTop: '20px'}} container-name='leave_buttons'>
                        <Button variant='contained' onClick={()=> onClickModal(1)}>Edit Details</Button>
                        {/* <Button variant='outlined' color={'error'} onClick={()=> onClickModal(0)}>Reset Password</Button> */}
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default ANNOUNCEMENTModalUI;