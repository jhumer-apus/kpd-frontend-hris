import { GridColDef } from "@mui/x-data-grid";

export const PVMPHILHEALTHPageDescriptions = [
  "On this table, you will find the list of HRIS PHILHEALTH IDs of the employee of your company and their details each.",
];


export const PVMPHILHEALTHPageColumns: GridColDef[] = 
[
  {
    field: 'emp_no',
    headerName: 'Employee #',
    width: 150,
  },
  { field: 'id', headerName: 'Key ID', width: 100 },
  { field: 'ph_contribution_month', 
    headerName: 'Monthly Contribution', 
    width: 160,
  },
  { field: 'ph_no', headerName: 'PHILHEALTH Number',  width: 160 },
];
  
export default {
  PVMPHILHEALTHPageDescriptions,
  PVMPHILHEALTHPageColumns
};
  