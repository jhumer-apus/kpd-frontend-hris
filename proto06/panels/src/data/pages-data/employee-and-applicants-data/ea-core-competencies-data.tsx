import { globalDate } from "@/store/configureStore";
import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import dayjs from "dayjs";

export const EACORECOMPEPageDescriptions = [
  "On this table, you will find the list of Core Competencies of your company and their details each.",
];


export const EACORECOMPEPageColumns: GridColDef[] = 
[
  {
    field: 'added_by',
    headerName: 'Added By:',
    width: 100,
  },

  { field: 'date_added', 
    headerName: 'Date Added', 
    width: 130,
    valueGetter: (params: GridValueGetterParams) => {
      const date = new Date(params.row.date_added);
      return params.row.date_added ? dayjs(date).format(`${globalDate}`) : 'No Date';
    }
  },
  { field: 'checklist_limit', headerName: 'Limits', width: 150 },
  { field: 'checklist_title', headerName: 'Competency',  width: 200 },
];
  
export default {
  EACORECOMPEPageDescriptions,
  EACORECOMPEPageColumns
};
  