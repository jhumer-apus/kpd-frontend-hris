import { useState, Fragment, Dispatch, SetStateAction } from 'react';
import { PAGIBIGCreateInterface } from '@/types/types-payroll-variables';
import {TextField} from '@mui/material';

interface PAGIBIGModalUIInterface {
    createPAGIBIGDetailsData: PAGIBIGCreateInterface;
    setCreatePAGIBIGDetailsData: Dispatch<SetStateAction<PAGIBIGCreateInterface>>;
}

function PAGIBIGModalUI(props: PAGIBIGModalUIInterface) {
    const { setCreatePAGIBIGDetailsData, createPAGIBIGDetailsData } = props;

    return (
        <Fragment>
            <div className='flex flex-col gap-6 mt-6 w-full items-center align-center justify-center'>
                <TextField 
                    sx={{width: '90%'}} 
                    label='Deduction of Pagibig Cash Loan (Total Per Month):'
                    variant='outlined' 
                    type="number"
                    value={createPAGIBIGDetailsData?.pagibig_with_cloan_amount}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        const value = parseInt(event.target.value)
                        setCreatePAGIBIGDetailsData((prevState)=> {
                            return (
                                {
                                    ...prevState,
                                    pagibig_with_cloan_amount: value
                                }
                            )
                        })
                    }}
                />
                <TextField 
                    sx={{width: '90%'}} 
                    label='Total Remaining Pagibig Cash Loan (If Any):'
                    variant='outlined' 
                    type="number"
                    value={createPAGIBIGDetailsData?.pagibig_rem_cloan_amount}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        const value = parseInt(event.target.value)
                        setCreatePAGIBIGDetailsData((prevState)=> {
                            return (
                                {
                                    ...prevState,
                                    pagibig_rem_cloan_amount: value
                                }
                            )
                        })
                    }}
                />
                <TextField 
                    sx={{width: '90%'}} 
                    label='Deduction of Pagibig Housing Loan (Total Per Month):'
                    variant='outlined' 
                    type="number"
                    value={createPAGIBIGDetailsData?.pagibig_with_hloan_amount}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        const value = parseInt(event.target.value)
                        setCreatePAGIBIGDetailsData((prevState)=> {
                            return (
                                {
                                    ...prevState,
                                    pagibig_with_hloan_amount: value
                                }
                            )
                        })
                    }}
                />
                <TextField 
                    sx={{width: '90%'}} 
                    label='Total Remaining Pagibig Housing Loan (If Any):'
                    variant='outlined' 
                    type="number"
                    value={createPAGIBIGDetailsData?.pagibig_rem_hloan_amount}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        const value = parseInt(event.target.value)
                        setCreatePAGIBIGDetailsData((prevState)=> {
                            return (
                                {
                                    ...prevState,
                                    pagibig_rem_hloan_amount: value
                                }
                            )
                        })
                    }}
                />
                <TextField 
                    sx={{width: '90%'}} 
                    label='Deduction of Pagibig Calamity Loan (Total Per Month):'
                    variant='outlined' 
                    type="number"
                    value={createPAGIBIGDetailsData?.pagibig_with_calloan_amount}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        const value = parseInt(event.target.value)
                        setCreatePAGIBIGDetailsData((prevState)=> {
                            return (
                                {
                                    ...prevState,
                                    pagibig_with_calloan_amount: value
                                }
                            )
                        })
                    }}
                />
                <TextField 
                    sx={{width: '90%'}} 
                    label='Total Remaining Pagibig Calamity Loan (If Any):'
                    variant='outlined' 
                    type="number"
                    value={createPAGIBIGDetailsData?.pagibig_rem_calloan_amount}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        const value = parseInt(event.target.value)
                        setCreatePAGIBIGDetailsData((prevState)=> {
                            return (
                                {
                                    ...prevState,
                                    pagibig_rem_calloan_amount: value
                                }
                            )
                        })
                    }}
                />
            </div>
          
        </Fragment>
    );
}

export default PAGIBIGModalUI;