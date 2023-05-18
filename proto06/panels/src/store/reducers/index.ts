import { combineReducers } from '@reduxjs/toolkit';
import { authReducer } from './auth';
import { employeesReducer } from './employees';

export const rootReducer = combineReducers({
  auth: authReducer,
  employees: employeesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;