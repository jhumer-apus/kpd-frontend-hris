import { Fragment, JSXElementConstructor, useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridValueGetterParams, GridCellParams } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { getEmployeesList } from '@/store/actions/employees';
import { RootState } from '@/store/configureStore';
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
import { APILink } from '@/store/configureStore';

const columns: GridColDef[] = [
  // { field: 'id', headerName: 'ID', width: 70 },
  {
    field: 'employee_image',
    headerName: 'Display Pic',
    width: 150,
    renderCell: (params: GridCellParams) => {
      if (params.value){
        return(
          
          <img src={`${APILink.replace('/api/v1/', '')}${params.value as string}`} alt="" width="50" height="50" style={{borderRadius: "10px", height: "40px", width: "40px", objectFit: "cover", border: "1px solid white", boxShadow: "1px 1px 10px gray"}}/>
          )
      } else {
        return (
          null
        )    
      }
    },
  },
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

  const data = employees_list;
  function convertToCSV(data: GetEmployeesListsType[]) {
    const replacer = (key: string, value: any) => value === null ? '' : value;
    const header = Object.keys(data[0]);
    const csv = data.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
    csv.unshift(header.join(','));
    return csv.join('\r\n');
  };
  function downloadCSV(csv: string, filename: string) {
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const handleDownload = () => {
    if(!data){
      return; //Todo: Error Handling 
    }
    const csv = convertToCSV(data);
    downloadCSV(csv, `${window.prompt("File Name", "export_file_name")}`);
  };
  
  return (
    <Fragment>
      <div className="my-4 flex flex-wrap items-center gap-4">
        <Button 
          className='mb-4'
          variant='gradient'
          color='indigo'
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
          color='indigo'
          variant='gradient'
          onClick={handleDownload}>
        
        <ArrowUpTrayIcon style={{height: '15px'}}/> Export / Download as CSV
        </Button>
        <Button 
          className='mb-4 flex gap-2'
          variant='outlined'
          color='indigo'
          // icon={<ArrowUpTrayIcon/>}
          onClick={()=>{handleOpen3()}}
        >
        <ArrowUpTrayIcon style={{height: '15px'}}/> Import / Bulk Entry Employee CSV 
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
      <div style={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={employees_list ?? []}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 25 },
            },
          }}
          pageSizeOptions={[25, 30, 35, 40]}
          // checkboxSelection
          onRowClick={(e) => {
            handleOpen()
            setModalEntranceDelay(true)
            setSecondOptionModalEntranceDelay(true)
            dispatchSpecificEmployeeInfo(e.row?.emp_no)
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
          <SpecificEmployee modalEntranceDelay={modalEntranceDelay} secondOptionModalEntranceDelay={secondOptionModalEntranceDelay} loadingEffect={handleModalEntranceDelay}/>
        </Modal>
      </div>
    </Fragment>

  );
}
