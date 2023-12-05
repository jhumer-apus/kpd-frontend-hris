import { globalDate } from "@/store/configureStore";
import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import dayjs from "dayjs";

export const viewPayrollOptions = [
  "View Payroll Per Employee",
  "No Other Payroll View Options",
];

export const AppraisalConfirmationKPICOREPageDescriptions = [
  "'Confirmed' means that the Supervisor has checked it and can no longer be redefined.",
];


export const AppraisalConfirmationKPICOREPageColumns: GridColDef[] = 
[
  {
    field: 'date_evaluation_deadline',
    headerName: 'Date Deadline:',
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
  { field: 'total_approver_eval_points', headerName: 'Confirmed KPI Points', width: 180 },
  {
    field: 'total_core_compe_points',
    headerName: 'Core Points',
    width: 150,
  },
  { field: 'emp_no_approver', headerName: 'Approver Emp #:',  width: 140, 
  },
  { field: 'approver_name', headerName: 'Approver Name',  width: 180, 
},
];

  
export default {
  viewPayrollOptions,
  AppraisalConfirmationKPICOREPageDescriptions,
  AppraisalConfirmationKPICOREPageColumns
};
  