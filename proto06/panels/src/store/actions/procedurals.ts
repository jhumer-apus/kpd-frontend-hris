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
    LEAVECREDITCreateInterface, 
    LEAVECREDITEditInterface, 
    LEAVECREDITViewInterface, 
    LEAVETYPECreateInterface, 
    LEAVETYPEEditInterface, 
    LEAVETYPEViewInterface, 
    CUTOFFPERIODCreateInterface, 
    CUTOFFPERIODEditInterface, 
    CUTOFFPERIODViewInterface, 
    SCHEDULESHIFTCreateInterface, 
    SCHEDULESHIFTEditInterface, 
    SCHEDULESHIFTViewInterface, 
    SCHEDULEDAILYCreateInterface, 
    SCHEDULEDAILYEditInterface, 
    SCHEDULEDAILYViewInterface, 
} from '@/types/types-pages';


export const HolidaysGet = createAction("HOLIDAYS_GET");
export const HolidaysGetSuccess = createAction("HOLIDAYS_GET_SUCCESS", (SuccessMessage: HolidayGetType[]) => { 
    return({ payload: {SuccessMessage} })});
export const HolidaysGetProgress = createAction<number>("HOLIDAYS_GET_PROGRESS");
export const HolidaysGetFailure = createAction<string>("HOLIDAYS_GET_FAILURE");
export const HolidaysGetFailureCleanup = createAction("HOLIDAYS_GET_FAILURE_CLEANUP");


export const HolidayCreate = createAction<HolidayGetType>("HOLIDAY_CREATE");
export const HolidayCreateSuccess = createAction("HOLIDAY_CREATE_SUCCESS", (SuccessMessage: HolidayGetType) => { 
    return({ payload: {SuccessMessage} })
});
export const HolidayCreateProgress = createAction<number>("HOLIDAY_CREATE_PROGRESS");
export const HolidayCreateFailure = createAction<string>("HOLIDAY_CREATE_FAILURE");
export const HolidayCreateFailureCleanup = createAction("HOLIDAY_CREATE_FAILURE_CLEANUP");


export const HolidayEditSubmit = createAction<HolidayGetType>("HOLIDAY_EDIT_SUBMIT");
export const HolidayEditSubmitSuccess = createAction("HOLIDAY_EDIT_SUBMIT_SUCCESS", (SuccessMessage: HolidayGetType) => { 
    return({ payload: {SuccessMessage} })
});
export const HolidayEditSubmitProgress = createAction<number>("HOLIDAY_EDIT_SUBMIT_PROGRESS");
export const HolidayEditSubmitFailure = createAction<string>("HOLIDAY_EDIT_SUBMIT_FAILURE");
export const HolidayEditSubmitFailureCleanup = createAction("HOLIDAY_EDIT_SUBMIT_FAILURE_CLEANUP");


// OBT SECTION
export const OBTViewAction = createAction("OBT_VIEW_ACTION");
export const OBTViewActionSuccess = createAction("OBT_VIEW_ACTION_SUCCESS", (SuccessMessage: OBTViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const OBTViewActionProgress = createAction<number>("OBT_VIEW_ACTION_PROGRESS");
export const OBTViewActionFailure = createAction<string>("OBT_VIEW_ACTION_FAILURE");
export const OBTViewActionFailureCleanup = createAction("OBT_VIEW_ACTION_FAILURE_CLEANUP");


export const OBTViewFilterEmployeeAction = createAction<{emp_no: number}>("OBT_VIEW_FILTER_EMPLOYEE_ACTION");
export const OBTViewFilterEmployeeActionSuccess = createAction("OBT_VIEW_FILTER_EMPLOYEE_ACTION_SUCCESS", (SuccessMessage: OBTViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const OBTViewFilterEmployeeActionProgress = createAction<number>("OBT_VIEW_FILTER_EMPLOYEE_ACTION_PROGRESS");
export const OBTViewFilterEmployeeActionFailure = createAction<string>("OBT_VIEW_FILTER_EMPLOYEE_ACTION_FAILURE");
export const OBTViewFilterEmployeeActionFailureCleanup = createAction("OBT_VIEW_FILTER_EMPLOYEE_ACTION_FAILURE_CLEANUP");


export const OBTViewFilterEmployeeAndOBTAction = createAction<{emp_no: number, obt_id: number}>("OBT_VIEW_FILTER_EMPLOYEE_AND_OBT_ACTION");
export const OBTViewFilterEmployeeAndOBTActionSuccess = createAction("OBT_VIEW_FILTER_EMPLOYEE_AND_OBT_ACTION_SUCCESS", (SuccessMessage: OBTViewInterface) => { 
    return({ payload: {SuccessMessage} })});
export const OBTViewFilterEmployeeAndOBTActionProgress = createAction<number>("OBT_VIEW_FILTER_EMPLOYEE_AND_OBT_ACTION_PROGRESS");
export const OBTViewFilterEmployeeAndOBTActionFailure = createAction<string>("OBT_VIEW_FILTER_EMPLOYEE_AND_OBT_ACTION_FAILURE");
export const OBTViewFilterEmployeeAndOBTActionFailureCleanup = createAction("OBT_VIEW_FILTER_EMPLOYEE_AND_OBT_ACTION_FAILURE_CLEANUP");


export const OBTViewFilterApproverAction = createAction<{emp_no: number}>("OBT_VIEW_FILTER_APPROVER_ACTION");
export const OBTViewFilterApproverActionSuccess = createAction("OBT_VIEW_FILTER_APPROVER_ACTION_SUCCESS", (SuccessMessage: OBTViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const OBTViewFilterApproverActionProgress = createAction<number>("OBT_VIEW_FILTER_APPROVER_ACTION_PROGRESS");
export const OBTViewFilterApproverActionFailure = createAction<string>("OBT_VIEW_FILTER_APPROVER_ACTION_FAILURE");
export const OBTViewFilterApproverActionFailureCleanup = createAction("OBT_VIEW_FILTER_APPROVER_ACTION_FAILURE_CLEANUP");


export const OBTCreateAction = createAction<OBTCreateInterface>("OBT_CREATE_ACTION");
export const OBTCreateActionSuccess = createAction("OBT_CREATE_ACTION_SUCCESS", (SuccessMessage: OBTCreateInterface) => { 
    return({ payload: {SuccessMessage} })
});
export const OBTCreateActionProgress = createAction<number>("OBT_CREATE_ACTION_PROGRESS");
export const OBTCreateActionFailure = createAction<string>("OBT_CREATE_ACTION_FAILURE");
export const OBTCreateActionFailureCleanup = createAction("OBT_CREATE_ACTION_FAILURE_CLEANUP");

export const OBTEditAction = createAction<OBTViewInterface>("OBT_EDIT_ACTION");
export const OBTEditActionSuccess = createAction("OBT_EDIT_ACTION_SUCCESS", (SuccessMessage: OBTEditInterface) => { 
    return({ payload: {SuccessMessage} })
});
export const OBTEditActionProgress = createAction<number>("OBT_EDIT_ACTION_PROGRESS");
export const OBTEditActionFailure = createAction<string>("OBT_EDIT_ACTION_FAILURE");
export const OBTEditActionFailureCleanup = createAction("OBT_EDIT_ACTION_FAILURE_CLEANUP");



// OVERTIME SECTION // OVERTIME SECTION // OVERTIME SECTION // OVERTIME SECTION // OVERTIME SECTION // OVERTIME SECTION
export const OVERTIMEViewAction = createAction("OVERTIME_VIEW_ACTION");
export const OVERTIMEViewActionSuccess = createAction("OVERTIME_VIEW_ACTION_SUCCESS", (SuccessMessage: OVERTIMEViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const OVERTIMEViewActionProgress = createAction<number>("OVERTIME_VIEW_ACTION_PROGRESS");
export const OVERTIMEViewActionFailure = createAction<string>("OVERTIME_VIEW_ACTION_FAILURE");
export const OVERTIMEViewActionFailureCleanup = createAction("OVERTIME_VIEW_ACTION_FAILURE_CLEANUP");


export const OVERTIMEViewFilterEmployeeAction = createAction<{emp_no: number}>("OVERTIME_VIEW_FILTER_EMPLOYEE_ACTION");
export const OVERTIMEViewFilterEmployeeActionSuccess = createAction("OVERTIME_VIEW_FILTER_EMPLOYEE_ACTION_SUCCESS", (SuccessMessage: OVERTIMEViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const OVERTIMEViewFilterEmployeeActionProgress = createAction<number>("OVERTIME_VIEW_FILTER_EMPLOYEE_ACTION_PROGRESS");
export const OVERTIMEViewFilterEmployeeActionFailure = createAction<string>("OVERTIME_VIEW_FILTER_EMPLOYEE_ACTION_FAILURE");
export const OVERTIMEViewFilterEmployeeActionFailureCleanup = createAction("OVERTIME_VIEW_FILTER_EMPLOYEE_ACTION_FAILURE_CLEANUP");


export const OVERTIMEViewFilterEmployeeAndOVERTIMEAction = createAction<{emp_no: number, ot_id: number}>("OVERTIME_VIEW_FILTER_EMPLOYEE_AND_OVERTIME_ACTION");
export const OVERTIMEViewFilterEmployeeAndOVERTIMEActionSuccess = createAction("OVERTIME_VIEW_FILTER_EMPLOYEE_AND_OVERTIME_ACTION_SUCCESS", (SuccessMessage: OVERTIMEViewInterface) => { 
    return({ payload: {SuccessMessage} })});
export const OVERTIMEViewFilterEmployeeAndOVERTIMEActionProgress = createAction<number>("OVERTIME_VIEW_FILTER_EMPLOYEE_AND_OVERTIME_ACTION_PROGRESS");
export const OVERTIMEViewFilterEmployeeAndOVERTIMEActionFailure = createAction<string>("OVERTIME_VIEW_FILTER_EMPLOYEE_AND_OVERTIME_ACTION_FAILURE");
export const OVERTIMEViewFilterEmployeeAndOVERTIMEActionFailureCleanup = createAction("OVERTIME_VIEW_FILTER_EMPLOYEE_AND_OVERTIME_ACTION_FAILURE_CLEANUP");


export const OVERTIMEViewFilterApproverAction = createAction<{emp_no: number}>("OVERTIME_VIEW_FILTER_APPROVER_ACTION");
export const OVERTIMEViewFilterApproverActionSuccess = createAction("OVERTIME_VIEW_FILTER_APPROVER_ACTION_SUCCESS", (SuccessMessage: OVERTIMEViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const OVERTIMEViewFilterApproverActionProgress = createAction<number>("OVERTIME_VIEW_FILTER_APPROVER_ACTION_PROGRESS");
export const OVERTIMEViewFilterApproverActionFailure = createAction<string>("OVERTIME_VIEW_FILTER_APPROVER_ACTION_FAILURE");
export const OVERTIMEViewFilterApproverActionFailureCleanup = createAction("OVERTIME_VIEW_FILTER_APPROVER_ACTION_FAILURE_CLEANUP");


export const OVERTIMECreateAction = createAction<OVERTIMECreateInterface>("OVERTIME_CREATE_ACTION");
export const OVERTIMECreateActionSuccess = createAction("OVERTIME_CREATE_ACTION_SUCCESS", (SuccessMessage: OVERTIMECreateInterface) => { 
    return({ payload: {SuccessMessage} })
});
export const OVERTIMECreateActionProgress = createAction<number>("OVERTIME_CREATE_ACTION_PROGRESS");
export const OVERTIMECreateActionFailure = createAction<string>("OVERTIME_CREATE_ACTION_FAILURE");
export const OVERTIMECreateActionFailureCleanup = createAction("OVERTIME_CREATE_ACTION_FAILURE_CLEANUP");

export const OVERTIMEEditAction = createAction<OVERTIMEViewInterface>("OVERTIME_EDIT_ACTION");
export const OVERTIMEEditActionSuccess = createAction("OVERTIME_EDIT_ACTION_SUCCESS", (SuccessMessage: OVERTIMEEditInterface) => { 
    return({ payload: {SuccessMessage} })
});
export const OVERTIMEEditActionProgress = createAction<number>("OVERTIME_EDIT_ACTION_PROGRESS");
export const OVERTIMEEditActionFailure = createAction<string>("OVERTIME_EDIT_ACTION_FAILURE");
export const OVERTIMEEditActionFailureCleanup = createAction("OVERTIME_EDIT_ACTION_FAILURE_CLEANUP");


// LEAVE SECTION // LEAVE SECTION // LEAVE SECTION // LEAVE SECTION // LEAVE SECTION // LEAVE SECTION
export const LEAVEViewAction = createAction("LEAVE_VIEW_ACTION");
export const LEAVEViewActionSuccess = createAction("LEAVE_VIEW_ACTION_SUCCESS", (SuccessMessage: LEAVEViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const LEAVEViewActionProgress = createAction<number>("LEAVE_VIEW_ACTION_PROGRESS");
export const LEAVEViewActionFailure = createAction<string>("LEAVE_VIEW_ACTION_FAILURE");
export const LEAVEViewActionFailureCleanup = createAction("LEAVE_VIEW_ACTION_FAILURE_CLEANUP");


export const LEAVEViewFilterEmployeeAction = createAction<{emp_no: number}>("LEAVE_VIEW_FILTER_EMPLOYEE_ACTION");
export const LEAVEViewFilterEmployeeActionSuccess = createAction("LEAVE_VIEW_FILTER_EMPLOYEE_ACTION_SUCCESS", (SuccessMessage: LEAVEViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const LEAVEViewFilterEmployeeActionProgress = createAction<number>("LEAVE_VIEW_FILTER_EMPLOYEE_ACTION_PROGRESS");
export const LEAVEViewFilterEmployeeActionFailure = createAction<string>("LEAVE_VIEW_FILTER_EMPLOYEE_ACTION_FAILURE");
export const LEAVEViewFilterEmployeeActionFailureCleanup = createAction("LEAVE_VIEW_FILTER_EMPLOYEE_ACTION_FAILURE_CLEANUP");


export const LEAVEViewFilterEmployeeAndLEAVEAction = createAction<{emp_no: number, lv_id: number}>("LEAVE_VIEW_FILTER_EMPLOYEE_AND_LEAVE_ACTION");
export const LEAVEViewFilterEmployeeAndLEAVEActionSuccess = createAction("LEAVE_VIEW_FILTER_EMPLOYEE_AND_LEAVE_ACTION_SUCCESS", (SuccessMessage: LEAVEViewInterface) => { 
    return({ payload: {SuccessMessage} })});
export const LEAVEViewFilterEmployeeAndLEAVEActionProgress = createAction<number>("LEAVE_VIEW_FILTER_EMPLOYEE_AND_LEAVE_ACTION_PROGRESS");
export const LEAVEViewFilterEmployeeAndLEAVEActionFailure = createAction<string>("LEAVE_VIEW_FILTER_EMPLOYEE_AND_LEAVE_ACTION_FAILURE");
export const LEAVEViewFilterEmployeeAndLEAVEActionFailureCleanup = createAction("LEAVE_VIEW_FILTER_EMPLOYEE_AND_LEAVE_ACTION_FAILURE_CLEANUP");


export const LEAVEViewFilterApproverAction = createAction<{emp_no: number}>("LEAVE_VIEW_FILTER_APPROVER_ACTION");
export const LEAVEViewFilterApproverActionSuccess = createAction("LEAVE_VIEW_FILTER_APPROVER_ACTION_SUCCESS", (SuccessMessage: LEAVEViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const LEAVEViewFilterApproverActionProgress = createAction<number>("LEAVE_VIEW_FILTER_APPROVER_ACTION_PROGRESS");
export const LEAVEViewFilterApproverActionFailure = createAction<string>("LEAVE_VIEW_FILTER_APPROVER_ACTION_FAILURE");
export const LEAVEViewFilterApproverActionFailureCleanup = createAction("LEAVE_VIEW_FILTER_APPROVER_ACTION_FAILURE_CLEANUP");


export const LEAVECreateAction = createAction<LEAVECreateInterface>("LEAVE_CREATE_ACTION");
export const LEAVECreateActionSuccess = createAction("LEAVE_CREATE_ACTION_SUCCESS", (SuccessMessage: LEAVECreateInterface) => { 
    return({ payload: {SuccessMessage} })
});
export const LEAVECreateActionProgress = createAction<number>("LEAVE_CREATE_ACTION_PROGRESS");
export const LEAVECreateActionFailure = createAction<string>("LEAVE_CREATE_ACTION_FAILURE");
export const LEAVECreateActionFailureCleanup = createAction("LEAVE_CREATE_ACTION_FAILURE_CLEANUP");

export const LEAVEEditAction = createAction<LEAVEViewInterface>("LEAVE_EDIT_ACTION");
export const LEAVEEditActionSuccess = createAction("LEAVE_EDIT_ACTION_SUCCESS", (SuccessMessage: LEAVEEditInterface) => { 
    return({ payload: {SuccessMessage} })
});
export const LEAVEEditActionProgress = createAction<number>("LEAVE_EDIT_ACTION_PROGRESS");
export const LEAVEEditActionFailure = createAction<string>("LEAVE_EDIT_ACTION_FAILURE");
export const LEAVEEditActionFailureCleanup = createAction("LEAVE_EDIT_ACTION_FAILURE_CLEANUP");


// UA SECTION // UA SECTION // UA SECTION // UA SECTION // UA SECTION // UA SECTION
export const UAViewAction = createAction("UA_VIEW_ACTION");
export const UAViewActionSuccess = createAction("UA_VIEW_ACTION_SUCCESS", (SuccessMessage: UAViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const UAViewActionProgress = createAction<number>("UA_VIEW_ACTION_PROGRESS");
export const UAViewActionFailure = createAction<string>("UA_VIEW_ACTION_FAILURE");
export const UAViewActionFailureCleanup = createAction("UA_VIEW_ACTION_FAILURE_CLEANUP");


export const UAViewFilterEmployeeAction = createAction<{emp_no: number}>("UA_VIEW_FILTER_EMPLOYEE_ACTION");
export const UAViewFilterEmployeeActionSuccess = createAction("UA_VIEW_FILTER_EMPLOYEE_ACTION_SUCCESS", (SuccessMessage: UAViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const UAViewFilterEmployeeActionProgress = createAction<number>("UA_VIEW_FILTER_EMPLOYEE_ACTION_PROGRESS");
export const UAViewFilterEmployeeActionFailure = createAction<string>("UA_VIEW_FILTER_EMPLOYEE_ACTION_FAILURE");
export const UAViewFilterEmployeeActionFailureCleanup = createAction("UA_VIEW_FILTER_EMPLOYEE_ACTION_FAILURE_CLEANUP");


export const UAViewFilterEmployeeAndUAAction = createAction<{emp_no: number, ua_id: number}>("UA_VIEW_FILTER_EMPLOYEE_AND_UA_ACTION");
export const UAViewFilterEmployeeAndUAActionSuccess = createAction("UA_VIEW_FILTER_EMPLOYEE_AND_UA_ACTION_SUCCESS", (SuccessMessage: UAViewInterface) => { 
    return({ payload: {SuccessMessage} })});
export const UAViewFilterEmployeeAndUAActionProgress = createAction<number>("UA_VIEW_FILTER_EMPLOYEE_AND_UA_ACTION_PROGRESS");
export const UAViewFilterEmployeeAndUAActionFailure = createAction<string>("UA_VIEW_FILTER_EMPLOYEE_AND_UA_ACTION_FAILURE");
export const UAViewFilterEmployeeAndUAActionFailureCleanup = createAction("UA_VIEW_FILTER_EMPLOYEE_AND_UA_ACTION_FAILURE_CLEANUP");


export const UAViewFilterApproverAction = createAction<{emp_no: number}>("UA_VIEW_FILTER_APPROVER_ACTION");
export const UAViewFilterApproverActionSuccess = createAction("UA_VIEW_FILTER_APPROVER_ACTION_SUCCESS", (SuccessMessage: UAViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const UAViewFilterApproverActionProgress = createAction<number>("UA_VIEW_FILTER_APPROVER_ACTION_PROGRESS");
export const UAViewFilterApproverActionFailure = createAction<string>("UA_VIEW_FILTER_APPROVER_ACTION_FAILURE");
export const UAViewFilterApproverActionFailureCleanup = createAction("UA_VIEW_FILTER_APPROVER_ACTION_FAILURE_CLEANUP");


export const UACreateAction = createAction<UACreateInterface>("UA_CREATE_ACTION");
export const UACreateActionSuccess = createAction("UA_CREATE_ACTION_SUCCESS", (SuccessMessage: UACreateInterface) => { 
    return({ payload: {SuccessMessage} })
});
export const UACreateActionProgress = createAction<number>("UA_CREATE_ACTION_PROGRESS");
export const UACreateActionFailure = createAction<string>("UA_CREATE_ACTION_FAILURE");
export const UACreateActionFailureCleanup = createAction("UA_CREATE_ACTION_FAILURE_CLEANUP");

export const UAEditAction = createAction<UAViewInterface>("UA_EDIT_ACTION");
export const UAEditActionSuccess = createAction("UA_EDIT_ACTION_SUCCESS", (SuccessMessage: UAEditInterface) => { 
    return({ payload: {SuccessMessage} })
});
export const UAEditActionProgress = createAction<number>("UA_EDIT_ACTION_PROGRESS");
export const UAEditActionFailure = createAction<string>("UA_EDIT_ACTION_FAILURE");
export const UAEditActionFailureCleanup = createAction("UA_EDIT_ACTION_FAILURE_CLEANUP");



// LEAVECREDIT SECTION // LEAVECREDIT SECTION // LEAVECREDIT SECTION // LEAVECREDIT SECTION // LEAVECREDIT SECTION // LEAVECREDIT SECTION
export const LEAVECREDITViewAction = createAction("LEAVECREDIT_VIEW_ACTION");
export const LEAVECREDITViewActionSuccess = createAction("LEAVECREDIT_VIEW_ACTION_SUCCESS", (SuccessMessage: LEAVECREDITViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const LEAVECREDITViewActionProgress = createAction<number>("LEAVECREDIT_VIEW_ACTION_PROGRESS");
export const LEAVECREDITViewActionFailure = createAction<string>("LEAVECREDIT_VIEW_ACTION_FAILURE");
export const LEAVECREDITViewActionFailureCleanup = createAction("LEAVECREDIT_VIEW_ACTION_FAILURE_CLEANUP");


export const LEAVECREDITViewFilterEmployeeAction = createAction<{emp_no: number}>("LEAVECREDIT_VIEW_FILTER_EMPLOYEE_ACTION");
export const LEAVECREDITViewFilterEmployeeActionSuccess = createAction("LEAVECREDIT_VIEW_FILTER_EMPLOYEE_ACTION_SUCCESS", (SuccessMessage: LEAVECREDITViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const LEAVECREDITViewFilterEmployeeActionProgress = createAction<number>("LEAVECREDIT_VIEW_FILTER_EMPLOYEE_ACTION_PROGRESS");
export const LEAVECREDITViewFilterEmployeeActionFailure = createAction<string>("LEAVECREDIT_VIEW_FILTER_EMPLOYEE_ACTION_FAILURE");
export const LEAVECREDITViewFilterEmployeeActionFailureCleanup = createAction("LEAVECREDIT_VIEW_FILTER_EMPLOYEE_ACTION_FAILURE_CLEANUP");


export const LEAVECREDITCreateAction = createAction<LEAVECREDITCreateInterface>("LEAVECREDIT_CREATE_ACTION");
export const LEAVECREDITCreateActionSuccess = createAction("LEAVECREDIT_CREATE_ACTION_SUCCESS", (SuccessMessage: LEAVECREDITCreateInterface) => { 
    return({ payload: {SuccessMessage} })
});
export const LEAVECREDITCreateActionProgress = createAction<number>("LEAVECREDIT_CREATE_ACTION_PROGRESS");
export const LEAVECREDITCreateActionFailure = createAction<string>("LEAVECREDIT_CREATE_ACTION_FAILURE");
export const LEAVECREDITCreateActionFailureCleanup = createAction("LEAVECREDIT_CREATE_ACTION_FAILURE_CLEANUP");

export const LEAVECREDITEditAction = createAction<LEAVECREDITViewInterface>("LEAVECREDIT_EDIT_ACTION");
export const LEAVECREDITEditActionSuccess = createAction("LEAVECREDIT_EDIT_ACTION_SUCCESS", (SuccessMessage: LEAVECREDITEditInterface) => { 
    return({ payload: {SuccessMessage} })
});
export const LEAVECREDITEditActionProgress = createAction<number>("LEAVECREDIT_EDIT_ACTION_PROGRESS");
export const LEAVECREDITEditActionFailure = createAction<string>("LEAVECREDIT_EDIT_ACTION_FAILURE");
export const LEAVECREDITEditActionFailureCleanup = createAction("LEAVECREDIT_EDIT_ACTION_FAILURE_CLEANUP");


// LEAVETYPE SECTION // LEAVETYPE SECTION // LEAVETYPE SECTION // LEAVETYPE SECTION // LEAVETYPE SECTION // LEAVETYPE SECTION
export const LEAVETYPEViewAction = createAction("LEAVETYPE_VIEW_ACTION");
export const LEAVETYPEViewActionSuccess = createAction("LEAVETYPE_VIEW_ACTION_SUCCESS", (SuccessMessage: LEAVETYPEViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const LEAVETYPEViewActionProgress = createAction<number>("LEAVETYPE_VIEW_ACTION_PROGRESS");
export const LEAVETYPEViewActionFailure = createAction<string>("LEAVETYPE_VIEW_ACTION_FAILURE");
export const LEAVETYPEViewActionFailureCleanup = createAction("LEAVETYPE_VIEW_ACTION_FAILURE_CLEANUP");


export const LEAVETYPEViewFilterEmployeeAction = createAction<{emp_no: number}>("LEAVETYPE_VIEW_FILTER_EMPLOYEE_ACTION");
export const LEAVETYPEViewFilterEmployeeActionSuccess = createAction("LEAVETYPE_VIEW_FILTER_EMPLOYEE_ACTION_SUCCESS", (SuccessMessage: LEAVETYPEViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const LEAVETYPEViewFilterEmployeeActionProgress = createAction<number>("LEAVETYPE_VIEW_FILTER_EMPLOYEE_ACTION_PROGRESS");
export const LEAVETYPEViewFilterEmployeeActionFailure = createAction<string>("LEAVETYPE_VIEW_FILTER_EMPLOYEE_ACTION_FAILURE");
export const LEAVETYPEViewFilterEmployeeActionFailureCleanup = createAction("LEAVETYPE_VIEW_FILTER_EMPLOYEE_ACTION_FAILURE_CLEANUP");


export const LEAVETYPECreateAction = createAction<LEAVETYPECreateInterface>("LEAVETYPE_CREATE_ACTION");
export const LEAVETYPECreateActionSuccess = createAction("LEAVETYPE_CREATE_ACTION_SUCCESS", (SuccessMessage: LEAVETYPECreateInterface) => { 
    return({ payload: {SuccessMessage} })
});
export const LEAVETYPECreateActionProgress = createAction<number>("LEAVETYPE_CREATE_ACTION_PROGRESS");
export const LEAVETYPECreateActionFailure = createAction<string>("LEAVETYPE_CREATE_ACTION_FAILURE");
export const LEAVETYPECreateActionFailureCleanup = createAction("LEAVETYPE_CREATE_ACTION_FAILURE_CLEANUP");

export const LEAVETYPEEditAction = createAction<LEAVETYPEViewInterface>("LEAVETYPE_EDIT_ACTION");
export const LEAVETYPEEditActionSuccess = createAction("LEAVETYPE_EDIT_ACTION_SUCCESS", (SuccessMessage: LEAVETYPEEditInterface) => { 
    return({ payload: {SuccessMessage} })
});
export const LEAVETYPEEditActionProgress = createAction<number>("LEAVETYPE_EDIT_ACTION_PROGRESS");
export const LEAVETYPEEditActionFailure = createAction<string>("LEAVETYPE_EDIT_ACTION_FAILURE");
export const LEAVETYPEEditActionFailureCleanup = createAction("LEAVETYPE_EDIT_ACTION_FAILURE_CLEANUP");

export const LEAVETYPEDeleteAction = createAction<{lt_id: number}>("LEAVETYPE_DELETE_ACTION");
export const LEAVETYPEDeleteActionSuccess = createAction("LEAVETYPE_DELETE_ACTION_SUCCESS", (SuccessMessage: string) => { 
    return({ payload: {SuccessMessage} })
});
export const LEAVETYPEDeleteActionProgress = createAction<number>("LEAVETYPE_DELETE_ACTION_PROGRESS");
export const LEAVETYPEDeleteActionFailure = createAction<string>("LEAVETYPE_DELETE_ACTION_FAILURE");
export const LEAVETYPEDeleteActionFailureCleanup = createAction("LEAVETYPE_DELETE_ACTION_FAILURE_CLEANUP");


// CUTOFFPERIOD SECTION // CUTOFFPERIOD SECTION // CUTOFFPERIOD SECTION // CUTOFFPERIOD SECTION // CUTOFFPERIOD SECTION // CUTOFFPERIOD SECTION
export const CUTOFFPERIODViewAction = createAction("CUTOFFPERIOD_VIEW_ACTION");
export const CUTOFFPERIODViewActionSuccess = createAction("CUTOFFPERIOD_VIEW_ACTION_SUCCESS", (SuccessMessage: CUTOFFPERIODViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const CUTOFFPERIODViewActionProgress = createAction<number>("CUTOFFPERIOD_VIEW_ACTION_PROGRESS");
export const CUTOFFPERIODViewActionFailure = createAction<string>("CUTOFFPERIOD_VIEW_ACTION_FAILURE");
export const CUTOFFPERIODViewActionFailureCleanup = createAction("CUTOFFPERIOD_VIEW_ACTION_FAILURE_CLEANUP");


export const CUTOFFPERIODViewFilterCUTOFFPERIODAction = createAction<{co_id: number}>("CUTOFFPERIOD_VIEW_FILTER_EMPLOYEE_ACTION");
export const CUTOFFPERIODViewFilterCUTOFFPERIODActionSuccess = createAction("CUTOFFPERIOD_VIEW_FILTER_EMPLOYEE_ACTION_SUCCESS", (SuccessMessage: CUTOFFPERIODViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const CUTOFFPERIODViewFilterCUTOFFPERIODActionProgress = createAction<number>("CUTOFFPERIOD_VIEW_FILTER_EMPLOYEE_ACTION_PROGRESS");
export const CUTOFFPERIODViewFilterCUTOFFPERIODActionFailure = createAction<string>("CUTOFFPERIOD_VIEW_FILTER_EMPLOYEE_ACTION_FAILURE");
export const CUTOFFPERIODViewFilterCUTOFFPERIODActionFailureCleanup = createAction("CUTOFFPERIOD_VIEW_FILTER_EMPLOYEE_ACTION_FAILURE_CLEANUP");


export const CUTOFFPERIODCreateAction = createAction<CUTOFFPERIODCreateInterface>("CUTOFFPERIOD_CREATE_ACTION");
export const CUTOFFPERIODCreateActionSuccess = createAction("CUTOFFPERIOD_CREATE_ACTION_SUCCESS", (SuccessMessage: CUTOFFPERIODCreateInterface) => { 
    return({ payload: {SuccessMessage} })
});
export const CUTOFFPERIODCreateActionProgress = createAction<number>("CUTOFFPERIOD_CREATE_ACTION_PROGRESS");
export const CUTOFFPERIODCreateActionFailure = createAction<string>("CUTOFFPERIOD_CREATE_ACTION_FAILURE");
export const CUTOFFPERIODCreateActionFailureCleanup = createAction("CUTOFFPERIOD_CREATE_ACTION_FAILURE_CLEANUP");

export const CUTOFFPERIODEditAction = createAction<CUTOFFPERIODViewInterface>("CUTOFFPERIOD_EDIT_ACTION");
export const CUTOFFPERIODEditActionSuccess = createAction("CUTOFFPERIOD_EDIT_ACTION_SUCCESS", (SuccessMessage: CUTOFFPERIODEditInterface) => { 
    return({ payload: {SuccessMessage} })
});
export const CUTOFFPERIODEditActionProgress = createAction<number>("CUTOFFPERIOD_EDIT_ACTION_PROGRESS");
export const CUTOFFPERIODEditActionFailure = createAction<string>("CUTOFFPERIOD_EDIT_ACTION_FAILURE");
export const CUTOFFPERIODEditActionFailureCleanup = createAction("CUTOFFPERIOD_EDIT_ACTION_FAILURE_CLEANUP");

// SCHEDULESHIFT SECTION // SCHEDULESHIFT SECTION // SCHEDULESHIFT SECTION // SCHEDULESHIFT SECTION // SCHEDULESHIFT SECTION // SCHEDULESHIFT SECTION
export const SCHEDULESHIFTViewAction = createAction("SCHEDULESHIFT_VIEW_ACTION");
export const SCHEDULESHIFTViewActionSuccess = createAction("SCHEDULESHIFT_VIEW_ACTION_SUCCESS", (SuccessMessage: SCHEDULESHIFTViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const SCHEDULESHIFTViewActionProgress = createAction<number>("SCHEDULESHIFT_VIEW_ACTION_PROGRESS");
export const SCHEDULESHIFTViewActionFailure = createAction<string>("SCHEDULESHIFT_VIEW_ACTION_FAILURE");
export const SCHEDULESHIFTViewActionFailureCleanup = createAction("SCHEDULESHIFT_VIEW_ACTION_FAILURE_CLEANUP");


export const SCHEDULESHIFTViewFilterSCHEDULESHIFTAction = createAction<{ss_id: number}>("SCHEDULESHIFT_VIEW_FILTER_EMPLOYEE_ACTION");
export const SCHEDULESHIFTViewFilterSCHEDULESHIFTActionSuccess = createAction("SCHEDULESHIFT_VIEW_FILTER_EMPLOYEE_ACTION_SUCCESS", (SuccessMessage: SCHEDULESHIFTViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const SCHEDULESHIFTViewFilterSCHEDULESHIFTActionProgress = createAction<number>("SCHEDULESHIFT_VIEW_FILTER_EMPLOYEE_ACTION_PROGRESS");
export const SCHEDULESHIFTViewFilterSCHEDULESHIFTActionFailure = createAction<string>("SCHEDULESHIFT_VIEW_FILTER_EMPLOYEE_ACTION_FAILURE");
export const SCHEDULESHIFTViewFilterSCHEDULESHIFTActionFailureCleanup = createAction("SCHEDULESHIFT_VIEW_FILTER_EMPLOYEE_ACTION_FAILURE_CLEANUP");


export const SCHEDULESHIFTCreateAction = createAction<SCHEDULESHIFTCreateInterface>("SCHEDULESHIFT_CREATE_ACTION");
export const SCHEDULESHIFTCreateActionSuccess = createAction("SCHEDULESHIFT_CREATE_ACTION_SUCCESS", (SuccessMessage: SCHEDULESHIFTCreateInterface) => { 
    return({ payload: {SuccessMessage} })
});
export const SCHEDULESHIFTCreateActionProgress = createAction<number>("SCHEDULESHIFT_CREATE_ACTION_PROGRESS");
export const SCHEDULESHIFTCreateActionFailure = createAction<string>("SCHEDULESHIFT_CREATE_ACTION_FAILURE");
export const SCHEDULESHIFTCreateActionFailureCleanup = createAction("SCHEDULESHIFT_CREATE_ACTION_FAILURE_CLEANUP");

export const SCHEDULESHIFTEditAction = createAction<SCHEDULESHIFTViewInterface>("SCHEDULESHIFT_EDIT_ACTION");
export const SCHEDULESHIFTEditActionSuccess = createAction("SCHEDULESHIFT_EDIT_ACTION_SUCCESS", (SuccessMessage: SCHEDULESHIFTEditInterface) => { 
    return({ payload: {SuccessMessage} })
});
export const SCHEDULESHIFTEditActionProgress = createAction<number>("SCHEDULESHIFT_EDIT_ACTION_PROGRESS");
export const SCHEDULESHIFTEditActionFailure = createAction<string>("SCHEDULESHIFT_EDIT_ACTION_FAILURE");
export const SCHEDULESHIFTEditActionFailureCleanup = createAction("SCHEDULESHIFT_EDIT_ACTION_FAILURE_CLEANUP");

export const SCHEDULESHIFTDeleteAction = createAction<{ss_id: number}>("SCHEDULESHIFT_DELETE_ACTION");
export const SCHEDULESHIFTDeleteActionSuccess = createAction("SCHEDULESHIFT_DELETE_ACTION_SUCCESS", (SuccessMessage: string) => { 
    return({ payload: {SuccessMessage} })
});
export const SCHEDULESHIFTDeleteActionProgress = createAction<number>("SCHEDULESHIFT_DELETE_ACTION_PROGRESS");
export const SCHEDULESHIFTDeleteActionFailure = createAction<string>("SCHEDULESHIFT_DELETE_ACTION_FAILURE");
export const SCHEDULESHIFTDeleteActionFailureCleanup = createAction("SCHEDULESHIFT_DELETE_ACTION_FAILURE_CLEANUP");

// SCHEDULEDAILY SECTION // SCHEDULEDAILY SECTION // SCHEDULEDAILY SECTION // SCHEDULEDAILY SECTION // SCHEDULEDAILY SECTION // SCHEDULEDAILY SECTION
export const SCHEDULEDAILYViewAction = createAction("SCHEDULEDAILY_VIEW_ACTION");
export const SCHEDULEDAILYViewActionSuccess = createAction("SCHEDULEDAILY_VIEW_ACTION_SUCCESS", (SuccessMessage: SCHEDULEDAILYViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const SCHEDULEDAILYViewActionProgress = createAction<number>("SCHEDULEDAILY_VIEW_ACTION_PROGRESS");
export const SCHEDULEDAILYViewActionFailure = createAction<string>("SCHEDULEDAILY_VIEW_ACTION_FAILURE");
export const SCHEDULEDAILYViewActionFailureCleanup = createAction("SCHEDULEDAILY_VIEW_ACTION_FAILURE_CLEANUP");


export const SCHEDULEDAILYViewFilterEmployeeAction = createAction<{emp_no: number}>("SCHEDULEDAILY_VIEW_FILTER_EMPLOYEE_ACTION");
export const SCHEDULEDAILYViewFilterEmployeeActionSuccess = createAction("SCHEDULEDAILY_VIEW_FILTER_EMPLOYEE_ACTION_SUCCESS", (SuccessMessage: SCHEDULEDAILYViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const SCHEDULEDAILYViewFilterEmployeeActionProgress = createAction<number>("SCHEDULEDAILY_VIEW_FILTER_EMPLOYEE_ACTION_PROGRESS");
export const SCHEDULEDAILYViewFilterEmployeeActionFailure = createAction<string>("SCHEDULEDAILY_VIEW_FILTER_EMPLOYEE_ACTION_FAILURE");
export const SCHEDULEDAILYViewFilterEmployeeActionFailureCleanup = createAction("SCHEDULEDAILY_VIEW_FILTER_EMPLOYEE_ACTION_FAILURE_CLEANUP");


export const SCHEDULEDAILYViewFilterEmployeeAndSCHEDULEDAILYAction = createAction<{emp_no: number, sd_id: number}>("SCHEDULEDAILY_VIEW_FILTER_EMPLOYEE_AND_SCHEDULEDAILY_ACTION");
export const SCHEDULEDAILYViewFilterEmployeeAndSCHEDULEDAILYActionSuccess = createAction("SCHEDULEDAILY_VIEW_FILTER_EMPLOYEE_AND_SCHEDULEDAILY_ACTION_SUCCESS", (SuccessMessage: SCHEDULEDAILYViewInterface) => { 
    return({ payload: {SuccessMessage} })});
export const SCHEDULEDAILYViewFilterEmployeeAndSCHEDULEDAILYActionProgress = createAction<number>("SCHEDULEDAILY_VIEW_FILTER_EMPLOYEE_AND_SCHEDULEDAILY_ACTION_PROGRESS");
export const SCHEDULEDAILYViewFilterEmployeeAndSCHEDULEDAILYActionFailure = createAction<string>("SCHEDULEDAILY_VIEW_FILTER_EMPLOYEE_AND_SCHEDULEDAILY_ACTION_FAILURE");
export const SCHEDULEDAILYViewFilterEmployeeAndSCHEDULEDAILYActionFailureCleanup = createAction("SCHEDULEDAILY_VIEW_FILTER_EMPLOYEE_AND_SCHEDULEDAILY_ACTION_FAILURE_CLEANUP");


export const SCHEDULEDAILYCreateAction = createAction<SCHEDULEDAILYCreateInterface>("SCHEDULEDAILY_CREATE_ACTION");
export const SCHEDULEDAILYCreateActionSuccess = createAction("SCHEDULEDAILY_CREATE_ACTION_SUCCESS", (SuccessMessage: SCHEDULEDAILYCreateInterface) => { 
    return({ payload: {SuccessMessage} })
});
export const SCHEDULEDAILYCreateActionProgress = createAction<number>("SCHEDULEDAILY_CREATE_ACTION_PROGRESS");
export const SCHEDULEDAILYCreateActionFailure = createAction<string>("SCHEDULEDAILY_CREATE_ACTION_FAILURE");
export const SCHEDULEDAILYCreateActionFailureCleanup = createAction("SCHEDULEDAILY_CREATE_ACTION_FAILURE_CLEANUP");

export const SCHEDULEDAILYEditAction = createAction<SCHEDULEDAILYEditInterface>("SCHEDULEDAILY_EDIT_ACTION");
export const SCHEDULEDAILYEditActionSuccess = createAction("SCHEDULEDAILY_EDIT_ACTION_SUCCESS", (SuccessMessage: SCHEDULEDAILYEditInterface) => { 
    return({ payload: {SuccessMessage} })
});
export const SCHEDULEDAILYEditActionProgress = createAction<number>("SCHEDULEDAILY_EDIT_ACTION_PROGRESS");
export const SCHEDULEDAILYEditActionFailure = createAction<string>("SCHEDULEDAILY_EDIT_ACTION_FAILURE");
export const SCHEDULEDAILYEditActionFailureCleanup = createAction("SCHEDULEDAILY_EDIT_ACTION_FAILURE_CLEANUP");
