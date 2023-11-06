import { useState, Fragment, Dispatch, SetStateAction } from 'react';
import { EVALQUESTIONSViewInterface } from '@/types/types-employee-and-applicants';
import { Button } from '@mui/material';
import {TextField} from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import dayjs from 'dayjs';
import EditSubmitEVALQUESTIONSModal from '../main-modals/inner-modals/submit-changes-eval-questions-modal';
import DeactivateEVALQUESTIONSModal from '../main-modals/inner-modals/delete-eval-questions-modal';

interface EVALQUESTIONSModalUIInterface {
    singleEVALQUESTIONSDetailsData: EVALQUESTIONSViewInterface;
    multiplePayslipMode?: boolean;
    setSingleEVALQUESTIONSDetailsData: Dispatch<SetStateAction<EVALQUESTIONSViewInterface>>;
}

function EVALQUESTIONSModalUI(props: EVALQUESTIONSModalUIInterface) {
    const [ DeactivateEVALQUESTIONSOpenModal, setDeactivateEVALQUESTIONSOpenModal ] = useState(false);
    const [ EditSubmitEVALQUESTIONSOpenModal, setEditSubmitEVALQUESTIONSOpenModal ] = useState(false);
    const { setSingleEVALQUESTIONSDetailsData, singleEVALQUESTIONSDetailsData } = props;
    const ThisProps = props.singleEVALQUESTIONSDetailsData;
    const curr_user = useSelector((state: RootState)=> state.auth.employee_detail);

    

    const [editEVALQUESTIONS, setEditEVALQUESTIONS] = useState(false);
    return (
        <Fragment>
            <EditSubmitEVALQUESTIONSModal EditSubmitEVALQUESTIONSOpenModal={EditSubmitEVALQUESTIONSOpenModal} setEditSubmitEVALQUESTIONSOpenModal={setEditSubmitEVALQUESTIONSOpenModal} singleEVALQUESTIONSDetailsData={singleEVALQUESTIONSDetailsData} setSingleEVALQUESTIONSDetailsData={setSingleEVALQUESTIONSDetailsData} />
            <DeactivateEVALQUESTIONSModal DeactivateEVALQUESTIONSOpenModal={DeactivateEVALQUESTIONSOpenModal} setDeactivateEVALQUESTIONSOpenModal={setDeactivateEVALQUESTIONSOpenModal} singleEVALQUESTIONSDetailsData={singleEVALQUESTIONSDetailsData} setSingleEVALQUESTIONSDetailsData={setSingleEVALQUESTIONSDetailsData} />
            <div className='flex overflow-auto justify-around gap-4 relative'>
                <div className='flex gap-6 flex-col'>
                    <TextField 
                        sx={{width: '100%', minWidth: '160px'}} 
                        label='Eval Question ID:' value={ThisProps.id ? ThisProps.id : '-'} 
                        InputProps={{readOnly: true,}} 
                        variant='filled'
                    />
                    <TextField 
                        sx={{width: '100%'}} 
                        label='Question Description:' 
                        multiline 
                        rows={4} 
                        value={(ThisProps?.question)} 
                        onChange={(event) => {
                            const value = event.target.value;
                            setSingleEVALQUESTIONSDetailsData((prevState) => {
                                return (
                                    {
                                        ...prevState,
                                        question: value
                                    }
                                )
                            })
                        }}
                        InputProps={{readOnly: !editEVALQUESTIONS,}} 
                        focused={editEVALQUESTIONS}

                        variant='outlined'
                        
                        
                    />
                </div>
                <div className='flex gap-6 flex-col'>
                    <TextField 
                        sx={{width: '100%', minWidth: '160px'}} 
                        label='Added By Emp:' 
                        value={ThisProps.added_by || '-'} 
                        InputProps={{readOnly: true,}} 
                        variant='filled'
                    />

                </div>
                <div className='flex gap-6 flex-col'>
                    <TextField 
                        sx={{width: '100%'}} 
                        label='Date Deleted:' 
                        value={ThisProps.date_deleted? dayjs(ThisProps.date_deleted).format('MM-DD-YYYY - HH:mm a') : '-'} 
                        InputProps={{readOnly: true,}} 
                        variant='filled'
                    />
                    <TextField 
                        sx={{width: '100%'}} 
                        label='Date Added:' 
                        value={ThisProps.date_added? dayjs(ThisProps.date_added).format('MM-DD-YYYY - HH:mm a') : '-'} 
                        InputProps={{readOnly: true,}} 
                        variant='standard'
                    />
                </div>
            </div>
            <div className='flex flex-col justify-center items-center'>
                <div className='flex justify-center mt-6' container-name='leave_buttons_container'>
                    <div className='flex justify-center gap-6' style={{width:'400px', marginTop: '20px'}} container-name='leave_buttons'>
                        {!editEVALQUESTIONS && 
                            <Button variant='contained' onClick={()=> setEditEVALQUESTIONS(true)}>Edit Details</Button>
                        }
                        {editEVALQUESTIONS &&
                            <>
                            <Button variant='contained' onClick={()=> setEditSubmitEVALQUESTIONSOpenModal(true)}>Submit Details</Button>
                            <Button variant='contained' color={"warning"} onClick={()=> setEditEVALQUESTIONS(false)}>Cancel </Button>
                            <Button variant='outlined' color={"error"} onClick={()=> setDeactivateEVALQUESTIONSOpenModal(true)}>Delete</Button>
                            </>

                        }
                        {/* <Button variant='outlined' color={'error'} onClick={()=> onClickModal(0)}>Reset Password</Button> */}
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default EVALQUESTIONSModalUI;