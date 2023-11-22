import { globalDate } from "@/store/configureStore";
import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import dayjs from "dayjs";


export const EAONBOARDINGSTATUSPageDescriptions = [
  "On this table, you will find the list of Onboarding Statuses of the employee of your company and their details each.",
  // "See merged logs of all employees here, showing the total hours and details of each logs. Sortable and filterable on the table headers.",
  // "See the total hours of all employees per cutoff here. Sortable and filterable by the table headers.",
  // "Nondescript"
];


export const EAONBOARDINGSTATUSPageColumns: GridColDef[] = 
[
  {
    field: 'status',
    headerName: 'Status',
    width: 100,
  },
  { field: 'start_date', 
    headerName: 'Start Date:', 
    width: 150,
    valueGetter: (params: GridValueGetterParams) => {
      const date = new Date(params.row.date_start);
      return params.row.date_start ? dayjs(date).format(`${globalDate}`) : 'No Date';
    }
  },
  { field: 'emp_no', 
    headerName: 'Employee #', 
    width: 150,
  },
  { field: 'final_remarks', 
    headerName: 'Final Remarks:',  
    width: 180,
  },
];

export const EAProcessONBOARDINGSTATUSPageColumns: GridColDef[] = 
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
  { 
    field: 'date_hired', 
    headerName: 'Date Hired:',  
    width: 150,
    valueGetter: (params: GridValueGetterParams) => {
      const date = new Date(params.row.date_hired);
      return params.row.date_hired ? dayjs(date).format(`${globalDate}`) : 'No Date';
    }
  }
];
  
export default {
  EAONBOARDINGSTATUSPageDescriptions,
  EAONBOARDINGSTATUSPageColumns,
  EAProcessONBOARDINGSTATUSPageColumns
};
  