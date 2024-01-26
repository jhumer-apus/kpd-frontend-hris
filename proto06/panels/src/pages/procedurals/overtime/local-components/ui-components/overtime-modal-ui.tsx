import React, { useState } from 'react';
import { OVERTIMEViewInterface, ViewPayrollPayPerEmployee } from '@/types/types-pages';
import { convertDaysToHHMM, convertMinutesToHHMM,  } from '@/helpers/utils';
import { Button } from '@mui/material';
import dayjs from 'dayjs';
import {TextField} from '@mui/material';
import ApproveOVERTIMEModal from '../main-modals/inner-modals/approve-overtime-modal';
import DenyOVERTIMEModal from '../main-modals/inner-modals/deny-overtime-modal';
import { useSelector } from 'react-redux';
import { RootState, globalDateTime } from '@/store/configureStore';

interface OVERTIMEModalUIInterface {
    singleOVERTIMEDetailsData: OVERTIMEViewInterface;
    multiplePayslipMode?: boolean;
    setSingleOVERTIMEDetailsData: React.Dispatch<React.SetStateAction<OVERTIMEViewInterface>>;
}

function OVERTIMEModalUI(props: OVERTIMEModalUIInterface) {
    const [ approveOVERTIMEOpenModal, setApproveOVERTIMEOpenModal ] = useState(false);
    const [ denyOVERTIMEOpenModal, setDenyOVERTIMEOpenModal ] = useState(false);
    const { setSingleOVERTIMEDetailsData, singleOVERTIMEDetailsData } = props;
    const ThisProps = props.singleOVERTIMEDetailsData;
    const curr_user = useSelector((state: RootState)=> state.auth.employee_detail);
    const onClickModal = (mode: number) => {
        switch(mode){
            case 0: setApproveOVERTIMEOpenModal(true);
            break;
            case 1: setDenyOVERTIMEOpenModal(true);
            break;
        }   
        
    };
    const userIsApprover = curr_user?.emp_no === ThisProps.ot_approver1_empno || curr_user?.emp_no === ThisProps.ot_approver2_empno || ((curr_user?.rank_data?.hierarchy as number) > singleOVERTIMEDetailsData?.applicant_rank);
    return (
        <React.Fragment>
            <ApproveOVERTIMEModal singleOVERTIMEDetailsData={singleOVERTIMEDetailsData} setSingleOVERTIMEDetailsData={setSingleOVERTIMEDetailsData} approveOVERTIMEOpenModal={approveOVERTIMEOpenModal} setApproveOVERTIMEOpenModal={setApproveOVERTIMEOpenModal}/>
            <DenyOVERTIMEModal singleOVERTIMEDetailsData={singleOVERTIMEDetailsData} setSingleOVERTIMEDetailsData={setSingleOVERTIMEDetailsData} denyOVERTIMEOpenModal={denyOVERTIMEOpenModal} setDenyOVERTIMEOpenModal={setDenyOVERTIMEOpenModal}/>
            <div className='flex gap-10 overflow-auto relative'>
                <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px'}} label='Date & Time Filed:' value={ThisProps.ot_date_filed ? dayjs(ThisProps.ot_date_filed).format(`${globalDateTime}`) : '-'} InputProps={{readOnly: false,}} variant='filled'/>
                    <TextField sx={{width: '100%'}} label='Total hrs:' value={(ThisProps.ot_total_hours / 60).toFixed(2) || '-'} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%'}} label='Cutoff Code:' value={ThisProps.cutoff_code || '-'} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%'}} label='Approver1:' value={ThisProps.ot_approver1_empno || 'Any Higher Ranking Officer'} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%'}} label='Approver2:' value={ThisProps.ot_approver2_empno || '-'} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%'}} label='OVERTIME Description:' value={ThisProps.ot_remarks || '-'} InputProps={{readOnly: true,}} variant='outlined' multiline rows={4}/>
                </div>
                <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px', color: 'green'}} label='Status:' value={ThisProps.ot_approval_status || '-'} InputProps={{readOnly: true,}} color={ThisProps.ot_approval_status === 'APD' ? 'success' : ThisProps.ot_approval_status === 'DIS' ? 'error' : 'warning'} variant='filled' focused/>
                    <TextField sx={{width: '100%'}} label='Date From:' value={ThisProps.ot_date_from? dayjs(ThisProps.ot_date_from).format('MM-DD-YYYY - HH:mm a') : '-'} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%'}} label='Date Until:' value={ThisProps.ot_date_to? dayjs(ThisProps.ot_date_to).format('MM-DD-YYYY - HH:mm a') : '-'} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%'}} label='Date Approved: #1' value={ThisProps.ot_date_approved1? dayjs(ThisProps.ot_date_approved1).format('MM-DD-YYYY LT') : '-'} focused={!!ThisProps.ot_date_approved1} color={ThisProps.ot_date_approved1 ? 'success' : 'warning'} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%'}} label='Date Approved: #2' value={ThisProps.ot_date_approved2? dayjs(ThisProps.ot_date_approved2).format('MM-DD-YYYY LT') : '-'} focused={!!ThisProps.ot_date_approved2} color={ThisProps.ot_date_approved2 ? 'success' : 'warning'} InputProps={{readOnly: true,}} variant='standard'/>
                </div>
                <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px'}} label='Employee #:' value={ThisProps.emp_no || '-'} InputProps={{readOnly: true,}} variant='filled'/>
                    <TextField sx={{width: '100%', minWidth: '160px'}} label='OVERTIME Type:' value={ThisProps.ot_type || '-'} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%', minWidth: '160px'}} focused={!!ThisProps.ot_reason_disapproval} color={'error'} label='Reason for Disapproval:' value={ThisProps.ot_reason_disapproval || '-'} InputProps={{readOnly: true,}} variant='outlined' multiline rows={4}/>

                </div>
                {ThisProps.ot_approval_status === 'APD' && <img src={ '/img/stampApproved2.png' } style={{height: '200px', bottom: '0', right: '0', transform: 'rotate(0)', position: 'absolute'}}></img>}
                {ThisProps.ot_approval_status === 'DIS' && <img src={ '/img/stampRejected.png' } style={{height: '200px', bottom: '0', right: '0', transform: 'rotate(0)', position: 'absolute'}}></img>}
            </div>
            {(ThisProps.ot_approval_status.includes('1') || ThisProps.ot_approval_status.includes('2')) && 
            <div className='flex flex-col justify-center items-center'>
            <div className='flex justify-center mt-6' container-name='ot_buttons_container'>
                <div className='flex justify-between' style={{width:'400px'}} container-name='ot_buttons'>
                    <Button disabled={!userIsApprover} variant='contained' onClick={()=> onClickModal(0)}>Approve OVERTIME</Button>
                    <Button disabled={!userIsApprover} variant='outlined' onClick={()=> onClickModal(1)}>Deny OVERTIME</Button>
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

export default OVERTIMEModalUI;
