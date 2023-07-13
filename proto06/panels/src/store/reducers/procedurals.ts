import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { 
    HolidayCreate,
    HolidayCreateFailure,
    HolidayCreateFailureCleanup,
    HolidayCreateProgress,
    HolidayCreateSuccess,
    HolidaysGet,
    HolidaysGetFailure,
    HolidaysGetFailureCleanup,
    HolidaysGetProgress,
    HolidaysGetSuccess,
    HolidayEditSubmit,
    HolidayEditSubmitFailure,
    HolidayEditSubmitFailureCleanup,
    HolidayEditSubmitProgress,
    HolidayEditSubmitSuccess,
    OBTViewAction,
    OBTViewActionSuccess,
    OBTViewActionFailure,
    OBTViewActionFailureCleanup,
    OBTViewActionProgress,
    OBTViewFilterEmployeeAction,
    OBTViewFilterEmployeeActionFailure,
    OBTViewFilterEmployeeActionFailureCleanup,
    OBTViewFilterEmployeeActionProgress,
    OBTViewFilterEmployeeActionSuccess,
    OBTViewFilterEmployeeAndOBTAction,
    OBTViewFilterEmployeeAndOBTActionFailure,
    OBTViewFilterEmployeeAndOBTActionFailureCleanup,
    OBTViewFilterEmployeeAndOBTActionProgress,
    OBTViewFilterEmployeeAndOBTActionSuccess,
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
    // OVERTIME SECTION
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
    // LEAVE SECTION
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
    // UA SECTION
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
    UAViewFilterEmployeeAndUAActionSuccess
} from '../actions/procedurals';
// import '../actions/procedurals.ts'; // TO DO: Optimize importing all from one ts file. 
import { 
  HolidayGetType, 
  OBTCreateInterface, 
  OBTViewInterface, 
  OBTEditInterface, 
  OVERTIMECreateInterface, 
  OVERTIMEEditInterface, 
  OVERTIMEViewInterface,
  LEAVECreateInterface, 
  LEAVEEditInterface, 
  LEAVEViewInterface, 
  UACreateInterface, 
  UAEditInterface, 
  UAViewInterface, 
} from '@/types/types-pages';

type ProceduralsPayloads = 
HolidayGetType[] | 
HolidayGetType | 
OBTViewInterface[] | 
OBTViewInterface | 
OBTCreateInterface | 
OVERTIMEViewInterface[] | 
OVERTIMEViewInterface | 
OVERTIMECreateInterface |
LEAVEViewInterface[] | 
LEAVEViewInterface | 
LEAVECreateInterface |
UAViewInterface[] | 
UAViewInterface | 
UACreateInterface
;

interface CommonProceduralState {
  status: string | null;
  progress: number;
  error: string | null; 
}

interface HolidaysGetState extends CommonProceduralState{
  data: HolidayGetType[];
}

interface HolidayCreateState extends CommonProceduralState{
  data: HolidayGetType | null;
}

interface HolidayEditSubmitState extends CommonProceduralState{
  data: HolidayGetType | null;
}

// OBT SECTION // OBT SECTION // OBT SECTION // OBT SECTION // OBT SECTION 
interface OBTViewState extends CommonProceduralState{
  data: OBTViewInterface[] | null | [] | OBTViewInterface;
}

interface OBTCreateState extends CommonProceduralState{
  data: OBTCreateInterface | null | {};
}

interface OBTEditState extends CommonProceduralState {
  data: OBTViewState | null;
}

// OVERTIME SECTION // OVERTIME SECTION // OVERTIME SECTION // OVERTIME SECTION
interface OVERTIMEViewState extends CommonProceduralState{
  data: OVERTIMEViewInterface[] | null | [] | OVERTIMEViewInterface;
}

interface OVERTIMECreateState extends CommonProceduralState{
  data: OVERTIMECreateInterface | null | {};
}

interface OVERTIMEEditState extends CommonProceduralState {
  data: OVERTIMEViewState | null;
}

// LEAVE SECTION // LEAVE SECTION // LEAVE SECTION // LEAVE SECTION
interface LEAVEViewState extends CommonProceduralState{
  data: LEAVEViewInterface[] | null | [] | LEAVEViewInterface;
}

interface LEAVECreateState extends CommonProceduralState{
  data: LEAVECreateInterface | null | {};
}

interface LEAVEEditState extends CommonProceduralState {
  data: LEAVEViewState | null;
}

// UA SECTION // UA SECTION // UA SECTION // UA SECTION
interface UAViewState extends CommonProceduralState{
  data: UAViewInterface[] | null | [] | UAViewInterface;
}

interface UACreateState extends CommonProceduralState{
  data: UACreateInterface | null | {};
}

interface UAEditState extends CommonProceduralState {
  data: UAViewState | null;
}

interface OverallProceduralState {
  [key: string]: 
  HolidaysGetState | 
  HolidayCreateState | 
  OBTViewState | 
  OBTCreateState | 
  OBTEditState | 
  OVERTIMEViewState | 
  OVERTIMECreateState | 
  OVERTIMEEditState |
  LEAVEViewState | 
  LEAVECreateState | 
  LEAVEEditState,
  HolidaysGet: HolidaysGetState,
  HolidayCreate: HolidayCreateState,
  HolidayEditSubmit: HolidayEditSubmitState,
  //OBT SECTION
  OBTView: OBTViewState,
  OBTViewFilterEmployee: OBTViewState,
  OBTViewFilterEmployeeAndOBT: OBTViewState,
  OBTViewFilterApprover: OBTViewState,
  OBTCreate: OBTCreateState,
  OBTEdit: OBTEditState,
  //OVERTIME SECTION
  OVERTIMEView: OVERTIMEViewState,
  OVERTIMEViewFilterEmployee: OVERTIMEViewState,
  OVERTIMEViewFilterEmployeeAndOVERTIME: OVERTIMEViewState,
  OVERTIMEViewFilterApprover: OVERTIMEViewState,
  OVERTIMECreate: OVERTIMECreateState,
  OVERTIMEEdit: OVERTIMEEditState,
  //LEAVE SECTION
  LEAVEView: LEAVEViewState,
  LEAVEViewFilterEmployee: LEAVEViewState,
  LEAVEViewFilterEmployeeAndLEAVE: LEAVEViewState,
  LEAVEViewFilterApprover: LEAVEViewState,
  LEAVECreate: LEAVECreateState,
  LEAVEEdit: LEAVEEditState,
  //UA SECTION
  UAView: UAViewState,
  UAViewFilterEmployee: UAViewState,
  UAViewFilterEmployeeAndUA: UAViewState,
  UAViewFilterApprover: UAViewState,
  UACreate: UACreateState,
  UAEdit: UAEditState,
}

const initialState: OverallProceduralState = {
  HolidaysGet: {
    status: '',
    progress: 0,
    data: [],
    error: '',
  },
  HolidayCreate: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  HolidayEditSubmit: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  //OBT SECTION
  OBTView: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  OBTViewFilterEmployee: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  OBTViewFilterEmployeeAndOBT: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  OBTViewFilterApprover: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  OBTCreate: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  OBTEdit: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  //OVERTIME SECTION
  OVERTIMEView: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  OVERTIMEViewFilterEmployee: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  OVERTIMEViewFilterEmployeeAndOVERTIME: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  OVERTIMEViewFilterApprover: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  OVERTIMECreate: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  OVERTIMEEdit: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  //LEAVE SECTION
  LEAVEView: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  LEAVEViewFilterEmployee: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  LEAVEViewFilterEmployeeAndLEAVE: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  LEAVEViewFilterApprover: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  LEAVECreate: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  LEAVEEdit: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  //UA SECTION
  UAView: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  UAViewFilterEmployee: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  UAViewFilterEmployeeAndUA: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  UAViewFilterApprover: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  UACreate: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  UAEdit: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  }
};

const setLoadingState = (path: string) => (state: OverallProceduralState) => {
  state[path].status = 'loading';
  state[path].data = [];
  state[path].error = null;
  state[path].progress = 0;
};

const setSuccessState = (state: OverallProceduralState, payload: ProceduralsPayloads, path: string) => {
  state[path].status = 'succeeded';
  state[path].data = payload;
  state[path].error = null;
};

const setProgressState = (state: OverallProceduralState, payload: number, path: string) => {
  state[path].progress = payload;
};

const setFailureState = (state: OverallProceduralState, payload: string, path: string) => {
  state[path].status = 'failed';
  state[path].data = [];
  state[path].error = payload;
};


const setRefreshedState = (state: OverallProceduralState, payload: string, path: string) => {
  state[path].status = 'refreshed';
  state[path].data = [];
  state[path].error = null;
};


const proceduralsSlice = createSlice({
  name: 'procedurals',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(HolidaysGet, setLoadingState("HolidaysGet"))
      .addCase(HolidaysGetSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "HolidaysGet"))
      .addCase(HolidaysGetProgress, (state, action) => setProgressState(state, action.payload, "HolidaysGet"))
      .addCase(HolidaysGetFailure, (state, action) => setFailureState(state, action.payload, "HolidaysGet"))
      .addCase(HolidayCreate, setLoadingState("HolidayCreate"))
      .addCase(HolidayCreateSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "HolidayCreate"))
      .addCase(HolidayCreateProgress, (state, action) => setProgressState(state, action.payload, "HolidayCreate"))
      .addCase(HolidayCreateFailure, (state, action) => setFailureState(state, action.payload, "HolidayCreate"))
      .addCase(HolidayEditSubmit, setLoadingState("HolidayEditSubmit"))
      .addCase(HolidayEditSubmitSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "HolidayEditSubmit"))
      .addCase(HolidayEditSubmitProgress, (state, action) => setProgressState(state, action.payload, "HolidayEditSubmit"))
      .addCase(HolidayEditSubmitFailure, (state, action) => setFailureState(state, action.payload, "HolidayEditSubmit"))
      //OBT SECTION
      .addCase(OBTViewAction, setLoadingState("OBTView"))
      .addCase(OBTViewActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "OBTView"))
      .addCase(OBTViewActionProgress, (state, action) => setProgressState(state, action.payload, "OBTView"))
      .addCase(OBTViewActionFailure, (state, action) => setFailureState(state, action.payload, "OBTView"))
      .addCase(OBTViewFilterEmployeeAction, setLoadingState("OBTViewFilterEmployee"))
      .addCase(OBTViewFilterEmployeeActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "OBTViewFilterEmployee"))
      .addCase(OBTViewFilterEmployeeActionProgress, (state, action) => setProgressState(state, action.payload, "OBTViewFilterEmployee"))
      .addCase(OBTViewFilterEmployeeActionFailure, (state, action) => setFailureState(state, action.payload, "OBTViewFilterEmployee"))
      .addCase(OBTViewFilterEmployeeAndOBTAction, setLoadingState("OBTViewFilterEmployeeAndOBT"))
      .addCase(OBTViewFilterEmployeeAndOBTActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "OBTViewFilterEmployeeAndOBT"))
      .addCase(OBTViewFilterEmployeeAndOBTActionProgress, (state, action) => setProgressState(state, action.payload, "OBTViewFilterEmployeeAndOBT"))
      .addCase(OBTViewFilterEmployeeAndOBTActionFailure, (state, action) => setFailureState(state, action.payload, "OBTViewFilterEmployeeAndOBT"))
      .addCase(OBTViewFilterApproverAction, setLoadingState("OBTViewFilterApprover"))
      .addCase(OBTViewFilterApproverActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "OBTViewFilterApprover"))
      .addCase(OBTViewFilterApproverActionProgress, (state, action) => setProgressState(state, action.payload, "OBTViewFilterApprover"))
      .addCase(OBTViewFilterApproverActionFailure, (state, action) => setFailureState(state, action.payload, "OBTViewFilterApprover"))
      .addCase(OBTCreateAction, setLoadingState("OBTCreate"))
      .addCase(OBTCreateActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "OBTCreate"))
      .addCase(OBTCreateActionProgress, (state, action) => setProgressState(state, action.payload, "OBTCreate"))
      .addCase(OBTCreateActionFailure, (state, action) => setFailureState(state, action.payload, "OBTCreate"))
      .addCase(OBTEditAction, setLoadingState("OBTEdit"))
      .addCase(OBTEditActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "OBTEdit"))
      .addCase(OBTEditActionProgress, (state, action) => setProgressState(state, action.payload, "OBTEdit"))
      .addCase(OBTEditActionFailure, (state, action) => setFailureState(state, action.payload, "OBTEdit"))
      //OVERTIME SECTION
      .addCase(OVERTIMEViewAction, setLoadingState("OVERTIMEView"))
      .addCase(OVERTIMEViewActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "OVERTIMEView"))
      .addCase(OVERTIMEViewActionProgress, (state, action) => setProgressState(state, action.payload, "OVERTIMEView"))
      .addCase(OVERTIMEViewActionFailure, (state, action) => setFailureState(state, action.payload, "OVERTIMEView"))
      .addCase(OVERTIMEViewFilterEmployeeAction, setLoadingState("OVERTIMEViewFilterEmployee"))
      .addCase(OVERTIMEViewFilterEmployeeActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "OVERTIMEViewFilterEmployee"))
      .addCase(OVERTIMEViewFilterEmployeeActionProgress, (state, action) => setProgressState(state, action.payload, "OVERTIMEViewFilterEmployee"))
      .addCase(OVERTIMEViewFilterEmployeeActionFailure, (state, action) => setFailureState(state, action.payload, "OVERTIMEViewFilterEmployee"))
      .addCase(OVERTIMEViewFilterEmployeeAndOVERTIMEAction, setLoadingState("OVERTIMEViewFilterEmployeeAndOVERTIME"))
      .addCase(OVERTIMEViewFilterEmployeeAndOVERTIMEActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "OVERTIMEViewFilterEmployeeAndOVERTIME"))
      .addCase(OVERTIMEViewFilterEmployeeAndOVERTIMEActionProgress, (state, action) => setProgressState(state, action.payload, "OVERTIMEViewFilterEmployeeAndOVERTIME"))
      .addCase(OVERTIMEViewFilterEmployeeAndOVERTIMEActionFailure, (state, action) => setFailureState(state, action.payload, "OVERTIMEViewFilterEmployeeAndOVERTIME"))
      .addCase(OVERTIMEViewFilterApproverAction, setLoadingState("OVERTIMEViewFilterApprover"))
      .addCase(OVERTIMEViewFilterApproverActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "OVERTIMEViewFilterApprover"))
      .addCase(OVERTIMEViewFilterApproverActionProgress, (state, action) => setProgressState(state, action.payload, "OVERTIMEViewFilterApprover"))
      .addCase(OVERTIMEViewFilterApproverActionFailure, (state, action) => setFailureState(state, action.payload, "OVERTIMEViewFilterApprover"))
      .addCase(OVERTIMECreateAction, setLoadingState("OVERTIMECreate"))
      .addCase(OVERTIMECreateActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "OVERTIMECreate"))
      .addCase(OVERTIMECreateActionProgress, (state, action) => setProgressState(state, action.payload, "OVERTIMECreate"))
      .addCase(OVERTIMECreateActionFailure, (state, action) => setFailureState(state, action.payload, "OVERTIMECreate"))
      .addCase(OVERTIMEEditAction, setLoadingState("OVERTIMEEdit"))
      .addCase(OVERTIMEEditActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "OVERTIMEEdit"))
      .addCase(OVERTIMEEditActionProgress, (state, action) => setProgressState(state, action.payload, "OVERTIMEEdit"))
      .addCase(OVERTIMEEditActionFailure, (state, action) => setFailureState(state, action.payload, "OVERTIMEEdit"))
      //LEAVE SECTION
      .addCase(LEAVEViewAction, setLoadingState("LEAVEView"))
      .addCase(LEAVEViewActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "LEAVEView"))
      .addCase(LEAVEViewActionProgress, (state, action) => setProgressState(state, action.payload, "LEAVEView"))
      .addCase(LEAVEViewActionFailure, (state, action) => setFailureState(state, action.payload, "LEAVEView"))
      .addCase(LEAVEViewFilterEmployeeAction, setLoadingState("LEAVEViewFilterEmployee"))
      .addCase(LEAVEViewFilterEmployeeActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "LEAVEViewFilterEmployee"))
      .addCase(LEAVEViewFilterEmployeeActionProgress, (state, action) => setProgressState(state, action.payload, "LEAVEViewFilterEmployee"))
      .addCase(LEAVEViewFilterEmployeeActionFailure, (state, action) => setFailureState(state, action.payload, "LEAVEViewFilterEmployee"))
      .addCase(LEAVEViewFilterEmployeeAndLEAVEAction, setLoadingState("LEAVEViewFilterEmployeeAndLEAVE"))
      .addCase(LEAVEViewFilterEmployeeAndLEAVEActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "LEAVEViewFilterEmployeeAndLEAVE"))
      .addCase(LEAVEViewFilterEmployeeAndLEAVEActionProgress, (state, action) => setProgressState(state, action.payload, "LEAVEViewFilterEmployeeAndLEAVE"))
      .addCase(LEAVEViewFilterEmployeeAndLEAVEActionFailure, (state, action) => setFailureState(state, action.payload, "LEAVEViewFilterEmployeeAndLEAVE"))
      .addCase(LEAVEViewFilterApproverAction, setLoadingState("LEAVEViewFilterApprover"))
      .addCase(LEAVEViewFilterApproverActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "LEAVEViewFilterApprover"))
      .addCase(LEAVEViewFilterApproverActionProgress, (state, action) => setProgressState(state, action.payload, "LEAVEViewFilterApprover"))
      .addCase(LEAVEViewFilterApproverActionFailure, (state, action) => setFailureState(state, action.payload, "LEAVEViewFilterApprover"))
      .addCase(LEAVECreateAction, setLoadingState("LEAVECreate"))
      .addCase(LEAVECreateActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "LEAVECreate"))
      .addCase(LEAVECreateActionProgress, (state, action) => setProgressState(state, action.payload, "LEAVECreate"))
      .addCase(LEAVECreateActionFailure, (state, action) => setFailureState(state, action.payload, "LEAVECreate"))
      .addCase(LEAVEEditAction, setLoadingState("LEAVEEdit"))
      .addCase(LEAVEEditActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "LEAVEEdit"))
      .addCase(LEAVEEditActionProgress, (state, action) => setProgressState(state, action.payload, "LEAVEEdit"))
      .addCase(LEAVEEditActionFailure, (state, action) => setFailureState(state, action.payload, "LEAVEEdit"))
      //UA SECTION
      .addCase(UAViewAction, setLoadingState("UAView"))
      .addCase(UAViewActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "UAView"))
      .addCase(UAViewActionProgress, (state, action) => setProgressState(state, action.payload, "UAView"))
      .addCase(UAViewActionFailure, (state, action) => setFailureState(state, action.payload, "UAView"))
      .addCase(UAViewFilterEmployeeAction, setLoadingState("UAViewFilterEmployee"))
      .addCase(UAViewFilterEmployeeActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "UAViewFilterEmployee"))
      .addCase(UAViewFilterEmployeeActionProgress, (state, action) => setProgressState(state, action.payload, "UAViewFilterEmployee"))
      .addCase(UAViewFilterEmployeeActionFailure, (state, action) => setFailureState(state, action.payload, "UAViewFilterEmployee"))
      .addCase(UAViewFilterEmployeeAndUAAction, setLoadingState("UAViewFilterEmployeeAndUA"))
      .addCase(UAViewFilterEmployeeAndUAActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "UAViewFilterEmployeeAndUA"))
      .addCase(UAViewFilterEmployeeAndUAActionProgress, (state, action) => setProgressState(state, action.payload, "UAViewFilterEmployeeAndUA"))
      .addCase(UAViewFilterEmployeeAndUAActionFailure, (state, action) => setFailureState(state, action.payload, "UAViewFilterEmployeeAndUA"))
      .addCase(UAViewFilterApproverAction, setLoadingState("UAViewFilterApprover"))
      .addCase(UAViewFilterApproverActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "UAViewFilterApprover"))
      .addCase(UAViewFilterApproverActionProgress, (state, action) => setProgressState(state, action.payload, "UAViewFilterApprover"))
      .addCase(UAViewFilterApproverActionFailure, (state, action) => setFailureState(state, action.payload, "UAViewFilterApprover"))
      .addCase(UACreateAction, setLoadingState("UACreate"))
      .addCase(UACreateActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "UACreate"))
      .addCase(UACreateActionProgress, (state, action) => setProgressState(state, action.payload, "UACreate"))
      .addCase(UACreateActionFailure, (state, action) => setFailureState(state, action.payload, "UACreate"))
      .addCase(UAEditAction, setLoadingState("UAEdit"))
      .addCase(UAEditActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "UAEdit"))
      .addCase(UAEditActionProgress, (state, action) => setProgressState(state, action.payload, "UAEdit"))
      .addCase(UAEditActionFailure, (state, action) => setFailureState(state, action.payload, "UAEdit"))
  },
});


export const proceduralsReducer = proceduralsSlice.reducer;