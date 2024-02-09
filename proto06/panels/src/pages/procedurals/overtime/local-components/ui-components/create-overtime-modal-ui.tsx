import React, { useEffect, useState, useRef, Dispatch, SetStateAction } from 'react';
import { OVERTIMEViewInterface, ViewPayrollPayPerEmployee } from '@/types/types-pages';
import { convertDaysToHHMM, convertMinutesToHHMM,  } from '@/helpers/utils';
import { Button } from '@mui/material';
import dayjs from 'dayjs';
import {TextField} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import EmployeeAutoComplete from './inner-ui-components/employee-autocomplete';
import OVERTIMETypeAutoComplete from './inner-ui-components/overtime-type-autocomplete';
import DateFromToOVERTIMECreate from './inner-ui-components/date-from-to-field';
import { Typography } from '@mui/joy';
import { ModalClose } from '@mui/joy';
import { OVERTIMECreateInterface } from '@/types/types-pages';
import { OVERTIMECreateAction, OVERTIMECreateActionFailureCleanup } from '@/store/actions/procedurals';


interface createOVERTIMEModalInterface {
    setOpen: Dispatch<SetStateAction<boolean>>;
}


function CreateOVERTIMEModal(props: createOVERTIMEModalInterface) {
    const { setOpen } = props;
    const currDate = new Date();
    // const createOVERTIMERef = useRef<OVERTIMECreateInterface>({
    //     emp_no: NaN,
    //     ot_type: null,
    //     ot_remarks: null,
    //     ot_date_from: null,
    //     ot_date_to: null,
    // });
    const [createOVERTIME, setCreateOVERTIME] = useState<OVERTIMECreateInterface>({
        emp_no: NaN,
        ot_type: null,
        ot_remarks: null,
        ot_date_from: null,
        ot_date_to: null,
    })
    const dispatch = useDispatch();
    const OVERTIMECreatestate = useSelector((state: RootState)=> state.procedurals.OVERTIMECreate);
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
            <Typography variant='soft'>Create an Overtime Data</Typography>
            <ModalClose sx={{marginTop: '4px'}}/>
            <div className='flex flex-col gap-10 overflow-auto relative pt-10'>
                <div className='flex flex-wrap gap-6'>
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
                                    return(
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
                    <div className='flex justify-between' style={{width:'300px'}} container-name='obt_buttons'>
                        <Button variant='contained' onClick={onClickSubmit}>Create OVERTIME</Button>
                        <Button variant='outlined' onClick={()=> setOpen(false)}>Cancel</Button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default CreateOVERTIMEModal;

