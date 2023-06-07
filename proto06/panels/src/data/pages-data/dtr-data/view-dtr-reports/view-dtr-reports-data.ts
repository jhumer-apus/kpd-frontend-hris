import { GridColDef, GridValueGetterParams, GridCellParams } from "@mui/x-data-grid";

export const viewDTROptions = [
  "View All DTR Logs/Entries",
  "View Merged DTR Logs",
  "View Cutoff DTR Summary",
  "View Employee Specific DTR"
];

export const viewDTRDescriptions = [
  "See all raw and unmerged logs of employees here. Sortable and filterable on the table headers.",
  "See merged logs of all employees here, showing the total hours and details of each logs. Sortable and filterable on the table headers.",
  "See the total hours of all employees per cutoff here. Sortable and filterable by the table headers.",
  "Nondescript"
];

const dynamicDTRColumns: Array<GridColDef[]> = 
[
  [
    { field: 'id', headerName: 'Entry ID', width: 120 },
    { field: 'emp_no', headerName: 'Employee Number', width: 120 },
    { field: 'entry_type', headerName: 'Entry Type', width: 120 },
    {
      field: 'datetime_bio',
      headerName: 'Entry Date',
      width: 150,
      valueGetter: (params: GridValueGetterParams) => {
        const date = new Date(params.row.datetime_bio);
        return date.toLocaleDateString();
      },
    },
    {
      field: 'datetime_bio',
      headerName: 'Entry Time',
      width: 150,
      valueGetter: (params: GridValueGetterParams) => {
        const date = new Date(params.row.datetime_bio);
        return date.toLocaleTimeString();
      },
    },
    { field: 'bio_id', headerName: 'Biometrics ID', width: 140 },
    { field: 'branch_code', headerName: 'Branch Code', width: 120 },
    { field: 'is_processed', headerName: 'Processed', width: 140 },
  ],
  [
    { field: 'id', headerName: 'Entry ID', width: 120 },
    { field: 'emp_no', headerName: 'Employee Number', width: 120 },
    { field: 'business_date', headerName: 'Business Date', width: 120 },
    {
      field: 'duty_in',
      headerName: 'Time In',
      width: 130,
      valueGetter: (params: GridValueGetterParams) => {
        const date = new Date(params.row.duty_in);
        return date.toLocaleTimeString();
      },
    },
    {
      field: 'duty_out',
      headerName: 'Time Out',
      width: 130,
      valueGetter: (params: GridValueGetterParams) => {
        const date = new Date(params.row.duty_out);
        return date.toLocaleTimeString();
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
  ],
];



const columns: GridColDef[] = 
[
  // { field: 'id', headerName: 'ID', width: 70 },
//   {
//     field: 'employee_image',
//     headerName: 'Prof Pic',
//     width: 150,
//     renderCell: (params: GridCellParams) => {
//       console.log(params, "maoaoa");
//       if (params.value){
//         return(
          
//           <img src={`http://172.16.168.155:8000${params.value as string}`} alt="" width="50" height="50" style={{borderRadius: "10px", height: "40px", width: "40px", objectFit: "cover", border: "1px solid white", boxShadow: "1px 1px 10px gray"}}/>
//           )
//       } else {
//         return (
//           null
//         )    
//       }
//     },
//   },
  { field: 'emp_no', headerName: 'Employee #', width: 120 },
  { field: 'first_name', headerName: 'First Name', width: 150 },
  { field: 'last_name', headerName: 'Last Name', width: 150 },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.first_name || ''} ${params.row.last_name || ''}`,
  },
//   { field: 'date_hired', headerName: 'Date Hired', width: 150 },
  { field: 'branch_code', headerName: 'Branch Code', width: 150 },
//   { field: 'mobile_phone', headerName: 'Mobile Number', width: 150 },
//   { field: `user`, headerName: 'Has HRIS Access', width: 150, valueGetter: (params: GridValueGetterParams) => `${params.row.user?.is_active ? 'Active' : 'No Access'}` },
//   { field: 'bio_id', headerName: 'Biometrics ID', width: 150 },
];


  
  
export default {
  viewDTROptions,
  viewDTRDescriptions
};
  