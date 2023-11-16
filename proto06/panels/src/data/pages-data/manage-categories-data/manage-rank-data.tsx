import { globalDate } from "@/store/configureStore";
import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import dayjs from "dayjs";



export const ManageRANKPageDescriptions = [
  "On this table, you will find the list of positions your company has and their details each.",
];


export const ManageRANKPageColumns: GridColDef[] = 
[
  {
    field: 'rank_name',
    headerName: 'Rank Name',
    width: 150,

  },
  { field: 'id', headerName: 'Rank ID', width: 100 },
  { field: 'date_added', 
    headerName: 'Date Added', 
    width: 120,
    valueGetter: (params: GridValueGetterParams) => {
      const date = new Date(params.row.date_added);
      return params.row.date_added ? dayjs(date).format(`${globalDate}`) : 'No Date';
    } 
  },
  { field: 'rank_description', headerName: 'Rank Description',  width: 200 },
];
  
export default {
  ManageRANKPageDescriptions,
  ManageRANKPageColumns
};
  