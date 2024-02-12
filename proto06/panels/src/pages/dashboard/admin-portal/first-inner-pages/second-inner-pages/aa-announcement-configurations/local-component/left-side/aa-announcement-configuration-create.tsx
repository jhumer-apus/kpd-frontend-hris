import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { Typography } from '@mui/joy';
import { ANNOUNCEMENTCreateInterface } from '@/types/types-payroll-eoy';
import { ANNOUNCEMENTCreateAction, ANNOUNCEMENTCreateActionFailureCleanup } from '@/store/actions/payroll-eoy';
import DateAssignedANNOUNCEMENTCreate from './inner-ui-components/date-fields';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import MultiRankAutoCompleteLeft from './inner-ui-components/multiple-ranks-choose-modal';
import MultiDepartmentAutoCompleteLeft from './inner-ui-components/multiple-departments-choose-modal';



interface CreateANNOUNCEMENTModalInterface {
    setOpen?: Dispatch<SetStateAction<boolean>>;
}

function AAANNOUNCEMENTCreate(props: CreateANNOUNCEMENTModalInterface) {
    const dispatch = useDispatch();
    const curr_user = useSelector((state: RootState)=> state.auth.employee_detail?.emp_no);
    const ANNOUNCEMENTCreatestate = useSelector((state: RootState)=> state.payrollEOY.ANNOUNCEMENTCreate);
    const [createANNOUNCEMENT, setCreateANNOUNCEMENT] = useState<ANNOUNCEMENTCreateInterface>({
        date_posted: null,
        expiry_date: null,
        order_by_no: null,
        message: '',
        for_departments_code: [],
        for_ranks_code: []
    });
    const [radioState, setRadioState] = useState<boolean | null>(null)

    const onClickSubmit = () => {
        dispatch(ANNOUNCEMENTCreateAction(createANNOUNCEMENT))
    };

    useEffect(()=> {
        if(curr_user){
            setCreateANNOUNCEMENT((prevState) => {
                return (
                    {
                        ...prevState,
                        emp_no: curr_user
                    }
                )
            })
        }
    }, [curr_user]) 

    useEffect(()=>{
        if(ANNOUNCEMENTCreatestate.status === 'succeeded'){
            window.alert('Request Successful');
            window.location.reload();
        }else if(ANNOUNCEMENTCreatestate.status === 'failed'){
            window.alert(`Request Failed, ${ANNOUNCEMENTCreatestate.error}`)
            setTimeout(()=> {
                dispatch(ANNOUNCEMENTCreateActionFailureCleanup());
            }, 1000)
        }
    }, [ANNOUNCEMENTCreatestate.status])

    return (
        <React.Fragment>
            <Typography style={{border: '2px solid rgb(25, 118, 210)', width: '100%', textAlign: 'center', padding: '6px', background: 'rgb(245,247,248)', boxShadow: '4px 4px 10px rgb(200, 200, 222)'}} variant='plain' level="h6">Create an Announcement Data</Typography>
            <div className='flex flex-col gap-6 overflow-auto w-3/4'>
                    <div className='flex flex-col gap-6 pt-4'>
                        <DateAssignedANNOUNCEMENTCreate createANNOUNCEMENT={createANNOUNCEMENT} setCreateANNOUNCEMENT={setCreateANNOUNCEMENT}/>
                    </div>
                    <div className='flex flex-col gap-6 pt-4'>
                        <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='Announcement Message:'
                            aria-required  
                            variant='outlined' 
                            multiline
                            rows={4}
                            type="text"
                            value={createANNOUNCEMENT?.message}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = event.target.value;
                                setCreateANNOUNCEMENT((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            message: value
                                        }
                                    )
                                })
                            }}
                        />
                        <TextField 
                            sx={{width: '100%'}} 
                            label='Display Priority (1, 2, or 3):'
                            variant='outlined' 
                            type="number"
                            value={createANNOUNCEMENT?.order_by_no}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = +(event.target.value);
                                setCreateANNOUNCEMENT((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            order_by_no: value
                                        }
                                    )
                                })
                            }}
                        />
                    </div>
                    <FormControl className='w-full justify-center items-center'>
                        <FormLabel id="target-audience-create">Target Audience</FormLabel>
                        <RadioGroup
                            className='flex w-full justify-around'
                            row
                            aria-labelledby="target-audience-create w-full"
                            name="name-target-audience-create"
                            // value={`${createANNOUNCEMENT._value_}`}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = (event.target.value=== 'true' ? [1] : []);
                                setRadioState(!(JSON.parse(event.target.value)))
                                setCreateANNOUNCEMENT((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            for_departments_code: value,
                                            for_ranks_code: value
                                        }
                                    )
                                })
                            }}
                        >
                            <FormControlLabel value="true" control={<Radio />} label="All Employees" />
                            <FormControlLabel value="false" control={<Radio />} label="Selected Employees" />
                        </RadioGroup>
                    </FormControl>

                    {radioState && <MultiRankAutoCompleteLeft createANNOUNCEMENT={createANNOUNCEMENT} setCreateANNOUNCEMENT={setCreateANNOUNCEMENT}/>}                
                    {radioState && <MultiDepartmentAutoCompleteLeft createANNOUNCEMENT={createANNOUNCEMENT} setCreateANNOUNCEMENT={setCreateANNOUNCEMENT}/>}                
                    
                    <div className='flex justify-center mt-6' container-name='leave_buttons_container'>
                        <div className='flex justify-between' style={{width:'100%'}} container-name='leave_buttons'>
                            <Button variant='contained' onClick={onClickSubmit}>Create ANNOUNCEMENT</Button>
                        </div>
                    </div>
            </div>
        </React.Fragment>
    );
}

export default AAANNOUNCEMENTCreate;

