import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";


export const AAANNOUNCEMENTPageDescriptions = [
  "On this table, you will find the list of Announcements of your company and their details each.",
  // "See merged logs of all employees here, showing the total hours and details of each logs. Sortable and filterable on the table headers.",
  // "See the total hours of all employees per cutoff here. Sortable and filterable by the table headers.",
  // "Nondescript"
];


export const AAANNOUNCEMENTPageColumns: GridColDef[] = 
[
  {
    field: 'order_by_no',
    headerName: 'Order by no:',
    width: 100,
    // valueGetter: (params: GridValueGetterParams) => {
    //   const date = new Date(params.row.expiry);
    //   return params.row.expiry ? date.toLocaleDateString() : 'No Expiry';
    // }
  },
  {
    field: 'date_posted',
    headerName: 'Date Posted',
    width: 150,
    valueGetter: (params: GridValueGetterParams) => {
      const date = new Date(params.row.date_posted);
      return params.row.date_posted ? date.toLocaleDateString() : 'No Date';
    }
  },
  { field: 'expiry_date', 
    headerName: 'Expiry Date', 
    width: 150,
    valueGetter: (params: GridValueGetterParams) => {
      const date = new Date(params.row.expiry_date);
      return params.row.expiry_date ? date.toLocaleDateString() : 'No Date';
    }
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
  { field: 'message', headerName: 'Message',  width: 200 },
];
  
export default {
  AAANNOUNCEMENTPageDescriptions,
  AAANNOUNCEMENTPageColumns
};
  