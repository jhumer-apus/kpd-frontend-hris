import React, { useEffect, useRef, useState } from 'react';
import { ONBOARDINGSTATUSUpdateInterface, ONBOARDINGSTATUSViewInterface } from '@/types/types-employee-and-applicants';
import { convertDaysToHHMM, convertMinutesToHHMM,  } from '@/helpers/utils';
import { Button, Typography } from '@mui/material';
import dayjs from 'dayjs';
import {TextField} from '@mui/material';
import ApproveONBOARDINGSTATUSModal from '../main-modals/inner-modals/approve-obt-modal';
import DenyONBOARDINGSTATUSModal from '../main-modals/inner-modals/deny-obt-modal';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import DateFieldInput from './inner-ui-components/date-field';

interface ONBOARDINGSTATUSModalUIInterface {
    singleONBOARDINGSTATUSDetailsData: ONBOARDINGSTATUSViewInterface;
    multiplePayslipMode?: boolean;
    setSingleONBOARDINGSTATUSDetailsData: React.Dispatch<React.SetStateAction<ONBOARDINGSTATUSViewInterface>>;
}

function ONBOARDINGSTATUSModalUI(props: ONBOARDINGSTATUSModalUIInterface) {
    const [ approveONBOARDINGSTATUSOpenModal, setApproveONBOARDINGSTATUSOpenModal ] = useState(false);
    const [ denyONBOARDINGSTATUSOpenModal, setDenyONBOARDINGSTATUSOpenModal ] = useState(false);
    const { setSingleONBOARDINGSTATUSDetailsData, singleONBOARDINGSTATUSDetailsData } = props;
    const ThisProps = props.singleONBOARDINGSTATUSDetailsData;
    const curr_user = useSelector((state: RootState)=> state.auth.employee_detail);
    const onClickModal = (mode: number) => {
        switch(mode){
            case 0: setApproveONBOARDINGSTATUSOpenModal(true);
            break;
            case 1: setDenyONBOARDINGSTATUSOpenModal(true);
            break;
        }   
        
    };


    const [ updatedItems, setUpdatedItems ] = useState<ONBOARDINGSTATUSUpdateInterface>({
        emp_no: NaN,
        onboarding_requirement_code_array: [],
        date_commencement: "",
        emp_remarks_array: [],
        facilitator_remarks_array: [],
        status_array: [],
        added_by: NaN,
    });

    console.log(updatedItems, "check1`")

    useEffect(()=> {

        if(singleONBOARDINGSTATUSDetailsData.emp_onboard_reqs){
            singleONBOARDINGSTATUSDetailsData?.emp_onboard_reqs.forEach((item) => {
                setUpdatedItems((prevState)=> {
                    return({
                        ...prevState,
                        onboarding_requirement_code_array: [...prevState.onboarding_requirement_code_array, item.onboarding_requirement_code as number],
                        emp_remarks_array: [...prevState.emp_remarks_array, item.emp_remarks as string],
                        facilitator_remarks_array: [item.facilitator_remarks as string],
                        status_array: [...prevState.status_array, item.status as string],
                    })
                })
            })
        };
        setUpdatedItems((prevState) => {
            return(
                {
                    ...prevState,
                    date_commencement: `${new Date().toISOString()}`
                }
            )
        })

    }, [])


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


    const [saveChangesButton, setSaveChangesButton] = useState<boolean>(false); 

    const buttonAction = () => {
        if(singleONBOARDINGSTATUSDetailsData.status === "Completed"){
            window.alert("You cannot modify this already confirmed document.")
            return
        }else{
            setSaveChangesButton(!saveChangesButton);
            //submit changes or dispatch post action
        }
        // setSaveChangesButton(!saveChangesButton);
    }


    const updateItemValue = (itemId: number, newValue: any) => {
        const updatedArray = singleONBOARDINGSTATUSDetailsData.emp_onboard_reqs?.map((item) => {

            return( item.id === itemId ? {...item, newValue}: item)

        })

        setSingleONBOARDINGSTATUSDetailsData((prevState)=> {
            return ({
                ...prevState,
                emp_onboard_reqs: updatedArray
            })
        })

    }
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
                        Onboarding Date: {dayjs(singleONBOARDINGSTATUSDetailsData.date_start).format("MMMM DD, YYYY")}
                </Typography>
                <div className='flex justify-center my-6' container-name='obt_buttons_container'>
                    <div className='flex justify-center' style={{width:'300px'}} container-name='obt_buttons'>
                        <Button variant='contained' sx={{display: `${saveChangesButton ? 'none': 'block'}`}} aria-hidden={saveChangesButton} hidden={saveChangesButton} onClick={buttonAction}>Input Details</Button>
                        <Button variant='outlined' sx={{display: `${!saveChangesButton ? 'none': 'block'}`}} aria-hidden={!saveChangesButton} hidden={!saveChangesButton} onClick={buttonAction}>Submit Changes</Button>
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
                                    // onChange={(event: React.ChangeEvent<HTMLInputElement>) => {

                                    // }}
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
                                    InputProps={{readOnly: !saveChangesButton,}} 
                                    variant='outlined' 
                                    multiline 
                                    rows={2}
                                    onChange={(event) => {
                                        const newValue = event.target.value;
                                        updateItemValue(item.onboarding_requirement_code, {facilitator_remarks: newValue})
                                    }}
                                />
                                <div className='flex justify-start gap-4'>
                                    <TextField 
                                        sx={{width: '30%'}} 
                                        placeholder={'Emp #'} 
                                        label={`Facilitator Emp #${index + 1}`} 
                                        value={item.onboarding_facilitator} 
                                        InputProps={{readOnly: true,}} 
                                        variant='outlined' 
                                    />
                                    {/* <TextField 
                                        sx={{width: '30%'}} 
                                        label={`Supervisor Points #${index + 1}`} 
                                        value={item.sup_eval_points} 
                                        InputProps={{readOnly: true,}} 
                                        variant='outlined' 
                                    /> */}
                                    {/* <TextField 
                                        sx={{width: '40%'}} 
                                        label={`Supervisor Remarks #${index + 1}`} 
                                        value={item.sup_remarks} 
                                        InputProps={{readOnly: true,}} 
                                        variant='outlined' 
                                    /> */}
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