import React, { useEffect, useState, useRef, Dispatch, SetStateAction } from 'react';
import { OBTViewInterface, ViewPayrollPayPerEmployee } from '@/types/types-pages';
import { convertDaysToHHMM, convertMinutesToHHMM,  } from '@/helpers/utils';
import { Button } from '@mui/material';
import dayjs from 'dayjs';
import {TextField} from '@mui/material';
import ApproveOBTModal from '../main-modals/inner-modals/approve-obt-modal';
import DenyOBTModal from '../main-modals/inner-modals/deny-obt-modal';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import EmployeeAutoComplete from './inner-ui-components/employee-autocomplete';
import OBTTypeAutoComplete from './inner-ui-components/obt-type-autocomplete';
import DateFromToOBTCreate from './inner-ui-components/date-from-to-field';
import { Typography } from '@mui/joy';
import { ModalClose } from '@mui/joy';
import { OBTCreateInterface } from '@/types/types-pages';
import { OBTCreateAction, OBTCreateActionFailureCleanup } from '@/store/actions/procedurals';

interface CreateOBTModalInterface {
    setOpen: Dispatch<SetStateAction<boolean>>;
}

function CreateOBTModal(props: CreateOBTModalInterface) {
    const { setOpen } = props;
    const dispatch = useDispatch();
    const OBTCreatestate = useSelector((state: RootState)=> state.procedurals.OBTCreate);
    const [createOBT, setCreateOBT] = useState<OBTCreateInterface>({
        emp_no: NaN,
        obt_type: null,
        obt_location: '',
        obt_remarks: null,
        obt_date_from: null,
        obt_date_to: null,
    });
    const onClickSubmit = () => {
        dispatch(OBTCreateAction(createOBT))
    };
    useEffect(()=>{
        if(OBTCreatestate.status === 'succeeded'){
            window.alert('Request Successful');
            window.location.reload();
        }else if(OBTCreatestate.status === 'failed'){
            window.alert(`Request Failed, ${OBTCreatestate.error}`)
            setTimeout(()=> {
                dispatch(OBTCreateActionFailureCleanup());
            }, 1000)
        }
    }, [OBTCreatestate.status])

    return (
        <React.Fragment>
            <Typography variant='soft'>Create an Official Business Time/Trip Data</Typography>
            <ModalClose sx={{marginTop: '4px'}}/>
            <div className='flex flex-col gap-10 overflow-auto relative pt-10'>
                <div className='flex flex-wrap gap-6'>
                    <div className='flex flex-col gap-6'>
                        <EmployeeAutoComplete createOBT={createOBT} setCreateOBT={setCreateOBT}/>
                        <OBTTypeAutoComplete createOBT={createOBT} setCreateOBT={setCreateOBT}/>
                        <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='OBT Description:'  
                            variant='outlined' 
                            multiline rows={4}
                            value={createOBT?.obt_remarks}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                // event.target.value
                                setCreateOBT((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            obt_remarks: event.target.value
                                        }
                                    )
                                })
                            }}
                            
                        />
                    </div>
                    <div className='flex flex-col gap-6'>
                        <DateFromToOBTCreate createOBT={createOBT} setCreateOBT={setCreateOBT}/>
                        <TextField 
                            required
                            sx={{width: '100%'}} 
                            label='Location:'  
                            variant='outlined' 
                            multiline rows={4}
                            value={createOBT?.obt_location}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                // event.target.value
                                setCreateOBT((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            obt_location: event.target.value
                                        }
                                    )
                                })
                            }}
                        />
                    </div>
                </div>
                <div className='flex justify-center mt-6' container-name='obt_buttons_container'>
                    <div className='flex justify-between' style={{width:'300px'}} container-name='obt_buttons'>
                        <Button variant='contained' onClick={onClickSubmit}>Create OBT</Button>
                        <Button variant='outlined' onClick={()=> setOpen(false)}>Cancel</Button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default CreateOBTModal;

