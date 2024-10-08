import React, { useState, useEffect } from 'react';
import { OVERTIMEViewInterface, ViewPayrollPayPerEmployee } from '@/types/types-pages';
import { convertDaysToHHMM, convertMinutesToHHMM,  } from '@/helpers/utils';
import { Button } from '@mui/material';
import dayjs from 'dayjs';
import {TextField} from '@mui/material';
import ApproveOVERTIMEModal from '../main-modals/inner-modals/approve-overtime-modal';
import DenyOVERTIMEModal from '../main-modals/inner-modals/deny-overtime-modal';
import { useSelector } from 'react-redux';
import { RootState, globalDateTime } from '@/store/configureStore';

import axios from 'axios'

//REDUX
import { APILink } from '@/store/configureStore';
import axiosInstance from '@/helpers/axiosConfig';
import { INTERNAL_USER_ROLE } from '@/types/types-store';
import CancelOTModal from '../main-modals/inner-modals/CancelOTModal';

interface OVERTIMEModalUIInterface {
    singleOVERTIMEDetailsData: OVERTIMEViewInterface;
    multiplePayslipMode?: boolean;
    setSingleOVERTIMEDetailsData: React.Dispatch<React.SetStateAction<OVERTIMEViewInterface>>;
}

function OVERTIMEModalUI(props: OVERTIMEModalUIInterface) {
    const [ approveOVERTIMEOpenModal, setApproveOVERTIMEOpenModal ] = useState(false);
    const [ isCancelModalOpen, setIsCancelModalOpen] = useState<boolean>(false);
    const [ denyOVERTIMEOpenModal, setDenyOVERTIMEOpenModal ] = useState(false);
    const { setSingleOVERTIMEDetailsData, singleOVERTIMEDetailsData } = props;
    const ThisProps = props.singleOVERTIMEDetailsData;
    const curr_user = useSelector((state: RootState)=> state.auth.employee_detail);
    const [data, setData] = useState(
        {
            cuttOffPeriod: null
        }
    )

    const updateRemarksWithEmpNo = () => {
        setSingleOVERTIMEDetailsData(curr => ({
            ...curr,
            ot_remarks: singleOVERTIMEDetailsData.ot_remarks + ` (${curr_user?.emp_no})`
        }))
    }


    const onClickModal = (mode: number) => {
        switch(mode){
            case 0: 
                updateRemarksWithEmpNo()
                setApproveOVERTIMEOpenModal(true);
                break;
            case 1: 
                updateRemarksWithEmpNo()
                setDenyOVERTIMEOpenModal(true);
                break;
        }   
        
    };

    
    useEffect(() => {
        setSingleOVERTIMEDetailsData(curr => ({
            ...curr,
            added_by: curr_user?.emp_no
        }))
        fetchCutOffPeriod()
    },[])

    const fetchCutOffPeriod = async () => {
        await axiosInstance.get(`cutoff_period/${ThisProps.cutoff_code}`).then(res => {
            setData(curr => ({
                ...curr,
                cuttOffPeriod: res.data.co_name
            }))
        })
    }
    // const userIsApprover = curr_user?.emp_no === ThisProps.ot_approver1_empno || curr_user?.emp_no === ThisProps.ot_approver2_empno || ((curr_user?.rank_data?.hierarchy as number) > singleOVERTIMEDetailsData?.applicant_rank);
    const isHrSuperAdmin = ((curr_user?.rank_hierarchy as number) == 5) || ((curr_user?.rank_code as number) == 6) 
    // || (INTERNAL_USER_ROLE.HR_Super_Admin == curr_user?.user?.role)
    const userIsApprover = curr_user?.emp_no === ThisProps.ot_approver1_empno || curr_user?.emp_no === ThisProps.ot_approver2_empno || isHrSuperAdmin;

    const isUserCanCancel = ThisProps.ot_approval_status === 'APD' && ([ThisProps.ot_approver1_empno, ThisProps.ot_approver2_empno].includes(curr_user?.emp_no) || isHrSuperAdmin)


    return (
        <React.Fragment>
            <ApproveOVERTIMEModal singleOVERTIMEDetailsData={singleOVERTIMEDetailsData} setSingleOVERTIMEDetailsData={setSingleOVERTIMEDetailsData} approveOVERTIMEOpenModal={approveOVERTIMEOpenModal} setApproveOVERTIMEOpenModal={setApproveOVERTIMEOpenModal}/>
            <DenyOVERTIMEModal 
                singleOVERTIMEDetailsData={singleOVERTIMEDetailsData} 
                setSingleOVERTIMEDetailsData={setSingleOVERTIMEDetailsData} 
                denyOVERTIMEOpenModal={denyOVERTIMEOpenModal} 
                setDenyOVERTIMEOpenModal={setDenyOVERTIMEOpenModal}
            />
            <CancelOTModal 
                isCancelModalOpen={isCancelModalOpen}
                setIsCancelModalOpen={setIsCancelModalOpen}
                data={singleOVERTIMEDetailsData}
            />
            <div className='flex gap-10 md:flex-row flex-col overflow-auto relative'>
                <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px'}} label='Date & Time Filed:' value={ThisProps.ot_date_filed ? dayjs(ThisProps.ot_date_filed).format(`${globalDateTime}`) : '-'} InputProps={{readOnly: false,}} variant='filled'/>
                    <TextField sx={{width: '100%'}} label='Total hrs:' value={(ThisProps.ot_total_hours / 60).toFixed(2) || '-'} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%'}} label='Cutoff Period:' value={data.cuttOffPeriod || '-'} InputProps={{readOnly: true,}} variant='standard'/>
                    {/* <TextField sx={{width: '100%'}} label='Cutoff Code:' value={ThisProps.cutoff_code || '-'} InputProps={{readOnly: true,}} variant='standard'/> */}
                    <TextField sx={{width: '100%'}} label='Approver1:' value={ThisProps?.ot_approver1_empno? `${ThisProps?.ot_approver1_empno} - ${ThisProps?.approver1_name}`: ""} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%'}} label='Approver2:' value={ThisProps?.ot_approver2_empno? `${ThisProps?.ot_approver2_empno} - ${ThisProps?.approver2_name}`: ""} InputProps={{readOnly: true,}} variant='standard'/>
                    {/* <TextField sx={{width: '100%'}} label='Approver1:' value={ThisProps.ot_approver1_empno || 'Any Higher Ranking Officer'} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%'}} label='Approver2:' value={ThisProps.ot_approver2_empno || '-'} InputProps={{readOnly: true,}} variant='standard'/> */}
                    <TextField sx={{width: '100%'}} label='OVERTIME Description:' value={ThisProps.ot_remarks || '-'} InputProps={{readOnly: true,}} variant='outlined' multiline rows={4}/>
                </div>
                <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px', color: 'green'}} label='Status:' value={ThisProps.ot_approval_status || '-'} InputProps={{readOnly: true,}} color={ThisProps.ot_approval_status === 'APD' ? 'success' : ThisProps.ot_approval_status === 'DIS' ? 'error' : 'warning'} variant='filled' focused/>
                    <TextField sx={{width: '100%'}} label='Business Date:' value={ThisProps?.ot_business_date? dayjs(ThisProps.ot_business_date).format('MM-DD-YYYY') : '-'} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%'}} label='Date From:' value={ThisProps.ot_date_from? dayjs(ThisProps.ot_date_from).format('MM-DD-YYYY - HH:mm a') : '-'} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%'}} label='Date Until:' value={ThisProps.ot_date_to? dayjs(ThisProps.ot_date_to).format('MM-DD-YYYY - HH:mm a') : '-'} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%'}} label='Date Approved: #1' value={ThisProps.ot_date_approved1? dayjs(ThisProps.ot_date_approved1).format('MM-DD-YYYY LT') : '-'} focused={!!ThisProps.ot_date_approved1} color={ThisProps.ot_date_approved1 ? 'success' : 'warning'} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%'}} label='Date Approved: #2' value={ThisProps.ot_date_approved2? dayjs(ThisProps.ot_date_approved2).format('MM-DD-YYYY LT') : '-'} focused={!!ThisProps.ot_date_approved2} color={ThisProps.ot_date_approved2 ? 'success' : 'warning'} InputProps={{readOnly: true,}} variant='standard'/>
                </div>
                <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px'}} label='Employee Name:' value={ThisProps.emp_name || '-'} InputProps={{readOnly: true,}} variant='filled'/>
                    {/* <TextField sx={{width: '100%', minWidth: '160px'}} label='Employee #:' value={ThisProps.emp_no || '-'} InputProps={{readOnly: true,}} variant='filled'/> */}
                    <TextField sx={{width: '100%', minWidth: '160px'}} label='OVERTIME Type:' value={ThisProps.ot_type || '-'} InputProps={{readOnly: true,}} variant='standard'/>
                    
                    {
                        ThisProps.ot_approval_status === 'DIS' &&
                        <TextField sx={{width: '100%', minWidth: '160px'}} focused={!!ThisProps.ot_reason_disapproval} color={'error'} label='Reason for Disapproval:' value={ThisProps.ot_reason_disapproval || '-'} InputProps={{readOnly: true,}} variant='outlined' multiline rows={4}/>
                    }
                    {
                        ThisProps.ot_approval_status === 'CX' &&
                        <TextField sx={{width: '100%', minWidth: '160px'}} focused={!!ThisProps.ot_reason_cancelled} color={'error'} label='Cancel Reason:' value={ThisProps.ot_reason_cancelled || '-'} InputProps={{readOnly: true,}} variant='outlined' multiline rows={4}/>
                    }


                </div>
                {ThisProps.ot_approval_status === 'APD' && <img src={ '/img/stampApproved2.png' } className='h-32 md:absolute bottom-0 right-0'></img>}
                {ThisProps.ot_approval_status === 'DIS' && <img src={ '/img/stampRejected.png' } className='h-32 md:absolute bottom-0 right-0'></img>}
                {ThisProps.ot_approval_status === 'CX' && <img src={ '/img/stampCancel.png' } className='h-32 md:absolute bottom-0 right-0'></img>}
            </div>

            {isUserCanCancel &&
                <div className='flex flex-col justify-center items-center my-4'>
                    <Button variant='contained' className="w-fit" onClick={()=> setIsCancelModalOpen(true)}>CANCEL APPROVED</Button>
                </div>
            }

            {(ThisProps.ot_approval_status.includes('1') || ThisProps.ot_approval_status.includes('2')) && 
            <div className='flex flex-col justify-center items-center'>
            <div className='flex justify-center mt-6' container-name='ot_buttons_container'>
                <div className='flex md:justify-between md:flex-row flex-col gap-4 px-12 md:p-0 md:w-96' container-name='ot_buttons'>
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
