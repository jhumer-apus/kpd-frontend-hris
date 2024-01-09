import React, { useEffect, useRef, useState } from 'react';
import { KPICOREEditInterface, KPICOREUpdateSupervisorInterface, KPICOREViewInterface, ONBOARDINGSTATUSUpdateInterface } from '@/types/types-employee-and-applicants';
import { convertDaysToHHMM, convertMinutesToHHMM,  } from '@/helpers/utils';
import { Button, Typography } from '@mui/material';
import dayjs from 'dayjs';
import {TextField} from '@mui/material';
import ApproveKPICOREModal from '../main-modals/inner-modals/approve-obt-modal';
import DenyKPICOREModal from '../main-modals/inner-modals/deny-obt-modal';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { KPICOREEditAction, KPICOREEditActionFailureCleanup, KPICOREUpdateSupervisorAction, KPICOREUpdateSupervisorActionFailureCleanup } from '@/store/actions/employee-and-applicants';


import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';



interface KPICOREModalUIInterface {
    singleKPICOREDetailsData: KPICOREViewInterface;
    multiplePayslipMode?: boolean;
    setSingleKPICOREDetailsData: React.Dispatch<React.SetStateAction<KPICOREViewInterface>>;
}

function KPICOREModalUI(props: KPICOREModalUIInterface) {
    const dispatch = useDispatch();
    const EAStoreState = useSelector((state: RootState) => state.employeeAndApplicants);
    const [ approveKPICOREOpenModal, setApproveKPICOREOpenModal ] = useState(false);
    const [ denyKPICOREOpenModal, setDenyKPICOREOpenModal ] = useState(false);
    const { setSingleKPICOREDetailsData, singleKPICOREDetailsData } = props;
    const ThisProps = props.singleKPICOREDetailsData;
    const curr_user = useSelector((state: RootState)=> state.auth.employee_detail);
    const onClickModal = (mode: number) => {
        switch(mode){
            case 0: setApproveKPICOREOpenModal(true);
            break;
            case 1: setDenyKPICOREOpenModal(true);
            break;
        }   
        
    };

    const [ forReqsAPIPayload, setForReqsAPIPayload ] = useState<KPICOREUpdateSupervisorInterface>({
        emp_no: NaN,
        kpi_question_code_array: [],
        approver_eval_point_array: [],
        approver_feedback_array: [],
        corecompe_code_array: [],
        corecompe_points: [],
        added_by: NaN,
    });

    const [ documentPayload, setDocumentPayload ] = useState<KPICOREEditInterface>({
        id: NaN,
        emp_no_approver: NaN,
        date_evaluation_deadline: '',
        added_by: NaN
    });

    const [saveChangesButton, setSaveChangesButton] = useState<boolean>(false); 

    useEffect(()=> {
        if(singleKPICOREDetailsData.emp_no || curr_user?.emp_no){
            setForReqsAPIPayload((prevState) => {
                return (
                    {
                        ...prevState,
                        emp_no: singleKPICOREDetailsData.emp_no,
                        added_by: curr_user?.emp_no
                    }
                )
            })
            setDocumentPayload((prevState) => {
                return (
                    {
                        ...prevState,
                        id: singleKPICOREDetailsData.id,
                        emp_no_approver: singleKPICOREDetailsData.emp_no_approver,
                        date_evaluation_deadline: singleKPICOREDetailsData.date_evaluation_deadline,
                        added_by: curr_user?.emp_no
                    }
                )
            })
        };
    }, [singleKPICOREDetailsData.emp_no, curr_user])

    useEffect(()=> {
            
            if(singleKPICOREDetailsData.questions && singleKPICOREDetailsData.core_competencies){
                const initialQuestionsArr = singleKPICOREDetailsData.questions.map((item) => ({
                    kpi_question_code: item.id,
                    approver_eval_point: item.approver_eval_point || NaN,
                    approver_feedback: item.approver_eval_comment || "",
                }));
                const initalCoreCompeArr = singleKPICOREDetailsData.core_competencies.map((item) => ({
                    corecompe_code: item.id,
                    corecompe_points: item.points || NaN,
                }));
                
                setForReqsAPIPayload((prevState) => ({
                    ...prevState,
                    kpi_question_code_array: initialQuestionsArr.map((item) => item.kpi_question_code),
                    approver_eval_point_array: initialQuestionsArr.map((item) => item.approver_eval_point),
                    approver_feedback_array: initialQuestionsArr.map((item) => item.approver_feedback),
                    corecompe_code_array: initalCoreCompeArr.map((item) => item.corecompe_code),
                    corecompe_points: initalCoreCompeArr.map((item) => item.corecompe_points)
                }));
            }


    }, [singleKPICOREDetailsData])

    useEffect(()=>{
        if(EAStoreState.KPICOREEdit.status === 'succeeded' || EAStoreState.KPICOREUpdateSupervisor.status === 'succeeded' ){
            window.alert('Request Successful');
            window.location.reload();
        }else if(EAStoreState.KPICOREEdit.status === 'failed' || EAStoreState.KPICOREUpdateSupervisor.status === 'failed'){
            if(EAStoreState.KPICOREUpdateSupervisor.status === 'failed') {
                window.alert(`Request Failed, ${EAStoreState.KPICOREUpdateSupervisor.error}`)
                setTimeout(()=> {
                    dispatch(KPICOREUpdateSupervisorActionFailureCleanup());
                }, 400)
            }else if(EAStoreState.KPICOREEdit.status === 'failed'){
                window.alert(`Request Failed, ${EAStoreState.KPICOREEdit.error}`)
                setTimeout(()=> {
                    dispatch(KPICOREEditActionFailureCleanup());
                }, 400)
            }
        }
    }, [EAStoreState.KPICOREEdit.status, EAStoreState.KPICOREUpdateSupervisor.status])

    const buttonAction = (mode: number) => {

        const InputDetails = () => {
            if(singleKPICOREDetailsData.status === "Confirmed"){
                window.alert("You cannot modify this already confirmed document.")
                return
            }else{
                setSaveChangesButton(!saveChangesButton);
            }
        }

        const SubmitChanges = () => {
            setSaveChangesButton(!saveChangesButton);
            dispatch(KPICOREUpdateSupervisorAction(forReqsAPIPayload));
            dispatch(KPICOREEditAction(documentPayload));
        };
        switch(mode){
            case 0: InputDetails();
            break;
            case 1: SubmitChanges();
            break;
        }
    }

    const updatePassedState = (index: number, field_get: string, value: string | number, type: "Question" | "Core") => {
        if(type === "Question"){
            setSingleKPICOREDetailsData((prevState) => {
                const updatedQuestions = [...(prevState?.questions || [])];
                const updatedValue = { ...updatedQuestions[index] };
                if(updatedValue){
                    updatedValue[field_get] = value;
                    updatedQuestions[index] = updatedValue;
                };
                return{
                    ...prevState,
                    questions: updatedQuestions
                };
            });
        } else if (type === "Core"){
            setSingleKPICOREDetailsData((prevState) => {
                const updatedCoreCompe = [...(prevState?.core_competencies || [])];
                const updatedValue = { ...updatedCoreCompe[index] };
                if(updatedValue){
                    updatedValue[field_get] = value;
                    updatedCoreCompe[index] = updatedValue;
                };
                return{
                    ...prevState,
                    core_competencies: updatedCoreCompe
                };
            });
        }
        

    };


    const updateAPIState = (index: number, field_submit: string, value: string | number) => {
        setForReqsAPIPayload((prevState) => {
            const updatedArray = [...(prevState as any)[field_submit]];
            updatedArray[index] = value;
            const updatedState: Partial<KPICOREUpdateSupervisorInterface> = {
            [field_submit]: updatedArray,
            };
        
            return {
            ...prevState,
            ...updatedState,
            };
        });

    }; 

    const dualStateUpdate = (index: number, field_submit: string, field_get: string, value: string | number, type: "Question" | "Core") => {
        updateAPIState(index, field_submit, value);
        updatePassedState(index, field_get, value, type);
    };

    // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const newValue= event.target.value as "Pending" | "Completed";
    //     setDocumentPayload((prevState) => {
    //         return (
    //             {
    //                 ...prevState,
    //                 status: newValue,
    //             }
    //         )
    //     })
    //     setSingleKPICOREDetailsData((prevState) => {
    //         return ({
    //             ...prevState,
    //             status: newValue,
    //         })
    //     })
    // };

    return (
        <React.Fragment>
            {/* <ApproveKPICOREModal singleKPICOREDetailsData={singleKPICOREDetailsData} setSingleKPICOREDetailsData={setSingleKPICOREDetailsData} approveKPICOREOpenModal={approveKPICOREOpenModal} setApproveKPICOREOpenModal={setApproveKPICOREOpenModal}/>
            <DenyKPICOREModal singleKPICOREDetailsData={singleKPICOREDetailsData} setSingleKPICOREDetailsData={setSingleKPICOREDetailsData} denyKPICOREOpenModal={denyKPICOREOpenModal} setDenyKPICOREOpenModal={setDenyKPICOREOpenModal}/> */}
            
            
            <div className='flex justify-center flex-col'>
                <Typography variant='h5' className='flex justify-center text-center'>
                            Employee Name: {singleKPICOREDetailsData.emp_name} [# {singleKPICOREDetailsData.emp_no}]
                </Typography>
                <Typography variant='subtitle1' className='flex justify-center text-center'>
                        Status: {singleKPICOREDetailsData.status} | KPI Score: {singleKPICOREDetailsData.total_approver_eval_points} | Core: {singleKPICOREDetailsData.total_core_compe_points} | Total %: {singleKPICOREDetailsData.percentage_total}
                </Typography>
                <Typography variant='subtitle1' className='flex justify-center text-center'>
                        Final Rating: {singleKPICOREDetailsData.status === 'Pending' ? 'Pending...' : singleKPICOREDetailsData.final_rating} | Supervisor: {singleKPICOREDetailsData.approver_name}
                </Typography>
                <Typography variant='subtitle1' style={{marginTop: "20px"}} className='flex justify-center text-center'>
                        Eval Deadline Date: {dayjs(singleKPICOREDetailsData.date_evaluation_deadline).format("MMMM DD, YYYY")}
                </Typography>
                <div className='flex justify-center my-6' container-name='obt_buttons_container'>
                    <div className='flex justify-center' style={{width:'300px'}} container-name='obt_buttons'>
                        <Button variant='contained' sx={{display: `${saveChangesButton ? 'none': 'block'}`}} aria-hidden={saveChangesButton} hidden={saveChangesButton} onClick={()=> buttonAction(0)}>Input Details</Button>
                        <Button variant='outlined' sx={{display: `${!saveChangesButton ? 'none': 'block'}`}} aria-hidden={!saveChangesButton} hidden={!saveChangesButton} onClick={function(){buttonAction(1)}}>Submit Changes</Button>
                    </div>
                </div>
            </div>

            <Typography className="italic" variant="body2">
                Reminder: Make sure to check each fields and make sure that each of the fields has an answer including self-eval points. Managers/Supervisors are the one who will fulfill the Supervisor Points and Confirm.
            </Typography>
            
            <div className='flex gap-10 overflow-auto relative'>
                <div className='flex gap-10 flex-col mt-4 w-full' style={{zoom: 0.9}}>
                    {
                        singleKPICOREDetailsData?.questions?.map((item, index) => {
                            return(
                                <>
                                <hr style={{borderTop: '3px double #8c8b8b'}}/>
                                <TextField 
                                    sx={{width: '100%'}} 
                                    label={`Question #${index + 1}`} 
                                    value={item.question} 
                                    // onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    // }}
                                    InputProps={{readOnly: true,}} 
                                    variant='filled' 
                                    multiline 
                                    rows={2}
                                />
                                <TextField 
                                    sx={{width: '100%', fontStyle: 'italic'}} 
                                    label={`Employee's Answer to #${index + 1}`} 
                                    value={item.self_comment} 
                                    InputProps={{readOnly: true,}} 
                                    variant='outlined' 
                                    multiline 
                                    rows={2}
                                />
                                <div className='flex justify-center gap-4'>
                                    <TextField 
                                        sx={{width: '30%'}} 
                                        placeholder={'1-10'} 
                                        label={`Self-Eval Points #${index + 1}`} 
                                        value={item.self_eval_point} 
                                        InputProps={{readOnly: true,}} 
                                        variant='outlined' 
                                    />
                                    <TextField 
                                        sx={{width: '30%'}} 
                                        label={`Supervisor Points #${index + 1}`} 
                                        type='number'
                                        placeholder='Points from 1-10'
                                        variant='outlined'
                                        value={item.approver_eval_point} 
                                        disabled={!saveChangesButton}
                                        focused={saveChangesButton}
                                        onChange={(event)=> {
                                            const newValue = +event.target.value;
                                            if(newValue > 10 || newValue < 0){
                                                return
                                            }
                                            dualStateUpdate(index, "approver_eval_point_array", "approver_eval_point", newValue, "Question")
                                        }}

                                         
                                    />
                                    <TextField 
                                        sx={{width: '40%'}} 
                                        label={`Supervisor Remarks #${index + 1}`} 
                                        value={item.approver_eval_comment} 
                                        variant='outlined'
                                        disabled={!saveChangesButton}
                                        focused={saveChangesButton}
                                        onChange={(event)=> {
                                            const newValue = event.target.value;
                                            dualStateUpdate(index, "approver_feedback_array", "approver_eval_comment", newValue, "Question")
                                        }}
                                    />
                                </div>

                                </>
                            )
                        })
                    }
                    {
                        singleKPICOREDetailsData?.core_competencies?.map((item, index) => {
                            return(
                                <>
                                <TextField 
                                    sx={{width: '100%'}} 
                                    label={`Competency #${index + 1}`} 
                                    value={item.checklist_title} 
                                    InputProps={{readOnly: true,}} 
                                    variant='filled' 
                                    multiline 
                                    rows={2}
                                />
                                <div className='flex justify-center gap-20'>
                                <TextField 
                                    sx={{width: '100%', fontStyle: 'italic'}} 
                                    label={`Limits For Core#${index + 1}`} 
                                    value={item.checklist_limit} 
                                    InputProps={{readOnly: true,}} 
                                    variant='outlined'
                                />
                                <TextField 
                                    sx={{width: '20%'}} 
                                    label={`CL Points #${index + 1}`} 
                                    value={item.points} 
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
                        singleKPICOREDetailsData?.questions?.map((item, index) => {
                            return(
                                <TextField sx={{width: '100%'}} label={`Answer to #${index + 1}`} value={item.answer} InputProps={{readOnly: true,}} variant='outlined' multiline rows={10}/>
                            )
                        })
                    }
                </div>
                <div className='flex gap-6 flex-col mt-4'>
                    {
                        singleKPICOREDetailsData?.questions?.map((item, index) => {
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

export default KPICOREModalUI;