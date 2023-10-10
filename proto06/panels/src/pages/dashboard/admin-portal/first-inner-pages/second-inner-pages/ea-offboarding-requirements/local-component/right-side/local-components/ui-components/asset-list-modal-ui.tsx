import { useState, Fragment, Dispatch, SetStateAction } from 'react';
import { ASSETLISTViewInterface } from '@/types/types-payroll-eoy';
import { Button } from '@mui/material';
import {TextField} from '@mui/material';
import EditASSETLISTModal from '../main-modals/inner-modals/edit-asset-list-modal';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import dayjs from 'dayjs';

interface ASSETLISTModalUIInterface {
    singleASSETLISTDetailsData: ASSETLISTViewInterface;
    multiplePayslipMode?: boolean;
    setSingleASSETLISTDetailsData: Dispatch<SetStateAction<ASSETLISTViewInterface>>;
}

function ASSETLISTModalUI(props: ASSETLISTModalUIInterface) {
    const [ resetPasswordASSETLISTOpenModal, setResetPasswordASSETLISTOpenModal ] = useState(false);
    const [ editASSETLISTOpenModal, setEditASSETLISTOpenModal ] = useState(false);
    const { setSingleASSETLISTDetailsData, singleASSETLISTDetailsData } = props;
    const ThisProps = props.singleASSETLISTDetailsData;
    const curr_user = useSelector((state: RootState)=> state.auth.employee_detail);
    const onClickModal = (mode: number) => {
        switch(mode){
            case 0: setResetPasswordASSETLISTOpenModal(true);
            break;
            case 1: setEditASSETLISTOpenModal(true);
            break;
        }   
        
    };

    return (
        <Fragment>
            <EditASSETLISTModal singleASSETLISTDetailsData={singleASSETLISTDetailsData} setSingleASSETLISTDetailsData={setSingleASSETLISTDetailsData} editASSETLISTOpenModal={editASSETLISTOpenModal} setEditASSETLISTOpenModal={setEditASSETLISTOpenModal}/>
            <div className='flex overflow-auto justify-around gap-4 relative'>
                <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px'}} label='Asset ID:' value={ThisProps.id ? ThisProps.id : '-'} InputProps={{readOnly: true,}} variant='filled'/>
                    <TextField sx={{width: '100%'}} label='Description:' multiline rows={5} value={(ThisProps?.description ? `${ThisProps?.description}` : '-')} InputProps={{readOnly: true,}} variant='outlined'/>
                </div>
                <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px', color: 'green'}} label='Asset List Name:' value={ThisProps.asset_name || '-'} InputProps={{readOnly: true,}} variant='filled'/>
                    <TextField sx={{width: '100%', minWidth: '160px', color: 'green'}} label='Quantity:' value={ThisProps.quantity || '-'} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%', minWidth: '160px', color: 'green'}} label='Model | Year | Batch no.:' value={`${ThisProps.model?? '-'} | ${ThisProps.year ?? '-'} | ${ThisProps.batch_no ?? '-'}` || '-'} InputProps={{readOnly: true,}} variant='standard'/>
                </div>
                <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px'}} label='Added By Emp:' value={ThisProps.added_by || '-'} InputProps={{readOnly: true,}} variant='filled'/>
                    <TextField sx={{width: '100%'}} label='Date Added:' value={ThisProps.date_added? dayjs(ThisProps.date_added).format('MM-DD-YYYY - HH:mm a') : '-'} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%', minWidth: '160px', color: 'green'}} label='Remarks' value={ThisProps.remarks || '-'} InputProps={{readOnly: true,}} variant='standard'/>

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

export default ASSETLISTModalUI;