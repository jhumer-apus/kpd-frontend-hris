import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { Typography } from '@mui/joy';
import { EVALQUESTIONSCreateInterface } from '@/types/types-employee-and-applicants';
import { EVALQUESTIONSCreateAction, EVALQUESTIONSCreateActionFailureCleanup } from '@/store/actions/employee-and-applicants';


interface CreateEVALQUESTIONSModalInterface {
    setOpen?: Dispatch<SetStateAction<boolean>>;
}

function EAEVALQUESTIONSCreate(props: CreateEVALQUESTIONSModalInterface) {
    const dispatch = useDispatch();
    const curr_user = useSelector((state: RootState)=> state.auth.employee_detail?.emp_no);
    const EVALQUESTIONSCreatestate = useSelector((state: RootState)=> state.employeeAndApplicants.EVALQUESTIONSCreate);
    const [createEVALQUESTIONS, setCreateEVALQUESTIONS] = useState<EVALQUESTIONSCreateInterface>({
        question: ''
    });
    const onClickSubmit = () => {
        dispatch(EVALQUESTIONSCreateAction(createEVALQUESTIONS))
    };

    useEffect(()=> {
        if(curr_user){
            setCreateEVALQUESTIONS((prevState) => {
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
        if(EVALQUESTIONSCreatestate.status === 'succeeded'){
            window.alert('Request Successful');
            window.location.reload();
        }else if(EVALQUESTIONSCreatestate.status === 'failed'){
            window.alert(`Request Failed, ${EVALQUESTIONSCreatestate.error}`)
            setTimeout(()=> {
                dispatch(EVALQUESTIONSCreateActionFailureCleanup());
            }, 1000)
        }
    }, [EVALQUESTIONSCreatestate.status])

    return (
        <React.Fragment>
            <Typography style={{border: '2px solid rgb(25, 118, 210)', width: '100%', textAlign: 'center', padding: '6px', background: 'rgb(245,247,248)', boxShadow: '4px 4px 10px rgb(200, 200, 222)'}} variant='plain' level="h6">Create and add an "Evaluation Question"</Typography>
            <Typography className="italic p-8 flex justify-center text-center items-center" >Newly added questions will reflect to the current "pending" and future KPI Evaluations only</Typography>
            
            <div className='flex flex-col gap-6 overflow-auto w-3/4'>
                    <div className='flex flex-col gap-6 pt-4'>              
                        <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='Evaluation Question:'
                            aria-required  
                            variant='outlined' 
                            type="text"
                            value={createEVALQUESTIONS?.question}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = event.target.value
                                setCreateEVALQUESTIONS((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            question: value
                                        }
                                    )
                                })
                            }}
                        />
                    </div>
                <div className='flex justify-center mt-6' container-name='leave_buttons_container'>
                    <div className='flex justify-between' style={{width:'100%'}} container-name='leave_buttons'>
                        <Button variant='contained' onClick={onClickSubmit}>Submit KPI Question</Button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default EAEVALQUESTIONSCreate;

