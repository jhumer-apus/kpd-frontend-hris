import { useState, Fragment, Dispatch, SetStateAction } from 'react';
import { CORECOMPEViewInterface } from '@/types/types-employee-and-applicants';
import { Button } from '@mui/material';
import {TextField} from '@mui/material';
import EditCORECOMPEModal from '../main-modals/inner-modals/edit-asset-list-modal';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import dayjs from 'dayjs';

interface CORECOMPEModalUIInterface {
    singleCORECOMPEDetailsData: CORECOMPEViewInterface;
    multiplePayslipMode?: boolean;
    setSingleCORECOMPEDetailsData: Dispatch<SetStateAction<CORECOMPEViewInterface>>;
}

function CORECOMPEModalUI(props: CORECOMPEModalUIInterface) {
    const dispatch = useDispatch();
    const [ editCORECOMPEOpenModal, setEditCORECOMPEOpenModal ] = useState(true);
    const { setSingleCORECOMPEDetailsData, singleCORECOMPEDetailsData } = props;
    const ThisProps = props.singleCORECOMPEDetailsData;
    const curr_user = useSelector((state: RootState)=> state.auth.employee_detail);
    const submitChanges = () => {
        
    };

    return (
        <Fragment>
            {/* <EditCORECOMPEModal singleCORECOMPEDetailsData={singleCORECOMPEDetailsData} setSingleCORECOMPEDetailsData={setSingleCORECOMPEDetailsData} editCORECOMPEOpenModal={editCORECOMPEOpenModal} setEditCORECOMPEOpenModal={setEditCORECOMPEOpenModal}/> */}
            <div className='flex overflow-auto gap-4 relative'>
                <div className='flex gap-6 flex-col'>
                    <TextField 
                        sx={{width: '100%', minWidth: '230px'}} 
                        label='Asset ID:' 
                        value={ThisProps.id} 
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
                <div className='flex gap-6 flex-col'>
                    <TextField 
                        sx={{width: '100%', minWidth: '230px', color: 'green'}} 
                        label='Core Name:' 
                        value={ThisProps.checklist_title || '-'} 
                        onChange={(event: React.ChangeEvent<HTMLInputElement>)=> {
                            const value = event.target.value;
                            return (
                                setSingleCORECOMPEDetailsData((prevState)=>{
                                    return(
                                        {
                                            ...prevState,
                                            checklist_title: value
                                        }
                                    )
                                })
                            )
                        }}
                        InputProps={{readOnly: editCORECOMPEOpenModal,}} 
                        variant='filled'
                        focused={!editCORECOMPEOpenModal}
                    />
                    <TextField 
                        sx={{width: '100%', minWidth: '180px', color: 'green'}} 
                        label='Core Limits:' 
                        multiline 
                        rows={4} 
                        value={ThisProps.checklist_limit || '-'}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>)=> {
                            const value = event.target.value;
                            return (
                                setSingleCORECOMPEDetailsData((prevState)=>{
                                    return(
                                        {
                                            ...prevState,
                                            checklist_limit: value
                                        }
                                    )
                                })
                            )
                        }} 
                        InputProps={{readOnly: editCORECOMPEOpenModal,}} 
                        variant='outlined'
                        focused={!editCORECOMPEOpenModal}
                    />
                </div>
                <div className='flex gap-6 flex-col'>
                    <TextField 
                        sx={{width: '100%', minWidth: '180px'}} 
                        label='Added By Emp:' 
                        value={ThisProps.added_by || '-'} 
                        InputProps={{readOnly: true,}} 
                        variant='filled'
                    />

                    <TextField 
                        sx={{width: '100%'}} 
                        label='Date Deleted:' 
                        value={ThisProps.date_deleted ? dayjs(ThisProps.date_deleted).format('MM-DD-YYYY - HH:mm a') : '-'} 
                        InputProps={{readOnly: true,}} 
                        variant='standard'
                    />

                </div>
            </div>
            <div className='flex flex-col justify-center items-center'>
                <div className='mt-6' container-name='leave_buttons_container'>
                    <div className='' style={{width:'100%', marginTop: '20px'}} container-name='leave_buttons'>
                        {
                        editCORECOMPEOpenModal && 
                        <Button variant='contained' onClick={() => setEditCORECOMPEOpenModal(false)}>Edit Details</Button>
                        }
                        {
                        !editCORECOMPEOpenModal &&
                            <>
                            <Button variant='contained' onClick={onClickModal}>Submit Changes</Button>
                            <Button variant='contained' color={"warning"} onClick={() => setEditCORECOMPEOpenModal(true)}>Cancel</Button>
                            <Button variant='outlined' color={"error"} onClick={onClickModal}>Delete</Button>
                            </>                            
                        }
                        {/* <Button variant='outlined' color={'error'} onClick={()=> onClickModal(0)}>Reset Password</Button> */}
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default CORECOMPEModalUI;