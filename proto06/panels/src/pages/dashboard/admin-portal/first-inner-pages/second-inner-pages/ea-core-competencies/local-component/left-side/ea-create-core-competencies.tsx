import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { Typography } from '@mui/joy';
import { CORECOMPECreateInterface } from '@/types/types-employee-and-applicants';
import { CORECOMPECreateAction, CORECOMPECreateActionFailureCleanup } from '@/store/actions/employee-and-applicants';


interface CreateCORECOMPEModalInterface {
    setOpen?: Dispatch<SetStateAction<boolean>>;
}

function EACORECOMPECreate(props: CreateCORECOMPEModalInterface) {
    const dispatch = useDispatch();
    const curr_user = useSelector((state: RootState)=> state.auth.employee_detail?.emp_no);
    const CORECOMPECreatestate = useSelector((state: RootState)=> state.employeeAndApplicants.CORECOMPECreate);
    const [createCORECOMPE, setCreateCORECOMPE] = useState<CORECOMPECreateInterface>({
        checklist_title: '',
        checklist_limit: '',
    });
    const onClickSubmit = () => {
        dispatch(CORECOMPECreateAction(createCORECOMPE))
    };

    useEffect(()=> {
        if(curr_user){
            setCreateCORECOMPE((prevState) => {
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
        if(CORECOMPECreatestate.status === 'succeeded'){
            window.alert('Request Successful');
            window.location.reload();
        }else if(CORECOMPECreatestate.status === 'failed'){
            window.alert(`Request Failed, ${CORECOMPECreatestate.error}`)
            setTimeout(()=> {
                dispatch(CORECOMPECreateActionFailureCleanup());
            }, 800) // To do: apply to all useEffect cleanup? Or Make this a whole repo handler
        }
    }, [CORECOMPECreatestate.status])

    return (
        <React.Fragment>
            <Typography style={{border: '2px solid rgb(25, 118, 210)', width: '100%', textAlign: 'center', padding: '6px', background: 'rgb(245,247,248)', boxShadow: '4px 4px 10px rgb(200, 200, 222)'}} variant='plain' level="h6">Create and add a "Core Competency" checklist</Typography>
            <Typography className="italic p-8 flex justify-center text-center items-center" >Newly added competencies will reflect to the current "pending" and future KPI Evaluations only</Typography>
            
            <div className='flex flex-col gap-6 overflow-auto w-3/4'>
                    <div className='flex flex-col gap-6 pt-4'>              
                        <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='Core Title:'
                            aria-required  
                            variant='outlined' 
                            type="text"
                            value={createCORECOMPE?.checklist_title}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = event.target.value
                                setCreateCORECOMPE((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            checklist_title: value
                                        }
                                    )
                                })
                            }}
                        />
                        <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='Core Limits:'
                            aria-required  
                            variant='outlined' 
                            type="text"
                            value={createCORECOMPE?.checklist_limit}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = event.target.value
                                setCreateCORECOMPE((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            checklist_limit: value
                                        }
                                    )
                                })
                            }}
                        />
                    </div>
                <div className='flex justify-center mt-6' container-name='leave_buttons_container'>
                    <div className='flex justify-between' style={{width:'100%'}} container-name='leave_buttons'>
                        <Button variant='contained' onClick={onClickSubmit}>Submit Core Competency</Button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default EACORECOMPECreate;

