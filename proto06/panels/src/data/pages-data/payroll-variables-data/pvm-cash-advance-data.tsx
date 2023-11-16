import { GridColDef } from "@mui/x-data-grid";

export const PVMCASHADVANCEPageDescriptions = [
  "On this table, you will find the list of Cash Advances of the employees of your company and their details each.",
];


export const PVMCASHADVANCEPageColumns: GridColDef[] = 
[
  {
    field: 'emp_no',
    headerName: 'Employee #',
    width: 100,
  },
  { field: 'cash_advance_remaining', headerName: 'Remaning', width: 150 },
  { field: 'payment_monthly', 
    headerName: 'Monthly Payment', 
    width: 160,
  },
  { field: 'cash_advance_total', headerName: 'Cash Advance Total',  width: 160 },
];
  
export default {
  PVMCASHADVANCEPageDescriptions,
  PVMCASHADVANCEPageColumns
};
  