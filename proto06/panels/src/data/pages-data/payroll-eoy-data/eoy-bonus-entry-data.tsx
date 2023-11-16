import { GridColDef } from "@mui/x-data-grid";


export const EOYBONUSENTRYPageDescriptions = [
  "On this table, you will find the list of HRIS Bonus Entry of the employee of your company and their details each.",
];


export const EOYBONUSENTRYPageColumns: GridColDef[] = 
[
  {
    field: 'id',
    headerName: 'Type ID',
    width: 100,
  },
  { field: 'emp_no', headerName: 'For Employee #:', width: 150 },
  { field: 'cutoff_code', 
    headerName: 'Cutoff ID:', 
    width: 130,
  },
  { field: 'bonus_code', headerName: 'Bonus Type Code ID:',  width: 200 },
];
  
export default {
  EOYBONUSENTRYPageDescriptions,
  EOYBONUSENTRYPageColumns
};
  