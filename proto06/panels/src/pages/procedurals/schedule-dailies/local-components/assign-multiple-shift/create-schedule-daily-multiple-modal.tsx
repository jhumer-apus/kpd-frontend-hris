import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, globalAPIDate } from '@/store/configureStore';
import dayjs from 'dayjs';
import { SCHEDULEDAILYCreateInterface } from '@/types/types-pages';
import { SCHEDULEDAILYCreateAction, SCHEDULEDAILYCreateActionFailureCleanup } from '@/store/actions/procedurals';
import SCHEDULESHIFTFetchAutoCompleteOnSCHEDULEDAILYPage from '../schedule-shift-autocomplete/schedule-shift-autocomplete';


import Radio from '@mui/material/Radio';
import { Checkbox } from "@material-tailwind/react";
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import EmployeeAutoCompleteLeft from '../employee-autocomplete/employee-autocomplete-left';
import LimitTags from './inner-local-component/inner-schedule-daily-multiple-modal';
import MultiEmployeeAutoCompleteLeft from './inner-local-component/inner-schedule-daily-multiple-modal';
import EmployeeListField from '@/public-components/EmployeeListField';


// const style = {
//   position: 'absolute' as 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   bgcolor: 'background.paper',
//   boxShadow: 24,
//   p: 4,
//   display: 'flex',
//   flexDirection: 'column',
//   gap: 3,
//   width: 400,
//   overflow: 'auto',
// //   height: '100%',
// };

const modalStyle = {
    // height: "400px",
    overflowY:"auto"
}

interface CreateSCHEDULEDAILYMultipleModalInterface {
    open2?: boolean,
    setOpen2: React.Dispatch<React.SetStateAction<boolean>>,
    handleOpen2: () => void,
    handleClose2: () => void,
}

export default function CreateSCHEDULEDAILYMultipleModal(props: CreateSCHEDULEDAILYMultipleModalInterface) {

    const dispatch = useDispatch();
    const {open2, handleClose2} = props;
    const currUser = useSelector((state: RootState)=> state.auth.employee_detail)
    const createSCHEDULEDAILY = useSelector((state: RootState)=> state.procedurals.SCHEDULEDAILYCreate);
    const [createSCHEDULEDAILYForm, setCreateSCHEDULEDAILYForm] = useState<SCHEDULEDAILYCreateInterface>({
        schedule_shift_code: NaN,
        business_date_from: null,
        business_date_to: null,
        emp_no: [],
        is_restday: false,
        sched_default: false,
        day_off: [],
        added_by: currUser?.emp_no
    })
    const submitNewSCHEDULEDAILY = () => {
        console.log(createSCHEDULEDAILYForm)
        dispatch(SCHEDULEDAILYCreateAction(createSCHEDULEDAILYForm));
    };

    useEffect(() => {

        if(createSCHEDULEDAILY?.status === 'succeeded') {
            
            window.alert("SCHEDULEDAILY has been successfully created");
            setTimeout(()=> {
                window.location.reload();
            }, 1000)

        } else if (createSCHEDULEDAILY?.status === 'failed') {

            window.alert(`Error: ${createSCHEDULEDAILY.error}`)
            dispatch(SCHEDULEDAILYCreateActionFailureCleanup())

        }
    }, [createSCHEDULEDAILY?.status])

    const handleChangeExcludeDays = (e:React.ChangeEvent<HTMLInputElement>) => {

        const { value, checked } = e.target

        if (checked) {

            setCreateSCHEDULEDAILYForm((curr:any) => ({
                ...curr,
                day_off: [...curr.day_off, value]
            }))

        } else {

            setCreateSCHEDULEDAILYForm((curr:any) => ({
                ...curr,
                day_off: curr.day_off.filter((item:string) => item !== value)
            }))

        }
    }

    const handleChangeEmpField = (e:any, newValue:any) => {
        if(newValue) {
            console.log(newValue)
            setCreateSCHEDULEDAILYForm((prevState:any)=> 
                (
                    {
                        ...prevState,
                        emp_no: newValue.map((emp:any) => emp.emp_no)
                    }
                )
            )
        }
    }

    return (
        <div>
            <Modal
                open={open2 ?? false}
                onClose={handleClose2}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className='overflow-y-auto'
            >
            <Box className="bg-white flex flex-col gap-4 w-96 m-auto p-4  overflow-auto my-8">
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Assign Daily Schedule to Multiple Employees
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Make sure to double check all the fields and entry.
                </Typography>
                <SCHEDULESHIFTFetchAutoCompleteOnSCHEDULEDAILYPage createSCHEDULEDAILY={createSCHEDULEDAILYForm} setCreateSCHEDULEDAILY={setCreateSCHEDULEDAILYForm}/>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        value={createSCHEDULEDAILYForm.business_date_from}
                        onChange={(newValue) => {
                            setCreateSCHEDULEDAILYForm((prevState)=> ({
                                ...prevState,
                                business_date_from: dayjs(newValue).format(`${globalAPIDate}`)
                            }))
                        }}
                        label="Date Range From"
                        slotProps={{
                        textField: {
                            helperText: 'MM/DD/YYYY',
                        },
                        }}
                    />
                    <DatePicker
                        value={createSCHEDULEDAILYForm.business_date_to}
                        onChange={(newValue) => {
                            setCreateSCHEDULEDAILYForm((prevState)=> ({
                                ...prevState,
                                business_date_to: (newValue !== null ? dayjs(newValue).format(`${globalAPIDate}`) :  null) 
                            }))
                        }}
                        label="Date Range To (Optional)"
                        slotProps={{
                        textField: {
                            helperText: 'MM/DD/YYYY',
                        },
                        }}
                    />
                </LocalizationProvider>
                {/* <EmployeeAutoCompleteLeft createSCHEDULEDAILY={createSCHEDULEDAILYForm} setCreateSCHEDULEDAILY={setCreateSCHEDULEDAILYForm}/> */}
                {/* <MultiEmployeeAutoCompleteLeft createSCHEDULEDAILY={createSCHEDULEDAILYForm} setCreateSCHEDULEDAILY={setCreateSCHEDULEDAILYForm}/> */}
                <EmployeeListField 
                    label="For Employee No.:" 
                    handleChange={handleChangeEmpField} 
                    currentValue={createSCHEDULEDAILYForm.emp_no}
                    multiple={true}
                />
                
                {/* <FormControl>
                    <FormLabel id="demo-controlled-radio-buttons-group">Is Restday</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={`${!!createSCHEDULEDAILYForm.is_restday}`}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            const value = (event.target.value=== 'true' ? true : false);
                            setCreateSCHEDULEDAILYForm((prevState)=> {
                                return (
                                    {
                                        ...prevState,
                                        is_restday: value
                                    }
                                )
                            })
                        }}
                    >
                        <FormControlLabel value="true" control={<Radio />} label="Yes" />
                        <FormControlLabel value="false" control={<Radio />} label="No" />
                    </RadioGroup>
                </FormControl> */}
                <div className="flex flex-col">
                    <Typography sx={{ mt: 1 }}>
                        Day Off:
                    </Typography>
                    <Checkbox onChange={handleChangeExcludeDays} label="Sunday" value="sunday"/>
                    <Checkbox onChange={handleChangeExcludeDays} label="Monday" value="monday"/>
                    <Checkbox onChange={handleChangeExcludeDays} label="Tuesday" value="tuesday"/>
                    <Checkbox onChange={handleChangeExcludeDays} label="Wednesday" value="wednesday"/>
                    <Checkbox onChange={handleChangeExcludeDays} label="Thursday" value="thursday"/>
                    <Checkbox onChange={handleChangeExcludeDays} label="Friday" value="friday"/>
                    <Checkbox onChange={handleChangeExcludeDays} label="Saturday" value="saturday"/>
                </div>
                
                {/* <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">Exclude Days (OFF Days)</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                        defaultValue={createSCHEDULEDAILYForm.exclude_days}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
                            setCreateSCHEDULEDAILYForm(curr => ({
                                ...curr,
                                exclude_days: (e.target as HTMLInputElement).value
                            }))
                        }}
                    >
                        <FormControlLabel value="saturday" control={<Radio />} label="Saturday" />
                        <FormControlLabel value="sunday" control={<Radio />} label="Sunday" />
                        <FormControlLabel value="saturday_and_sunday" control={<Radio />} label="Saturday and Sunday" />
                        <FormControlLabel value="default" control={<Radio />} label="Default"/>
                    </RadioGroup>
                </FormControl> */}
                <div className='flex justify-end'>
                <Button variant="contained" onClick={submitNewSCHEDULEDAILY}> Submit SCHEDULEDAILY </Button>
                </div>
            </Box>
            </Modal>
        </div>
    );
}