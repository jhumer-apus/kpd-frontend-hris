import { createAction } from '@reduxjs/toolkit';
import { 
    ViewAllDtrLogsType,
    ViewFilterDtrLogsType,
    ViewMergedDtrLogsType,
    ViewMergedFilterDtrLogsType,
    ViewCutoffDtrSummaryType,
 } from '@/types/types-store';

 import { DTRCutoffListType, DTRCutoffListEmployees } from '@/types/types-pages';


export const viewAllDtrLogs = createAction("VIEW_ALL_DTR_LOGS");
export const viewAllDtrLogsSuccess = createAction("VIEW_ALL_DTR_LOGS_SUCCESS", (allDtrLogs: Array<ViewAllDtrLogsType>) => { 
    return({ payload: {allDtrLogs} })});
export const viewAllDtrLogsFailure = createAction<string>("VIEW_ALL_DTR_LOGS_FAILURE");


export const viewFilterDtrLogs = createAction<{month: number, year: number, emp_no: number| null}>("VIEW_FILTER_DTR_LOGS");
export const viewFilterDtrLogsSuccess = createAction("VIEW_FILTER_DTR_LOGS_SUCCESS", (filterDtrLogs: Array<ViewFilterDtrLogsType>) => { 
    return({ payload: {filterDtrLogs} })});
export const viewFilterDtrLogsFailure = createAction<string>("VIEW_FILTER_DTR_LOGS_FAILURE");


export const viewMergedDtrLogs = createAction("VIEW_MERGED_DTR_LOGS");
export const viewMergedDtrLogsSuccess = createAction("VIEW_MERGED_DTR_LOGS_SUCCESS", (allMergedDtr: Array<ViewMergedDtrLogsType>) => {  
    return({ payload: {allMergedDtr} })});
export const viewMergedDtrLogsFailure = createAction<string>("VIEW_MERGED_DTR_LOGS_FAILURE");

export const viewFilterMergedDtrLogs = createAction<{cutoff_id: number | null, emp_no: number| null}>("VIEW_FILTER_MERGED_DTR_LOGS");
export const viewFilterMergedDtrLogsSuccess = createAction("VIEW_FILTER_MERGED_DTR_LOGS_SUCCESS", (allFilterMergedDtr: Array<ViewMergedFilterDtrLogsType>) => {  
    return({ payload: {allFilterMergedDtr} })});
export const viewFilterMergedDtrLogsFailure = createAction<string>("VIEW_FILTER_MERGED_DTR_LOGS_FAILURE");

export const viewCutoffDtrSummary = createAction<{cutoff_id: number | null, emp_no: number| null}>("VIEW_CUTOFF_DTR_SUMMARY");
export const viewCutoffDtrSummarySuccess = createAction("VIEW_CUTOFF_DTR_SUMMARY_SUCCESS", (allCutoffDtrSummary: Array<ViewCutoffDtrSummaryType>) => { 
    return({ payload: {allCutoffDtrSummary} })});
export const viewCutoffDtrSummaryFailure = createAction<string>("VIEW_CUTOFF_DTR_SUMMARY_FAILURE");



export const getCutoffList = createAction("GET_CUTOFF_LIST");
export const getCutoffListSuccess = createAction("GET_CUTOFF_LIST_SUCCESS", (DTRCutoffList: Array<DTRCutoffListType>) => { 
    return({ payload: {DTRCutoffList} })});
export const getCutoffListFailure = createAction<string>("GET_CUTOFF_LIST_FAILURE");




export const getCutoffListEmployee = createAction<{cutoff_period: number}>("GET_CUTOFF_LIST_EMPLOYEE");
export const getCutoffListEmployeeSuccess = createAction("GET_CUTOFF_LIST_EMPLOYEE_SUCCESS", (DTRCutoffListEmployees: Array<DTRCutoffListEmployees>) => { 
    return({ payload: {DTRCutoffListEmployees} })});
export const getCutoffListEmployeeFailure = createAction<string>("GET_CUTOFF_LIST_EMPLOYEE_FAILURE");

export const mergeCutoffListAndEmployee = createAction<{emp_no: number[], cutoff_code: number}>("MERGE_CUTOFF_LIST_AND_EMPLOYEE");
export const mergeCutoffListAndEmployeeSuccess = createAction("MERGE_CUTOFF_LIST_AND_EMPLOYEE_SUCCESS", (SuccessMessage: string) => { 
    return({ payload: {SuccessMessage} })});
export const mergeCutoffListAndEmployeeProgress = createAction<number>('MERGE_CUTOFF_LIST_AND_EMPLOYEE_PROGRESS');
export const mergeCutoffListAndEmployeeFailure = createAction<string>("MERGE_CUTOFF_LIST_AND_EMPLOYEE_FAILURE");
export const mergeCutoffListAndEmployeeFailureCleanup = createAction("MERGE_CUTOFF_LIST_AND_EMPLOYEE_FAILURE_CLEANUP");


export const summarizeCutoffListAndEmployee = createAction<{emp_no: number[], cutoff_code: number}>("SUMMARIZE_CUTOFF_LIST_AND_EMPLOYEE");
export const summarizeCutoffListAndEmployeeSuccess = createAction("SUMMARIZE_CUTOFF_LIST_AND_EMPLOYEE_SUCCESS", (SuccessMessage: string) => { 
    return({ payload: {SuccessMessage} })});
export const summarizeCutoffListAndEmployeeProgress = createAction<number>('SUMMARIZE_CUTOFF_LIST_AND_EMPLOYEE_PROGRESS');
export const summarizeCutoffListAndEmployeeFailure = createAction<string>("SUMMARIZE_CUTOFF_LIST_AND_EMPLOYEE_FAILURE");
export const summarizeCutoffListAndEmployeeFailureCleanup = createAction("SUMMARIZE_CUTOFF_LIST_AND_EMPLOYEE_FAILURE_CLEANUP");
