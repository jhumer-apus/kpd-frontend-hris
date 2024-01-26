import { globalDate, globalTime } from "@/store/configureStore";
import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import dayjs from "dayjs";

export const viewDTROptions = [
  "View All DTR Logs/Entries",
  "View Merged DTR Logs",
  "View Cutoff DTR Summary",
  // "View Employee Specific DTR"
];

export const viewDTRDescriptions = [
  "Check options to view different types of DTR. This table pertains to Raw DTR Logs Uploaded. ",
  "This table pertains to showing the total hours and details of each logs per day. Sortable and filterable on the table headers.",
  "See the total hours of all employees per cutoff here. Sortable and filterable by the table headers.",
  // "Nondescript"
];

export const dynamicDTRColumns: Array<GridColDef[]> = 
[
  [
    { field: 'id', headerName: 'Entry ID', width: 120 },
    { field: 'emp_no', headerName: 'Employee #', width: 120 },
    { field: 'entry_type', headerName: 'Entry Type', width: 120 },
    {
      field: 'datetime_bio_date',
      headerName: 'Entry Date',
      width: 150,
      description: 'This column has a value getter and is not sortable. Use Filter instead, by clicking on the three dots beside this header.',
      sortable: true,
      valueGetter: (params: GridValueGetterParams) => {
        const date = new Date(params.row.datetime_bio);
        return params.row.datetime_bio ? dayjs(date).format(`${globalDate}`) : '-';
      },
    },
    {
      field: 'datetime_bio_time',
      headerName: 'Time',
      width: 150,
      description: 'This column has a value getter and is not sortable. Use Filter instead, by clicking on the three dots beside this header.',
      sortable: true,
      valueGetter: (params: GridValueGetterParams) => {
        const shio = new Date(params.row.datetime_bio);
        return params.row.datetime_bio ? dayjs(shio).format(`${globalTime}`) : '-';
      },
    },
    { field: 'bio_id', headerName: 'Biometrics ID', width: 140 },
    { field: 'branch_code', headerName: 'Branch Code', width: 120 },
    { field: 'is_processed', headerName: 'Processed', width: 140 },
  ],
  [
    { field: 'id', headerName: 'Entry ID', width: 120 },
    { field: 'emp_no', headerName: 'Employee #', width: 120 },
    { field: 'business_date', headerName: 'Business Date', width: 120 },
    {
      field: 'duty_in',
      headerName: 'Time In',
      width: 130,
      description: 'This column has a value getter and is not sortable. Use Filter instead, by clicking on the three dots beside this header.',
      sortable: false,
      valueGetter: (params: GridValueGetterParams) => {
        const isAbsent = params.row.is_absent as boolean;
        const date = new Date(params.row.duty_in);
        return params.row.duty_in ? dayjs(date).format(`${globalTime}`) : isAbsent ?  'ABSENT' : '-';
      },
    },
    {
      field: 'duty_out',
      headerName: 'Time Out',
      width: 130,
      description: 'This column has a value getter and is not sortable. Use Filter instead, by clicking on the three dots beside this header.',
      sortable: false,
      valueGetter: (params: GridValueGetterParams) => {
        const isAbsent = params.row.is_absent as boolean;
        const date = new Date(params.row.duty_out);
        return params.row.duty_out ? dayjs(date).format(`${globalTime}`) : isAbsent ?  'ABSENT' : '-';
      },
    },
    { field: 'lates', headerName: 'Lates(mins)', width: 120 },
    { field: 'undertime', headerName: 'Undertime(mins)', width: 120 },
    {
      field: 'total_hours',
      headerName: 'Total Hours',
      width: 120,
      valueGetter: (params: GridValueGetterParams) => {
        const convertedMinsToHours = parseFloat((params.row.total_hours / 60).toFixed(2));
        return convertedMinsToHours;
      },
    },
    { field: 'shift_name', headerName: 'Shift Name', width: 130 },
    { field: 'sched_timein', headerName: 'Scheduled In', width: 130 },
    { field: 'sched_timeout', headerName: 'Scheduled Out', width: 130 },
    { field: 'nd_total_hours', headerName: 'Night Differential', width: 150, 
      valueGetter: (params: GridValueGetterParams) => {
        const convertedMinsToHours = parseFloat((params.row.nd_total_hours / 60).toFixed(2));
        return convertedMinsToHours;
      },
    },

  ],
  [
    { field: 'id', headerName: 'Data ID', width: 100 },
    { field: 'emp_no', headerName: 'Emp. #', width: 100 },
    { field: 'business_date_from', headerName: 'Cutoff From', width: 120 },
    { field: 'business_date_to', headerName: 'Cutoff To', width: 120 },
    { 
      field: 'paid_leaves_total', 
      headerName: 'Paid Leaves',
      description: 'This column has a value getter and sorting may sometimes not accurately filter. Use Filter instead, by clicking on the three dots beside this header.',
      sortable: true, // Can turn to 'false' if there is bug in sorting.
      valueGetter: (params: GridValueGetterParams) => {
        return `${params.row.paid_leaves_total} day(s)`;
      },  
      width: 110 
    },
    { 
      field: 'reg_ot_total', 
      headerName: 'Reg. OT',
      description: 'This column has a value getter and sorting may sometimes not accurately filter. Use Filter instead, by clicking on the three dots beside this header.',
      sortable: true, // Can turn to 'false' if there is bug in sorting.
      valueGetter: (params: GridValueGetterParams) => {
        // const convertedMinsToHours = parseFloat((params.row.reg_ot_total / 60).toFixed(2));
        return `${params.row.reg_ot_total} min(s)`;
      }, 
      width: 120 
    },
    { 
      field: 'sp_holiday_total', 
      headerName: 'SP. Holidays', 
      valueGetter: (params: GridValueGetterParams) => {
        return `${params.row.sp_holiday_total} day(s)`;
      }, 
      width: 120 
    },
    { 
      field: 'reg_holiday_total', 
      headerName: 'REG. Holidays', 
      valueGetter: (params: GridValueGetterParams) => {
        return `${params.row.reg_holiday_total} day(s)`;
      }, 
      width: 120 
    },
    { 
      field: 'lates_total', 
      headerName: 'Lates', 
      valueGetter: (params: GridValueGetterParams) => {
        return `${params.row.lates_total} min(s)`;
      }, 
      width: 110 
    },
    { 
      field: 'undertime_total', 
      headerName: 'Undertime', 
      valueGetter: (params: GridValueGetterParams) => {
        return `${params.row.undertime_total} min(s)`;
      }, 
      width: 110 
    },
    { 
      field: 'absent_total', 
      headerName: 'Absences', 
      valueGetter: (params: GridValueGetterParams) => {
        return `${params.row.absent_total} day(s)`;
      }, 
      width: 110 
    },
    { 
      field: 'total_hours', 
      headerName: 'Total Hrs', 
      valueGetter: (params: GridValueGetterParams) => {
        return `${params.row.total_hours} min(s)`;
      }, 
      sortable: true,
      width: 110 
    },
    { field: 'is_processed', headerName: 'Processed', width: 110 },
    { field: 'nd_total_hours', headerName: 'Night Differential', width: 150 },
  ],
];
  
export default {
  viewDTROptions,
  viewDTRDescriptions,
  dynamicDTRColumns
};
  