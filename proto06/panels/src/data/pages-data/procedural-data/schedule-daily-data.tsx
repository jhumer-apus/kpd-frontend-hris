import { GridColDef, GridValueGetterParams, GridCellParams, GridValueFormatterParams } from "@mui/x-data-grid";
import dayjs from "dayjs";


// export const viewPayrollOptions = [
//   "View Payroll Per Employee",
//   "No Other Payroll View Options",
//   // "View Cutoff DTR Summary",
//   // "View Employee Specific DTR"
// ];

export const ProceduralSCHEDULEDAILYPageDescriptions = [
  "On this table, you will find the shift schedule of an employee and their details each.",
  // "See merged logs of all employees here, showing the total hours and details of each logs. Sortable and filterable on the table headers.",
  // "See the total hours of all employees per cutoff here. Sortable and filterable by the table headers.",
  // "Nondescript"
];


export const ProceduralSCHEDULEDAILYPageColumns: GridColDef[] = 
[
  {
    field: 'business_date',
    headerName: 'Business Date',
    width: 150,
    valueGetter: (params: GridValueGetterParams) => {
      const date = new Date(params.row.business_date);
      return date.toLocaleDateString();
    }
  },
  { 
    field: 'schedule_shift_code.time_in', 
    headerName: 'Time In:', 
    width: 140,
    valueGetter: (params: GridValueGetterParams) => {
      const formattedTime = params.row.schedule_shift_code?.time_in ? dayjs(params.row.schedule_shift_code.time_in, "HH:mm:ss").format("hh:mm a") : null;
      return formattedTime ?? 'Rest Day';
    } 
  },
  { 
    field: 'schedule_shift_code.time_out', 
    headerName: 'Time In:', 
    width: 130,
    valueGetter: (params: GridValueGetterParams) => {
      const formattedTime = params.row.schedule_shift_code?.time_out ? dayjs(params.row.schedule_shift_code.time_out, "HH:mm:ss").format("hh:mm a") : null;
      return formattedTime ?? 'Rest Day';
    } 
  },
  { 
    field: 'schedule_shift_code.name', 
    headerName: 'Shift Name', 
    width: 210,
    valueGetter: (params: GridValueGetterParams) => {
      const name = (params.row.schedule_shift_code?.name) ? (params.row.schedule_shift_code.name) : null;
      return name ?? 'Rest Day';
    } 
  },
];
  
export default {
  ProceduralSCHEDULEDAILYPageDescriptions,
  ProceduralSCHEDULEDAILYPageColumns
};
  