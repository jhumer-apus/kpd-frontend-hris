import { globalDate } from "@/store/configureStore";
import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import dayjs from "dayjs";



export const ManagePOSITIONPageDescriptions = [
  "On this table, you will find the list of positions your company has and their details each.",

];


export const ManagePOSITIONPageColumns: GridColDef[] = 
[
  {
    field: 'pos_name',
    headerName: 'Position Name',
    width: 150,
  },
  { field: 'id', headerName: 'Position ID', width: 100 },
  { field: 'date_added', 
    headerName: 'Date Added', 
    width: 120,
    valueGetter: (params: GridValueGetterParams) => {
      const date = new Date(params.row.date_added);
      return params.row.date_added ? dayjs(date).format(`${globalDate}`) : 'No Date';
    } 
  },
  { field: 'pos_description', headerName: 'Position Description',  width: 200 },
];
  
export default {
  ManagePOSITIONPageDescriptions,
  ManagePOSITIONPageColumns
};
  