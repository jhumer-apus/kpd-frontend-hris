import { useState, Fragment, Dispatch, SetStateAction } from 'react';
import { DIVISIONViewInterface } from '@/types/types-pages';
import { Button } from '@mui/material';
import dayjs from 'dayjs';
import {TextField} from '@mui/material';
// import ApproveDIVISIONModal from '../main-modals/inner-modals/approve-leave-modal';
import AllowedDaysDIVISIONModal from '../main-modals/inner-modals/edit-division-modal';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';

interface DIVISIONModalUIInterface {
    singleDIVISIONDetailsData: DIVISIONViewInterface;
    multiplePayslipMode?: boolean;
    setSingleDIVISIONDetailsData: Dispatch<SetStateAction<DIVISIONViewInterface>>;
}

function DIVISIONModalUI(props: DIVISIONModalUIInterface) {
    const [ approveDIVISIONOpenModal, setApproveDIVISIONOpenModal ] = useState(false);
    const [ allowedDaysDIVISIONOpenModal, setAllowedDaysDIVISIONOpenModal ] = useState(false);
    const { setSingleDIVISIONDetailsData, singleDIVISIONDetailsData } = props;
    const ThisProps = props.singleDIVISIONDetailsData;
    const curr_user = useSelector((state: RootState)=> state.auth.employee_detail);
    const onClickModal = (mode: number) => {
        switch(mode){
            case 0: setApproveDIVISIONOpenModal(true);
            break;
            case 1: setAllowedDaysDIVISIONOpenModal(true);
            break;
        }   
        
    };

    return (
        <Fragment>
            <AllowedDaysDIVISIONModal singleDIVISIONDetailsData={singleDIVISIONDetailsData} setSingleDIVISIONDetailsData={setSingleDIVISIONDetailsData} allowedDaysDIVISIONOpenModal={allowedDaysDIVISIONOpenModal} setAllowedDaysDIVISIONOpenModal={setAllowedDaysDIVISIONOpenModal}/>
            <div className='flex overflow-auto justify-around gap-4 relative'>
                <div className='flex gap-3 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px'}} label='Division ID:' value={ThisProps.id ? ThisProps.id : '-'} InputProps={{readOnly: true,}} variant='filled'/>
                    <TextField sx={{width: '100%'}} label='Connected to Branch:' value={(ThisProps?.div_branch_code || "-")} InputProps={{readOnly: true,}} variant='standard'/>
                </div>
                <div className='flex gap-3 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px', color: 'green'}} label='Division Name' value={ThisProps.div_name || '-'} InputProps={{readOnly: true,}} variant='filled' focused/>
                    <TextField sx={{width: '100%'}} label='Date Added:' value={ThisProps.date_added? dayjs(ThisProps.date_added).format('MM-DD-YYYY - HH:mm a') : '-'} InputProps={{readOnly: true,}} variant='standard'/>
                </div>
                <div className='flex gap-3 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px'}} label='Division Lead' value={ThisProps.div_lead || '-'} InputProps={{readOnly: true,}} variant='filled'/>
                    <TextField sx={{width: '100%'}} label='Date Deactivated:' value={ThisProps.date_deleted? dayjs(ThisProps.date_deleted).format('MM-DD-YYYY - HH:mm a') : '-'} InputProps={{readOnly: true,}} variant='standard'/>
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

export default DIVISIONModalUI;