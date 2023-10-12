import React, { useRef, useState } from 'react';
import { KPICOREViewInterface } from '@/types/types-employee-and-applicants';
import { convertDaysToHHMM, convertMinutesToHHMM,  } from '@/helpers/utils';
import { Button } from '@mui/material';
import dayjs from 'dayjs';
import {TextField} from '@mui/material';
import ApproveKPICOREModal from '../main-modals/inner-modals/approve-obt-modal';
import DenyKPICOREModal from '../main-modals/inner-modals/deny-obt-modal';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';

interface KPICOREModalUIInterface {
    singleKPICOREDetailsData: KPICOREViewInterface;
    multiplePayslipMode?: boolean;
    setSingleKPICOREDetailsData: React.Dispatch<React.SetStateAction<KPICOREViewInterface>>;
}

function KPICOREModalUI(props: KPICOREModalUIInterface) {
    const [ approveKPICOREOpenModal, setApproveKPICOREOpenModal ] = useState(false);
    const [ denyKPICOREOpenModal, setDenyKPICOREOpenModal ] = useState(false);
    const { setSingleKPICOREDetailsData, singleKPICOREDetailsData } = props;
    const ThisProps = props.singleKPICOREDetailsData;
    const curr_user = useSelector((state: RootState)=> state.auth.employee_detail);
    const onClickModal = (mode: number) => {
        switch(mode){
            case 0: setApproveKPICOREOpenModal(true);
            break;
            case 1: setDenyKPICOREOpenModal(true);
            break;
        }   
        
    };
    
    const [saveChangesButton, setSaveChangesButton] = useState<boolean>(false); 

    const buttonAction = () => {
        if(singleKPICOREDetailsData.status === "Confirmed"){
            window.alert("You cannot modify this already confirmed document.")
            return
        }else{
            setSaveChangesButton(!saveChangesButton);
            //submit changes or dispatch post action
        }
        // setSaveChangesButton(!saveChangesButton);
    }
    return (
        <React.Fragment>
            {/* <ApproveKPICOREModal singleKPICOREDetailsData={singleKPICOREDetailsData} setSingleKPICOREDetailsData={setSingleKPICOREDetailsData} approveKPICOREOpenModal={approveKPICOREOpenModal} setApproveKPICOREOpenModal={setApproveKPICOREOpenModal}/>
            <DenyKPICOREModal singleKPICOREDetailsData={singleKPICOREDetailsData} setSingleKPICOREDetailsData={setSingleKPICOREDetailsData} denyKPICOREOpenModal={denyKPICOREOpenModal} setDenyKPICOREOpenModal={setDenyKPICOREOpenModal}/> */}
            <div className='flex justify-end'>
                <div className='flex justify-center mt-6' container-name='obt_buttons_container'>
                    <div className='flex justify-between' style={{width:'300px'}} container-name='obt_buttons'>
                        <Button variant='contained' sx={{display: `${saveChangesButton ? 'none': 'block'}`}} aria-hidden={saveChangesButton} hidden={saveChangesButton} onClick={buttonAction}>Input Details</Button>
                        <Button variant='outlined' sx={{display: `${!saveChangesButton ? 'none': 'block'}`}} aria-hidden={!saveChangesButton} hidden={!saveChangesButton} onClick={buttonAction}>Submit Changes</Button>
                    </div>
                </div>
            </div>
            
            <div className='flex gap-10 overflow-auto relative'>
                <div className='flex gap-10 flex-col mt-4 w-full'>
                    {
                        singleKPICOREDetailsData?.questions?.map((item, index) => {
                            return(
                                <>
                                <TextField sx={{width: '100%'}} label={`Question #${index + 1}`} value={item.question} InputProps={{readOnly: true,}} variant='filled' multiline rows={2}/>
                                <TextField sx={{width: '100%', fontStyle: 'italic'}} label={`Answer to #${index + 1}`} value={item.answer} InputProps={{readOnly: true,}} variant='outlined' multiline rows={2}/>
                                <div className='flex justify-center gap-20'>
                                <TextField sx={{width: '20%'}} label={`Self-Eval Points #${index + 1}`} value={item.self_eval_points} InputProps={{readOnly: true,}} variant='outlined' />
                                <TextField sx={{width: '20%'}} label={`Supervisor Points #${index + 1}`} value={item.sup_eval_points} InputProps={{readOnly: true,}} variant='outlined' />
                                </div>

                                </>
                            )
                        })
                    }
                    {
                        singleKPICOREDetailsData?.core_competencies?.map((item, index) => {
                            return(
                                <>
                                <TextField sx={{width: '100%'}} label={`Competency #${index + 1}`} value={item.checklist_title} InputProps={{readOnly: true,}} variant='filled' multiline rows={2}/>
                                <div className='flex justify-center gap-20'>
                                <TextField sx={{width: '100%', fontStyle: 'italic'}} label={`Limits For Core#${index + 1}`} value={item.checklist_limits} InputProps={{readOnly: true,}} variant='outlined'/>

                                {/* <TextField sx={{width: '20%'}} label={`Self-Eval Points #${index + 1}`} value={item.self_eval_points} InputProps={{readOnly: true,}} variant='outlined' /> */}
                                <TextField sx={{width: '20%'}} label={`CL Points #${index + 1}`} value={item.points} InputProps={{readOnly: true,}} variant='outlined' />
                                </div>

                                </>
                            )
                        })
                    }
                </div>
                {/* <div className='flex gap-6 flex-col mt-4'>
                    {
                        singleKPICOREDetailsData?.questions?.map((item, index) => {
                            return(
                                <TextField sx={{width: '100%'}} label={`Answer to #${index + 1}`} value={item.answer} InputProps={{readOnly: true,}} variant='outlined' multiline rows={10}/>
                            )
                        })
                    }
                </div>
                <div className='flex gap-6 flex-col mt-4'>
                    {
                        singleKPICOREDetailsData?.questions?.map((item, index) => {
                            return(
                                <TextField sx={{width: '100%'}} label={`Self-Eval Points #${index + 1}`} value={item.self_eval_points} InputProps={{readOnly: true,}} variant='outlined' multiline rows={10}/>
                            )
                        })
                    }
                </div> */}

            </div>



        </React.Fragment>
    );
}

export default KPICOREModalUI;