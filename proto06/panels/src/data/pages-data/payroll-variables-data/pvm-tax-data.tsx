import { GridColDef } from "@mui/x-data-grid";


export const PVMTAXPageDescriptions = [
  "On this table, you will find the list of HRIS tax IDs of the employee of your company and their details each.",
];


export const PVMTAXPageColumns: GridColDef[] = 
[
  {
    field: 'emp_no',
    headerName: 'Employee #',
    width: 100,
  },
  { field: 'tin_no', headerName: 'Tin #', width: 150 },
  { field: 'tax_form', 
    headerName: 'Tax Form', 
    width: 130,
  },
  { field: 'tax_description', headerName: 'Tax Description',  width: 200 },
];
  
export default {
  PVMTAXPageDescriptions,
  PVMTAXPageColumns
};
  