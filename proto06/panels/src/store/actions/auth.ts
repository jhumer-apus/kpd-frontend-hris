import { createAction } from '@reduxjs/toolkit';


export const userLogin = createAction<{email: string, password: string, twoFactorToken?: string}>('USER_LOGIN');
export const userLoginSuccess = createAction<string>('USER_LOGIN_SUCCESS');
export const userLoginFailure = createAction<string>('USER_LOGIN_FAILURE');