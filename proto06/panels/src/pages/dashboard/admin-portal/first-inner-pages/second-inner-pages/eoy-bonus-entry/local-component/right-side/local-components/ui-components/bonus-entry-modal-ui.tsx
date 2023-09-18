import { useState, Fragment, Dispatch, SetStateAction } from 'react';
import { BONUSENTRYViewInterface } from '@/types/types-payroll-eoy';
import { Button } from '@mui/material';
import {TextField} from '@mui/material';
import EditBONUSENTRYModal from '../main-modals/inner-modals/edit-bonus-entry-modal';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import dayjs from 'dayjs';

interface BONUSENTRYModalUIInterface {
    singleBONUSENTRYDetailsData: BONUSENTRYViewInterface;
    multiplePayslipMode?: boolean;
    setSingleBONUSENTRYDetailsData: Dispatch<SetStateAction<BONUSENTRYViewInterface>>;
}

function BONUSENTRYModalUI(props: BONUSENTRYModalUIInterface) {
    const [ resetPasswordBONUSENTRYOpenModal, setResetPasswordBONUSENTRYOpenModal ] = useState(false);
    const [ editBONUSENTRYOpenModal, setEditBONUSENTRYOpenModal ] = useState(false);
    const { setSingleBONUSENTRYDetailsData, singleBONUSENTRYDetailsData } = props;
    const ThisProps = props.singleBONUSENTRYDetailsData;
    const curr_user = useSelector((state: RootState)=> state.auth.employee_detail);
    const onClickModal = (mode: number) => {
        switch(mode){
            case 0: setResetPasswordBONUSENTRYOpenModal(true);
            break;
            case 1: setEditBONUSENTRYOpenModal(true);
            break;
        }   
        
    };

    return (
        <Fragment>
            <EditBONUSENTRYModal singleBONUSENTRYDetailsData={singleBONUSENTRYDetailsData} setSingleBONUSENTRYDetailsData={setSingleBONUSENTRYDetailsData} editBONUSENTRYOpenModal={editBONUSENTRYOpenModal} setEditBONUSENTRYOpenModal={setEditBONUSENTRYOpenModal}/>
            {/* <ResetPasswordBONUSENTRYModal primaryKey={ThisProps.id} resetPasswordBONUSENTRYOpenModal={resetPasswordBONUSENTRYOpenModal} setResetPasswordBONUSENTRYOpenModal={setResetPasswordBONUSENTRYOpenModal}/> */}
            <div className='flex overflow-auto justify-around gap-4 relative'>
                <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px'}} label='Bonus Code:' value={ThisProps.bonus_code ? ThisProps.bonus_code : '-'} InputProps={{readOnly: true,}} variant='filled'/>
                    <TextField sx={{width: '100%'}} label='Is Applied:' value={(ThisProps?.is_applied ? `Yes` : `No`)} InputProps={{readOnly: true,}} variant='standard'/>
                </div>
                <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px', color: 'green'}} label='Cutoff Code:' value={ThisProps.cutoff_code || '-'} InputProps={{readOnly: true,}} variant='filled' focused/>
                    <TextField sx={{width: '100%'}} label='Date Added:' value={ThisProps.date_added? dayjs(ThisProps.date_added).format('MM-DD-YYYY - HH:mm a') : '-'} InputProps={{readOnly: true,}} variant='standard'/>
                </div>
                <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px'}} label='Employee #:' value={ThisProps.emp_no || '-'} InputProps={{readOnly: true,}} variant='filled'/>
                    <TextField sx={{width: '100%'}} label='Entry ID:' value={ThisProps.id || '-'} InputProps={{readOnly: true,}} variant='standard'/>
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

export default BONUSENTRYModalUI;