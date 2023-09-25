import { ofType } from 'redux-observable';
import { map, catchError, switchMap, mergeMap } from 'rxjs/operators';
import { of, from } from 'rxjs';
import axios, { AxiosProgressEvent } from 'axios';
import { beautifyJSON } from '@/helpers/utils';
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
    UAViewFilterEmployeeAndUAActionSuccess,
    //LEAVECREDIT SECTION,
    LEAVECREDITCreateAction,
    LEAVECREDITCreateActionFailure,
    LEAVECREDITCreateActionFailureCleanup,
    LEAVECREDITCreateActionProgress,
    LEAVECREDITCreateActionSuccess,
    LEAVECREDITEditAction,
    LEAVECREDITEditActionFailure,
    LEAVECREDITEditActionFailureCleanup,
    LEAVECREDITEditActionProgress,
    LEAVECREDITEditActionSuccess,
    LEAVECREDITViewAction,
    LEAVECREDITViewActionFailure,
    LEAVECREDITViewActionFailureCleanup,
    LEAVECREDITViewActionProgress,
    LEAVECREDITViewActionSuccess,
    LEAVECREDITViewFilterEmployeeAction,
    LEAVECREDITViewFilterEmployeeActionFailure,
    LEAVECREDITViewFilterEmployeeActionFailureCleanup,
    LEAVECREDITViewFilterEmployeeActionProgress,
    LEAVECREDITViewFilterEmployeeActionSuccess,
    //LEAVETYPE SECTION,
    LEAVETYPECreateAction,
    LEAVETYPECreateActionFailure,
    LEAVETYPECreateActionFailureCleanup,
    LEAVETYPECreateActionProgress,
    LEAVETYPECreateActionSuccess,
    LEAVETYPEEditAction,
    LEAVETYPEEditActionFailure,
    LEAVETYPEEditActionFailureCleanup,
    LEAVETYPEEditActionProgress,
    LEAVETYPEEditActionSuccess,
    LEAVETYPEViewAction,
    LEAVETYPEViewActionFailure,
    LEAVETYPEViewActionFailureCleanup,
    LEAVETYPEViewActionProgress,
    LEAVETYPEViewActionSuccess,
    LEAVETYPEViewFilterEmployeeAction,
    LEAVETYPEViewFilterEmployeeActionFailure,
    LEAVETYPEViewFilterEmployeeActionFailureCleanup,
    LEAVETYPEViewFilterEmployeeActionProgress,
    LEAVETYPEViewFilterEmployeeActionSuccess,
    LEAVETYPEDeleteAction,
    LEAVETYPEDeleteActionFailure,
    LEAVETYPEDeleteActionFailureCleanup,
    LEAVETYPEDeleteActionProgress,
    LEAVETYPEDeleteActionSuccess,
    //CUTOFFPERIOD SECTION,
    CUTOFFPERIODCreateAction,
    CUTOFFPERIODCreateActionFailure,
    CUTOFFPERIODCreateActionFailureCleanup,
    CUTOFFPERIODCreateActionProgress,
    CUTOFFPERIODCreateActionSuccess,
    CUTOFFPERIODEditAction,
    CUTOFFPERIODEditActionFailure,
    CUTOFFPERIODEditActionFailureCleanup,
    CUTOFFPERIODEditActionProgress,
    CUTOFFPERIODEditActionSuccess,
    CUTOFFPERIODViewAction,
    CUTOFFPERIODViewActionFailure,
    CUTOFFPERIODViewActionFailureCleanup,
    CUTOFFPERIODViewActionProgress,
    CUTOFFPERIODViewActionSuccess,
    CUTOFFPERIODViewFilterCUTOFFPERIODAction,
    CUTOFFPERIODViewFilterCUTOFFPERIODActionFailure,
    CUTOFFPERIODViewFilterCUTOFFPERIODActionFailureCleanup,
    CUTOFFPERIODViewFilterCUTOFFPERIODActionProgress,
    CUTOFFPERIODViewFilterCUTOFFPERIODActionSuccess,
    //SCHEDULESHIFT SECTION,
    SCHEDULESHIFTCreateAction,
    SCHEDULESHIFTCreateActionFailure,
    SCHEDULESHIFTCreateActionFailureCleanup,
    SCHEDULESHIFTCreateActionProgress,
    SCHEDULESHIFTCreateActionSuccess,
    SCHEDULESHIFTEditAction,
    SCHEDULESHIFTEditActionFailure,
    SCHEDULESHIFTEditActionFailureCleanup,
    SCHEDULESHIFTEditActionProgress,
    SCHEDULESHIFTEditActionSuccess,
    SCHEDULESHIFTViewAction,
    SCHEDULESHIFTViewActionFailure,
    SCHEDULESHIFTViewActionFailureCleanup,
    SCHEDULESHIFTViewActionProgress,
    SCHEDULESHIFTViewActionSuccess,
    SCHEDULESHIFTViewFilterSCHEDULESHIFTAction,
    SCHEDULESHIFTViewFilterSCHEDULESHIFTActionFailure,
    SCHEDULESHIFTViewFilterSCHEDULESHIFTActionFailureCleanup,
    SCHEDULESHIFTViewFilterSCHEDULESHIFTActionProgress,
    SCHEDULESHIFTViewFilterSCHEDULESHIFTActionSuccess,
    SCHEDULESHIFTDeleteAction,
    SCHEDULESHIFTDeleteActionFailure,
    SCHEDULESHIFTDeleteActionFailureCleanup,
    SCHEDULESHIFTDeleteActionProgress,
    SCHEDULESHIFTDeleteActionSuccess,
    //SCHEDULEDAILY SECTION,
    SCHEDULEDAILYCreateAction,
    SCHEDULEDAILYCreateActionFailure,
    SCHEDULEDAILYCreateActionFailureCleanup,
    SCHEDULEDAILYCreateActionProgress,
    SCHEDULEDAILYCreateActionSuccess,
    SCHEDULEDAILYEditAction,
    SCHEDULEDAILYEditActionFailure,
    SCHEDULEDAILYEditActionFailureCleanup,
    SCHEDULEDAILYEditActionProgress,
    SCHEDULEDAILYEditActionSuccess,
    SCHEDULEDAILYViewAction,
    SCHEDULEDAILYViewActionFailure,
    SCHEDULEDAILYViewActionFailureCleanup,
    SCHEDULEDAILYViewActionProgress,
    SCHEDULEDAILYViewActionSuccess,
    SCHEDULEDAILYViewFilterEmployeeAction,
    SCHEDULEDAILYViewFilterEmployeeActionFailure,
    SCHEDULEDAILYViewFilterEmployeeActionFailureCleanup,
    SCHEDULEDAILYViewFilterEmployeeActionProgress,
    SCHEDULEDAILYViewFilterEmployeeActionSuccess,
    SCHEDULEDAILYViewFilterEmployeeAndSCHEDULEDAILYAction,
    SCHEDULEDAILYViewFilterEmployeeAndSCHEDULEDAILYActionFailure,
    SCHEDULEDAILYViewFilterEmployeeAndSCHEDULEDAILYActionFailureCleanup,
    SCHEDULEDAILYViewFilterEmployeeAndSCHEDULEDAILYActionProgress,
    SCHEDULEDAILYViewFilterEmployeeAndSCHEDULEDAILYActionSuccess,
} from '../actions/procedurals';
import { Epic } from 'redux-observable';
import store, { APILink } from '../configureStore';
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
  LEAVECREDITCreateInterface, 
  LEAVECREDITEditInterface, 
  LEAVECREDITViewInterface, 
  LEAVETYPECreateInterface, 
  LEAVETYPEEditInterface, 
  LEAVETYPEViewInterface, 
  CUTOFFPERIODCreateInterface, 
  CUTOFFPERIODEditInterface, 
  CUTOFFPERIODViewInterface, 
  SCHEDULESHIFTCreateInterface, 
  SCHEDULESHIFTEditInterface, 
  SCHEDULESHIFTViewInterface, 
  SCHEDULEDAILYCreateInterface, 
  SCHEDULEDAILYEditInterface, 
  SCHEDULEDAILYViewInterface, 
} from '@/types/types-pages';


// HOLIDAY API SECTION // HOLIDAY API SECTION // HOLIDAY API SECTION // HOLIDAY API SECTION // HOLIDAY API SECTION
const HolidayEditSubmitApiCall = async (payload: HolidayGetType): Promise<HolidayGetType> => {
  const response = await axios.put(`${APILink}holiday/${payload.id}/`,
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
const response = await axios.post(`${APILink}holiday/`,
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
  const response = await axios.get(`${APILink}holiday/`, 
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
          return of(HolidaysGetFailure(beautifyJSON(error.response.data))); 
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
        if (error.response && error.response.data && error.response.data['Error Message']) {
          return of(HolidayCreateFailure(error.response.data['Error Message'])); // Extract error message from the response
        } else {
          return of(HolidayCreateFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
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
          return of(HolidayEditSubmitFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
        }
      })
    )
  )
);


// OBT API SECTION // OBT API SECTION // OBT API SECTION // OBT API SECTION // OBT API SECTION
const OBTEditApiCall = async (payload: OBTEditInterface) => {
  const response = await axios.put(`${APILink}obt/${payload.emp_no}/${payload.id}/`,
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
  const response = await axios.post(`${APILink}obt/`,
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
  const response = await axios.get(`${APILink}obt/approver/${payload.emp_no}/`,
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
  const response = await axios.get(`${APILink}obt/${payload.emp_no}/${payload.obt_id}`,
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
  const response = await axios.get(`${APILink}obt/${payload.emp_no}/`,
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
  const response = await axios.get(`${APILink}obt/`,
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
            return of(OBTViewActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
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
            return of(OBTViewFilterEmployeeActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
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
            return of(OBTViewFilterEmployeeAndOBTActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
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
            return of(OBTViewFilterApproverActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
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
          if (error.response && error.response.data && error.response.data) {
            return of(OBTCreateActionFailure(`${beautifyJSON(error.response.data)}`)); // Extract error message from the response
          } else {
            return of(OBTCreateActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
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
            return of(OBTEditActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
          }
        })
      )
    )
);

// OVERTIME API SECTION // OVERTIME API SECTION // OVERTIME API SECTION // OVERTIME API SECTION // OVERTIME API SECTION
const OVERTIMEEditApiCall = async (payload: OVERTIMEEditInterface) => {
  const response = await axios.put(`${APILink}ot/${payload.emp_no}/${payload.id}/`,
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
  const response = await axios.post(`${APILink}ot/`,
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
  const response = await axios.get(`${APILink}ot/approver/${payload.emp_no}/`,
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
  const response = await axios.get(`${APILink}ot/${payload.emp_no}/${payload.ot_id}`,
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
  const response = await axios.get(`${APILink}ot/${payload.emp_no}/`,
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
  const response = await axios.get(`${APILink}ot/`,
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
            return of(OVERTIMEViewActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
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
            return of(OVERTIMEViewFilterEmployeeActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
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
            return of(OVERTIMEViewFilterEmployeeAndOVERTIMEActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
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
            return of(OVERTIMEViewFilterApproverActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
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
            return of(OVERTIMECreateActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
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
            return of(OVERTIMEEditActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
          }
        })
      )
    )
);

// LEAVE API SECTION // LEAVE API SECTION // LEAVE API SECTION // LEAVE API SECTION // LEAVE API SECTION
const LEAVEEditApiCall = async (payload: LEAVEEditInterface) => {
  const response = await axios.put(`${APILink}leave/${payload.emp_no}/${payload.id}/`,
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
  const response = await axios.post(`${APILink}leave/`,
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
  const response = await axios.get(`${APILink}leave/approver/${payload.emp_no}/`,
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
  const response = await axios.get(`${APILink}leave/${payload.emp_no}/${payload.lv_id}`,
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
  const response = await axios.get(`${APILink}leave/${payload.emp_no}/`,
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
  const response = await axios.get(`${APILink}leave/`,
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
            return of(LEAVEViewActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
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
            return of(LEAVEViewFilterEmployeeActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
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
            return of(LEAVEViewFilterEmployeeAndLEAVEActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
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
            return of(LEAVEViewFilterApproverActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
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
            return of(LEAVECreateActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
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
            return of(LEAVEEditActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
          }
        })
      )
    )
);

// UA API SECTION // UA API SECTION // UA API SECTION // UA API SECTION // UA API SECTION
const UAEditApiCall = async (payload: UAEditInterface) => {
  const response = await axios.put(`${APILink}ua/${payload.emp_no}/${payload.id}/`,
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
  const response = await axios.post(`${APILink}ua/`,
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
  const response = await axios.get(`${APILink}ua/approver/${payload.emp_no}/`,
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
  const response = await axios.get(`${APILink}ua/${payload.emp_no}/${payload.ua_id}`,
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
  const response = await axios.get(`${APILink}ua/${payload.emp_no}/`,
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
  const response = await axios.get(`${APILink}ua/`,
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
            return of(UAViewActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
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
            return of(UAViewFilterEmployeeActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
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
            return of(UAViewFilterEmployeeAndUAActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
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
            return of(UAViewFilterApproverActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
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
            return of(UACreateActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
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
            return of(UAEditActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
          }
        })
      )
    )
);

// LEAVECREDIT API SECTION // LEAVECREDIT API SECTION // LEAVECREDIT API SECTION // LEAVECREDIT API SECTION // LEAVECREDIT API SECTION
const LEAVECREDITEditApiCall = async (payload: LEAVECREDITEditInterface) => {
  const response = await axios.put(`${APILink}leave_credit/${payload.emp_no}/${payload.id}/`,
  payload,
  {
      onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if(progressEvent.total){
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          store.dispatch(LEAVECREDITEditActionProgress(progress));
        }
      }
    }
  );
  return response.data;
};

const LEAVECREDITCreateApiCall = async (payload: LEAVECREDITCreateInterface) => {
  const response = await axios.post(`${APILink}leave_credit/`,
  payload,
  {
      onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if(progressEvent.total){
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          store.dispatch(LEAVECREDITCreateActionProgress(progress));
        }
      }
    }
  );
  return response.data;
};

const LEAVECREDITViewFilterEmployeeApiCall = async (payload: {emp_no: number}) => {
  const response = await axios.get(`${APILink}leave_credit/${payload.emp_no}/`,
  {
      onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if(progressEvent.total){
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          store.dispatch(LEAVECREDITViewFilterEmployeeActionProgress(progress));
        }
      }
    }
  );
  return response.data;
};


const LEAVECREDITViewApiCall = async () => {
  const response = await axios.get(`${APILink}leave_credit/`,
  {
      onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if(progressEvent.total){
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          store.dispatch(LEAVECREDITViewActionProgress(progress));
        }
      }
    }
  );
  return response.data;
};

export const LEAVECREDITViewEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(LEAVECREDITViewAction.type),
    switchMap(() =>
      from(
        LEAVECREDITViewApiCall()
      ).pipe(
        map((data) => {
          return LEAVECREDITViewActionSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data['Error Message']) {
            return of(LEAVECREDITViewActionFailure(error.response.data['Error Message'])); // Extract error message from the response
          } else {
            return of(LEAVECREDITViewActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
          }
        })
      )
    )
);

export const LEAVECREDITViewFilterEmployeeEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(LEAVECREDITViewFilterEmployeeAction.type),
    switchMap((action: ReturnType<typeof LEAVECREDITViewFilterEmployeeAction>) =>
      from(
        LEAVECREDITViewFilterEmployeeApiCall(action?.payload)
      ).pipe(
        map((data) => {
          return LEAVECREDITViewFilterEmployeeActionSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data['Error Message']) {
            return of(LEAVECREDITViewFilterEmployeeActionFailure(error.response.data['Error Message'])); // Extract error message from the response
          } else {
            return of(LEAVECREDITViewFilterEmployeeActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
          }
        })
      )
    )
);

export const LEAVECREDITCreateEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(LEAVECREDITCreateAction.type),
    switchMap((action: ReturnType<typeof LEAVECREDITCreateAction>) =>
      from(
        LEAVECREDITCreateApiCall(action?.payload)
      ).pipe(
        map((data) => {
          return LEAVECREDITCreateActionSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data['Error Message']) {
            return of(LEAVECREDITCreateActionFailure(error.response.data['Error Message'])); // Extract error message from the response
          } else {
            return of(LEAVECREDITCreateActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
          }
        })
      )
    )
);

export const LEAVECREDITEditEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(LEAVECREDITEditAction.type),
    switchMap((action: ReturnType<typeof LEAVECREDITEditAction>) =>
      from(
        LEAVECREDITEditApiCall(action?.payload)
      ).pipe(
        map((data) => {
          return LEAVECREDITEditActionSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data['Error Message']) {
            return of(LEAVECREDITEditActionFailure(error.response.data['Error Message'])); // Extract error message from the response
          } else {
            return of(LEAVECREDITEditActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
          }
        })
      )
    )
);

// LEAVETYPE API SECTION // LEAVETYPE API SECTION // LEAVETYPE API SECTION // LEAVETYPE API SECTION // LEAVETYPE API SECTION
const LEAVETYPEDeleteApiCall = async (payload: {lt_id: number}) => {
  const response = await axios.delete(`${APILink}leave_type/${payload.lt_id}/`,
  {
      onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if(progressEvent.total){
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          store.dispatch(LEAVETYPEDeleteActionProgress(progress));
        }
      }
    }
  );
  return response.data;
};


const LEAVETYPEEditApiCall = async (payload: LEAVETYPEEditInterface) => {
  const response = await axios.put(`${APILink}leave_type/${payload.id}/`,
  payload,
  {
      onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if(progressEvent.total){
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          store.dispatch(LEAVETYPEEditActionProgress(progress));
        }
      }
    }
  );
  return response.data;
};

const LEAVETYPECreateApiCall = async (payload: LEAVETYPECreateInterface) => {
  const response = await axios.post(`${APILink}leave_type/`,
  payload,
  {
      onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if(progressEvent.total){
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          store.dispatch(LEAVETYPECreateActionProgress(progress));
        }
      }
    }
  );
  return response.data;
};

const LEAVETYPEViewFilterEmployeeApiCall = async (payload: {emp_no: number}) => {
  const response = await axios.get(`${APILink}leave_type/${payload.emp_no}/`,
  {
      onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if(progressEvent.total){
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          store.dispatch(LEAVETYPEViewFilterEmployeeActionProgress(progress));
        }
      }
    }
  );
  return response.data;
};


const LEAVETYPEViewApiCall = async () => {
  const response = await axios.get(`${APILink}leave_type/`,
  {
      onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if(progressEvent.total){
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          store.dispatch(LEAVETYPEViewActionProgress(progress));
        }
      }
    }
  );
  return response.data;
};

export const LEAVETYPEViewEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(LEAVETYPEViewAction.type),
    switchMap(() =>
      from(
        LEAVETYPEViewApiCall()
      ).pipe(
        map((data) => {
          return LEAVETYPEViewActionSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data['Error Message']) {
            return of(LEAVETYPEViewActionFailure(error.response.data['Error Message'])); // Extract error message from the response
          } else {
            return of(LEAVETYPEViewActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
          }
        })
      )
    )
);

export const LEAVETYPEViewFilterEmployeeEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(LEAVETYPEViewFilterEmployeeAction.type),
    switchMap((action: ReturnType<typeof LEAVETYPEViewFilterEmployeeAction>) =>
      from(
        LEAVETYPEViewFilterEmployeeApiCall(action?.payload)
      ).pipe(
        map((data) => {
          return LEAVETYPEViewFilterEmployeeActionSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data['Error Message']) {
            return of(LEAVETYPEViewFilterEmployeeActionFailure(error.response.data['Error Message'])); // Extract error message from the response
          } else {
            return of(LEAVETYPEViewFilterEmployeeActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
          }
        })
      )
    )
);

export const LEAVETYPECreateEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(LEAVETYPECreateAction.type),
    switchMap((action: ReturnType<typeof LEAVETYPECreateAction>) =>
      from(
        LEAVETYPECreateApiCall(action?.payload)
      ).pipe(
        map((data) => {
          return LEAVETYPECreateActionSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data['Error Message']) {
            return of(LEAVETYPECreateActionFailure(error.response.data['Error Message'])); // Extract error message from the response
          } else {
            return of(LEAVETYPECreateActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
          }
        })
      )
    )
);

export const LEAVETYPEEditEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(LEAVETYPEEditAction.type),
    switchMap((action: ReturnType<typeof LEAVETYPEEditAction>) =>
      from(
        LEAVETYPEEditApiCall(action?.payload)
      ).pipe(
        map((data) => {
          return LEAVETYPEEditActionSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data['Error Message']) {
            return of(LEAVETYPEEditActionFailure(error.response.data['Error Message'])); // Extract error message from the response
          } else {
            return of(LEAVETYPEEditActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
          }
        })
      )
    )
);

export const SCHEDULESHIFTDeleteEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(SCHEDULESHIFTDeleteAction.type),
    switchMap((action: ReturnType<typeof SCHEDULESHIFTDeleteAction>) =>
      from(
        SCHEDULESHIFTDeleteApiCall(action?.payload)
      ).pipe(
        map((data) => {
          return SCHEDULESHIFTDeleteActionSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data['Error Message']) {
            return of(SCHEDULESHIFTDeleteActionFailure(error.response.data['Error Message'])); // Extract error message from the response
          } else {
            return of(SCHEDULESHIFTDeleteActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
          }
        })
      )
    )
);


// CUTOFFPERIOD API SECTION // CUTOFFPERIOD API SECTION // CUTOFFPERIOD API SECTION // CUTOFFPERIOD API SECTION // CUTOFFPERIOD API SECTION
const CUTOFFPERIODEditApiCall = async (payload: CUTOFFPERIODEditInterface) => {
  const response = await axios.put(`${APILink}cutoff_period/${payload.id}/`,
  payload,
  {
      onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if(progressEvent.total){
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          store.dispatch(CUTOFFPERIODEditActionProgress(progress));
        }
      }
    }
  );
  return response.data;
};

const CUTOFFPERIODCreateApiCall = async (payload: CUTOFFPERIODCreateInterface) => {
  const response = await axios.post(`${APILink}cutoff_period/`,
  payload,
  {
      onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if(progressEvent.total){
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          store.dispatch(CUTOFFPERIODCreateActionProgress(progress));
        }
      }
    }
  );
  return response.data;
};

const CUTOFFPERIODViewFilterCUTOFFPERIODApiCall = async (payload: {co_id: number}) => {
  const response = await axios.get(`${APILink}cutoff_period/${payload.co_id}/`,
  {
      onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if(progressEvent.total){
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          store.dispatch(CUTOFFPERIODViewFilterCUTOFFPERIODActionProgress(progress));
        }
      }
    }
  );
  return response.data;
};


const CUTOFFPERIODViewApiCall = async () => {
  const response = await axios.get(`${APILink}cutoff_period/`,
  {
      onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if(progressEvent.total){
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          store.dispatch(CUTOFFPERIODViewActionProgress(progress));
        }
      }
    }
  );
  return response.data;
};

export const CUTOFFPERIODViewEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(CUTOFFPERIODViewAction.type),
    switchMap(() =>
      from(
        CUTOFFPERIODViewApiCall()
      ).pipe(
        map((data) => {
          return CUTOFFPERIODViewActionSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data['Error Message']) {
            return of(CUTOFFPERIODViewActionFailure(error.response.data['Error Message'])); // Extract error message from the response
          } else {
            return of(CUTOFFPERIODViewActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
          }
        })
      )
    )
);

export const CUTOFFPERIODViewFilterCUTOFFPERIODEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(CUTOFFPERIODViewFilterCUTOFFPERIODAction.type),
    switchMap((action: ReturnType<typeof CUTOFFPERIODViewFilterCUTOFFPERIODAction>) =>
      from(
        CUTOFFPERIODViewFilterCUTOFFPERIODApiCall(action?.payload)
      ).pipe(
        map((data) => {
          return CUTOFFPERIODViewFilterCUTOFFPERIODActionSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data['Error Message']) {
            return of(CUTOFFPERIODViewFilterCUTOFFPERIODActionFailure(error.response.data['Error Message'])); // Extract error message from the response
          } else {
            return of(CUTOFFPERIODViewFilterCUTOFFPERIODActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
          }
        })
      )
    )
);

export const CUTOFFPERIODCreateEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(CUTOFFPERIODCreateAction.type),
    switchMap((action: ReturnType<typeof CUTOFFPERIODCreateAction>) =>
      from(
        CUTOFFPERIODCreateApiCall(action?.payload)
      ).pipe(
        map((data) => {
          return CUTOFFPERIODCreateActionSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data['Error Message']) {
            return of(CUTOFFPERIODCreateActionFailure(error.response.data['Error Message'])); // Extract error message from the response
          } else {
            return of(CUTOFFPERIODCreateActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
          }
        })
      )
    )
);

export const CUTOFFPERIODEditEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(CUTOFFPERIODEditAction.type),
    switchMap((action: ReturnType<typeof CUTOFFPERIODEditAction>) =>
      from(
        CUTOFFPERIODEditApiCall(action?.payload)
      ).pipe(
        map((data) => {
          return CUTOFFPERIODEditActionSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data['Error Message']) {
            return of(CUTOFFPERIODEditActionFailure(error.response.data['Error Message'])); // Extract error message from the response
          } else {
            return of(CUTOFFPERIODEditActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
          }
        })
      )
    )
);

// SCHEDULESHIFT API SECTION // SCHEDULESHIFT API SECTION // SCHEDULESHIFT API SECTION // SCHEDULESHIFT API SECTION // SCHEDULESHIFT API SECTION
const SCHEDULESHIFTDeleteApiCall = async (payload: {ss_id: number}) => {
  const response = await axios.delete(`${APILink}schedule_shift/${payload.ss_id}/`,
  {
      onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if(progressEvent.total){
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          store.dispatch(SCHEDULESHIFTDeleteActionProgress(progress));
        }
      }
    }
  );
  return response.data;
};

const SCHEDULESHIFTEditApiCall = async (payload: SCHEDULESHIFTEditInterface) => {
  const response = await axios.put(`${APILink}schedule_shift/${payload.id}/`,
  payload,
  {
      onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if(progressEvent.total){
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          store.dispatch(SCHEDULESHIFTEditActionProgress(progress));
        }
      }
    }
  );
  return response.data;
};

const SCHEDULESHIFTCreateApiCall = async (payload: SCHEDULESHIFTCreateInterface) => {
  const response = await axios.post(`${APILink}schedule_shift/`,
  payload,
  {
      onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if(progressEvent.total){
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          store.dispatch(SCHEDULESHIFTCreateActionProgress(progress));
        }
      }
    }
  );
  return response.data;
};

const SCHEDULESHIFTViewFilterSCHEDULESHIFTApiCall = async (payload: {ss_id: number}) => {
  const response = await axios.get(`${APILink}schedule_shift/${payload.ss_id}/`,
  {
      onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if(progressEvent.total){
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          store.dispatch(SCHEDULESHIFTViewFilterSCHEDULESHIFTActionProgress(progress));
        }
      }
    }
  );
  return response.data;
};


const SCHEDULESHIFTViewApiCall = async () => {
  const response = await axios.get(`${APILink}schedule_shift/`,
  {
      onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if(progressEvent.total){
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          store.dispatch(SCHEDULESHIFTViewActionProgress(progress));
        }
      }
    }
  );
  return response.data;
};

export const SCHEDULESHIFTViewEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(SCHEDULESHIFTViewAction.type),
    switchMap(() =>
      from(
        SCHEDULESHIFTViewApiCall()
      ).pipe(
        map((data) => {
          return SCHEDULESHIFTViewActionSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data['Error Message']) {
            return of(SCHEDULESHIFTViewActionFailure(error.response.data['Error Message'])); // Extract error message from the response
          } else {
            return of(SCHEDULESHIFTViewActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
          }
        })
      )
    )
);

export const SCHEDULESHIFTViewFilterSCHEDULESHIFTEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(SCHEDULESHIFTViewFilterSCHEDULESHIFTAction.type),
    switchMap((action: ReturnType<typeof SCHEDULESHIFTViewFilterSCHEDULESHIFTAction>) =>
      from(
        SCHEDULESHIFTViewFilterSCHEDULESHIFTApiCall(action?.payload)
      ).pipe(
        map((data) => {
          return SCHEDULESHIFTViewFilterSCHEDULESHIFTActionSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data['Error Message']) {
            return of(SCHEDULESHIFTViewFilterSCHEDULESHIFTActionFailure(error.response.data['Error Message'])); // Extract error message from the response
          } else {
            return of(SCHEDULESHIFTViewFilterSCHEDULESHIFTActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
          }
        })
      )
    )
);

export const SCHEDULESHIFTCreateEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(SCHEDULESHIFTCreateAction.type),
    switchMap((action: ReturnType<typeof SCHEDULESHIFTCreateAction>) =>
      from(
        SCHEDULESHIFTCreateApiCall(action?.payload)
      ).pipe(
        map((data) => {
          return SCHEDULESHIFTCreateActionSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data['Error Message']) {
            return of(SCHEDULESHIFTCreateActionFailure(error.response.data['Error Message'])); // Extract error message from the response
          } else {
            return of(SCHEDULESHIFTCreateActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
          }
        })
      )
    )
);

export const SCHEDULESHIFTEditEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(SCHEDULESHIFTEditAction.type),
    switchMap((action: ReturnType<typeof SCHEDULESHIFTEditAction>) =>
      from(
        SCHEDULESHIFTEditApiCall(action?.payload)
      ).pipe(
        map((data) => {
          return SCHEDULESHIFTEditActionSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data['Error Message']) {
            return of(SCHEDULESHIFTEditActionFailure(error.response.data['Error Message'])); // Extract error message from the response
          } else {
            return of(SCHEDULESHIFTEditActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
          }
        })
      )
    )
);

export const LEAVETYPEDeleteEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(LEAVETYPEDeleteAction.type),
    switchMap((action: ReturnType<typeof LEAVETYPEDeleteAction>) =>
      from(
        LEAVETYPEDeleteApiCall(action?.payload)
      ).pipe(
        map((data) => {
          return LEAVETYPEDeleteActionSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data['Error Message']) {
            return of(LEAVETYPEDeleteActionFailure(error.response.data['Error Message'])); // Extract error message from the response
          } else {
            return of(LEAVETYPEDeleteActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
          }
        })
      )
    )
);

// SCHEDULEDAILY API SECTION // SCHEDULEDAILY API SECTION // SCHEDULEDAILY API SECTION // SCHEDULEDAILY API SECTION // SCHEDULEDAILY API SECTION
const SCHEDULEDAILYEditApiCall = async (payload: SCHEDULEDAILYEditInterface) => {
  const response = await axios.put(`${APILink}schedule_daily/${payload.emp_no}/${payload.id}/`,
  payload,
  {
      onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if(progressEvent.total){
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          store.dispatch(SCHEDULEDAILYEditActionProgress(progress));
        }
      }
    }
  );
  return response.data;
};

const SCHEDULEDAILYCreateApiCall = async (payload: SCHEDULEDAILYCreateInterface) => {
  const response = await axios.post(`${APILink}schedule_daily/`,
  payload,
  {
      onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if(progressEvent.total){
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          store.dispatch(SCHEDULEDAILYCreateActionProgress(progress));
        }
      }
    }
  );
  return response.data;
};

const SCHEDULEDAILYViewFilterEmployeeAndSCHEDULEDAILYApiCall = async (payload: {emp_no: number, sd_id: number}) => {
  const response = await axios.get(`${APILink}schedule_daily/${payload.emp_no}/${payload.sd_id}`,
  {
      onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if(progressEvent.total){
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          store.dispatch(SCHEDULEDAILYViewFilterEmployeeAndSCHEDULEDAILYActionProgress(progress));
        }
      }
    }
  );
  return response.data;
};

const SCHEDULEDAILYViewFilterEmployeeApiCall = async (payload: {emp_no: number}) => {
  const response = await axios.get(`${APILink}schedule_daily/${payload.emp_no}/`,
  {
      onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if(progressEvent.total){
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          store.dispatch(SCHEDULEDAILYViewFilterEmployeeActionProgress(progress));
        }
      }
    }
  );
  return response.data;
};


const SCHEDULEDAILYViewApiCall = async () => {
  const response = await axios.get(`${APILink}schedule_daily/`,
  {
      onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if(progressEvent.total){
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          store.dispatch(SCHEDULEDAILYViewActionProgress(progress));
        }
      }
    }
  );
  return response.data;
};

export const SCHEDULEDAILYViewEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(SCHEDULEDAILYViewAction.type),
    switchMap(() =>
      from(
        SCHEDULEDAILYViewApiCall()
      ).pipe(
        map((data) => {
          return SCHEDULEDAILYViewActionSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data['Error Message']) {
            return of(SCHEDULEDAILYViewActionFailure(error.response.data['Error Message'])); // Extract error message from the response
          } else {
            return of(SCHEDULEDAILYViewActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
          }
        })
      )
    )
);

export const SCHEDULEDAILYViewFilterEmployeeEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(SCHEDULEDAILYViewFilterEmployeeAction.type),
    switchMap((action: ReturnType<typeof SCHEDULEDAILYViewFilterEmployeeAction>) =>
      from(
        SCHEDULEDAILYViewFilterEmployeeApiCall(action?.payload)
      ).pipe(
        map((data) => {
          return SCHEDULEDAILYViewFilterEmployeeActionSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data['Error Message']) {
            return of(SCHEDULEDAILYViewFilterEmployeeActionFailure(error.response.data['Error Message'])); // Extract error message from the response
          } else {
            return of(SCHEDULEDAILYViewFilterEmployeeActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
          }
        })
      )
    )
);

export const SCHEDULEDAILYViewFilterEmployeeAndSCHEDULEDAILYEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(SCHEDULEDAILYViewFilterEmployeeAndSCHEDULEDAILYAction.type),
    switchMap((action: ReturnType<typeof SCHEDULEDAILYViewFilterEmployeeAndSCHEDULEDAILYAction>) =>
      from(
        SCHEDULEDAILYViewFilterEmployeeAndSCHEDULEDAILYApiCall(action?.payload)
      ).pipe(
        map((data) => {
          return SCHEDULEDAILYViewFilterEmployeeAndSCHEDULEDAILYActionSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data['Error Message']) {
            return of(SCHEDULEDAILYViewFilterEmployeeAndSCHEDULEDAILYActionFailure(error.response.data['Error Message'])); // Extract error message from the response
          } else {
            return of(SCHEDULEDAILYViewFilterEmployeeAndSCHEDULEDAILYActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
          }
        })
      )
    )
);

export const SCHEDULEDAILYCreateEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(SCHEDULEDAILYCreateAction.type),
    switchMap((action: ReturnType<typeof SCHEDULEDAILYCreateAction>) =>
      from(
        SCHEDULEDAILYCreateApiCall(action?.payload)
      ).pipe(
        map((data) => {
          return SCHEDULEDAILYCreateActionSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data['Error Message']) {
            return of(SCHEDULEDAILYCreateActionFailure(error.response.data['Error Message'])); // Extract error message from the response
          } else {
            return of(SCHEDULEDAILYCreateActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
          }
        })
      )
    )
);

export const SCHEDULEDAILYEditEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(SCHEDULEDAILYEditAction.type),
    switchMap((action: ReturnType<typeof SCHEDULEDAILYEditAction>) =>
      from(
        SCHEDULEDAILYEditApiCall(action?.payload)
      ).pipe(
        map((data) => {
          return SCHEDULEDAILYEditActionSuccess(data);
        }),
        catchError((error) => {
          if (error.response && error.response.data && error.response.data['Error Message']) {
            return of(SCHEDULEDAILYEditActionFailure(error.response.data['Error Message'])); // Extract error message from the response
          } else {
            return of(SCHEDULEDAILYEditActionFailure(beautifyJSON(error.response.data))); // If there is no custom error message, use the default one
          }
        })
      )
    )
);