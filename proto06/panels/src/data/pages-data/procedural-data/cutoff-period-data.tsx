import { globalDate } from "@/store/configureStore";
import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import dayjs from "dayjs";


export const ProceduralCUTOFFPERIODPageDescriptions = [
  "On this table, you will find the available cutoff periods for the employees and their details each.",
];


export const ProceduralCUTOFFPERIODPageColumns: GridColDef[] = 
[
  {
    field: 'credit_date',
    headerName: 'Credit Date',
    width: 150,
    valueGetter: (params: GridValueGetterParams) => {
      const date = new Date(params.row.credit_date);
      return params.row.credit_date ? dayjs(date).format(`${globalDate}`) : "No Date";
    }
  },
  { field: 'payroll_group_code', headerName: 'Payroll Group:', width: 140 },
  { field: 'division_code', headerName: 'Division:', width: 100,
  },
  { field: 'co_name', headerName: 'Cutoff Name',  width: 210 },
];
  
export default {
  ProceduralCUTOFFPERIODPageDescriptions,
  ProceduralCUTOFFPERIODPageColumns
};
  