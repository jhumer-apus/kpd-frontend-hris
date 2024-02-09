import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { Button } from '@mui/material';
import {TextField} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import EmployeeAutoComplete from './inner-ui-components/employee-autocomplete';
import { Typography } from '@mui/joy';
import { CASHADVANCECreateInterface } from '@/types/types-payroll-variables';
import { CASHADVANCECreateAction, CASHADVANCECreateActionFailureCleanup } from '@/store/actions/payroll-variables';


interface CreateCASHADVANCEModalInterface {
    setOpen?: Dispatch<SetStateAction<boolean>>;
}

function PVMCASHADVANCECreate(props: CreateCASHADVANCEModalInterface) {
    const dispatch = useDispatch();
    const curr_user = useSelector((state: RootState)=> state.auth.employee_detail?.emp_no);
    const CASHADVANCECreatestate = useSelector((state: RootState)=> state.payrollVariables.CASHADVANCECreate);
    const [createCASHADVANCE, setCreateCASHADVANCE] = useState<CASHADVANCECreateInterface>({
        cash_advance_total: NaN,
        payment_monthly: NaN,
        emp_no: NaN,
        added_by: NaN,
    });
    const onClickSubmit = () => {
        dispatch(CASHADVANCECreateAction(createCASHADVANCE))
    };

    useEffect(()=> {
        if(curr_user){
            setCreateCASHADVANCE((prevState) => {
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
        if(CASHADVANCECreatestate.status === 'succeeded'){
            window.alert('Request Successful');
            window.location.reload();
        }else if(CASHADVANCECreatestate.status === 'failed'){
            window.alert(`Request Failed, ${CASHADVANCECreatestate.error}`)
            setTimeout(()=> {
                dispatch(CASHADVANCECreateActionFailureCleanup());
            }, 1000)
        }
    }, [CASHADVANCECreatestate.status])

    return (
        <React.Fragment>
            <Typography style={{border: '2px solid rgb(25, 118, 210)', width: '100%', textAlign: 'center', padding: '6px', background: 'rgb(245,247,248)', boxShadow: '4px 4px 10px rgb(200, 200, 222)'}} variant='plain' level="h6">Create a Cash Advance Data</Typography>
            <div className='flex flex-col gap-6 overflow-auto w-3/4'>
                    <div className='flex flex-col gap-6 pt-4'>
                        <EmployeeAutoComplete createCASHADVANCE={createCASHADVANCE} setCreateCASHADVANCE={setCreateCASHADVANCE}/>
                    </div>
                    <div className='flex flex-col gap-6'>
                        <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='CASHADVANCE Amount:'
                            aria-required  
                            variant='outlined' 
                            type="number"
                            value={createCASHADVANCE?.cash_advance_total}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = parseInt(event.target.value)
                                setCreateCASHADVANCE((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            cash_advance_total: value
                                        }
                                    )
                                })
                            }}
                        />
                        <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='Payment Monthly (Amount)'
                            aria-required  
                            variant='outlined' 
                            type="number"
                            value={createCASHADVANCE?.payment_monthly}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = parseInt(event.target.value)
                                setCreateCASHADVANCE((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            payment_monthly: value
                                        }
                                    )
                                })
                            }}
                        />
                    </div>
                <div className='flex justify-center mt-6' container-name='leave_buttons_container'>
                    <div className='flex justify-between' style={{width:'100%'}} container-name='leave_buttons'>
                        <Button variant='contained' onClick={onClickSubmit}>Create CASHADVANCE</Button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default PVMCASHADVANCECreate;

