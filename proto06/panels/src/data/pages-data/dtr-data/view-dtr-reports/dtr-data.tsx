import { globalDate, globalTime } from "@/store/configureStore";
import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { RootState } from '@/store/configureStore';
import dayjs from "dayjs";

import { useSelector } from 'react-redux';


export const viewDTROptions = {
  logs: "View All DTR Logs/Entries",
  merged: "View Merged DTR Logs",
  cutoff: "View Cutoff DTR Summary",
  // "View Employee Specific DTR"
};

export const viewDTRDescriptions:any = {
  logs: "Check options to view different types of DTR. This table pertains to Raw DTR Logs Uploaded. ",
  merged: "This table pertains to showing the total hours and details of each logs per day. Sortable and filterable on the table headers.",
  cutoff: "See the total hours of all employees per cutoff here. Sortable and filterable by the table headers.",
  // "Nondescript"
};

type DynamicDTRColumns = {
  logs: GridColDef[],
  merged: GridColDef[],
  cutoff: GridColDef[]
}


export const dynamicDTRColumns= ():DynamicDTRColumns => {

const currUser = useSelector((state: RootState) => state.auth.employee_detail);

const isDepartmentManager = currUser?.rank_code == 3;

console.log("department manager? " + isDepartmentManager)

const convertHoursToMins = (mins:number): { hours: number, remainingMins: number } => {

  let hours = Math.floor(mins / 60); // Get the whole number of hours
  let remainingMins = mins % 60; // Get the remaining minutes

  return { hours, remainingMins };
};

return {
    logs: [
      { field: 'id', headerName: 'Entry ID', flex: 1, minWidth: 120},
      { field: 'emp_no', headerName: 'Employee #', flex: 1, minWidth: 120},
      { field: 'emp_name', headerName: 'Name',  flex: 1, minWidth: 120},
      { field: 'flag1_in_out', headerName: 'Entry Type',  flex: 1, minWidth: 120,
        valueGetter: (params: GridValueGetterParams) => {
          const entryType = params.row.flag1_in_out? "Duty Out": "Duty In";
          return entryType;
        },
      },
      {
        field: 'datetime_bio_date',
        headerName: 'Entry Date',
        flex: 1, 
        minWidth: 120,
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
        flex: 1, 
        minWidth: 120,
        description: 'This column has a value getter and is not sortable. Use Filter instead, by clicking on the three dots beside this header.',
        sortable: true,
        valueGetter: (params: GridValueGetterParams) => {
          const shio = new Date(params.row.datetime_bio);
          return params.row.datetime_bio ? dayjs(shio).format(`${globalTime}`) : '-';
        },
      },
      { field: 'is_processed', headerName: 'Process Status', flex: 1, minWidth: 120, 
        valueGetter: (params: GridValueGetterParams) => {
          const processStatus = params.row.is_processed? "Completed": "In Progress"
          return processStatus;
        },
      },

      ...((currUser?.rank_code??0) > 3 ? [
          { field: 'bio_id', headerName: 'Biometrics ID',  flex: 1, minWidth: 120},
          // { field: 'branch_code', headerName: 'Branch Code', width: 120 }
        ]: []
      )
    
    ],
    merged: [
      { field: 'id', headerName: 'Entry ID',  flex: 1, minWidth: 120},
      { field: 'emp_no', headerName: 'Employee #',  flex: 1, minWidth: 120},
      { field: 'emp_name', headerName: 'Name',  flex: 1, minWidth: 120},
      { field: 'business_date', headerName: 'Business Date',  flex: 1, minWidth: 120},
      {
        field: 'duty_in',
        headerName: 'Time In',
        flex: 1, 
        minWidth: 120,
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
        flex: 1, 
        minWidth: 120,
        description: 'This column has a value getter and is not sortable. Use Filter instead, by clicking on the three dots beside this header.',
        sortable: false,
        valueGetter: (params: GridValueGetterParams) => {
          const isAbsent = params.row.is_absent as boolean;
          const date = new Date(params.row.duty_out);
          return params.row.duty_out ? dayjs(date).format(`${globalTime}`) : isAbsent ?  'ABSENT' : '-';
        },
      },
      ...((currUser?.rank_code??0) > 3 ? [
        { field: 'lates', headerName: 'Lates(mins)',  flex: 1, minWidth: 120},
        { field: 'undertime', headerName: 'Undertime(mins)',  flex: 1, minWidth: 120},
        {
          field: 'total_hours',
          headerName: 'Total Hours',
          flex: 1, 
          minWidth: 120,
          valueGetter: (params: GridValueGetterParams) => {
            const convertedMinsToHours = parseFloat((params.row.total_hours / 60).toFixed(2));
            return convertedMinsToHours;
          },
        },
        { field: 'shift_name', headerName: 'Shift Name',  flex: 1, minWidth: 120},
        { field: 'sched_timein', headerName: 'Scheduled In',  flex: 1, minWidth: 120},
        { field: 'sched_timeout', headerName: 'Scheduled Out',  flex: 1, minWidth: 120},
        { field: 'nd_total_hours', headerName: 'Night Differential', flex: 1, minWidth: 120,  
          valueGetter: (params: GridValueGetterParams) => {
            const convertedMinsToHours = parseFloat((params.row.nd_total_hours / 60).toFixed(2));
            return convertedMinsToHours;
          },
        },
      ]:[])

    ],
    cutoff: [
      { field: 'id', headerName: 'Data ID',  flex: 1, minWidth: 120},
      { field: 'emp_no', headerName: 'Emp. #', flex: 1, minWidth: 120},
      { field: 'emp_name', headerName: 'Name',  flex: 1, minWidth: 120},
      { field: 'business_date_from', headerName: 'Cutoff From',  flex: 1, minWidth: 120},
      { field: 'business_date_to', headerName: 'Cutoff To',  flex: 1, minWidth: 120},
      { 
        field: 'paid_leaves_total', 
        headerName: 'Paid Leaves',
        flex: 1, 
        minWidth: 120,
        description: 'This column has a value getter and sorting may sometimes not accurately filter. Use Filter instead, by clicking on the three dots beside this header.',
        sortable: true, // Can turn to 'false' if there is bug in sorting.
        valueGetter: (params: GridValueGetterParams) => {
          return `${params.row.paid_leaves_total} day(s)`;
        },  
        
      },
      ...(isDepartmentManager? [
        { 
          field: 'allowance_time_total_hours', 
          headerName: 'Allowance Time Total Hours',
          flex: 1, 
          minWidth: 120,
          description: 'This column has a value getter and sorting may sometimes not accurately filter. Use Filter instead, by clicking on the three dots beside this header.',
          sortable: true, // Can turn to 'false' if there is bug in sorting.
          valueGetter: (params: GridValueGetterParams) => {
            return `${(params.row.reg_ot_total_hours??0) + (params.row.nd_ot_total_hours??0)} min(s)`;
          }, 
          
        },
      ]: [
        { 
          field: 'reg_ot_total_hours', 
          headerName: 'Reg. OT',
          flex: 1, 
          minWidth: 120,
          description: 'This column has a value getter and sorting may sometimes not accurately filter. Use Filter instead, by clicking on the three dots beside this header.',
          sortable: true, // Can turn to 'false' if there is bug in sorting.
          valueGetter: (params: GridValueGetterParams) => {
            return `${params.row.reg_ot_total_hours} min(s)`;
          }, 
           
        }
      ]),
      { 
        field: 'sp_holiday_total', 
        headerName: 'SP. Holidays',
        flex: 1, 
        minWidth: 120,
        valueGetter: (params: GridValueGetterParams) => {
          return `${params.row.sp_holiday_total} day(s)`;
        }, 
        
      },
      { 
        field: 'reg_holiday_total', 
        headerName: 'REG. Holidays',
        flex: 1, 
        minWidth: 120,
        valueGetter: (params: GridValueGetterParams) => {
          return `${params.row.reg_holiday_total} day(s)`;
        }, 
        
      },
      ...(!["Field", "Field-Auto"].includes(currUser?.employee_type) && [2,3].includes(currUser?.rank_code)) ? [
        { 
          field: 'lates_total', 
          headerName: 'Lates',
          flex: 1, 
          minWidth: 120,
          valueGetter: (params: GridValueGetterParams) => {
            return `${params.row.lates_total} min(s)`;
          }, 
          
        },
        { 
          field: 'undertime_total', 
          headerName: 'Undertime',
          flex: 1, 
          minWidth: 120, 
          valueGetter: (params: GridValueGetterParams) => {
            return `${params.row.undertime_total} min(s)`;
          }, 
           
        }
      ]: [],
      { 
        field: 'absent_total', 
        headerName: 'Absences',
        flex: 1, 
        minWidth: 120, 
        valueGetter: (params: GridValueGetterParams) => {
          return `${params.row.absent_total} day(s)`;
        }, 
         
      },
      { 
        field: 'total_hours', 
        headerName: 'Total Hrs',
        flex: 1, 
        minWidth: 120, 
        valueGetter: (params: GridValueGetterParams) => {
          const totalHours = params.row.total_hours;
          const { hours, remainingMins } = convertHoursToMins(totalHours);
          return `${hours} hr(s) ${remainingMins} min(s)`;
          // return `${params.row.total_hours} min(s)`;
        }, 
        sortable: true,
        
      },
      { 
        field: 'is_processed', 
        headerName: 'Processed',
        flex: 1, 
        minWidth: 120,
      },
      ...(!["Field", "Field-Auto"].includes(currUser?.employee_type) && [2,3].includes(currUser?.rank_code)) ? [
        { 
          field: 'nd_total_hours', 
          headerName: 'Night Differential',
          flex: 1, 
          minWidth: 120,         
        },
      ] : [],
    ],
  };
}
  
export default {
  viewDTROptions,
  viewDTRDescriptions,
  dynamicDTRColumns
};
  