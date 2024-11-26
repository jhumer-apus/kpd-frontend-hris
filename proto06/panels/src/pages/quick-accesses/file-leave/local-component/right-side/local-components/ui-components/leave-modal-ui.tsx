import { Fragment, Dispatch, SetStateAction, useState, useEffect } from 'react';
import { LEAVEViewInterface } from '@/types/types-pages';
import dayjs from 'dayjs';
import {Button, TextField} from '@mui/material';
import { APILink, globalDateTime } from '@/store/configureStore';
import axios from 'axios';
import axiosInstance from '@/helpers/axiosConfig';

interface LEAVEModalUIInterface {
    singleLEAVEDetailsData: LEAVEViewInterface;
    multiplePayslipMode?: boolean;
    setSingleLEAVEDetailsData: Dispatch<SetStateAction<LEAVEViewInterface>>;
}

function LEAVEModalUI(props: LEAVEModalUIInterface) {
    const ThisProps = props.singleLEAVEDetailsData;

    const [data, setData] = useState(ThisProps)

    useEffect(() => {
        fetchCutOffPeriod()
    },[])
    
    const fetchCutOffPeriod = async () => {
        await axiosInstance.get(`cutoff_period/${ThisProps.cutoff_code}`).then(res => {
            setData(curr => ({
                ...curr,
                cutOffPeriod: res.data.co_name
            }))
        })
    }

    const viewImages = () => {

        if(ThisProps.leave_file_path) {
            const imageUrl = `${APILink.replace('/api/v1/','')}/media/${ThisProps.leave_file_path}`;
            // Open a new tab/window with the images
            window.open(imageUrl, '_blank');

        } else{

            window.alert("This employee does not file supporting image")
        }
    }


    return (
        <Fragment>
            <div className='flex md:flex-row flex-col gap-10 overflow-auto relative'>
                <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px'}} label='Date & Time Filed:' value={ThisProps.leave_date_filed ? dayjs(ThisProps.leave_date_filed).format(`${globalDateTime}`) : '-'} InputProps={{readOnly: false,}} variant='filled'/>
                    <TextField sx={{width: '100%'}} label='Total hrs:' value={(ThisProps.leave_total_hours / 60).toFixed(2) || '-'} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%'}} label='Cutoff Period:' value={data?.cutOffPeriod || '-'} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%'}} label='Approver1:' value={ThisProps?.leave_approver1_empno? `${ThisProps?.leave_approver1_empno} - ${ThisProps?.approver1_name}`: ""} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%'}} label='Approver2:' value={ThisProps?.leave_approver2_empno? `${ThisProps?.leave_approver2_empno} - ${ThisProps?.approver2_name}`: ""} InputProps={{readOnly: true,}} variant='standard'/>
                    {/* <TextField sx={{width: '100%'}} label='Approver1:' value={ThisProps.leave_approver1_empno || 'Any Higher Ranking Officer'} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%'}} label='Approver2:' value={ThisProps.leave_approver2_empno || '-'} InputProps={{readOnly: true,}} variant='standard'/> */}
                    <TextField sx={{width: '100%'}} label='LEAVE Description:' value={ThisProps.leave_remarks || '-'} InputProps={{readOnly: true,}} variant='outlined' multiline rows={4}/>
                </div>
                <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px', color: 'green'}} label='Status:' value={ThisProps.leave_approval_status || '-'} InputProps={{readOnly: true,}} color={ThisProps.leave_approval_status === 'APD' ? 'success' : ThisProps.leave_approval_status === 'DIS' ? 'error' : 'warning'} variant='filled' focused/>
                    <TextField sx={{width: '100%'}} label='Date From:' value={ThisProps.leave_date_from? dayjs(ThisProps.leave_date_from).format('MM-DD-YYYY - HH:mm a') : '-'} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%'}} label='Date Until:' value={ThisProps.leave_date_to? dayjs(ThisProps.leave_date_to).format('MM-DD-YYYY - HH:mm a') : '-'} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%'}} label='Date Approved: #1' value={ThisProps.leave_date_approved1? dayjs(ThisProps.leave_date_approved1).format('MM-DD-YYYY LT') : '-'} focused={!!ThisProps.leave_date_approved1} color={ThisProps.leave_date_approved1 ? 'success' : 'warning'} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%'}} label='Date Approved: #2' value={ThisProps.leave_date_approved2? dayjs(ThisProps.leave_date_approved2).format('MM-DD-YYYY LT') : '-'} focused={!!ThisProps.leave_date_approved2} color={ThisProps.leave_date_approved2 ? 'success' : 'warning'} InputProps={{readOnly: true,}} variant='standard'/>
                    {((ThisProps.is_sl  && !ThisProps.is_vl && !ThisProps.is_el) || ThisProps.leave_type_name=="Sick Leave") && 
                        <Button onClick={viewImages}>View Supporting Image</Button>
                    }
                </div>
                <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px'}} label='Employee #:' value={ThisProps.emp_no || '-'} InputProps={{readOnly: true,}} variant='filled'/>
                    <TextField sx={{width: '100%', minWidth: '160px'}} label='LEAVE Type:' value={ThisProps.leave_type_name || '-'} InputProps={{readOnly: true,}} variant='standard'/>
                    {(ThisProps.is_el || ThisProps.leave_type_name=="Emergency Leave") && 
                        <TextField 
                            sx={{width: '100%'}} 
                            label='Emergency Reason' 
                            value={ThisProps.emergency_reasons} 
                            variant='standard'
                        />
                    }
                    {
                        ThisProps.leave_approval_status == 'DIS' &&
                        <TextField sx={{width: '100%', minWidth: '160px'}} focused={!!ThisProps.leave_reason_disapproval} color={'error'} label='Reason for Disapproval:' value={ThisProps.leave_reason_disapproval || '-'} InputProps={{readOnly: true,}} variant='outlined' multiline rows={4}/>
                    }
                    {
                        ThisProps.leave_approval_status == 'CX' &&
                        <TextField sx={{width: '100%', minWidth: '160px'}} focused={!!ThisProps.leave_reason_cancelled} color={'error'} label='Cancel Reason:' value={ThisProps.leave_reason_cancelled || '-'} InputProps={{readOnly: true,}} variant='outlined' multiline rows={4}/>
                    }

                    {/* <TextField sx={{width: '100%', minWidth: '160px'}} focused={!!ThisProps.leave_reason_disapproval} color={'error'} label='Reason for Disapproval:' value={ThisProps.leave_reason_disapproval || '-'} InputProps={{readOnly: true,}} variant='outlined' multiline rows={4}/> */}
                </div>
                {ThisProps.leave_approval_status === 'APD' && <img src={ '/img/stampApproved2.png' } className='h-32 md:absolute bottom-0 right-0'></img>}
                {ThisProps.leave_approval_status === 'DIS' && <img src={ '/img/stampRejected.png' } className='h-32 md:absolute bottom-0 right-0'></img>}
                {ThisProps.leave_approval_status === 'CX' && <img src={ '/img/stampCancel.png' } className='h-32 md:absolute bottom-0 right-0'></img>}
            </div>
        </Fragment>
    );
}

export default LEAVEModalUI;