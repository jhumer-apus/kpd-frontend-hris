import { useState, Fragment, Dispatch, SetStateAction } from 'react';
import { ASSETACCOUNTViewInterface } from '@/types/types-payroll-eoy';
import { Button } from '@mui/material';
import {TextField} from '@mui/material';
import EditASSETACCOUNTModal from '../main-modals/inner-modals/edit-asset-account-modal';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import dayjs from 'dayjs';

interface ASSETACCOUNTModalUIInterface {
    singleASSETACCOUNTDetailsData: ASSETACCOUNTViewInterface;
    multiplePayslipMode?: boolean;
    setSingleASSETACCOUNTDetailsData: Dispatch<SetStateAction<ASSETACCOUNTViewInterface>>;
}

function ASSETACCOUNTModalUI(props: ASSETACCOUNTModalUIInterface) {
    const [ resetPasswordASSETACCOUNTOpenModal, setResetPasswordASSETACCOUNTOpenModal ] = useState(false);
    const [ editASSETACCOUNTOpenModal, setEditASSETACCOUNTOpenModal ] = useState(false);
    const { setSingleASSETACCOUNTDetailsData, singleASSETACCOUNTDetailsData } = props;
    const ThisProps = props.singleASSETACCOUNTDetailsData;
    const curr_user = useSelector((state: RootState)=> state.auth.employee_detail);
    const onClickModal = (mode: number) => {
        switch(mode){
            case 0: setResetPasswordASSETACCOUNTOpenModal(true);
            break;
            case 1: setEditASSETACCOUNTOpenModal(true);
            break;
        }
        
    };

    return (
        <Fragment>
            <EditASSETACCOUNTModal singleASSETACCOUNTDetailsData={singleASSETACCOUNTDetailsData} setSingleASSETACCOUNTDetailsData={setSingleASSETACCOUNTDetailsData} editASSETACCOUNTOpenModal={editASSETACCOUNTOpenModal} setEditASSETACCOUNTOpenModal={setEditASSETACCOUNTOpenModal}/>
            <div className='flex overflow-auto justify-around gap-4 relative'>
                <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px'}} label='Account ID:' value={ThisProps.id ? ThisProps.id : '-'} InputProps={{readOnly: true,}} variant='filled'/>
                    <TextField sx={{width: '100%'}} label='Remarks:' multiline rows={5} value={(ThisProps?.remarks ? `${ThisProps?.remarks}` : '-')} InputProps={{readOnly: true,}} variant='outlined'/>
                </div>
                <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px', color: 'green'}} label='Asset List ID:' value={ThisProps.asset_list_code || '-'} InputProps={{readOnly: true,}} variant='filled' />
                    <TextField sx={{width: '100%', minWidth: '160px', color: 'green'}} label='Asset List ID:' value={ThisProps.serial_no_internal || '-'} InputProps={{readOnly: true,}} variant='standard' />
                    <TextField sx={{width: '100%', minWidth: '160px', color: 'green'}} label='Asset List ID:' value={ThisProps.serial_no_manufacturer || '-'} InputProps={{readOnly: true,}} variant='standard' />
                </div>
                <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px'}} label='Assigned To Emp:' value={ThisProps.assigned_to || '-'} InputProps={{readOnly: true,}} variant='filled'/>
                    <TextField sx={{width: '100%'}} label='Date Assigned:' value={ThisProps.date_assigned? dayjs(ThisProps.date_assigned).format('MM-DD-YYYY - HH:mm a') : '-'} InputProps={{readOnly: true,}} variant='standard'/>
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

export default ASSETACCOUNTModalUI;