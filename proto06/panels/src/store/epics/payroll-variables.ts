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
    CASHADVANCECreateAction,
    CASHADVANCECreateActionFailure,
    CASHADVANCECreateActionFailureCleanup,
    CASHADVANCECreateActionProgress,
    CASHADVANCECreateActionSuccess,
    CASHADVANCEEditAction,
    CASHADVANCEEditActionFailure,
    CASHADVANCEEditActionFailureCleanup,
    CASHADVANCEEditActionProgress,
    CASHADVANCEEditActionSuccess,
    CASHADVANCEViewAction,
    CASHADVANCEViewActionFailure,
    CASHADVANCEViewActionFailureCleanup,
    CASHADVANCEViewActionProgress,
    CASHADVANCEViewActionSuccess,
    CASHADVANCEViewSpecificAction,
    CASHADVANCEViewSpecificActionFailure,
    CASHADVANCEViewSpecificActionFailureCleanup,
    CASHADVANCEViewSpecificActionProgress,
    CASHADVANCEViewSpecificActionSuccess,
    CASHADVANCEViewSpecificEmployeeAction,
    CASHADVANCEViewSpecificEmployeeActionFailure,
    CASHADVANCEViewSpecificEmployeeActionFailureCleanup,
    CASHADVANCEViewSpecificEmployeeActionProgress,
    CASHADVANCEViewSpecificEmployeeActionSuccess,
    ALLOWANCEENTRYCreateAction,
    ALLOWANCEENTRYCreateActionFailure,
    ALLOWANCEENTRYCreateActionFailureCleanup,
    ALLOWANCEENTRYCreateActionProgress,
    ALLOWANCEENTRYCreateActionSuccess,
    ALLOWANCEENTRYEditAction,
    ALLOWANCEENTRYEditActionFailure,
    ALLOWANCEENTRYEditActionFailureCleanup,
    ALLOWANCEENTRYEditActionProgress,
    ALLOWANCEENTRYEditActionSuccess,
    ALLOWANCEENTRYViewAction,
    ALLOWANCEENTRYViewActionFailure,
    ALLOWANCEENTRYViewActionFailureCleanup,
    ALLOWANCEENTRYViewActionProgress,
    ALLOWANCEENTRYViewActionSuccess,
    ALLOWANCEENTRYViewSpecificAction,
    ALLOWANCEENTRYViewSpecificActionFailure,
    ALLOWANCEENTRYViewSpecificActionFailureCleanup,
    ALLOWANCEENTRYViewSpecificActionProgress,
    ALLOWANCEENTRYViewSpecificActionSuccess,
    ALLOWANCETYPECreateAction,
    ALLOWANCETYPECreateActionFailure,
    ALLOWANCETYPECreateActionFailureCleanup,
    ALLOWANCETYPECreateActionProgress,
    ALLOWANCETYPECreateActionSuccess,
    ALLOWANCETYPEEditAction,
    ALLOWANCETYPEEditActionFailure,
    ALLOWANCETYPEEditActionFailureCleanup,
    ALLOWANCETYPEEditActionProgress,
    ALLOWANCETYPEEditActionSuccess,
    ALLOWANCETYPEViewAction,
    ALLOWANCETYPEViewActionFailure,
    ALLOWANCETYPEViewActionFailureCleanup,
    ALLOWANCETYPEViewActionProgress,
    ALLOWANCETYPEViewActionSuccess,
    ALLOWANCETYPEViewSpecificAction,
    ALLOWANCETYPEViewSpecificActionFailure,
    ALLOWANCETYPEViewSpecificActionFailureCleanup,
    ALLOWANCETYPEViewSpecificActionProgress,
    ALLOWANCETYPEViewSpecificActionSuccess,
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
    CASHADVANCECreateInterface,
    CASHADVANCEEditInterface,
    CASHADVANCEGenericInterface,
    CASHADVANCEViewInterface,
    ALLOWANCEENTRYCreateInterface,
    ALLOWANCEENTRYEditInterface,
    ALLOWANCEENTRYGenericInterface,
    ALLOWANCEENTRYViewInterface,
    ALLOWANCETYPECreateInterface,
    ALLOWANCETYPEEditInterface,
    ALLOWANCETYPEGenericInterface,
    ALLOWANCETYPEViewInterface,
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
    const response = await axios.put(`${APILink}philhealth/${payload.emp_no}/`,
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
    const response = await axios.post(`${APILink}philhealth/`,
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
    const response = await axios.get(`${APILink}philhealth/${payload.emp_no}/`,
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
    const response = await axios.get(`${APILink}philhealth/`,
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
  
  
  





// =====================================================


// CASHADVANCE API SECTION // CASHADVANCE API SECTION // CASHADVANCE API SECTION // CASHADVANCE API SECTION // CASHADVANCE API SECTION
const CASHADVANCEEditApiCall = async (payload: CASHADVANCEEditInterface) => {
  const response = await axios.put(`${APILink}ca/${payload.emp_no}/`,
  payload,
  {
      onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if(progressEvent.total){
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          store.dispatch(CASHADVANCEEditActionProgress(progress));
        }
      }
    }
  );
  return response.data;
};

const CASHADVANCECreateApiCall = async (payload: CASHADVANCECreateInterface) => {
  const response = await axios.post(`${APILink}ca/`,
  payload,
  {
      onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if(progressEvent.total){
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          store.dispatch(CASHADVANCECreateActionProgress(progress));
        }
      }
    }
  );
  return response.data;
};

const CASHADVANCEViewSpecificEmployeeApiCall = async (payload: {emp_no: number}) => {
  const response = await axios.get(`${APILink}ca/${payload.emp_no}/`,
  {
      onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if(progressEvent.total){
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          store.dispatch(CASHADVANCEViewSpecificEmployeeActionProgress(progress));
        }
      }
    }
  );
  return response.data;
};



const CASHADVANCEViewSpecificApiCall = async (payload: {emp_no: number, ca_no: number}) => {
  const response = await axios.get(`${APILink}ca/${payload.emp_no}/${payload.ca_no}`,
  {
      onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if(progressEvent.total){
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          store.dispatch(CASHADVANCEViewSpecificActionProgress(progress));
        }
      }
    }
  );
  return response.data;
};


const CASHADVANCEViewApiCall = async () => {
  const response = await axios.get(`${APILink}ca/`,
  {
      onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if(progressEvent.total){
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          store.dispatch(CASHADVANCEViewActionProgress(progress));
        }
      }
    }
  );
  return response.data;
};

export const CASHADVANCEViewEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(CASHADVANCEViewAction.type),
    switchMap(() =>
      from(
        CASHADVANCEViewApiCall()
      ).pipe(
        map((data) => {
          return CASHADVANCEViewActionSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data['Error Message']) {
            return of(CASHADVANCEViewActionFailure(error.response.data['Error Message'])); // Extract error message from the response
          } else {
            return of(CASHADVANCEViewActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
          }
        })
      )
    )
);

export const CASHADVANCEViewSpecificEmployeeEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(CASHADVANCEViewSpecificEmployeeAction.type),
    switchMap((action: ReturnType<typeof CASHADVANCEViewSpecificEmployeeAction>) =>
      from(
        CASHADVANCEViewSpecificEmployeeApiCall(action?.payload)
      ).pipe(
        map((data) => {
          return CASHADVANCEViewSpecificEmployeeActionSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data['Error Message']) {
            return of(CASHADVANCEViewSpecificEmployeeActionFailure(error.response.data['Error Message'])); // Extract error message from the response
          } else {
            return of(CASHADVANCEViewSpecificEmployeeActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
          }
        })
      )
    )
);

export const CASHADVANCEViewSpecificEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(CASHADVANCEViewSpecificAction.type),
    switchMap((action: ReturnType<typeof CASHADVANCEViewSpecificAction>) =>
      from(
        CASHADVANCEViewSpecificApiCall(action?.payload)
      ).pipe(
        map((data) => {
          return CASHADVANCEViewSpecificActionSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data['Error Message']) {
            return of(CASHADVANCEViewSpecificActionFailure(error.response.data['Error Message'])); // Extract error message from the response
          } else {
            return of(CASHADVANCEViewSpecificActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
          }
        })
      )
    )
);


export const CASHADVANCECreateEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(CASHADVANCECreateAction.type),
    switchMap((action: ReturnType<typeof CASHADVANCECreateAction>) =>
      from(
        CASHADVANCECreateApiCall(action?.payload)
      ).pipe(
        map((data) => {
          return CASHADVANCECreateActionSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data) {
            return of(CASHADVANCECreateActionFailure(`${beautifyJSON(error.response.data)}`)); // Extract error message from the response
          } else {
            return of(CASHADVANCECreateActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
          }
        })
      )
    )
);

export const CASHADVANCEEditEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(CASHADVANCEEditAction.type),
    switchMap((action: ReturnType<typeof CASHADVANCEEditAction>) =>
      from(
        CASHADVANCEEditApiCall(action?.payload)
      ).pipe(
        map((data) => {
          return CASHADVANCEEditActionSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data['Error Message']) {
            return of(CASHADVANCEEditActionFailure(error.response.data['Error Message'])); // Extract error message from the response
          } else {
            return of(CASHADVANCEEditActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
          }
        })
      )
    )
);


// ALLOWANCETYPE API SECTION // ALLOWANCETYPE API SECTION // ALLOWANCETYPE API SECTION // ALLOWANCETYPE API SECTION // ALLOWANCETYPE API SECTION
const ALLOWANCETYPEEditApiCall = async (payload: ALLOWANCETYPEEditInterface) => {
    const response = await axios.put(`${APILink}pagibig/${payload.id}/`,
    payload,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
          if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(ALLOWANCETYPEEditActionProgress(progress));
          }
        }
      }
    );
    return response.data;
  };
  
  const ALLOWANCETYPECreateApiCall = async (payload: ALLOWANCETYPECreateInterface) => {
    const response = await axios.post(`${APILink}pagibig/`,
    payload,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
          if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(ALLOWANCETYPECreateActionProgress(progress));
          }
        }
      }
    );
    return response.data;
  };
  
  
  const ALLOWANCETYPEViewSpecificApiCall = async (payload: {at_no: number}) => {
    const response = await axios.get(`${APILink}pagibig/${payload.at_no}/`,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
          if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(ALLOWANCETYPEViewSpecificActionProgress(progress));
          }
        }
      }
    );
    return response.data;
  };
  
  
  const ALLOWANCETYPEViewApiCall = async () => {
    const response = await axios.get(`${APILink}pagibig/`,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
          if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(ALLOWANCETYPEViewActionProgress(progress));
          }
        }
      }
    );
    return response.data;
  };
  
  export const ALLOWANCETYPEViewEpic: Epic = (action$, state$) =>
    action$.pipe(
      ofType(ALLOWANCETYPEViewAction.type),
      switchMap(() =>
        from(
          ALLOWANCETYPEViewApiCall()
        ).pipe(
          map((data) => {
            return ALLOWANCETYPEViewActionSuccess(data);
          }),
          catchError((error) => {
            if (error.response && error.response.data && error.response.data['Error Message']) {
              return of(ALLOWANCETYPEViewActionFailure(error.response.data['Error Message'])); // Extract error message from the response
            } else {
              return of(ALLOWANCETYPEViewActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
          })
        )
      )
  );
  
  export const ALLOWANCETYPEViewSpecificEpic: Epic = (action$, state$) =>
    action$.pipe(
      ofType(ALLOWANCETYPEViewSpecificAction.type),
      switchMap((action: ReturnType<typeof ALLOWANCETYPEViewSpecificAction>) =>
        from(
          ALLOWANCETYPEViewSpecificApiCall(action?.payload)
        ).pipe(
          map((data) => {
            return ALLOWANCETYPEViewSpecificActionSuccess(data);
          }),
          catchError((error) => {
            if (error.response && error.response.data && error.response.data['Error Message']) {
              return of(ALLOWANCETYPEViewSpecificActionFailure(error.response.data['Error Message'])); // Extract error message from the response
            } else {
              return of(ALLOWANCETYPEViewSpecificActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
          })
        )
      )
  );
  
  
  export const ALLOWANCETYPECreateEpic: Epic = (action$, state$) =>
    action$.pipe(
      ofType(ALLOWANCETYPECreateAction.type),
      switchMap((action: ReturnType<typeof ALLOWANCETYPECreateAction>) =>
        from(
          ALLOWANCETYPECreateApiCall(action?.payload)
        ).pipe(
          map((data) => {
            return ALLOWANCETYPECreateActionSuccess(data);
          }),
          catchError((error) => {
            if (error.response && error.response.data && error.response.data) {
              return of(ALLOWANCETYPECreateActionFailure(`${beautifyJSON(error.response.data)}`)); // Extract error message from the response
            } else {
              return of(ALLOWANCETYPECreateActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
          })
        )
      )
  );
  
  export const ALLOWANCETYPEEditEpic: Epic = (action$, state$) =>
    action$.pipe(
      ofType(ALLOWANCETYPEEditAction.type),
      switchMap((action: ReturnType<typeof ALLOWANCETYPEEditAction>) =>
        from(
          ALLOWANCETYPEEditApiCall(action?.payload)
        ).pipe(
          map((data) => {
            return ALLOWANCETYPEEditActionSuccess(data);
          }),
          catchError((error) => {
            if (error.response && error.response.data && error.response.data['Error Message']) {
              return of(ALLOWANCETYPEEditActionFailure(error.response.data['Error Message'])); // Extract error message from the response
            } else {
              return of(ALLOWANCETYPEEditActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
          })
        )
      )
  );
  
  
// ALLOWANCEENTRY API SECTION // ALLOWANCEENTRY API SECTION // ALLOWANCEENTRY API SECTION // ALLOWANCEENTRY API SECTION // ALLOWANCEENTRY API SECTION
const ALLOWANCEENTRYEditApiCall = async (payload: ALLOWANCEENTRYEditInterface) => {
    const response = await axios.put(`${APILink}sss/${payload.emp_no}/`,
    payload,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
          if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(ALLOWANCEENTRYEditActionProgress(progress));
          }
        }
      }
    );
    return response.data;
  };
  
  const ALLOWANCEENTRYCreateApiCall = async (payload: ALLOWANCEENTRYCreateInterface) => {
    const response = await axios.post(`${APILink}sss/`,
    payload,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
          if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(ALLOWANCEENTRYCreateActionProgress(progress));
          }
        }
      }
    );
    return response.data;
  };
  
  
  const ALLOWANCEENTRYViewSpecificApiCall = async (payload: {ae_no: number}) => {
    const response = await axios.get(`${APILink}sss/${payload.ae_no}/`,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
          if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(ALLOWANCEENTRYViewSpecificActionProgress(progress));
          }
        }
      }
    );
    return response.data;
  };
  
  
  const ALLOWANCEENTRYViewApiCall = async () => {
    const response = await axios.get(`${APILink}sss/`,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
          if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(ALLOWANCEENTRYViewActionProgress(progress));
          }
        }
      }
    );
    return response.data;
  };
  
  export const ALLOWANCEENTRYViewEpic: Epic = (action$, state$) =>
    action$.pipe(
      ofType(ALLOWANCEENTRYViewAction.type),
      switchMap(() =>
        from(
          ALLOWANCEENTRYViewApiCall()
        ).pipe(
          map((data) => {
            return ALLOWANCEENTRYViewActionSuccess(data);
          }),
          catchError((error) => {
            if (error.response && error.response.data && error.response.data['Error Message']) {
              return of(ALLOWANCEENTRYViewActionFailure(error.response.data['Error Message'])); // Extract error message from the response
            } else {
              return of(ALLOWANCEENTRYViewActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
          })
        )
      )
  );
  
  export const ALLOWANCEENTRYViewSpecificEpic: Epic = (action$, state$) =>
    action$.pipe(
      ofType(ALLOWANCEENTRYViewSpecificAction.type),
      switchMap((action: ReturnType<typeof ALLOWANCEENTRYViewSpecificAction>) =>
        from(
          ALLOWANCEENTRYViewSpecificApiCall(action?.payload)
        ).pipe(
          map((data) => {
            return ALLOWANCEENTRYViewSpecificActionSuccess(data);
          }),
          catchError((error) => {
            if (error.response && error.response.data && error.response.data['Error Message']) {
              return of(ALLOWANCEENTRYViewSpecificActionFailure(error.response.data['Error Message'])); // Extract error message from the response
            } else {
              return of(ALLOWANCEENTRYViewSpecificActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
          })
        )
      )
  );
  
  
  export const ALLOWANCEENTRYCreateEpic: Epic = (action$, state$) =>
    action$.pipe(
      ofType(ALLOWANCEENTRYCreateAction.type),
      switchMap((action: ReturnType<typeof ALLOWANCEENTRYCreateAction>) =>
        from(
          ALLOWANCEENTRYCreateApiCall(action?.payload)
        ).pipe(
          map((data) => {
            return ALLOWANCEENTRYCreateActionSuccess(data);
          }),
          catchError((error) => {
            if (error.response && error.response.data && error.response.data) {
              return of(ALLOWANCEENTRYCreateActionFailure(`${beautifyJSON(error.response.data)}`)); // Extract error message from the response
            } else {
              return of(ALLOWANCEENTRYCreateActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
          })
        )
      )
  );
  
  export const ALLOWANCEENTRYEditEpic: Epic = (action$, state$) =>
    action$.pipe(
      ofType(ALLOWANCEENTRYEditAction.type),
      switchMap((action: ReturnType<typeof ALLOWANCEENTRYEditAction>) =>
        from(
          ALLOWANCEENTRYEditApiCall(action?.payload)
        ).pipe(
          map((data) => {
            return ALLOWANCEENTRYEditActionSuccess(data);
          }),
          catchError((error) => {
            if (error.response && error.response.data && error.response.data['Error Message']) {
              return of(ALLOWANCEENTRYEditActionFailure(error.response.data['Error Message'])); // Extract error message from the response
            } else {
              return of(ALLOWANCEENTRYEditActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
          })
        )
      )
  );
  
  