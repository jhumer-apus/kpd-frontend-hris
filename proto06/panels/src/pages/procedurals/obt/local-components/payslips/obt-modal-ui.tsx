import React, { useState } from 'react';
import { OBTViewInterface, ViewPayrollPayPerEmployee } from '@/types/types-pages';
import { convertDaysToHHMM, convertMinutesToHHMM,  } from '@/helpers/utils';
import { Button } from '@mui/material';
import dayjs from 'dayjs';
import {TextField} from '@mui/material';
import ApproveOBTModal from '../approve-obt-modal';
import DenyOBTModal from '../deny-obt-modal';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';

interface OBTModalUIInterface {
    singleOBTDetailsData: OBTViewInterface;
    multiplePayslipMode?: boolean;
    setSingleOBTDetailsData: React.Dispatch<React.SetStateAction<OBTViewInterface>>;
}

function OBTModalUI(props: OBTModalUIInterface) {
    const [ approveOBTOpenModal, setApproveOBTOpenModal ] = useState(false);
    const [ denyOBTOpenModal, setDenyOBTOpenModal ] = useState(false);
    const { setSingleOBTDetailsData, singleOBTDetailsData } = props;
    const ThisProps = props.singleOBTDetailsData;
    const curr_user = useSelector((state: RootState)=> state.auth.employee_detail);
    const onClickModal = (mode: number) => {
        switch(mode){
            case 0: setApproveOBTOpenModal(true);
            break;
            case 1: setDenyOBTOpenModal(true);
            break;
        }   
        
    };
    console.log(denyOBTOpenModal, "hjaha?")
    const userIsApprover = curr_user?.emp_no === ThisProps.obt_approver1_empno || curr_user?.emp_no === ThisProps.obt_approver2_empno;
    return (
        <React.Fragment>
            <ApproveOBTModal singleOBTDetailsData={singleOBTDetailsData} setSingleOBTDetailsData={setSingleOBTDetailsData} approveOBTOpenModal={approveOBTOpenModal} setApproveOBTOpenModal={setApproveOBTOpenModal}/>
            <DenyOBTModal singleOBTDetailsData={singleOBTDetailsData} setSingleOBTDetailsData={setSingleOBTDetailsData} denyOBTOpenModal={denyOBTOpenModal} setDenyOBTOpenModal={setDenyOBTOpenModal}/>
            <div className='flex gap-10 overflow-auto'>
                <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px'}} label='Date Filed:' value={ThisProps.obt_date_filed ? dayjs(ThisProps.obt_date_filed).format('MM-DD-YYYY') : '-'} InputProps={{readOnly: false,}} variant='filled'/>
                    <TextField sx={{width: '100%'}} label='Total hrs:' value={ThisProps.obt_total_hours || '-'} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%'}} label='Cutoff Code:' value={ThisProps.cutoff_code || '-'} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%'}} label='Approver1:' value={ThisProps.obt_approver1_empno || '-'} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%'}} label='Approver2:' value={ThisProps.obt_approver2_empno || '-'} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%'}} label='Location:' value={ThisProps.obt_location || '-'} InputProps={{readOnly: true,}} variant='outlined' multiline rows={2}/>
                    <TextField sx={{width: '100%'}} label='OBT Description:' value={ThisProps.obt_remarks || '-'} InputProps={{readOnly: true,}} variant='outlined' multiline rows={4}/>
                </div>
                <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px', color: 'green'}} label='Status:' value={ThisProps.obt_approval_status || '-'} InputProps={{readOnly: true,}} color={ThisProps.obt_approval_status === 'APD' ? 'success' : ThisProps.obt_approval_status === 'DIS' ? 'error' : 'warning'} variant='filled' focused/>
                    <TextField sx={{width: '100%'}} label='Date From:' value={ThisProps.obt_date_from? dayjs(ThisProps.obt_date_from).format('MM-DD-YYYY') : '-'} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%'}} label='Date Until:' value={ThisProps.obt_date_to? dayjs(ThisProps.obt_date_to).format('MM-DD-YYYY') : '-'} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%'}} label='Date Approved: #1' value={ThisProps.date_approved1 || '-'} focused={ThisProps.date_approved1 ? true : false} color={ThisProps.date_approved1 ? 'success' : 'info'} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%'}} label='Date Approved: #2' value={ThisProps.date_approved1 || '-'} focused={ThisProps.date_approved1 ? true : false} color={ThisProps.date_approved2 ? 'success' : 'info'} InputProps={{readOnly: true,}} variant='standard'/>
                </div>
                <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px'}} label='Employee #:' value={ThisProps.emp_no || '-'} InputProps={{readOnly: true,}} variant='filled'/>
                    <TextField sx={{width: '100%', minWidth: '160px'}} label='OBT Type:' value={ThisProps.obt_type || '-'} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%', minWidth: '160px'}} label='Reason for Disapproval:' value={ThisProps.obt_reason_disapproval || '-'} InputProps={{readOnly: true,}} variant='outlined' multiline rows={4}/>
                </div>
            </div>
            {ThisProps.obt_approval_status.includes('1') && 
            <div className='flex flex-col justify-center items-center'>
            <div className='flex justify-center mt-6' container-name='obt_buttons_container'>
                <div className='flex justify-between' style={{width:'300px'}} container-name='obt_buttons'>
                    <Button disabled={!userIsApprover? false : true} variant='contained' onClick={()=> onClickModal(0)}>Approve OBT</Button>
                    <Button disabled={!userIsApprover? false : true} variant='outlined' onClick={()=> onClickModal(1)}>Deny OBT</Button>
                </div>
                
            </div>
            { !userIsApprover &&
                <i className='w-6/12 text-center mt-4' style={{color: 'gray'}}>You are not listed as one of the approvers</i>
            }
            </div>
            
            }


        </React.Fragment>
    );
}

export default OBTModalUI;


const obt_col1_row_name = {
    width: '200px',
}

const obt_col2_row_name = {
    width: '200px',
}