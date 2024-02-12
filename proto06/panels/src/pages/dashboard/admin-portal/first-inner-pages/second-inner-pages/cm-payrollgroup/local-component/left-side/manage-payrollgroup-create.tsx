import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { Button } from '@mui/material';
import {TextField} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { Typography } from '@mui/joy';
import { PAYROLLGROUPCreateInterface } from '@/types/types-pages';
import { PAYROLLGROUPCreateAction, PAYROLLGROUPCreateActionFailureCleanup } from '@/store/actions/categories';

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
        payroll_freq: NaN,
        added_by: NaN,
    });
    const onClickSubmit = () => {
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

    useEffect(()=>{
        if(PAYROLLGROUPCreatestate.status === 'succeeded'){
            window.alert('Request Successful');
            window.location.reload();
        }else if(PAYROLLGROUPCreatestate.status === 'failed'){
            window.alert(`Request Failed, ${PAYROLLGROUPCreatestate.error}`)
            setTimeout(()=> {
                dispatch(PAYROLLGROUPCreateActionFailureCleanup());
            }, 1000)
        }
    }, [PAYROLLGROUPCreatestate.status])

    return (
        <React.Fragment>
            <Typography style={{border: '2px solid rgb(25, 118, 210)', width: '100%', textAlign: 'center', padding: '6px', background: 'rgb(245,247,248)', boxShadow: '4px 4px 10px rgb(200, 200, 222)'}} variant='plain'>Create a Payroll Group Data</Typography>
            <div className='flex flex-col gap-3 w-3/4 items-center'>
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
                    required 
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
                <TextField
                    required 
                    sx={{width: '100%'}} 
                    label='Pay Frequency (Per Month)'
                    aria-required  
                    variant='outlined' 
                    type="number"
                    value={createPAYROLLGROUP?.payroll_freq}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        const value = parseInt(event.target.value)
                        setCreatePAYROLLGROUP((prevState)=> {
                            return (
                                {
                                    ...prevState,
                                    payroll_freq: value
                                }
                            )
                        })
                    }}
                />
                <div className='flex justify-center mt-6' container-name='leave_buttons_container'>
                    <div className='flex justify-between' style={{width:'100%'}} container-name='leave_buttons'>
                        <Button variant='contained' onClick={onClickSubmit}>Create PAYROLLGROUP</Button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default ManagePAYROLLGROUPCreate;

