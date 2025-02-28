import React, { useEffect, useState, useRef, Dispatch, SetStateAction } from 'react';
import { LEAVEViewInterface, ViewPayrollPayPerEmployee } from '@/types/types-pages';
import { convertDaysToHHMM, convertMinutesToHHMM,  } from '@/helpers/utils';
import { Button } from '@mui/material';
import dayjs from 'dayjs';
import {TextField} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import EmployeeAutoComplete from './inner-ui-components/employee-autocomplete';
import LEAVETypeAutoComplete from './inner-ui-components/leaves-type-autocomplete';
import DateFromToLEAVECreate from './inner-ui-components/date-from-to-field';
import { Typography } from '@mui/joy';
import { ModalClose } from '@mui/joy';
import { LEAVECreateInterface } from '@/types/types-pages';
import { LEAVECreateAction, LEAVECreateActionFailureCleanup } from '@/store/actions/procedurals';
import LEAVETYPEFetchAutoComplete from './inner-ui-components/leave-type-fetch-autocomplete';


interface createLEAVEModalInterface {
    setOpen: Dispatch<SetStateAction<boolean>>;
}


function CreateLEAVEModal(props: createLEAVEModalInterface) {
    const { setOpen } = props;
    const currDate = new Date();
    // const createLEAVERef = useRef<LEAVECreateInterface>({
    //     emp_no: NaN,
    //     leave_type: null,
    //     leave_remarks: null,
    //     leave_date_from: null,
    //     leave_date_to: null,
    // });
    const [createLEAVE, setCreateLEAVE] = useState<LEAVECreateInterface>({
        emp_no: null,
        leave_type: null,
        leave_remarks: null,
        leave_date_from: null,
        leave_date_to: null,
    })
    const dispatch = useDispatch();
    const LEAVECreatestate = useSelector((state: RootState)=> state.procedurals.LEAVECreate);
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
            <Typography variant='soft'>Create a Leave Data</Typography>
            {/* <ModalClose sx={{marginTop: '4px'}}/> */}
            <div className='flex flex-col gap-10 overflow-auto relative pt-10'>
                <div className='flex flex-wrap gap-6'>
                    <div className='flex flex-col gap-6'>
                        <EmployeeAutoComplete createLEAVE={createLEAVE} setCreateLEAVE={setCreateLEAVE}/>
                        <LEAVETYPEFetchAutoComplete createLEAVE={createLEAVE} setCreateLEAVE={setCreateLEAVE}/>
                        {/* <LEAVETypeAutoComplete createLEAVE={createLEAVE} setCreateLEAVE={setCreateLEAVE}/> */}
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
                                    return(
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
                    <div className='flex justify-between' style={{width:'300px'}} container-name='leave_buttons'>
                        <Button variant='contained' onClick={onClickSubmit}>Create LEAVE</Button>
                        <Button variant='outlined' onClick={()=> setOpen(false)}>Cancel</Button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default CreateLEAVEModal;

