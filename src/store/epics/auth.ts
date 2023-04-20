import { ofType } from 'redux-observable';
import { map, catchError, switchMap, mergeMap } from 'rxjs/operators';
import { of, from } from 'rxjs';
import axios from 'axios';
import Cookies from 'js-cookie'
import { userLogin, userLoginSuccess, userLoginFailure } from '../actions/auth';
// import { RootState } from '../reducers/index';
import { Epic } from 'redux-observable';

const loginApiCall = async (email: string, password: string, twoFactorToken?: string) => {

  const response = await axios.post("https://bitverse-api.herokuapp.com/login", {
    // const response = await axios.post("http://172.16.168.144:8888/login", {
    email,
    password,
    ...(twoFactorToken ? { twoFactorToken } : {}),
  });
  console.log(response, "aaa")
  return response.data;
};

// export const authEpic: Epic = (action$, state$) =>
//   action$.pipe(
//     ofType(userLogin.type),
//     switchMap((action: ReturnType<typeof userLogin>) =>
//       loginApiCall(action.payload.email, action.payload.password, action.payload.twoFactorToken).then(
//         (data) => userLoginSuccess(data.token),
//         // (error) => userLoginFailure(`${error.message}aaaa`)
//       ).catch((error) => {
//         console.log(error.response, "aa", error, "aawoooo");
//         if (error.response && error.response.data && error.response.data.error) {
//           return of(userLoginFailure(error.response.data.error)); // Extract error message from the response
//         } else {
//           return of(userLoginFailure(error.message)); // If there is no custom error message, use the default one
//         }
//       })
//     ),
//     mergeMap((action)=> of(action))
//   );


export const authEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(userLogin.type),
    switchMap((action: ReturnType<typeof userLogin>) =>
      from(
        loginApiCall(action.payload.email, action.payload.password, action.payload.twoFactorToken)
      ).pipe(
        map((data) => {
          // Save the token in a secure cookie with an expiration time of 1 hour
          Cookies.set('token', data.token, { expires: 1 / 24, secure: true });
          return userLoginSuccess(data.token);
        }),
        catchError((error) => {
          console.log(error.response);
          if (error.response && error.response.data && error.response.data.error) {
            return of(userLoginFailure(error.response.data.error)); // Extract error message from the response
          } else {
            return of(userLoginFailure(error.message)); // If there is no custom error message, use the default one
          }
        })
      )
    )
  );