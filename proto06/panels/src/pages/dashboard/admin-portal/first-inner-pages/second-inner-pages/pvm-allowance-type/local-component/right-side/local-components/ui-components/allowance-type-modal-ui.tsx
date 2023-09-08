import { useState, Fragment, Dispatch, SetStateAction } from 'react';
import { ALLOWANCETYPEViewInterface } from '@/types/types-payroll-variables';
import { Button } from '@mui/material';
import {TextField} from '@mui/material';
import EditALLOWANCETYPEModal from '../main-modals/inner-modals/edit-allowance-type-modal';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import dayjs from 'dayjs';

interface ALLOWANCETYPEModalUIInterface {
    singleALLOWANCETYPEDetailsData: ALLOWANCETYPEViewInterface;
    multiplePayslipMode?: boolean;
    setSingleALLOWANCETYPEDetailsData: Dispatch<SetStateAction<ALLOWANCETYPEViewInterface>>;
}

function ALLOWANCETYPEModalUI(props: ALLOWANCETYPEModalUIInterface) {
    const [ resetPasswordALLOWANCETYPEOpenModal, setResetPasswordALLOWANCETYPEOpenModal ] = useState(false);
    const [ editALLOWANCETYPEOpenModal, setEditALLOWANCETYPEOpenModal ] = useState(false);
    const { setSingleALLOWANCETYPEDetailsData, singleALLOWANCETYPEDetailsData } = props;
    const ThisProps = props.singleALLOWANCETYPEDetailsData;
    const curr_user = useSelector((state: RootState)=> state.auth.employee_detail);
    const onClickModal = (mode: number) => {
        switch(mode){
            case 0: setResetPasswordALLOWANCETYPEOpenModal(true);
            break;
            case 1: setEditALLOWANCETYPEOpenModal(true);
            break;
        }   
        
    };

    return (
        <Fragment>
            <EditALLOWANCETYPEModal singleALLOWANCETYPEDetailsData={singleALLOWANCETYPEDetailsData} setSingleALLOWANCETYPEDetailsData={setSingleALLOWANCETYPEDetailsData} editALLOWANCETYPEOpenModal={editALLOWANCETYPEOpenModal} setEditALLOWANCETYPEOpenModal={setEditALLOWANCETYPEOpenModal}/>
            <div className='flex overflow-auto justify-around gap-4 relative'>
                <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px'}} label='Allowance Type ID:' value={ThisProps.id || '-'} InputProps={{readOnly: true,}} variant='filled'/>
                    <TextField sx={{width: '100%'}} label='Date Added:' value={ThisProps.date_added? dayjs(ThisProps.date_added).format('MM-DD-YYYY - HH:mm a') : '-'} InputProps={{readOnly: true,}} variant='standard'/>
                </div>
                <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px', color: 'green'}} label='Allowance Name' value={ThisProps.allowance_name || '-'} InputProps={{readOnly: true,}} variant='filled' focused/>
                </div>
                <div className='flex gap-6 flex-col'>
                <TextField sx={{width: '100%'}} label='Is Taxable' value={ThisProps.taxable?  'Yes' : 'No'} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%'}} label='Date Deactivated:' value={ThisProps.date_deleted? dayjs(ThisProps.date_deleted).format('MM-DD-YYYY - HH:mm a') : '-'} InputProps={{readOnly: true,}} variant='standard'/>

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

export default ALLOWANCETYPEModalUI;