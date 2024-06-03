import { ofType } from 'redux-observable';
import { map, catchError, switchMap, mergeMap } from 'rxjs/operators';
import { of, from } from 'rxjs';
import axios, { AxiosProgressEvent } from 'axios';
import { 
  processPayroll,
    processPayrollFailure,
    processPayrollProgress,
    processPayrollSuccess,
    viewPayrollList,
    viewPayrollListFailure,
    viewPayrollListProgress,
    viewPayrollListSuccess,
    viewSpecificPayrollList,
    viewSpecificPayrollListFailure,
    viewSpecificPayrollListProgress,
    viewSpecificPayrollListSuccess,
} from '../actions/payroll';
import { Epic } from 'redux-observable';
import store, { APILink } from '../configureStore';
import { ProcessPayroll } from '@/types/types-pages';

const processPayrollApiCall = async (payload: ProcessPayroll): Promise<string> => {
  const response = await axios.post(`${APILink}create_payrolls/`,
  payload, 
  {
      onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if(progressEvent.total){
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          store.dispatch(processPayrollProgress(progress));
        }
      }
    }
  );
  return response.data;
};

const viewPayrollListApiCall = async () => {
    const response = await axios.get(`${APILink}payroll/`, 
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

const viewSpecificPayrollListApiCall = async (payload: {emp_no: number}) => {
  const response = await axios.get(`${APILink}payroll/${payload.emp_no}`, 
  {
      onDownloadProgress: (progressEvent) => {
        if(progressEvent.total){
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          store.dispatch(viewSpecificPayrollListProgress(progress));
        }
      }
    }
  );
  return response.data;
};

export const viewSpecificPayrollListEpic: Epic = (action$, state$) =>
action$.pipe(
  ofType(viewSpecificPayrollList.type),
  switchMap((action: ReturnType<typeof viewSpecificPayrollList>) =>
    from(
      viewSpecificPayrollListApiCall(action?.payload)
    ).pipe(
      map((data) => {
        return viewSpecificPayrollListSuccess(data);
      }),
      catchError((error) => {
        if (error.response && error.response.data && error.response.data.error) {
          return of(viewSpecificPayrollListFailure(error.response.data.error)); 
        } else {
          return of(viewSpecificPayrollListFailure(error.message)); 
        }
      })
    )
  )
);

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

export const processPayrollEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(processPayroll.type),
    switchMap((action: ReturnType<typeof processPayroll>) =>
      from(
        processPayrollApiCall(action?.payload)
      ).pipe(
        map((data) => {
          return processPayrollSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data['Error Message']) {
            return of(processPayrollFailure(error.response.data['Error Message'])); // Extract error message from the response
          } else {
            return of(processPayrollFailure(error.message)); // If there is no custom error message, use the default one
          }
        })
      )
    )
);