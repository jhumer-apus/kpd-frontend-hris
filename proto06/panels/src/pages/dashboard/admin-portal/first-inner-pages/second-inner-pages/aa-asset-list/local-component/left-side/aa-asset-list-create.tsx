import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { Typography } from '@mui/joy';
import { ASSETLISTCreateInterface } from '@/types/types-payroll-eoy';
import { ASSETLISTCreateAction, ASSETLISTCreateActionFailureCleanup } from '@/store/actions/payroll-eoy';


interface CreateASSETLISTModalInterface {
    setOpen?: Dispatch<SetStateAction<boolean>>;
}

function AAASSETLISTCreate(props: CreateASSETLISTModalInterface) {
    const dispatch = useDispatch();
    const curr_user = useSelector((state: RootState)=> state.auth.employee_detail?.emp_no);
    const ASSETLISTCreatestate = useSelector((state: RootState)=> state.payrollEOY.ASSETLISTCreate);
    const [createASSETLIST, setCreateASSETLIST] = useState<ASSETLISTCreateInterface>({
        asset_name: '',
        model: '',
        year: NaN,
        batch_no: '',
        description: '',
        remarks: '',
        quantity: NaN,
    });
    const onClickSubmit = () => {
        dispatch(ASSETLISTCreateAction(createASSETLIST))
    };

    useEffect(()=> {
        if(curr_user){
            setCreateASSETLIST((prevState) => {
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
        if(ASSETLISTCreatestate.status === 'succeeded'){
            window.alert('Request Successful');
            window.location.reload();
        }else if(ASSETLISTCreatestate.status === 'failed'){
            window.alert(`Request Failed, ${ASSETLISTCreatestate.error}`)
            setTimeout(()=> {
                dispatch(ASSETLISTCreateActionFailureCleanup());
            }, 1000)
        }
    }, [ASSETLISTCreatestate.status])

    return (
        <React.Fragment>
            <Typography style={{border: '2px solid rgb(25, 118, 210)', width: '100%', textAlign: 'center', padding: '6px', background: 'rgb(245,247,248)', boxShadow: '4px 4px 10px rgb(200, 200, 222)'}} variant='plain' level="h6">Create an Asset List Data</Typography>
            <div className='flex flex-col gap-6 overflow-auto w-3/4'>
                    <div className='flex flex-col gap-6 pt-4'>
                        <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='Asset Name:'
                            aria-required  
                            variant='outlined' 
                            type="text"
                            value={createASSETLIST?.asset_name}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = event.target.value
                                setCreateASSETLIST((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            asset_name: value
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
                            value={createASSETLIST?.description}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = event.target.value;
                                setCreateASSETLIST((prevState)=> {
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
                            label='Model: (Max 4 Chars)'
                            aria-required  
                            variant='outlined' 
                            type="text"
                            value={createASSETLIST?.model}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = event.target.value;
                                setCreateASSETLIST((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            model: value
                                        }
                                    )
                                })
                            }}
                        />
                        <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='Year:'
                            aria-required  
                            variant='outlined' 
                            type="number"
                            value={createASSETLIST?.year}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = parseInt(event.target.value)
                                setCreateASSETLIST((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            year: value
                                        }
                                    )
                                })
                            }}
                        />
                        <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='Batch no:'
                            aria-required  
                            variant='outlined' 
                            type="text"
                            value={createASSETLIST?.batch_no}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = event.target.value;
                                setCreateASSETLIST((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            batch_no: value
                                        }
                                    )
                                })
                            }}
                        />
                        <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='Remarks:'
                            aria-required  
                            variant='outlined' 
                            type="text"
                            value={createASSETLIST?.remarks}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = event.target.value;
                                setCreateASSETLIST((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            remarks: value
                                        }
                                    )
                                })
                            }}
                        />
                        <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='Quantity:'
                            aria-required  
                            variant='outlined' 
                            type="number"
                            value={createASSETLIST?.quantity}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = parseInt(event.target.value);
                                setCreateASSETLIST((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            quantity: value
                                        }
                                    )
                                })
                            }}
                        />
                    </div>
                <div className='flex justify-center mt-6' container-name='leave_buttons_container'>
                    <div className='flex justify-between' style={{width:'100%'}} container-name='leave_buttons'>
                        <Button variant='contained' onClick={onClickSubmit}>Create ASSETLIST</Button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default AAASSETLISTCreate;

