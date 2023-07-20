import { GridColDef, GridValueGetterParams, GridCellParams, GridValueFormatterParams } from "@mui/x-data-grid";

export const viewPayrollOptions = [
  "View Payroll Per Employee",
  "No Other Payroll View Options",
  // "View Cutoff DTR Summary",
  // "View Employee Specific DTR"
];

export const YourApprovalsOBTPageDescriptions = [
  "Once you have successfully approved, the item will no longer be shown, go to procedurals for list instead",
  // "See merged logs of all employees here, showing the total hours and details of each logs. Sortable and filterable on the table headers.",
  // "See the total hours of all employees per cutoff here. Sortable and filterable by the table headers.",
  // "Nondescript"
];


export const YourApprovalsOBTPageColumns: GridColDef[] = 
[
  {
    field: 'obt_date_filed',
    headerName: 'Date Filed',
    width: 150,
    valueGetter: (params: GridValueGetterParams) => {
      const date = new Date(params.row.obt_date_filed);
      return date.toLocaleDateString();
    }
  },
  { field: 'emp_no', headerName: 'Filed By:', width: 120 },
  { field: 'obt_approval_status', headerName: 'Status', width: 100 },
  {
    field: 'obt_approval_status1',
    headerName: 'Prof Pic',
    width: 150,
    renderCell: (params: GridCellParams) => {
      const status = params.value as string;

      let cellColor = '';
      if (status === 'P1') {
        cellColor = 'green'; // Set the desired color for 'P1' status
      } else {
        cellColor = 'red'; // Set the desired color for other statuses
      }

      return(
        `<div style={{ backgroundColor: cellColor, height: '100%', width: '100%' }}>
        {status}
      </div>`
      );
      // if (params. === 'P1'){
      //   return(
          
      //     <img src={`http://172.16.168.155:8000${params.value as string}`} alt="" width="50" height="50" style={{borderRadius: "10px", height: "40px", width: "40px", objectFit: "cover", border: "1px solid white", boxShadow: "1px 1px 10px gray"}}/>
      //     )
      // } else {
      //   return (
      //     null
      //   )    
      // }
    },
  },
  { field: 'obt_approver1_empno', headerName: 'Approver #1', width: 120 },
  {
    field: 'obt_date_approved1',
    headerName: 'Date Approved #1',
    width: 150,
    valueGetter: (params: GridValueGetterParams) => {
      const date = new Date(params.row.obt_date_approved1);
      return date.toLocaleDateString();
    }
  },
  { field: 'obt_approver2_empno', headerName: 'Approver #2', width: 120 },
  {
    field: 'obt_date_approved2',
    headerName: 'Date Approved #2',
    width: 150,
    valueGetter: (params: GridValueGetterParams) => {
      const date = new Date(params.row.obt_date_approved2);
      return date.toLocaleDateString();
    }
  },
  { field: 'obt_reason_disapproval', headerName: 'Disapproval Reason',  width: 150 },
];
  
export default {
  YourApprovalsOBTPageDescriptions,
  YourApprovalsOBTPageColumns
};
  