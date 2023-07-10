import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    viewPayrollList,
    viewPayrollListProgress,
    viewPayrollListSuccess,
    viewPayrollListFailure,
    generatePayslipMultiple,
    processPayroll,
    processPayrollSuccess,
    processPayrollProgress,
    processPayrollFailure,
    processPayrollFailureCleanup
} from '../actions/payroll';
import { ViewPayrollPayPerEmployee } from '@/types/types-pages';

type PayrollPayloads = ViewPayrollPayPerEmployee[] | string;

interface CommonPayrollState {
  status: string | null;
  progress: number;
  error: string | null; 
}

interface ViewPayrollState extends CommonPayrollState{
  data: ViewPayrollPayPerEmployee[];
}

interface processPayrollInterface extends CommonPayrollState{
  data: string;
}

interface OverallPayrollState {
  [key: string]: ViewPayrollState | processPayrollInterface,
  viewPayroll: ViewPayrollState,
  processPayroll: processPayrollInterface,
}

const initialState: OverallPayrollState = {
  viewPayroll: {
      status: '',
      progress: 0,
      data: [],
      error: '',
  },
  processPayroll: {
    status: '',
    progress: 0,
    data: '',
    error: '',
  }
};

const setLoadingState = (path: string) => (state: OverallPayrollState) => {
  state[path].status = 'loading';
  state[path].data = [];
  state[path].error = null;
  state[path].progress = 0;
};

const setSuccessState = (state: OverallPayrollState, payload: PayrollPayloads, path: string) => {
  state[path].status = 'succeeded';
  state[path].data = payload;
  state[path].error = null;
};

const setProgressState = (state: OverallPayrollState, payload: number, path: string) => {
  state[path].progress = payload;
};

const setFailureState = (state: OverallPayrollState, payload: string, path: string) => {
  state[path].status = 'failed';
  state[path].data = [];
  state[path].error = payload;
};


const setRefreshedState = (state: OverallPayrollState, payload: string, path: string) => {
  state[path].status = 'refreshed';
  state[path].data = [];
  state[path].error = null;
};


const payrollSlice = createSlice({
  name: 'payroll',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(viewPayrollList, setLoadingState("viewPayroll"))
      .addCase(viewPayrollListSuccess, (state, action) => setSuccessState(state, action.payload, "viewPayroll"))
      .addCase(viewPayrollListProgress, (state, action) => setProgressState(state, action.payload, "viewPayroll"))
      .addCase(viewPayrollListFailure, (state, action) => setFailureState(state, action.payload, "viewPayroll"))
      .addCase(processPayroll, setLoadingState("processPayroll"))
      .addCase(processPayrollSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "processPayroll"))
      .addCase(processPayrollProgress, (state, action) => setProgressState(state, action.payload, "processPayroll"))
      .addCase(processPayrollFailure, (state, action) => setFailureState(state, action.payload, "processPayroll"))
      .addCase(processPayrollFailureCleanup, setLoadingState("processPayroll"))
  },
});


export const payrollReducer = payrollSlice.reducer;