import React, { useEffect, useState } from 'react';
import { OFFBOARDINGSTATUSUpdateInterface, OFFBOARDINGSTATUSViewInterface, OFFBOARDINGSTATUSEditInterface } from '@/types/types-employee-and-applicants';
import { Button, Typography } from '@mui/material';
import dayjs from 'dayjs';
import {TextField} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, globalAPIDate } from '@/store/configureStore';
import { OFFBOARDINGSTATUSEditAction, OFFBOARDINGSTATUSEditActionFailureCleanup, OFFBOARDINGSTATUSUpdateAction, OFFBOARDINGSTATUSUpdateActionFailureCleanup } from '@/store/actions/employee-and-applicants';
import OFFBOARDINGSTATUSTypeAutoComplete from './inner-ui-components/offboarding-status-radiogroup';
import DateFieldInput from './inner-ui-components/date-field';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';

interface OFFBOARDINGSTATUSModalUIInterface {
    singleOFFBOARDINGSTATUSDetailsData: OFFBOARDINGSTATUSViewInterface;
    multiplePayslipMode?: boolean;
    setSingleOFFBOARDINGSTATUSDetailsData: React.Dispatch<React.SetStateAction<OFFBOARDINGSTATUSViewInterface>>;
}

function OFFBOARDINGSTATUSModalUI(props: OFFBOARDINGSTATUSModalUIInterface) {
    const dispatch = useDispatch();
    const EAStoreState = useSelector((state: RootState) => state.employeeAndApplicants);
    const { setSingleOFFBOARDINGSTATUSDetailsData, singleOFFBOARDINGSTATUSDetailsData } = props;
    const ThisProps = props.singleOFFBOARDINGSTATUSDetailsData;
    const curr_user = useSelector((state: RootState)=> state.auth.employee_detail);

    const [ forAPIPayload, setForAPIPayload ] = useState<OFFBOARDINGSTATUSUpdateInterface>({
        emp_no: NaN,
        offboarding_requirement_code_array: [],
        date_accomplished_array: [],
        emp_remarks_array: [],
        facilitator_remarks_array: [],
        status_array: [],
        added_by: NaN,
    });

    const [ documentPayload, setDocumentPayload ] = useState<OFFBOARDINGSTATUSEditInterface>({
        id: NaN,
        date_offboard: null,
        status: 'Pending',
        final_remarks: '',
        emp_no: NaN,
        added_by: NaN
    });

    const [saveChangesButton, setSaveChangesButton] = useState<boolean>(false); 

    useEffect(()=> {
        if(singleOFFBOARDINGSTATUSDetailsData.emp_no || curr_user?.emp_no){
            setForAPIPayload((prevState) => {
                return (
                    {
                        ...prevState,
                        emp_no: singleOFFBOARDINGSTATUSDetailsData.emp_no,
                        added_by: curr_user?.emp_no
                    }
                )
            })
            setDocumentPayload((prevState) => {
                return (
                    {
                        ...prevState,
                        id: singleOFFBOARDINGSTATUSDetailsData.id,
                        date_offboard: singleOFFBOARDINGSTATUSDetailsData.date_offboard,
                        status: singleOFFBOARDINGSTATUSDetailsData.status,
                        final_remarks: singleOFFBOARDINGSTATUSDetailsData.final_remarks,
                        emp_no: singleOFFBOARDINGSTATUSDetailsData.emp_no,
                        added_by: curr_user?.emp_no
                    }
                )
            })
        };
    }, [singleOFFBOARDINGSTATUSDetailsData.emp_no, curr_user])

    useEffect(()=> {
        if (singleOFFBOARDINGSTATUSDetailsData.emp_offboard_reqs) {
            const initialItems = singleOFFBOARDINGSTATUSDetailsData.emp_offboard_reqs.map((item) => ({
                offboarding_requirement_code: item.id,
                emp_remarks: item.emp_remarks || "",
                facilitator_remarks: item.facilitator_remarks || "",
                status: item.status || "",
                date_accomplished: item.date_accomplished ? dayjs(item.date_accomplished).format(`${globalAPIDate}`) : null,
            }));
            setForAPIPayload((prevState) => ({
                ...prevState,
                offboarding_requirement_code_array: initialItems.map((item) => item.offboarding_requirement_code),
                emp_remarks_array: initialItems.map((item) => item.emp_remarks),
                facilitator_remarks_array: initialItems.map((item) => item.facilitator_remarks),
                status_array: initialItems.map((item) => item.status),
                date_accomplished_array: initialItems.map((item) => item.date_accomplished),
            }));
        }
    }, [singleOFFBOARDINGSTATUSDetailsData])

    useEffect(()=>{
        if(EAStoreState.OFFBOARDINGSTATUSUpdate.status === 'succeeded' || EAStoreState.OFFBOARDINGSTATUSEdit.status === 'succeeded'){
            window.alert('Request Successful');
            window.location.reload();
        }else if(EAStoreState.OFFBOARDINGSTATUSUpdate.status === 'failed' || EAStoreState.OFFBOARDINGSTATUSEdit.status === 'failed'){
            if(EAStoreState.OFFBOARDINGSTATUSEdit.status === 'failed'){
                window.alert(`Request Failed, ${EAStoreState.OFFBOARDINGSTATUSEdit.error}`)
                setTimeout(()=> {
                    dispatch(OFFBOARDINGSTATUSEditActionFailureCleanup());
                }, 400)
            }else if(EAStoreState.OFFBOARDINGSTATUSUpdate.status === 'failed'){
                window.alert(`Request Failed, ${EAStoreState.OFFBOARDINGSTATUSUpdate.error}`)
                setTimeout(()=> {
                    dispatch(OFFBOARDINGSTATUSUpdateActionFailureCleanup());
                }, 400)
            }
        }
    }, [EAStoreState.OFFBOARDINGSTATUSUpdate.status, EAStoreState.OFFBOARDINGSTATUSEdit.status])


    const buttonAction = (mode: number) => {
        const InputDetails = () => {
            if(singleOFFBOARDINGSTATUSDetailsData.status === "Completed"){
                window.alert("You cannot modify this already confirmed document.")
                return
            }else{
                setSaveChangesButton(!saveChangesButton);
            }
        };
        const SubmitChanges = () => {
            setSaveChangesButton(!saveChangesButton);
            dispatch(OFFBOARDINGSTATUSUpdateAction(forAPIPayload))
            dispatch(OFFBOARDINGSTATUSEditAction(documentPayload));
        };
        switch(mode){
            case 0: InputDetails();
            break;
            case 1: SubmitChanges();
            break;
        };  
    }

    const updatePassedState = (index: number, field_get: string, value: string) => {
        setSingleOFFBOARDINGSTATUSDetailsData((prevState) => {
            const updatedEmpOnboardReqs = [...(prevState?.emp_offboard_reqs || [])];
            const updatedValue = { ...updatedEmpOnboardReqs[index] };
            if(updatedValue){
                updatedValue[field_get] = value;
                updatedEmpOnboardReqs[index] = updatedValue;
            };
            return{
                ...prevState,
                emp_offboard_reqs: updatedEmpOnboardReqs
            };
        });
    };


    const updateAPIState = (index: number, field_submit: string, value: string) => {
        setForAPIPayload((prevState) => {
            const updatedArray = [...(prevState as any)[field_submit]];
            updatedArray[index] = value;
            const updatedState: Partial<OFFBOARDINGSTATUSUpdateInterface> = {
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
        setSingleOFFBOARDINGSTATUSDetailsData((prevState) => {
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
                        Employee Number: {singleOFFBOARDINGSTATUSDetailsData.emp_no}
                </Typography>
                <Typography variant='subtitle1' className='flex justify-center text-center'>
                        Onboarding Data ID: {singleOFFBOARDINGSTATUSDetailsData.id}
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
                                    value={singleOFFBOARDINGSTATUSDetailsData.status}
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
                                    value={dayjs(singleOFFBOARDINGSTATUSDetailsData.date_offboard)}
                                    disabled={!saveChangesButton}
                                    onChange={(newValue) => {
                                        const formattedDate = dayjs(newValue).format('YYYY-MM-DDTHH:mm:ss');
                                        setDocumentPayload((prevState) => {
                                            return (
                                                {
                                                    ...prevState,
                                                    date_offboard: formattedDate,
                                                }
                                            )
                                        })
                                        setSingleOFFBOARDINGSTATUSDetailsData((prevState) => {
                                            return ({
                                                ...prevState,
                                                date_offboard: formattedDate,
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
                        singleOFFBOARDINGSTATUSDetailsData?.emp_offboard_reqs?.map((item, index) => {
                            return(
                                <>
                                <hr style={{borderTop: '3px double #8c8b8b'}}/>
                                <TextField 
                                    sx={{width: '100%'}} 
                                    label={`Requirement #${index + 1}`} 
                                    value={item.offboarding_title} 
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
                                        initialDate={item.date_accomplished} 
                                        setInitialDate={updatePassedState} 
                                    />
                                    <TextField 
                                        sx={{width: '20%', marginTop: '5px'}} 
                                        type='number'
                                        placeholder={'Employee #'} 
                                        label={`Facilitator Emp #${index + 1}`} 
                                        value={item.offboarding_facilitator} 
                                        InputProps={{readOnly: true,}} 
                                        variant='standard' 
                                    />
                                    <OFFBOARDINGSTATUSTypeAutoComplete 
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

export default OFFBOARDINGSTATUSModalUI;