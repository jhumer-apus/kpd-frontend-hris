import { GridColDef } from "@mui/x-data-grid";


export const AAASSETLISTPageDescriptions = [
  "On this table, you will find the list of HRIS Asset List/Type of your company and their details each.",
];


export const AAASSETLISTPageColumns: GridColDef[] = 
[
  {
    field: 'id',
    headerName: 'Type ID',
    width: 100,
  },
  { field: 'asset_name', headerName: 'Asset Name', width: 150 },
  { field: 'year', 
    headerName: 'Year', 
    width: 130, 
  },
  { field: 'description', headerName: 'Asset Description',  width: 200 },
];
  
export default {
  AAASSETLISTPageDescriptions,
  AAASSETLISTPageColumns
};
  