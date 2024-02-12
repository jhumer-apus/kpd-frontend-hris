import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { Button } from '@mui/material';
import {TextField} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import EmployeeAutoComplete from './inner-ui-components/employee-autocomplete';
import OVERTIMETypeAutoComplete from './inner-ui-components/ot-type-autocomplete';
import DateFromToOVERTIMECreate from './inner-ui-components/date-from-to-field';
import { Typography } from '@mui/joy';
import { OVERTIMECreateInterface } from '@/types/types-pages';
import { OVERTIMECreateAction, OVERTIMECreateActionFailureCleanup } from '@/store/actions/procedurals';

interface CreateOVERTIMEModalInterface {
    setOpen?: Dispatch<SetStateAction<boolean>>;
}

function QuickAccessOVERTIMECreate(props: CreateOVERTIMEModalInterface) {

    const dispatch = useDispatch();
    const OVERTIMECreatestate = useSelector((state: RootState)=> state.procedurals.OVERTIMECreate);
    const [createOVERTIME, setCreateOVERTIME] = useState<OVERTIMECreateInterface>({
        emp_no: NaN,
        ot_type: null,
        ot_remarks: null,
        ot_date_from: null,
        ot_date_to: null,
    });
    const onClickSubmit = () => {
        dispatch(OVERTIMECreateAction(createOVERTIME))
    };
    useEffect(()=>{
        if(OVERTIMECreatestate.status === 'succeeded'){
            window.alert('Request Successful');
            window.location.reload();
        }else if(OVERTIMECreatestate.status === 'failed'){
            window.alert(`Request Failed, ${OVERTIMECreatestate.error}`)
            setTimeout(()=> {
                dispatch(OVERTIMECreateActionFailureCleanup());
            }, 1000)
        }
    }, [OVERTIMECreatestate.status])

    return (
        <React.Fragment>
            <Typography style={{border: '2px solid rgb(25, 118, 210)', width: '100%', textAlign: 'center', padding: '6px', background: 'rgb(245,247,248)', boxShadow: '4px 4px 10px rgb(200, 200, 222)'}} variant='plain'>Create an Overtime Data</Typography>
            <div className='flex flex-col gap-6 overflow-auto relative'>
                <div className='flex gap-6 pt-4'>
                    <div className='flex flex-col gap-6'>
                        <EmployeeAutoComplete createOVERTIME={createOVERTIME} setCreateOVERTIME={setCreateOVERTIME}/>
                        <OVERTIMETypeAutoComplete createOVERTIME={createOVERTIME} setCreateOVERTIME={setCreateOVERTIME}/>
                        <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='OVERTIME Description:'  
                            variant='outlined' 
                            multiline rows={4}
                            value={createOVERTIME?.ot_remarks}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                // event.target.value
                                setCreateOVERTIME((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            ot_remarks: event.target.value
                                        }
                                    )
                                })
                            }}
                            
                        />
                    </div>
                    <div className='flex flex-col gap-6'>
                        <DateFromToOVERTIMECreate createOVERTIME={createOVERTIME} setCreateOVERTIME={setCreateOVERTIME}/>
                    </div>
                </div>
                <div className='flex justify-center mt-6' container-name='ot_buttons_container'>
                    <div className='flex justify-between' style={{width:'100%'}} container-name='ot_buttons'>
                        <Button variant='contained' onClick={onClickSubmit}>Create OVERTIME</Button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default QuickAccessOVERTIMECreate;

