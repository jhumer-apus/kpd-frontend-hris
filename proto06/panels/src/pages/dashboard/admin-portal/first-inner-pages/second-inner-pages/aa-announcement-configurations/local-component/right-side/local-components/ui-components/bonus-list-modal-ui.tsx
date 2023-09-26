import { useState, Fragment, Dispatch, SetStateAction } from 'react';
import { BONUSLISTViewInterface } from '@/types/types-payroll-eoy';
import { Button } from '@mui/material';
import {TextField} from '@mui/material';
import EditBONUSLISTModal from '../main-modals/inner-modals/edit-bonus-list-modal';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import dayjs from 'dayjs';

interface BONUSLISTModalUIInterface {
    singleBONUSLISTDetailsData: BONUSLISTViewInterface;
    multiplePayslipMode?: boolean;
    setSingleBONUSLISTDetailsData: Dispatch<SetStateAction<BONUSLISTViewInterface>>;
}

function BONUSLISTModalUI(props: BONUSLISTModalUIInterface) {
    const [ resetPasswordBONUSLISTOpenModal, setResetPasswordBONUSLISTOpenModal ] = useState(false);
    const [ editBONUSLISTOpenModal, setEditBONUSLISTOpenModal ] = useState(false);
    const { setSingleBONUSLISTDetailsData, singleBONUSLISTDetailsData } = props;
    const ThisProps = props.singleBONUSLISTDetailsData;
    const curr_user = useSelector((state: RootState)=> state.auth.employee_detail);
    const onClickModal = (mode: number) => {
        switch(mode){
            case 0: setResetPasswordBONUSLISTOpenModal(true);
            break;
            case 1: setEditBONUSLISTOpenModal(true);
            break;
        }   
        
    };

    return (
        <Fragment>
            <EditBONUSLISTModal singleBONUSLISTDetailsData={singleBONUSLISTDetailsData} setSingleBONUSLISTDetailsData={setSingleBONUSLISTDetailsData} editBONUSLISTOpenModal={editBONUSLISTOpenModal} setEditBONUSLISTOpenModal={setEditBONUSLISTOpenModal}/>
            <div className='flex overflow-auto justify-around gap-4 relative'>
                <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px'}} label='Type ID:' value={ThisProps.id ? ThisProps.id : '-'} InputProps={{readOnly: true,}} variant='filled'/>
                    <TextField sx={{width: '100%'}} label='Description:' multiline rows={5} value={(ThisProps?.description ? `${ThisProps?.description}` : '-')} InputProps={{readOnly: true,}} variant='outlined'/>
                </div>
                <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px', color: 'green'}} label='Bonus Type Name:' value={ThisProps.name || '-'} InputProps={{readOnly: true,}} variant='filled' focused/>
                </div>
                <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px'}} label='Amount' value={ThisProps.amount || '-'} InputProps={{readOnly: true,}} variant='filled'/>
                    <TextField sx={{width: '100%'}} label='Date Added:' value={ThisProps.date_added? dayjs(ThisProps.date_added).format('MM-DD-YYYY - HH:mm a') : '-'} InputProps={{readOnly: true,}} variant='standard'/>
                </div>
            </div>
            <div className='flex flex-col justify-center items-center'>
                <div className='flex justify-center mt-6' container-name='leave_buttons_container'>
                    <div className='flex justify-center' style={{width:'400px', marginTop: '20px'}} container-name='leave_buttons'>
                        <Button variant='contained' onClick={()=> onClickModal(1)}>Edit Details</Button>
                        {/* <Button variant='outlined' color={'error'} onClick={()=> onClickModal(0)}>Reset Password</Button> */}
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default BONUSLISTModalUI;