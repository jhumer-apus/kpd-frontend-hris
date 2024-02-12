import { createAction } from '@reduxjs/toolkit';
import * as _Type from '@/types/types-store';


export const getEmployeesList = createAction("GET_EMPLOYEES");
export const getEmployeesListSuccess = createAction("GET_EMPLOYEES_LIST_SUCCESS", (list: Array<_Type.EMPLOYEESViewInterface>) => { 
    return({ payload: {list} })});
export const getEmployeesListFailure = createAction<string>("GET_EMPLOYEES_LIST_FAILURE");


export const getSpecificEmployeeInfo = createAction<{employee_id: number}>("GET_SPECIFIC_EMPLOYEE_INFO");
export const getSpecificEmployeeInfoSuccess = createAction("GET_SPECIFIC_EMPLOYEE_INFO_SUCCESS", (list: _Type.EMPLOYEESViewInterface) => ({ payload: {list} }));
export const getSpecificEmployeeInfoFailure = createAction<string>("GET_SPECIFIC_EMPLOYEE_INFO_FAILURE");