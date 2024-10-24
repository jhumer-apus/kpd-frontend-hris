import { Fragment, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { DataGrid, GridColDef, GridValueGetterParams, GridCellParams, getGridStringOperators, GridFilterModel, GridSortModel, GridPaginationModel, GridCallbackDetails } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { getEmployeesList } from '@/store/actions/employees';
import { RootState, globalDate } from '@/store/configureStore';
import { getSpecificEmployeeInfo } from '@/store/actions/employees';
import { Modal, Box } from '@mui/material';
import { UserProfile } from './forms/AddEmployee';
import { useForm } from 'react-hook-form';
import { EMPLOYEESViewInterface } from '@/types/types-store';
import { ImportEmployee } from './forms/ImportEmployee';
import { Button } from "@material-tailwind/react";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { SpecificEmployee } from './forms/SpecificEmployee';
import { APILink } from '@/store/configureStore';
import EmployeeExportToCsvButton from './local-components/export-to-csv-employee';
import dayjs from 'dayjs';
import ExportToCSVButton from '@/public-components/ExportToCSVButton';
import axios from 'axios';
import axiosInstance from '@/helpers/axiosConfig';
import ViewEmployee from '@/public-components/employees/ViewEmployee';
import { EmployeeContext, EmployeeProvider } from '@/context/employee/EmployeeContext';
import { PageParamsMeta } from '@/types/index';

const columns: GridColDef[] = [
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
  // {
  //   field: 'fullName',
  //   headerName: 'Full name',
  //   description: 'This column has a value getter and is not sortable.',
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (params: GridValueGetterParams) =>
  //     `${params.row.first_name || ''} ${params.row.last_name || ''}`,
  // },
  { 
    field: 'date_hired', 
    headerName: 'Date Hired', 
    width: 150,
    valueGetter: (params: GridValueGetterParams) => {
      const date = new Date(params.row.date_hired);
      return params.row.date_hired ? dayjs(date).format(`${globalDate}`) : '-';
    }, 
  },
  { field: 'branch_code', headerName: 'Branch', width: 150, valueGetter: (params: GridValueGetterParams) => params.row.branch_data.branch_name },
  // { field: 'mobile_phone', headerName: 'Mobile Number', width: 150 },
  // { field: `user`, headerName: 'Has HRIS Access', width: 150, valueGetter: (params: GridValueGetterParams) => `${params.row.user?.is_active ? 'Active' : 'No Access'}` },
  { field: 'bio_id', headerName: 'Biometrics ID', width: 150 },
  { field: 'approver1', headerName: 'Approver 1', width: 150 },
  { field: 'approver2', headerName: 'Approver 2', width: 150 }
];

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  borderRadius: '10px'
};

interface EmployeeListResponse {
  page: number,
  next: string | null,
  previous: string | null, 
  total_rows: number,
  data: any []
}


export default function DataTable() {
  const dispatch = useDispatch();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<EMPLOYEESViewInterface>();
  const { employees_list, specific_employee_info } = useSelector((state: RootState) => state.employees);
  const [employeeList, setEmployeeList] = useState<EmployeeListResponse>(
    {
      page: 1,
      next: null,
      previous: null,
      total_rows: 0,
      data: []
    }
  )

  const [searchParams, setSearchParams] = useState({
    field: null,
    value: null,
    page: null
  })


  const [exportData, setExportData] = useState<any[]>([]);
  const [type, setType] = useState("staticInfo");
  const employeeContext = useContext(EmployeeContext);

  const {employeeData, fetchEmployeeData} = employeeContext

  
  // Specific Employee Modal Form 
  // States: 
  // const [open, setOpen] = useState(false);
  const [viewEmployee, setViewEmployee] = useState<boolean>(false)


  const [modalEntranceDelay, setModalEntranceDelay] = useState(false);
  const [secondOptionModalEntranceDelay, setSecondOptionModalEntranceDelay] = useState(false);
  // function handleOpen(){
  //   setOpen(true);
  // };

  // function handleClose(){
  //   setOpen(false);
  //   setType("staticInfo");
  // };

  // Add Employee Modal Form
  // States:
  const [open2, setOpen2] = useState(false);
  function handleOpen2(){
    setOpen2(true);
  };

  function handleClose2(){
    setOpen2(false);
  };

  // Import Employee Modal Form
  // States:
  const [open3, setOpen3] = useState(false);
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

  useEffect(() => {
    fetchExportData()
  },[])

  const fetchExportData = async () => {
    await axiosInstance.get(`export_employees/`)
            .then(res => 
              {
                const data = Array.isArray(res.data) ? res.data: []
                setExportData(curr => data)
              }
            )
  }

  const customizedColumn = useMemo(() => 
    columns.map(col => (
      {
        ...col,
        filterOperators: getGridStringOperators().filter(operator => operator.value == "contains")
      }
    ))
  ,[columns])

  const fetchEmployees = async (page:number, field:string, value:string | number | null) => {

    // const { page, field, value } = meta

    await axiosInstance.get(`employees/`, {
      params: {
        page: page,
        field: field,
        value: value
      }
    }).then((res:any) => {
      setEmployeeList((curr) => (
        {
          next: res.meta.next,
          previous: res.meta.previous,
          page: res.meta.page,
          total_rows: res.meta.total_rows,
          data: res.data
        }
      ))
    })
  }


  const handleChangePagination = (model: GridPaginationModel, details: GridCallbackDetails) => {

    setSearchParams((curr:any) => (
      {
        ...curr,
        page: model.page
      }
    ))

  }

  const onFilterChange = useCallback((filterModel: GridFilterModel) => {


    setSearchParams((curr:any) => (
      {
        ...curr,
        field: filterModel.field
      }
    ))

  }, []);
  const handleSortModelChange = useCallback((sortModel: GridSortModel) => {
    // Here you save the data you need from the sort model
    console.log(sortModel)
  }, []);

  useEffect(() => {
    fetchEmployees(searchParams.page, searchParams.field, searchParams.value)
  },[searchParams])


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
            <Box sx={{ ...style, width:"80%", height: "90%", overflowY: "auto",  background: "#fff", backgroundImage: "#fff" }}>
            <UserProfile/>
            </Box>
        </Modal>

        <div className='mb-4'>
          <ExportToCSVButton
            data={exportData}
            isDisable={exportData.length == 0? true: false}
          />
        </div>
        {/* <EmployeeExportToCsvButton data={employees_list} /> */}
        {/* <Button 
          className='mb-4 flex gap-2'
          variant='outlined'
          color='indigo'
          // icon={<ArrowUpTrayIcon/>}
          onClick={()=>{handleOpen3()}}
        >
          <ArrowDownTrayIcon style={{height: '15px'}}/> Import / Bulk Entry Employee CSV 
        </Button> */}
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
          columns={customizedColumn}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          paginationModel={{
            page: employeeList.page,
            pageSize: 10
          }}
          // paginationModel={paginationModel}
          paginationMode="server"
          onPaginationModelChange={handleChangePagination}
          rowCount={employeeList.total_rows}
          // checkboxSelection
          onRowClick={(e) => {
            setViewEmployee(curr => true)
            fetchEmployeeData(e.row?.emp_no)
            setModalEntranceDelay(true)
            setSecondOptionModalEntranceDelay(true)
            // dispatchSpecificEmployeeInfo(e.row?.emp_no)
          }}
          onFilterModelChange={onFilterChange}
          onSortModelChange={handleSortModelChange}
          style={{ cursor: 'pointer'}}
          localeText={{ noRowsLabel: 'Loading...' }} // To do: can optimize after reducer optimized
        />

        <ViewEmployee 
          open={viewEmployee} 
          handleClose={() => setViewEmployee(curr => false)}
        />

        {/* <Modal
          open={false}
          onClose={() => setViewEmployee(curr => ({...curr, open:false}))}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
          className='overflow-auto'
        >
          <SpecificEmployee handleClose={handleClose} modalEntranceDelay={modalEntranceDelay} secondOptionModalEntranceDelay={secondOptionModalEntranceDelay} loadingEffect={handleModalEntranceDelay}/>
        </Modal> */}
      </div>
    </Fragment>

  );
}
