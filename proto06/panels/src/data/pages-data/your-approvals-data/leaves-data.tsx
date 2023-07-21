import { GridColDef, GridValueGetterParams, GridCellParams, GridValueFormatterParams } from "@mui/x-data-grid";

// export const viewPayrollOptions = [
//   "View Payroll Per Employee",
//   "No Other Payroll View Options",
//   // "View Cutoff DTR Summary",
//   // "View Employee Specific DTR"
// ];

export const ApprovalLEAVEPageDescriptions = [
  "Once you have successfully approved, the item will no longer be shown, go to procedurals for list instead",
  // "See merged logs of all employees here, showing the total hours and details of each logs. Sortable and filterable on the table headers.",
  // "See the total hours of all employees per cutoff here. Sortable and filterable by the table headers.",
  // "Nondescript"
];


export const ApprovalLEAVEPageColumns: GridColDef[] = 
[
  {
    field: 'leave_date_filed',
    headerName: 'Date Filed',
    width: 150,
    valueGetter: (params: GridValueGetterParams) => {
      const date = new Date(params.row.leave_date_filed);
      return date.toLocaleDateString();
    }
  },
  { field: 'emp_no', headerName: 'Filed By:', width: 120 },
  { field: 'leave_approval_status', headerName: 'Status', width: 100,
    renderCell: (params: GridCellParams) => {
      const status = params.row?.leave_approval_status as string;

      let cellColor = '';
      if (status === 'P1' || status === 'P2') {
        cellColor = '#ff9100'; // Orange
      } else if ( status==='DIS' ){
        cellColor = '#aa2e25'; // Red
      }

      return(
      // <div style={{ height: '100%', width: '10%', alignItems: 'center' }}>
        // 
        <div className='relative'>
          <div style={{ top:'', left: '26px', position: 'absolute', backgroundColor: cellColor, height:'5px', width: '5px', borderRadius: '100px'}}></div>
          {status}
        </div>
      // </div>
      );
    }  
  },
  { 
    field: 'leave_approver1_empno', 
    headerName: 'Approver #1', 
    width: 120,
    valueGetter: (params: GridValueGetterParams) => {
      if(params.row.leave_approver1_empno){
        return params.row.leave_approver1_empno
      } else {
        return 'Any higher rank'
      }
    } 
  },
  {
    field: 'leave_date_approved1',
    headerName: 'Date Approved #1',
    width: 150,
    valueGetter: (params: GridValueGetterParams) => {
      if(params.row.leave_date_approved1){
        const date = new Date(params.row.leave_date_approved1);
        return date.toLocaleDateString();
      } else {
        return '-'
      }
    }
  },
  { field: 'leave_approver2_empno', headerName: 'Approver #2', width: 120 },
  {
    field: 'leave_date_approved2',
    headerName: 'Date Approved #2',
    width: 150,
    valueGetter: (params: GridValueGetterParams) => {
      if(params.row.leave_date_approved2){
        const date = new Date(params.row.leave_date_approved2);
        return date.toLocaleDateString();
      } else {
        return '-'
      }
    }
  },
  { field: 'leave_reason_disapproval', headerName: 'Disapproval Reason',  width: 300 },
];
  
export default {
  ApprovalLEAVEPageDescriptions,
  ApprovalLEAVEPageColumns
};
  