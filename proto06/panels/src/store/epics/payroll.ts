import { ofType } from 'redux-observable';
import { map, catchError, switchMap, mergeMap } from 'rxjs/operators';
import { of, from } from 'rxjs';
import axios from 'axios';
import { 
    viewPayrollList,
    viewPayrollListFailure,
    viewPayrollListProgress,
    viewPayrollListSuccess
} from '../actions/payroll';
import { Epic } from 'redux-observable';
import store from '../configureStore';

const viewPayrollListApiCall = async () => {
    const response = await axios.get("http://172.16.168.155:8000/api/payroll", 
    {
        onDownloadProgress: (progressEvent) => {
          if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(viewPayrollListProgress(progress));
          }
        }
      }
    );
    return response.data;
};

export const viewPayrollListEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(viewPayrollList.type),
    switchMap(() =>
      from(
        viewPayrollListApiCall()
      ).pipe(
        map((data) => {
          return viewPayrollListSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data.error) {
            return of(viewPayrollListFailure(error.response.data.error)); 
          } else {
            return of(viewPayrollListFailure(error.message)); 
          }
        })
      )
    )
);
