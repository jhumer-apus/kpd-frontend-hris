import { ofType } from 'redux-observable';
import { map, catchError, switchMap, mergeMap } from 'rxjs/operators';
import { of, from } from 'rxjs';
import axios from 'axios';
import Cookies from 'js-cookie'
import { userLogin, userLoginSuccess, userLoginFailure } from '../actions/auth';
// import { RootState } from '../reducers/index';
import { Epic } from 'redux-observable';

const loginApiCall = async (username: string, password: string, twoFactorToken?: string) => {

    // const response = await axios.post("https://bitverse-api.herokuapp.com/login", {
    // const response = await axios.post("http://172.16.168.144:8888/login", {
    const response = await axios.post("http://172.16.168.155:8000/api/login/", {
    username,
    password,
    ...(twoFactorToken ? { twoFactorToken } : {}),
  });
  // console.log(response, "aaa");
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
          Cookies.set('employee_details', JSON.stringify(data.employee_details), { expires: 1 / 24, secure: true });
          // console.log(data, "hallo", userLoginSuccess(data.jwt, data.user, data.employee_details))
          return userLoginSuccess(data.jwt, data.user, data.employee_details);
        }),
        catchError((error) => {
          // console.log(error.response, "maeeeeee111owww");
          if (error.response && error.response.data && error.response.data.error) {
            return of(userLoginFailure(error.response.data.error)); // Extract error message from the response
          } else {
            return of(userLoginFailure(error.message)); // If there is no custom error message, use the default one
          }
        })
      )
    )
);