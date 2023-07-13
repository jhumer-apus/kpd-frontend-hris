import { ofType } from 'redux-observable';
import { map, catchError, switchMap, mergeMap } from 'rxjs/operators';
import { of, from } from 'rxjs';
import axios, { AxiosProgressEvent } from 'axios';
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
    HolidayEditSubmitSuccess,
    OBTViewAction,
    OBTViewActionFailure,
    OBTViewActionFailureCleanup,
    OBTViewActionProgress,
    OBTViewActionSuccess,
    OBTViewFilterEmployeeAction,
    OBTViewFilterEmployeeActionFailure,
    OBTViewFilterEmployeeActionFailureCleanup,
    OBTViewFilterEmployeeActionProgress,
    OBTViewFilterEmployeeActionSuccess,
    OBTViewFilterEmployeeAndOBTAction,
    OBTViewFilterEmployeeAndOBTActionSuccess,
    OBTViewFilterEmployeeAndOBTActionFailure,
    OBTViewFilterEmployeeAndOBTActionFailureCleanup,
    OBTViewFilterEmployeeAndOBTActionProgress,
    OBTCreateAction,
    OBTCreateActionFailure,
    OBTCreateActionFailureCleanup,
    OBTCreateActionProgress,
    OBTCreateActionSuccess,
    OBTEditAction,
    OBTEditActionFailure,
    OBTEditActionFailureCleanup,
    OBTEditActionProgress,
    OBTEditActionSuccess,
    OBTViewFilterApproverAction,
    OBTViewFilterApproverActionFailure,
    OBTViewFilterApproverActionFailureCleanup,
    OBTViewFilterApproverActionProgress,
    OBTViewFilterApproverActionSuccess,
    OVERTIMECreateAction,
    OVERTIMECreateActionFailure,
    OVERTIMECreateActionFailureCleanup,
    OVERTIMECreateActionProgress,
    OVERTIMECreateActionSuccess,
    OVERTIMEEditAction,
    OVERTIMEEditActionFailure,
    OVERTIMEEditActionFailureCleanup,
    OVERTIMEEditActionProgress,
    OVERTIMEEditActionSuccess,
    OVERTIMEViewAction,
    OVERTIMEViewActionFailure,
    OVERTIMEViewActionFailureCleanup,
    OVERTIMEViewActionProgress,
    OVERTIMEViewActionSuccess,
    OVERTIMEViewFilterApproverAction,
    OVERTIMEViewFilterApproverActionFailure,
    OVERTIMEViewFilterApproverActionFailureCleanup,
    OVERTIMEViewFilterApproverActionProgress,
    OVERTIMEViewFilterApproverActionSuccess,
    OVERTIMEViewFilterEmployeeAction,
    OVERTIMEViewFilterEmployeeActionFailure,
    OVERTIMEViewFilterEmployeeActionFailureCleanup,
    OVERTIMEViewFilterEmployeeActionProgress,
    OVERTIMEViewFilterEmployeeActionSuccess,
    OVERTIMEViewFilterEmployeeAndOVERTIMEAction,
    OVERTIMEViewFilterEmployeeAndOVERTIMEActionFailure,
    OVERTIMEViewFilterEmployeeAndOVERTIMEActionFailureCleanup,
    OVERTIMEViewFilterEmployeeAndOVERTIMEActionProgress,
    OVERTIMEViewFilterEmployeeAndOVERTIMEActionSuccess,
    LEAVECreateAction,
    LEAVECreateActionFailure,
    LEAVECreateActionFailureCleanup,
    LEAVECreateActionProgress,
    LEAVECreateActionSuccess,
    LEAVEEditAction,
    LEAVEEditActionFailure,
    LEAVEEditActionFailureCleanup,
    LEAVEEditActionProgress,
    LEAVEEditActionSuccess,
    LEAVEViewAction,
    LEAVEViewActionFailure,
    LEAVEViewActionFailureCleanup,
    LEAVEViewActionProgress,
    LEAVEViewActionSuccess,
    LEAVEViewFilterApproverAction,
    LEAVEViewFilterApproverActionFailure,
    LEAVEViewFilterApproverActionFailureCleanup,
    LEAVEViewFilterApproverActionProgress,
    LEAVEViewFilterApproverActionSuccess,
    LEAVEViewFilterEmployeeAction,
    LEAVEViewFilterEmployeeActionFailure,
    LEAVEViewFilterEmployeeActionFailureCleanup,
    LEAVEViewFilterEmployeeActionProgress,
    LEAVEViewFilterEmployeeActionSuccess,
    LEAVEViewFilterEmployeeAndLEAVEAction,
    LEAVEViewFilterEmployeeAndLEAVEActionFailure,
    LEAVEViewFilterEmployeeAndLEAVEActionFailureCleanup,
    LEAVEViewFilterEmployeeAndLEAVEActionProgress,
    LEAVEViewFilterEmployeeAndLEAVEActionSuccess,
    //UA SECTION,
    UACreateAction,
    UACreateActionFailure,
    UACreateActionFailureCleanup,
    UACreateActionProgress,
    UACreateActionSuccess,
    UAEditAction,
    UAEditActionFailure,
    UAEditActionFailureCleanup,
    UAEditActionProgress,
    UAEditActionSuccess,
    UAViewAction,
    UAViewActionFailure,
    UAViewActionFailureCleanup,
    UAViewActionProgress,
    UAViewActionSuccess,
    UAViewFilterApproverAction,
    UAViewFilterApproverActionFailure,
    UAViewFilterApproverActionFailureCleanup,
    UAViewFilterApproverActionProgress,
    UAViewFilterApproverActionSuccess,
    UAViewFilterEmployeeAction,
    UAViewFilterEmployeeActionFailure,
    UAViewFilterEmployeeActionFailureCleanup,
    UAViewFilterEmployeeActionProgress,
    UAViewFilterEmployeeActionSuccess,
    UAViewFilterEmployeeAndUAAction,
    UAViewFilterEmployeeAndUAActionFailure,
    UAViewFilterEmployeeAndUAActionFailureCleanup,
    UAViewFilterEmployeeAndUAActionProgress,
    UAViewFilterEmployeeAndUAActionSuccess
} from '../actions/procedurals';
import { Epic } from 'redux-observable';
import store from '../configureStore';
import { 
  HolidayGetType, 
  OBTCreateInterface, 
  OBTEditInterface, 
  OBTViewInterface, 
  OVERTIMECreateInterface, 
  OVERTIMEEditInterface, 
  OVERTIMEViewInterface,
  LEAVECreateInterface, 
  LEAVEEditInterface, 
  LEAVEViewInterface, 
  UACreateInterface, 
  UAEditInterface, 
  UAViewInterface, 
} from '@/types/types-pages';


// HOLIDAY API SECTION // HOLIDAY API SECTION // HOLIDAY API SECTION // HOLIDAY API SECTION // HOLIDAY API SECTION
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


// OBT API SECTION // OBT API SECTION // OBT API SECTION // OBT API SECTION // OBT API SECTION
const OBTEditApiCall = async (payload: OBTEditInterface) => {
  const response = await axios.put(`http://172.16.168.155:8000/api/obt/${payload.emp_no}/${payload.id}/`,
  payload,
  {
      onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if(progressEvent.total){
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          store.dispatch(OBTEditActionProgress(progress));
        }
      }
    }
  );
  return response.data;
};

const OBTCreateApiCall = async (payload: OBTCreateInterface) => {
  const response = await axios.post(`http://172.16.168.155:8000/api/obt/`,
  payload,
  {
      onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if(progressEvent.total){
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          store.dispatch(OBTCreateActionProgress(progress));
        }
      }
    }
  );
  return response.data;
};


const OBTViewFilterApproverApiCall = async (payload: {emp_no: number}) => {
  const response = await axios.get(`http://172.16.168.155:8000/api/obt/approver/${payload.emp_no}/`,
  {
      onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if(progressEvent.total){
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          store.dispatch(OBTViewFilterApproverActionProgress(progress));
        }
      }
    }
  );
  return response.data;
};


const OBTViewFilterEmployeeAndOBTApiCall = async (payload: {emp_no: number, obt_id: number}) => {
  const response = await axios.get(`http://172.16.168.155:8000/api/obt/${payload.emp_no}/${payload.obt_id}`,
  {
      onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if(progressEvent.total){
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          store.dispatch(OBTViewFilterEmployeeAndOBTActionProgress(progress));
        }
      }
    }
  );
  return response.data;
};

const OBTViewFilterEmployeeApiCall = async (payload: {emp_no: number}) => {
  const response = await axios.get(`http://172.16.168.155:8000/api/obt/${payload.emp_no}/`,
  {
      onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if(progressEvent.total){
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          store.dispatch(OBTViewFilterEmployeeActionProgress(progress));
        }
      }
    }
  );
  return response.data;
};


const OBTViewApiCall = async () => {
  const response = await axios.get("http://172.16.168.155:8000/api/obt/",
  {
      onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if(progressEvent.total){
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          store.dispatch(OBTViewActionProgress(progress));
        }
      }
    }
  );
  return response.data;
};

export const OBTViewEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(OBTViewAction.type),
    switchMap(() =>
      from(
        OBTViewApiCall()
      ).pipe(
        map((data) => {
          return OBTViewActionSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data['Error Message']) {
            return of(OBTViewActionFailure(error.response.data['Error Message'])); // Extract error message from the response
          } else {
            return of(OBTViewActionFailure(error.message)); // If there is no custom error message, use the default one
          }
        })
      )
    )
);

export const OBTViewFilterEmployeeEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(OBTViewFilterEmployeeAction.type),
    switchMap((action: ReturnType<typeof OBTViewFilterEmployeeAction>) =>
      from(
        OBTViewFilterEmployeeApiCall(action?.payload)
      ).pipe(
        map((data) => {
          return OBTViewFilterEmployeeActionSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data['Error Message']) {
            return of(OBTViewFilterEmployeeActionFailure(error.response.data['Error Message'])); // Extract error message from the response
          } else {
            return of(OBTViewFilterEmployeeActionFailure(error.message)); // If there is no custom error message, use the default one
          }
        })
      )
    )
);

export const OBTViewFilterEmployeeAndOBTEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(OBTViewFilterEmployeeAndOBTAction.type),
    switchMap((action: ReturnType<typeof OBTViewFilterEmployeeAndOBTAction>) =>
      from(
        OBTViewFilterEmployeeAndOBTApiCall(action?.payload)
      ).pipe(
        map((data) => {
          return OBTViewFilterEmployeeAndOBTActionSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data['Error Message']) {
            return of(OBTViewFilterEmployeeAndOBTActionFailure(error.response.data['Error Message'])); // Extract error message from the response
          } else {
            return of(OBTViewFilterEmployeeAndOBTActionFailure(error.message)); // If there is no custom error message, use the default one
          }
        })
      )
    )
);

export const OBTViewFilterApproverEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(OBTViewFilterApproverAction.type),
    switchMap((action: ReturnType<typeof OBTViewFilterApproverAction>) =>
      from(
        OBTViewFilterApproverApiCall(action?.payload)
      ).pipe(
        map((data) => {
          return OBTViewFilterApproverActionSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data['Error Message']) {
            return of(OBTViewFilterApproverActionFailure(error.response.data['Error Message'])); // Extract error message from the response
          } else {
            return of(OBTViewFilterApproverActionFailure(error.message)); // If there is no custom error message, use the default one
          }
        })
      )
    )
);

export const OBTCreateEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(OBTCreateAction.type),
    switchMap((action: ReturnType<typeof OBTCreateAction>) =>
      from(
        OBTCreateApiCall(action?.payload)
      ).pipe(
        map((data) => {
          return OBTCreateActionSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data['Error Message']) {
            return of(OBTCreateActionFailure(error.response.data['Error Message'])); // Extract error message from the response
          } else {
            return of(OBTCreateActionFailure(error.message)); // If there is no custom error message, use the default one
          }
        })
      )
    )
);

export const OBTEditEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(OBTEditAction.type),
    switchMap((action: ReturnType<typeof OBTEditAction>) =>
      from(
        OBTEditApiCall(action?.payload)
      ).pipe(
        map((data) => {
          return OBTEditActionSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data['Error Message']) {
            return of(OBTEditActionFailure(error.response.data['Error Message'])); // Extract error message from the response
          } else {
            return of(OBTEditActionFailure(error.message)); // If there is no custom error message, use the default one
          }
        })
      )
    )
);

// OVERTIME API SECTION // OVERTIME API SECTION // OVERTIME API SECTION // OVERTIME API SECTION // OVERTIME API SECTION
const OVERTIMEEditApiCall = async (payload: OVERTIMEEditInterface) => {
  const response = await axios.put(`http://172.16.168.155:8000/api/ot/${payload.emp_no}/${payload.id}/`,
  payload,
  {
      onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if(progressEvent.total){
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          store.dispatch(OVERTIMEEditActionProgress(progress));
        }
      }
    }
  );
  return response.data;
};

const OVERTIMECreateApiCall = async (payload: OVERTIMECreateInterface) => {
  const response = await axios.post(`http://172.16.168.155:8000/api/ot/`,
  payload,
  {
      onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if(progressEvent.total){
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          store.dispatch(OVERTIMECreateActionProgress(progress));
        }
      }
    }
  );
  return response.data;
};


const OVERTIMEViewFilterApproverApiCall = async (payload: {emp_no: number}) => {
  const response = await axios.get(`http://172.16.168.155:8000/api/ot/approver/${payload.emp_no}/`,
  {
      onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if(progressEvent.total){
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          store.dispatch(OVERTIMEViewFilterApproverActionProgress(progress));
        }
      }
    }
  );
  return response.data;
};


const OVERTIMEViewFilterEmployeeAndOVERTIMEApiCall = async (payload: {emp_no: number, ot_id: number}) => {
  const response = await axios.get(`http://172.16.168.155:8000/api/ot/${payload.emp_no}/${payload.ot_id}`,
  {
      onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if(progressEvent.total){
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          store.dispatch(OVERTIMEViewFilterEmployeeAndOVERTIMEActionProgress(progress));
        }
      }
    }
  );
  return response.data;
};

const OVERTIMEViewFilterEmployeeApiCall = async (payload: {emp_no: number}) => {
  const response = await axios.get(`http://172.16.168.155:8000/api/ot/${payload.emp_no}/`,
  {
      onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if(progressEvent.total){
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          store.dispatch(OVERTIMEViewFilterEmployeeActionProgress(progress));
        }
      }
    }
  );
  return response.data;
};


const OVERTIMEViewApiCall = async () => {
  const response = await axios.get("http://172.16.168.155:8000/api/ot/",
  {
      onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if(progressEvent.total){
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          store.dispatch(OVERTIMEViewActionProgress(progress));
        }
      }
    }
  );
  return response.data;
};

export const OVERTIMEViewEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(OVERTIMEViewAction.type),
    switchMap(() =>
      from(
        OVERTIMEViewApiCall()
      ).pipe(
        map((data) => {
          return OVERTIMEViewActionSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data['Error Message']) {
            return of(OVERTIMEViewActionFailure(error.response.data['Error Message'])); // Extract error message from the response
          } else {
            return of(OVERTIMEViewActionFailure(error.message)); // If there is no custom error message, use the default one
          }
        })
      )
    )
);

export const OVERTIMEViewFilterEmployeeEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(OVERTIMEViewFilterEmployeeAction.type),
    switchMap((action: ReturnType<typeof OVERTIMEViewFilterEmployeeAction>) =>
      from(
        OVERTIMEViewFilterEmployeeApiCall(action?.payload)
      ).pipe(
        map((data) => {
          return OVERTIMEViewFilterEmployeeActionSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data['Error Message']) {
            return of(OVERTIMEViewFilterEmployeeActionFailure(error.response.data['Error Message'])); // Extract error message from the response
          } else {
            return of(OVERTIMEViewFilterEmployeeActionFailure(error.message)); // If there is no custom error message, use the default one
          }
        })
      )
    )
);

export const OVERTIMEViewFilterEmployeeAndOVERTIMEEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(OVERTIMEViewFilterEmployeeAndOVERTIMEAction.type),
    switchMap((action: ReturnType<typeof OVERTIMEViewFilterEmployeeAndOVERTIMEAction>) =>
      from(
        OVERTIMEViewFilterEmployeeAndOVERTIMEApiCall(action?.payload)
      ).pipe(
        map((data) => {
          return OVERTIMEViewFilterEmployeeAndOVERTIMEActionSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data['Error Message']) {
            return of(OVERTIMEViewFilterEmployeeAndOVERTIMEActionFailure(error.response.data['Error Message'])); // Extract error message from the response
          } else {
            return of(OVERTIMEViewFilterEmployeeAndOVERTIMEActionFailure(error.message)); // If there is no custom error message, use the default one
          }
        })
      )
    )
);

export const OVERTIMEViewFilterApproverEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(OVERTIMEViewFilterApproverAction.type),
    switchMap((action: ReturnType<typeof OVERTIMEViewFilterApproverAction>) =>
      from(
        OVERTIMEViewFilterApproverApiCall(action?.payload)
      ).pipe(
        map((data) => {
          return OVERTIMEViewFilterApproverActionSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data['Error Message']) {
            return of(OVERTIMEViewFilterApproverActionFailure(error.response.data['Error Message'])); // Extract error message from the response
          } else {
            return of(OVERTIMEViewFilterApproverActionFailure(error.message)); // If there is no custom error message, use the default one
          }
        })
      )
    )
);

export const OVERTIMECreateEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(OVERTIMECreateAction.type),
    switchMap((action: ReturnType<typeof OVERTIMECreateAction>) =>
      from(
        OVERTIMECreateApiCall(action?.payload)
      ).pipe(
        map((data) => {
          return OVERTIMECreateActionSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data['Error Message']) {
            return of(OVERTIMECreateActionFailure(error.response.data['Error Message'])); // Extract error message from the response
          } else {
            return of(OVERTIMECreateActionFailure(error.message)); // If there is no custom error message, use the default one
          }
        })
      )
    )
);

export const OVERTIMEEditEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(OVERTIMEEditAction.type),
    switchMap((action: ReturnType<typeof OVERTIMEEditAction>) =>
      from(
        OVERTIMEEditApiCall(action?.payload)
      ).pipe(
        map((data) => {
          return OVERTIMEEditActionSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data['Error Message']) {
            return of(OVERTIMEEditActionFailure(error.response.data['Error Message'])); // Extract error message from the response
          } else {
            return of(OVERTIMEEditActionFailure(error.message)); // If there is no custom error message, use the default one
          }
        })
      )
    )
);

// LEAVE API SECTION // LEAVE API SECTION // LEAVE API SECTION // LEAVE API SECTION // LEAVE API SECTION
const LEAVEEditApiCall = async (payload: LEAVEEditInterface) => {
  const response = await axios.put(`http://172.16.168.155:8000/api/leave/${payload.emp_no}/${payload.id}/`,
  payload,
  {
      onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if(progressEvent.total){
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          store.dispatch(LEAVEEditActionProgress(progress));
        }
      }
    }
  );
  return response.data;
};

const LEAVECreateApiCall = async (payload: LEAVECreateInterface) => {
  const response = await axios.post(`http://172.16.168.155:8000/api/leave/`,
  payload,
  {
      onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if(progressEvent.total){
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          store.dispatch(LEAVECreateActionProgress(progress));
        }
      }
    }
  );
  return response.data;
};


const LEAVEViewFilterApproverApiCall = async (payload: {emp_no: number}) => {
  const response = await axios.get(`http://172.16.168.155:8000/api/leave/approver/${payload.emp_no}/`,
  {
      onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if(progressEvent.total){
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          store.dispatch(LEAVEViewFilterApproverActionProgress(progress));
        }
      }
    }
  );
  return response.data;
};


const LEAVEViewFilterEmployeeAndLEAVEApiCall = async (payload: {emp_no: number, lv_id: number}) => {
  const response = await axios.get(`http://172.16.168.155:8000/api/leave/${payload.emp_no}/${payload.lv_id}`,
  {
      onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if(progressEvent.total){
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          store.dispatch(LEAVEViewFilterEmployeeAndLEAVEActionProgress(progress));
        }
      }
    }
  );
  return response.data;
};

const LEAVEViewFilterEmployeeApiCall = async (payload: {emp_no: number}) => {
  const response = await axios.get(`http://172.16.168.155:8000/api/leave/${payload.emp_no}/`,
  {
      onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if(progressEvent.total){
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          store.dispatch(LEAVEViewFilterEmployeeActionProgress(progress));
        }
      }
    }
  );
  return response.data;
};


const LEAVEViewApiCall = async () => {
  const response = await axios.get("http://172.16.168.155:8000/api/leave/",
  {
      onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if(progressEvent.total){
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          store.dispatch(LEAVEViewActionProgress(progress));
        }
      }
    }
  );
  return response.data;
};

export const LEAVEViewEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(LEAVEViewAction.type),
    switchMap(() =>
      from(
        LEAVEViewApiCall()
      ).pipe(
        map((data) => {
          return LEAVEViewActionSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data['Error Message']) {
            return of(LEAVEViewActionFailure(error.response.data['Error Message'])); // Extract error message from the response
          } else {
            return of(LEAVEViewActionFailure(error.message)); // If there is no custom error message, use the default one
          }
        })
      )
    )
);

export const LEAVEViewFilterEmployeeEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(LEAVEViewFilterEmployeeAction.type),
    switchMap((action: ReturnType<typeof LEAVEViewFilterEmployeeAction>) =>
      from(
        LEAVEViewFilterEmployeeApiCall(action?.payload)
      ).pipe(
        map((data) => {
          return LEAVEViewFilterEmployeeActionSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data['Error Message']) {
            return of(LEAVEViewFilterEmployeeActionFailure(error.response.data['Error Message'])); // Extract error message from the response
          } else {
            return of(LEAVEViewFilterEmployeeActionFailure(error.message)); // If there is no custom error message, use the default one
          }
        })
      )
    )
);

export const LEAVEViewFilterEmployeeAndLEAVEEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(LEAVEViewFilterEmployeeAndLEAVEAction.type),
    switchMap((action: ReturnType<typeof LEAVEViewFilterEmployeeAndLEAVEAction>) =>
      from(
        LEAVEViewFilterEmployeeAndLEAVEApiCall(action?.payload)
      ).pipe(
        map((data) => {
          return LEAVEViewFilterEmployeeAndLEAVEActionSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data['Error Message']) {
            return of(LEAVEViewFilterEmployeeAndLEAVEActionFailure(error.response.data['Error Message'])); // Extract error message from the response
          } else {
            return of(LEAVEViewFilterEmployeeAndLEAVEActionFailure(error.message)); // If there is no custom error message, use the default one
          }
        })
      )
    )
);

export const LEAVEViewFilterApproverEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(LEAVEViewFilterApproverAction.type),
    switchMap((action: ReturnType<typeof LEAVEViewFilterApproverAction>) =>
      from(
        LEAVEViewFilterApproverApiCall(action?.payload)
      ).pipe(
        map((data) => {
          return LEAVEViewFilterApproverActionSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data['Error Message']) {
            return of(LEAVEViewFilterApproverActionFailure(error.response.data['Error Message'])); // Extract error message from the response
          } else {
            return of(LEAVEViewFilterApproverActionFailure(error.message)); // If there is no custom error message, use the default one
          }
        })
      )
    )
);

export const LEAVECreateEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(LEAVECreateAction.type),
    switchMap((action: ReturnType<typeof LEAVECreateAction>) =>
      from(
        LEAVECreateApiCall(action?.payload)
      ).pipe(
        map((data) => {
          return LEAVECreateActionSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data['Error Message']) {
            return of(LEAVECreateActionFailure(error.response.data['Error Message'])); // Extract error message from the response
          } else {
            return of(LEAVECreateActionFailure(error.message)); // If there is no custom error message, use the default one
          }
        })
      )
    )
);

export const LEAVEEditEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(LEAVEEditAction.type),
    switchMap((action: ReturnType<typeof LEAVEEditAction>) =>
      from(
        LEAVEEditApiCall(action?.payload)
      ).pipe(
        map((data) => {
          return LEAVEEditActionSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data['Error Message']) {
            return of(LEAVEEditActionFailure(error.response.data['Error Message'])); // Extract error message from the response
          } else {
            return of(LEAVEEditActionFailure(error.message)); // If there is no custom error message, use the default one
          }
        })
      )
    )
);

// UA API SECTION // UA API SECTION // UA API SECTION // UA API SECTION // UA API SECTION
const UAEditApiCall = async (payload: UAEditInterface) => {
  const response = await axios.put(`http://172.16.168.155:8000/api/ua/${payload.emp_no}/${payload.id}/`,
  payload,
  {
      onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if(progressEvent.total){
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          store.dispatch(UAEditActionProgress(progress));
        }
      }
    }
  );
  return response.data;
};

const UACreateApiCall = async (payload: UACreateInterface) => {
  const response = await axios.post(`http://172.16.168.155:8000/api/ua/`,
  payload,
  {
      onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if(progressEvent.total){
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          store.dispatch(UACreateActionProgress(progress));
        }
      }
    }
  );
  return response.data;
};


const UAViewFilterApproverApiCall = async (payload: {emp_no: number}) => {
  const response = await axios.get(`http://172.16.168.155:8000/api/ua/approver/${payload.emp_no}/`,
  {
      onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if(progressEvent.total){
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          store.dispatch(UAViewFilterApproverActionProgress(progress));
        }
      }
    }
  );
  return response.data;
};


const UAViewFilterEmployeeAndUAApiCall = async (payload: {emp_no: number, ua_id: number}) => {
  const response = await axios.get(`http://172.16.168.155:8000/api/ua/${payload.emp_no}/${payload.ua_id}`,
  {
      onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if(progressEvent.total){
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          store.dispatch(UAViewFilterEmployeeAndUAActionProgress(progress));
        }
      }
    }
  );
  return response.data;
};

const UAViewFilterEmployeeApiCall = async (payload: {emp_no: number}) => {
  const response = await axios.get(`http://172.16.168.155:8000/api/ua/${payload.emp_no}/`,
  {
      onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if(progressEvent.total){
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          store.dispatch(UAViewFilterEmployeeActionProgress(progress));
        }
      }
    }
  );
  return response.data;
};


const UAViewApiCall = async () => {
  const response = await axios.get("http://172.16.168.155:8000/api/ua/",
  {
      onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if(progressEvent.total){
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          store.dispatch(UAViewActionProgress(progress));
        }
      }
    }
  );
  return response.data;
};

export const UAViewEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(UAViewAction.type),
    switchMap(() =>
      from(
        UAViewApiCall()
      ).pipe(
        map((data) => {
          return UAViewActionSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data['Error Message']) {
            return of(UAViewActionFailure(error.response.data['Error Message'])); // Extract error message from the response
          } else {
            return of(UAViewActionFailure(error.message)); // If there is no custom error message, use the default one
          }
        })
      )
    )
);

export const UAViewFilterEmployeeEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(UAViewFilterEmployeeAction.type),
    switchMap((action: ReturnType<typeof UAViewFilterEmployeeAction>) =>
      from(
        UAViewFilterEmployeeApiCall(action?.payload)
      ).pipe(
        map((data) => {
          return UAViewFilterEmployeeActionSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data['Error Message']) {
            return of(UAViewFilterEmployeeActionFailure(error.response.data['Error Message'])); // Extract error message from the response
          } else {
            return of(UAViewFilterEmployeeActionFailure(error.message)); // If there is no custom error message, use the default one
          }
        })
      )
    )
);

export const UAViewFilterEmployeeAndUAEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(UAViewFilterEmployeeAndUAAction.type),
    switchMap((action: ReturnType<typeof UAViewFilterEmployeeAndUAAction>) =>
      from(
        UAViewFilterEmployeeAndUAApiCall(action?.payload)
      ).pipe(
        map((data) => {
          return UAViewFilterEmployeeAndUAActionSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data['Error Message']) {
            return of(UAViewFilterEmployeeAndUAActionFailure(error.response.data['Error Message'])); // Extract error message from the response
          } else {
            return of(UAViewFilterEmployeeAndUAActionFailure(error.message)); // If there is no custom error message, use the default one
          }
        })
      )
    )
);

export const UAViewFilterApproverEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(UAViewFilterApproverAction.type),
    switchMap((action: ReturnType<typeof UAViewFilterApproverAction>) =>
      from(
        UAViewFilterApproverApiCall(action?.payload)
      ).pipe(
        map((data) => {
          return UAViewFilterApproverActionSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data['Error Message']) {
            return of(UAViewFilterApproverActionFailure(error.response.data['Error Message'])); // Extract error message from the response
          } else {
            return of(UAViewFilterApproverActionFailure(error.message)); // If there is no custom error message, use the default one
          }
        })
      )
    )
);

export const UACreateEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(UACreateAction.type),
    switchMap((action: ReturnType<typeof UACreateAction>) =>
      from(
        UACreateApiCall(action?.payload)
      ).pipe(
        map((data) => {
          return UACreateActionSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data['Error Message']) {
            return of(UACreateActionFailure(error.response.data['Error Message'])); // Extract error message from the response
          } else {
            return of(UACreateActionFailure(error.message)); // If there is no custom error message, use the default one
          }
        })
      )
    )
);

export const UAEditEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(UAEditAction.type),
    switchMap((action: ReturnType<typeof UAEditAction>) =>
      from(
        UAEditApiCall(action?.payload)
      ).pipe(
        map((data) => {
          return UAEditActionSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data['Error Message']) {
            return of(UAEditActionFailure(error.response.data['Error Message'])); // Extract error message from the response
          } else {
            return of(UAEditActionFailure(error.message)); // If there is no custom error message, use the default one
          }
        })
      )
    )
);