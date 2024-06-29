import * as React from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Transition } from 'react-transition-group';
import { LEAVEViewInterface, ViewPayrollPayPerEmployee } from '@/types/types-pages';
import SinglePayslip from './leaves-modal-component';
import { Button, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { APILink, RootState } from '@/store/configureStore';
import dayjs from 'dayjs';
import { LEAVEEditAction, LEAVEViewAction, LEAVEViewAllFilterApproverAction } from '@/store/actions/procedurals';
import { beautifyJSON, clearFields } from '@/helpers/utils';
import axios from 'axios';
import { HandleAlertAction, HandleModalAction } from '@/store/actions/components';



interface DenyLEAVEModalInterface {
    singleLEAVEDetailsData: LEAVEViewInterface;
    denyLEAVEOpenModal: boolean; 
    setDenyLEAVEOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    setSingleLEAVEDetailsData: React.Dispatch<React.SetStateAction<LEAVEViewInterface>>;
}

export default function DenyLEAVEModal(props: DenyLEAVEModalInterface) {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState)=> state.auth.employee_detail);
  const LEAVEDenyState = useSelector((state: RootState)=> state.procedurals.LEAVEEdit)
  const {denyLEAVEOpenModal, setDenyLEAVEOpenModal, singleLEAVEDetailsData, setSingleLEAVEDetailsData} = props;
  const DateNow = new Date();
  const denyDate = dayjs(DateNow).format('MMM-DD-YY LT');
  const isDepartmentManager = state?.rank_hierarchy == 2

  const fetchLeavesByApprover = async() => {
    await axios.get(`${APILink}leave/`,{
      params:{
        approver: state?.emp_no
      }
    }).then(res => {
      dispatch(LEAVEViewAllFilterApproverAction({data: res.data}))
    })
  }

  const apiDenyLeave = async (payload:any) => {

    await axios.put(`${APILink}leave_new/${singleLEAVEDetailsData.id}/`,payload)
      .then(res => {

        isDepartmentManager? fetchLeavesByApprover(): dispatch(LEAVEViewAction())
        
        dispatch(HandleAlertAction({
          open:true,
          status:"success",
          message:"Deny Leave Successfully"
        }))

        dispatch(HandleModalAction({
          name: "viewLeaveModal",
          value: false
        }))
      })

      .catch((err:any) => {

        isDepartmentManager? fetchLeavesByApprover(): dispatch(LEAVEViewAction())

        dispatch(HandleAlertAction({
          open:true,
          status:"error",
          message: beautifyJSON(err.response.data)
        }))

        dispatch(HandleModalAction({
          name: "viewLeaveModal",
          value: false
        }))
      })
  }


  const denyLEAVE = () => { 

    const payload = {
      ...singleLEAVEDetailsData,
      approver_emp_no: state?.emp_no,
      status: "disapprove",
      leave_reason_disapproval: `${singleLEAVEDetailsData.leave_reason_disapproval} <Updated: ${denyDate}>`,
      added_by: state?.emp_no
    }

    if(singleLEAVEDetailsData.leave_reason_disapproval){
      
      apiDenyLeave(payload)
      setSingleLEAVEDetailsData((curr:any) => ({
        ...payload
      }))
      
    } else {

      dispatch(HandleAlertAction({
        open:true,
        status:"error",
        message:"Please insert reason"
      }))
    }
  }

    // React.useEffect(()=>{
    //   if(LEAVEDenyState.status === 'succeeded' && denyLEAVEOpenModal){
    //     window.alert(`${LEAVEDenyState.status.charAt(0).toUpperCase()}${LEAVEDenyState.status.slice(1)}`)
    //     setTimeout(()=>{
    //       window.location.reload();
    //     }, 800)
    //   } else if(LEAVEDenyState.status === 'failed' && denyLEAVEOpenModal){
    //     window.alert(`Error: ${LEAVEDenyState.error}`)
    //   }
    // }, [LEAVEDenyState.status])

  return (
    <React.Fragment>
      <Transition in={denyLEAVEOpenModal} timeout={400}>
      {(state: string) => (
      <Modal
        open={!['exited', 'exiting'].includes(state)}
        onClose={() => {
          setDenyLEAVEOpenModal(false);
        }}
        slotProps={{
            backdrop: {
              sx: {
                opacity: 0,
                backdropFilter: 'none',
                transition: `opacity 400ms, backdrop-filter 400ms`,
                ...{
                  entering: { opacity: 1, backdropFilter: 'blur(8px)' },
                  entered: { opacity: 1, backdropFilter: 'blur(8px)' },
                }[state],
              },
            },
          }}
          sx={{
            visibility: state === 'exited' ? 'hidden' : 'visible',
          }}
      >
        <ModalDialog 
            aria-labelledby="dialog-vertical-scroll-title" 
            layout={'center'}
            sx={{
              ...denyLEAVEArea,
                opacity: 0,
                transition: `opacity 300ms`,
                ...{
                  entering: { opacity: 1 },
                  entered: { opacity: 1 },
                }[state],
                overflow: 'auto',
            }}
            size='sm'
        > 
          <Typography variant='h6' className='border-b-2 border-red-700'>REJECTING LEAVE</Typography>
          <div className='flex justify-center flex-col item-center h-full'>
            <div className='flex flex-col justify-around w-full h-2/4 gap-14'>
              <div className='flex justify-center item-center'>
                <Typography>Please Insert Reason for Disapproving LEAVE</Typography>
              </div>
              <div className='flex justify-center item-center'>
                <TextField
                sx={{width: '90%'}}
                  label='Reason'
                  multiline
                  rows={4}
                  required
                  focused
                  value={singleLEAVEDetailsData.leave_reason_disapproval}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>)=> {
                    setSingleLEAVEDetailsData((prevState)=> {
                      return({
                        ...prevState,
                        leave_reason_disapproval: `${event.target.value}`
                      })
                    })
                  }}
                />
              </div>
              <div className='flex justify-around'>
                <Button variant={'contained'} onClick={denyLEAVE}>Submit</Button>
                <Button variant={'outlined'} onClick={()=>{
                  clearFields(setSingleLEAVEDetailsData, ['leave_reason_disapproval'], [null])
                  setDenyLEAVEOpenModal(false)
                }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </ModalDialog>
      </Modal>
        )}
      </Transition>
    </React.Fragment>
  );
}


// Styles
const denyLEAVEArea = {
  height: '124.5mm',
  width: '100mm',
  margin: '0 auto',
  background: 'white',
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
};