import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { Button } from '@mui/material';
import {TextField} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import EmployeeAutoComplete from './inner-ui-components/employee-autocomplete';
import { Typography } from '@mui/joy';
import { DEPARTMENTCreateInterface } from '@/types/types-pages';
import { DEPARTMENTCreateAction, DEPARTMENTCreateActionFailureCleanup, DEPARTMENTViewAction } from '@/store/actions/categories';
import BranchAutoComplete from './inner-ui-components/branch-autocomplete';
import { HandleAlertAction } from '@/store/actions/components';
import { beautifyJSON } from '@/helpers/utils';

interface CreateDEPARTMENTModalInterface {
    setOpen?: Dispatch<SetStateAction<boolean>>;
}

function ManageDEPARTMENTCreate(props: CreateDEPARTMENTModalInterface) {

    const dispatch = useDispatch();
    const curr_user = useSelector((state: RootState)=> state.auth.employee_detail?.emp_no);
    const DEPARTMENTCreatestate = useSelector((state: RootState)=> state.categories.DEPARTMENTCreate);
    const [createDEPARTMENT, setCreateDEPARTMENT] = useState<DEPARTMENTCreateInterface>({
        dept_name: "",
        dept_lead: NaN,
        dept_branch_code: NaN,
        added_by: NaN,
    });
    const onClickSubmit = (e:any) => {
        e.preventDefault()

        if(validateCreateDepartment(createDEPARTMENT)) return

        dispatch(DEPARTMENTCreateAction(createDEPARTMENT))
    };

    const resetForm = () => {
        setCreateDEPARTMENT((curr:any) => ({
            dept_name: "",
            dept_lead: null,
            dept_branch_code: null,
            added_by: curr_user,
        }))
    }

    useEffect(()=> {
        if(curr_user){
            setCreateDEPARTMENT((prevState) => {
                return (
                    {
                        ...prevState,
                        added_by: curr_user
                    }
                )
            })
        }
    }, [curr_user]) 

    const validateCreateDepartment = (payload:any) => {
        const errors:any = {}

        // if(!payload.dept_lead) errors["Department Lead"] = "Department Lead is Required,"
        if(!payload.dept_name) errors["Department Name"] = "Department Name is Required,"
        if(!payload.dept_branch_code) errors["Branch"] = "Branch is Required,"

        if(Object.keys(errors).length > 0) {
            dispatch(HandleAlertAction({
                open: true,
                status: "error",
                message: beautifyJSON(errors)
            }))
            return true
        }
        return false

    }

    useEffect(()=>{
        if(DEPARTMENTCreatestate.status === 'succeeded'){
            resetForm()
            dispatch(HandleAlertAction({
                open:true,
                status:"success",
                message:"Create Department Successful"
            }))
            dispatch(DEPARTMENTViewAction());
            setTimeout(()=>{
                dispatch(DEPARTMENTCreateActionFailureCleanup())
            }, 200)
            // window.location.reload();
        }else if(DEPARTMENTCreatestate.status === 'failed'){

            dispatch(HandleAlertAction({
                open:true,
                status:"error",
                message:DEPARTMENTCreatestate.error
            }))
            // window.alert(`Request Failed, ${DEPARTMENTCreatestate.error}`)
            setTimeout(()=> {
                dispatch(DEPARTMENTCreateActionFailureCleanup());
            }, 200)
        }
    }, [DEPARTMENTCreatestate.status])

    return (
        <React.Fragment>
            <Typography style={{border: '2px solid rgb(25, 118, 210)', width: '100%', textAlign: 'center', padding: '6px', background: 'rgb(245,247,248)', boxShadow: '4px 4px 10px rgb(200, 200, 222)'}} variant='plain'>Create a Department Data</Typography>
            <form onSubmit={onClickSubmit} className='flex flex-col gap-3 overflow-auto relative'>
                    <div className='flex flex-col gap-3 pt-4'>
                        <EmployeeAutoComplete  
                            currentEmpNo={createDEPARTMENT.dept_lead} 
                            createDEPARTMENT={createDEPARTMENT} 
                            setCreateDEPARTMENT={setCreateDEPARTMENT}
                        />
                    </div>
                    <div className='flex flex-col gap-3'>
                        <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='Department Name'
                            aria-required  
                            variant='outlined' 
                            type="text"
                            value={createDEPARTMENT?.dept_name}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = event.target.value
                                setCreateDEPARTMENT((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            dept_name: value
                                        }
                                    )
                                })
                            }}
                            
                        />
                        <BranchAutoComplete 
                            currentId={createDEPARTMENT.dept_branch_code} 
                            createDEPARTMENT={createDEPARTMENT} 
                            setCreateDEPARTMENT={setCreateDEPARTMENT}
                        />
                    </div>
                <div className='flex justify-center mt-6' container-name='leave_buttons_container'>
                    <div className='flex justify-between' style={{width:'100%'}} container-name='leave_buttons'>
                        <Button variant='contained' type="submit">Create DEPARTMENT</Button>
                    </div>
                </div>
            </form>
        </React.Fragment>
    );
}

export default ManageDEPARTMENTCreate;

