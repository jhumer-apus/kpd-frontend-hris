import { useState, Fragment, Dispatch, SetStateAction } from 'react';
import { PHILHEALTHViewInterface } from '@/types/types-payroll-variables';
import { Button } from '@mui/material';
import {TextField} from '@mui/material';
import EditPHILHEALTHModal from '../main-modals/inner-modals/edit-philhealth-modal';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';

interface PHILHEALTHModalUIInterface {
    singlePHILHEALTHDetailsData: PHILHEALTHViewInterface;
    multiplePayslipMode?: boolean;
    setSinglePHILHEALTHDetailsData: Dispatch<SetStateAction<PHILHEALTHViewInterface>>;
}

function PHILHEALTHModalUI(props: PHILHEALTHModalUIInterface) {
    const [ resetPasswordPHILHEALTHOpenModal, setResetPasswordPHILHEALTHOpenModal ] = useState(false);
    const [ editPHILHEALTHOpenModal, setEditPHILHEALTHOpenModal ] = useState(false);
    const { setSinglePHILHEALTHDetailsData, singlePHILHEALTHDetailsData } = props;
    const ThisProps = props.singlePHILHEALTHDetailsData;
    const curr_user = useSelector((state: RootState)=> state.auth.employee_detail);
    const onClickModal = (mode: number) => {
        switch(mode){
            case 0: setResetPasswordPHILHEALTHOpenModal(true);
            break;
            case 1: setEditPHILHEALTHOpenModal(true);
            break;
        }   
        
    };

    return (
        <Fragment>
            <EditPHILHEALTHModal singlePHILHEALTHDetailsData={singlePHILHEALTHDetailsData} setSinglePHILHEALTHDetailsData={setSinglePHILHEALTHDetailsData} editPHILHEALTHOpenModal={editPHILHEALTHOpenModal} setEditPHILHEALTHOpenModal={setEditPHILHEALTHOpenModal}/>
            <div className='flex overflow-auto justify-around gap-4 relative'>
                <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px'}} label='Primary Key (ID):' value={ThisProps.id ? ThisProps.id : '-'} InputProps={{readOnly: true,}} variant='filled'/>
                    <TextField sx={{width: '100%'}} label='Monthly Contribution:' value={(ThisProps?.ph_contribution_month || '-')} InputProps={{readOnly: true,}} variant='standard'/>
                </div>
                <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px', color: 'green'}} label='PHILHEALTH #' value={ThisProps.ph_no || '-'} InputProps={{readOnly: true,}} variant='filled' focused/>
                    <TextField sx={{width: '100%'}} label='PHILHEALTH Category:' value={ThisProps.ph_category || '-'} InputProps={{readOnly: true,}} variant='standard'/>
                </div>
                <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px'}} label='Employee #:' value={ThisProps.emp_no || '-'} InputProps={{readOnly: true,}} variant='filled'/>
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

export default PHILHEALTHModalUI;