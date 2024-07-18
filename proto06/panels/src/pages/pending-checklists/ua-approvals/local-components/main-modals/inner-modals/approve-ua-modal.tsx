import * as React from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Transition } from 'react-transition-group';
import { UAViewInterface, ViewPayrollPayPerEmployee } from '@/types/types-pages';
import SinglePayslip from './ua-modal-component';
import { Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { APILink, RootState } from '@/store/configureStore';
import dayjs from 'dayjs';
import { UAEditAction, UAViewAction, UAViewFilterApproverAction, UAViewFilterEmployeeAction} from '@/store/actions/procedurals';
import axios from 'axios';
import { HandleAlertAction, HandleModalAction } from '@/store/actions/components';
import { beautifyJSON } from '@/helpers/utils';
import { useEffect } from 'react';



interface ApproveUAModalInterface {
    singleUADetailsData: UAViewInterface;
    approveUAOpenModal: boolean; 
    setApproveUAOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    setSingleUADetailsData: React.Dispatch<React.SetStateAction<UAViewInterface>>;
}

export default function ApproveUAModal(props: ApproveUAModalInterface) {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState)=> state.auth.employee_detail);
  const UAApproveData = useSelector((state: RootState)=> state.procedurals.UAEdit)
  const {approveUAOpenModal, setApproveUAOpenModal, singleUADetailsData, setSingleUADetailsData} = props;
  const UAViewFilterApprover = useSelector((state: RootState) => state.procedurals.UAViewFilterApprover);

  const approveUA = () => { 
    const DateNow = new Date();
    const approvedDate = dayjs(DateNow).format('YYYY-MM-DDTHH:mm:ss');

    const payload = {
      ...singleUADetailsData,
      approver_emp_no: state?.emp_no,
      status: "approve",
      ua_reason_disapproval: null,
      added_by: state?.emp_no
    }

    if(state?.emp_no === singleUADetailsData.ua_approver1_empno || ((state?.rank_code as number) > singleUADetailsData?.applicant_rank) || state?.rank_hierarchy == 6){
      
      payload.ua_date_approved1 = approvedDate
      setSingleUADetailsData((curr:any) => ({
        ...payload
      }))
      apiApproveUa(payload)

    } else if(state?.emp_no === singleUADetailsData.ua_approver2_empno){

      payload.ua_date_approved2 = approvedDate
      setSingleUADetailsData((curr:any) => ({
        ...payload
      }))
      apiApproveUa(payload)

    } else {

      dispatch(HandleAlertAction({
        open:true,
        status:"error",
        message: "You are not one of the approvers"
      }))

    }

  }

  const apiApproveUa = async (payload:any) => {

    await axios.put(`${APILink}ua_new/${singleUADetailsData.id}/`, payload)
        .then(res => {
            dispatch(UAViewFilterApproverAction({emp_no: state?.emp_no}))
            dispatch(HandleAlertAction({
                open:true,
                status:"success",
                message:"Approve Unaccounted Attendance Successfully"
            }))

            dispatch(HandleModalAction({
              name: "viewUaModal",
              value: false
            }))
        })
        .catch((err:any) => {

          dispatch(UAViewFilterApproverAction({emp_no: state?.emp_no}))
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
  //   if(UAApproveData.status === 'succeeded' && approveUAOpenModal){
  //     window.alert(`${UAApproveData.status.charAt(0).toUpperCase()}${UAApproveData.status.slice(1)}`)
  //     setTimeout(()=>{
  //       window.location.reload();
  //     }, 800)
  //   } else if(UAApproveData.status === 'failed' && approveUAOpenModal){
  //     window.alert(UAApproveData.error)
  //   }
  // }, [UAApproveData.status])
  return (
    <React.Fragment>
      <Transition in={approveUAOpenModal} timeout={400}>
      {(state: string) => (
      <Modal
        open={!['exited', 'exiting'].includes(state)}
        onClose={() => {
          setApproveUAOpenModal(false);
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
              ...paySlipArea,
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
          <Typography variant='h6' className='border-b-2 border-green-700'>Confirmation</Typography>
          <div className='flex justify-center flex-col item-center h-full'>
            <div className='flex flex-col justify-between w-full h-2/4'>
              <div className='flex justify-center item-center'>
                <Typography>Are you sure you want to approve this UA?</Typography>
              </div>
              <div className='flex justify-around'>
                <Button variant={'contained'} onClick={approveUA}>Submit</Button>
                <Button variant={'outlined'} onClick={()=>{setApproveUAOpenModal(false)}}>Cancel</Button>
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
const paySlipArea = {
  height: '74.5mm',
  width: '100mm',
  margin: '0 auto',
  background: 'white',
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
};