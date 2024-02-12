import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { Button } from '@mui/material';
import {TextField} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import EmployeeAutoComplete from './inner-ui-components/employee-autocomplete';
import { Typography } from '@mui/joy';
import { ALLOWANCEENTRYCreateInterface } from '@/types/types-payroll-variables';
import { ALLOWANCEENTRYCreateAction, ALLOWANCEENTRYCreateActionFailureCleanup } from '@/store/actions/payroll-variables';
import AllowanceAutoComplete from './inner-ui-components/allowance-type-autocomplete';


interface CreateALLOWANCEENTRYModalInterface {
    setOpen?: Dispatch<SetStateAction<boolean>>;
}

function PVMALLOWANCEENTRYCreate(props: CreateALLOWANCEENTRYModalInterface) {
    const dispatch = useDispatch();
    const curr_user = useSelector((state: RootState)=> state.auth.employee_detail?.emp_no);
    const ALLOWANCEENTRYCreatestate = useSelector((state: RootState)=> state.payrollVariables.ALLOWANCEENTRYCreate);
    const [createALLOWANCEENTRY, setCreateALLOWANCEENTRY] = useState<ALLOWANCEENTRYCreateInterface>({
        amount: NaN,
        tax_rate: NaN,
        allowance_code: NaN,
        emp_no: NaN,
        added_by: NaN,
    });
    const onClickSubmit = () => {
        dispatch(ALLOWANCEENTRYCreateAction(createALLOWANCEENTRY))
    };

    useEffect(()=> {
        if(curr_user){
            setCreateALLOWANCEENTRY((prevState) => {
                return (
                    {
                        ...prevState,
                        added_by: curr_user
                    }
                )
            })
        }
    }, [curr_user]) 

    useEffect(()=>{
        if(ALLOWANCEENTRYCreatestate.status === 'succeeded'){
            window.alert('Request Successful');
            window.location.reload();
        }else if(ALLOWANCEENTRYCreatestate.status === 'failed'){
            window.alert(`Request Failed, ${ALLOWANCEENTRYCreatestate.error}`)
            setTimeout(()=> {
                dispatch(ALLOWANCEENTRYCreateActionFailureCleanup());
            }, 1000)
        }
    }, [ALLOWANCEENTRYCreatestate.status])

    return (
        <React.Fragment>
            <Typography style={{border: '2px solid rgb(25, 118, 210)', width: '100%', textAlign: 'center', padding: '6px', background: 'rgb(245,247,248)', boxShadow: '4px 4px 10px rgb(200, 200, 222)'}} variant='plain' level="h6">Create an Allowance Entry Data</Typography>
            <div className='flex flex-col gap-6 overflow-auto w-3/4'>
                    <div className='flex flex-col gap-6 pt-4'>
                        <EmployeeAutoComplete createALLOWANCEENTRY={createALLOWANCEENTRY} setCreateALLOWANCEENTRY={setCreateALLOWANCEENTRY}/>
                    </div>
                    <AllowanceAutoComplete createALLOWANCEENTRY={createALLOWANCEENTRY} setCreateALLOWANCEENTRY={setCreateALLOWANCEENTRY}/>
                    <div className='flex flex-col gap-6'>
                        <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='Allowance Amount:'
                            aria-required  
                            variant='outlined' 
                            type="number"
                            value={createALLOWANCEENTRY?.amount}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = parseInt(event.target.value)
                                setCreateALLOWANCEENTRY((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            amount: value
                                        }
                                    )
                                })
                            }}
                        />
                        <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='Tax Rate'
                            aria-required  
                            variant='outlined' 
                            type="number"
                            value={createALLOWANCEENTRY?.tax_rate}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = parseInt(event.target.value)
                                setCreateALLOWANCEENTRY((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            tax_rate: value
                                        }
                                    )
                                })
                            }}
                        />
                    </div>
                <div className='flex justify-center mt-6' container-name='leave_buttons_container'>
                    <div className='flex justify-between' style={{width:'100%'}} container-name='leave_buttons'>
                        <Button variant='contained' onClick={onClickSubmit}>Create ALLOWANCEENTRY</Button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default PVMALLOWANCEENTRYCreate;

