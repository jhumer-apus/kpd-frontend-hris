import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { Button } from '@mui/material';
import {TextField} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { Typography } from '@mui/joy';
import { POSITIONCreateInterface } from '@/types/types-pages';
import { POSITIONCreateAction, POSITIONCreateActionFailureCleanup } from '@/store/actions/categories';

interface CreatePOSITIONModalInterface {
    setOpen?: Dispatch<SetStateAction<boolean>>;
}

function ManagePOSITIONCreate(props: CreatePOSITIONModalInterface) {

    const dispatch = useDispatch();
    const curr_user = useSelector((state: RootState)=> state.auth.employee_detail?.emp_no);
    const POSITIONCreatestate = useSelector((state: RootState)=> state.categories.POSITIONCreate);
    const [createPOSITION, setCreatePOSITION] = useState<POSITIONCreateInterface>({
        pos_name: "",
        pos_description: "",
        added_by: NaN,
    });
    const onClickSubmit = () => {
        dispatch(POSITIONCreateAction(createPOSITION))
    };

    useEffect(()=> {
        if(curr_user){
            setCreatePOSITION((prevState) => {
                return (
                    {
                        ...prevState,
                        added_by: curr_user
                    }
                )
            })
        }
    }, [curr_user]) 

    useEffect(()=>{
        if(POSITIONCreatestate.status === 'succeeded'){
            window.alert('Request Successful');
            window.location.reload();
        }else if(POSITIONCreatestate.status === 'failed'){
            window.alert(`Request Failed, ${POSITIONCreatestate.error}`)
            setTimeout(()=> {
                dispatch(POSITIONCreateActionFailureCleanup());
            }, 1000)
        }
    }, [POSITIONCreatestate.status])

    return (
        <React.Fragment>
            <Typography style={{border: '2px solid rgb(25, 118, 210)', width: '100%', textAlign: 'center', padding: '6px', background: 'rgb(245,247,248)', boxShadow: '4px 4px 10px rgb(200, 200, 222)'}} variant='plain'>Create a Position Data</Typography>
            <div className='flex flex-col gap-3 w-3/4 items-center'>
                <TextField
                    required 
                    sx={{width: '100%'}} 
                    label='Position Name'
                    aria-required  
                    variant='outlined' 
                    type="text"
                    value={createPOSITION?.pos_name}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        const value = event.target.value
                        setCreatePOSITION((prevState)=> {
                            return (
                                {
                                    ...prevState,
                                    pos_name: value
                                }
                            )
                        })
                    }}
                />
                <TextField
                    sx={{width: '100%'}} 
                    label='Description'
                    variant='outlined' 
                    type="text"
                    multiline
                    rows={4}
                    value={createPOSITION?.pos_description}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        const value = event.target.value
                        setCreatePOSITION((prevState)=> {
                            return (
                                {
                                    ...prevState,
                                    pos_description: value
                                }
                            )
                        })
                    }}
                    
                />
                <div className='flex justify-center mt-6' container-name='leave_buttons_container'>
                    <div className='flex justify-between' style={{width:'100%'}} container-name='leave_buttons'>
                        <Button variant='contained' onClick={onClickSubmit}>Create POSITION</Button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default ManagePOSITIONCreate;

