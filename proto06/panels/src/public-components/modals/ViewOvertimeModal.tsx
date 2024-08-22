import { fetchCutOffPeriods } from '@/helpers/ApiCalls';
import { HandleModalAction } from '@/store/actions/components';
import { APILink, RootState } from '@/store/configureStore';
import { Textarea, Typography } from '@material-tailwind/react';
import {Grid, Modal, TextField} from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';

interface Props {
    emp_no: number,
    ot_id: number
}
export default function ViewOvertimeModal (props: Props) {

    const { emp_no, ot_id} = props
    const {viewOvertimeModal} = useSelector((state:RootState) => state.component)

    const dispatch = useDispatch()
    
    const handleClose = () => {
        dispatch(HandleModalAction({
            name: "viewOvertimeModal",
            value: false
          }))
    }
    
    const [details, setDetails] = useState({
        id: 24,
        ot_date_filed: "2024-06-28T10:28:57.592821",
        ot_type: "After Duty",
        ot_remarks: "testing (ot_date_approved1 by: 9989 BITVERSE, FRONTEND DEVELOPER) (disapproved by: 9990 BITVERSE, BACKEND DEVELOPER)",
        ot_date_from: "2024-06-03T17:45:00",
        ot_date_to: "2024-06-03T20:00:00",
        ot_approval_status: "DIS",
        ot_reason_disapproval: "deny hayts <Updated: Jul-01-24 10:49 AM>",
        ot_business_date: null,
        ot_total_hours: 135,
        ot_date_approved1: "2024-07-01T10:48:44.254666",
        ot_date_approved2: null,
        emp_no: 202402,
        cutoff_code: 11,
        ot_approver1_empno: 202401,
        ot_approver2_empno: 9990
    })

    useEffect(() => {
        fetchData()
    },[emp_no, ot_id])

    const fetchData = async () => {
        await axios.get(`${APILink}ot/${emp_no}/${ot_id}/`).then(res => setDetails(curr => res.data))
    }


    const renderStamp = () => {

        switch (details?.ot_approval_status) {
            case "APD":
                return (
                    <img className="w-20" src="/img/stampApproved2.png"/>
                )
            case "DIS":
                return (
                    <img className="w-20" src="/img/stampRejected.png"/>
                )
            default:
                break;
        }
    }

    
    return (
        <Fragment>
            <Modal
                open={viewOvertimeModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                // className='overflow-auto'
            >
                <div className='modal-content'>
                    <div className='flex items-center gap-4'>
                        <Typography variant="h5" component="h2">Overtime Application Details</Typography>
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
                                label="Date Filed"
                                InputProps={{
                                    readOnly: true,
                                }}
                                value={details.ot_date_filed? dayjs(details.ot_date_filed).format("YYYY-MM-DD hh:mm"): ""}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                InputLabelProps={{ shrink: true }}
                                className='w-72'
                                label="Overtime Type"
                                InputProps={{
                                    readOnly: true,
                                }}
                                value={details.ot_type}
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
                                value={dayjs(details.ot_date_from).format("YYYY-MM-DD hh:mm")}
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
                                value={dayjs(details.ot_date_to).format("YYYY-MM-DD hh:mm")}
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
                                value={details.ot_total_hours/60}
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
                                value={details.ot_approval_status}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField 
                                sx={{width: '100%'}} 
                                label='Business Date:' 
                                value={details?.ot_business_date? dayjs(details?.ot_business_date).format('MM-DD-YYYY') : ""} 
                                InputProps={{readOnly: true,}} 
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
                                value={details.ot_approver1_empno}
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
                                value={details.ot_date_approved1? dayjs(details.ot_date_approved1).format("YYYY-MM-DD hh:mm"): ""}
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
                                value={details.ot_approver2_empno}
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
                                value={details.ot_date_approved2? dayjs(details.ot_date_approved2).format("YYYY-MM-DD hh:mm"): ""}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <Textarea
                                shrink
                                // minRows={3}
                                // className='w-72'
                                label="Disapprove Reason"
                                readOnly
                                value={details.ot_reason_disapproval}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <Textarea
                                shrink
                                className='w-72'
                                label="Overtime Description"
                                readOnly
                                // InputProps={{
                                //     readOnly: true,
                                // }}
                                value={details.ot_remarks}
                            />
                        </Grid>
                
                    </Grid>

                </div>
                
                
            </Modal>
        </Fragment>
    )
}