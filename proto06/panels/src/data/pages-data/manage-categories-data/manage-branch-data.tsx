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
  { field: 'id', headerName: 'Branch ID', width: 100},
  { field: 'approver1', headerName: 'Approver 1', width: 150},
  { field: 'approver2', headerName: 'Approver 2', width: 150},
  { field: 'approver3', headerName: 'Approver 3', width: 150},
  { field: 'branch_address', headerName: 'Branch Address',  width: 500, 
    valueGetter: (params: GridValueGetterParams) => {
      const branch_address = `${params.row.province_name}, ${params.row.city_name}, ${params.row.branch_address}`
      return branch_address;
    },
  },
];
  
export default {
  ManageBRANCHPageDescriptions,
  ManageBRANCHPageColumns
};
  