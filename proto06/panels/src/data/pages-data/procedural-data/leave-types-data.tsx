import { globalDate } from "@/store/configureStore";
import { GridColDef, GridValueGetterParams, GridCellParams } from "@mui/x-data-grid";
import dayjs from "dayjs";


export const ProceduralLEAVETYPEPageDescriptions = [
  "On this table, you will find the leave type codes the employees can use and their details each.",
];


export const ProceduralLEAVETYPEPageColumns: GridColDef[] = 
[
  {
    field: 'date_added',
    headerName: 'Modified Date',
    width: 150,
    valueGetter: (params: GridValueGetterParams) => {
      const date = new Date(params.row.date_added);
      return params.row.date_added ? dayjs(date).format(`${globalDate}`) : 'No date';
    }
  },
  { field: 'id', headerName: 'Leave Type Code:', width: 140 },
  { field: 'is_paid', headerName: 'Paid', width: 80,
    renderCell: (params: GridCellParams) => {
      const status = params.row?.is_paid as boolean;

      let cellColor = '';
      return(
        <div className='relative'>
          <div style={{ top:'', left: '10px', position: 'absolute', backgroundColor: cellColor, height:'5px', width: '5px', borderRadius: '100px'}}></div>
          {status ? 'YES' : 'NO'}
        </div>
      );
    }  
  },
  { field: 'name', headerName: 'Leave Credit Name',  width: 200 },
];
  
export default {
  ProceduralLEAVETYPEPageDescriptions,
  ProceduralLEAVETYPEPageColumns
};
  