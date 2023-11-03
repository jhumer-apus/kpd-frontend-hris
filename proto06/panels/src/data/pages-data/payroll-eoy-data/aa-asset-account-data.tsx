import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";


export const AAASSETACCOUNTPageDescriptions = [
  "On this table, you will find the list of HRIS Asset Account of your company and their details each.",
  // "See merged logs of all employees here, showing the total hours and details of each logs. Sortable and filterable on the table headers.",
  // "See the total hours of all employees per cutoff here. Sortable and filterable by the table headers.",
  // "Nondescript"
];


export const AAASSETACCOUNTPageColumns: GridColDef[] = 
[
  {
    field: 'id',
    headerName: 'Type ID',
    width: 100,
    // valueGetter: (params: GridValueGetterParams) => {
    //   const date = new Date(params.row.expiry);
    //   return params.row.expiry ? date.toLocaleDateString() : 'No Expiry';
    // }
  },
  { field: 'asset_list_code', headerName: 'Asset List Code:', width: 150 },
  { field: 'assigned_to', 
    headerName: 'Employee #:', 
    width: 130,
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
  { field: 'remarks', headerName: 'remarks',  width: 200 },
];
  
export default {
  AAASSETACCOUNTPageDescriptions,
  AAASSETACCOUNTPageColumns
};
  