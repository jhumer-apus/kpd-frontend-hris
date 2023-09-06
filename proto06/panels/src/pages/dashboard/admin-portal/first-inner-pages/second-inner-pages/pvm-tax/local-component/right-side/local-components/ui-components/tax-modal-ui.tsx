import { useState, Fragment, Dispatch, SetStateAction } from 'react';
import { TAXViewInterface } from '@/types/types-payroll-variables';
import { Button } from '@mui/material';
import {TextField} from '@mui/material';
import EditTAXModal from '../main-modals/inner-modals/edit-tax-modal';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';

interface TAXModalUIInterface {
    singleTAXDetailsData: TAXViewInterface;
    multiplePayslipMode?: boolean;
    setSingleTAXDetailsData: Dispatch<SetStateAction<TAXViewInterface>>;
}

function TAXModalUI(props: TAXModalUIInterface) {
    const [ resetPasswordTAXOpenModal, setResetPasswordTAXOpenModal ] = useState(false);
    const [ editTAXOpenModal, setEditTAXOpenModal ] = useState(false);
    const { setSingleTAXDetailsData, singleTAXDetailsData } = props;
    const ThisProps = props.singleTAXDetailsData;
    const curr_user = useSelector((state: RootState)=> state.auth.employee_detail);
    const onClickModal = (mode: number) => {
        switch(mode){
            case 0: setResetPasswordTAXOpenModal(true);
            break;
            case 1: setEditTAXOpenModal(true);
            break;
        }   
        
    };

    return (
        <Fragment>
            <EditTAXModal singleTAXDetailsData={singleTAXDetailsData} setSingleTAXDetailsData={setSingleTAXDetailsData} editTAXOpenModal={editTAXOpenModal} setEditTAXOpenModal={setEditTAXOpenModal}/>
            {/* <ResetPasswordTAXModal primaryKey={ThisProps.id} resetPasswordTAXOpenModal={resetPasswordTAXOpenModal} setResetPasswordTAXOpenModal={setResetPasswordTAXOpenModal}/> */}
            <div className='flex overflow-auto justify-around gap-4 relative'>
                <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px'}} label='Primary Key (ID):' value={ThisProps.id ? ThisProps.id : '-'} InputProps={{readOnly: true,}} variant='filled'/>
                    <TextField sx={{width: '100%'}} label='Tax Percentage:' value={(ThisProps?.tax_percentage ? `${ThisProps?.tax_percentage}%` : '')} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%'}} label='Payment Frequency:' value={(ThisProps?.payment_frequency || '-')} InputProps={{readOnly: true,}} variant='standard'/>
                </div>
                <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px', color: 'green'}} label='TIN #' value={ThisProps.tin_no || '-'} InputProps={{readOnly: true,}} variant='filled' focused/>
                    <TextField sx={{width: '100%'}} label='Tax Form:' value={ThisProps.tax_form || '-'} InputProps={{readOnly: true,}} variant='standard'/>
                </div>
                <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px'}} label='Employee #:' value={ThisProps.emp_no || '-'} InputProps={{readOnly: true,}} variant='filled'/>
                    <TextField sx={{width: '100%'}} label='Tax Description' multiline rows={4} value={ThisProps.tax_description || '-'} InputProps={{readOnly: true,}} variant='outlined'/>
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

export default TAXModalUI;