import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { Button } from '@mui/material';
import {TextField} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import EmployeeAutoComplete from './inner-ui-components/employee-autocomplete';
import { Typography } from '@mui/joy';
import { BONUSENTRYCreateInterface } from '@/types/types-payroll-eoy';
import { BONUSENTRYCreateAction, BONUSENTRYCreateActionFailureCleanup } from '@/store/actions/payroll-eoy';
import CutoffAutoComplete from './inner-ui-components/cutoff-code-autocomplete';
import BonusListAutoComplete from './inner-ui-components/bonus-type-autocomplete';

interface CreateBONUSENTRYModalInterface {
    setOpen?: Dispatch<SetStateAction<boolean>>;
}

function EOYBONUSENTRYCreate(props: CreateBONUSENTRYModalInterface) {

    const dispatch = useDispatch();
    const curr_user = useSelector((state: RootState)=> state.auth.employee_detail?.emp_no);
    const BONUSENTRYCreatestate = useSelector((state: RootState)=> state.payrollEOY.BONUSENTRYCreate);
    const [createBONUSENTRY, setCreateBONUSENTRY] = useState<BONUSENTRYCreateInterface>({
        bonus_code: NaN,
        emp_no: NaN,
        cutoff_code: NaN,
    });
    const onClickSubmit = () => {
        dispatch(BONUSENTRYCreateAction(createBONUSENTRY))
    };

    useEffect(()=> {
        if(curr_user){
            setCreateBONUSENTRY((prevState) => {
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
        if(BONUSENTRYCreatestate.status === 'succeeded'){
            window.alert('Request Successful');
            window.location.reload();
        }else if(BONUSENTRYCreatestate.status === 'failed'){
            window.alert(`Request Failed, ${BONUSENTRYCreatestate.error}`)
            setTimeout(()=> {
                dispatch(BONUSENTRYCreateActionFailureCleanup());
            }, 1000)
        }
    }, [BONUSENTRYCreatestate.status])

    return (
        <React.Fragment>
            <Typography style={{border: '2px solid rgb(25, 118, 210)', width: '100%', textAlign: 'center', padding: '6px', background: 'rgb(245,247,248)', boxShadow: '4px 4px 10px rgb(200, 200, 222)'}} variant='plain' level="h6">Create a Bonus Entry Data</Typography>
            <div className='flex flex-col gap-6 overflow-auto w-3/4'>
                    <div className='flex flex-col gap-6 pt-4'>
                        <EmployeeAutoComplete createBONUSENTRY={createBONUSENTRY} setCreateBONUSENTRY={setCreateBONUSENTRY}/>
                    </div>
                    <div className='flex flex-col gap-6'>
                        <CutoffAutoComplete createBONUSENTRY={createBONUSENTRY} setCreateBONUSENTRY={setCreateBONUSENTRY}/>                       
                        <BonusListAutoComplete createBONUSENTRY={createBONUSENTRY} setCreateBONUSENTRY={setCreateBONUSENTRY}/>                       
                    </div>
                <div className='flex justify-center mt-6' container-name='leave_buttons_container'>
                    <div className='flex justify-between' style={{width:'100%'}} container-name='leave_buttons'>
                        <Button variant='contained' onClick={onClickSubmit}>Create BONUSENTRY</Button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default EOYBONUSENTRYCreate;

