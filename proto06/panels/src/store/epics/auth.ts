import { ofType } from 'redux-observable';
import { map, catchError, switchMap, mergeMap, tap } from 'rxjs/operators';
import { of, from } from 'rxjs';
import axios from 'axios';
import Cookies from 'js-cookie'
import { userLogin, userLoginSuccess, userLoginFailure } from '../actions/auth';
import { Epic } from 'redux-observable';
import { APILink } from '../configureStore';

const loginApiCall = async (username: string, password: string, twoFactorToken?: string) => {
    // const response = await axios.post("https://bitverse-api.herokuapp.com/login", {
    // const response = await axios.post("http://172.16.168.144:8888/login", {
    const response = await axios.post(`${APILink}login/`, {
    username,
    password,
    ...(twoFactorToken ? { twoFactorToken } : {}),
  });
  return response.data;
};

export const authEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(userLogin.type),
    switchMap((action: ReturnType<typeof userLogin>) =>
      from(
        loginApiCall(action.payload.username, action.payload.password, action.payload.twoFactorToken)
      ).pipe(
        map((data) => {
          // Save the token in a secure cookie with an expiration time of 1 hour
          Cookies.set('token', data.jwt, { expires: 1 / 24, secure: true });
          Cookies.set('user', JSON.stringify(data.user), { expires: 1 / 24, secure: true });
          Cookies.set('employee_detail', JSON.stringify(data.employee_detail), { expires: 1 / 24, secure: true });
          return userLoginSuccess(data.jwt, data.user, data.employee_detail);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data.error) {
            return of(userLoginFailure(error.response.data.error)); // Extract error message from the response
          } else {
            return of(userLoginFailure(error.message)); // If there is no custom error message, use the default one
          }
        })
      )
    )
);

import { fetchUserData, fetchUserDataSuccess, fetchUserDataFailure, } from '../actions/auth';


// New API call function
const fetchUserDataApiCall = async (emp_no: Number) => {
  const response = await axios.get(`${APILink}employees/${emp_no}`);
  return response.data;
};

// New Epic
export const fetchUserDataEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(fetchUserData.type),
    // tap(action => console log here('Received action in Epic:', action)), // Console logger
    switchMap((action: ReturnType<typeof fetchUserData>) =>
      from(fetchUserDataApiCall(action.payload.emp_no)).pipe(
        map((data) => {
          Cookies.set('employee_detail', JSON.stringify(data), { expires: 1 / 24, secure: true });
          return fetchUserDataSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data.error) {
            return of(fetchUserDataFailure(error.response.data.error)); 
          } else {
            return of(fetchUserDataFailure(error.message)); 
          }
        })
      )
    )
  );
