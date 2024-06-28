import * as React from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Transition } from 'react-transition-group';
import { UAViewInterface, ViewPayrollPayPerEmployee } from '@/types/types-pages';
import SinglePayslip from './ua-modal-component';
import { Button, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { APILink, RootState } from '@/store/configureStore';
import dayjs from 'dayjs';
import { UAEditAction, UAViewAction, UAViewFilterApproverAction } from '@/store/actions/procedurals';
import { beautifyJSON, clearFields } from '@/helpers/utils';
import { HandleAlertAction, HandleModalAction } from '@/store/actions/components';
import axios from 'axios';



interface DenyUAModalInterface {
    singleUADetailsData: UAViewInterface;
    denyUAOpenModal: boolean; 
    setDenyUAOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    setSingleUADetailsData: React.Dispatch<React.SetStateAction<UAViewInterface>>;
}

export default function DenyUAModal(props: DenyUAModalInterface) {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState)=> state.auth.employee_detail);
  const UADenyState = useSelector((state: RootState)=> state.procedurals.UAEdit)
  const {denyUAOpenModal, setDenyUAOpenModal, singleUADetailsData, setSingleUADetailsData} = props;
  const DateNow = new Date();
  const denyDate = dayjs(DateNow).format('MMM-DD-YY LT');

  const denyUA = () => {

    const payload = {
      ...singleUADetailsData,
      approver_emp_no: state?.emp_no,
      status: "disapprove",
      ua_reason_disapproval: `${singleUADetailsData.ua_reason_disapproval}  <Updated: ${denyDate}>`,
      added_by: state?.emp_no
    }

    if(singleUADetailsData.ua_reason_disapproval){

      apiADenyUa(payload)
      setSingleUADetailsData((curr:any) => ({
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

  const apiADenyUa = async (payload:any) => {

    await axios.put(`${APILink}ua_new/${singleUADetailsData.id}/`, payload)
        .then(res => {

            dispatch(UAViewAction({emp_no: state?.emp_no}))

            dispatch(HandleAlertAction({
                open:true,
                status:"success",
                message:"Deny Unaccounted Attendance Successfully"
            }))

            dispatch(HandleModalAction({
              name: "viewUaModal",
              value: false
            }))
        })
        .catch((err:any) => {
          
          dispatch(UAViewAction({emp_no: state?.emp_no}))

          dispatch(HandleAlertAction({
            open:true,
            status:"error",
            message: beautifyJSON(err.response.data)
          }))

          dispatch(HandleModalAction({
            name: "viewUaModal",
            value: false
          }))
      })
  }

    // React.useEffect(()=>{
    //   if(UADenyState.status === 'succeeded' && denyUAOpenModal){
    //     window.alert(`${UADenyState.status.charAt(0).toUpperCase()}${UADenyState.status.slice(1)}`)
    //     setTimeout(()=>{
    //       window.location.reload();
    //     }, 800)
    //   } else if(UADenyState.status === 'failed' && denyUAOpenModal){
    //     window.alert(`Error: ${UADenyState.error}`)
    //   }
    // }, [UADenyState.status])
    
  return (
    <React.Fragment>
      <Transition in={denyUAOpenModal} timeout={400}>
      {(state: string) => (
      <Modal
        open={!['exited', 'exiting'].includes(state)}
        onClose={() => {
          setDenyUAOpenModal(false);
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
              ...denyUAArea,
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
          <Typography variant='h6' className='border-b-2 border-red-700'>REJECTING UA</Typography>
          <div className='flex justify-center flex-col item-center h-full'>
            <div className='flex flex-col justify-around w-full h-2/4 gap-14'>
              <div className='flex justify-center item-center'>
                <Typography>Please Insert Reason for Disapproving UA</Typography>
              </div>
              <div className='flex justify-center item-center'>
                <TextField
                sx={{width: '90%'}}
                  label='Reason'
                  multiline
                  rows={4}
                  required
                  focused
                  value={singleUADetailsData.ua_reason_disapproval}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>)=> {
                    setSingleUADetailsData((prevState)=> {
                      return({
                        ...prevState,
                        ua_reason_disapproval: `${event.target.value}`
                      })
                    })
                  }}
                />
              </div>
              <div className='flex justify-around'>
                <Button variant={'contained'} onClick={denyUA}>Submit</Button>
                <Button 
                  variant={'outlined'} 
                  onClick={()=>{
                    clearFields(setSingleUADetailsData, ['ua_reason_disapproval'], [null])
                    setDenyUAOpenModal(false)
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
const denyUAArea = {
  height: '124.5mm',
  width: '100mm',
  margin: '0 auto',
  background: 'white',
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
};