import { useState, Fragment, Dispatch, SetStateAction } from 'react';
import { CORECOMPEViewInterface } from '@/types/types-employee-and-applicants';
import { Button } from '@mui/material';
import {TextField} from '@mui/material';
import dayjs from 'dayjs';
import DeactivateCORECOMPEModal from '../main-modals/inner-modals/delete-core-compe-modal';
import EditSubmitCORECOMPEModal from '../main-modals/inner-modals/submit-changes-core-compe-modal';

interface CORECOMPEModalUIInterface {
    singleCORECOMPEDetailsData: CORECOMPEViewInterface;
    multiplePayslipMode?: boolean;
    setSingleCORECOMPEDetailsData: Dispatch<SetStateAction<CORECOMPEViewInterface>>;
}

function CORECOMPEModalUI(props: CORECOMPEModalUIInterface) {
    const [ editCORECOMPEOpenModal, setEditCORECOMPEOpenModal ] = useState(true);
    const { setSingleCORECOMPEDetailsData, singleCORECOMPEDetailsData } = props;
    const ThisProps = props.singleCORECOMPEDetailsData;

    const [DeactivateCORECOMPEOpenModal, setDeactivateCORECOMPEOpenModal] = useState(false);
    const [EditSubmitCORECOMPEOpenModal, setEditSubmitCORECOMPEOpenModal] = useState(false);

    return (
        <Fragment>
            <EditSubmitCORECOMPEModal EditSubmitCORECOMPEOpenModal={EditSubmitCORECOMPEOpenModal} setEditSubmitCORECOMPEOpenModal={setEditSubmitCORECOMPEOpenModal} singleCORECOMPEDetailsData={singleCORECOMPEDetailsData} setSingleCORECOMPEDetailsData={setSingleCORECOMPEDetailsData} />
            <DeactivateCORECOMPEModal DeactivateCORECOMPEOpenModal={DeactivateCORECOMPEOpenModal} setDeactivateCORECOMPEOpenModal={setDeactivateCORECOMPEOpenModal} singleCORECOMPEDetailsData={singleCORECOMPEDetailsData} setSingleCORECOMPEDetailsData={setSingleCORECOMPEDetailsData} />
            <div className='flex overflow-auto gap-4 relative'>
                <div className='flex gap-6 flex-col'>
                    <TextField 
                        sx={{width: '100%', minWidth: '230px'}} 
                        label='Core Competency ID:' 
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
                    <div className='' style={{display: 'flex', gap: 20, marginTop: '20px'}} container-name='leave_buttons'>
                        {
                        editCORECOMPEOpenModal && 
                        <Button variant='contained' onClick={() => setEditCORECOMPEOpenModal(false)}>Edit Details</Button>
                        }
                        {
                        !editCORECOMPEOpenModal &&
                            <>
                            <Button variant='contained' onClick={ () => setEditSubmitCORECOMPEOpenModal(true)}>Submit Changes</Button>
                            <Button variant='contained' color={"warning"} onClick={() => setEditCORECOMPEOpenModal(true)}>Cancel</Button>
                            <Button variant='outlined' color={"error"} onClick={() => setDeactivateCORECOMPEOpenModal(true)}>Delete</Button>
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