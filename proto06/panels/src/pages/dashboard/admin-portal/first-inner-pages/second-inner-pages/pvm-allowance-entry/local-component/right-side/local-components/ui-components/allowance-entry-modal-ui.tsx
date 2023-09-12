import { useState, Fragment, Dispatch, SetStateAction } from 'react';
import { ALLOWANCEENTRYViewInterface } from '@/types/types-payroll-variables';
import { Button } from '@mui/material';
import {TextField} from '@mui/material';
import EditALLOWANCEENTRYModal from '../main-modals/inner-modals/edit-allowance-entry-modal';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import dayjs from 'dayjs';

interface ALLOWANCEENTRYModalUIInterface {
    singleALLOWANCEENTRYDetailsData: ALLOWANCEENTRYViewInterface;
    multiplePayslipMode?: boolean;
    setSingleALLOWANCEENTRYDetailsData: Dispatch<SetStateAction<ALLOWANCEENTRYViewInterface>>;
}

function ALLOWANCEENTRYModalUI(props: ALLOWANCEENTRYModalUIInterface) {
    const [ resetPasswordALLOWANCEENTRYOpenModal, setResetPasswordALLOWANCEENTRYOpenModal ] = useState(false);
    const [ editALLOWANCEENTRYOpenModal, setEditALLOWANCEENTRYOpenModal ] = useState(false);
    const { setSingleALLOWANCEENTRYDetailsData, singleALLOWANCEENTRYDetailsData } = props;
    const ThisProps = props.singleALLOWANCEENTRYDetailsData;
    const curr_user = useSelector((state: RootState)=> state.auth.employee_detail);
    const onClickModal = (mode: number) => {
        switch(mode){
            case 0: setResetPasswordALLOWANCEENTRYOpenModal(true);
            break;
            case 1: setEditALLOWANCEENTRYOpenModal(true);
            break;
        }   
        
    };

    return (
        <Fragment>
            <EditALLOWANCEENTRYModal singleALLOWANCEENTRYDetailsData={singleALLOWANCEENTRYDetailsData} setSingleALLOWANCEENTRYDetailsData={setSingleALLOWANCEENTRYDetailsData} editALLOWANCEENTRYOpenModal={editALLOWANCEENTRYOpenModal} setEditALLOWANCEENTRYOpenModal={setEditALLOWANCEENTRYOpenModal}/>
            <div className='flex overflow-auto justify-around gap-4 relative'>
                <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px'}} label='Allowance Amount:' value={ThisProps.amount ? ThisProps.amount : '-'} InputProps={{readOnly: true,}} variant='filled'/>
                    <TextField sx={{width: '100%'}} label='Tax Rate:' value={(ThisProps?.tax_rate ? `${ThisProps?.tax_rate}%` : '0%')} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%'}} label='Allowance ID(PK):' value={(ThisProps?.id || '-')} InputProps={{readOnly: true,}} variant='standard'/>

                </div>
                <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px', color: 'green'}} label='Allowance Code:' value={ThisProps.allowance_code || '-'} InputProps={{readOnly: true,}} variant='filled' focused/>
                    <TextField sx={{width: '100%'}} label='Date Added:' value={ThisProps.date_added? dayjs(ThisProps.date_added).format('MM-DD-YYYY - HH:mm a') : '-'} InputProps={{readOnly: true,}} variant='standard'/>
                </div>
                <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px'}} label='Employee #' value={ThisProps.emp_no || '-'} InputProps={{readOnly: true,}} variant='filled'/>
                    <TextField sx={{width: '100%'}} label='Date Deleted:' value={ThisProps.date_deleted? dayjs(ThisProps.date_deleted).format('MM-DD-YYYY - HH:mm a') : '-'} InputProps={{readOnly: true,}} variant='standard'/>
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

export default ALLOWANCEENTRYModalUI;