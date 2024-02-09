import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { Button } from '@mui/material';
import {TextField} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { Typography } from '@mui/joy';
import { RANKCreateInterface } from '@/types/types-pages';
import { RANKCreateAction, RANKCreateActionFailureCleanup } from '@/store/actions/categories';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';



interface CreateRANKModalInterface {
    setOpen?: Dispatch<SetStateAction<boolean>>;
}

function ManageRANKCreate(props: CreateRANKModalInterface) {

    const dispatch = useDispatch();
    const curr_user = useSelector((state: RootState)=> state.auth.employee_detail?.emp_no);
    const RANKCreatestate = useSelector((state: RootState)=> state.categories.RANKCreate);
    const [createRANK, setCreateRANK] = useState<RANKCreateInterface>({
        rank_name: "",
        rank_description: "",
        is_approver: false,
        hierarchy: NaN,
        added_by: NaN,
    });
    const onClickSubmit = () => {
        dispatch(RANKCreateAction(createRANK))
    };

    useEffect(()=> {
        if(curr_user){
            setCreateRANK((prevState) => {
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
        if(RANKCreatestate.status === 'succeeded'){
            window.alert('Request Successful');
            window.location.reload();
        }else if(RANKCreatestate.status === 'failed'){
            window.alert(`Request Failed, ${RANKCreatestate.error}`)
            setTimeout(()=> {
                dispatch(RANKCreateActionFailureCleanup());
            }, 1000)
        }
    }, [RANKCreatestate.status])

    return (
        <React.Fragment>
            <Typography style={{border: '2px solid rgb(25, 118, 210)', width: '100%', textAlign: 'center', padding: '6px', background: 'rgb(245,247,248)', boxShadow: '4px 4px 10px rgb(200, 200, 222)'}} variant='plain'>Create a Rank Data</Typography>
            <div className='flex flex-col gap-3 w-3/4 items-center'>
                <TextField
                    required 
                    sx={{width: '100%'}} 
                    label='Rank Name'
                    aria-required  
                    variant='outlined' 
                    type="text"
                    value={createRANK?.rank_name}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        const value = event.target.value
                        setCreateRANK((prevState)=> {
                            return (
                                {
                                    ...prevState,
                                    rank_name: value
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
                    value={createRANK?.rank_description}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        const value = event.target.value
                        setCreateRANK((prevState)=> {
                            return (
                                {
                                    ...prevState,
                                    rank_description: value
                                }
                            )
                        })
                    }}  
                />
                <FormControl className='w-full justify-center items-center'>
                    <FormLabel id="is-approver-manage-rank-create">Approval Authority Type</FormLabel>
                    <RadioGroup
                        className='flex w-full justify-around'
                        row
                        aria-labelledby="is-approver-manage-rank-create w-full"
                        name="name-is-approver-manage-rank-create"
                        value={`${createRANK.is_approver}`}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            const value = (event.target.value=== 'true' ? true : false);
                            setCreateRANK((prevState)=> {
                                return (
                                    {
                                        ...prevState,
                                        is_approver: value
                                    }
                                )
                            })
                        }}
                    >
                        <FormControlLabel value="true" control={<Radio />} label="Approver" />
                        <FormControlLabel value="false" control={<Radio />} label="Not Approver" />
                    </RadioGroup>
                </FormControl>
                <TextField
                    sx={{width: '100%'}} 
                    label='Approver Level(1 Lowest - 5 Highest)'
                    variant='standard' 
                    type="number"
                    value={createRANK?.hierarchy}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        const value = parseInt(event.target.value)
                        setCreateRANK((prevState)=> {
                            return (
                                {
                                    ...prevState,
                                    hierarchy: value
                                }
                            )
                        })
                    }}  
                />
                <div className='flex justify-center mt-6' container-name='leave_buttons_container'>
                    <div className='flex justify-between' style={{width:'100%'}} container-name='leave_buttons'>
                        <Button variant='contained' onClick={onClickSubmit}>Create RANK</Button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default ManageRANKCreate;

