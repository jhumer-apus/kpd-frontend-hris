import { GridColDef } from "@mui/x-data-grid";


export const EOYBONUSLISTPageDescriptions = [
  "On this table, you will find the list of HRIS Bonus Types of the employee of your company and their details each.",
];


export const EOYBONUSLISTPageColumns: GridColDef[] = 
[
  {
    field: 'id',
    headerName: 'Type ID',
    width: 100,
  },
  { field: 'name', headerName: 'Bonus Type Name', width: 150 },
  { field: 'amount', 
    headerName: 'Amount', 
    width: 130,
  },
  { field: 'description', headerName: 'Bonus Type Description',  width: 200 },
];
  
export default {
  EOYBONUSLISTPageDescriptions,
  EOYBONUSLISTPageColumns
};
  