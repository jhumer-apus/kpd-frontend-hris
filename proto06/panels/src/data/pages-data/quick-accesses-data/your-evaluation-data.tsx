import { globalDate } from "@/store/configureStore";
import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import dayjs from "dayjs";

export const viewPayrollOptions = [
  "View Payroll Per Employee",
  "No Other Payroll View Options",
];

export const YourKPICOREPageDescriptions = [
  "'Confirmed' means that the Supervisor has checked it and can no longer be redefined.",
];


export const YourKPICOREPageColumns: GridColDef[] = 
[
  {
    field: 'date_evaluation_deadline',
    headerName: 'Evaluation Date:',
    width: 150,
    valueGetter: (params: GridValueGetterParams) => {
      const date = new Date(params.row.date_evaluation_deadline);
      return params.row.date_evaluation_deadline ? dayjs(date).format(`${globalDate}`) : 'No Date';
    }
  },
  { field: 'status', headerName: 'Status', width: 120 },
  { field: 'final_rating', headerName: 'Final Rating', width: 140,
  },
  { 
    field: 'percentage_total', 
    headerName: 'Total KPI & Core Percentage', 
    width: 200,
  },
  {
    field: 'emp_name',
    headerName: 'Employee Name:',
    width: 150,
  },
  { field: 'sup_eval_points', headerName: 'Confirmed KPI Points', width: 180 },
  {
    field: 'core_compe_points',
    headerName: 'Core Points',
    width: 150,
  },
  { field: 'sup_no', headerName: 'Supervisor #:',  width: 300, 
  },
];

  
export default {
  viewPayrollOptions,
  YourKPICOREPageDescriptions,
  YourKPICOREPageColumns
};
  