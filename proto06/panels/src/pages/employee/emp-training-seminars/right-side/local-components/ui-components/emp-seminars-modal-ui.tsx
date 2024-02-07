import { useState, Fragment, Dispatch, SetStateAction } from 'react';
import { EMPSEMINARSViewInterface } from '@/types/types-employee-and-applicants';
import { Button } from '@mui/material';
import dayjs from 'dayjs';
import {TextField} from '@mui/material';
import AllowedDaysEMPSEMINARSModal from '../main-modals/inner-modals/schedule-daily-allowed-days-modal';
import { globalDate } from '@/store/configureStore';

interface EMPSEMINARSModalUIInterface {
    singleEMPSEMINARSDetailsData: EMPSEMINARSViewInterface;
    multiplePayslipMode?: boolean;
    setSingleEMPSEMINARSDetailsData: Dispatch<SetStateAction<EMPSEMINARSViewInterface>>;
}

function EMPSEMINARSModalUI(props: EMPSEMINARSModalUIInterface) {
    const [ approveEMPSEMINARSOpenModal, setApproveEMPSEMINARSOpenModal ] = useState(false);
    const [ allowedDaysEMPSEMINARSOpenModal, setAllowedDaysEMPSEMINARSOpenModal ] = useState(false);
    const { setSingleEMPSEMINARSDetailsData, singleEMPSEMINARSDetailsData } = props;
    const ThisProps = props.singleEMPSEMINARSDetailsData;
    const onClickModal = (mode: number) => {
        switch(mode){
            case 0: setApproveEMPSEMINARSOpenModal(true);
            break;
            case 1: setAllowedDaysEMPSEMINARSOpenModal(true);
            break;
        }
    };


    return (
        <Fragment>
            {/* { singleEMPSEMINARSDetailsData &&
                <AllowedDaysEMPSEMINARSModal 
                    singleEMPSEMINARSDetailsData={singleEMPSEMINARSDetailsData} 
                    setSingleEMPSEMINARSDetailsData={setSingleEMPSEMINARSDetailsData} 
                    allowedDaysEMPSEMINARSOpenModal={allowedDaysEMPSEMINARSOpenModal} 
                    setAllowedDaysEMPSEMINARSOpenModal={setAllowedDaysEMPSEMINARSOpenModal}
                />
            } */}
            <div className='flex gap-10 overflow-auto relative'>
                <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px'}} label='Date Accomplished:' value={ThisProps.date_accomplished ? dayjs(ThisProps.date_accomplished).format(`${globalDate}`) : '-'} InputProps={{readOnly: false,}} variant='filled'/>
                    <TextField sx={{width: '100%', minWidth: '160px'}} label='Category:' value={ThisProps.category || '-'} InputProps={{readOnly: true,}} multiline rows={3} variant='outlined'/>

                </div>
                <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px', color: 'green'}} label='emp_no' value={ThisProps.emp_no || '-'} InputProps={{readOnly: true,}} variant='filled' focused/>
                </div>
                <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px'}} label='Category:' value={ThisProps.category || '-'} InputProps={{readOnly: true,}} variant='filled'/>
                </div>
            </div>
            <div className='flex flex-col justify-center items-center'>
            <div className='flex justify-center mt-12' container-name='leave_buttons_container'>
                <div className='flex justify-between' style={{width:'200px', marginTop: '20px'}} container-name='leave_buttons'>
                    {/* <Button variant='contained' onClick={()=> onClickModal(1)}>Edit Daily Schedule</Button> */}
                </div>
            </div>
            </div>
        </Fragment>
    );
}

export default EMPSEMINARSModalUI;