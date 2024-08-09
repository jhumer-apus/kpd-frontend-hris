import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { Button } from '@mui/material';
import {TextField} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import EmployeeAutoComplete from './inner-ui-components/employee-autocomplete';
import OVERTIMETypeAutoComplete from './inner-ui-components/ot-type-autocomplete';
import DateFromToOVERTIMECreate from './inner-ui-components/date-from-to-field';
import { Typography } from '@mui/joy';
import { OVERTIMECreateInterface } from '@/types/types-pages';
import { OVERTIMECreateAction, OVERTIMECreateActionFailureCleanup, OVERTIMEViewFilterEmployeeAction } from '@/store/actions/procedurals';

//LIBRARIES
import axios, {AxiosResponse, AxiosError} from 'axios'

//STORE
import { APILink } from '@/store/configureStore';
import { beautifyJSON } from '@/helpers/utils';
import { HandleAlertAction } from '@/store/actions/components';

interface CreateOVERTIMEModalInterface {
    setOpen?: Dispatch<SetStateAction<boolean>>;
}

function QuickAccessOVERTIMECreate(props: CreateOVERTIMEModalInterface) {

    const dispatch = useDispatch();
    const OVERTIMECreatestate = useSelector((state: RootState)=> state.procedurals.OVERTIMECreate);
    const [isSubmittingRequest, setIsSubmittingRequest] = useState<boolean>(false);
    const userData = useSelector((state: RootState) => state.auth.employee_detail);
    const [createOVERTIME, setCreateOVERTIME] = useState<OVERTIMECreateInterface>({
        emp_no: NaN,
        ot_type: 'After Duty',
        ot_remarks: null,
        ot_date_from: null,
        ot_date_to: null,
        added_by: userData?.emp_no,
    });

    const isDepartmentManager = userData?.user?.role == 2

    const onClickSubmit = () => {
        // dispatch(OVERTIMECreateAction(createOVERTIME))
        fileOTPost()
    };
    // useEffect(()=>{
    //     if(OVERTIMECreatestate.status === 'succeeded'){
    //         window.alert('Request Successful');
    //         window.location.reload();
    //     }else if(OVERTIMECreatestate.status === 'failed'){
    //         window.alert(`Request Failed, ${OVERTIMECreatestate.error}`)
    //         setTimeout(()=> {
    //             dispatch(OVERTIMECreateActionFailureCleanup());
    //         }, 1000)
    //     }
    // }, [OVERTIMECreatestate.status])

    const sendEmail = async (emp_no:string | number, app_pk: number) => {

        const body = {
          emp_no: emp_no,
          email_type: "application",
          new_password: null,
          application_type: 'ot',
          application_pk: app_pk
        }
    
        await axios.post(`${APILink}reset_password_email/`, body).then(res => {
    
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

    const fileOTPost = async() => {

        setIsSubmittingRequest(true)

        const payload = {
            emp_no: createOVERTIME.emp_no,
            ot_type: createOVERTIME.ot_type,
            ot_remarks: createOVERTIME.ot_remarks,
            ot_date_from: createOVERTIME.ot_date_from,
            ot_date_to: createOVERTIME.ot_date_to,
            ot_business_date: createOVERTIME.ot_business_date,
            added_by: userData?.emp_no,
        }
        await axios.post(`${APILink}ot/`, payload)
            .then((res:any) => {

                setIsSubmittingRequest(false)
                dispatch(OVERTIMEViewFilterEmployeeAction({emp_no: userData?.emp_no}))
                dispatch(HandleAlertAction({
                    open: true,
                    status: "success",
                    message: `File ${userData?.rank_hierarchy == 2? 'Allowance Time': 'Overtime'} Successfully`
                }))
                sendEmail(createOVERTIME.emp_no, res.data.id)

            })
            .catch((err:any) => {
                setIsSubmittingRequest(false)
                dispatch(HandleAlertAction({
                    open: true,
                    status: "error",
                    message: beautifyJSON(err.response?.data)
                }))

            })
    }

    return (
        <React.Fragment>
            <Typography style={{border: '2px solid rgb(25, 118, 210)', width: '100%', textAlign: 'center', padding: '2px', background: 'rgb(245,247,248)', boxShadow: '4px 4px 10px rgb(200, 200, 222)'}} variant='plain'>{isDepartmentManager ? "Create an Allowance time" : "Create an Overtime Data"}</Typography>
            <div className='flex flex-col gap-3 overflow-auto relative'>
                <div className='flex flex-wrap gap-3 pt-4'>
                    <div className='flex flex-col gap-3' style={{width : '100%'}}>
                        <EmployeeAutoComplete createOVERTIME={createOVERTIME} setCreateOVERTIME={setCreateOVERTIME}/>
                        {/* <OVERTIMETypeAutoComplete createOVERTIME={createOVERTIME} setCreateOVERTIME={setCreateOVERTIME}/> */}
                        <TextField
                            required 
                            sx={{width: '100%'}} 
                            label={isDepartmentManager ? 'ALLOWANCE TIME Type': 'OVERTIME Type'}
                            variant='outlined' 
                            multiline rows={1}
                            value={"After Duty"}
                            disabled
                            
                            
                        />
                        <TextField
                            required 
                            sx={{width: '100%'}} 
                            label={isDepartmentManager ? 'ALLOWANCE TIME Description': 'OVERTIME Description'} 
                            variant='outlined' 
                            multiline rows={2}
                            value={createOVERTIME?.ot_remarks}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                // event.target.value
                                setCreateOVERTIME((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            ot_remarks: event.target.value
                                        }
                                    )
                                })
                            }}
                            
                        />
                    </div>
                    <div className='flex flex-col gap-6' style={{width : '100%'}}>
                        <DateFromToOVERTIMECreate createOVERTIME={createOVERTIME} setCreateOVERTIME={setCreateOVERTIME}/>
                    </div>
                </div>
                <div className='flex justify-center mt-6' container-name='ot_buttons_container'>
                    <div className='flex justify-between' style={{width:'100%'}} container-name='ot_buttons'>
                        <Button variant='contained' onClick={onClickSubmit} disabled={isSubmittingRequest}>Create OVERTIME</Button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default QuickAccessOVERTIMECreate;

