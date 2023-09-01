import { ofType } from 'redux-observable';
import { map, catchError, switchMap, mergeMap } from 'rxjs/operators';
import { of, from } from 'rxjs';
import axios, { AxiosProgressEvent } from 'axios';
import { beautifyJSON } from '@/helpers/utils';
import {
 USERCreateAction,
 USERCreateActionFailure,
 USERCreateActionFailureCleanup,
 USERCreateActionProgress,
 USERCreateActionSuccess,
 USEREditAction,
 USEREditActionFailure,
 USEREditActionFailureCleanup,
 USEREditActionProgress,
 USEREditActionSuccess,
 USERResetPasswordAction,
 USERResetPasswordActionFailure,
 USERResetPasswordActionFailureCleanup,
 USERResetPasswordActionProgress,
 USERResetPasswordActionSuccess,
 USERViewAction,
 USERViewActionFailure,
 USERViewActionFailureCleanup,
 USERViewActionProgress,
 USERViewActionSuccess,
 USERViewSpecificAction,
 USERViewSpecificActionFailure,
 USERViewSpecificActionFailureCleanup,
 USERViewSpecificActionProgress,
 USERViewSpecificActionSuccess,
} from '../actions/users';
import { Epic } from 'redux-observable';
import store, { APILink } from '../configureStore';
import { 
    USERCreateInterface,
    USEREditInterface,
    USERGenericInterface,
    USERResetPasswordInterface,
    USERViewInterface,
} from '@/types/types-pages';


// USER API SECTION // USER API SECTION // USER API SECTION // USER API SECTION // USER API SECTION
const USERResetPasswordApiCall = async (payload: USERResetPasswordInterface) => {
    const response = await axios.post(`${APILink}reset-password/${payload.id}/`,
    payload,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
          if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(USERResetPasswordActionProgress(progress));
          }
        }
      }
    );
    return response.data;
};




const USEREditApiCall = async (payload: USEREditInterface) => {
  const response = await axios.put(`${APILink}user/${payload.id}/`,
  payload,
  {
      onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if(progressEvent.total){
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          store.dispatch(USEREditActionProgress(progress));
        }
      }
    }
  );
  return response.data;
};

const USERCreateApiCall = async (payload: USERCreateInterface) => {
  const response = await axios.post(`${APILink}user/`,
  payload,
  {
      onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if(progressEvent.total){
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          store.dispatch(USERCreateActionProgress(progress));
        }
      }
    }
  );
  return response.data;
};


const USERViewSpecificApiCall = async (payload: {user_id: number}) => {
  const response = await axios.get(`${APILink}user/${payload.user_id}/`,
  {
      onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if(progressEvent.total){
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          store.dispatch(USERViewSpecificActionProgress(progress));
        }
      }
    }
  );
  return response.data;
};


const USERViewApiCall = async () => {
  const response = await axios.get(`${APILink}user/`,
  {
      onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if(progressEvent.total){
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          store.dispatch(USERViewActionProgress(progress));
        }
      }
    }
  );
  return response.data;
};

export const USERViewEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(USERViewAction.type),
    switchMap(() =>
      from(
        USERViewApiCall()
      ).pipe(
        map((data) => {
          return USERViewActionSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data['Error Message']) {
            return of(USERViewActionFailure(error.response.data['Error Message'])); // Extract error message from the response
          } else {
            return of(USERViewActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
          }
        })
      )
    )
);

export const USERViewSpecificEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(USERViewSpecificAction.type),
    switchMap((action: ReturnType<typeof USERViewSpecificAction>) =>
      from(
        USERViewSpecificApiCall(action?.payload)
      ).pipe(
        map((data) => {
          return USERViewSpecificActionSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data['Error Message']) {
            return of(USERViewSpecificActionFailure(error.response.data['Error Message'])); // Extract error message from the response
          } else {
            return of(USERViewSpecificActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
          }
        })
      )
    )
);


export const USERCreateEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(USERCreateAction.type),
    switchMap((action: ReturnType<typeof USERCreateAction>) =>
      from(
        USERCreateApiCall(action?.payload)
      ).pipe(
        map((data) => {
          return USERCreateActionSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data) {
            return of(USERCreateActionFailure(`${beautifyJSON(error.response.data)}`)); // Extract error message from the response
          } else {
            return of(USERCreateActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
          }
        })
      )
    )
);

export const USEREditEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(USEREditAction.type),
    switchMap((action: ReturnType<typeof USEREditAction>) =>
      from(
        USEREditApiCall(action?.payload)
      ).pipe(
        map((data) => {
          return USEREditActionSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data['Error Message']) {
            return of(USEREditActionFailure(error.response.data['Error Message'])); // Extract error message from the response
          } else {
            return of(USEREditActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
          }
        })
      )
    )
);



export const USERResetPasswordEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(USERResetPasswordAction.type),
    switchMap((action: ReturnType<typeof USERResetPasswordAction>) =>
      from(
        USERResetPasswordApiCall(action?.payload)
      ).pipe(
        map((data) => {
          return USERResetPasswordActionSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data['Error Message']) {
            return of(USERResetPasswordActionFailure(error.response.data['Error Message'])); // Extract error message from the response
          } else {
            return of(USERResetPasswordActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
          }
        })
      )
    )
);


