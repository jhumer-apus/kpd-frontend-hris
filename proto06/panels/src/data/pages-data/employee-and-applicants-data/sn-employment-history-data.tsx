import { globalDate } from "@/store/configureStore";
import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import dayjs from "dayjs";

export const EMPHISTORYPageDescriptions = [
  "On this table, you will find the employment history of an employee and their details each.",
];


export const EMPHISTORYPageColumns: GridColDef[] = 
[
  {
    field: 'id',
    headerName: 'EH ID',
    width: 80,
  },
  {
    field: 'date_promoted',
    headerName: 'Date Promoted',
    width: 150,
    valueGetter: (params: GridValueGetterParams) => {
      const date = new Date(params.row.date_promoted);
      return dayjs(date).format(`${globalDate}`);
    }
  },
  {
    field: 'emp_no',
    headerName: 'Employee #',
    width: 120,
  },
  { 
    field: 'employment_position', 
    headerName: 'Employment Position:', 
    width: 220,
  },
];
  
export default {
  EMPHISTORYPageDescriptions,
  EMPHISTORYPageColumns
};
  