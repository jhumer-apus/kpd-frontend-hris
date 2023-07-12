import { ofType } from 'redux-observable';
import { map, catchError, switchMap, mergeMap } from 'rxjs/operators';
import { of, from } from 'rxjs';
import axios, { AxiosProgressEvent } from 'axios';
import { 
  processPayroll,
    processPayrollFailure,
    processPayrollProgress,
    processPayrollSuccess,
} from '../actions/payroll';
import {
    HolidaysGet,
    HolidaysGetFailure,
    HolidaysGetFailureCleanup,
    HolidaysGetProgress,
    HolidaysGetSuccess,
    HolidayCreate,
    HolidayCreateProgress,
    HolidayCreateSuccess,
    HolidayCreateFailure,
    HolidayCreateFailureCleanup,
    HolidayEditSubmit,
    HolidayEditSubmitFailure,
    HolidayEditSubmitFailureCleanup,
    HolidayEditSubmitProgress,
    HolidayEditSubmitSuccess
} from '../actions/procedurals';
import { Epic } from 'redux-observable';
import store from '../configureStore';
import { HolidayGetType } from '@/types/types-pages';


const HolidayEditSubmitApiCall = async (payload: HolidayGetType): Promise<HolidayGetType> => {
    console.log(payload, "pumasok?11111")
    const response = await axios.put(`http://172.16.168.155:8000/api/holiday/${payload.id}/`,
    payload, 
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
          if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(HolidayEditSubmitProgress(progress));
          }
        }
      }
    );
    return response.data;
};

const HolidayCreateApiCall = async (payload: HolidayGetType): Promise<HolidayGetType> => {
  console.log(payload, "pumasok?11111")
  const response = await axios.post("http://172.16.168.155:8000/api/holiday/",
  payload, 
  {
      onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if(progressEvent.total){
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          store.dispatch(HolidayCreateProgress(progress));
        }
      }
    }
  );
  return response.data;
};

const HolidaysGetApiCall = async () => {
    const response = await axios.get("http://172.16.168.155:8000/api/holiday/", 
    {
        onDownloadProgress: (progressEvent) => {
          if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(HolidaysGetProgress(progress));
          }
        }
      }
    );
    return response.data;
};

export const HolidaysGetEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(HolidaysGet.type),
    switchMap(() =>
      from(
        HolidaysGetApiCall()
      ).pipe(
        map((data) => {
          return HolidaysGetSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data.error) {
            return of(HolidaysGetFailure(error.response.data.error)); 
          } else {
            return of(HolidaysGetFailure(error.message)); 
          }
        })
      )
    )
);

export const HolidayCreateEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(HolidayCreate.type),
    switchMap((action: ReturnType<typeof HolidayCreate>) =>
      from(
        HolidayCreateApiCall(action?.payload)
      ).pipe(
        map((data) => {
          return HolidayCreateSuccess(data);
        }),
        catchError((error) => {
          // console.log(error, "123092138")
          // console.log(error.response, "maeeeeee111owww");
          if (error.response && error.response.data && error.response.data['Error Message']) {
            return of(HolidayCreateFailure(error.response.data['Error Message'])); // Extract error message from the response
          } else {
            return of(HolidayCreateFailure(error.message)); // If there is no custom error message, use the default one
          }
        })
      )
    )
);

export const HolidayEditSubmitEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(HolidayEditSubmit.type),
    switchMap((action: ReturnType<typeof HolidayEditSubmit>) =>
      from(
        HolidayEditSubmitApiCall(action?.payload)
      ).pipe(
        map((data) => {
          return HolidayEditSubmitSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data['Error Message']) {
            return of(HolidayEditSubmitFailure(error.response.data['Error Message'])); // Extract error message from the response
          } else {
            return of(HolidayEditSubmitFailure(error.message)); // If there is no custom error message, use the default one
          }
        })
      )
    )
);