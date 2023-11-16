import { globalDate } from "@/store/configureStore";
import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import dayjs from "dayjs";

export const PVMALLOWANCETYPEPageDescriptions = [
  "On this table, you will find the list of Allowance Types of the employees of your company and their details each.",
];


export const PVMALLOWANCETYPEPageColumns: GridColDef[] = 
[
  {
    field: 'id',
    headerName: 'ID',
    width: 100,
  },
  { field: 'taxable', 
    headerName: 'Taxable', 
    width: 150,
    valueGetter: (params: GridValueGetterParams) => {
      const convertBool = params.row.taxable ? 'Yes' : 'No';
      return convertBool;
    } 
  },
  { field: 'date_added', 
    headerName: 'Date Added', 
    width: 160,
    valueGetter: (params: GridValueGetterParams) => {
      const date = new Date(params.row.date_added);
      return params.row.date_added ? dayjs(date).format(`${globalDate}`) : 'No Date';
    }
  },
  { field: 'allowance_name', headerName: 'Allowance Name',  width: 160 },
];
  
export default {
  PVMALLOWANCETYPEPageDescriptions,
  PVMALLOWANCETYPEPageColumns
};
  