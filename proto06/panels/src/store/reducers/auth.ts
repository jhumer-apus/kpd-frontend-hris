import { createSlice } from '@reduxjs/toolkit';
import { userLogin, userLoginSuccess, userLoginFailure, userLogout } from '../actions/auth';
import { UserType, EmployeeDetailsType } from '@/types/types-store';


interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: UserType | null; // Add user and employee fields
  employee_details: EmployeeDetailsType | null;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  user: null, // Initialize user and employee fields
  employee_details: null,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userLogin, (state) => {
        state.isAuthenticated = false;
        state.token = null;
        state.error = null;
      })
      .addCase(userLoginSuccess, (state, action) => 
      
      { console.log(action.payload, "mamawww223232");
        state.isAuthenticated = true;
        state.token = action.payload.jwt; // Update this line to access the JWT from the payload
        state.user = action.payload.user; // Store user and employee details
        state.employee_details = action.payload.employee_details;
        state.error = null;
      }
      
      )
      .addCase(userLoginFailure, (state, action) => {
        state.isAuthenticated = false;
        state.token = null;
        state.error = action.payload;
      })
      .addCase(userLogout, (state) => {
        state.isAuthenticated = false;
        state.token = null;
        state.error = null;
      });
  },
});

export const authReducer = authSlice.reducer;