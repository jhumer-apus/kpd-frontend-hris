import { useState, Fragment, Dispatch, SetStateAction, useEffect } from 'react';
import { OFFBOARDINGSTATUSEditInterface, OFFBOARDINGSTATUSViewInterface } from '@/types/types-employee-and-applicants';
import {TextField, Typography} from '@mui/material';
import dayjs from 'dayjs';
import { Button } from '@mui/material';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';




import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, globalAPIDate } from '@/store/configureStore';
import { OFFBOARDINGSTATUSEditAction, OFFBOARDINGSTATUSEditActionFailureCleanup } from '@/store/actions/employee-and-applicants';


interface OFFBOARDINGSTATUSModalUIInterface {
    singleOFFBOARDINGSTATUSDetailsData: OFFBOARDINGSTATUSViewInterface;
    multiplePayslipMode?: boolean;
    setSingleOFFBOARDINGSTATUSDetailsData: Dispatch<SetStateAction<OFFBOARDINGSTATUSViewInterface>>;
}

function OFFBOARDINGSTATUSModalUI(props: OFFBOARDINGSTATUSModalUIInterface) {
    const dispatch = useDispatch();
    const curr_user = useSelector((state: RootState) => state.auth.employee_detail?.emp_no);
    const editState = useSelector((state: RootState) => state.employeeAndApplicants.OFFBOARDINGSTATUSEdit)
    const [ editMode, setEditMode ] = useState(false);
    const ThisProps = props.singleOFFBOARDINGSTATUSDetailsData;
    const [ editData, setEditData ] = useState<OFFBOARDINGSTATUSEditInterface>({
        id: NaN,
        emp_no: NaN,
        date_offboard: null,
        final_remarks: '',
        added_by: NaN,
        status: 'Pending',
    })

    useEffect(() => {
        setEditData((prevState)=> {
         return (
            {
                ...prevState,
                id: ThisProps.id,
                emp_no: ThisProps.emp_no,
                date_offboard: ThisProps.date_offboard,
                final_remarks: ThisProps.final_remarks,
                added_by: curr_user
            }
         )   
        })
    }, [ThisProps])

    
    useEffect(()=>{
        if(editState.status === 'succeeded'){
            window.alert('Request Successful');
            window.location.reload();
        }else if(editState.status === 'failed'){
            window.alert(`Request Failed, ${editState.error}`)
            setTimeout(()=> {
                dispatch(OFFBOARDINGSTATUSEditActionFailureCleanup());
            }, 500)
        }
    }, [editState.status])

    return (
        <Fragment>
            <div className='flex gap-2'>
                <div className='flex gap-6 w-1/2 flex-col'>
                    <TextField 
                        sx={{width: '100%', minWidth: '160px'}} 
                        label='Employee #:' 
                        value={ThisProps.emp_no} InputProps={{readOnly: true,}} 
                        variant='filled'
                    />
                    <TextField 
                        sx={{width: '100%'}} 
                        label='Final Remarks:' 
                        value={(ThisProps?.final_remarks)} 
                        InputProps={{readOnly: !editMode,}} 
                        variant='outlined'
                        multiline
                        rows={4}
                        disabled={!editMode}
                        focused={editMode}
                        onChange={(event)=>{
                            const value = event.target.value;
                            props.setSingleOFFBOARDINGSTATUSDetailsData((prevState)=> {
                                return(
                                    {
                                        ...prevState,
                                        final_remarks: value
                                    }
                                )
                            })
                        }}
                    />
                </div>
                <div className='flex gap-6 w-1/2 flex-col'>
                    <TextField 
                        sx={{width: '100%'}} 
                        label='Document Status:' 
                        value={ThisProps.status} 
                        InputProps={{readOnly: true,}} 
                        variant='filled'
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                                label="Offboard Date"
                                value={ThisProps?.date_offboard ? dayjs(ThisProps?.date_offboard) : null}
                                onChange={(newValue) => {
                                    const formattedDate = dayjs(newValue).format(`${globalAPIDate}`);
                                    return (
                                        props.setSingleOFFBOARDINGSTATUSDetailsData((prevState)=>{
                                            return(
                                                {
                                                    ...prevState,
                                                    date_offboard: formattedDate
                                                }
                                            )
                                        })
                                    )
                                }}
                                disabled={!editMode}
                            />
                    </LocalizationProvider>
                </div>
            </div>
            <Typography className='italic' style={{marginTop: '16px'}}>Offboarding Lists:</Typography>
            <div className='flex flex-wrap mt-4 pl-2'>
                    {
                        ThisProps?.emp_offboard_reqs?.map((item, index)=> {
                            return(
                                <>
                                <FormControl className='w-1/2 justify-center' sx={{marginTop: '16px'}} disabled>
                                    <FormLabel id="is-locked-manage-user-edit">#{(index + 1)} - {item.offboarding_title}</FormLabel>
                                    <FormLabel style={{fontSize: '12px'}}>Facilitator Employee #: {item.offboarding_facilitator}</FormLabel>
                                    <RadioGroup
                                        className='flex w-full'
                                        row
                                        aria-labelledby="is-locked-manage-user-edit w-full"
                                        name="name-is-locked-manage-user-edit"
                                        value={`${item.status}`}
                                        // onchange is disabled, the status must come from the assigned facilitator
                                    >
                                        <FormControlLabel value="Pending" control={<Radio />} label="Pending" />
                                        <FormControlLabel value="Completed" control={<Radio />} label="Completed" />
                                    </RadioGroup>
                                    <FormLabel style={{fontSize: '12px'}} className='underline'>Facilitator Remarks: {item.facilitator_remarks}</FormLabel>
                                </FormControl>
                                </>
                            )
                        })
                    }

            </div>
            <div className='flex flex-col justify-center items-center'>
                <div className='flex justify-center mt-6' container-name='leave_buttons_container'>
                    <div className='flex justify-center gap-6' style={{width:'400px', marginTop: '20px'}} container-name='leave_buttons'>
                        {
                            !editMode && 
                            <Button variant='contained' onClick={()=> setEditMode(true)}>Edit Details</Button>
                        }
                        {   editMode && 
                            <>
                                <Button variant='contained' color={'primary'} onClick={()=> dispatch(OFFBOARDINGSTATUSEditAction(editData))}>Submit</Button>
                                <Button variant='outlined' color={'warning'} onClick={()=> setEditMode(false)}>Cancel</Button>
                            </>

                        }
                        
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default OFFBOARDINGSTATUSModalUI;