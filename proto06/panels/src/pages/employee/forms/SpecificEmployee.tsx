import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Box, CircularProgress } from '@mui/material';
import axios from 'axios';

import {
  Card,
  CardHeader,
  CardBody,
  Tabs,
  Tab,
  TabsHeader,
  TabsBody,
  TabPanel,
  Button as Button2,
} from "@material-tailwind/react";
import {
  LockClosedIcon,
} from "@heroicons/react/24/solid";
import {
  UserIcon,
  FingerPrintIcon,
  AcademicCapIcon,
  UserGroupIcon,
  WindowIcon,
  LockClosedIcon as LockClosedOutline,
  XCircleIcon,
  CheckCircleIcon,
  LockOpenIcon,
  UserPlusIcon,
  XMarkIcon,
  TagIcon,
} from "@heroicons/react/24/outline";

import { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TextField, Button } from '@mui/material';
import { Input, Typography } from '@material-tailwind/react';
// import { TextField, Button } from '@material-ui/core';
import { useForm } from 'react-hook-form';
// import { fetchUserData, updateUserData } from './userDataActions'; // import your actions
import { getSpecificEmployeeInfo } from '@/store/actions/employees';
import { RootState } from '@/store/configureStore';
import { GetEmployeesListsType } from '@/types/types-store';


type FormData = {
  firstName: string;
  lastName: string;
  middleName: string;
  age: number;
  email: string;
  password: string;
};

type initialState = {
    secondOptionModalEntranceDelay?: Boolean;
    modalEntranceDelay?: Boolean;
}

export const SpecificEmployee = (props: initialState) => {
    const {modalEntranceDelay, secondOptionModalEntranceDelay} = props;
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<GetEmployeesListsType>();
    const dispatch = useDispatch();
    const userData = useSelector((state: RootState) => state.employees.specific_employee_info);
    const [editMode, setEditMode] = useState(false);
    const [editMode2, setEditMode2] = useState(false);
    const [editMode3, setEditMode3] = useState(false);

    const [type, setType] = useState("staticInfo");
//   const [modalEntranceDelay, setModalEntranceDelay] = useState(false);
//   const [secondOptionModalEntranceDelay, setSecondOptionModalEntranceDelay] = useState(false);
    console.log(userData, "maasd")

    useEffect(() => {
        // dispatch(getSpecificEmployeeInfo({employee_id: 33333}));
    }, [dispatch]);

    // useEffect(() => {
    //     // update form values when userData changes
    //     for (const key in userData) {
    //     setValue(key as keyof FormData, userData[key]  );
    //     }
    // }, [userData, setValue]);

    useEffect(() => {
        // update form values when userData changes
        if (userData) {
        for (const key in userData) {
            setValue(key as keyof FormData, userData[key]);
        }
        }
    }, [userData, setValue]);

    // const onSubmit = (data: FormData) => {
    //     console.log(data, "mamamama")
    //     // dispatch(updateUserData(data));
    //     setEditMode(false);
    // };

    const onSubmit = async (data: GetEmployeesListsType) => {
        const formData = new FormData();
        console.log("appending file:sss ", data)
    
        // if(data.file) {
        //     formData.append('file', data.file[0].name);
        //     console.log("appending file: ", data.file[0])
        //     console.log("formData111: ", formData);
        // }
        // for (const key in data) {
        //     // formData.append(key, data[key as keyof FormData]);
        //     if (data[key as keyof ImportEmployee]) {
        //         formData.append(key, data[key as keyof ImportEmployee], data[key as keyof ImportEmployee].name);
        //     }
        //     // formData.append(key, data[key as keyof ImportEmployee], data[key as keyof ImportEmployee].name);
        // }
        console.log("formData: ", formData);
        // try {
        //     const response = await axios.put(
        //       `http://172.16.168.155:8000/api/import_employee/`,
        //       formData,
        //       {
        //         headers: {
        //           'Content-Type': 'multipart/form-data',
        //         },
        //       }
        //     );
        
        //     console.log(response.data);
        //     // setTimeout(()=>{
        //     //     location.reload();
        //     // }, 1000)
        //   } catch (err) {
        //     console.error(err);
        //   }
    
        // dispatch(updateUserData(data));
        // setEditMode(false);
    
        };

    return (
        <Fragment>
            {/* <form onSubmit={handleSubmit(onSubmit)}>
                <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-4 font-medium"
                >
                    Add New Employee
                </Typography>   
                <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-4 font-medium"
                >
                    Personal Information
                </Typography>    
                <div className="my-4 mb-6 flex flex-wrap xl:flex-nowrap items-center gap-6">
                    <div style={{position: 'relative', width: '100%'}}>
                    <Input
                        {...register('first_name', { required: true })}
                        label="First Name:*"
                        disabled={!editMode}
                    />
                    {errors.first_name && <sub style={{position: 'absolute', bottom: '-9px', left: '2px', fontSize: '12px'}}>First name is required.</sub>}
                    </div>

                    <Input
                    {...register('middle_name')}
                    label="Middle Name:"
                    disabled={!editMode}
                    />
                    <div style={{position: 'relative', width: '100%'}}>
                    <Input
                        {...register('last_name', { required: true })}
                        label="Last Name:*"
                        disabled={!editMode}
                    />
                    {errors.last_name && <sub style={{position: 'absolute', bottom: '-9px', left: '2px', fontSize: '12px'}}>Last name is required.</sub>}
                    </div>
                    <Input
                    {...register('suffix')}
                    label="Suffix:"
                    disabled={!editMode}
                    />
                    <Input
                    {...register('gender')}
                    label="Gender:"
                    containerProps={{ className: "min-w-[20px]" }} 
                    disabled={!editMode}
                    />
                </div>
                <div className="my-4 flex flex-wrap xl:flex-nowrap items-center gap-4">
                    <Input
                        {...register('address')}
                        label="Address:"
                        disabled={!editMode}
                    />
                    <Input
                    {...register('provincial_address')}
                    label="Provincial Address:"
                    disabled={!editMode}
                    />
                    <Input
                    {...register('email_address')}
                    label="Email Address:"
                    disabled={!editMode}
                    />
                </div>
                <div className="my-4 flex flex-wrap xl:flex-nowrap items-center gap-4">
                    <Input
                        {...register('mobile_phone')}
                        label="Mobile Phone #:"
                        disabled={!editMode}
                    />
                    <Input
                    {...register('birthday')}
                    label="Birthday"
                    disabled={!editMode}
                    />
                    <Input
                    {...register('email_address')}
                    label="Email Address"
                    disabled={!editMode}
                    />
                </div>
                {editMode ? (
                    <Button variant="contained" color="primary" type="submit">
                        Submit
                    </Button>
                    ) : (
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => setEditMode(true)}
                    >
                        Edit
                    </Button>
                )}
            </form> */}
            <Card className="w-full max-w-[120rem] xl:max-w-[100rem] ml-auto mr-auto">
                    <CardHeader
                        color="teal"
                        variant="gradient"
                        floated={false}
                        shadow={false}
                        id="parent-modal-title"
                        className="m-0 grid place-items-center rounded-b-none py-8 px-4 text-center"
                    >
                        <div className="mb-4 rounded-full border border-white/10 bg-white/10 p-6 text-white">
                        <UserIcon className="h-10 w-10" />
                        </div>
                        <Typography variant="h4" color="white">
                        Full Name: {userData?.first_name} {userData?.middle_name} {userData?.last_name}
                        </Typography>
                        <Typography variant="p" color="white">
                        Registered Employee #: {userData?.emp_no}
                        </Typography>
                    </CardHeader>
                    <CardBody id="parent-modal-description" className="p-4 sm:p-6 xl:p-28">
                        <Tabs value={type} className="overflow-visible">
                        <TabsHeader className="relative z-0 ">
                        <Tab value="staticInfo" onClick={() => setType("staticInfo")}>
                        Static Information
                        </Tab>
                        <Tab value="personalInfo" onClick={() => setType("personalInfo")}>
                        Personal Information
                        </Tab>
                        <Tab value="employmentDetails" onClick={() => setType("employmentDetails")}>
                        Employment Details
                        </Tab>
                        </TabsHeader>
                        <TabsBody
                            className="!overflow-x-hidden"
                            animate={{
                            mount: {
                                x: 0,
                            },
                            unmount: {
                                x: 300,
                            },
                            }} 
                        >
                        <Box sx={{ display: secondOptionModalEntranceDelay? 'flex' : 'none', zIndex: "999", position: "absolute", top: "0", left: "0", background: "white", height: "100%", width: "100%", opacity: modalEntranceDelay? '1': '0', transition: 'opacity 1s ease'}}>
                            <span style={{marginLeft: "50%", marginTop: "20%"}}><CircularProgress /></span>
                        </Box>
                        <TabPanel value="staticInfo" className="p-0">
                            <form className="mt-12 flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                            <div className="my-4 flex flex-wrap md:flex-nowrap items-center gap-4">
                                <div style={{width: "100%"}}>
                                    <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="mb-4 font-medium"
                                    >
                                    HR System Details
                                    </Typography>
                                    <div className="my-4 flex items-center gap-4">
                                    <Input 
                                        {...register('id')}
                                        type="text" 
                                        containerProps={{ className: "min-w-[72px]" }} 
                                        labelProps={{style: {color: true? "unset" : ''}}} 
                                        label="Database ID:" 
                                        disabled={true} 
                                        // value={`${userData?.id ? userData?.id : ''}`}
                                        icon={
                                        <TagIcon className="h-5 w-5 text-blue-gray-300" />
                                        }
                                    />
                                    <Input 
                                        {...register('bio_id')}
                                        type="text" 
                                        containerProps={{ className: "min-w-[72px] focused" }} 
                                        labelProps={{style: {color: true? "unset" : ''}}} 
                                        label="Biometric ID:" 
                                        disabled={!editMode} 
                                        icon={
                                        <FingerPrintIcon className="h-5 w-5 text-blue-gray-300" />
                                        }
                                        value={`${userData?.bio_id ? userData?.bio_id : ''}` }
                                    />
                                    </div>
                                    <div className="flex items-center gap-4">
                                    <Input 
                                        {...register('is_superuser')}
                                        type="text" 
                                        containerProps={{ className: "min-w-[72px] focused" }} 
                                        labelProps={{style: {color: true? "unset" : ''}}} 
                                        label="Account Superuser:" 
                                        disabled={!editMode} 
                                        // value={`${!!userData?.user?.is_superuser}`}
                                        icon={
                                        <AcademicCapIcon className="h-5 w-5 text-blue-gray-300" />
                                        }
                                    />
                                    <Input 
                                        {...register('is_active')}
                                        type="text" 
                                        containerProps={{ className: "min-w-[72px] focused" }} 
                                        labelProps={{style: {color: true? "unset" : ''}}} 
                                        label="Account Active:" 
                                        disabled={!editMode} 
                                        // value={`${!!userData?.user?.is_active}`}
                                        icon={
                                        <WindowIcon className="h-5 w-5 text-blue-gray-300" />
                                        }
                                    />
                                    </div>
                                </div>
                                <div style={{width: "100%"}}>
                                    <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="mb-4 font-medium"
                                    >
                                    Technical Details
                                    </Typography>
                                    <div className="my-4 flex items-center gap-4">
                                    <Input
                                        {...register('emp_no')} 
                                        type="text" 
                                        containerProps={{ className: "min-w-[72px]" }} 
                                        label="Emp #:" 
                                        labelProps={{style: {color: true? "unset" : ''}}} 
                                        disabled={!editMode} 
                                        // value={`${userData?.emp_no}`} 
                                    />
                                    <Input
                                        {...register('user.username')} 
                                        type="text" 
                                        containerProps={{ className: "min-w-[72px] focused" }} 
                                        labelProps={{style: {color: true? "unset" : ''}}} 
                                        label="Username:" 
                                        disabled={!editMode} 
                                        icon={
                                        <TagIcon className="h-5 w-5 text-blue-gray-300" />
                                        }
                                        // value={ `${userData?.user?.username ? userData?.user?.username : ''}`}
                                    />
                                    <Input
                                        {...register('user.role')} 
                                        type="text" 
                                        containerProps={{ className: "min-w-[72px]" }} 
                                        label="Role #:" 
                                        labelProps={{style: {color: true? "unset" : ''}}} 
                                        disabled={!editMode} 
                                        icon={
                                        <UserGroupIcon className="h-5 w-5 text-blue-gray-300" />
                                        }
                                        // value={ `${userData?.user?.role ? userData?.user?.role : ''}`}
                                    />
                                    </div>
                                    <Input
                                        {...register('user.role')} 
                                        type="email" 
                                        className="" 
                                        label="Email Address:" 
                                        labelProps={{style: {color: true? "unset" : ''}}} 
                                        disabled={!editMode}
                                        // value={ true ? `${userData?.email_address}` : ''}
                                    />
                                </div>
                            </div>
                            <div className="my-6">
                                <Typography
                                variant="small"
                                color="blue-gray"
                                className="mb-4 font-medium"
                                >
                                Static Info Details
                                </Typography>
                                <div className="my-4 flex flex-wrap xl:flex-nowrap items-center gap-4">
                                <Input
                                    {...register('user.is_locked')}
                                    label="Account Lock Status:"
                                    labelProps={{style: {color: true? "unset" : ''}}}
                                    disabled={true}
                                    // value={`${userData?.user?.is_locked !== undefined ? userData?.user?.is_locked: ''}`}
                                    icon={
                                    <LockClosedOutline className="h-5 w-5 text-blue-gray-300" />
                                    }
                                />
                                <Input
                                    {...register('user.last_login')}
                                    label="Last Login:"
                                    labelProps={{style: {color: true? "unset" : ''}}}
                                    disabled={true}
                                    // value={`${userData?.user?.last_login? userData?.user?.last_login : ''}`}
                                    icon={ 
                                    <CheckCircleIcon className="h-5 w-5 text-blue-gray-300" />
                                    }
                                />
                                <Input
                                    {...register('user.old_password')}
                                    label="Old Password:"
                                    labelProps={{style: {color: true? "unset" : ''}}}
                                    disabled={true}
                                    // value={`${userData?.user?.old_password ? userData?.user?.old_password :''}`}
                                    icon={ 
                                    <LockOpenIcon className="h-5 w-5 text-blue-gray-300" />
                                    }
                                />
                                <Input
                                    {...register('user.date_added')}
                                    label="Date Added:"
                                    labelProps={{style: {color: true? "unset" : ''}}}
                                    disabled={true}
                                    // value={`${userData?.user?.date_added !== undefined ? userData?.user?.date_added : ''}`}
                                    icon={
                                    <UserPlusIcon className="h-5 w-5 text-blue-gray-300" />
                                    }
                                />
                                <Input
                                    {...register('user.date_deleted')}
                                    label="Date Deleted:"
                                    containerProps={{ className: "min-w-[72px]" }} 
                                    labelProps={{style: {color: true? "unset" : ''}}}
                                    disabled={true}
                                    // value={`${userData?.user?.date_deleted ? userData?.user?.date_deleted : ''}`}
                                    icon={
                                    <XMarkIcon className="h-5 w-5 text-blue-gray-300" />
                                    }
                                />
                                </div>
                                <div className="my-4 flex flex-wrap md:flex-nowrap items-center gap-4">
                                <Input
                                    {...register('user.failed_login_attempts')}
                                    label="Failed Login Attempts:"
                                    labelProps={{style: {color: true? "unset" : ''}}}
                                    disabled={!editMode}
                                    // value={`${userData?.user?.failed_login_attempts !== undefined ? userData?.user?.failed_login_attempts : ''}`}
                                    icon={
                                    <XCircleIcon className="h-5 w-5 text-blue-gray-300" />
                                    }
                                />
                                <Input
                                    {...register('user.date_password_changed')}
                                    label="Date Password Changed:"
                                    labelProps={{style: {color: true? "unset" : ''}}}
                                    disabled={!editMode}
                                    // value={`${userData?.user?.date_password_changed ? userData?.user?.date_password_changed : ''}`}
                                    icon={ null
                                    // <CreditCardIcon className="h-5 w-5 text-blue-gray-300" />
                                    }
                                />
                                </div>
                            </div>
                            <div className="my-4 flex items-center gap-4">
                                <Button2 
                                    color={"teal"} 
                                    variant={'outlined'} 
                                    size="lg" 
                                    className="w-full"
                                    onClick={()=> setEditMode(true)}
                                >
                                    Edit
                                </Button2>
                                <Button2 
                                    type="submit" 
                                    color={"teal"} 
                                    size="lg" 
                                    className="w-full"
                                >
                                    Save
                                </Button2>
                            </div>
                            <Typography
                                variant="small"
                                color="gray"
                                className="mt-2 flex items-center justify-center gap-2 font-normal opacity-60"
                            >
                                <LockClosedIcon className="-mt-0.5 h-4 w-4" /> Information are
                                secure and encrypted
                            </Typography>
                            </form>
                        </TabPanel>
                        <TabPanel value="personalInfo" className="p-0">
                            <form className="mt-12 flex flex-col gap-4">
                            <div className="my-0 flex flex-wrap md:flex-nowrap items-center gap-4">
                                <div style={{width: "100%"}}>
                                    <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="mb-4 font-medium"
                                    >
                                    Full Name Details
                                    </Typography>
                                    <div className="my-4 flex items-center gap-4">
                                    <Input
                                        {...register('first_name')} 
                                        type="text" 
                                        containerProps={{ className: "min-w-[72px]" }} 
                                        labelProps={{style: {color: true? "unset" : ''}}} 
                                        label="First Name:" 
                                        disabled={!editMode} 
                                        // value={`${userData?.birthdate ? userData?.birthdate : ''}`}
                                        icon={
                                        <TagIcon className="h-5 w-5 text-blue-gray-300" />
                                        }
                                    />
                                    <Input 
                                        {...register('middle_name')}
                                        type="text" 
                                        containerProps={{ className: "min-w-[72px] focused" }} 
                                        labelProps={{style: {color: true? "unset" : ''}}} 
                                        label="Middle Name:" 
                                        disabled={!editMode} 
                                        icon={
                                        <FingerPrintIcon className="h-5 w-5 text-blue-gray-300" />
                                        }
                                        // value={`${userData?.birth_place ? userData?.birth_place : ''}` }
                                    />
                                    </div>
                                    <div className="flex items-center gap-4">
                                    <Input
                                        {...register('last_name')} 
                                        type="text" 
                                        containerProps={{ className: "min-w-[72px] focused" }} 
                                        labelProps={{style: {color: true? "unset" : ''}}} 
                                        label="Last Name:" 
                                        disabled={!editMode} 
                                        // value={`${userData?.mobile_phone ? userData?.mobile_phone : ''}`}
                                        icon={
                                        <AcademicCapIcon className="h-5 w-5 text-blue-gray-300" />
                                        }
                                    />
                                    <Input
                                        {...register('suffix')} 
                                        type="text" 
                                        containerProps={{ className: "min-w-[72px] focused" }} 
                                        labelProps={{style: {color: true? "unset" : ''}}} 
                                        label="Suffix:" 
                                        disabled={!editMode} 
                                        value={`${userData?.approver ? userData?.approver : ''}`}
                                        icon={
                                        <WindowIcon className="h-5 w-5 text-blue-gray-300" />
                                        }
                                    />
                                    </div>
                                </div>
                            </div>
                            <div className="my-0 flex flex-wrap md:flex-nowrap items-center gap-4">
                                <div style={{width: "100%"}}>
                                    <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="mb-4 font-medium"
                                    >
                                    Personal Details
                                    </Typography>
                                    <div className="my-4 flex items-center gap-4">
                                    <Input
                                        {...register('birthdate')} 
                                        type="text" 
                                        containerProps={{ className: "min-w-[72px]" }} 
                                        labelProps={{style: {color: true? "unset" : ''}}} 
                                        label="Birthday:" 
                                        disabled={!editMode} 
                                        // value={`${userData?.birthdate ? userData?.birthdate : ''}`}
                                        icon={
                                        <TagIcon className="h-5 w-5 text-blue-gray-300" />
                                        }
                                    />
                                    <Input 
                                        {...register('birth_place')}
                                        type="text" 
                                        containerProps={{ className: "min-w-[72px] focused" }} 
                                        labelProps={{style: {color: true? "unset" : ''}}} 
                                        label="Birthplace:" 
                                        disabled={!editMode} 
                                        icon={
                                        <FingerPrintIcon className="h-5 w-5 text-blue-gray-300" />
                                        }
                                        // value={`${userData?.birth_place ? userData?.birth_place : ''}` }
                                    />
                                    </div>
                                    <div className="flex items-center gap-4">
                                    <Input
                                        {...register('mobile_phone')} 
                                        type="text" 
                                        containerProps={{ className: "min-w-[72px] focused" }} 
                                        labelProps={{style: {color: true? "unset" : ''}}} 
                                        label="Mobile Phone:" 
                                        disabled={!editMode} 
                                        // value={`${userData?.mobile_phone ? userData?.mobile_phone : ''}`}
                                        icon={
                                        <AcademicCapIcon className="h-5 w-5 text-blue-gray-300" />
                                        }
                                    />
                                    <Input
                                        {...register('approver')} 
                                        type="text" 
                                        containerProps={{ className: "min-w-[72px] focused" }} 
                                        labelProps={{style: {color: true? "unset" : ''}}} 
                                        label="Approver:" 
                                        disabled={!editMode} 
                                        value={`${userData?.approver ? userData?.approver : ''}`}
                                        icon={
                                        <WindowIcon className="h-5 w-5 text-blue-gray-300" />
                                        }
                                    />
                                    </div>
                                </div>
                                <div style={{width: "100%"}}>
                                    <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="mb-4 font-medium"
                                    >
                                    Additional Details
                                    </Typography>
                                    <div className="my-4 flex items-center gap-4">
                                    <Input
                                        {...register('civil_status')} 
                                        type="text" 
                                        containerProps={{ className: "min-w-[72px]" }} 
                                        label="Civil Status:" 
                                        labelProps={{style: {color: true? "unset" : ''}}} 
                                        disabled={!editMode} 
                                        // value={`${userData?.civil_status ? userData?.civil_status : ''}`} 
                                    />
                                    <Input
                                        {...register('gender')} 
                                        type="text" 
                                        containerProps={{ className: "min-w-[72px] focused" }} 
                                        labelProps={{style: {color: true? "unset" : ''}}} 
                                        label="Gender:" 
                                        disabled={!editMode} 
                                        icon={
                                        <TagIcon className="h-5 w-5 text-blue-gray-300" />
                                        }
                                        // value={ `${userData?.gender ? userData?.gender : ''}`}
                                    />
                                    </div>
                                    <Input
                                        {...register('address')} 
                                        type="email" 
                                        className="" 
                                        label="Present Address:" 
                                        labelProps={{style: {color: true? "unset" : ''}}} 
                                        disabled={!editMode}
                                        // value={`${userData?.address ? userData?.address : ''}`}
                                    />
                                </div>
                            </div>
                            <div className="my-0">
                                <div className="my-0 flex flex-wrap xl:flex-nowrap items-center gap-4">
                                <Input
                                    {...register('provincial_address')}
                                    label="Provincial Address:"
                                    labelProps={{style: {color: true? "unset" : ''}}}
                                    disabled={!editMode}
                                    // value={`${userData?.provincial_address ? userData?.provincial_address : ''}`}
                                    icon={
                                    <LockClosedOutline className="h-5 w-5 text-blue-gray-300" />
                                    }
                                />
                                </div>
                            </div>
                            <div className="my-4 flex items-center gap-4">
                                <Button2 color={"teal"} variant={'outlined'} size="lg" className="w-full">Edit</Button2>
                                <Button2 color={"teal"} size="lg" className="w-full">Save</Button2>
                            </div>
                            <Typography
                                variant="small"
                                color="gray"
                                className="mt-2 flex items-center justify-center gap-2 font-normal opacity-60"
                            >
                                <LockClosedIcon className="-mt-0.5 h-4 w-4" /> Information are
                                secure and encrypted
                            </Typography>
                            </form>
                        </TabPanel>
                        <TabPanel value="employmentDetails" className="p-0">
                            <form className="mt-12 flex flex-col gap-4">
                                <div className="my-4 flex flex-wrap md:flex-nowrap items-center gap-4">
                                <div style={{width: "100%"}}>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="mb-4 font-medium"
                                    >
                                    Employment Info
                                    </Typography>
                                    <div className="my-4 flex items-center gap-4">
                                        <Input
                                            {...register('date_hired')} 
                                            type="text" 
                                            containerProps={{ className: "min-w-[72px]" }} 
                                            labelProps={{style: {color: true? "unset" : ''}}} 
                                            label="Date Hired:" 
                                            disabled={!editMode} 
                                            // value={`${userData?.date_hired ? userData?.date_hired : ''}`}
                                            icon={
                                                <TagIcon className="h-5 w-5 text-blue-gray-300" />
                                        }
                                        />
                                        <Input
                                            {...register('date_resigned')} 
                                            type="text" 
                                            containerProps={{ className: "min-w-[72px] focused" }} 
                                            labelProps={{style: {color: true? "unset" : ''}}} 
                                            label="Date Resigned:" 
                                            disabled={!editMode} 
                                            icon={
                                                <FingerPrintIcon className="h-5 w-5 text-blue-gray-300" />
                                            }
                                            // value={`${userData?.date_resigned ? userData?.date_resigned : ''}` }
                                        />
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <Input
                                            {...register('division_code')} 
                                            type="text" 
                                            containerProps={{ className: "min-w-[72px] focused" }} 
                                            labelProps={{style: {color: true? "unset" : ''}}} 
                                            label="Division Code:" 
                                            disabled={!editMode} 
                                            // value={`${userData?.division_code ? userData?.division_code : ''}`}
                                            icon={
                                                <AcademicCapIcon className="h-5 w-5 text-blue-gray-300" />
                                            }
                                        />
                                        <Input
                                            {...register('position_code')} 
                                            type="text" 
                                            containerProps={{ className: "min-w-[72px] focused" }} 
                                            labelProps={{style: {color: true? "unset" : ''}}} 
                                            label="Position Code:" 
                                            disabled={!editMode} 
                                            // value={`${userData?.position_code ? userData?.position_code : ''}`}
                                            icon={
                                                <WindowIcon className="h-5 w-5 text-blue-gray-300" />
                                            }
                                        />
                                    </div>
                                </div>
                                <div style={{width: "100%"}}>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="mb-4 font-medium"
                                    >
                                    Payroll Code
                                    </Typography>
                                    <div className="my-4 flex items-center gap-4">
                                        <Input
                                            {...register('city_code')} 
                                            type="text" 
                                            containerProps={{ className: "min-w-[72px]" }} 
                                            label="City Code:" 
                                            labelProps={{style: {color: true? "unset" : ''}}} 
                                            disabled={!editMode} 
                                            // value={`${userData?.city_code ? userData?.city_code : ''}`} 
                                        />
                                        <Input
                                            {...register('branch_code')} 
                                            type="text" 
                                            containerProps={{ className: "min-w-[72px] focused" }} 
                                            labelProps={{style: {color: true? "unset" : '', textOverflow: 'ellipsis', overflow: 'hidden'}}} 
                                            label="Branch Code:" 
                                            disabled={!editMode} 
                                            icon={
                                                <TagIcon className="h-5 w-5 text-blue-gray-300" />
                                            }
                                            // value={ `${userData?.branch_code ? userData?.branch_code : ''}`}
                                        />
                                        <Input
                                            {...register('department_code')} 
                                            type="text" 
                                            containerProps={{ className: "min-w-[72px]" }} 
                                            label="Department Code:" 
                                            labelProps={{style: {color: true? "unset" : '', textOverflow: 'ellipsis', overflow: 'hidden'}}} 
                                            disabled={!editMode} 
                                            icon={
                                                <UserGroupIcon className="h-5 w-5 text-blue-gray-300" />
                                            }
                                            // value={ `${userData?.department_code ? userData?.department_code : ''}`}
                                        />
                                    </div>
                                    <div className="my-0 flex items-center gap-4">
                                        <Input
                                            {...register('rank_code')} 
                                            type="text" 
                                            containerProps={{ className: "min-w-[72px]" }} 
                                            label="Rank Code:" 
                                            labelProps={{style: {color: true? "unset" : ''}}} 
                                            disabled={!editMode} 
                                            // value={`${userData?.rank_code ? userData?.rank_code : ''}`} 
                                        />
                                        <Input 
                                            {...register('payroll_group_code')}
                                            type="text" 
                                            containerProps={{ className: "min-w-[72px] focused" }} 
                                            labelProps={{style: {color: true? "unset" : '', textOverflow: 'ellipsis', overflow: 'hidden'}}} 
                                            label="Payroll Group Code:" 
                                            disabled={!editMode} 
                                            icon={
                                                <TagIcon className="h-5 w-5 text-blue-gray-300" />
                                            }
                                            // value={ `${userData?.payroll_group_code ? userData?.payroll_group_code : ''}`}
                                        />
                                    </div>
                                </div>
                                </div>
                                <div className="my-6">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="mb-4 font-medium"
                                >
                                Static Info Details
                                </Typography>
                                <div className="my-4 flex flex-wrap xl:flex-nowrap items-center gap-4">
                                    <Input
                                        {...register('tax_code')}
                                        label="Tax Identification #:"
                                        labelProps={{style: {color: true? "unset" : ''}}}
                                        disabled={!editMode}
                                        // value={`${userData?.tax_code ? userData?.tax_code : ''}`}
                                        icon={
                                            <LockClosedOutline className="h-5 w-5 text-blue-gray-300" />
                                        }
                                    />
                                    <Input
                                        {...register('pagibig_code')}
                                        label="HDMF Pagibig:"
                                        labelProps={{style: {color: true? "unset" : ''}}}
                                        disabled={!editMode}
                                        // value={`${userData?.pagibig_code ? userData?.pagibig_code : ''}`}
                                        icon={ 
                                            <CheckCircleIcon className="h-5 w-5 text-blue-gray-300" />
                                        }
                                    />
                                    <Input
                                        {...register('sssid_code')}
                                        label="SSS ID:"
                                        labelProps={{style: {color: true? "unset" : ''}}}
                                        disabled={!editMode}
                                        // value={`${userData?.sssid_code ? userData?.sssid_code :''}`}
                                        icon={ 
                                            <LockOpenIcon className="h-5 w-5 text-blue-gray-300" />
                                        }
                                    />
                                    <Input
                                        {...register('philhealth_code')}
                                        label="Philhealth #:"
                                        labelProps={{style: {color: true? "unset" : ''}}}
                                        disabled={!editMode}
                                        // value={`${userData?.philhealth_code ? userData?.philhealth_code : ''}`}
                                        icon={
                                            <UserPlusIcon className="h-5 w-5 text-blue-gray-300" />
                                        }
                                    />
                                </div>
                                </div>
                                <div className="my-4 flex items-center gap-4">
                                <Button2 color={"teal"} variant={'outlined'} size="lg" className="w-full">Edit</Button2>
                                <Button2 color={"teal"} size="lg" className="w-full">Save</Button2>
                                </div>
                                <Typography
                                variant="small"
                                color="gray"
                                className="mt-2 flex items-center justify-center gap-2 font-normal opacity-60"
                                >
                                <LockClosedIcon className="-mt-0.5 h-4 w-4" /> Information are
                                secure and encrypted
                                </Typography>
                            </form>
                        </TabPanel>
                        </TabsBody>
                        </Tabs>
                    </CardBody>
            </Card>
        </Fragment>

    );
};