import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as _Actions from '../actions/employee-and-applicants';
import * as _Interface from '@/types/types-employee-and-applicants';

type EmployeeAndApplicantsPayloads = 
string |
_Interface.KPICOREViewInterface[] | 
_Interface.KPICOREViewInterface | 
_Interface.KPICORECreateInterface |
_Interface.CORECOMPEViewInterface[] | 
_Interface.CORECOMPEViewInterface | 
_Interface.CORECOMPECreateInterface |
_Interface.EVALQUESTIONSViewInterface[] | 
_Interface.EVALQUESTIONSViewInterface | 
_Interface.EVALQUESTIONSCreateInterface |
_Interface.ONBOARDINGSTATUSViewInterface[] | 
_Interface.ONBOARDINGSTATUSViewInterface | 
_Interface.ONBOARDINGSTATUSCreateInterface |
_Interface.ONBOARDINGREQUIREMENTSViewInterface[] | 
_Interface.ONBOARDINGREQUIREMENTSViewInterface | 
_Interface.ONBOARDINGREQUIREMENTSCreateInterface |
_Interface.OFFBOARDINGSTATUSViewInterface[] | 
_Interface.OFFBOARDINGSTATUSViewInterface | 
_Interface.OFFBOARDINGSTATUSCreateInterface |
_Interface.OFFBOARDINGREQUIREMENTSViewInterface[] | 
_Interface.OFFBOARDINGREQUIREMENTSViewInterface | 
_Interface.OFFBOARDINGREQUIREMENTSCreateInterface |
_Interface.APPLICANTSViewInterface[] | 
_Interface.APPLICANTSViewInterface | 
_Interface.APPLICANTSCreateInterface |
_Interface.JOBPOSTINGSViewInterface[] | 
_Interface.JOBPOSTINGSViewInterface | 
_Interface.JOBPOSTINGSCreateInterface
;

interface CommonEmployeeAndApplicantsState {
  status: string | null;
  progress: number;
  error: string | null; 
}

interface CommonEmployeeAndApplicantsDataStringState extends CommonEmployeeAndApplicantsState {
  data: string | null | unknown;
}

// KPICORE SECTION // KPICORE SECTION // KPICORE SECTION // KPICORE SECTION // KPICORE SECTION 
interface KPICOREViewState extends CommonEmployeeAndApplicantsState{
  data: _Interface.KPICOREViewInterface[] | [];
}

interface KPICORECreateState extends CommonEmployeeAndApplicantsState{
  data: _Interface.KPICORECreateInterface | null | {};
}

interface KPICOREEditState extends CommonEmployeeAndApplicantsState {
  data: KPICOREViewState | null;
}

// CORECOMPE SECTION // CORECOMPE SECTION // CORECOMPE SECTION // CORECOMPE SECTION // CORECOMPE SECTION 
interface CORECOMPEViewState extends CommonEmployeeAndApplicantsState{
  data: _Interface.CORECOMPEViewInterface[] | [];
}

interface CORECOMPECreateState extends CommonEmployeeAndApplicantsState{
  data: _Interface.CORECOMPECreateInterface | null | {};
}

interface CORECOMPEEditState extends CommonEmployeeAndApplicantsState {
  data: CORECOMPEViewState | null;
}

// EVALQUESTIONS SECTION // EVALQUESTIONS SECTION // EVALQUESTIONS SECTION // EVALQUESTIONS SECTION // EVALQUESTIONS SECTION 
interface EVALQUESTIONSViewState extends CommonEmployeeAndApplicantsState{
  data: _Interface.EVALQUESTIONSViewInterface[] | [];
}

interface EVALQUESTIONSCreateState extends CommonEmployeeAndApplicantsState{
  data: _Interface.EVALQUESTIONSCreateInterface | null | {};
}

interface EVALQUESTIONSEditState extends CommonEmployeeAndApplicantsState {
  data: EVALQUESTIONSViewState | null;
}

// ONBOARDINGSTATUS SECTION // ONBOARDINGSTATUS SECTION // ONBOARDINGSTATUS SECTION // ONBOARDINGSTATUS SECTION // ONBOARDINGSTATUS SECTION 
interface ONBOARDINGSTATUSViewState extends CommonEmployeeAndApplicantsState{
  data: _Interface.ONBOARDINGSTATUSViewInterface[] | [];
}

interface ONBOARDINGSTATUSCreateState extends CommonEmployeeAndApplicantsState{
  data: _Interface.ONBOARDINGSTATUSCreateInterface | null | {};
}

interface ONBOARDINGSTATUSEditState extends CommonEmployeeAndApplicantsState {
  data: ONBOARDINGSTATUSViewState | null;
}

// ONBOARDINGREQUIREMENTS SECTION // ONBOARDINGREQUIREMENTS SECTION // ONBOARDINGREQUIREMENTS SECTION // ONBOARDINGREQUIREMENTS SECTION // ONBOARDINGREQUIREMENTS SECTION 
interface ONBOARDINGREQUIREMENTSViewState extends CommonEmployeeAndApplicantsState{
  data: _Interface.ONBOARDINGREQUIREMENTSViewInterface[] | [];
}

interface ONBOARDINGREQUIREMENTSCreateState extends CommonEmployeeAndApplicantsState{
  data: _Interface.ONBOARDINGREQUIREMENTSCreateInterface | null | {};
}

interface ONBOARDINGREQUIREMENTSEditState extends CommonEmployeeAndApplicantsState {
  data: ONBOARDINGREQUIREMENTSViewState | null;
}


// OFFBOARDINGSTATUS SECTION // OFFBOARDINGSTATUS SECTION // OFFBOARDINGSTATUS SECTION // OFFBOARDINGSTATUS SECTION // OFFBOARDINGSTATUS SECTION 
interface OFFBOARDINGSTATUSViewState extends CommonEmployeeAndApplicantsState{
  data: _Interface.OFFBOARDINGSTATUSViewInterface[] | [];
}

interface OFFBOARDINGSTATUSCreateState extends CommonEmployeeAndApplicantsState{
  data: _Interface.OFFBOARDINGSTATUSCreateInterface | null | {};
}

interface OFFBOARDINGSTATUSEditState extends CommonEmployeeAndApplicantsState {
  data: OFFBOARDINGSTATUSViewState | null;
}

// OFFBOARDINGREQUIREMENTS SECTION // OFFBOARDINGREQUIREMENTS SECTION // OFFBOARDINGREQUIREMENTS SECTION // OFFBOARDINGREQUIREMENTS SECTION // OFFBOARDINGREQUIREMENTS SECTION 
interface OFFBOARDINGREQUIREMENTSViewState extends CommonEmployeeAndApplicantsState{
  data: _Interface.OFFBOARDINGREQUIREMENTSViewInterface[] | [];
}

interface OFFBOARDINGREQUIREMENTSCreateState extends CommonEmployeeAndApplicantsState{
  data: _Interface.OFFBOARDINGREQUIREMENTSCreateInterface | null | {};
}

interface OFFBOARDINGREQUIREMENTSEditState extends CommonEmployeeAndApplicantsState {
  data: OFFBOARDINGREQUIREMENTSViewState | null;
}

// APPLICANTS SECTION // APPLICANTS SECTION // APPLICANTS SECTION // APPLICANTS SECTION // APPLICANTS SECTION 
interface APPLICANTSViewState extends CommonEmployeeAndApplicantsState{
  data: _Interface.APPLICANTSViewInterface[] | [];
}

interface APPLICANTSCreateState extends CommonEmployeeAndApplicantsState{
  data: _Interface.APPLICANTSCreateInterface | null | {};
}

interface APPLICANTSEditState extends CommonEmployeeAndApplicantsState {
  data: APPLICANTSViewState | null;
}

// JOBPOSTINGS SECTION // JOBPOSTINGS SECTION // JOBPOSTINGS SECTION // JOBPOSTINGS SECTION // JOBPOSTINGS SECTION 
interface JOBPOSTINGSViewState extends CommonEmployeeAndApplicantsState{
  data: _Interface.JOBPOSTINGSViewInterface[] | [];
}

interface JOBPOSTINGSCreateState extends CommonEmployeeAndApplicantsState{
  data: _Interface.JOBPOSTINGSCreateInterface | null | {};
}

interface JOBPOSTINGSEditState extends CommonEmployeeAndApplicantsState {
  data: JOBPOSTINGSViewState | null;
}



interface OverallEmployeeAndApplicantsState {
  [key: string]: CommonEmployeeAndApplicantsDataStringState | 
  KPICOREViewState | 
  KPICORECreateState | 
  KPICOREEditState |
  CORECOMPEViewState | 
  CORECOMPECreateState | 
  CORECOMPEEditState |
  EVALQUESTIONSViewState | 
  EVALQUESTIONSCreateState | 
  EVALQUESTIONSEditState |
  ONBOARDINGSTATUSViewState | 
  ONBOARDINGSTATUSCreateState | 
  ONBOARDINGSTATUSEditState |
  ONBOARDINGREQUIREMENTSViewState | 
  ONBOARDINGREQUIREMENTSCreateState | 
  ONBOARDINGREQUIREMENTSEditState |
  OFFBOARDINGSTATUSViewState | 
  OFFBOARDINGSTATUSCreateState | 
  OFFBOARDINGSTATUSEditState |
  OFFBOARDINGREQUIREMENTSViewState | 
  OFFBOARDINGREQUIREMENTSCreateState | 
  OFFBOARDINGREQUIREMENTSEditState |
  APPLICANTSViewState | 
  APPLICANTSCreateState | 
  APPLICANTSEditState |
  JOBPOSTINGSViewState | 
  JOBPOSTINGSCreateState | 
  JOBPOSTINGSEditState 
  ,
  //KPICORE SECTION
  KPICOREView: KPICOREViewState,
  KPICOREViewSpecific: KPICOREViewState,
  KPICOREViewSpecificEmployee: KPICOREViewState,
  KPICORECreate: KPICORECreateState,
  KPICOREEdit: KPICOREEditState,
  //CORECOMPE SECTION
  CORECOMPEView: CORECOMPEViewState,
  CORECOMPEViewSpecific: CORECOMPEViewState,
  CORECOMPECreate: CORECOMPECreateState,
  CORECOMPEEdit: CORECOMPEEditState,
  //EVALQUESTIONS SECTION
  EVALQUESTIONSView: EVALQUESTIONSViewState,
  EVALQUESTIONSViewSpecific: EVALQUESTIONSViewState,
  EVALQUESTIONSCreate: EVALQUESTIONSCreateState,
  EVALQUESTIONSEdit: EVALQUESTIONSEditState,
  //ONBOARDINGSTATUS SECTION
  ONBOARDINGSTATUSView: ONBOARDINGSTATUSViewState,
  ONBOARDINGSTATUSViewSpecific: ONBOARDINGSTATUSViewState,
  ONBOARDINGSTATUSCreate: ONBOARDINGSTATUSCreateState,
  ONBOARDINGSTATUSEdit: ONBOARDINGSTATUSEditState,
  //ONBOARDINGREQUIREMENTS SECTION
  ONBOARDINGREQUIREMENTSView: ONBOARDINGREQUIREMENTSViewState,
  ONBOARDINGREQUIREMENTSViewSpecific: ONBOARDINGREQUIREMENTSViewState,
  ONBOARDINGREQUIREMENTSCreate: ONBOARDINGREQUIREMENTSCreateState,
  ONBOARDINGREQUIREMENTSEdit: ONBOARDINGREQUIREMENTSEditState,
  //OFFBOARDINGSTATUS SECTION
  OFFBOARDINGSTATUSView: OFFBOARDINGSTATUSViewState,
  OFFBOARDINGSTATUSViewSpecific: OFFBOARDINGSTATUSViewState,
  OFFBOARDINGSTATUSCreate: OFFBOARDINGSTATUSCreateState,
  OFFBOARDINGSTATUSEdit: OFFBOARDINGSTATUSEditState,
  //OFFBOARDINGREQUIREMENTS SECTION
  OFFBOARDINGREQUIREMENTSView: OFFBOARDINGREQUIREMENTSViewState,
  OFFBOARDINGREQUIREMENTSViewSpecific: OFFBOARDINGREQUIREMENTSViewState,
  OFFBOARDINGREQUIREMENTSCreate: OFFBOARDINGREQUIREMENTSCreateState,
  OFFBOARDINGREQUIREMENTSEdit: OFFBOARDINGREQUIREMENTSEditState,
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
}

const initialState: OverallEmployeeAndApplicantsState = {
  //KPICORE SECTION
  KPICOREView: {
    status: '',
    progress: 0,
    data: [],
    error: '',
  },
  KPICOREViewSpecific: {
    status: '',
    progress: 0,
    data: [],
    error: '',
  },
  KPICOREViewSpecificEmployee: {
    status: '',
    progress: 0,
    data: [],
    error: '',
  },
  KPICORECreate: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  KPICOREEdit: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  //CORECOMPE SECTION
  CORECOMPEView: {
    status: '',
    progress: 0,
    data: [],
    error: '',
  },
  CORECOMPEViewSpecific: {
    status: '',
    progress: 0,
    data: [],
    error: '',
  },
  CORECOMPECreate: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  CORECOMPEEdit: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  //EVALQUESTIONS SECTION
  EVALQUESTIONSView: {
    status: '',
    progress: 0,
    data: [],
    error: '',
  },
  EVALQUESTIONSViewSpecific: {
    status: '',
    progress: 0,
    data: [],
    error: '',
  },
  EVALQUESTIONSCreate: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  EVALQUESTIONSEdit: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  //ONBOARDINGSTATUS SECTION
  ONBOARDINGSTATUSView: {
    status: '',
    progress: 0,
    data: [],
    error: '',
  },
  ONBOARDINGSTATUSViewSpecific: {
    status: '',
    progress: 0,
    data: [],
    error: '',
  },
  ONBOARDINGSTATUSCreate: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  ONBOARDINGSTATUSEdit: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  //ONBOARDINGREQUIREMENTS SECTION
  ONBOARDINGREQUIREMENTSView: {
    status: '',
    progress: 0,
    data: [],
    error: '',
  },
  ONBOARDINGREQUIREMENTSViewSpecific: {
    status: '',
    progress: 0,
    data: [],
    error: '',
  },
  ONBOARDINGREQUIREMENTSCreate: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  ONBOARDINGREQUIREMENTSEdit: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  //OFFBOARDINGSTATUS SECTION
  OFFBOARDINGSTATUSView: {
    status: '',
    progress: 0,
    data: [],
    error: '',
  },
  OFFBOARDINGSTATUSViewSpecific: {
    status: '',
    progress: 0,
    data: [],
    error: '',
  },
  OFFBOARDINGSTATUSCreate: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  OFFBOARDINGSTATUSEdit: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  //OFFBOARDINGREQUIREMENTS SECTION
  OFFBOARDINGREQUIREMENTSView: {
    status: '',
    progress: 0,
    data: [],
    error: '',
  },
  OFFBOARDINGREQUIREMENTSViewSpecific: {
    status: '',
    progress: 0,
    data: [],
    error: '',
  },
  OFFBOARDINGREQUIREMENTSCreate: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  OFFBOARDINGREQUIREMENTSEdit: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  //APPLICANTS SECTION
  APPLICANTSView: {
    status: '',
    progress: 0,
    data: [],
    error: '',
  },
  APPLICANTSViewSpecific: {
    status: '',
    progress: 0,
    data: [],
    error: '',
  },
  APPLICANTSCreate: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  APPLICANTSEdit: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  //JOBPOSTINGS SECTION
  JOBPOSTINGSView: {
    status: '',
    progress: 0,
    data: [],
    error: '',
  },
  JOBPOSTINGSViewSpecific: {
    status: '',
    progress: 0,
    data: [],
    error: '',
  },
  JOBPOSTINGSCreate: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  JOBPOSTINGSEdit: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  JOBPOSTINGSDelete: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
};

const setLoadingState = (path: string) => (state: OverallEmployeeAndApplicantsState) => {
  state[path].status = 'loading';
  state[path].data = [];
  state[path].error = null;
  state[path].progress = 0;
};

const setSuccessState = (state: OverallEmployeeAndApplicantsState, payload: EmployeeAndApplicantsPayloads, path: string) => {
  state[path].status = 'succeeded';
  state[path].data = payload;
  state[path].error = null;
};

const setProgressState = (state: OverallEmployeeAndApplicantsState, payload: number, path: string) => {
  state[path].progress = payload;
};

const setFailureState = (state: OverallEmployeeAndApplicantsState, payload: string, path: string) => {
  state[path].status = 'failed';
  state[path].data = [];
  state[path].error = payload;
};


const setRefreshedState = (path: string) => (state: OverallEmployeeAndApplicantsState) => {
  state[path].status = 'refreshed';
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
    },
});


export const employeeAndApplicantsReducer = employeeAndApplicantsSlice.reducer;