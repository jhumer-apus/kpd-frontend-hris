import * as React from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Transition } from 'react-transition-group';
import { OVERTIMEViewInterface, ViewPayrollPayPerEmployee } from '@/types/types-pages';
import SinglePayslip from './overtime-modal-component';
import { Button, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { APILink, RootState } from '@/store/configureStore';
import dayjs from 'dayjs';
import { OVERTIMEEditAction, OVERTIMEViewAction } from '@/store/actions/procedurals';
import { beautifyJSON, clearFields } from '@/helpers/utils';
import { HandleAlertAction, HandleModalAction } from '@/store/actions/components';
import axios from 'axios';



interface DenyOVERTIMEModalInterface {
    singleOVERTIMEDetailsData: OVERTIMEViewInterface;
    denyOVERTIMEOpenModal: boolean; 
    setDenyOVERTIMEOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    setSingleOVERTIMEDetailsData: React.Dispatch<React.SetStateAction<OVERTIMEViewInterface>>;
}

export default function DenyOVERTIMEModal(props: DenyOVERTIMEModalInterface) {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState)=> state.auth.employee_detail);
  const OVERTIMEDenyState = useSelector((state: RootState)=> state.procedurals.OVERTIMEEdit)
  const {denyOVERTIMEOpenModal, setDenyOVERTIMEOpenModal, singleOVERTIMEDetailsData, setSingleOVERTIMEDetailsData} = props;
  const DateNow = new Date();
  const denyDate = dayjs(DateNow).format('MMM-DD-YY LT');

  const denyOVERTIME = () => { 

    const payload = {
      ...singleOVERTIMEDetailsData,
      approver_emp_no: state?.emp_no,
      status: "disapprove",
      ot_reason_disapproval: `${singleOVERTIMEDetailsData.ot_reason_disapproval} <Updated: ${denyDate}>`,
      added_by: state?.emp_no
    }

    if(singleOVERTIMEDetailsData.ot_reason_disapproval){
        
      apiDenyOT(payload)
      setSingleOVERTIMEDetailsData((curr) => ({
        ...payload
      }))

    } else {

      dispatch(HandleAlertAction({
        open:true,
        status: "error",
        message: "Please insert reason"
      }))
    }
  }

  const apiDenyOT = async (payload:any) => {

    await axios.put(`${APILink}ot_new/${singleOVERTIMEDetailsData.id}/`, payload)

      .then(res => {

        dispatch(OVERTIMEViewAction({emp_no: state?.emp_no}))

        dispatch(HandleAlertAction({
          open: true,
          status: "success",
          message: "Deny Overtime Successfully"
        }))

        dispatch(HandleModalAction({
          name: "viewOtModal",
          value: false
        }))

      })
      .catch(err => {

        dispatch(OVERTIMEViewAction({emp_no: state?.emp_no}))
        dispatch(HandleAlertAction({
          open: true,
          status: "error",
          message: beautifyJSON(err.response.data)
        }))

        dispatch(HandleModalAction({
          name: "viewOtModal",
          value: false
        }))
      })
  }

    // React.useEffect(()=>{
    //   if(OVERTIMEDenyState.status === 'succeeded' && denyOVERTIMEOpenModal){
    //     window.alert(`${OVERTIMEDenyState.status.charAt(0).toUpperCase()}${OVERTIMEDenyState.status.slice(1)}`)
    //     setTimeout(()=>{
    //       window.location.reload();
    //     }, 800)
    //   } else if(OVERTIMEDenyState.status === 'failed' && denyOVERTIMEOpenModal){
    //     window.alert(`Error: ${OVERTIMEDenyState.error}`)
    //   }
    // }, [OVERTIMEDenyState.status])
    
  return (
    <React.Fragment>
      <Transition in={denyOVERTIMEOpenModal} timeout={400}>
      {(state: string) => (
      <Modal
        open={!['exited', 'exiting'].includes(state)}
        onClose={() => {
          setDenyOVERTIMEOpenModal(false);
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
              ...denyOVERTIMEArea,
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
          <Typography variant='h6' className='border-b-2 border-red-700'>REJECTING OVERTIME</Typography>
          <div className='flex justify-center flex-col item-center h-full'>
            <div className='flex flex-col justify-around w-full h-2/4 gap-14'>
              <div className='flex justify-center item-center'>
                <Typography>Please Insert Reason for Disapproving OVERTIME</Typography>
              </div>
              <div className='flex justify-center item-center'>
                <TextField
                sx={{width: '90%'}}
                  label='Reason'
                  multiline
                  rows={4}
                  required
                  focused
                  value={singleOVERTIMEDetailsData.ot_reason_disapproval}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>)=> {
                    setSingleOVERTIMEDetailsData((prevState)=> {
                      return({
                        ...prevState,
                        ot_reason_disapproval: `${event.target.value}`
                      })
                    })
                  }}
                />
              </div>
              <div className='flex justify-around'>
                <Button variant={'contained'} onClick={denyOVERTIME}>Submit</Button>
                <Button 
                  variant={'outlined'} 
                  onClick={()=>{
                    clearFields(setSingleOVERTIMEDetailsData, ['ot_reason_disapproval'], [null])
                    setDenyOVERTIMEOpenModal(false)
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
const denyOVERTIMEArea = {
  height: '124.5mm',
  width: '100mm',
  margin: '0 auto',
  background: 'white',
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
};