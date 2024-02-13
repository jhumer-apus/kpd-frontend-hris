import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { Button } from '@mui/material';
import {TextField} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import EmployeeAutoComplete from './inner-ui-components/employee-autocomplete';
import { Typography } from '@mui/joy';
import { BRANCHCreateInterface } from '@/types/types-pages';
import { BRANCHCreateAction, BRANCHCreateActionFailureCleanup } from '@/store/actions/categories';

interface CreateBRANCHModalInterface {
    setOpen?: Dispatch<SetStateAction<boolean>>;
}

function ManageBRANCHCreate(props: CreateBRANCHModalInterface) {

    const dispatch = useDispatch();
    const curr_user = useSelector((state: RootState)=> state.auth.employee_detail?.emp_no);
    const BRANCHCreatestate = useSelector((state: RootState)=> state.categories.BRANCHCreate);
    const [createBRANCH, setCreateBRANCH] = useState<BRANCHCreateInterface>({
        branch_name: "",
        branch_address: "",
        branch_email: "",
        branch_contact_number: "",
        branch_oic: NaN,
        added_by: NaN,
    });
    const onClickSubmit = () => {
        dispatch(BRANCHCreateAction(createBRANCH))
    };

    useEffect(()=> {
        if(curr_user){
            setCreateBRANCH((prevState) => {
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
        if(BRANCHCreatestate.status === 'succeeded'){
            window.alert('Request Successful');
            window.location.reload();
        }else if(BRANCHCreatestate.status === 'failed'){
            window.alert(`Request Failed, ${BRANCHCreatestate.error}`)
            setTimeout(()=> {
                dispatch(BRANCHCreateActionFailureCleanup());
            }, 1000)
        }
    }, [BRANCHCreatestate.status])

    return (
        <React.Fragment>
            <Typography style={{border: '2px solid rgb(25, 118, 210)', width: '100%', textAlign: 'center', padding: '6px', background: 'rgb(245,247,248)', boxShadow: '4px 4px 10px rgb(200, 200, 222)'}} variant='plain'>Create a Branch Data</Typography>
            <div className='flex flex-col gap-3 overflow-auto relative'>
                {/* <div className='flex gap-3 pt-4'> */}
                    <div className='flex flex-col gap-3 pt-4'>
                        <EmployeeAutoComplete createBRANCH={createBRANCH} setCreateBRANCH={setCreateBRANCH}/>
                        {/* <LEAVETYPEFetchAutoCompleteOnBRANCHPage createBRANCH={createBRANCH} setCreateBRANCH={setCreateBRANCH}/> */}
                    </div>
                    <div className='flex flex-col gap-3'>
                        {/* <ExpiryDateBRANCHCreate createBRANCH={createBRANCH} setCreateBRANCH={setCreateBRANCH}/> */}
                        <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='Branch Name'
                            aria-required  
                            variant='outlined' 
                            type="text"
                            value={createBRANCH?.branch_name}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = event.target.value
                                setCreateBRANCH((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            branch_name: value
                                        }
                                    )
                                })
                            }}
                            
                        />
                        <TextField
                            required 
                            aria-required
                            sx={{width: '100%'}} 
                            label='Branch Address'  
                            variant='outlined' 
                            type="text"
                            value={createBRANCH?.branch_address}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = event.target.value
                                setCreateBRANCH((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            branch_address: value
                                        }
                                    )
                                })
                            }}
                            
                        />
                        <TextField
                            required 
                            aria-required
                            sx={{width: '100%'}} 
                            label='Branch Email'  
                            placeholder='abc@gmail.com'
                            variant='outlined' 
                            type="text"
                            value={createBRANCH?.branch_email}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = event.target.value
                                setCreateBRANCH((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            branch_email: value
                                        }
                                    )
                                })
                            }}
                        />
                        <TextField
                            required 
                            aria-required
                            sx={{width: '100%'}} 
                            label='Branch Contact Number'  
                            placeholder='091234567890 or +639876543210'
                            variant='outlined' 
                            type="text"
                            value={createBRANCH?.branch_contact_number}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = event.target.value
                                setCreateBRANCH((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            branch_contact_number: value
                                        }
                                    )
                                })
                            }}
                        />
                    </div>
                {/* </div> */}
                <div className='flex justify-center mt-6' container-name='leave_buttons_container'>
                    <div className='flex justify-between' style={{width:'100%'}} container-name='leave_buttons'>
                        <Button variant='contained' onClick={onClickSubmit}>Create BRANCH</Button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default ManageBRANCHCreate;

