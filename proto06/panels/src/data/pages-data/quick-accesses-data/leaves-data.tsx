import { globalDate, globalDateTime } from "@/store/configureStore";
import { GridColDef, GridValueGetterParams, GridCellParams } from "@mui/x-data-grid";
import dayjs from "dayjs";

export const QuickAccessLEAVEPageDescriptions = [
  "On this table, you will find the history of your filed requests for the past week, months, or years.",
];


export const QuickAccessLEAVEPageColumns: GridColDef[] = 
[
  {
    field: 'leave_date_filed',
    headerName: 'Date Filed',
    width: 150,
    valueGetter: (params: GridValueGetterParams) => {
      const date = new Date(params.row.leave_date_filed);
      return dayjs(date).format(`${globalDateTime}`);
    }
  },
  { field: 'emp_no', headerName: 'Filed By:', width: 120 },
  { field: 'leave_approval_status', headerName: 'Status', width: 100,
    renderCell: (params: GridCellParams) => {
      const status = params.row?.leave_approval_status as string;

      let cellColor = '';
      if (status === 'P1' || status === 'P2') {
        cellColor = '#ff9100'; // Orange
      } else if ( status==='DIS' ){
        cellColor = '#aa2e25'; // Red
      } else if ( status==='APD' ){
        cellColor = '#008000'; // Green
      }

      return(
        <div className='relative'>
          <div style={{ top:'', left: '26px', position: 'absolute', backgroundColor: cellColor, height:'5px', width: '5px', borderRadius: '100px'}}></div>
          {status}
        </div>
      );
    }  
  },
  { field: 'leave_reason_disapproval', headerName: 'Disapproval Reason',  width: 200 },
];
  
export default {
  QuickAccessLEAVEPageDescriptions,
  QuickAccessLEAVEPageColumns
};
  