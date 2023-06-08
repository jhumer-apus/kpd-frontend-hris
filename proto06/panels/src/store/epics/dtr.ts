import { ofType } from 'redux-observable';
import { map, catchError, switchMap, mergeMap } from 'rxjs/operators';
import { of, from } from 'rxjs';
import axios from 'axios';
import Cookies from 'js-cookie'
import { 
  viewAllDtrLogs, 
  viewAllDtrLogsSuccess, 
  viewAllDtrLogsFailure,
  viewMergedDtrLogs,
  viewMergedDtrLogsSuccess,
  viewMergedDtrLogsFailure,
  viewCutoffDtrSummary,
  viewCutoffDtrSummarySuccess,
  viewCutoffDtrSummaryFailure 
} from '../actions/dtr';

import { Epic } from 'redux-observable';

const viewAllDtrLogsApiCall = async () => {
    const response = await axios.get("http://172.16.168.155:8000/api/dtr");
    return response.data;
};

const viewMergedDtrLogsApiCall = async () => {
    const response = await axios.get("http://172.16.168.155:8000/api/dtr_summary/");
    return response.data;
};

const viewCutoffDtrSummaryApiCall = async () => {
    const response = await axios.get("http://172.16.168.155:8000/api/dtr_cutoff_summary/");
    return response.data;
};

export const viewAllDtrLogsEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(viewAllDtrLogs.type),
    switchMap(() =>
      from(
        viewAllDtrLogsApiCall()
      ).pipe(
        map((data) => {
          // console.log("asdasdasdasd")
          // Save the token in a secure cookie with an expiration time of 1 hour
          // Cookies.set('token', data.jwt, { expires: 1 / 24, secure: true });
          // Cookies.set('user', JSON.stringify(data.user), { expires: 1 / 24, secure: true });
          // Cookies.set('employee_detail', JSON.stringify(data.employee_detail), { expires: 1 / 24, secure: true });
          console.log(data, "viewAllDtrLogsSuccess");
          return viewAllDtrLogsSuccess(data);
        }),
        catchError((error) => {
          // console.log(error.response, "maeeeeee111owww");
          if (error.response && error.response.data && error.response.data.error) {
            return of(viewAllDtrLogsFailure(error.response.data.error)); // Extract error message from the response
          } else {
            return of(viewAllDtrLogsFailure(error.message)); // If there is no custom error message, use the default one
          }
        })
      )
    )
);

export const viewMergedDtrLogsEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(viewMergedDtrLogs.type),
    switchMap(() =>
      from(
        viewMergedDtrLogsApiCall()
      ).pipe(
        map((data) => {
          return viewMergedDtrLogsSuccess(data);
        }),
        catchError((error) => {
          // console.log(error.response, "maeeeeee111owww");
          if (error.response && error.response.data && error.response.data.error) {
            return of(viewMergedDtrLogsFailure(error.response.data.error)); // Extract error message from the response
          } else {
            return of(viewMergedDtrLogsFailure(error.message)); // If there is no custom error message, use the default one
          }
        })
      )
    )
);


export const viewCutoffDtrSummaryEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(viewCutoffDtrSummary.type),
    switchMap(() =>
      from(
        viewCutoffDtrSummaryApiCall()
      ).pipe(
        map((data) => {
          return viewCutoffDtrSummarySuccess(data);
        }),
        catchError((error) => {
          // console.log(error.response, "maeeeeee111owww");
          if (error.response && error.response.data && error.response.data.error) {
            return of(viewCutoffDtrSummaryFailure(error.response.data.error)); // Extract error message from the response
          } else {
            return of(viewCutoffDtrSummaryFailure(error.message)); // If there is no custom error message, use the default one
          }
        })
      )
    )
);