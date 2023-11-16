import { globalDate } from "@/store/configureStore";
import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import dayjs from "dayjs";


export const AAANNOUNCEMENTPageDescriptions = [
  "On this table, you will find the list of Announcements of your company and their details each.",
];


export const AAANNOUNCEMENTPageColumns: GridColDef[] = 
[
  {
    field: 'order_by_no',
    headerName: 'Order by no:',
    width: 100,
  },
  {
    field: 'date_posted',
    headerName: 'Date Posted',
    width: 150,
    valueGetter: (params: GridValueGetterParams) => {
      const date = new Date(params.row.date_posted);
      return params.row.date_posted ? dayjs(date).format(`${globalDate}`) : 'No Date';
    }
  },
  { field: 'expiry_date', 
    headerName: 'Expiry Date', 
    width: 150,
    valueGetter: (params: GridValueGetterParams) => {
      const date = new Date(params.row.expiry_date);
      return params.row.expiry_date ? dayjs(date).format(`${globalDate}`) : 'No Date';
    }
  },
  { field: 'message', headerName: 'Message',  width: 200 },
];
  
export default {
  AAANNOUNCEMENTPageDescriptions,
  AAANNOUNCEMENTPageColumns
};
  