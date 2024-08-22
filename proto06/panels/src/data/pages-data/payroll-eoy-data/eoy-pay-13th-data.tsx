import { globalDate } from "@/store/configureStore";
import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import dayjs from "dayjs";


export const EOYPAY13THPageDescriptions = [
  "On this table, you will find the list of 13th Month Pays of the employee of your company and their details each.",
];


export const EOYPAY13THPageColumns: GridColDef[] = 
[
  {
    field: 'emp_no',
    headerName: 'Employee #',
    width: 100,
  },
  { field: 'coverage_from', 
    headerName: 'Coverage From:', 
    width: 150,
    valueGetter: (params: GridValueGetterParams) => {
      const date = new Date(params.row.coverage_from);
      return params.row.coverage_from ? dayjs(date).format(`${globalDate}`) : 'No Date';
    }
  },
  { field: 'coverage_to', 
    headerName: 'Coverage To:', 
    width: 150,
    valueGetter: (params: GridValueGetterParams) => {
      const date = new Date(params.row.coverage_to);
      return params.row.coverage_to ? dayjs(date).format(`${globalDate}`): 'No Date';
    }
  },
  { field: 'total_pay', 
    headerName: 'Total Pay:',  
    width: 180,
    valueGetter: (params: GridValueGetterParams) => {
      const string = new Number(params.row.total_pay);
      return params.row.total_pay ? string.toFixed(2) : 'No Date';
    } 
  },
];

export const EOYProcessPAY13THPageColumns: GridColDef[] = 
[
  {
    field: 'emp_no',
    headerName: 'Employee #',
    width: 100,
  },
  { field: 'last_name', headerName: 'Last Name', width: 120 }, 
  { field: 'first_name', 
    headerName: 'First Name', 
    width: 130,
  },
  { field: 'rank_code', headerName: 'Rank Code:',  width: 150 },
];
  
export default {
  EOYPAY13THPageDescriptions,
  EOYPAY13THPageColumns,
  EOYProcessPAY13THPageColumns
};
  