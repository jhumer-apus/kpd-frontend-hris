import { useEffect, SetStateAction } from "react";
import { Box } from "@mui/material";
import { DataGrid, GridValueGetterParams, GridRowSelectionModel, GridCallbackDetails } from "@mui/x-data-grid";
import { DTRCutoffListEmployees, previewDtrCsvItem } from "@/types/types-pages";
import { useSelector, useDispatch } from "react-redux";
import { getCutoffList, mergeCutoffListAndEmployee, summarizeCutoffListAndEmployee } from "@/store/actions/dtr";
import MergeDTRHelp from "../local-popovers/merge-dtr-help";
import {Button} from "@mui/material";
import { RootState } from "@/store/configureStore";
import { CutoffListMergeSelectionState } from "@/types/types-pages";
import CircularStatic from "../local-progress/circular-progress";
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
    width: 142,
  },
  {
    field: "emp_fullname",
    headerName: "Employee Fullname",
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
  {
    field: "date_hired",
    headerName: "Date Hired"
  },
  {
    field: "department_code",
    headerName: "Department"
  },
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
  selectedRows: CutoffListMergeSelectionState,
  setSelectedRows: (value: SetStateAction<CutoffListMergeSelectionState>) => void,
}


export default function CutOffListEmployees(props: CutOffListEmployees) { 
  const { employees, selectedRows, setSelectedRows} = props;
  const dispatch = useDispatch();
  const { status, error } = useSelector((state: RootState)=> state.dtr.getCutoffListEmployees);
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
    if(!Number.isNaN(selectedRows.cutoff_code)){
      dispatch(summarizeCutoffListAndEmployee(selectedRows))
    } else {
      alert("There is no selected cutoff period. Make sure to select one.")
    }
  };
  return (
    <>
      <div className='flex justify-between items-center'>
      <b className="flex items-center">Choose Which to Summarize:</b>
      <div className="flex justify-between">
      <CircularStatic/>
      <Button onClick={initializeMerge} variant={'contained'}> Create Summary</Button>
      </div>
      </div>
      <div style={{ height: '600px' , width: '100%' }}>
      <DataGrid
        // autoHeight
        rows={employees ? employees : []}
        columns={columns}
        // hideFooter
        sx={{ mt: 1 }}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 25 },
          },
        }}
        checkboxSelection
        onRowSelectionModelChange={handleSelection}
        // rowSelectionModel={ !selectedRows?.emp_no ? selectedRows?.emp_no : [] }
        localeText={{ noRowsLabel: `${status === 'loading' ? `${status?.toUpperCase()}...` : status === 'failed' ?  `${globalServerErrorMsg}` : 'Data Loaded - Showing 0 Results'}` }}
        pageSizeOptions={[25, 50, 75, 100]}
      />
      </div>
    </>
  );
}
