import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { Button } from '@mui/material';
import {TextField} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { APILink, RootState } from '@/store/configureStore';
import EmployeeAutoComplete from './inner-ui-components/employee-autocomplete';
import DateFromToUACreate from './inner-ui-components/date-from-to-field';
import { Typography } from '@mui/joy';
import { UACreateInterface } from '@/types/types-pages';
import { UACreateAction, UACreateActionFailureCleanup, UAViewFilterEmployeeAction } from '@/store/actions/procedurals';

// Components
import UAReasons from '../forms/UAReasons';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { beautifyJSON } from '@/helpers/utils';
import { HandleAlertAction } from '@/store/actions/components';
import axiosInstance from '@/helpers/axiosConfig';

interface CreateUAModalInterface {
    setOpen?: Dispatch<SetStateAction<boolean>>;
}

function QuickAccessUACreate(props: CreateUAModalInterface) {

    const dispatch = useDispatch();
    const [isSubmittingRequest, setIsSubmittingRequest] = useState<boolean>(false);
    const UACreatestate = useSelector((state: RootState)=> state.procedurals.UACreate);
    const userData = useSelector((state: RootState) => state.auth.employee_detail);
    const [createUA, setCreateUA] = useState<UACreateInterface>({
        emp_no: NaN,
        ua_description: null,
        ua_date_from: null,
        ua_date_to: null,
        added_by: userData?.emp_no,
    });
    const onClickSubmit = () => {
        setIsSubmittingRequest(true)
        fileUAPost()
        // dispatch(UACreateAction(createUA))
    };
    // useEffect(()=>{
    //     if(UACreatestate.status === 'succeeded'){
    //         setIsSubmittingRequest(false)
    //         window.alert('Request Successful');
    //         window.location.reload();
    //     }else if(UACreatestate.status === 'failed'){
    //         setIsSubmittingRequest(false)
    //         window.alert(`Request Failed, ${UACreatestate.error}`)
    //         setTimeout(()=> {
    //             dispatch(UACreateActionFailureCleanup());
    //         }, 1000)
    //     }
    // }, [UACreatestate.status])

    const formReseter = (): void => {
        setCreateUA({
            emp_no: NaN,
            ua_description: null,
            ua_date_from: null,
            ua_date_to: null,
            added_by: userData?.emp_no,
        })
    }

    const fileUAPost = async() => {

        const payload = {

            emp_no: createUA.emp_no,
            ua_description: createUA.ua_description,
            ua_date_from: createUA.ua_date_from,
            ua_date_to: createUA.ua_date_to,
            added_by: userData?.emp_no,
        }
        await axiosInstance.post(`ua/`, payload).then((res:AxiosResponse) => {

            setIsSubmittingRequest(false)
            sendEmail(createUA.emp_no, res.data.id)
            dispatch(UAViewFilterEmployeeAction({emp_no: userData?.emp_no}))
            dispatch(HandleAlertAction({
                open:true,
                status:"success",
                message:"File UA Successfully"
            }))

            formReseter();

        }).catch((err:any) => {

            setIsSubmittingRequest(false)
            dispatch(HandleAlertAction({
                open:true,
                status:"error",
                message:beautifyJSON(err.response?.data)
            }))
        })
    }

    const sendEmail = async (emp_no:string | number, app_pk: number) => {

        const body = {
          emp_no: emp_no,
          email_type: "application",
          new_password: null,
          application_type: 'ua',
          application_pk: app_pk
        }
    
        await axiosInstance.post(`reset_password_email/`, body).then(res => {
        
            dispatch(HandleAlertAction({
                open:true,
                status:"success",
                message:"Application has been sent to the approver through email"
            }))
    
        }).catch(err => {
    
            console.log(err)
            dispatch(HandleAlertAction({
                open:true,
                status:"error",
                message:"Failed to email the approver"
            }))
    
        })
    }

    return (
        <React.Fragment>
            <Typography style={{border: '2px solid rgb(25, 118, 210)', width: '100%', textAlign: 'center', padding: '2px', background: 'rgb(245,247,248)', boxShadow: '4px 4px 10px rgb(200, 200, 222)'}} variant='plain'>Create an Unaccounted Attendance Data</Typography>
            <div className='flex flex-col gap-3 overflow-auto relative'>
                <div className='flex flex-wrap gap-3 pt-4'>
                    <div className='flex flex-col gap-3 w-full'>
                        <EmployeeAutoComplete createUA={createUA} setCreateUA={setCreateUA}/>
                        <UAReasons setState={setCreateUA}/>
                        {/* <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='UA Description:'  
                            variant='outlined' 
                            multiline rows={2}
                            value={createUA?.ua_description}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                // event.target.value
                                setCreateUA((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            ua_description: event.target.value
                                        }
                                    )
                                })
                            }}
                            
                        /> */}
                    </div>
                    <div className='flex flex-col gap-6 w-full'>
                        <DateFromToUACreate createUA={createUA} setCreateUA={setCreateUA}/>
                    </div>
                </div>
                <div className='flex justify-center mt-6' container-name='ua_buttons_container'>
                    <div className='flex justify-between' style={{width:'100%'}} container-name='ua_buttons'>
                        <Button 
                            variant='contained' 
                            onClick={onClickSubmit} 
                            disabled={isSubmittingRequest}
                        >
                                Create UA
                    </Button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default QuickAccessUACreate;

