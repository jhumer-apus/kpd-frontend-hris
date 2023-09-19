import { useState, Fragment, Dispatch, SetStateAction } from 'react';
import { PAY13THViewInterface } from '@/types/types-payroll-eoy';
import {TextField} from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import dayjs from 'dayjs';

interface PAY13THModalUIInterface {
    singlePAY13THDetailsData: PAY13THViewInterface;
    multiplePayslipMode?: boolean;
    setSinglePAY13THDetailsData: Dispatch<SetStateAction<PAY13THViewInterface>>;
}

function PAY13THModalUI(props: PAY13THModalUIInterface) {
    const [ resetPasswordPAY13THOpenModal, setResetPasswordPAY13THOpenModal ] = useState(false);
    const [ editPAY13THOpenModal, setEditPAY13THOpenModal ] = useState(false);
    const { setSinglePAY13THDetailsData, singlePAY13THDetailsData } = props;
    const ThisProps = props.singlePAY13THDetailsData;
    const curr_user = useSelector((state: RootState)=> state.auth.employee_detail);
    const onClickModal = (mode: number) => {
        switch(mode){
            case 0: setResetPasswordPAY13THOpenModal(true);
            break;
            case 1: setEditPAY13THOpenModal(true);
            break;
        }   
        
    };

    return (
        <Fragment>
            <div className='flex overflow-auto justify-around gap-4 relative'>
                <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px'}} label='Total Pay:' value={ThisProps.total_pay ? (ThisProps.total_pay).toFixed(2) : '-'} InputProps={{readOnly: true,}} variant='filled'/>
                    <TextField sx={{width: '100%'}} label='Is Printed:' value={(ThisProps?.is_printed ? `Yes` : `No`)} InputProps={{readOnly: true,}} variant='standard'/>
                </div>
                <div className='flex gap-6 flex-col'>
                <TextField sx={{width: '100%'}} label='Coverage From:' value={ThisProps.coverage_from? dayjs(ThisProps.coverage_from).format('MM-DD-YYYY - HH:mm a') : '-'} InputProps={{readOnly: true,}} variant='filled'/>
                    <TextField sx={{width: '100%'}} label='Coverage To:' value={ThisProps.coverage_to? dayjs(ThisProps.coverage_to).format('MM-DD-YYYY - HH:mm a') : '-'} InputProps={{readOnly: true,}} variant='standard'/>
                </div>
                <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px'}} label='Employee #:' value={ThisProps.emp_no || '-'} InputProps={{readOnly: true,}} variant='filled'/>
                    <TextField sx={{width: '100%'}} label='Pay13th ID:' value={ThisProps.id || '-'} InputProps={{readOnly: true,}} variant='standard'/>
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

export default PAY13THModalUI;