import { GridColDef, GridValueGetterParams, GridCellParams, GridValueFormatterParams } from "@mui/x-data-grid";
import dayjs from "dayjs";

export const viewPayrollOptions = [
  "View Payroll Per Employee",
  "No Other Payroll View Options",
  // "View Cutoff DTR Summary",
  // "View Employee Specific DTR"
];

export const YourKPICOREPageDescriptions = [
  "P1 - Pending Approver1 | P2 - Pending Approver2 | APD - Approved | DIS - Disapproved",
  // "See merged logs of all employees here, showing the total hours and details of each logs. Sortable and filterable on the table headers.",
  // "See the total hours of all employees per cutoff here. Sortable and filterable by the table headers.",
  // "Nondescript"
];


export const YourKPICOREPageColumns: GridColDef[] = 
[
  {
    field: 'eval_date',
    headerName: 'Evaluation Date:',
    width: 150,
    valueGetter: (params: GridValueGetterParams) => {
      const date = new Date(params.row.eval_date);
      return params.row.eval_date ? dayjs(date).format('MM-DD-YYYY') : 'No Date';
    }
  },
  { field: 'status', headerName: 'Status', width: 120 },
  { field: 'final_rating', headerName: 'Final Rating', width: 140,
    // renderCell: (params: GridCellParams) => {
    //   const status = params.row?.obt_approval_status as string;

    //   let cellColor = '';
    //   if (status === 'P1' || status === 'P2') {
    //     cellColor = '#ff9100'; // Orange
    //   } else if ( status==='DIS' ){
    //     cellColor = '#aa2e25'; // Red
    //   }

    //   return(
    //   // <div style={{ height: '100%', width: '10%', alignItems: 'center' }}>
    //     // 
    //     <div className='relative'>
    //       <div style={{ top:'', left: '26px', position: 'absolute', backgroundColor: cellColor, height:'5px', width: '5px', borderRadius: '100px'}}></div>
    //       {status}
    //     </div>
    //   // </div>
    //   );
    // }  
  },
  { 
    field: 'percentage_total', 
    headerName: 'Total KPI & Core Percentage', 
    width: 200,
    // valueGetter: (params: GridValueGetterParams) => {
    //   if(params.row.obt_approver1_empno){
    //     return params.row.obt_approver1_empno
    //   } else {
    //     return 'Any higher rank'
    //   }
    // } 
  },
  {
    field: 'emp_name',
    headerName: 'Employee Name:',
    width: 150,
    // valueGetter: (params: GridValueGetterParams) => {
    //   if(params.row.obt_date_approved1){
    //     const date = new Date(params.row.obt_date_approved1);
    //     return date.toLocaleDateString();
    //   } else {
    //     return '-'
    //   }
    // }
  },
  { field: 'sup_eval_points', headerName: 'Confirmed KPI Points', width: 180 },
  {
    field: 'core_compe_points',
    headerName: 'Core Points',
    width: 150,
    // valueGetter: (params: GridValueGetterParams) => {
    //   if(params.row.obt_date_approved2){
    //     const date = new Date(params.row.obt_date_approved2);
    //     return date.toLocaleDateString();
    //   } else {
    //     return '-'
    //   }
    // }
  },
  { field: 'sup_no', headerName: 'Supervisor #:',  width: 300, 
    // valueGetter: (params: GridValueGetterParams) => {
    //   if(params.row.date_added){
    //     const date = new Date(params.row.date_added);
    //     return dayjs(date).format("MM-DD-YYYY");
    //   } else {
    //     return '-'
    //   }
    // }
  },
];

  
export default {
  viewPayrollOptions,
  YourKPICOREPageDescriptions,
  YourKPICOREPageColumns
};
  