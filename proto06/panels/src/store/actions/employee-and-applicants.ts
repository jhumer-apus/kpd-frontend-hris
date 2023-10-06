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

