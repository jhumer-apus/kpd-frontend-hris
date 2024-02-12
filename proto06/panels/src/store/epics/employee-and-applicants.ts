import * as _Action from '../actions/employee-and-applicants';
import * as _Interface from '@/types/types-employee-and-applicants';
import { ofType, Epic } from 'redux-observable';
import { map, catchError, switchMap, mergeMap } from 'rxjs/operators';
import { of, from } from 'rxjs';
import axios, { AxiosProgressEvent } from 'axios';
import { beautifyJSON } from '@/helpers/utils';
import store, { APILink } from '../configureStore';




// KPICORE API SECTION // KPICORE API SECTION // KPICORE API SECTION // KPICORE API SECTION // KPICORE API SECTION
const KPICOREUpdateSelfApiCall = async (payload: _Interface.KPICOREUpdateSelfInterface) => {
    const response = await axios.put(`${APILink}emp_kpi_self/`,
    payload,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
          if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(_Action.KPICOREUpdateSelfActionProgress(progress));
          }
        }
      }
    );
    return response.data;
};


const KPICOREUpdateSupervisorApiCall = async (payload: _Interface.KPICOREUpdateSupervisorInterface) => {
    const response = await axios.put(`${APILink}emp_kpi_core_sup/`,
    payload,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
          if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(_Action.KPICOREUpdateSupervisorActionProgress(progress));
          }
        }
      }
    );
    return response.data;
};


const KPICOREEditApiCall = async (payload: _Interface.KPICOREEditInterface) => {
    const response = await axios.put(`${APILink}emp_kpi_core/${payload.id}/`,
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
    const response = await axios.post(`${APILink}emp_kpi_core/`,
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

const KPICOREViewSpecificEmployeeApiCall = async (payload: {emp_no: number }) => {
    const response = await axios.get(`${APILink}emp_kpi_core?emp_no=${payload.emp_no}`,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
            if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(_Action.KPICOREViewSpecificEmployeeActionProgress(progress));
            }
        }
        }
    );
    return response.data;
};


const KPICOREViewSpecificApiCall = async (payload: {emp_kpi_core_id: number }) => {
    const response = await axios.get(`${APILink}emp_kpi_core/${payload.emp_kpi_core_id}/`,
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
    const response = await axios.get(`${APILink}emp_kpi_core/`,
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

export const KPICOREViewSpecificEmployeeEpic: Epic = (action$, state$) =>
    action$.pipe(
        ofType(_Action.KPICOREViewSpecificEmployeeAction.type),
        switchMap((action: ReturnType<typeof _Action.KPICOREViewSpecificEmployeeAction>) =>
        from(
            KPICOREViewSpecificEmployeeApiCall(action?.payload)
        ).pipe(
            map((data) => {
            return _Action.KPICOREViewSpecificEmployeeActionSuccess(data);
            }),
            catchError((error) => {
            if (error.response && error.response.data && error.response.data['Error Message']) {
                return of(_Action.KPICOREViewSpecificEmployeeActionFailure(error.response.data['Error Message'])); // Extract error message from the response
            } else {
                return of(_Action.KPICOREViewSpecificEmployeeActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
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



export const KPICOREUpdateSupervisorEpic: Epic = (action$, state$) =>
    action$.pipe(
        ofType(_Action.KPICOREUpdateSupervisorAction.type),
        switchMap((action: ReturnType<typeof _Action.KPICOREUpdateSupervisorAction>) =>
        from(
            KPICOREUpdateSupervisorApiCall(action?.payload)
        ).pipe(
            map((data) => {
            return _Action.KPICOREUpdateSupervisorActionSuccess(data);
            }),
            catchError((error) => {
            if (error.response && error.response.data && error.response.data['Error Message']) {
                return of(_Action.KPICOREUpdateSupervisorActionFailure(error.response.data['Error Message'])); // Extract error message from the response
            } else {
                return of(_Action.KPICOREUpdateSupervisorActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
            })
        )
        )
);

export const KPICOREUpdateSelfEpic: Epic = (action$, state$) =>
    action$.pipe(
        ofType(_Action.KPICOREUpdateSelfAction.type),
        switchMap((action: ReturnType<typeof _Action.KPICOREUpdateSelfAction>) =>
        from(
            KPICOREUpdateSelfApiCall(action?.payload)
        ).pipe(
            map((data) => {
            return _Action.KPICOREUpdateSelfActionSuccess(data);
            }),
            catchError((error) => {
            if (error.response && error.response.data && error.response.data['Error Message']) {
                return of(_Action.KPICOREUpdateSelfActionFailure(error.response.data['Error Message'])); // Extract error message from the response
            } else {
                return of(_Action.KPICOREUpdateSelfActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
            })
        )
        )
);

  
// CORECOMPE API SECTION // CORECOMPE API SECTION // CORECOMPE API SECTION // CORECOMPE API SECTION // CORECOMPE API SECTION
const CORECOMPEDeleteApiCall = async (payload: {cc_id: number, curr_user: number}) => {
    const response = await axios.delete(`${APILink}core/${payload.cc_id}/?added_by=${payload.curr_user}`, //payload
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
          if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(_Action.CORECOMPEDeleteActionProgress(progress));
          }
        }
      }
    );
    return response.data;
};


const CORECOMPEEditApiCall = async (payload: _Interface.CORECOMPEEditInterface) => {
    const response = await axios.put(`${APILink}core/${payload.id}/`,
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
    const response = await axios.post(`${APILink}core/`,
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

const CORECOMPEViewSpecificApiCall = async (payload: {core_id: number }) => {
    const response = await axios.get(`${APILink}core/${payload.core_id}/`,
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
    const response = await axios.get(`${APILink}core/`,
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


export const CORECOMPEDeleteEpic: Epic = (action$, state$) =>
    action$.pipe(
        ofType(_Action.CORECOMPEDeleteAction.type),
        switchMap((action: ReturnType<typeof _Action.CORECOMPEDeleteAction>) =>
        from(
            CORECOMPEDeleteApiCall(action?.payload)
        ).pipe(
            map((data) => {
            return _Action.CORECOMPEDeleteActionSuccess(data);
            }),
            catchError((error) => {
            if (error.response && error.response.data && error.response.data['Error Message']) {
                return of(_Action.CORECOMPEDeleteActionFailure(error.response.data['Error Message'])); // Extract error message from the response
            } else {
                return of(_Action.CORECOMPEDeleteActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
            })
        )
        )
);


  
// EVALQUESTIONS API SECTION // EVALQUESTIONS API SECTION // EVALQUESTIONS API SECTION // EVALQUESTIONS API SECTION // EVALQUESTIONS API SECTION
const EVALQUESTIONSDeleteApiCall = async (payload: {eq_id: number, curr_user: number}) => {
    const response = await axios.delete(`${APILink}kpi/${payload.eq_id}/?added_by=${payload.curr_user}`, //payload
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
          if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(_Action.EVALQUESTIONSDeleteActionProgress(progress));
          }
        }
      }
    );
    return response.data;
};



const EVALQUESTIONSEditApiCall = async (payload: _Interface.EVALQUESTIONSEditInterface) => {
    const response = await axios.put(`${APILink}kpi/${payload.id}/`,
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
    const response = await axios.post(`${APILink}kpi/`,
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

const EVALQUESTIONSViewSpecificApiCall = async (payload: {kpi_id: number }) => {
    const response = await axios.get(`${APILink}kpi/${payload.kpi_id}/`,
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
    const response = await axios.get(`${APILink}kpi/`,
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

export const EVALQUESTIONSDeleteEpic: Epic = (action$, state$) =>
    action$.pipe(
        ofType(_Action.EVALQUESTIONSDeleteAction.type),
        switchMap((action: ReturnType<typeof _Action.EVALQUESTIONSDeleteAction>) =>
        from(
            EVALQUESTIONSDeleteApiCall(action?.payload)
        ).pipe(
            map((data) => {
            return _Action.EVALQUESTIONSDeleteActionSuccess(data);
            }),
            catchError((error) => {
            if (error.response && error.response.data && error.response.data['Error Message']) {
                return of(_Action.EVALQUESTIONSDeleteActionFailure(error.response.data['Error Message'])); // Extract error message from the response
            } else {
                return of(_Action.EVALQUESTIONSDeleteActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
            })
        )
        )
);



  

// ONBOARDINGSTATUS API SECTION // ONBOARDINGSTATUS API SECTION // ONBOARDINGSTATUS API SECTION // ONBOARDINGSTATUS API SECTION // ONBOARDINGSTATUS API SECTION
const ONBOARDINGSTATUSUpdateApiCall = async (payload: _Interface.ONBOARDINGSTATUSUpdateInterface) => {
    const response = await axios.put(`${APILink}update_onboard/`,
    payload,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
          if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(_Action.ONBOARDINGSTATUSUpdateActionProgress(progress));
          }
        }
      }
    );
    return response.data;
};

const ONBOARDINGSTATUSEditApiCall = async (payload: _Interface.ONBOARDINGSTATUSEditInterface) => {
    const response = await axios.put(`${APILink}onboarding/${payload.id}/`,
    payload,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
          if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(_Action.ONBOARDINGSTATUSEditActionProgress(progress));
          }
        }
      }
    );
    return response.data;
};
  
const ONBOARDINGSTATUSCreateApiCall = async (payload: _Interface.ONBOARDINGSTATUSCreateInterface) => {
    const response = await axios.post(`${APILink}onboarding/`,
    payload,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
            if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(_Action.ONBOARDINGSTATUSCreateActionProgress(progress));
            }
        }
        }
    );
    return response.data;
};

const ONBOARDINGSTATUSViewSpecificApiCall = async (payload: {onboarding_status_id: number }) => {
    const response = await axios.get(`${APILink}onboarding/${payload.onboarding_status_id}/`,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
            if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(_Action.ONBOARDINGSTATUSViewSpecificActionProgress(progress));
            }
        }
        }
    );
    return response.data;
};


const ONBOARDINGSTATUSViewApiCall = async () => {
    const response = await axios.get(`${APILink}onboarding/`,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
            if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(_Action.ONBOARDINGSTATUSViewActionProgress(progress));
            }
        }
        }
    );
    return response.data;
};

export const ONBOARDINGSTATUSViewEpic: Epic = (action$, state$) =>
    action$.pipe(
        ofType(_Action.ONBOARDINGSTATUSViewAction.type),
        switchMap(() =>
        from(
            ONBOARDINGSTATUSViewApiCall()
        ).pipe(
            map((data) => {
            return _Action.ONBOARDINGSTATUSViewActionSuccess(data);
            }),
            catchError((error) => {
            if (error.response && error.response.data && error.response.data['Error Message']) {
                return of(_Action.ONBOARDINGSTATUSViewActionFailure(error.response.data['Error Message'])); // Extract error message from the response
            } else {
                return of(_Action.ONBOARDINGSTATUSViewActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
            })
        )
        )
);

export const ONBOARDINGSTATUSViewSpecificEpic: Epic = (action$, state$) =>
    action$.pipe(
        ofType(_Action.ONBOARDINGSTATUSViewSpecificAction.type),
        switchMap((action: ReturnType<typeof _Action.ONBOARDINGSTATUSViewSpecificAction>) =>
        from(
            ONBOARDINGSTATUSViewSpecificApiCall(action?.payload)
        ).pipe(
            map((data) => {
            return _Action.ONBOARDINGSTATUSViewSpecificActionSuccess(data);
            }),
            catchError((error) => {
            if (error.response && error.response.data && error.response.data['Error Message']) {
                return of(_Action.ONBOARDINGSTATUSViewSpecificActionFailure(error.response.data['Error Message'])); // Extract error message from the response
            } else {
                return of(_Action.ONBOARDINGSTATUSViewSpecificActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
            })
        )
        )
);


export const ONBOARDINGSTATUSCreateEpic: Epic = (action$, state$) =>
    action$.pipe(
        ofType(_Action.ONBOARDINGSTATUSCreateAction.type),
        switchMap((action: ReturnType<typeof _Action.ONBOARDINGSTATUSCreateAction>) =>
        from(
            ONBOARDINGSTATUSCreateApiCall(action?.payload)
        ).pipe(
            map((data) => {
            return _Action.ONBOARDINGSTATUSCreateActionSuccess(data);
            }),
            catchError((error) => {
            if (error.response && error.response.data && error.response.data) {
                return of(_Action.ONBOARDINGSTATUSCreateActionFailure(`${beautifyJSON(error.response.data)}`)); // Extract error message from the response
            } else {
                return of(_Action.ONBOARDINGSTATUSCreateActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
            })
        )
        )
);

export const ONBOARDINGSTATUSEditEpic: Epic = (action$, state$) =>
    action$.pipe(
        ofType(_Action.ONBOARDINGSTATUSEditAction.type),
        switchMap((action: ReturnType<typeof _Action.ONBOARDINGSTATUSEditAction>) =>
        from(
            ONBOARDINGSTATUSEditApiCall(action?.payload)
        ).pipe(
            map((data) => {
            return _Action.ONBOARDINGSTATUSEditActionSuccess(data);
            }),
            catchError((error) => {
            if (error.response && error.response.data && error.response.data['Error Message']) {
                return of(_Action.ONBOARDINGSTATUSEditActionFailure(error.response.data['Error Message'])); // Extract error message from the response
            } else {
                return of(_Action.ONBOARDINGSTATUSEditActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
            })
        )
        )
);

export const ONBOARDINGSTATUSUpdateEpic: Epic = (action$, state$) =>
    action$.pipe(
        ofType(_Action.ONBOARDINGSTATUSUpdateAction.type),
        switchMap((action: ReturnType<typeof _Action.ONBOARDINGSTATUSUpdateAction>) =>
        from(
            ONBOARDINGSTATUSUpdateApiCall(action?.payload)
        ).pipe(
            map((data) => {
            return _Action.ONBOARDINGSTATUSUpdateActionSuccess(data);
            }),
            catchError((error) => {
            if (error.response && error.response.data && error.response.data['Error Message']) {
                return of(_Action.ONBOARDINGSTATUSUpdateActionFailure(error.response.data['Error Message'])); // Extract error message from the response
            } else {
                return of(_Action.ONBOARDINGSTATUSUpdateActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
            })
        )
        )
);


// ONBOARDINGREQUIREMENTS API SECTION // ONBOARDINGREQUIREMENTS API SECTION // ONBOARDINGREQUIREMENTS API SECTION // ONBOARDINGREQUIREMENTS API SECTION // ONBOARDINGREQUIREMENTS API SECTION
const ONBOARDINGREQUIREMENTSDeleteApiCall = async (payload: {or_id: number, curr_user: number}) => {
    const response = await axios.delete(`${APILink}onboard_req/${payload.or_id}/?added_by=${payload.curr_user}`, //payload
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
          if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(_Action.ONBOARDINGREQUIREMENTSDeleteActionProgress(progress));
          }
        }
      }
    );
    return response.data;
};

const ONBOARDINGREQUIREMENTSEditApiCall = async (payload: _Interface.ONBOARDINGREQUIREMENTSEditInterface) => {
    const response = await axios.put(`${APILink}onboard_req/${payload.id}/`,
    payload,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
          if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(_Action.ONBOARDINGREQUIREMENTSEditActionProgress(progress));
          }
        }
      }
    );
    return response.data;
};
  
const ONBOARDINGREQUIREMENTSCreateApiCall = async (payload: _Interface.ONBOARDINGREQUIREMENTSCreateInterface) => {
    const response = await axios.post(`${APILink}onboard_req/`,
    payload,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
            if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(_Action.ONBOARDINGREQUIREMENTSCreateActionProgress(progress));
            }
        }
        }
    );
    return response.data;
};

const ONBOARDINGREQUIREMENTSViewSpecificApiCall = async (payload: {onboarding_requirements_id: number }) => {
    const response = await axios.get(`${APILink}onboard_req/${payload.onboarding_requirements_id}/`,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
            if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(_Action.ONBOARDINGREQUIREMENTSViewSpecificActionProgress(progress));
            }
        }
        }
    );
    return response.data;
};


const ONBOARDINGREQUIREMENTSViewApiCall = async () => {
    const response = await axios.get(`${APILink}onboard_req/`,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
            if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(_Action.ONBOARDINGREQUIREMENTSViewActionProgress(progress));
            }
        }
        }
    );
    return response.data;
};

export const ONBOARDINGREQUIREMENTSViewEpic: Epic = (action$, state$) =>
    action$.pipe(
        ofType(_Action.ONBOARDINGREQUIREMENTSViewAction.type),
        switchMap(() =>
        from(
            ONBOARDINGREQUIREMENTSViewApiCall()
        ).pipe(
            map((data) => {
            return _Action.ONBOARDINGREQUIREMENTSViewActionSuccess(data);
            }),
            catchError((error) => {
            if (error.response && error.response.data && error.response.data['Error Message']) {
                return of(_Action.ONBOARDINGREQUIREMENTSViewActionFailure(error.response.data['Error Message'])); // Extract error message from the response
            } else {
                return of(_Action.ONBOARDINGREQUIREMENTSViewActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
            })
        )
        )
);

export const ONBOARDINGREQUIREMENTSViewSpecificEpic: Epic = (action$, state$) =>
    action$.pipe(
        ofType(_Action.ONBOARDINGREQUIREMENTSViewSpecificAction.type),
        switchMap((action: ReturnType<typeof _Action.ONBOARDINGREQUIREMENTSViewSpecificAction>) =>
        from(
            ONBOARDINGREQUIREMENTSViewSpecificApiCall(action?.payload)
        ).pipe(
            map((data) => {
            return _Action.ONBOARDINGREQUIREMENTSViewSpecificActionSuccess(data);
            }),
            catchError((error) => {
            if (error.response && error.response.data && error.response.data['Error Message']) {
                return of(_Action.ONBOARDINGREQUIREMENTSViewSpecificActionFailure(error.response.data['Error Message'])); // Extract error message from the response
            } else {
                return of(_Action.ONBOARDINGREQUIREMENTSViewSpecificActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
            })
        )
        )
);


export const ONBOARDINGREQUIREMENTSCreateEpic: Epic = (action$, state$) =>
    action$.pipe(
        ofType(_Action.ONBOARDINGREQUIREMENTSCreateAction.type),
        switchMap((action: ReturnType<typeof _Action.ONBOARDINGREQUIREMENTSCreateAction>) =>
        from(
            ONBOARDINGREQUIREMENTSCreateApiCall(action?.payload)
        ).pipe(
            map((data) => {
            return _Action.ONBOARDINGREQUIREMENTSCreateActionSuccess(data);
            }),
            catchError((error) => {
            if (error.response && error.response.data && error.response.data) {
                return of(_Action.ONBOARDINGREQUIREMENTSCreateActionFailure(`${beautifyJSON(error.response.data)}`)); // Extract error message from the response
            } else {
                return of(_Action.ONBOARDINGREQUIREMENTSCreateActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
            })
        )
        )
);

export const ONBOARDINGREQUIREMENTSEditEpic: Epic = (action$, state$) =>
    action$.pipe(
        ofType(_Action.ONBOARDINGREQUIREMENTSEditAction.type),
        switchMap((action: ReturnType<typeof _Action.ONBOARDINGREQUIREMENTSEditAction>) =>
        from(
            ONBOARDINGREQUIREMENTSEditApiCall(action?.payload)
        ).pipe(
            map((data) => {
            return _Action.ONBOARDINGREQUIREMENTSEditActionSuccess(data);
            }),
            catchError((error) => {
            if (error.response && error.response.data && error.response.data['Error Message']) {
                return of(_Action.ONBOARDINGREQUIREMENTSEditActionFailure(error.response.data['Error Message'])); // Extract error message from the response
            } else {
                return of(_Action.ONBOARDINGREQUIREMENTSEditActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
            })
        )
        )
);


export const ONBOARDINGREQUIREMENTSDeleteEpic: Epic = (action$, state$) =>
    action$.pipe(
        ofType(_Action.ONBOARDINGREQUIREMENTSDeleteAction.type),
        switchMap((action: ReturnType<typeof _Action.ONBOARDINGREQUIREMENTSDeleteAction>) =>
            from(
                ONBOARDINGREQUIREMENTSDeleteApiCall(action?.payload)
            ).pipe(
                map((data) => {
                return _Action.ONBOARDINGREQUIREMENTSDeleteActionSuccess(data);
                }),
                catchError((error) => {
                if (error.response && error.response.data && error.response.data['Error Message']) {
                    return of(_Action.ONBOARDINGREQUIREMENTSDeleteActionFailure(error.response.data['Error Message'])); // Extract error message from the response
                } else {
                    return of(_Action.ONBOARDINGREQUIREMENTSDeleteActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
                }
                })
            )
        )
); 





// OFFBOARDINGSTATUS API SECTION // OFFBOARDINGSTATUS API SECTION // OFFBOARDINGSTATUS API SECTION // OFFBOARDINGSTATUS API SECTION // OFFBOARDINGSTATUS API SECTION\
const OFFBOARDINGSTATUSUpdateApiCall = async (payload: _Interface.OFFBOARDINGSTATUSUpdateInterface) => {
    const response = await axios.put(`${APILink}update_offboard/`,
    payload,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
          if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(_Action.OFFBOARDINGSTATUSUpdateActionProgress(progress));
          }
        }
      }
    );
    return response.data;
};


const OFFBOARDINGSTATUSEditApiCall = async (payload: _Interface.OFFBOARDINGSTATUSEditInterface) => {
    const response = await axios.put(`${APILink}offboarding/${payload.id}/`,
    payload,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
          if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(_Action.OFFBOARDINGSTATUSEditActionProgress(progress));
          }
        }
      }
    );
    return response.data;
};
  
const OFFBOARDINGSTATUSCreateApiCall = async (payload: _Interface.OFFBOARDINGSTATUSCreateInterface) => {
    const response = await axios.post(`${APILink}offboarding/`,
    payload,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
            if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(_Action.OFFBOARDINGSTATUSCreateActionProgress(progress));
            }
        }
        }
    );
    return response.data;
};

const OFFBOARDINGSTATUSViewSpecificApiCall = async (payload: {offboarding_status_id: number }) => {
    const response = await axios.get(`${APILink}offboarding/${payload.offboarding_status_id}/`,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
            if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(_Action.OFFBOARDINGSTATUSViewSpecificActionProgress(progress));
            }
        }
        }
    );
    return response.data;
};


const OFFBOARDINGSTATUSViewApiCall = async () => {
    const response = await axios.get(`${APILink}offboarding/`,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
            if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(_Action.OFFBOARDINGSTATUSViewActionProgress(progress));
            }
        }
        }
    );
    return response.data;
};

export const OFFBOARDINGSTATUSViewEpic: Epic = (action$, state$) =>
    action$.pipe(
        ofType(_Action.OFFBOARDINGSTATUSViewAction.type),
        switchMap(() =>
        from(
            OFFBOARDINGSTATUSViewApiCall()
        ).pipe(
            map((data) => {
            return _Action.OFFBOARDINGSTATUSViewActionSuccess(data);
            }),
            catchError((error) => {
            if (error.response && error.response.data && error.response.data['Error Message']) {
                return of(_Action.OFFBOARDINGSTATUSViewActionFailure(error.response.data['Error Message'])); // Extract error message from the response
            } else {
                return of(_Action.OFFBOARDINGSTATUSViewActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
            })
        )
        )
);

export const OFFBOARDINGSTATUSViewSpecificEpic: Epic = (action$, state$) =>
    action$.pipe(
        ofType(_Action.OFFBOARDINGSTATUSViewSpecificAction.type),
        switchMap((action: ReturnType<typeof _Action.OFFBOARDINGSTATUSViewSpecificAction>) =>
        from(
            OFFBOARDINGSTATUSViewSpecificApiCall(action?.payload)
        ).pipe(
            map((data) => {
            return _Action.OFFBOARDINGSTATUSViewSpecificActionSuccess(data);
            }),
            catchError((error) => {
            if (error.response && error.response.data && error.response.data['Error Message']) {
                return of(_Action.OFFBOARDINGSTATUSViewSpecificActionFailure(error.response.data['Error Message'])); // Extract error message from the response
            } else {
                return of(_Action.OFFBOARDINGSTATUSViewSpecificActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
            })
        )
        )
);


export const OFFBOARDINGSTATUSCreateEpic: Epic = (action$, state$) =>
    action$.pipe(
        ofType(_Action.OFFBOARDINGSTATUSCreateAction.type),
        switchMap((action: ReturnType<typeof _Action.OFFBOARDINGSTATUSCreateAction>) =>
        from(
            OFFBOARDINGSTATUSCreateApiCall(action?.payload)
        ).pipe(
            map((data) => {
            return _Action.OFFBOARDINGSTATUSCreateActionSuccess(data);
            }),
            catchError((error) => {
            if (error.response && error.response.data && error.response.data) {
                return of(_Action.OFFBOARDINGSTATUSCreateActionFailure(`${beautifyJSON(error.response.data)}`)); // Extract error message from the response
            } else {
                return of(_Action.OFFBOARDINGSTATUSCreateActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
            })
        )
        )
);

export const OFFBOARDINGSTATUSEditEpic: Epic = (action$, state$) =>
    action$.pipe(
        ofType(_Action.OFFBOARDINGSTATUSEditAction.type),
        switchMap((action: ReturnType<typeof _Action.OFFBOARDINGSTATUSEditAction>) =>
        from(
            OFFBOARDINGSTATUSEditApiCall(action?.payload)
        ).pipe(
            map((data) => {
            return _Action.OFFBOARDINGSTATUSEditActionSuccess(data);
            }),
            catchError((error) => {
            if (error.response && error.response.data && error.response.data['Error Message']) {
                return of(_Action.OFFBOARDINGSTATUSEditActionFailure(error.response.data['Error Message'])); // Extract error message from the response
            } else {
                return of(_Action.OFFBOARDINGSTATUSEditActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
            })
        )
        )
);


export const OFFBOARDINGSTATUSUpdateEpic: Epic = (action$, state$) =>
    action$.pipe(
        ofType(_Action.OFFBOARDINGSTATUSUpdateAction.type),
        switchMap((action: ReturnType<typeof _Action.OFFBOARDINGSTATUSUpdateAction>) =>
        from(
            OFFBOARDINGSTATUSUpdateApiCall(action?.payload)
        ).pipe(
            map((data) => {
            return _Action.OFFBOARDINGSTATUSUpdateActionSuccess(data);
            }),
            catchError((error) => {
            if (error.response && error.response.data && error.response.data['Error Message']) {
                return of(_Action.OFFBOARDINGSTATUSUpdateActionFailure(error.response.data['Error Message'])); // Extract error message from the response
            } else {
                return of(_Action.OFFBOARDINGSTATUSUpdateActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
            })
        )
        )
);




// OFFBOARDINGREQUIREMENTS API SECTION // OFFBOARDINGREQUIREMENTS API SECTION // OFFBOARDINGREQUIREMENTS API SECTION // OFFBOARDINGREQUIREMENTS API SECTION // OFFBOARDINGREQUIREMENTS API SECTION
const OFFBOARDINGREQUIREMENTSDeleteApiCall = async (payload: {or_id: number, curr_user: number}) => {
    const response = await axios.delete(`${APILink}onboard_req/${payload.or_id}/?added_by=${payload.curr_user}`, //payload
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
          if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(_Action.OFFBOARDINGREQUIREMENTSDeleteActionProgress(progress));
          }
        }
      }
    );
    return response.data;
};


const OFFBOARDINGREQUIREMENTSEditApiCall = async (payload: _Interface.OFFBOARDINGREQUIREMENTSEditInterface) => {
    const response = await axios.put(`${APILink}offboard_req/${payload.id}/`,
    payload,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
          if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(_Action.OFFBOARDINGREQUIREMENTSEditActionProgress(progress));
          }
        }
      }
    );
    return response.data;
};
  
const OFFBOARDINGREQUIREMENTSCreateApiCall = async (payload: _Interface.OFFBOARDINGREQUIREMENTSCreateInterface) => {
    const response = await axios.post(`${APILink}offboard_req/`,
    payload,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
            if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(_Action.OFFBOARDINGREQUIREMENTSCreateActionProgress(progress));
            }
        }
        }
    );
    return response.data;
};

const OFFBOARDINGREQUIREMENTSViewSpecificApiCall = async (payload: {offboarding_requirements_id: number }) => {
    const response = await axios.get(`${APILink}offboard_req/${payload.offboarding_requirements_id}/`,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
            if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(_Action.OFFBOARDINGREQUIREMENTSViewSpecificActionProgress(progress));
            }
        }
        }
    );
    return response.data;
};


const OFFBOARDINGREQUIREMENTSViewApiCall = async () => {
    const response = await axios.get(`${APILink}offboard_req/`,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
            if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(_Action.OFFBOARDINGREQUIREMENTSViewActionProgress(progress));
            }
        }
        }
    );
    return response.data;
};

export const OFFBOARDINGREQUIREMENTSViewEpic: Epic = (action$, state$) =>
    action$.pipe(
        ofType(_Action.OFFBOARDINGREQUIREMENTSViewAction.type),
        switchMap(() =>
        from(
            OFFBOARDINGREQUIREMENTSViewApiCall()
        ).pipe(
            map((data) => {
            return _Action.OFFBOARDINGREQUIREMENTSViewActionSuccess(data);
            }),
            catchError((error) => {
            if (error.response && error.response.data && error.response.data['Error Message']) {
                return of(_Action.OFFBOARDINGREQUIREMENTSViewActionFailure(error.response.data['Error Message'])); // Extract error message from the response
            } else {
                return of(_Action.OFFBOARDINGREQUIREMENTSViewActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
            })
        )
        )
);

export const OFFBOARDINGREQUIREMENTSViewSpecificEpic: Epic = (action$, state$) =>
    action$.pipe(
        ofType(_Action.OFFBOARDINGREQUIREMENTSViewSpecificAction.type),
        switchMap((action: ReturnType<typeof _Action.OFFBOARDINGREQUIREMENTSViewSpecificAction>) =>
        from(
            OFFBOARDINGREQUIREMENTSViewSpecificApiCall(action?.payload)
        ).pipe(
            map((data) => {
            return _Action.OFFBOARDINGREQUIREMENTSViewSpecificActionSuccess(data);
            }),
            catchError((error) => {
            if (error.response && error.response.data && error.response.data['Error Message']) {
                return of(_Action.OFFBOARDINGREQUIREMENTSViewSpecificActionFailure(error.response.data['Error Message'])); // Extract error message from the response
            } else {
                return of(_Action.OFFBOARDINGREQUIREMENTSViewSpecificActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
            })
        )
        )
);


export const OFFBOARDINGREQUIREMENTSCreateEpic: Epic = (action$, state$) =>
    action$.pipe(
        ofType(_Action.OFFBOARDINGREQUIREMENTSCreateAction.type),
        switchMap((action: ReturnType<typeof _Action.OFFBOARDINGREQUIREMENTSCreateAction>) =>
        from(
            OFFBOARDINGREQUIREMENTSCreateApiCall(action?.payload)
        ).pipe(
            map((data) => {
            return _Action.OFFBOARDINGREQUIREMENTSCreateActionSuccess(data);
            }),
            catchError((error) => {
            if (error.response && error.response.data && error.response.data) {
                return of(_Action.OFFBOARDINGREQUIREMENTSCreateActionFailure(`${beautifyJSON(error.response.data)}`)); // Extract error message from the response
            } else {
                return of(_Action.OFFBOARDINGREQUIREMENTSCreateActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
            })
        )
        )
);

export const OFFBOARDINGREQUIREMENTSEditEpic: Epic = (action$, state$) =>
    action$.pipe(
        ofType(_Action.OFFBOARDINGREQUIREMENTSEditAction.type),
        switchMap((action: ReturnType<typeof _Action.OFFBOARDINGREQUIREMENTSEditAction>) =>
        from(
            OFFBOARDINGREQUIREMENTSEditApiCall(action?.payload)
        ).pipe(
            map((data) => {
            return _Action.OFFBOARDINGREQUIREMENTSEditActionSuccess(data);
            }),
            catchError((error) => {
            if (error.response && error.response.data && error.response.data['Error Message']) {
                return of(_Action.OFFBOARDINGREQUIREMENTSEditActionFailure(error.response.data['Error Message'])); // Extract error message from the response
            } else {
                return of(_Action.OFFBOARDINGREQUIREMENTSEditActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
            })
        )
        )
);

export const OFFBOARDINGREQUIREMENTSDeleteEpic: Epic = (action$, state$) =>
    action$.pipe(
        ofType(_Action.OFFBOARDINGREQUIREMENTSDeleteAction.type),
        switchMap((action: ReturnType<typeof _Action.OFFBOARDINGREQUIREMENTSDeleteAction>) =>
            from(
                OFFBOARDINGREQUIREMENTSDeleteApiCall(action?.payload)
            ).pipe(
                map((data) => {
                return _Action.OFFBOARDINGREQUIREMENTSDeleteActionSuccess(data);
                }),
                catchError((error) => {
                if (error.response && error.response.data && error.response.data['Error Message']) {
                    return of(_Action.OFFBOARDINGREQUIREMENTSDeleteActionFailure(error.response.data['Error Message'])); // Extract error message from the response
                } else {
                    return of(_Action.OFFBOARDINGREQUIREMENTSDeleteActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
                }
                })
            )
        )
);


// APPLICANTS API SECTION // APPLICANTS API SECTION // APPLICANTS API SECTION // APPLICANTS API SECTION // APPLICANTS API SECTION
const APPLICANTSEditApiCall = async (payload: _Interface.APPLICANTSEditInterface) => {
    const response = await axios.put(`${APILink}applicant/${payload.id}/`,
    payload,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
          if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(_Action.APPLICANTSEditActionProgress(progress));
          }
        }
      }
    );
    return response.data;
};
  
const APPLICANTSCreateApiCall = async (payload: _Interface.APPLICANTSCreateInterface) => {
    const response = await axios.post(`${APILink}applicant/`,
    payload,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
            if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(_Action.APPLICANTSCreateActionProgress(progress));
            }
        }
        }
    );
    return response.data;
};

const APPLICANTSViewSpecificApiCall = async (payload: {applicant_id: number }) => {
    const response = await axios.get(`${APILink}applicant/${payload.applicant_id}/`,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
            if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(_Action.APPLICANTSViewSpecificActionProgress(progress));
            }
        }
        }
    );
    return response.data;
};


const APPLICANTSViewApiCall = async () => {
    const response = await axios.get(`${APILink}applicant/`,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
            if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(_Action.APPLICANTSViewActionProgress(progress));
            }
        }
        }
    );
    return response.data;
};

export const APPLICANTSViewEpic: Epic = (action$, state$) =>
    action$.pipe(
        ofType(_Action.APPLICANTSViewAction.type),
        switchMap(() =>
        from(
            APPLICANTSViewApiCall()
        ).pipe(
            map((data) => {
            return _Action.APPLICANTSViewActionSuccess(data);
            }),
            catchError((error) => {
            if (error.response && error.response.data && error.response.data['Error Message']) {
                return of(_Action.APPLICANTSViewActionFailure(error.response.data['Error Message'])); // Extract error message from the response
            } else {
                return of(_Action.APPLICANTSViewActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
            })
        )
        )
);

export const APPLICANTSViewSpecificEpic: Epic = (action$, state$) =>
    action$.pipe(
        ofType(_Action.APPLICANTSViewSpecificAction.type),
        switchMap((action: ReturnType<typeof _Action.APPLICANTSViewSpecificAction>) =>
        from(
            APPLICANTSViewSpecificApiCall(action?.payload)
        ).pipe(
            map((data) => {
            return _Action.APPLICANTSViewSpecificActionSuccess(data);
            }),
            catchError((error) => {
            if (error.response && error.response.data && error.response.data['Error Message']) {
                return of(_Action.APPLICANTSViewSpecificActionFailure(error.response.data['Error Message'])); // Extract error message from the response
            } else {
                return of(_Action.APPLICANTSViewSpecificActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
            })
        )
        )
);



export const APPLICANTSCreateEpic: Epic = (action$, state$) =>
    action$.pipe(
        ofType(_Action.APPLICANTSCreateAction.type),
        switchMap((action: ReturnType<typeof _Action.APPLICANTSCreateAction>) =>
        from(
            APPLICANTSCreateApiCall(action?.payload)
        ).pipe(
            map((data) => {
            return _Action.APPLICANTSCreateActionSuccess(data);
            }),
            catchError((error) => {
            if (error.response && error.response.data && error.response.data) {
                return of(_Action.APPLICANTSCreateActionFailure(`${beautifyJSON(error.response.data)}`)); // Extract error message from the response
            } else {
                return of(_Action.APPLICANTSCreateActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
            })
        )
        )
);

export const APPLICANTSEditEpic: Epic = (action$, state$) =>
    action$.pipe(
        ofType(_Action.APPLICANTSEditAction.type),
        switchMap((action: ReturnType<typeof _Action.APPLICANTSEditAction>) =>
        from(
            APPLICANTSEditApiCall(action?.payload)
        ).pipe(
            map((data) => {
            return _Action.APPLICANTSEditActionSuccess(data);
            }),
            catchError((error) => {
            if (error.response && error.response.data && error.response.data['Error Message']) {
                return of(_Action.APPLICANTSEditActionFailure(error.response.data['Error Message'])); // Extract error message from the response
            } else {
                return of(_Action.APPLICANTSEditActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
            })
        )
        )
);



// JOBPOSTINGS API SECTION // JOBPOSTINGS API SECTION // JOBPOSTINGS API SECTION // JOBPOSTINGS API SECTION // JOBPOSTINGS API SECTION
const JOBPOSTINGSDeleteApiCall = async (payload: {jp_id: number, curr_user: number}) => {
    const response = await axios.delete(`${APILink}job_post/${payload.jp_id}/?added_by=${payload.curr_user}`,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
          if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(_Action.JOBPOSTINGSDeleteActionProgress(progress));
          }
        }
      }
    );
    return response.data;
};



const JOBPOSTINGSEditApiCall = async (payload: _Interface.JOBPOSTINGSEditInterface) => {
    const response = await axios.put(`${APILink}job_post/${payload.id}/`,
    payload,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
          if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(_Action.JOBPOSTINGSEditActionProgress(progress));
          }
        }
      }
    );
    return response.data;
};
  
const JOBPOSTINGSCreateApiCall = async (payload: _Interface.JOBPOSTINGSCreateInterface) => {
    const response = await axios.post(`${APILink}job_post/`,
    payload,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
            if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(_Action.JOBPOSTINGSCreateActionProgress(progress));
            }
        }
        }
    );
    return response.data;
};

const JOBPOSTINGSViewSpecificApiCall = async (payload: {job_posting_id: number }) => {
    const response = await axios.get(`${APILink}job_post/${payload.job_posting_id}/`,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
            if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(_Action.JOBPOSTINGSViewSpecificActionProgress(progress));
            }
        }
        }
    );
    return response.data;
};


const JOBPOSTINGSViewApiCall = async () => {
    const response = await axios.get(`${APILink}job_post/`,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
            if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(_Action.JOBPOSTINGSViewActionProgress(progress));
            }
        }
        }
    );
    return response.data;
};

export const JOBPOSTINGSViewEpic: Epic = (action$, state$) =>
    action$.pipe(
        ofType(_Action.JOBPOSTINGSViewAction.type),
        switchMap(() =>
        from(
            JOBPOSTINGSViewApiCall()
        ).pipe(
            map((data) => {
            return _Action.JOBPOSTINGSViewActionSuccess(data);
            }),
            catchError((error) => {
            if (error.response && error.response.data && error.response.data['Error Message']) {
                return of(_Action.JOBPOSTINGSViewActionFailure(error.response.data['Error Message'])); // Extract error message from the response
            } else {
                return of(_Action.JOBPOSTINGSViewActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
            })
        )
        )
);

export const JOBPOSTINGSViewSpecificEpic: Epic = (action$, state$) =>
    action$.pipe(
        ofType(_Action.JOBPOSTINGSViewSpecificAction.type),
        switchMap((action: ReturnType<typeof _Action.JOBPOSTINGSViewSpecificAction>) =>
        from(
            JOBPOSTINGSViewSpecificApiCall(action?.payload)
        ).pipe(
            map((data) => {
            return _Action.JOBPOSTINGSViewSpecificActionSuccess(data);
            }),
            catchError((error) => {
            if (error.response && error.response.data && error.response.data['Error Message']) {
                return of(_Action.JOBPOSTINGSViewSpecificActionFailure(error.response.data['Error Message'])); // Extract error message from the response
            } else {
                return of(_Action.JOBPOSTINGSViewSpecificActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
            })
        )
        )
);


export const JOBPOSTINGSCreateEpic: Epic = (action$, state$) =>
    action$.pipe(
        ofType(_Action.JOBPOSTINGSCreateAction.type),
        switchMap((action: ReturnType<typeof _Action.JOBPOSTINGSCreateAction>) =>
        from(
            JOBPOSTINGSCreateApiCall(action?.payload)
        ).pipe(
            map((data) => {
            return _Action.JOBPOSTINGSCreateActionSuccess(data);
            }),
            catchError((error) => {
            if (error.response && error.response.data && error.response.data) {
                return of(_Action.JOBPOSTINGSCreateActionFailure(`${beautifyJSON(error.response.data)}`)); // Extract error message from the response
            } else {
                return of(_Action.JOBPOSTINGSCreateActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
            })
        )
        )
);

export const JOBPOSTINGSEditEpic: Epic = (action$, state$) =>
    action$.pipe(
        ofType(_Action.JOBPOSTINGSEditAction.type),
        switchMap((action: ReturnType<typeof _Action.JOBPOSTINGSEditAction>) =>
        from(
            JOBPOSTINGSEditApiCall(action?.payload)
        ).pipe(
            map((data) => {
            return _Action.JOBPOSTINGSEditActionSuccess(data);
            }),
            catchError((error) => {
            if (error.response && error.response.data && error.response.data['Error Message']) {
                return of(_Action.JOBPOSTINGSEditActionFailure(error.response.data['Error Message'])); // Extract error message from the response
            } else {
                return of(_Action.JOBPOSTINGSEditActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
            })
        )
        )
);


export const JOBPOSTINGSDeleteEpic: Epic = (action$, state$) =>
    action$.pipe(
        ofType(_Action.JOBPOSTINGSDeleteAction.type),
        switchMap((action: ReturnType<typeof _Action.JOBPOSTINGSDeleteAction>) =>
        from(
            JOBPOSTINGSDeleteApiCall(action?.payload)
        ).pipe(
            map((data) => {
            return _Action.JOBPOSTINGSDeleteActionSuccess(data);
            }),
            catchError((error) => {
            if (error.response && error.response.data && error.response.data['Error Message']) {
                return of(_Action.JOBPOSTINGSDeleteActionFailure(error.response.data['Error Message'])); // Extract error message from the response
            } else {
                return of(_Action.JOBPOSTINGSDeleteActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
            })
        )
        )
);


// PERFECTATTENDANCE Section


const PERFECTATTENDANCEViewSpecificApiCall = async (payload: {month: number, year: number }) => {
    const response = await axios.get(`${APILink}perfect/?month=${payload.month}&year=${payload.year}`,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
            if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(_Action.PERFECTATTENDANCEViewSpecificActionProgress(progress));
            }
        }
        }
    );
    return response.data;
};




export const PERFECTATTENDANCEViewSpecificEpic: Epic = (action$, state$) =>
    action$.pipe(
        ofType(_Action.PERFECTATTENDANCEViewSpecificAction.type),
        switchMap((action: ReturnType<typeof _Action.PERFECTATTENDANCEViewSpecificAction>) =>
        from(
            PERFECTATTENDANCEViewSpecificApiCall(action?.payload)
        ).pipe(
            map((data) => {
            return _Action.PERFECTATTENDANCEViewSpecificActionSuccess(data);
            }),
            catchError((error) => {
            if (error.response && error.response.data && error.response.data['Error Message']) {
                return of(_Action.PERFECTATTENDANCEViewSpecificActionFailure(error.response.data['Error Message'])); // Extract error message from the response
            } else {
                return of(_Action.PERFECTATTENDANCEViewSpecificActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
            })
        )
        )
);




// ALLSCHEDULE Section
const ALLSCHEDULEViewSpecificApiCall = async (payload: {month: number, year: number }) => {
    const response = await axios.get(`${APILink}schedule_daily/?month=${payload.month}&year=${payload.year}`,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
            if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(_Action.ALLSCHEDULEViewSpecificActionProgress(progress));
            }
        }
        }
    );
    return response.data;
};




export const ALLSCHEDULEViewSpecificEpic: Epic = (action$, state$) =>
    action$.pipe(
        ofType(_Action.ALLSCHEDULEViewSpecificAction.type),
        switchMap((action: ReturnType<typeof _Action.ALLSCHEDULEViewSpecificAction>) =>
        from(
            ALLSCHEDULEViewSpecificApiCall(action?.payload)
        ).pipe(
            map((data) => {
            return _Action.ALLSCHEDULEViewSpecificActionSuccess(data);
            }),
            catchError((error) => {
            if (error.response && error.response.data && error.response.data['Error Message']) {
                return of(_Action.ALLSCHEDULEViewSpecificActionFailure(error.response.data['Error Message'])); // Extract error message from the response
            } else {
                return of(_Action.ALLSCHEDULEViewSpecificActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
            })
        )
        )
);





// EMPHISTORY API SECTION // EMPHISTORY API SECTION // EMPHISTORY API SECTION // EMPHISTORY API SECTION // EMPHISTORY API SECTION
const EMPHISTORYDeleteApiCall = async (payload: {eh_id: number, added_by: number}) => {
    const response = await axios.delete(`${APILink}emp_history/${payload.eh_id}/?added_by=${payload.added_by}`,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
          if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(_Action.EMPHISTORYDeleteActionProgress(progress));
          }
        }
      }
    );
    return response.data;
};



const EMPHISTORYEditApiCall = async (payload: _Interface.EMPHISTORYEditInterface) => {
    const response = await axios.put(`${APILink}emp_history/${payload.id}/`,
    payload,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
          if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(_Action.EMPHISTORYEditActionProgress(progress));
          }
        }
      }
    );
    return response.data;
};
  
const EMPHISTORYCreateApiCall = async (payload: _Interface.EMPHISTORYCreateInterface) => {
    const response = await axios.post(`${APILink}emp_history/`,
    payload,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
            if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(_Action.EMPHISTORYCreateActionProgress(progress));
            }
        }
        }
    );
    return response.data;
};

const EMPHISTORYViewSpecificApiCall = async (payload: {emp_no: number }) => {
    const response = await axios.get(`${APILink}emp_history/?emp_no=${payload.emp_no}`,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
            if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(_Action.EMPHISTORYViewSpecificActionProgress(progress));
            }
        }
        }
    );
    return response.data;
};


const EMPHISTORYViewApiCall = async () => {
    const response = await axios.get(`${APILink}emp_history/`,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
            if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(_Action.EMPHISTORYViewActionProgress(progress));
            }
        }
        }
    );
    return response.data;
};

export const EMPHISTORYViewEpic: Epic = (action$, state$) =>
    action$.pipe(
        ofType(_Action.EMPHISTORYViewAction.type),
        switchMap(() =>
        from(
            EMPHISTORYViewApiCall()
        ).pipe(
            map((data) => {
            return _Action.EMPHISTORYViewActionSuccess(data);
            }),
            catchError((error) => {
            if (error.response && error.response.data && error.response.data['Error Message']) {
                return of(_Action.EMPHISTORYViewActionFailure(error.response.data['Error Message'])); // Extract error message from the response
            } else {
                return of(_Action.EMPHISTORYViewActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
            })
        )
        )
);

export const EMPHISTORYViewSpecificEpic: Epic = (action$, state$) =>
    action$.pipe(
        ofType(_Action.EMPHISTORYViewSpecificAction.type),
        switchMap((action: ReturnType<typeof _Action.EMPHISTORYViewSpecificAction>) =>
        from(
            EMPHISTORYViewSpecificApiCall(action?.payload)
        ).pipe(
            map((data) => {
            return _Action.EMPHISTORYViewSpecificActionSuccess(data);
            }),
            catchError((error) => {
            if (error.response && error.response.data && error.response.data['Error Message']) {
                return of(_Action.EMPHISTORYViewSpecificActionFailure(error.response.data['Error Message'])); // Extract error message from the response
            } else {
                return of(_Action.EMPHISTORYViewSpecificActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
            })
        )
        )
);


export const EMPHISTORYCreateEpic: Epic = (action$, state$) =>
    action$.pipe(
        ofType(_Action.EMPHISTORYCreateAction.type),
        switchMap((action: ReturnType<typeof _Action.EMPHISTORYCreateAction>) =>
        from(
            EMPHISTORYCreateApiCall(action?.payload)
        ).pipe(
            map((data) => {
            return _Action.EMPHISTORYCreateActionSuccess(data);
            }),
            catchError((error) => {
            if (error.response && error.response.data && error.response.data) {
                return of(_Action.EMPHISTORYCreateActionFailure(`${beautifyJSON(error.response.data)}`)); // Extract error message from the response
            } else {
                return of(_Action.EMPHISTORYCreateActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
            })
        )
        )
);

export const EMPHISTORYEditEpic: Epic = (action$, state$) =>
    action$.pipe(
        ofType(_Action.EMPHISTORYEditAction.type),
        switchMap((action: ReturnType<typeof _Action.EMPHISTORYEditAction>) =>
        from(
            EMPHISTORYEditApiCall(action?.payload)
        ).pipe(
            map((data) => {
            return _Action.EMPHISTORYEditActionSuccess(data);
            }),
            catchError((error) => {
            if (error.response && error.response.data && error.response.data['Error Message']) {
                return of(_Action.EMPHISTORYEditActionFailure(error.response.data['Error Message'])); // Extract error message from the response
            } else {
                return of(_Action.EMPHISTORYEditActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
            })
        )
        )
);


export const EMPHISTORYDeleteEpic: Epic = (action$, state$) =>
    action$.pipe(
        ofType(_Action.EMPHISTORYDeleteAction.type),
        switchMap((action: ReturnType<typeof _Action.EMPHISTORYDeleteAction>) =>
        from(
            EMPHISTORYDeleteApiCall(action?.payload)
        ).pipe(
            map((data) => {
            return _Action.EMPHISTORYDeleteActionSuccess(data);
            }),
            catchError((error) => {
            if (error.response && error.response.data && error.response.data['Error Message']) {
                return of(_Action.EMPHISTORYDeleteActionFailure(error.response.data['Error Message'])); // Extract error message from the response
            } else {
                return of(_Action.EMPHISTORYDeleteActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
            })
        )
        )
);



// EMPSEMINARS API SECTION // EMPSEMINARS API SECTION // EMPSEMINARS API SECTION // EMPSEMINARS API SECTION // EMPSEMINARS API SECTION
const EMPSEMINARSDeleteApiCall = async (payload: {es_id: number, added_by: number}) => {
    const response = await axios.delete(`${APILink}emp_train_sem/${payload.es_id}/?added_by=${payload.added_by}`,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
          if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(_Action.EMPSEMINARSDeleteActionProgress(progress));
          }
        }
      }
    );
    return response.data;
};



const EMPSEMINARSEditApiCall = async (payload: _Interface.EMPSEMINARSEditInterface) => {
    const response = await axios.put(`${APILink}emp_train_sem/${payload.id}/`,
    payload,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
          if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(_Action.EMPSEMINARSEditActionProgress(progress));
          }
        }
      }
    );
    return response.data;
};
  
const EMPSEMINARSCreateApiCall = async (payload: _Interface.EMPSEMINARSCreateInterface) => {
    const response = await axios.post(`${APILink}emp_train_sem/`,
    payload,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
            if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(_Action.EMPSEMINARSCreateActionProgress(progress));
            }
        }
        }
    );
    return response.data;
};

const EMPSEMINARSViewSpecificApiCall = async (payload: {emp_no: number }) => {
    const response = await axios.get(`${APILink}emp_train_sem/?emp_no=${payload.emp_no}`,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
            if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(_Action.EMPSEMINARSViewSpecificActionProgress(progress));
            }
        }
        }
    );
    return response.data;
};


const EMPSEMINARSViewApiCall = async () => {
    const response = await axios.get(`${APILink}emp_train_sem/`,
    {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
            if(progressEvent.total){
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            store.dispatch(_Action.EMPSEMINARSViewActionProgress(progress));
            }
        }
        }
    );
    return response.data;
};

export const EMPSEMINARSViewEpic: Epic = (action$, state$) =>
    action$.pipe(
        ofType(_Action.EMPSEMINARSViewAction.type),
        switchMap(() =>
        from(
            EMPSEMINARSViewApiCall()
        ).pipe(
            map((data) => {
            return _Action.EMPSEMINARSViewActionSuccess(data);
            }),
            catchError((error) => {
            if (error.response && error.response.data && error.response.data['Error Message']) {
                return of(_Action.EMPSEMINARSViewActionFailure(error.response.data['Error Message'])); // Extract error message from the response
            } else {
                return of(_Action.EMPSEMINARSViewActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
            })
        )
        )
);

export const EMPSEMINARSViewSpecificEpic: Epic = (action$, state$) =>
    action$.pipe(
        ofType(_Action.EMPSEMINARSViewSpecificAction.type),
        switchMap((action: ReturnType<typeof _Action.EMPSEMINARSViewSpecificAction>) =>
        from(
            EMPSEMINARSViewSpecificApiCall(action?.payload)
        ).pipe(
            map((data) => {
            return _Action.EMPSEMINARSViewSpecificActionSuccess(data);
            }),
            catchError((error) => {
            if (error.response && error.response.data && error.response.data['Error Message']) {
                return of(_Action.EMPSEMINARSViewSpecificActionFailure(error.response.data['Error Message'])); // Extract error message from the response
            } else {
                return of(_Action.EMPSEMINARSViewSpecificActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
            })
        )
        )
);


export const EMPSEMINARSCreateEpic: Epic = (action$, state$) =>
    action$.pipe(
        ofType(_Action.EMPSEMINARSCreateAction.type),
        switchMap((action: ReturnType<typeof _Action.EMPSEMINARSCreateAction>) =>
        from(
            EMPSEMINARSCreateApiCall(action?.payload)
        ).pipe(
            map((data) => {
            return _Action.EMPSEMINARSCreateActionSuccess(data);
            }),
            catchError((error) => {
            if (error.response && error.response.data && error.response.data) {
                return of(_Action.EMPSEMINARSCreateActionFailure(`${beautifyJSON(error.response.data)}`)); // Extract error message from the response
            } else {
                return of(_Action.EMPSEMINARSCreateActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
            })
        )
        )
);

export const EMPSEMINARSEditEpic: Epic = (action$, state$) =>
    action$.pipe(
        ofType(_Action.EMPSEMINARSEditAction.type),
        switchMap((action: ReturnType<typeof _Action.EMPSEMINARSEditAction>) =>
        from(
            EMPSEMINARSEditApiCall(action?.payload)
        ).pipe(
            map((data) => {
            return _Action.EMPSEMINARSEditActionSuccess(data);
            }),
            catchError((error) => {
            if (error.response && error.response.data && error.response.data['Error Message']) {
                return of(_Action.EMPSEMINARSEditActionFailure(error.response.data['Error Message'])); // Extract error message from the response
            } else {
                return of(_Action.EMPSEMINARSEditActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
            })
        )
        )
);


export const EMPSEMINARSDeleteEpic: Epic = (action$, state$) =>
    action$.pipe(
        ofType(_Action.EMPSEMINARSDeleteAction.type),
        switchMap((action: ReturnType<typeof _Action.EMPSEMINARSDeleteAction>) =>
        from(
            EMPSEMINARSDeleteApiCall(action?.payload)
        ).pipe(
            map((data) => {
            return _Action.EMPSEMINARSDeleteActionSuccess(data);
            }),
            catchError((error) => {
            if (error.response && error.response.data && error.response.data['Error Message']) {
                return of(_Action.EMPSEMINARSDeleteActionFailure(error.response.data['Error Message'])); // Extract error message from the response
            } else {
                return of(_Action.EMPSEMINARSDeleteActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
            }
            })
        )
        )
);
