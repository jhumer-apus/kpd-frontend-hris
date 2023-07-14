import { GridColDef, GridValueGetterParams, GridCellParams, GridValueFormatterParams } from "@mui/x-data-grid";

export const viewPayrollOptions = [
  "View Payroll Per Employee",
  "No Other Payroll View Options",
  // "View Cutoff DTR Summary",
  // "View Employee Specific DTR"
];

export const ProceduralOBTPageDescriptions = [
  "P1 - Pending Approver1 | P2 - Pending Approver2 | APD - Approved | DIS - Disapproved",
  // "See merged logs of all employees here, showing the total hours and details of each logs. Sortable and filterable on the table headers.",
  // "See the total hours of all employees per cutoff here. Sortable and filterable by the table headers.",
  // "Nondescript"
];


export const ProceduralOBTPageColumns: GridColDef[] = 
[
  {
    field: 'obt_date_filed',
    headerName: 'Date Filed',
    width: 150,
    valueGetter: (params: GridValueGetterParams) => {
      const date = new Date(params.row.obt_date_filed);
      return date.toLocaleDateString();
    }
  },
  { field: 'emp_no', headerName: 'Filed By:', width: 120 },
  { field: 'obt_approval_status', headerName: 'Status', width: 100 },
  { field: 'obt_approver1_empno', headerName: 'Approver #1', width: 120 },
  {
    field: 'obt_date_approved1',
    headerName: 'Date Approved #1',
    width: 150,
    valueGetter: (params: GridValueGetterParams) => {
      const date = new Date(params.row.obt_date_approved1);
      return date.toLocaleDateString();
    }
  },
  { field: 'obt_approver2_empno', headerName: 'Approver #2', width: 120 },
  {
    field: 'obt_date_approved2',
    headerName: 'Date Approved #2',
    width: 150,
    valueGetter: (params: GridValueGetterParams) => {
      const date = new Date(params.row.obt_date_approved2);
      return date.toLocaleDateString();
    }
  },
  { field: 'obt_reason_disapproval', headerName: 'Disapproval Reason',  width: 150 },
];
  
export default {
  viewPayrollOptions,
  ProceduralOBTPageDescriptions,
  ProceduralOBTPageColumns
};
  