import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    PHILHEALTHViewAction,
    PHILHEALTHViewActionSuccess,
    PHILHEALTHViewActionProgress,
    PHILHEALTHViewActionFailure,
    PHILHEALTHViewActionFailureCleanup,
    PHILHEALTHViewSpecificAction,
    PHILHEALTHViewSpecificActionSuccess,
    PHILHEALTHViewSpecificActionProgress,
    PHILHEALTHViewSpecificActionFailure,
    PHILHEALTHViewSpecificActionFailureCleanup,
    PHILHEALTHCreateAction,
    PHILHEALTHCreateActionSuccess,
    PHILHEALTHCreateActionProgress,
    PHILHEALTHCreateActionFailure,
    PHILHEALTHCreateActionFailureCleanup,
    PHILHEALTHEditAction,
    PHILHEALTHEditActionSuccess,
    PHILHEALTHEditActionProgress,
    PHILHEALTHEditActionFailure,
    PHILHEALTHEditActionFailureCleanup,
    SSSViewAction,
    SSSViewActionSuccess,
    SSSViewActionProgress,
    SSSViewActionFailure,
    SSSViewActionFailureCleanup,
    SSSViewSpecificAction,
    SSSViewSpecificActionSuccess,
    SSSViewSpecificActionProgress,
    SSSViewSpecificActionFailure,
    SSSViewSpecificActionFailureCleanup,
    SSSCreateAction,
    SSSCreateActionSuccess,
    SSSCreateActionProgress,
    SSSCreateActionFailure,
    SSSCreateActionFailureCleanup,
    SSSEditAction,
    SSSEditActionSuccess,
    SSSEditActionProgress,
    SSSEditActionFailure,
    SSSEditActionFailureCleanup,
    PAGIBIGViewAction,
    PAGIBIGViewActionSuccess,
    PAGIBIGViewActionProgress,
    PAGIBIGViewActionFailure,
    PAGIBIGViewActionFailureCleanup,
    PAGIBIGViewSpecificAction,
    PAGIBIGViewSpecificActionSuccess,
    PAGIBIGViewSpecificActionProgress,
    PAGIBIGViewSpecificActionFailure,
    PAGIBIGViewSpecificActionFailureCleanup,
    PAGIBIGCreateAction,
    PAGIBIGCreateActionSuccess,
    PAGIBIGCreateActionProgress,
    PAGIBIGCreateActionFailure,
    PAGIBIGCreateActionFailureCleanup,
    PAGIBIGEditAction,
    PAGIBIGEditActionSuccess,
    PAGIBIGEditActionProgress,
    PAGIBIGEditActionFailure,
    PAGIBIGEditActionFailureCleanup,
    TAXViewAction,
    TAXViewActionSuccess,
    TAXViewActionProgress,
    TAXViewActionFailure,
    TAXViewActionFailureCleanup,
    TAXViewSpecificAction,
    TAXViewSpecificActionSuccess,
    TAXViewSpecificActionProgress,
    TAXViewSpecificActionFailure,
    TAXViewSpecificActionFailureCleanup,
    TAXCreateAction,
    TAXCreateActionSuccess,
    TAXCreateActionProgress,
    TAXCreateActionFailure,
    TAXCreateActionFailureCleanup,
    TAXEditAction,
    TAXEditActionSuccess,
    TAXEditActionProgress,
    TAXEditActionFailure,
    TAXEditActionFailureCleanup,
    CASHADVANCECreateAction,
    CASHADVANCECreateActionFailure,
    CASHADVANCECreateActionFailureCleanup,
    CASHADVANCECreateActionProgress,
    CASHADVANCECreateActionSuccess,
    CASHADVANCEEditAction,
    CASHADVANCEEditActionFailure,
    CASHADVANCEEditActionFailureCleanup,
    CASHADVANCEEditActionProgress,
    CASHADVANCEEditActionSuccess,
    CASHADVANCEViewAction,
    CASHADVANCEViewActionFailure,
    CASHADVANCEViewActionFailureCleanup,
    CASHADVANCEViewActionProgress,
    CASHADVANCEViewActionSuccess,
    CASHADVANCEViewSpecificAction,
    CASHADVANCEViewSpecificActionFailure,
    CASHADVANCEViewSpecificActionFailureCleanup,
    CASHADVANCEViewSpecificActionProgress,
    CASHADVANCEViewSpecificActionSuccess,
    CASHADVANCEViewSpecificEmployeeAction,
    CASHADVANCEViewSpecificEmployeeActionFailure,
    CASHADVANCEViewSpecificEmployeeActionFailureCleanup,
    CASHADVANCEViewSpecificEmployeeActionProgress,
    CASHADVANCEViewSpecificEmployeeActionSuccess,
    ALLOWANCEENTRYCreateAction,
    ALLOWANCEENTRYCreateActionFailure,
    ALLOWANCEENTRYCreateActionFailureCleanup,
    ALLOWANCEENTRYCreateActionProgress,
    ALLOWANCEENTRYCreateActionSuccess,
    ALLOWANCEENTRYEditAction,
    ALLOWANCEENTRYEditActionFailure,
    ALLOWANCEENTRYEditActionFailureCleanup,
    ALLOWANCEENTRYEditActionProgress,
    ALLOWANCEENTRYEditActionSuccess,
    ALLOWANCEENTRYViewAction,
    ALLOWANCEENTRYViewActionFailure,
    ALLOWANCEENTRYViewActionFailureCleanup,
    ALLOWANCEENTRYViewActionProgress,
    ALLOWANCEENTRYViewActionSuccess,
    ALLOWANCEENTRYViewSpecificAction,
    ALLOWANCEENTRYViewSpecificActionFailure,
    ALLOWANCEENTRYViewSpecificActionFailureCleanup,
    ALLOWANCEENTRYViewSpecificActionProgress,
    ALLOWANCEENTRYViewSpecificActionSuccess,
    ALLOWANCETYPECreateAction,
    ALLOWANCETYPECreateActionFailure,
    ALLOWANCETYPECreateActionFailureCleanup,
    ALLOWANCETYPECreateActionProgress,
    ALLOWANCETYPECreateActionSuccess,
    ALLOWANCETYPEEditAction,
    ALLOWANCETYPEEditActionFailure,
    ALLOWANCETYPEEditActionFailureCleanup,
    ALLOWANCETYPEEditActionProgress,
    ALLOWANCETYPEEditActionSuccess,
    ALLOWANCETYPEViewAction,
    ALLOWANCETYPEViewActionFailure,
    ALLOWANCETYPEViewActionFailureCleanup,
    ALLOWANCETYPEViewActionProgress,
    ALLOWANCETYPEViewActionSuccess,
    ALLOWANCETYPEViewSpecificAction,
    ALLOWANCETYPEViewSpecificActionFailure,
    ALLOWANCETYPEViewSpecificActionFailureCleanup,
    ALLOWANCETYPEViewSpecificActionProgress,
    ALLOWANCETYPEViewSpecificActionSuccess,
  } from '../actions/payroll-variables';
import { 
    TAXCreateInterface,
    TAXEditInterface,
    TAXGenericInterface,
    TAXViewInterface,
    PAGIBIGCreateInterface,
    PAGIBIGEditInterface,
    PAGIBIGGenericInterface,
    PAGIBIGViewInterface,
    PHILHEALTHCreateInterface,
    PHILHEALTHEditInterface,
    PHILHEALTHGenericInterface,
    PHILHEALTHViewInterface,
    SSSCreateInterface,
    SSSEditInterface,
    SSSGenericInterface,
    SSSViewInterface,
    CASHADVANCECreateInterface,
    CASHADVANCEEditInterface,
    CASHADVANCEGenericInterface,
    CASHADVANCEViewInterface,
    ALLOWANCEENTRYCreateInterface,
    ALLOWANCEENTRYEditInterface,
    ALLOWANCEENTRYGenericInterface,
    ALLOWANCEENTRYViewInterface,
    ALLOWANCETYPECreateInterface,
    ALLOWANCETYPEEditInterface,
    ALLOWANCETYPEGenericInterface,
    ALLOWANCETYPEViewInterface,
} from '@/types/types-payroll-variables';

type PayrollVariablesPayloads = 
string |
TAXViewInterface[] | 
TAXViewInterface | 
TAXCreateInterface |
PAGIBIGViewInterface[] | 
PAGIBIGViewInterface | 
PAGIBIGCreateInterface |
SSSViewInterface[] | 
SSSViewInterface | 
SSSCreateInterface |
PHILHEALTHViewInterface[] | 
PHILHEALTHViewInterface | 
PHILHEALTHCreateInterface |
PHILHEALTHEditInterface | 
CASHADVANCEViewInterface[] | 
CASHADVANCEViewInterface | 
CASHADVANCECreateInterface |
ALLOWANCETYPEViewInterface[] | 
ALLOWANCETYPEViewInterface | 
ALLOWANCETYPECreateInterface |
ALLOWANCEENTRYViewInterface[] | 
ALLOWANCEENTRYViewInterface | 
ALLOWANCEENTRYCreateInterface
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
  data: TAXViewInterface[] | [];
}

interface TAXCreateState extends CommonPayrollVariablesState{
  data: TAXCreateInterface | null | {};
}

interface TAXEditState extends CommonPayrollVariablesState {
  data: TAXViewState | null;
}

// PAGIBIG SECTION // PAGIBIG SECTION // PAGIBIG SECTION // PAGIBIG SECTION // PAGIBIG SECTION 
interface PAGIBIGViewState extends CommonPayrollVariablesState{
  data: PAGIBIGViewInterface[] | [];
}

interface PAGIBIGCreateState extends CommonPayrollVariablesState{
  data: PAGIBIGCreateInterface | null | {};
}

interface PAGIBIGEditState extends CommonPayrollVariablesState {
  data: PAGIBIGViewState | null;
}

// SSS SECTION // SSS SECTION // SSS SECTION // SSS SECTION // SSS SECTION 
interface SSSViewState extends CommonPayrollVariablesState{
  data: SSSViewInterface[] | [];
}

interface SSSCreateState extends CommonPayrollVariablesState{
  data: SSSCreateInterface | null | {};
}

interface SSSEditState extends CommonPayrollVariablesState {
  data: SSSViewState | null;
}

// PHILHEALTH SECTION // PHILHEALTH SECTION // PHILHEALTH SECTION // PHILHEALTH SECTION // PHILHEALTH SECTION 
interface PHILHEALTHViewState extends CommonPayrollVariablesState{
  data: PHILHEALTHViewInterface[] | [];
}

interface PHILHEALTHCreateState extends CommonPayrollVariablesState{
  data: PHILHEALTHCreateInterface | null | {};
}

interface PHILHEALTHEditState extends CommonPayrollVariablesState {
  data: PHILHEALTHViewState | null;
}

// CASHADVANCE SECTION // CASHADVANCE SECTION // CASHADVANCE SECTION // CASHADVANCE SECTION // CASHADVANCE SECTION 
interface CASHADVANCEViewState extends CommonPayrollVariablesState{
  data: CASHADVANCEViewInterface[] | [];
}

interface CASHADVANCECreateState extends CommonPayrollVariablesState{
  data: CASHADVANCECreateInterface | null | {};
}

interface CASHADVANCEEditState extends CommonPayrollVariablesState {
  data: CASHADVANCEViewState | null;
}

// ALLOWANCETYPE SECTION // ALLOWANCETYPE SECTION // ALLOWANCETYPE SECTION // ALLOWANCETYPE SECTION // ALLOWANCETYPE SECTION 
interface ALLOWANCETYPEViewState extends CommonPayrollVariablesState{
  data: ALLOWANCETYPEViewInterface[] | [];
}

interface ALLOWANCETYPECreateState extends CommonPayrollVariablesState{
  data: ALLOWANCETYPECreateInterface | null | {};
}

interface ALLOWANCETYPEEditState extends CommonPayrollVariablesState {
  data: ALLOWANCETYPEViewState | null;
}

// ALLOWANCEENTRY SECTION // ALLOWANCEENTRY SECTION // ALLOWANCEENTRY SECTION // ALLOWANCEENTRY SECTION // ALLOWANCEENTRY SECTION 
interface ALLOWANCEENTRYViewState extends CommonPayrollVariablesState{
  data: ALLOWANCEENTRYViewInterface[] | [];
}

interface ALLOWANCEENTRYCreateState extends CommonPayrollVariablesState{
  data: ALLOWANCEENTRYCreateInterface | null | {};
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
  state[path].status = 'loading';
  state[path].data = [];
  state[path].error = null;
  state[path].progress = 0;
};

const setSuccessState = (state: OverallPayrollVariablesState, payload: PayrollVariablesPayloads, path: string) => {
  state[path].status = 'succeeded';
  state[path].data = payload;
  state[path].error = null;
};

const setProgressState = (state: OverallPayrollVariablesState, payload: number, path: string) => {
  state[path].progress = payload;
};

const setFailureState = (state: OverallPayrollVariablesState, payload: string, path: string) => {
  state[path].status = 'failed';
  state[path].data = [];
  state[path].error = payload;
};


const setRefreshedState = (path: string) => (state: OverallPayrollVariablesState) => {
  state[path].status = 'refreshed';
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
      .addCase(TAXViewAction, setLoadingState("TAXView"))
      .addCase(TAXViewActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "TAXView"))
      .addCase(TAXViewActionProgress, (state, action) => setProgressState(state, action.payload, "TAXView"))
      .addCase(TAXViewActionFailure, (state, action) => setFailureState(state, action.payload, "TAXView"))
      .addCase(TAXViewSpecificAction, setLoadingState("TAXViewSpecific"))
      .addCase(TAXViewSpecificActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "TAXViewSpecific"))
      .addCase(TAXViewSpecificActionProgress, (state, action) => setProgressState(state, action.payload, "TAXViewSpecific"))
      .addCase(TAXViewSpecificActionFailure, (state, action) => setFailureState(state, action.payload, "TAXViewSpecific"))
      .addCase(TAXCreateAction, setLoadingState("TAXCreate"))
      .addCase(TAXCreateActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "TAXCreate"))
      .addCase(TAXCreateActionProgress, (state, action) => setProgressState(state, action.payload, "TAXCreate"))
      .addCase(TAXCreateActionFailure, (state, action) => setFailureState(state, action.payload, "TAXCreate"))
      .addCase(TAXCreateActionFailureCleanup, setRefreshedState("TAXCreate"))
      .addCase(TAXEditAction, setLoadingState("TAXEdit"))
      .addCase(TAXEditActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "TAXEdit"))
      .addCase(TAXEditActionProgress, (state, action) => setProgressState(state, action.payload, "TAXEdit"))
      .addCase(TAXEditActionFailure, (state, action) => setFailureState(state, action.payload, "TAXEdit"))
      //PAGIBIG SECTION
      .addCase(PAGIBIGViewAction, setLoadingState("PAGIBIGView"))
      .addCase(PAGIBIGViewActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "PAGIBIGView"))
      .addCase(PAGIBIGViewActionProgress, (state, action) => setProgressState(state, action.payload, "PAGIBIGView"))
      .addCase(PAGIBIGViewActionFailure, (state, action) => setFailureState(state, action.payload, "PAGIBIGView"))
      .addCase(PAGIBIGViewSpecificAction, setLoadingState("PAGIBIGViewSpecific"))
      .addCase(PAGIBIGViewSpecificActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "PAGIBIGViewSpecific"))
      .addCase(PAGIBIGViewSpecificActionProgress, (state, action) => setProgressState(state, action.payload, "PAGIBIGViewSpecific"))
      .addCase(PAGIBIGViewSpecificActionFailure, (state, action) => setFailureState(state, action.payload, "PAGIBIGViewSpecific"))
      .addCase(PAGIBIGCreateAction, setLoadingState("PAGIBIGCreate"))
      .addCase(PAGIBIGCreateActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "PAGIBIGCreate"))
      .addCase(PAGIBIGCreateActionProgress, (state, action) => setProgressState(state, action.payload, "PAGIBIGCreate"))
      .addCase(PAGIBIGCreateActionFailure, (state, action) => setFailureState(state, action.payload, "PAGIBIGCreate"))
      .addCase(PAGIBIGCreateActionFailureCleanup, setRefreshedState("PAGIBIGCreate"))
      .addCase(PAGIBIGEditAction, setLoadingState("PAGIBIGEdit"))
      .addCase(PAGIBIGEditActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "PAGIBIGEdit"))
      .addCase(PAGIBIGEditActionProgress, (state, action) => setProgressState(state, action.payload, "PAGIBIGEdit"))
      .addCase(PAGIBIGEditActionFailure, (state, action) => setFailureState(state, action.payload, "PAGIBIGEdit"))
      //SSS SECTION
      .addCase(SSSViewAction, setLoadingState("SSSView"))
      .addCase(SSSViewActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "SSSView"))
      .addCase(SSSViewActionProgress, (state, action) => setProgressState(state, action.payload, "SSSView"))
      .addCase(SSSViewActionFailure, (state, action) => setFailureState(state, action.payload, "SSSView"))
      .addCase(SSSViewSpecificAction, setLoadingState("SSSViewSpecific"))
      .addCase(SSSViewSpecificActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "SSSViewSpecific"))
      .addCase(SSSViewSpecificActionProgress, (state, action) => setProgressState(state, action.payload, "SSSViewSpecific"))
      .addCase(SSSViewSpecificActionFailure, (state, action) => setFailureState(state, action.payload, "SSSViewSpecific"))
      .addCase(SSSCreateAction, setLoadingState("SSSCreate"))
      .addCase(SSSCreateActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "SSSCreate"))
      .addCase(SSSCreateActionProgress, (state, action) => setProgressState(state, action.payload, "SSSCreate"))
      .addCase(SSSCreateActionFailure, (state, action) => setFailureState(state, action.payload, "SSSCreate"))
      .addCase(SSSCreateActionFailureCleanup, setRefreshedState("SSSCreate"))
      .addCase(SSSEditAction, setLoadingState("SSSEdit"))
      .addCase(SSSEditActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "SSSEdit"))
      .addCase(SSSEditActionProgress, (state, action) => setProgressState(state, action.payload, "SSSEdit"))
      .addCase(SSSEditActionFailure, (state, action) => setFailureState(state, action.payload, "SSSEdit"))
      //PHILHEALTH SECTION
      .addCase(PHILHEALTHViewAction, setLoadingState("PHILHEALTHView"))
      .addCase(PHILHEALTHViewActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "PHILHEALTHView"))
      .addCase(PHILHEALTHViewActionProgress, (state, action) => setProgressState(state, action.payload, "PHILHEALTHView"))
      .addCase(PHILHEALTHViewActionFailure, (state, action) => setFailureState(state, action.payload, "PHILHEALTHView"))
      .addCase(PHILHEALTHViewSpecificAction, setLoadingState("PHILHEALTHViewSpecific"))
      .addCase(PHILHEALTHViewSpecificActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "PHILHEALTHViewSpecific"))
      .addCase(PHILHEALTHViewSpecificActionProgress, (state, action) => setProgressState(state, action.payload, "PHILHEALTHViewSpecific"))
      .addCase(PHILHEALTHViewSpecificActionFailure, (state, action) => setFailureState(state, action.payload, "PHILHEALTHViewSpecific"))
      .addCase(PHILHEALTHCreateAction, setLoadingState("PHILHEALTHCreate"))
      .addCase(PHILHEALTHCreateActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "PHILHEALTHCreate"))
      .addCase(PHILHEALTHCreateActionProgress, (state, action) => setProgressState(state, action.payload, "PHILHEALTHCreate"))
      .addCase(PHILHEALTHCreateActionFailure, (state, action) => setFailureState(state, action.payload, "PHILHEALTHCreate"))
      .addCase(PHILHEALTHCreateActionFailureCleanup, setRefreshedState("PHILHEALTHCreate"))
      .addCase(PHILHEALTHEditAction, setLoadingState("PHILHEALTHEdit"))
      .addCase(PHILHEALTHEditActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "PHILHEALTHEdit"))
      .addCase(PHILHEALTHEditActionProgress, (state, action) => setProgressState(state, action.payload, "PHILHEALTHEdit"))
      .addCase(PHILHEALTHEditActionFailure, (state, action) => setFailureState(state, action.payload, "PHILHEALTHEdit"))
      //CASHADVANCE SECTION
      .addCase(CASHADVANCEViewAction, setLoadingState("CASHADVANCEView"))
      .addCase(CASHADVANCEViewActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "CASHADVANCEView"))
      .addCase(CASHADVANCEViewActionProgress, (state, action) => setProgressState(state, action.payload, "CASHADVANCEView"))
      .addCase(CASHADVANCEViewActionFailure, (state, action) => setFailureState(state, action.payload, "CASHADVANCEView"))
      .addCase(CASHADVANCEViewSpecificEmployeeAction, setLoadingState("CASHADVANCEViewSpecificEmployee"))
      .addCase(CASHADVANCEViewSpecificEmployeeActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "CASHADVANCEViewSpecificEmployee"))
      .addCase(CASHADVANCEViewSpecificEmployeeActionProgress, (state, action) => setProgressState(state, action.payload, "CASHADVANCEViewSpecificEmployee"))
      .addCase(CASHADVANCEViewSpecificEmployeeActionFailure, (state, action) => setFailureState(state, action.payload, "CASHADVANCEViewSpecificEmployee"))
      .addCase(CASHADVANCEViewSpecificAction, setLoadingState("CASHADVANCEViewSpecific"))
      .addCase(CASHADVANCEViewSpecificActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "CASHADVANCEViewSpecific"))
      .addCase(CASHADVANCEViewSpecificActionProgress, (state, action) => setProgressState(state, action.payload, "CASHADVANCEViewSpecific"))
      .addCase(CASHADVANCEViewSpecificActionFailure, (state, action) => setFailureState(state, action.payload, "CASHADVANCEViewSpecific"))
      .addCase(CASHADVANCECreateAction, setLoadingState("CASHADVANCECreate"))
      .addCase(CASHADVANCECreateActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "CASHADVANCECreate"))
      .addCase(CASHADVANCECreateActionProgress, (state, action) => setProgressState(state, action.payload, "CASHADVANCECreate"))
      .addCase(CASHADVANCECreateActionFailure, (state, action) => setFailureState(state, action.payload, "CASHADVANCECreate"))
      .addCase(CASHADVANCECreateActionFailureCleanup, setRefreshedState("CASHADVANCECreate"))
      .addCase(CASHADVANCEEditAction, setLoadingState("CASHADVANCEEdit"))
      .addCase(CASHADVANCEEditActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "CASHADVANCEEdit"))
      .addCase(CASHADVANCEEditActionProgress, (state, action) => setProgressState(state, action.payload, "CASHADVANCEEdit"))
      .addCase(CASHADVANCEEditActionFailure, (state, action) => setFailureState(state, action.payload, "CASHADVANCEEdit"))
      //ALLOWANCETYPE SECTION
      .addCase(ALLOWANCETYPEViewAction, setLoadingState("ALLOWANCETYPEView"))
      .addCase(ALLOWANCETYPEViewActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "ALLOWANCETYPEView"))
      .addCase(ALLOWANCETYPEViewActionProgress, (state, action) => setProgressState(state, action.payload, "ALLOWANCETYPEView"))
      .addCase(ALLOWANCETYPEViewActionFailure, (state, action) => setFailureState(state, action.payload, "ALLOWANCETYPEView"))
      .addCase(ALLOWANCETYPEViewSpecificAction, setLoadingState("ALLOWANCETYPEViewSpecific"))
      .addCase(ALLOWANCETYPEViewSpecificActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "ALLOWANCETYPEViewSpecific"))
      .addCase(ALLOWANCETYPEViewSpecificActionProgress, (state, action) => setProgressState(state, action.payload, "ALLOWANCETYPEViewSpecific"))
      .addCase(ALLOWANCETYPEViewSpecificActionFailure, (state, action) => setFailureState(state, action.payload, "ALLOWANCETYPEViewSpecific"))
      .addCase(ALLOWANCETYPECreateAction, setLoadingState("ALLOWANCETYPECreate"))
      .addCase(ALLOWANCETYPECreateActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "ALLOWANCETYPECreate"))
      .addCase(ALLOWANCETYPECreateActionProgress, (state, action) => setProgressState(state, action.payload, "ALLOWANCETYPECreate"))
      .addCase(ALLOWANCETYPECreateActionFailure, (state, action) => setFailureState(state, action.payload, "ALLOWANCETYPECreate"))
      .addCase(ALLOWANCETYPECreateActionFailureCleanup, setRefreshedState("ALLOWANCETYPECreate"))
      .addCase(ALLOWANCETYPEEditAction, setLoadingState("ALLOWANCETYPEEdit"))
      .addCase(ALLOWANCETYPEEditActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "ALLOWANCETYPEEdit"))
      .addCase(ALLOWANCETYPEEditActionProgress, (state, action) => setProgressState(state, action.payload, "ALLOWANCETYPEEdit"))
      .addCase(ALLOWANCETYPEEditActionFailure, (state, action) => setFailureState(state, action.payload, "ALLOWANCETYPEEdit"))
      //ALLOWANCEENTRY SECTION
      .addCase(ALLOWANCEENTRYViewAction, setLoadingState("ALLOWANCEENTRYView"))
      .addCase(ALLOWANCEENTRYViewActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "ALLOWANCEENTRYView"))
      .addCase(ALLOWANCEENTRYViewActionProgress, (state, action) => setProgressState(state, action.payload, "ALLOWANCEENTRYView"))
      .addCase(ALLOWANCEENTRYViewActionFailure, (state, action) => setFailureState(state, action.payload, "ALLOWANCEENTRYView"))
      .addCase(ALLOWANCEENTRYViewSpecificAction, setLoadingState("ALLOWANCEENTRYViewSpecific"))
      .addCase(ALLOWANCEENTRYViewSpecificActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "ALLOWANCEENTRYViewSpecific"))
      .addCase(ALLOWANCEENTRYViewSpecificActionProgress, (state, action) => setProgressState(state, action.payload, "ALLOWANCEENTRYViewSpecific"))
      .addCase(ALLOWANCEENTRYViewSpecificActionFailure, (state, action) => setFailureState(state, action.payload, "ALLOWANCEENTRYViewSpecific"))
      .addCase(ALLOWANCEENTRYCreateAction, setLoadingState("ALLOWANCEENTRYCreate"))
      .addCase(ALLOWANCEENTRYCreateActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "ALLOWANCEENTRYCreate"))
      .addCase(ALLOWANCEENTRYCreateActionProgress, (state, action) => setProgressState(state, action.payload, "ALLOWANCEENTRYCreate"))
      .addCase(ALLOWANCEENTRYCreateActionFailure, (state, action) => setFailureState(state, action.payload, "ALLOWANCEENTRYCreate"))
      .addCase(ALLOWANCEENTRYCreateActionFailureCleanup, setRefreshedState("ALLOWANCEENTRYCreate"))
      .addCase(ALLOWANCEENTRYEditAction, setLoadingState("ALLOWANCEENTRYEdit"))
      .addCase(ALLOWANCEENTRYEditActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "ALLOWANCEENTRYEdit"))
      .addCase(ALLOWANCEENTRYEditActionProgress, (state, action) => setProgressState(state, action.payload, "ALLOWANCEENTRYEdit"))
      .addCase(ALLOWANCEENTRYEditActionFailure, (state, action) => setFailureState(state, action.payload, "ALLOWANCEENTRYEdit"))
      
  },
});


export const payrollVariablesReducer = payrollVariablesSlice.reducer;