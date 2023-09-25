import { ofType } from 'redux-observable';
import { map, catchError, switchMap, mergeMap } from 'rxjs/operators';
import { of, from } from 'rxjs';
import axios, { AxiosProgressEvent } from 'axios';
import { beautifyJSON } from '@/helpers/utils';
import {
  BRANCHCreateAction,
  BRANCHCreateActionFailure,
  BRANCHCreateActionFailureCleanup,
  BRANCHCreateActionProgress,
  BRANCHCreateActionSuccess,
  BRANCHEditAction,
  BRANCHEditActionFailure,
  BRANCHEditActionFailureCleanup,
  BRANCHEditActionProgress,
  BRANCHEditActionSuccess,
  BRANCHViewAction,
  BRANCHViewActionFailure,
  BRANCHViewActionFailureCleanup,
  BRANCHViewActionProgress,
  BRANCHViewActionSuccess,
  BRANCHViewSpecificAction,
  BRANCHViewSpecificActionFailure,
  BRANCHViewSpecificActionFailureCleanup,
  BRANCHViewSpecificActionProgress,
  BRANCHViewSpecificActionSuccess,
  DEPARTMENTCreateAction,
  DEPARTMENTCreateActionFailure,
  DEPARTMENTCreateActionFailureCleanup,
  DEPARTMENTCreateActionProgress,
  DEPARTMENTCreateActionSuccess,
  DEPARTMENTEditAction,
  DEPARTMENTEditActionFailure,
  DEPARTMENTEditActionFailureCleanup,
  DEPARTMENTEditActionProgress,
  DEPARTMENTEditActionSuccess,
  DEPARTMENTViewAction,
  DEPARTMENTViewActionFailure,
  DEPARTMENTViewActionFailureCleanup,
  DEPARTMENTViewActionProgress,
  DEPARTMENTViewActionSuccess,
  DEPARTMENTViewSpecificAction,
  DEPARTMENTViewSpecificActionFailure,
  DEPARTMENTViewSpecificActionFailureCleanup,
  DEPARTMENTViewSpecificActionProgress,
  DEPARTMENTViewSpecificActionSuccess,
  DIVISIONEditAction,
  DIVISIONEditActionFailure,
  DIVISIONEditActionFailureCleanup,
  DIVISIONEditActionProgress,
  DIVISIONEditActionSuccess,
  DIVISIONCreateAction,
  DIVISIONCreateActionFailure,
  DIVISIONCreateActionFailureCleanup,
  DIVISIONCreateActionProgress,
  DIVISIONCreateActionSuccess,
  DIVISIONViewAction,
  DIVISIONViewActionFailure,
  DIVISIONViewActionFailureCleanup,
  DIVISIONViewActionProgress,
  DIVISIONViewActionSuccess,
  DIVISIONViewSpecificAction,
  DIVISIONViewSpecificActionFailure,
  DIVISIONViewSpecificActionFailureCleanup,
  DIVISIONViewSpecificActionProgress,
  DIVISIONViewSpecificActionSuccess,
  PAYROLLGROUPCreateAction,
  PAYROLLGROUPCreateActionFailure,
  PAYROLLGROUPCreateActionFailureCleanup,
  PAYROLLGROUPCreateActionProgress,
  PAYROLLGROUPCreateActionSuccess,
  PAYROLLGROUPEditAction,
  PAYROLLGROUPEditActionFailure,
  PAYROLLGROUPEditActionFailureCleanup,
  PAYROLLGROUPEditActionProgress,
  PAYROLLGROUPEditActionSuccess,
  PAYROLLGROUPViewAction,
  PAYROLLGROUPViewActionFailure,
  PAYROLLGROUPViewActionFailureCleanup,
  PAYROLLGROUPViewActionProgress,
  PAYROLLGROUPViewActionSuccess,
  PAYROLLGROUPViewSpecificAction,
  PAYROLLGROUPViewSpecificActionFailure,
  PAYROLLGROUPViewSpecificActionFailureCleanup,
  PAYROLLGROUPViewSpecificActionProgress,
  PAYROLLGROUPViewSpecificActionSuccess,
  POSITIONCreateAction,
  POSITIONCreateActionFailure,
  POSITIONCreateActionFailureCleanup,
  POSITIONCreateActionProgress,
  POSITIONCreateActionSuccess,
  POSITIONEditAction,
  POSITIONEditActionFailure,
  POSITIONEditActionFailureCleanup,
  POSITIONEditActionProgress,
  POSITIONEditActionSuccess,
  POSITIONViewAction,
  POSITIONViewActionFailure,
  POSITIONViewActionFailureCleanup,
  POSITIONViewActionProgress,
  POSITIONViewActionSuccess,
  POSITIONViewSpecificAction,
  POSITIONViewSpecificActionFailure,
  POSITIONViewSpecificActionFailureCleanup,
  POSITIONViewSpecificActionProgress,
  POSITIONViewSpecificActionSuccess,
  RANKCreateAction,
  RANKCreateActionFailure,
  RANKCreateActionFailureCleanup,
  RANKCreateActionProgress,
  RANKCreateActionSuccess,
  RANKEditAction,
  RANKEditActionFailure,
  RANKEditActionFailureCleanup,
  RANKEditActionProgress,
  RANKEditActionSuccess,
  RANKViewAction,
  RANKViewActionFailure,
  RANKViewActionFailureCleanup,
  RANKViewActionProgress,
  RANKViewActionSuccess,
  RANKViewSpecificAction,
  RANKViewSpecificActionFailure,
  RANKViewSpecificActionFailureCleanup,
  RANKViewSpecificActionProgress,
  RANKViewSpecificActionSuccess,
} from '../actions/categories';
import { Epic } from 'redux-observable';
import store, { APILink } from '../configureStore';
import { 
    BRANCHCreateInterface,
    BRANCHEditInterface,
    BRANCHGenericInterface,
    BRANCHViewInterface,
    DEPARTMENTCreateInterface,
    DEPARTMENTEditInterface,
    DEPARTMENTGenericInterface,
    DEPARTMENTViewInterface,
    DIVISIONCreateInterface,
    DIVISIONEditInterface,
    DIVISIONGenericInterface,
    DIVISIONViewInterface,
    PAYROLLGROUPCreateInterface,
    PAYROLLGROUPEditInterface,
    PAYROLLGROUPGenericInterface,
    PAYROLLGROUPViewInterface,
    POSITIONCreateInterface,
    POSITIONEditInterface,
    POSITIONGenericInterface,
    POSITIONViewInterface,
    RANKCreateInterface,
    RANKEditInterface,
    RANKGenericInterface,
    RANKViewInterface,
    RankDataInterface,
} from '@/types/types-pages';


// BRANCH API SECTION // BRANCH API SECTION // BRANCH API SECTION // BRANCH API SECTION // BRANCH API SECTION
const BRANCHEditApiCall = async (payload: BRANCHEditInterface) => {
  const response = await axios.put(`${APILink}branch/${payload.id}/`,
  payload,
  {
      onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if(progressEvent.total){
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          store.dispatch(BRANCHEditActionProgress(progress));
        }
      }
    }
  );
  return response.data;
};

const BRANCHCreateApiCall = async (payload: BRANCHCreateInterface) => {
  const response = await axios.post(`${APILink}branch/`,
  payload,
  {
      onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if(progressEvent.total){
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          store.dispatch(BRANCHCreateActionProgress(progress));
        }
      }
    }
  );
  return response.data;
};


const BRANCHViewSpecificApiCall = async (payload: {branch_id: number}) => {
  const response = await axios.get(`${APILink}branch/${payload.branch_id}/`,
  {
      onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if(progressEvent.total){
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          store.dispatch(BRANCHViewSpecificActionProgress(progress));
        }
      }
    }
  );
  return response.data;
};


const BRANCHViewApiCall = async () => {
  const response = await axios.get(`${APILink}branch/`,
  {
      onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if(progressEvent.total){
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          store.dispatch(BRANCHViewActionProgress(progress));
        }
      }
    }
  );
  return response.data;
};

export const BRANCHViewEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(BRANCHViewAction.type),
    switchMap(() =>
      from(
        BRANCHViewApiCall()
      ).pipe(
        map((data) => {
          return BRANCHViewActionSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data['Error Message']) {
            return of(BRANCHViewActionFailure(error.response.data['Error Message'])); // Extract error message from the response
          } else {
            return of(BRANCHViewActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
          }
        })
      )
    )
);

export const BRANCHViewSpecificEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(BRANCHViewSpecificAction.type),
    switchMap((action: ReturnType<typeof BRANCHViewSpecificAction>) =>
      from(
        BRANCHViewSpecificApiCall(action?.payload)
      ).pipe(
        map((data) => {
          return BRANCHViewSpecificActionSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data['Error Message']) {
            return of(BRANCHViewSpecificActionFailure(error.response.data['Error Message'])); // Extract error message from the response
          } else {
            return of(BRANCHViewSpecificActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
          }
        })
      )
    )
);


export const BRANCHCreateEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(BRANCHCreateAction.type),
    switchMap((action: ReturnType<typeof BRANCHCreateAction>) =>
      from(
        BRANCHCreateApiCall(action?.payload)
      ).pipe(
        map((data) => {
          return BRANCHCreateActionSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data) {
            return of(BRANCHCreateActionFailure(`${beautifyJSON(error.response.data)}`)); // Extract error message from the response
          } else {
            return of(BRANCHCreateActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
          }
        })
      )
    )
);

export const BRANCHEditEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(BRANCHEditAction.type),
    switchMap((action: ReturnType<typeof BRANCHEditAction>) =>
      from(
        BRANCHEditApiCall(action?.payload)
      ).pipe(
        map((data) => {
          return BRANCHEditActionSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data['Error Message']) {
            return of(BRANCHEditActionFailure(error.response.data['Error Message'])); // Extract error message from the response
          } else {
            return of(BRANCHEditActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
          }
        })
      )
    )
);


// DEPARTMENT API SECTION // DEPARTMENT API SECTION // DEPARTMENT API SECTION // DEPARTMENT API SECTION // DEPARTMENT API SECTION
const DEPARTMENTEditApiCall = async (payload: DEPARTMENTEditInterface) => {
  const response = await axios.put(`${APILink}department/${payload.id}/`,
  payload,
  {
      onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if(progressEvent.total){
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          store.dispatch(DEPARTMENTEditActionProgress(progress));
        }
      }
    }
  );
  return response.data;
};

const DEPARTMENTCreateApiCall = async (payload: DEPARTMENTCreateInterface) => {
  const response = await axios.post(`${APILink}department/`,
  payload,
  {
      onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if(progressEvent.total){
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          store.dispatch(DEPARTMENTCreateActionProgress(progress));
        }
      }
    }
  );
  return response.data;
};


const DEPARTMENTViewSpecificApiCall = async (payload: {department_id: number}) => {
  const response = await axios.get(`${APILink}department/${payload.department_id}/`,
  {
      onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if(progressEvent.total){
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          store.dispatch(DEPARTMENTViewSpecificActionProgress(progress));
        }
      }
    }
  );
  return response.data;
};


const DEPARTMENTViewApiCall = async () => {
  const response = await axios.get(`${APILink}department/`,
  {
      onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if(progressEvent.total){
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          store.dispatch(DEPARTMENTViewActionProgress(progress));
        }
      }
    }
  );
  return response.data;
};

export const DEPARTMENTViewEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(DEPARTMENTViewAction.type),
    switchMap(() =>
      from(
        DEPARTMENTViewApiCall()
      ).pipe(
        map((data) => {
          return DEPARTMENTViewActionSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data['Error Message']) {
            return of(DEPARTMENTViewActionFailure(error.response.data['Error Message'])); // Extract error message from the response
          } else {
            return of(DEPARTMENTViewActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
          }
        })
      )
    )
);

export const DEPARTMENTViewSpecificEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(DEPARTMENTViewSpecificAction.type),
    switchMap((action: ReturnType<typeof DEPARTMENTViewSpecificAction>) =>
      from(
        DEPARTMENTViewSpecificApiCall(action?.payload)
      ).pipe(
        map((data) => {
          return DEPARTMENTViewSpecificActionSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data['Error Message']) {
            return of(DEPARTMENTViewSpecificActionFailure(error.response.data['Error Message'])); // Extract error message from the response
          } else {
            return of(DEPARTMENTViewSpecificActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
          }
        })
      )
    )
);


export const DEPARTMENTCreateEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(DEPARTMENTCreateAction.type),
    switchMap((action: ReturnType<typeof DEPARTMENTCreateAction>) =>
      from(
        DEPARTMENTCreateApiCall(action?.payload)
      ).pipe(
        map((data) => {
          return DEPARTMENTCreateActionSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data) {
            return of(DEPARTMENTCreateActionFailure(`${beautifyJSON(error.response.data)}`)); // Extract error message from the response
          } else {
            return of(DEPARTMENTCreateActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
          }
        })
      )
    )
);

export const DEPARTMENTEditEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(DEPARTMENTEditAction.type),
    switchMap((action: ReturnType<typeof DEPARTMENTEditAction>) =>
      from(
        DEPARTMENTEditApiCall(action?.payload)
      ).pipe(
        map((data) => {
          return DEPARTMENTEditActionSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data['Error Message']) {
            return of(DEPARTMENTEditActionFailure(error.response.data['Error Message'])); // Extract error message from the response
          } else {
            return of(DEPARTMENTEditActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
          }
        })
      )
    )
);



// DIVISION API SECTION // DIVISION API SECTION // DIVISION API SECTION // DIVISION API SECTION // DIVISION API SECTION
const DIVISIONEditApiCall = async (payload: DIVISIONEditInterface) => {
    const response = await axios.put(`${APILink}division/${payload.id}/`,
    payload,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
          if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(DIVISIONEditActionProgress(progress));
          }
        }
      }
    );
    return response.data;
  };
  
  const DIVISIONCreateApiCall = async (payload: DIVISIONCreateInterface) => {
    const response = await axios.post(`${APILink}division/`,
    payload,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
          if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(DIVISIONCreateActionProgress(progress));
          }
        }
      }
    );
    return response.data;
  };
  
  
  const DIVISIONViewSpecificApiCall = async (payload: {division_id: number}) => {
    const response = await axios.get(`${APILink}division/${payload.division_id}/`,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
          if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(DIVISIONViewSpecificActionProgress(progress));
          }
        }
      }
    );
    return response.data;
  };
  
  
  const DIVISIONViewApiCall = async () => {
    const response = await axios.get(`${APILink}division/`,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
          if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(DIVISIONViewActionProgress(progress));
          }
        }
      }
    );
    return response.data;
  };
  
  export const DIVISIONViewEpic: Epic = (action$, state$) =>
    action$.pipe(
      ofType(DIVISIONViewAction.type),
      switchMap(() =>
        from(
          DIVISIONViewApiCall()
        ).pipe(
          map((data) => {
            return DIVISIONViewActionSuccess(data);
          }),
          catchError((error) => {
            if (error.response && error.response.data && error.response.data['Error Message']) {
              return of(DIVISIONViewActionFailure(error.response.data['Error Message'])); // Extract error message from the response
            } else {
              return of(DIVISIONViewActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
          })
        )
      )
  );
  
  export const DIVISIONViewSpecificEpic: Epic = (action$, state$) =>
    action$.pipe(
      ofType(DIVISIONViewSpecificAction.type),
      switchMap((action: ReturnType<typeof DIVISIONViewSpecificAction>) =>
        from(
          DIVISIONViewSpecificApiCall(action?.payload)
        ).pipe(
          map((data) => {
            return DIVISIONViewSpecificActionSuccess(data);
          }),
          catchError((error) => {
            if (error.response && error.response.data && error.response.data['Error Message']) {
              return of(DIVISIONViewSpecificActionFailure(error.response.data['Error Message'])); // Extract error message from the response
            } else {
              return of(DIVISIONViewSpecificActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
          })
        )
      )
  );
  
  
  export const DIVISIONCreateEpic: Epic = (action$, state$) =>
    action$.pipe(
      ofType(DIVISIONCreateAction.type),
      switchMap((action: ReturnType<typeof DIVISIONCreateAction>) =>
        from(
          DIVISIONCreateApiCall(action?.payload)
        ).pipe(
          map((data) => {
            return DIVISIONCreateActionSuccess(data);
          }),
          catchError((error) => {
            if (error.response && error.response.data && error.response.data) {
              return of(DIVISIONCreateActionFailure(`${beautifyJSON(error.response.data)}`)); // Extract error message from the response
            } else {
              return of(DIVISIONCreateActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
          })
        )
      )
  );
  
  export const DIVISIONEditEpic: Epic = (action$, state$) =>
    action$.pipe(
      ofType(DIVISIONEditAction.type),
      switchMap((action: ReturnType<typeof DIVISIONEditAction>) =>
        from(
          DIVISIONEditApiCall(action?.payload)
        ).pipe(
          map((data) => {
            return DIVISIONEditActionSuccess(data);
          }),
          catchError((error) => {
            if (error.response && error.response.data && error.response.data['Error Message']) {
              return of(DIVISIONEditActionFailure(error.response.data['Error Message'])); // Extract error message from the response
            } else {
              return of(DIVISIONEditActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
          })
        )
      )
  );
  
  
// PAYROLLGROUP API SECTION // PAYROLLGROUP API SECTION // PAYROLLGROUP API SECTION // PAYROLLGROUP API SECTION // PAYROLLGROUP API SECTION
const PAYROLLGROUPEditApiCall = async (payload: PAYROLLGROUPEditInterface) => {
    const response = await axios.put(`${APILink}payrollgroup/${payload.id}/`,
    payload,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
          if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(PAYROLLGROUPEditActionProgress(progress));
          }
        }
      }
    );
    return response.data;
};
  
const PAYROLLGROUPCreateApiCall = async (payload: PAYROLLGROUPCreateInterface) => {
const response = await axios.post(`${APILink}payrollgroup/`,
payload,
{
    onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if(progressEvent.total){
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        store.dispatch(PAYROLLGROUPCreateActionProgress(progress));
        }
    }
    }
);
return response.data;
};


const PAYROLLGROUPViewSpecificApiCall = async (payload: {payrollgroup_id: number}) => {
const response = await axios.get(`${APILink}payrollgroup/${payload.payrollgroup_id}/`,
{
    onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if(progressEvent.total){
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        store.dispatch(PAYROLLGROUPViewSpecificActionProgress(progress));
        }
    }
    }
);
return response.data;
};


const PAYROLLGROUPViewApiCall = async () => {
const response = await axios.get(`${APILink}payrollgroup/`,
{
    onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if(progressEvent.total){
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        store.dispatch(PAYROLLGROUPViewActionProgress(progress));
        }
    }
    }
);
return response.data;
};

export const PAYROLLGROUPViewEpic: Epic = (action$, state$) =>
action$.pipe(
    ofType(PAYROLLGROUPViewAction.type),
    switchMap(() =>
    from(
        PAYROLLGROUPViewApiCall()
    ).pipe(
        map((data) => {
        return PAYROLLGROUPViewActionSuccess(data);
        }),
        catchError((error) => {
        if (error.response && error.response.data && error.response.data['Error Message']) {
            return of(PAYROLLGROUPViewActionFailure(error.response.data['Error Message'])); // Extract error message from the response
        } else {
            return of(PAYROLLGROUPViewActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
        }
        })
    )
    )
);

export const PAYROLLGROUPViewSpecificEpic: Epic = (action$, state$) =>
action$.pipe(
    ofType(PAYROLLGROUPViewSpecificAction.type),
    switchMap((action: ReturnType<typeof PAYROLLGROUPViewSpecificAction>) =>
    from(
        PAYROLLGROUPViewSpecificApiCall(action?.payload)
    ).pipe(
        map((data) => {
        return PAYROLLGROUPViewSpecificActionSuccess(data);
        }),
        catchError((error) => {
        if (error.response && error.response.data && error.response.data['Error Message']) {
            return of(PAYROLLGROUPViewSpecificActionFailure(error.response.data['Error Message'])); // Extract error message from the response
        } else {
            return of(PAYROLLGROUPViewSpecificActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
        }
        })
    )
    )
);


export const PAYROLLGROUPCreateEpic: Epic = (action$, state$) =>
action$.pipe(
    ofType(PAYROLLGROUPCreateAction.type),
    switchMap((action: ReturnType<typeof PAYROLLGROUPCreateAction>) =>
    from(
        PAYROLLGROUPCreateApiCall(action?.payload)
    ).pipe(
        map((data) => {
        return PAYROLLGROUPCreateActionSuccess(data);
        }),
        catchError((error) => {
        if (error.response && error.response.data && error.response.data) {
            return of(PAYROLLGROUPCreateActionFailure(`${beautifyJSON(error.response.data)}`)); // Extract error message from the response
        } else {
            return of(PAYROLLGROUPCreateActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
        }
        })
    )
    )
);

export const PAYROLLGROUPEditEpic: Epic = (action$, state$) =>
action$.pipe(
    ofType(PAYROLLGROUPEditAction.type),
    switchMap((action: ReturnType<typeof PAYROLLGROUPEditAction>) =>
    from(
        PAYROLLGROUPEditApiCall(action?.payload)
    ).pipe(
        map((data) => {
        return PAYROLLGROUPEditActionSuccess(data);
        }),
        catchError((error) => {
        if (error.response && error.response.data && error.response.data['Error Message']) {
            return of(PAYROLLGROUPEditActionFailure(error.response.data['Error Message'])); // Extract error message from the response
        } else {
            return of(PAYROLLGROUPEditActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
        }
        })
    )
    )
);

// POSITION API SECTION // POSITION API SECTION // POSITION API SECTION // POSITION API SECTION // POSITION API SECTION
const POSITIONEditApiCall = async (payload: POSITIONEditInterface) => {
    const response = await axios.put(`${APILink}position/${payload.id}/`,
    payload,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
          if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(POSITIONEditActionProgress(progress));
          }
        }
      }
    );
    return response.data;
};
  
const POSITIONCreateApiCall = async (payload: POSITIONCreateInterface) => {
const response = await axios.post(`${APILink}position/`,
payload,
{
    onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if(progressEvent.total){
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        store.dispatch(POSITIONCreateActionProgress(progress));
        }
    }
    }
);
return response.data;
};


const POSITIONViewSpecificApiCall = async (payload: {position_id: number}) => {
const response = await axios.get(`${APILink}position/${payload.position_id}/`,
{
    onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if(progressEvent.total){
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        store.dispatch(POSITIONViewSpecificActionProgress(progress));
        }
    }
    }
);
return response.data;
};


const POSITIONViewApiCall = async () => {
const response = await axios.get(`${APILink}position/`,
{
    onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if(progressEvent.total){
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        store.dispatch(POSITIONViewActionProgress(progress));
        }
    }
    }
);
return response.data;
};

export const POSITIONViewEpic: Epic = (action$, state$) =>
action$.pipe(
    ofType(POSITIONViewAction.type),
    switchMap(() =>
    from(
        POSITIONViewApiCall()
    ).pipe(
        map((data) => {
        return POSITIONViewActionSuccess(data);
        }),
        catchError((error) => {
        if (error.response && error.response.data && error.response.data['Error Message']) {
            return of(POSITIONViewActionFailure(error.response.data['Error Message'])); // Extract error message from the response
        } else {
            return of(POSITIONViewActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
        }
        })
    )
    )
);

export const POSITIONViewSpecificEpic: Epic = (action$, state$) =>
action$.pipe(
    ofType(POSITIONViewSpecificAction.type),
    switchMap((action: ReturnType<typeof POSITIONViewSpecificAction>) =>
    from(
        POSITIONViewSpecificApiCall(action?.payload)
    ).pipe(
        map((data) => {
        return POSITIONViewSpecificActionSuccess(data);
        }),
        catchError((error) => {
        if (error.response && error.response.data && error.response.data['Error Message']) {
            return of(POSITIONViewSpecificActionFailure(error.response.data['Error Message'])); // Extract error message from the response
        } else {
            return of(POSITIONViewSpecificActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
        }
        })
    )
    )
);


export const POSITIONCreateEpic: Epic = (action$, state$) =>
action$.pipe(
    ofType(POSITIONCreateAction.type),
    switchMap((action: ReturnType<typeof POSITIONCreateAction>) =>
    from(
        POSITIONCreateApiCall(action?.payload)
    ).pipe(
        map((data) => {
        return POSITIONCreateActionSuccess(data);
        }),
        catchError((error) => {
        if (error.response && error.response.data && error.response.data) {
            return of(POSITIONCreateActionFailure(`${beautifyJSON(error.response.data)}`)); // Extract error message from the response
        } else {
            return of(POSITIONCreateActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
        }
        })
    )
    )
);

export const POSITIONEditEpic: Epic = (action$, state$) =>
action$.pipe(
    ofType(POSITIONEditAction.type),
    switchMap((action: ReturnType<typeof POSITIONEditAction>) =>
    from(
        POSITIONEditApiCall(action?.payload)
    ).pipe(
        map((data) => {
        return POSITIONEditActionSuccess(data);
        }),
        catchError((error) => {
        if (error.response && error.response.data && error.response.data['Error Message']) {
            return of(POSITIONEditActionFailure(error.response.data['Error Message'])); // Extract error message from the response
        } else {
            return of(POSITIONEditActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
        }
        })
    )
    )
);



// RANK API SECTION // RANK API SECTION // RANK API SECTION // RANK API SECTION // RANK API SECTION
const RANKEditApiCall = async (payload: RANKEditInterface) => {
    const response = await axios.put(`${APILink}rank/${payload.id}/`,
    payload,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
          if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(RANKEditActionProgress(progress));
          }
        }
      }
    );
    return response.data;
};
  
const RANKCreateApiCall = async (payload: RANKCreateInterface) => {
const response = await axios.post(`${APILink}rank/`,
payload,
{
    onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if(progressEvent.total){
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        store.dispatch(RANKCreateActionProgress(progress));
        }
    }
    }
);
return response.data;
};


const RANKViewSpecificApiCall = async (payload: {rank_id: number}) => {
const response = await axios.get(`${APILink}rank/${payload.rank_id}/`,
{
    onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if(progressEvent.total){
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        store.dispatch(RANKViewSpecificActionProgress(progress));
        }
    }
    }
);
return response.data;
};


const RANKViewApiCall = async () => {
const response = await axios.get(`${APILink}rank/`,
{
    onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if(progressEvent.total){
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        store.dispatch(RANKViewActionProgress(progress));
        }
    }
    }
);
return response.data;
};

export const RANKViewEpic: Epic = (action$, state$) =>
action$.pipe(
    ofType(RANKViewAction.type),
    switchMap(() =>
    from(
        RANKViewApiCall()
    ).pipe(
        map((data) => {
        return RANKViewActionSuccess(data);
        }),
        catchError((error) => {
        if (error.response && error.response.data && error.response.data['Error Message']) {
            return of(RANKViewActionFailure(error.response.data['Error Message'])); // Extract error message from the response
        } else {
            return of(RANKViewActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
        }
        })
    )
    )
);

export const RANKViewSpecificEpic: Epic = (action$, state$) =>
action$.pipe(
    ofType(RANKViewSpecificAction.type),
    switchMap((action: ReturnType<typeof RANKViewSpecificAction>) =>
    from(
        RANKViewSpecificApiCall(action?.payload)
    ).pipe(
        map((data) => {
        return RANKViewSpecificActionSuccess(data);
        }),
        catchError((error) => {
        if (error.response && error.response.data && error.response.data['Error Message']) {
            return of(RANKViewSpecificActionFailure(error.response.data['Error Message'])); // Extract error message from the response
        } else {
            return of(RANKViewSpecificActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
        }
        })
    )
    )
);


export const RANKCreateEpic: Epic = (action$, state$) =>
action$.pipe(
    ofType(RANKCreateAction.type),
    switchMap((action: ReturnType<typeof RANKCreateAction>) =>
    from(
        RANKCreateApiCall(action?.payload)
    ).pipe(
        map((data) => {
        return RANKCreateActionSuccess(data);
        }),
        catchError((error) => {
        if (error.response && error.response.data && error.response.data) {
            return of(RANKCreateActionFailure(`${beautifyJSON(error.response.data)}`)); // Extract error message from the response
        } else {
            return of(RANKCreateActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
        }
        })
    )
    )
);

export const RANKEditEpic: Epic = (action$, state$) =>
action$.pipe(
    ofType(RANKEditAction.type),
    switchMap((action: ReturnType<typeof RANKEditAction>) =>
    from(
        RANKEditApiCall(action?.payload)
    ).pipe(
        map((data) => {
        return RANKEditActionSuccess(data);
        }),
        catchError((error) => {
        if (error.response && error.response.data && error.response.data['Error Message']) {
            return of(RANKEditActionFailure(error.response.data['Error Message'])); // Extract error message from the response
        } else {
            return of(RANKEditActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
        }
        })
    )
    )
);

  