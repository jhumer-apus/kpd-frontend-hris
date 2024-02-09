import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { Typography } from '@mui/joy';
import { BONUSLISTCreateInterface } from '@/types/types-payroll-eoy';
import { BONUSLISTCreateAction, BONUSLISTCreateActionFailureCleanup } from '@/store/actions/payroll-eoy';


interface CreateBONUSLISTModalInterface {
    setOpen?: Dispatch<SetStateAction<boolean>>;
}

function EOYBONUSLISTCreate(props: CreateBONUSLISTModalInterface) {
    const dispatch = useDispatch();
    const curr_user = useSelector((state: RootState)=> state.auth.employee_detail?.emp_no);
    const BONUSLISTCreatestate = useSelector((state: RootState)=> state.payrollEOY.BONUSLISTCreate);
    const [createBONUSLIST, setCreateBONUSLIST] = useState<BONUSLISTCreateInterface>({
        name: '',
        description: '',
        amount: NaN,
    });
    const onClickSubmit = () => {
        dispatch(BONUSLISTCreateAction(createBONUSLIST))
    };

    useEffect(()=> {
        if(curr_user){
            setCreateBONUSLIST((prevState) => {
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
        if(BONUSLISTCreatestate.status === 'succeeded'){
            window.alert('Request Successful');
            window.location.reload();
        }else if(BONUSLISTCreatestate.status === 'failed'){
            window.alert(`Request Failed, ${BONUSLISTCreatestate.error}`)
            setTimeout(()=> {
                dispatch(BONUSLISTCreateActionFailureCleanup());
            }, 1000)
        }
    }, [BONUSLISTCreatestate.status])

    return (
        <React.Fragment>
            <Typography style={{border: '2px solid rgb(25, 118, 210)', width: '100%', textAlign: 'center', padding: '6px', background: 'rgb(245,247,248)', boxShadow: '4px 4px 10px rgb(200, 200, 222)'}} variant='plain' level="h6">Create a Bonus List Data</Typography>
            <div className='flex flex-col gap-6 overflow-auto w-3/4'>
                    <div className='flex flex-col gap-6 pt-4'>
                        <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='Bonus Type Name:'
                            aria-required  
                            variant='outlined' 
                            type="text"
                            value={createBONUSLIST?.name}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = event.target.value
                                setCreateBONUSLIST((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            name: value
                                        }
                                    )
                                })
                            }}
                        />
                        <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='Description:'
                            aria-required  
                            variant='outlined' 
                            type="text"
                            value={createBONUSLIST?.description}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = event.target.value;
                                setCreateBONUSLIST((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            description: value
                                        }
                                    )
                                })
                            }}
                        />
                        <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='Amount in Php (Philippine Peso):'
                            aria-required  
                            variant='outlined' 
                            type="number"
                            value={createBONUSLIST?.amount}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = parseInt(event.target.value)
                                setCreateBONUSLIST((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            amount: value
                                        }
                                    )
                                })
                            }}
                        />
                    </div>
                <div className='flex justify-center mt-6' container-name='leave_buttons_container'>
                    <div className='flex justify-between' style={{width:'100%'}} container-name='leave_buttons'>
                        <Button variant='contained' onClick={onClickSubmit}>Create BONUSLIST</Button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default EOYBONUSLISTCreate;

