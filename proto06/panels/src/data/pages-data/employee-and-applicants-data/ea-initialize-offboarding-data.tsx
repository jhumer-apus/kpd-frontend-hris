import { globalDate } from "@/store/configureStore";
import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import dayjs from "dayjs";


export const EAOFFBOARDINGSTATUSPageDescriptions = [
  "On this table, you will find the list of Company Employee's Offboarding Data and their details each.",
  // "See merged logs of all employees here, showing the total hours and details of each logs. Sortable and filterable on the table headers.",
  // "See the total hours of all employees per cutoff here. Sortable and filterable by the table headers.",
  // "Nondescript"
];


export const EAOFFBOARDINGSTATUSPageColumns: GridColDef[] = 
[
  {
    field: 'status',
    headerName: 'Status',
    width: 100,
  },
  { field: 'date_offboard', 
    headerName: 'Offboard Date:', 
    width: 150,
    valueGetter: (params: GridValueGetterParams) => {
      const date = new Date(params.row.date_offboard);
      return params.row.date_offboard ? dayjs(date).format(`${globalDate}`) : 'No Date';
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

export const EAProcessOFFBOARDINGSTATUSPageColumns: GridColDef[] = 
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
    field: 'date_resigned', 
    headerName: 'Resign Date:',  
    width: 150,
    valueGetter: (params: GridValueGetterParams) => {
      const date = new Date(params.row.date_resigned);
      return params.row.date_resigned ? dayjs(date).format(`${globalDate}`) : '-';
    }
  }, 
];
  
export default {
  EAOFFBOARDINGSTATUSPageDescriptions,
  EAOFFBOARDINGSTATUSPageColumns,
  EAProcessOFFBOARDINGSTATUSPageColumns
};
  