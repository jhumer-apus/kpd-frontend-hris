import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  viewAllDtrLogs,
  viewAllDtrLogsSuccess,
  viewAllDtrLogsFailure,
  viewMergedDtrLogs,
  viewMergedDtrLogsSuccess,
  viewMergedDtrLogsFailure,
  viewCutoffDtrSummary,
  viewCutoffDtrSummarySuccess,
  viewCutoffDtrSummaryFailure,
  getCutoffList,
  getCutoffListSuccess,
  getCutoffListFailure,
} from '../actions/dtr';
import { DtrData } from '@/types/types-store';
import { DTRCutoffListType } from '@/types/types-pages';

interface DtrState {
  viewDtrReports: {
    splitButton: {
      spButtonIndex: number | null;
      spButtonStr: string | null;
      spButtonError: string | null;
    };
    currentView: {
      dtrStatus: string | null;
      dtrError: string | null;
      dtrData: DtrData;
    };
  };
  getCutoffList: {
    status: string | null;
    cutoffList: DTRCutoffListType[] | null;
    error: string | null; 
  }
}

const initialState: DtrState = {
  viewDtrReports: {
    splitButton: {
      spButtonIndex: null,
      spButtonStr: null,
      spButtonError: null,
    },
    currentView: {
      dtrStatus: null,
      dtrError: null,
      dtrData: null,
    },
  },
  getCutoffList: {
    status: null,
    cutoffList: null,
    error: null,
  }
};

const setLoadingState = (state: DtrState) => {
    state.viewDtrReports.currentView.dtrStatus = 'loading';
    state.viewDtrReports.currentView.dtrError = null;
    state.viewDtrReports.currentView.dtrData = null;
};

const setGetListLoadingState = (state: DtrState) => {
  state.getCutoffList.status = 'loading';
  state.getCutoffList.cutoffList = null;
  state.getCutoffList.error = null;
};

const setSuccessState = (state: DtrState, payload: DtrData) => {
  state.viewDtrReports.currentView.dtrStatus = 'succeeded';
  state.viewDtrReports.currentView.dtrError = null;
  state.viewDtrReports.currentView.dtrData = payload;
};

const setGetListSuccessState = (state: DtrState, payload: DTRCutoffListType[]) => {
  state.getCutoffList.status = 'succeeded';
  state.getCutoffList.cutoffList = payload;
  state.getCutoffList.error = null;
};

const setFailureState = (state: DtrState, payload: string) => {
  state.viewDtrReports.currentView.dtrStatus = 'failed';
  state.viewDtrReports.currentView.dtrError = payload;
  state.viewDtrReports.currentView.dtrData = null;
};

const setGetListFailureState = (state: DtrState, payload: string) => {
  state.getCutoffList.status = 'failed';
  state.getCutoffList.cutoffList = null;
  state.getCutoffList.error = payload;
};

const dtrSlice = createSlice({
  name: 'dtr',
  initialState,
  reducers: {
    saveIndexAndString: (state, action: PayloadAction<{ index: number; str: string }>) => {
      state.viewDtrReports.splitButton.spButtonIndex = action.payload.index;
      state.viewDtrReports.splitButton.spButtonStr = action.payload.str;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(viewAllDtrLogs, setLoadingState)
      .addCase(viewAllDtrLogsSuccess, (state, action) => setSuccessState(state, action.payload.allDtrLogs))
      .addCase(viewAllDtrLogsFailure, (state, action) => setFailureState(state, action.payload))
      .addCase(viewMergedDtrLogs, setLoadingState)
      .addCase(viewMergedDtrLogsSuccess, (state, action) => setSuccessState(state, action.payload.allMergedDtr))
      .addCase(viewMergedDtrLogsFailure, (state, action) => setFailureState(state, action.payload))
      .addCase(viewCutoffDtrSummary, setLoadingState)
      .addCase(viewCutoffDtrSummarySuccess, (state, action) => setSuccessState(state, action.payload.allCutoffDtrSummary))
      .addCase(viewCutoffDtrSummaryFailure, (state, action) => setFailureState(state, action.payload))
      .addCase(getCutoffList, setGetListLoadingState)
      .addCase(getCutoffListSuccess, (state, action) => setGetListSuccessState(state, action.payload.DTRCutoffList))
      .addCase(getCutoffListFailure, (state, action) => setGetListFailureState(state, action.payload));
  },
});

export const { saveIndexAndString } = dtrSlice.actions;

export const dtrReducer = dtrSlice.reducer;