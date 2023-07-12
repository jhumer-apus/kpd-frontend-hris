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
    HolidayEditSubmitSuccess
} from '../actions/procedurals';
import { HolidayGetType } from '@/types/types-pages';

type ProceduralsPayloads = HolidayGetType[] | HolidayGetType ;

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

interface OverallProceduralState {
  [key: string]: HolidaysGetState | HolidayCreateState,
  HolidaysGet: HolidaysGetState,
  HolidayCreate: HolidayCreateState,
  HolidayEditSubmit: HolidayEditSubmitState,
}

const initialState: OverallProceduralState = {
  HolidaysGet: {
      status: '',
      progress: 0,
      data: [],
      error: '',
  },
  HolidayCreate: { //GGGRRRRR!!!
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
  }
};

const setLoadingState = (path: string) => (state: OverallProceduralState) => {
  console.log("jajajajajaja", path)
  console.log(state[path].status, 'ha??')
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
  },
});


export const proceduralsReducer = proceduralsSlice.reducer;