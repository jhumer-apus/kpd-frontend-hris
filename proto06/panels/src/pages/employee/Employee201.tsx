import { Fragment, useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { getEmployeesList } from '@/store/actions/employees';
import { RootState } from '@/store/reducers';
import { getSpecificEmployeeInfo } from '@/store/actions/employees';
import { Modal, Box, CircularProgress } from '@mui/material';
import { UserProfile } from './forms/AddEmployee';
import { useForm } from 'react-hook-form';
import { GetEmployeesListsType } from '@/types/types-store';
import { ImportEmployee } from './forms/ImportEmployee';

import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Tabs,
  Tab,
  TabsHeader,
  TabsBody,
  TabPanel,
  Select,
  Option,
} from "@material-tailwind/react";
import {
  LockClosedIcon,
} from "@heroicons/react/24/solid";
import {
  UserIcon,
  FingerPrintIcon,
  AcademicCapIcon,
  TvIcon,
  UserGroupIcon,
  WindowIcon,
  ShieldCheckIcon,
  LockClosedIcon as LockClosedOutline,
  XCircleIcon,
  CheckCircleIcon,
  LockOpenIcon,
  MapIcon,
  UserPlusIcon,
  XMarkIcon,
  TagIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/24/outline";
import { SpecificEmployee } from './forms/SpecificEmployee';

const columns: GridColDef[] = [
  // { field: 'id', headerName: 'ID', width: 70 },
  { field: 'emp_no', headerName: 'Employee #', width: 120 },
  { field: 'first_name', headerName: 'First Name', width: 150 },
  { field: 'last_name', headerName: 'Last Name', width: 150 },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.first_name || ''} ${params.row.last_name || ''}`,
  },
  { field: 'date_hired', headerName: 'Date Hired', width: 150 },
  { field: 'branch_code', headerName: 'Branch Code', width: 150 },
  { field: 'mobile_phone', headerName: 'Mobile Number', width: 150 },
  { field: `user`, headerName: 'Has HRIS Access', width: 150, valueGetter: (params: GridValueGetterParams) => `${params.row.user?.is_active ? 'Active' : 'No Access'}` },
  { field: 'bio_id', headerName: 'Biometrics ID', width: 150 },
];

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};


export default function DataTable() {
  const dispatch = useDispatch();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<GetEmployeesListsType>();
  const { employees_list, specific_employee_info } = useSelector((state: RootState) => state.employees);
  const [type, setType] = useState("staticInfo");

  // Specific Employee Modal Form 
  // States: 
  const [open, setOpen] = useState(false);
  const [modalEntranceDelay, setModalEntranceDelay] = useState(false);
  const [secondOptionModalEntranceDelay, setSecondOptionModalEntranceDelay] = useState(false);
  const [editMode, setEditMode] = useState(false);
  function handleOpen(){
    setOpen(true);
  };

  function handleClose(){
    setOpen(false);
    setType("staticInfo");
  };

  // Add Employee Modal Form
  // States:
  const [open2, setOpen2] = useState(false);
  const [modalEntranceDelay2, setModalEntranceDelay2] = useState(false);
  const [secondOptionModalEntranceDelay2, setSecondOptionModalEntranceDelay2] = useState(false);
  function handleOpen2(){
    setOpen2(true);
  };

  function handleClose2(){
    setOpen2(false);
  };

  // Import Employee Modal Form
  // States:
  const [open3, setOpen3] = useState(false);
  const [modalEntranceDelay3, setModalEntranceDelay3] = useState(false);
  const [secondOptionModalEntranceDelay3, setSecondOptionModalEntranceDelay3] = useState(false);
  function handleOpen3(){
    setOpen3(true);
  };

  function handleClose3(){
    setOpen3(false);
  };

  useEffect(() => {
    dispatch(getEmployeesList());
  }, []);

  function dispatchSpecificEmployeeInfo(employee_number: number){
    return dispatch(getSpecificEmployeeInfo({employee_id: employee_number}));   
  }

  // Console Tests
  console.log(specific_employee_info, "eto un taeaaaaaaa", employees_list, "eto un list");
  console.log(specific_employee_info?.user?.is_superuser, "eto un tae", employees_list, "eto un list");

  // const countries = [{name: "Philippines"}, {name: "United States"}, {name: "Canada"}, {name: "Australia"}];
  // const [dateInput, setDateInput] = useState('');

  // Side Effects
  const handleModalEntranceDelay = () => {
    setModalEntranceDelay(true);
    setSecondOptionModalEntranceDelay(true);
    setTimeout(() => {
      setModalEntranceDelay(false);
    }, 1000);
    setTimeout(() => {
      setSecondOptionModalEntranceDelay(false);
    }, 1200);
  };

  useEffect(()=>{
      setTimeout(() => {
        setModalEntranceDelay(false);
      }, 1000);
      setTimeout(() => {
        setSecondOptionModalEntranceDelay(false);
      }, 1200);
  }, [specific_employee_info])

  return (
    <Fragment>
      <div className="my-4 flex flex-wrap items-center gap-4">
        <Button 
          className='mb-4'
          onClick={()=>{handleOpen2()}}
        >
        + Add Employee
        </Button>
        <Modal
            open={open2}
            onClose={
              handleClose2
            }
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <Box sx={{ ...style, width:"80%", height: "80%", overflowY: "auto",  background: "#fff", backgroundImage: "#fff" }}>
            <UserProfile/>
            </Box>
        </Modal>
        <Button 
          className='mb-4 flex gap-2'
          variant='outlined'
          // icon={<ArrowUpTrayIcon/>}
          onClick={()=>{handleOpen3()}}
        >
        <ArrowUpTrayIcon style={{height: '15px'}}/> Import TSV File Employee
        </Button>
        <Modal
            open={open3}
            onClose={
              handleClose3
            }
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <Box sx={{ ...style, width:"80%", height: "80%", overflowY: "auto",  background: "#fff", backgroundImage: "#fff", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <ImportEmployee/>
            </Box>
        </Modal>
      </div>
      <div style={{ height: 800, width: '100%' }}>
        <DataGrid
          rows={employees_list ?? []}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 25 },
            },
          }}
          pageSizeOptions={[25, 30]}
          // checkboxSelection
          onRowClick={(e) => {
            handleOpen()
            setModalEntranceDelay(true)
            setSecondOptionModalEntranceDelay(true)
            console.log(e, dispatchSpecificEmployeeInfo(e.row?.emp_no))
          }}
          style={{ cursor: 'pointer'}}
        />
        <Modal
          open={open}
          onClose={
            handleClose
          }
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box sx={{ ...style, width:"100%", maxHeight: "80%", overflowY: "auto",  background: "#e9bcb7", backgroundImage: "linear-gradient(315deg, #e9bcb7 0%, #29524a 74%)" }}>
            {/* <Card className="w-full max-w-[120rem] xl:max-w-[100rem] ml-auto mr-auto">
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
                Full Name: {specific_employee_info?.first_name} {specific_employee_info?.middle_name} {specific_employee_info?.last_name}
                </Typography>
                <Typography variant="p" color="white">
                Registered Employee #: {specific_employee_info?.emp_no}
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
                    <form className="mt-12 flex flex-col gap-4">
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
                                type="text" 
                                containerProps={{ className: "min-w-[72px]" }} 
                                labelProps={{style: {color: true? "unset" : ''}}} 
                                label="Database ID:" 
                                {...true ? {disabled: true}: null} 
                                value={`${specific_employee_info?.id ? specific_employee_info?.id : ''}`}
                                icon={
                                  <TagIcon className="h-5 w-5 text-blue-gray-300" />
                                }
                              />
                              <Input 
                                type="text" 
                                containerProps={{ className: "min-w-[72px] focused" }} 
                                labelProps={{style: {color: true? "unset" : ''}}} 
                                label="Biometric ID:" 
                                {...true ? {disabled: true}: null} 
                                icon={
                                  <FingerPrintIcon className="h-5 w-5 text-blue-gray-300" />
                                }
                                value={`${specific_employee_info?.bio_id ? specific_employee_info?.bio_id : ''}` }
                              />
                            </div>
                            <div className="flex items-center gap-4">
                              <Input 
                                type="text" 
                                containerProps={{ className: "min-w-[72px] focused" }} 
                                labelProps={{style: {color: true? "unset" : ''}}} 
                                label="Superuser:" 
                                {...true ? {disabled: true}: null} 
                                value={`${!!specific_employee_info?.user?.is_superuser}`}
                                icon={
                                  <AcademicCapIcon className="h-5 w-5 text-blue-gray-300" />
                                }
                              />
                              <Input 
                                type="text" 
                                containerProps={{ className: "min-w-[72px] focused" }} 
                                labelProps={{style: {color: true? "unset" : ''}}} 
                                label="Active:" 
                                {...true ? {disabled: true}: null} 
                                value={`${!!specific_employee_info?.user?.is_active}`}
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
                                type="text" 
                                containerProps={{ className: "min-w-[72px]" }} 
                                label="Emp #:" 
                                labelProps={{style: {color: true? "unset" : ''}}} 
                                {...true ? {disabled: true}: null} 
                                value={`${specific_employee_info?.emp_no}`} 
                              />
                              <Input 
                                type="text" 
                                containerProps={{ className: "min-w-[72px] focused" }} 
                                labelProps={{style: {color: true? "unset" : ''}}} 
                                label="Username:" 
                                {...true ? {disabled: true}: null} 
                                icon={
                                  <TagIcon className="h-5 w-5 text-blue-gray-300" />
                                }
                                value={ `${specific_employee_info?.user?.username ? specific_employee_info?.user?.username : ''}`}
                              />
                              <Input 
                                type="text" 
                                containerProps={{ className: "min-w-[72px]" }} 
                                label="Role #:" 
                                labelProps={{style: {color: true? "unset" : ''}}} 
                                {...true ? {disabled: true}: null} 
                                icon={
                                  <UserGroupIcon className="h-5 w-5 text-blue-gray-300" />
                                }
                                value={ `${specific_employee_info?.user?.role ? specific_employee_info?.user?.role : ''}`}
                              />
                            </div>
                            <Input 
                              type="email" 
                              className="" 
                              label="Email Address:" 
                              labelProps={{style: {color: true? "unset" : ''}}} 
                              {...true? {disabled: true}: null} 
                              value={ true ? `${specific_employee_info?.email_address}` : ''}
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
                            label="Account Lock Status:"
                            labelProps={{style: {color: true? "unset" : ''}}}
                            {...true? {disabled: true}: null} 
                            value={`${specific_employee_info?.user?.is_locked !== undefined ? specific_employee_info?.user?.is_locked: ''}`}
                            icon={
                              <LockClosedOutline className="h-5 w-5 text-blue-gray-300" />
                            }
                          />
                          <Input
                            label="Last Login:"
                            labelProps={{style: {color: true? "unset" : ''}}}
                            {...true? {disabled: true}: null} value={`${specific_employee_info?.user?.last_login? specific_employee_info?.user?.last_login : ''}`}
                            icon={ 
                              <CheckCircleIcon className="h-5 w-5 text-blue-gray-300" />
                            }
                          />
                          <Input
                            label="Old Password:"
                            labelProps={{style: {color: true? "unset" : ''}}}
                            {...true? {disabled: true}: null} 
                            value={`${specific_employee_info?.user?.old_password ? specific_employee_info?.user?.old_password :''}`}
                            icon={ 
                              <LockOpenIcon className="h-5 w-5 text-blue-gray-300" />
                            }
                          />
                          <Input
                            label="Date Added:"
                            labelProps={{style: {color: true? "unset" : ''}}}
                            {...true? {disabled: true}: null} 
                            value={`${specific_employee_info?.user?.date_added !== undefined ? specific_employee_info?.user?.date_added : ''}`}
                            icon={
                              <UserPlusIcon className="h-5 w-5 text-blue-gray-300" />
                            }
                          />
                          <Input
                            label="Date Deleted:"
                            labelProps={{style: {color: true? "unset" : ''}}}
                            {...true? {disabled: true}: null} 
                            value={`${specific_employee_info?.user?.date_deleted ? specific_employee_info?.user?.date_deleted : ''}`}
                            icon={
                              <XMarkIcon className="h-5 w-5 text-blue-gray-300" />
                            }
                          />
                        </div>
                        <div className="my-4 flex flex-wrap md:flex-nowrap items-center gap-4">
                          <Input
                            label="Failed Login Attempts:"
                            labelProps={{style: {color: true? "unset" : ''}}}
                            {...true? {disabled: true}: null} 
                            value={`${specific_employee_info?.user?.failed_login_attempts !== undefined ? specific_employee_info?.user?.failed_login_attempts : ''}`}
                            icon={
                              <XCircleIcon className="h-5 w-5 text-blue-gray-300" />
                            }
                          />
                          <Input
                            label="Date Password Changed:"
                            labelProps={{style: {color: true? "unset" : ''}}}
                            {...true? {disabled: true}: null} 
                            value={`${specific_employee_info?.user?.date_password_changed ? specific_employee_info?.user?.date_password_changed : ''}`}
                            icon={ null
                              // <CreditCardIcon className="h-5 w-5 text-blue-gray-300" />
                            }
                          />
                        </div>
                      </div>
                      <div className="my-4 flex items-center gap-4">
                        <Button color={"teal"} variant={'outlined'} size="lg" className="w-full">Edit</Button>
                        <Button color={"teal"} size="lg" className="w-full">Save</Button>
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
                            Personal Details
                            </Typography>
                            <div className="my-4 flex items-center gap-4">
                              <Input 
                                type="text" 
                                containerProps={{ className: "min-w-[72px]" }} 
                                labelProps={{style: {color: true? "unset" : ''}}} 
                                label="Birthday:" 
                                {...true ? {disabled: true}: null} 
                                value={`${specific_employee_info?.birthdate ? specific_employee_info?.birthdate : ''}`}
                                icon={
                                  <TagIcon className="h-5 w-5 text-blue-gray-300" />
                                }
                              />
                              <Input 
                                type="text" 
                                containerProps={{ className: "min-w-[72px] focused" }} 
                                labelProps={{style: {color: true? "unset" : ''}}} 
                                label="Birthplace:" 
                                {...true ? {disabled: true}: null} 
                                icon={
                                  <FingerPrintIcon className="h-5 w-5 text-blue-gray-300" />
                                }
                                value={`${specific_employee_info?.birth_place ? specific_employee_info?.birth_place : ''}` }
                              />
                            </div>
                            <div className="flex items-center gap-4">
                              <Input 
                                type="text" 
                                containerProps={{ className: "min-w-[72px] focused" }} 
                                labelProps={{style: {color: true? "unset" : ''}}} 
                                label="Mobile Phone:" 
                                {...true ? {disabled: true}: null} 
                                value={`${specific_employee_info?.mobile_phone ? specific_employee_info?.mobile_phone : ''}`}
                                icon={
                                  <AcademicCapIcon className="h-5 w-5 text-blue-gray-300" />
                                }
                              />
                              <Input 
                                type="text" 
                                containerProps={{ className: "min-w-[72px] focused" }} 
                                labelProps={{style: {color: true? "unset" : ''}}} 
                                label="Approver:" 
                                {...true ? {disabled: true}: null} 
                                value={`${specific_employee_info?.approver ? specific_employee_info?.approver : ''}`}
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
                                type="text" 
                                containerProps={{ className: "min-w-[72px]" }} 
                                label="Civil Status:" 
                                labelProps={{style: {color: true? "unset" : ''}}} 
                                {...true ? {disabled: true}: null} 
                                value={`${specific_employee_info?.civil_status ? specific_employee_info?.civil_status : ''}`} 
                              />
                              <Input 
                                type="text" 
                                containerProps={{ className: "min-w-[72px] focused" }} 
                                labelProps={{style: {color: true? "unset" : ''}}} 
                                label="Gender:" 
                                {...true ? {disabled: true}: null} 
                                icon={
                                  <TagIcon className="h-5 w-5 text-blue-gray-300" />
                                }
                                value={ `${specific_employee_info?.gender ? specific_employee_info?.gender : ''}`}
                              />
                            </div>
                            <Input 
                              type="email" 
                              className="" 
                              label="Present Address:" 
                              labelProps={{style: {color: true? "unset" : ''}}} 
                              {...true? {disabled: true}: null} 
                              value={`${specific_employee_info?.address ? specific_employee_info?.address : ''}`}
                            />
                        </div>
                      </div>
                      <div className="my-0">
                        <div className="my-0 flex flex-wrap xl:flex-nowrap items-center gap-4">
                          <Input
                            label="Provincial Address:"
                            labelProps={{style: {color: true? "unset" : ''}}}
                            {...true? {disabled: true}: null} 
                            value={`${specific_employee_info?.provincial_address ? specific_employee_info?.provincial_address : ''}`}
                            icon={
                              <LockClosedOutline className="h-5 w-5 text-blue-gray-300" />
                            }
                          />
                        </div>
                      </div>
                      <div className="my-4 flex items-center gap-4">
                        <Button color={"teal"} variant={'outlined'} size="lg" className="w-full">Edit</Button>
                        <Button color={"teal"} size="lg" className="w-full">Save</Button>
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
                                  type="text" 
                                  containerProps={{ className: "min-w-[72px]" }} 
                                  labelProps={{style: {color: true? "unset" : ''}}} 
                                  label="Date Hired:" 
                                  {...true ? {disabled: true}: null} 
                                  value={`${specific_employee_info?.date_hired ? specific_employee_info?.date_hired : ''}`}
                                  icon={
                                    <TagIcon className="h-5 w-5 text-blue-gray-300" />
                                  }
                                />
                                <Input 
                                  type="text" 
                                  containerProps={{ className: "min-w-[72px] focused" }} 
                                  labelProps={{style: {color: true? "unset" : ''}}} 
                                  label="Date Resigned:" 
                                  {...true ? {disabled: true}: null} 
                                  icon={
                                    <FingerPrintIcon className="h-5 w-5 text-blue-gray-300" />
                                  }
                                  value={`${specific_employee_info?.date_resigned ? specific_employee_info?.date_resigned : ''}` }
                                />
                              </div>
                              <div className="flex items-center gap-4">
                                <Input 
                                  type="text" 
                                  containerProps={{ className: "min-w-[72px] focused" }} 
                                  labelProps={{style: {color: true? "unset" : ''}}} 
                                  label="Division Code:" 
                                  {...true ? {disabled: true}: null} 
                                  value={`${specific_employee_info?.division_code ? specific_employee_info?.division_code : ''}`}
                                  icon={
                                    <AcademicCapIcon className="h-5 w-5 text-blue-gray-300" />
                                  }
                                />
                                <Input 
                                  type="text" 
                                  containerProps={{ className: "min-w-[72px] focused" }} 
                                  labelProps={{style: {color: true? "unset" : ''}}} 
                                  label="Position Code:" 
                                  {...true ? {disabled: true}: null} 
                                  value={`${specific_employee_info?.position_code ? specific_employee_info?.position_code : ''}`}
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
                                  type="text" 
                                  containerProps={{ className: "min-w-[72px]" }} 
                                  label="City Code:" 
                                  labelProps={{style: {color: true? "unset" : ''}}} 
                                  {...true ? {disabled: true}: null} 
                                  value={`${specific_employee_info?.city_code ? specific_employee_info?.city_code : ''}`} 
                                />
                                <Input 
                                  type="text" 
                                  containerProps={{ className: "min-w-[72px] focused" }} 
                                  labelProps={{style: {color: true? "unset" : '', textOverflow: 'ellipsis', overflow: 'hidden'}}} 
                                  label="Branch Code:" 
                                  {...true ? {disabled: true}: null} 
                                  icon={
                                    <TagIcon className="h-5 w-5 text-blue-gray-300" />
                                  }
                                  value={ `${specific_employee_info?.branch_code ? specific_employee_info?.branch_code : ''}`}
                                />
                                <Input 
                                  type="text" 
                                  containerProps={{ className: "min-w-[72px]" }} 
                                  label="Department Code:" 
                                  labelProps={{style: {color: true? "unset" : '', textOverflow: 'ellipsis', overflow: 'hidden'}}} 
                                  {...true ? {disabled: true}: null} 
                                  icon={
                                    <UserGroupIcon className="h-5 w-5 text-blue-gray-300" />
                                  }
                                  value={ `${specific_employee_info?.department_code ? specific_employee_info?.department_code : ''}`}
                                />
                              </div>
                              <div className="my-0 flex items-center gap-4">
                                <Input 
                                  type="text" 
                                  containerProps={{ className: "min-w-[72px]" }} 
                                  label="Rank Code:" 
                                  labelProps={{style: {color: true? "unset" : ''}}} 
                                  {...true ? {disabled: true}: null} 
                                  value={`${specific_employee_info?.rank_code ? specific_employee_info?.rank_code : ''}`} 
                                />
                                <Input 
                                  type="text" 
                                  containerProps={{ className: "min-w-[72px] focused" }} 
                                  labelProps={{style: {color: true? "unset" : '', textOverflow: 'ellipsis', overflow: 'hidden'}}} 
                                  label="Payroll Group Code:" 
                                  {...true ? {disabled: true}: null} 
                                  icon={
                                    <TagIcon className="h-5 w-5 text-blue-gray-300" />
                                  }
                                  value={ `${specific_employee_info?.payroll_group_code ? specific_employee_info?.payroll_group_code : ''}`}
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
                              label="Tax Identification #:"
                              labelProps={{style: {color: true? "unset" : ''}}}
                              {...true? {disabled: true}: null} 
                              value={`${specific_employee_info?.tax_code ? specific_employee_info?.tax_code : ''}`}
                              icon={
                                <LockClosedOutline className="h-5 w-5 text-blue-gray-300" />
                              }
                            />
                            <Input
                              label="HDMF Pagibig:"
                              labelProps={{style: {color: true? "unset" : ''}}}
                              {...true? {disabled: true}: null} value={`${specific_employee_info?.pagibig_code ? specific_employee_info?.pagibig_code : ''}`}
                              icon={ 
                                <CheckCircleIcon className="h-5 w-5 text-blue-gray-300" />
                              }
                            />
                            <Input
                              label="SSS ID:"
                              labelProps={{style: {color: true? "unset" : ''}}}
                              {...true? {disabled: true}: null} 
                              value={`${specific_employee_info?.sssid_code ? specific_employee_info?.sssid_code :''}`}
                              icon={ 
                                <LockOpenIcon className="h-5 w-5 text-blue-gray-300" />
                              }
                            />
                            <Input
                              label="Philhealth #:"
                              labelProps={{style: {color: true? "unset" : ''}}}
                              {...true? {disabled: true}: null} 
                              value={`${specific_employee_info?.philhealth_code ? specific_employee_info?.philhealth_code : ''}`}
                              icon={
                                <UserPlusIcon className="h-5 w-5 text-blue-gray-300" />
                              }
                            />
                          </div>
                        </div>
                        <div className="my-4 flex items-center gap-4">
                          <Button color={"teal"} variant={'outlined'} size="lg" className="w-full">Edit</Button>
                          <Button color={"teal"} size="lg" className="w-full">Save</Button>
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
            </Card> */}
            <SpecificEmployee modalEntranceDelay={modalEntranceDelay} secondOptionModalEntranceDelay={secondOptionModalEntranceDelay} loadingEffect={handleModalEntranceDelay}/>
          </Box>
        </Modal>
      </div>
    </Fragment>

  );
}
