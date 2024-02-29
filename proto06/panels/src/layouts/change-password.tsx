import { Routes, Route } from "react-router-dom";
import {
  ChartPieIcon,
  UserIcon,
  UserPlusIcon,
  ArrowRightOnRectangleIcon,
  PowerIcon
} from "@heroicons/react/24/solid";
import { Footer } from "@/widgets/layout";

import {useEffect, Dispatch, SetStateAction, ChangeEvent, Fragment, useState}from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Transition } from 'react-transition-group';
import { USERResetPasswordInterface } from '@/types/types-pages';
import { Button, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { USERResetPasswordAction } from '@/store/actions/users';
import { clearFields } from '@/helpers/utils';
import { fetchUserData, userLogout } from "@/store/actions/auth";
import Cookies from 'js-cookie';

//LIBRARIES
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";

interface ResetPasswordUSERModalInterface {
  primaryKey: number,
  resetPasswordUSEROpenModal: boolean; 
  setResetPasswordUSEROpenModal: Dispatch<SetStateAction<boolean>>;
}

export function ChangePassword(props:any) {
const dispatch = useDispatch();
const USERResetPasswordState = useSelector((state: RootState)=> state.users.USERResetPassword.status)
const curr_user = useSelector((state: RootState) => state.auth.employee_detail);
const {resetPasswordUSEROpenModal, setResetPasswordUSEROpenModal, primaryKey} = props;
const [singleUSERDetailsData, setSingleUSERDetailsData] = useState<Omit<USERResetPasswordInterface, "id" | "added_by">>({
  new_password: '',
  repeat_new_password: '',
  is_temp: false
})

const resetPasswordUSERSubmit = () => { 
  console.log(singleUSERDetailsData);
  if(curr_user){
    dispatch(USERResetPasswordAction({
      ...singleUSERDetailsData,
      id: curr_user.id as number,
      added_by: curr_user.emp_no || NaN
    }))
  } else {
    window.alert("User does not exist. Try to reload your page")
  }

}

const handleLogout = () => {
  // Perform logout actions here
  const removals = ['token', 'user', 'employee_detail'];
  removals.forEach((el) => {
    Cookies.remove(el);
  });
  setTimeout(()=> {
    dispatch(userLogout());
  }, 200)
  window.location.reload();
  window.location.replace('/')
};

useEffect(()=>{
  if(USERResetPasswordState){      
    if(USERResetPasswordState === 'succeeded'){
      window.alert(`${USERResetPasswordState.charAt(0).toUpperCase()}${USERResetPasswordState.slice(1)}`)
      setTimeout(()=>{
        window.location.reload();
      }, 800)
    }
  }
}, [USERResetPasswordState])
return (
  <Fragment
  >
    <div className="w-full h-screen bg-indigo-400">
      <div className="flex justify-end md:p-8 p-2">
        <Button onClick={handleLogout}>
          <Typography variant='h6' className='border-b-2 border-orange-700 text-white hover:text-blue-300 text-center'>Logout</Typography>
          {/* <PowerIcon className="h-10 w-10 text-white hover:text-blue-500" /> */}
        </Button>
      </div>
    <Card 
        className="w-fit border m-auto border-slate-500 mt-6 md:p-12 p-4"
      >
        {/* <CardHeader className="p-4">
          <Typography variant='h6' className='border-b-2 border-orange-700 text-center'>Change Your Password</Typography>
        </CardHeader> */}
        <Typography variant='h6' className='border-b-2 border-orange-700 text-center'>Change Password</Typography>
        <div className='flex flex-col items-center justify-around h-full'>
          <div className='flex flex-col w-full gap-10'>
            <CardBody className='flex flex-col justify-center items-center gap-5'>
              <div className='flex justify-center item-center'>
                <Typography>Please Change Your Password First Before Proceeding To The Dashboard</Typography>
              </div>
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
                      new_password: value,
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
                      repeat_new_password: value,
                    })
                  })
                }}
              />
              {/* <EmployeeAutoCompleteRight createUSER={singleUSERDetailsData} setCreateUSER={setSingleUSERDetailsData}/> */}
              {/* <BranchAutoCompleteRight createUSER={singleUSERDetailsData} setCreateUSER={setSingleUSERDetailsData}/> */}
            </CardBody>
            <CardFooter className='flex flex-col md:flex-row gap-4 m-auto justify-around'>
              <Button 
                variant={'contained'} 
                color={"warning"} 
                className="w-40"
                onClick={resetPasswordUSERSubmit}>
                  Reset Password
              </Button>
              <Button 
                variant={'outlined'} 
                color={"warning"}
                className="w-40"
                onClick={()=>{
                  clearFields(setSingleUSERDetailsData, ['new_password', 'repeat_new_password'], ['', ''])
                  setResetPasswordUSEROpenModal(false)
                }}
              >
              Cancel
              </Button>
            </CardFooter>
          </div>
        </div>
      </Card>
    </div>
        
  </Fragment>
);
}


// Styles
const resetPasswordUSERArea = {
height: '164.5mm',
width: '180mm',
margin: '0 auto',
background: 'white',
boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
overflow: 'hidden',
};

ChangePassword.displayName = "/src/layout/change-password.tsx";

export default ChangePassword;
