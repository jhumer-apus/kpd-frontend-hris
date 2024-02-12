import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as _Actions from '../actions/employee-and-applicants';
import * as _Interface from '@/types/types-employee-and-applicants';
import { globalReducerFailed, globalReducerLoading, globalReducerRefreshed, globalReducerSuccess } from '../configureStore';

type EmployeeAndApplicantsPayloads = 
string |
_Interface.KPICOREViewInterface[] | 
_Interface.KPICOREViewInterface | 
_Interface.KPICORECreateInterface |
_Interface.KPICOREEditInterface |
_Interface.KPICOREUpdateSupervisorInterface |
_Interface.KPICOREUpdateSelfInterface |
_Interface.CORECOMPEViewInterface[] | 
_Interface.CORECOMPEViewInterface | 
_Interface.CORECOMPECreateInterface |
_Interface.CORECOMPEEditInterface |
_Interface.EVALQUESTIONSViewInterface[] | 
_Interface.EVALQUESTIONSViewInterface | 
_Interface.EVALQUESTIONSCreateInterface |
_Interface.EVALQUESTIONSEditInterface |
_Interface.ONBOARDINGSTATUSViewInterface[] | 
_Interface.ONBOARDINGSTATUSViewInterface | 
_Interface.ONBOARDINGSTATUSCreateInterface |
_Interface.ONBOARDINGSTATUSEditInterface |
_Interface.ONBOARDINGSTATUSUpdateInterface |
_Interface.ONBOARDINGREQUIREMENTSViewInterface[] | 
_Interface.ONBOARDINGREQUIREMENTSViewInterface | 
_Interface.ONBOARDINGREQUIREMENTSCreateInterface |
_Interface.ONBOARDINGREQUIREMENTSEditInterface |
_Interface.OFFBOARDINGSTATUSViewInterface[] | 
_Interface.OFFBOARDINGSTATUSViewInterface | 
_Interface.OFFBOARDINGSTATUSCreateInterface |
_Interface.OFFBOARDINGSTATUSEditInterface |
_Interface.OFFBOARDINGSTATUSUpdateInterface |
_Interface.OFFBOARDINGREQUIREMENTSViewInterface[] | 
_Interface.OFFBOARDINGREQUIREMENTSViewInterface | 
_Interface.OFFBOARDINGREQUIREMENTSCreateInterface |
_Interface.OFFBOARDINGREQUIREMENTSEditInterface |
_Interface.APPLICANTSViewInterface[] | 
_Interface.APPLICANTSViewInterface | 
_Interface.APPLICANTSCreateInterface |
_Interface.APPLICANTSEditInterface |
_Interface.JOBPOSTINGSViewInterface[] | 
_Interface.JOBPOSTINGSViewInterface | 
_Interface.JOBPOSTINGSCreateInterface |
_Interface.JOBPOSTINGSEditInterface |
_Interface.PERFECTATTENDANCEViewInterface[] |
_Interface.PERFECTATTENDANCEViewInterface  |
_Interface.ALLSCHEDULEViewInterface[] |
_Interface.ALLSCHEDULEViewInterface |
_Interface.EMPHISTORYViewInterface[] | 
_Interface.EMPHISTORYViewInterface | 
_Interface.EMPHISTORYCreateInterface |
_Interface.EMPHISTORYEditInterface |
_Interface.EMPSEMINARSViewInterface[] | 
_Interface.EMPSEMINARSViewInterface | 
_Interface.EMPSEMINARSCreateInterface |
_Interface.EMPSEMINARSEditInterface 
;

interface CommonEmployeeAndApplicantsState {
  status: 'loading' | 'succeeded' | 'failed' | 'refreshed' | null;
  progress: number;
  error: string | null; 
}

interface CommonEmployeeAndApplicantsDataStringState extends CommonEmployeeAndApplicantsState {
  data: string | null | unknown;
}

// KPICORE SECTION // KPICORE SECTION // KPICORE SECTION // KPICORE SECTION // KPICORE SECTION 
interface KPICOREViewState extends CommonEmployeeAndApplicantsState{
  data: _Interface.KPICOREViewInterface[];
}

interface KPICORECreateState extends CommonEmployeeAndApplicantsState{
  data: _Interface.KPICORECreateInterface | null | {};
}

interface KPICOREEditState extends CommonEmployeeAndApplicantsState {
  data: KPICOREViewState | null;
}

interface KPICOREUpdateSelfState extends CommonEmployeeAndApplicantsState {
  data: string | null;
}

interface KPICOREUpdateSupervisorState extends CommonEmployeeAndApplicantsState {
  data: string | null;
}


// CORECOMPE SECTION // CORECOMPE SECTION // CORECOMPE SECTION // CORECOMPE SECTION // CORECOMPE SECTION 
interface CORECOMPEViewState extends CommonEmployeeAndApplicantsState{
  data: _Interface.CORECOMPEViewInterface[];
}

interface CORECOMPECreateState extends CommonEmployeeAndApplicantsState{
  data: _Interface.CORECOMPECreateInterface | null | {};
}

interface CORECOMPEEditState extends CommonEmployeeAndApplicantsState {
  data: CORECOMPEViewState | null;
}

// EVALQUESTIONS SECTION // EVALQUESTIONS SECTION // EVALQUESTIONS SECTION // EVALQUESTIONS SECTION // EVALQUESTIONS SECTION 
interface EVALQUESTIONSViewState extends CommonEmployeeAndApplicantsState{
  data: _Interface.EVALQUESTIONSViewInterface[];
}

interface EVALQUESTIONSCreateState extends CommonEmployeeAndApplicantsState{
  data: _Interface.EVALQUESTIONSCreateInterface | null | {};
}

interface EVALQUESTIONSEditState extends CommonEmployeeAndApplicantsState {
  data: EVALQUESTIONSViewState | null;
}

// ONBOARDINGSTATUS SECTION // ONBOARDINGSTATUS SECTION // ONBOARDINGSTATUS SECTION // ONBOARDINGSTATUS SECTION // ONBOARDINGSTATUS SECTION 
interface ONBOARDINGSTATUSViewState extends CommonEmployeeAndApplicantsState{
  data: _Interface.ONBOARDINGSTATUSViewInterface[];
}

interface ONBOARDINGSTATUSCreateState extends CommonEmployeeAndApplicantsState{
  data: _Interface.ONBOARDINGSTATUSCreateInterface | null | {};
}

interface ONBOARDINGSTATUSEditState extends CommonEmployeeAndApplicantsState {
  data: ONBOARDINGSTATUSViewState | null;
}

interface ONBOARDINGSTATUSUpdateState extends CommonEmployeeAndApplicantsState {
  data: string | null;
}

// ONBOARDINGREQUIREMENTS SECTION // ONBOARDINGREQUIREMENTS SECTION // ONBOARDINGREQUIREMENTS SECTION // ONBOARDINGREQUIREMENTS SECTION // ONBOARDINGREQUIREMENTS SECTION 
interface ONBOARDINGREQUIREMENTSViewState extends CommonEmployeeAndApplicantsState{
  data: _Interface.ONBOARDINGREQUIREMENTSViewInterface[];
}

interface ONBOARDINGREQUIREMENTSCreateState extends CommonEmployeeAndApplicantsState{
  data: _Interface.ONBOARDINGREQUIREMENTSCreateInterface | null | {};
}

interface ONBOARDINGREQUIREMENTSEditState extends CommonEmployeeAndApplicantsState {
  data: ONBOARDINGREQUIREMENTSViewState | null;
}


// OFFBOARDINGSTATUS SECTION // OFFBOARDINGSTATUS SECTION // OFFBOARDINGSTATUS SECTION // OFFBOARDINGSTATUS SECTION // OFFBOARDINGSTATUS SECTION 
interface OFFBOARDINGSTATUSViewState extends CommonEmployeeAndApplicantsState{
  data: _Interface.OFFBOARDINGSTATUSViewInterface[];
}

interface OFFBOARDINGSTATUSCreateState extends CommonEmployeeAndApplicantsState{
  data: _Interface.OFFBOARDINGSTATUSCreateInterface | null | {};
}

interface OFFBOARDINGSTATUSEditState extends CommonEmployeeAndApplicantsState {
  data: OFFBOARDINGSTATUSViewState | null;
}

interface OFFBOARDINGSTATUSUpdateState extends CommonEmployeeAndApplicantsState {
  data: string | null;
}

// OFFBOARDINGREQUIREMENTS SECTION // OFFBOARDINGREQUIREMENTS SECTION // OFFBOARDINGREQUIREMENTS SECTION // OFFBOARDINGREQUIREMENTS SECTION // OFFBOARDINGREQUIREMENTS SECTION 
interface OFFBOARDINGREQUIREMENTSViewState extends CommonEmployeeAndApplicantsState{
  data: _Interface.OFFBOARDINGREQUIREMENTSViewInterface[];
}

interface OFFBOARDINGREQUIREMENTSCreateState extends CommonEmployeeAndApplicantsState{
  data: _Interface.OFFBOARDINGREQUIREMENTSCreateInterface | null | {};
}

interface OFFBOARDINGREQUIREMENTSEditState extends CommonEmployeeAndApplicantsState {
  data: OFFBOARDINGREQUIREMENTSViewState | null;
}

// APPLICANTS SECTION // APPLICANTS SECTION // APPLICANTS SECTION // APPLICANTS SECTION // APPLICANTS SECTION 
interface APPLICANTSViewState extends CommonEmployeeAndApplicantsState{
  data: _Interface.APPLICANTSViewInterface[];
}

interface APPLICANTSCreateState extends CommonEmployeeAndApplicantsState{
  data: _Interface.APPLICANTSCreateInterface | null | {};
}

interface APPLICANTSEditState extends CommonEmployeeAndApplicantsState {
  data: APPLICANTSViewState | null;
}

// JOBPOSTINGS SECTION // JOBPOSTINGS SECTION // JOBPOSTINGS SECTION // JOBPOSTINGS SECTION // JOBPOSTINGS SECTION 
interface JOBPOSTINGSViewState extends CommonEmployeeAndApplicantsState{
  data: _Interface.JOBPOSTINGSViewInterface[];
}

interface JOBPOSTINGSCreateState extends CommonEmployeeAndApplicantsState{
  data: _Interface.JOBPOSTINGSCreateInterface | null | {};
}

interface JOBPOSTINGSEditState extends CommonEmployeeAndApplicantsState {
  data: JOBPOSTINGSViewState | null;
}

// PERFECTATTENDANCE SECTION
interface PERFECTATTENDANCEViewState extends CommonEmployeeAndApplicantsState{
  data: _Interface.PERFECTATTENDANCEViewInterface[];
}


// ALLSCHEDULE SECTION
interface ALLSCHEDULEViewState extends CommonEmployeeAndApplicantsState{
  data: _Interface.ALLSCHEDULEViewInterface[];
}


// EMPHISTORY SECTION // EMPHISTORY SECTION // EMPHISTORY SECTION // EMPHISTORY SECTION // EMPHISTORY SECTION 
interface EMPHISTORYViewState extends CommonEmployeeAndApplicantsState{
  data: _Interface.EMPHISTORYViewInterface[];
}

interface EMPHISTORYCreateState extends CommonEmployeeAndApplicantsState{
  data: _Interface.EMPHISTORYCreateInterface | null | {};
}

interface EMPHISTORYEditState extends CommonEmployeeAndApplicantsState {
  data: EMPHISTORYViewState | null;
}


// EMPSEMINARS SECTION // EMPSEMINARS SECTION // EMPSEMINARS SECTION // EMPSEMINARS SECTION // EMPSEMINARS SECTION 
interface EMPSEMINARSViewState extends CommonEmployeeAndApplicantsState{
  data: _Interface.EMPSEMINARSViewInterface[];
}

interface EMPSEMINARSCreateState extends CommonEmployeeAndApplicantsState{
  data: _Interface.EMPSEMINARSCreateInterface | null | {};
}

interface EMPSEMINARSEditState extends CommonEmployeeAndApplicantsState {
  data: EMPSEMINARSViewState | null;
}



interface OverallEmployeeAndApplicantsState {
  [key: string]: CommonEmployeeAndApplicantsDataStringState | 
  KPICOREViewState | 
  KPICORECreateState | 
  KPICOREEditState |
  KPICOREUpdateSelfState |
  KPICOREUpdateSupervisorState |
  CORECOMPEViewState | 
  CORECOMPECreateState | 
  CORECOMPEEditState |
  EVALQUESTIONSViewState | 
  EVALQUESTIONSCreateState | 
  EVALQUESTIONSEditState |
  ONBOARDINGSTATUSViewState | 
  ONBOARDINGSTATUSCreateState | 
  ONBOARDINGSTATUSEditState |
  ONBOARDINGSTATUSUpdateState |
  ONBOARDINGREQUIREMENTSViewState | 
  ONBOARDINGREQUIREMENTSCreateState | 
  ONBOARDINGREQUIREMENTSEditState |
  OFFBOARDINGSTATUSViewState | 
  OFFBOARDINGSTATUSCreateState | 
  OFFBOARDINGSTATUSEditState |
  OFFBOARDINGSTATUSUpdateState |
  OFFBOARDINGREQUIREMENTSViewState | 
  OFFBOARDINGREQUIREMENTSCreateState | 
  OFFBOARDINGREQUIREMENTSEditState |
  APPLICANTSViewState | 
  APPLICANTSCreateState | 
  APPLICANTSEditState |
  JOBPOSTINGSViewState | 
  JOBPOSTINGSCreateState | 
  JOBPOSTINGSEditState |
  EMPHISTORYViewState | 
  EMPHISTORYCreateState | 
  EMPHISTORYEditState |
  EMPSEMINARSViewState | 
  EMPSEMINARSCreateState | 
  EMPSEMINARSEditState |
  PERFECTATTENDANCEViewState |
  ALLSCHEDULEViewState
  ,
  //KPICORE SECTION
  KPICOREView: KPICOREViewState,
  KPICOREViewSpecific: KPICOREViewState,
  KPICOREViewSpecificEmployee: KPICOREViewState,
  KPICORECreate: KPICORECreateState,
  KPICOREEdit: KPICOREEditState,
  KPICOREUpdateSupervisor: KPICOREUpdateSupervisorState,
  KPICOREUpdateSelf: KPICOREUpdateSelfState,
  //CORECOMPE SECTION
  CORECOMPEView: CORECOMPEViewState,
  CORECOMPEViewSpecific: CORECOMPEViewState,
  CORECOMPECreate: CORECOMPECreateState,
  CORECOMPEEdit: CORECOMPEEditState,
  CORECOMPEDelete: CommonEmployeeAndApplicantsDataStringState,
  //EVALQUESTIONS SECTION
  EVALQUESTIONSView: EVALQUESTIONSViewState,
  EVALQUESTIONSViewSpecific: EVALQUESTIONSViewState,
  EVALQUESTIONSCreate: EVALQUESTIONSCreateState,
  EVALQUESTIONSEdit: EVALQUESTIONSEditState,
  EVALQUESTIONSDelete: CommonEmployeeAndApplicantsDataStringState,
  //ONBOARDINGSTATUS SECTION
  ONBOARDINGSTATUSView: ONBOARDINGSTATUSViewState,
  ONBOARDINGSTATUSViewSpecific: ONBOARDINGSTATUSViewState,
  ONBOARDINGSTATUSCreate: ONBOARDINGSTATUSCreateState,
  ONBOARDINGSTATUSEdit: ONBOARDINGSTATUSEditState,
  ONBOARDINGSTATUSUpdate: ONBOARDINGSTATUSUpdateState,
  //ONBOARDINGREQUIREMENTS SECTION
  ONBOARDINGREQUIREMENTSView: ONBOARDINGREQUIREMENTSViewState,
  ONBOARDINGREQUIREMENTSViewSpecific: ONBOARDINGREQUIREMENTSViewState,
  ONBOARDINGREQUIREMENTSCreate: ONBOARDINGREQUIREMENTSCreateState,
  ONBOARDINGREQUIREMENTSEdit: ONBOARDINGREQUIREMENTSEditState,
  ONBOARDINGREQUIREMENTSDelete: CommonEmployeeAndApplicantsDataStringState,
  //OFFBOARDINGSTATUS SECTION
  OFFBOARDINGSTATUSView: OFFBOARDINGSTATUSViewState,
  OFFBOARDINGSTATUSViewSpecific: OFFBOARDINGSTATUSViewState,
  OFFBOARDINGSTATUSCreate: OFFBOARDINGSTATUSCreateState,
  OFFBOARDINGSTATUSEdit: OFFBOARDINGSTATUSEditState,
  OFFBOARDINGSTATUSUpdate: ONBOARDINGSTATUSUpdateState,
  //OFFBOARDINGREQUIREMENTS SECTION
  OFFBOARDINGREQUIREMENTSView: OFFBOARDINGREQUIREMENTSViewState,
  OFFBOARDINGREQUIREMENTSViewSpecific: OFFBOARDINGREQUIREMENTSViewState,
  OFFBOARDINGREQUIREMENTSCreate: OFFBOARDINGREQUIREMENTSCreateState,
  OFFBOARDINGREQUIREMENTSEdit: OFFBOARDINGREQUIREMENTSEditState,
  OFFBOARDINGREQUIREMENTSDelete: CommonEmployeeAndApplicantsDataStringState,
  //APPLICANTS SECTION
  APPLICANTSView: APPLICANTSViewState,
  APPLICANTSViewSpecific: APPLICANTSViewState,
  APPLICANTSCreate: APPLICANTSCreateState,
  APPLICANTSEdit: APPLICANTSEditState,
  //JOBPOSTINGS SECTION
  JOBPOSTINGSView: JOBPOSTINGSViewState,
  JOBPOSTINGSViewSpecific: JOBPOSTINGSViewState,
  JOBPOSTINGSCreate: JOBPOSTINGSCreateState,
  JOBPOSTINGSEdit: JOBPOSTINGSEditState,
  JOBPOSTINGSDelete: CommonEmployeeAndApplicantsDataStringState,
  //PERFECTATTENDANCE SECTION
  PERFECTATTENDANCEViewSpecific: PERFECTATTENDANCEViewState,
  //ALLSCHEDULE SECTION
  ALLSCHEDULEViewSpecific: ALLSCHEDULEViewState,
  //EMPHISTORY SECTION
  EMPHISTORYView: EMPHISTORYViewState,
  EMPHISTORYViewSpecific: EMPHISTORYViewState,
  EMPHISTORYCreate: EMPHISTORYCreateState,
  EMPHISTORYEdit: EMPHISTORYEditState,
  EMPHISTORYDelete: CommonEmployeeAndApplicantsDataStringState,
  //EMPSEMINARS SECTION
  EMPSEMINARSView: EMPSEMINARSViewState,
  EMPSEMINARSViewSpecific: EMPSEMINARSViewState,
  EMPSEMINARSCreate: EMPSEMINARSCreateState,
  EMPSEMINARSEdit: EMPSEMINARSEditState,
  EMPSEMINARSDelete: CommonEmployeeAndApplicantsDataStringState,
}

const initialState: OverallEmployeeAndApplicantsState = {
  //KPICORE SECTION
  KPICOREView: {
    status: null,
    progress: 0,
    data: [],
    error: '',
  },
  KPICOREViewSpecific: {
    status: null,
    progress: 0,
    data: [],
    error: '',
  },
  KPICOREViewSpecificEmployee: {
    status: null,
    progress: 0,
    data: [],
    error: '',
  },
  KPICORECreate: {
    status: null,
    progress: 0,
    data: null,
    error: '',
  },
  KPICOREEdit: {
    status: null,
    progress: 0,
    data: null,
    error: '',
  },
  KPICOREUpdateSelf: {
    status: null,
    progress: 0,
    data: null,
    error: '',
  },
  KPICOREUpdateSupervisor: {
    status: null,
    progress: 0,
    data: null,
    error: '',
  },
  //CORECOMPE SECTION
  CORECOMPEView: {
    status: null,
    progress: 0,
    data: [],
    error: '',
  },
  CORECOMPEViewSpecific: {
    status: null,
    progress: 0,
    data: [],
    error: '',
  },
  CORECOMPECreate: {
    status: null,
    progress: 0,
    data: null,
    error: '',
  },
  CORECOMPEEdit: {
    status: null,
    progress: 0,
    data: null,
    error: '',
  },
  CORECOMPEDelete: {
    status: null,
    progress: 0,
    data: null,
    error: '',
  },
  //EVALQUESTIONS SECTION
  EVALQUESTIONSView: {
    status: null,
    progress: 0,
    data: [],
    error: '',
  },
  EVALQUESTIONSViewSpecific: {
    status: null,
    progress: 0,
    data: [],
    error: '',
  },
  EVALQUESTIONSCreate: {
    status: null,
    progress: 0,
    data: null,
    error: '',
  },
  EVALQUESTIONSEdit: {
    status: null,
    progress: 0,
    data: null,
    error: '',
  },
  EVALQUESTIONSDelete: {
    status: null,
    progress: 0,
    data: null,
    error: '',
  },
  //ONBOARDINGSTATUS SECTION
  ONBOARDINGSTATUSView: {
    status: null,
    progress: 0,
    data: [],
    error: '',
  },
  ONBOARDINGSTATUSViewSpecific: {
    status: null,
    progress: 0,
    data: [],
    error: '',
  },
  ONBOARDINGSTATUSCreate: {
    status: null,
    progress: 0,
    data: null,
    error: '',
  },
  ONBOARDINGSTATUSEdit: {
    status: null,
    progress: 0,
    data: null,
    error: '',
  },
  ONBOARDINGSTATUSUpdate: {
    status: null,
    progress: 0,
    data: null,
    error: '',
  },
  //ONBOARDINGREQUIREMENTS SECTION
  ONBOARDINGREQUIREMENTSView: {
    status: null,
    progress: 0,
    data: [],
    error: '',
  },
  ONBOARDINGREQUIREMENTSViewSpecific: {
    status: null,
    progress: 0,
    data: [],
    error: '',
  },
  ONBOARDINGREQUIREMENTSCreate: {
    status: null,
    progress: 0,
    data: null,
    error: '',
  },
  ONBOARDINGREQUIREMENTSEdit: {
    status: null,
    progress: 0,
    data: null,
    error: '',
  },
  ONBOARDINGREQUIREMENTSDelete: {
    status: null,
    progress: 0,
    data: null,
    error: '',
  },
  //OFFBOARDINGSTATUS SECTION
  OFFBOARDINGSTATUSView: {
    status: null,
    progress: 0,
    data: [],
    error: '',
  },
  OFFBOARDINGSTATUSViewSpecific: {
    status: null,
    progress: 0,
    data: [],
    error: '',
  },
  OFFBOARDINGSTATUSCreate: {
    status: null,
    progress: 0,
    data: null,
    error: '',
  },
  OFFBOARDINGSTATUSEdit: {
    status: null,
    progress: 0,
    data: null,
    error: '',
  },
  OFFBOARDINGSTATUSUpdate: {
    status: null,
    progress: 0,
    data: null,
    error: '',
  },
  //OFFBOARDINGREQUIREMENTS SECTION
  OFFBOARDINGREQUIREMENTSView: {
    status: null,
    progress: 0,
    data: [],
    error: '',
  },
  OFFBOARDINGREQUIREMENTSViewSpecific: {
    status: null,
    progress: 0,
    data: [],
    error: '',
  },
  OFFBOARDINGREQUIREMENTSCreate: {
    status: null,
    progress: 0,
    data: null,
    error: '',
  },
  OFFBOARDINGREQUIREMENTSEdit: {
    status: null,
    progress: 0,
    data: null,
    error: '',
  },
  OFFBOARDINGREQUIREMENTSDelete: {
    status: null,
    progress: 0,
    data: null,
    error: '',
  },
  //APPLICANTS SECTION
  APPLICANTSView: {
    status: null,
    progress: 0,
    data: [],
    error: '',
  },
  APPLICANTSViewSpecific: {
    status: null,
    progress: 0,
    data: [],
    error: '',
  },
  APPLICANTSCreate: {
    status: null,
    progress: 0,
    data: null,
    error: '',
  },
  APPLICANTSEdit: {
    status: null,
    progress: 0,
    data: null,
    error: '',
  },
  //JOBPOSTINGS SECTION
  JOBPOSTINGSView: {
    status: null,
    progress: 0,
    data: [],
    error: '',
  },
  JOBPOSTINGSViewSpecific: {
    status: null,
    progress: 0,
    data: [],
    error: '',
  },
  JOBPOSTINGSCreate: {
    status: null,
    progress: 0,
    data: null,
    error: '',
  },
  JOBPOSTINGSEdit: {
    status: null,
    progress: 0,
    data: null,
    error: '',
  },
  JOBPOSTINGSDelete: {
    status: null,
    progress: 0,
    data: null,
    error: '',
  },
  //PERFECTATTENDANCE SECTION
  PERFECTATTENDANCEViewSpecific: {
    status: null,
    progress: 0,
    data: [],
    error: '',
  },
  //ALLSCHEDULE SECTION
  ALLSCHEDULEViewSpecific: {
    status: null,
    progress: 0,
    data: [],
    error: '',
  },
  //EMPHISTORY SECTION
  EMPHISTORYView: {
    status: null,
    progress: 0,
    data: [],
    error: '',
  },
  EMPHISTORYViewSpecific: {
    status: null,
    progress: 0,
    data: [],
    error: '',
  },
  EMPHISTORYCreate: {
    status: null,
    progress: 0,
    data: null,
    error: '',
  },
  EMPHISTORYEdit: {
    status: null,
    progress: 0,
    data: null,
    error: '',
  },
  EMPHISTORYDelete: {
    status: null,
    progress: 0,
    data: null,
    error: '',
  },
  //EMPSEMINARS SECTION
  EMPSEMINARSView: {
    status: null,
    progress: 0,
    data: [],
    error: '',
  },
  EMPSEMINARSViewSpecific: {
    status: null,
    progress: 0,
    data: [],
    error: '',
  },
  EMPSEMINARSCreate: {
    status: null,
    progress: 0,
    data: null,
    error: '',
  },
  EMPSEMINARSEdit: {
    status: null,
    progress: 0,
    data: null,
    error: '',
  },
  EMPSEMINARSDelete: {
    status: null,
    progress: 0,
    data: null,
    error: '',
  },
};

const setLoadingState = (path: string) => (state: OverallEmployeeAndApplicantsState) => {
  state[path].status = `${globalReducerLoading}`;
  state[path].data = [];
  state[path].error = null;
  state[path].progress = 0;
};

const setSuccessState = (state: OverallEmployeeAndApplicantsState, payload: EmployeeAndApplicantsPayloads, path: string) => {
  state[path].status = `${globalReducerSuccess}`;
  state[path].data = payload;
  state[path].error = null;
};

const setProgressState = (state: OverallEmployeeAndApplicantsState, payload: number, path: string) => {
  state[path].progress = payload;
};

const setFailureState = (state: OverallEmployeeAndApplicantsState, payload: string, path: string) => {
  state[path].status = `${globalReducerFailed}`;
  state[path].data = [];
  state[path].error = payload;
};


const setRefreshedState = (path: string) => (state: OverallEmployeeAndApplicantsState) => {
  state[path].status = `${globalReducerRefreshed}`;
  state[path].data = [];
  state[path].error = null;
};


const employeeAndApplicantsSlice = createSlice({
  name: 'employeeAndApplicants',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //KPICORE SECTION
      .addCase(_Actions.KPICOREViewAction, setLoadingState("KPICOREView"))
      .addCase(_Actions.KPICOREViewActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "KPICOREView"))
      .addCase(_Actions.KPICOREViewActionProgress, (state, action) => setProgressState(state, action.payload, "KPICOREView"))
      .addCase(_Actions.KPICOREViewActionFailure, (state, action) => setFailureState(state, action.payload, "KPICOREView"))
      .addCase(_Actions.KPICOREViewSpecificAction, setLoadingState("KPICOREViewSpecific"))
      .addCase(_Actions.KPICOREViewSpecificActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "KPICOREViewSpecific"))
      .addCase(_Actions.KPICOREViewSpecificActionProgress, (state, action) => setProgressState(state, action.payload, "KPICOREViewSpecific"))
      .addCase(_Actions.KPICOREViewSpecificActionFailure, (state, action) => setFailureState(state, action.payload, "KPICOREViewSpecific"))
      .addCase(_Actions.KPICOREViewSpecificEmployeeAction, setLoadingState("KPICOREViewSpecificEmployee"))
      .addCase(_Actions.KPICOREViewSpecificEmployeeActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "KPICOREViewSpecificEmployee"))
      .addCase(_Actions.KPICOREViewSpecificEmployeeActionProgress, (state, action) => setProgressState(state, action.payload, "KPICOREViewSpecificEmployee"))
      .addCase(_Actions.KPICOREViewSpecificEmployeeActionFailure, (state, action) => setFailureState(state, action.payload, "KPICOREViewSpecificEmployee"))
      .addCase(_Actions.KPICORECreateAction, setLoadingState("KPICORECreate"))
      .addCase(_Actions.KPICORECreateActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "KPICORECreate"))
      .addCase(_Actions.KPICORECreateActionProgress, (state, action) => setProgressState(state, action.payload, "KPICORECreate"))
      .addCase(_Actions.KPICORECreateActionFailure, (state, action) => setFailureState(state, action.payload, "KPICORECreate"))
      .addCase(_Actions.KPICORECreateActionFailureCleanup, setRefreshedState("KPICORECreate"))
      .addCase(_Actions.KPICOREEditAction, setLoadingState("KPICOREEdit"))
      .addCase(_Actions.KPICOREEditActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "KPICOREEdit"))
      .addCase(_Actions.KPICOREEditActionProgress, (state, action) => setProgressState(state, action.payload, "KPICOREEdit"))
      .addCase(_Actions.KPICOREEditActionFailure, (state, action) => setFailureState(state, action.payload, "KPICOREEdit"))
      .addCase(_Actions.KPICOREUpdateSelfAction, setLoadingState("KPICOREUpdateSelf"))
      .addCase(_Actions.KPICOREUpdateSelfActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "KPICOREUpdateSelf"))
      .addCase(_Actions.KPICOREUpdateSelfActionProgress, (state, action) => setProgressState(state, action.payload, "KPICOREUpdateSelf"))
      .addCase(_Actions.KPICOREUpdateSelfActionFailure, (state, action) => setFailureState(state, action.payload, "KPICOREUpdateSelf"))
      .addCase(_Actions.KPICOREUpdateSupervisorAction, setLoadingState("KPICOREUpdateSupervisor"))
      .addCase(_Actions.KPICOREUpdateSupervisorActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "KPICOREUpdateSupervisor"))
      .addCase(_Actions.KPICOREUpdateSupervisorActionProgress, (state, action) => setProgressState(state, action.payload, "KPICOREUpdateSupervisor"))
      .addCase(_Actions.KPICOREUpdateSupervisorActionFailure, (state, action) => setFailureState(state, action.payload, "KPICOREUpdateSupervisor"))
      //CORECOMPE SECTION
      .addCase(_Actions.CORECOMPEViewAction, setLoadingState("CORECOMPEView"))
      .addCase(_Actions.CORECOMPEViewActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "CORECOMPEView"))
      .addCase(_Actions.CORECOMPEViewActionProgress, (state, action) => setProgressState(state, action.payload, "CORECOMPEView"))
      .addCase(_Actions.CORECOMPEViewActionFailure, (state, action) => setFailureState(state, action.payload, "CORECOMPEView"))
      .addCase(_Actions.CORECOMPEViewSpecificAction, setLoadingState("CORECOMPEViewSpecific"))
      .addCase(_Actions.CORECOMPEViewSpecificActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "CORECOMPEViewSpecific"))
      .addCase(_Actions.CORECOMPEViewSpecificActionProgress, (state, action) => setProgressState(state, action.payload, "CORECOMPEViewSpecific"))
      .addCase(_Actions.CORECOMPEViewSpecificActionFailure, (state, action) => setFailureState(state, action.payload, "CORECOMPEViewSpecific"))
      .addCase(_Actions.CORECOMPECreateAction, setLoadingState("CORECOMPECreate"))
      .addCase(_Actions.CORECOMPECreateActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "CORECOMPECreate"))
      .addCase(_Actions.CORECOMPECreateActionProgress, (state, action) => setProgressState(state, action.payload, "CORECOMPECreate"))
      .addCase(_Actions.CORECOMPECreateActionFailure, (state, action) => setFailureState(state, action.payload, "CORECOMPECreate"))
      .addCase(_Actions.CORECOMPECreateActionFailureCleanup, setRefreshedState("CORECOMPECreate"))
      .addCase(_Actions.CORECOMPEEditAction, setLoadingState("CORECOMPEEdit"))
      .addCase(_Actions.CORECOMPEEditActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "CORECOMPEEdit"))
      .addCase(_Actions.CORECOMPEEditActionProgress, (state, action) => setProgressState(state, action.payload, "CORECOMPEEdit"))
      .addCase(_Actions.CORECOMPEEditActionFailure, (state, action) => setFailureState(state, action.payload, "CORECOMPEEdit"))
      .addCase(_Actions.CORECOMPEEditActionFailureCleanup, setRefreshedState("CORECOMPEEdit"))
      .addCase(_Actions.CORECOMPEDeleteAction, setLoadingState("CORECOMPEDelete"))
      .addCase(_Actions.CORECOMPEDeleteActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "CORECOMPEDelete"))
      .addCase(_Actions.CORECOMPEDeleteActionProgress, (state, action) => setProgressState(state, action.payload, "CORECOMPEDelete"))
      .addCase(_Actions.CORECOMPEDeleteActionFailure, (state, action) => setFailureState(state, action.payload, "CORECOMPEDelete"))
      .addCase(_Actions.CORECOMPEDeleteActionFailureCleanup, setRefreshedState("CORECOMPEDelete"))
      //EVALQUESTIONS SECTION
      .addCase(_Actions.EVALQUESTIONSViewAction, setLoadingState("EVALQUESTIONSView"))
      .addCase(_Actions.EVALQUESTIONSViewActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "EVALQUESTIONSView"))
      .addCase(_Actions.EVALQUESTIONSViewActionProgress, (state, action) => setProgressState(state, action.payload, "EVALQUESTIONSView"))
      .addCase(_Actions.EVALQUESTIONSViewActionFailure, (state, action) => setFailureState(state, action.payload, "EVALQUESTIONSView"))
      .addCase(_Actions.EVALQUESTIONSViewSpecificAction, setLoadingState("EVALQUESTIONSViewSpecific"))
      .addCase(_Actions.EVALQUESTIONSViewSpecificActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "EVALQUESTIONSViewSpecific"))
      .addCase(_Actions.EVALQUESTIONSViewSpecificActionProgress, (state, action) => setProgressState(state, action.payload, "EVALQUESTIONSViewSpecific"))
      .addCase(_Actions.EVALQUESTIONSViewSpecificActionFailure, (state, action) => setFailureState(state, action.payload, "EVALQUESTIONSViewSpecific"))
      .addCase(_Actions.EVALQUESTIONSCreateAction, setLoadingState("EVALQUESTIONSCreate"))
      .addCase(_Actions.EVALQUESTIONSCreateActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "EVALQUESTIONSCreate"))
      .addCase(_Actions.EVALQUESTIONSCreateActionProgress, (state, action) => setProgressState(state, action.payload, "EVALQUESTIONSCreate"))
      .addCase(_Actions.EVALQUESTIONSCreateActionFailure, (state, action) => setFailureState(state, action.payload, "EVALQUESTIONSCreate"))
      .addCase(_Actions.EVALQUESTIONSCreateActionFailureCleanup, setRefreshedState("EVALQUESTIONSCreate"))
      .addCase(_Actions.EVALQUESTIONSEditAction, setLoadingState("EVALQUESTIONSEdit"))
      .addCase(_Actions.EVALQUESTIONSEditActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "EVALQUESTIONSEdit"))
      .addCase(_Actions.EVALQUESTIONSEditActionProgress, (state, action) => setProgressState(state, action.payload, "EVALQUESTIONSEdit"))
      .addCase(_Actions.EVALQUESTIONSEditActionFailure, (state, action) => setFailureState(state, action.payload, "EVALQUESTIONSEdit"))
      .addCase(_Actions.EVALQUESTIONSDeleteAction, setLoadingState("EVALQUESTIONSDelete"))
      .addCase(_Actions.EVALQUESTIONSDeleteActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "EVALQUESTIONSDelete"))
      .addCase(_Actions.EVALQUESTIONSDeleteActionProgress, (state, action) => setProgressState(state, action.payload, "EVALQUESTIONSDelete"))
      .addCase(_Actions.EVALQUESTIONSDeleteActionFailure, (state, action) => setFailureState(state, action.payload, "EVALQUESTIONSDelete"))
      .addCase(_Actions.EVALQUESTIONSDeleteActionFailureCleanup, setRefreshedState("EVALQUESTIONSDelete"))
      //ONBOARDINGSTATUS SECTION
      .addCase(_Actions.ONBOARDINGSTATUSViewAction, setLoadingState("ONBOARDINGSTATUSView"))
      .addCase(_Actions.ONBOARDINGSTATUSViewActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "ONBOARDINGSTATUSView"))
      .addCase(_Actions.ONBOARDINGSTATUSViewActionProgress, (state, action) => setProgressState(state, action.payload, "ONBOARDINGSTATUSView"))
      .addCase(_Actions.ONBOARDINGSTATUSViewActionFailure, (state, action) => setFailureState(state, action.payload, "ONBOARDINGSTATUSView"))
      .addCase(_Actions.ONBOARDINGSTATUSViewSpecificAction, setLoadingState("ONBOARDINGSTATUSViewSpecific"))
      .addCase(_Actions.ONBOARDINGSTATUSViewSpecificActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "ONBOARDINGSTATUSViewSpecific"))
      .addCase(_Actions.ONBOARDINGSTATUSViewSpecificActionProgress, (state, action) => setProgressState(state, action.payload, "ONBOARDINGSTATUSViewSpecific"))
      .addCase(_Actions.ONBOARDINGSTATUSViewSpecificActionFailure, (state, action) => setFailureState(state, action.payload, "ONBOARDINGSTATUSViewSpecific"))
      .addCase(_Actions.ONBOARDINGSTATUSCreateAction, setLoadingState("ONBOARDINGSTATUSCreate"))
      .addCase(_Actions.ONBOARDINGSTATUSCreateActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "ONBOARDINGSTATUSCreate"))
      .addCase(_Actions.ONBOARDINGSTATUSCreateActionProgress, (state, action) => setProgressState(state, action.payload, "ONBOARDINGSTATUSCreate"))
      .addCase(_Actions.ONBOARDINGSTATUSCreateActionFailure, (state, action) => setFailureState(state, action.payload, "ONBOARDINGSTATUSCreate"))
      .addCase(_Actions.ONBOARDINGSTATUSCreateActionFailureCleanup, setRefreshedState("ONBOARDINGSTATUSCreate"))
      .addCase(_Actions.ONBOARDINGSTATUSEditAction, setLoadingState("ONBOARDINGSTATUSEdit"))
      .addCase(_Actions.ONBOARDINGSTATUSEditActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "ONBOARDINGSTATUSEdit"))
      .addCase(_Actions.ONBOARDINGSTATUSEditActionProgress, (state, action) => setProgressState(state, action.payload, "ONBOARDINGSTATUSEdit"))
      .addCase(_Actions.ONBOARDINGSTATUSEditActionFailure, (state, action) => setFailureState(state, action.payload, "ONBOARDINGSTATUSEdit"))
      .addCase(_Actions.ONBOARDINGSTATUSUpdateAction, setLoadingState("ONBOARDINGSTATUSUpdate"))
      .addCase(_Actions.ONBOARDINGSTATUSUpdateActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "ONBOARDINGSTATUSUpdate"))
      .addCase(_Actions.ONBOARDINGSTATUSUpdateActionProgress, (state, action) => setProgressState(state, action.payload, "ONBOARDINGSTATUSUpdate"))
      .addCase(_Actions.ONBOARDINGSTATUSUpdateActionFailure, (state, action) => setFailureState(state, action.payload, "ONBOARDINGSTATUSUpdate"))
      //ONBOARDINGREQUIREMENTS SECTION
      .addCase(_Actions.ONBOARDINGREQUIREMENTSViewAction, setLoadingState("ONBOARDINGREQUIREMENTSView"))
      .addCase(_Actions.ONBOARDINGREQUIREMENTSViewActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "ONBOARDINGREQUIREMENTSView"))
      .addCase(_Actions.ONBOARDINGREQUIREMENTSViewActionProgress, (state, action) => setProgressState(state, action.payload, "ONBOARDINGREQUIREMENTSView"))
      .addCase(_Actions.ONBOARDINGREQUIREMENTSViewActionFailure, (state, action) => setFailureState(state, action.payload, "ONBOARDINGREQUIREMENTSView"))
      .addCase(_Actions.ONBOARDINGREQUIREMENTSViewSpecificAction, setLoadingState("ONBOARDINGREQUIREMENTSViewSpecific"))
      .addCase(_Actions.ONBOARDINGREQUIREMENTSViewSpecificActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "ONBOARDINGREQUIREMENTSViewSpecific"))
      .addCase(_Actions.ONBOARDINGREQUIREMENTSViewSpecificActionProgress, (state, action) => setProgressState(state, action.payload, "ONBOARDINGREQUIREMENTSViewSpecific"))
      .addCase(_Actions.ONBOARDINGREQUIREMENTSViewSpecificActionFailure, (state, action) => setFailureState(state, action.payload, "ONBOARDINGREQUIREMENTSViewSpecific"))
      .addCase(_Actions.ONBOARDINGREQUIREMENTSCreateAction, setLoadingState("ONBOARDINGREQUIREMENTSCreate"))
      .addCase(_Actions.ONBOARDINGREQUIREMENTSCreateActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "ONBOARDINGREQUIREMENTSCreate"))
      .addCase(_Actions.ONBOARDINGREQUIREMENTSCreateActionProgress, (state, action) => setProgressState(state, action.payload, "ONBOARDINGREQUIREMENTSCreate"))
      .addCase(_Actions.ONBOARDINGREQUIREMENTSCreateActionFailure, (state, action) => setFailureState(state, action.payload, "ONBOARDINGREQUIREMENTSCreate"))
      .addCase(_Actions.ONBOARDINGREQUIREMENTSCreateActionFailureCleanup, setRefreshedState("ONBOARDINGREQUIREMENTSCreate"))
      .addCase(_Actions.ONBOARDINGREQUIREMENTSEditAction, setLoadingState("ONBOARDINGREQUIREMENTSEdit"))
      .addCase(_Actions.ONBOARDINGREQUIREMENTSEditActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "ONBOARDINGREQUIREMENTSEdit"))
      .addCase(_Actions.ONBOARDINGREQUIREMENTSEditActionProgress, (state, action) => setProgressState(state, action.payload, "ONBOARDINGREQUIREMENTSEdit"))
      .addCase(_Actions.ONBOARDINGREQUIREMENTSEditActionFailure, (state, action) => setFailureState(state, action.payload, "ONBOARDINGREQUIREMENTSEdit"))
      .addCase(_Actions.ONBOARDINGREQUIREMENTSDeleteAction, setLoadingState("ONBOARDINGREQUIREMENTSDelete"))
      .addCase(_Actions.ONBOARDINGREQUIREMENTSDeleteActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "ONBOARDINGREQUIREMENTSDelete"))
      .addCase(_Actions.ONBOARDINGREQUIREMENTSDeleteActionProgress, (state, action) => setProgressState(state, action.payload, "ONBOARDINGREQUIREMENTSDelete"))
      .addCase(_Actions.ONBOARDINGREQUIREMENTSDeleteActionFailure, (state, action) => setFailureState(state, action.payload, "ONBOARDINGREQUIREMENTSDelete"))
      .addCase(_Actions.ONBOARDINGREQUIREMENTSDeleteActionFailureCleanup, setRefreshedState("ONBOARDINGREQUIREMENTSDelete"))
      //OFFBOARDINGSTATUS SECTION
      .addCase(_Actions.OFFBOARDINGSTATUSViewAction, setLoadingState("OFFBOARDINGSTATUSView"))
      .addCase(_Actions.OFFBOARDINGSTATUSViewActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "OFFBOARDINGSTATUSView"))
      .addCase(_Actions.OFFBOARDINGSTATUSViewActionProgress, (state, action) => setProgressState(state, action.payload, "OFFBOARDINGSTATUSView"))
      .addCase(_Actions.OFFBOARDINGSTATUSViewActionFailure, (state, action) => setFailureState(state, action.payload, "OFFBOARDINGSTATUSView"))
      .addCase(_Actions.OFFBOARDINGSTATUSViewSpecificAction, setLoadingState("OFFBOARDINGSTATUSViewSpecific"))
      .addCase(_Actions.OFFBOARDINGSTATUSViewSpecificActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "OFFBOARDINGSTATUSViewSpecific"))
      .addCase(_Actions.OFFBOARDINGSTATUSViewSpecificActionProgress, (state, action) => setProgressState(state, action.payload, "OFFBOARDINGSTATUSViewSpecific"))
      .addCase(_Actions.OFFBOARDINGSTATUSViewSpecificActionFailure, (state, action) => setFailureState(state, action.payload, "OFFBOARDINGSTATUSViewSpecific"))
      .addCase(_Actions.OFFBOARDINGSTATUSCreateAction, setLoadingState("OFFBOARDINGSTATUSCreate"))
      .addCase(_Actions.OFFBOARDINGSTATUSCreateActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "OFFBOARDINGSTATUSCreate"))
      .addCase(_Actions.OFFBOARDINGSTATUSCreateActionProgress, (state, action) => setProgressState(state, action.payload, "OFFBOARDINGSTATUSCreate"))
      .addCase(_Actions.OFFBOARDINGSTATUSCreateActionFailure, (state, action) => setFailureState(state, action.payload, "OFFBOARDINGSTATUSCreate"))
      .addCase(_Actions.OFFBOARDINGSTATUSCreateActionFailureCleanup, setRefreshedState("OFFBOARDINGSTATUSCreate"))
      .addCase(_Actions.OFFBOARDINGSTATUSEditAction, setLoadingState("OFFBOARDINGSTATUSEdit"))
      .addCase(_Actions.OFFBOARDINGSTATUSEditActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "OFFBOARDINGSTATUSEdit"))
      .addCase(_Actions.OFFBOARDINGSTATUSEditActionProgress, (state, action) => setProgressState(state, action.payload, "OFFBOARDINGSTATUSEdit"))
      .addCase(_Actions.OFFBOARDINGSTATUSEditActionFailure, (state, action) => setFailureState(state, action.payload, "OFFBOARDINGSTATUSEdit"))
      .addCase(_Actions.OFFBOARDINGSTATUSUpdateAction, setLoadingState("OFFBOARDINGSTATUSUpdate"))
      .addCase(_Actions.OFFBOARDINGSTATUSUpdateActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "OFFBOARDINGSTATUSUpdate"))
      .addCase(_Actions.OFFBOARDINGSTATUSUpdateActionProgress, (state, action) => setProgressState(state, action.payload, "OFFBOARDINGSTATUSUpdate"))
      .addCase(_Actions.OFFBOARDINGSTATUSUpdateActionFailure, (state, action) => setFailureState(state, action.payload, "OFFBOARDINGSTATUSUpdate"))
      //OFFBOARDINGREQUIREMENTS SECTION
      .addCase(_Actions.OFFBOARDINGREQUIREMENTSViewAction, setLoadingState("OFFBOARDINGREQUIREMENTSView"))
      .addCase(_Actions.OFFBOARDINGREQUIREMENTSViewActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "OFFBOARDINGREQUIREMENTSView"))
      .addCase(_Actions.OFFBOARDINGREQUIREMENTSViewActionProgress, (state, action) => setProgressState(state, action.payload, "OFFBOARDINGREQUIREMENTSView"))
      .addCase(_Actions.OFFBOARDINGREQUIREMENTSViewActionFailure, (state, action) => setFailureState(state, action.payload, "OFFBOARDINGREQUIREMENTSView"))
      .addCase(_Actions.OFFBOARDINGREQUIREMENTSViewSpecificAction, setLoadingState("OFFBOARDINGREQUIREMENTSViewSpecific"))
      .addCase(_Actions.OFFBOARDINGREQUIREMENTSViewSpecificActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "OFFBOARDINGREQUIREMENTSViewSpecific"))
      .addCase(_Actions.OFFBOARDINGREQUIREMENTSViewSpecificActionProgress, (state, action) => setProgressState(state, action.payload, "OFFBOARDINGREQUIREMENTSViewSpecific"))
      .addCase(_Actions.OFFBOARDINGREQUIREMENTSViewSpecificActionFailure, (state, action) => setFailureState(state, action.payload, "OFFBOARDINGREQUIREMENTSViewSpecific"))
      .addCase(_Actions.OFFBOARDINGREQUIREMENTSCreateAction, setLoadingState("OFFBOARDINGREQUIREMENTSCreate"))
      .addCase(_Actions.OFFBOARDINGREQUIREMENTSCreateActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "OFFBOARDINGREQUIREMENTSCreate"))
      .addCase(_Actions.OFFBOARDINGREQUIREMENTSCreateActionProgress, (state, action) => setProgressState(state, action.payload, "OFFBOARDINGREQUIREMENTSCreate"))
      .addCase(_Actions.OFFBOARDINGREQUIREMENTSCreateActionFailure, (state, action) => setFailureState(state, action.payload, "OFFBOARDINGREQUIREMENTSCreate"))
      .addCase(_Actions.OFFBOARDINGREQUIREMENTSCreateActionFailureCleanup, setRefreshedState("OFFBOARDINGREQUIREMENTSCreate"))
      .addCase(_Actions.OFFBOARDINGREQUIREMENTSEditAction, setLoadingState("OFFBOARDINGREQUIREMENTSEdit"))
      .addCase(_Actions.OFFBOARDINGREQUIREMENTSEditActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "OFFBOARDINGREQUIREMENTSEdit"))
      .addCase(_Actions.OFFBOARDINGREQUIREMENTSEditActionProgress, (state, action) => setProgressState(state, action.payload, "OFFBOARDINGREQUIREMENTSEdit"))
      .addCase(_Actions.OFFBOARDINGREQUIREMENTSEditActionFailure, (state, action) => setFailureState(state, action.payload, "OFFBOARDINGREQUIREMENTSEdit"))
      .addCase(_Actions.OFFBOARDINGREQUIREMENTSDeleteAction, setLoadingState("OFFBOARDINGREQUIREMENTSDelete"))
      .addCase(_Actions.OFFBOARDINGREQUIREMENTSDeleteActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "OFFBOARDINGREQUIREMENTSDelete"))
      .addCase(_Actions.OFFBOARDINGREQUIREMENTSDeleteActionProgress, (state, action) => setProgressState(state, action.payload, "OFFBOARDINGREQUIREMENTSDelete"))
      .addCase(_Actions.OFFBOARDINGREQUIREMENTSDeleteActionFailure, (state, action) => setFailureState(state, action.payload, "OFFBOARDINGREQUIREMENTSDelete"))
      .addCase(_Actions.OFFBOARDINGREQUIREMENTSDeleteActionFailureCleanup, setRefreshedState("OFFBOARDINGREQUIREMENTSDelete"))
      //APPLICANTS SECTION
      .addCase(_Actions.APPLICANTSViewAction, setLoadingState("APPLICANTSView"))
      .addCase(_Actions.APPLICANTSViewActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "APPLICANTSView"))
      .addCase(_Actions.APPLICANTSViewActionProgress, (state, action) => setProgressState(state, action.payload, "APPLICANTSView"))
      .addCase(_Actions.APPLICANTSViewActionFailure, (state, action) => setFailureState(state, action.payload, "APPLICANTSView"))
      .addCase(_Actions.APPLICANTSViewSpecificAction, setLoadingState("APPLICANTSViewSpecific"))
      .addCase(_Actions.APPLICANTSViewSpecificActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "APPLICANTSViewSpecific"))
      .addCase(_Actions.APPLICANTSViewSpecificActionProgress, (state, action) => setProgressState(state, action.payload, "APPLICANTSViewSpecific"))
      .addCase(_Actions.APPLICANTSViewSpecificActionFailure, (state, action) => setFailureState(state, action.payload, "APPLICANTSViewSpecific"))
      .addCase(_Actions.APPLICANTSCreateAction, setLoadingState("APPLICANTSCreate"))
      .addCase(_Actions.APPLICANTSCreateActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "APPLICANTSCreate"))
      .addCase(_Actions.APPLICANTSCreateActionProgress, (state, action) => setProgressState(state, action.payload, "APPLICANTSCreate"))
      .addCase(_Actions.APPLICANTSCreateActionFailure, (state, action) => setFailureState(state, action.payload, "APPLICANTSCreate"))
      .addCase(_Actions.APPLICANTSCreateActionFailureCleanup, setRefreshedState("APPLICANTSCreate"))
      .addCase(_Actions.APPLICANTSEditAction, setLoadingState("APPLICANTSEdit"))
      .addCase(_Actions.APPLICANTSEditActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "APPLICANTSEdit"))
      .addCase(_Actions.APPLICANTSEditActionProgress, (state, action) => setProgressState(state, action.payload, "APPLICANTSEdit"))
      .addCase(_Actions.APPLICANTSEditActionFailure, (state, action) => setFailureState(state, action.payload, "APPLICANTSEdit"))
      //JOBPOSTINGS SECTION
      .addCase(_Actions.JOBPOSTINGSViewAction, setLoadingState("JOBPOSTINGSView"))
      .addCase(_Actions.JOBPOSTINGSViewActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "JOBPOSTINGSView"))
      .addCase(_Actions.JOBPOSTINGSViewActionProgress, (state, action) => setProgressState(state, action.payload, "JOBPOSTINGSView"))
      .addCase(_Actions.JOBPOSTINGSViewActionFailure, (state, action) => setFailureState(state, action.payload, "JOBPOSTINGSView"))
      .addCase(_Actions.JOBPOSTINGSViewSpecificAction, setLoadingState("JOBPOSTINGSViewSpecific"))
      .addCase(_Actions.JOBPOSTINGSViewSpecificActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "JOBPOSTINGSViewSpecific"))
      .addCase(_Actions.JOBPOSTINGSViewSpecificActionProgress, (state, action) => setProgressState(state, action.payload, "JOBPOSTINGSViewSpecific"))
      .addCase(_Actions.JOBPOSTINGSViewSpecificActionFailure, (state, action) => setFailureState(state, action.payload, "JOBPOSTINGSViewSpecific"))
      .addCase(_Actions.JOBPOSTINGSCreateAction, setLoadingState("JOBPOSTINGSCreate"))
      .addCase(_Actions.JOBPOSTINGSCreateActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "JOBPOSTINGSCreate"))
      .addCase(_Actions.JOBPOSTINGSCreateActionProgress, (state, action) => setProgressState(state, action.payload, "JOBPOSTINGSCreate"))
      .addCase(_Actions.JOBPOSTINGSCreateActionFailure, (state, action) => setFailureState(state, action.payload, "JOBPOSTINGSCreate"))
      .addCase(_Actions.JOBPOSTINGSCreateActionFailureCleanup, setRefreshedState("JOBPOSTINGSCreate"))
      .addCase(_Actions.JOBPOSTINGSEditAction, setLoadingState("JOBPOSTINGSEdit"))
      .addCase(_Actions.JOBPOSTINGSEditActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "JOBPOSTINGSEdit"))
      .addCase(_Actions.JOBPOSTINGSEditActionProgress, (state, action) => setProgressState(state, action.payload, "JOBPOSTINGSEdit"))
      .addCase(_Actions.JOBPOSTINGSEditActionFailure, (state, action) => setFailureState(state, action.payload, "JOBPOSTINGSEdit"))
      .addCase(_Actions.JOBPOSTINGSDeleteAction, setLoadingState("JOBPOSTINGSDelete"))
      .addCase(_Actions.JOBPOSTINGSDeleteActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "JOBPOSTINGSDelete"))
      .addCase(_Actions.JOBPOSTINGSDeleteActionProgress, (state, action) => setProgressState(state, action.payload, "JOBPOSTINGSDelete"))
      .addCase(_Actions.JOBPOSTINGSDeleteActionFailure, (state, action) => setFailureState(state, action.payload, "JOBPOSTINGSDelete"))
      //PERFECTATTENDANCE SECTION
      .addCase(_Actions.PERFECTATTENDANCEViewSpecificAction, setLoadingState("PERFECTATTENDANCEViewSpecific"))
      .addCase(_Actions.PERFECTATTENDANCEViewSpecificActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "PERFECTATTENDANCEViewSpecific"))
      .addCase(_Actions.PERFECTATTENDANCEViewSpecificActionProgress, (state, action) => setProgressState(state, action.payload, "PERFECTATTENDANCEViewSpecific"))
      .addCase(_Actions.PERFECTATTENDANCEViewSpecificActionFailure, (state, action) => setFailureState(state, action.payload, "PERFECTATTENDANCEViewSpecific"))
      //ALLSCHEDULE SECTION
      .addCase(_Actions.ALLSCHEDULEViewSpecificAction, setLoadingState("ALLSCHEDULEViewSpecific"))
      .addCase(_Actions.ALLSCHEDULEViewSpecificActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "ALLSCHEDULEViewSpecific"))
      .addCase(_Actions.ALLSCHEDULEViewSpecificActionProgress, (state, action) => setProgressState(state, action.payload, "ALLSCHEDULEViewSpecific"))
      .addCase(_Actions.ALLSCHEDULEViewSpecificActionFailure, (state, action) => setFailureState(state, action.payload, "ALLSCHEDULEViewSpecific"))
      //EMPHISTORY SECTION
      .addCase(_Actions.EMPHISTORYViewAction, setLoadingState("EMPHISTORYView"))
      .addCase(_Actions.EMPHISTORYViewActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "EMPHISTORYView"))
      .addCase(_Actions.EMPHISTORYViewActionProgress, (state, action) => setProgressState(state, action.payload, "EMPHISTORYView"))
      .addCase(_Actions.EMPHISTORYViewActionFailure, (state, action) => setFailureState(state, action.payload, "EMPHISTORYView"))
      .addCase(_Actions.EMPHISTORYViewSpecificAction, setLoadingState("EMPHISTORYViewSpecific"))
      .addCase(_Actions.EMPHISTORYViewSpecificActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "EMPHISTORYViewSpecific"))
      .addCase(_Actions.EMPHISTORYViewSpecificActionProgress, (state, action) => setProgressState(state, action.payload, "EMPHISTORYViewSpecific"))
      .addCase(_Actions.EMPHISTORYViewSpecificActionFailure, (state, action) => setFailureState(state, action.payload, "EMPHISTORYViewSpecific"))
      .addCase(_Actions.EMPHISTORYCreateAction, setLoadingState("EMPHISTORYCreate"))
      .addCase(_Actions.EMPHISTORYCreateActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "EMPHISTORYCreate"))
      .addCase(_Actions.EMPHISTORYCreateActionProgress, (state, action) => setProgressState(state, action.payload, "EMPHISTORYCreate"))
      .addCase(_Actions.EMPHISTORYCreateActionFailure, (state, action) => setFailureState(state, action.payload, "EMPHISTORYCreate"))
      .addCase(_Actions.EMPHISTORYCreateActionFailureCleanup, setRefreshedState("EMPHISTORYCreate"))
      .addCase(_Actions.EMPHISTORYEditAction, setLoadingState("EMPHISTORYEdit"))
      .addCase(_Actions.EMPHISTORYEditActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "EMPHISTORYEdit"))
      .addCase(_Actions.EMPHISTORYEditActionProgress, (state, action) => setProgressState(state, action.payload, "EMPHISTORYEdit"))
      .addCase(_Actions.EMPHISTORYEditActionFailure, (state, action) => setFailureState(state, action.payload, "EMPHISTORYEdit"))
      .addCase(_Actions.EMPHISTORYEditActionFailureCleanup, setRefreshedState("EMPHISTORYEdit"))
      .addCase(_Actions.EMPHISTORYDeleteAction, setLoadingState("EMPHISTORYDelete"))
      .addCase(_Actions.EMPHISTORYDeleteActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "EMPHISTORYDelete"))
      .addCase(_Actions.EMPHISTORYDeleteActionProgress, (state, action) => setProgressState(state, action.payload, "EMPHISTORYDelete"))
      .addCase(_Actions.EMPHISTORYDeleteActionFailure, (state, action) => setFailureState(state, action.payload, "EMPHISTORYDelete"))
      .addCase(_Actions.EMPHISTORYDeleteActionFailureCleanup, setRefreshedState("EMPHISTORYDelete"))
      //EMPSEMINARS SECTION
      .addCase(_Actions.EMPSEMINARSViewAction, setLoadingState("EMPSEMINARSView"))
      .addCase(_Actions.EMPSEMINARSViewActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "EMPSEMINARSView"))
      .addCase(_Actions.EMPSEMINARSViewActionProgress, (state, action) => setProgressState(state, action.payload, "EMPSEMINARSView"))
      .addCase(_Actions.EMPSEMINARSViewActionFailure, (state, action) => setFailureState(state, action.payload, "EMPSEMINARSView"))
      .addCase(_Actions.EMPSEMINARSViewSpecificAction, setLoadingState("EMPSEMINARSViewSpecific"))
      .addCase(_Actions.EMPSEMINARSViewSpecificActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "EMPSEMINARSViewSpecific"))
      .addCase(_Actions.EMPSEMINARSViewSpecificActionProgress, (state, action) => setProgressState(state, action.payload, "EMPSEMINARSViewSpecific"))
      .addCase(_Actions.EMPSEMINARSViewSpecificActionFailure, (state, action) => setFailureState(state, action.payload, "EMPSEMINARSViewSpecific"))
      .addCase(_Actions.EMPSEMINARSCreateAction, setLoadingState("EMPSEMINARSCreate"))
      .addCase(_Actions.EMPSEMINARSCreateActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "EMPSEMINARSCreate"))
      .addCase(_Actions.EMPSEMINARSCreateActionProgress, (state, action) => setProgressState(state, action.payload, "EMPSEMINARSCreate"))
      .addCase(_Actions.EMPSEMINARSCreateActionFailure, (state, action) => setFailureState(state, action.payload, "EMPSEMINARSCreate"))
      .addCase(_Actions.EMPSEMINARSCreateActionFailureCleanup, setRefreshedState("EMPSEMINARSCreate"))
      .addCase(_Actions.EMPSEMINARSEditAction, setLoadingState("EMPSEMINARSEdit"))
      .addCase(_Actions.EMPSEMINARSEditActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "EMPSEMINARSEdit"))
      .addCase(_Actions.EMPSEMINARSEditActionProgress, (state, action) => setProgressState(state, action.payload, "EMPSEMINARSEdit"))
      .addCase(_Actions.EMPSEMINARSEditActionFailure, (state, action) => setFailureState(state, action.payload, "EMPSEMINARSEdit"))
      .addCase(_Actions.EMPSEMINARSDeleteAction, setLoadingState("EMPSEMINARSDelete"))
      .addCase(_Actions.EMPSEMINARSDeleteActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "EMPSEMINARSDelete"))
      .addCase(_Actions.EMPSEMINARSDeleteActionProgress, (state, action) => setProgressState(state, action.payload, "EMPSEMINARSDelete"))
      .addCase(_Actions.EMPSEMINARSDeleteActionFailure, (state, action) => setFailureState(state, action.payload, "EMPSEMINARSDelete"))
    },
});


export const employeeAndApplicantsReducer = employeeAndApplicantsSlice.reducer;