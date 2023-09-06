import { useState, Fragment, Dispatch, SetStateAction } from 'react';
import { PAGIBIGViewInterface } from '@/types/types-payroll-variables';
import { Button } from '@mui/material';
import dayjs from 'dayjs';
import {TextField} from '@mui/material';
import EditPAGIBIGModal from '../main-modals/inner-modals/edit-pagibig-modal';
import ResetPasswordPAGIBIGModal from '../main-modals/inner-modals/reset-password-users-modal';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';

interface PAGIBIGModalUIInterface {
    singlePAGIBIGDetailsData: PAGIBIGViewInterface;
    multiplePayslipMode?: boolean;
    setSinglePAGIBIGDetailsData: Dispatch<SetStateAction<PAGIBIGViewInterface>>;
}

function PAGIBIGModalUI(props: PAGIBIGModalUIInterface) {
    const [ resetPasswordPAGIBIGOpenModal, setResetPasswordPAGIBIGOpenModal ] = useState(false);
    const [ editPAGIBIGOpenModal, setEditPAGIBIGOpenModal ] = useState(false);
    const { setSinglePAGIBIGDetailsData, singlePAGIBIGDetailsData } = props;
    const ThisProps = props.singlePAGIBIGDetailsData;
    const curr_user = useSelector((state: RootState)=> state.auth.employee_detail);
    const onClickModal = (mode: number) => {
        switch(mode){
            case 0: setResetPasswordPAGIBIGOpenModal(true);
            break;
            case 1: setEditPAGIBIGOpenModal(true);
            break;
        }   
        
    };

    return (
        <Fragment>
            <EditPAGIBIGModal singlePAGIBIGDetailsData={singlePAGIBIGDetailsData} setSinglePAGIBIGDetailsData={setSinglePAGIBIGDetailsData} editPAGIBIGOpenModal={editPAGIBIGOpenModal} setEditPAGIBIGOpenModal={setEditPAGIBIGOpenModal}/>
            {/* <ResetPasswordPAGIBIGModal primaryKey={ThisProps.id} resetPasswordPAGIBIGOpenModal={resetPasswordPAGIBIGOpenModal} setResetPasswordPAGIBIGOpenModal={setResetPasswordPAGIBIGOpenModal}/> */}
            <div className='flex overflow-auto justify-around gap-4 relative'>
                <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px'}} label='Primary Key (ID):' value={ThisProps.id ? ThisProps.id : '-'} InputProps={{readOnly: true,}} variant='filled'/>
                    <TextField sx={{width: '100%'}} label='Monthly Contribution:' value={(ThisProps?.pagibig_contribution_month || '-')} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%'}} label='Calamity Loan Balance' value={(ThisProps?.pagibig_rem_calloan_amount || '-')} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%'}} label='Calamity Loan Deductions/Month' value={(ThisProps?.pagibig_with_calloan_amount || '-')} InputProps={{readOnly: true,}} variant='standard'/>
                </div>
                <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px', color: 'green'}} label='PAGIBIG #' value={ThisProps.pagibig_no || '-'} InputProps={{readOnly: true,}} variant='filled' focused/>
                    <TextField sx={{width: '100%'}} label='Cash Loan Balance:' value={ThisProps.pagibig_rem_cloan_amount || '-'} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%'}} label='Cash Loan Deduction/Month:' value={ThisProps.pagibig_with_cloan_amount || '-'} InputProps={{readOnly: true,}} variant='standard'/>
                </div>
                <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px'}} label='Employee #:' value={ThisProps.emp_no || '-'} InputProps={{readOnly: true,}} variant='filled'/>
                    <TextField sx={{width: '100%'}} label='Housing Loan Balance:' value={ThisProps.pagibig_rem_hloan_amount || '-'} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%'}} label='Housing Loan Deduction/Month:' value={ThisProps.pagibig_with_hloan_amount || '-'} InputProps={{readOnly: true,}} variant='standard'/>
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

export default PAGIBIGModalUI;