import { globalDate } from "@/store/configureStore";
import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import dayjs from "dayjs";
import sortBy from "lodash/sortBy"

export const EAKPICOREPageDescriptions = [
  "On this table, you will find the list of KPI Eval Data of the employees of your company and their details each.",
  // "See merged logs of all employees here, showing the total hours and details of each logs. Sortable and filterable on the table headers.",
  // "See the total hours of all employees per cutoff here. Sortable and filterable by the table headers.",
  // "Nondescript"
];


export const EAKPICOREPageColumns: GridColDef[] = 
[
  {
    field: 'final_rating',
    headerName: 'Final Rating',
    width: 100,
  },
  { field: 'eval_date', 
    headerName: 'Eval Date:', 
    width: 150,
    valueGetter: (params: GridValueGetterParams) => {
      const date = new Date(params.row.eval_date);
      return params.row.eval_date ? dayjs(date).format(`${globalDate}`) : 'No Date';
    }
  },
  { field: 'status', 
    headerName: 'Status:', 
    width: 150,
  },
  { field: 'emp_name', 
    headerName: 'Employee Name:',  
    width: 180,
  },
];

export const EAProcessKPICOREPageColumns: GridColDef[] = 
[
  {
    field: 'emp_no',
    headerName: 'Employee #',
    width: 100,
  },
  { field: 'last_name', headerName: 'Last Name', width: 120 }, //30
  { field: 'first_name', 
    headerName: 'First Name', 
    width: 130,
  },
  { field: 'rank_code', headerName: 'Rank Code:',  width: 150 }, //50
];
  
export default {
  EAKPICOREPageDescriptions,
  EAKPICOREPageColumns,
  EAProcessKPICOREPageColumns
};
  