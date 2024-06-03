import { GridColDef } from "@mui/x-data-grid";



export const ManageDEPARTMENTPageDescriptions = [
  "On this table, you will find the list of department your company has and their details each.",

];


export const ManageDEPARTMENTPageColumns: GridColDef[] = 
[
  {
    field: 'dept_name',
    headerName: 'Department Name',
    width: 190,
  },
  { field: 'dept_lead', headerName: 'Dept. Lead:', width: 120 },
  { field: 'id', headerName: 'Department ID', width: 140,
  },
  { field: 'dept_branch_code', headerName: 'Branch ID',  width: 120 },
];
  
export default {
  ManageDEPARTMENTPageDescriptions,
  ManageDEPARTMENTPageColumns
};
  