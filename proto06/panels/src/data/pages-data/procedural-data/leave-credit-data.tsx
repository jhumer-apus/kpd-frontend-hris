import { GridColDef, GridValueGetterParams, GridCellParams, GridValueFormatterParams } from "@mui/x-data-grid";

// export const viewPayrollOptions = [
//   "View Payroll Per Employee",
//   "No Other Payroll View Options",
//   // "View Cutoff DTR Summary",
//   // "View Employee Specific DTR"
// ];

export const ProceduralLEAVECREDITPageDescriptions = [
  "On this table, you will find the remaining leave credits of the employees and their details each.",
  // "See merged logs of all employees here, showing the total hours and details of each logs. Sortable and filterable on the table headers.",
  // "See the total hours of all employees per cutoff here. Sortable and filterable by the table headers.",
  // "Nondescript"
];


export const ProceduralLEAVECREDITPageColumns: GridColDef[] = 
[
  {
    field: 'expiry',
    headerName: 'Expiry Date',
    width: 150,
    valueGetter: (params: GridValueGetterParams) => {
      const date = new Date(params.row.expiry);
      return date.toLocaleDateString();
    }
  },
  { field: 'emp_no', headerName: 'For Emp:', width: 120 },
  { field: 'credit_remaining', headerName: 'Remaining', width: 100,
    renderCell: (params: GridCellParams) => {
      const status = params.row?.credit_remaining as number;

      let cellColor = '';
      if (status < 5 && status > 0) {
        cellColor = '#ff9100'; // Orange
      } else if ( status === 0 || status === null ){
        cellColor = '#aa2e25'; // Red
      }

      return(
      // <div style={{ height: '100%', width: '10%', alignItems: 'center' }}>
        // 
        <div className='relative'>
          <div style={{ top:'', left: '10px', position: 'absolute', backgroundColor: cellColor, height:'5px', width: '5px', borderRadius: '100px'}}></div>
          {status === 0 || status === null ? 0 : status}
        </div>
      // </div>
      );
    }  
  },
  { field: 'leave_name', headerName: 'Leave Credit Name',  width: 200 },
];
  
export default {
  ProceduralLEAVECREDITPageDescriptions,
  ProceduralLEAVECREDITPageColumns
};
  