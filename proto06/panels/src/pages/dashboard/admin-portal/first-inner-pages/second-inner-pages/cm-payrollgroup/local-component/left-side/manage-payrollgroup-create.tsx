import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { Button, FormControl, InputLabel, Menu } from '@mui/material';
import {TextField} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, globalReducerFailed, globalReducerSuccess } from '@/store/configureStore';
import { Typography } from '@mui/joy';
import { PAYROLLGROUPCreateInterface } from '@/types/types-pages';
import { PAYROLLGROUPCreateAction, PAYROLLGROUPCreateActionFailureCleanup, PAYROLLGROUPViewAction } from '@/store/actions/categories';
import { Select, MenuItem } from '@mui/material';
import { HandleAlertAction } from '@/store/actions/components';
import { beautifyJSON } from '@/helpers/utils';
interface CreatePAYROLLGROUPModalInterface {
    setOpen?: Dispatch<SetStateAction<boolean>>;
}

function ManagePAYROLLGROUPCreate(props: CreatePAYROLLGROUPModalInterface) {

    const dispatch = useDispatch();
    const curr_user = useSelector((state: RootState)=> state.auth.employee_detail?.emp_no);
    const PAYROLLGROUPCreatestate = useSelector((state: RootState)=> state.categories.PAYROLLGROUPCreate);
    const [createPAYROLLGROUP, setCreatePAYROLLGROUP] = useState<PAYROLLGROUPCreateInterface>({
        name: "",
        payroll_description: "",
        payroll_type: NaN,
        used_account: 0,
        added_by: NaN,
    });
    const onClickSubmit = (e:any) => {
        e.preventDefault()
        if(validatePayroll(createPAYROLLGROUP)){
            return
        }
        dispatch(PAYROLLGROUPCreateAction(createPAYROLLGROUP))
    };

    useEffect(()=> {
        if(curr_user){
            setCreatePAYROLLGROUP((prevState) => {
                return (
                    {
                        ...prevState,
                        added_by: curr_user
                    }
                )
            })
        }
    }, [curr_user]) 

    const resetForm = () => {
        setCreatePAYROLLGROUP((curr:any) => ({
            name: "",
            payroll_description: "",
            payroll_type: null,
            used_account: 0,
            added_by: curr_user,
        }))
    }

    const validatePayroll = (payload:any) => {

        const errors:any = {}

        // if(!payload.payroll_description) 
        //     errors['Description'] = "Description is Required"

        if(!payload.name) 
            errors['Payroll Name'] = "Payroll Name is Required"

        if(!payload.payroll_type)
            errors['Payment Type'] = "Payment Type is Required"

        if(Object.keys(errors).length > 0) {
            dispatch(HandleAlertAction({
                open:true,
                status:"error",
                message: beautifyJSON(errors)
            }))
            return true
        }
        return false
    }

    useEffect(()=>{
        if(PAYROLLGROUPCreatestate.status === `${globalReducerSuccess}`){
            resetForm()
            dispatch(HandleAlertAction({
                open:true,
                status:"success",
                message:"Create Payroll Successful"
            }))
            // window.location.reload();
            dispatch(PAYROLLGROUPViewAction());
            setTimeout(()=>{
                dispatch(PAYROLLGROUPCreateActionFailureCleanup());
            }, 200)
        }else if(PAYROLLGROUPCreatestate.status === `${globalReducerFailed}`){
            dispatch(HandleAlertAction({
                open:true,
                status:"error",
                // message:beautifyJSON(PAYROLLGROUPCreatestate?.error)
                message:PAYROLLGROUPCreatestate?.error
            }))
            // window.alert(`Request Failed, ${PAYROLLGROUPCreatestate.error}`)
            setTimeout(()=> {
                dispatch(PAYROLLGROUPCreateActionFailureCleanup());
            }, 200)
        }
    }, [PAYROLLGROUPCreatestate.status])

    return (
        <React.Fragment>
            <Typography style={{border: '2px solid rgb(25, 118, 210)', width: '100%', textAlign: 'center', padding: '6px', background: 'rgb(245,247,248)', boxShadow: '4px 4px 10px rgb(200, 200, 222)'}} variant='plain'>Create a Payroll Group Data</Typography>
            <form onSubmit={onClickSubmit} className='flex flex-col gap-3  w-full sm:w-3/4 items-center mt-6 pt-3'>
                <TextField
                    required 
                    sx={{width: '100%'}} 
                    label='Payroll Group Name (Max: 25 char)'
                    aria-required  
                    variant='outlined' 
                    type="text"
                    value={createPAYROLLGROUP?.name}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        const value = event.target.value
                        setCreatePAYROLLGROUP((prevState)=> {
                            return (
                                {
                                    ...prevState,
                                    name: value
                                }
                            )
                        })
                    }}
                />
                <TextField
                    sx={{width: '100%'}} 
                    label='Description'
                    aria-required  
                    variant='outlined' 
                    type="text"
                    multiline
                    rows={2}
                    value={createPAYROLLGROUP?.payroll_description}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        const value = event.target.value
                        setCreatePAYROLLGROUP((prevState)=> {
                            return (
                                {
                                    ...prevState,
                                    payroll_description: value
                                }
                            )
                        })
                    }}
                    
                />
                <FormControl fullWidth>
                    <InputLabel id="type">Payment Type</InputLabel>
                    <Select
                        required 
                        sx={{width: '100%'}} 
                        labelId="type"
                        label="Payment Type"
                        aria-required  
                        placeholder='1 - Monthly | 2 - Semi-Monthly | 3 - Daily'
                        // variant='outlined' 
                        type="number"
                        value={createPAYROLLGROUP?.payroll_type}
                        onChange={(event: any) => {
                            const value = parseInt(event.target.value)
                            setCreatePAYROLLGROUP((prevState)=> ({
                                ...prevState,
                                payroll_type: value
                            }));
                        }}
                    >
                        <MenuItem value={1}>1 - Monthly</MenuItem>
                        <MenuItem value={2}>2 - Semi-Monthly</MenuItem>
                        <MenuItem value={3}>3 - Daily</MenuItem>
                    </Select>    
                </FormControl>

                <div className='flex justify-center mt-6 mb-6' container-name='leave_buttons_container'>
                    <div className='flex justify-between' style={{width:'100%'}} container-name='leave_buttons'>
                        <Button variant='contained' type="submit">Create PAYROLLGROUP</Button>
                    </div>
                </div>
            </form>
        </React.Fragment>
    );
}

export default ManagePAYROLLGROUPCreate;

