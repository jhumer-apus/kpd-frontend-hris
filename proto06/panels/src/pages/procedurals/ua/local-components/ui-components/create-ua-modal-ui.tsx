import React, { useEffect, useState, useRef, Dispatch, SetStateAction } from 'react';
import { UAViewInterface, ViewPayrollPayPerEmployee } from '@/types/types-pages';
import { convertDaysToHHMM, convertMinutesToHHMM,  } from '@/helpers/utils';
import { Button } from '@mui/material';
import dayjs from 'dayjs';
import {TextField} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import EmployeeAutoComplete from './inner-ui-components/employee-autocomplete';
import UATypeAutoComplete from './inner-ui-components/ua-type-autocomplete';
import DateFromToUACreate from './inner-ui-components/date-from-to-field';
import { Typography } from '@mui/joy';
import { ModalClose } from '@mui/joy';
import { UACreateInterface } from '@/types/types-pages';
import { UACreateAction, UACreateActionFailureCleanup } from '@/store/actions/procedurals';
import UATYPEFetchAutoComplete from './inner-ui-components/ua-type-fetch-autocomplete';


interface createUAModalInterface {
    setOpen: Dispatch<SetStateAction<boolean>>;
}


function CreateUAModal(props: createUAModalInterface) {
    const { setOpen } = props;
    const currDate = new Date();
    // const createUARef = useRef<UACreateInterface>({
    //     emp_no: NaN,
    //     ua_type: null,
    //     ua_description: null,
    //     ua_date_from: null,
    //     ua_date_to: null,
    // });
    const [createUA, setCreateUA] = useState<UACreateInterface>({
        emp_no: NaN,
        ua_description: null,
        ua_date_from: null,
        ua_date_to: null,
    })
    const dispatch = useDispatch();
    const UACreatestate = useSelector((state: RootState)=> state.procedurals.UACreate);
    const onClickSubmit = () => {
        dispatch(UACreateAction(createUA))
    };
    useEffect(()=>{
        if(UACreatestate.status === 'succeeded'){
            window.alert('Request Successful');
            window.location.reload();
        }else if(UACreatestate.status === 'failed'){
            window.alert(`Request Failed, ${UACreatestate.error}`)
            setTimeout(()=> {
                dispatch(UACreateActionFailureCleanup());
            }, 1000)
        }
    }, [UACreatestate.status])

    return (
        <React.Fragment>
            <Typography variant='soft'>Create an Unaccounted Attendance Data</Typography>
            <ModalClose sx={{marginTop: '4px'}}/>
            <div className='flex flex-col gap-10 overflow-auto relative pt-10'>
                <div className='flex flex-wrap gap-6'>
                    <div className='flex flex-col gap-6'>
                        <EmployeeAutoComplete createUA={createUA} setCreateUA={setCreateUA}/>
                        {/* <UATYPEFetchAutoComplete createUA={createUA} setCreateUA={setCreateUA}/> */}
                        {/* <UATypeAutoComplete createUA={createUA} setCreateUA={setCreateUA}/> */}
                        <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='UA Description:'  
                            variant='outlined' 
                            multiline rows={4}
                            value={createUA?.ua_description}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                // event.target.value
                                setCreateUA((prevState)=> {
                                    return(
                                        {
                                            ...prevState,
                                            ua_description: event.target.value
                                        }
                                    )
                                })
                            }}
                            
                        />
                    </div>
                    <div className='flex flex-col gap-6'>
                        <DateFromToUACreate createUA={createUA} setCreateUA={setCreateUA}/>
                    </div>
                </div>
                <div className='flex justify-center mt-6' container-name='ua_buttons_container'>
                    <div className='flex justify-between' style={{width:'300px'}} container-name='ua_buttons'>
                        <Button variant='contained' onClick={onClickSubmit}>Create UA</Button>
                        <Button variant='outlined' onClick={()=> setOpen(false)}>Cancel</Button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default CreateUAModal;

