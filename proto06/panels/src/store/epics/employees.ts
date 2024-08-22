import { ofType } from 'redux-observable';
import { map, catchError, switchMap, mergeMap } from 'rxjs/operators';
import { of, from } from 'rxjs';
import axios from 'axios';
import { getEmployeesList, getEmployeesListFailure, getEmployeesListSuccess } from '../actions/employees';

import { Epic } from 'redux-observable';
import { getSpecificEmployeeInfo, getSpecificEmployeeInfoSuccess, getSpecificEmployeeInfoFailure } from '../actions/employees';
import { APILink } from '../configureStore';

const getEmployeesListApiCall = async () => {

    // const response = await axios.post(`https://bitverse-api.herokuapp.com/login`, {
    // const response = await axios.post(`http://172.16.168.144:8888/login`, {
    const response = await axios.get(`${APILink}employees/`);
  return response.data;
};

const getSpecificEmployeesInfoApiCall = async (employee_id: number) => {
  const response = await axios.get(`${APILink}employees/${employee_id}/`);
  return response.data;
};

export const employeesListEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(getEmployeesList.type),
    switchMap(() =>
      from(
        getEmployeesListApiCall()
      ).pipe(
        map((data) => {
          return getEmployeesListSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data.error) {
            return of(getEmployeesListFailure(error.response.data.error)); 
          } else {
            return of(getEmployeesListFailure(error.message)); 
          }
        })
      )
    )
);

export const employeesSpecificEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(getSpecificEmployeeInfo.type),
    switchMap((action: ReturnType<typeof getSpecificEmployeeInfo>) =>
      from(
        getSpecificEmployeesInfoApiCall(action.payload.employee_id)
      ).pipe(
        map((data) => {
          // Save the token in a secure cookie with an expiration time of 1 hour
          // Cookies.set('token', data.jwt, { expires: 1 / 24, secure: true });
          // Cookies.set('user', JSON.stringify(data.user), { expires: 1 / 24, secure: true });
          // Cookies.set('employee_detail', JSON.stringify(data.employee_detail), { expires: 1 / 24, secure: true });
          return getSpecificEmployeeInfoSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data.error) {
            return of(getSpecificEmployeeInfoFailure(error.response.data.error)); 
          } else {
            return of(getSpecificEmployeeInfoFailure(error.message)); 
          }
        })
      )
    )
);