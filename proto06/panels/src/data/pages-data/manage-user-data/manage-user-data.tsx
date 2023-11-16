import { globalDate } from "@/store/configureStore";
import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import dayjs from "dayjs";


export const ManageUSERPageDescriptions = [
  "On this table, you will find the list of HRIS users your company has and their details each.",
];


export const ManageUSERPageColumns: GridColDef[] = 
[
  {
    field: 'emp_no',
    headerName: 'Employee #',
    width: 150,
  },
  { field: 'role', headerName: 'Role', width: 100 },
  { field: 'date_added', 
    headerName: 'Date Added', 
    width: 120,
    valueGetter: (params: GridValueGetterParams) => {
      const date = new Date(params.row.date_added);
      return params.row.date_added ? dayjs(date).format(`${globalDate}`) : 'No Date';
    }
  },
  { field: 'username', headerName: 'Username',  width: 200 },
];
  
export default {
  ManageUSERPageDescriptions,
  ManageUSERPageColumns
};
  