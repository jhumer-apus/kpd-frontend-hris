import { createAction } from '@reduxjs/toolkit';
import { 
    USERResetPasswordInterface,
    USERCreateInterface,
    USEREditInterface,
    USERGenericInterface,
    USERViewInterface
} from '@/types/types-pages';




// USER SECTION
export const USERViewAction = createAction("USER_VIEW_ACTION");
export const USERViewActionSuccess = createAction("USER_VIEW_ACTION_SUCCESS", (SuccessMessage: USERViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const USERViewActionProgress = createAction<number>("USER_VIEW_ACTION_PROGRESS");
export const USERViewActionFailure = createAction<string>("USER_VIEW_ACTION_FAILURE");
export const USERViewActionFailureCleanup = createAction("USER_VIEW_ACTION_FAILURE_CLEANUP");


export const USERViewSpecificAction = createAction<{user_id: number}>("USER_VIEW_SPECIFIC_ACTION");
export const USERViewSpecificActionSuccess = createAction("USER_VIEW_SPECIFIC_ACTION_SUCCESS", (SuccessMessage: USERViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const USERViewSpecificActionProgress = createAction<number>("USER_VIEW_SPECIFIC_ACTION_PROGRESS");
export const USERViewSpecificActionFailure = createAction<string>("USER_VIEW_SPECIFIC_ACTION_FAILURE");
export const USERViewSpecificActionFailureCleanup = createAction("USER_VIEW_SPECIFIC_ACTION_FAILURE_CLEANUP");

export const USERCreateAction = createAction<USERCreateInterface>("USER_CREATE_ACTION");
export const USERCreateActionSuccess = createAction("USER_CREATE_ACTION_SUCCESS", (SuccessMessage: USERCreateInterface) => { 
    return({ payload: {SuccessMessage} })
});
export const USERCreateActionProgress = createAction<number>("USER_CREATE_ACTION_PROGRESS");
export const USERCreateActionFailure = createAction<string>("USER_CREATE_ACTION_FAILURE");
export const USERCreateActionFailureCleanup = createAction("USER_CREATE_ACTION_FAILURE_CLEANUP");

export const USEREditAction = createAction<USEREditInterface>("USER_EDIT_ACTION");
export const USEREditActionSuccess = createAction("USER_EDIT_ACTION_SUCCESS", (SuccessMessage: USEREditInterface) => { 
    return({ payload: {SuccessMessage} })
});
export const USEREditActionProgress = createAction<number>("USER_EDIT_ACTION_PROGRESS");
export const USEREditActionFailure = createAction<string>("USER_EDIT_ACTION_FAILURE");
export const USEREditActionFailureCleanup = createAction("USER_EDIT_ACTION_FAILURE_CLEANUP");


export const USERResetPasswordAction = createAction<USERResetPasswordInterface>("USER_RESET_PASSWORD_ACTION");
export const USERResetPasswordActionSuccess = createAction("USER_RESET_PASSWORD_ACTION_SUCCESS", (SuccessMessage: string) => { 
    return({ payload: {SuccessMessage} })
});
export const USERResetPasswordActionProgress = createAction<number>("USER_RESET_PASSWORD_ACTION_PROGRESS");
export const USERResetPasswordActionFailure = createAction<string>("USER_RESET_PASSWORD_ACTION_FAILURE");
export const USERResetPasswordActionFailureCleanup = createAction("USER_RESET_PASSWORD_ACTION_FAILURE_CLEANUP");