import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { Button } from '@mui/material';
import {TextField} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import EmployeeAutoComplete from './inner-ui-components/employee-autocomplete';
import DateFromToEMPSEMINARSCreate from './inner-ui-components/date-from-to-field';
import { Typography } from '@mui/joy';
// import { EMPSEMINARSCreateInterface } from '@/types/types-pages';
import { EMPSEMINARSCreateInterface } from '@/types/types-employee-and-applicants';
import { EMPSEMINARSCreateAction, EMPSEMINARSCreateActionFailureCleanup } from '@/store/actions/employee-and-applicants';

interface CreateEMPSEMINARSModalInterface {
    setOpen?: Dispatch<SetStateAction<boolean>>;
}

function EMPSEMINARSCreate(props: CreateEMPSEMINARSModalInterface) {
    const curr_user = useSelector((state: RootState) => state.auth.employee_detail?.emp_no)
    const dispatch = useDispatch();
    const EMPSEMINARSCreatestate = useSelector((state: RootState)=> state.employeeAndApplicants.EMPSEMINARSCreate);
    const [createEMPSEMINARS, setCreateEMPSEMINARS] = useState<EMPSEMINARSCreateInterface>({
        subject: '',
        date_accomplished: null,
        emp_no: NaN,
        added_by: NaN,
        category: '',
    });
    useEffect(()=> {
        if(curr_user){
            setCreateEMPSEMINARS((prevState)=> {
                return({
                    ...prevState,
                    added_by: curr_user,
                })
            })
        }
    }, [curr_user])
    const onClickSubmit = () => {
        dispatch(EMPSEMINARSCreateAction(createEMPSEMINARS))
    };
    useEffect(()=>{
        if(EMPSEMINARSCreatestate.status === 'succeeded'){
            window.alert('Request Successful');
            window.location.reload();
        }else if(EMPSEMINARSCreatestate.status === 'failed'){
            window.alert(`Request Failed, ${EMPSEMINARSCreatestate.error}`)
            setTimeout(()=> {
                dispatch(EMPSEMINARSCreateActionFailureCleanup());
            }, 1000)
        }
    }, [EMPSEMINARSCreatestate.status])

    return (
        <React.Fragment>
            <Typography style={{border: '2px solid rgb(25, 118, 210)', width: '100%', textAlign: 'center', padding: '6px', background: 'rgb(245,247,248)', boxShadow: '4px 4px 10px rgb(200, 200, 222)'}} variant='plain'>Create a Training / Seminar History for an Individual Data</Typography>
            <div className='flex flex-col gap-6 overflow-auto relative'>
                <div className='flex gap-6 pt-4'>
                    <div className='flex flex-col gap-6'>
                        <EmployeeAutoComplete createEMPSEMINARS={createEMPSEMINARS} setCreateEMPSEMINARS={setCreateEMPSEMINARS}/>
                        <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='Subject Title:'  
                            variant='outlined' 
                            multiline rows={4}
                            value={createEMPSEMINARS?.subject}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                // event.target.value
                                setCreateEMPSEMINARS((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            subject: event.target.value
                                        }
                                    )
                                })
                            }}
                            
                        />
                    </div>
                    <div className='flex flex-col gap-6'>
                        <DateFromToEMPSEMINARSCreate createEMPSEMINARS={createEMPSEMINARS} setCreateEMPSEMINARS={setCreateEMPSEMINARS}/>
                        <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='Training or Seminar:'
                            placeholder='Declare whether a "Training" or a "Seminar (Case Sensitive)"'  
                            variant='outlined' 
                            multiline rows={4}
                            value={createEMPSEMINARS?.category}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                // event.target.value
                                setCreateEMPSEMINARS((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            category: event.target.value
                                        }
                                    )
                                })
                            }}
                            
                        />
                    </div>
                </div>
                <div className='flex justify-center mt-6' container-name='ot_buttons_container'>
                    <div className='flex justify-between' style={{width:'100%'}} container-name='ot_buttons'>
                        <Button variant='contained' onClick={onClickSubmit}>Create Training / Seminar</Button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default EMPSEMINARSCreate;

