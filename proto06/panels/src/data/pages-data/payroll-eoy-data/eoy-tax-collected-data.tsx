import { globalDate } from "@/store/configureStore";
import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import dayjs from "dayjs";

export const viewPayrollOptions = [
  "View Payroll Per Employee",
  "No Other Payroll View Options",
];

export const EOYTAXCOLLECTEDPageDescriptions = [
  "To request for an overall total view widget, please contact your service provider/developers.",
];


export const EOYTAXCOLLECTEDPageColumns: GridColDef[] = 
[
  {
    field: 'date_added',
    headerName: 'Date Filed',
    width: 150,
    valueGetter: (params: GridValueGetterParams) => {
      const date = new Date(params.row.date_added);
      return dayjs(date).format(`${globalDate}`);
    }
  },
  { field: 'emp_no', headerName: 'Employee #:', width: 120 },
  { field: 'id', headerName: 'ID', width: 100,
  },
  { 
    field: 'cutoff_code', 
    headerName: 'Cutoff Code:', 
    width: 120,
  },
  {
    field: 'allowance_entry_code',
    headerName: 'Allowance Code:',
    width: 150,
  },
  { field: 'tax_rate_used', headerName: 'Tax Rate Used:', width: 180 },
  { field: 'amount_deducted', headerName: 'Amount Deducted',  width: 300 },
];
  
export default {
  EOYTAXCOLLECTEDPageDescriptions,
  EOYTAXCOLLECTEDPageColumns
};
  