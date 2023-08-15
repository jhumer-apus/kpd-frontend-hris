import { GridColDef, GridValueGetterParams, GridCellParams, GridValueFormatterParams } from "@mui/x-data-grid";

// export const viewPayrollOptions = [
//   "View Payroll Per Employee",
//   "No Other Payroll View Options",
//   // "View Cutoff DTR Summary",
//   // "View Employee Specific DTR"
// ];

export const ProceduralLEAVETYPEPageDescriptions = [
  "On this table, you will find the leave type codes the employees can use and their details each.",
  // "See merged logs of all employees here, showing the total hours and details of each logs. Sortable and filterable on the table headers.",
  // "See the total hours of all employees per cutoff here. Sortable and filterable by the table headers.",
  // "Nondescript"
];


export const ProceduralLEAVETYPEPageColumns: GridColDef[] = 
[
  {
    field: 'date_added',
    headerName: 'Modified Date',
    width: 150,
    valueGetter: (params: GridValueGetterParams) => {
      const date = new Date(params.row.date_added);
      return params.row.date_added ? date.toLocaleDateString() : 'No date';
    }
  },
  { field: 'id', headerName: 'Leave Type Code:', width: 140 },
  { field: 'is_paid', headerName: 'Paid', width: 80,
    renderCell: (params: GridCellParams) => {
      const status = params.row?.is_paid as boolean;

      let cellColor = '';
      // if (status < 5 && status > 0) {
      //   cellColor = '#ff9100'; // Orange
      // } else if ( status === 0 || status === null ){
      //   cellColor = '#aa2e25'; // Red
      // }
      return(
      // <div style={{ height: '100%', width: '10%', alignItems: 'center' }}>
        // 
        <div className='relative'>
          <div style={{ top:'', left: '10px', position: 'absolute', backgroundColor: cellColor, height:'5px', width: '5px', borderRadius: '100px'}}></div>
          {status ? 'YES' : 'NO'}
        </div>
      // </div>
      );
    }  
  },
  { field: 'name', headerName: 'Leave Credit Name',  width: 200 },
];
  
export default {
  ProceduralLEAVETYPEPageDescriptions,
  ProceduralLEAVETYPEPageColumns
};
  