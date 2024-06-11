import { useState, Fragment, Dispatch, SetStateAction } from 'react';
import { PAGIBIGCreateInterface } from '@/types/types-payroll-variables';
import {TextField} from '@mui/material';
import { cleanTextNumber } from '@/helpers/utils';

interface PAGIBIGModalUIInterface {
    createPAGIBIGDetailsData: PAGIBIGCreateInterface;
    setCreatePAGIBIGDetailsData: Dispatch<SetStateAction<PAGIBIGCreateInterface>>;
}

function PAGIBIGModalUI(props: PAGIBIGModalUIInterface) {
    const { setCreatePAGIBIGDetailsData, createPAGIBIGDetailsData } = props;

    const handlePagibigDetails = (e: React.ChangeEvent<HTMLInputElement>) => {

        const value = cleanTextNumber(e.target.value)
        
        setCreatePAGIBIGDetailsData((prevState)=> {
            return (
                {
                    ...prevState,
                    [e.target.name]: Number(value)
                }
            )
        })
    }

    return (
        <Fragment>
            <div className='flex flex-col gap-6 mt-6 w-full items-center align-center justify-center'>
                <TextField 
                    sx={{width: '90%'}} 
                    label='Deduction of Pagibig MP2 (Total Per Month):'
                    variant='outlined'
                    name="pagibig_mp2_deduction_amount"
                    inputProps={{
                        type:"text",
                        pattern: "\\d*"
                    }}
                    value={createPAGIBIGDetailsData?.pagibig_mp2_deduction_amount}
                    onChange={handlePagibigDetails}
                />
                <TextField 
                    sx={{width: '90%'}} 
                    label='Deduction of Pagibig Cash Loan (Total Per Month):'
                    variant='outlined'
                    name="pagibig_with_cloan_amount"
                    inputProps={{
                        type:"text",
                        pattern: "\\d*"
                    }}
                    value={createPAGIBIGDetailsData?.pagibig_with_cloan_amount}
                    onChange={handlePagibigDetails}
                />
                <TextField 
                    sx={{width: '90%'}} 
                    label='Total Remaining Pagibig Cash Loan (If Any):'
                    variant='outlined'
                    name="pagibig_rem_cloan_amount"
                    inputProps={{
                        type:"text",
                        pattern: "\\d*"
                    }}
                    value={createPAGIBIGDetailsData?.pagibig_rem_cloan_amount}
                    onChange={handlePagibigDetails}
                />
                <TextField 
                    sx={{width: '90%'}} 
                    label='Deduction of Pagibig Housing Loan (Total Per Month):'
                    variant='outlined'
                    name="pagibig_with_hloan_amount"
                    inputProps={{
                        type:"text",
                        pattern: "\\d*"
                    }}
                    value={createPAGIBIGDetailsData?.pagibig_with_hloan_amount}
                    onChange={handlePagibigDetails}
                />
                <TextField 
                    sx={{width: '90%'}} 
                    label='Total Remaining Pagibig Housing Loan (If Any):'
                    variant='outlined' 
                    name="pagibig_rem_hloan_amount"
                    inputProps={{
                        type:"text",
                        pattern: "\\d*"
                    }}
                    value={createPAGIBIGDetailsData?.pagibig_rem_hloan_amount}
                    onChange={handlePagibigDetails}
                />
                <TextField 
                    sx={{width: '90%'}} 
                    label='Deduction of Pagibig Calamity Loan (Total Per Month):'
                    variant='outlined' 
                    name="pagibig_with_calloan_amount"
                    inputProps={{
                        type:"text",
                        pattern: "\\d*"
                    }}
                    value={createPAGIBIGDetailsData?.pagibig_with_calloan_amount}
                    onChange={handlePagibigDetails}
                />
                <TextField 
                    sx={{width: '90%'}} 
                    label='Total Remaining Pagibig Calamity Loan (If Any):'
                    variant='outlined'
                    name="pagibig_rem_calloan_amount"
                    inputProps={{
                        type:"text",
                        pattern: "\\d*"
                    }}
                    value={createPAGIBIGDetailsData?.pagibig_rem_calloan_amount}
                    onChange={handlePagibigDetails}
                />
            </div>
          
        </Fragment>
    );
}

export default PAGIBIGModalUI;