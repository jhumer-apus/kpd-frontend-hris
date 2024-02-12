import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { Button } from '@mui/material';
import {TextField} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import EmployeeAutoComplete from './inner-ui-components/employee-autocomplete';
import { Typography } from '@mui/joy';
import { DIVISIONCreateInterface } from '@/types/types-pages';
import { DIVISIONCreateAction, DIVISIONCreateActionFailureCleanup } from '@/store/actions/categories';
import BranchAutoComplete from './inner-ui-components/branch-autocomplete';

interface CreateDIVISIONModalInterface {
    setOpen?: Dispatch<SetStateAction<boolean>>;
}

function ManageDIVISIONCreate(props: CreateDIVISIONModalInterface) {

    const dispatch = useDispatch();
    const curr_user = useSelector((state: RootState)=> state.auth.employee_detail?.emp_no);
    const DIVISIONCreatestate = useSelector((state: RootState)=> state.categories.DIVISIONCreate);
    const [createDIVISION, setCreateDIVISION] = useState<DIVISIONCreateInterface>({
        div_name: "",
        div_lead: NaN,
        div_branch_code: NaN,
        added_by: NaN,
    });
    const onClickSubmit = () => {
        dispatch(DIVISIONCreateAction(createDIVISION))
    };

    useEffect(()=> {
        if(curr_user){
            setCreateDIVISION((prevState) => {
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
        if(DIVISIONCreatestate.status === 'succeeded'){
            window.alert('Request Successful');
            window.location.reload();
        }else if(DIVISIONCreatestate.status === 'failed'){
            window.alert(`Request Failed, ${DIVISIONCreatestate.error}`)
            setTimeout(()=> {
                dispatch(DIVISIONCreateActionFailureCleanup());
            }, 1000)
        }
    }, [DIVISIONCreatestate.status])

    return (
        <React.Fragment>
            <Typography style={{border: '2px solid rgb(25, 118, 210)', width: '100%', textAlign: 'center', padding: '6px', background: 'rgb(245,247,248)', boxShadow: '4px 4px 10px rgb(200, 200, 222)'}} variant='plain'>Create a Division Data</Typography>
            <div className='flex flex-col gap-3 overflow-auto relative'>
                    <div className='flex flex-col gap-3 pt-4'>
                        <EmployeeAutoComplete createDIVISION={createDIVISION} setCreateDIVISION={setCreateDIVISION}/>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='Division Name'
                            aria-required  
                            variant='outlined' 
                            type="text"
                            value={createDIVISION?.div_name}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = event.target.value
                                setCreateDIVISION((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            div_name: value
                                        }
                                    )
                                })
                            }}
                            
                        />
                        <BranchAutoComplete createDIVISION={createDIVISION} setCreateDIVISION={setCreateDIVISION}/>
                    </div>
                <div className='flex justify-center mt-6' container-name='leave_buttons_container'>
                    <div className='flex justify-between' style={{width:'100%'}} container-name='leave_buttons'>
                        <Button variant='contained' onClick={onClickSubmit}>Create DIVISION</Button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default ManageDIVISIONCreate;

