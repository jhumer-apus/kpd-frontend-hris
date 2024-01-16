import { globalDate } from "@/store/configureStore";
import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import dayjs from "dayjs";

export const EAJOBPOSTINGSPageDescriptions = [
  "On this table, you will find the list of company's Available Job Posts and their details each.",
  // "See merged logs of all employees here, showing the total hours and details of each logs. Sortable and filterable on the table headers.",
  // "See the total hours of all employees per cutoff here. Sortable and filterable by the table headers.",
  // "Nondescript"
];


export const EAJOBPOSTINGSPageColumns: GridColDef[] = 
[
  {
    field: 'id',
    headerName: 'ID:',
    width: 80,
  },

  { field: 'position_title', 
    headerName: 'Position', 
    width: 130,
  },
  { 
    field: 'date_added', 
    headerName: 'Date Added:', 
    width: 100,
    description: 'This column has a value getter and is not sortable. Use Filter instead, by clicking on the three dots beside this header.',
    sortable: false,
    valueGetter: (params: GridValueGetterParams) => {
      const date = new Date(params.row.date_added);
      return params.row.date_added ? dayjs(date).format(`${globalDate}`) : '-';
    }

  },
  { field: 'job_description', headerName: 'Job Description',  width: 270 },
];
  
export default {
  EAJOBPOSTINGSPageDescriptions,
  EAJOBPOSTINGSPageColumns
};
  