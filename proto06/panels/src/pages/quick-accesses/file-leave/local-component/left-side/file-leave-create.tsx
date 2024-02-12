import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { Button } from '@mui/material';
import {TextField} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import EmployeeAutoComplete from './inner-ui-components/employee-autocomplete';
import LEAVETypeAutoComplete from './inner-ui-components/leave-type-autocomplete';
import DateFromToLEAVECreate from './inner-ui-components/date-from-to-field';
import { Typography } from '@mui/joy';
import { LEAVECreateInterface } from '@/types/types-pages';
import { LEAVECreateAction, LEAVECreateActionFailureCleanup } from '@/store/actions/procedurals';

interface CreateLEAVEModalInterface {
    setOpen?: Dispatch<SetStateAction<boolean>>;
}

function QuickAccessLEAVECreate(props: CreateLEAVEModalInterface) {

    const dispatch = useDispatch();
    const LEAVECreatestate = useSelector((state: RootState)=> state.procedurals.LEAVECreate);
    const [createLEAVE, setCreateLEAVE] = useState<LEAVECreateInterface>({
        emp_no: NaN,
        leave_type: null,
        leave_remarks: null,
        leave_date_from: null,
        leave_date_to: null,
    });
    const onClickSubmit = () => {
        dispatch(LEAVECreateAction(createLEAVE))
    };
    useEffect(()=>{
        if(LEAVECreatestate.status === 'succeeded'){
            window.alert('Request Successful');
            window.location.reload();
        }else if(LEAVECreatestate.status === 'failed'){
            window.alert(`Request Failed, ${LEAVECreatestate.error}`)
            setTimeout(()=> {
                dispatch(LEAVECreateActionFailureCleanup());
            }, 1000)
        }
    }, [LEAVECreatestate.status])

    return (
        <React.Fragment>
            <Typography style={{border: '2px solid rgb(25, 118, 210)', width: '100%', textAlign: 'center', padding: '6px', background: 'rgb(245,247,248)', boxShadow: '4px 4px 10px rgb(200, 200, 222)'}} variant='plain'>Create a Leave Data</Typography>
            <div className='flex flex-col gap-6 overflow-auto relative'>
                <div className='flex gap-6 pt-4'>
                    <div className='flex flex-col gap-6'>
                        <EmployeeAutoComplete createLEAVE={createLEAVE} setCreateLEAVE={setCreateLEAVE}/>
                        <LEAVETypeAutoComplete createLEAVE={createLEAVE} setCreateLEAVE={setCreateLEAVE}/>
                        <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='LEAVE Description:'  
                            variant='outlined' 
                            multiline rows={4}
                            value={createLEAVE?.leave_remarks}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                // event.target.value
                                setCreateLEAVE((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            leave_remarks: event.target.value
                                        }
                                    )
                                })
                            }}
                        />
                    </div>
                    <div className='flex flex-col gap-6'>
                        <DateFromToLEAVECreate createLEAVE={createLEAVE} setCreateLEAVE={setCreateLEAVE}/>
                    </div>
                </div>
                <div className='flex justify-center mt-6' container-name='leave_buttons_container'>
                    <div className='flex justify-between' style={{width:'100%'}} container-name='leave_buttons'>
                        <Button variant='contained' onClick={onClickSubmit}>Create LEAVE</Button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default QuickAccessLEAVECreate;

