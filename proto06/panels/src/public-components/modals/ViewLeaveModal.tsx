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
        cutoff_name: ""
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
            const imageUrl = `${APILink.replace('/api/v1/','/media/')}${details.leave_file_path}`;
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
                <div className='modal-content'>
                    <div className='flex items-center gap-4'>
                        <Typography variant="h5" component="h2">Leave Application Details</Typography>
                        {renderStamp()}
                    </div>
                    <br></br>
                    <Grid className="" container spacing={2}>

                        <Grid item xs={6}>
                            <TextField
                                InputLabelProps={{ shrink: true }}
                                className='w-72'
                                label="Employee Name"
                                InputProps={{
                                    readOnly: true,
                                }}
                                value={details.emp_name}
                            />

                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                InputLabelProps={{ shrink: true }}
                                className='w-72'
                                label="Employee No"
                                InputProps={{
                                    readOnly: true,
                                }}
                                value={details.emp_no}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                InputLabelProps={{ shrink: true }}
                                className='w-72'
                                label="Leave Type"
                                InputProps={{
                                    readOnly: true,
                                }}
                                value={details.leave_type_name}
                            />
                        </Grid>

                        
                        <Grid item xs={6}>
                            <TextField
                                InputLabelProps={{ shrink: true }}
                                className='w-72'
                                label="Total Hours"
                                InputProps={{
                                    readOnly: true,
                                }}
                                value={details.leave_total_hours/60}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                InputLabelProps={{ shrink: true }}
                                className='w-72'
                                label="Date & Time Started"
                                InputProps={{
                                    readOnly: true,
                                }}
                                value={dayjs(details.leave_date_from).format("YYYY-MM-DD hh:mm")}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                InputLabelProps={{ shrink: true }}
                                className='w-72'
                                label="Date & Time Ended"
                                InputProps={{
                                    readOnly: true,
                                }}
                                value={dayjs(details.leave_date_to).format("YYYY-MM-DD hh:mm")}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField 
                                InputLabelProps={{ shrink: true }}
                                className='w-72'
                                label="Cut Off Period"
                                InputProps={{
                                    readOnly: true,
                                }}
                                value={details.cutoff_name}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                InputLabelProps={{ shrink: true }}
                                className='w-72'
                                label="Approval Status"
                                InputProps={{
                                    readOnly: true,
                                }}
                                value={details.leave_approval_status}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                InputLabelProps={{ shrink: true }}
                                className='w-72'
                                label="Approver 1"
                                InputProps={{
                                    readOnly: true,
                                }}
                                value={details.leave_approver1_empno}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                InputLabelProps={{ shrink: true }}
                                className='w-72'
                                label="Approver 1 Approved Date"
                                InputProps={{
                                    readOnly: true,
                                }}
                                value={details.leave_date_approved1? dayjs(details.leave_date_approved1).format("YYYY-MM-DD hh:mm"): ""}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                InputLabelProps={{ shrink: true }}
                                className='w-72'
                                label="Approver 2"
                                InputProps={{
                                    readOnly: true,
                                }}
                                value={details.leave_approver2_empno}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                InputLabelProps={{ shrink: true }}
                                className='w-72'
                                label="Approver 2 Approved Date"
                                InputProps={{
                                    readOnly: true,
                                }}
                                value={details.leave_date_approved2? dayjs(details.leave_date_approved2).format("YYYY-MM-DD hh:mm"): ""}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <Textarea
                                shrink={true}
                                label="Leave Description"
                                readOnly
                                value={details.leave_remarks}
                            />
                        </Grid>

                        <Grid item xs={6}>

                            {renderRejectedReasons()}

                        </Grid>
                        
                    </Grid>
                    {((details.is_sl  && !details.is_vl && !details.is_el) || details.leave_type_name=="Sick Leave") && 
                        <Button onClick={viewImages}>View Supporting Image</Button>
                    }
                </div>
                
                
            </Modal>
        </Fragment>
    )
}