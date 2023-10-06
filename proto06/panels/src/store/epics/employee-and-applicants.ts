import * as _Action from '../actions/employee-and-applicants';
import * as _Interface from '@/types/types-employee-and-applicants';
import { ofType, Epic } from 'redux-observable';
import { map, catchError, switchMap, mergeMap } from 'rxjs/operators';
import { of, from } from 'rxjs';
import axios, { AxiosProgressEvent } from 'axios';
import { beautifyJSON } from '@/helpers/utils';
import store, { JSONServer } from '../configureStore';




// KPICORE API SECTION // KPICORE API SECTION // KPICORE API SECTION // KPICORE API SECTION // KPICORE API SECTION
const KPICOREEditApiCall = async (payload: _Interface.KPICOREEditInterface) => {
    const response = await axios.put(`${JSONServer}kpi_core/${payload.id}/`,
    payload,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
          if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(_Action.KPICOREEditActionProgress(progress));
          }
        }
      }
    );
    return response.data;
};
  
const KPICORECreateApiCall = async (payload: _Interface.KPICORECreateInterface) => {
    const response = await axios.post(`${JSONServer}kpi_core/`,
    payload,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
            if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(_Action.KPICORECreateActionProgress(progress));
            }
        }
        }
    );
    return response.data;
};

const KPICOREViewSpecificApiCall = async (payload: {kpi_core_id: number }) => {
    const response = await axios.get(`${JSONServer}kpi_core/${payload.kpi_core_id}/`,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
            if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(_Action.KPICOREViewSpecificActionProgress(progress));
            }
        }
        }
    );
    return response.data;
};


const KPICOREViewApiCall = async () => {
    const response = await axios.get(`${JSONServer}kpi_core/`,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
            if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(_Action.KPICOREViewActionProgress(progress));
            }
        }
        }
    );
    return response.data;
};

export const KPICOREViewEpic: Epic = (action$, state$) =>
    action$.pipe(
        ofType(_Action.KPICOREViewAction.type),
        switchMap(() =>
        from(
            KPICOREViewApiCall()
        ).pipe(
            map((data) => {
            return _Action.KPICOREViewActionSuccess(data);
            }),
            catchError((error) => {
            if (error.response && error.response.data && error.response.data['Error Message']) {
                return of(_Action.KPICOREViewActionFailure(error.response.data['Error Message'])); // Extract error message from the response
            } else {
                return of(_Action.KPICOREViewActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
            })
        )
        )
);

export const KPICOREViewSpecificEpic: Epic = (action$, state$) =>
    action$.pipe(
        ofType(_Action.KPICOREViewSpecificAction.type),
        switchMap((action: ReturnType<typeof _Action.KPICOREViewSpecificAction>) =>
        from(
            KPICOREViewSpecificApiCall(action?.payload)
        ).pipe(
            map((data) => {
            return _Action.KPICOREViewSpecificActionSuccess(data);
            }),
            catchError((error) => {
            if (error.response && error.response.data && error.response.data['Error Message']) {
                return of(_Action.KPICOREViewSpecificActionFailure(error.response.data['Error Message'])); // Extract error message from the response
            } else {
                return of(_Action.KPICOREViewSpecificActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
            })
        )
        )
);


export const KPICORECreateEpic: Epic = (action$, state$) =>
    action$.pipe(
        ofType(_Action.KPICORECreateAction.type),
        switchMap((action: ReturnType<typeof _Action.KPICORECreateAction>) =>
        from(
            KPICORECreateApiCall(action?.payload)
        ).pipe(
            map((data) => {
            return _Action.KPICORECreateActionSuccess(data);
            }),
            catchError((error) => {
            if (error.response && error.response.data && error.response.data) {
                return of(_Action.KPICORECreateActionFailure(`${beautifyJSON(error.response.data)}`)); // Extract error message from the response
            } else {
                return of(_Action.KPICORECreateActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
            })
        )
        )
);

export const KPICOREEditEpic: Epic = (action$, state$) =>
    action$.pipe(
        ofType(_Action.KPICOREEditAction.type),
        switchMap((action: ReturnType<typeof _Action.KPICOREEditAction>) =>
        from(
            KPICOREEditApiCall(action?.payload)
        ).pipe(
            map((data) => {
            return _Action.KPICOREEditActionSuccess(data);
            }),
            catchError((error) => {
            if (error.response && error.response.data && error.response.data['Error Message']) {
                return of(_Action.KPICOREEditActionFailure(error.response.data['Error Message'])); // Extract error message from the response
            } else {
                return of(_Action.KPICOREEditActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
            })
        )
        )
);

  
// CORECOMPE API SECTION // CORECOMPE API SECTION // CORECOMPE API SECTION // CORECOMPE API SECTION // CORECOMPE API SECTION
const CORECOMPEEditApiCall = async (payload: _Interface.CORECOMPEEditInterface) => {
    const response = await axios.put(`${JSONServer}core_compe/${payload.id}/`,
    payload,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
          if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(_Action.CORECOMPEEditActionProgress(progress));
          }
        }
      }
    );
    return response.data;
};
  
const CORECOMPECreateApiCall = async (payload: _Interface.CORECOMPECreateInterface) => {
    const response = await axios.post(`${JSONServer}core_compe/`,
    payload,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
            if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(_Action.CORECOMPECreateActionProgress(progress));
            }
        }
        }
    );
    return response.data;
};

const CORECOMPEViewSpecificApiCall = async (payload: {core_compe_id: number }) => {
    const response = await axios.get(`${JSONServer}core_compe/${payload.core_compe_id}/`,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
            if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(_Action.CORECOMPEViewSpecificActionProgress(progress));
            }
        }
        }
    );
    return response.data;
};


const CORECOMPEViewApiCall = async () => {
    const response = await axios.get(`${JSONServer}core_compe/`,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
            if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(_Action.CORECOMPEViewActionProgress(progress));
            }
        }
        }
    );
    return response.data;
};

export const CORECOMPEViewEpic: Epic = (action$, state$) =>
    action$.pipe(
        ofType(_Action.CORECOMPEViewAction.type),
        switchMap(() =>
        from(
            CORECOMPEViewApiCall()
        ).pipe(
            map((data) => {
            return _Action.CORECOMPEViewActionSuccess(data);
            }),
            catchError((error) => {
            if (error.response && error.response.data && error.response.data['Error Message']) {
                return of(_Action.CORECOMPEViewActionFailure(error.response.data['Error Message'])); // Extract error message from the response
            } else {
                return of(_Action.CORECOMPEViewActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
            })
        )
        )
);

export const CORECOMPEViewSpecificEpic: Epic = (action$, state$) =>
    action$.pipe(
        ofType(_Action.CORECOMPEViewSpecificAction.type),
        switchMap((action: ReturnType<typeof _Action.CORECOMPEViewSpecificAction>) =>
        from(
            CORECOMPEViewSpecificApiCall(action?.payload)
        ).pipe(
            map((data) => {
            return _Action.CORECOMPEViewSpecificActionSuccess(data);
            }),
            catchError((error) => {
            if (error.response && error.response.data && error.response.data['Error Message']) {
                return of(_Action.CORECOMPEViewSpecificActionFailure(error.response.data['Error Message'])); // Extract error message from the response
            } else {
                return of(_Action.CORECOMPEViewSpecificActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
            })
        )
        )
);


export const CORECOMPECreateEpic: Epic = (action$, state$) =>
    action$.pipe(
        ofType(_Action.CORECOMPECreateAction.type),
        switchMap((action: ReturnType<typeof _Action.CORECOMPECreateAction>) =>
        from(
            CORECOMPECreateApiCall(action?.payload)
        ).pipe(
            map((data) => {
            return _Action.CORECOMPECreateActionSuccess(data);
            }),
            catchError((error) => {
            if (error.response && error.response.data && error.response.data) {
                return of(_Action.CORECOMPECreateActionFailure(`${beautifyJSON(error.response.data)}`)); // Extract error message from the response
            } else {
                return of(_Action.CORECOMPECreateActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
            })
        )
        )
);

export const CORECOMPEEditEpic: Epic = (action$, state$) =>
    action$.pipe(
        ofType(_Action.CORECOMPEEditAction.type),
        switchMap((action: ReturnType<typeof _Action.CORECOMPEEditAction>) =>
        from(
            CORECOMPEEditApiCall(action?.payload)
        ).pipe(
            map((data) => {
            return _Action.CORECOMPEEditActionSuccess(data);
            }),
            catchError((error) => {
            if (error.response && error.response.data && error.response.data['Error Message']) {
                return of(_Action.CORECOMPEEditActionFailure(error.response.data['Error Message'])); // Extract error message from the response
            } else {
                return of(_Action.CORECOMPEEditActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
            })
        )
        )
);

  
// EVALQUESTIONS API SECTION // EVALQUESTIONS API SECTION // EVALQUESTIONS API SECTION // EVALQUESTIONS API SECTION // EVALQUESTIONS API SECTION
const EVALQUESTIONSEditApiCall = async (payload: _Interface.EVALQUESTIONSEditInterface) => {
    const response = await axios.put(`${JSONServer}eval_questions/${payload.id}/`,
    payload,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
          if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(_Action.EVALQUESTIONSEditActionProgress(progress));
          }
        }
      }
    );
    return response.data;
};
  
const EVALQUESTIONSCreateApiCall = async (payload: _Interface.EVALQUESTIONSCreateInterface) => {
    const response = await axios.post(`${JSONServer}eval_questions/`,
    payload,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
            if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(_Action.EVALQUESTIONSCreateActionProgress(progress));
            }
        }
        }
    );
    return response.data;
};

const EVALQUESTIONSViewSpecificApiCall = async (payload: {eval_questions_id: number }) => {
    const response = await axios.get(`${JSONServer}eval_questions/${payload.eval_questions_id}/`,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
            if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(_Action.EVALQUESTIONSViewSpecificActionProgress(progress));
            }
        }
        }
    );
    return response.data;
};


const EVALQUESTIONSViewApiCall = async () => {
    const response = await axios.get(`${JSONServer}eval_questions/`,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
            if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(_Action.EVALQUESTIONSViewActionProgress(progress));
            }
        }
        }
    );
    return response.data;
};

export const EVALQUESTIONSViewEpic: Epic = (action$, state$) =>
    action$.pipe(
        ofType(_Action.EVALQUESTIONSViewAction.type),
        switchMap(() =>
        from(
            EVALQUESTIONSViewApiCall()
        ).pipe(
            map((data) => {
            return _Action.EVALQUESTIONSViewActionSuccess(data);
            }),
            catchError((error) => {
            if (error.response && error.response.data && error.response.data['Error Message']) {
                return of(_Action.EVALQUESTIONSViewActionFailure(error.response.data['Error Message'])); // Extract error message from the response
            } else {
                return of(_Action.EVALQUESTIONSViewActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
            })
        )
        )
);

export const EVALQUESTIONSViewSpecificEpic: Epic = (action$, state$) =>
    action$.pipe(
        ofType(_Action.EVALQUESTIONSViewSpecificAction.type),
        switchMap((action: ReturnType<typeof _Action.EVALQUESTIONSViewSpecificAction>) =>
        from(
            EVALQUESTIONSViewSpecificApiCall(action?.payload)
        ).pipe(
            map((data) => {
            return _Action.EVALQUESTIONSViewSpecificActionSuccess(data);
            }),
            catchError((error) => {
            if (error.response && error.response.data && error.response.data['Error Message']) {
                return of(_Action.EVALQUESTIONSViewSpecificActionFailure(error.response.data['Error Message'])); // Extract error message from the response
            } else {
                return of(_Action.EVALQUESTIONSViewSpecificActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
            })
        )
        )
);


export const EVALQUESTIONSCreateEpic: Epic = (action$, state$) =>
    action$.pipe(
        ofType(_Action.EVALQUESTIONSCreateAction.type),
        switchMap((action: ReturnType<typeof _Action.EVALQUESTIONSCreateAction>) =>
        from(
            EVALQUESTIONSCreateApiCall(action?.payload)
        ).pipe(
            map((data) => {
            return _Action.EVALQUESTIONSCreateActionSuccess(data);
            }),
            catchError((error) => {
            if (error.response && error.response.data && error.response.data) {
                return of(_Action.EVALQUESTIONSCreateActionFailure(`${beautifyJSON(error.response.data)}`)); // Extract error message from the response
            } else {
                return of(_Action.EVALQUESTIONSCreateActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
            })
        )
        )
);

export const EVALQUESTIONSEditEpic: Epic = (action$, state$) =>
    action$.pipe(
        ofType(_Action.EVALQUESTIONSEditAction.type),
        switchMap((action: ReturnType<typeof _Action.EVALQUESTIONSEditAction>) =>
        from(
            EVALQUESTIONSEditApiCall(action?.payload)
        ).pipe(
            map((data) => {
            return _Action.EVALQUESTIONSEditActionSuccess(data);
            }),
            catchError((error) => {
            if (error.response && error.response.data && error.response.data['Error Message']) {
                return of(_Action.EVALQUESTIONSEditActionFailure(error.response.data['Error Message'])); // Extract error message from the response
            } else {
                return of(_Action.EVALQUESTIONSEditActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
            })
        )
        )
);

  