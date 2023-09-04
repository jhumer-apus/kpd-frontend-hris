import { ofType } from 'redux-observable';
import { map, catchError, switchMap, mergeMap } from 'rxjs/operators';
import { of, from } from 'rxjs';
import axios, { AxiosProgressEvent } from 'axios';
import { beautifyJSON } from '@/helpers/utils';
import {
    PHILHEALTHViewAction,
    PHILHEALTHViewActionSuccess,
    PHILHEALTHViewActionProgress,
    PHILHEALTHViewActionFailure,
    PHILHEALTHViewActionFailureCleanup,
    PHILHEALTHViewSpecificAction,
    PHILHEALTHViewSpecificActionSuccess,
    PHILHEALTHViewSpecificActionProgress,
    PHILHEALTHViewSpecificActionFailure,
    PHILHEALTHViewSpecificActionFailureCleanup,
    PHILHEALTHCreateAction,
    PHILHEALTHCreateActionSuccess,
    PHILHEALTHCreateActionProgress,
    PHILHEALTHCreateActionFailure,
    PHILHEALTHCreateActionFailureCleanup,
    PHILHEALTHEditAction,
    PHILHEALTHEditActionSuccess,
    PHILHEALTHEditActionProgress,
    PHILHEALTHEditActionFailure,
    PHILHEALTHEditActionFailureCleanup,
    SSSViewAction,
    SSSViewActionSuccess,
    SSSViewActionProgress,
    SSSViewActionFailure,
    SSSViewActionFailureCleanup,
    SSSViewSpecificAction,
    SSSViewSpecificActionSuccess,
    SSSViewSpecificActionProgress,
    SSSViewSpecificActionFailure,
    SSSViewSpecificActionFailureCleanup,
    SSSCreateAction,
    SSSCreateActionSuccess,
    SSSCreateActionProgress,
    SSSCreateActionFailure,
    SSSCreateActionFailureCleanup,
    SSSEditAction,
    SSSEditActionSuccess,
    SSSEditActionProgress,
    SSSEditActionFailure,
    SSSEditActionFailureCleanup,
    PAGIBIGViewAction,
    PAGIBIGViewActionSuccess,
    PAGIBIGViewActionProgress,
    PAGIBIGViewActionFailure,
    PAGIBIGViewActionFailureCleanup,
    PAGIBIGViewSpecificAction,
    PAGIBIGViewSpecificActionSuccess,
    PAGIBIGViewSpecificActionProgress,
    PAGIBIGViewSpecificActionFailure,
    PAGIBIGViewSpecificActionFailureCleanup,
    PAGIBIGCreateAction,
    PAGIBIGCreateActionSuccess,
    PAGIBIGCreateActionProgress,
    PAGIBIGCreateActionFailure,
    PAGIBIGCreateActionFailureCleanup,
    PAGIBIGEditAction,
    PAGIBIGEditActionSuccess,
    PAGIBIGEditActionProgress,
    PAGIBIGEditActionFailure,
    PAGIBIGEditActionFailureCleanup,
    TAXViewAction,
    TAXViewActionSuccess,
    TAXViewActionProgress,
    TAXViewActionFailure,
    TAXViewActionFailureCleanup,
    TAXViewSpecificAction,
    TAXViewSpecificActionSuccess,
    TAXViewSpecificActionProgress,
    TAXViewSpecificActionFailure,
    TAXViewSpecificActionFailureCleanup,
    TAXCreateAction,
    TAXCreateActionSuccess,
    TAXCreateActionProgress,
    TAXCreateActionFailure,
    TAXCreateActionFailureCleanup,
    TAXEditAction,
    TAXEditActionSuccess,
    TAXEditActionProgress,
    TAXEditActionFailure,
    TAXEditActionFailureCleanup,
} from '../actions/payroll-variables';
import { Epic } from 'redux-observable';
import store, { APILink } from '../configureStore';
import { 
    TAXCreateInterface,
    TAXEditInterface,
    TAXGenericInterface,
    TAXViewInterface,
    PAGIBIGCreateInterface,
    PAGIBIGEditInterface,
    PAGIBIGGenericInterface,
    PAGIBIGViewInterface,
    PHILHEALTHCreateInterface,
    PHILHEALTHEditInterface,
    PHILHEALTHGenericInterface,
    PHILHEALTHViewInterface,
    SSSCreateInterface,
    SSSEditInterface,
    SSSGenericInterface,
    SSSViewInterface,
} from '@/types/types-payroll-variables';


// TAX API SECTION // TAX API SECTION // TAX API SECTION // TAX API SECTION // TAX API SECTION
const TAXEditApiCall = async (payload: TAXEditInterface) => {
  const response = await axios.put(`${APILink}tax/${payload.emp_no}/`,
  payload,
  {
      onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if(progressEvent.total){
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          store.dispatch(TAXEditActionProgress(progress));
        }
      }
    }
  );
  return response.data;
};

const TAXCreateApiCall = async (payload: TAXCreateInterface) => {
  const response = await axios.post(`${APILink}tax/`,
  payload,
  {
      onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if(progressEvent.total){
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          store.dispatch(TAXCreateActionProgress(progress));
        }
      }
    }
  );
  return response.data;
};


const TAXViewSpecificApiCall = async (payload: {emp_no: number}) => {
  const response = await axios.get(`${APILink}tax/${payload.emp_no}/`,
  {
      onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if(progressEvent.total){
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          store.dispatch(TAXViewSpecificActionProgress(progress));
        }
      }
    }
  );
  return response.data;
};


const TAXViewApiCall = async () => {
  const response = await axios.get(`${APILink}tax/`,
  {
      onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if(progressEvent.total){
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          store.dispatch(TAXViewActionProgress(progress));
        }
      }
    }
  );
  return response.data;
};

export const TAXViewEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(TAXViewAction.type),
    switchMap(() =>
      from(
        TAXViewApiCall()
      ).pipe(
        map((data) => {
          return TAXViewActionSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data['Error Message']) {
            return of(TAXViewActionFailure(error.response.data['Error Message'])); // Extract error message from the response
          } else {
            return of(TAXViewActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
          }
        })
      )
    )
);

export const TAXViewSpecificEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(TAXViewSpecificAction.type),
    switchMap((action: ReturnType<typeof TAXViewSpecificAction>) =>
      from(
        TAXViewSpecificApiCall(action?.payload)
      ).pipe(
        map((data) => {
          return TAXViewSpecificActionSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data['Error Message']) {
            return of(TAXViewSpecificActionFailure(error.response.data['Error Message'])); // Extract error message from the response
          } else {
            return of(TAXViewSpecificActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
          }
        })
      )
    )
);


export const TAXCreateEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(TAXCreateAction.type),
    switchMap((action: ReturnType<typeof TAXCreateAction>) =>
      from(
        TAXCreateApiCall(action?.payload)
      ).pipe(
        map((data) => {
          return TAXCreateActionSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data) {
            return of(TAXCreateActionFailure(`${beautifyJSON(error.response.data)}`)); // Extract error message from the response
          } else {
            return of(TAXCreateActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
          }
        })
      )
    )
);

export const TAXEditEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(TAXEditAction.type),
    switchMap((action: ReturnType<typeof TAXEditAction>) =>
      from(
        TAXEditApiCall(action?.payload)
      ).pipe(
        map((data) => {
          return TAXEditActionSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data['Error Message']) {
            return of(TAXEditActionFailure(error.response.data['Error Message'])); // Extract error message from the response
          } else {
            return of(TAXEditActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
          }
        })
      )
    )
);


// PAGIBIG API SECTION // PAGIBIG API SECTION // PAGIBIG API SECTION // PAGIBIG API SECTION // PAGIBIG API SECTION
const PAGIBIGEditApiCall = async (payload: PAGIBIGEditInterface) => {
    const response = await axios.put(`${APILink}pagibig/${payload.emp_no}/`,
    payload,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
          if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(PAGIBIGEditActionProgress(progress));
          }
        }
      }
    );
    return response.data;
  };
  
  const PAGIBIGCreateApiCall = async (payload: PAGIBIGCreateInterface) => {
    const response = await axios.post(`${APILink}pagibig/`,
    payload,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
          if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(PAGIBIGCreateActionProgress(progress));
          }
        }
      }
    );
    return response.data;
  };
  
  
  const PAGIBIGViewSpecificApiCall = async (payload: {emp_no: number}) => {
    const response = await axios.get(`${APILink}pagibig/${payload.emp_no}/`,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
          if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(PAGIBIGViewSpecificActionProgress(progress));
          }
        }
      }
    );
    return response.data;
  };
  
  
  const PAGIBIGViewApiCall = async () => {
    const response = await axios.get(`${APILink}pagibig/`,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
          if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(PAGIBIGViewActionProgress(progress));
          }
        }
      }
    );
    return response.data;
  };
  
  export const PAGIBIGViewEpic: Epic = (action$, state$) =>
    action$.pipe(
      ofType(PAGIBIGViewAction.type),
      switchMap(() =>
        from(
          PAGIBIGViewApiCall()
        ).pipe(
          map((data) => {
            return PAGIBIGViewActionSuccess(data);
          }),
          catchError((error) => {
            if (error.response && error.response.data && error.response.data['Error Message']) {
              return of(PAGIBIGViewActionFailure(error.response.data['Error Message'])); // Extract error message from the response
            } else {
              return of(PAGIBIGViewActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
          })
        )
      )
  );
  
  export const PAGIBIGViewSpecificEpic: Epic = (action$, state$) =>
    action$.pipe(
      ofType(PAGIBIGViewSpecificAction.type),
      switchMap((action: ReturnType<typeof PAGIBIGViewSpecificAction>) =>
        from(
          PAGIBIGViewSpecificApiCall(action?.payload)
        ).pipe(
          map((data) => {
            return PAGIBIGViewSpecificActionSuccess(data);
          }),
          catchError((error) => {
            if (error.response && error.response.data && error.response.data['Error Message']) {
              return of(PAGIBIGViewSpecificActionFailure(error.response.data['Error Message'])); // Extract error message from the response
            } else {
              return of(PAGIBIGViewSpecificActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
          })
        )
      )
  );
  
  
  export const PAGIBIGCreateEpic: Epic = (action$, state$) =>
    action$.pipe(
      ofType(PAGIBIGCreateAction.type),
      switchMap((action: ReturnType<typeof PAGIBIGCreateAction>) =>
        from(
          PAGIBIGCreateApiCall(action?.payload)
        ).pipe(
          map((data) => {
            return PAGIBIGCreateActionSuccess(data);
          }),
          catchError((error) => {
            if (error.response && error.response.data && error.response.data) {
              return of(PAGIBIGCreateActionFailure(`${beautifyJSON(error.response.data)}`)); // Extract error message from the response
            } else {
              return of(PAGIBIGCreateActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
          })
        )
      )
  );
  
  export const PAGIBIGEditEpic: Epic = (action$, state$) =>
    action$.pipe(
      ofType(PAGIBIGEditAction.type),
      switchMap((action: ReturnType<typeof PAGIBIGEditAction>) =>
        from(
          PAGIBIGEditApiCall(action?.payload)
        ).pipe(
          map((data) => {
            return PAGIBIGEditActionSuccess(data);
          }),
          catchError((error) => {
            if (error.response && error.response.data && error.response.data['Error Message']) {
              return of(PAGIBIGEditActionFailure(error.response.data['Error Message'])); // Extract error message from the response
            } else {
              return of(PAGIBIGEditActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
          })
        )
      )
  );
  
  
// SSS API SECTION // SSS API SECTION // SSS API SECTION // SSS API SECTION // SSS API SECTION
const SSSEditApiCall = async (payload: SSSEditInterface) => {
    const response = await axios.put(`${APILink}sss/${payload.emp_no}/`,
    payload,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
          if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(SSSEditActionProgress(progress));
          }
        }
      }
    );
    return response.data;
  };
  
  const SSSCreateApiCall = async (payload: SSSCreateInterface) => {
    const response = await axios.post(`${APILink}sss/`,
    payload,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
          if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(SSSCreateActionProgress(progress));
          }
        }
      }
    );
    return response.data;
  };
  
  
  const SSSViewSpecificApiCall = async (payload: {emp_no: number}) => {
    const response = await axios.get(`${APILink}sss/${payload.emp_no}/`,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
          if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(SSSViewSpecificActionProgress(progress));
          }
        }
      }
    );
    return response.data;
  };
  
  
  const SSSViewApiCall = async () => {
    const response = await axios.get(`${APILink}sss/`,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
          if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(SSSViewActionProgress(progress));
          }
        }
      }
    );
    return response.data;
  };
  
  export const SSSViewEpic: Epic = (action$, state$) =>
    action$.pipe(
      ofType(SSSViewAction.type),
      switchMap(() =>
        from(
          SSSViewApiCall()
        ).pipe(
          map((data) => {
            return SSSViewActionSuccess(data);
          }),
          catchError((error) => {
            if (error.response && error.response.data && error.response.data['Error Message']) {
              return of(SSSViewActionFailure(error.response.data['Error Message'])); // Extract error message from the response
            } else {
              return of(SSSViewActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
          })
        )
      )
  );
  
  export const SSSViewSpecificEpic: Epic = (action$, state$) =>
    action$.pipe(
      ofType(SSSViewSpecificAction.type),
      switchMap((action: ReturnType<typeof SSSViewSpecificAction>) =>
        from(
          SSSViewSpecificApiCall(action?.payload)
        ).pipe(
          map((data) => {
            return SSSViewSpecificActionSuccess(data);
          }),
          catchError((error) => {
            if (error.response && error.response.data && error.response.data['Error Message']) {
              return of(SSSViewSpecificActionFailure(error.response.data['Error Message'])); // Extract error message from the response
            } else {
              return of(SSSViewSpecificActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
          })
        )
      )
  );
  
  
  export const SSSCreateEpic: Epic = (action$, state$) =>
    action$.pipe(
      ofType(SSSCreateAction.type),
      switchMap((action: ReturnType<typeof SSSCreateAction>) =>
        from(
          SSSCreateApiCall(action?.payload)
        ).pipe(
          map((data) => {
            return SSSCreateActionSuccess(data);
          }),
          catchError((error) => {
            if (error.response && error.response.data && error.response.data) {
              return of(SSSCreateActionFailure(`${beautifyJSON(error.response.data)}`)); // Extract error message from the response
            } else {
              return of(SSSCreateActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
          })
        )
      )
  );
  
  export const SSSEditEpic: Epic = (action$, state$) =>
    action$.pipe(
      ofType(SSSEditAction.type),
      switchMap((action: ReturnType<typeof SSSEditAction>) =>
        from(
          SSSEditApiCall(action?.payload)
        ).pipe(
          map((data) => {
            return SSSEditActionSuccess(data);
          }),
          catchError((error) => {
            if (error.response && error.response.data && error.response.data['Error Message']) {
              return of(SSSEditActionFailure(error.response.data['Error Message'])); // Extract error message from the response
            } else {
              return of(SSSEditActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
          })
        )
      )
  );
  
  
// PHILHEALTH API SECTION // PHILHEALTH API SECTION // PHILHEALTH API SECTION // PHILHEALTH API SECTION // PHILHEALTH API SECTION
const PHILHEALTHEditApiCall = async (payload: PHILHEALTHEditInterface) => {
    const response = await axios.put(`${APILink}sss/${payload.emp_no}/`,
    payload,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
          if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(PHILHEALTHEditActionProgress(progress));
          }
        }
      }
    );
    return response.data;
  };
  
  const PHILHEALTHCreateApiCall = async (payload: PHILHEALTHCreateInterface) => {
    const response = await axios.post(`${APILink}sss/`,
    payload,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
          if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(PHILHEALTHCreateActionProgress(progress));
          }
        }
      }
    );
    return response.data;
  };
  
  
  const PHILHEALTHViewSpecificApiCall = async (payload: {emp_no: number}) => {
    const response = await axios.get(`${APILink}sss/${payload.emp_no}/`,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
          if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(PHILHEALTHViewSpecificActionProgress(progress));
          }
        }
      }
    );
    return response.data;
  };
  
  
  const PHILHEALTHViewApiCall = async () => {
    const response = await axios.get(`${APILink}sss/`,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
          if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(PHILHEALTHViewActionProgress(progress));
          }
        }
      }
    );
    return response.data;
  };
  
  export const PHILHEALTHViewEpic: Epic = (action$, state$) =>
    action$.pipe(
      ofType(PHILHEALTHViewAction.type),
      switchMap(() =>
        from(
          PHILHEALTHViewApiCall()
        ).pipe(
          map((data) => {
            return PHILHEALTHViewActionSuccess(data);
          }),
          catchError((error) => {
            if (error.response && error.response.data && error.response.data['Error Message']) {
              return of(PHILHEALTHViewActionFailure(error.response.data['Error Message'])); // Extract error message from the response
            } else {
              return of(PHILHEALTHViewActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
          })
        )
      )
  );
  
  export const PHILHEALTHViewSpecificEpic: Epic = (action$, state$) =>
    action$.pipe(
      ofType(PHILHEALTHViewSpecificAction.type),
      switchMap((action: ReturnType<typeof PHILHEALTHViewSpecificAction>) =>
        from(
          PHILHEALTHViewSpecificApiCall(action?.payload)
        ).pipe(
          map((data) => {
            return PHILHEALTHViewSpecificActionSuccess(data);
          }),
          catchError((error) => {
            if (error.response && error.response.data && error.response.data['Error Message']) {
              return of(PHILHEALTHViewSpecificActionFailure(error.response.data['Error Message'])); // Extract error message from the response
            } else {
              return of(PHILHEALTHViewSpecificActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
          })
        )
      )
  );
  
  
  export const PHILHEALTHCreateEpic: Epic = (action$, state$) =>
    action$.pipe(
      ofType(PHILHEALTHCreateAction.type),
      switchMap((action: ReturnType<typeof PHILHEALTHCreateAction>) =>
        from(
          PHILHEALTHCreateApiCall(action?.payload)
        ).pipe(
          map((data) => {
            return PHILHEALTHCreateActionSuccess(data);
          }),
          catchError((error) => {
            if (error.response && error.response.data && error.response.data) {
              return of(PHILHEALTHCreateActionFailure(`${beautifyJSON(error.response.data)}`)); // Extract error message from the response
            } else {
              return of(PHILHEALTHCreateActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
          })
        )
      )
  );
  
  export const PHILHEALTHEditEpic: Epic = (action$, state$) =>
    action$.pipe(
      ofType(PHILHEALTHEditAction.type),
      switchMap((action: ReturnType<typeof PHILHEALTHEditAction>) =>
        from(
          PHILHEALTHEditApiCall(action?.payload)
        ).pipe(
          map((data) => {
            return PHILHEALTHEditActionSuccess(data);
          }),
          catchError((error) => {
            if (error.response && error.response.data && error.response.data['Error Message']) {
              return of(PHILHEALTHEditActionFailure(error.response.data['Error Message'])); // Extract error message from the response
            } else {
              return of(PHILHEALTHEditActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
          })
        )
      )
  );
  
  
  





