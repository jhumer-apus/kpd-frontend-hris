import { useState, Fragment, Dispatch, SetStateAction } from 'react';
import { RANKViewInterface } from '@/types/types-pages';
import { Button } from '@mui/material';
import dayjs from 'dayjs';
import {TextField} from '@mui/material';
import AllowedDaysRANKModal from '../main-modals/inner-modals/edit-rank-modal';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';

interface RANKModalUIInterface {
    singleRANKDetailsData: RANKViewInterface;
    multiplePayslipMode?: boolean;
    setSingleRANKDetailsData: Dispatch<SetStateAction<RANKViewInterface>>;
}

function RANKModalUI(props: RANKModalUIInterface) {
    const [ approveRANKOpenModal, setApproveRANKOpenModal ] = useState(false);
    const [ allowedDaysRANKOpenModal, setAllowedDaysRANKOpenModal ] = useState(false);
    const { setSingleRANKDetailsData, singleRANKDetailsData } = props;
    const ThisProps = props.singleRANKDetailsData;
    const curr_user = useSelector((state: RootState)=> state.auth.employee_detail);
    const onClickModal = (mode: number) => {
        switch(mode){
            case 0: setApproveRANKOpenModal(true);
            break;
            case 1: setAllowedDaysRANKOpenModal(true);
            break;
        }   
        
    };

    return (
        <Fragment>
            <AllowedDaysRANKModal singleRANKDetailsData={singleRANKDetailsData} setSingleRANKDetailsData={setSingleRANKDetailsData} allowedDaysRANKOpenModal={allowedDaysRANKOpenModal} setAllowedDaysRANKOpenModal={setAllowedDaysRANKOpenModal}/>
            <div className='flex overflow-auto justify-around relative gap-6'>
                <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px'}} label='Position ID:' value={ThisProps.id ? ThisProps.id : '-'} InputProps={{readOnly: true,}} variant='filled'/>
                    <TextField sx={{width: '100%'}} label='Date Added:' value={ThisProps.date_added? dayjs(ThisProps.date_added).format('MM-DD-YYYY - HH:mm a') : '-'} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%'}} label='Date Deactivated:' value={ThisProps.date_deleted? dayjs(ThisProps.date_deleted).format('MM-DD-YYYY - HH:mm a') : '-'} InputProps={{readOnly: true,}} variant='standard'/>
                </div>
                <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px', color: 'green'}} label='Position Name' value={ThisProps.rank_name || '-'} InputProps={{readOnly: true,}} variant='filled' focused/>
                    <TextField sx={{width: '100%', minWidth: '160px'}} multiline rows={4} label='Description' value={ThisProps.rank_description || '-'} InputProps={{readOnly: true,}} variant='outlined'/>
                </div>
                <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px', color: 'green'}} label='Is Approver' value={ThisProps.is_approver ? 'Yes' : 'No'} InputProps={{readOnly: true,}} variant='filled' focused/>
                    <TextField sx={{width: '100%', minWidth: '160px'}}  label='Approver Level (1 lowest - 5 highest)' value={ThisProps.hierarchy || '-'} InputProps={{readOnly: true,}} variant='standard'/>
                </div>
            </div>
            <div className='flex flex-col justify-center items-center'>
                <div className='flex justify-center mt-6' container-name='leave_buttons_container'>
                    <div className='flex justify-between' style={{width:'200px', marginTop: '20px'}} container-name='leave_buttons'>
                        <Button variant='contained' onClick={()=> onClickModal(1)}>Edit Details</Button>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default RANKModalUI;