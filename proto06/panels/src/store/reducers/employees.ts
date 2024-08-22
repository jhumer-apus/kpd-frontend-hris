import { createSlice } from '@reduxjs/toolkit';
import { EMPLOYEESViewInterface } from '@/types/types-store';
import { 
  getSpecificEmployeeInfo,
  getSpecificEmployeeInfoSuccess, 
  getSpecificEmployeeInfoFailure,
  getSpecificEmployeeInfoFailureCleanup, 
  getEmployeesListFailure, 
  getEmployeesListFailureCleanup, 
  getEmployeesListSuccess 
} from '../actions/employees';
import { globalReducerFailed, globalReducerLoading, globalReducerRefreshed, globalReducerSuccess } from '../configureStore';


interface AuthState {
  status: 'succeeded' | 'loading' | 'refreshed' | 'failed' | ''
  employees_list: EMPLOYEESViewInterface[];
  specific_employee_info: EMPLOYEESViewInterface | null;
  error: String | null;
}

const initialState: AuthState = {
  status: '',
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
        state.status = `${globalReducerSuccess}`;
        state.employees_list = action.payload.list;
        // state.employees_list = null;
        state.error = null;
      })
      .addCase(getEmployeesListFailure, (state, action) => {
        state.status = `${globalReducerFailed}`
        state.employees_list = [];
        // state.employees_specific_info = null;
        state.error = action.payload;
      })
      .addCase(getEmployeesListFailureCleanup, (state, action) => {
        state.status = `${globalReducerRefreshed}`;
        // state.employees_list = [];
        // state.employees_specific_info = null;
        state.error = null;
      })
      .addCase(getSpecificEmployeeInfo, (state, action) => {
        // state.employees_list = null;
        state.status = `${globalReducerLoading}`;
        state.specific_employee_info = null;
        state.error = null;
      })
      .addCase(getSpecificEmployeeInfoSuccess, (state, action) => {
        // state.employees_list = null;
        state.status = `${globalReducerSuccess}`;
        state.specific_employee_info = action.payload.list;
        state.error = null;
      })
      .addCase(getSpecificEmployeeInfoFailure, (state, action) => {
        // state.employees_list = null;
        state.status = `${globalReducerFailed}`
        state.specific_employee_info = null;
        state.error = action.payload;
      })
      .addCase(getSpecificEmployeeInfoFailureCleanup, (state, action) => {
        state.status = `${globalReducerRefreshed}`;
        // state.employees_list = [];
        // state.employees_specific_info = null;
        state.error = null;
      })
  },
});



export const employeesReducer = employeesSlice.reducer;