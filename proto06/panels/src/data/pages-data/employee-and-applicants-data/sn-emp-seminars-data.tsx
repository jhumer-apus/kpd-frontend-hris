import { globalDate } from "@/store/configureStore";
import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import dayjs from "dayjs";

export const EMPSEMINARSPageDescriptions = [
  "On this table, you will find the trainings and seminars of an employee and their details each.",
];


export const EMPSEMINARSPageColumns: GridColDef[] = 
[
  {
    field: 'id',
    headerName: 'ETS ID',
    width: 80,
  },
  {
    field: 'date_accomplished',
    headerName: 'Date Accomplished',
    width: 150,
    valueGetter: (params: GridValueGetterParams) => {
      const date = new Date(params.row.date_accomplished);
      return dayjs(date).format(`${globalDate}`);
    }
  },
  {
    field: 'emp_no',
    headerName: 'Employee #',
    width: 120,
  },
  { 
    field: 'subject', 
    headerName: 'Subject:', 
    width: 220,
  },
];
  
export default {
  EMPSEMINARSPageDescriptions,
  EMPSEMINARSPageColumns
};
  