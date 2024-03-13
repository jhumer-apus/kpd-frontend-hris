import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { Button } from '@mui/material';
import {TextField} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { Typography } from '@mui/material';
import { LEAVETYPECreateInterface } from '@/types/types-pages';
import { LEAVETYPECreateAction, LEAVETYPECreateActionFailureCleanup } from '@/store/actions/procedurals';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


interface CreateLEAVETYPEModalInterface {
    setOpen?: Dispatch<SetStateAction<boolean>>;
}

function ProceduralLEAVETYPECreate(props: CreateLEAVETYPEModalInterface) {

    const dispatch = useDispatch();
    const LEAVETYPECreatestate = useSelector((state: RootState)=> state.procedurals.LEAVETYPECreate);
    const currUser = useSelector((state: RootState)=> state.auth.employee_detail);
    const [createLEAVETYPE, setCreateLEAVETYPE] = useState<LEAVETYPECreateInterface>({
        name: null,
        is_paid: false,
        is_sl: false,
        is_vl: false,
        added_by: currUser?.emp_no
    });
    const onClickSubmit = () => {
        dispatch(LEAVETYPECreateAction(createLEAVETYPE))
    };
    useEffect(()=>{
        if(LEAVETYPECreatestate.status === 'succeeded'){
            window.alert('Request Successful');
            window.location.reload();
        }else if(LEAVETYPECreatestate.status === 'failed'){
            window.alert(`Request Failed, ${LEAVETYPECreatestate.error}`)
            setTimeout(()=> {
                dispatch(LEAVETYPECreateActionFailureCleanup());
            }, 1000)
        }
    }, [LEAVETYPECreatestate.status])
    
    const handleLeaveType = (e: React.ChangeEvent<HTMLInputElement>) => {

        let is_vl:boolean = false;
        let is_sl:boolean = false;
        let is_el:boolean = false;

        switch (e.target.value) {
            
            case "vl":
                is_vl = true
                is_sl = false
                is_el = false
                break

            case "sl":
                is_vl = false
                is_sl = true
                is_el = false
                break

            case "el":
                is_vl = false
                is_sl = false
                is_el = true
                break

            case "none":
                is_vl = false
                is_sl = false
                is_el = false
                break

            default:
                is_vl = false
                is_sl = false
                is_el = false
                break
        }
        setCreateLEAVETYPE((prevState)=> {
            return (
                {
                    ...prevState,
                    is_sl: is_sl,
                    is_vl: is_vl,
                    is_el: is_el

                }
            )
        })
            
    }

    return (
        <React.Fragment>
            <Typography style={{border: '2px solid rgb(25, 118, 210)', width: '100%', textAlign: 'center', padding: '6px', background: 'rgb(245,247,248)', boxShadow: '4px 4px 10px rgb(200, 200, 222)'}} variant="subtitle1">Create a Leave Type</Typography>
            <div className='flex flex-col gap-6 overflow-auto relative'>
                <div className='flex flex-wrap gap-6 pt-4'>
                    <div className='flex flex-col gap-6'>
                        <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='Leave Type Name:'  
                            variant='outlined' 
                            // type="number"
                            defaultValue={createLEAVETYPE?.name}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                // const value = event.target.value;
                                setCreateLEAVETYPE((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            name: event.target.value
                                        }
                                    )
                                })
                            }}
                            
                        />
                    </div>
                    <div className='flex flex-col gap-6'>
                        <FormControl>
                            <FormLabel id="demo-controlled-radio-buttons-group">Compensation Type</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group"
                                value={`${!!createLEAVETYPE.is_paid}`}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    const value = (event.target.value=== 'true' ? true : false);
                                    setCreateLEAVETYPE((prevState)=> {
                                        return (
                                            {
                                                ...prevState,
                                                is_paid: value
                                            }
                                        )
                                    })
                                }}
                            >
                                <FormControlLabel value="true" control={<Radio />} label="Paid" />
                                <FormControlLabel value="false" control={<Radio />} label="Unpaid" />
                            </RadioGroup>
                        </FormControl>
                    </div>
                </div>
                <div className='flex flex-wrap gap-6'>
                    <div className='flex flex-col gap-6'>
                        <FormControl>
                            <FormLabel id="demo-controlled-radio-buttons-group">Leave Type</FormLabel>
                            <RadioGroup                           
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group"
                                // value={`${!!createLEAVETYPE.is_vl}`}
                                onChange={handleLeaveType}
                            >
                                <FormControlLabel value="vl" control={<Radio />} label="Vacation Leave" />
                                <FormControlLabel value="sl" control={<Radio />} label="Sick Leave" />
                                <FormControlLabel value="el" control={<Radio />} label="Emergency Leave" />
                                <FormControlLabel value="none" control={<Radio />} label="None" />
                            </RadioGroup>
                        </FormControl>
                    </div>
                    {/* <div className='flex flex-col gap-6'>
                        <FormControl>
                            <FormLabel id="demo-controlled-radio-buttons-group">Sick Leave</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group"
                                value={`${!!createLEAVETYPE.is_sl}`}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    const value = (event.target.value=== 'true' ? true : false);
                                    setCreateLEAVETYPE((prevState)=> {
                                        return (
                                            {
                                                ...prevState,
                                                is_sl: value
                                            }
                                        )
                                    })
                                }}
                            >
                                <FormControlLabel value="true" control={<Radio />} label="True" />
                                <FormControlLabel value="false" control={<Radio />} label="False" />
                            </RadioGroup>
                        </FormControl>
                    </div> */}
                </div>
                <div className='flex justify-center mt-6' container-name='leave_buttons_container'>
                    <div className='flex justify-between' style={{width:'100%'}} container-name='leave_buttons'>
                        <Button variant='contained' onClick={onClickSubmit}>Create LEAVE TYPE</Button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default ProceduralLEAVETYPECreate;

