import * as _Action from '../actions/payroll-eoy';
import * as _Interface from '@/types/types-payroll-eoy';
import { ofType, Epic } from 'redux-observable';
import { map, catchError, switchMap, mergeMap } from 'rxjs/operators';
import { of, from } from 'rxjs';
import axios, { AxiosProgressEvent } from 'axios';
import { beautifyJSON } from '@/helpers/utils';
import store, { APILink } from '../configureStore';




// ASSETACCOUNT API SECTION // ASSETACCOUNT API SECTION // ASSETACCOUNT API SECTION // ASSETACCOUNT API SECTION // ASSETACCOUNT API SECTION
const ASSETACCOUNTEditApiCall = async (payload: _Interface.ASSETACCOUNTEditInterface) => {
    const response = await axios.put(`${APILink}asset_account/${payload.id}/`,
    payload,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
          if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(_Action.ASSETACCOUNTEditActionProgress(progress));
          }
        }
      }
    );
    return response.data;
  };
  
  const ASSETACCOUNTCreateApiCall = async (payload: _Interface.ASSETACCOUNTCreateInterface) => {
    const response = await axios.post(`${APILink}asset_account/`,
    payload,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
          if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(_Action.ASSETACCOUNTCreateActionProgress(progress));
          }
        }
      }
    );
    return response.data;
  };
  
  const ASSETACCOUNTViewSpecificEmployeeApiCall = async (payload: {emp_no: number }) => {
    const response = await axios.get(`${APILink}asset_account/${payload.emp_no}/`,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
          if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(_Action.ASSETACCOUNTViewSpecificEmployeeActionProgress(progress));
          }
        }
      }
    );
    return response.data;
  };
  
  
  const ASSETACCOUNTViewSpecificApiCall = async (payload: {asset_account_id: number, emp_no: number }) => {
    const response = await axios.get(`${APILink}asset_account/${payload.emp_no}/${payload.asset_account_id}/`,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
          if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(_Action.ASSETACCOUNTViewSpecificActionProgress(progress));
          }
        }
      }
    );
    return response.data;
  };
  
  
  const ASSETACCOUNTViewApiCall = async () => {
    const response = await axios.get(`${APILink}asset_account/`,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
          if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(_Action.ASSETACCOUNTViewActionProgress(progress));
          }
        }
      }
    );
    return response.data;
  };
  
  export const ASSETACCOUNTViewEpic: Epic = (action$, state$) =>
    action$.pipe(
      ofType(_Action.ASSETACCOUNTViewAction.type),
      switchMap(() =>
        from(
          ASSETACCOUNTViewApiCall()
        ).pipe(
          map((data) => {
            return _Action.ASSETACCOUNTViewActionSuccess(data);
          }),
          catchError((error) => {
            if (error.response && error.response.data && error.response.data['Error Message']) {
              return of(_Action.ASSETACCOUNTViewActionFailure(error.response.data['Error Message'])); // Extract error message from the response
            } else {
              return of(_Action.ASSETACCOUNTViewActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
          })
        )
      )
  );
  
  export const ASSETACCOUNTViewSpecificEpic: Epic = (action$, state$) =>
    action$.pipe(
      ofType(_Action.ASSETACCOUNTViewSpecificAction.type),
      switchMap((action: ReturnType<typeof _Action.ASSETACCOUNTViewSpecificAction>) =>
        from(
          ASSETACCOUNTViewSpecificApiCall(action?.payload)
        ).pipe(
          map((data) => {
            return _Action.ASSETACCOUNTViewSpecificActionSuccess(data);
          }),
          catchError((error) => {
            if (error.response && error.response.data && error.response.data['Error Message']) {
              return of(_Action.ASSETACCOUNTViewSpecificActionFailure(error.response.data['Error Message'])); // Extract error message from the response
            } else {
              return of(_Action.ASSETACCOUNTViewSpecificActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
          })
        )
      )
  );
  
  export const ASSETACCOUNTViewSpecificEmployeeEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(_Action.ASSETACCOUNTViewSpecificEmployeeAction.type),
    switchMap((action: ReturnType<typeof _Action.ASSETACCOUNTViewSpecificEmployeeAction>) =>
      from(
        ASSETACCOUNTViewSpecificEmployeeApiCall(action?.payload)
      ).pipe(
        map((data) => {
          return _Action.ASSETACCOUNTViewSpecificEmployeeActionSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data['Error Message']) {
            return of(_Action.ASSETACCOUNTViewSpecificEmployeeActionFailure(error.response.data['Error Message'])); // Extract error message from the response
          } else {
            return of(_Action.ASSETACCOUNTViewSpecificEmployeeActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
          }
        })
      )
    )
);
  
  export const ASSETACCOUNTCreateEpic: Epic = (action$, state$) =>
    action$.pipe(
      ofType(_Action.ASSETACCOUNTCreateAction.type),
      switchMap((action: ReturnType<typeof _Action.ASSETACCOUNTCreateAction>) =>
        from(
          ASSETACCOUNTCreateApiCall(action?.payload)
        ).pipe(
          map((data) => {
            return _Action.ASSETACCOUNTCreateActionSuccess(data);
          }),
          catchError((error) => {
            if (error.response && error.response.data && error.response.data) {
              return of(_Action.ASSETACCOUNTCreateActionFailure(`${beautifyJSON(error.response.data)}`)); // Extract error message from the response
            } else {
              return of(_Action.ASSETACCOUNTCreateActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
          })
        )
      )
  );
  
  export const ASSETACCOUNTEditEpic: Epic = (action$, state$) =>
    action$.pipe(
      ofType(_Action.ASSETACCOUNTEditAction.type),
      switchMap((action: ReturnType<typeof _Action.ASSETACCOUNTEditAction>) =>
        from(
          ASSETACCOUNTEditApiCall(action?.payload)
        ).pipe(
          map((data) => {
            return _Action.ASSETACCOUNTEditActionSuccess(data);
          }),
          catchError((error) => {
            if (error.response && error.response.data && error.response.data['Error Message']) {
              return of(_Action.ASSETACCOUNTEditActionFailure(error.response.data['Error Message'])); // Extract error message from the response
            } else {
              return of(_Action.ASSETACCOUNTEditActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
          })
        )
      )
  );
  
  
  


// ASSETLIST API SECTION // ASSETLIST API SECTION // ASSETLIST API SECTION // ASSETLIST API SECTION // ASSETLIST API SECTION
const ASSETLISTEditApiCall = async (payload: _Interface.ASSETLISTEditInterface) => {
    const response = await axios.put(`${APILink}asset_list/${payload.id}/`,
    payload,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
          if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(_Action.ASSETLISTEditActionProgress(progress));
          }
        }
      }
    );
    return response.data;
  };
  
  const ASSETLISTCreateApiCall = async (payload: _Interface.ASSETLISTCreateInterface) => {
    const response = await axios.post(`${APILink}asset_list/`,
    payload,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
          if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(_Action.ASSETLISTCreateActionProgress(progress));
          }
        }
      }
    );
    return response.data;
  };
  
  
  const ASSETLISTViewSpecificApiCall = async (payload: {asset_list_id: number}) => {
    const response = await axios.get(`${APILink}asset_list/${payload.asset_list_id}/`,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
          if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(_Action.ASSETLISTViewSpecificActionProgress(progress));
          }
        }
      }
    );
    return response.data;
  };
  
  
  const ASSETLISTViewApiCall = async () => {
    const response = await axios.get(`${APILink}asset_list/`,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
          if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(_Action.ASSETLISTViewActionProgress(progress));
          }
        }
      }
    );
    return response.data;
  };
  
  export const ASSETLISTViewEpic: Epic = (action$, state$) =>
    action$.pipe(
      ofType(_Action.ASSETLISTViewAction.type),
      switchMap(() =>
        from(
          ASSETLISTViewApiCall()
        ).pipe(
          map((data) => {
            return _Action.ASSETLISTViewActionSuccess(data);
          }),
          catchError((error) => {
            if (error.response && error.response.data && error.response.data['Error Message']) {
              return of(_Action.ASSETLISTViewActionFailure(error.response.data['Error Message'])); // Extract error message from the response
            } else {
              return of(_Action.ASSETLISTViewActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
          })
        )
      )
  );
  
  export const ASSETLISTViewSpecificEpic: Epic = (action$, state$) =>
    action$.pipe(
      ofType(_Action.ASSETLISTViewSpecificAction.type),
      switchMap((action: ReturnType<typeof _Action.ASSETLISTViewSpecificAction>) =>
        from(
          ASSETLISTViewSpecificApiCall(action?.payload)
        ).pipe(
          map((data) => {
            return _Action.ASSETLISTViewSpecificActionSuccess(data);
          }),
          catchError((error) => {
            if (error.response && error.response.data && error.response.data['Error Message']) {
              return of(_Action.ASSETLISTViewSpecificActionFailure(error.response.data['Error Message'])); // Extract error message from the response
            } else {
              return of(_Action.ASSETLISTViewSpecificActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
          })
        )
      )
  );
  
  
  export const ASSETLISTCreateEpic: Epic = (action$, state$) =>
    action$.pipe(
      ofType(_Action.ASSETLISTCreateAction.type),
      switchMap((action: ReturnType<typeof _Action.ASSETLISTCreateAction>) =>
        from(
          ASSETLISTCreateApiCall(action?.payload)
        ).pipe(
          map((data) => {
            return _Action.ASSETLISTCreateActionSuccess(data);
          }),
          catchError((error) => {
            if (error.response && error.response.data && error.response.data) {
              return of(_Action.ASSETLISTCreateActionFailure(`${beautifyJSON(error.response.data)}`)); // Extract error message from the response
            } else {
              return of(_Action.ASSETLISTCreateActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
          })
        )
      )
  );
  
  export const ASSETLISTEditEpic: Epic = (action$, state$) =>
    action$.pipe(
      ofType(_Action.ASSETLISTEditAction.type),
      switchMap((action: ReturnType<typeof _Action.ASSETLISTEditAction>) =>
        from(
          ASSETLISTEditApiCall(action?.payload)
        ).pipe(
          map((data) => {
            return _Action.ASSETLISTEditActionSuccess(data);
          }),
          catchError((error) => {
            if (error.response && error.response.data && error.response.data['Error Message']) {
              return of(_Action.ASSETLISTEditActionFailure(error.response.data['Error Message'])); // Extract error message from the response
            } else {
              return of(_Action.ASSETLISTEditActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
          })
        )
      )
  );





// ANNOUNCEMENT API SECTION // ANNOUNCEMENT API SECTION // ANNOUNCEMENT API SECTION // ANNOUNCEMENT API SECTION // ANNOUNCEMENT API SECTION
const ANNOUNCEMENTEditApiCall = async (payload: _Interface.ANNOUNCEMENTEditInterface) => {
  const response = await axios.put(`${APILink}announcement/${payload.id}/`,
  payload,
  {
      onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if(progressEvent.total){
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          store.dispatch(_Action.ANNOUNCEMENTEditActionProgress(progress));
        }
      }
    }
  );
  return response.data;
};
  
const ANNOUNCEMENTCreateApiCall = async (payload: _Interface.ANNOUNCEMENTCreateInterface) => {
  const response = await axios.post(`${APILink}announcement/`,
  payload,
  {
      onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if(progressEvent.total){
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          store.dispatch(_Action.ANNOUNCEMENTCreateActionProgress(progress));
        }
      }
    }
  );
  return response.data;
};

  
const ANNOUNCEMENTViewSpecificApiCall = async (payload: {announcement_id: number}) => {
  const response = await axios.get(`${APILink}announcement/${payload.announcement_id}/`,
  {
      onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if(progressEvent.total){
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          store.dispatch(_Action.ANNOUNCEMENTViewSpecificActionProgress(progress));
        }
      }
    }
  );
  return response.data;
};


const ANNOUNCEMENTViewApiCall = async () => {
  const response = await axios.get(`${APILink}announcement/`,
  {
      onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if(progressEvent.total){
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          store.dispatch(_Action.ANNOUNCEMENTViewActionProgress(progress));
        }
      }
    }
  );
  return response.data;
};

export const ANNOUNCEMENTViewEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(_Action.ANNOUNCEMENTViewAction.type),
    switchMap(() =>
      from(
        ANNOUNCEMENTViewApiCall()
      ).pipe(
        map((data) => {
          return _Action.ANNOUNCEMENTViewActionSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data['Error Message']) {
            return of(_Action.ANNOUNCEMENTViewActionFailure(error.response.data['Error Message'])); // Extract error message from the response
          } else {
            return of(_Action.ANNOUNCEMENTViewActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
          }
        })
      )
    )
);

export const ANNOUNCEMENTViewSpecificEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(_Action.ANNOUNCEMENTViewSpecificAction.type),
    switchMap((action: ReturnType<typeof _Action.ANNOUNCEMENTViewSpecificAction>) =>
      from(
        ANNOUNCEMENTViewSpecificApiCall(action?.payload)
      ).pipe(
        map((data) => {
          return _Action.ANNOUNCEMENTViewSpecificActionSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data['Error Message']) {
            return of(_Action.ANNOUNCEMENTViewSpecificActionFailure(error.response.data['Error Message'])); // Extract error message from the response
          } else {
            return of(_Action.ANNOUNCEMENTViewSpecificActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
          }
        })
      )
    )
);


export const ANNOUNCEMENTCreateEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(_Action.ANNOUNCEMENTCreateAction.type),
    switchMap((action: ReturnType<typeof _Action.ANNOUNCEMENTCreateAction>) =>
      from(
        ANNOUNCEMENTCreateApiCall(action?.payload)
      ).pipe(
        map((data) => {
          return _Action.ANNOUNCEMENTCreateActionSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data) {
            return of(_Action.ANNOUNCEMENTCreateActionFailure(`${beautifyJSON(error.response.data)}`)); // Extract error message from the response
          } else {
            return of(_Action.ANNOUNCEMENTCreateActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
          }
        })
      )
    )
);

export const ANNOUNCEMENTEditEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(_Action.ANNOUNCEMENTEditAction.type),
    switchMap((action: ReturnType<typeof _Action.ANNOUNCEMENTEditAction>) =>
      from(
        ANNOUNCEMENTEditApiCall(action?.payload)
      ).pipe(
        map((data) => {
          return _Action.ANNOUNCEMENTEditActionSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data['Error Message']) {
            return of(_Action.ANNOUNCEMENTEditActionFailure(error.response.data['Error Message'])); // Extract error message from the response
          } else {
            return of(_Action.ANNOUNCEMENTEditActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
          }
        })
      )
    )
);

//ACTIVEANNOUNCEMENT API SECTION
const ACTIVEANNOUNCEMENTViewApiCall = async (payload: {dept: number, rank: number, pin: boolean }) => {
  const response = await axios.get(`${APILink}act_announcement/?department=${payload?.dept}&rank=${payload.rank}&pin=${payload.pin}`,
  {
      onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if(progressEvent.total){
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          store.dispatch(_Action.ACTIVEANNOUNCEMENTViewActionProgress(progress));
        }
      }
    }
  );
  return response.data;
};

export const ACTIVEANNOUNCEMENTViewEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(_Action.ACTIVEANNOUNCEMENTViewAction.type),
    switchMap((action: ReturnType<typeof _Action.ACTIVEANNOUNCEMENTViewAction>) =>
      from(
        ACTIVEANNOUNCEMENTViewApiCall(action?.payload)
      ).pipe(
        map((data) => {
          return _Action.ACTIVEANNOUNCEMENTViewActionSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data['Error Message']) {
            return of(_Action.ACTIVEANNOUNCEMENTViewActionFailure(error.response.data['Error Message'])); // Extract error message from the response
          } else {
            return of(_Action.ACTIVEANNOUNCEMENTViewActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
          }
        })
      )
    )
);


const ANNRANKViewApiCall = async () => {
  const response = await axios.get(`${APILink}ann_rank/`,
  {
      onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
          if(progressEvent.total){
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          store.dispatch(_Action.ANNRANKViewActionProgress(progress));
          }
      }
      }
  );
  return response.data;
};
  
export const ANNRANKViewEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(_Action.ANNRANKViewAction.type),
    switchMap(() =>
    from(
        ANNRANKViewApiCall()
    ).pipe(
        map((data) => {
        return _Action.ANNRANKViewActionSuccess(data);
        }),
        catchError((error) => {
        if (error.response && error.response.data && error.response.data['Error Message']) {
            return of(_Action.ANNRANKViewActionFailure(error.response.data['Error Message'])); 
        } else {
            return of(_Action.ANNRANKViewActionFailure(beautifyJSON(error.response.data))); 
        }
        })
    )
  )
);

const ANNDEPARTMENTViewApiCall = async () => {
  const response = await axios.get(`${APILink}ann_department/`,
  {
      onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
          if(progressEvent.total){
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          store.dispatch(_Action.ANNDEPARTMENTViewActionProgress(progress));
          }
      }
      }
  );
  return response.data;
};
  
export const ANNDEPARTMENTViewEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(_Action.ANNDEPARTMENTViewAction.type),
    switchMap(() =>
    from(
        ANNDEPARTMENTViewApiCall()
    ).pipe(
        map((data) => {
        return _Action.ANNDEPARTMENTViewActionSuccess(data);
        }),
        catchError((error) => {
        if (error.response && error.response.data && error.response.data['Error Message']) {
            return of(_Action.ANNDEPARTMENTViewActionFailure(error.response.data['Error Message'])); 
        } else {
            return of(_Action.ANNDEPARTMENTViewActionFailure(beautifyJSON(error.response.data))); 
        }
        })
    )
  )
);




// TAXCOLLECTED API SECTION // TAXCOLLECTED API SECTION // TAXCOLLECTED API SECTION // TAXCOLLECTED API SECTION // TAXCOLLECTED API SECTION
  const TAXCOLLECTEDViewSpecificEmployeeApiCall = async (payload: {emp_no: number}) => {
    const response = await axios.get(`${APILink}tax_collected/${payload.emp_no}/`,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
          if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(_Action.TAXCOLLECTEDViewSpecificEmployeeActionProgress(progress));
          }
        }
      }
    );
    return response.data;
  };
  
  
  const TAXCOLLECTEDViewApiCall = async () => {
    const response = await axios.get(`${APILink}tax_collected/`,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
          if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(_Action.TAXCOLLECTEDViewActionProgress(progress));
          }
        }
      }
    );
    return response.data;
  };
  
  export const TAXCOLLECTEDViewEpic: Epic = (action$, state$) =>
    action$.pipe(
      ofType(_Action.TAXCOLLECTEDViewAction.type),
      switchMap(() =>
        from(
          TAXCOLLECTEDViewApiCall()
        ).pipe(
          map((data) => {
            return _Action.TAXCOLLECTEDViewActionSuccess(data);
          }),
          catchError((error) => {
            if (error.response && error.response.data && error.response.data['Error Message']) {
              return of(_Action.TAXCOLLECTEDViewActionFailure(error.response.data['Error Message'])); // Extract error message from the response
            } else {
              return of(_Action.TAXCOLLECTEDViewActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
          })
        )
      )
  );
  
  export const TAXCOLLECTEDViewSpecificEmployeeEpic: Epic = (action$, state$) =>
    action$.pipe(
      ofType(_Action.TAXCOLLECTEDViewSpecificEmployeeAction.type),
      switchMap((action: ReturnType<typeof _Action.TAXCOLLECTEDViewSpecificEmployeeAction>) =>
        from(
          TAXCOLLECTEDViewSpecificEmployeeApiCall(action?.payload)
        ).pipe(
          map((data) => {
            return _Action.TAXCOLLECTEDViewSpecificEmployeeActionSuccess(data);
          }),
          catchError((error) => {
            if (error.response && error.response.data && error.response.data['Error Message']) {
              return of(_Action.TAXCOLLECTEDViewSpecificEmployeeActionFailure(error.response.data['Error Message'])); // Extract error message from the response
            } else {
              return of(_Action.TAXCOLLECTEDViewSpecificEmployeeActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
          })
        )
      )
  );


// PAY13TH API SECTION // PAY13TH API SECTION // PAY13TH API SECTION // PAY13TH API SECTION // PAY13TH API SECTION
  const PAY13THCreateApiCall = async (payload: _Interface.PAY13THCreateInterface) => {
    const response = await axios.post(`${APILink}createpay13/`,
    payload,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
          if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(_Action.PAY13THCreateActionProgress(progress));
          }
        }
      }
    );
    return response.data;
  };
  
  
  const PAY13THViewSpecificApiCall = async (payload: {emp_no: number}) => {
    const response = await axios.get(`${APILink}pay13/${payload.emp_no}/`,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
          if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(_Action.PAY13THViewSpecificActionProgress(progress));
          }
        }
      }
    );
    return response.data;
  };
  
  
  const PAY13THViewApiCall = async () => {
    const response = await axios.get(`${APILink}pay13/`,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
          if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(_Action.PAY13THViewActionProgress(progress));
          }
        }
      }
    );
    return response.data;
  };
  
  export const PAY13THViewEpic: Epic = (action$, state$) =>
    action$.pipe(
      ofType(_Action.PAY13THViewAction.type),
      switchMap(() =>
        from(
          PAY13THViewApiCall()
        ).pipe(
          map((data) => {
            return _Action.PAY13THViewActionSuccess(data);
          }),
          catchError((error) => {
            if (error.response && error.response.data && error.response.data['Error Message']) {
              return of(_Action.PAY13THViewActionFailure(error.response.data['Error Message'])); // Extract error message from the response
            } else {
              return of(_Action.PAY13THViewActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
          })
        )
      )
  );
  
  export const PAY13THViewSpecificEpic: Epic = (action$, state$) =>
    action$.pipe(
      ofType(_Action.PAY13THViewSpecificAction.type),
      switchMap((action: ReturnType<typeof _Action.PAY13THViewSpecificAction>) =>
        from(
          PAY13THViewSpecificApiCall(action?.payload)
        ).pipe(
          map((data) => {
            return _Action.PAY13THViewSpecificActionSuccess(data);
          }),
          catchError((error) => {
            if (error.response && error.response.data && error.response.data['Error Message']) {
              return of(_Action.PAY13THViewSpecificActionFailure(error.response.data['Error Message'])); // Extract error message from the response
            } else {
              return of(_Action.PAY13THViewSpecificActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
          })
        )
      )
  );
  
  
  export const PAY13THCreateEpic: Epic = (action$, state$) =>
    action$.pipe(
      ofType(_Action.PAY13THCreateAction.type),
      switchMap((action: ReturnType<typeof _Action.PAY13THCreateAction>) =>
        from(
          PAY13THCreateApiCall(action?.payload)
        ).pipe(
          map((data) => {
            return _Action.PAY13THCreateActionSuccess(data);
          }),
          catchError((error) => {
            if (error.response && error.response.data && error.response.data) {
              return of(_Action.PAY13THCreateActionFailure(`${beautifyJSON(error.response.data)}`)); // Extract error message from the response
            } else {
              return of(_Action.PAY13THCreateActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
          })
        )
      )
  );

// BONUSLIST API SECTION // BONUSLIST API SECTION // BONUSLIST API SECTION // BONUSLIST API SECTION // BONUSLIST API SECTION
const BONUSLISTEditApiCall = async (payload: _Interface.BONUSLISTEditInterface) => {
  const response = await axios.put(`${APILink}bonus_list/${payload.id}/`,
  payload,
  {
      onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if(progressEvent.total){
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          store.dispatch(_Action.BONUSLISTEditActionProgress(progress));
        }
      }
    }
  );
  return response.data;
};

const BONUSLISTCreateApiCall = async (payload: _Interface.BONUSLISTCreateInterface) => {
  const response = await axios.post(`${APILink}bonus_list/`,
  payload,
  {
      onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if(progressEvent.total){
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          store.dispatch(_Action.BONUSLISTCreateActionProgress(progress));
        }
      }
    }
  );
  return response.data;
};


const BONUSLISTViewSpecificApiCall = async (payload: {bl_id: number}) => {
  const response = await axios.get(`${APILink}bonus_list/${payload.bl_id}/`,
  {
      onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if(progressEvent.total){
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          store.dispatch(_Action.BONUSLISTViewSpecificActionProgress(progress));
        }
      }
    }
  );
  return response.data;
};


const BONUSLISTViewApiCall = async () => {
  const response = await axios.get(`${APILink}bonus_list/`,
  {
      onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if(progressEvent.total){
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          store.dispatch(_Action.BONUSLISTViewActionProgress(progress));
        }
      }
    }
  );
  return response.data;
};

export const BONUSLISTViewEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(_Action.BONUSLISTViewAction.type),
    switchMap(() =>
      from(
        BONUSLISTViewApiCall()
      ).pipe(
        map((data) => {
          return _Action.BONUSLISTViewActionSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data['Error Message']) {
            return of(_Action.BONUSLISTViewActionFailure(error.response.data['Error Message'])); // Extract error message from the response
          } else {
            return of(_Action.BONUSLISTViewActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
          }
        })
      )
    )
);

export const BONUSLISTViewSpecificEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(_Action.BONUSLISTViewSpecificAction.type),
    switchMap((action: ReturnType<typeof _Action.BONUSLISTViewSpecificAction>) =>
      from(
        BONUSLISTViewSpecificApiCall(action?.payload)
      ).pipe(
        map((data) => {
          return _Action.BONUSLISTViewSpecificActionSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data['Error Message']) {
            return of(_Action.BONUSLISTViewSpecificActionFailure(error.response.data['Error Message'])); // Extract error message from the response
          } else {
            return of(_Action.BONUSLISTViewSpecificActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
          }
        })
      )
    )
);


export const BONUSLISTCreateEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(_Action.BONUSLISTCreateAction.type),
    switchMap((action: ReturnType<typeof _Action.BONUSLISTCreateAction>) =>
      from(
        BONUSLISTCreateApiCall(action?.payload)
      ).pipe(
        map((data) => {
          return _Action.BONUSLISTCreateActionSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data) {
            return of(_Action.BONUSLISTCreateActionFailure(`${beautifyJSON(error.response.data)}`)); // Extract error message from the response
          } else {
            return of(_Action.BONUSLISTCreateActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
          }
        })
      )
    )
);

export const BONUSLISTEditEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(_Action.BONUSLISTEditAction.type),
    switchMap((action: ReturnType<typeof _Action.BONUSLISTEditAction>) =>
      from(
        BONUSLISTEditApiCall(action?.payload)
      ).pipe(
        map((data) => {
          return _Action.BONUSLISTEditActionSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data['Error Message']) {
            return of(_Action.BONUSLISTEditActionFailure(error.response.data['Error Message'])); // Extract error message from the response
          } else {
            return of(_Action.BONUSLISTEditActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
          }
        })
      )
    )
);


// BONUSENTRY API SECTION // BONUSENTRY API SECTION // BONUSENTRY API SECTION // BONUSENTRY API SECTION // BONUSENTRY API SECTION
const BONUSENTRYEditApiCall = async (payload: _Interface.BONUSENTRYEditInterface) => {
    const response = await axios.put(`${APILink}bonus_entry/${payload.emp_no}/${payload.id}/`,
    payload,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
          if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(_Action.BONUSENTRYEditActionProgress(progress));
          }
        }
      }
    );
    return response.data;
  };
  
  const BONUSENTRYCreateApiCall = async (payload: _Interface.BONUSENTRYCreateInterface) => {
    const response = await axios.post(`${APILink}bonus_entry/`,
    payload,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
          if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(_Action.BONUSENTRYCreateActionProgress(progress));
          }
        }
      }
    );
    return response.data;
  };
  
  const BONUSENTRYViewSpecificEmployeeApiCall = async (payload: {emp_no: number }) => {
    const response = await axios.get(`${APILink}bonus_entry/${payload.emp_no}/`,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
          if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(_Action.BONUSENTRYViewSpecificEmployeeActionProgress(progress));
          }
        }
      }
    );
    return response.data;
  };
  
  
  const BONUSENTRYViewSpecificApiCall = async (payload: {be_id: number, emp_no: number }) => {
    const response = await axios.get(`${APILink}bonus_entry/${payload.emp_no}/${payload.be_id}/`,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
          if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(_Action.BONUSENTRYViewSpecificActionProgress(progress));
          }
        }
      }
    );
    return response.data;
  };
  
  
  const BONUSENTRYViewApiCall = async () => {
    const response = await axios.get(`${APILink}bonus_entry/`,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
          if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(_Action.BONUSENTRYViewActionProgress(progress));
          }
        }
      }
    );
    return response.data;
  };
  
  export const BONUSENTRYViewEpic: Epic = (action$, state$) =>
    action$.pipe(
      ofType(_Action.BONUSENTRYViewAction.type),
      switchMap(() =>
        from(
          BONUSENTRYViewApiCall()
        ).pipe(
          map((data) => {
            return _Action.BONUSENTRYViewActionSuccess(data);
          }),
          catchError((error) => {
            if (error.response && error.response.data && error.response.data['Error Message']) {
              return of(_Action.BONUSENTRYViewActionFailure(error.response.data['Error Message'])); // Extract error message from the response
            } else {
              return of(_Action.BONUSENTRYViewActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
          })
        )
      )
  );
  
  export const BONUSENTRYViewSpecificEpic: Epic = (action$, state$) =>
    action$.pipe(
      ofType(_Action.BONUSENTRYViewSpecificAction.type),
      switchMap((action: ReturnType<typeof _Action.BONUSENTRYViewSpecificAction>) =>
        from(
          BONUSENTRYViewSpecificApiCall(action?.payload)
        ).pipe(
          map((data) => {
            return _Action.BONUSENTRYViewSpecificActionSuccess(data);
          }),
          catchError((error) => {
            if (error.response && error.response.data && error.response.data['Error Message']) {
              return of(_Action.BONUSENTRYViewSpecificActionFailure(error.response.data['Error Message'])); // Extract error message from the response
            } else {
              return of(_Action.BONUSENTRYViewSpecificActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
          })
        )
      )
  );
  
  export const BONUSENTRYViewSpecificEmployeeEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(_Action.BONUSENTRYViewSpecificEmployeeAction.type),
    switchMap((action: ReturnType<typeof _Action.BONUSENTRYViewSpecificEmployeeAction>) =>
      from(
        BONUSENTRYViewSpecificEmployeeApiCall(action?.payload)
      ).pipe(
        map((data) => {
          return _Action.BONUSENTRYViewSpecificEmployeeActionSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data['Error Message']) {
            return of(_Action.BONUSENTRYViewSpecificEmployeeActionFailure(error.response.data['Error Message'])); // Extract error message from the response
          } else {
            return of(_Action.BONUSENTRYViewSpecificEmployeeActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
          }
        })
      )
    )
);
  
  export const BONUSENTRYCreateEpic: Epic = (action$, state$) =>
    action$.pipe(
      ofType(_Action.BONUSENTRYCreateAction.type),
      switchMap((action: ReturnType<typeof _Action.BONUSENTRYCreateAction>) =>
        from(
          BONUSENTRYCreateApiCall(action?.payload)
        ).pipe(
          map((data) => {
            return _Action.BONUSENTRYCreateActionSuccess(data);
          }),
          catchError((error) => {
            if (error.response && error.response.data && error.response.data) {
              return of(_Action.BONUSENTRYCreateActionFailure(`${beautifyJSON(error.response.data)}`)); // Extract error message from the response
            } else {
              return of(_Action.BONUSENTRYCreateActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
          })
        )
      )
  );
  
  export const BONUSENTRYEditEpic: Epic = (action$, state$) =>
    action$.pipe(
      ofType(_Action.BONUSENTRYEditAction.type),
      switchMap((action: ReturnType<typeof _Action.BONUSENTRYEditAction>) =>
        from(
          BONUSENTRYEditApiCall(action?.payload)
        ).pipe(
          map((data) => {
            return _Action.BONUSENTRYEditActionSuccess(data);
          }),
          catchError((error) => {
            if (error.response && error.response.data && error.response.data['Error Message']) {
              return of(_Action.BONUSENTRYEditActionFailure(error.response.data['Error Message'])); // Extract error message from the response
            } else {
              return of(_Action.BONUSENTRYEditActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
          })
        )
      )
  );
  