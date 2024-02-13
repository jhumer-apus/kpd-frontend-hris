import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { Button } from '@mui/material';
import {TextField} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import EmployeeAutoComplete from './inner-ui-components/employee-autocomplete';
import { Typography } from '@mui/joy';
import { PHILHEALTHCreateInterface } from '@/types/types-payroll-variables';
import { PHILHEALTHCreateAction, PHILHEALTHCreateActionFailureCleanup } from '@/store/actions/payroll-variables';


interface CreatePHILHEALTHModalInterface {
    setOpen?: Dispatch<SetStateAction<boolean>>;
}

function PVMPHILHEALTHCreate(props: CreatePHILHEALTHModalInterface) {
    const dispatch = useDispatch();
    const curr_user = useSelector((state: RootState)=> state.auth.employee_detail?.emp_no);
    const PHILHEALTHCreatestate = useSelector((state: RootState)=> state.payrollVariables.PHILHEALTHCreate);
    const [createPHILHEALTH, setCreatePHILHEALTH] = useState<PHILHEALTHCreateInterface>({
        ph_no: NaN,
        ph_contribution_month: NaN,
        ph_category: '',
        emp_no: NaN,
        added_by: NaN,
    });
    const onClickSubmit = () => {
        dispatch(PHILHEALTHCreateAction(createPHILHEALTH))
    };

    useEffect(()=> {
        if(curr_user){
            setCreatePHILHEALTH((prevState) => {
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
        if(PHILHEALTHCreatestate.status === 'succeeded'){
            window.alert('Request Successful');
            window.location.reload();
        }else if(PHILHEALTHCreatestate.status === 'failed'){
            window.alert(`Request Failed, ${PHILHEALTHCreatestate.error}`)
            setTimeout(()=> {
                dispatch(PHILHEALTHCreateActionFailureCleanup());
            }, 1000)
        }
    }, [PHILHEALTHCreatestate.status])

    return (
        <React.Fragment>
            <Typography style={{border: '2px solid rgb(25, 118, 210)', width: '100%', textAlign: 'center', padding: '6px', background: 'rgb(245,247,248)', boxShadow: '4px 4px 10px rgb(200, 200, 222)'}} variant='plain' level="h6">Create a 'Philhealth' Data</Typography>
            <div className='flex flex-col gap-6 overflow-auto w-3/4'>
                    <div className='flex flex-col gap-6 pt-4'>
                        <EmployeeAutoComplete createPHILHEALTH={createPHILHEALTH} setCreatePHILHEALTH={setCreatePHILHEALTH}/>
                    </div>
                    <div className='flex flex-col gap-6'>
                        <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='PHILHEALTH Number:'
                            placeholder='Input 12 digit number'
                            aria-required  
                            variant='outlined' 
                            type="number"
                            value={createPHILHEALTH?.ph_no}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = parseInt(event.target.value)
                                setCreatePHILHEALTH((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            ph_no: value
                                        }
                                    )
                                })
                            }}
                        />
                        <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='Contribution Monthly (Amount)'
                            aria-required  
                            variant='outlined' 
                            type="number"
                            value={createPHILHEALTH?.ph_contribution_month}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = parseInt(event.target.value)
                                setCreatePHILHEALTH((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            ph_contribution_month: value
                                        }
                                    )
                                })
                            }}
                        />
                        <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='Philhealth Category'
                            aria-required  
                            variant='outlined' 
                            type="text"
                            value={createPHILHEALTH?.ph_category}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = event.target.value
                                setCreatePHILHEALTH((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            ph_category: value
                                        }
                                    )
                                })
                            }}
                        />
                    </div>
                <div className='flex justify-center mt-6' container-name='leave_buttons_container'>
                    <div className='flex justify-between' style={{width:'100%'}} container-name='leave_buttons'>
                        <Button variant='contained' onClick={onClickSubmit}>Create PHILHEALTH</Button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default PVMPHILHEALTHCreate;

