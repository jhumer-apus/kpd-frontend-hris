import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    BRANCHCreateAction,
    BRANCHCreateActionFailure,
    BRANCHCreateActionFailureCleanup,
    BRANCHCreateActionProgress,
    BRANCHCreateActionSuccess,
    BRANCHEditAction,
    BRANCHEditActionFailure,
    BRANCHEditActionFailureCleanup,
    BRANCHEditActionProgress,
    BRANCHEditActionSuccess,
    BRANCHViewAction,
    BRANCHViewActionFailure,
    BRANCHViewActionFailureCleanup,
    BRANCHViewActionProgress,
    BRANCHViewActionSuccess,
    BRANCHViewSpecificAction,
    BRANCHViewSpecificActionFailure,
    BRANCHViewSpecificActionFailureCleanup,
    BRANCHViewSpecificActionProgress,
    BRANCHViewSpecificActionSuccess,
    DEPARTMENTCreateAction,
    DEPARTMENTCreateActionFailure,
    DEPARTMENTCreateActionFailureCleanup,
    DEPARTMENTCreateActionProgress,
    DEPARTMENTCreateActionSuccess,
    DEPARTMENTEditAction,
    DEPARTMENTEditActionFailure,
    DEPARTMENTEditActionFailureCleanup,
    DEPARTMENTEditActionProgress,
    DEPARTMENTEditActionSuccess,
    DEPARTMENTViewAction,
    DEPARTMENTViewActionFailure,
    DEPARTMENTViewActionFailureCleanup,
    DEPARTMENTViewActionProgress,
    DEPARTMENTViewActionSuccess,
    DEPARTMENTViewSpecificAction,
    DEPARTMENTViewSpecificActionFailure,
    DEPARTMENTViewSpecificActionFailureCleanup,
    DEPARTMENTViewSpecificActionProgress,
    DEPARTMENTViewSpecificActionSuccess,
    DIVISIONEditAction,
    DIVISIONEditActionFailure,
    DIVISIONEditActionFailureCleanup,
    DIVISIONEditActionProgress,
    DIVISIONEditActionSuccess,
    DIVISIONCreateAction,
    DIVISIONCreateActionFailure,
    DIVISIONCreateActionFailureCleanup,
    DIVISIONCreateActionProgress,
    DIVISIONCreateActionSuccess,
    DIVISIONViewAction,
    DIVISIONViewActionFailure,
    DIVISIONViewActionFailureCleanup,
    DIVISIONViewActionProgress,
    DIVISIONViewActionSuccess,
    DIVISIONViewSpecificAction,
    DIVISIONViewSpecificActionFailure,
    DIVISIONViewSpecificActionFailureCleanup,
    DIVISIONViewSpecificActionProgress,
    DIVISIONViewSpecificActionSuccess,
    PAYROLLGROUPCreateAction,
    PAYROLLGROUPCreateActionFailure,
    PAYROLLGROUPCreateActionFailureCleanup,
    PAYROLLGROUPCreateActionProgress,
    PAYROLLGROUPCreateActionSuccess,
    PAYROLLGROUPEditAction,
    PAYROLLGROUPEditActionFailure,
    PAYROLLGROUPEditActionFailureCleanup,
    PAYROLLGROUPEditActionProgress,
    PAYROLLGROUPEditActionSuccess,
    PAYROLLGROUPViewAction,
    PAYROLLGROUPViewActionFailure,
    PAYROLLGROUPViewActionFailureCleanup,
    PAYROLLGROUPViewActionProgress,
    PAYROLLGROUPViewActionSuccess,
    PAYROLLGROUPViewSpecificAction,
    PAYROLLGROUPViewSpecificActionFailure,
    PAYROLLGROUPViewSpecificActionFailureCleanup,
    PAYROLLGROUPViewSpecificActionProgress,
    PAYROLLGROUPViewSpecificActionSuccess,
    POSITIONCreateAction,
    POSITIONCreateActionFailure,
    POSITIONCreateActionFailureCleanup,
    POSITIONCreateActionProgress,
    POSITIONCreateActionSuccess,
    POSITIONEditAction,
    POSITIONEditActionFailure,
    POSITIONEditActionFailureCleanup,
    POSITIONEditActionProgress,
    POSITIONEditActionSuccess,
    POSITIONViewAction,
    POSITIONViewActionFailure,
    POSITIONViewActionFailureCleanup,
    POSITIONViewActionProgress,
    POSITIONViewActionSuccess,
    POSITIONViewSpecificAction,
    POSITIONViewSpecificActionFailure,
    POSITIONViewSpecificActionFailureCleanup,
    POSITIONViewSpecificActionProgress,
    POSITIONViewSpecificActionSuccess,
    RANKCreateAction,
    RANKCreateActionFailure,
    RANKCreateActionFailureCleanup,
    RANKCreateActionProgress,
    RANKCreateActionSuccess,
    RANKEditAction,
    RANKEditActionFailure,
    RANKEditActionFailureCleanup,
    RANKEditActionProgress,
    RANKEditActionSuccess,
    RANKViewAction,
    RANKViewActionFailure,
    RANKViewActionFailureCleanup,
    RANKViewActionProgress,
    RANKViewActionSuccess,
    RANKViewSpecificAction,
    RANKViewSpecificActionFailure,
    RANKViewSpecificActionFailureCleanup,
    RANKViewSpecificActionProgress,
    RANKViewSpecificActionSuccess,
  } from '../actions/categories';
import { 
    BRANCHCreateInterface,
    BRANCHEditInterface,
    BRANCHGenericInterface,
    BRANCHViewInterface,
    DEPARTMENTCreateInterface,
    DEPARTMENTEditInterface,
    DEPARTMENTGenericInterface,
    DEPARTMENTViewInterface,
    DIVISIONCreateInterface,
    DIVISIONEditInterface,
    DIVISIONGenericInterface,
    DIVISIONViewInterface,
    PAYROLLGROUPCreateInterface,
    PAYROLLGROUPEditInterface,
    PAYROLLGROUPGenericInterface,
    PAYROLLGROUPViewInterface,
    POSITIONCreateInterface,
    POSITIONEditInterface,
    POSITIONGenericInterface,
    POSITIONViewInterface,
    RANKCreateInterface,
    RANKEditInterface,
    RANKGenericInterface,
    RANKViewInterface,
    RankDataInterface,
} from '@/types/types-pages';
import { globalReducerFailed, globalReducerLoading, globalReducerRefreshed, globalReducerSuccess } from '../configureStore';

type CategoriesPayloads = 
string |
BRANCHViewInterface[] | 
BRANCHViewInterface | 
BRANCHCreateInterface | 
DEPARTMENTViewInterface[] | 
DEPARTMENTViewInterface | 
DEPARTMENTCreateInterface |
DIVISIONViewInterface[] | 
DIVISIONViewInterface | 
DIVISIONCreateInterface |
PAYROLLGROUPViewInterface[] | 
PAYROLLGROUPViewInterface | 
PAYROLLGROUPCreateInterface | 
POSITIONViewInterface[] | 
POSITIONViewInterface | 
POSITIONCreateInterface |
RANKViewInterface[] | 
RANKViewInterface | 
RANKCreateInterface
;

interface CommonCategoriesState {
  status: string | null;
  progress: number;
  error: string | null; 
}

interface CommonCategoriesDataStringState {
  data: string | null;
}

// BRANCH SECTION // BRANCH SECTION // BRANCH SECTION // BRANCH SECTION // BRANCH SECTION 
interface BRANCHViewState extends CommonCategoriesState{
  data: BRANCHViewInterface[] | [];
}

interface BRANCHCreateState extends CommonCategoriesState{
  data: BRANCHCreateInterface | null | {};
}

interface BRANCHEditState extends CommonCategoriesState {
  data: BRANCHViewState | null;
}

// OVERTIME SECTION // OVERTIME SECTION // OVERTIME SECTION // OVERTIME SECTION
interface DEPARTMENTViewState extends CommonCategoriesState{
  data: DEPARTMENTViewInterface[];
}

interface DEPARTMENTCreateState extends CommonCategoriesState{
  data: DEPARTMENTCreateInterface | null | {};
}

interface DEPARTMENTEditState extends CommonCategoriesState {
  data: DEPARTMENTViewState | null;
}

// DIVISION SECTION // DIVISION SECTION // DIVISION SECTION // DIVISION SECTION
interface DIVISIONViewState extends CommonCategoriesState{
  data: DIVISIONViewInterface[] | null | [] | DIVISIONViewInterface;
}

interface DIVISIONCreateState extends CommonCategoriesState{
  data: DIVISIONCreateInterface | null | {};
}

interface DIVISIONEditState extends CommonCategoriesState {
  data: DIVISIONViewState | null;
}

// PAYROLLGROUP SECTION // PAYROLLGROUP SECTION // PAYROLLGROUP SECTION // PAYROLLGROUP SECTION
interface PAYROLLGROUPViewState extends CommonCategoriesState{
  data: PAYROLLGROUPViewInterface[] | [] ;
}

interface PAYROLLGROUPCreateState extends CommonCategoriesState{
  data: PAYROLLGROUPCreateInterface | null | {};
}

interface PAYROLLGROUPEditState extends CommonCategoriesState {
  data: PAYROLLGROUPViewState | null;
}

// POSITION SECTION // POSITION SECTION // POSITION SECTION // POSITION SECTION
interface POSITIONViewState extends CommonCategoriesState{
  data: POSITIONViewInterface[];
}

interface POSITIONCreateState extends CommonCategoriesState{
  data: POSITIONCreateInterface | null | {};
}

interface POSITIONEditState extends CommonCategoriesState {
  data: POSITIONViewState | null;
}

// RANK SECTION // RANK SECTION // RANK SECTION // RANK SECTION
interface RANKViewState extends CommonCategoriesState{
  data: RANKViewInterface[];
}

interface RANKCreateState extends CommonCategoriesState{
  data: RANKCreateInterface | null | {};
}

interface RANKEditState extends CommonCategoriesState {
  data: RANKViewState | null;
}

interface RANKDeleteState extends CommonCategoriesState, CommonCategoriesDataStringState {}


interface OverallCategoriesState {
  [key: string]: 
  BRANCHViewState | 
  BRANCHCreateState | 
  BRANCHEditState | 
  DEPARTMENTViewState | 
  DEPARTMENTCreateState | 
  DEPARTMENTEditState |
  DIVISIONViewState | 
  DIVISIONCreateState | 
  DIVISIONEditState |
  PAYROLLGROUPViewState | 
  PAYROLLGROUPCreateState | 
  PAYROLLGROUPEditState |
  POSITIONViewState | 
  POSITIONCreateState | 
  POSITIONEditState | 
  RANKViewState | 
  RANKCreateState | 
  RANKEditState | 
  RANKDeleteState ,
  //BRANCH SECTION
  BRANCHView: BRANCHViewState,
  BRANCHViewSpecific: BRANCHViewState,
  BRANCHCreate: BRANCHCreateState,
  BRANCHEdit: BRANCHEditState,
  //DEPARTMENT SECTION
  DEPARTMENTView: DEPARTMENTViewState,
  DEPARTMENTViewSpecific: DEPARTMENTViewState,
  DEPARTMENTCreate: DEPARTMENTCreateState,
  DEPARTMENTEdit: DEPARTMENTEditState,
  //DIVISION SECTION
  DIVISIONView: DIVISIONViewState,
  DIVISIONViewSpecific: DIVISIONViewState,
  DIVISIONCreate: DIVISIONCreateState,
  DIVISIONEdit: DIVISIONEditState,
  //PAYROLLGROUP SECTION
  PAYROLLGROUPView: PAYROLLGROUPViewState,
  PAYROLLGROUPViewSpecific: PAYROLLGROUPViewState,
  PAYROLLGROUPCreate: PAYROLLGROUPCreateState,
  PAYROLLGROUPEdit: PAYROLLGROUPEditState,
  //POSITION SECTION
  POSITIONView: POSITIONViewState,
  POSITIONViewSpecific: POSITIONViewState,
  POSITIONCreate: POSITIONCreateState,
  POSITIONEdit: POSITIONEditState,
  //RANK SECTION
  RANKView: RANKViewState,
  RANKViewSpecific: RANKViewState,
  RANKCreate: RANKCreateState,
  RANKEdit: RANKEditState,
  RANKDelete: RANKDeleteState,
}

const initialState: OverallCategoriesState = {
  //BRANCH SECTION
  BRANCHView: {
    status: '',
    progress: 0,
    data: [],
    error: '',
  },
  BRANCHViewSpecific: {
    status: '',
    progress: 0,
    data: [],
    error: '',
  },
  BRANCHCreate: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  BRANCHEdit: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  //DEPARTMENT SECTION
  DEPARTMENTView: {
    status: '',
    progress: 0,
    data: [],
    error: '',
  },
  DEPARTMENTViewSpecific: {
    status: '',
    progress: 0,
    data: [],
    error: '',
  },
  DEPARTMENTCreate: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  DEPARTMENTEdit: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  //DIVISION SECTION
  DIVISIONView: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  DIVISIONViewSpecific: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  DIVISIONCreate: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  DIVISIONEdit: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  //PAYROLLGROUP SECTION
  PAYROLLGROUPView: {
    status: '',
    progress: 0,
    data: [],
    error: '',
  },
  PAYROLLGROUPViewSpecific: {
    status: '',
    progress: 0,
    data: [],
    error: '',
  },
  PAYROLLGROUPCreate: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  PAYROLLGROUPEdit: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  //POSITION SECTION
  POSITIONView: {
    status: '',
    progress: 0,
    data: [],
    error: '',
  },
  POSITIONViewSpecific: {
    status: '',
    progress: 0,
    data: [],
    error: '',
  },
  POSITIONCreate: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  POSITIONEdit: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  //RANK SECTION
  RANKView: {
    status: '',
    progress: 0,
    data: [],
    error: '',
  },
  RANKViewSpecific: {
    status: '',
    progress: 0,
    data: [],
    error: '',
  },
  RANKCreate: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  RANKEdit: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  RANKDelete: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
};

const setLoadingState = (path: string) => (state: OverallCategoriesState) => {
  state[path].status = `${globalReducerLoading}`;
  state[path].data = [];
  state[path].error = null;
  state[path].progress = 0;
};

const setSuccessState = (state: OverallCategoriesState, payload: CategoriesPayloads, path: string) => {
  state[path].status = `${globalReducerSuccess}`;
  state[path].data = payload;
  state[path].error = null;
};

const setProgressState = (state: OverallCategoriesState, payload: number, path: string) => {
  state[path].progress = payload;
};

const setFailureState = (state: OverallCategoriesState, payload: string, path: string) => {
  state[path].status = `${globalReducerFailed}`;
  state[path].data = [];
  state[path].error = payload;
};


const setRefreshedState = (path: string) => (state: OverallCategoriesState) => {
  state[path].status = `${globalReducerRefreshed}`;
  state[path].data = [];
  state[path].error = null;
};


const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //BRANCH SECTION
      .addCase(BRANCHViewAction, setLoadingState("BRANCHView"))
      .addCase(BRANCHViewActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "BRANCHView"))
      .addCase(BRANCHViewActionProgress, (state, action) => setProgressState(state, action.payload, "BRANCHView"))
      .addCase(BRANCHViewActionFailure, (state, action) => setFailureState(state, action.payload, "BRANCHView"))
      .addCase(BRANCHViewSpecificAction, setLoadingState("BRANCHViewSpecific"))
      .addCase(BRANCHViewSpecificActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "BRANCHViewSpecific"))
      .addCase(BRANCHViewSpecificActionProgress, (state, action) => setProgressState(state, action.payload, "BRANCHViewSpecific"))
      .addCase(BRANCHViewSpecificActionFailure, (state, action) => setFailureState(state, action.payload, "BRANCHViewSpecific"))
      .addCase(BRANCHCreateAction, setLoadingState("BRANCHCreate"))
      .addCase(BRANCHCreateActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "BRANCHCreate"))
      .addCase(BRANCHCreateActionProgress, (state, action) => setProgressState(state, action.payload, "BRANCHCreate"))
      .addCase(BRANCHCreateActionFailure, (state, action) => setFailureState(state, action.payload, "BRANCHCreate"))
      .addCase(BRANCHCreateActionFailureCleanup, setRefreshedState("BRANCHCreate"))
      .addCase(BRANCHEditAction, setLoadingState("BRANCHEdit"))
      .addCase(BRANCHEditActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "BRANCHEdit"))
      .addCase(BRANCHEditActionProgress, (state, action) => setProgressState(state, action.payload, "BRANCHEdit"))
      .addCase(BRANCHEditActionFailure, (state, action) => setFailureState(state, action.payload, "BRANCHEdit"))
      //DEPARTMENT SECTION
      .addCase(DEPARTMENTViewAction, setLoadingState("DEPARTMENTView"))
      .addCase(DEPARTMENTViewActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "DEPARTMENTView"))
      .addCase(DEPARTMENTViewActionProgress, (state, action) => setProgressState(state, action.payload, "DEPARTMENTView"))
      .addCase(DEPARTMENTViewActionFailure, (state, action) => setFailureState(state, action.payload, "DEPARTMENTView"))
      .addCase(DEPARTMENTViewSpecificAction, setLoadingState("DEPARTMENTViewSpecific"))
      .addCase(DEPARTMENTViewSpecificActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "DEPARTMENTViewSpecific"))
      .addCase(DEPARTMENTViewSpecificActionProgress, (state, action) => setProgressState(state, action.payload, "DEPARTMENTViewSpecific"))
      .addCase(DEPARTMENTViewSpecificActionFailure, (state, action) => setFailureState(state, action.payload, "DEPARTMENTViewSpecific"))
      .addCase(DEPARTMENTCreateAction, setLoadingState("DEPARTMENTCreate"))
      .addCase(DEPARTMENTCreateActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "DEPARTMENTCreate"))
      .addCase(DEPARTMENTCreateActionProgress, (state, action) => setProgressState(state, action.payload, "DEPARTMENTCreate"))
      .addCase(DEPARTMENTCreateActionFailure, (state, action) => setFailureState(state, action.payload, "DEPARTMENTCreate"))
      .addCase(DEPARTMENTCreateActionFailureCleanup, setRefreshedState("DEPARTMENTCreate"))
      .addCase(DEPARTMENTEditAction, setLoadingState("DEPARTMENTEdit"))
      .addCase(DEPARTMENTEditActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "DEPARTMENTEdit"))
      .addCase(DEPARTMENTEditActionProgress, (state, action) => setProgressState(state, action.payload, "DEPARTMENTEdit"))
      .addCase(DEPARTMENTEditActionFailure, (state, action) => setFailureState(state, action.payload, "DEPARTMENTEdit"))
      //DIVISION SECTION
      .addCase(DIVISIONViewAction, setLoadingState("DIVISIONView"))
      .addCase(DIVISIONViewActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "DIVISIONView"))
      .addCase(DIVISIONViewActionProgress, (state, action) => setProgressState(state, action.payload, "DIVISIONView"))
      .addCase(DIVISIONViewActionFailure, (state, action) => setFailureState(state, action.payload, "DIVISIONView"))
      .addCase(DIVISIONViewSpecificAction, setLoadingState("DIVISIONViewSpecific"))
      .addCase(DIVISIONViewSpecificActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "DIVISIONViewSpecific"))
      .addCase(DIVISIONViewSpecificActionProgress, (state, action) => setProgressState(state, action.payload, "DIVISIONViewSpecific"))
      .addCase(DIVISIONViewSpecificActionFailure, (state, action) => setFailureState(state, action.payload, "DIVISIONViewSpecific"))
      .addCase(DIVISIONCreateAction, setLoadingState("DIVISIONCreate"))
      .addCase(DIVISIONCreateActionFailureCleanup, setRefreshedState("DIVISIONCreate"))
      .addCase(DIVISIONCreateActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "DIVISIONCreate"))
      .addCase(DIVISIONCreateActionProgress, (state, action) => setProgressState(state, action.payload, "DIVISIONCreate"))
      .addCase(DIVISIONCreateActionFailure, (state, action) => setFailureState(state, action.payload, "DIVISIONCreate"))
      .addCase(DIVISIONEditAction, setLoadingState("DIVISIONEdit"))
      .addCase(DIVISIONEditActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "DIVISIONEdit"))
      .addCase(DIVISIONEditActionProgress, (state, action) => setProgressState(state, action.payload, "DIVISIONEdit"))
      .addCase(DIVISIONEditActionFailure, (state, action) => setFailureState(state, action.payload, "DIVISIONEdit"))
      //PAYROLLGROUP SECTION
      .addCase(PAYROLLGROUPViewAction, setLoadingState("PAYROLLGROUPView"))
      .addCase(PAYROLLGROUPViewActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "PAYROLLGROUPView"))
      .addCase(PAYROLLGROUPViewActionProgress, (state, action) => setProgressState(state, action.payload, "PAYROLLGROUPView"))
      .addCase(PAYROLLGROUPViewActionFailure, (state, action) => setFailureState(state, action.payload, "PAYROLLGROUPView"))
      .addCase(PAYROLLGROUPViewSpecificAction, setLoadingState("PAYROLLGROUPViewSpecific"))
      .addCase(PAYROLLGROUPViewSpecificActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "PAYROLLGROUPViewSpecific"))
      .addCase(PAYROLLGROUPViewSpecificActionProgress, (state, action) => setProgressState(state, action.payload, "PAYROLLGROUPViewSpecific"))
      .addCase(PAYROLLGROUPViewSpecificActionFailure, (state, action) => setFailureState(state, action.payload, "PAYROLLGROUPViewSpecific"))
      .addCase(PAYROLLGROUPCreateAction, setLoadingState("PAYROLLGROUPCreate"))
      .addCase(PAYROLLGROUPCreateActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "PAYROLLGROUPCreate"))
      .addCase(PAYROLLGROUPCreateActionProgress, (state, action) => setProgressState(state, action.payload, "PAYROLLGROUPCreate"))
      .addCase(PAYROLLGROUPCreateActionFailure, (state, action) => setFailureState(state, action.payload, "PAYROLLGROUPCreate"))
      .addCase(PAYROLLGROUPCreateActionFailureCleanup, setRefreshedState("PAYROLLGROUPCreate"))
      .addCase(PAYROLLGROUPEditAction, setLoadingState("PAYROLLGROUPEdit"))
      .addCase(PAYROLLGROUPEditActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "PAYROLLGROUPEdit"))
      .addCase(PAYROLLGROUPEditActionProgress, (state, action) => setProgressState(state, action.payload, "PAYROLLGROUPEdit"))
      .addCase(PAYROLLGROUPEditActionFailure, (state, action) => setFailureState(state, action.payload, "PAYROLLGROUPEdit"))
      //POSITION SECTION
      .addCase(POSITIONViewAction, setLoadingState("POSITIONView"))
      .addCase(POSITIONViewActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "POSITIONView"))
      .addCase(POSITIONViewActionProgress, (state, action) => setProgressState(state, action.payload, "POSITIONView"))
      .addCase(POSITIONViewActionFailure, (state, action) => setFailureState(state, action.payload, "POSITIONView"))
      .addCase(POSITIONViewSpecificAction, setLoadingState("POSITIONViewSpecific"))
      .addCase(POSITIONViewSpecificActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "POSITIONViewSpecific"))
      .addCase(POSITIONViewSpecificActionProgress, (state, action) => setProgressState(state, action.payload, "POSITIONViewSpecific"))
      .addCase(POSITIONViewSpecificActionFailure, (state, action) => setFailureState(state, action.payload, "POSITIONViewSpecific"))
      .addCase(POSITIONCreateAction, setLoadingState("POSITIONCreate"))
      .addCase(POSITIONCreateActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "POSITIONCreate"))
      .addCase(POSITIONCreateActionProgress, (state, action) => setProgressState(state, action.payload, "POSITIONCreate"))
      .addCase(POSITIONCreateActionFailure, (state, action) => setFailureState(state, action.payload, "POSITIONCreate"))
      .addCase(POSITIONCreateActionFailureCleanup, setRefreshedState("POSITIONCreate"))
      .addCase(POSITIONEditAction, setLoadingState("POSITIONEdit"))
      .addCase(POSITIONEditActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "POSITIONEdit"))
      .addCase(POSITIONEditActionProgress, (state, action) => setProgressState(state, action.payload, "POSITIONEdit"))
      .addCase(POSITIONEditActionFailure, (state, action) => setFailureState(state, action.payload, "POSITIONEdit"))
      //RANK SECTION
      .addCase(RANKViewAction, setLoadingState("RANKView"))
      .addCase(RANKViewActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "RANKView"))
      .addCase(RANKViewActionProgress, (state, action) => setProgressState(state, action.payload, "RANKView"))
      .addCase(RANKViewActionFailure, (state, action) => setFailureState(state, action.payload, "RANKView"))
      .addCase(RANKViewSpecificAction, setLoadingState("RANKViewSpecific"))
      .addCase(RANKViewSpecificActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "RANKViewSpecific"))
      .addCase(RANKViewSpecificActionProgress, (state, action) => setProgressState(state, action.payload, "RANKViewSpecific"))
      .addCase(RANKViewSpecificActionFailure, (state, action) => setFailureState(state, action.payload, "RANKViewSpecific"))
      .addCase(RANKCreateAction, setLoadingState("RANKCreate"))
      .addCase(RANKCreateActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "RANKCreate"))
      .addCase(RANKCreateActionProgress, (state, action) => setProgressState(state, action.payload, "RANKCreate"))
      .addCase(RANKCreateActionFailure, (state, action) => setFailureState(state, action.payload, "RANKCreate"))
      .addCase(RANKCreateActionFailureCleanup, setRefreshedState("RANKCreate"))
      .addCase(RANKEditAction, setLoadingState("RANKEdit"))
      .addCase(RANKEditActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "RANKEdit"))
      .addCase(RANKEditActionProgress, (state, action) => setProgressState(state, action.payload, "RANKEdit"))
      .addCase(RANKEditActionFailure, (state, action) => setFailureState(state, action.payload, "RANKEdit"))
  },
});


export const categoriesReducer = categoriesSlice.reducer;