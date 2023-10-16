import * as React from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Transition } from 'react-transition-group';
import { OVERTIMEViewInterface, ViewPayrollPayPerEmployee } from '@/types/types-pages';
import SinglePayslip from './overtime-modal-component';
import { Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import dayjs from 'dayjs';
import { OVERTIMEEditAction } from '@/store/actions/procedurals';



interface ApproveOVERTIMEModalInterface {
    singleOVERTIMEDetailsData: OVERTIMEViewInterface;
    approveOVERTIMEOpenModal: boolean; 
    setApproveOVERTIMEOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    setSingleOVERTIMEDetailsData: React.Dispatch<React.SetStateAction<OVERTIMEViewInterface>>;
}

export default function ApproveOVERTIMEModal(props: ApproveOVERTIMEModalInterface) {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState)=> state.auth.employee_detail);
  const OVERTIMEApproveData = useSelector((state: RootState)=> state.procedurals.OVERTIMEEdit)
  const {approveOVERTIMEOpenModal, setApproveOVERTIMEOpenModal, singleOVERTIMEDetailsData, setSingleOVERTIMEDetailsData} = props;

  const approveOVERTIME = () => { 
    const DateNow = new Date();
    const approvedDate = dayjs(DateNow).format('YYYY-MM-DDTHH:mm:ss');
    if(state?.emp_no === singleOVERTIMEDetailsData.ot_approver1_empno || ((state?.rank_code as number) > singleOVERTIMEDetailsData?.applicant_rank)){
      setSingleOVERTIMEDetailsData((prevState)=> {
        dispatch(OVERTIMEEditAction({
          ...prevState,
          ot_date_approved1: approvedDate
        }))
        return({
          ...prevState,
          ot_date_approved1: approvedDate
        })
      })
    } else if(state?.emp_no === singleOVERTIMEDetailsData.ot_approver2_empno){
      setSingleOVERTIMEDetailsData((prevState)=> {
        dispatch(OVERTIMEEditAction({
          ...prevState,
          ot_date_approved2: approvedDate
        }))
        return({
          ...prevState,
          ot_date_approved2: approvedDate
        })
      })
    } else {
      window.alert('You are not one of the approvers.')
    }

  }

  React.useEffect(()=>{
    if(OVERTIMEApproveData.status === 'succeeded'){
      window.alert(`${OVERTIMEApproveData.status.charAt(0).toUpperCase()}${OVERTIMEApproveData.status.slice(1)}`)
      setTimeout(()=>{
        window.location.reload();
      }, 800)
    } else if(OVERTIMEApproveData.status === 'failed'){
      window.alert(OVERTIMEApproveData.error)
    }
  }, [])
  return (
    <React.Fragment>
      <Transition in={approveOVERTIMEOpenModal} timeout={400}>
      {(state: string) => (
      <Modal
        keepMounted
        open={!['exited', 'exiting'].includes(state)}
        onClose={() => {
          setApproveOVERTIMEOpenModal(false);
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
                <Typography>Are you sure you want to approve this OVERTIME?</Typography>
              </div>
              <div className='flex justify-around'>
                <Button variant={'contained'} onClick={approveOVERTIME}>Submit</Button>
                <Button variant={'outlined'} onClick={()=>{setApproveOVERTIMEOpenModal(false)}}>Cancel</Button>
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