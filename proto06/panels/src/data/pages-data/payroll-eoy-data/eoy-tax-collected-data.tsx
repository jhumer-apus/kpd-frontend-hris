import { GridColDef, GridValueGetterParams, GridCellParams, GridValueFormatterParams } from "@mui/x-data-grid";

export const viewPayrollOptions = [
  "View Payroll Per Employee",
  "No Other Payroll View Options",
  // "View Cutoff DTR Summary",
  // "View Employee Specific DTR"
];

export const EOYTAXCOLLECTEDPageDescriptions = [
  "To request for an overall total view widget, please contact your service provider/developers.",
  // "See merged logs of all employees here, showing the total hours and details of each logs. Sortable and filterable on the table headers.",
  // "See the total hours of all employees per cutoff here. Sortable and filterable by the table headers.",
  // "Nondescript"
];


export const EOYTAXCOLLECTEDPageColumns: GridColDef[] = 
[
  {
    field: 'date_added',
    headerName: 'Date Filed',
    width: 150,
    valueGetter: (params: GridValueGetterParams) => {
      const date = new Date(params.row.date_added);
      return date.toLocaleDateString();
    }
  },
  { field: 'emp_no', headerName: 'Employee #:', width: 120 },
  { field: 'id', headerName: 'ID', width: 100,
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
    field: 'cutoff_code', 
    headerName: 'Cutoff Code:', 
    width: 120,
    // valueGetter: (params: GridValueGetterParams) => {
    //   if(params.row.obt_approver1_empno){
    //     return params.row.obt_approver1_empno
    //   } else {
    //     return 'Any higher rank'
    //   }
    // } 
  },
  {
    field: 'allowance_entry_code',
    headerName: 'Allowance Code:',
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
  { field: 'tax_rate_used', headerName: 'Tax Rate Used:', width: 180 },
  // {
  //   field: 'obt_date_approved2',
  //   headerName: 'Date Approved #2',
  //   width: 150,
  //   valueGetter: (params: GridValueGetterParams) => {
  //     if(params.row.obt_date_approved2){
  //       const date = new Date(params.row.obt_date_approved2);
  //       return date.toLocaleDateString();
  //     } else {
  //       return '-'
  //     }
  //   }
  // },
  { field: 'amount_deducted', headerName: 'Amount Deducted',  width: 300 },
];
  
export default {
  EOYTAXCOLLECTEDPageDescriptions,
  EOYTAXCOLLECTEDPageColumns
};
  