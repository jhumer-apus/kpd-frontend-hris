import React, { useEffect, useState } from 'react';
import { ONBOARDINGSTATUSEditInterface, ONBOARDINGSTATUSUpdateInterface, ONBOARDINGSTATUSViewInterface } from '@/types/types-employee-and-applicants';
import { Button, Typography } from '@mui/material';
import dayjs from 'dayjs';
import {TextField} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, globalAPIDate } from '@/store/configureStore';
import { ONBOARDINGSTATUSEditAction, ONBOARDINGSTATUSEditActionFailureCleanup, ONBOARDINGSTATUSUpdateAction, ONBOARDINGSTATUSUpdateActionFailureCleanup } from '@/store/actions/employee-and-applicants';
import ONBOARDINGSTATUSTypeAutoComplete from './inner-ui-components/onboarding-status-radiogroup';
import DateFieldInput from './inner-ui-components/date-field';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';
interface ONBOARDINGSTATUSModalUIInterface {
    singleONBOARDINGSTATUSDetailsData: ONBOARDINGSTATUSViewInterface;
    multiplePayslipMode?: boolean;
    setSingleONBOARDINGSTATUSDetailsData: React.Dispatch<React.SetStateAction<ONBOARDINGSTATUSViewInterface>>;
}

function ONBOARDINGSTATUSModalUI(props: ONBOARDINGSTATUSModalUIInterface) {
    const dispatch = useDispatch();
    const EAStoreState = useSelector((state: RootState) => state.employeeAndApplicants);
    const { setSingleONBOARDINGSTATUSDetailsData, singleONBOARDINGSTATUSDetailsData } = props;
    const ThisProps = props.singleONBOARDINGSTATUSDetailsData;
    const curr_user = useSelector((state: RootState)=> state.auth.employee_detail);

    const [ forReqsAPIPayload, setForReqsAPIPayload ] = useState<ONBOARDINGSTATUSUpdateInterface>({
        emp_no: NaN,
        onboarding_requirement_code_array: [],
        date_commencement_array: [],
        emp_remarks_array: [],
        facilitator_remarks_array: [],
        status_array: [],
        added_by: NaN,
    });

    const [ documentPayload, setDocumentPayload ] = useState<ONBOARDINGSTATUSEditInterface>({
        id: NaN,
        date_start: null,
        status: 'Pending',
        final_remarks: '',
        emp_no: NaN,
        added_by: NaN
    });

    const [saveChangesButton, setSaveChangesButton] = useState<boolean>(false); 

    useEffect(()=> {
        if(singleONBOARDINGSTATUSDetailsData.emp_no || curr_user?.emp_no){
            setForReqsAPIPayload((prevState) => {
                return (
                    {
                        ...prevState,
                        emp_no: singleONBOARDINGSTATUSDetailsData.emp_no,
                        added_by: curr_user?.emp_no
                    }
                )
            })
            setDocumentPayload((prevState) => {
                return (
                    {
                        ...prevState,
                        id: singleONBOARDINGSTATUSDetailsData.id,
                        date_start: singleONBOARDINGSTATUSDetailsData.date_start,
                        status: singleONBOARDINGSTATUSDetailsData.status,
                        final_remarks: singleONBOARDINGSTATUSDetailsData.final_remarks,
                        emp_no: singleONBOARDINGSTATUSDetailsData.emp_no,
                        added_by: curr_user?.emp_no
                    }
                )
            })
        };
    }, [singleONBOARDINGSTATUSDetailsData.emp_no, curr_user])

    useEffect(()=> {
        if (singleONBOARDINGSTATUSDetailsData.emp_onboard_reqs) {
            const initialItems = singleONBOARDINGSTATUSDetailsData.emp_onboard_reqs.map((item) => ({
                onboarding_requirement_code: item.id,
                emp_remarks: item.emp_remarks || "",
                facilitator_remarks: item.facilitator_remarks || "",
                status: item.status || "",
                date_commencement: item.date_commencement ? dayjs(item.date_commencement).format(`${globalAPIDate}`) : null,
            }));
            setForReqsAPIPayload((prevState) => ({
                ...prevState,
                onboarding_requirement_code_array: initialItems.map((item) => item.onboarding_requirement_code),
                emp_remarks_array: initialItems.map((item) => item.emp_remarks),
                facilitator_remarks_array: initialItems.map((item) => item.facilitator_remarks),
                status_array: initialItems.map((item) => item.status),
                date_commencement_array: initialItems.map((item) => item.date_commencement),
            }));
        }
    }, [singleONBOARDINGSTATUSDetailsData])

    useEffect(()=>{
        if(EAStoreState.ONBOARDINGSTATUSUpdate.status === 'succeeded' || EAStoreState.ONBOARDINGSTATUSEdit.status === 'succeeded'){
            window.alert('Request Successful');
            window.location.reload();
        }else if(EAStoreState.ONBOARDINGSTATUSUpdate.status === 'failed' || EAStoreState.ONBOARDINGSTATUSEdit.status === 'failed'){
            
            if(EAStoreState.ONBOARDINGSTATUSUpdate.status === 'failed'){
                window.alert(`Request Failed, ${EAStoreState.ONBOARDINGSTATUSUpdate.error}`)
                setTimeout(()=> {
                    dispatch(ONBOARDINGSTATUSUpdateActionFailureCleanup());
                }, 400)
            }else if(EAStoreState.ONBOARDINGSTATUSEdit.status === 'failed'){
                window.alert(`Request Failed, ${EAStoreState.ONBOARDINGSTATUSEdit.error}`)
                setTimeout(()=> {
                    dispatch(ONBOARDINGSTATUSEditActionFailureCleanup());
                }, 400)
            }

        }
    }, [EAStoreState.ONBOARDINGSTATUSUpdate.status, EAStoreState.ONBOARDINGSTATUSEdit.status])


    const buttonAction = (mode: number) => {
        const InputDetails = () => {
            if(singleONBOARDINGSTATUSDetailsData.status === "Completed"){
                window.alert("You cannot modify this already confirmed document.")
                return
            }else{
                setSaveChangesButton(!saveChangesButton);
            }
        };
        const SubmitChanges = () => {
            setSaveChangesButton(!saveChangesButton);
            dispatch(ONBOARDINGSTATUSUpdateAction(forReqsAPIPayload));
            dispatch(ONBOARDINGSTATUSEditAction(documentPayload));
        };
        switch(mode){
            case 0: InputDetails();
            break;
            case 1: SubmitChanges();
            break;
        };  
    }

    const updatePassedState = (index: number, field_get: string, value: string) => {
        setSingleONBOARDINGSTATUSDetailsData((prevState) => {
            const updatedEmpOnboardReqs = [...(prevState?.emp_onboard_reqs || [])];
            const updatedValue = { ...updatedEmpOnboardReqs[index] };
            if(updatedValue){
                updatedValue[field_get] = value;
                updatedEmpOnboardReqs[index] = updatedValue;
            };
            return{
                ...prevState,
                emp_onboard_reqs: updatedEmpOnboardReqs
            };
        });
    };


    const updateAPIState = (index: number, field_submit: string, value: string) => {
        setForReqsAPIPayload((prevState) => {
            const updatedArray = [...(prevState as any)[field_submit]];
            updatedArray[index] = value;
            const updatedState: Partial<ONBOARDINGSTATUSUpdateInterface> = {
            [field_submit]: updatedArray,
            };
        
            return {
            ...prevState,
            ...updatedState,
            };
        });

    }; 

    const dualStateUpdate = (index: number, field_submit: string, field_get: string, value: string) => {
        updateAPIState(index, field_submit, value);
        updatePassedState(index, field_get, value);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue= event.target.value as "Pending" | "Completed";
        setDocumentPayload((prevState) => {
            return (
                {
                    ...prevState,
                    status: newValue,
                }
            )
        })
        setSingleONBOARDINGSTATUSDetailsData((prevState) => {
            return ({
                ...prevState,
                status: newValue,
            })
        })
    };

    return (
        <React.Fragment>           
            <div className='flex justify-center flex-col'>
                <Typography variant='h5' className='flex justify-center text-center'>
                        Employee Number: {singleONBOARDINGSTATUSDetailsData.emp_no}
                </Typography>
                <Typography variant='subtitle1' className='flex justify-center text-center'>
                        Onboarding Data ID: {singleONBOARDINGSTATUSDetailsData.id}
                </Typography>
                <div className='flex justify-center my-4'>
                    <div style={{border: '0px solid blue'}} className='flex flex-col align-center justify-center text-center'>
                            <div style={{border: '0px solid yellow'}}>
                            <FormControl>
                                {/* <FormLabel id="_onboarding_status">Status</FormLabel> */}
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-controlled-radio-buttons-group"
                                    name="controlled-radio-buttons-group"
                                    value={singleONBOARDINGSTATUSDetailsData.status}
                                    onChange={handleInputChange}

                                >
                                <FormControlLabel disabled={!saveChangesButton} value="Pending" control={<Radio />} label="Pending" />
                                <FormControlLabel disabled={!saveChangesButton} value="Completed" control={<Radio />} label="Completed" />
                                </RadioGroup>
                            </FormControl> 
                            </div>
                            <div style={{border: '0px solid red'}} className='flex' container-name='obt_buttons_container'>
                                <div className='flex justify-center' style={{width:'300px'}} container-name='obt_buttons'>
                                    <Button 
                                        variant='contained' 
                                        sx={{display: `${saveChangesButton ? 'none': 'block'}`}} 
                                        aria-hidden={saveChangesButton} 
                                        hidden={saveChangesButton} 
                                        onClick={() => buttonAction(0)}
                                    >Input Details</Button>
                                    <Button 
                                        variant='outlined' 
                                        sx={{display: `${!saveChangesButton ? 'none': 'block'}`}} 
                                        aria-hidden={!saveChangesButton} 
                                        hidden={!saveChangesButton} 
                                        onClick={() => buttonAction(1)}
                                    >Submit Changes</Button>
                                </div>
                            </div>
                    </div>
                    <div className='flex flex-col justify-center align-center text-center'>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Date Start"
                                    value={dayjs(singleONBOARDINGSTATUSDetailsData.date_start)}
                                    disabled={!saveChangesButton}
                                    onChange={(newValue) => {
                                        const formattedDate = dayjs(newValue).format('YYYY-MM-DDTHH:mm:ss');
                                        setDocumentPayload((prevState) => {
                                            return (
                                                {
                                                    ...prevState,
                                                    date_start: formattedDate,
                                                }
                                            )
                                        })
                                        setSingleONBOARDINGSTATUSDetailsData((prevState) => {
                                            return ({
                                                ...prevState,
                                                date_start: formattedDate,
                                            })
                                        })
                                    }}
                                />
                            </LocalizationProvider>
                    </div>
                </div>
            </div>

            <Typography className="italic text-center" variant="body2">
                Reminder: Make sure to check each fields and make sure that each of the fields has an update. Facilitators are the one who will fill in the completion of each item.
            </Typography>
            
            <div className='flex gap-10 overflow-auto relative'>
                <div className='flex gap-10 flex-col mt-4 w-full' style={{zoom: 0.9}}>
                    {
                        singleONBOARDINGSTATUSDetailsData?.emp_onboard_reqs?.map((item, index) => {
                            return(
                                <>
                                <hr style={{borderTop: '3px double #8c8b8b'}}/>
                                <TextField 
                                    sx={{width: '100%'}} 
                                    label={`Requirement #${index + 1}`} 
                                    value={item.onboarding_title} 
                                    InputProps={{readOnly: true,}} 
                                    variant='filled' 
                                    multiline 
                                    rows={2}
                                />
                                <TextField 
                                    sx={{width: '100%', fontStyle: 'italic'}} 
                                    label={`Facilitator Remarks to #${index + 1}`} 
                                    placeholder='You can input if the employee has completed this requirement with date here.'
                                    value={item.facilitator_remarks} 
                                    disabled={!saveChangesButton}
                                    focused={saveChangesButton}
                                    variant='outlined' 
                                    multiline 
                                    rows={2}
                                    onChange={(event) => {
                                        const newValue = event.target.value;
                                        dualStateUpdate(index, "facilitator_remarks_array", "facilitator_remarks", newValue);
                                    }}
                                />
                                <div className='flex justify-start gap-4'>
                                    <DateFieldInput 
                                        disabledDate={saveChangesButton}
                                        index={index} 
                                        initialDate={item.date_commencement} 
                                        setInitialDate={updatePassedState} 
                                    />
                                    <TextField 
                                        sx={{width: '20%', marginTop: '5px'}} 
                                        type='number'
                                        placeholder={'Employee #'} 
                                        label={`Facilitator Emp #${index + 1}`} 
                                        value={item.onboarding_facilitator} 
                                        InputProps={{readOnly: true,}} 
                                        variant='standard' 
                                    />
                                    <ONBOARDINGSTATUSTypeAutoComplete 
                                        initialValue={item} 
                                        itemIndex={index} 
                                        setInitialValue={updatePassedState}
                                        disabled={saveChangesButton}
                                        setDisabled={setSaveChangesButton} 
                                    />

                                </div>

                                </>
                            )
                        })
                    }
                </div>

            </div>



        </React.Fragment>
    );
}

export default ONBOARDINGSTATUSModalUI;