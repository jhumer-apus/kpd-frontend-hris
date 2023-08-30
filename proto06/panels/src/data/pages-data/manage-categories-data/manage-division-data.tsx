import { GridColDef, GridValueGetterParams, GridCellParams, GridValueFormatterParams } from "@mui/x-data-grid";

// export const viewPayrollOptions = [
//   "View Payroll Per Employee",
//   "No Other Payroll View Options",
//   // "View Cutoff DTR Summary",
//   // "View Employee Specific DTR"
// ];

export const ManageDIVISIONPageDescriptions = [
  "On this table, you will find the list of branches your company has and their details each.",
  // "See merged logs of all employees here, showing the total hours and details of each logs. Sortable and filterable on the table headers.",
  // "See the total hours of all employees per cutoff here. Sortable and filterable by the table headers.",
  // "Nondescript"
];


export const ManageDIVISIONPageColumns: GridColDef[] = 
[
  {
    field: 'div_name',
    headerName: 'Division Name',
    width: 190,
    // valueGetter: (params: GridValueGetterParams) => {
    //   const date = new Date(params.row.expiry);
    //   return params.row.expiry ? date.toLocaleDateString() : 'No Expiry';
    // }
  },
  { field: 'div_lead', headerName: 'Div Lead:', width: 120 },
  { field: 'id', headerName: 'Division ID', width: 140,
    // renderCell: (params: GridCellParams) => {
    //   const status = params.row?.credit_remaining as number;

    //   let cellColor = '';
    //   if (status < 5 && status > 0) {
    //     cellColor = '#ff9100'; // Orange
    //   } else if ( status === 0 || status === null ){
    //     cellColor = '#aa2e25'; // Red
    //   }

    //   return(
    //   // <div style={{ height: '100%', width: '10%', alignItems: 'center' }}>
    //     // 
    //     <div className='relative'>
    //       <div style={{ top:'', left: '10px', position: 'absolute', backgroundColor: cellColor, height:'5px', width: '5px', borderRadius: '100px'}}></div>
    //       {status === 0 || status === null ? 0 : status}
    //     </div>
    //   // </div>
    //   );
    // }  
  },
  { field: 'div_branch_code', headerName: 'Branch',  width: 120 },
];
  
export default {
  ManageDIVISIONPageDescriptions,
  ManageDIVISIONPageColumns
};
  