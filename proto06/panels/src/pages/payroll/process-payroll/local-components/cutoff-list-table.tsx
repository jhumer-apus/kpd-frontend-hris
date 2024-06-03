import { SetStateAction, useEffect } from "react";
import { DataGrid, GridCallbackDetails, GridRowSelectionModel, GridValueGetterParams } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { getCutoffList } from "@/store/actions/dtr";
import {Button} from "@mui/material";
import { RootState } from "@/store/configureStore";
import { CutoffListMergeSelectionState, ProcessPayroll } from "@/types/types-pages";
import CreatePayrollHelp from "../local-popovers/create-payroll-help";
import { globalServerErrorMsg } from "@/store/configureStore";


const columns = [
  {
    field: "id",
    headerName: "Cutoff ID",
    width: 80,
  },
  {
    field: "co_name",
    headerName: "Cutoff Name",
    width: 142,
  },
  {
    field: "co_date_from",
    headerName: "From",
    valueGetter: (params: GridValueGetterParams) => {
      const date = new Date(params.row.co_date_from);
      return date.toLocaleDateString();
    }
  },
  {
    field: "co_date_to",
    headerName: "Until",
    valueGetter: (params: GridValueGetterParams) => {
      const date = new Date(params.row.co_date_to);
      return date.toLocaleDateString();
    }
  },
  {
    field: "reg_days_total",
    headerName: "Reg. Days"
  },
  {
    field: "credit_date",
    headerName: "Credit Date"
  },
  {
    field: "payroll_group_code",
    headerName: "PG Code",
    width: 80,
  },
  {
    field: "division_code",
    headerName: "Div Code",
    width: 80,
  },
  {
    field: "co_is_processed",
    headerName: "Processed"
  },
];

interface CutOffListTable {
    selectedRows: ProcessPayroll,
    setSelectedRows: (value: SetStateAction<ProcessPayroll>) => void,
}

export default function CutOffListTable(props: CutOffListTable) {
  const {selectedRows, setSelectedRows} = props;
  const dispatch = useDispatch();
  const { cutoffList, status, error } = useSelector((state: RootState)=> state.dtr.getCutoffList);

  useEffect(()=>{
    dispatch(getCutoffList());
  }, [])

  const handleSelection = (newSelection: GridRowSelectionModel, details: GridCallbackDetails) => {

    if (newSelection.length > 1) {
      alert('You can only select one cutoff at a time. Please uncheck the current selection or make sure you have only one per request.');
      return;
    }
    if (newSelection.length > 0) {
      setSelectedRows((prevState) => ({
        ...prevState,
        cutoff_code: newSelection[0] as number,
      }));
    } else {
      setSelectedRows((prevState) => ({
        ...prevState,
        cutoff_code: NaN,
      }));
    }
  };

  return (
    <>
      <div className='flex justify-between'>
      <b className="flex items-center">Create Payroll:<CreatePayrollHelp/></b>
      <Button style={{color: 'gray'}} disabled variant={'outlined'} disableElevation={true} disableFocusRipple={true} > Choose a Cutoff to Create Payroll</Button>
      </div>
      <div style={{ height: '600px' , width: '100%' }}>
      <DataGrid
        rows={cutoffList? cutoffList : []}
        columns={columns}
        sx={{ mt: 1 }}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 25 },
          },
        }}
        checkboxSelection
        onRowSelectionModelChange={handleSelection}
        rowSelectionModel={ Number.isNaN(selectedRows.cutoff_code) ? [] : selectedRows.cutoff_code}
        localeText={{ noRowsLabel: `${status === 'loading' ? `${status?.toUpperCase()}...` : status === 'failed' ?  `${globalServerErrorMsg}` : 'Data Loaded - Showing 0 Results'}` }}
        pageSizeOptions={[25, 50, 75, 100]}
      />
      </div>
    </>
  );
}
