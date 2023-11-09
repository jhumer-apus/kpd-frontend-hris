import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { Typography } from '@mui/joy';
import { JOBPOSTINGSCreateInterface } from '@/types/types-employee-and-applicants';
import { JOBPOSTINGSCreateAction, JOBPOSTINGSCreateActionFailureCleanup } from '@/store/actions/employee-and-applicants';
import EmployeeAutoComplete from './autocomplete-fields/position-autocomplete';

interface CreateJOBPOSTINGSModalInterface {
    setOpen?: Dispatch<SetStateAction<boolean>>;
}

function EAJOBPOSTINGSCreate(props: CreateJOBPOSTINGSModalInterface) {
    const dispatch = useDispatch();
    const curr_user = useSelector((state: RootState)=> state.auth.employee_detail?.emp_no);
    const JOBPOSTINGSCreatestate = useSelector((state: RootState)=> state.employeeAndApplicants.JOBPOSTINGSCreate);
    const [createJOBPOSTINGS, setCreateJOBPOSTINGS] = useState<JOBPOSTINGSCreateInterface>({
        position_code: NaN,
        job_description: '',
        job_salary_range: '',
        qualifications: '-',
        objectives: '-',
        responsibilities: '-',
    });
    const onClickSubmit = () => {
        dispatch(JOBPOSTINGSCreateAction(createJOBPOSTINGS))
    };

    useEffect(()=> {
        if(curr_user){
            setCreateJOBPOSTINGS((prevState) => {
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
        if(JOBPOSTINGSCreatestate.status === 'succeeded'){
            window.alert('Request Successful');
            window.location.reload();
        }else if(JOBPOSTINGSCreatestate.status === 'failed'){
            window.alert(`Request Failed, ${JOBPOSTINGSCreatestate.error}`)
            setTimeout(()=> {
                dispatch(JOBPOSTINGSCreateActionFailureCleanup());
            }, 1000)
        }
    }, [JOBPOSTINGSCreatestate.status])

    return (
        <React.Fragment>
            <Typography style={{border: '2px solid rgb(25, 118, 210)', width: '100%', textAlign: 'center', padding: '6px', background: 'rgb(245,247,248)', boxShadow: '4px 4px 10px rgb(200, 200, 222)'}} variant='plain' level="h6">Create and add a "Job Post" Requirement</Typography>
            {/* <Typography className="italic p-8 flex justify-center text-center items-center" >Newly added requirements will reflect to the future "pending" requirements only</Typography> */}
            
            <div className='flex flex-col gap-6 overflow-auto w-3/4'>
                    <Typography className="text-center"> You can add "Job Objectives" & "Job Responsibilities" on the entry after it has been initialized on the right table. </Typography>
                    <div className='flex flex-col gap-6 pt-4'>
                        <EmployeeAutoComplete createJOBPOSTINGS={createJOBPOSTINGS} setCreateJOBPOSTINGS={setCreateJOBPOSTINGS}/>              
                        <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='Job Posting Description Title:'
                            aria-required  
                            variant='outlined' 
                            type="text"
                            value={createJOBPOSTINGS?.job_description}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = event.target.value
                                setCreateJOBPOSTINGS((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            job_description: value
                                        }
                                    )
                                })
                            }}
                        />
                        <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='Salary Range:'
                            aria-required  
                            variant='outlined' 
                            type="text"
                            value={createJOBPOSTINGS?.job_salary_range}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = event.target.value
                                setCreateJOBPOSTINGS((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            job_salary_range: value
                                        }
                                    )
                                })
                            }}
                        />
                        <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='Qualifications: (Required)'
                            multiline
                            rows={4}
                            aria-required  
                            variant='outlined' 
                            type="text"
                            value={createJOBPOSTINGS?.qualifications}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = event.target.value
                                setCreateJOBPOSTINGS((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            qualifications: value
                                        }
                                    )
                                })
                            }}
                        />
                    </div>
                <div className='flex justify-center mt-6' container-name='leave_buttons_container'>
                    <div className='flex justify-between' style={{width:'100%'}} container-name='leave_buttons'>
                        <Button variant='contained' onClick={onClickSubmit}>Add Job Posting Requirement</Button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default EAJOBPOSTINGSCreate;

