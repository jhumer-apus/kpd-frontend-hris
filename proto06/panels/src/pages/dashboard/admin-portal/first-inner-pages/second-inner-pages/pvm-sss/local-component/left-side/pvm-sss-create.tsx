import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { Button } from '@mui/material';
import {TextField} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import EmployeeAutoComplete from './inner-ui-components/employee-autocomplete';
import { Typography } from '@mui/joy';
import { SSSCreateInterface } from '@/types/types-payroll-variables';
import { SSSCreateAction, SSSCreateActionFailureCleanup } from '@/store/actions/payroll-variables';
import DeductionsSSSCreateModal from './local-components/main-modals/pvm-sss-create-modal-left';



interface CreateSSSModalInterface {
    setOpen?: Dispatch<SetStateAction<boolean>>;
}

function PVMSSSCreate(props: CreateSSSModalInterface) {
    const [createSSSOpenModal, setCreateSSSOpenModal] = useState<boolean>(false);
    const dispatch = useDispatch();
    const curr_user = useSelector((state: RootState)=> state.auth.employee_detail?.emp_no);
    const SSSCreatestate = useSelector((state: RootState)=> state.payrollVariables.SSSCreate);
    const [createSSS, setCreateSSS] = useState<SSSCreateInterface>({
        sss_no: NaN,
        sss_contribution_month: NaN,
        sss_with_cashloan_amount: null,
        sss_rem_cashloan_amount: null,
        sss_with_calloan_amount: null,
        sss_rem_calloan_amount: null,
        emp_no: NaN,
        added_by: NaN,
    });
    const onClickSubmit = () => {
        dispatch(SSSCreateAction(createSSS))
    };

    useEffect(()=> {
        if(curr_user){
            setCreateSSS((prevState) => {
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
        if(SSSCreatestate.status === 'succeeded'){
            window.alert('Request Successful');
            window.location.reload();
        }else if(SSSCreatestate.status === 'failed'){
            window.alert(`Request Failed, ${SSSCreatestate.error}`)
            setTimeout(()=> {
                dispatch(SSSCreateActionFailureCleanup());
            }, 1000)
        }
    }, [SSSCreatestate.status])

    return (
        <React.Fragment>
            <Typography style={{border: '2px solid rgb(25, 118, 210)', width: '100%', textAlign: 'center', padding: '6px', background: 'rgb(245,247,248)', boxShadow: '4px 4px 10px rgb(200, 200, 222)'}} variant='plain' level="h6">Create an 'SSS' Data</Typography>
            <div className='flex flex-col gap-6 overflow-auto w-3/4'>
                    <div className='flex flex-col gap-6 pt-4'>
                        <EmployeeAutoComplete createSSS={createSSS} setCreateSSS={setCreateSSS}/>
                    </div>
                    <div className='flex flex-col gap-6'>
                        <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='SSS Number: (E1/ID)'
                            placeholder='Input 10 digit number'
                            aria-required  
                            variant='outlined' 
                            type="number"
                            value={createSSS?.sss_no}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = parseInt(event.target.value)
                                setCreateSSS((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            sss_no: value
                                        }
                                    )
                                })
                            }}
                        />
                        <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='Contribution Monthly (Amount)'
                            aria-required  
                            variant='outlined' 
                            type="number"
                            value={createSSS?.sss_contribution_month}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = parseInt(event.target.value)
                                setCreateSSS((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            sss_contribution_month: value
                                        }
                                    )
                                })
                            }}
                        />
                        <DeductionsSSSCreateModal setCreateSSSDetailsData={setCreateSSS} createSSSDetailsData={createSSS} createSSSOpenModal={createSSSOpenModal} setCreateSSSOpenModal={setCreateSSSOpenModal}/>
                    </div>
                <div className='flex justify-center mt-6' container-name='leave_buttons_container'>
                    <div className='flex justify-between' style={{width:'100%'}} container-name='leave_buttons'>
                        <Button variant='contained' onClick={onClickSubmit}>Create SSS</Button>
                        <Button variant='outlined' color='warning' onClick={()=> setCreateSSSOpenModal(true)}>Apply Monthly Loan Deduction</Button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default PVMSSSCreate;

