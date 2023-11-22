import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as _Actions from '../actions/payroll-eoy';
import * as _Interface from '@/types/types-payroll-eoy';
import { DEPARTMENTViewInterface, RANKViewInterface } from '@/types/types-pages';
import { globalReducerFailed, globalReducerLoading, globalReducerRefreshed, globalReducerSuccess } from '../configureStore';

type PayrollEOYPayloads = 
string |
_Interface.TAXCOLLECTEDViewInterface[] | 
_Interface.TAXCOLLECTEDViewInterface | 
_Interface.PAY13THViewInterface[] | 
_Interface.PAY13THViewInterface | 
_Interface.PAY13THCreateInterface |
_Interface.BONUSLISTViewInterface[] | 
_Interface.BONUSLISTViewInterface | 
_Interface.BONUSLISTCreateInterface |
_Interface.BONUSENTRYViewInterface[] | 
_Interface.BONUSENTRYViewInterface | 
_Interface.BONUSENTRYCreateInterface |
_Interface.BONUSENTRYEditInterface | 
_Interface.ANNOUNCEMENTViewInterface[] | 
_Interface.ANNOUNCEMENTViewInterface | 
_Interface.ANNOUNCEMENTCreateInterface |
_Interface.ASSETLISTViewInterface[] | 
_Interface.ASSETLISTViewInterface | 
_Interface.ASSETLISTCreateInterface |
_Interface.ASSETACCOUNTViewInterface[] | 
_Interface.ASSETACCOUNTViewInterface | 
_Interface.ASSETACCOUNTCreateInterface
;

interface CommonPayrollEOYState {
  status: string | null;
  progress: number;
  error: string | null; 
}

interface CommonPayrollEOYDataStringState {
  data: string | null;
}

// TAXCOLLECTED SECTION // TAXCOLLECTED SECTION // TAXCOLLECTED SECTION // TAXCOLLECTED SECTION // TAXCOLLECTED SECTION 
interface TAXCOLLECTEDViewState extends CommonPayrollEOYState{
  data: _Interface.TAXCOLLECTEDViewInterface[] | [];
}

// PAY13TH SECTION // PAY13TH SECTION // PAY13TH SECTION // PAY13TH SECTION // PAY13TH SECTION 
interface PAY13THViewState extends CommonPayrollEOYState{
  data: _Interface.PAY13THViewInterface[] | [];
}

interface PAY13THCreateState extends CommonPayrollEOYState{
  data: _Interface.PAY13THCreateInterface | null | {};
}

interface PAY13THEditState extends CommonPayrollEOYState {
  data: PAY13THViewState | null;
}

// BONUSLIST SECTION // BONUSLIST SECTION // BONUSLIST SECTION // BONUSLIST SECTION // BONUSLIST SECTION 
interface BONUSLISTViewState extends CommonPayrollEOYState{
  data: _Interface.BONUSLISTViewInterface[] | [];
}

interface BONUSLISTCreateState extends CommonPayrollEOYState{
  data: _Interface.BONUSLISTCreateInterface | null | {};
}

interface BONUSLISTEditState extends CommonPayrollEOYState {
  data: BONUSLISTViewState | null;
}

// BONUSENTRY SECTION // BONUSENTRY SECTION // BONUSENTRY SECTION // BONUSENTRY SECTION // BONUSENTRY SECTION 
interface BONUSENTRYViewState extends CommonPayrollEOYState{
  data: _Interface.BONUSENTRYViewInterface[] | [];
}

interface BONUSENTRYCreateState extends CommonPayrollEOYState{
  data: _Interface.BONUSENTRYCreateInterface | null | {};
}

interface BONUSENTRYEditState extends CommonPayrollEOYState {
  data: BONUSENTRYViewState | null;
}

// ANNOUNCEMENT SECTION // ANNOUNCEMENT SECTION // ANNOUNCEMENT SECTION // ANNOUNCEMENT SECTION // ANNOUNCEMENT SECTION 
interface ANNOUNCEMENTViewState extends CommonPayrollEOYState{
  data: _Interface.ANNOUNCEMENTViewInterface[] | [];
}

interface ANNOUNCEMENTCreateState extends CommonPayrollEOYState{
  data: _Interface.ANNOUNCEMENTCreateInterface | null | {};
}

interface ANNOUNCEMENTEditState extends CommonPayrollEOYState {
  data: ANNOUNCEMENTViewState | null;
}

// ACTIVEANNOUNCEMENT SECTION
interface ACTIVEANNOUNCEMENTViewState extends CommonPayrollEOYState{
  data: _Interface.ACTIVEANNOUNCEMENTViewInterface[] | [];
}

interface ANNRANKViewState extends CommonPayrollEOYState{
  data: RANKViewInterface[] | null;
}

interface ANNDEPARTMENTViewState extends CommonPayrollEOYState{
  data: DEPARTMENTViewInterface[] | null;
}

// ASSETLIST SECTION // ASSETLIST SECTION // ASSETLIST SECTION // ASSETLIST SECTION // ASSETLIST SECTION 
interface ASSETLISTViewState extends CommonPayrollEOYState{
  data: _Interface.ASSETLISTViewInterface[] | [];
}

interface ASSETLISTCreateState extends CommonPayrollEOYState{
  data: _Interface.ASSETLISTCreateInterface | null | {};
}

interface ASSETLISTEditState extends CommonPayrollEOYState {
  data: ASSETLISTViewState | null;
}

// ASSETACCOUNT SECTION // ASSETACCOUNT SECTION // ASSETACCOUNT SECTION // ASSETACCOUNT SECTION // ASSETACCOUNT SECTION 
interface ASSETACCOUNTViewState extends CommonPayrollEOYState{
  data: _Interface.ASSETACCOUNTViewInterface[] | [];
}

interface ASSETACCOUNTCreateState extends CommonPayrollEOYState{
  data: _Interface.ASSETACCOUNTCreateInterface | null | {};
}

interface ASSETACCOUNTEditState extends CommonPayrollEOYState {
  data: ASSETACCOUNTViewState | null;
}


interface OverallPayrollEOYState {
  [key: string]: 
  TAXCOLLECTEDViewState | 
  PAY13THViewState | 
  PAY13THCreateState | 
  BONUSLISTViewState | 
  BONUSLISTCreateState | 
  BONUSLISTEditState |
  BONUSENTRYViewState | 
  BONUSENTRYCreateState | 
  BONUSENTRYEditState |
  ANNOUNCEMENTViewState | 
  ANNOUNCEMENTCreateState | 
  ANNOUNCEMENTEditState |
  ACTIVEANNOUNCEMENTViewState |
  ANNRANKViewState | 
  ANNDEPARTMENTViewState | 
  ASSETLISTViewState | 
  ASSETLISTCreateState | 
  ASSETLISTEditState |
  ASSETACCOUNTViewState | 
  ASSETACCOUNTCreateState | 
  ASSETACCOUNTEditState 
  ,
  //TAXCOLLECTED SECTION
  TAXCOLLECTEDView: TAXCOLLECTEDViewState,
  TAXCOLLECTEDViewSpecific: TAXCOLLECTEDViewState,
  //PAY13TH SECTION
  PAY13THView: PAY13THViewState,
  PAY13THViewSpecific: PAY13THViewState,
  PAY13THCreate: PAY13THCreateState,
  //BONUSLIST SECTION
  BONUSLISTView: BONUSLISTViewState,
  BONUSLISTViewSpecific: BONUSLISTViewState,
  BONUSLISTCreate: BONUSLISTCreateState,
  BONUSLISTEdit: BONUSLISTEditState,
  //BONUSENTRY SECTION
  BONUSENTRYView: BONUSENTRYViewState,
  BONUSENTRYViewSpecificEmployee: BONUSENTRYViewState,
  BONUSENTRYViewSpecific: BONUSENTRYViewState,
  BONUSENTRYCreate: BONUSENTRYCreateState,
  BONUSENTRYEdit: BONUSENTRYEditState,
  //ANNOUNCEMENT SECTION
  ANNOUNCEMENTView: ANNOUNCEMENTViewState,
  ANNOUNCEMENTViewSpecificEmployee: ANNOUNCEMENTViewState,
  ANNOUNCEMENTViewSpecific: ANNOUNCEMENTViewState,
  ANNOUNCEMENTCreate: ANNOUNCEMENTCreateState,
  ANNOUNCEMENTEdit: ANNOUNCEMENTEditState,
  //ACTIVEANNOUNCEMENT SECTION
  ACTIVEANNOUNCEMENTView: ACTIVEANNOUNCEMENTViewState,
  //ANNOUNCEMENTRANK SECTION
  ANNRANKView: ANNRANKViewState,
  //ANNOUNCEMENTDEPARTMENT SECTION
  ANNDEPARTMENTView: ANNDEPARTMENTViewState,
  //ASSETLIST SECTION
  ASSETLISTView: ASSETLISTViewState,
  ASSETLISTViewSpecific: ASSETLISTViewState,
  ASSETLISTCreate: ASSETLISTCreateState,
  ASSETLISTEdit: ASSETLISTEditState,
  //ASSETACCOUNT SECTION
  ASSETACCOUNTView: ASSETACCOUNTViewState,
  ASSETACCOUNTViewSpecific: ASSETACCOUNTViewState,
  ASSETACCOUNTCreate: ASSETACCOUNTCreateState,
  ASSETACCOUNTEdit: ASSETACCOUNTEditState,
}

const initialState: OverallPayrollEOYState = {
  //TAXCOLLECTED SECTION
  TAXCOLLECTEDView: {
    status: '',
    progress: 0,
    data: [],
    error: '',
  },
  TAXCOLLECTEDViewSpecific: {
    status: '',
    progress: 0,
    data: [],
    error: '',
  },
  TAXCOLLECTEDCreate: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  TAXCOLLECTEDEdit: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  //PAY13TH SECTION
  PAY13THView: {
    status: '',
    progress: 0,
    data: [],
    error: '',
  },
  PAY13THViewSpecific: {
    status: '',
    progress: 0,
    data: [],
    error: '',
  },
  PAY13THCreate: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  //BONUSLIST SECTION
  BONUSLISTView: {
    status: '',
    progress: 0,
    data: [],
    error: '',
  },
  BONUSLISTViewSpecific: {
    status: '',
    progress: 0,
    data: [],
    error: '',
  },
  BONUSLISTCreate: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  BONUSLISTEdit: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  //BONUSENTRY SECTION
  BONUSENTRYView: {
    status: '',
    progress: 0,
    data: [],
    error: '',
  },
  BONUSENTRYViewSpecificEmployee: {
    status: '',
    progress: 0,
    data: [],
    error: '',
  },
  BONUSENTRYViewSpecific: {
    status: '',
    progress: 0,
    data: [],
    error: '',
  },
  BONUSENTRYCreate: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  BONUSENTRYEdit: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  //ANNOUNCEMENT SECTION
  ANNOUNCEMENTView: {
    status: '',
    progress: 0,
    data: [],
    error: '',
  },
  ANNOUNCEMENTViewSpecificEmployee: {
    status: '',
    progress: 0,
    data: [],
    error: '',
  },
  ANNOUNCEMENTViewSpecific: {
    status: '',
    progress: 0,
    data: [],
    error: '',
  },
  ANNOUNCEMENTCreate: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  ANNOUNCEMENTEdit: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  //ACTIVEANNOUNCEMENT SECTION
  ACTIVEANNOUNCEMENTView: {
    status: '',
    progress: 0,
    data: [],
    error: '',
  },
  //ANNRANK SECTION
  ANNRANKView: {
    status: '',
    progress: 0,
    data: [],
    error: '',
  },
  //ANNDEPARTMENT SECTION
  ANNDEPARTMENTView: {
    status: '',
    progress: 0,
    data: [],
    error: '',
  },
  //ASSETLIST SECTION
  ASSETLISTView: {
    status: '',
    progress: 0,
    data: [],
    error: '',
  },
  ASSETLISTViewSpecific: {
    status: '',
    progress: 0,
    data: [],
    error: '',
  },
  ASSETLISTCreate: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  ASSETLISTEdit: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  //ASSETACCOUNT SECTION
  ASSETACCOUNTView: {
    status: '',
    progress: 0,
    data: [],
    error: '',
  },
  ASSETACCOUNTViewSpecific: {
    status: '',
    progress: 0,
    data: [],
    error: '',
  },
  ASSETACCOUNTCreate: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  ASSETACCOUNTEdit: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  
};

const setLoadingState = (path: string) => (state: OverallPayrollEOYState) => {
  state[path].status = `${globalReducerLoading}`;
  state[path].data = [];
  state[path].error = null;
  state[path].progress = 0;
};

const setSuccessState = (state: OverallPayrollEOYState, payload: PayrollEOYPayloads, path: string) => {
  state[path].status = `${globalReducerSuccess}`;
  state[path].data = payload;
  state[path].error = null;
};

const setProgressState = (state: OverallPayrollEOYState, payload: number, path: string) => {
  state[path].progress = payload;
};

const setFailureState = (state: OverallPayrollEOYState, payload: string, path: string) => {
  state[path].status = `${globalReducerFailed}`;
  state[path].data = [];
  state[path].error = payload;
};


const setRefreshedState = (path: string) => (state: OverallPayrollEOYState) => {
  state[path].status = `${globalReducerRefreshed}`;
  state[path].data = [];
  state[path].error = null;
};


const payrollEOYSlice = createSlice({
  name: 'payrollEOY',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //TAXCOLLECTED SECTION
      .addCase(_Actions.TAXCOLLECTEDViewAction, setLoadingState("TAXCOLLECTEDView"))
      .addCase(_Actions.TAXCOLLECTEDViewActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "TAXCOLLECTEDView"))
      .addCase(_Actions.TAXCOLLECTEDViewActionProgress, (state, action) => setProgressState(state, action.payload, "TAXCOLLECTEDView"))
      .addCase(_Actions.TAXCOLLECTEDViewActionFailure, (state, action) => setFailureState(state, action.payload, "TAXCOLLECTEDView"))
      .addCase(_Actions.TAXCOLLECTEDViewSpecificEmployeeAction, setLoadingState("TAXCOLLECTEDViewSpecificEmployee"))
      .addCase(_Actions.TAXCOLLECTEDViewSpecificEmployeeActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "TAXCOLLECTEDViewSpecificEmployee"))
      .addCase(_Actions.TAXCOLLECTEDViewSpecificEmployeeActionProgress, (state, action) => setProgressState(state, action.payload, "TAXCOLLECTEDViewSpecificEmployee"))
      .addCase(_Actions.TAXCOLLECTEDViewSpecificEmployeeActionFailure, (state, action) => setFailureState(state, action.payload, "TAXCOLLECTEDViewSpecificEmployee"))
      //PAY13TH SECTION
      .addCase(_Actions.PAY13THViewAction, setLoadingState("PAY13THView"))
      .addCase(_Actions.PAY13THViewActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "PAY13THView"))
      .addCase(_Actions.PAY13THViewActionProgress, (state, action) => setProgressState(state, action.payload, "PAY13THView"))
      .addCase(_Actions.PAY13THViewActionFailure, (state, action) => setFailureState(state, action.payload, "PAY13THView"))
      .addCase(_Actions.PAY13THViewSpecificAction, setLoadingState("PAY13THViewSpecific"))
      .addCase(_Actions.PAY13THViewSpecificActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "PAY13THViewSpecific"))
      .addCase(_Actions.PAY13THViewSpecificActionProgress, (state, action) => setProgressState(state, action.payload, "PAY13THViewSpecific"))
      .addCase(_Actions.PAY13THViewSpecificActionFailure, (state, action) => setFailureState(state, action.payload, "PAY13THViewSpecific"))
      .addCase(_Actions.PAY13THCreateAction, setLoadingState("PAY13THCreate"))
      .addCase(_Actions.PAY13THCreateActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "PAY13THCreate"))
      .addCase(_Actions.PAY13THCreateActionProgress, (state, action) => setProgressState(state, action.payload, "PAY13THCreate"))
      .addCase(_Actions.PAY13THCreateActionFailure, (state, action) => setFailureState(state, action.payload, "PAY13THCreate"))
      .addCase(_Actions.PAY13THCreateActionFailureCleanup, setRefreshedState("PAY13THCreate"))
      //BONUSLIST SECTION
      .addCase(_Actions.BONUSLISTViewAction, setLoadingState("BONUSLISTView"))
      .addCase(_Actions.BONUSLISTViewActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "BONUSLISTView"))
      .addCase(_Actions.BONUSLISTViewActionProgress, (state, action) => setProgressState(state, action.payload, "BONUSLISTView"))
      .addCase(_Actions.BONUSLISTViewActionFailure, (state, action) => setFailureState(state, action.payload, "BONUSLISTView"))
      .addCase(_Actions.BONUSLISTViewSpecificAction, setLoadingState("BONUSLISTViewSpecific"))
      .addCase(_Actions.BONUSLISTViewSpecificActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "BONUSLISTViewSpecific"))
      .addCase(_Actions.BONUSLISTViewSpecificActionProgress, (state, action) => setProgressState(state, action.payload, "BONUSLISTViewSpecific"))
      .addCase(_Actions.BONUSLISTViewSpecificActionFailure, (state, action) => setFailureState(state, action.payload, "BONUSLISTViewSpecific"))
      .addCase(_Actions.BONUSLISTCreateAction, setLoadingState("BONUSLISTCreate"))
      .addCase(_Actions.BONUSLISTCreateActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "BONUSLISTCreate"))
      .addCase(_Actions.BONUSLISTCreateActionProgress, (state, action) => setProgressState(state, action.payload, "BONUSLISTCreate"))
      .addCase(_Actions.BONUSLISTCreateActionFailure, (state, action) => setFailureState(state, action.payload, "BONUSLISTCreate"))
      .addCase(_Actions.BONUSLISTCreateActionFailureCleanup, setRefreshedState("BONUSLISTCreate"))
      .addCase(_Actions.BONUSLISTEditAction, setLoadingState("BONUSLISTEdit"))
      .addCase(_Actions.BONUSLISTEditActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "BONUSLISTEdit"))
      .addCase(_Actions.BONUSLISTEditActionProgress, (state, action) => setProgressState(state, action.payload, "BONUSLISTEdit"))
      .addCase(_Actions.BONUSLISTEditActionFailure, (state, action) => setFailureState(state, action.payload, "BONUSLISTEdit"))
      //BONUSENTRY SECTION
      .addCase(_Actions.BONUSENTRYViewAction, setLoadingState("BONUSENTRYView"))
      .addCase(_Actions.BONUSENTRYViewActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "BONUSENTRYView"))
      .addCase(_Actions.BONUSENTRYViewActionProgress, (state, action) => setProgressState(state, action.payload, "BONUSENTRYView"))
      .addCase(_Actions.BONUSENTRYViewActionFailure, (state, action) => setFailureState(state, action.payload, "BONUSENTRYView"))
      .addCase(_Actions.BONUSENTRYViewSpecificEmployeeAction, setLoadingState("BONUSENTRYViewSpecificEmployee"))
      .addCase(_Actions.BONUSENTRYViewSpecificEmployeeActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "BONUSENTRYViewSpecificEmployee"))
      .addCase(_Actions.BONUSENTRYViewSpecificEmployeeActionProgress, (state, action) => setProgressState(state, action.payload, "BONUSENTRYViewSpecificEmployee"))
      .addCase(_Actions.BONUSENTRYViewSpecificEmployeeActionFailure, (state, action) => setFailureState(state, action.payload, "BONUSENTRYViewSpecificEmployee"))
      .addCase(_Actions.BONUSENTRYViewSpecificAction, setLoadingState("BONUSENTRYViewSpecific"))
      .addCase(_Actions.BONUSENTRYViewSpecificActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "BONUSENTRYViewSpecific"))
      .addCase(_Actions.BONUSENTRYViewSpecificActionProgress, (state, action) => setProgressState(state, action.payload, "BONUSENTRYViewSpecific"))
      .addCase(_Actions.BONUSENTRYViewSpecificActionFailure, (state, action) => setFailureState(state, action.payload, "BONUSENTRYViewSpecific"))
      .addCase(_Actions.BONUSENTRYCreateAction, setLoadingState("BONUSENTRYCreate"))
      .addCase(_Actions.BONUSENTRYCreateActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "BONUSENTRYCreate"))
      .addCase(_Actions.BONUSENTRYCreateActionProgress, (state, action) => setProgressState(state, action.payload, "BONUSENTRYCreate"))
      .addCase(_Actions.BONUSENTRYCreateActionFailure, (state, action) => setFailureState(state, action.payload, "BONUSENTRYCreate"))
      .addCase(_Actions.BONUSENTRYCreateActionFailureCleanup, setRefreshedState("BONUSENTRYCreate"))
      .addCase(_Actions.BONUSENTRYEditAction, setLoadingState("BONUSENTRYEdit"))
      .addCase(_Actions.BONUSENTRYEditActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "BONUSENTRYEdit"))
      .addCase(_Actions.BONUSENTRYEditActionProgress, (state, action) => setProgressState(state, action.payload, "BONUSENTRYEdit"))
      .addCase(_Actions.BONUSENTRYEditActionFailure, (state, action) => setFailureState(state, action.payload, "BONUSENTRYEdit"))
      //ANNOUNCEMENT SECTION
      .addCase(_Actions.ANNOUNCEMENTViewAction, setLoadingState("ANNOUNCEMENTView"))
      .addCase(_Actions.ANNOUNCEMENTViewActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "ANNOUNCEMENTView"))
      .addCase(_Actions.ANNOUNCEMENTViewActionProgress, (state, action) => setProgressState(state, action.payload, "ANNOUNCEMENTView"))
      .addCase(_Actions.ANNOUNCEMENTViewActionFailure, (state, action) => setFailureState(state, action.payload, "ANNOUNCEMENTView"))
      .addCase(_Actions.ANNOUNCEMENTViewSpecificAction, setLoadingState("ANNOUNCEMENTViewSpecific"))
      .addCase(_Actions.ANNOUNCEMENTViewSpecificActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "ANNOUNCEMENTViewSpecific"))
      .addCase(_Actions.ANNOUNCEMENTViewSpecificActionProgress, (state, action) => setProgressState(state, action.payload, "ANNOUNCEMENTViewSpecific"))
      .addCase(_Actions.ANNOUNCEMENTViewSpecificActionFailure, (state, action) => setFailureState(state, action.payload, "ANNOUNCEMENTViewSpecific"))
      .addCase(_Actions.ANNOUNCEMENTCreateAction, setLoadingState("ANNOUNCEMENTCreate"))
      .addCase(_Actions.ANNOUNCEMENTCreateActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "ANNOUNCEMENTCreate"))
      .addCase(_Actions.ANNOUNCEMENTCreateActionProgress, (state, action) => setProgressState(state, action.payload, "ANNOUNCEMENTCreate"))
      .addCase(_Actions.ANNOUNCEMENTCreateActionFailure, (state, action) => setFailureState(state, action.payload, "ANNOUNCEMENTCreate"))
      .addCase(_Actions.ANNOUNCEMENTCreateActionFailureCleanup, setRefreshedState("ANNOUNCEMENTCreate"))
      .addCase(_Actions.ANNOUNCEMENTEditAction, setLoadingState("ANNOUNCEMENTEdit"))
      .addCase(_Actions.ANNOUNCEMENTEditActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "ANNOUNCEMENTEdit"))
      .addCase(_Actions.ANNOUNCEMENTEditActionProgress, (state, action) => setProgressState(state, action.payload, "ANNOUNCEMENTEdit"))
      .addCase(_Actions.ANNOUNCEMENTEditActionFailure, (state, action) => setFailureState(state, action.payload, "ANNOUNCEMENTEdit"))
      //ACTIVEANNOUNCEMENT SECTION
      .addCase(_Actions.ACTIVEANNOUNCEMENTViewAction, setLoadingState("ACTIVEANNOUNCEMENTView"))
      .addCase(_Actions.ACTIVEANNOUNCEMENTViewActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "ACTIVEANNOUNCEMENTView"))
      .addCase(_Actions.ACTIVEANNOUNCEMENTViewActionProgress, (state, action) => setProgressState(state, action.payload, "ACTIVEANNOUNCEMENTView"))
      .addCase(_Actions.ACTIVEANNOUNCEMENTViewActionFailure, (state, action) => setFailureState(state, action.payload, "ACTIVEANNOUNCEMENTView"))
      //ASSETLIST SECTION
      .addCase(_Actions.ASSETLISTViewAction, setLoadingState("ASSETLISTView"))
      .addCase(_Actions.ASSETLISTViewActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "ASSETLISTView"))
      .addCase(_Actions.ASSETLISTViewActionProgress, (state, action) => setProgressState(state, action.payload, "ASSETLISTView"))
      .addCase(_Actions.ASSETLISTViewActionFailure, (state, action) => setFailureState(state, action.payload, "ASSETLISTView"))
      .addCase(_Actions.ASSETLISTViewSpecificAction, setLoadingState("ASSETLISTViewSpecific"))
      .addCase(_Actions.ASSETLISTViewSpecificActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "ASSETLISTViewSpecific"))
      .addCase(_Actions.ASSETLISTViewSpecificActionProgress, (state, action) => setProgressState(state, action.payload, "ASSETLISTViewSpecific"))
      .addCase(_Actions.ASSETLISTViewSpecificActionFailure, (state, action) => setFailureState(state, action.payload, "ASSETLISTViewSpecific"))
      .addCase(_Actions.ASSETLISTCreateAction, setLoadingState("ASSETLISTCreate"))
      .addCase(_Actions.ASSETLISTCreateActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "ASSETLISTCreate"))
      .addCase(_Actions.ASSETLISTCreateActionProgress, (state, action) => setProgressState(state, action.payload, "ASSETLISTCreate"))
      .addCase(_Actions.ASSETLISTCreateActionFailure, (state, action) => setFailureState(state, action.payload, "ASSETLISTCreate"))
      .addCase(_Actions.ASSETLISTCreateActionFailureCleanup, setRefreshedState("ASSETLISTCreate"))
      .addCase(_Actions.ASSETLISTEditAction, setLoadingState("ASSETLISTEdit"))
      .addCase(_Actions.ASSETLISTEditActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "ASSETLISTEdit"))
      .addCase(_Actions.ASSETLISTEditActionProgress, (state, action) => setProgressState(state, action.payload, "ASSETLISTEdit"))
      .addCase(_Actions.ASSETLISTEditActionFailure, (state, action) => setFailureState(state, action.payload, "ASSETLISTEdit"))
      //ASSETACCOUNT SECTION
      .addCase(_Actions.ASSETACCOUNTViewAction, setLoadingState("ASSETACCOUNTView"))
      .addCase(_Actions.ASSETACCOUNTViewActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "ASSETACCOUNTView"))
      .addCase(_Actions.ASSETACCOUNTViewActionProgress, (state, action) => setProgressState(state, action.payload, "ASSETACCOUNTView"))
      .addCase(_Actions.ASSETACCOUNTViewActionFailure, (state, action) => setFailureState(state, action.payload, "ASSETACCOUNTView"))
      .addCase(_Actions.ASSETACCOUNTViewSpecificAction, setLoadingState("ASSETACCOUNTViewSpecific"))
      .addCase(_Actions.ASSETACCOUNTViewSpecificActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "ASSETACCOUNTViewSpecific"))
      .addCase(_Actions.ASSETACCOUNTViewSpecificActionProgress, (state, action) => setProgressState(state, action.payload, "ASSETACCOUNTViewSpecific"))
      .addCase(_Actions.ASSETACCOUNTViewSpecificActionFailure, (state, action) => setFailureState(state, action.payload, "ASSETACCOUNTViewSpecific"))
      .addCase(_Actions.ASSETACCOUNTCreateAction, setLoadingState("ASSETACCOUNTCreate"))
      .addCase(_Actions.ASSETACCOUNTCreateActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "ASSETACCOUNTCreate"))
      .addCase(_Actions.ASSETACCOUNTCreateActionProgress, (state, action) => setProgressState(state, action.payload, "ASSETACCOUNTCreate"))
      .addCase(_Actions.ASSETACCOUNTCreateActionFailure, (state, action) => setFailureState(state, action.payload, "ASSETACCOUNTCreate"))
      .addCase(_Actions.ASSETACCOUNTCreateActionFailureCleanup, setRefreshedState("ASSETACCOUNTCreate"))
      .addCase(_Actions.ASSETACCOUNTEditAction, setLoadingState("ASSETACCOUNTEdit"))
      .addCase(_Actions.ASSETACCOUNTEditActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "ASSETACCOUNTEdit"))
      .addCase(_Actions.ASSETACCOUNTEditActionProgress, (state, action) => setProgressState(state, action.payload, "ASSETACCOUNTEdit"))
      .addCase(_Actions.ASSETACCOUNTEditActionFailure, (state, action) => setFailureState(state, action.payload, "ASSETACCOUNTEdit"))
      
  },
});


export const payrollEOYReducer = payrollEOYSlice.reducer;