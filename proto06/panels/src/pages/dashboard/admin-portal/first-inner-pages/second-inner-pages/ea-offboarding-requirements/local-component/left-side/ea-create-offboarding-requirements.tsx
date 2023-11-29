import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { Typography } from '@mui/joy';
import { OFFBOARDINGREQUIREMENTSCreateInterface } from '@/types/types-employee-and-applicants';
import { OFFBOARDINGREQUIREMENTSCreateAction, OFFBOARDINGREQUIREMENTSCreateActionFailureCleanup } from '@/store/actions/employee-and-applicants';
import EmployeeAutoComplete from './autocomplete-fields/employee-autocomplete';


interface CreateOFFBOARDINGREQUIREMENTSModalInterface {
    setOpen?: Dispatch<SetStateAction<boolean>>;
}

function EAOFFBOARDINGREQUIREMENTSCreate(props: CreateOFFBOARDINGREQUIREMENTSModalInterface) {
    const dispatch = useDispatch();
    const curr_user = useSelector((state: RootState)=> state.auth.employee_detail?.emp_no);
    const OFFBOARDINGREQUIREMENTSCreatestate = useSelector((state: RootState)=> state.employeeAndApplicants.OFFBOARDINGREQUIREMENTSCreate);
    const [createOFFBOARDINGREQUIREMENTS, setCreateOFFBOARDINGREQUIREMENTS] = useState<OFFBOARDINGREQUIREMENTSCreateInterface>({
        facilitator: NaN,
        offboarding_title: '',
    });
    const onClickSubmit = () => {
        dispatch(OFFBOARDINGREQUIREMENTSCreateAction(createOFFBOARDINGREQUIREMENTS))
    };

    useEffect(()=> {
        if(curr_user){
            setCreateOFFBOARDINGREQUIREMENTS((prevState) => {
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
        if(OFFBOARDINGREQUIREMENTSCreatestate.status === 'succeeded'){
            window.alert('Request Successful');
            window.location.reload();
        }else if(OFFBOARDINGREQUIREMENTSCreatestate.status === 'failed'){
            window.alert(`Request Failed, ${OFFBOARDINGREQUIREMENTSCreatestate.error}`)
            setTimeout(()=> {
                dispatch(OFFBOARDINGREQUIREMENTSCreateActionFailureCleanup());
            }, 1000)
        }
    }, [OFFBOARDINGREQUIREMENTSCreatestate.status])

    return (
        <React.Fragment>
            <Typography style={{border: '2px solid rgb(25, 118, 210)', width: '100%', textAlign: 'center', padding: '6px', background: 'rgb(245,247,248)', boxShadow: '4px 4px 10px rgb(200, 200, 222)'}} variant='plain' level="h6">Create and add an "Offboarding Requirement" checklist</Typography>
            <Typography className="italic p-8 flex justify-center text-center items-center" >Newly added requirements will reflect to the future "pending" requirements only</Typography>
            
            <div className='flex flex-col gap-6 overflow-auto w-3/4'>
                    <div className='flex flex-col gap-6 pt-4'>
                        <EmployeeAutoComplete createOFFBOARDINGREQUIREMENTS={createOFFBOARDINGREQUIREMENTS} setCreateOFFBOARDINGREQUIREMENTS={setCreateOFFBOARDINGREQUIREMENTS}/>              
                        <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='Offboarding Requirement Title:'
                            aria-required  
                            variant='outlined' 
                            type="text"
                            value={createOFFBOARDINGREQUIREMENTS?.offboarding_title}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = event.target.value
                                setCreateOFFBOARDINGREQUIREMENTS((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            offboarding_title: value
                                        }
                                    )
                                })
                            }}
                        />
                    </div>
                <div className='flex justify-center mt-6' container-name='leave_buttons_container'>
                    <div className='flex justify-between' style={{width:'100%'}} container-name='leave_buttons'>
                        <Button variant='contained' onClick={onClickSubmit}>Add Offboarding Requirement</Button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default EAOFFBOARDINGREQUIREMENTSCreate;

