import { useEffect, useState, SetStateAction } from "react";
import { Box } from "@mui/material";
import { DataGrid, GridValueGetterParams, GridRowSelectionModel, GridCallbackDetails } from "@mui/x-data-grid";
import { DTRCutoffListEmployees, ProcessPayroll, previewDtrCsvItem } from "@/types/types-pages";
import { useSelector, useDispatch } from "react-redux";
import { getCutoffList, mergeCutoffListAndEmployee, summarizeCutoffListAndEmployee } from "@/store/actions/dtr";
import MergeDTRHelp from "../local-popovers/create-payroll-help";
import {Button} from "@mui/material";
import { RootState } from "@/store/configureStore";
import { CutoffListMergeSelectionState } from "@/types/types-pages";
import CircularStatic from "../local-progress/circular-progress";
import { processPayroll } from "@/store/actions/payroll";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { globalServerErrorMsg } from "@/store/configureStore";


const columns = [
  {
    field: "id",
    headerName: "Entry ID",
    width: 80,
  },
  {
    field: "emp_no",
    headerName: "Employee #",
    width: 100,
  },
  {
    field: "emp_fullname",
    headerName: "Employee Fullname",
    width: 180,
    valueGetter: (params: GridValueGetterParams) => {
      const first_name = params.row.first_name;
      const middle_name = params.row.middle_name;
      const last_name = params.row.last_name;
      return `${first_name}${middle_name? ` ${middle_name} ` : ' '}${last_name}`;
    }
  },
  {
    field: "bio_id",
    headerName: "Biometrics",
  },
  // {
  //   field: "date_hired",
  //   headerName: "Date Hired"
  // },
  // {
  //   field: "department_code",
  //   headerName: "Department"
  // },
  // {
  //   field: "payroll_group_code",
  //   headerName: "PG Code",
  //   width: 80,
  // },
  // {
  //   field: "division_code",
  //   headerName: "Div Code",
  //   width: 80,
  // },
  // {
  //   field: "co_is_processed",
  //   headerName: "Processed"
  // },
];

interface CutOffListEmployees {
  // status: string | null,
  employees: DTRCutoffListEmployees[] | null,
  // error: string | null,
  selectedRows: ProcessPayroll,
  setSelectedRows: (value: SetStateAction<ProcessPayroll>) => void,
}


export default function CutOffListEmployees(props: CutOffListEmployees) { 
  const { employees, selectedRows, setSelectedRows} = props;
  const dispatch = useDispatch();
  const { status, error } = useSelector((state: RootState)=> state.dtr.getCutoffListEmployees);
  
  const booleanValues = Object.values(selectedRows).filter(
    value => typeof value === 'boolean'
  );
  const isAllFalse = booleanValues.every(value => typeof value === 'boolean' && value === false);
  const isAtLeastOneTrue = booleanValues.some(value => typeof value === 'boolean' && value === true);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSelection = (newSelection: GridRowSelectionModel, details: GridCallbackDetails) => {
    let emp_no_locale = [] as Array<number>;
    newSelection.forEach((id) => {
      const row = employees?.find((row) => row.id === id);
      if (row) {
        emp_no_locale.push(row.emp_no);
      }
    });
    setSelectedRows((prevState) => ({
      ...prevState,
      emp_no: emp_no_locale,
    }));
  };

  function initializeMerge(){
    if(!Number.isNaN(selectedRows.cutoff_code) && isAtLeastOneTrue){
      dispatch(processPayroll(selectedRows))
    } else if(!Number.isNaN(selectedRows.cutoff_code) && isAllFalse){
      handleOpen();
    } else if(Number.isNaN(selectedRows.cutoff_code) && isAllFalse) {
      alert("There is no selected cutoff period. Make sure to select one.")
    }
  };

  return (
    <>
      <div className='flex justify-between items-center'>
      <b className="flex items-center">Choose Employee or All:</b>
      <div className="flex justify-between">
      <CircularStatic/>
      <Button onClick={initializeMerge} variant={'contained'}> Create Payroll</Button>
      </div>
      </div>
      <div style={{ height: '600px' , width: '100%' }}>
      <DataGrid
        rows={employees ? employees : []}
        columns={columns}
        sx={{ mt: 1 }}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 25 },
          },
        }}
        checkboxSelection
        onRowSelectionModelChange={handleSelection}
        localeText={{ noRowsLabel: `${status === 'loading' ? `${status?.toUpperCase()}...` : status === 'failed' ?  `${globalServerErrorMsg}` : 'Data Loaded - Showing 0 Results'}` }}
        pageSizeOptions={[25, 50, 75, 100]}
      />
      </div>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
            PAYROLL DEDUCTIONS <ErrorOutlineIcon/>
          </Typography>
          <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
            There is no chosen deductions for this payroll process, are you sure you want to proceed?
          </Typography>
          <div className="mt-6">
          <Button sx={{marginRight: '6px'}} variant="contained" onClick={()=> {
            dispatch(processPayroll(selectedRows))
            handleClose()
          }
        }>
            Proceed
          </Button>
          <Button onClick={handleClose}>
            Cancel
          </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
}


const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '10px',
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
