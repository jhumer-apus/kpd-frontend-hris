import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { createEpicMiddleware } from 'redux-observable';
import { combineEpics } from 'redux-observable';
import { authReducer } from './reducers/auth';
import { employeesReducer } from './reducers/employees';
import { authEpic, fetchUserDataEpic } from './epics/auth';
import { employeesListEpic, employeesSpecificEpic } from './epics/employees';
import { dtrReducer } from './reducers/dtr';
import { viewAllDtrLogsEpic, viewMergedDtrLogsEpic, viewCutoffDtrSummaryEpic, getCutoffDTRListEpic, getCutoffDTRListEmployeeEpic, mergeCutoffListAndEmployeeEpic, summarizeCutoffListAndEmployeeEpic } from './epics/dtr';
import { payrollReducer } from './reducers/payroll';
import { processPayrollEpic, viewPayrollListEpic } from './epics/payroll';
import { 
  HolidayCreateEpic, 
  HolidayEditSubmitEpic, 
  HolidaysGetEpic, 
  //OBT SECTION
  OBTCreateEpic, 
  OBTEditEpic, 
  OBTViewEpic, 
  OBTViewFilterApproverEpic, 
  OBTViewFilterEmployeeAndOBTEpic, 
  OBTViewFilterEmployeeEpic,
  //OVERTIME SECTION
  OVERTIMECreateEpic, 
  OVERTIMEEditEpic, 
  OVERTIMEViewEpic, 
  OVERTIMEViewFilterApproverEpic, 
  OVERTIMEViewFilterEmployeeAndOVERTIMEEpic, 
  OVERTIMEViewFilterEmployeeEpic,
  //LEAVE SECTION
  LEAVECreateEpic, 
  LEAVEEditEpic, 
  LEAVEViewEpic, 
  LEAVEViewFilterApproverEpic, 
  LEAVEViewFilterEmployeeAndLEAVEEpic, 
  LEAVEViewFilterEmployeeEpic,
  //UA SECTION
  UACreateEpic, 
  UAEditEpic, 
  UAViewEpic, 
  UAViewFilterApproverEpic, 
  UAViewFilterEmployeeAndUAEpic, 
  UAViewFilterEmployeeEpic,
  //LEAVECREDIT SECTION
  LEAVECREDITCreateEpic, 
  LEAVECREDITEditEpic, 
  LEAVECREDITViewEpic, 
  LEAVECREDITViewFilterEmployeeEpic,
  //LEAVETYPE SECTION
  LEAVETYPECreateEpic, 
  LEAVETYPEEditEpic, 
  LEAVETYPEViewEpic, 
  LEAVETYPEViewFilterEmployeeEpic,
  LEAVETYPEDeleteEpic,
  //CUTOFFPERIOD SECTION
  CUTOFFPERIODCreateEpic, 
  CUTOFFPERIODEditEpic, 
  CUTOFFPERIODViewEpic, 
  CUTOFFPERIODViewFilterCUTOFFPERIODEpic,
  //SCHEDULESHIFT SECTION
  SCHEDULESHIFTCreateEpic, 
  SCHEDULESHIFTEditEpic, 
  SCHEDULESHIFTViewEpic, 
  SCHEDULESHIFTViewFilterSCHEDULESHIFTEpic,
  SCHEDULESHIFTDeleteEpic,  
  //SCHEDULEDAILY SECTION
  SCHEDULEDAILYCreateEpic, 
  SCHEDULEDAILYEditEpic, 
  SCHEDULEDAILYViewEpic, 
  SCHEDULEDAILYViewFilterEmployeeAndSCHEDULEDAILYEpic, 
  SCHEDULEDAILYViewFilterEmployeeEpic,
} from './epics/procedurals';
import { proceduralsReducer } from './reducers/procedurals';

const epicMiddleware = createEpicMiddleware();

const rootReducer = combineReducers({
  auth: authReducer,
  employees: employeesReducer,
  dtr: dtrReducer,
  payroll: payrollReducer,
  procedurals: proceduralsReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(epicMiddleware),
});

epicMiddleware.run(combineEpics(
  authEpic, 
  fetchUserDataEpic, 
  employeesListEpic, 
  employeesSpecificEpic,
  viewAllDtrLogsEpic, 
  viewMergedDtrLogsEpic, 
  viewCutoffDtrSummaryEpic,
  getCutoffDTRListEpic,
  getCutoffDTRListEmployeeEpic,
  mergeCutoffListAndEmployeeEpic,
  summarizeCutoffListAndEmployeeEpic,
  viewPayrollListEpic,
  processPayrollEpic,
  HolidayCreateEpic,
  HolidaysGetEpic,
  HolidayEditSubmitEpic,
  //OBT SECTION
  OBTViewEpic,
  OBTViewFilterEmployeeEpic,
  OBTViewFilterEmployeeAndOBTEpic,
  OBTViewFilterApproverEpic,
  OBTCreateEpic,
  OBTEditEpic,
  //OVERTIME SECTION
  OVERTIMEViewEpic,
  OVERTIMEViewFilterEmployeeEpic,
  OVERTIMEViewFilterEmployeeAndOVERTIMEEpic,
  OVERTIMEViewFilterApproverEpic,
  OVERTIMECreateEpic,
  OVERTIMEEditEpic,
  //LEAVE SECTION
  LEAVEViewEpic,
  LEAVEViewFilterEmployeeEpic,
  LEAVEViewFilterEmployeeAndLEAVEEpic,
  LEAVEViewFilterApproverEpic,
  LEAVECreateEpic,
  LEAVEEditEpic,
  //UA SECTION
  UAViewEpic,
  UAViewFilterEmployeeEpic,
  UAViewFilterEmployeeAndUAEpic,
  UAViewFilterApproverEpic,
  UACreateEpic,
  UAEditEpic,
  //LEAVECREDIT SECTION
  LEAVECREDITViewEpic,
  LEAVECREDITViewFilterEmployeeEpic,
  LEAVECREDITCreateEpic,
  LEAVECREDITEditEpic,
  //LEAVETYPE SECTION
  LEAVETYPEViewEpic,
  LEAVETYPEViewFilterEmployeeEpic,
  LEAVETYPECreateEpic,
  LEAVETYPEEditEpic,
  LEAVETYPEDeleteEpic,
  //CUTOFFPERIOD SECTION
  CUTOFFPERIODViewEpic,
  CUTOFFPERIODViewFilterCUTOFFPERIODEpic,
  CUTOFFPERIODCreateEpic,
  CUTOFFPERIODEditEpic,
  //SCHEDULESHIFT SECTION
  SCHEDULESHIFTViewEpic,
  SCHEDULESHIFTViewFilterSCHEDULESHIFTEpic,
  SCHEDULESHIFTCreateEpic,
  SCHEDULESHIFTEditEpic,
  SCHEDULESHIFTDeleteEpic,
  //SCHEDULEDAILY SECTION
  SCHEDULEDAILYViewEpic,
  SCHEDULEDAILYViewFilterEmployeeEpic,
  SCHEDULEDAILYViewFilterEmployeeAndSCHEDULEDAILYEpic,
  SCHEDULEDAILYCreateEpic,
  SCHEDULEDAILYEditEpic,
));

export type RootState = ReturnType<typeof rootReducer>;
export const APILink = 'http://169.254.10.240:8000/api/';
export default store;