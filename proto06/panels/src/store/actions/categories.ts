import { createAction } from '@reduxjs/toolkit';
import { 
    BRANCHCreateInterface,
    BRANCHEditInterface,
    BRANCHGenericInterface,
    BRANCHViewInterface,
    DEPARTMENTCreateInterface,
    DEPARTMENTEditInterface,
    DEPARTMENTGenericInterface,
    DEPARTMENTViewInterface,
    DIVISIONViewInterface,
    DIVISIONCreateInterface,
    DIVISIONEditInterface,
    DIVISIONGenericInterface,
    PAYROLLGROUPCreateInterface,
    PAYROLLGROUPEditInterface,
    PAYROLLGROUPGenericInterface,
    PAYROLLGROUPViewInterface,
    POSITIONCreateInterface,
    POSITIONEditInterface,
    POSITIONGenericInterface,
    POSITIONViewInterface,
    RANKCreateInterface,
    RANKEditInterface,
    RANKGenericInterface,
    RANKViewInterface,
    RankDataInterface
} from '@/types/types-pages';




// BRANCH SECTION
export const BRANCHViewAction = createAction("BRANCH_VIEW_ACTION");
export const BRANCHViewActionSuccess = createAction("BRANCH_VIEW_ACTION_SUCCESS", (SuccessMessage: BRANCHViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const BRANCHViewActionProgress = createAction<number>("BRANCH_VIEW_ACTION_PROGRESS");
export const BRANCHViewActionFailure = createAction<string>("BRANCH_VIEW_ACTION_FAILURE");
export const BRANCHViewActionFailureCleanup = createAction("BRANCH_VIEW_ACTION_FAILURE_CLEANUP");


export const BRANCHViewSpecificAction = createAction<{branch_id: number}>("BRANCH_VIEW_SPECIFIC_ACTION");
export const BRANCHViewSpecificActionSuccess = createAction("BRANCH_VIEW_SPECIFIC_ACTION_SUCCESS", (SuccessMessage: BRANCHViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const BRANCHViewSpecificActionProgress = createAction<number>("BRANCH_VIEW_SPECIFIC_ACTION_PROGRESS");
export const BRANCHViewSpecificActionFailure = createAction<string>("BRANCH_VIEW_SPECIFIC_ACTION_FAILURE");
export const BRANCHViewSpecificActionFailureCleanup = createAction("BRANCH_VIEW_SPECIFIC_ACTION_FAILURE_CLEANUP");

export const BRANCHCreateAction = createAction<BRANCHCreateInterface>("BRANCH_CREATE_ACTION");
export const BRANCHCreateActionSuccess = createAction("BRANCH_CREATE_ACTION_SUCCESS", (SuccessMessage: BRANCHCreateInterface) => { 
    return({ payload: {SuccessMessage} })
});
export const BRANCHCreateActionProgress = createAction<number>("BRANCH_CREATE_ACTION_PROGRESS");
export const BRANCHCreateActionFailure = createAction<string>("BRANCH_CREATE_ACTION_FAILURE");
export const BRANCHCreateActionFailureCleanup = createAction("BRANCH_CREATE_ACTION_FAILURE_CLEANUP");

export const BRANCHEditAction = createAction<BRANCHEditInterface>("BRANCH_EDIT_ACTION");
export const BRANCHEditActionSuccess = createAction("BRANCH_EDIT_ACTION_SUCCESS", (SuccessMessage: BRANCHEditInterface) => { 
    return({ payload: {SuccessMessage} })
});
export const BRANCHEditActionProgress = createAction<number>("BRANCH_EDIT_ACTION_PROGRESS");
export const BRANCHEditActionFailure = createAction<string>("BRANCH_EDIT_ACTION_FAILURE");
export const BRANCHEditActionFailureCleanup = createAction("BRANCH_EDIT_ACTION_FAILURE_CLEANUP");




// DEPARTMENT SECTION
export const DEPARTMENTViewAction = createAction("DEPARTMENT_VIEW_ACTION");
export const DEPARTMENTViewActionSuccess = createAction("DEPARTMENT_VIEW_ACTION_SUCCESS", (SuccessMessage: DEPARTMENTViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const DEPARTMENTViewActionProgress = createAction<number>("DEPARTMENT_VIEW_ACTION_PROGRESS");
export const DEPARTMENTViewActionFailure = createAction<string>("DEPARTMENT_VIEW_ACTION_FAILURE");
export const DEPARTMENTViewActionFailureCleanup = createAction("DEPARTMENT_VIEW_ACTION_FAILURE_CLEANUP");


export const DEPARTMENTViewSpecificAction = createAction<{department_id: number}>("DEPARTMENT_VIEW_SPECIFIC_ACTION");
export const DEPARTMENTViewSpecificActionSuccess = createAction("DEPARTMENT_VIEW_SPECIFIC_ACTION_SUCCESS", (SuccessMessage: DEPARTMENTViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const DEPARTMENTViewSpecificActionProgress = createAction<number>("DEPARTMENT_VIEW_SPECIFIC_ACTION_PROGRESS");
export const DEPARTMENTViewSpecificActionFailure = createAction<string>("DEPARTMENT_VIEW_SPECIFIC_ACTION_FAILURE");
export const DEPARTMENTViewSpecificActionFailureCleanup = createAction("DEPARTMENT_VIEW_SPECIFIC_ACTION_FAILURE_CLEANUP");

export const DEPARTMENTCreateAction = createAction<DEPARTMENTCreateInterface>("DEPARTMENT_CREATE_ACTION");
export const DEPARTMENTCreateActionSuccess = createAction("DEPARTMENT_CREATE_ACTION_SUCCESS", (SuccessMessage: DEPARTMENTCreateInterface) => { 
    return({ payload: {SuccessMessage} })
});
export const DEPARTMENTCreateActionProgress = createAction<number>("DEPARTMENT_CREATE_ACTION_PROGRESS");
export const DEPARTMENTCreateActionFailure = createAction<string>("DEPARTMENT_CREATE_ACTION_FAILURE");
export const DEPARTMENTCreateActionFailureCleanup = createAction("DEPARTMENT_CREATE_ACTION_FAILURE_CLEANUP");

export const DEPARTMENTEditAction = createAction<DEPARTMENTEditInterface>("DEPARTMENT_EDIT_ACTION");
export const DEPARTMENTEditActionSuccess = createAction("DEPARTMENT_EDIT_ACTION_SUCCESS", (SuccessMessage: DEPARTMENTEditInterface) => { 
    return({ payload: {SuccessMessage} })
});
export const DEPARTMENTEditActionProgress = createAction<number>("DEPARTMENT_EDIT_ACTION_PROGRESS");
export const DEPARTMENTEditActionFailure = createAction<string>("DEPARTMENT_EDIT_ACTION_FAILURE");
export const DEPARTMENTEditActionFailureCleanup = createAction("DEPARTMENT_EDIT_ACTION_FAILURE_CLEANUP");


// DIVISION SECTION
export const DIVISIONViewAction = createAction("DIVISION_VIEW_ACTION");
export const DIVISIONViewActionSuccess = createAction("DIVISION_VIEW_ACTION_SUCCESS", (SuccessMessage: DIVISIONViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const DIVISIONViewActionProgress = createAction<number>("DIVISION_VIEW_ACTION_PROGRESS");
export const DIVISIONViewActionFailure = createAction<string>("DIVISION_VIEW_ACTION_FAILURE");
export const DIVISIONViewActionFailureCleanup = createAction("DIVISION_VIEW_ACTION_FAILURE_CLEANUP");


export const DIVISIONViewSpecificAction = createAction<{division_id: number}>("DIVISION_VIEW_SPECIFIC_ACTION");
export const DIVISIONViewSpecificActionSuccess = createAction("DIVISION_VIEW_SPECIFIC_ACTION_SUCCESS", (SuccessMessage: DIVISIONViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const DIVISIONViewSpecificActionProgress = createAction<number>("DIVISION_VIEW_SPECIFIC_ACTION_PROGRESS");
export const DIVISIONViewSpecificActionFailure = createAction<string>("DIVISION_VIEW_SPECIFIC_ACTION_FAILURE");
export const DIVISIONViewSpecificActionFailureCleanup = createAction("DIVISION_VIEW_SPECIFIC_ACTION_FAILURE_CLEANUP");

export const DIVISIONCreateAction = createAction<DIVISIONCreateInterface>("DIVISION_CREATE_ACTION");
export const DIVISIONCreateActionSuccess = createAction("DIVISION_CREATE_ACTION_SUCCESS", (SuccessMessage: DIVISIONCreateInterface) => { 
    return({ payload: {SuccessMessage} })
});
export const DIVISIONCreateActionProgress = createAction<number>("DIVISION_CREATE_ACTION_PROGRESS");
export const DIVISIONCreateActionFailure = createAction<string>("DIVISION_CREATE_ACTION_FAILURE");
export const DIVISIONCreateActionFailureCleanup = createAction("DIVISION_CREATE_ACTION_FAILURE_CLEANUP");

export const DIVISIONEditAction = createAction<DIVISIONEditInterface>("DIVISION_EDIT_ACTION");
export const DIVISIONEditActionSuccess = createAction("DIVISION_EDIT_ACTION_SUCCESS", (SuccessMessage: DIVISIONEditInterface) => { 
    return({ payload: {SuccessMessage} })
});
export const DIVISIONEditActionProgress = createAction<number>("DIVISION_EDIT_ACTION_PROGRESS");
export const DIVISIONEditActionFailure = createAction<string>("DIVISION_EDIT_ACTION_FAILURE");
export const DIVISIONEditActionFailureCleanup = createAction("DIVISION_EDIT_ACTION_FAILURE_CLEANUP");



// PAYROLLGROUP SECTION
export const PAYROLLGROUPViewAction = createAction("PAYROLLGROUP_VIEW_ACTION");
export const PAYROLLGROUPViewActionSuccess = createAction("PAYROLLGROUP_VIEW_ACTION_SUCCESS", (SuccessMessage: PAYROLLGROUPViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const PAYROLLGROUPViewActionProgress = createAction<number>("PAYROLLGROUP_VIEW_ACTION_PROGRESS");
export const PAYROLLGROUPViewActionFailure = createAction<string>("PAYROLLGROUP_VIEW_ACTION_FAILURE");
export const PAYROLLGROUPViewActionFailureCleanup = createAction("PAYROLLGROUP_VIEW_ACTION_FAILURE_CLEANUP");


export const PAYROLLGROUPViewSpecificAction = createAction<{payrollgroup_id: number}>("PAYROLLGROUP_VIEW_SPECIFIC_ACTION");
export const PAYROLLGROUPViewSpecificActionSuccess = createAction("PAYROLLGROUP_VIEW_SPECIFIC_ACTION_SUCCESS", (SuccessMessage: PAYROLLGROUPViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const PAYROLLGROUPViewSpecificActionProgress = createAction<number>("PAYROLLGROUP_VIEW_SPECIFIC_ACTION_PROGRESS");
export const PAYROLLGROUPViewSpecificActionFailure = createAction<string>("PAYROLLGROUP_VIEW_SPECIFIC_ACTION_FAILURE");
export const PAYROLLGROUPViewSpecificActionFailureCleanup = createAction("PAYROLLGROUP_VIEW_SPECIFIC_ACTION_FAILURE_CLEANUP");

export const PAYROLLGROUPCreateAction = createAction<PAYROLLGROUPCreateInterface>("PAYROLLGROUP_CREATE_ACTION");
export const PAYROLLGROUPCreateActionSuccess = createAction("PAYROLLGROUP_CREATE_ACTION_SUCCESS", (SuccessMessage: PAYROLLGROUPCreateInterface) => { 
    return({ payload: {SuccessMessage} })
});
export const PAYROLLGROUPCreateActionProgress = createAction<number>("PAYROLLGROUP_CREATE_ACTION_PROGRESS");
export const PAYROLLGROUPCreateActionFailure = createAction<string>("PAYROLLGROUP_CREATE_ACTION_FAILURE");
export const PAYROLLGROUPCreateActionFailureCleanup = createAction("PAYROLLGROUP_CREATE_ACTION_FAILURE_CLEANUP");

export const PAYROLLGROUPEditAction = createAction<PAYROLLGROUPEditInterface>("PAYROLLGROUP_EDIT_ACTION");
export const PAYROLLGROUPEditActionSuccess = createAction("PAYROLLGROUP_EDIT_ACTION_SUCCESS", (SuccessMessage: PAYROLLGROUPEditInterface) => { 
    return({ payload: {SuccessMessage} })
});
export const PAYROLLGROUPEditActionProgress = createAction<number>("PAYROLLGROUP_EDIT_ACTION_PROGRESS");
export const PAYROLLGROUPEditActionFailure = createAction<string>("PAYROLLGROUP_EDIT_ACTION_FAILURE");
export const PAYROLLGROUPEditActionFailureCleanup = createAction("PAYROLLGROUP_EDIT_ACTION_FAILURE_CLEANUP");



// POSITION SECTION
export const POSITIONViewAction = createAction("POSITION_VIEW_ACTION");
export const POSITIONViewActionSuccess = createAction("POSITION_VIEW_ACTION_SUCCESS", (SuccessMessage: POSITIONViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const POSITIONViewActionProgress = createAction<number>("POSITION_VIEW_ACTION_PROGRESS");
export const POSITIONViewActionFailure = createAction<string>("POSITION_VIEW_ACTION_FAILURE");
export const POSITIONViewActionFailureCleanup = createAction("POSITION_VIEW_ACTION_FAILURE_CLEANUP");


export const POSITIONViewSpecificAction = createAction<{position_id: number}>("POSITION_VIEW_SPECIFIC_ACTION");
export const POSITIONViewSpecificActionSuccess = createAction("POSITION_VIEW_SPECIFIC_ACTION_SUCCESS", (SuccessMessage: POSITIONViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const POSITIONViewSpecificActionProgress = createAction<number>("POSITION_VIEW_SPECIFIC_ACTION_PROGRESS");
export const POSITIONViewSpecificActionFailure = createAction<string>("POSITION_VIEW_SPECIFIC_ACTION_FAILURE");
export const POSITIONViewSpecificActionFailureCleanup = createAction("POSITION_VIEW_SPECIFIC_ACTION_FAILURE_CLEANUP");

export const POSITIONCreateAction = createAction<POSITIONCreateInterface>("POSITION_CREATE_ACTION");
export const POSITIONCreateActionSuccess = createAction("POSITION_CREATE_ACTION_SUCCESS", (SuccessMessage: POSITIONCreateInterface) => { 
    return({ payload: {SuccessMessage} })
});
export const POSITIONCreateActionProgress = createAction<number>("POSITION_CREATE_ACTION_PROGRESS");
export const POSITIONCreateActionFailure = createAction<string>("POSITION_CREATE_ACTION_FAILURE");
export const POSITIONCreateActionFailureCleanup = createAction("POSITION_CREATE_ACTION_FAILURE_CLEANUP");

export const POSITIONEditAction = createAction<POSITIONEditInterface>("POSITION_EDIT_ACTION");
export const POSITIONEditActionSuccess = createAction("POSITION_EDIT_ACTION_SUCCESS", (SuccessMessage: POSITIONEditInterface) => { 
    return({ payload: {SuccessMessage} })
});
export const POSITIONEditActionProgress = createAction<number>("POSITION_EDIT_ACTION_PROGRESS");
export const POSITIONEditActionFailure = createAction<string>("POSITION_EDIT_ACTION_FAILURE");
export const POSITIONEditActionFailureCleanup = createAction("POSITION_EDIT_ACTION_FAILURE_CLEANUP");


// RANK SECTION
export const RANKViewAction = createAction("RANK_VIEW_ACTION");
export const RANKViewActionSuccess = createAction("RANK_VIEW_ACTION_SUCCESS", (SuccessMessage: RANKViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const RANKViewActionProgress = createAction<number>("RANK_VIEW_ACTION_PROGRESS");
export const RANKViewActionFailure = createAction<string>("RANK_VIEW_ACTION_FAILURE");
export const RANKViewActionFailureCleanup = createAction("RANK_VIEW_ACTION_FAILURE_CLEANUP");


export const RANKViewSpecificAction = createAction<{rank_id: number}>("RANK_VIEW_SPECIFIC_ACTION");
export const RANKViewSpecificActionSuccess = createAction("RANK_VIEW_SPECIFIC_ACTION_SUCCESS", (SuccessMessage: RANKViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const RANKViewSpecificActionProgress = createAction<number>("RANK_VIEW_SPECIFIC_ACTION_PROGRESS");
export const RANKViewSpecificActionFailure = createAction<string>("RANK_VIEW_SPECIFIC_ACTION_FAILURE");
export const RANKViewSpecificActionFailureCleanup = createAction("RANK_VIEW_SPECIFIC_ACTION_FAILURE_CLEANUP");

export const RANKCreateAction = createAction<RANKCreateInterface>("RANK_CREATE_ACTION");
export const RANKCreateActionSuccess = createAction("RANK_CREATE_ACTION_SUCCESS", (SuccessMessage: RANKCreateInterface) => { 
    return({ payload: {SuccessMessage} })
});
export const RANKCreateActionProgress = createAction<number>("RANK_CREATE_ACTION_PROGRESS");
export const RANKCreateActionFailure = createAction<string>("RANK_CREATE_ACTION_FAILURE");
export const RANKCreateActionFailureCleanup = createAction("RANK_CREATE_ACTION_FAILURE_CLEANUP");

export const RANKEditAction = createAction<RANKEditInterface>("RANK_EDIT_ACTION");
export const RANKEditActionSuccess = createAction("RANK_EDIT_ACTION_SUCCESS", (SuccessMessage: RANKEditInterface) => { 
    return({ payload: {SuccessMessage} })
});
export const RANKEditActionProgress = createAction<number>("RANK_EDIT_ACTION_PROGRESS");
export const RANKEditActionFailure = createAction<string>("RANK_EDIT_ACTION_FAILURE");
export const RANKEditActionFailureCleanup = createAction("RANK_EDIT_ACTION_FAILURE_CLEANUP");
