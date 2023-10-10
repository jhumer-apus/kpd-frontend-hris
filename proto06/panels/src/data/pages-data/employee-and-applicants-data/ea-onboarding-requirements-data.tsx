import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import dayjs from "dayjs";

export const EAONBOARDINGREQUIREMENTSPageDescriptions = [
  "On this table, you will find the list of company's Onboarding Requirements and their details each.",
  // "See merged logs of all employees here, showing the total hours and details of each logs. Sortable and filterable on the table headers.",
  // "See the total hours of all employees per cutoff here. Sortable and filterable by the table headers.",
  // "Nondescript"
];


export const EAONBOARDINGREQUIREMENTSPageColumns: GridColDef[] = 
[
  {
    field: 'id',
    headerName: 'ID:',
    width: 80,
    // valueGetter: (params: GridValueGetterParams) => {
    //   const date = new Date(params.row.expiry);
    //   return params.row.expiry ? date.toLocaleDateString() : 'No Expiry';
    // }
  },

  { field: 'date_added', 
    headerName: 'Date Added', 
    width: 130,
    valueGetter: (params: GridValueGetterParams) => {
      const date = new Date(params.row.date_added);
      return params.row.date_added ? dayjs(date).format("MM-DD-YYYY") : 'No Date';
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
  { field: 'facilitator', headerName: 'Facilitator:', width: 100 },
  { field: 'onboarding_title', headerName: 'Onboarding Title',  width: 270 },
];
  
export default {
  EAONBOARDINGREQUIREMENTSPageDescriptions,
  EAONBOARDINGREQUIREMENTSPageColumns
};
  