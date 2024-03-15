import React, { useEffect, useState, Dispatch, SetStateAction, FormEvent } from 'react';
import { Button } from '@mui/material';
import {TextField} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import EmployeeAutoComplete from './inner-ui-components/employee-autocomplete';
import { Typography } from '@mui/joy';
import { USERCreateInterface } from '@/types/types-pages';
import { USERCreateAction, USERCreateActionFailureCleanup, USERViewAction } from '@/store/actions/users';
import RoleAutoComplete from './inner-ui-components/role-autocomplete';

import { beautifyJSON } from '@/helpers/utils';

// COMPONENTS
import PasswordGenerator from '@/public-components/PasswordGenerator';
import { create } from 'lodash';

interface CreateUSERModalInterface {
    setOpen?: Dispatch<SetStateAction<boolean>>;
}

function ManageUSERCreate(props: CreateUSERModalInterface) {

    const dispatch = useDispatch();
    const [isOpenPasswordGenerator, setIsOpenPasswordGenerator] = useState<boolean>(false);
    const curr_user = useSelector((state: RootState)=> state.auth.employee_detail?.emp_no);
    const USERCreatestate = useSelector((state: RootState)=> state.users.USERCreate);
    const [createUSER, setCreateUSER] = useState<USERCreateInterface>({
        username: "",
        password: "",
        role: null,
        emp_no: NaN,
        added_by: curr_user,
        is_temp: true
    });

    const onClickSubmit = (e: any) => {
        e.preventDefault();
        console.log(createUSER.role )
        if(createUSER.username && createUSER.password && createUSER.role && createUSER.emp_no) {

            dispatch(USERCreateAction(createUSER))

        } else {

            const error:any = {}

            !createUSER.emp_no && (error["Employee Number"] = "Employee Number is required!")
            !createUSER.username && (error.Username = "Username is required!")
            !createUSER.password && (error.Password = "Password is required!")
            !createUSER.role && (error.Role = "Role is required!")

            window.alert(beautifyJSON(error))
        }
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
            // window.location.reload();
            dispatch(USERViewAction());
            setTimeout(()=> {
                dispatch(USERCreateActionFailureCleanup());
            }, 200)
        }else if(USERCreatestate.status === 'failed'){
            window.alert(`Request Failed, ${USERCreatestate.error}`)
            setTimeout(()=> {
                dispatch(USERCreateActionFailureCleanup());
            }, 200)
        }
    }, [USERCreatestate.status])

    return (
        <React.Fragment>
            <Typography style={{border: '2px solid rgb(25, 118, 210)', width: '100%', textAlign: 'center', padding: '6px', background: 'rgb(245,247,248)', boxShadow: '4px 4px 10px rgb(200, 200, 222)'}} variant='plain'>Create an HRIS User Data</Typography>
            <form
                // className='flex flex-col gap-3 relative p-4'
                className='flex flex-col gap-3 md:w-[500px]'
            >
                    <div className='flex flex-col pt-4 w-full'>
                        <EmployeeAutoComplete createUSER={createUSER} setCreateUSER={setCreateUSER}/>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <TextField
                            required 
                            className="text-center"
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
                        {/* {isOpenPasswordGenerator && <PasswordGenerator />}
                        <Button onClick={() => setIsOpenPasswordGenerator(!isOpenPasswordGenerator)}>
                            {isOpenPasswordGenerator? 'Close Password Generator': 'Open Password Generator'}
                        </Button> */}
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
                        <Button type="submit" variant='contained' onClick={onClickSubmit}>Create USER</Button>
                    </div>
                </div>
            </form>
        </React.Fragment>
    );
}

export default ManageUSERCreate;

