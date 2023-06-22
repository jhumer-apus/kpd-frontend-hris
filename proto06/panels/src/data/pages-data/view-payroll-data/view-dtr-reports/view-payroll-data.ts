import { GridColDef, GridValueGetterParams, GridCellParams } from "@mui/x-data-grid";

export const viewPayrollOptions = [
  "View Payroll Per Employee",
  // "View Merged DTR Logs",
  // "View Cutoff DTR Summary",
  // "View Employee Specific DTR"
];

export const viewPayrollDescriptions = [
  "See all raw and unmerged logs of employees here. Sortable and filterable on the table headers.",
  // "See merged logs of all employees here, showing the total hours and details of each logs. Sortable and filterable on the table headers.",
  // "See the total hours of all employees per cutoff here. Sortable and filterable by the table headers.",
  // "Nondescript"
];

export const dynamicPayrollColumns: Array<GridColDef[]> = 
[
  [
    { field: 'id', headerName: 'Entry ID', width: 120 },
    { field: 'emp_no', headerName: 'Employee #', width: 120 },
    { field: 'entry_type', headerName: 'Entry Type', width: 120 },
    {
      field: 'datetime_bio_date',
      headerName: 'Entry Date',
      width: 150,
      valueGetter: (params: GridValueGetterParams) => {
        const date = new Date(params.row.datetime_bio);
        return date.toLocaleDateString();
      },
    },
    {
      field: 'datetime_bio_time',
      headerName: 'Entry Time',
      width: 150,
      valueGetter: (params: GridValueGetterParams) => {
        const shio = new Date(params.row.datetime_bio);
        // console.log(shio, "is there???")
        return shio.toLocaleTimeString();
        // return new Intl.DateTimeFormat('default', { hour: 'numeric', minute: 'numeric', hour12: true }).format(shio);
      },
    },
    { field: 'bio_id', headerName: 'Biometrics ID', width: 140 },
    { field: 'branch_code', headerName: 'Branch Code', width: 120 },
    { field: 'is_processed', headerName: 'Processed', width: 140 },
  ],
];
  
export default {
  viewDTROptions,
  viewDTRDescriptions,
  dynamicDTRColumns
};
  