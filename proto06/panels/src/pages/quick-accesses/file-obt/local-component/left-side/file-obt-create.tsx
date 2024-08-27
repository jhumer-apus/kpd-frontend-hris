import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { Button } from '@mui/material';
import {TextField} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import EmployeeAutoComplete from './inner-ui-components/employee-autocomplete';
import OBTTypeAutoComplete from './inner-ui-components/obt-type-autocomplete';
import DateFromToOBTCreate from './inner-ui-components/date-from-to-field';
import { Typography } from '@mui/joy';
import { OBTCreateInterface } from '@/types/types-pages';
import { OBTCreateAction, OBTCreateActionFailureCleanup, OBTViewFilterEmployeeAction } from '@/store/actions/procedurals';

//STORE
import { APILink } from '@/store/configureStore';

//LIBRARIES
import axios, {AxiosResponse, AxiosError} from 'axios'
import { beautifyJSON } from '@/helpers/utils';
import { HandleAlertAction } from '@/store/actions/components';

interface CreateOBTModalInterface {
    setOpen?: Dispatch<SetStateAction<boolean>>;
}

function QuickAccessOBTCreate(props: CreateOBTModalInterface) {

    const dispatch = useDispatch();
    const [isSubmittingRequest, setIsSubmittingRequest] = useState<boolean>(false);
    const OBTCreatestate = useSelector((state: RootState)=> state.procedurals.OBTCreate);
    const userData = useSelector((state: RootState) => state.auth.employee_detail);
    const [createOBT, setCreateOBT] = useState<OBTCreateInterface>({
        emp_no: NaN,
        obt_type: null,
        obt_location: '',
        obt_remarks: null,
        obt_date_from: null,
        obt_date_to: null,
        added_by: userData?.emp_no,
    });
    const onClickSubmit = () => {
        console.log(createOBT)
        setIsSubmittingRequest(true)
        // dispatch(OBTCreateAction(createOBT))
        fileOBTPost()
    };

    const sendEmail = async (emp_no:string | number, app_pk: number) => {

        const body = {
          emp_no: emp_no,
          email_type: "application",
          new_password: null,
          application_type: 'obt',
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
    // useEffect(()=>{
    //     if(OBTCreatestate.status === 'succeeded'){
    //         setIsSubmittingRequest(false)
    //         window.alert('Request Successful');
    //         window.location.reload();
    //     }else if(OBTCreatestate.status === 'failed'){
    //         setIsSubmittingRequest(false)
    //         window.alert(`Request Failed, ${OBTCreatestate.error}`)
    //         setTimeout(()=> {
    //             dispatch(OBTCreateActionFailureCleanup());
    //         }, 1000)
    //     }
    // }, [OBTCreatestate.status])

    const fileOBTPost = async() => {

        const payload = {
            emp_no: createOBT.emp_no,
            obt_type: createOBT.obt_type,
            obt_location: createOBT.obt_location,
            obt_remarks: createOBT.obt_remarks,
            obt_date_from: createOBT.obt_date_from,
            obt_date_to: createOBT.obt_date_to,
            added_by: userData?.emp_no,
        }
        await axios.post(`${APILink}obt/`, payload).then((res:AxiosResponse) => {

            setIsSubmittingRequest(false)
            dispatch(OBTViewFilterEmployeeAction({emp_no: userData?.emp_no}))
            dispatch(HandleAlertAction({
                open:true,
                status:"success",
                message:"File OBT Successfully"
            }))

            sendEmail(createOBT.emp_no, res.data.id)

        }).catch((err:any) => {

            setIsSubmittingRequest(false)
            dispatch(HandleAlertAction({
                open:true,
                status:"error",
                message:beautifyJSON(err.response?.data)
            }))

        })
    }
    
    console.log(OBTCreatestate.status, "124124create_obt")
    return (
        <React.Fragment>
            <Typography style={{border: '2px solid rgb(25, 118, 210)', width: '100%', textAlign: 'center', padding: '2px', background: 'rgb(245,247,248)', boxShadow: '4px 4px 10px rgb(200, 200, 222)'}} variant='plain'>Create an Official Business Time/Trip Data</Typography>
            <div className='flex flex-col gap-3 overflow-auto relative'>
                <div className='flex flex-wrap gap-3 pt-4'>
                    <div className='flex flex-col gap-3' style={{width: '100%'}}>
                        <EmployeeAutoComplete createOBT={createOBT} setCreateOBT={setCreateOBT}  />
                        <OBTTypeAutoComplete createOBT={createOBT} setCreateOBT={setCreateOBT}/>
                        {/* <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='OBT Description:'  
                            variant='outlined' 
                            multiline rows={2}
                            value={createOBT?.obt_remarks}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                // event.target.value
                                setCreateOBT((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            obt_remarks: event.target.value
                                        }
                                    )
                                })
                            }}
                            
                        /> */}
                    </div>
                    <div className='flex flex-col gap-3' style={{width: '100%'}}>
                        {/* <div>
                            <DatePicker
                                label="Business Date"
                                // value={createOVERTIME?.ot_business_date}
                                onChange={(newValue:any) => handleChangeDate("ot_business_date", newValue)}
                                sx={{ width: '100%' }} 
                            />
                        </div> */}
                        <DateFromToOBTCreate createOBT={createOBT} setCreateOBT={setCreateOBT}/>
                        <TextField 
                            required
                            sx={{width: '100%'}} 
                            label='Location/Details/Purpose:'
                            placeholder='Location/Details/Purpose'
                            inputProps = {
                                {
                                    maxLength:300
                                }
                            }
                            helperText={`${createOBT?.obt_location?.length?? 0}/300`}
                            variant='outlined' 
                            multiline rows={2}
                            value={createOBT?.obt_location}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                // event.target.value
                                setCreateOBT((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            obt_location: event.target.value
                                        }
                                    )
                                })
                            }}
                        />
                    </div>
                </div>
                <div className='flex justify-center mt-6' container-name='obt_buttons_container'>
                    <div className='flex justify-between' style={{width:'100%'}} container-name='obt_buttons'>
                        <Button 
                            variant='contained' 
                            onClick={onClickSubmit}
                            disabled={isSubmittingRequest}
                        >
                            Create OBT
                        </Button>
                        {/* <Button variant='outlined' onClick={()=> setOpen(false)}>Cancel</Button> */}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default QuickAccessOBTCreate;

