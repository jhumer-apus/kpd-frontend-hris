import { createSlice } from '@reduxjs/toolkit';
import { userLogin, userLoginSuccess, userLoginFailure, userLogout } from '../actions/auth';

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
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
      .addCase(userLoginSuccess, (state, action) => {
        state.isAuthenticated = true;
        state.token = action.payload;
        state.error = null;
      })
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