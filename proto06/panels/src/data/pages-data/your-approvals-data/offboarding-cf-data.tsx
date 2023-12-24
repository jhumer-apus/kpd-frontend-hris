import { globalDate } from "@/store/configureStore";
import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import dayjs from "dayjs";

export const OffboardingCFDescriptions = [
  "'Completed' means that the offboarding status has been completed it and can no longer be redefined.",
];


export const OffboardingCFColumns: GridColDef[] = 
[
  {
    field: 'date_offboard',
    headerName: 'Offboarding Date:',
    width: 150,
    valueGetter: (params: GridValueGetterParams) => {
      const date = new Date(params.row.date_offboard);
      return params.row.date_offboard ? dayjs(date).format(`${globalDate}`) : '-';
    }
  },
  { field: 'status', headerName: 'Status', width: 120 },
  { field: 'emp_no', headerName: 'Employee Number', width: 140,
  },
  {
    field: 'date_added',
    headerName: 'Date Added:',
    width: 150,
    valueGetter: (params: GridValueGetterParams) => {
      const date = new Date(params.row.date_added);
      return params.row.date_added ? dayjs(date).format(`${globalDate}`) : '-';
    }
  },
  {
    field: 'added_by',
    headerName: 'Added by Employee #:',
    width: 150,
  },
  { field: 'final_remarks', headerName: 'Final Remarks',  width: 300, 
  },
];

  
export default {
  OffboardingCFDescriptions,
  OffboardingCFColumns
};
  