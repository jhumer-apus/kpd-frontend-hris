import { globalDate } from "@/store/configureStore";
import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import dayjs from "dayjs";

export const EAEVALQUESTIONSPageDescriptions = [
  "On this table, you will find the list of KPI Questions of your company and their details each.",
  // "See merged logs of all employees here, showing the total hours and details of each logs. Sortable and filterable on the table headers.",
  // "See the total hours of all employees per cutoff here. Sortable and filterable by the table headers.",
  // "Nondescript"
];


export const EAEVALQUESTIONSPageColumns: GridColDef[] = 
[
  {
    field: 'id',
    headerName: 'Question ID',
    width: 100,
  },
  { field: 'added_by', headerName: 'Added By:', width: 100 },
  { field: 'date_added', 
    headerName: 'Date Added', 
    width: 130,
    valueGetter: (params: GridValueGetterParams) => {
      const date = new Date(params.row.date_added);
      return params.row.date_added ? dayjs(date).format(`${globalDate}`) : 'No Date';
    }
  },
  { field: 'question', headerName: 'Questions',  width: 250 },
];
  
export default {
  EAEVALQUESTIONSPageDescriptions,
  EAEVALQUESTIONSPageColumns
};
  