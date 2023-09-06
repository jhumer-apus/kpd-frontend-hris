import { useState, Fragment, Dispatch, SetStateAction } from 'react';
import { SSSCreateInterface } from '@/types/types-payroll-variables';
import {TextField} from '@mui/material';

interface SSSModalUIInterface {
    createSSSDetailsData: SSSCreateInterface;
    setCreateSSSDetailsData: Dispatch<SetStateAction<SSSCreateInterface>>;
}

function SSSModalUI(props: SSSModalUIInterface) {
    const { setCreateSSSDetailsData, createSSSDetailsData } = props;

    return (
        <Fragment>
            <div className='flex flex-col gap-6 mt-6 w-full items-center align-center justify-center'>
                <TextField 
                    sx={{width: '90%'}} 
                    label='Deduction of SSS Cash Loan (Total Per Month):'
                    variant='outlined' 
                    type="number"
                    value={createSSSDetailsData?.sss_with_cashloan_amount}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        const value = parseInt(event.target.value)
                        setCreateSSSDetailsData((prevState)=> {
                            return (
                                {
                                    ...prevState,
                                    sss_with_cashloan_amount: value
                                }
                            )
                        })
                    }}
                />
                <TextField 
                    sx={{width: '90%'}} 
                    label='Total Remaining SSS Cash Loan (If Any):'
                    variant='outlined' 
                    type="number"
                    value={createSSSDetailsData?.sss_rem_cashloan_amount}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        const value = parseInt(event.target.value)
                        setCreateSSSDetailsData((prevState)=> {
                            return (
                                {
                                    ...prevState,
                                    sss_rem_cashloan_amount: value
                                }
                            )
                        })
                    }}
                />
                <TextField 
                    sx={{width: '90%'}} 
                    label='Deduction of SSS Calamity Loan (Total Per Month):'
                    variant='outlined' 
                    type="number"
                    value={createSSSDetailsData?.sss_with_calloan_amount}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        const value = parseInt(event.target.value)
                        setCreateSSSDetailsData((prevState)=> {
                            return (
                                {
                                    ...prevState,
                                    sss_with_calloan_amount: value
                                }
                            )
                        })
                    }}
                />
                <TextField 
                    sx={{width: '90%'}} 
                    label='Total Remaining SSS Calamity Loan (If Any):'
                    variant='outlined' 
                    type="number"
                    value={createSSSDetailsData?.sss_rem_calloan_amount}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        const value = parseInt(event.target.value)
                        setCreateSSSDetailsData((prevState)=> {
                            return (
                                {
                                    ...prevState,
                                    sss_rem_calloan_amount: value
                                }
                            )
                        })
                    }}
                />
            </div>
          
        </Fragment>
    );
}

export default SSSModalUI;