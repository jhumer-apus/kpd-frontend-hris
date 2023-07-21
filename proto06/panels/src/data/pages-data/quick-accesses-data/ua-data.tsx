import { GridColDef, GridValueGetterParams, GridCellParams, GridValueFormatterParams } from "@mui/x-data-grid";

// export const viewPayrollOptions = [
//   "View Payroll Per Employee",
//   "No Other Payroll View Options",
//   // "View Cutoff DTR Summary",
//   // "View Employee Specific DTR"
// ];

export const QuickAccessUAPageDescriptions = [
  "Once you have successfully approved, the item will no longer be shown, go to procedurals for list instead",
  // "See merged logs of all employees here, showing the total hours and details of each logs. Sortable and filterable on the table headers.",
  // "See the total hours of all employees per cutoff here. Sortable and filterable by the table headers.",
  // "Nondescript"
];


export const QuickAccessUAPageColumns: GridColDef[] = 
[
  {
    field: 'ua_date_filed',
    headerName: 'Date Filed',
    width: 150,
    valueGetter: (params: GridValueGetterParams) => {
      const date = new Date(params.row.ua_date_filed);
      return date.toLocaleDateString();
    }
  },
  { field: 'emp_no', headerName: 'Filed By:', width: 120 },
  { field: 'ua_approval_status', headerName: 'Status', width: 100,
    renderCell: (params: GridCellParams) => {
      const status = params.row?.ua_approval_status as string;

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
  { field: 'ua_reason_disapproval', headerName: 'Disapproval Reason',  width: 200 },
];
  
export default {
  QuickAccessUAPageDescriptions,
  QuickAccessUAPageColumns
};
  