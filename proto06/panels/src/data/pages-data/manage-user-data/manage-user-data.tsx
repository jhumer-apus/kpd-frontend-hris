import { globalDate } from "@/store/configureStore";
import { INTERNAL_USER_ROLE } from "@/types/types-store";
import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import dayjs from "dayjs";


export const ManageUSERPageDescriptions = [
  "On this table, you will find the list of HRIS users your company has and their details each.",
];

const roles = [
  {
      id: INTERNAL_USER_ROLE.Developer,
      role_name: "Developer"
  },
  {
      id: INTERNAL_USER_ROLE.HR_Super_Admin,
      role_name: "HR Super Admin"
  },
  {
      id: INTERNAL_USER_ROLE.HR_Director_Manager,
      role_name: "HR Director / Manager"
  },
  {
      id: INTERNAL_USER_ROLE.HR_Staff,
      role_name: "HR Staff"
  },
  {
      id: INTERNAL_USER_ROLE.Manager,
      role_name: "Department Manager / Director"
  },
  {
      id: INTERNAL_USER_ROLE.Employee,
      role_name: "Employee"
  },
]


export const ManageUSERPageColumns: GridColDef[] = 
[
  {
    field: 'emp_no',
    headerName: 'Employee #',
    width: 150,
  },
  { field: 'role', headerName: 'Role', width: 100,
    valueGetter: (params: GridValueGetterParams) => {
      const roleData = roles.find(role => role.id == params.row.role);
      return roleData?.role_name;
    }
   },
  { field: 'date_added', 
    headerName: 'Date Added', 
    width: 120,
    valueGetter: (params: GridValueGetterParams) => {
      const date = new Date(params.row.date_added);
      return params.row.date_added ? dayjs(date).format(`${globalDate}`) : 'No Date';
    }
  },
  { field: 'username', headerName: 'Username',  width: 100 },
  { field: 'emp_name', headerName: 'Employee Name',  width: 200 },
];
  
export default {
  ManageUSERPageDescriptions,
  ManageUSERPageColumns
};
  