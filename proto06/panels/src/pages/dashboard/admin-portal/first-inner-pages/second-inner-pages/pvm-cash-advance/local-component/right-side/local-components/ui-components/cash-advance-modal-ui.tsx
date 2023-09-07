import { useState, Fragment, Dispatch, SetStateAction } from 'react';
import { CASHADVANCEViewInterface } from '@/types/types-payroll-variables';
import { Button } from '@mui/material';
import {TextField} from '@mui/material';
import EditCASHADVANCEModal from '../main-modals/inner-modals/edit-philhealth-modal';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';

interface CASHADVANCEModalUIInterface {
    singleCASHADVANCEDetailsData: CASHADVANCEViewInterface;
    multiplePayslipMode?: boolean;
    setSingleCASHADVANCEDetailsData: Dispatch<SetStateAction<CASHADVANCEViewInterface>>;
}

function CASHADVANCEModalUI(props: CASHADVANCEModalUIInterface) {
    const [ resetPasswordCASHADVANCEOpenModal, setResetPasswordCASHADVANCEOpenModal ] = useState(false);
    const [ editCASHADVANCEOpenModal, setEditCASHADVANCEOpenModal ] = useState(false);
    const { setSingleCASHADVANCEDetailsData, singleCASHADVANCEDetailsData } = props;
    const ThisProps = props.singleCASHADVANCEDetailsData;
    const curr_user = useSelector((state: RootState)=> state.auth.employee_detail);
    const onClickModal = (mode: number) => {
        switch(mode){
            case 0: setResetPasswordCASHADVANCEOpenModal(true);
            break;
            case 1: setEditCASHADVANCEOpenModal(true);
            break;
        }   
        
    };

    return (
        <Fragment>
            {/* <EditCASHADVANCEModal singleCASHADVANCEDetailsData={singleCASHADVANCEDetailsData} setSingleCASHADVANCEDetailsData={setSingleCASHADVANCEDetailsData} editCASHADVANCEOpenModal={editCASHADVANCEOpenModal} setEditCASHADVANCEOpenModal={setEditCASHADVANCEOpenModal}/> */}
            <div className='flex overflow-auto justify-around gap-4 relative'>
                <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px'}} label='Total CA:' value={ThisProps.cash_advance_total ? ThisProps.cash_advance_total : '-'} InputProps={{readOnly: true,}} variant='filled'/>
                    <TextField sx={{width: '100%'}} label='Employee #:' value={(ThisProps?.emp_no || '-')} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%'}} label='Primary Key:' value={(ThisProps?.id || '-')} InputProps={{readOnly: true,}} variant='standard'/>

                </div>
                <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px', color: 'green'}} label='CASHADVANCE #' value={ThisProps.ph_no || '-'} InputProps={{readOnly: true,}} variant='filled' focused/>
                    <TextField sx={{width: '100%'}} label='CASHADVANCE Category:' value={ThisProps.ph_category || '-'} InputProps={{readOnly: true,}} variant='standard'/>
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

export default CASHADVANCEModalUI;