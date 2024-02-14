import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { Typography } from '@mui/joy';
import { ONBOARDINGREQUIREMENTSCreateInterface } from '@/types/types-employee-and-applicants';
import { ONBOARDINGREQUIREMENTSCreateAction, ONBOARDINGREQUIREMENTSCreateActionFailureCleanup } from '@/store/actions/employee-and-applicants';
import EmployeeAutoComplete from './autocomplete-fields/employee-autocomplete';


interface CreateONBOARDINGREQUIREMENTSModalInterface {
    setOpen?: Dispatch<SetStateAction<boolean>>;
}

function EAONBOARDINGREQUIREMENTSCreate(props: CreateONBOARDINGREQUIREMENTSModalInterface) {
    const dispatch = useDispatch();
    const curr_user = useSelector((state: RootState)=> state.auth.employee_detail?.emp_no);
    const ONBOARDINGREQUIREMENTSCreatestate = useSelector((state: RootState)=> state.employeeAndApplicants.ONBOARDINGREQUIREMENTSCreate);
    const [createONBOARDINGREQUIREMENTS, setCreateONBOARDINGREQUIREMENTS] = useState<ONBOARDINGREQUIREMENTSCreateInterface>({
        facilitator: NaN,
        onboarding_title: '',
    });
    const onClickSubmit = () => {
        dispatch(ONBOARDINGREQUIREMENTSCreateAction(createONBOARDINGREQUIREMENTS))
    };

    useEffect(()=> {
        if(curr_user){
            setCreateONBOARDINGREQUIREMENTS((prevState) => {
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
        if(ONBOARDINGREQUIREMENTSCreatestate.status === 'succeeded'){
            window.alert('Request Successful');
            window.location.reload();
        }else if(ONBOARDINGREQUIREMENTSCreatestate.status === 'failed'){
            window.alert(`Request Failed, ${ONBOARDINGREQUIREMENTSCreatestate.error}`)
            setTimeout(()=> {
                dispatch(ONBOARDINGREQUIREMENTSCreateActionFailureCleanup());
            }, 1000)
        }
    }, [ONBOARDINGREQUIREMENTSCreatestate.status])

    return (
        <React.Fragment>
            <Typography style={{border: '2px solid rgb(25, 118, 210)', width: '100%', textAlign: 'center', padding: '6px', background: 'rgb(245,247,248)', boxShadow: '4px 4px 10px rgb(200, 200, 222)'}} variant='plain' level="h6">Create and add an "Onboarding Requirement" checklist</Typography>
            <Typography className="italic p-8 flex justify-center text-center items-center" >Newly added requirements will reflect to the future "pending" requirements only</Typography>
            
            <div className='flex flex-col gap-6 overflow-auto w-3/4'>
                    <div className='flex flex-col gap-6 pt-4'>
                        <EmployeeAutoComplete createONBOARDINGREQUIREMENTS={createONBOARDINGREQUIREMENTS} setCreateONBOARDINGREQUIREMENTS={setCreateONBOARDINGREQUIREMENTS}/>              
                        <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='Onboarding Requirement Title:'
                            aria-required  
                            variant='outlined' 
                            type="text"
                            value={createONBOARDINGREQUIREMENTS?.onboarding_title}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = event.target.value
                                setCreateONBOARDINGREQUIREMENTS((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            onboarding_title: value
                                        }
                                    )
                                })
                            }}
                        />
                    </div>
                <div className='flex justify-center mt-6' container-name='leave_buttons_container'>
                    <div className='flex justify-between' style={{width:'100%'}} container-name='leave_buttons'>
                        <Button variant='contained' onClick={onClickSubmit}>Add Onboarding Requirement</Button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default EAONBOARDINGREQUIREMENTSCreate;

