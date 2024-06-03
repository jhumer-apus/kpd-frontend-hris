import { GridColDef } from "@mui/x-data-grid";


export const PVMPAGIBIGPageDescriptions = [
  "On this table, you will find the list of HRIS PAGIBIG IDs of the employee of your company and their details each.",
];


export const PVMPAGIBIGPageColumns: GridColDef[] = 
[
  {
    field: 'emp_no',
    headerName: 'Employee #',
    width: 150,
  },
  { field: 'id', headerName: 'Key ID', width: 100 },
  { field: 'pagibig_contribution_month', 
    headerName: 'Monthly Contribution', 
    width: 160,
  },
  { field: 'pagibig_no', headerName: 'Pagibig Number',  width: 160 },
];
  
export default {
  PVMPAGIBIGPageDescriptions,
  PVMPAGIBIGPageColumns
};
  