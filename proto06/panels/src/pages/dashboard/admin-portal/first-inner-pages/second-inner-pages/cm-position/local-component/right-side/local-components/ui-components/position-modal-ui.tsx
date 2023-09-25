import { useState, Fragment, Dispatch, SetStateAction } from 'react';
import { POSITIONViewInterface } from '@/types/types-pages';
import { Button } from '@mui/material';
import dayjs from 'dayjs';
import {TextField} from '@mui/material';
// import ApprovePOSITIONModal from '../main-modals/inner-modals/approve-leave-modal';
import AllowedDaysPOSITIONModal from '../main-modals/inner-modals/edit-position-modal';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';

interface POSITIONModalUIInterface {
    singlePOSITIONDetailsData: POSITIONViewInterface;
    multiplePayslipMode?: boolean;
    setSinglePOSITIONDetailsData: Dispatch<SetStateAction<POSITIONViewInterface>>;
}

function POSITIONModalUI(props: POSITIONModalUIInterface) {
    const [ approvePOSITIONOpenModal, setApprovePOSITIONOpenModal ] = useState(false);
    const [ allowedDaysPOSITIONOpenModal, setAllowedDaysPOSITIONOpenModal ] = useState(false);
    const { setSinglePOSITIONDetailsData, singlePOSITIONDetailsData } = props;
    const ThisProps = props.singlePOSITIONDetailsData;
    const curr_user = useSelector((state: RootState)=> state.auth.employee_detail);
    const onClickModal = (mode: number) => {
        switch(mode){
            case 0: setApprovePOSITIONOpenModal(true);
            break;
            case 1: setAllowedDaysPOSITIONOpenModal(true);
            break;
        }   
        
    };
    return (
        <Fragment>
            <AllowedDaysPOSITIONModal singlePOSITIONDetailsData={singlePOSITIONDetailsData} setSinglePOSITIONDetailsData={setSinglePOSITIONDetailsData} allowedDaysPOSITIONOpenModal={allowedDaysPOSITIONOpenModal} setAllowedDaysPOSITIONOpenModal={setAllowedDaysPOSITIONOpenModal}/>
            <div className='flex overflow-auto justify-around relative'>
                <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px'}} label='Position ID:' value={ThisProps.id ? ThisProps.id : '-'} InputProps={{readOnly: true,}} variant='filled'/>
                    <TextField sx={{width: '100%'}} label='Date Added:' value={ThisProps.date_added? dayjs(ThisProps.date_added).format('MM-DD-YYYY - HH:mm a') : '-'} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%'}} label='Date Deactivated:' value={ThisProps.date_deleted? dayjs(ThisProps.date_deleted).format('MM-DD-YYYY - HH:mm a') : '-'} InputProps={{readOnly: true,}} variant='standard'/>
                </div>
                <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px', color: 'green'}} label='Position Name' value={ThisProps.pos_name || '-'} InputProps={{readOnly: true,}} variant='filled' focused/>
                    <TextField sx={{width: '100%', minWidth: '160px'}} multiline rows={4} label='Description' value={ThisProps.pos_description || '-'} InputProps={{readOnly: true,}} variant='outlined'/>
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

export default POSITIONModalUI;