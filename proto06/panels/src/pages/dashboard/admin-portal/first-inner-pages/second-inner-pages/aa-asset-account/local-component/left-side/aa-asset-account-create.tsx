import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { Typography } from '@mui/joy';
import { ASSETACCOUNTCreateInterface } from '@/types/types-payroll-eoy';
import { ASSETACCOUNTCreateAction, ASSETACCOUNTCreateActionFailureCleanup } from '@/store/actions/payroll-eoy';
import EmployeeAutoComplete from './inner-ui-components/employee-autocomplete';
import AssetListAutoComplete from './inner-ui-components/asset-list-autocomplete';
import DateAssignedASSETACCOUNTCreate from './inner-ui-components/date-assigned';


interface CreateASSETACCOUNTModalInterface {
    setOpen?: Dispatch<SetStateAction<boolean>>;
}

function AAASSETACCOUNTCreate(props: CreateASSETACCOUNTModalInterface) {
    const dispatch = useDispatch();
    const curr_user = useSelector((state: RootState)=> state.auth.employee_detail?.emp_no);
    const ASSETACCOUNTCreatestate = useSelector((state: RootState)=> state.payrollEOY.ASSETACCOUNTCreate);
    const [createASSETACCOUNT, setCreateASSETACCOUNT] = useState<ASSETACCOUNTCreateInterface>({
        asset_list_code: NaN,
        assigned_to: NaN,
        serial_no_internal: '',
        serial_no_manufacturer: '',
        remarks: '',
        date_assigned: null,
    });
    const onClickSubmit = () => {
        dispatch(ASSETACCOUNTCreateAction(createASSETACCOUNT))
    };

    useEffect(()=> {
        if(curr_user){
            setCreateASSETACCOUNT((prevState) => {
                return (
                    {
                        ...prevState,
                        assigned_by: curr_user
                    }
                )
            })
        }
    }, [curr_user]) 

    useEffect(()=>{
        if(ASSETACCOUNTCreatestate.status === 'succeeded'){
            window.alert('Request Successful');
            window.location.reload();
        }else if(ASSETACCOUNTCreatestate.status === 'failed'){
            window.alert(`Request Failed, ${ASSETACCOUNTCreatestate.error}`)
            setTimeout(()=> {
                dispatch(ASSETACCOUNTCreateActionFailureCleanup());
            }, 1000)
        }
    }, [ASSETACCOUNTCreatestate.status])

    return (
        <React.Fragment>
            <Typography style={{border: '2px solid rgb(25, 118, 210)', width: '100%', textAlign: 'center', padding: '6px', background: 'rgb(245,247,248)', boxShadow: '4px 4px 10px rgb(200, 200, 222)'}} variant='plain' level="h6">Create an Asset Account Data</Typography>
            <div className='flex flex-col gap-6 overflow-auto w-3/4'>
                    <div className='flex flex-col gap-6 pt-4'>
                        <DateAssignedASSETACCOUNTCreate createASSETACCOUNT={createASSETACCOUNT} setCreateASSETACCOUNT={setCreateASSETACCOUNT}/>
                    </div>
                    <div className='flex flex-col gap-6 pt-4'>
                        <EmployeeAutoComplete createASSETACCOUNT={createASSETACCOUNT} setCreateASSETACCOUNT={setCreateASSETACCOUNT}/>
                    </div>
                    <div className='flex flex-col gap-6 pt-4'>
                        <AssetListAutoComplete createASSETACCOUNT={createASSETACCOUNT} setCreateASSETACCOUNT={setCreateASSETACCOUNT}/>
                    </div>
                    <div className='flex flex-col gap-6 pt-4'>
                        <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='Assign Serial #(Internal Record):'
                            aria-required  
                            variant='outlined' 
                            type="text"
                            value={createASSETACCOUNT?.serial_no_internal}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = event.target.value
                                setCreateASSETACCOUNT((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            serial_no_internal: value
                                        }
                                    )
                                })
                            }}
                        />
                        
                        <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='Manufacturer Serial #:'
                            aria-required  
                            variant='outlined' 
                            type="text"
                            value={createASSETACCOUNT?.serial_no_manufacturer}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = event.target.value;
                                setCreateASSETACCOUNT((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            serial_no_manufacturer: value
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
                            value={createASSETACCOUNT?.remarks}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = event.target.value;
                                setCreateASSETACCOUNT((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            remarks: value
                                        }
                                    )
                                })
                            }}
                        />
                    </div>
                <div className='flex justify-center mt-6' container-name='leave_buttons_container'>
                    <div className='flex justify-between' style={{width:'100%'}} container-name='leave_buttons'>
                        <Button variant='contained' onClick={onClickSubmit}>Create ASSETACCOUNT</Button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default AAASSETACCOUNTCreate;

