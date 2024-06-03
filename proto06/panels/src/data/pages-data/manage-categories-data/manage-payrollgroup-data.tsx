import { GridColDef } from "@mui/x-data-grid";


export const ManagePAYROLLGROUPPageDescriptions = [
  "On this table, you will find the list of payroll group your company has and their details each.",

];


export const ManagePAYROLLGROUPPageColumns: GridColDef[] = 
[
  {
    field: 'name',
    headerName: 'Payroll Group Name',
    width: 180,
  },
  { field: 'payroll_freq', headerName: 'Pay Frequency', width: 150 },
  { field: 'id', headerName: 'Paygrp ID', width: 120,
  },
  { field: 'used_account', headerName: 'Accounts Linked',  width: 120 },
];
  
export default {
  ManagePAYROLLGROUPPageDescriptions,
  ManagePAYROLLGROUPPageColumns
};
  