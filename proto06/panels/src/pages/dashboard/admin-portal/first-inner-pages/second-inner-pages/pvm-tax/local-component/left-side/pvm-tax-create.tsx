import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import {TextField} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, globalReducerFailed, globalReducerSuccess } from '@/store/configureStore';
import EmployeeAutoComplete from './inner-ui-components/employee-autocomplete';
import { Typography } from '@mui/joy';
import { TAXCreateInterface } from '@/types/types-payroll-variables';
import { TAXCreateAction, TAXCreateActionFailureCleanup, TAXViewAction } from '@/store/actions/payroll-variables';
import PaymentFrequencyAutoComplete from './inner-ui-components/payment-frequency-autocomplete';
import { cleanTextNumber } from '@/helpers/utils';

interface CreateTAXModalInterface {
    setOpen?: Dispatch<SetStateAction<boolean>>;
}

function PVMTAXCreate(props: CreateTAXModalInterface) {

    const dispatch = useDispatch();
    const curr_user = useSelector((state: RootState)=> state.auth.employee_detail?.emp_no);
    const TAXCreatestate = useSelector((state: RootState)=> state.payrollVariables.TAXCreate);
    const [createTAX, setCreateTAX] = useState<TAXCreateInterface>({
        tin_no: '',
        tax_form: '',
        tax_description: '',
        tax_percentage: NaN,
        payment_frequency: NaN,
        emp_no: NaN,
        added_by: NaN,
    });
    const onClickSubmit = () => {
        dispatch(TAXCreateAction(createTAX))
    };

    useEffect(()=> {
        if(curr_user){
            setCreateTAX((prevState) => {
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
        if(TAXCreatestate.status === `${globalReducerSuccess}`){
            window.alert('Request Successful');
            // window.location.reload();
            dispatch(TAXViewAction());
            setTimeout(()=> {
                dispatch(TAXCreateActionFailureCleanup());
            }, 200)
        }else if(TAXCreatestate.status === `${globalReducerFailed}`){
            window.alert(`Request Failed, ${TAXCreatestate.error}`)
            setTimeout(()=> {
                dispatch(TAXCreateActionFailureCleanup());
            }, 200)
        }
    }, [TAXCreatestate.status])

    return (
        <React.Fragment>
            <Typography style={{border: '2px solid rgb(25, 118, 210)', width: '100%', textAlign: 'center', padding: '6px', background: 'rgb(245,247,248)', boxShadow: '4px 4px 10px rgb(200, 200, 222)'}} variant='plain' level="h6">Create a 'Tax/TIN' Data</Typography>
            <div className='flex flex-col gap-6 overflow-auto w-3/4'>
                    <div className='flex flex-col gap-6 pt-4'>
                        <EmployeeAutoComplete createTAX={createTAX} setCreateTAX={setCreateTAX}/>
                    </div>
                    <div className='flex flex-col gap-6'>
                        <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='TIN Number'
                            placeholder='Input 12 Digit number'
                            aria-required  
                            variant='outlined' 
                            value={createTAX?.tin_no}
                            inputProps={{
                                maxLength:12,
                                minLength:9
                            }}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = cleanTextNumber(event.target.value)
                                setCreateTAX((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            tin_no: `${value}`
                                        }
                                    )
                                })
                            }}
                        />
                        <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='Tax Form'
                            aria-required  
                            variant='outlined' 
                            type="text"
                            value={createTAX?.tax_form}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = event.target.value
                                setCreateTAX((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            tax_form: value
                                        }
                                    )
                                })
                            }}
                        />
                        <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='Tax Description'
                            aria-required  
                            variant='outlined' 
                            type="text"
                            value={createTAX?.tax_description}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = event.target.value
                                setCreateTAX((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            tax_description: value
                                        }
                                    )
                                })
                            }}
                        />
                        <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='Tax Percentage (number only, no sign %)'
                            aria-required  
                            variant='outlined' 
                            type="number"
                            value={createTAX?.tax_percentage}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = parseFloat(event.target.value)
                                setCreateTAX((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            tax_percentage: value
                                        }
                                    )
                                })
                            }}
                        />
                        <FormControl className='w-full'>
                          <InputLabel id="payment_frequency_label">Payment Frequency:</InputLabel>
                          <Select
                            labelId="payment_frequency_label"
                            id="payment_frequency"
                            onChange={(e:any) => setCreateTAX(curr => ({
                              ...curr,
                              payment_frequency: e.target.value
                            }))}
                            label="Payment Frequency:"
                            placeholder="Payment Frequency"
                            name="payment_frequency"
                            variant="outlined"
                            value={createTAX.payment_frequency}
                            required
                          >
                            <MenuItem value={1}>Monthly</MenuItem>
                            <MenuItem value={2}>Semi-Monthly</MenuItem>
                            <MenuItem value={3}>Project-Based</MenuItem>
                            <MenuItem value={4}>Weekly</MenuItem>
                          </Select>
                        </FormControl>
                        {/* <PaymentFrequencyAutoComplete createTAX={createTAX} setCreateTAX={setCreateTAX}/> */}
                    </div>
                <div className='flex justify-center mt-6' container-name='leave_buttons_container'>
                    <div className='flex justify-between' style={{width:'100%'}} container-name='leave_buttons'>
                        <Button variant='contained' onClick={onClickSubmit}>Create TAX</Button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default PVMTAXCreate;

