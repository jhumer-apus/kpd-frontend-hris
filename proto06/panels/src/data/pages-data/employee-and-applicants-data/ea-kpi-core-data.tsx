import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import dayjs from "dayjs";
import sortBy from "lodash/sortBy"

export const EAKPICOREPageDescriptions = [
  "On this table, you will find the list of KPI Eval Data of the employees of your company and their details each.",
  // "See merged logs of all employees here, showing the total hours and details of each logs. Sortable and filterable on the table headers.",
  // "See the total hours of all employees per cutoff here. Sortable and filterable by the table headers.",
  // "Nondescript"
];


export const EAKPICOREPageColumns: GridColDef[] = 
[
  {
    field: 'final_rating',
    headerName: 'Final Rating',
    width: 100,
    // valueGetter: (params: GridValueGetterParams) => {
    //   const date = new Date(params.row.expiry);
    //   return params.row.expiry ? date.toLocaleDateString() : 'No Expiry';
    // }
  },
  { field: 'eval_date', 
    headerName: 'Eval Date:', 
    width: 150,
    valueGetter: (params: GridValueGetterParams) => {
      const date = new Date(params.row.eval_date);
      return params.row.eval_date ? dayjs(date).format("MM-DD-YYYY") : 'No Date';
    }
  },
  { field: 'status', 
    headerName: 'Status:', 
    width: 150,
    // valueGetter: (params: GridValueGetterParams) => {
    //   const date = new Date(params.row.coverage_to);
    //   return params.row.coverage_to ? date.toLocaleDateString() : 'No Date';
    // }
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
  { field: 'emp_name', 
    headerName: 'Employee Name:',  
    width: 180,
  },
];

export const EAProcessKPICOREPageColumns: GridColDef[] = 
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
  { field: 'last_name', headerName: 'Last Name', width: 120 }, //30
  { field: 'first_name', 
    headerName: 'First Name', 
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
  { field: 'rank_code', headerName: 'Rank Code:',  width: 150 }, //50
];
  
export default {
  EAKPICOREPageDescriptions,
  EAKPICOREPageColumns,
  EAProcessKPICOREPageColumns
};
  