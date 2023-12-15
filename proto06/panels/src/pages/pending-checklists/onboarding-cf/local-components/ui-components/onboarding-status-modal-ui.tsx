import React, { useEffect, useRef, useState } from 'react';
import { ONBOARDINGSTATUSUpdateInterface, ONBOARDINGSTATUSViewInterface } from '@/types/types-employee-and-applicants';
import { convertDaysToHHMM, convertMinutesToHHMM,  } from '@/helpers/utils';
import { Button, Typography } from '@mui/material';
import dayjs from 'dayjs';
import {TextField} from '@mui/material';
import ApproveONBOARDINGSTATUSModal from '../main-modals/inner-modals/approve-obt-modal';
import DenyONBOARDINGSTATUSModal from '../main-modals/inner-modals/deny-obt-modal';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, globalAPIDate } from '@/store/configureStore';
import DateFieldInput from './inner-ui-components/date-field';
import { ONBOARDINGSTATUSUpdateAction, ONBOARDINGSTATUSUpdateActionFailureCleanup } from '@/store/actions/employee-and-applicants';

interface ONBOARDINGSTATUSModalUIInterface {
    singleONBOARDINGSTATUSDetailsData: ONBOARDINGSTATUSViewInterface;
    multiplePayslipMode?: boolean;
    setSingleONBOARDINGSTATUSDetailsData: React.Dispatch<React.SetStateAction<ONBOARDINGSTATUSViewInterface>>;
}

function ONBOARDINGSTATUSModalUI(props: ONBOARDINGSTATUSModalUIInterface) {
    const dispatch = useDispatch();
    const ONBOARDINGSTATUS = useSelector((state: RootState) => state.employeeAndApplicants.ONBOARDINGSTATUSUpdate);
    const [ approveONBOARDINGSTATUSOpenModal, setApproveONBOARDINGSTATUSOpenModal ] = useState(false);
    const [ denyONBOARDINGSTATUSOpenModal, setDenyONBOARDINGSTATUSOpenModal ] = useState(false);
    const { setSingleONBOARDINGSTATUSDetailsData, singleONBOARDINGSTATUSDetailsData } = props;
    const ThisProps = props.singleONBOARDINGSTATUSDetailsData;
    const curr_user = useSelector((state: RootState)=> state.auth.employee_detail);

    const [ updatedItems, setUpdatedItems ] = useState<ONBOARDINGSTATUSUpdateInterface>({
        emp_no: NaN,
        onboarding_requirement_code_array: [],
        date_commencement: "",
        emp_remarks_array: [],
        facilitator_remarks_array: [],
        status_array: [],
        added_by: NaN,
    });

    useEffect(()=> {
        if (singleONBOARDINGSTATUSDetailsData.emp_onboard_reqs) {
            const initialItems = singleONBOARDINGSTATUSDetailsData.emp_onboard_reqs.map((item) => ({
                onboarding_requirement_code: item.onboarding_requirement_code,
                emp_remarks: item.emp_remarks || "",
                facilitator_remarks: item.facilitator_remarks || "",
                status: item.status || "",
            }));
        
            setUpdatedItems((prevState) => ({
                ...prevState,
                onboarding_requirement_code_array: initialItems.map((item) => item.onboarding_requirement_code),
                emp_remarks_array: initialItems.map((item) => item.emp_remarks),
                facilitator_remarks_array: initialItems.map((item) => item.facilitator_remarks),
                status_array: initialItems.map((item) => item.status),
                date_commencement: dayjs(new Date()).format(`${globalAPIDate}`),
            }));
        }
    }, [singleONBOARDINGSTATUSDetailsData])

    useEffect(()=> {
        if(singleONBOARDINGSTATUSDetailsData.emp_no){
            setUpdatedItems((prevState) => {
                return (
                    {
                        ...prevState,
                        emp_no: singleONBOARDINGSTATUSDetailsData.emp_no
                    }
                )
            })
        };
        if(curr_user?.emp_no){
            setUpdatedItems((prevState) => {
                return (
                    {
                        ...prevState,
                        added_by: curr_user?.emp_no
                    }
                )
            })
        }

    }, [singleONBOARDINGSTATUSDetailsData.emp_no, curr_user])


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

    const [saveChangesButton, setSaveChangesButton] = useState<boolean>(false); 

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
            dispatch(ONBOARDINGSTATUSUpdateAction(updatedItems))
        };
        switch(mode){
            case 0: InputDetails();
            break;
            case 1: SubmitChanges();
            break;
        };  
    }

    function debounce(func: Function, wait: number) {
        let timeout: ReturnType<typeof setTimeout>;
      
        return function executedFunction(...args: any[]) {
          const later = () => {
            clearTimeout(timeout);
            func(...args);
          };
      
          clearTimeout(timeout);
          timeout = setTimeout(later, wait);
        };
    };

    const updateItemValueWithoutDebounce = (index: number, field_get: string, value: string) => {
        setSingleONBOARDINGSTATUSDetailsData((prevState) => {
            const updatedEmpOnboardReqs = [...(prevState?.emp_onboard_reqs || [])];
            const updatedValue = { ...updatedEmpOnboardReqs[index] };

            // const updatedValue = prevState?.emp_onboard_reqs?.[index]
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


    const debouncedSetUpdatedItems = debounce((index: number, field_submit: string, field_get: string, value: string) => {
        setUpdatedItems((prevState) => {
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

    }, 400); // This needs to be improved 

    const debouncedUpdateItemValue = (index: number, field_submit: string, field_get: string, value: string) => {
        debouncedSetUpdatedItems(index, field_submit, value);
        updateItemValueWithoutDebounce(index, field_get, value);
    };

    return (
        <React.Fragment>
            {/* <ApproveONBOARDINGSTATUSModal singleONBOARDINGSTATUSDetailsData={singleONBOARDINGSTATUSDetailsData} setSingleONBOARDINGSTATUSDetailsData={setSingleONBOARDINGSTATUSDetailsData} approveONBOARDINGSTATUSOpenModal={approveONBOARDINGSTATUSOpenModal} setApproveONBOARDINGSTATUSOpenModal={setApproveONBOARDINGSTATUSOpenModal}/>
            <DenyONBOARDINGSTATUSModal singleONBOARDINGSTATUSDetailsData={singleONBOARDINGSTATUSDetailsData} setSingleONBOARDINGSTATUSDetailsData={setSingleONBOARDINGSTATUSDetailsData} denyONBOARDINGSTATUSOpenModal={denyONBOARDINGSTATUSOpenModal} setDenyONBOARDINGSTATUSOpenModal={setDenyONBOARDINGSTATUSOpenModal}/> */}
            
            
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
                                        debouncedUpdateItemValue(index, "facilitator_remarks_array", "facilitator_remarks", newValue);
                                    }}
                                />
                                <div className='flex justify-start gap-4'>
                                    <TextField 
                                        sx={{width: '20%'}} 
                                        type='number'
                                        placeholder={'Employee #'} 
                                        label={`Facilitator Emp #${index + 1}`} 
                                        value={item.onboarding_facilitator} 
                                        InputProps={{readOnly: true,}} 
                                        variant='outlined' 
                                    />
                                    <TextField 
                                        sx={{width: '30%'}} 
                                        type='number'
                                        placeholder={'Employee #'} 
                                        label={`Facilitator Emp #${index + 1}`} 
                                        value={item.onboarding_facilitator} 
                                        InputProps={{readOnly: true,}} 
                                        variant='outlined' 
                                    />
                                </div>

                                </>
                            )
                        })
                    }
                </div>
                {/* <div className='flex gap-6 flex-col mt-4'>
                    {
                        singleONBOARDINGSTATUSDetailsData?.questions?.map((item, index) => {
                            return(
                                <TextField sx={{width: '100%'}} label={`Answer to #${index + 1}`} value={item.answer} InputProps={{readOnly: true,}} variant='outlined' multiline rows={10}/>
                            )
                        })
                    }
                </div>
                <div className='flex gap-6 flex-col mt-4'>
                    {
                        singleONBOARDINGSTATUSDetailsData?.questions?.map((item, index) => {
                            return(
                                <TextField sx={{width: '100%'}} label={`Self-Eval Points #${index + 1}`} value={item.self_eval_points} InputProps={{readOnly: true,}} variant='outlined' multiline rows={10}/>
                            )
                        })
                    }
                </div> */}

            </div>



        </React.Fragment>
    );
}

export default ONBOARDINGSTATUSModalUI;