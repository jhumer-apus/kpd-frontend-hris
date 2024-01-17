import { createSlice } from '@reduxjs/toolkit';
import { 
  userLoginAction, 
  userLoginActionSuccess, 
  userLoginActionFailure, 
  userLogout,
  // fetchUserData,
  fetchUserDataSuccess,
  // fetchUserDataFailure,
} from '../actions/auth';
import { EMPLOYEESViewInterface } from '@/types/types-store';
import { USERViewInterface } from '@/types/types-pages';

interface AuthState {
  status: string;
  isAuthenticated: boolean;
  token: string | null;
  user: USERViewInterface | null; // Add user and employee fields
  employee_detail: EMPLOYEESViewInterface | null;
  error: string | null;
}

const initialState: AuthState = {
  status: '',
  isAuthenticated: false,
  token: null,
  user: null, // Initialize user and employee fields
  employee_detail: null,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userLoginAction, (state) => {
        state.status = 'logging_in';
        state.isAuthenticated = false;
        state.token = null;
        state.error = null;
      })
      .addCase(userLoginActionSuccess, (state, action) => 
      { 
        state.status = 'logged_in';
        state.isAuthenticated = true;
        state.token = action.payload.jwt; // Update this line to access the JWT from the payload
        state.user = action.payload.user; // Store user and employee details
        state.employee_detail = action.payload.employee_detail;
        state.error = null;
      }
      )
      .addCase(userLoginActionFailure, (state, action) => {
        state.status = 'logged_error';
        state.isAuthenticated = false;
        state.token = null;
        state.error = action.payload;
      })
      .addCase(userLogout, (state) => {
        state.status = 'logged_out';
        state.isAuthenticated = false;
        state.token = null;
        state.error = null;
        state.employee_detail = null; 
      })
      // .addCase(fetchUserData, (state) => {
      //   state.employee_detail = null; 
      // })
      .addCase(fetchUserDataSuccess, (state, action) => {
        state.employee_detail = action.payload.employee_detail;
      });
  },
});

export const authReducer = authSlice.reducer;