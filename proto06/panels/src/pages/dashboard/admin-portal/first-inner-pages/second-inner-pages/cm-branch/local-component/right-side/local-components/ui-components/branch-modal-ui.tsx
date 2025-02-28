import { useState, Fragment, Dispatch, SetStateAction } from 'react';
import { BRANCHViewInterface } from '@/types/types-pages';
import { Button } from '@mui/material';
import dayjs from 'dayjs';
import {TextField} from '@mui/material';
// import ApproveBRANCHModal from '../main-modals/inner-modals/approve-leave-modal';
import AllowedDaysBRANCHModal from '../main-modals/inner-modals/edit-branch-modal';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import EmployeeListField from '@/public-components/EmployeeListField';

interface BRANCHModalUIInterface {
    singleBRANCHDetailsData: BRANCHViewInterface;
    setSingleBRANCHOpenModal: Dispatch<SetStateAction<boolean>>;
    multiplePayslipMode?: boolean;
    setSingleBRANCHDetailsData: Dispatch<SetStateAction<BRANCHViewInterface>>;
}

function BRANCHModalUI(props: BRANCHModalUIInterface) {
    const [ approveBRANCHOpenModal, setApproveBRANCHOpenModal ] = useState(false);
    const [ allowedDaysBRANCHOpenModal, setAllowedDaysBRANCHOpenModal ] = useState(false);
    const { setSingleBRANCHDetailsData, singleBRANCHDetailsData, setSingleBRANCHOpenModal } = props;
    const ThisProps = props.singleBRANCHDetailsData;
    const curr_user = useSelector((state: RootState)=> state.auth.employee_detail);
    const onClickModal = (mode: number) => {
        switch(mode){
            case 0: setApproveBRANCHOpenModal(true);
            break;
            case 1: setAllowedDaysBRANCHOpenModal(true);
            break;
        }   
        
    };

    const branchAddress = `${ThisProps.province_name}, ${ThisProps.city_name}, ${ThisProps.branch_address}`

    return (
        <Fragment>
            <AllowedDaysBRANCHModal 
                singleBRANCHDetailsData={singleBRANCHDetailsData} 
                setSingleBRANCHDetailsData={setSingleBRANCHDetailsData} 
                allowedDaysBRANCHOpenModal={allowedDaysBRANCHOpenModal} 
                setAllowedDaysBRANCHOpenModal={setAllowedDaysBRANCHOpenModal}
                setSingleBRANCHOpenModal={setSingleBRANCHOpenModal}
            />
            <div className='flex flex-col gap-8 overflow-auto relative'>
     
                {/* <TextField sx={{width: '100%', minWidth: '160px'}} label='Branch ID:' value={ThisProps.id ? ThisProps.id : '-'} InputProps={{readOnly: true,}} variant='filled'/> */}
                <TextField sx={{width: '100%', minWidth: '160px', color: 'green'}} label='Branch Name' value={ThisProps.branch_name || '-'} InputProps={{readOnly: true,}} variant='filled' focused/>     
                <TextField sx={{width: '100%'}} label='Branch Email' value={(ThisProps?.branch_email || "-")} InputProps={{readOnly: true,}} variant='standard'/>
                <TextField sx={{width: '100%'}} label='Branch Contact #' value={(ThisProps?.branch_contact_number || 0)} InputProps={{readOnly: true,}} variant='standard'/>
                <TextField sx={{width: '100%'}} label='Date Added:' value={ThisProps.date_added? dayjs(ThisProps.date_added).format('MM-DD-YYYY - HH:mm a') : '-'} InputProps={{readOnly: true,}} variant='standard'/>
                <TextField sx={{width: '100%', minWidth: '160px'}} label='Branch OIC' value={ThisProps.branch_oic || '-'} InputProps={{readOnly: true,}} variant='standard'/>
                <TextField sx={{width: '100%', minWidth: '160px'}} multiline rows={3} label='Branch Address' value={branchAddress || '-'} InputProps={{readOnly: true,}} variant='standard'/>
        
                <TextField sx={{width: '100%', minWidth: '160px'}} label='Approver 1' value={ThisProps?.approver1 || '-'} InputProps={{readOnly: true,}} variant='standard'/>
                <TextField sx={{width: '100%', minWidth: '160px'}} label='Approver 2' value={ThisProps?.approver2 || '-'} InputProps={{readOnly: true,}} variant='standard'/>
                <TextField sx={{width: '100%', minWidth: '160px'}} label='Approver 3' value={ThisProps?.approver3 || '-'} InputProps={{readOnly: true,}} variant='standard'/>

            </div>
            <div className='flex flex-col justify-center items-center'>
                <div className='flex justify-center mt-6' container-name='leave_buttons_container'>
                    <div className='flex justify-between' style={{width:'200px', marginTop: '20px'}} container-name='leave_buttons'>
                        <Button variant='contained' onClick={()=> onClickModal(1)}>Edit Branch Details</Button>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default BRANCHModalUI;