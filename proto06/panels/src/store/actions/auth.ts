import { createAction } from '@reduxjs/toolkit';
import { UserType, EmployeeDetailsType } from '@/types/types-store';


export const userLogin = createAction<{username: string, password: string, twoFactorToken?: string}>('USER_LOGIN');
// export const userLoginSuccess = createAction<string>('USER_LOGIN_SUCCESS');
export const userLoginFailure = createAction<string>('USER_LOGIN_FAILURE');


export const userLogout = createAction('USER_LOGOUT');
export const userLoginSuccess = createAction(
    "USER_LOGIN_SUCCESS",
    (jwt: string, user: UserType, employee_detail: EmployeeDetailsType) => ({ payload: { jwt, user, employee_detail } })
  );


// New actions
export const fetchUserData = createAction<{emp_no: Number}>('FETCH_USER_DATA');
export const fetchUserDataSuccess = createAction(
  'FETCH_USER_DATA_SUCCESS',
  (employee_detail: EmployeeDetailsType) => ({ payload: { employee_detail } })
  );
export const fetchUserDataFailure = createAction('FETCH_USER_DATA_FAILURE');