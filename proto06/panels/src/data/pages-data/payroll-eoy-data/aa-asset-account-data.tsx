import { GridColDef } from "@mui/x-data-grid";


export const AAASSETACCOUNTPageDescriptions = [
  "On this table, you will find the list of HRIS Asset Account of your company and their details each.",
];


export const AAASSETACCOUNTPageColumns: GridColDef[] = 
[
  {
    field: 'id',
    headerName: 'Type ID',
    width: 100,
  },
  { field: 'asset_list_code', headerName: 'Asset List Code:', width: 150 },
  { field: 'assigned_to', 
    headerName: 'Employee #:', 
    width: 130,
  },
  { field: 'remarks', headerName: 'remarks',  width: 200 },
];
  
export default {
  AAASSETACCOUNTPageDescriptions,
  AAASSETACCOUNTPageColumns
};
  