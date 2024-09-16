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
    obt_id: number
}
export default function ViewOBTModal (props: Props) {

    const { emp_no, obt_id} = props
    const {viewOBTModal} = useSelector((state:RootState) => state.component)

    const dispatch = useDispatch()
    
    const handleClose = () => {
        dispatch(HandleModalAction({
            name: "viewOBTModal",
            value: false
          }))
    }
    
    const [details, setDetails] = useState({
        emp_name: null,
        emp_no: null,
        obt_date_filed: "",
        obt_type: null,
        obt_type_name: "",
        obt_location: null,
        obt_date_from: null,
        obt_date_to: null,
        obt_business_date: null,
        obt_approval_status: null,
        obt_total_hours: 0,
        obt_reason_disapproval: "",
        obt_approver1_empno: null,
        obt_approver2_empno: null,
        obt_date_approved1: null,
        obt_date_approved2: null,
        cutoff_code: null,
        co_name: null,
        cutoff_name: ""
    })

    useEffect(() => {
        fetchData()
    },[emp_no, obt_id])

    const fetchData = async () => {
        await axios.get(`${APILink}obt/${emp_no}/${obt_id}/`).then(res => setDetails(curr => res.data))
    }


    const renderStamp = () => {

        switch (details?.obt_approval_status) {
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

    const obtTotalHours = (!details.obt_total_hours || Number.isNaN(details.obt_total_hours))? "-" : (details.obt_total_hours / 60).toFixed(2)
    return (
        <Fragment>
            <Modal
                open={viewOBTModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                // className='overflow-auto'
            >
                <div className='modal-content'>
                    <div className='flex items-center gap-4'>
                        <Typography variant="h5" component="h2">OBT Application Details</Typography>
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
                                value={details.obt_date_filed? dayjs(details.obt_date_filed).format("YYYY-MM-DD hh:mm"): ""}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                InputLabelProps={{ shrink: true }}
                                className='w-72'
                                label="OBT Type"
                                InputProps={{
                                    readOnly: true,
                                }}
                                value={details.obt_type_name}
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
                                value={dayjs(details.obt_date_from).format("YYYY-MM-DD hh:mm")}
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
                                value={dayjs(details.obt_date_to).format("YYYY-MM-DD hh:mm")}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                InputLabelProps={{ shrink: true }}
                                className='w-72'
                                label="OBT Location"
                                InputProps={{
                                    readOnly: true,
                                }}
                                value={details.obt_location}
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
                                value={obtTotalHours}
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
                                value={details.obt_approval_status}
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
                                value={details.obt_approver1_empno}
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
                                value={details.obt_date_approved1? dayjs(details.obt_date_approved1).format("YYYY-MM-DD hh:mm"): ""}
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
                                value={details.obt_approver2_empno}
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
                                value={details.obt_date_approved2? dayjs(details.obt_date_approved2).format("YYYY-MM-DD hh:mm"): ""}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField 
                                sx={{width: '100%'}} 
                                label='Business Date:' 
                                value={details?.obt_business_date? dayjs(details?.obt_business_date).format('MM-DD-YYYY') : ""} 
                                InputProps={{readOnly: true,}} 
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <Textarea 
                                shrink={true}
                                // minRows={3}
                                // className='w-72'
                                label="Disapprove Reason"
                                readOnly
                                value={details.obt_reason_disapproval}
                            />
                        </Grid>
                
                    </Grid>

                </div>
                
                
            </Modal>
        </Fragment>
    )
}