import {useEffect, Dispatch, SetStateAction, ChangeEvent, Fragment, useState}from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Transition } from 'react-transition-group';
import { USERResetPasswordInterface } from '@/types/types-pages';
import { Button, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { APILink, RootState, globalReducerFailed, globalReducerSuccess } from '@/store/configureStore';
import { USERResetPasswordAction, USERResetPasswordActionFailureCleanup, USERViewAction } from '@/store/actions/users';
import { clearFields } from '@/helpers/utils';

//LIBRARIES
import axios from 'axios'



interface ResetPasswordUSERModalInterface {
    primaryKey: number,
    emp_no: number | string,
    resetPasswordUSEROpenModal: boolean; 
    setSingleUSEROpenModal: Dispatch<SetStateAction<boolean>>;
    setResetPasswordUSEROpenModal: Dispatch<SetStateAction<boolean>>;
}

export default function ResetPasswordUSERModal(props: ResetPasswordUSERModalInterface) {
  const dispatch = useDispatch();
  const USERResetPasswordState = useSelector((state: RootState)=> state.users.USERResetPassword)
  const curr_user = useSelector((state: RootState) => state.auth.employee_detail?.emp_no);
  const {
    resetPasswordUSEROpenModal, 
    setResetPasswordUSEROpenModal, 
    primaryKey,
    setSingleUSEROpenModal,
    emp_no
  } = props;
  const [singleUSERDetailsData, setSingleUSERDetailsData] = useState<Omit<USERResetPasswordInterface, "id" | "added_by">>({
    new_password: '',
    repeat_new_password: '',
    is_temp: true
  })

  const passwordValidation = () => {

  }

  const resetPasswordUSERSubmit = () => { 
    if(primaryKey && curr_user){
      dispatch(USERResetPasswordAction({
        ...singleUSERDetailsData,
        id: primaryKey || NaN,
        added_by: curr_user || NaN
      }))
    } else {
      window.alert("Error, no Primary Key and Current User Found")
    }

  }

  const sendEmail = async () => {

    const body = {
      emp_no: emp_no,
      email_type: "reset",
      new_password: singleUSERDetailsData.new_password,
      application_type: null,
      application_pk: null
    }

    await axios.post(`${APILink}reset_password_email/`, body).then(res => {

      window.alert(`New password has been sent to Employee Number: ${emp_no}`)

    }).catch(err => {

      console.log(err)
      window.alert("Fail to email the user the new password")

    })
  }

  useEffect(()=>{ 
      if(USERResetPasswordState.status === `${globalReducerSuccess}`){
        window.alert(`${USERResetPasswordState.status.charAt(0).toUpperCase()}${USERResetPasswordState.status.slice(1)}`)
        // window.location.reload();
        setResetPasswordUSEROpenModal(false);
        setSingleUSEROpenModal(false);
        dispatch(USERViewAction());
        setTimeout(()=>{
          dispatch(USERResetPasswordActionFailureCleanup())
        }, 200)
        sendEmail() // Send new password through email
      }else if( USERResetPasswordState.status === `${globalReducerFailed}`){
        window.alert(USERResetPasswordState.error)
        setTimeout(()=>{
          dispatch(USERResetPasswordActionFailureCleanup())
        }, 200)
      }
  }, [USERResetPasswordState])
  return (
    <Fragment>
      <Transition in={resetPasswordUSEROpenModal} timeout={400}>
      {(state: string) => (
      <Modal
        open={!['exited', 'exiting'].includes(state)}
        onClose={() => {
          setResetPasswordUSEROpenModal(false);
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
              ...resetPasswordUSERArea,
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
          <Typography variant='h6' className='border-b-2 border-orange-700'>Reset Password - User Access Details</Typography>
          <div className='flex flex-col items-center justify-around h-full'>
            <div className='flex flex-col w-full gap-10'>
              <div className='flex justify-center item-center'>
                <Typography>Please Enter New Details</Typography>
              </div>
              <div className='flex flex-col justify-center items-center gap-5'>
                <TextField
                sx={{width: '90%'}}
                  label='New Password'
                  type='text'
                  required
                  value={singleUSERDetailsData.new_password}
                  onChange={(event: ChangeEvent<HTMLInputElement>)=> {
                    setSingleUSERDetailsData((prevState)=> {
                      const value = event.target.value;
                      return({
                        ...prevState,
                        new_password: value.replace(/ /g, ""),
                      })
                    })
                  }}
                />
                <TextField
                  sx={{width: '90%'}}
                  label='Repeat New Password'
                  type='text'
                  required
                  value={singleUSERDetailsData.repeat_new_password}
                  onChange={(event: ChangeEvent<HTMLInputElement>)=> {
                    setSingleUSERDetailsData((prevState)=> {
                      const value = event.target.value;
                      return({
                        ...prevState,
                        repeat_new_password: value.replace(/ /g, ""),
                      })
                    })
                  }}
                />
                {/* <EmployeeAutoCompleteRight createUSER={singleUSERDetailsData} setCreateUSER={setSingleUSERDetailsData}/> */}
                {/* <BranchAutoCompleteRight createUSER={singleUSERDetailsData} setCreateUSER={setSingleUSERDetailsData}/> */}
              </div>
              <div className='flex justify-around'>
                <Button variant={'contained'} color={"warning"} onClick={resetPasswordUSERSubmit}>Reset Password</Button>
                <Button 
                  variant={'outlined'} 
                  color={"warning"} 
                  onClick={()=>{
                    clearFields(setSingleUSERDetailsData, ['new_password', 'repeat_new_password'], ['', ''])
                    setResetPasswordUSEROpenModal(false)
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
    </Fragment>
  );
}


// Styles
const resetPasswordUSERArea = {
  height: '110mm',
  width: '180mm',
  margin: '0 auto',
  background: 'white',
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
};