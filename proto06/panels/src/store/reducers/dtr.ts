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
  getCutoffListEmployee,
  getCutoffListEmployeeSuccess,
  getCutoffListEmployeeFailure,
  mergeCutoffListAndEmployee,
  mergeCutoffListAndEmployeeSuccess,
  mergeCutoffListAndEmployeeProgress,
  mergeCutoffListAndEmployeeFailure
} from '../actions/dtr';
import { DtrData } from '@/types/types-store';
import { DTRCutoffListType, DTRCutoffListEmployees } from '@/types/types-pages';

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
  getCutoffListEmployees: {
    status: string | null;
    employees: DTRCutoffListEmployees[] | null;
    error: string | null; 
  },
  mergeCutoffListAndEmployee: {
    status: string | null;
    message: string | null;
    error: string | null;
    progress: number; 
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
  },
  getCutoffListEmployees: {
    status: null,
    employees: null,
    error: null
  },
  mergeCutoffListAndEmployee: {
    status: null,
    message: null,
    error: null,
    progress: 0,
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

const setGetListEmployeeLoadingState = (state: DtrState) => {
  state.getCutoffListEmployees.status = 'loading';
  state.getCutoffListEmployees.employees = null;
  state.getCutoffListEmployees.error = null;
};


const setMergeListEmployeeLoadingState = (state: DtrState) => {
  state.mergeCutoffListAndEmployee.status = 'loading';
  state.mergeCutoffListAndEmployee.message = null;
  state.mergeCutoffListAndEmployee.error = null;
  state.mergeCutoffListAndEmployee.progress = 0;
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

const setGetListEmployeeSuccessState = (state: DtrState, payload: DTRCutoffListEmployees[]) => {
  state.getCutoffListEmployees.status = 'succeeded';
  state.getCutoffListEmployees.employees = payload;
  state.getCutoffListEmployees.error = null;
};

const setMergeListEmployeeSuccessState = (state: DtrState, payload: string) => {
  state.mergeCutoffListAndEmployee.status = 'succeeded';
  state.mergeCutoffListAndEmployee.message = payload;
  state.mergeCutoffListAndEmployee.error = null;
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

const setGetListEmployeeFailureState = (state: DtrState, payload: string) => {
  state.getCutoffListEmployees.status = 'failed';
  state.getCutoffListEmployees.employees = null;
  state.getCutoffListEmployees.error = payload;
};

const setMergeListEmployeeFailureState = (state: DtrState, payload: string) => {
  state.mergeCutoffListAndEmployee.status = 'failed';
  state.mergeCutoffListAndEmployee.message = null;
  state.mergeCutoffListAndEmployee.error = payload;
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
      .addCase(getCutoffListFailure, (state, action) => setGetListFailureState(state, action.payload))
      .addCase(getCutoffListEmployee, setGetListEmployeeLoadingState)
      .addCase(getCutoffListEmployeeSuccess, (state, action) => setGetListEmployeeSuccessState(state, action.payload.DTRCutoffListEmployees))
      .addCase(getCutoffListEmployeeFailure, (state, action) => setGetListEmployeeFailureState(state, action.payload))
      .addCase(mergeCutoffListAndEmployee, setMergeListEmployeeLoadingState)
      .addCase(mergeCutoffListAndEmployeeSuccess, (state, action) => setMergeListEmployeeSuccessState(state, action.payload.SuccessMessage))
      .addCase(mergeCutoffListAndEmployeeFailure, (state, action) => setMergeListEmployeeFailureState(state, action.payload))
      .addCase(mergeCutoffListAndEmployeeProgress, (state, action) => {
        state.mergeCutoffListAndEmployee.progress = action.payload;
      })
  },
});

export const { saveIndexAndString } = dtrSlice.actions;

export const dtrReducer = dtrSlice.reducer;