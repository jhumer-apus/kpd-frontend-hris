import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { Button } from '@mui/material';
import {TextField} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import EmployeeAutoComplete from './inner-ui-components/employee-autocomplete';
import OBTTypeAutoComplete from './inner-ui-components/obt-type-autocomplete';
import DateFromToOBTCreate from './inner-ui-components/date-from-to-field';
import { Typography } from '@mui/joy';
import { OBTCreateInterface } from '@/types/types-pages';
import { OBTCreateAction, OBTCreateActionFailureCleanup } from '@/store/actions/procedurals';

interface CreateOBTModalInterface {
    setOpen?: Dispatch<SetStateAction<boolean>>;
}

function QuickAccessOBTCreate(props: CreateOBTModalInterface) {

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
            {/* <TextField style={{width: '100%', borderTop: '2px solid rgb(25, 118, 210)', position: 'relative',marginTop: '0px'}} variant="filled" focused InputProps={{style: {display: 'flex', justifyContent: 'center', paddingBottom: '10px'}}} value="Create Official Business Time/Trip Individual Data"></TextField> */}
            <Typography style={{border: '2px solid rgb(25, 118, 210)', width: '100%', textAlign: 'center', padding: '6px', background: 'rgb(245,247,248)', boxShadow: '4px 4px 10px rgb(200, 200, 222)'}} variant='plain' level="h6">Create Official Business Time/Trip Individual Data</Typography>
            <div className='flex flex-col gap-6 overflow-auto relative'>
                <div className='flex flex-wrap gap-6 pt-4'>
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
                    <div className='flex justify-between' style={{width:'1000%'}} container-name='obt_buttons'>
                        <Button variant='contained' onClick={onClickSubmit}>Create OBT</Button>
                        {/* <Button variant='outlined' onClick={()=> setOpen(false)}>Cancel</Button> */}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default QuickAccessOBTCreate;

