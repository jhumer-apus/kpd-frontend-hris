import * as React from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Transition } from 'react-transition-group';
import { UAViewInterface, ViewPayrollPayPerEmployee } from '@/types/types-pages';
import SinglePayslip from './ua-modal-component';
import { Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import dayjs from 'dayjs';
import { UAEditAction } from '@/store/actions/procedurals';



interface ApproveUAModalInterface {
    singleUADetailsData: UAViewInterface;
    approveUAOpenModal: boolean; 
    setApproveUAOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    setSingleUADetailsData: React.Dispatch<React.SetStateAction<UAViewInterface>>;
}

export default function ApproveUAModal(props: ApproveUAModalInterface) {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState)=> state.auth.employee_detail);
  const UAApproveState = useSelector((state: RootState)=> state.procedurals.UAEdit.status)
  const {approveUAOpenModal, setApproveUAOpenModal, singleUADetailsData, setSingleUADetailsData} = props;

  const approveUA = () => { 
    const DateNow = new Date();
    const approvedDate = dayjs(DateNow).format('YYYY-MM-DDTHH:mm:ss');
    if(state?.emp_no === singleUADetailsData.ua_approver1_empno || ((state?.rank_code as number) > singleUADetailsData?.applicant_rank)){
      setSingleUADetailsData((prevState)=> {
        dispatch(UAEditAction({
          ...prevState,
          ua_date_approved1: approvedDate
        }))
        return({
          ...prevState,
          ua_date_approved1: approvedDate
        })
      })
    } else if(state?.emp_no === singleUADetailsData.ua_approver2_empno){
      setSingleUADetailsData((prevState)=> {
        dispatch(UAEditAction({
          ...prevState,
          ua_date_approved2: approvedDate
        }))
        return({
          ...prevState,
          leave_date_approved2: approvedDate
        })
      })
    } else {
      window.alert('You are not one of the approvers.')
    }

  }

  React.useEffect(()=>{
    if(UAApproveState){
      window.alert(`${UAApproveState.charAt(0).toUpperCase()}${UAApproveState.slice(1)}`)
      if(UAApproveState !== 'failed'){
        setTimeout(()=>{
          window.location.reload();
        }, 800)
      }
    }
  }, [UAApproveState])
  return (
    <React.Fragment>
      <Transition in={approveUAOpenModal} timeout={400}>
      {(state: string) => (
      <Modal
        keepMounted
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