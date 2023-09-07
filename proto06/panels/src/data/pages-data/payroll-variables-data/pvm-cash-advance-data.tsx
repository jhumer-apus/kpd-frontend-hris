import { GridColDef } from "@mui/x-data-grid";

export const PVMCASHADVANCEPageDescriptions = [
  "On this table, you will find the list of Cash Advances of the employees of your company and their details each.",
  // "See merged logs of all employees here, showing the total hours and details of each logs. Sortable and filterable on the table headers.",
  // "See the total hours of all employees per cutoff here. Sortable and filterable by the table headers.",
  // "Nondescript"
];


export const PVMCASHADVANCEPageColumns: GridColDef[] = 
[
  {
    field: 'emp_no',
    headerName: 'Employee #',
    width: 100,
    // valueGetter: (params: GridValueGetterParams) => {
    //   const date = new Date(params.row.expiry);
    //   return params.row.expiry ? date.toLocaleDateString() : 'No Expiry';
    // }
  },
  { field: 'cash_advance_remaining', headerName: 'Remaning', width: 150 },
  { field: 'payment_monthly', 
    headerName: 'Monthly Payment', 
    width: 160,
    // valueGetter: (params: GridValueGetterParams) => {
    //   const date = new Date(params.row.date_added);
    //   return params.row.date_added ? date.toLocaleDateString() : 'No Date';
    // }
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
  { field: 'cash_advance_total', headerName: 'Cash Advance Total',  width: 160 },
];
  
export default {
  PVMCASHADVANCEPageDescriptions,
  PVMCASHADVANCEPageColumns
};
  