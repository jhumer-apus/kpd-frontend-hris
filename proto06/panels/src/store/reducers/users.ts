import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
   USERCreateAction,
   USERCreateActionFailure,
   USERCreateActionFailureCleanup,
   USERCreateActionProgress,
   USERCreateActionSuccess,
   USEREditAction,
   USEREditActionFailure,
   USEREditActionFailureCleanup,
   USEREditActionProgress,
   USEREditActionSuccess,
   USERResetPasswordAction,
   USERResetPasswordActionFailure,
   USERResetPasswordActionFailureCleanup,
   USERResetPasswordActionProgress,
   USERResetPasswordActionSuccess,
   USERViewAction,
   USERViewActionFailure,
   USERViewActionFailureCleanup,
   USERViewActionProgress,
   USERViewActionSuccess,
   USERViewSpecificAction,
   USERViewSpecificActionFailure,
   USERViewSpecificActionFailureCleanup,
   USERViewSpecificActionProgress,
   USERViewSpecificActionSuccess,
  } from '../actions/users';
import { 
    USERCreateInterface,
    USEREditInterface,
    USERGenericInterface,
    USERResetPasswordInterface,
    USERViewInterface
} from '@/types/types-pages';
import { globalReducerFailed, globalReducerLoading, globalReducerRefreshed, globalReducerSuccess } from '../configureStore';

type UsersPayloads = 
string |
USERViewInterface[] | 
USERViewInterface | 
USERCreateInterface | 
USEREditInterface
;

interface CommonUsersState {
  status: string | null;
  progress: number;
  error: string | null; 
}



// USER SECTION // USER SECTION // USER SECTION // USER SECTION // USER SECTION 
interface USERViewState extends CommonUsersState{
  data: USERViewInterface[];
}

interface USERCreateState extends CommonUsersState{
  data: USERCreateInterface | {};
}

interface USEREditState extends CommonUsersState {
  data: USERViewState | [];
}

interface USERResetPasswordState extends CommonUsersState {
  data: string;
}


interface OverallUsersState {
  [key: string]: 
  USERViewState | 
  USERCreateState | 
  USEREditState ,
  //USER SECTION
  USERView: USERViewState,
  USERViewSpecific: USERViewState,
  USERCreate: USERCreateState,
  USEREdit: USEREditState,
  USERResetPassword: USERResetPasswordState
}

const initialState: OverallUsersState = {
  //USER SECTION
  USERView: {
    status: '',
    progress: 0,
    data: [],
    error: '',
  },
  USERViewSpecific: {
    status: '',
    progress: 0,
    data: [],
    error: '',
  },
  USERCreate: {
    status: '',
    progress: 0,
    data:[],
    error: '',
  },
  USEREdit: {
    status: '',
    progress: 0,
    data: [],
    error: '',
  },
  USERResetPassword: {
    status: '',
    progress: 0,
    data: '',
    error: '',
  },
};

const setLoadingState = (path: string) => (state: OverallUsersState) => {
  state[path].status = `${globalReducerLoading}`;
  state[path].data = [];
  state[path].error = null;
  state[path].progress = 0;
};

const setSuccessState = (state: OverallUsersState, payload: UsersPayloads, path: string) => {
  state[path].status = `${globalReducerSuccess}`;
  state[path].data = payload;
  state[path].error = null;
};

const setProgressState = (state: OverallUsersState, payload: number, path: string) => {
  state[path].progress = payload;
};

const setFailureState = (state: OverallUsersState, payload: string, path: string) => {
  state[path].status = `${globalReducerFailed}`;
  state[path].data = [];
  state[path].error = payload;
};


const setRefreshedState = (path: string) => (state: OverallUsersState) => {
  state[path].status = `${globalReducerRefreshed}`;
  state[path].data = [];
  state[path].error = null;
};


const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //USER SECTION
      .addCase(USERViewAction, setLoadingState("USERView"))
      .addCase(USERViewActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "USERView"))
      .addCase(USERViewActionProgress, (state, action) => setProgressState(state, action.payload, "USERView"))
      .addCase(USERViewActionFailure, (state, action) => setFailureState(state, action.payload, "USERView"))
      .addCase(USERViewSpecificAction, setLoadingState("USERViewSpecific"))
      .addCase(USERViewSpecificActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "USERViewSpecific"))
      .addCase(USERViewSpecificActionProgress, (state, action) => setProgressState(state, action.payload, "USERViewSpecific"))
      .addCase(USERViewSpecificActionFailure, (state, action) => setFailureState(state, action.payload, "USERViewSpecific"))
      .addCase(USERCreateAction, setLoadingState("USERCreate"))
      .addCase(USERCreateActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "USERCreate"))
      .addCase(USERCreateActionProgress, (state, action) => setProgressState(state, action.payload, "USERCreate"))
      .addCase(USERCreateActionFailure, (state, action) => setFailureState(state, action.payload, "USERCreate"))
      .addCase(USERCreateActionFailureCleanup, setRefreshedState("USERCreate"))
      .addCase(USEREditAction, setLoadingState("USEREdit"))
      .addCase(USEREditActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "USEREdit"))
      .addCase(USEREditActionProgress, (state, action) => setProgressState(state, action.payload, "USEREdit"))
      .addCase(USEREditActionFailure, (state, action) => setFailureState(state, action.payload, "USEREdit"))
      .addCase(USERResetPasswordAction, setLoadingState("USERResetPassword"))
      .addCase(USERResetPasswordActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "USERResetPassword"))
      .addCase(USERResetPasswordActionProgress, (state, action) => setProgressState(state, action.payload, "USERResetPassword"))
      .addCase(USERResetPasswordActionFailure, (state, action) => setFailureState(state, action.payload, "USERResetPassword"))
    },
});


export const usersReducer = usersSlice.reducer;