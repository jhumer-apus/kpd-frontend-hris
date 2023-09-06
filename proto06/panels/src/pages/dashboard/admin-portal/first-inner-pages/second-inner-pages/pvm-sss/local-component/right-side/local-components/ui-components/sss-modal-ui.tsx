import { useState, Fragment, Dispatch, SetStateAction } from 'react';
import { SSSViewInterface } from '@/types/types-payroll-variables';
import { Button } from '@mui/material';
import {TextField} from '@mui/material';
import EditSSSModal from '../main-modals/inner-modals/edit-sss-modal';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';

interface SSSModalUIInterface {
    singleSSSDetailsData: SSSViewInterface;
    multiplePayslipMode?: boolean;
    setSingleSSSDetailsData: Dispatch<SetStateAction<SSSViewInterface>>;
}

function SSSModalUI(props: SSSModalUIInterface) {
    const [ resetPasswordSSSOpenModal, setResetPasswordSSSOpenModal ] = useState(false);
    const [ editSSSOpenModal, setEditSSSOpenModal ] = useState(false);
    const { setSingleSSSDetailsData, singleSSSDetailsData } = props;
    const ThisProps = props.singleSSSDetailsData;
    const curr_user = useSelector((state: RootState)=> state.auth.employee_detail);
    const onClickModal = (mode: number) => {
        switch(mode){
            case 0: setResetPasswordSSSOpenModal(true);
            break;
            case 1: setEditSSSOpenModal(true);
            break;
        }   
        
    };

    return (
        <Fragment>
            <EditSSSModal singleSSSDetailsData={singleSSSDetailsData} setSingleSSSDetailsData={setSingleSSSDetailsData} editSSSOpenModal={editSSSOpenModal} setEditSSSOpenModal={setEditSSSOpenModal}/>
            <div className='flex overflow-auto justify-around gap-4 relative'>
                <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px'}} label='Primary Key (ID):' value={ThisProps.id ? ThisProps.id : '-'} InputProps={{readOnly: true,}} variant='filled'/>
                    <TextField sx={{width: '100%'}} label='Monthly Contribution:' value={(ThisProps?.sss_contribution_month || '-')} InputProps={{readOnly: true,}} variant='standard'/>
                </div>
                <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px', color: 'green'}} label='SSS #' value={ThisProps.sss_no || '-'} InputProps={{readOnly: true,}} variant='filled' focused/>
                    <TextField sx={{width: '100%'}} label='Cash Loan Balance:' value={ThisProps.sss_rem_cashloan_amount || '-'} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%'}} label='Cash Loan Deduction/Month:' value={ThisProps.sss_with_cashloan_amount || '-'} InputProps={{readOnly: true,}} variant='standard'/>
                </div>
                <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px'}} label='Employee #:' value={ThisProps.emp_no || '-'} InputProps={{readOnly: true,}} variant='filled'/>
                    <TextField sx={{width: '100%'}} label='Calamity Loan Balance' value={(ThisProps?.sss_rem_calloan_amount || '-')} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%'}} label='Calamity Loan Deductions/Month' value={(ThisProps?.sss_with_calloan_amount || '-')} InputProps={{readOnly: true,}} variant='standard'/>
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

export default SSSModalUI;