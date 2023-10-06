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
_Interface.EVALQUESTIONSCreateInterface
;

interface CommonEmployeeAndApplicantsState {
  status: string | null;
  progress: number;
  error: string | null; 
}

interface CommonEmployeeAndApplicantsDataStringState {
  data: string | null;
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


interface OverallEmployeeAndApplicantsState {
  [key: string]: 
  KPICOREViewState | 
  KPICORECreateState | 
  KPICOREEditState |
  CORECOMPEViewState | 
  CORECOMPECreateState | 
  CORECOMPEEditState |
  EVALQUESTIONSViewState | 
  EVALQUESTIONSCreateState | 
  EVALQUESTIONSEditState 
  ,
  //KPICORE SECTION
  KPICOREView: KPICOREViewState,
  KPICOREViewSpecific: KPICOREViewState,
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
    },
});


export const employeeAndApplicantsReducer = employeeAndApplicantsSlice.reducer;