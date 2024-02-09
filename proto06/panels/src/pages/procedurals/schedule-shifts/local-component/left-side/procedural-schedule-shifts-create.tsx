import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { Button } from '@mui/material';
import {TextField} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import SCHEDULESHIFTTimeCreate from './inner-ui-components/schedule-shift-time-field';
import { Typography } from '@mui/joy';
import { SCHEDULESHIFTCreateInterface } from '@/types/types-pages';
import { SCHEDULESHIFTCreateAction, SCHEDULESHIFTCreateActionFailureCleanup } from '@/store/actions/procedurals';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';



interface CreateSCHEDULESHIFTModalInterface {
    setOpen?: Dispatch<SetStateAction<boolean>>;
}

function ProceduralSCHEDULESHIFTCreate(props: CreateSCHEDULESHIFTModalInterface) {

    const dispatch = useDispatch();
    const SCHEDULESHIFTCreatestate = useSelector((state: RootState)=> state.procedurals.SCHEDULESHIFTCreate);
    const [createSCHEDULESHIFT, setCreateSCHEDULESHIFT] = useState<SCHEDULESHIFTCreateInterface>({
        name: null,
        time_in: null,
        time_out: null,
        grace_period: null,
        with_overtime: false, 
    });
    const onClickSubmit = () => {
        dispatch(SCHEDULESHIFTCreateAction(createSCHEDULESHIFT))
    };
    useEffect(()=>{
        if(SCHEDULESHIFTCreatestate.status === 'succeeded'){
            window.alert('Request Successful');
            window.location.reload();
        }else if(SCHEDULESHIFTCreatestate.status === 'failed'){
            window.alert(`Request Failed, ${SCHEDULESHIFTCreatestate.error}`)
            setTimeout(()=> {
                dispatch(SCHEDULESHIFTCreateActionFailureCleanup());
            }, 1000)
        }
    }, [SCHEDULESHIFTCreatestate.status])

    return (
        <React.Fragment>
            <Typography style={{border: '2px solid rgb(25, 118, 210)', width: '100%', textAlign: 'center', padding: '6px', background: 'rgb(245,247,248)', boxShadow: '4px 4px 10px rgb(200, 200, 222)'}} variant='plain'>Create a Schedule Shift Data</Typography>
            <div className='flex flex-col gap-6 overflow-auto relative'>
                <div className='flex flex-wrap gap-6 pt-4'>
                    <input></input>
                    <div className='flex flex-col gap-6' style={{width: '100%'}}>
                        <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='Shift Name: (max 25 char)'  
                            variant='outlined'
                            value={createSCHEDULESHIFT?.name}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = event.target.value
                                setCreateSCHEDULESHIFT((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            name: value
                                        }
                                    )
                                })
                            }}
                            InputProps={{
                                inputProps: {
                                    maxLength: 25
                                }
                            }}
                        />
                        <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='Grace Period (max 60 min)'  
                            variant='outlined' 
                            type="number"
                            value={`${createSCHEDULESHIFT?.grace_period ?? 0}`}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = parseInt(event.target.value);
                                setCreateSCHEDULESHIFT((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            grace_period: value
                                        }
                                    )
                                })
                            }}
                            InputProps={{
                                inputProps: {
                                    max: 60
                                }
                            }}
                        />
                        <FormControl>
                            <FormLabel id="demo-controlled-radio-buttons-group">Overtime</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group"
                                value={`${!!createSCHEDULESHIFT.with_overtime}`}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    const value = (event.target.value=== 'true' ? true : false);
                                    setCreateSCHEDULESHIFT((prevState)=> {
                                        return (
                                            {
                                                ...prevState,
                                                with_overtime: value
                                            }
                                        )
                                    })
                                }}
                            >
                                <FormControlLabel value="true" control={<Radio />} label="With OT" />
                                <FormControlLabel value="false" control={<Radio />} label="No OT" />
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <div className='flex flex-col gap-6' style={{width: '100%'}}>
                        <SCHEDULESHIFTTimeCreate createSCHEDULESHIFT={createSCHEDULESHIFT} setCreateSCHEDULESHIFT={setCreateSCHEDULESHIFT}/>
                    </div>
                </div>
                <div className='flex justify-center mt-6' container-name='leave_buttons_container'>
                    <div className='flex justify-between' style={{width:'100%'}} container-name='leave_buttons'>
                        <Button variant='contained' onClick={onClickSubmit}>Create SCHEDULE SHIFT</Button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default ProceduralSCHEDULESHIFTCreate;

