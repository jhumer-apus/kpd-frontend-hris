import { useState, Fragment, Dispatch, SetStateAction, ChangeEvent, useEffect } from 'react';
import { JOBPOSTINGSViewInterface } from '@/types/types-employee-and-applicants';
import { Button } from '@mui/material';
import {TextField} from '@mui/material';
import EditJOBPOSTINGSModal from '../main-modals/inner-modals/edit-asset-list-modal';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import dayjs from 'dayjs';
import { JOBPOSTINGSEditAction } from '@/store/actions/employee-and-applicants';
import DeleteJOBPOSTINGSModal from './delete-modal';

interface JOBPOSTINGSModalUIInterface {
    singleJOBPOSTINGSDetailsData: JOBPOSTINGSViewInterface;
    multiplePayslipMode?: boolean;
    setSingleJOBPOSTINGSDetailsData: Dispatch<SetStateAction<JOBPOSTINGSViewInterface>>;
}

function JOBPOSTINGSModalUI(props: JOBPOSTINGSModalUIInterface) {
    const [ deleteJOBPOSTINGSOpenModal, setDeleteJOBPOSTINGSOpenModal ] = useState(false);
    const { setSingleJOBPOSTINGSDetailsData, singleJOBPOSTINGSDetailsData } = props;
    const ThisProps = props.singleJOBPOSTINGSDetailsData;
    const curr_user = useSelector((state: RootState)=> state.auth.employee_detail);

    const dispatch = useDispatch();
    const JOBPOSTINGSEditState = useSelector((state: RootState)=> state.employeeAndApplicants.JOBPOSTINGSEdit)  
  
    const submitEditJOBPOSTINGS = () => { 
        setViewMode(true)
        dispatch(JOBPOSTINGSEditAction({
            ...singleJOBPOSTINGSDetailsData,
            added_by: curr_user?.emp_no
        }))
    }
  
    useEffect(()=>{
      if(JOBPOSTINGSEditState.status){      
        if(JOBPOSTINGSEditState.status === 'succeeded'){
          window.alert(`${JOBPOSTINGSEditState.status.charAt(0).toUpperCase()}${JOBPOSTINGSEditState.status.slice(1)}`)
          setTimeout(()=>{
            window.location.reload();
          }, 800)
        }else if(JOBPOSTINGSEditState.status === 'failed'){
          window.alert(`${JOBPOSTINGSEditState.error}`)
        }
      }
    }, [JOBPOSTINGSEditState.status])

    const [viewMode, setViewMode] = useState(true);

    return (
        <Fragment>
            {/* <EditJOBPOSTINGSModal singleJOBPOSTINGSDetailsData={singleJOBPOSTINGSDetailsData} setSingleJOBPOSTINGSDetailsData={setSingleJOBPOSTINGSDetailsData} editJOBPOSTINGSOpenModal={editJOBPOSTINGSOpenModal} setEditJOBPOSTINGSOpenModal={setEditJOBPOSTINGSOpenModal}/> */}
            <div className='flex overflow-auto gap-4 relative'>
                <div className='flex gap-6 flex-col' style={{width: '50%'}}>
                    <TextField 
                        sx={{width: '100%'}} 
                        label='Job Posting ID:' 
                        value={ThisProps.id ? ThisProps.id : '-'} 
                        InputProps={{readOnly: true,}} 
                        variant='filled'
                    />
                    <TextField 
                        sx={{width: '100%'}} 
                        label='Salary Range' 
                        value={(ThisProps?.job_salary_range ? `${ThisProps?.job_salary_range}` : '-')} 
                        InputProps={{readOnly: viewMode,}}
                        disabled={viewMode}
                        aria-disabled={viewMode}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            setSingleJOBPOSTINGSDetailsData((prevState) => {
                                const value = (event.target.value)
                                return ({
                                    ...prevState,
                                    job_salary_range: value
                                })
                            })
                        }} 
                        variant='outlined'
                    />
                    <TextField 
                        sx={{width: '100%'}} 
                        label='Job Description:' 
                        disabled={viewMode}
                        aria-disabled={viewMode}
                        multiline 
                        rows={7} 
                        value={(ThisProps?.job_description ? `${ThisProps?.job_description}` : '-')} 
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            setSingleJOBPOSTINGSDetailsData((prevState) => {
                                const value = (event.target.value)
                                return ({
                                    ...prevState,
                                    job_description: value
                                })
                            })
                        }} 
                        InputProps={{readOnly: viewMode,}} 
                        variant='outlined'
                    />
                    <TextField 
                        sx={{width: '100%'}} 
                        label='Job Objectives:' 
                        disabled={viewMode}
                        aria-disabled={viewMode}
                        multiline 
                        rows={7} 
                        value={(ThisProps?.objectives ? `${ThisProps?.objectives}` : '-')} 
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            setSingleJOBPOSTINGSDetailsData((prevState) => {
                                const value = (event.target.value)
                                return ({
                                    ...prevState,
                                    objectives: value
                                })
                            })
                        }} 
                        InputProps={{readOnly: viewMode,}} 
                        variant='outlined'
                    />
                    <TextField 
                        sx={{width: '100%'}} 
                        label='Date Deleted:' 
                        value={ThisProps.date_deleted? dayjs(ThisProps.date_deleted).format('MM-DD-YYYY - HH:mm a') : '-'} 
                        InputProps={{readOnly: true,}} 
                        variant='standard'
                    />
                </div>
                <div className='flex gap-6 flex-col' style={{width: '50%'}}>
                    <TextField 
                        sx={{width: '100%'}} 
                        label='Position Name:' 
                        value={ThisProps.position_title ? `${ThisProps.position_title}`: '-'} 
                        InputProps={{readOnly: true,}} 
                        variant='filled'
                    />
                    <TextField 
                        sx={{width: '100%'}} 
                        label='Position Code' 
                        value={(ThisProps?.position_code ? `${ThisProps?.position_code}` : '-')} 
                        InputProps={{readOnly: viewMode,}}
                        disabled={viewMode}
                        aria-disabled={viewMode} 
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            setSingleJOBPOSTINGSDetailsData((prevState) => {
                                const value = +(event.target.value)
                                return ({
                                    ...prevState,
                                    position_code: value
                                })
                            })
                        }} 
                        variant='outlined'
                    />
                    <TextField 
                        sx={{width: '100%'}} 
                        label='Qualifications:' 
                        multiline rows={7} 
                        value={(ThisProps?.qualifications ? `${ThisProps?.qualifications}` : '-')} 
                        InputProps={{readOnly: viewMode,}} 
                        disabled={viewMode}
                        aria-disabled={viewMode}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            setSingleJOBPOSTINGSDetailsData((prevState) => {
                                const value = (event.target.value)
                                return ({
                                    ...prevState,
                                    qualifications: value
                                })
                            })
                        }} 
                        variant='outlined'
                    />
                    <TextField 
                        sx={{width: '100%'}} 
                        label='Job Responsibilities:' 
                        disabled={viewMode}
                        aria-disabled={viewMode}
                        multiline 
                        rows={7} 
                        value={(ThisProps?.responsibilities ? `${ThisProps?.responsibilities}` : '-')} 
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            setSingleJOBPOSTINGSDetailsData((prevState) => {
                                const value = (event.target.value)
                                return ({
                                    ...prevState,
                                    responsibilities: value
                                })
                            })
                        }} 
                        InputProps={{readOnly: viewMode,}} 
                        variant='outlined'
                    />
                    <TextField 
                        sx={{width: '100%'}} 
                        label='Date Added:' 
                        value={ThisProps.date_added? dayjs(ThisProps.date_added).format('MM-DD-YYYY - HH:mm a') : '-'} 
                        InputProps={{readOnly: true,}} 
                        variant='standard'
                    />
                </div>
                {/* <div className='flex gap-6 flex-col'>
                    <TextField sx={{width: '100%', minWidth: '160px'}} label='Added By Emp:' value={ThisProps.added_by || '-'} InputProps={{readOnly: true,}} variant='filled'/>
                    <TextField sx={{width: '100%'}} label='Date Added:' value={ThisProps.date_added? dayjs(ThisProps.date_added).format('MM-DD-YYYY - HH:mm a') : '-'} InputProps={{readOnly: true,}} variant='standard'/>
                    <TextField sx={{width: '100%', minWidth: '160px'}} label='Remarks' value={ThisProps.remarks || '-'} InputProps={{readOnly: true,}} variant='standard'/>
                </div> */}
            </div>
            <div className='flex flex-col justify-center items-center'>
                <div className='flex justify-center mt-6' container-name='leave_buttons_container'>
                    <div className='flex justify-center gap-6' style={{width:'400px', marginTop: '20px'}} container-name='leave_buttons'>
                        { viewMode && <Button disabled={JOBPOSTINGSEditState.status === "loading"} variant='outlined' onClick={()=> setViewMode(false)}>Edit Details</Button>}
                        { viewMode === false && 
                        
                        <>
                        <Button variant='contained' color={'primary'} onClick={submitEditJOBPOSTINGS}>Submit Changes</Button>
                        <Button variant='contained' color={'primary'} onClick={()=> setViewMode(true)}>Cancel</Button>
                        <Button variant='outlined' color={'error'} onClick={()=> setDeleteJOBPOSTINGSOpenModal(true)}>Delete</Button>

                        </>
                        
                        }
                        <DeleteJOBPOSTINGSModal singleJOBPOSTINGSDetailsData={singleJOBPOSTINGSDetailsData} setDeleteJOBPOSTINGSOpenModal={setDeleteJOBPOSTINGSOpenModal} deleteJOBPOSTINGSOpenModal={deleteJOBPOSTINGSOpenModal}/>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default JOBPOSTINGSModalUI;