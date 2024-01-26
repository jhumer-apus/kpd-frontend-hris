import React, { useState, useEffect } from 'react';
import { LEAVEViewInterface } from '@/types/types-pages';
import { Button } from '@mui/material';
import dayjs from 'dayjs';
import {TextField} from '@mui/material';
import ApproveLEAVEModal from '../main-modals/inner-modals/approve-leaves-modal';
import DenyLEAVEModal from '../main-modals/inner-modals/deny-leaves-modal';
import { useSelector } from 'react-redux';
import { RootState, globalDateTime } from '@/store/configureStore';
import { ApprovalStateInterface } from '@/types/index';

interface LEAVEModalUIInterface {
    singleLEAVEDetailsData: LEAVEViewInterface;
    multiplePayslipMode?: boolean;
    setSingleLEAVEDetailsData: React.Dispatch<React.SetStateAction<LEAVEViewInterface>>;
}

function LEAVEModalUI(props: LEAVEModalUIInterface) {
    const [ approveLEAVEOpenModal, setApproveLEAVEOpenModal ] = useState(false);
    const [ denyLEAVEOpenModal, setDenyLEAVEOpenModal ] = useState(false);
    const { setSingleLEAVEDetailsData, singleLEAVEDetailsData } = props;
    const ThisProps = props.singleLEAVEDetailsData;
    const curr_user = useSelector((state: RootState)=> state.auth.employee_detail);
    const onClickModal = (mode: number) => {
        switch(mode){
            case 0: setApproveLEAVEOpenModal(true);
            break;
            case 1: setDenyLEAVEOpenModal(true);
            break;
        }   
        
    };
    const [ approvalState, setApprovalState ] = useState<ApprovalStateInterface>({
        buttonDisabled: false,
        message1Show: true,
    })
    const UserApprover1 = curr_user?.emp_no === ThisProps.leave_approver1_empno
    const UserApprover2 = curr_user?.emp_no === ThisProps.leave_approver2_empno
    const fileHasTwoApprovers = ThisProps.leave_approver1_empno && ThisProps.leave_approver2_empno
    const fileApprover1Approved = ThisProps.leave_date_approved1
    const fileApprover2Approved = ThisProps.leave_date_approved2
    const userIsHigherRank =  ((curr_user?.rank_data?.hierarchy as number) > singleLEAVEDetailsData?.applicant_rank)
    
    useEffect(()=> {
        if(fileHasTwoApprovers){
            if(UserApprover1 && fileApprover1Approved && fileApprover2Approved){
                setApprovalState((prevState: ApprovalStateInterface) => {
                    return (
                        {
                            ...prevState,
                            buttonDisabled: true,
                            message1Show: true,
                        }
                    )
                })
            }else if (UserApprover2 && fileApprover1Approved && !fileApprover2Approved) {
                setApprovalState((prevState: ApprovalStateInterface) => {
                    return (
                        {
                            ...prevState,
                            buttonDisabled: false,
                        }
                    )
                })
            }else if (!UserApprover1 && !UserApprover2 && !fileApprover1Approved && userIsHigherRank ){
                setApprovalState((prevState: ApprovalStateInterface) => {
                    return (
                        {
                            buttonDisabled: false,
                            message1Show: false,
                        }
                    )
                })
            }else {
                setApprovalState((prevState: ApprovalStateInterface) => {
                    return (
                        {
                            buttonDisabled: true,
                            message1Show: true,
                        }
                    )
                })
            }
        }

    }, [approvalState])
    
    return (
        <React.Fragment>
            <ApproveLEAVEModal singleLEAVEDetailsData={singleLEAVEDetailsData} setSingleLEAVEDetailsData={setSingleLEAVEDetailsData} approveLEAVEOpenModal={approveLEAVEOpenModal} setApproveLEAVEOpenModal={setApproveLEAVEOpenModal}/>
            <DenyLEAVEModal singleLEAVEDetailsData={singleLEAVEDetailsData} setSingleLEAVEDetailsData={setSingleLEAVEDetailsData} denyLEAVEOpenModal={denyLEAVEOpenModal} setDenyLEAVEOpenModal={setDenyLEAVEOpenModal}/>
            <div className='flex gap-10 overflow-auto relative'>
                <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px'}} label='Date & Time Filed:' value={ThisProps.leave_date_filed ? dayjs(ThisProps.leave_date_filed).format(`${globalDateTime}`) : '-'} InputProps={{readOnly: false,}} variant='filled'/>
                    <TextField sx={{width: '100%'}} label='Total hrs:' value={(ThisProps.leave_total_hours / 60).toFixed(2) || '-'} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%'}} label='Cutoff Code:' value={ThisProps.cutoff_code || '-'} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%'}} label='Approver1:' value={ThisProps.leave_approver1_empno || '-'} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%'}} label='Approver2:' value={ThisProps.leave_approver2_empno || '-'} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%'}} label='LEAVE Description:' value={ThisProps.leave_remarks || '-'} InputProps={{readOnly: true,}} variant='outlined' multiline rows={4}/>
                </div>
                <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px', color: 'green'}} label='Status:' value={ThisProps.leave_approval_status || '-'} InputProps={{readOnly: true,}} color={ThisProps.leave_approval_status === 'APD' ? 'success' : ThisProps.leave_approval_status === 'DIS' ? 'error' : 'warning'} variant='filled' focused/>
                    <TextField sx={{width: '100%'}} label='Date From:' value={ThisProps.leave_date_from? dayjs(ThisProps.leave_date_from).format('MM-DD-YYYY - HH:mm a') : '-'} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%'}} label='Date Until:' value={ThisProps.leave_date_to? dayjs(ThisProps.leave_date_to).format('MM-DD-YYYY - HH:mm a') : '-'} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%'}} label='Date Approved: #1' value={ThisProps.leave_date_approved1? dayjs(ThisProps.leave_date_approved1).format('MM-DD-YYYY LT') : '-'} focused={!!ThisProps.leave_date_approved1} color={ThisProps.leave_date_approved1 ? 'success' : 'warning'} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%'}} label='Date Approved: #2' value={ThisProps.leave_date_approved2? dayjs(ThisProps.leave_date_approved2).format('MM-DD-YYYY LT') : '-'} focused={!!ThisProps.leave_date_approved2} color={ThisProps.leave_date_approved2 ? 'success' : 'warning'} InputProps={{readOnly: true,}} variant='standard'/>
                </div>
                <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px'}} label='Employee #:' value={ThisProps.emp_no || '-'} InputProps={{readOnly: true,}} variant='filled'/>
                    <TextField sx={{width: '100%', minWidth: '160px'}} label='LEAVE Type:' value={ThisProps.leave_type || '-'} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%', minWidth: '160px'}} focused={!!ThisProps.leave_reason_disapproval} color={'error'} label='Reason for Disapproval:' value={ThisProps.leave_reason_disapproval || '-'} InputProps={{readOnly: true,}} variant='outlined' multiline rows={4}/>
                </div>
                {ThisProps.leave_approval_status === 'APD' && <img src={ '/img/stampApproved2.png' } style={{height: '200px', bottom: '0', right: '0', transform: 'rotate(0)', position: 'absolute'}}></img>}
                {ThisProps.leave_approval_status === 'DIS' && <img src={ '/img/stampRejected.png' } style={{height: '200px', bottom: '0', right: '0', transform: 'rotate(0)', position: 'absolute'}}></img>}
            </div>

            <div className='flex flex-col justify-center items-center'>
            <div className='flex justify-center mt-6' container-name='leave_buttons_container'>
                <div className='flex justify-between' style={{width:'400px'}} container-name='leave_buttons'>
                    <Button disabled={approvalState.buttonDisabled} variant='contained' onClick={()=> onClickModal(0)}>Approve LEAVE</Button>
                    <Button disabled={approvalState.buttonDisabled} variant='outlined' onClick={()=> onClickModal(1)}>Deny LEAVE</Button>
                </div>
                
            </div>
            { approvalState.message1Show &&
                <i className='w-6/12 text-center mt-4' style={{color: 'gray'}}>All listed approver must approve - Status: Pending </i>
            }
            { !approvalState.message1Show &&
                <i className='w-6/12 text-center mt-4' style={{color: 'gray'}}>Your action is needed as eligible approver - Status: Pending </i>
            }
            </div>
        </React.Fragment>
    );
}

export default LEAVEModalUI;
