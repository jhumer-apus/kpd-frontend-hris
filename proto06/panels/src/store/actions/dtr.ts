import { createAction } from '@reduxjs/toolkit';
import { 
    ViewAllDtrLogsType,
    ViewMergedDtrLogsType,
    ViewCutoffDtrSummaryType,
 } from '@/types/types-store';


export const viewAllDtrLogs = createAction("VIEW_ALL_DTR_LOGS");
export const viewAllDtrLogsSuccess = createAction("VIEW_ALL_DTR_LOGS_SUCCESS", (allDtrLogs: Array<ViewAllDtrLogsType>) => { 
    // console.log
    return({ payload: {allDtrLogs} })});
export const viewAllDtrLogsFailure = createAction<string>("VIEW_ALL_DTR_LOGS_FAILURE");


export const viewMergedDtrLogs = createAction("VIEW_MERGED_DTR_LOGS");
export const viewMergedDtrLogsSuccess = createAction("VIEW_MERGED_DTR_LOGS_SUCCESS", (allMergedDtr: Array<ViewMergedDtrLogsType>) => { 
    // console.log 
    return({ payload: {allMergedDtr} })});
export const viewMergedDtrLogsFailure = createAction<string>("VIEW_MERGED_DTR_LOGS_FAILURE");


export const viewCutoffDtrSummary = createAction("VIEW_CUTOFF_DTR_SUMMARY");
export const viewCutoffDtrSummarySuccess = createAction("VIEW_CUTOFF_DTR_SUMMARY_SUCCESS", (allCutoffDtrSummary: Array<ViewCutoffDtrSummaryType>) => { 
    // console.log
    return({ payload: {allCutoffDtrSummary} })});
export const viewCutoffDtrSummaryFailure = createAction<string>("VIEW_CUTOFF_DTR_SUMMARY_FAILURE");




// export const getSpecificEmployeeInfo = createAction<{employee_id: number}>("GET_SPECIFIC_EMPLOYEE_INFO");
// export const getSpecificEmployeeInfoSuccess = createAction("GET_SPECIFIC_EMPLOYEE_INFO_SUCCESS", (list: EmployeeDetailsType) => ({ payload: {list} }));
// export const getSpecificEmployeeInfoFailure = createAction<String>("GET_SPECIFIC_EMPLOYEE_INFO_FAILURE");