import { createAction } from '@reduxjs/toolkit';
import { 
    HolidayGetType, 
    OBTCreateInterface, 
    OBTEditInterface, 
    OBTViewInterface, 
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


export const HolidaysGet = createAction("HOLIDAYS_GET");
export const HolidaysGetSuccess = createAction("HOLIDAYS_GET_SUCCESS", (SuccessMessage: HolidayGetType[]) => { 
    // console.log
    return({ payload: {SuccessMessage} })});
export const HolidaysGetProgress = createAction<number>("HOLIDAYS_GET_PROGRESS");
export const HolidaysGetFailure = createAction<string>("HOLIDAYS_GET_FAILURE");
export const HolidaysGetFailureCleanup = createAction("HOLIDAYS_GET_FAILURE_CLEANUP");


export const HolidayCreate = createAction<HolidayGetType>("HOLIDAY_CREATE");
export const HolidayCreateSuccess = createAction("HOLIDAY_CREATE_SUCCESS", (SuccessMessage: HolidayGetType) => { 
    // console.log
    return({ payload: {SuccessMessage} })
});
export const HolidayCreateProgress = createAction<number>("HOLIDAY_CREATE_PROGRESS");
export const HolidayCreateFailure = createAction<string>("HOLIDAY_CREATE_FAILURE");
export const HolidayCreateFailureCleanup = createAction("HOLIDAY_CREATE_FAILURE_CLEANUP");


export const HolidayEditSubmit = createAction<HolidayGetType>("HOLIDAY_EDIT_SUBMIT");
export const HolidayEditSubmitSuccess = createAction("HOLIDAY_EDIT_SUBMIT_SUCCESS", (SuccessMessage: HolidayGetType) => { 
    // console.log
    return({ payload: {SuccessMessage} })
});
export const HolidayEditSubmitProgress = createAction<number>("HOLIDAY_EDIT_SUBMIT_PROGRESS");
export const HolidayEditSubmitFailure = createAction<string>("HOLIDAY_EDIT_SUBMIT_FAILURE");
export const HolidayEditSubmitFailureCleanup = createAction("HOLIDAY_EDIT_SUBMIT_FAILURE_CLEANUP");


// OBT SECTION
export const OBTViewAction = createAction("OBT_VIEW_ACTION");
export const OBTViewActionSuccess = createAction("OBT_VIEW_ACTION_SUCCESS", (SuccessMessage: OBTViewInterface[]) => { 
    // console.log
    return({ payload: {SuccessMessage} })});
export const OBTViewActionProgress = createAction<number>("OBT_VIEW_ACTION_PROGRESS");
export const OBTViewActionFailure = createAction<string>("OBT_VIEW_ACTION_FAILURE");
export const OBTViewActionFailureCleanup = createAction("OBT_VIEW_ACTION_FAILURE_CLEANUP");


export const OBTViewFilterEmployeeAction = createAction<{emp_no: number}>("OBT_VIEW_FILTER_EMPLOYEE_ACTION");
export const OBTViewFilterEmployeeActionSuccess = createAction("OBT_VIEW_FILTER_EMPLOYEE_ACTION_SUCCESS", (SuccessMessage: OBTViewInterface[]) => { 
    // console.log
    return({ payload: {SuccessMessage} })});
export const OBTViewFilterEmployeeActionProgress = createAction<number>("OBT_VIEW_FILTER_EMPLOYEE_ACTION_PROGRESS");
export const OBTViewFilterEmployeeActionFailure = createAction<string>("OBT_VIEW_FILTER_EMPLOYEE_ACTION_FAILURE");
export const OBTViewFilterEmployeeActionFailureCleanup = createAction("OBT_VIEW_FILTER_EMPLOYEE_ACTION_FAILURE_CLEANUP");


export const OBTViewFilterEmployeeAndOBTAction = createAction<{emp_no: number, obt_id: number}>("OBT_VIEW_FILTER_EMPLOYEE_AND_OBT_ACTION");
export const OBTViewFilterEmployeeAndOBTActionSuccess = createAction("OBT_VIEW_FILTER_EMPLOYEE_AND_OBT_ACTION_SUCCESS", (SuccessMessage: OBTViewInterface) => { 
    // console.log
    return({ payload: {SuccessMessage} })});
export const OBTViewFilterEmployeeAndOBTActionProgress = createAction<number>("OBT_VIEW_FILTER_EMPLOYEE_AND_OBT_ACTION_PROGRESS");
export const OBTViewFilterEmployeeAndOBTActionFailure = createAction<string>("OBT_VIEW_FILTER_EMPLOYEE_AND_OBT_ACTION_FAILURE");
export const OBTViewFilterEmployeeAndOBTActionFailureCleanup = createAction("OBT_VIEW_FILTER_EMPLOYEE_AND_OBT_ACTION_FAILURE_CLEANUP");


export const OBTViewFilterApproverAction = createAction<{emp_no: number}>("OBT_VIEW_FILTER_APPROVER_ACTION");
export const OBTViewFilterApproverActionSuccess = createAction("OBT_VIEW_FILTER_APPROVER_ACTION_SUCCESS", (SuccessMessage: OBTViewInterface[]) => { 
    // console.log
    return({ payload: {SuccessMessage} })});
export const OBTViewFilterApproverActionProgress = createAction<number>("OBT_VIEW_FILTER_APPROVER_ACTION_PROGRESS");
export const OBTViewFilterApproverActionFailure = createAction<string>("OBT_VIEW_FILTER_APPROVER_ACTION_FAILURE");
export const OBTViewFilterApproverActionFailureCleanup = createAction("OBT_VIEW_FILTER_APPROVER_ACTION_FAILURE_CLEANUP");


export const OBTCreateAction = createAction<OBTCreateInterface>("OBT_CREATE_ACTION");
export const OBTCreateActionSuccess = createAction("OBT_CREATE_ACTION_SUCCESS", (SuccessMessage: OBTCreateInterface) => { 
    // console.log
    return({ payload: {SuccessMessage} })
});
export const OBTCreateActionProgress = createAction<number>("OBT_CREATE_ACTION_PROGRESS");
export const OBTCreateActionFailure = createAction<string>("OBT_CREATE_ACTION_FAILURE");
export const OBTCreateActionFailureCleanup = createAction("OBT_CREATE_ACTION_FAILURE_CLEANUP");

export const OBTEditAction = createAction<OBTViewInterface>("OBT_EDIT_ACTION");
export const OBTEditActionSuccess = createAction("OBT_EDIT_ACTION_SUCCESS", (SuccessMessage: OBTEditInterface) => { 
    // console.log
    return({ payload: {SuccessMessage} })
});
export const OBTEditActionProgress = createAction<number>("OBT_EDIT_ACTION_PROGRESS");
export const OBTEditActionFailure = createAction<string>("OBT_EDIT_ACTION_FAILURE");
export const OBTEditActionFailureCleanup = createAction("OBT_EDIT_ACTION_FAILURE_CLEANUP");



// OVERTIME SECTION // OVERTIME SECTION // OVERTIME SECTION // OVERTIME SECTION // OVERTIME SECTION // OVERTIME SECTION
export const OVERTIMEViewAction = createAction("OVERTIME_VIEW_ACTION");
export const OVERTIMEViewActionSuccess = createAction("OVERTIME_VIEW_ACTION_SUCCESS", (SuccessMessage: OVERTIMEViewInterface[]) => { 
    // console.log
    return({ payload: {SuccessMessage} })});
export const OVERTIMEViewActionProgress = createAction<number>("OVERTIME_VIEW_ACTION_PROGRESS");
export const OVERTIMEViewActionFailure = createAction<string>("OVERTIME_VIEW_ACTION_FAILURE");
export const OVERTIMEViewActionFailureCleanup = createAction("OVERTIME_VIEW_ACTION_FAILURE_CLEANUP");


export const OVERTIMEViewFilterEmployeeAction = createAction<{emp_no: number}>("OVERTIME_VIEW_FILTER_EMPLOYEE_ACTION");
export const OVERTIMEViewFilterEmployeeActionSuccess = createAction("OVERTIME_VIEW_FILTER_EMPLOYEE_ACTION_SUCCESS", (SuccessMessage: OVERTIMEViewInterface[]) => { 
    // console.log
    return({ payload: {SuccessMessage} })});
export const OVERTIMEViewFilterEmployeeActionProgress = createAction<number>("OVERTIME_VIEW_FILTER_EMPLOYEE_ACTION_PROGRESS");
export const OVERTIMEViewFilterEmployeeActionFailure = createAction<string>("OVERTIME_VIEW_FILTER_EMPLOYEE_ACTION_FAILURE");
export const OVERTIMEViewFilterEmployeeActionFailureCleanup = createAction("OVERTIME_VIEW_FILTER_EMPLOYEE_ACTION_FAILURE_CLEANUP");


export const OVERTIMEViewFilterEmployeeAndOVERTIMEAction = createAction<{emp_no: number, ot_id: number}>("OVERTIME_VIEW_FILTER_EMPLOYEE_AND_OVERTIME_ACTION");
export const OVERTIMEViewFilterEmployeeAndOVERTIMEActionSuccess = createAction("OVERTIME_VIEW_FILTER_EMPLOYEE_AND_OVERTIME_ACTION_SUCCESS", (SuccessMessage: OVERTIMEViewInterface) => { 
    // console.log
    return({ payload: {SuccessMessage} })});
export const OVERTIMEViewFilterEmployeeAndOVERTIMEActionProgress = createAction<number>("OVERTIME_VIEW_FILTER_EMPLOYEE_AND_OVERTIME_ACTION_PROGRESS");
export const OVERTIMEViewFilterEmployeeAndOVERTIMEActionFailure = createAction<string>("OVERTIME_VIEW_FILTER_EMPLOYEE_AND_OVERTIME_ACTION_FAILURE");
export const OVERTIMEViewFilterEmployeeAndOVERTIMEActionFailureCleanup = createAction("OVERTIME_VIEW_FILTER_EMPLOYEE_AND_OVERTIME_ACTION_FAILURE_CLEANUP");


export const OVERTIMEViewFilterApproverAction = createAction<{emp_no: number}>("OVERTIME_VIEW_FILTER_APPROVER_ACTION");
export const OVERTIMEViewFilterApproverActionSuccess = createAction("OVERTIME_VIEW_FILTER_APPROVER_ACTION_SUCCESS", (SuccessMessage: OVERTIMEViewInterface[]) => { 
    // console.log
    return({ payload: {SuccessMessage} })});
export const OVERTIMEViewFilterApproverActionProgress = createAction<number>("OVERTIME_VIEW_FILTER_APPROVER_ACTION_PROGRESS");
export const OVERTIMEViewFilterApproverActionFailure = createAction<string>("OVERTIME_VIEW_FILTER_APPROVER_ACTION_FAILURE");
export const OVERTIMEViewFilterApproverActionFailureCleanup = createAction("OVERTIME_VIEW_FILTER_APPROVER_ACTION_FAILURE_CLEANUP");


export const OVERTIMECreateAction = createAction<OVERTIMECreateInterface>("OVERTIME_CREATE_ACTION");
export const OVERTIMECreateActionSuccess = createAction("OVERTIME_CREATE_ACTION_SUCCESS", (SuccessMessage: OVERTIMECreateInterface) => { 
    // console.log
    return({ payload: {SuccessMessage} })
});
export const OVERTIMECreateActionProgress = createAction<number>("OVERTIME_CREATE_ACTION_PROGRESS");
export const OVERTIMECreateActionFailure = createAction<string>("OVERTIME_CREATE_ACTION_FAILURE");
export const OVERTIMECreateActionFailureCleanup = createAction("OVERTIME_CREATE_ACTION_FAILURE_CLEANUP");

export const OVERTIMEEditAction = createAction<OVERTIMEViewInterface>("OVERTIME_EDIT_ACTION");
export const OVERTIMEEditActionSuccess = createAction("OVERTIME_EDIT_ACTION_SUCCESS", (SuccessMessage: OVERTIMEEditInterface) => { 
    // console.log
    return({ payload: {SuccessMessage} })
});
export const OVERTIMEEditActionProgress = createAction<number>("OVERTIME_EDIT_ACTION_PROGRESS");
export const OVERTIMEEditActionFailure = createAction<string>("OVERTIME_EDIT_ACTION_FAILURE");
export const OVERTIMEEditActionFailureCleanup = createAction("OVERTIME_EDIT_ACTION_FAILURE_CLEANUP");


// LEAVE SECTION // LEAVE SECTION // LEAVE SECTION // LEAVE SECTION // LEAVE SECTION // LEAVE SECTION
export const LEAVEViewAction = createAction("LEAVE_VIEW_ACTION");
export const LEAVEViewActionSuccess = createAction("LEAVE_VIEW_ACTION_SUCCESS", (SuccessMessage: LEAVEViewInterface[]) => { 
    // console.log
    return({ payload: {SuccessMessage} })});
export const LEAVEViewActionProgress = createAction<number>("LEAVE_VIEW_ACTION_PROGRESS");
export const LEAVEViewActionFailure = createAction<string>("LEAVE_VIEW_ACTION_FAILURE");
export const LEAVEViewActionFailureCleanup = createAction("LEAVE_VIEW_ACTION_FAILURE_CLEANUP");


export const LEAVEViewFilterEmployeeAction = createAction<{emp_no: number}>("LEAVE_VIEW_FILTER_EMPLOYEE_ACTION");
export const LEAVEViewFilterEmployeeActionSuccess = createAction("LEAVE_VIEW_FILTER_EMPLOYEE_ACTION_SUCCESS", (SuccessMessage: LEAVEViewInterface[]) => { 
    // console.log
    return({ payload: {SuccessMessage} })});
export const LEAVEViewFilterEmployeeActionProgress = createAction<number>("LEAVE_VIEW_FILTER_EMPLOYEE_ACTION_PROGRESS");
export const LEAVEViewFilterEmployeeActionFailure = createAction<string>("LEAVE_VIEW_FILTER_EMPLOYEE_ACTION_FAILURE");
export const LEAVEViewFilterEmployeeActionFailureCleanup = createAction("LEAVE_VIEW_FILTER_EMPLOYEE_ACTION_FAILURE_CLEANUP");


export const LEAVEViewFilterEmployeeAndLEAVEAction = createAction<{emp_no: number, lv_id: number}>("LEAVE_VIEW_FILTER_EMPLOYEE_AND_LEAVE_ACTION");
export const LEAVEViewFilterEmployeeAndLEAVEActionSuccess = createAction("LEAVE_VIEW_FILTER_EMPLOYEE_AND_LEAVE_ACTION_SUCCESS", (SuccessMessage: LEAVEViewInterface) => { 
    // console.log
    return({ payload: {SuccessMessage} })});
export const LEAVEViewFilterEmployeeAndLEAVEActionProgress = createAction<number>("LEAVE_VIEW_FILTER_EMPLOYEE_AND_LEAVE_ACTION_PROGRESS");
export const LEAVEViewFilterEmployeeAndLEAVEActionFailure = createAction<string>("LEAVE_VIEW_FILTER_EMPLOYEE_AND_LEAVE_ACTION_FAILURE");
export const LEAVEViewFilterEmployeeAndLEAVEActionFailureCleanup = createAction("LEAVE_VIEW_FILTER_EMPLOYEE_AND_LEAVE_ACTION_FAILURE_CLEANUP");


export const LEAVEViewFilterApproverAction = createAction<{emp_no: number}>("LEAVE_VIEW_FILTER_APPROVER_ACTION");
export const LEAVEViewFilterApproverActionSuccess = createAction("LEAVE_VIEW_FILTER_APPROVER_ACTION_SUCCESS", (SuccessMessage: LEAVEViewInterface[]) => { 
    // console.log
    return({ payload: {SuccessMessage} })});
export const LEAVEViewFilterApproverActionProgress = createAction<number>("LEAVE_VIEW_FILTER_APPROVER_ACTION_PROGRESS");
export const LEAVEViewFilterApproverActionFailure = createAction<string>("LEAVE_VIEW_FILTER_APPROVER_ACTION_FAILURE");
export const LEAVEViewFilterApproverActionFailureCleanup = createAction("LEAVE_VIEW_FILTER_APPROVER_ACTION_FAILURE_CLEANUP");


export const LEAVECreateAction = createAction<LEAVECreateInterface>("LEAVE_CREATE_ACTION");
export const LEAVECreateActionSuccess = createAction("LEAVE_CREATE_ACTION_SUCCESS", (SuccessMessage: LEAVECreateInterface) => { 
    // console.log
    return({ payload: {SuccessMessage} })
});
export const LEAVECreateActionProgress = createAction<number>("LEAVE_CREATE_ACTION_PROGRESS");
export const LEAVECreateActionFailure = createAction<string>("LEAVE_CREATE_ACTION_FAILURE");
export const LEAVECreateActionFailureCleanup = createAction("LEAVE_CREATE_ACTION_FAILURE_CLEANUP");

export const LEAVEEditAction = createAction<LEAVEViewInterface>("LEAVE_EDIT_ACTION");
export const LEAVEEditActionSuccess = createAction("LEAVE_EDIT_ACTION_SUCCESS", (SuccessMessage: LEAVEEditInterface) => { 
    // console.log
    return({ payload: {SuccessMessage} })
});
export const LEAVEEditActionProgress = createAction<number>("LEAVE_EDIT_ACTION_PROGRESS");
export const LEAVEEditActionFailure = createAction<string>("LEAVE_EDIT_ACTION_FAILURE");
export const LEAVEEditActionFailureCleanup = createAction("LEAVE_EDIT_ACTION_FAILURE_CLEANUP");


// UA SECTION // UA SECTION // UA SECTION // UA SECTION // UA SECTION // UA SECTION
export const UAViewAction = createAction("UA_VIEW_ACTION");
export const UAViewActionSuccess = createAction("UA_VIEW_ACTION_SUCCESS", (SuccessMessage: UAViewInterface[]) => { 
    // console.log
    return({ payload: {SuccessMessage} })});
export const UAViewActionProgress = createAction<number>("UA_VIEW_ACTION_PROGRESS");
export const UAViewActionFailure = createAction<string>("UA_VIEW_ACTION_FAILURE");
export const UAViewActionFailureCleanup = createAction("UA_VIEW_ACTION_FAILURE_CLEANUP");


export const UAViewFilterEmployeeAction = createAction<{emp_no: number}>("UA_VIEW_FILTER_EMPLOYEE_ACTION");
export const UAViewFilterEmployeeActionSuccess = createAction("UA_VIEW_FILTER_EMPLOYEE_ACTION_SUCCESS", (SuccessMessage: UAViewInterface[]) => { 
    // console.log
    return({ payload: {SuccessMessage} })});
export const UAViewFilterEmployeeActionProgress = createAction<number>("UA_VIEW_FILTER_EMPLOYEE_ACTION_PROGRESS");
export const UAViewFilterEmployeeActionFailure = createAction<string>("UA_VIEW_FILTER_EMPLOYEE_ACTION_FAILURE");
export const UAViewFilterEmployeeActionFailureCleanup = createAction("UA_VIEW_FILTER_EMPLOYEE_ACTION_FAILURE_CLEANUP");


export const UAViewFilterEmployeeAndUAAction = createAction<{emp_no: number, ua_id: number}>("UA_VIEW_FILTER_EMPLOYEE_AND_UA_ACTION");
export const UAViewFilterEmployeeAndUAActionSuccess = createAction("UA_VIEW_FILTER_EMPLOYEE_AND_UA_ACTION_SUCCESS", (SuccessMessage: UAViewInterface) => { 
    // console.log
    return({ payload: {SuccessMessage} })});
export const UAViewFilterEmployeeAndUAActionProgress = createAction<number>("UA_VIEW_FILTER_EMPLOYEE_AND_UA_ACTION_PROGRESS");
export const UAViewFilterEmployeeAndUAActionFailure = createAction<string>("UA_VIEW_FILTER_EMPLOYEE_AND_UA_ACTION_FAILURE");
export const UAViewFilterEmployeeAndUAActionFailureCleanup = createAction("UA_VIEW_FILTER_EMPLOYEE_AND_UA_ACTION_FAILURE_CLEANUP");


export const UAViewFilterApproverAction = createAction<{emp_no: number}>("UA_VIEW_FILTER_APPROVER_ACTION");
export const UAViewFilterApproverActionSuccess = createAction("UA_VIEW_FILTER_APPROVER_ACTION_SUCCESS", (SuccessMessage: UAViewInterface[]) => { 
    // console.log
    return({ payload: {SuccessMessage} })});
export const UAViewFilterApproverActionProgress = createAction<number>("UA_VIEW_FILTER_APPROVER_ACTION_PROGRESS");
export const UAViewFilterApproverActionFailure = createAction<string>("UA_VIEW_FILTER_APPROVER_ACTION_FAILURE");
export const UAViewFilterApproverActionFailureCleanup = createAction("UA_VIEW_FILTER_APPROVER_ACTION_FAILURE_CLEANUP");


export const UACreateAction = createAction<UACreateInterface>("UA_CREATE_ACTION");
export const UACreateActionSuccess = createAction("UA_CREATE_ACTION_SUCCESS", (SuccessMessage: UACreateInterface) => { 
    // console.log
    return({ payload: {SuccessMessage} })
});
export const UACreateActionProgress = createAction<number>("UA_CREATE_ACTION_PROGRESS");
export const UACreateActionFailure = createAction<string>("UA_CREATE_ACTION_FAILURE");
export const UACreateActionFailureCleanup = createAction("UA_CREATE_ACTION_FAILURE_CLEANUP");

export const UAEditAction = createAction<UAViewInterface>("UA_EDIT_ACTION");
export const UAEditActionSuccess = createAction("UA_EDIT_ACTION_SUCCESS", (SuccessMessage: UAEditInterface) => { 
    // console.log
    return({ payload: {SuccessMessage} })
});
export const UAEditActionProgress = createAction<number>("UA_EDIT_ACTION_PROGRESS");
export const UAEditActionFailure = createAction<string>("UA_EDIT_ACTION_FAILURE");
export const UAEditActionFailureCleanup = createAction("UA_EDIT_ACTION_FAILURE_CLEANUP");