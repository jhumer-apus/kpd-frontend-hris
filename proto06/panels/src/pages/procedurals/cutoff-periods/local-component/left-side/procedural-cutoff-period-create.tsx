import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { Button } from '@mui/material';
import {TextField} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import CUTOFFPERIODDateCreate from './inner-ui-components/cutoff-period-date-field';
import { Typography } from '@mui/joy';
import { CUTOFFPERIODCreateInterface } from '@/types/types-pages';
import { CUTOFFPERIODCreateAction, CUTOFFPERIODCreateActionFailureCleanup } from '@/store/actions/procedurals';
import CUTOFFPERIODCreditDateCreate from './inner-ui-components/cutoff-period-credit-date-field';

interface CreateCUTOFFPERIODModalInterface {
    setOpen?: Dispatch<SetStateAction<boolean>>;
}

function ProceduralCUTOFFPERIODCreate(props: CreateCUTOFFPERIODModalInterface) {

    const dispatch = useDispatch();
    const CUTOFFPERIODCreatestate = useSelector((state: RootState)=> state.procedurals.CUTOFFPERIODCreate);
    const [createCUTOFFPERIOD, setCreateCUTOFFPERIOD] = useState<CUTOFFPERIODCreateInterface>({
        co_name: null,
        co_description: null,
        co_date_from: null,
        co_date_to: null,
        reg_days_total: null,
        credit_date: null,
        payroll_group_code: null,
        division_code: null, 
    });
    const onClickSubmit = () => {
        dispatch(CUTOFFPERIODCreateAction(createCUTOFFPERIOD))
    };
    useEffect(()=>{
        if(CUTOFFPERIODCreatestate.status === 'succeeded'){
            window.alert('Request Successful');
            window.location.reload();
        }else if(CUTOFFPERIODCreatestate.status === 'failed'){
            window.alert(`Request Failed, ${CUTOFFPERIODCreatestate.error}`)
            setTimeout(()=> {
                dispatch(CUTOFFPERIODCreateActionFailureCleanup());
            }, 1000)
        }
    }, [CUTOFFPERIODCreatestate.status])

    return (
        <React.Fragment>
            <Typography style={{border: '2px solid rgb(25, 118, 210)', width: '100%', textAlign: 'center', padding: '6px', background: 'rgb(245,247,248)', boxShadow: '4px 4px 10px rgb(200, 200, 222)'}} variant='plain'>Create a Cutoff Period Data</Typography>
            <div className='flex flex-col gap-6 overflow-auto relative'>
                <div className='flex gap-6 pt-4'>
                    <div className='flex flex-col gap-6'>
                        <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='Total Regular Days (Non-Holiday):'  
                            variant='outlined' 
                            type="number"
                            value={createCUTOFFPERIOD?.reg_days_total}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = parseInt(event.target.value)
                                setCreateCUTOFFPERIOD((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            reg_days_total: value
                                        }
                                    )
                                })
                            }}
                        />
                        <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='Cutoff Name(Max 25 char)'  
                            variant='outlined' 
                            // type="number"
                            value={`${createCUTOFFPERIOD?.co_name ?? ''}`}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = event.target.value
                                setCreateCUTOFFPERIOD((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            co_name: value
                                        }
                                    )
                                })
                            }}
                        />
                        <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='Division Group Code:'  
                            variant='outlined' 
                            type="number"
                            value={createCUTOFFPERIOD?.division_code}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = parseInt(event.target.value)
                                setCreateCUTOFFPERIOD((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            division_code: value
                                        }
                                    )
                                })
                            }}
                        />
                        <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='Description: (Max 100 char)'  
                            variant='outlined' 
                            multiline rows={5}
                            value={`${createCUTOFFPERIOD?.co_description ?? ''}`}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = event.target.value
                                setCreateCUTOFFPERIOD((prevState)=> {
                                    return(
                                        {
                                            ...prevState,
                                            co_description: value
                                        }
                                    )
                                })
                            }} 
                        />
                    </div>
                    <div className='flex flex-col gap-6'>
                        <CUTOFFPERIODDateCreate createCUTOFFPERIOD={createCUTOFFPERIOD} setCreateCUTOFFPERIOD={setCreateCUTOFFPERIOD}/>
                        <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='Payroll Group Code:'  
                            variant='outlined' 
                            type="number"
                            value={createCUTOFFPERIOD?.payroll_group_code}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = parseInt(event.target.value)
                                setCreateCUTOFFPERIOD((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            payroll_group_code: value
                                        }
                                    )
                                })
                            }}
                        />
                        <CUTOFFPERIODCreditDateCreate createCUTOFFPERIOD={createCUTOFFPERIOD} setCreateCUTOFFPERIOD={setCreateCUTOFFPERIOD}/>
                    </div>
                </div>
                <div className='flex justify-center mt-6' container-name='leave_buttons_container'>
                    <div className='flex justify-between' style={{width:'100%'}} container-name='leave_buttons'>
                        <Button variant='contained' onClick={onClickSubmit}>Create CUTOFF PERIOD</Button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default ProceduralCUTOFFPERIODCreate;

