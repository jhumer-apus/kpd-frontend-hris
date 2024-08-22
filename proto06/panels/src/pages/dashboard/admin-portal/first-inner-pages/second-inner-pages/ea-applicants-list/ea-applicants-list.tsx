import { Fragment, useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridValueGetterParams, GridCellParams } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { getEmployeesList } from '@/store/actions/employees';
import { RootState, globalDate } from '@/store/configureStore';
import { getSpecificEmployeeInfo } from '@/store/actions/employees';
import { Modal } from '@mui/material';
import { SpecificEmployee } from './forms/SpecificEmployee';
import { APILink } from '@/store/configureStore';
import EmployeeExportToCsvButton from './local-components/export-to-csv-employee';
import AddEmployeeComponent from './local-components/add-employee';
import dayjs from 'dayjs';
import { APPLICANTSViewAction } from '@/store/actions/employee-and-applicants';
import { globalServerErrorMsg } from '@/store/configureStore';


const columns: GridColDef[] = [
  {
    field: 'date_applied',
    headerName: 'Date Applied',
    width: 150,
    // renderCell: (params: GridCellParams) => {
    //   if (params.value){
    //     return(
          
    //       <img src={`${APILink.replace('/api/v1/', '')}${params.value as string}`} alt="" width="50" height="50" style={{borderRadius: "10px", height: "40px", width: "40px", objectFit: "cover", border: "1px solid white", boxShadow: "1px 1px 10px gray"}}/>
    //       )
    //   } else {
    //     return (
    //       null
    //     )    
    //   }
    // },
    valueGetter: (params: GridValueGetterParams) => {
      const date = new Date(params.row.date_applied);
      return params.row.date_applied ? dayjs(date).format(`${globalDate}`) : '-';
    }
  },
  { field: 'application_status', headerName: 'Application Status', width: 140 },
  { 
    field: 'date_next_appointment', 
    headerName: 'Next Appointment', 
    width: 150,
    valueGetter: (params: GridValueGetterParams) => {
      const date = new Date(params.row.date_next_appointment);
      return params.row.date_next_appointment ? dayjs(date).format(`${globalDate}`) : '-';
    } 
  },
  { field: 'id', headerName: 'Applicant ID', width: 130 },
  {
    field: 'full_name',
    headerName: 'Full Name',
    description: 'This column has a value getter and is not sortable. Use Filter instead, by clicking on the three dots beside this header.',
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.first_name || ''} ${params.row.last_name || ''}`,
  },
  { field: 'middle_name', headerName: 'Middle Name', width: 150 },
  { 
    field: 'interview1_date', 
    headerName: '1st Interview Date:', 
    width: 150,
    valueGetter: (params: GridValueGetterParams) => {
      const date = new Date(params.row.interview1_date);
      return params.row.interview1_date ? dayjs(date).format("MM-DD-YYYY") : '-';
    } 
  },
  { field: 'interview1_result', headerName: '1st Interview Result', width: 150 },
  { field: 'interview1_by', headerName: 'Interviewed By:', width: 150 },

  { 
    field: 'interview2_date', 
    headerName: '2nd Interview Date:', 
    width: 150,
    valueGetter: (params: GridValueGetterParams) => {
      const date = new Date(params.row.interview2_date);
      return params.row.interview2_date ? dayjs(date).format("MM-DD-YYYY") : '-';
    } 
  },
  { field: 'interview2_result', headerName: '2nd Interview Result', width: 150 },
  { field: 'interview2_by', headerName: 'Interviewed By:', width: 150 },
  { 
    field: 'exam1_date', 
    headerName: '1st Exam Date:', 
    width: 150,
    valueGetter: (params: GridValueGetterParams) => {
      const date = new Date(params.row.exam1_date);
      return params.row.exam1_date ? dayjs(date).format("MM-DD-YYYY") : '-';
    } 
  },
  { field: 'exam1_result', headerName: '1st Exam Result', width: 150 },
  { 
    field: 'exam2_date', 
    headerName: '2nd Exam Date:', 
    width: 150,
    valueGetter: (params: GridValueGetterParams) => {
      const date = new Date(params.row.exam2_date);
      return params.row.exam2_date ? dayjs(date).format("MM-DD-YYYY") : '-';
    } 
  },
  { field: 'exam2_result', headerName: '2nd Exam Result', width: 150 },
];


export default function EAAPPLICANTSLIST() {
  const dispatch = useDispatch();
  const { employees_list, specific_employee_info } = useSelector((state: RootState) => state.employees);
  const [type, setType] = useState("staticInfo");
  const APPLICANTSListState = useSelector((state: RootState) => state.employeeAndApplicants.APPLICANTSView);

  const { status, error} = APPLICANTSListState;
  const [open, setOpen] = useState(false);
  const [modalEntranceDelay, setModalEntranceDelay] = useState(false);
  const [secondOptionModalEntranceDelay, setSecondOptionModalEntranceDelay] = useState(false);
  function handleOpen(){
    setOpen(true);
  };

  function handleClose(){
    setOpen(false);
    setType("staticInfo");
  };

  useEffect(() => {
    dispatch(APPLICANTSViewAction());
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
  
  return (
    <Fragment>
      <div className="my-4 flex flex-wrap items-center gap-4">
        <AddEmployeeComponent/>
        <EmployeeExportToCsvButton data={employees_list} />
      </div>
      <div style={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={APPLICANTSListState.data ?? []}
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
          localeText={{ noRowsLabel: `${status === 'loading' ? `${status?.toUpperCase()}...` : status === 'failed' ?  `${globalServerErrorMsg}` : 'Data Loaded - Showing 0 Results'}` }}
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
