import { ofType } from 'redux-observable';
import { map, catchError, switchMap, mergeMap } from 'rxjs/operators';
import { of, from } from 'rxjs';
import axios from 'axios';
import Cookies from 'js-cookie'
import { getEmployeesList, getEmployeesListFailure, getEmployeesListSuccess } from '../actions/employees';

import { Epic } from 'redux-observable';
import { EmployeeDetailsType } from '@/types/types-store';
import { getSpecificEmployeeInfo, getSpecificEmployeeInfoSuccess, getSpecificEmployeeInfoFailure } from '../actions/employees';

const getEmployeesListApiCall = async () => {

    // const response = await axios.post("https://bitverse-api.herokuapp.com/login", {
    // const response = await axios.post("http://172.16.168.144:8888/login", {
    const response = await axios.get("http://172.16.168.155:8000/api/employees");
  // console.log(response, "aaa");
  return response.data;
};

const getSpecificEmployeesInfoApiCall = async (employee_id: number) => {
console.log(employee_id, "employee_id123")
  // const response = await axios.post("https://bitverse-api.herokuapp.com/login", {
  // const response = await axios.post("http://172.16.168.144:8888/login", {
const response = await axios.get(`http://172.16.168.155:8000/api/employees/${employee_id}/`);
// console.log(response, "bbb");
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
          // console.log("asdasdasdasd")
          // Save the token in a secure cookie with an expiration time of 1 hour
          // Cookies.set('token', data.jwt, { expires: 1 / 24, secure: true });
          // Cookies.set('user', JSON.stringify(data.user), { expires: 1 / 24, secure: true });
          // Cookies.set('employee_detail', JSON.stringify(data.employee_detail), { expires: 1 / 24, secure: true });
          // console.log(data, "hallooooo11111");
          return getEmployeesListSuccess(data);
        }),
        catchError((error) => {
          // console.log(error.response, "maeeeeee111owww");
          if (error.response && error.response.data && error.response.data.error) {
            return of(getEmployeesListFailure(error.response.data.error)); // Extract error message from the response
          } else {
            return of(getEmployeesListFailure(error.message)); // If there is no custom error message, use the default one
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
          // console.log("asdasdasdasd" , data)
          // Save the token in a secure cookie with an expiration time of 1 hour
          // Cookies.set('token', data.jwt, { expires: 1 / 24, secure: true });
          // Cookies.set('user', JSON.stringify(data.user), { expires: 1 / 24, secure: true });
          // Cookies.set('employee_detail', JSON.stringify(data.employee_detail), { expires: 1 / 24, secure: true });
          // console.log(data, "AKOOO ANG Reynaaaaaa");
          return getSpecificEmployeeInfoSuccess(data);
        }),
        catchError((error) => {
          // console.log(error.response, "maeeeeee111owww");
          if (error.response && error.response.data && error.response.data.error) {
            return of(getSpecificEmployeeInfoFailure(error.response.data.error)); // Extract error message from the response
          } else {
            return of(getSpecificEmployeeInfoFailure(error.message)); // If there is no custom error message, use the default one
          }
        })
      )
    )
);