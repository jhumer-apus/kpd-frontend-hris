import { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { getEmployeesList } from '@/store/actions/employees';
import { RootState } from '@/store/reducers';
import { getSpecificEmployeeInfo } from '@/store/actions/employees';
import { Modal, Box, CircularProgress } from '@mui/material';
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
  UserIcon
} from "@heroicons/react/24/outline";

const columns: GridColDef[] = [
  // { field: 'id', headerName: 'ID', width: 70 },
  { field: 'emp_no', headerName: 'Employee #', width: 120 },
  { field: 'first_name', headerName: 'First Name', width: 150 },
  { field: 'last_name', headerName: 'Last Name', width: 150 },
  // {
  //   field: 'age',
  //   headerName: 'Age',
  //   type: 'number',
  //   width: 90,
  // },
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
  const { employees_list, specific_employee_info } = useSelector((state: RootState) => state.employees);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEmployeesList());
  }, []);
  const dispatchSpecificEmployeeInfo = (employee_number: number) => {
    // console.log(typeof employee_number, "aahaha")
    console.log(dispatch(getSpecificEmployeeInfo({employee_id: employee_number})), "haduken");
    return dispatch(getSpecificEmployeeInfo({employee_id: employee_number}));   
  }
  console.log(specific_employee_info, "eto un tae", employees_list, "eto un list");
  const [open, setOpen] = useState(false);
  const [modalEntranceDelay, setModalEntranceDelay] = useState(false);
  const [secondOptionModalEntranceDelay, setSecondOptionModalEntranceDelay] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setType("card");
  };
  const countries = [{name: "Philippines"}, {name: "United States"}, {name: "Canada"}, {name: "Australia"}];
  const [type, setType] = useState("card");
  

  useEffect(()=>{
    if(open){
      setTimeout(()=>{
        setModalEntranceDelay(false)
        // setTimeout(()=>{
        //   setModalEntranceDelay(true)
        // }, 1000)
      }, 1000)
      setTimeout(()=>{
        setSecondOptionModalEntranceDelay(false)
        // setTimeout(()=>{
        //   setModalEntranceDelay(true)
        // }, 1000)
      }, 1200)

    }
  }, [open])

  return (
    <>
    <div className="my-4 flex flex-wrap items-center gap-4">
    <Button className='mb-4'>+ Add Employee</Button>
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
          console.log(e, dispatchSpecificEmployeeInfo(e.row.emp_no))
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
        <Box sx={{ ...style, width: "90%", maxHeight: "90%", overflowY: "auto",  background: "#e9bcb7", backgroundImage: "linear-gradient(315deg, #e9bcb7 0%, #29524a 74%)" }}>
          <Card className="w-full max-w-[100rem] ml-auto mr-auto">
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
            <CardBody id="parent-modal-description">
              <Tabs value={type} className="overflow-visible">
                <TabsHeader className="relative z-0 ">
                <Tab value="card" onClick={() => setType("card")}>
                Basic Information
                </Tab>
                <Tab value="paypal" onClick={() => setType("paypal")}>
                Personal Information
                </Tab>
                <Tab value="crypto" onClick={() => setType("crypto")}>
                Employment Details
                </Tab>
                </TabsHeader>
                <TabsBody
                  // className="!overflow-x-hidden !overflow-y-visible"
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
                <TabPanel value="card" className="p-0">
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
                          <Input type="text" containerProps={{ className: "min-w-[72px]" }} labelProps={{style: {color: true? "unset" : ''}}} label="Database ID" {...true ? {disabled: true}: null} value={`${specific_employee_info?.id}`}/>
                          <Input type="text" containerProps={{ className: "min-w-[72px] focused" }} data-attribute="meowmow" label="Biometric IDss" {...true ? {disabled: true}: null} value={ specific_employee_info?.bio_id? `Biometric ID: ${specific_employee_info?.bio_id}` : ''}/>
                        </div>
                        <Input type="email" className="" label="Email Address" {...true? {disabled: true}: null} value={ true ? `Email Address: ${specific_employee_info?.email_address}` : ''}/>
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
                          <Input type="text" containerProps={{ className: "min-w-[72px]" }} label="Employee Number" labelProps={{style: {color: true? "unset" : ''}}} {...true ? {disabled: true}: null} value={`${specific_employee_info?.emp_no}`} />
                          <Input type="text" containerProps={{ className: "min-w-[72px]" }} label="Biometric ID" labelProps={{style: {color: true? "unset" : ''}}} {...true ? {disabled: true}: null} value={ `${specific_employee_info?.bio_id}`}/>
                        </div>
                        <Input type="email" className="" label="Email Address" labelProps={{style: {color: true? "unset" : ''}}} {...true? {disabled: true}: null} value={ true ? `${specific_employee_info?.email_address}` : ''}/>
                    </div>
                  </div>

                    <div className="my-6">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="mb-4 font-medium"
                      >
                      Basic Info Details
                      </Typography>
                      <div className="my-4 flex flex-wrap items-center gap-4">
                        <Input
                          label="First Name"
                          {...true? {disabled: true}: null} value={ true ? `First Name: ${specific_employee_info?.first_name}` : ''}
                          // label="Card Number"
                          // maxLength={19}
                          // value={formatCardNumber(cardNumber)}
                          // onChange={(event) => setCardNumber(event.target.value)}
                          icon={
                            <UserIcon className="h-5 w-5 text-blue-gray-300" />
                          }
                        />
                        <Input
                          label="Middle Name"
                          {...true? {disabled: true}: null} value={ specific_employee_info?.middle_name ? `Middle Name: ${specific_employee_info?.middle_name}` : ``}
                          // label="Card Number"
                          // maxLength={19}
                          // value={formatCardNumber(cardNumber)}
                          // onChange={(event) => setCardNumber(event.target.value)}
                          icon={
                            <UserIcon className="h-5 w-5 text-blue-gray-300" />
                          }
                        />
                        <Input
                          label="Last Name"
                          {...true? {disabled: true}: null} value={ specific_employee_info?.last_name ? `Last Name: ${specific_employee_info?.last_name}` : `Middle Name: -`}
                          // maxLength={19}
                          // value={formatCardNumber(cardNumber)}
                          // onChange={(event) => setCardNumber(event.target.value)}
                          icon={ null
                            // <CreditCardIcon className="h-5 w-5 text-blue-gray-300" />
                          }
                        />
                      </div>

                      <div className="my-4 flex items-center gap-4">
                        <Input
                          label="Expires"
                          // label="Expires"
                          // maxLength={5}
                          // value={formatExpires(cardExpires)}
                          // onChange={(event) => setCardExpires(event.target.value)}
                          containerProps={{ className: "min-w-[72px]" }}
                        />
                        <Input
                          label="CVC"
                          maxLength={4}
                          containerProps={{ className: "min-w-[72px]" }}
                        />
                      </div>
                      <Input label="Holder Name" />
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
                <TabPanel value="paypal" className="p-0">
                  <form className="mt-12 flex flex-col gap-4">
                    <div>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="mb-4 font-medium"
                      >
                      Technical Details
                      </Typography>
                      <div className="my-1 flex flex-wrap sm:flex-nowrap items-center gap-4">
                      <Input type="text" label="Database ID" {...true? {disabled: true}: null} value={ true? `Database ID:sd 0000` : ''}/>
                      ss<Input type="email" className=" " label="Email Address" {...true? {disabled: true}: null} value={ true ? `Email Address: juandelacruz11@gmail.com` : ''}/>
                      </div>

                    </div>
                    <div className="my-6">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="mb-4 font-medium"
                      >
                      Basic Info Details
                      </Typography>
                      <div className="my-4 flex items-center gap-4">
                        <Input
                          label="First Name"
                          {...true? {disabled: true}: null} value={ true ? `First Name: Juan` : ''}
                          // label="Card Number"
                          // maxLength={19}
                          // value={formatCardNumber(cardNumber)}
                          // onChange={(event) => setCardNumber(event.target.value)}
                          icon={
                            <UserIcon className="h-5 w-5 text-blue-gray-300" />
                          }
                        />
                        <Input
                          label="Last Name"
                          {...true? {disabled: true}: null} value={ true ? `Last Name: De La Cruz` : ''}
                          // maxLength={19}
                          // value={formatCardNumber(cardNumber)}
                          // onChange={(event) => setCardNumber(event.target.value)}
                          icon={ null
                            // <CreditCardIcon className="h-5 w-5 text-blue-gray-300" />
                          }
                        />
                      </div>

                      <div className="my-4 flex items-center gap-4">
                        <Input
                          label="Expires"
                          // label="Expires"
                          // maxLength={5}
                          // value={formatExpires(cardExpires)}
                          // onChange={(event) => setCardExpires(event.target.value)}
                          containerProps={{ className: "min-w-[72px]" }}
                        />
                        <Input
                          label="CVC"
                          maxLength={4}
                          containerProps={{ className: "min-w-[72px]" }}
                        />
                      </div>
                      <Input label="Holder Name" />
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
                <TabPanel value="crypto" className="p-0">
                  <form className="mt-12 flex flex-col gap-4">
                    <div>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="mb-4 font-medium"
                      >
                        Personal Details
                      </Typography>
                      <Input type="email" label="Email Address" />
                    </div>
                    <div className="my-6">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="mb-4 font-medium"
                      >
                        Billing Address
                      </Typography>
                      <Select label="Country" menuProps={{ className: "h-48" }}>
                        {countries.map(({ name }: any) => (
                          <Option key={name} value={name}>
                            {name}
                          </Option>
                        ))}
                      </Select>
                      <Input
                        label="Postal Code"
                        containerProps={{ className: "mt-4" }}
                      />
                    </div>
                    <Button size="lg" color="amber" className="relative h-12">
                      {/* <img
                        alt="paypal "
                        className="absolute top-2/4 left-2/4 w-16 -translate-x-2/4 -translate-y-2/4"
                        src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAxcHgiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAxMDEgMzIiIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaW5ZTWluIG1lZXQiIHhtbG5zPSJodHRwOiYjeDJGOyYjeDJGO3d3dy53My5vcmcmI3gyRjsyMDAwJiN4MkY7c3ZnIj48cGF0aCBmaWxsPSIjMDAzMDg3IiBkPSJNIDEyLjIzNyAyLjggTCA0LjQzNyAyLjggQyAzLjkzNyAyLjggMy40MzcgMy4yIDMuMzM3IDMuNyBMIDAuMjM3IDIzLjcgQyAwLjEzNyAyNC4xIDAuNDM3IDI0LjQgMC44MzcgMjQuNCBMIDQuNTM3IDI0LjQgQyA1LjAzNyAyNC40IDUuNTM3IDI0IDUuNjM3IDIzLjUgTCA2LjQzNyAxOC4xIEMgNi41MzcgMTcuNiA2LjkzNyAxNy4yIDcuNTM3IDE3LjIgTCAxMC4wMzcgMTcuMiBDIDE1LjEzNyAxNy4yIDE4LjEzNyAxNC43IDE4LjkzNyA5LjggQyAxOS4yMzcgNy43IDE4LjkzNyA2IDE3LjkzNyA0LjggQyAxNi44MzcgMy41IDE0LjgzNyAyLjggMTIuMjM3IDIuOCBaIE0gMTMuMTM3IDEwLjEgQyAxMi43MzcgMTIuOSAxMC41MzcgMTIuOSA4LjUzNyAxMi45IEwgNy4zMzcgMTIuOSBMIDguMTM3IDcuNyBDIDguMTM3IDcuNCA4LjQzNyA3LjIgOC43MzcgNy4yIEwgOS4yMzcgNy4yIEMgMTAuNjM3IDcuMiAxMS45MzcgNy4yIDEyLjYzNyA4IEMgMTMuMTM3IDguNCAxMy4zMzcgOS4xIDEzLjEzNyAxMC4xIFoiPjwvcGF0aD48cGF0aCBmaWxsPSIjMDAzMDg3IiBkPSJNIDM1LjQzNyAxMCBMIDMxLjczNyAxMCBDIDMxLjQzNyAxMCAzMS4xMzcgMTAuMiAzMS4xMzcgMTAuNSBMIDMwLjkzNyAxMS41IEwgMzAuNjM3IDExLjEgQyAyOS44MzcgOS45IDI4LjAzNyA5LjUgMjYuMjM3IDkuNSBDIDIyLjEzNyA5LjUgMTguNjM3IDEyLjYgMTcuOTM3IDE3IEMgMTcuNTM3IDE5LjIgMTguMDM3IDIxLjMgMTkuMzM3IDIyLjcgQyAyMC40MzcgMjQgMjIuMTM3IDI0LjYgMjQuMDM3IDI0LjYgQyAyNy4zMzcgMjQuNiAyOS4yMzcgMjIuNSAyOS4yMzcgMjIuNSBMIDI5LjAzNyAyMy41IEMgMjguOTM3IDIzLjkgMjkuMjM3IDI0LjMgMjkuNjM3IDI0LjMgTCAzMy4wMzcgMjQuMyBDIDMzLjUzNyAyNC4zIDM0LjAzNyAyMy45IDM0LjEzNyAyMy40IEwgMzYuMTM3IDEwLjYgQyAzNi4yMzcgMTAuNCAzNS44MzcgMTAgMzUuNDM3IDEwIFogTSAzMC4zMzcgMTcuMiBDIDI5LjkzNyAxOS4zIDI4LjMzNyAyMC44IDI2LjEzNyAyMC44IEMgMjUuMDM3IDIwLjggMjQuMjM3IDIwLjUgMjMuNjM3IDE5LjggQyAyMy4wMzcgMTkuMSAyMi44MzcgMTguMiAyMy4wMzcgMTcuMiBDIDIzLjMzNyAxNS4xIDI1LjEzNyAxMy42IDI3LjIzNyAxMy42IEMgMjguMzM3IDEzLjYgMjkuMTM3IDE0IDI5LjczNyAxNC42IEMgMzAuMjM3IDE1LjMgMzAuNDM3IDE2LjIgMzAuMzM3IDE3LjIgWiI+PC9wYXRoPjxwYXRoIGZpbGw9IiMwMDMwODciIGQ9Ik0gNTUuMzM3IDEwIEwgNTEuNjM3IDEwIEMgNTEuMjM3IDEwIDUwLjkzNyAxMC4yIDUwLjczNyAxMC41IEwgNDUuNTM3IDE4LjEgTCA0My4zMzcgMTAuOCBDIDQzLjIzNyAxMC4zIDQyLjczNyAxMCA0Mi4zMzcgMTAgTCAzOC42MzcgMTAgQyAzOC4yMzcgMTAgMzcuODM3IDEwLjQgMzguMDM3IDEwLjkgTCA0Mi4xMzcgMjMgTCAzOC4yMzcgMjguNCBDIDM3LjkzNyAyOC44IDM4LjIzNyAyOS40IDM4LjczNyAyOS40IEwgNDIuNDM3IDI5LjQgQyA0Mi44MzcgMjkuNCA0My4xMzcgMjkuMiA0My4zMzcgMjguOSBMIDU1LjgzNyAxMC45IEMgNTYuMTM3IDEwLjYgNTUuODM3IDEwIDU1LjMzNyAxMCBaIj48L3BhdGg+PHBhdGggZmlsbD0iIzAwOWNkZSIgZD0iTSA2Ny43MzcgMi44IEwgNTkuOTM3IDIuOCBDIDU5LjQzNyAyLjggNTguOTM3IDMuMiA1OC44MzcgMy43IEwgNTUuNzM3IDIzLjYgQyA1NS42MzcgMjQgNTUuOTM3IDI0LjMgNTYuMzM3IDI0LjMgTCA2MC4zMzcgMjQuMyBDIDYwLjczNyAyNC4zIDYxLjAzNyAyNCA2MS4wMzcgMjMuNyBMIDYxLjkzNyAxOCBDIDYyLjAzNyAxNy41IDYyLjQzNyAxNy4xIDYzLjAzNyAxNy4xIEwgNjUuNTM3IDE3LjEgQyA3MC42MzcgMTcuMSA3My42MzcgMTQuNiA3NC40MzcgOS43IEMgNzQuNzM3IDcuNiA3NC40MzcgNS45IDczLjQzNyA0LjcgQyA3Mi4yMzcgMy41IDcwLjMzNyAyLjggNjcuNzM3IDIuOCBaIE0gNjguNjM3IDEwLjEgQyA2OC4yMzcgMTIuOSA2Ni4wMzcgMTIuOSA2NC4wMzcgMTIuOSBMIDYyLjgzNyAxMi45IEwgNjMuNjM3IDcuNyBDIDYzLjYzNyA3LjQgNjMuOTM3IDcuMiA2NC4yMzcgNy4yIEwgNjQuNzM3IDcuMiBDIDY2LjEzNyA3LjIgNjcuNDM3IDcuMiA2OC4xMzcgOCBDIDY4LjYzNyA4LjQgNjguNzM3IDkuMSA2OC42MzcgMTAuMSBaIj48L3BhdGg+PHBhdGggZmlsbD0iIzAwOWNkZSIgZD0iTSA5MC45MzcgMTAgTCA4Ny4yMzcgMTAgQyA4Ni45MzcgMTAgODYuNjM3IDEwLjIgODYuNjM3IDEwLjUgTCA4Ni40MzcgMTEuNSBMIDg2LjEzNyAxMS4xIEMgODUuMzM3IDkuOSA4My41MzcgOS41IDgxLjczNyA5LjUgQyA3Ny42MzcgOS41IDc0LjEzNyAxMi42IDczLjQzNyAxNyBDIDczLjAzNyAxOS4yIDczLjUzNyAyMS4zIDc0LjgzNyAyMi43IEMgNzUuOTM3IDI0IDc3LjYzNyAyNC42IDc5LjUzNyAyNC42IEMgODIuODM3IDI0LjYgODQuNzM3IDIyLjUgODQuNzM3IDIyLjUgTCA4NC41MzcgMjMuNSBDIDg0LjQzNyAyMy45IDg0LjczNyAyNC4zIDg1LjEzNyAyNC4zIEwgODguNTM3IDI0LjMgQyA4OS4wMzcgMjQuMyA4OS41MzcgMjMuOSA4OS42MzcgMjMuNCBMIDkxLjYzNyAxMC42IEMgOTEuNjM3IDEwLjQgOTEuMzM3IDEwIDkwLjkzNyAxMCBaIE0gODUuNzM3IDE3LjIgQyA4NS4zMzcgMTkuMyA4My43MzcgMjAuOCA4MS41MzcgMjAuOCBDIDgwLjQzNyAyMC44IDc5LjYzNyAyMC41IDc5LjAzNyAxOS44IEMgNzguNDM3IDE5LjEgNzguMjM3IDE4LjIgNzguNDM3IDE3LjIgQyA3OC43MzcgMTUuMSA4MC41MzcgMTMuNiA4Mi42MzcgMTMuNiBDIDgzLjczNyAxMy42IDg0LjUzNyAxNCA4NS4xMzcgMTQuNiBDIDg1LjczNyAxNS4zIDg1LjkzNyAxNi4yIDg1LjczNyAxNy4yIFoiPjwvcGF0aD48cGF0aCBmaWxsPSIjMDA5Y2RlIiBkPSJNIDk1LjMzNyAzLjMgTCA5Mi4xMzcgMjMuNiBDIDkyLjAzNyAyNCA5Mi4zMzcgMjQuMyA5Mi43MzcgMjQuMyBMIDk1LjkzNyAyNC4zIEMgOTYuNDM3IDI0LjMgOTYuOTM3IDIzLjkgOTcuMDM3IDIzLjQgTCAxMDAuMjM3IDMuNSBDIDEwMC4zMzcgMy4xIDEwMC4wMzcgMi44IDk5LjYzNyAyLjggTCA5Ni4wMzcgMi44IEMgOTUuNjM3IDIuOCA5NS40MzcgMyA5NS4zMzcgMy4zIFoiPjwvcGF0aD48L3N2Zz4"
                      /> */}
                      Approve
                    </Button>
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
        </Box>
      </Modal>
    </div>
    </>

  );
}
