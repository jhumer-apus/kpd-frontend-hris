import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as _Actions from '../actions/payroll-variables';
import * as _Interface from '@/types/types-payroll-variables';
import { globalReducerFailed, globalReducerLoading, globalReducerRefreshed, globalReducerSuccess } from '../configureStore';

type PayrollVariablesPayloads = 
string |
_Interface.TAXViewInterface[] | 
_Interface.TAXViewInterface | 
_Interface.TAXCreateInterface |
_Interface.PAGIBIGViewInterface[] | 
_Interface.PAGIBIGViewInterface | 
_Interface.PAGIBIGCreateInterface |
_Interface.SSSViewInterface[] | 
_Interface.SSSViewInterface | 
_Interface.SSSCreateInterface |
_Interface.PHILHEALTHViewInterface[] | 
_Interface.PHILHEALTHViewInterface | 
_Interface.PHILHEALTHCreateInterface |
_Interface.PHILHEALTHEditInterface | 
_Interface.CASHADVANCEViewInterface[] | 
_Interface.CASHADVANCEViewInterface | 
_Interface.CASHADVANCECreateInterface |
_Interface.ALLOWANCETYPEViewInterface[] | 
_Interface.ALLOWANCETYPEViewInterface | 
_Interface.ALLOWANCETYPECreateInterface |
_Interface.ALLOWANCEENTRYViewInterface[] | 
_Interface.ALLOWANCEENTRYViewInterface | 
_Interface.ALLOWANCEENTRYCreateInterface
;

interface CommonPayrollVariablesState {
  status: string | null;
  progress: number;
  error: string | null; 
}

interface CommonPayrollVariablesDataStringState {
  data: string | null;
}

// TAX SECTION // TAX SECTION // TAX SECTION // TAX SECTION // TAX SECTION 
interface TAXViewState extends CommonPayrollVariablesState{
  data: _Interface.TAXViewInterface[] | [];
}

interface TAXCreateState extends CommonPayrollVariablesState{
  data: _Interface.TAXCreateInterface | null | {};
}

interface TAXEditState extends CommonPayrollVariablesState {
  data: TAXViewState | null;
}

// PAGIBIG SECTION // PAGIBIG SECTION // PAGIBIG SECTION // PAGIBIG SECTION // PAGIBIG SECTION 
interface PAGIBIGViewState extends CommonPayrollVariablesState{
  data: _Interface.PAGIBIGViewInterface[] | [];
}

interface PAGIBIGCreateState extends CommonPayrollVariablesState{
  data: _Interface.PAGIBIGCreateInterface | null | {};
}

interface PAGIBIGEditState extends CommonPayrollVariablesState {
  data: PAGIBIGViewState | null;
}

// SSS SECTION // SSS SECTION // SSS SECTION // SSS SECTION // SSS SECTION 
interface SSSViewState extends CommonPayrollVariablesState{
  data: _Interface.SSSViewInterface[] | [];
}

interface SSSCreateState extends CommonPayrollVariablesState{
  data: _Interface.SSSCreateInterface | null | {};
}

interface SSSEditState extends CommonPayrollVariablesState {
  data: SSSViewState | null;
}

// PHILHEALTH SECTION // PHILHEALTH SECTION // PHILHEALTH SECTION // PHILHEALTH SECTION // PHILHEALTH SECTION 
interface PHILHEALTHViewState extends CommonPayrollVariablesState{
  data: _Interface.PHILHEALTHViewInterface[] | [];
}

interface PHILHEALTHCreateState extends CommonPayrollVariablesState{
  data: _Interface.PHILHEALTHCreateInterface | null | {};
}

interface PHILHEALTHEditState extends CommonPayrollVariablesState {
  data: PHILHEALTHViewState | null;
}

// CASHADVANCE SECTION // CASHADVANCE SECTION // CASHADVANCE SECTION // CASHADVANCE SECTION // CASHADVANCE SECTION 
interface CASHADVANCEViewState extends CommonPayrollVariablesState{
  data: _Interface.CASHADVANCEViewInterface[] | [];
}

interface CASHADVANCECreateState extends CommonPayrollVariablesState{
  data: _Interface.CASHADVANCECreateInterface | null | {};
}

interface CASHADVANCEEditState extends CommonPayrollVariablesState {
  data: CASHADVANCEViewState | null;
}

// ALLOWANCETYPE SECTION // ALLOWANCETYPE SECTION // ALLOWANCETYPE SECTION // ALLOWANCETYPE SECTION // ALLOWANCETYPE SECTION 
interface ALLOWANCETYPEViewState extends CommonPayrollVariablesState{
  data: _Interface.ALLOWANCETYPEViewInterface[] | [];
}

interface ALLOWANCETYPECreateState extends CommonPayrollVariablesState{
  data: _Interface.ALLOWANCETYPECreateInterface | null | {};
}

interface ALLOWANCETYPEEditState extends CommonPayrollVariablesState {
  data: ALLOWANCETYPEViewState | null;
}

// ALLOWANCEENTRY SECTION // ALLOWANCEENTRY SECTION // ALLOWANCEENTRY SECTION // ALLOWANCEENTRY SECTION // ALLOWANCEENTRY SECTION 
interface ALLOWANCEENTRYViewState extends CommonPayrollVariablesState{
  data: _Interface.ALLOWANCEENTRYViewInterface[] | [];
}

interface ALLOWANCEENTRYCreateState extends CommonPayrollVariablesState{
  data: _Interface.ALLOWANCEENTRYCreateInterface | null | {};
}

interface ALLOWANCEENTRYEditState extends CommonPayrollVariablesState {
  data: ALLOWANCEENTRYViewState | null;
}


interface OverallPayrollVariablesState {
  [key: string]: 
  TAXViewState | 
  TAXCreateState | 
  TAXEditState |
  PAGIBIGViewState | 
  PAGIBIGCreateState | 
  PAGIBIGEditState |
  SSSViewState | 
  SSSCreateState | 
  SSSEditState |
  PHILHEALTHViewState | 
  PHILHEALTHCreateState | 
  PHILHEALTHEditState |
  CASHADVANCEViewState | 
  CASHADVANCECreateState | 
  CASHADVANCEEditState |
  ALLOWANCETYPEViewState | 
  ALLOWANCETYPECreateState | 
  ALLOWANCETYPEEditState |
  ALLOWANCEENTRYViewState | 
  ALLOWANCEENTRYCreateState | 
  ALLOWANCEENTRYEditState 
  ,
  //TAX SECTION
  TAXView: TAXViewState,
  TAXViewSpecific: TAXViewState,
  TAXCreate: TAXCreateState,
  TAXEdit: TAXEditState,
  //PAGIBIG SECTION
  PAGIBIGView: PAGIBIGViewState,
  PAGIBIGViewSpecific: PAGIBIGViewState,
  PAGIBIGCreate: PAGIBIGCreateState,
  PAGIBIGEdit: PAGIBIGEditState,
  //SSS SECTION
  SSSView: SSSViewState,
  SSSViewSpecific: SSSViewState,
  SSSCreate: SSSCreateState,
  SSSEdit: SSSEditState,
  //PHILHEALTH SECTION
  PHILHEALTHView: PHILHEALTHViewState,
  PHILHEALTHViewSpecific: PHILHEALTHViewState,
  PHILHEALTHCreate: PHILHEALTHCreateState,
  PHILHEALTHEdit: PHILHEALTHEditState,
  //CASHADVANCE SECTION
  CASHADVANCEView: CASHADVANCEViewState,
  CASHADVANCEViewSpecificEmployee: CASHADVANCEViewState,
  CASHADVANCEViewSpecific: CASHADVANCEViewState,
  CASHADVANCECreate: CASHADVANCECreateState,
  CASHADVANCEEdit: CASHADVANCEEditState,
  //ALLOWANCETYPE SECTION
  ALLOWANCETYPEView: ALLOWANCETYPEViewState,
  ALLOWANCETYPEViewSpecific: ALLOWANCETYPEViewState,
  ALLOWANCETYPECreate: ALLOWANCETYPECreateState,
  ALLOWANCETYPEEdit: ALLOWANCETYPEEditState,
  //ALLOWANCEENTRY SECTION
  ALLOWANCEENTRYView: ALLOWANCEENTRYViewState,
  ALLOWANCEENTRYViewSpecific: ALLOWANCEENTRYViewState,
  ALLOWANCEENTRYCreate: ALLOWANCEENTRYCreateState,
  ALLOWANCEENTRYEdit: ALLOWANCEENTRYEditState,
}

const initialState: OverallPayrollVariablesState = {
  //TAX SECTION
  TAXView: {
    status: '',
    progress: 0,
    data: [],
    error: '',
  },
  TAXViewSpecific: {
    status: '',
    progress: 0,
    data: [],
    error: '',
  },
  TAXCreate: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  TAXEdit: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  //PAGIBIG SECTION
  PAGIBIGView: {
    status: '',
    progress: 0,
    data: [],
    error: '',
  },
  PAGIBIGViewSpecific: {
    status: '',
    progress: 0,
    data: [],
    error: '',
  },
  PAGIBIGCreate: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  PAGIBIGEdit: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  //SSS SECTION
  SSSView: {
    status: '',
    progress: 0,
    data: [],
    error: '',
  },
  SSSViewSpecific: {
    status: '',
    progress: 0,
    data: [],
    error: '',
  },
  SSSCreate: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  SSSEdit: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  //PHILHEALTH SECTION
  PHILHEALTHView: {
    status: '',
    progress: 0,
    data: [],
    error: '',
  },
  PHILHEALTHViewSpecific: {
    status: '',
    progress: 0,
    data: [],
    error: '',
  },
  PHILHEALTHCreate: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  PHILHEALTHEdit: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  //CASHADVANCE SECTION
  CASHADVANCEView: {
    status: '',
    progress: 0,
    data: [],
    error: '',
  },
  CASHADVANCEViewSpecificEmployee: {
    status: '',
    progress: 0,
    data: [],
    error: '',
  },
  CASHADVANCEViewSpecific: {
    status: '',
    progress: 0,
    data: [],
    error: '',
  },
  CASHADVANCECreate: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  CASHADVANCEEdit: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  //ALLOWANCETYPE SECTION
  ALLOWANCETYPEView: {
    status: '',
    progress: 0,
    data: [],
    error: '',
  },
  ALLOWANCETYPEViewSpecific: {
    status: '',
    progress: 0,
    data: [],
    error: '',
  },
  ALLOWANCETYPECreate: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  ALLOWANCETYPEEdit: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  //ALLOWANCEENTRY SECTION
  ALLOWANCEENTRYView: {
    status: '',
    progress: 0,
    data: [],
    error: '',
  },
  ALLOWANCEENTRYViewSpecific: {
    status: '',
    progress: 0,
    data: [],
    error: '',
  },
  ALLOWANCEENTRYCreate: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  ALLOWANCEENTRYEdit: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  
};

const setLoadingState = (path: string) => (state: OverallPayrollVariablesState) => {
  state[path].status = `${globalReducerLoading}`;
  state[path].data = [];
  state[path].error = null;
  state[path].progress = 0;
};

const setSuccessState = (state: OverallPayrollVariablesState, payload: PayrollVariablesPayloads, path: string) => {
  state[path].status = `${globalReducerSuccess}`;
  state[path].data = payload;
  state[path].error = null;
};

const setProgressState = (state: OverallPayrollVariablesState, payload: number, path: string) => {
  state[path].progress = payload;
};

const setFailureState = (state: OverallPayrollVariablesState, payload: string, path: string) => {
  state[path].status = `${globalReducerFailed}`;
  state[path].data = [];
  state[path].error = payload;
};


const setRefreshedState = (path: string) => (state: OverallPayrollVariablesState) => {
  state[path].status = `${globalReducerRefreshed}`;
  state[path].data = [];
  state[path].error = null;
};


const payrollVariablesSlice = createSlice({
  name: 'payrollVariables',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //TAX SECTION
      .addCase(_Actions.TAXViewAction, setLoadingState("TAXView"))
      .addCase(_Actions.TAXViewActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "TAXView"))
      .addCase(_Actions.TAXViewActionProgress, (state, action) => setProgressState(state, action.payload, "TAXView"))
      .addCase(_Actions.TAXViewActionFailure, (state, action) => setFailureState(state, action.payload, "TAXView"))
      .addCase(_Actions.TAXViewSpecificAction, setLoadingState("TAXViewSpecific"))
      .addCase(_Actions.TAXViewSpecificActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "TAXViewSpecific"))
      .addCase(_Actions.TAXViewSpecificActionProgress, (state, action) => setProgressState(state, action.payload, "TAXViewSpecific"))
      .addCase(_Actions.TAXViewSpecificActionFailure, (state, action) => setFailureState(state, action.payload, "TAXViewSpecific"))
      .addCase(_Actions.TAXCreateAction, setLoadingState("TAXCreate"))
      .addCase(_Actions.TAXCreateActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "TAXCreate"))
      .addCase(_Actions.TAXCreateActionProgress, (state, action) => setProgressState(state, action.payload, "TAXCreate"))
      .addCase(_Actions.TAXCreateActionFailure, (state, action) => setFailureState(state, action.payload, "TAXCreate"))
      .addCase(_Actions.TAXCreateActionFailureCleanup, setRefreshedState("TAXCreate"))
      .addCase(_Actions.TAXEditAction, setLoadingState("TAXEdit"))
      .addCase(_Actions.TAXEditActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "TAXEdit"))
      .addCase(_Actions.TAXEditActionProgress, (state, action) => setProgressState(state, action.payload, "TAXEdit"))
      .addCase(_Actions.TAXEditActionFailure, (state, action) => setFailureState(state, action.payload, "TAXEdit"))
      //PAGIBIG SECTION
      .addCase(_Actions.PAGIBIGViewAction, setLoadingState("PAGIBIGView"))
      .addCase(_Actions.PAGIBIGViewActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "PAGIBIGView"))
      .addCase(_Actions.PAGIBIGViewActionProgress, (state, action) => setProgressState(state, action.payload, "PAGIBIGView"))
      .addCase(_Actions.PAGIBIGViewActionFailure, (state, action) => setFailureState(state, action.payload, "PAGIBIGView"))
      .addCase(_Actions.PAGIBIGViewSpecificAction, setLoadingState("PAGIBIGViewSpecific"))
      .addCase(_Actions.PAGIBIGViewSpecificActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "PAGIBIGViewSpecific"))
      .addCase(_Actions.PAGIBIGViewSpecificActionProgress, (state, action) => setProgressState(state, action.payload, "PAGIBIGViewSpecific"))
      .addCase(_Actions.PAGIBIGViewSpecificActionFailure, (state, action) => setFailureState(state, action.payload, "PAGIBIGViewSpecific"))
      .addCase(_Actions.PAGIBIGCreateAction, setLoadingState("PAGIBIGCreate"))
      .addCase(_Actions.PAGIBIGCreateActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "PAGIBIGCreate"))
      .addCase(_Actions.PAGIBIGCreateActionProgress, (state, action) => setProgressState(state, action.payload, "PAGIBIGCreate"))
      .addCase(_Actions.PAGIBIGCreateActionFailure, (state, action) => setFailureState(state, action.payload, "PAGIBIGCreate"))
      .addCase(_Actions.PAGIBIGCreateActionFailureCleanup, setRefreshedState("PAGIBIGCreate"))
      .addCase(_Actions.PAGIBIGEditAction, setLoadingState("PAGIBIGEdit"))
      .addCase(_Actions.PAGIBIGEditActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "PAGIBIGEdit"))
      .addCase(_Actions.PAGIBIGEditActionProgress, (state, action) => setProgressState(state, action.payload, "PAGIBIGEdit"))
      .addCase(_Actions.PAGIBIGEditActionFailure, (state, action) => setFailureState(state, action.payload, "PAGIBIGEdit"))
      //SSS SECTION
      .addCase(_Actions.SSSViewAction, setLoadingState("SSSView"))
      .addCase(_Actions.SSSViewActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "SSSView"))
      .addCase(_Actions.SSSViewActionProgress, (state, action) => setProgressState(state, action.payload, "SSSView"))
      .addCase(_Actions.SSSViewActionFailure, (state, action) => setFailureState(state, action.payload, "SSSView"))
      .addCase(_Actions.SSSViewSpecificAction, setLoadingState("SSSViewSpecific"))
      .addCase(_Actions.SSSViewSpecificActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "SSSViewSpecific"))
      .addCase(_Actions.SSSViewSpecificActionProgress, (state, action) => setProgressState(state, action.payload, "SSSViewSpecific"))
      .addCase(_Actions.SSSViewSpecificActionFailure, (state, action) => setFailureState(state, action.payload, "SSSViewSpecific"))
      .addCase(_Actions.SSSCreateAction, setLoadingState("SSSCreate"))
      .addCase(_Actions.SSSCreateActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "SSSCreate"))
      .addCase(_Actions.SSSCreateActionProgress, (state, action) => setProgressState(state, action.payload, "SSSCreate"))
      .addCase(_Actions.SSSCreateActionFailure, (state, action) => setFailureState(state, action.payload, "SSSCreate"))
      .addCase(_Actions.SSSCreateActionFailureCleanup, setRefreshedState("SSSCreate"))
      .addCase(_Actions.SSSEditAction, setLoadingState("SSSEdit"))
      .addCase(_Actions.SSSEditActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "SSSEdit"))
      .addCase(_Actions.SSSEditActionProgress, (state, action) => setProgressState(state, action.payload, "SSSEdit"))
      .addCase(_Actions.SSSEditActionFailure, (state, action) => setFailureState(state, action.payload, "SSSEdit"))
      //PHILHEALTH SECTION
      .addCase(_Actions.PHILHEALTHViewAction, setLoadingState("PHILHEALTHView"))
      .addCase(_Actions.PHILHEALTHViewActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "PHILHEALTHView"))
      .addCase(_Actions.PHILHEALTHViewActionProgress, (state, action) => setProgressState(state, action.payload, "PHILHEALTHView"))
      .addCase(_Actions.PHILHEALTHViewActionFailure, (state, action) => setFailureState(state, action.payload, "PHILHEALTHView"))
      .addCase(_Actions.PHILHEALTHViewSpecificAction, setLoadingState("PHILHEALTHViewSpecific"))
      .addCase(_Actions.PHILHEALTHViewSpecificActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "PHILHEALTHViewSpecific"))
      .addCase(_Actions.PHILHEALTHViewSpecificActionProgress, (state, action) => setProgressState(state, action.payload, "PHILHEALTHViewSpecific"))
      .addCase(_Actions.PHILHEALTHViewSpecificActionFailure, (state, action) => setFailureState(state, action.payload, "PHILHEALTHViewSpecific"))
      .addCase(_Actions.PHILHEALTHCreateAction, setLoadingState("PHILHEALTHCreate"))
      .addCase(_Actions.PHILHEALTHCreateActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "PHILHEALTHCreate"))
      .addCase(_Actions.PHILHEALTHCreateActionProgress, (state, action) => setProgressState(state, action.payload, "PHILHEALTHCreate"))
      .addCase(_Actions.PHILHEALTHCreateActionFailure, (state, action) => setFailureState(state, action.payload, "PHILHEALTHCreate"))
      .addCase(_Actions.PHILHEALTHCreateActionFailureCleanup, setRefreshedState("PHILHEALTHCreate"))
      .addCase(_Actions.PHILHEALTHEditAction, setLoadingState("PHILHEALTHEdit"))
      .addCase(_Actions.PHILHEALTHEditActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "PHILHEALTHEdit"))
      .addCase(_Actions.PHILHEALTHEditActionProgress, (state, action) => setProgressState(state, action.payload, "PHILHEALTHEdit"))
      .addCase(_Actions.PHILHEALTHEditActionFailure, (state, action) => setFailureState(state, action.payload, "PHILHEALTHEdit"))
      //CASHADVANCE SECTION
      .addCase(_Actions.CASHADVANCEViewAction, setLoadingState("CASHADVANCEView"))
      .addCase(_Actions.CASHADVANCEViewActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "CASHADVANCEView"))
      .addCase(_Actions.CASHADVANCEViewActionProgress, (state, action) => setProgressState(state, action.payload, "CASHADVANCEView"))
      .addCase(_Actions.CASHADVANCEViewActionFailure, (state, action) => setFailureState(state, action.payload, "CASHADVANCEView"))
      .addCase(_Actions.CASHADVANCEViewSpecificEmployeeAction, setLoadingState("CASHADVANCEViewSpecificEmployee"))
      .addCase(_Actions.CASHADVANCEViewSpecificEmployeeActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "CASHADVANCEViewSpecificEmployee"))
      .addCase(_Actions.CASHADVANCEViewSpecificEmployeeActionProgress, (state, action) => setProgressState(state, action.payload, "CASHADVANCEViewSpecificEmployee"))
      .addCase(_Actions.CASHADVANCEViewSpecificEmployeeActionFailure, (state, action) => setFailureState(state, action.payload, "CASHADVANCEViewSpecificEmployee"))
      .addCase(_Actions.CASHADVANCEViewSpecificAction, setLoadingState("CASHADVANCEViewSpecific"))
      .addCase(_Actions.CASHADVANCEViewSpecificActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "CASHADVANCEViewSpecific"))
      .addCase(_Actions.CASHADVANCEViewSpecificActionProgress, (state, action) => setProgressState(state, action.payload, "CASHADVANCEViewSpecific"))
      .addCase(_Actions.CASHADVANCEViewSpecificActionFailure, (state, action) => setFailureState(state, action.payload, "CASHADVANCEViewSpecific"))
      .addCase(_Actions.CASHADVANCECreateAction, setLoadingState("CASHADVANCECreate"))
      .addCase(_Actions.CASHADVANCECreateActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "CASHADVANCECreate"))
      .addCase(_Actions.CASHADVANCECreateActionProgress, (state, action) => setProgressState(state, action.payload, "CASHADVANCECreate"))
      .addCase(_Actions.CASHADVANCECreateActionFailure, (state, action) => setFailureState(state, action.payload, "CASHADVANCECreate"))
      .addCase(_Actions.CASHADVANCECreateActionFailureCleanup, setRefreshedState("CASHADVANCECreate"))
      .addCase(_Actions.CASHADVANCEEditAction, setLoadingState("CASHADVANCEEdit"))
      .addCase(_Actions.CASHADVANCEEditActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "CASHADVANCEEdit"))
      .addCase(_Actions.CASHADVANCEEditActionProgress, (state, action) => setProgressState(state, action.payload, "CASHADVANCEEdit"))
      .addCase(_Actions.CASHADVANCEEditActionFailure, (state, action) => setFailureState(state, action.payload, "CASHADVANCEEdit"))
      //ALLOWANCETYPE SECTION
      .addCase(_Actions.ALLOWANCETYPEViewAction, setLoadingState("ALLOWANCETYPEView"))
      .addCase(_Actions.ALLOWANCETYPEViewActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "ALLOWANCETYPEView"))
      .addCase(_Actions.ALLOWANCETYPEViewActionProgress, (state, action) => setProgressState(state, action.payload, "ALLOWANCETYPEView"))
      .addCase(_Actions.ALLOWANCETYPEViewActionFailure, (state, action) => setFailureState(state, action.payload, "ALLOWANCETYPEView"))
      .addCase(_Actions.ALLOWANCETYPEViewSpecificAction, setLoadingState("ALLOWANCETYPEViewSpecific"))
      .addCase(_Actions.ALLOWANCETYPEViewSpecificActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "ALLOWANCETYPEViewSpecific"))
      .addCase(_Actions.ALLOWANCETYPEViewSpecificActionProgress, (state, action) => setProgressState(state, action.payload, "ALLOWANCETYPEViewSpecific"))
      .addCase(_Actions.ALLOWANCETYPEViewSpecificActionFailure, (state, action) => setFailureState(state, action.payload, "ALLOWANCETYPEViewSpecific"))
      .addCase(_Actions.ALLOWANCETYPECreateAction, setLoadingState("ALLOWANCETYPECreate"))
      .addCase(_Actions.ALLOWANCETYPECreateActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "ALLOWANCETYPECreate"))
      .addCase(_Actions.ALLOWANCETYPECreateActionProgress, (state, action) => setProgressState(state, action.payload, "ALLOWANCETYPECreate"))
      .addCase(_Actions.ALLOWANCETYPECreateActionFailure, (state, action) => setFailureState(state, action.payload, "ALLOWANCETYPECreate"))
      .addCase(_Actions.ALLOWANCETYPECreateActionFailureCleanup, setRefreshedState("ALLOWANCETYPECreate"))
      .addCase(_Actions.ALLOWANCETYPEEditAction, setLoadingState("ALLOWANCETYPEEdit"))
      .addCase(_Actions.ALLOWANCETYPEEditActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "ALLOWANCETYPEEdit"))
      .addCase(_Actions.ALLOWANCETYPEEditActionProgress, (state, action) => setProgressState(state, action.payload, "ALLOWANCETYPEEdit"))
      .addCase(_Actions.ALLOWANCETYPEEditActionFailure, (state, action) => setFailureState(state, action.payload, "ALLOWANCETYPEEdit"))
      //ALLOWANCEENTRY SECTION
      .addCase(_Actions.ALLOWANCEENTRYViewAction, setLoadingState("ALLOWANCEENTRYView"))
      .addCase(_Actions.ALLOWANCEENTRYViewActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "ALLOWANCEENTRYView"))
      .addCase(_Actions.ALLOWANCEENTRYViewActionProgress, (state, action) => setProgressState(state, action.payload, "ALLOWANCEENTRYView"))
      .addCase(_Actions.ALLOWANCEENTRYViewActionFailure, (state, action) => setFailureState(state, action.payload, "ALLOWANCEENTRYView"))
      .addCase(_Actions.ALLOWANCEENTRYViewSpecificAction, setLoadingState("ALLOWANCEENTRYViewSpecific"))
      .addCase(_Actions.ALLOWANCEENTRYViewSpecificActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "ALLOWANCEENTRYViewSpecific"))
      .addCase(_Actions.ALLOWANCEENTRYViewSpecificActionProgress, (state, action) => setProgressState(state, action.payload, "ALLOWANCEENTRYViewSpecific"))
      .addCase(_Actions.ALLOWANCEENTRYViewSpecificActionFailure, (state, action) => setFailureState(state, action.payload, "ALLOWANCEENTRYViewSpecific"))
      .addCase(_Actions.ALLOWANCEENTRYCreateAction, setLoadingState("ALLOWANCEENTRYCreate"))
      .addCase(_Actions.ALLOWANCEENTRYCreateActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "ALLOWANCEENTRYCreate"))
      .addCase(_Actions.ALLOWANCEENTRYCreateActionProgress, (state, action) => setProgressState(state, action.payload, "ALLOWANCEENTRYCreate"))
      .addCase(_Actions.ALLOWANCEENTRYCreateActionFailure, (state, action) => setFailureState(state, action.payload, "ALLOWANCEENTRYCreate"))
      .addCase(_Actions.ALLOWANCEENTRYCreateActionFailureCleanup, setRefreshedState("ALLOWANCEENTRYCreate"))
      .addCase(_Actions.ALLOWANCEENTRYEditAction, setLoadingState("ALLOWANCEENTRYEdit"))
      .addCase(_Actions.ALLOWANCEENTRYEditActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "ALLOWANCEENTRYEdit"))
      .addCase(_Actions.ALLOWANCEENTRYEditActionProgress, (state, action) => setProgressState(state, action.payload, "ALLOWANCEENTRYEdit"))
      .addCase(_Actions.ALLOWANCEENTRYEditActionFailure, (state, action) => setFailureState(state, action.payload, "ALLOWANCEENTRYEdit"))
      
  },
});


export const payrollVariablesReducer = payrollVariablesSlice.reducer;