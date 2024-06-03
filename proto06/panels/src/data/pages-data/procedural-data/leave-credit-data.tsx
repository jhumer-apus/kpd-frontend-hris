import { globalDate } from "@/store/configureStore";
import { GridColDef, GridValueGetterParams, GridCellParams } from "@mui/x-data-grid";
import dayjs from "dayjs";

export const ProceduralLEAVECREDITPageDescriptions = [
  "On this table, you will find the remaining leave credits of the employees and their details each.",
];


export const ProceduralLEAVECREDITPageColumns: GridColDef[] = 
[
  {
    field: 'expiry',
    headerName: 'Expiry Date',
    width: 150,
    valueGetter: (params: GridValueGetterParams) => {
      const date = new Date(params.row.expiry);
      return params.row.expiry ? dayjs(date).format(`${globalDate}`) : 'No Expiry';
    }
  },
  { field: 'emp_no', headerName: 'For Emp:', width: 120 },
  { field: 'credit_remaining', headerName: 'Remaining', width: 100,
    renderCell: (params: GridCellParams) => {
      const status = params.row?.credit_remaining as number;

      let cellColor = '';
      if (status < 5 && status > 0) {
        cellColor = '#ff9100'; // Orange
      } else if ( status === 0 || status === null ){
        cellColor = '#aa2e25'; // Red
      }

      return(
        <div className='relative'>
          <div style={{ top:'', left: '10px', position: 'absolute', backgroundColor: cellColor, height:'5px', width: '5px', borderRadius: '100px'}}></div>
          {status === 0 || status === null ? 0 : status}
        </div>
      );
    }  
  },
  { field: 'leave_name', headerName: 'Leave Credit Name',  width: 200 },
];
  
export default {
  ProceduralLEAVECREDITPageDescriptions,
  ProceduralLEAVECREDITPageColumns
};
  