import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { Button } from '@mui/material';
import {TextField} from '@mui/material';
import { Input } from "@material-tailwind/react";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import EmployeeAutoComplete from './inner-ui-components/employee-autocomplete';
import LEAVETypeAutoComplete from './inner-ui-components/leave-type-autocomplete';
import DateFromToLEAVECreate from './inner-ui-components/date-from-to-field';
import { Typography } from '@mui/joy';
import { LEAVECreateInterface } from '@/types/types-pages';
import { LEAVECreateAction, LEAVECreateActionFailureCleanup } from '@/store/actions/procedurals';
import { APILink } from '@/store/configureStore';
import axios from 'axios';
import Autocomplete from '@mui/material/Autocomplete';

interface CreateLEAVEModalInterface {
    setOpen?: Dispatch<SetStateAction<boolean>>;
}

interface EmergencyReasons {
    id:number,
    name:string
}

function QuickAccessLEAVECreate(props: CreateLEAVEModalInterface) {

    const dispatch = useDispatch();
    const userData = useSelector((state: RootState) => state.auth.employee_detail);
    const [isSubmittingRequest, setIsSubmittingRequest] = useState<boolean>(false);
    const LEAVECreatestate = useSelector((state: RootState)=> state.procedurals.LEAVECreate);
    const [createLEAVE, setCreateLEAVE] = useState<LEAVECreateInterface>({
        emp_no: NaN,
        leave_type: null,
        leave_remarks: null,
        leave_date_from: null,
        leave_date_to: null,
        added_by: userData?.emp_no,
        uploaded_file: null,
        emergency_reasons: null
    });
    const [remainingLeaveCredits, setRemainingLeaveCredits] = useState(
        {
            vacationLeave: 0,
            sickLeave: 0,
            emergencyLeave: 0
        }
    )

    const onClickSubmit = () => {

        setIsSubmittingRequest(true)

        const formData = new FormData();

        for(const key in createLEAVE) {

            if (Object.prototype.hasOwnProperty.call(createLEAVE, key)) {
                const value = createLEAVE[key as keyof LEAVECreateInterface];
                // Check if the value is not null and not undefined
                if (value !== null && value !== undefined) {
                    formData.append(key, value.toString());
                }
            }
        }
        
        dispatch(LEAVECreateAction(formData))
    };
    useEffect(()=>{

        if(LEAVECreatestate.status === 'succeeded'){

            setIsSubmittingRequest(false)
            window.alert('Request Successful');
            window.location.reload();

        }else if(LEAVECreatestate.status === 'failed'){

            setIsSubmittingRequest(false)

            window.alert(`Request Failed, ${LEAVECreatestate.error}`)

            setTimeout(()=> {
                dispatch(LEAVECreateActionFailureCleanup());
            }, 1000)

        }
    }, [LEAVECreatestate.status])

    useEffect(() => {
        getRemeainingLeaveCredits()
    },[])

    const handleChangeImage = (e:React.ChangeEvent<HTMLInputElement>) => {

        const selectedFile: File | null = e.target.files && e.target.files[0];
        const MAX_FILE_SIZE_MB = 5;

        if (selectedFile) {

            if(selectedFile.size <= MAX_FILE_SIZE_MB * 1024 * 1024) {

                setCreateLEAVE((curr:any) => ({
                    ...curr,
                    uploaded_file: selectedFile
                }))

            } else {
                window.alert('Image should be not more than 5MB');
            }

        }
    }

    const getRemeainingLeaveCredits = async () => {
        axios.get(`${APILink}leave_credit/${userData?.emp_no}`).then(res => {

            if(res && res.data && res.data.length > 0) {

                let vacationLeave = remainingLeaveCredits.vacationLeave
                let sickLeave = remainingLeaveCredits.sickLeave
                let emergencyLeave = remainingLeaveCredits.emergencyLeave

                res.data.forEach((leave:any) => {

                    switch(leave.leave_name) {

                        case "Vacation Leave":
                            vacationLeave = leave.credit_remaining
                            break;
                        
                        case "Sick Leave":
                            sickLeave = leave.credit_remaining
                            break;
                        
                        case "Emergency Leave":
                            emergencyLeave = leave.credit_remaining
                            break;
                        
                    }
                    setRemainingLeaveCredits((curr:any) => ({
                        vacationLeave: vacationLeave,
                        sickLeave: sickLeave,
                        emergencyLeave: emergencyLeave
                    }))
                })
            }
        })
    }

    const emergencyReasons: EmergencyReasons[] = [
        {
            id:1,
            name:"Natural Calamity"
        },
        {
            id:2,
            name:"Sickness of Immediate Family(Parents, children, spouse, siblings)"
        },
        {
            id:3,
            name:"Government-declared non-working day due to calamity"
        },
        {
            id:4,
            name:"Man-made calamity"
        },
        {
            id:5,
            name:"Burial of Immediate Family"
        },
    ]

    const handleChangeEmergencyReasons = (e:any, value:EmergencyReasons | null) => {
        if(value) {
            setCreateLEAVE(curr => (
                {
                    ...curr,
                    emergency_reasons: value?.name
                }
            ))
        }
    }

    return (
        <React.Fragment>
            <Typography style={{border: '2px solid rgb(25, 118, 210)', width: '100%', textAlign: 'center', padding: '2px', background: 'rgb(245,247,248)', boxShadow: '4px 4px 10px rgb(200, 200, 222)'}} variant='plain'>Create a Leave Data</Typography>

            
            <div className='my-4'>
                <Typography fontSize="xl" fontWeight="lg">
                    Remaining Leave Credits
                </Typography>
                <div className='flex flex-col md:flex-row md:space-x-4'>
                    <Typography fontWeight="lg">
                        Vacation Leave: {remainingLeaveCredits.vacationLeave}
                    </Typography>
                    <Typography fontWeight="lg">
                        Sick Leave: {remainingLeaveCredits.sickLeave}
                    </Typography>
                    <Typography fontWeight="lg">
                        Emergency Leave: {remainingLeaveCredits.emergencyLeave}
                    </Typography>
                </div>
            </div>
            <div className='flex flex-col gap-6 overflow-auto relative'>
                <div className='flex flex-wrap gap-3 pt-4'>
                    <div className='flex flex-col gap-3' style={{width:'100%'}}>
                        <EmployeeAutoComplete createLEAVE={createLEAVE} setCreateLEAVE={setCreateLEAVE}/>
                        {/* {createLEAVE.leave_type} */}
                        <Autocomplete
                            onChange={handleChangeEmergencyReasons}
                            disablePortal
                            id="emergency_reasons"
                            options={emergencyReasons}
                            getOptionLabel={(option:EmergencyReasons) => option.name}
                            renderInput={(params:any) => <TextField {...params} label="Emergency Reasons" />}
                        />
                        <LEAVETypeAutoComplete createLEAVE={createLEAVE} setCreateLEAVE={setCreateLEAVE}/>
                        <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='LEAVE Description:'  
                            variant='outlined' 
                            multiline rows={2}
                            value={createLEAVE?.leave_remarks}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                // event.target.value
                                setCreateLEAVE((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            leave_remarks: event.target.value
                                        }
                                    )
                                })
                            }}
                        />
                    </div>
                    <div className='flex flex-col gap-6' style={{width:'100%'}}>
                        <DateFromToLEAVECreate createLEAVE={createLEAVE} setCreateLEAVE={setCreateLEAVE}/>
                    </div>
                </div>
                {createLEAVE.leave_type == 2 &&    
                    <Input 
                        type="file"
                        accept="image/*"
                        label=" Supporting Documents(Image)"
                        onChange={handleChangeImage}
                    />
                }
                <div className='flex justify-center mt-6' container-name='leave_buttons_container'>
                    <div className='flex justify-between' style={{width:'100%'}} container-name='leave_buttons'>
                        <Button variant='contained' onClick={onClickSubmit}>Create LEAVE</Button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default QuickAccessLEAVECreate;

