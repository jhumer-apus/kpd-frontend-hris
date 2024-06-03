import { GridColDef, GridValueGetterParams, GridCellParams, GridValueFormatterParams } from "@mui/x-data-grid";
import dayjs from "dayjs";
// export const viewPayrollOptions = [
//   "View Payroll Per Employee",
//   "No Other Payroll View Options",
//   // "View Cutoff DTR Summary",
//   // "View Employee Specific DTR"
// ];

export const ProceduralSCHEDULESHIFTPageDescriptions = [
  "On this table, you will find the available schedule shifts for the employees' assignments and their details each.",
  // "See merged logs of all employees here, showing the total hours and details of each logs. Sortable and filterable on the table headers.",
  // "See the total hours of all employees per cutoff here. Sortable and filterable by the table headers.",
  // "Nondescript"
];


export const ProceduralSCHEDULESHIFTPageColumns: GridColDef[] = 
[
  { field: 'id', headerName: 'Sched ID:', width: 120 },
  {
    field: 'time_in',
    headerName: 'Sched IN:',
    width: 150,
    valueGetter: (params: GridValueGetterParams) => {
      const formattedValue = dayjs(params.row.time_in, "HH:mm:ss").format('hh:mm a');
      return formattedValue;
    }
  },
  {
    field: 'time_out',
    headerName: 'Sched OUT:',
    width: 150,
    valueGetter: (params: GridValueGetterParams) => {
      const formattedValue = dayjs(params.row.time_out, "HH:mm:ss").format('hh:mm a');
      return formattedValue;
    }
  },
  { field: 'name', headerName: 'Schedule Name',  width: 180 },
];
  
export default {
  ProceduralSCHEDULESHIFTPageDescriptions,
  ProceduralSCHEDULESHIFTPageColumns
};
  