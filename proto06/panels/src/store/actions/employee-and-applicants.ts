import { createAction } from '@reduxjs/toolkit';
import * as _Type from '@/types/types-employee-and-applicants';


// KPICORE SECTION
export const KPICOREViewAction = createAction("KPICORE_VIEW_ACTION");
export const KPICOREViewActionSuccess = createAction("KPICORE_VIEW_ACTION_SUCCESS", (SuccessMessage: _Type.KPICOREViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const KPICOREViewActionProgress = createAction<number>("KPICORE_VIEW_ACTION_PROGRESS");
export const KPICOREViewActionFailure = createAction<string>("KPICORE_VIEW_ACTION_FAILURE");
export const KPICOREViewActionFailureCleanup = createAction("KPICORE_VIEW_ACTION_FAILURE_CLEANUP");

export const KPICOREViewSpecificAction = createAction<{kpi_core_id: number}>("KPICORE_VIEW_SPECIFIC_ACTION");
export const KPICOREViewSpecificActionSuccess = createAction("KPICORE_VIEW_SPECIFIC_ACTION_SUCCESS", (SuccessMessage: _Type.KPICOREViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const KPICOREViewSpecificActionProgress = createAction<number>("KPICORE_VIEW_SPECIFIC_ACTION_PROGRESS");
export const KPICOREViewSpecificActionFailure = createAction<string>("KPICORE_VIEW_SPECIFIC_ACTION_FAILURE");
export const KPICOREViewSpecificActionFailureCleanup = createAction("KPICORE_VIEW_SPECIFIC_ACTION_FAILURE_CLEANUP");

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



// CORECOMPE SECTION
export const CORECOMPEViewAction = createAction("CORECOMPE_VIEW_ACTION");
export const CORECOMPEViewActionSuccess = createAction("CORECOMPE_VIEW_ACTION_SUCCESS", (SuccessMessage: _Type.CORECOMPEViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const CORECOMPEViewActionProgress = createAction<number>("CORECOMPE_VIEW_ACTION_PROGRESS");
export const CORECOMPEViewActionFailure = createAction<string>("CORECOMPE_VIEW_ACTION_FAILURE");
export const CORECOMPEViewActionFailureCleanup = createAction("CORECOMPE_VIEW_ACTION_FAILURE_CLEANUP");

export const CORECOMPEViewSpecificAction = createAction<{core_compe_id: number}>("CORECOMPE_VIEW_SPECIFIC_ACTION");
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



// EVALQUESTIONS SECTION
export const EVALQUESTIONSViewAction = createAction("EVALQUESTIONS_VIEW_ACTION");
export const EVALQUESTIONSViewActionSuccess = createAction("EVALQUESTIONS_VIEW_ACTION_SUCCESS", (SuccessMessage: _Type.EVALQUESTIONSViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const EVALQUESTIONSViewActionProgress = createAction<number>("EVALQUESTIONS_VIEW_ACTION_PROGRESS");
export const EVALQUESTIONSViewActionFailure = createAction<string>("EVALQUESTIONS_VIEW_ACTION_FAILURE");
export const EVALQUESTIONSViewActionFailureCleanup = createAction("EVALQUESTIONS_VIEW_ACTION_FAILURE_CLEANUP");

export const EVALQUESTIONSViewSpecificAction = createAction<{eval_questions_id: number}>("EVALQUESTIONS_VIEW_SPECIFIC_ACTION");
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

