import { useState, Fragment, Dispatch, SetStateAction } from 'react';
import { ONBOARDINGREQUIREMENTSViewInterface } from '@/types/types-employee-and-applicants';
import { Button } from '@mui/material';
import {TextField} from '@mui/material';
import dayjs from 'dayjs';
import EditSubmitONBOARDINGREQUIREMENTSModal from '../main-modals/inner-modals/submit-changes-onboarding-req-modal';
import DeactivateONBOARDINGREQUIREMENTSModal from '../main-modals/inner-modals/delete-onboarding-req-modal';

interface ONBOARDINGREQUIREMENTSModalUIInterface {
    singleONBOARDINGREQUIREMENTSDetailsData: ONBOARDINGREQUIREMENTSViewInterface;
    multiplePayslipMode?: boolean;
    setSingleONBOARDINGREQUIREMENTSDetailsData: Dispatch<SetStateAction<ONBOARDINGREQUIREMENTSViewInterface>>;
}

function ONBOARDINGREQUIREMENTSModalUI(props: ONBOARDINGREQUIREMENTSModalUIInterface) {


    const { setSingleONBOARDINGREQUIREMENTSDetailsData, singleONBOARDINGREQUIREMENTSDetailsData } = props;
    const ThisProps = props.singleONBOARDINGREQUIREMENTSDetailsData;

    const [ submitModalOpen, setSubmitModalOpen ] = useState(false);
    const [ deleteModalOpen, setDeleteModalOpen ] = useState(false);

    const [ editDetailsMode, setEditDetailsMode ] = useState(false);
    return (
        <Fragment>
            <div className='flex overflow-auto justify-around gap-4 relative'>
                <div className='flex gap-6 flex-col'>
                    <EditSubmitONBOARDINGREQUIREMENTSModal 
                        initialState={singleONBOARDINGREQUIREMENTSDetailsData} 
                        setInitialState={setSingleONBOARDINGREQUIREMENTSDetailsData}
                        openModal={submitModalOpen}
                        setOpenModal={setSubmitModalOpen}
                    />
                    <DeactivateONBOARDINGREQUIREMENTSModal
                        initialState={singleONBOARDINGREQUIREMENTSDetailsData} 
                        setInitialState={setSingleONBOARDINGREQUIREMENTSDetailsData}
                        openModal={deleteModalOpen}
                        setOpenModal={setDeleteModalOpen}
                    />
                    <TextField 
                        sx={{width: '100%', minWidth: '160px'}} 
                        label='Onboarding Requirement ID:' 
                        value={ThisProps.id ? ThisProps.id : '-'} 
                        InputProps={{readOnly: true,}} 
                        variant='filled'
                    />
                    <TextField 
                        sx={{width: '100%'}} 
                        label='Onboarding Requirement Title:' 
                        multiline 
                        rows={5} 
                        value={ThisProps?.onboarding_title} 
                        onChange={(event) => {
                            setSingleONBOARDINGREQUIREMENTSDetailsData((prevState)=> {
                                const value = event.target.value;
                                return({
                                    ...prevState,
                                    onboarding_title: value
                                })
                            })
                        }}
                        InputProps={{readOnly: !editDetailsMode,}} 
                        variant='outlined'
                        focused={editDetailsMode}
                    />
                </div>
                <div className='flex gap-6 flex-col'>
                    <TextField 
                        sx={{width: '100%', minWidth: '160px', color: 'green'}} 
                        label='Facilitator Emp #:' 
                        type='number'
                        value={ThisProps.facilitator} 
                        onChange={(event)=> {
                            setSingleONBOARDINGREQUIREMENTSDetailsData((prevState) => {
                                const value = event.target.value;
                                return({
                                    ...prevState,
                                    facilitator: +(value) 
                                })
                            })
                        }}
                        InputProps={{readOnly: !editDetailsMode,}} 
                        variant='filled'
                        focused={editDetailsMode}
                    />
                    <TextField 
                        sx={{width: '100%'}} 
                        label='Date Deleted:' 
                        value={ThisProps.date_deleted? dayjs(ThisProps.date_deleted).format('MM-DD-YYYY - HH:mm a') : '-'} 
                        InputProps={{readOnly: true,}} 
                        variant='standard'
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
                        {
                            !editDetailsMode &&
                            <Button variant='contained' onClick={()=> setEditDetailsMode(true)}>Edit Details</Button>

                        }
                        {
                            editDetailsMode &&
                            <>
                            <Button variant='contained' onClick={()=> setSubmitModalOpen(true)}>Submit Changes</Button>
                            <Button variant='contained' color="warning" onClick={()=> setEditDetailsMode(false)}>Cancel</Button>
                            <Button variant='outlined' color="error" onClick={()=> setDeleteModalOpen(true)}>Delete</Button>

                            </>
                        }
                        {/* <Button variant='outlined' color={'error'} onClick={()=> onClickModal(0)}>Reset Password</Button> */}
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default ONBOARDINGREQUIREMENTSModalUI;