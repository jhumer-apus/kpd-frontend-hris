import { ofType } from 'redux-observable';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import axios from 'axios';
import { userLogin, userLoginSuccess, userLoginFailure } from '../actions/auth';
import { RootState } from '../reducers/index';
import { Epic } from 'redux-observable';

const loginApiCall = async (email: string, password: string, twoFactorToken?: string) => {
  const response = await axios.post("https://bitverse-api.herokuapp.com/login", {
    email,
    password,
    ...(twoFactorToken ? { twoFactorToken } : {}),
  });
  return response.data;
};

export const authEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(userLogin.type),
    switchMap((action: ReturnType<typeof userLogin>) =>
      loginApiCall(action.payload.email, action.payload.password, action.payload.twoFactorToken).then(
        (data) => userLoginSuccess(data.token),
        (error) => userLoginFailure(error.message)
      ).catch((error) => of(userLoginFailure(error.message)))
    )
  );