import { useState, Fragment, Dispatch, SetStateAction } from 'react';
import { LEAVETYPEViewInterface } from '@/types/types-pages';
import { Button } from '@mui/material';
import dayjs from 'dayjs';
import {TextField} from '@mui/material';
// import DeactivateLEAVETYPEModal from '../main-modals/inner-modals/approve-leave-modal';
import EditLEAVETYPEModal from '../main-modals/inner-modals/edit-leave-type-modal';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import DeactivateLEAVETYPEModal from '../main-modals/inner-modals/deactivate-leave-type-modal';

interface LEAVETYPEModalUIInterface {
    singleLEAVETYPEDetailsData: LEAVETYPEViewInterface;
    multiplePayslipMode?: boolean;
    setSingleLEAVETYPEDetailsData: Dispatch<SetStateAction<LEAVETYPEViewInterface>>;
}

function LEAVETYPEModalUI(props: LEAVETYPEModalUIInterface) {
    const [ DeactivateLEAVETYPEOpenModal, setDeactivateLEAVETYPEOpenModal ] = useState(false);
    const [ allowedDaysLEAVETYPEOpenModal, setEditLEAVETYPEOpenModal ] = useState(false);
    const { setSingleLEAVETYPEDetailsData, singleLEAVETYPEDetailsData } = props;
    const ThisProps = props.singleLEAVETYPEDetailsData;
    const curr_user = useSelector((state: RootState)=> state.auth.employee_detail);
    const onClickModal = (mode: number) => {
        switch(mode){
            case 0: setDeactivateLEAVETYPEOpenModal(true);
            break;
            case 1: setEditLEAVETYPEOpenModal(true);
            break;
        }   
        
    };

    return (
        <Fragment>
            <EditLEAVETYPEModal 
                singleLEAVETYPEDetailsData={singleLEAVETYPEDetailsData} 
                setSingleLEAVETYPEDetailsData={setSingleLEAVETYPEDetailsData} 
                allowedDaysLEAVETYPEOpenModal={allowedDaysLEAVETYPEOpenModal} 
                setEditLEAVETYPEOpenModal={setEditLEAVETYPEOpenModal}
            />
            <DeactivateLEAVETYPEModal
                singleLEAVETYPEDetailsData={singleLEAVETYPEDetailsData} 
                setSingleLEAVETYPEDetailsData={setSingleLEAVETYPEDetailsData} 
                DeactivateLEAVETYPEOpenModal={DeactivateLEAVETYPEOpenModal} 
                setDeactivateLEAVETYPEOpenModal={setDeactivateLEAVETYPEOpenModal} 
            />
            
            <div className='flex gap-10 overflow-auto relative'>
                <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px'}} label='Leave Type Code:' value={ThisProps.id || '-'} InputProps={{readOnly: true,}} variant='filled'/>
                    <TextField sx={{width: '100%'}} label='Date Added:' value={ThisProps.date_added? dayjs(ThisProps.date_added).format('MM-DD-YYYY - HH:mm a') : '-'} InputProps={{readOnly: true,}} variant='standard'/>
                </div>
                <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px', color: 'green'}} label='Leave Name' value={ThisProps.name || 'No Leave Name'} InputProps={{readOnly: true,}} variant='filled' focused/>
                    <TextField sx={{width: '100%'}} label='Date Deactivated:' value={ThisProps.date_deleted? dayjs(ThisProps.date_deleted).format('MM-DD-YYYY - HH:mm a') : '-'} InputProps={{readOnly: true,}} variant='standard'/>
                </div>
                <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px'}} label='Paid (Y/N):' value={ThisProps.is_paid ? 'YES': 'NO'} InputProps={{readOnly: true,}} variant='filled'/>
                </div>
            </div>
            <div className='flex flex-col justify-center items-center'>
            <div className='flex justify-center mt-6' container-name='leave_buttons_container'>
                <div className='flex justify-center' style={{width:'300px', marginTop: '20px'}} container-name='leave_buttons'>
                    <Button variant='contained' onClick={()=> onClickModal(1)}>EDIT ENTRY</Button>
                    {/* <Button variant='outlined' color="error" onClick={()=> onClickModal(0)}>DEACTIVATE ENTRY</Button> */}
                </div> 
            </div>
            </div>
        </Fragment>
    );
}

export default LEAVETYPEModalUI;