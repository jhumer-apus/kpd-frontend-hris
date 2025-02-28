import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { createEpicMiddleware } from 'redux-observable';
import { combineEpics } from 'redux-observable';
import { authReducer } from './reducers/auth';
import { employeesReducer } from './reducers/employees';
import { authEpic, fetchUserDataEpic } from './epics/auth';
import { employeesListEpic, employeesSpecificEpic } from './epics/employees';
import { dtrReducer } from './reducers/dtr';
import { 
  viewAllDtrLogsEpic, 
  viewFilterDtrLogsEpic, 
  viewMergedDtrLogsEpic, 
  viewFilterMergedDtrLogsEpic, 
  viewCutoffDtrSummaryEpic, 
  getCutoffDTRListEpic, 
  getCutoffDTRListEmployeeEpic, 
  mergeCutoffListAndEmployeeEpic, 
  summarizeCutoffListAndEmployeeEpic 
} from './epics/dtr';
import { payrollReducer } from './reducers/payroll';
import { processPayrollEpic, viewPayrollListEpic, viewSpecificPayrollListEpic } from './epics/payroll';
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
import {
  BRANCHCreateEpic,
  BRANCHEditEpic,
  BRANCHViewEpic,
  BRANCHViewSpecificEpic,
  DEPARTMENTCreateEpic,
  DEPARTMENTEditEpic,
  DEPARTMENTViewEpic,
  DEPARTMENTViewSpecificEpic,
  DIVISIONEditEpic,
  DIVISIONCreateEpic,
  DIVISIONViewEpic,
  DIVISIONViewSpecificEpic,
  PAYROLLGROUPCreateEpic,
  PAYROLLGROUPEditEpic,
  PAYROLLGROUPViewEpic,
  PAYROLLGROUPViewSpecificEpic,
  POSITIONCreateEpic,
  POSITIONEditEpic,
  POSITIONViewEpic,
  POSITIONViewSpecificEpic,
  RANKCreateEpic,
  RANKEditEpic,
  RANKViewEpic,
  RANKViewSpecificEpic,
} from './epics/categories';
import { proceduralsReducer } from './reducers/procedurals';
import { categoriesReducer } from './reducers/categories';
import { USERCreateEpic, USEREditEpic, USERResetPasswordEpic, USERViewEpic, USERViewSpecificEpic } from './epics/users';
import { usersReducer } from './reducers/users';
import { ALLOWANCEENTRYCreateEpic, ALLOWANCEENTRYEditEpic, ALLOWANCEENTRYViewEpic, ALLOWANCEENTRYViewSpecificEpic, ALLOWANCETYPECreateEpic, ALLOWANCETYPEEditEpic, ALLOWANCETYPEViewEpic, ALLOWANCETYPEViewSpecificEpic, CASHADVANCECreateEpic, CASHADVANCEEditEpic, CASHADVANCEViewEpic, CASHADVANCEViewSpecificEmployeeEpic, CASHADVANCEViewSpecificEpic, PAGIBIGCreateEpic, PAGIBIGEditEpic, PAGIBIGViewEpic, PAGIBIGViewSpecificEpic, PHILHEALTHCreateEpic, PHILHEALTHEditEpic, PHILHEALTHViewEpic, PHILHEALTHViewSpecificEpic, SSSCreateEpic, SSSEditEpic, SSSViewEpic, SSSViewSpecificEpic, TAXCreateEpic, TAXEditEpic, TAXViewEpic, TAXViewSpecificEpic } from './epics/payroll-variables';
import { payrollVariablesReducer } from './reducers/payroll-variables';
import { payrollEOYReducer } from './reducers/payroll-eoy';
import { ACTIVEANNOUNCEMENTViewEpic, ANNDEPARTMENTViewEpic, ANNOUNCEMENTCreateEpic, ANNOUNCEMENTEditEpic, ANNOUNCEMENTViewEpic, ANNOUNCEMENTViewSpecificEpic, ANNRANKViewEpic, ASSETACCOUNTCreateEpic, ASSETACCOUNTEditEpic, ASSETACCOUNTViewEpic, ASSETACCOUNTViewSpecificEmployeeEpic, ASSETACCOUNTViewSpecificEpic, ASSETLISTCreateEpic, ASSETLISTEditEpic, ASSETLISTViewEpic, ASSETLISTViewSpecificEpic, BONUSENTRYCreateEpic, BONUSENTRYEditEpic, BONUSENTRYViewEpic, BONUSENTRYViewSpecificEmployeeEpic, BONUSENTRYViewSpecificEpic, BONUSLISTCreateEpic, BONUSLISTEditEpic, BONUSLISTViewEpic, BONUSLISTViewSpecificEpic, PAY13THCreateEpic, PAY13THViewEpic, PAY13THViewSpecificEpic, TAXCOLLECTEDViewEpic, TAXCOLLECTEDViewSpecificEmployeeEpic } from './epics/payroll-eoy';
import { ALLSCHEDULEViewSpecificEpic, APPLICANTSCreateEpic, APPLICANTSEditEpic, APPLICANTSViewEpic, APPLICANTSViewSpecificEpic, CORECOMPECreateEpic, CORECOMPEDeleteEpic, CORECOMPEEditEpic, CORECOMPEViewEpic, CORECOMPEViewSpecificEpic, EMPHISTORYCreateEpic, EMPHISTORYDeleteEpic, EMPHISTORYEditEpic, EMPHISTORYViewEpic, EMPHISTORYViewSpecificEpic, EMPSEMINARSCreateEpic, EMPSEMINARSDeleteEpic, EMPSEMINARSEditEpic, EMPSEMINARSViewEpic, EMPSEMINARSViewSpecificEpic, EVALQUESTIONSCreateEpic, EVALQUESTIONSDeleteEpic, EVALQUESTIONSEditEpic, EVALQUESTIONSViewEpic, EVALQUESTIONSViewSpecificEpic, JOBPOSTINGSCreateEpic, JOBPOSTINGSDeleteEpic, JOBPOSTINGSEditEpic, JOBPOSTINGSViewEpic, JOBPOSTINGSViewSpecificEpic, KPICORECreateEpic, KPICOREEditEpic, KPICOREUpdateSelfEpic, KPICOREUpdateSupervisorEpic, KPICOREViewEpic, KPICOREViewSpecificEmployeeEpic, KPICOREViewSpecificEpic, OFFBOARDINGREQUIREMENTSCreateEpic, OFFBOARDINGREQUIREMENTSDeleteEpic, OFFBOARDINGREQUIREMENTSEditEpic, OFFBOARDINGREQUIREMENTSViewEpic, OFFBOARDINGREQUIREMENTSViewSpecificEpic, OFFBOARDINGSTATUSCreateEpic, OFFBOARDINGSTATUSEditEpic, OFFBOARDINGSTATUSUpdateEpic, OFFBOARDINGSTATUSViewEpic, OFFBOARDINGSTATUSViewSpecificEpic, ONBOARDINGREQUIREMENTSCreateEpic, ONBOARDINGREQUIREMENTSDeleteEpic, ONBOARDINGREQUIREMENTSEditEpic, ONBOARDINGREQUIREMENTSViewEpic, ONBOARDINGREQUIREMENTSViewSpecificEpic, ONBOARDINGSTATUSCreateEpic, ONBOARDINGSTATUSEditEpic, ONBOARDINGSTATUSUpdateEpic, ONBOARDINGSTATUSViewEpic, ONBOARDINGSTATUSViewSpecificEpic, PERFECTATTENDANCEViewSpecificEpic,   IMPERFECTATTENDANCEViewSpecificEpic, } from './epics/employee-and-applicants';
import { employeeAndApplicantsReducer } from './reducers/employee-and-applicants';
import { componentReducer } from './reducers/components';

const epicMiddleware = createEpicMiddleware();

const rootReducer = combineReducers({
  auth: authReducer,
  employees: employeesReducer,
  dtr: dtrReducer,
  payroll: payrollReducer,
  procedurals: proceduralsReducer,
  categories: categoriesReducer,
  users: usersReducer,
  payrollVariables: payrollVariablesReducer,
  payrollEOY: payrollEOYReducer,
  employeeAndApplicants: employeeAndApplicantsReducer,
  component: componentReducer
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
  viewFilterDtrLogsEpic,
  viewMergedDtrLogsEpic, 
  viewFilterMergedDtrLogsEpic,
  viewCutoffDtrSummaryEpic,
  getCutoffDTRListEpic,
  getCutoffDTRListEmployeeEpic,
  mergeCutoffListAndEmployeeEpic,
  summarizeCutoffListAndEmployeeEpic,
  viewPayrollListEpic,
  viewSpecificPayrollListEpic,
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
  BRANCHCreateEpic,
  BRANCHEditEpic,
  BRANCHViewEpic,
  BRANCHViewSpecificEpic,
  DEPARTMENTCreateEpic,
  DEPARTMENTEditEpic,
  DEPARTMENTViewEpic,
  DEPARTMENTViewSpecificEpic,
  DIVISIONEditEpic,
  DIVISIONCreateEpic,
  DIVISIONViewEpic,
  DIVISIONViewSpecificEpic,
  PAYROLLGROUPCreateEpic,
  PAYROLLGROUPEditEpic,
  PAYROLLGROUPViewEpic,
  PAYROLLGROUPViewSpecificEpic,
  POSITIONCreateEpic,
  POSITIONEditEpic,
  POSITIONViewEpic,
  POSITIONViewSpecificEpic,
  RANKCreateEpic,
  RANKEditEpic,
  RANKViewEpic,
  RANKViewSpecificEpic,
  USERCreateEpic,
  USERViewEpic,
  USEREditEpic,
  USERViewSpecificEpic,
  USERResetPasswordEpic,
  PHILHEALTHViewEpic,
  PHILHEALTHViewSpecificEpic,
  PHILHEALTHCreateEpic,
  PHILHEALTHEditEpic,
  SSSViewEpic,
  SSSViewSpecificEpic,
  SSSCreateEpic,
  SSSEditEpic,
  PAGIBIGViewEpic,
  PAGIBIGViewSpecificEpic,
  PAGIBIGCreateEpic,
  PAGIBIGEditEpic,
  TAXViewEpic,
  TAXViewSpecificEpic,
  TAXCreateEpic,
  TAXEditEpic,
  CASHADVANCEViewEpic,
  CASHADVANCEViewSpecificEpic,
  CASHADVANCEViewSpecificEmployeeEpic,
  CASHADVANCECreateEpic,
  CASHADVANCEEditEpic,
  ALLOWANCETYPEViewEpic,
  ALLOWANCETYPEViewSpecificEpic,
  ALLOWANCETYPECreateEpic,
  ALLOWANCETYPEEditEpic,
  ALLOWANCEENTRYViewEpic,
  ALLOWANCEENTRYViewSpecificEpic,
  ALLOWANCEENTRYCreateEpic,
  ALLOWANCEENTRYEditEpic,
  ASSETACCOUNTViewEpic,
  ASSETACCOUNTViewSpecificEpic,
  ASSETACCOUNTViewSpecificEmployeeEpic,
  ASSETACCOUNTCreateEpic,
  ASSETACCOUNTEditEpic,
  ASSETLISTViewEpic,
  ASSETLISTViewSpecificEpic,
  ASSETLISTCreateEpic,
  ASSETLISTEditEpic,
  ANNOUNCEMENTViewEpic,
  ANNOUNCEMENTViewSpecificEpic,
  ANNOUNCEMENTCreateEpic,
  ANNOUNCEMENTEditEpic,
  TAXCOLLECTEDViewEpic,
  TAXCOLLECTEDViewSpecificEmployeeEpic,
  PAY13THViewEpic,
  PAY13THViewSpecificEpic,
  PAY13THCreateEpic,
  BONUSLISTViewEpic,
  BONUSLISTViewSpecificEpic,
  BONUSLISTCreateEpic,
  BONUSLISTEditEpic,
  BONUSENTRYViewEpic,
  BONUSENTRYViewSpecificEpic,
  BONUSENTRYViewSpecificEmployeeEpic,
  BONUSENTRYCreateEpic,
  BONUSENTRYEditEpic,
  ACTIVEANNOUNCEMENTViewEpic,
  ANNRANKViewEpic,
  ANNDEPARTMENTViewEpic,
  KPICORECreateEpic,
  KPICOREEditEpic,
  KPICOREViewEpic,
  KPICOREViewSpecificEpic,
  KPICOREViewSpecificEmployeeEpic,
  KPICOREUpdateSelfEpic,
  KPICOREUpdateSupervisorEpic,
  CORECOMPECreateEpic,
  CORECOMPEEditEpic,
  CORECOMPEViewEpic,
  CORECOMPEViewSpecificEpic,
  CORECOMPEDeleteEpic,
  EVALQUESTIONSCreateEpic,
  EVALQUESTIONSEditEpic,
  EVALQUESTIONSViewEpic,
  EVALQUESTIONSViewSpecificEpic,
  EVALQUESTIONSDeleteEpic,
  ONBOARDINGSTATUSCreateEpic,
  ONBOARDINGSTATUSEditEpic,
  ONBOARDINGSTATUSUpdateEpic,
  ONBOARDINGSTATUSViewEpic,
  ONBOARDINGSTATUSViewSpecificEpic,
  ONBOARDINGREQUIREMENTSCreateEpic,
  ONBOARDINGREQUIREMENTSEditEpic,
  ONBOARDINGREQUIREMENTSViewEpic,
  ONBOARDINGREQUIREMENTSViewSpecificEpic,
  ONBOARDINGREQUIREMENTSDeleteEpic,
  OFFBOARDINGSTATUSCreateEpic,
  OFFBOARDINGSTATUSEditEpic,
  OFFBOARDINGSTATUSViewEpic,
  OFFBOARDINGSTATUSViewSpecificEpic,
  OFFBOARDINGSTATUSUpdateEpic,
  OFFBOARDINGREQUIREMENTSCreateEpic,
  OFFBOARDINGREQUIREMENTSEditEpic,
  OFFBOARDINGREQUIREMENTSViewEpic,
  OFFBOARDINGREQUIREMENTSViewSpecificEpic,
  OFFBOARDINGREQUIREMENTSDeleteEpic,
  APPLICANTSCreateEpic,
  APPLICANTSEditEpic,
  APPLICANTSViewEpic,
  APPLICANTSViewSpecificEpic,
  JOBPOSTINGSCreateEpic,
  JOBPOSTINGSEditEpic,
  JOBPOSTINGSViewEpic,
  JOBPOSTINGSViewSpecificEpic,
  JOBPOSTINGSDeleteEpic,
  PERFECTATTENDANCEViewSpecificEpic,
  IMPERFECTATTENDANCEViewSpecificEpic,
  ALLSCHEDULEViewSpecificEpic,
  EMPHISTORYCreateEpic,
  EMPHISTORYEditEpic,
  EMPHISTORYViewEpic,
  EMPHISTORYViewSpecificEpic,
  EMPHISTORYDeleteEpic,
  EMPSEMINARSCreateEpic,
  EMPSEMINARSEditEpic,
  EMPSEMINARSViewEpic,
  EMPSEMINARSViewSpecificEpic,
  EMPSEMINARSDeleteEpic,
));
export type RootState = ReturnType<typeof rootReducer>;

export const APILink = import.meta.env.VITE_APILINK
// export const APILink = 'https://bitverse-backend.ngrok.app/api/v1/'
// export const APILink = 'https://bitversecorporation.pythonanywhere.com/api/v1/';
// export const APILink = 'http://18.141.159.149:8000/api/v1/';
// export const APILink = 'https://mercovsk1.pythonanywhere.com/api/v1/';
// export const APILink = 'https://bitversecorporation.pythonanywhere.com/api/v1/';
// export const APILink = 'https://striking-egret-equal.ngrok-free.app/api/v1/';
// export const APILink = 'http://192.168.1.249:8000/api/v1/';
// export const APILink = 'http://192.168.0.101:8000/api/v1/';
export const JSONServer = 'http://localhost:3030/';
export const globalDate = 'MM/DD/YYYY';
export const globalTime = 'hh:mm a';
export const globalDateTime = 'MM/DD/YYYY - hh:mm a';
export const globalAPIDate = 'YYYY-MM-DDTHH:mm:ss';
export const globalReducerLoading = 'loading';
export const globalReducerSuccess = 'succeeded';
export const globalReducerFailed = 'failed';
export const globalReducerRefreshed = 'refreshed';
export const globalServerErrorMsg = 'Internal server error. Contact developer for assistance.';
export const app_status  = 'production'
export default store;