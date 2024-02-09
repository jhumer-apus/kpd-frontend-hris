import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { Button } from '@mui/material';
import {TextField} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import EmployeeAutoComplete from './inner-ui-components/employee-autocomplete';
import { Typography } from '@mui/joy';
import { ALLOWANCETYPECreateInterface } from '@/types/types-payroll-variables';
import { ALLOWANCETYPECreateAction, ALLOWANCETYPECreateActionFailureCleanup } from '@/store/actions/payroll-variables';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';




interface CreateALLOWANCETYPEModalInterface {
    setOpen?: Dispatch<SetStateAction<boolean>>;
}

function PVMALLOWANCETYPECreate(props: CreateALLOWANCETYPEModalInterface) {
    const dispatch = useDispatch();
    const curr_user = useSelector((state: RootState)=> state.auth.employee_detail?.emp_no);
    const ALLOWANCETYPECreatestate = useSelector((state: RootState)=> state.payrollVariables.ALLOWANCETYPECreate);
    const [createALLOWANCETYPE, setCreateALLOWANCETYPE] = useState<ALLOWANCETYPECreateInterface>({
        allowance_name: '',
        taxable: false,
        added_by: NaN,
    });
    const onClickSubmit = () => {
        dispatch(ALLOWANCETYPECreateAction(createALLOWANCETYPE))
    };

    useEffect(()=> {
        if(curr_user){
            setCreateALLOWANCETYPE((prevState) => {
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
        if(ALLOWANCETYPECreatestate.status === 'succeeded'){
            window.alert('Request Successful');
            window.location.reload();
        }else if(ALLOWANCETYPECreatestate.status === 'failed'){
            window.alert(`Request Failed, ${ALLOWANCETYPECreatestate.error}`)
            setTimeout(()=> {
                dispatch(ALLOWANCETYPECreateActionFailureCleanup());
            }, 1000)
        }
    }, [ALLOWANCETYPECreatestate.status])

    return (
        <React.Fragment>
            <Typography style={{border: '2px solid rgb(25, 118, 210)', width: '100%', textAlign: 'center', padding: '6px', background: 'rgb(245,247,248)', boxShadow: '4px 4px 10px rgb(200, 200, 222)'}} variant='plain' level="h6">Create an Allowance Type Data</Typography>
            <div className='flex flex-col gap-6 overflow-auto w-3/4'>
                    <div className='flex flex-col gap-6 pt-4'>
                        {/* <EmployeeAutoComplete createALLOWANCETYPE={createALLOWANCETYPE} setCreateALLOWANCETYPE={setCreateALLOWANCETYPE}/> */}
                    </div>
                    <div className='flex flex-col gap-6'>
                        <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='Allowance Type Name:'
                            aria-required  
                            variant='outlined' 
                            type="text"
                            value={createALLOWANCETYPE?.allowance_name}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = event.target.value
                                setCreateALLOWANCETYPE((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            allowance_name: value
                                        }
                                    )
                                })
                            }}
                        />
                        <FormControl className='w-full justify-center items-center'>
                            <FormLabel id="is-approver-manage-rank-create">Allowance - Taxable?</FormLabel>
                            <RadioGroup
                                className='flex w-full justify-around'
                                row
                                aria-labelledby="is-approver-manage-rank-create w-full"
                                name="name-is-approver-manage-rank-create"
                                value={`${createALLOWANCETYPE.taxable}`}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    const value = (event.target.value=== 'true' ? true : false);
                                    setCreateALLOWANCETYPE((prevState)=> {
                                        return (
                                            {
                                                ...prevState,
                                                taxable: value
                                            }
                                        )
                                    })
                                }}
                            >
                                <FormControlLabel value="true" control={<Radio />} label="Yes" />
                                <FormControlLabel value="false" control={<Radio />} label="No" />
                            </RadioGroup>
                        </FormControl>
                    </div>
                <div className='flex justify-center mt-6' container-name='leave_buttons_container'>
                    <div className='flex justify-between' style={{width:'100%'}} container-name='leave_buttons'>
                        <Button variant='contained' onClick={onClickSubmit}>Create ALLOWANCETYPE</Button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default PVMALLOWANCETYPECreate;

