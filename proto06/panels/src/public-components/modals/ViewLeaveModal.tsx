import { fetchCutOffPeriods } from '@/helpers/ApiCalls';
import axiosInstance from '@/helpers/axiosConfig';
import { HandleModalAction } from '@/store/actions/components';
import { APILink, RootState } from '@/store/configureStore';
import { Textarea, Typography } from '@material-tailwind/react';
import {Button, Grid, Modal, TextField} from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';

interface Props {
    emp_no: number,
    leave_id: number
}
export default function ViewLeaveModal (props: Props) {

    const { emp_no, leave_id} = props
    const {viewLeaveModal} = useSelector((state:RootState) => state.component)

    const dispatch = useDispatch()
    
    const handleClose = () => {
        dispatch(HandleModalAction({
            name: "viewLeaveModal",
            value: false
          }))
    }
    
    const [details, setDetails] = useState({
        leave_file_path: null,
        emp_name: "",
        leave_type_name: "",
        is_sl: false,
        is_el: false,
        is_vl: true,
        is_paid: true,
        leave_date_filed: "2024-06-03T16:30:22.198402",
        leave_remarks: "going to boracay (9988)",
        leave_date_from: "2024-06-06T08:00:00",
        leave_date_to: "2024-06-06T17:45:00",
        leave_approval_status: "CX",
        leave_reason_disapproval: "",
        leave_reason_cancelled: "makulit eh (9988) (cancelled by: 9988 BITVERSE, TESTER at 2024-06-28 16:40:38.666102)",
        leave_total_hours: 525,
        leave_number_days: 1.0,
        leave_date_approved1: "2024-06-03T16:31:51",
        leave_date_approved2: null,
        emp_no: 9987,
        cutoff_code: 11,
        leave_type: 1,
        leave_uploaded_file: null,
        leave_approver1_empno: 9988,
        leave_approver2_empno: null,
        cutoff_name: "",
        emergency_reasons: ""
    })

    useEffect(() => {
        fetchData()
    },[emp_no, leave_id])

    const fetchData = async () => {
        await axiosInstance.get(`leave/${emp_no}/${leave_id}/`).then(res => setDetails(curr => res.data))
    }


    const renderStamp = () => {

        switch (details?.leave_approval_status) {
            case "APD":
                return (
                    <img className="w-20" src="/img/stampApproved2.png"/>
                )
            case "DIS":
                return (
                    <img className="w-20" src="/img/stampRejected.png"/>
                )

            case "CX":
                return (
                    <img className="w-20" src="/img/stampCancel.png"/>
                )
            default:
                break;
        }
    }

    const renderRejectedReasons = () => {
        switch (details.leave_approval_status) {
            case "DIS":
                return (
                    <Textarea 
                        // minRows={3}
                        // className='w-72'
                        className='border-red-500'
                        label="Disapprove Reason"
                        readOnly
                        value={details.leave_reason_disapproval}
                    />
                )
            
            case "CX":
                return (
                    <Textarea 
                        // minRows={3}
                        className='border-orange-500'
                        label="Cancel Reason"
                        readOnly
                        value={details.leave_reason_cancelled}
                    />
                )
        }
    }

    const viewImages = () => {

        if(details.leave_file_path) {
            const imageUrl = `${APILink.replace('/api/v1/','')}/media/${details.leave_file_path}`;
            // Open a new tab/window with the images
    
            window.open(imageUrl, '_blank');
        } else{
            window.alert("This employee does not file supporting image")
        }
    }

    return (
        <Fragment>
            <Modal
                open={viewLeaveModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                // className='overflow-auto'
            >
                <div className='modal-content relative'>
                    <div className='flex items-center gap-4'>
                        <Typography variant="h5" component="h2">Leave Application Details</Typography>
                        {renderStamp()}
                    </div>
                    <br></br>

                    <div className='flex flex-col overflow-auto justify-around gap-4 relative md:flex-row p-2'>
                        <div className='flex gap-6 flex-col'>
                            <TextField
                                sx={{width: '100%', minWidth: '160px'}}
                                InputLabelProps={{ shrink: true }}
                                // className='w-80'
                                label="Employee Name"
                                InputProps={{
                                    readOnly: true,
                                }}
                                value={details.emp_name}
                            />

                            <TextField
                                InputLabelProps={{ shrink: true }}
                                // className='w-80'
                                label="Employee No"
                                InputProps={{
                                    readOnly: true,
                                }}
                                value={details.emp_no}
                                sx={{width: '100%'}}
                            />

                            <TextField
                                InputLabelProps={{ shrink: true }}
                                // className='w-80'
                                label="Leave Type"
                                InputProps={{
                                    readOnly: true,
                                }}
                                value={details.leave_type_name}
                                sx={{width: '100%'}}
                            />

                            <TextField
                                InputLabelProps={{ shrink: true }}
                                // className='w-72'
                                label="Total Hours"
                                InputProps={{
                                    readOnly: true,
                                }}
                                value={details.leave_total_hours/60}
                                sx={{width: '100%'}}
                            />

                            <Textarea
                                shrink={true}
                                label="Leave Description"
                                readOnly
                                value={details.leave_remarks}
                                sx={{width: '100%'}}
                            />
                        </div>

                        <div className='flex gap-6 flex-col'>

                            <TextField
                                InputLabelProps={{ shrink: true }}
                                // className='w-72'
                                label="Date & Time Started"
                                InputProps={{
                                    readOnly: true,
                                }}
                                value={dayjs(details.leave_date_from).format("YYYY-MM-DD hh:mm")}
                                sx={{width: '100%', minWidth: '160px'}}
                            />

                            <TextField
                                InputLabelProps={{ shrink: true }}
                                // className='w-72'
                                label="Date & Time Ended"
                                InputProps={{
                                    readOnly: true,
                                }}
                                value={dayjs(details.leave_date_to).format("YYYY-MM-DD hh:mm")}
                                sx={{width: '100%'}}
                            />

                            <TextField 
                                InputLabelProps={{ shrink: true }}
                                // className='w-72'
                                label="Cut Off Period"
                                InputProps={{
                                    readOnly: true,
                                }}
                                value={details.cutoff_name}
                                sx={{width: '100%'}}

                            />

                            <TextField
                                InputLabelProps={{ shrink: true }}
                                // className='w-72'
                                label="Approval Status"
                                InputProps={{
                                    readOnly: true,
                                }}
                                value={details.leave_approval_status}
                                sx={{width: '100%'}}
                            />

                            {(details.is_el || details.leave_type_name=="Emergency Leave") && 
                                <Textarea 
                                    label='Emergency Reason' 
                                    value={details.emergency_reasons || ""} 
                                />
                            }

                        </div>

                        <div className='flex gap-6 flex-col'>
                            <TextField
                                InputLabelProps={{ shrink: true }}
                                // className='w-72'
                                label="Approver 1"
                                InputProps={{
                                    readOnly: true,
                                }}
                                value={details.leave_approver1_empno}
                                sx={{width: '100%', minWidth: '160px'}}


                            />

                            <TextField
                                InputLabelProps={{ shrink: true }}
                                // className='w-72'
                                label="Approver 1 Approved Date"
                                InputProps={{
                                    readOnly: true,
                                }}
                                value={details.leave_date_approved1? dayjs(details.leave_date_approved1).format("YYYY-MM-DD hh:mm"): ""}
                                sx={{width: '100%'}}

                            />

                            <TextField
                                InputLabelProps={{ shrink: true }}
                                // className='w-72'
                                label="Approver 2"
                                InputProps={{
                                    readOnly: true,
                                }}
                                value={details.leave_approver2_empno}
                                sx={{width: '100%'}}

                            />

                            <TextField
                                InputLabelProps={{ shrink: true }}
                                // className='w-72'
                                label="Approver 2 Approved Date"
                                InputProps={{
                                    readOnly: true,
                                }}
                                value={details.leave_date_approved2? dayjs(details.leave_date_approved2).format("YYYY-MM-DD hh:mm"): ""}
                                sx={{width: '100%'}}

                            />
                            {renderRejectedReasons()}
                            <div className='text-center h-full flex justify-center item-center'>
                                {((details.is_sl  && !details.is_vl && !details.is_el) || details.leave_type_name=="Sick Leave") && 
                                <Button onClick={viewImages}>View Supporting Image</Button>}
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </Fragment>
    )
}