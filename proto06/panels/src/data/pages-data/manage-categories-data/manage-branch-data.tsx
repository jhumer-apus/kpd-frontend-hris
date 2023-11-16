import { GridColDef, GridValueGetterParams, GridCellParams, GridValueFormatterParams } from "@mui/x-data-grid";

// export const viewPayrollOptions = [
//   "View Payroll Per Employee",
//   "No Other Payroll View Options",
//   // "View Cutoff DTR Summary",
//   // "View Employee Specific DTR"
// ];

export const ManageBRANCHPageDescriptions = [
  "On this table, you will find the list of branches your company has and their details each.",
  // "See merged logs of all employees here, showing the total hours and details of each logs. Sortable and filterable on the table headers.",
  // "See the total hours of all employees per cutoff here. Sortable and filterable by the table headers.",
  // "Nondescript"
];


export const ManageBRANCHPageColumns: GridColDef[] = 
[
  {
    field: 'branch_name',
    headerName: 'Branch Name',
    width: 150,
  },
  { field: 'branch_oic', headerName: 'Branch OIC:', width: 120 },
  { field: 'id', headerName: 'Branch ID', width: 100,

  },
  { field: 'branch_address', headerName: 'Branch Address',  width: 200 },
];
  
export default {
  ManageBRANCHPageDescriptions,
  ManageBRANCHPageColumns
};
  