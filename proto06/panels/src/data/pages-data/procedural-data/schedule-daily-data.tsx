import { globalDate, globalTime } from "@/store/configureStore";
import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import dayjs from "dayjs";

export const ProceduralSCHEDULEDAILYPageDescriptions = [
  "On this table, you will find the shift schedule of an employee and their details each.",
];


export const ProceduralSCHEDULEDAILYPageColumns: GridColDef[] = 
[
  {
    field: 'business_date',
    headerName: 'Business Date',
    width: 150,
    valueGetter: (params: GridValueGetterParams) => {
      const date = new Date(params.row.business_date);
      return dayjs(date).format(`${globalDate}`);
    }
  },
  { 
    field: 'schedule_shift_code.time_in', 
    headerName: 'Time In:', 
    width: 140,
    valueGetter: (params: GridValueGetterParams) => {
      const formattedTime = params.row.schedule_shift_code?.time_in ? dayjs(params.row.schedule_shift_code.time_in, "HH:mm:ss").format(`${globalTime}`) : null;
      return formattedTime ?? '-';
    } 
  },
  { 
    field: 'schedule_shift_code.time_out', 
    headerName: 'Time Out:', 
    width: 130,
    valueGetter: (params: GridValueGetterParams) => {
      const formattedTime = params.row.schedule_shift_code?.time_out ? dayjs(params.row.schedule_shift_code.time_out, "HH:mm:ss").format(`${globalTime}`) : null;
      return formattedTime ?? '-';
    } 
  },
  { 
    field: 'schedule_shift_code.name', 
    headerName: 'Shift Name', 
    width: 210,
    valueGetter: (params: GridValueGetterParams) => {
      const name = (params.row.schedule_shift_code?.name) ? (params.row.schedule_shift_code.name) : null;
      return name ?? 'No Schedule';
    } 
  },
];
  
export default {
  ProceduralSCHEDULEDAILYPageDescriptions,
  ProceduralSCHEDULEDAILYPageColumns
};
  