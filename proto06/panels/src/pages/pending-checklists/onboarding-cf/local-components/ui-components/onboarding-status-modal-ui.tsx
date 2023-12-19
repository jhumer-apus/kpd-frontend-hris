import React, { useEffect, useState } from 'react';
import { ONBOARDINGSTATUSUpdateInterface, ONBOARDINGSTATUSViewInterface } from '@/types/types-employee-and-applicants';
import { Button, Typography } from '@mui/material';
import dayjs from 'dayjs';
import {TextField} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, globalAPIDate } from '@/store/configureStore';
import { ONBOARDINGSTATUSUpdateAction, ONBOARDINGSTATUSUpdateActionFailureCleanup } from '@/store/actions/employee-and-applicants';
import ONBOARDINGSTATUSTypeAutoComplete from './inner-ui-components/onboarding-status-radiogroup';
import DateFieldInput from './inner-ui-components/date-field';

interface ONBOARDINGSTATUSModalUIInterface {
    singleONBOARDINGSTATUSDetailsData: ONBOARDINGSTATUSViewInterface;
    multiplePayslipMode?: boolean;
    setSingleONBOARDINGSTATUSDetailsData: React.Dispatch<React.SetStateAction<ONBOARDINGSTATUSViewInterface>>;
}

function ONBOARDINGSTATUSModalUI(props: ONBOARDINGSTATUSModalUIInterface) {
    const dispatch = useDispatch();
    const ONBOARDINGSTATUS = useSelector((state: RootState) => state.employeeAndApplicants.ONBOARDINGSTATUSUpdate);
    const { setSingleONBOARDINGSTATUSDetailsData, singleONBOARDINGSTATUSDetailsData } = props;
    const ThisProps = props.singleONBOARDINGSTATUSDetailsData;
    const curr_user = useSelector((state: RootState)=> state.auth.employee_detail);

    const [ forAPIUpdate, setForAPIUpdate ] = useState<ONBOARDINGSTATUSUpdateInterface>({
        emp_no: NaN,
        onboarding_requirement_code_array: [],
        date_commencement: "",
        emp_remarks_array: [],
        facilitator_remarks_array: [],
        status_array: [],
        added_by: NaN,
    });

    const [saveChangesButton, setSaveChangesButton] = useState<boolean>(false); 

    useEffect(()=> {
        if (singleONBOARDINGSTATUSDetailsData.emp_onboard_reqs) {
            const initialItems = singleONBOARDINGSTATUSDetailsData.emp_onboard_reqs.map((item) => ({
                onboarding_requirement_code: item.onboarding_requirement_code,
                emp_remarks: item.emp_remarks || "",
                facilitator_remarks: item.facilitator_remarks || "",
                status: item.status || "",
            }));
        
            setForAPIUpdate((prevState) => ({
                ...prevState,
                onboarding_requirement_code_array: initialItems.map((item) => item.onboarding_requirement_code),
                emp_remarks_array: initialItems.map((item) => item.emp_remarks),
                facilitator_remarks_array: initialItems.map((item) => item.facilitator_remarks),
                status_array: initialItems.map((item) => item.status),
                date_commencement: dayjs(new Date()).format(`${globalAPIDate}`),
            }));
        }
        if(singleONBOARDINGSTATUSDetailsData.emp_no || curr_user?.emp_no){
            setForAPIUpdate((prevState) => {
                return (
                    {
                        ...prevState,
                        emp_no: singleONBOARDINGSTATUSDetailsData.emp_no,
                        added_by: curr_user?.emp_no
                    }
                )
            })
        };
    }, [singleONBOARDINGSTATUSDetailsData, singleONBOARDINGSTATUSDetailsData.emp_no, curr_user])

    useEffect(()=>{
        if(ONBOARDINGSTATUS.status === 'succeeded'){
            window.alert('Request Successful');
            window.location.reload();
        }else if(ONBOARDINGSTATUS.status === 'failed'){
            window.alert(`Request Failed, ${ONBOARDINGSTATUS.error}`)
            setTimeout(()=> {
                dispatch(ONBOARDINGSTATUSUpdateActionFailureCleanup());
            }, 400)
        }
    }, [ONBOARDINGSTATUS.status])


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
            dispatch(ONBOARDINGSTATUSUpdateAction(forAPIUpdate))
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
        setForAPIUpdate((prevState) => {
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

    return (
        <React.Fragment>           
            <div className='flex justify-center flex-col'>
                <Typography variant='h5' className='flex justify-center text-center'>
                        Employee Number: {singleONBOARDINGSTATUSDetailsData.emp_no}
                </Typography>
                <Typography variant='subtitle1' className='flex justify-center text-center'>
                        Status: {singleONBOARDINGSTATUSDetailsData.status}
                </Typography>
                <Typography variant='subtitle1' className='flex justify-center text-center'>
                        Onboarding Date: {singleONBOARDINGSTATUSDetailsData.date_start ? dayjs(singleONBOARDINGSTATUSDetailsData.date_start).format("MMMM DD, YYYY") : "No Date Indicated"}
                </Typography>
                <div className='flex justify-center my-6' container-name='obt_buttons_container'>
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