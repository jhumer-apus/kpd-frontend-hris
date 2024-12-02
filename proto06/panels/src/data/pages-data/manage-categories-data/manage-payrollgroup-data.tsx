import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";


export const ManagePAYROLLGROUPPageDescriptions = [
  "On this table, you will find the list of payroll group your company has and their details each.",

];

const paymentFrequency:any = {
  1: "Monthly",
  2: "Bi-Monthly",
  3: "Daily"
}


export const ManagePAYROLLGROUPPageColumns: GridColDef[] = 
[
  { field: 'id', headerName: 'ID', width: 80},
  {
    field: 'name',
    headerName: 'Payroll Group Name',
    width: 180,
  },
  { 
    field: 'payroll_type', 
    headerName: 'Pay Type', 
    width: 150,
  },
  // { field: 'used_account', headerName: 'Accounts Linked',  width: 120 },
];
  
export default {
  ManagePAYROLLGROUPPageDescriptions,
  ManagePAYROLLGROUPPageColumns
};
  