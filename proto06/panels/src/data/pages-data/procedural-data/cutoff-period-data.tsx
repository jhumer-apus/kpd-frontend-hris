import { GridColDef, GridValueGetterParams, GridCellParams, GridValueFormatterParams } from "@mui/x-data-grid";

// export const viewPayrollOptions = [
//   "View Payroll Per Employee",
//   "No Other Payroll View Options",
//   // "View Cutoff DTR Summary",
//   // "View Employee Specific DTR"
// ];

export const ProceduralCUTOFFPERIODPageDescriptions = [
  "On this table, you will find the available cutoff periods for the employees and their details each.",
  // "See merged logs of all employees here, showing the total hours and details of each logs. Sortable and filterable on the table headers.",
  // "See the total hours of all employees per cutoff here. Sortable and filterable by the table headers.",
  // "Nondescript"
];


export const ProceduralCUTOFFPERIODPageColumns: GridColDef[] = 
[
  {
    field: 'credit_date',
    headerName: 'Credit Date',
    width: 150,
    valueGetter: (params: GridValueGetterParams) => {
      const date = new Date(params.row.credit_date);
      return params.row.credit_date ? date.toLocaleDateString() : "No Date";
    }
  },
  { field: 'payroll_group_code', headerName: 'Payroll Group:', width: 140 },
  { field: 'division_code', headerName: 'Division:', width: 100,
    // renderCell: (params: GridCellParams) => {
    //   const status = params.row?.credit_remaining as number;

    //   let cellColor = '';
    //   if (status < 3) {
    //     cellColor = '#ff9100'; // Orange
    //   } else if ( status === 0 ){
    //     cellColor = '#aa2e25'; // Red
    //   }

    //   return(
    //   // <div style={{ height: '100%', width: '10%', alignItems: 'center' }}>
    //     // 
    //     <div className='relative'>
    //       <div style={{ top:'', left: '10px', position: 'absolute', backgroundColor: cellColor, height:'5px', width: '5px', borderRadius: '100px'}}></div>
    //       {status}
    //     </div>
    //   // </div>
    //   );
    // }  
  },
  { field: 'co_name', headerName: 'Cutoff Name',  width: 210 },
];
  
export default {
  ProceduralCUTOFFPERIODPageDescriptions,
  ProceduralCUTOFFPERIODPageColumns
};
  