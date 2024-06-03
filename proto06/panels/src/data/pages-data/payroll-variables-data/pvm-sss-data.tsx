import { GridColDef } from "@mui/x-data-grid";


export const PVMSSSPageDescriptions = [
  "On this table, you will find the list of HRIS SSS IDs of the employee of your company and their details each.",
];


export const PVMSSSPageColumns: GridColDef[] = 
[
  {
    field: 'emp_no',
    headerName: 'Employee #',
    width: 150,
  },
  { field: 'id', headerName: 'Key ID', width: 100 },
  { field: 'sss_contribution_month', 
    headerName: 'Monthly Contribution', 
    width: 160, 
  },
  { field: 'sss_no', headerName: 'SSS Number',  width: 160 },
];
  
export default {
  PVMSSSPageDescriptions,
  PVMSSSPageColumns
};
  