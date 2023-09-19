import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";


export const EOYPAY13THPageDescriptions = [
  "On this table, you will find the list of HRIS Bonus Entry of the employee of your company and their details each.",
  // "See merged logs of all employees here, showing the total hours and details of each logs. Sortable and filterable on the table headers.",
  // "See the total hours of all employees per cutoff here. Sortable and filterable by the table headers.",
  // "Nondescript"
];


export const EOYPAY13THPageColumns: GridColDef[] = 
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
  { field: 'coverage_from', 
    headerName: 'Coverage From:', 
    width: 150,
    valueGetter: (params: GridValueGetterParams) => {
      const date = new Date(params.row.coverage_from);
      return params.row.coverage_from ? date.toLocaleDateString() : 'No Date';
    }
  },
  { field: 'coverage_to', 
    headerName: 'Coverage To:', 
    width: 150,
    valueGetter: (params: GridValueGetterParams) => {
      const date = new Date(params.row.coverage_to);
      return params.row.coverage_to ? date.toLocaleDateString() : 'No Date';
    }
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
  { field: 'total_pay', 
    headerName: 'Total Pay:',  
    width: 180,
    valueGetter: (params: GridValueGetterParams) => {
      const string = new Number(params.row.total_pay);
      return params.row.total_pay ? string.toFixed(2) : 'No Date';
    } 
  },
];

export const EOYProcessPAY13THPageColumns: GridColDef[] = 
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
  EOYPAY13THPageDescriptions,
  EOYPAY13THPageColumns,
  EOYProcessPAY13THPageColumns
};
  