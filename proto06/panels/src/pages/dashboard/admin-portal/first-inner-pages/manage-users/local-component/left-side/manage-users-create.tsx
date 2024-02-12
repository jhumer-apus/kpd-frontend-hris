import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { Button } from '@mui/material';
import {TextField} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import EmployeeAutoComplete from './inner-ui-components/employee-autocomplete';
import { Typography } from '@mui/joy';
import { USERCreateInterface } from '@/types/types-pages';
import { USERCreateAction, USERCreateActionFailureCleanup } from '@/store/actions/users';
import RoleAutoComplete from './inner-ui-components/role-autocomplete';

interface CreateUSERModalInterface {
    setOpen?: Dispatch<SetStateAction<boolean>>;
}

function ManageUSERCreate(props: CreateUSERModalInterface) {

    const dispatch = useDispatch();
    const curr_user = useSelector((state: RootState)=> state.auth.employee_detail?.emp_no);
    const USERCreatestate = useSelector((state: RootState)=> state.users.USERCreate);
    const [createUSER, setCreateUSER] = useState<USERCreateInterface>({
        username: "",
        password: "",
        role: 1,
        emp_no: NaN,
        added_by: NaN,
    });
    const onClickSubmit = () => {
        dispatch(USERCreateAction(createUSER))
    };

    useEffect(()=> {
        if(curr_user){
            setCreateUSER((prevState) => {
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
        if(USERCreatestate.status === 'succeeded'){
            window.alert('Request Successful');
            window.location.reload();
        }else if(USERCreatestate.status === 'failed'){
            window.alert(`Request Failed, ${USERCreatestate.error}`)
            setTimeout(()=> {
                dispatch(USERCreateActionFailureCleanup());
            }, 1000)
        }
    }, [USERCreatestate.status])

    return (
        <React.Fragment>
            <Typography style={{border: '2px solid rgb(25, 118, 210)', width: '100%', textAlign: 'center', padding: '6px', background: 'rgb(245,247,248)', boxShadow: '4px 4px 10px rgb(200, 200, 222)'}} variant='plain'>Create an HRIS User Data</Typography>
            <div className='flex flex-col gap-3 overflow-auto relative'>
                    <div className='flex flex-col gap-3 pt-4'>
                        <EmployeeAutoComplete createUSER={createUSER} setCreateUSER={setCreateUSER}/>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='Assign Username'
                            aria-required  
                            variant='outlined' 
                            type="text"
                            value={createUSER?.username}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = event.target.value
                                setCreateUSER((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            username: value
                                        }
                                    )
                                })
                            }}
                        />
                        <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='Assign Password'
                            aria-required  
                            variant='outlined' 
                            type="text"
                            value={createUSER?.password}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = event.target.value
                                setCreateUSER((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            password: value
                                        }
                                    )
                                })
                            }}
                        />
                        <RoleAutoComplete createUSER={createUSER} setCreateUSER={setCreateUSER}/>
                    </div>
                <div className='flex justify-center mt-6' container-name='leave_buttons_container'>
                    <div className='flex justify-between' style={{width:'100%'}} container-name='leave_buttons'>
                        <Button variant='contained' onClick={onClickSubmit}>Create USER</Button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default ManageUSERCreate;

