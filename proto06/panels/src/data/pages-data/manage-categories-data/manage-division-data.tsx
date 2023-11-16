import { GridColDef } from "@mui/x-data-grid";



export const ManageDIVISIONPageDescriptions = [
  "On this table, you will find the list of division your company has and their details each.",
  // "See merged logs of all employees here, showing the total hours and details of each logs. Sortable and filterable on the table headers.",
  // "See the total hours of all employees per cutoff here. Sortable and filterable by the table headers.",
  // "Nondescript"
];


export const ManageDIVISIONPageColumns: GridColDef[] = 
[
  {
    field: 'div_name',
    headerName: 'Division Name',
    width: 190,
  },
  { field: 'div_lead', headerName: 'Div Lead:', width: 120 },
  { field: 'id', headerName: 'Division ID', width: 140,
  },
  { field: 'div_branch_code', headerName: 'Branch',  width: 120 },
];
  
export default {
  ManageDIVISIONPageDescriptions,
  ManageDIVISIONPageColumns
};
  