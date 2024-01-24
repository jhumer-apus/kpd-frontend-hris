import { createSlice } from '@reduxjs/toolkit';
import { EMPLOYEESViewInterface } from '@/types/types-store';
import { 
  getSpecificEmployeeInfo,
  getSpecificEmployeeInfoSuccess, 
  getSpecificEmployeeInfoFailure, 
  getEmployeesListFailure, 
  getEmployeesListSuccess 
} from '../actions/employees';


interface AuthState {
  employees_list: EMPLOYEESViewInterface[];
  specific_employee_info: EMPLOYEESViewInterface | null;
  error: String | null;
}

const initialState: AuthState = {
  employees_list: [],
  specific_employee_info: null,
  error: null,
};

export const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEmployeesListSuccess, (state, action) => {
        state.employees_list = action.payload.list;
        // state.employees_list = null;
        state.error = null;
      })
      .addCase(getEmployeesListFailure, (state, action) => {
        state.employees_list = [];
        // state.employees_specific_info = null;
        state.error = action.payload;
      })
      .addCase(getSpecificEmployeeInfo, (state, action) => {
        // state.employees_list = null;

        state.specific_employee_info = null;
        state.error = null;
      })
      .addCase(getSpecificEmployeeInfoSuccess, (state, action) => {
        // state.employees_list = null;
        state.specific_employee_info = action.payload.list;
        state.error = null;
      })
      .addCase(getSpecificEmployeeInfoFailure, (state, action) => {
        // state.employees_list = null;
        state.specific_employee_info = null;
        state.error = action.payload;
      })
  },
});



export const employeesReducer = employeesSlice.reducer;