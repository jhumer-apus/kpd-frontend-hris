import { ofType } from 'redux-observable';
import { map, catchError, switchMap, mergeMap } from 'rxjs/operators';
import { of, from } from 'rxjs';
import axios, { AxiosProgressEvent } from 'axios';
import { beautifyJSON } from '@/helpers/utils';
import * as _Action from '../actions/payroll-variables';
import { Epic } from 'redux-observable';
import store, { APILink } from '../configureStore';
import * as _Interface from '@/types/types-payroll-variables';


// TAX API SECTION // TAX API SECTION // TAX API SECTION // TAX API SECTION // TAX API SECTION
const TAXEditApiCall = async (payload: _Interface.TAXEditInterface) => {
  const response = await axios.put(`${APILink}tax/${payload.emp_no}/`,
  payload,
  {
      onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if(progressEvent.total){
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          store.dispatch(_Action.TAXEditActionProgress(progress));
        }
      }
    }
  );
  return response.data;
};

const TAXCreateApiCall = async (payload: _Interface.TAXCreateInterface) => {
  const response = await axios.post(`${APILink}tax/`,
  payload,
  {
      onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if(progressEvent.total){
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          store.dispatch(_Action.TAXCreateActionProgress(progress));
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
          store.dispatch(_Action.TAXViewSpecificActionProgress(progress));
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
          store.dispatch(_Action.TAXViewActionProgress(progress));
        }
      }
    }
  );
  return response.data;
};

export const TAXViewEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(_Action.TAXViewAction.type),
    switchMap(() =>
      from(
        TAXViewApiCall()
      ).pipe(
        map((data) => {
          return _Action.TAXViewActionSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data['Error Message']) {
            return of(_Action.TAXViewActionFailure(error.response.data['Error Message'])); // Extract error message from the response
          } else {
            return of(_Action.TAXViewActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
          }
        })
      )
    )
);

export const TAXViewSpecificEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(_Action.TAXViewSpecificAction.type),
    switchMap((action: ReturnType<typeof _Action.TAXViewSpecificAction>) =>
      from(
        TAXViewSpecificApiCall(action?.payload)
      ).pipe(
        map((data) => {
          return _Action.TAXViewSpecificActionSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data['Error Message']) {
            return of(_Action.TAXViewSpecificActionFailure(error.response.data['Error Message'])); // Extract error message from the response
          } else {
            return of(_Action.TAXViewSpecificActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
          }
        })
      )
    )
);


export const TAXCreateEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(_Action.TAXCreateAction.type),
    switchMap((action: ReturnType<typeof _Action.TAXCreateAction>) =>
      from(
        TAXCreateApiCall(action?.payload)
      ).pipe(
        map((data) => {
          return _Action.TAXCreateActionSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data) {
            return of(_Action.TAXCreateActionFailure(`${beautifyJSON(error.response.data)}`)); // Extract error message from the response
          } else {
            return of(_Action.TAXCreateActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
          }
        })
      )
    )
);

export const TAXEditEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(_Action.TAXEditAction.type),
    switchMap((action: ReturnType<typeof _Action.TAXEditAction>) =>
      from(
        TAXEditApiCall(action?.payload)
      ).pipe(
        map((data) => {
          return _Action.TAXEditActionSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data['Error Message']) {
            return of(_Action.TAXEditActionFailure(error.response.data['Error Message'])); // Extract error message from the response
          } else {
            return of(_Action.TAXEditActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
          }
        })
      )
    )
);


// PAGIBIG API SECTION // PAGIBIG API SECTION // PAGIBIG API SECTION // PAGIBIG API SECTION // PAGIBIG API SECTION
const PAGIBIGEditApiCall = async (payload: _Interface.PAGIBIGEditInterface) => {
    const response = await axios.put(`${APILink}pagibig/${payload.emp_no}/`,
    payload,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
          if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(_Action.PAGIBIGEditActionProgress(progress));
          }
        }
      }
    );
    return response.data;
  };
  
  const PAGIBIGCreateApiCall = async (payload: _Interface.PAGIBIGCreateInterface) => {
    const response = await axios.post(`${APILink}pagibig/`,
    payload,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
          if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(_Action.PAGIBIGCreateActionProgress(progress));
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
            store.dispatch(_Action.PAGIBIGViewSpecificActionProgress(progress));
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
            store.dispatch(_Action.PAGIBIGViewActionProgress(progress));
          }
        }
      }
    );
    return response.data;
  };
  
  export const PAGIBIGViewEpic: Epic = (action$, state$) =>
    action$.pipe(
      ofType(_Action.PAGIBIGViewAction.type),
      switchMap(() =>
        from(
          PAGIBIGViewApiCall()
        ).pipe(
          map((data) => {
            return _Action.PAGIBIGViewActionSuccess(data);
          }),
          catchError((error) => {
            if (error.response && error.response.data && error.response.data['Error Message']) {
              return of(_Action.PAGIBIGViewActionFailure(error.response.data['Error Message'])); // Extract error message from the response
            } else {
              return of(_Action.PAGIBIGViewActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
          })
        )
      )
  );
  
  export const PAGIBIGViewSpecificEpic: Epic = (action$, state$) =>
    action$.pipe(
      ofType(_Action.PAGIBIGViewSpecificAction.type),
      switchMap((action: ReturnType<typeof _Action.PAGIBIGViewSpecificAction>) =>
        from(
          PAGIBIGViewSpecificApiCall(action?.payload)
        ).pipe(
          map((data) => {
            return _Action.PAGIBIGViewSpecificActionSuccess(data);
          }),
          catchError((error) => {
            if (error.response && error.response.data && error.response.data['Error Message']) {
              return of(_Action.PAGIBIGViewSpecificActionFailure(error.response.data['Error Message'])); // Extract error message from the response
            } else {
              return of(_Action.PAGIBIGViewSpecificActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
          })
        )
      )
  );
  
  
  export const PAGIBIGCreateEpic: Epic = (action$, state$) =>
    action$.pipe(
      ofType(_Action.PAGIBIGCreateAction.type),
      switchMap((action: ReturnType<typeof _Action.PAGIBIGCreateAction>) =>
        from(
          PAGIBIGCreateApiCall(action?.payload)
        ).pipe(
          map((data) => {
            return _Action.PAGIBIGCreateActionSuccess(data);
          }),
          catchError((error) => {
            if (error.response && error.response.data && error.response.data) {
              return of(_Action.PAGIBIGCreateActionFailure(`${beautifyJSON(error.response.data)}`)); // Extract error message from the response
            } else {
              return of(_Action.PAGIBIGCreateActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
          })
        )
      )
  );
  
  export const PAGIBIGEditEpic: Epic = (action$, state$) =>
    action$.pipe(
      ofType(_Action.PAGIBIGEditAction.type),
      switchMap((action: ReturnType<typeof _Action.PAGIBIGEditAction>) =>
        from(
          PAGIBIGEditApiCall(action?.payload)
        ).pipe(
          map((data) => {
            return _Action.PAGIBIGEditActionSuccess(data);
          }),
          catchError((error) => {
            if (error.response && error.response.data && error.response.data['Error Message']) {
              return of(_Action.PAGIBIGEditActionFailure(error.response.data['Error Message'])); // Extract error message from the response
            } else {
              return of(_Action.PAGIBIGEditActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
          })
        )
      )
  );
  
  
// SSS API SECTION // SSS API SECTION // SSS API SECTION // SSS API SECTION // SSS API SECTION
const SSSEditApiCall = async (payload: _Interface.SSSEditInterface) => {
    const response = await axios.put(`${APILink}sss/${payload.emp_no}/`,
    payload,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
          if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(_Action.SSSEditActionProgress(progress));
          }
        }
      }
    );
    return response.data;
  };
  
  const SSSCreateApiCall = async (payload: _Interface.SSSCreateInterface) => {
    const response = await axios.post(`${APILink}sss/`,
    payload,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
          if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(_Action.SSSCreateActionProgress(progress));
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
            store.dispatch(_Action.SSSViewSpecificActionProgress(progress));
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
            store.dispatch(_Action.SSSViewActionProgress(progress));
          }
        }
      }
    );
    return response.data;
  };
  
  export const SSSViewEpic: Epic = (action$, state$) =>
    action$.pipe(
      ofType(_Action.SSSViewAction.type),
      switchMap(() =>
        from(
          SSSViewApiCall()
        ).pipe(
          map((data) => {
            return _Action.SSSViewActionSuccess(data);
          }),
          catchError((error) => {
            if (error.response && error.response.data && error.response.data['Error Message']) {
              return of(_Action.SSSViewActionFailure(error.response.data['Error Message'])); // Extract error message from the response
            } else {
              return of(_Action.SSSViewActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
          })
        )
      )
  );
  
  export const SSSViewSpecificEpic: Epic = (action$, state$) =>
    action$.pipe(
      ofType(_Action.SSSViewSpecificAction.type),
      switchMap((action: ReturnType<typeof _Action.SSSViewSpecificAction>) =>
        from(
          SSSViewSpecificApiCall(action?.payload)
        ).pipe(
          map((data) => {
            return _Action.SSSViewSpecificActionSuccess(data);
          }),
          catchError((error) => {
            if (error.response && error.response.data && error.response.data['Error Message']) {
              return of(_Action.SSSViewSpecificActionFailure(error.response.data['Error Message'])); // Extract error message from the response
            } else {
              return of(_Action.SSSViewSpecificActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
          })
        )
      )
  );
  
  
  export const SSSCreateEpic: Epic = (action$, state$) =>
    action$.pipe(
      ofType(_Action.SSSCreateAction.type),
      switchMap((action: ReturnType<typeof _Action.SSSCreateAction>) =>
        from(
          SSSCreateApiCall(action?.payload)
        ).pipe(
          map((data) => {
            return _Action.SSSCreateActionSuccess(data);
          }),
          catchError((error) => {
            if (error.response && error.response.data && error.response.data) {
              return of(_Action.SSSCreateActionFailure(`${beautifyJSON(error.response.data)}`)); // Extract error message from the response
            } else {
              return of(_Action.SSSCreateActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
          })
        )
      )
  );
  
  export const SSSEditEpic: Epic = (action$, state$) =>
    action$.pipe(
      ofType(_Action.SSSEditAction.type),
      switchMap((action: ReturnType<typeof _Action.SSSEditAction>) =>
        from(
          SSSEditApiCall(action?.payload)
        ).pipe(
          map((data) => {
            return _Action.SSSEditActionSuccess(data);
          }),
          catchError((error) => {
            if (error.response && error.response.data && error.response.data['Error Message']) {
              return of(_Action.SSSEditActionFailure(error.response.data['Error Message'])); // Extract error message from the response
            } else {
              return of(_Action.SSSEditActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
          })
        )
      )
  );
  
  
// PHILHEALTH API SECTION // PHILHEALTH API SECTION // PHILHEALTH API SECTION // PHILHEALTH API SECTION // PHILHEALTH API SECTION
const PHILHEALTHEditApiCall = async (payload: _Interface.PHILHEALTHEditInterface) => {
    const response = await axios.put(`${APILink}philhealth/${payload.emp_no}/`,
    payload,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
          if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(_Action.PHILHEALTHEditActionProgress(progress));
          }
        }
      }
    );
    return response.data;
  };
  
  const PHILHEALTHCreateApiCall = async (payload: _Interface.PHILHEALTHCreateInterface) => {
    const response = await axios.post(`${APILink}philhealth/`,
    payload,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
          if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(_Action.PHILHEALTHCreateActionProgress(progress));
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
            store.dispatch(_Action.PHILHEALTHViewSpecificActionProgress(progress));
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
            store.dispatch(_Action.PHILHEALTHViewActionProgress(progress));
          }
        }
      }
    );
    return response.data;
  };
  
  export const PHILHEALTHViewEpic: Epic = (action$, state$) =>
    action$.pipe(
      ofType(_Action.PHILHEALTHViewAction.type),
      switchMap(() =>
        from(
          PHILHEALTHViewApiCall()
        ).pipe(
          map((data) => {
            return _Action.PHILHEALTHViewActionSuccess(data);
          }),
          catchError((error) => {
            if (error.response && error.response.data && error.response.data['Error Message']) {
              return of(_Action.PHILHEALTHViewActionFailure(error.response.data['Error Message'])); // Extract error message from the response
            } else {
              return of(_Action.PHILHEALTHViewActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
          })
        )
      )
  );
  
  export const PHILHEALTHViewSpecificEpic: Epic = (action$, state$) =>
    action$.pipe(
      ofType(_Action.PHILHEALTHViewSpecificAction.type),
      switchMap((action: ReturnType<typeof _Action.PHILHEALTHViewSpecificAction>) =>
        from(
          PHILHEALTHViewSpecificApiCall(action?.payload)
        ).pipe(
          map((data) => {
            return _Action.PHILHEALTHViewSpecificActionSuccess(data);
          }),
          catchError((error) => {
            if (error.response && error.response.data && error.response.data['Error Message']) {
              return of(_Action.PHILHEALTHViewSpecificActionFailure(error.response.data['Error Message'])); // Extract error message from the response
            } else {
              return of(_Action.PHILHEALTHViewSpecificActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
          })
        )
      )
  );
  
  
  export const PHILHEALTHCreateEpic: Epic = (action$, state$) =>
    action$.pipe(
      ofType(_Action.PHILHEALTHCreateAction.type),
      switchMap((action: ReturnType<typeof _Action.PHILHEALTHCreateAction>) =>
        from(
          PHILHEALTHCreateApiCall(action?.payload)
        ).pipe(
          map((data) => {
            return _Action.PHILHEALTHCreateActionSuccess(data);
          }),
          catchError((error) => {
            if (error.response && error.response.data && error.response.data) {
              return of(_Action.PHILHEALTHCreateActionFailure(`${beautifyJSON(error.response.data)}`)); // Extract error message from the response
            } else {
              return of(_Action.PHILHEALTHCreateActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
          })
        )
      )
  );
  
  export const PHILHEALTHEditEpic: Epic = (action$, state$) =>
    action$.pipe(
      ofType(_Action.PHILHEALTHEditAction.type),
      switchMap((action: ReturnType<typeof _Action.PHILHEALTHEditAction>) =>
        from(
          PHILHEALTHEditApiCall(action?.payload)
        ).pipe(
          map((data) => {
            return _Action.PHILHEALTHEditActionSuccess(data);
          }),
          catchError((error) => {
            if (error.response && error.response.data && error.response.data['Error Message']) {
              return of(_Action.PHILHEALTHEditActionFailure(error.response.data['Error Message'])); // Extract error message from the response
            } else {
              return of(_Action.PHILHEALTHEditActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
          })
        )
      )
  );
  
  
  





// =====================================================


// CASHADVANCE API SECTION // CASHADVANCE API SECTION // CASHADVANCE API SECTION // CASHADVANCE API SECTION // CASHADVANCE API SECTION
const CASHADVANCEEditApiCall = async (payload: _Interface.CASHADVANCEEditInterface) => {
  const response = await axios.put(`${APILink}ca/${payload.emp_no}/${payload.id}/`,
  payload,
  {
      onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if(progressEvent.total){
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          store.dispatch(_Action.CASHADVANCEEditActionProgress(progress));
        }
      }
    }
  );
  return response.data;
};

const CASHADVANCECreateApiCall = async (payload: _Interface.CASHADVANCECreateInterface) => {
  const response = await axios.post(`${APILink}ca/`,
  payload,
  {
      onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if(progressEvent.total){
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          store.dispatch(_Action.CASHADVANCECreateActionProgress(progress));
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
          store.dispatch(_Action.CASHADVANCEViewSpecificEmployeeActionProgress(progress));
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
          store.dispatch(_Action.CASHADVANCEViewSpecificActionProgress(progress));
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
          store.dispatch(_Action.CASHADVANCEViewActionProgress(progress));
        }
      }
    }
  );
  return response.data;
};

export const CASHADVANCEViewEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(_Action.CASHADVANCEViewAction.type),
    switchMap(() =>
      from(
        CASHADVANCEViewApiCall()
      ).pipe(
        map((data) => {
          return _Action.CASHADVANCEViewActionSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data['Error Message']) {
            return of(_Action.CASHADVANCEViewActionFailure(error.response.data['Error Message'])); // Extract error message from the response
          } else {
            return of(_Action.CASHADVANCEViewActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
          }
        })
      )
    )
);

export const CASHADVANCEViewSpecificEmployeeEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(_Action.CASHADVANCEViewSpecificEmployeeAction.type),
    switchMap((action: ReturnType<typeof _Action.CASHADVANCEViewSpecificEmployeeAction>) =>
      from(
        CASHADVANCEViewSpecificEmployeeApiCall(action?.payload)
      ).pipe(
        map((data) => {
          return _Action.CASHADVANCEViewSpecificEmployeeActionSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data['Error Message']) {
            return of(_Action.CASHADVANCEViewSpecificEmployeeActionFailure(error.response.data['Error Message'])); // Extract error message from the response
          } else {
            return of(_Action.CASHADVANCEViewSpecificEmployeeActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
          }
        })
      )
    )
);

export const CASHADVANCEViewSpecificEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(_Action.CASHADVANCEViewSpecificAction.type),
    switchMap((action: ReturnType<typeof _Action.CASHADVANCEViewSpecificAction>) =>
      from(
        CASHADVANCEViewSpecificApiCall(action?.payload)
      ).pipe(
        map((data) => {
          return _Action.CASHADVANCEViewSpecificActionSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data['Error Message']) {
            return of(_Action.CASHADVANCEViewSpecificActionFailure(error.response.data['Error Message'])); // Extract error message from the response
          } else {
            return of(_Action.CASHADVANCEViewSpecificActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
          }
        })
      )
    )
);


export const CASHADVANCECreateEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(_Action.CASHADVANCECreateAction.type),
    switchMap((action: ReturnType<typeof _Action.CASHADVANCECreateAction>) =>
      from(
        CASHADVANCECreateApiCall(action?.payload)
      ).pipe(
        map((data) => {
          return _Action.CASHADVANCECreateActionSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data) {
            return of(_Action.CASHADVANCECreateActionFailure(`${beautifyJSON(error.response.data)}`)); // Extract error message from the response
          } else {
            return of(_Action.CASHADVANCECreateActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
          }
        })
      )
    )
);

export const CASHADVANCEEditEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(_Action.CASHADVANCEEditAction.type),
    switchMap((action: ReturnType<typeof _Action.CASHADVANCEEditAction>) =>
      from(
        CASHADVANCEEditApiCall(action?.payload)
      ).pipe(
        map((data) => {
          return _Action.CASHADVANCEEditActionSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data['Error Message']) {
            return of(_Action.CASHADVANCEEditActionFailure(error.response.data['Error Message'])); // Extract error message from the response
          } else {
            return of(_Action.CASHADVANCEEditActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
          }
        })
      )
    )
);


// ALLOWANCETYPE API SECTION // ALLOWANCETYPE API SECTION // ALLOWANCETYPE API SECTION // ALLOWANCETYPE API SECTION // ALLOWANCETYPE API SECTION
const ALLOWANCETYPEEditApiCall = async (payload: _Interface.ALLOWANCETYPEEditInterface) => {
    const response = await axios.put(`${APILink}allowance_type/${payload.id}/`,
    payload,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
          if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(_Action.ALLOWANCETYPEEditActionProgress(progress));
          }
        }
      }
    );
    return response.data;
  };
  
  const ALLOWANCETYPECreateApiCall = async (payload: _Interface.ALLOWANCETYPECreateInterface) => {
    const response = await axios.post(`${APILink}allowance_type/`,
    payload,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
          if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(_Action.ALLOWANCETYPECreateActionProgress(progress));
          }
        }
      }
    );
    return response.data;
  };
  
  
  const ALLOWANCETYPEViewSpecificApiCall = async (payload: {at_no: number}) => {
    const response = await axios.get(`${APILink}allowance_type/${payload.at_no}/`,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
          if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(_Action.ALLOWANCETYPEViewSpecificActionProgress(progress));
          }
        }
      }
    );
    return response.data;
  };
  
  
  const ALLOWANCETYPEViewApiCall = async () => {
    const response = await axios.get(`${APILink}allowance_type/`,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
          if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(_Action.ALLOWANCETYPEViewActionProgress(progress));
          }
        }
      }
    );
    return response.data;
  };
  
  export const ALLOWANCETYPEViewEpic: Epic = (action$, state$) =>
    action$.pipe(
      ofType(_Action.ALLOWANCETYPEViewAction.type),
      switchMap(() =>
        from(
          ALLOWANCETYPEViewApiCall()
        ).pipe(
          map((data) => {
            return _Action.ALLOWANCETYPEViewActionSuccess(data);
          }),
          catchError((error) => {
            if (error.response && error.response.data && error.response.data['Error Message']) {
              return of(_Action.ALLOWANCETYPEViewActionFailure(error.response.data['Error Message'])); // Extract error message from the response
            } else {
              return of(_Action.ALLOWANCETYPEViewActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
          })
        )
      )
  );
  
  export const ALLOWANCETYPEViewSpecificEpic: Epic = (action$, state$) =>
    action$.pipe(
      ofType(_Action.ALLOWANCETYPEViewSpecificAction.type),
      switchMap((action: ReturnType<typeof _Action.ALLOWANCETYPEViewSpecificAction>) =>
        from(
          ALLOWANCETYPEViewSpecificApiCall(action?.payload)
        ).pipe(
          map((data) => {
            return _Action.ALLOWANCETYPEViewSpecificActionSuccess(data);
          }),
          catchError((error) => {
            if (error.response && error.response.data && error.response.data['Error Message']) {
              return of(_Action.ALLOWANCETYPEViewSpecificActionFailure(error.response.data['Error Message'])); // Extract error message from the response
            } else {
              return of(_Action.ALLOWANCETYPEViewSpecificActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
          })
        )
      )
  );
  
  
  export const ALLOWANCETYPECreateEpic: Epic = (action$, state$) =>
    action$.pipe(
      ofType(_Action.ALLOWANCETYPECreateAction.type),
      switchMap((action: ReturnType<typeof _Action.ALLOWANCETYPECreateAction>) =>
        from(
          ALLOWANCETYPECreateApiCall(action?.payload)
        ).pipe(
          map((data) => {
            return _Action.ALLOWANCETYPECreateActionSuccess(data);
          }),
          catchError((error) => {
            if (error.response && error.response.data && error.response.data) {
              return of(_Action.ALLOWANCETYPECreateActionFailure(`${beautifyJSON(error.response.data)}`)); // Extract error message from the response
            } else {
              return of(_Action.ALLOWANCETYPECreateActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
          })
        )
      )
  );
  
  export const ALLOWANCETYPEEditEpic: Epic = (action$, state$) =>
    action$.pipe(
      ofType(_Action.ALLOWANCETYPEEditAction.type),
      switchMap((action: ReturnType<typeof _Action.ALLOWANCETYPEEditAction>) =>
        from(
          ALLOWANCETYPEEditApiCall(action?.payload)
        ).pipe(
          map((data) => {
            return _Action.ALLOWANCETYPEEditActionSuccess(data);
          }),
          catchError((error) => {
            if (error.response && error.response.data && error.response.data['Error Message']) {
              return of(_Action.ALLOWANCETYPEEditActionFailure(error.response.data['Error Message'])); // Extract error message from the response
            } else {
              return of(_Action.ALLOWANCETYPEEditActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
          })
        )
      )
  );
  
  
// ALLOWANCEENTRY API SECTION // ALLOWANCEENTRY API SECTION // ALLOWANCEENTRY API SECTION // ALLOWANCEENTRY API SECTION // ALLOWANCEENTRY API SECTION
const ALLOWANCEENTRYEditApiCall = async (payload: _Interface.ALLOWANCEENTRYEditInterface) => {
    const response = await axios.put(`${APILink}allowance_entry/${payload.emp_no}/${payload.id}/`,
    payload,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
          if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(_Action.ALLOWANCEENTRYEditActionProgress(progress));
          }
        }
      }
    );
    return response.data;
  };
  
  const ALLOWANCEENTRYCreateApiCall = async (payload: _Interface.ALLOWANCEENTRYCreateInterface) => {
    const response = await axios.post(`${APILink}allowance_entry/`,
    payload,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
          if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(_Action.ALLOWANCEENTRYCreateActionProgress(progress));
          }
        }
      }
    );
    return response.data;
  };
  
  
  const ALLOWANCEENTRYViewSpecificApiCall = async (payload: {ae_no: number}) => {
    const response = await axios.get(`${APILink}allowance_entry/${payload.ae_no}/`,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
          if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(_Action.ALLOWANCEENTRYViewSpecificActionProgress(progress));
          }
        }
      }
    );
    return response.data;
  };
  
  
  const ALLOWANCEENTRYViewApiCall = async () => {
    const response = await axios.get(`${APILink}allowance_entry/`,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
          if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(_Action.ALLOWANCEENTRYViewActionProgress(progress));
          }
        }
      }
    );
    return response.data;
  };
  
  export const ALLOWANCEENTRYViewEpic: Epic = (action$, state$) =>
    action$.pipe(
      ofType(_Action.ALLOWANCEENTRYViewAction.type),
      switchMap(() =>
        from(
          ALLOWANCEENTRYViewApiCall()
        ).pipe(
          map((data) => {
            return _Action.ALLOWANCEENTRYViewActionSuccess(data);
          }),
          catchError((error) => {
            if (error.response && error.response.data && error.response.data['Error Message']) {
              return of(_Action.ALLOWANCEENTRYViewActionFailure(error.response.data['Error Message'])); // Extract error message from the response
            } else {
              return of(_Action.ALLOWANCEENTRYViewActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
          })
        )
      )
  );
  
  export const ALLOWANCEENTRYViewSpecificEpic: Epic = (action$, state$) =>
    action$.pipe(
      ofType(_Action.ALLOWANCEENTRYViewSpecificAction.type),
      switchMap((action: ReturnType<typeof _Action.ALLOWANCEENTRYViewSpecificAction>) =>
        from(
          ALLOWANCEENTRYViewSpecificApiCall(action?.payload)
        ).pipe(
          map((data) => {
            return _Action.ALLOWANCEENTRYViewSpecificActionSuccess(data);
          }),
          catchError((error) => {
            if (error.response && error.response.data && error.response.data['Error Message']) {
              return of(_Action.ALLOWANCEENTRYViewSpecificActionFailure(error.response.data['Error Message'])); // Extract error message from the response
            } else {
              return of(_Action.ALLOWANCEENTRYViewSpecificActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
          })
        )
      )
  );
  
  
  export const ALLOWANCEENTRYCreateEpic: Epic = (action$, state$) =>
    action$.pipe(
      ofType(_Action.ALLOWANCEENTRYCreateAction.type),
      switchMap((action: ReturnType<typeof _Action.ALLOWANCEENTRYCreateAction>) =>
        from(
          ALLOWANCEENTRYCreateApiCall(action?.payload)
        ).pipe(
          map((data) => {
            return _Action.ALLOWANCEENTRYCreateActionSuccess(data);
          }),
          catchError((error) => {
            if (error.response && error.response.data && error.response.data) {
              return of(_Action.ALLOWANCEENTRYCreateActionFailure(`${beautifyJSON(error.response.data)}`)); // Extract error message from the response
            } else {
              return of(_Action.ALLOWANCEENTRYCreateActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
          })
        )
      )
  );
  
  export const ALLOWANCEENTRYEditEpic: Epic = (action$, state$) =>
    action$.pipe(
      ofType(_Action.ALLOWANCEENTRYEditAction.type),
      switchMap((action: ReturnType<typeof _Action.ALLOWANCEENTRYEditAction>) =>
        from(
          ALLOWANCEENTRYEditApiCall(action?.payload)
        ).pipe(
          map((data) => {
            return _Action.ALLOWANCEENTRYEditActionSuccess(data);
          }),
          catchError((error) => {
            if (error.response && error.response.data && error.response.data['Error Message']) {
              return of(_Action.ALLOWANCEENTRYEditActionFailure(error.response.data['Error Message'])); // Extract error message from the response
            } else {
              return of(_Action.ALLOWANCEENTRYEditActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
          })
        )
      )
  );
  
  