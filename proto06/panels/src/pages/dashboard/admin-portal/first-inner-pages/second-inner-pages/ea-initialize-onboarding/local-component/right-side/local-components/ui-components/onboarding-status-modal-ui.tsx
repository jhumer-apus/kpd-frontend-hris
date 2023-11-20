import { useState, Fragment, Dispatch, SetStateAction } from 'react';
import { ONBOARDINGSTATUSViewInterface } from '@/types/types-employee-and-applicants';
import {TextField} from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import dayjs from 'dayjs';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

interface ONBOARDINGSTATUSModalUIInterface {
    singleONBOARDINGSTATUSDetailsData: ONBOARDINGSTATUSViewInterface;
    multiplePayslipMode?: boolean;
    setSingleONBOARDINGSTATUSDetailsData: Dispatch<SetStateAction<ONBOARDINGSTATUSViewInterface>>;
}

function ONBOARDINGSTATUSModalUI(props: ONBOARDINGSTATUSModalUIInterface) {
    const [ resetPasswordONBOARDINGSTATUSOpenModal, setResetPasswordONBOARDINGSTATUSOpenModal ] = useState(false);
    const [ editONBOARDINGSTATUSOpenModal, setEditONBOARDINGSTATUSOpenModal ] = useState(false);
    const { setSingleONBOARDINGSTATUSDetailsData, singleONBOARDINGSTATUSDetailsData } = props;
    const ThisProps = props.singleONBOARDINGSTATUSDetailsData;
    const curr_user = useSelector((state: RootState)=> state.auth.employee_detail);
    const onClickModal = (mode: number) => {
        switch(mode){
            case 0: setResetPasswordONBOARDINGSTATUSOpenModal(true);
            break;
            case 1: setEditONBOARDINGSTATUSOpenModal(true);
            break;
        }   
        
    };

    return (
        <Fragment>
            <div className='flex overflow-auto gap-4 relative'>
                <div className='flex gap-6 w-full flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px'}} label='Total Pay:' value={ThisProps.total_pay ? (ThisProps.total_pay).toFixed(2) : '-'} InputProps={{readOnly: true,}} variant='filled'/>
                    <TextField sx={{width: '100%'}} label='Is Printed:' value={(ThisProps?.is_printed ? `Yes` : `No`)} InputProps={{readOnly: true,}} variant='standard'/>
                </div>
                <div className='flex gap-6 w-full flex-col'>
                    <TextField sx={{width: '100%'}} label='Coverage From:' value={ThisProps.coverage_from? dayjs(ThisProps.coverage_from).format('MM-DD-YYYY - HH:mm a') : '-'} InputProps={{readOnly: true,}} variant='filled'/>
                    <TextField sx={{width: '100%'}} label='Coverage To:' value={ThisProps.coverage_to? dayjs(ThisProps.coverage_to).format('MM-DD-YYYY - HH:mm a') : '-'} InputProps={{readOnly: true,}} variant='standard'/>
                    <FormControl className='w-3/4 justify-center'>
                        <FormLabel id="is-locked-manage-user-edit">Account Locked Status</FormLabel>
                        <RadioGroup
                            className='flex w-full'
                            row
                            aria-labelledby="is-locked-manage-user-edit w-full"
                            name="name-is-locked-manage-user-edit"
                            value={`${ThisProps.emp_no}`}
                            // onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            //     const value = (event.target.value=== 'true' ? true : false);
                            //     setSingleUSERDetailsData((prevState)=> {
                            //         return (
                            //             {
                            //                 ...prevState,
                            //                 is_locked: value
                            //             }
                            //         )
                            //     })
                            // }}
                        >
                            <FormControlLabel value="Pending" control={<Radio />} label="Pending" />
                            <FormControlLabel value="Completed" control={<Radio />} label="Completed" />
                        </RadioGroup>
                    </FormControl>
                </div>
            </div>
            <div className='flex flex-col justify-center items-center'>
                <div className='flex justify-center mt-6' container-name='leave_buttons_container'>
                    <div className='flex justify-center' style={{width:'400px', marginTop: '20px'}} container-name='leave_buttons'>
                        {/* <Button variant='contained' onClick={()=> onClickModal(1)}>Edit Details</Button> */}
                        {/* <Button variant='outlined' color={'error'} onClick={()=> onClickModal(0)}>Reset Password</Button> */}
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default ONBOARDINGSTATUSModalUI;