import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { Button } from '@mui/material';
import {TextField} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import EmployeeAutoComplete from './inner-ui-components/employee-autocomplete';
import ExpiryDateLEAVECREDITCreate from './inner-ui-components/expiry-date-field';
import { Typography } from '@mui/joy';
import { LEAVECREDITCreateInterface } from '@/types/types-pages';
import { LEAVECREDITCreateAction, LEAVECREDITCreateActionFailureCleanup } from '@/store/actions/procedurals';
import LEAVETYPEFetchAutoCompleteOnLEAVECREDITPage from './inner-ui-components/leave-type-autocomplete';

interface CreateLEAVECREDITModalInterface {
    setOpen?: Dispatch<SetStateAction<boolean>>;
}

function ProceduralLEAVECREDITCreate(props: CreateLEAVECREDITModalInterface) {

    const dispatch = useDispatch();
    const LEAVECREDITCreatestate = useSelector((state: RootState)=> state.procedurals.LEAVECREDITCreate);
    const [createLEAVECREDIT, setCreateLEAVECREDIT] = useState<LEAVECREDITCreateInterface>({
        allowed_days: null,
        expiry: null,
        emp_no: null,
        leave_type_code: null,
    });
    const onClickSubmit = () => {
        dispatch(LEAVECREDITCreateAction(createLEAVECREDIT))
    };
    useEffect(()=>{
        if(LEAVECREDITCreatestate.status === 'succeeded'){
            window.alert('Request Successful');
            window.location.reload();
        }else if(LEAVECREDITCreatestate.status === 'failed'){
            window.alert(`Request Failed, ${LEAVECREDITCreatestate.error}`)
            setTimeout(()=> {
                dispatch(LEAVECREDITCreateActionFailureCleanup());
            }, 1000)
        }
    }, [LEAVECREDITCreatestate.status])

    return (
        <React.Fragment>
            <Typography style={{border: '2px solid rgb(25, 118, 210)', width: '100%', textAlign: 'center', padding: '6px', background: 'rgb(245,247,248)', boxShadow: '4px 4px 10px rgb(200, 200, 222)'}} variant='plain'>Create a Leave Credit Data</Typography>
            <div className='flex flex-col gap-6 overflow-auto relative'>
                <div className='flex gap-6 pt-4'>
                    <div className='flex flex-col gap-6'>
                        <EmployeeAutoComplete createLEAVECREDIT={createLEAVECREDIT} setCreateLEAVECREDIT={setCreateLEAVECREDIT}/>
                        <LEAVETYPEFetchAutoCompleteOnLEAVECREDITPage createLEAVECREDIT={createLEAVECREDIT} setCreateLEAVECREDIT={setCreateLEAVECREDIT}/>
                    </div>
                    <div className='flex flex-col gap-6'>
                        <ExpiryDateLEAVECREDITCreate createLEAVECREDIT={createLEAVECREDIT} setCreateLEAVECREDIT={setCreateLEAVECREDIT}/>
                        <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='Allowed Use Days:'  
                            variant='outlined' 
                            type="number"
                            value={createLEAVECREDIT?.allowed_days}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = parseInt(event.target.value)
                                setCreateLEAVECREDIT((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            allowed_days: value
                                        }
                                    )
                                })
                            }}
                            
                        />
                    </div>
                </div>
                <div className='flex justify-center mt-6' container-name='leave_buttons_container'>
                    <div className='flex justify-between' style={{width:'100%'}} container-name='leave_buttons'>
                        <Button variant='contained' onClick={onClickSubmit}>Create LEAVE CREDIT</Button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default ProceduralLEAVECREDITCreate;

