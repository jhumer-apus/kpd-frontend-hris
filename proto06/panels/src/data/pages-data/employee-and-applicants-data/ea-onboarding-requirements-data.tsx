import { globalDate } from "@/store/configureStore";
import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import dayjs from "dayjs";

export const EAONBOARDINGREQUIREMENTSPageDescriptions = [
  "On this table, you will find the list of company's Onboarding Requirements and their details each.",
  // "See merged logs of all employees here, showing the total hours and details of each logs. Sortable and filterable on the table headers.",
  // "See the total hours of all employees per cutoff here. Sortable and filterable by the table headers.",
  // "Nondescript"
];


export const EAONBOARDINGREQUIREMENTSPageColumns: GridColDef[] = 
[
  {
    field: 'id',
    headerName: 'ID:',
    width: 80,
  },

  { field: 'date_added', 
    headerName: 'Date Added', 
    width: 130,
    valueGetter: (params: GridValueGetterParams) => {
      const date = new Date(params.row.date_added);
      return params.row.date_added ? dayjs(date).format(`${globalDate}`) : 'No Date';
    }
  },
  { field: 'facilitator', headerName: 'Facilitator Emp #:', width: 140 },
  { field: 'onboarding_title', headerName: 'Onboarding Title',  width: 230 },
];
  
export default {
  EAONBOARDINGREQUIREMENTSPageDescriptions,
  EAONBOARDINGREQUIREMENTSPageColumns
};
  