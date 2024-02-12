import { createAction } from '@reduxjs/toolkit';
import * as _Type from '@/types/types-employee-and-applicants';


// KPICORE SECTION
export const KPICOREViewAction = createAction("KPICORE_VIEW_ACTION");
export const KPICOREViewActionSuccess = createAction("KPICORE_VIEW_ACTION_SUCCESS", (SuccessMessage: _Type.KPICOREViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const KPICOREViewActionProgress = createAction<number>("KPICORE_VIEW_ACTION_PROGRESS");
export const KPICOREViewActionFailure = createAction<string>("KPICORE_VIEW_ACTION_FAILURE");
export const KPICOREViewActionFailureCleanup = createAction("KPICORE_VIEW_ACTION_FAILURE_CLEANUP");

export const KPICOREViewSpecificAction = createAction<{emp_kpi_core_id: number}>("KPICORE_VIEW_SPECIFIC_ACTION");
export const KPICOREViewSpecificActionSuccess = createAction("KPICORE_VIEW_SPECIFIC_ACTION_SUCCESS", (SuccessMessage: _Type.KPICOREViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const KPICOREViewSpecificActionProgress = createAction<number>("KPICORE_VIEW_SPECIFIC_ACTION_PROGRESS");
export const KPICOREViewSpecificActionFailure = createAction<string>("KPICORE_VIEW_SPECIFIC_ACTION_FAILURE");
export const KPICOREViewSpecificActionFailureCleanup = createAction("KPICORE_VIEW_SPECIFIC_ACTION_FAILURE_CLEANUP");

export const KPICOREViewSpecificEmployeeAction = createAction<{emp_no: number}>("KPICORE_VIEW_SPECIFIC_EMPLOYEE_ACTION");
export const KPICOREViewSpecificEmployeeActionSuccess = createAction("KPICORE_VIEW_SPECIFIC_EMPLOYEE_ACTION_SUCCESS", (SuccessMessage: _Type.KPICOREViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const KPICOREViewSpecificEmployeeActionProgress = createAction<number>("KPICORE_VIEW_SPECIFIC_EMPLOYEE_ACTION_PROGRESS");
export const KPICOREViewSpecificEmployeeActionFailure = createAction<string>("KPICORE_VIEW_SPECIFIC_EMPLOYEE_ACTION_FAILURE");
export const KPICOREViewSpecificEmployeeActionFailureCleanup = createAction("KPICORE_VIEW_SPECIFIC_EMPLOYEE_ACTION_FAILURE_CLEANUP");

export const KPICORECreateAction = createAction<_Type.KPICORECreateInterface>("KPICORE_CREATE_ACTION");
export const KPICORECreateActionSuccess = createAction("KPICORE_CREATE_ACTION_SUCCESS", (SuccessMessage: _Type.KPICORECreateInterface) => { 
    return({ payload: {SuccessMessage} })
});
export const KPICORECreateActionProgress = createAction<number>("KPICORE_CREATE_ACTION_PROGRESS");
export const KPICORECreateActionFailure = createAction<string>("KPICORE_CREATE_ACTION_FAILURE");
export const KPICORECreateActionFailureCleanup = createAction("KPICORE_CREATE_ACTION_FAILURE_CLEANUP");

export const KPICOREEditAction = createAction<_Type.KPICOREEditInterface>("KPICORE_EDIT_ACTION");
export const KPICOREEditActionSuccess = createAction("KPICORE_EDIT_ACTION_SUCCESS", (SuccessMessage: _Type.KPICOREEditInterface) => { 
    return({ payload: {SuccessMessage} })
});
export const KPICOREEditActionProgress = createAction<number>("KPICORE_EDIT_ACTION_PROGRESS");
export const KPICOREEditActionFailure = createAction<string>("KPICORE_EDIT_ACTION_FAILURE");
export const KPICOREEditActionFailureCleanup = createAction("KPICORE_EDIT_ACTION_FAILURE_CLEANUP");

export const KPICOREUpdateSupervisorAction = createAction<_Type.KPICOREUpdateSupervisorInterface>("KPICORE_UPDATE_SUPERVISOR_ACTION");
export const KPICOREUpdateSupervisorActionSuccess = createAction("KPICORE_UPDATE_SUPERVISOR_ACTION_SUCCESS", (SuccessMessage: _Type.KPICOREUpdateSupervisorInterface) => { 
    return({ payload: {SuccessMessage} })
});
export const KPICOREUpdateSupervisorActionProgress = createAction<number>("KPICORE_UPDATE_SUPERVISOR_ACTION_PROGRESS");
export const KPICOREUpdateSupervisorActionFailure = createAction<string>("KPICORE_UPDATE_SUPERVISOR_ACTION_FAILURE");
export const KPICOREUpdateSupervisorActionFailureCleanup = createAction("KPICORE_UPDATE_SUPERVISOR_ACTION_FAILURE_CLEANUP");

export const KPICOREUpdateSelfAction = createAction<_Type.KPICOREUpdateSelfInterface>("KPICORE_UPDATE_SELF_ACTION");
export const KPICOREUpdateSelfActionSuccess = createAction("KPICORE_UPDATE_SELF_ACTION_SUCCESS", (SuccessMessage: _Type.KPICOREUpdateSelfInterface) => { 
    return({ payload: {SuccessMessage} })
});
export const KPICOREUpdateSelfActionProgress = createAction<number>("KPICORE_UPDATE_SELF_ACTION_PROGRESS");
export const KPICOREUpdateSelfActionFailure = createAction<string>("KPICORE_UPDATE_SELF_ACTION_FAILURE");
export const KPICOREUpdateSelfActionFailureCleanup = createAction("KPICORE_UPDATE_SELF_ACTION_FAILURE_CLEANUP");




// CORECOMPE SECTION
export const CORECOMPEViewAction = createAction("CORECOMPE_VIEW_ACTION");
export const CORECOMPEViewActionSuccess = createAction("CORECOMPE_VIEW_ACTION_SUCCESS", (SuccessMessage: _Type.CORECOMPEViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const CORECOMPEViewActionProgress = createAction<number>("CORECOMPE_VIEW_ACTION_PROGRESS");
export const CORECOMPEViewActionFailure = createAction<string>("CORECOMPE_VIEW_ACTION_FAILURE");
export const CORECOMPEViewActionFailureCleanup = createAction("CORECOMPE_VIEW_ACTION_FAILURE_CLEANUP");

export const CORECOMPEViewSpecificAction = createAction<{core_id: number}>("CORECOMPE_VIEW_SPECIFIC_ACTION");
export const CORECOMPEViewSpecificActionSuccess = createAction("CORECOMPE_VIEW_SPECIFIC_ACTION_SUCCESS", (SuccessMessage: _Type.CORECOMPEViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const CORECOMPEViewSpecificActionProgress = createAction<number>("CORECOMPE_VIEW_SPECIFIC_ACTION_PROGRESS");
export const CORECOMPEViewSpecificActionFailure = createAction<string>("CORECOMPE_VIEW_SPECIFIC_ACTION_FAILURE");
export const CORECOMPEViewSpecificActionFailureCleanup = createAction("CORECOMPE_VIEW_SPECIFIC_ACTION_FAILURE_CLEANUP");

export const CORECOMPECreateAction = createAction<_Type.CORECOMPECreateInterface>("CORECOMPE_CREATE_ACTION");
export const CORECOMPECreateActionSuccess = createAction("CORECOMPE_CREATE_ACTION_SUCCESS", (SuccessMessage: _Type.CORECOMPECreateInterface) => { 
    return({ payload: {SuccessMessage} })
});
export const CORECOMPECreateActionProgress = createAction<number>("CORECOMPE_CREATE_ACTION_PROGRESS");
export const CORECOMPECreateActionFailure = createAction<string>("CORECOMPE_CREATE_ACTION_FAILURE");
export const CORECOMPECreateActionFailureCleanup = createAction("CORECOMPE_CREATE_ACTION_FAILURE_CLEANUP");

export const CORECOMPEEditAction = createAction<_Type.CORECOMPEEditInterface>("CORECOMPE_EDIT_ACTION");
export const CORECOMPEEditActionSuccess = createAction("CORECOMPE_EDIT_ACTION_SUCCESS", (SuccessMessage: _Type.CORECOMPEEditInterface) => { 
    return({ payload: {SuccessMessage} })
});
export const CORECOMPEEditActionProgress = createAction<number>("CORECOMPE_EDIT_ACTION_PROGRESS");
export const CORECOMPEEditActionFailure = createAction<string>("CORECOMPE_EDIT_ACTION_FAILURE");
export const CORECOMPEEditActionFailureCleanup = createAction("CORECOMPE_EDIT_ACTION_FAILURE_CLEANUP");

export const CORECOMPEDeleteAction = createAction<{cc_id: number, curr_user: number}>("CORECOMPE_DELETE_ACTION");
export const CORECOMPEDeleteActionSuccess = createAction("CORECOMPE_DELETE_ACTION_SUCCESS", (SuccessMessage: string) => { 
    return({ payload: {SuccessMessage} })
});
export const CORECOMPEDeleteActionProgress = createAction<number>("CORECOMPE_DELETE_ACTION_PROGRESS");
export const CORECOMPEDeleteActionFailure = createAction<string>("CORECOMPE_DELETE_ACTION_FAILURE");
export const CORECOMPEDeleteActionFailureCleanup = createAction("CORECOMPE_DELETE_ACTION_FAILURE_CLEANUP");


// EVALQUESTIONS SECTION
export const EVALQUESTIONSViewAction = createAction("EVALQUESTIONS_VIEW_ACTION");
export const EVALQUESTIONSViewActionSuccess = createAction("EVALQUESTIONS_VIEW_ACTION_SUCCESS", (SuccessMessage: _Type.EVALQUESTIONSViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const EVALQUESTIONSViewActionProgress = createAction<number>("EVALQUESTIONS_VIEW_ACTION_PROGRESS");
export const EVALQUESTIONSViewActionFailure = createAction<string>("EVALQUESTIONS_VIEW_ACTION_FAILURE");
export const EVALQUESTIONSViewActionFailureCleanup = createAction("EVALQUESTIONS_VIEW_ACTION_FAILURE_CLEANUP");

export const EVALQUESTIONSViewSpecificAction = createAction<{kpi_id: number}>("EVALQUESTIONS_VIEW_SPECIFIC_ACTION");
export const EVALQUESTIONSViewSpecificActionSuccess = createAction("EVALQUESTIONS_VIEW_SPECIFIC_ACTION_SUCCESS", (SuccessMessage: _Type.EVALQUESTIONSViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const EVALQUESTIONSViewSpecificActionProgress = createAction<number>("EVALQUESTIONS_VIEW_SPECIFIC_ACTION_PROGRESS");
export const EVALQUESTIONSViewSpecificActionFailure = createAction<string>("EVALQUESTIONS_VIEW_SPECIFIC_ACTION_FAILURE");
export const EVALQUESTIONSViewSpecificActionFailureCleanup = createAction("EVALQUESTIONS_VIEW_SPECIFIC_ACTION_FAILURE_CLEANUP");

export const EVALQUESTIONSCreateAction = createAction<_Type.EVALQUESTIONSCreateInterface>("EVALQUESTIONS_CREATE_ACTION");
export const EVALQUESTIONSCreateActionSuccess = createAction("EVALQUESTIONS_CREATE_ACTION_SUCCESS", (SuccessMessage: _Type.EVALQUESTIONSCreateInterface) => { 
    return({ payload: {SuccessMessage} })
});
export const EVALQUESTIONSCreateActionProgress = createAction<number>("EVALQUESTIONS_CREATE_ACTION_PROGRESS");
export const EVALQUESTIONSCreateActionFailure = createAction<string>("EVALQUESTIONS_CREATE_ACTION_FAILURE");
export const EVALQUESTIONSCreateActionFailureCleanup = createAction("EVALQUESTIONS_CREATE_ACTION_FAILURE_CLEANUP");

export const EVALQUESTIONSEditAction = createAction<_Type.EVALQUESTIONSEditInterface>("EVALQUESTIONS_EDIT_ACTION");
export const EVALQUESTIONSEditActionSuccess = createAction("EVALQUESTIONS_EDIT_ACTION_SUCCESS", (SuccessMessage: _Type.EVALQUESTIONSEditInterface) => { 
    return({ payload: {SuccessMessage} })
});
export const EVALQUESTIONSEditActionProgress = createAction<number>("EVALQUESTIONS_EDIT_ACTION_PROGRESS");
export const EVALQUESTIONSEditActionFailure = createAction<string>("EVALQUESTIONS_EDIT_ACTION_FAILURE");
export const EVALQUESTIONSEditActionFailureCleanup = createAction("EVALQUESTIONS_EDIT_ACTION_FAILURE_CLEANUP");

export const EVALQUESTIONSDeleteAction = createAction<{eq_id: number, curr_user: number}>("EVALQUESTIONS_DELETE_ACTION");
export const EVALQUESTIONSDeleteActionSuccess = createAction("EVALQUESTIONS_DELETE_ACTION_SUCCESS", (SuccessMessage: string) => { 
    return({ payload: {SuccessMessage} })
});
export const EVALQUESTIONSDeleteActionProgress = createAction<number>("EVALQUESTIONS_DELETE_ACTION_PROGRESS");
export const EVALQUESTIONSDeleteActionFailure = createAction<string>("EVALQUESTIONS_DELETE_ACTION_FAILURE");
export const EVALQUESTIONSDeleteActionFailureCleanup = createAction("EVALQUESTIONS_DELETE_ACTION_FAILURE_CLEANUP");




// ONBOARDINGSTATUS SECTION
export const ONBOARDINGSTATUSViewAction = createAction("ONBOARDINGSTATUS_VIEW_ACTION");
export const ONBOARDINGSTATUSViewActionSuccess = createAction("ONBOARDINGSTATUS_VIEW_ACTION_SUCCESS", (SuccessMessage: _Type.ONBOARDINGSTATUSViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const ONBOARDINGSTATUSViewActionProgress = createAction<number>("ONBOARDINGSTATUS_VIEW_ACTION_PROGRESS");
export const ONBOARDINGSTATUSViewActionFailure = createAction<string>("ONBOARDINGSTATUS_VIEW_ACTION_FAILURE");
export const ONBOARDINGSTATUSViewActionFailureCleanup = createAction("ONBOARDINGSTATUS_VIEW_ACTION_FAILURE_CLEANUP");

export const ONBOARDINGSTATUSViewSpecificAction = createAction<{onboarding_status_id: number}>("ONBOARDINGSTATUS_VIEW_SPECIFIC_ACTION");
export const ONBOARDINGSTATUSViewSpecificActionSuccess = createAction("ONBOARDINGSTATUS_VIEW_SPECIFIC_ACTION_SUCCESS", (SuccessMessage: _Type.ONBOARDINGSTATUSViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const ONBOARDINGSTATUSViewSpecificActionProgress = createAction<number>("ONBOARDINGSTATUS_VIEW_SPECIFIC_ACTION_PROGRESS");
export const ONBOARDINGSTATUSViewSpecificActionFailure = createAction<string>("ONBOARDINGSTATUS_VIEW_SPECIFIC_ACTION_FAILURE");
export const ONBOARDINGSTATUSViewSpecificActionFailureCleanup = createAction("ONBOARDINGSTATUS_VIEW_SPECIFIC_ACTION_FAILURE_CLEANUP");

export const ONBOARDINGSTATUSCreateAction = createAction<_Type.ONBOARDINGSTATUSCreateInterface>("ONBOARDINGSTATUS_CREATE_ACTION");
export const ONBOARDINGSTATUSCreateActionSuccess = createAction("ONBOARDINGSTATUS_CREATE_ACTION_SUCCESS", (SuccessMessage: _Type.ONBOARDINGSTATUSCreateInterface) => { 
    return({ payload: {SuccessMessage} })
});
export const ONBOARDINGSTATUSCreateActionProgress = createAction<number>("ONBOARDINGSTATUS_CREATE_ACTION_PROGRESS");
export const ONBOARDINGSTATUSCreateActionFailure = createAction<string>("ONBOARDINGSTATUS_CREATE_ACTION_FAILURE");
export const ONBOARDINGSTATUSCreateActionFailureCleanup = createAction("ONBOARDINGSTATUS_CREATE_ACTION_FAILURE_CLEANUP");

export const ONBOARDINGSTATUSEditAction = createAction<_Type.ONBOARDINGSTATUSEditInterface>("ONBOARDINGSTATUS_EDIT_ACTION");
export const ONBOARDINGSTATUSEditActionSuccess = createAction("ONBOARDINGSTATUS_EDIT_ACTION_SUCCESS", (SuccessMessage: _Type.ONBOARDINGSTATUSEditInterface) => { 
    return({ payload: {SuccessMessage} })
});
export const ONBOARDINGSTATUSEditActionProgress = createAction<number>("ONBOARDINGSTATUS_EDIT_ACTION_PROGRESS");
export const ONBOARDINGSTATUSEditActionFailure = createAction<string>("ONBOARDINGSTATUS_EDIT_ACTION_FAILURE");
export const ONBOARDINGSTATUSEditActionFailureCleanup = createAction("ONBOARDINGSTATUS_EDIT_ACTION_FAILURE_CLEANUP");

export const ONBOARDINGSTATUSUpdateAction = createAction<_Type.ONBOARDINGSTATUSUpdateInterface>("ONBOARDINGSTATUS_UPDATE_ACTION");
export const ONBOARDINGSTATUSUpdateActionSuccess = createAction("ONBOARDINGSTATUS_UPDATE_ACTION_SUCCESS", (SuccessMessage: _Type.ONBOARDINGSTATUSUpdateInterface) => { 
    return({ payload: {SuccessMessage} })
});
export const ONBOARDINGSTATUSUpdateActionProgress = createAction<number>("ONBOARDINGSTATUS_UPDATE_ACTION_PROGRESS");
export const ONBOARDINGSTATUSUpdateActionFailure = createAction<string>("ONBOARDINGSTATUS_UPDATE_ACTION_FAILURE");
export const ONBOARDINGSTATUSUpdateActionFailureCleanup = createAction("ONBOARDINGSTATUS_UPDATE_ACTION_FAILURE_CLEANUP");

// ONBOARDINGREQUIREMENTS SECTION
export const ONBOARDINGREQUIREMENTSViewAction = createAction("ONBOARDINGREQUIREMENTS_VIEW_ACTION");
export const ONBOARDINGREQUIREMENTSViewActionSuccess = createAction("ONBOARDINGREQUIREMENTS_VIEW_ACTION_SUCCESS", (SuccessMessage: _Type.ONBOARDINGREQUIREMENTSViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const ONBOARDINGREQUIREMENTSViewActionProgress = createAction<number>("ONBOARDINGREQUIREMENTS_VIEW_ACTION_PROGRESS");
export const ONBOARDINGREQUIREMENTSViewActionFailure = createAction<string>("ONBOARDINGREQUIREMENTS_VIEW_ACTION_FAILURE");
export const ONBOARDINGREQUIREMENTSViewActionFailureCleanup = createAction("ONBOARDINGREQUIREMENTS_VIEW_ACTION_FAILURE_CLEANUP");

export const ONBOARDINGREQUIREMENTSViewSpecificAction = createAction<{onboarding_requirements_id: number}>("ONBOARDINGREQUIREMENTS_VIEW_SPECIFIC_ACTION");
export const ONBOARDINGREQUIREMENTSViewSpecificActionSuccess = createAction("ONBOARDINGREQUIREMENTS_VIEW_SPECIFIC_ACTION_SUCCESS", (SuccessMessage: _Type.ONBOARDINGREQUIREMENTSViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const ONBOARDINGREQUIREMENTSViewSpecificActionProgress = createAction<number>("ONBOARDINGREQUIREMENTS_VIEW_SPECIFIC_ACTION_PROGRESS");
export const ONBOARDINGREQUIREMENTSViewSpecificActionFailure = createAction<string>("ONBOARDINGREQUIREMENTS_VIEW_SPECIFIC_ACTION_FAILURE");
export const ONBOARDINGREQUIREMENTSViewSpecificActionFailureCleanup = createAction("ONBOARDINGREQUIREMENTS_VIEW_SPECIFIC_ACTION_FAILURE_CLEANUP");

export const ONBOARDINGREQUIREMENTSCreateAction = createAction<_Type.ONBOARDINGREQUIREMENTSCreateInterface>("ONBOARDINGREQUIREMENTS_CREATE_ACTION");
export const ONBOARDINGREQUIREMENTSCreateActionSuccess = createAction("ONBOARDINGREQUIREMENTS_CREATE_ACTION_SUCCESS", (SuccessMessage: _Type.ONBOARDINGREQUIREMENTSCreateInterface) => { 
    return({ payload: {SuccessMessage} })
});
export const ONBOARDINGREQUIREMENTSCreateActionProgress = createAction<number>("ONBOARDINGREQUIREMENTS_CREATE_ACTION_PROGRESS");
export const ONBOARDINGREQUIREMENTSCreateActionFailure = createAction<string>("ONBOARDINGREQUIREMENTS_CREATE_ACTION_FAILURE");
export const ONBOARDINGREQUIREMENTSCreateActionFailureCleanup = createAction("ONBOARDINGREQUIREMENTS_CREATE_ACTION_FAILURE_CLEANUP");

export const ONBOARDINGREQUIREMENTSEditAction = createAction<_Type.ONBOARDINGREQUIREMENTSEditInterface>("ONBOARDINGREQUIREMENTS_EDIT_ACTION");
export const ONBOARDINGREQUIREMENTSEditActionSuccess = createAction("ONBOARDINGREQUIREMENTS_EDIT_ACTION_SUCCESS", (SuccessMessage: _Type.ONBOARDINGREQUIREMENTSEditInterface) => { 
    return({ payload: {SuccessMessage} })
});
export const ONBOARDINGREQUIREMENTSEditActionProgress = createAction<number>("ONBOARDINGREQUIREMENTS_EDIT_ACTION_PROGRESS");
export const ONBOARDINGREQUIREMENTSEditActionFailure = createAction<string>("ONBOARDINGREQUIREMENTS_EDIT_ACTION_FAILURE");
export const ONBOARDINGREQUIREMENTSEditActionFailureCleanup = createAction("ONBOARDINGREQUIREMENTS_EDIT_ACTION_FAILURE_CLEANUP");

export const ONBOARDINGREQUIREMENTSDeleteAction = createAction<{or_id: number, curr_user: number}>("ONBOARDINGREQUIREMENTS_DELETE_ACTION");
export const ONBOARDINGREQUIREMENTSDeleteActionSuccess = createAction("ONBOARDINGREQUIREMENTS_DELETE_ACTION_SUCCESS", (SuccessMessage: string) => { 
    return({ payload: {SuccessMessage} })
});
export const ONBOARDINGREQUIREMENTSDeleteActionProgress = createAction<number>("ONBOARDINGREQUIREMENTS_DELETE_ACTION_PROGRESS");
export const ONBOARDINGREQUIREMENTSDeleteActionFailure = createAction<string>("ONBOARDINGREQUIREMENTS_DELETE_ACTION_FAILURE");
export const ONBOARDINGREQUIREMENTSDeleteActionFailureCleanup = createAction("ONBOARDINGREQUIREMENTS_DELETE_ACTION_FAILURE_CLEANUP");


// OFFBOARDINGSTATUS SECTION
export const OFFBOARDINGSTATUSViewAction = createAction("OFFBOARDINGSTATUS_VIEW_ACTION");
export const OFFBOARDINGSTATUSViewActionSuccess = createAction("OFFBOARDINGSTATUS_VIEW_ACTION_SUCCESS", (SuccessMessage: _Type.OFFBOARDINGSTATUSViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const OFFBOARDINGSTATUSViewActionProgress = createAction<number>("OFFBOARDINGSTATUS_VIEW_ACTION_PROGRESS");
export const OFFBOARDINGSTATUSViewActionFailure = createAction<string>("OFFBOARDINGSTATUS_VIEW_ACTION_FAILURE");
export const OFFBOARDINGSTATUSViewActionFailureCleanup = createAction("OFFBOARDINGSTATUS_VIEW_ACTION_FAILURE_CLEANUP");

export const OFFBOARDINGSTATUSViewSpecificAction = createAction<{offboarding_status_id: number}>("OFFBOARDINGSTATUS_VIEW_SPECIFIC_ACTION");
export const OFFBOARDINGSTATUSViewSpecificActionSuccess = createAction("OFFBOARDINGSTATUS_VIEW_SPECIFIC_ACTION_SUCCESS", (SuccessMessage: _Type.OFFBOARDINGSTATUSViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const OFFBOARDINGSTATUSViewSpecificActionProgress = createAction<number>("OFFBOARDINGSTATUS_VIEW_SPECIFIC_ACTION_PROGRESS");
export const OFFBOARDINGSTATUSViewSpecificActionFailure = createAction<string>("OFFBOARDINGSTATUS_VIEW_SPECIFIC_ACTION_FAILURE");
export const OFFBOARDINGSTATUSViewSpecificActionFailureCleanup = createAction("OFFBOARDINGSTATUS_VIEW_SPECIFIC_ACTION_FAILURE_CLEANUP");

export const OFFBOARDINGSTATUSCreateAction = createAction<_Type.OFFBOARDINGSTATUSCreateInterface>("OFFBOARDINGSTATUS_CREATE_ACTION");
export const OFFBOARDINGSTATUSCreateActionSuccess = createAction("OFFBOARDINGSTATUS_CREATE_ACTION_SUCCESS", (SuccessMessage: _Type.OFFBOARDINGSTATUSCreateInterface) => { 
    return({ payload: {SuccessMessage} })
});
export const OFFBOARDINGSTATUSCreateActionProgress = createAction<number>("OFFBOARDINGSTATUS_CREATE_ACTION_PROGRESS");
export const OFFBOARDINGSTATUSCreateActionFailure = createAction<string>("OFFBOARDINGSTATUS_CREATE_ACTION_FAILURE");
export const OFFBOARDINGSTATUSCreateActionFailureCleanup = createAction("OFFBOARDINGSTATUS_CREATE_ACTION_FAILURE_CLEANUP");

export const OFFBOARDINGSTATUSEditAction = createAction<_Type.OFFBOARDINGSTATUSEditInterface>("OFFBOARDINGSTATUS_EDIT_ACTION");
export const OFFBOARDINGSTATUSEditActionSuccess = createAction("OFFBOARDINGSTATUS_EDIT_ACTION_SUCCESS", (SuccessMessage: _Type.OFFBOARDINGSTATUSEditInterface) => { 
    return({ payload: {SuccessMessage} })
});
export const OFFBOARDINGSTATUSEditActionProgress = createAction<number>("OFFBOARDINGSTATUS_EDIT_ACTION_PROGRESS");
export const OFFBOARDINGSTATUSEditActionFailure = createAction<string>("OFFBOARDINGSTATUS_EDIT_ACTION_FAILURE");
export const OFFBOARDINGSTATUSEditActionFailureCleanup = createAction("OFFBOARDINGSTATUS_EDIT_ACTION_FAILURE_CLEANUP");

export const OFFBOARDINGSTATUSUpdateAction = createAction<_Type.OFFBOARDINGSTATUSUpdateInterface>("OFFBOARDINGSTATUS_UPDATE_ACTION");
export const OFFBOARDINGSTATUSUpdateActionSuccess = createAction("OFFBOARDINGSTATUS_UPDATE_ACTION_SUCCESS", (SuccessMessage: _Type.OFFBOARDINGSTATUSUpdateInterface) => { 
    return({ payload: {SuccessMessage} })
});
export const OFFBOARDINGSTATUSUpdateActionProgress = createAction<number>("OFFBOARDINGSTATUS_UPDATE_ACTION_PROGRESS");
export const OFFBOARDINGSTATUSUpdateActionFailure = createAction<string>("OFFBOARDINGSTATUS_UPDATE_ACTION_FAILURE");
export const OFFBOARDINGSTATUSUpdateActionFailureCleanup = createAction("OFFBOARDINGSTATUS_UPDATE_ACTION_FAILURE_CLEANUP");


// OFFBOARDINGREQUIREMENTS SECTION
export const OFFBOARDINGREQUIREMENTSViewAction = createAction("OFFBOARDINGREQUIREMENTS_VIEW_ACTION");
export const OFFBOARDINGREQUIREMENTSViewActionSuccess = createAction("OFFBOARDINGREQUIREMENTS_VIEW_ACTION_SUCCESS", (SuccessMessage: _Type.OFFBOARDINGREQUIREMENTSViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const OFFBOARDINGREQUIREMENTSViewActionProgress = createAction<number>("OFFBOARDINGREQUIREMENTS_VIEW_ACTION_PROGRESS");
export const OFFBOARDINGREQUIREMENTSViewActionFailure = createAction<string>("OFFBOARDINGREQUIREMENTS_VIEW_ACTION_FAILURE");
export const OFFBOARDINGREQUIREMENTSViewActionFailureCleanup = createAction("OFFBOARDINGREQUIREMENTS_VIEW_ACTION_FAILURE_CLEANUP");

export const OFFBOARDINGREQUIREMENTSViewSpecificAction = createAction<{offboarding_requirements_id: number}>("OFFBOARDINGREQUIREMENTS_VIEW_SPECIFIC_ACTION");
export const OFFBOARDINGREQUIREMENTSViewSpecificActionSuccess = createAction("OFFBOARDINGREQUIREMENTS_VIEW_SPECIFIC_ACTION_SUCCESS", (SuccessMessage: _Type.OFFBOARDINGREQUIREMENTSViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const OFFBOARDINGREQUIREMENTSViewSpecificActionProgress = createAction<number>("OFFBOARDINGREQUIREMENTS_VIEW_SPECIFIC_ACTION_PROGRESS");
export const OFFBOARDINGREQUIREMENTSViewSpecificActionFailure = createAction<string>("OFFBOARDINGREQUIREMENTS_VIEW_SPECIFIC_ACTION_FAILURE");
export const OFFBOARDINGREQUIREMENTSViewSpecificActionFailureCleanup = createAction("OFFBOARDINGREQUIREMENTS_VIEW_SPECIFIC_ACTION_FAILURE_CLEANUP");

export const OFFBOARDINGREQUIREMENTSCreateAction = createAction<_Type.OFFBOARDINGREQUIREMENTSCreateInterface>("OFFBOARDINGREQUIREMENTS_CREATE_ACTION");
export const OFFBOARDINGREQUIREMENTSCreateActionSuccess = createAction("OFFBOARDINGREQUIREMENTS_CREATE_ACTION_SUCCESS", (SuccessMessage: _Type.OFFBOARDINGREQUIREMENTSCreateInterface) => { 
    return({ payload: {SuccessMessage} })
});
export const OFFBOARDINGREQUIREMENTSCreateActionProgress = createAction<number>("OFFBOARDINGREQUIREMENTS_CREATE_ACTION_PROGRESS");
export const OFFBOARDINGREQUIREMENTSCreateActionFailure = createAction<string>("OFFBOARDINGREQUIREMENTS_CREATE_ACTION_FAILURE");
export const OFFBOARDINGREQUIREMENTSCreateActionFailureCleanup = createAction("OFFBOARDINGREQUIREMENTS_CREATE_ACTION_FAILURE_CLEANUP");

export const OFFBOARDINGREQUIREMENTSEditAction = createAction<_Type.OFFBOARDINGREQUIREMENTSEditInterface>("OFFBOARDINGREQUIREMENTS_EDIT_ACTION");
export const OFFBOARDINGREQUIREMENTSEditActionSuccess = createAction("OFFBOARDINGREQUIREMENTS_EDIT_ACTION_SUCCESS", (SuccessMessage: _Type.OFFBOARDINGREQUIREMENTSEditInterface) => { 
    return({ payload: {SuccessMessage} })
});
export const OFFBOARDINGREQUIREMENTSEditActionProgress = createAction<number>("OFFBOARDINGREQUIREMENTS_EDIT_ACTION_PROGRESS");
export const OFFBOARDINGREQUIREMENTSEditActionFailure = createAction<string>("OFFBOARDINGREQUIREMENTS_EDIT_ACTION_FAILURE");
export const OFFBOARDINGREQUIREMENTSEditActionFailureCleanup = createAction("OFFBOARDINGREQUIREMENTS_EDIT_ACTION_FAILURE_CLEANUP");

export const OFFBOARDINGREQUIREMENTSDeleteAction = createAction<{or_id: number, curr_user: number}>("OFFBOARDINGREQUIREMENTS_DELETE_ACTION");
export const OFFBOARDINGREQUIREMENTSDeleteActionSuccess = createAction("OFFBOARDINGREQUIREMENTS_DELETE_ACTION_SUCCESS", (SuccessMessage: string) => { 
    return({ payload: {SuccessMessage} })
});
export const OFFBOARDINGREQUIREMENTSDeleteActionProgress = createAction<number>("OFFBOARDINGREQUIREMENTS_DELETE_ACTION_PROGRESS");
export const OFFBOARDINGREQUIREMENTSDeleteActionFailure = createAction<string>("OFFBOARDINGREQUIREMENTS_DELETE_ACTION_FAILURE");
export const OFFBOARDINGREQUIREMENTSDeleteActionFailureCleanup = createAction("OFFBOARDINGREQUIREMENTS_DELETE_ACTION_FAILURE_CLEANUP");



// APPLICANTS SECTION
export const APPLICANTSViewAction = createAction("APPLICANTS_VIEW_ACTION");
export const APPLICANTSViewActionSuccess = createAction("APPLICANTS_VIEW_ACTION_SUCCESS", (SuccessMessage: _Type.APPLICANTSViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const APPLICANTSViewActionProgress = createAction<number>("APPLICANTS_VIEW_ACTION_PROGRESS");
export const APPLICANTSViewActionFailure = createAction<string>("APPLICANTS_VIEW_ACTION_FAILURE");
export const APPLICANTSViewActionFailureCleanup = createAction("APPLICANTS_VIEW_ACTION_FAILURE_CLEANUP");

export const APPLICANTSViewSpecificAction = createAction<{applicant_id: number}>("APPLICANTS_VIEW_SPECIFIC_ACTION");
export const APPLICANTSViewSpecificActionSuccess = createAction("APPLICANTS_VIEW_SPECIFIC_ACTION_SUCCESS", (SuccessMessage: _Type.APPLICANTSViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const APPLICANTSViewSpecificActionProgress = createAction<number>("APPLICANTS_VIEW_SPECIFIC_ACTION_PROGRESS");
export const APPLICANTSViewSpecificActionFailure = createAction<string>("APPLICANTS_VIEW_SPECIFIC_ACTION_FAILURE");
export const APPLICANTSViewSpecificActionFailureCleanup = createAction("APPLICANTS_VIEW_SPECIFIC_ACTION_FAILURE_CLEANUP");

export const APPLICANTSCreateAction = createAction<_Type.APPLICANTSCreateInterface>("APPLICANTS_CREATE_ACTION");
export const APPLICANTSCreateActionSuccess = createAction("APPLICANTS_CREATE_ACTION_SUCCESS", (SuccessMessage: _Type.APPLICANTSCreateInterface) => { 
    return({ payload: {SuccessMessage} })
});
export const APPLICANTSCreateActionProgress = createAction<number>("APPLICANTS_CREATE_ACTION_PROGRESS");
export const APPLICANTSCreateActionFailure = createAction<string>("APPLICANTS_CREATE_ACTION_FAILURE");
export const APPLICANTSCreateActionFailureCleanup = createAction("APPLICANTS_CREATE_ACTION_FAILURE_CLEANUP");

export const APPLICANTSEditAction = createAction<_Type.APPLICANTSEditInterface>("APPLICANTS_EDIT_ACTION");
export const APPLICANTSEditActionSuccess = createAction("APPLICANTS_EDIT_ACTION_SUCCESS", (SuccessMessage: _Type.APPLICANTSEditInterface) => { 
    return({ payload: {SuccessMessage} })
});
export const APPLICANTSEditActionProgress = createAction<number>("APPLICANTS_EDIT_ACTION_PROGRESS");
export const APPLICANTSEditActionFailure = createAction<string>("APPLICANTS_EDIT_ACTION_FAILURE");
export const APPLICANTSEditActionFailureCleanup = createAction("APPLICANTS_EDIT_ACTION_FAILURE_CLEANUP");



// JOBPOSTINGS SECTION
export const JOBPOSTINGSViewAction = createAction("JOBPOSTINGS_VIEW_ACTION");
export const JOBPOSTINGSViewActionSuccess = createAction("JOBPOSTINGS_VIEW_ACTION_SUCCESS", (SuccessMessage: _Type.JOBPOSTINGSViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const JOBPOSTINGSViewActionProgress = createAction<number>("JOBPOSTINGS_VIEW_ACTION_PROGRESS");
export const JOBPOSTINGSViewActionFailure = createAction<string>("JOBPOSTINGS_VIEW_ACTION_FAILURE");
export const JOBPOSTINGSViewActionFailureCleanup = createAction("JOBPOSTINGS_VIEW_ACTION_FAILURE_CLEANUP");

export const JOBPOSTINGSViewSpecificAction = createAction<{job_posting_id: number}>("JOBPOSTINGS_VIEW_SPECIFIC_ACTION");
export const JOBPOSTINGSViewSpecificActionSuccess = createAction("JOBPOSTINGS_VIEW_SPECIFIC_ACTION_SUCCESS", (SuccessMessage: _Type.JOBPOSTINGSViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const JOBPOSTINGSViewSpecificActionProgress = createAction<number>("JOBPOSTINGS_VIEW_SPECIFIC_ACTION_PROGRESS");
export const JOBPOSTINGSViewSpecificActionFailure = createAction<string>("JOBPOSTINGS_VIEW_SPECIFIC_ACTION_FAILURE");
export const JOBPOSTINGSViewSpecificActionFailureCleanup = createAction("JOBPOSTINGS_VIEW_SPECIFIC_ACTION_FAILURE_CLEANUP");

export const JOBPOSTINGSCreateAction = createAction<_Type.JOBPOSTINGSCreateInterface>("JOBPOSTINGS_CREATE_ACTION");
export const JOBPOSTINGSCreateActionSuccess = createAction("JOBPOSTINGS_CREATE_ACTION_SUCCESS", (SuccessMessage: _Type.JOBPOSTINGSCreateInterface) => { 
    return({ payload: {SuccessMessage} })
});
export const JOBPOSTINGSCreateActionProgress = createAction<number>("JOBPOSTINGS_CREATE_ACTION_PROGRESS");
export const JOBPOSTINGSCreateActionFailure = createAction<string>("JOBPOSTINGS_CREATE_ACTION_FAILURE");
export const JOBPOSTINGSCreateActionFailureCleanup = createAction("JOBPOSTINGS_CREATE_ACTION_FAILURE_CLEANUP");

export const JOBPOSTINGSEditAction = createAction<_Type.JOBPOSTINGSEditInterface>("JOBPOSTINGS_EDIT_ACTION");
export const JOBPOSTINGSEditActionSuccess = createAction("JOBPOSTINGS_EDIT_ACTION_SUCCESS", (SuccessMessage: _Type.JOBPOSTINGSEditInterface) => { 
    return({ payload: {SuccessMessage} })
});
export const JOBPOSTINGSEditActionProgress = createAction<number>("JOBPOSTINGS_EDIT_ACTION_PROGRESS");
export const JOBPOSTINGSEditActionFailure = createAction<string>("JOBPOSTINGS_EDIT_ACTION_FAILURE");
export const JOBPOSTINGSEditActionFailureCleanup = createAction("JOBPOSTINGS_EDIT_ACTION_FAILURE_CLEANUP");


export const JOBPOSTINGSDeleteAction = createAction<{jp_id: number, curr_user: number}>("JOBPOSTINGS_DELETE_ACTION");
export const JOBPOSTINGSDeleteActionSuccess = createAction("JOBPOSTINGS_DELETE_ACTION_SUCCESS", (SuccessMessage: string) => { 
    return({ payload: {SuccessMessage} })
});
export const JOBPOSTINGSDeleteActionProgress = createAction<number>("JOBPOSTINGS_DELETE_ACTION_PROGRESS");
export const JOBPOSTINGSDeleteActionFailure = createAction<string>("JOBPOSTINGS_DELETE_ACTION_FAILURE");
export const JOBPOSTINGSDeleteActionFailureCleanup = createAction("JOBPOSTINGS_DELETE_ACTION_FAILURE_CLEANUP");

export const PERFECTATTENDANCEViewSpecificAction = createAction<{month: number, year: number}>("PERFECT_ATTENDANCE_VIEW_SPECIFIC_ACTION");
export const PERFECTATTENDANCEViewSpecificActionSuccess = createAction("PERFECT_ATTENDANCE_VIEW_SPECIFIC_ACTION_SUCCESS", (SuccessMessage: _Type.PERFECTATTENDANCEViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const PERFECTATTENDANCEViewSpecificActionProgress = createAction<number>("PERFECT_ATTENDANCE_VIEW_SPECIFIC_ACTION_PROGRESS");
export const PERFECTATTENDANCEViewSpecificActionFailure = createAction<string>("PERFECT_ATTENDANCE_VIEW_SPECIFIC_ACTION_FAILURE");
export const PERFECTATTENDANCEViewSpecificActionFailureCleanup = createAction("PERFECT_ATTENDANCE_VIEW_SPECIFIC_ACTION_FAILURE_CLEANUP");


export const ALLSCHEDULEViewSpecificAction = createAction<{month: number, year: number}>("ALLSCHEDULE_VIEW_SPECIFIC_ACTION");
export const ALLSCHEDULEViewSpecificActionSuccess = createAction("ALLSCHEDULE_VIEW_SPECIFIC_ACTION_SUCCESS", (SuccessMessage: _Type.ALLSCHEDULEViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const ALLSCHEDULEViewSpecificActionProgress = createAction<number>("ALLSCHEDULE_VIEW_SPECIFIC_ACTION_PROGRESS");
export const ALLSCHEDULEViewSpecificActionFailure = createAction<string>("ALLSCHEDULE_VIEW_SPECIFIC_ACTION_FAILURE");
export const ALLSCHEDULEViewSpecificActionFailureCleanup = createAction("ALLSCHEDULE_VIEW_SPECIFIC_ACTION_FAILURE_CLEANUP");



// EMPHISTORY SECTION
export const EMPHISTORYViewAction = createAction("EMPHISTORY_VIEW_ACTION");
export const EMPHISTORYViewActionSuccess = createAction("EMPHISTORY_VIEW_ACTION_SUCCESS", (SuccessMessage: _Type.EMPHISTORYViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const EMPHISTORYViewActionProgress = createAction<number>("EMPHISTORY_VIEW_ACTION_PROGRESS");
export const EMPHISTORYViewActionFailure = createAction<string>("EMPHISTORY_VIEW_ACTION_FAILURE");
export const EMPHISTORYViewActionFailureCleanup = createAction("EMPHISTORY_VIEW_ACTION_FAILURE_CLEANUP");

export const EMPHISTORYViewSpecificAction = createAction<{ emp_no: number}>("EMPHISTORY_VIEW_SPECIFIC_ACTION");
export const EMPHISTORYViewSpecificActionSuccess = createAction("EMPHISTORY_VIEW_SPECIFIC_ACTION_SUCCESS", (SuccessMessage: _Type.EMPHISTORYViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const EMPHISTORYViewSpecificActionProgress = createAction<number>("EMPHISTORY_VIEW_SPECIFIC_ACTION_PROGRESS");
export const EMPHISTORYViewSpecificActionFailure = createAction<string>("EMPHISTORY_VIEW_SPECIFIC_ACTION_FAILURE");
export const EMPHISTORYViewSpecificActionFailureCleanup = createAction("EMPHISTORY_VIEW_SPECIFIC_ACTION_FAILURE_CLEANUP");

export const EMPHISTORYCreateAction = createAction<_Type.EMPHISTORYCreateInterface>("EMPHISTORY_CREATE_ACTION");
export const EMPHISTORYCreateActionSuccess = createAction("EMPHISTORY_CREATE_ACTION_SUCCESS", (SuccessMessage: _Type.EMPHISTORYCreateInterface) => { 
    return({ payload: {SuccessMessage} })
});
export const EMPHISTORYCreateActionProgress = createAction<number>("EMPHISTORY_CREATE_ACTION_PROGRESS");
export const EMPHISTORYCreateActionFailure = createAction<string>("EMPHISTORY_CREATE_ACTION_FAILURE");
export const EMPHISTORYCreateActionFailureCleanup = createAction("EMPHISTORY_CREATE_ACTION_FAILURE_CLEANUP");

export const EMPHISTORYEditAction = createAction<_Type.EMPHISTORYEditInterface>("EMPHISTORY_EDIT_ACTION");
export const EMPHISTORYEditActionSuccess = createAction("EMPHISTORY_EDIT_ACTION_SUCCESS", (SuccessMessage: _Type.EMPHISTORYEditInterface) => { 
    return({ payload: {SuccessMessage} })
});
export const EMPHISTORYEditActionProgress = createAction<number>("EMPHISTORY_EDIT_ACTION_PROGRESS");
export const EMPHISTORYEditActionFailure = createAction<string>("EMPHISTORY_EDIT_ACTION_FAILURE");
export const EMPHISTORYEditActionFailureCleanup = createAction("EMPHISTORY_EDIT_ACTION_FAILURE_CLEANUP");

export const EMPHISTORYDeleteAction = createAction<{eh_id: number, added_by: number}>("EMPHISTORY_DELETE_ACTION");
export const EMPHISTORYDeleteActionSuccess = createAction("EMPHISTORY_DELETE_ACTION_SUCCESS", (SuccessMessage: string) => { 
    return({ payload: {SuccessMessage} })
});
export const EMPHISTORYDeleteActionProgress = createAction<number>("EMPHISTORY_DELETE_ACTION_PROGRESS");
export const EMPHISTORYDeleteActionFailure = createAction<string>("EMPHISTORY_DELETE_ACTION_FAILURE");
export const EMPHISTORYDeleteActionFailureCleanup = createAction("EMPHISTORY_DELETE_ACTION_FAILURE_CLEANUP");


// EMPSEMINARS SECTION
export const EMPSEMINARSViewAction = createAction("EMPSEMINARS_VIEW_ACTION");
export const EMPSEMINARSViewActionSuccess = createAction("EMPSEMINARS_VIEW_ACTION_SUCCESS", (SuccessMessage: _Type.EMPSEMINARSViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const EMPSEMINARSViewActionProgress = createAction<number>("EMPSEMINARS_VIEW_ACTION_PROGRESS");
export const EMPSEMINARSViewActionFailure = createAction<string>("EMPSEMINARS_VIEW_ACTION_FAILURE");
export const EMPSEMINARSViewActionFailureCleanup = createAction("EMPSEMINARS_VIEW_ACTION_FAILURE_CLEANUP");

export const EMPSEMINARSViewSpecificAction = createAction<{ emp_no: number}>("EMPSEMINARS_VIEW_SPECIFIC_ACTION");
export const EMPSEMINARSViewSpecificActionSuccess = createAction("EMPSEMINARS_VIEW_SPECIFIC_ACTION_SUCCESS", (SuccessMessage: _Type.EMPSEMINARSViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const EMPSEMINARSViewSpecificActionProgress = createAction<number>("EMPSEMINARS_VIEW_SPECIFIC_ACTION_PROGRESS");
export const EMPSEMINARSViewSpecificActionFailure = createAction<string>("EMPSEMINARS_VIEW_SPECIFIC_ACTION_FAILURE");
export const EMPSEMINARSViewSpecificActionFailureCleanup = createAction("EMPSEMINARS_VIEW_SPECIFIC_ACTION_FAILURE_CLEANUP");

export const EMPSEMINARSCreateAction = createAction<_Type.EMPSEMINARSCreateInterface>("EMPSEMINARS_CREATE_ACTION");
export const EMPSEMINARSCreateActionSuccess = createAction("EMPSEMINARS_CREATE_ACTION_SUCCESS", (SuccessMessage: _Type.EMPSEMINARSCreateInterface) => { 
    return({ payload: {SuccessMessage} })
});
export const EMPSEMINARSCreateActionProgress = createAction<number>("EMPSEMINARS_CREATE_ACTION_PROGRESS");
export const EMPSEMINARSCreateActionFailure = createAction<string>("EMPSEMINARS_CREATE_ACTION_FAILURE");
export const EMPSEMINARSCreateActionFailureCleanup = createAction("EMPSEMINARS_CREATE_ACTION_FAILURE_CLEANUP");

export const EMPSEMINARSEditAction = createAction<_Type.EMPSEMINARSEditInterface>("EMPSEMINARS_EDIT_ACTION");
export const EMPSEMINARSEditActionSuccess = createAction("EMPSEMINARS_EDIT_ACTION_SUCCESS", (SuccessMessage: _Type.EMPSEMINARSEditInterface) => { 
    return({ payload: {SuccessMessage} })
});
export const EMPSEMINARSEditActionProgress = createAction<number>("EMPSEMINARS_EDIT_ACTION_PROGRESS");
export const EMPSEMINARSEditActionFailure = createAction<string>("EMPSEMINARS_EDIT_ACTION_FAILURE");
export const EMPSEMINARSEditActionFailureCleanup = createAction("EMPSEMINARS_EDIT_ACTION_FAILURE_CLEANUP");

export const EMPSEMINARSDeleteAction = createAction<{es_id: number, added_by: number}>("EMPSEMINARS_DELETE_ACTION");
export const EMPSEMINARSDeleteActionSuccess = createAction("EMPSEMINARS_DELETE_ACTION_SUCCESS", (SuccessMessage: string) => { 
    return({ payload: {SuccessMessage} })
});
export const EMPSEMINARSDeleteActionProgress = createAction<number>("EMPSEMINARS_DELETE_ACTION_PROGRESS");
export const EMPSEMINARSDeleteActionFailure = createAction<string>("EMPSEMINARS_DELETE_ACTION_FAILURE");
export const EMPSEMINARSDeleteActionFailureCleanup = createAction("EMPSEMINARS_DELETE_ACTION_FAILURE_CLEANUP");
