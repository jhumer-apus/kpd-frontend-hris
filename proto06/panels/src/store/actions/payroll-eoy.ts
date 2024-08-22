import { createAction } from '@reduxjs/toolkit';
import { 
    PAY13THCreateInterface,
    PAY13THGenericInterface,
    PAY13THViewInterface,
    BONUSENTRYCreateInterface,
    BONUSENTRYEditInterface,
    BONUSENTRYGenericInterface,
    BONUSENTRYViewInterface,
    BONUSLISTCreateInterface,
    BONUSLISTEditInterface,
    BONUSLISTGenericInterface,
    BONUSLISTViewInterface,
    ANNOUNCEMENTCreateInterface,
    ANNOUNCEMENTEditInterface,
    ANNOUNCEMENTGenericInterface,
    ANNOUNCEMENTViewInterface,
    ASSETACCOUNTCreateInterface,
    ASSETACCOUNTEditInterface,
    ASSETACCOUNTGenericInterface,
    ASSETACCOUNTViewInterface,
    TAXCOLLECTEDGenericInterface,
    TAXCOLLECTEDViewInterface,
    ASSETLISTCreateInterface,
    ASSETLISTEditInterface,
    ASSETLISTGenericInterface,
    ASSETLISTViewInterface,
    ACTIVEANNOUNCEMENTViewInterface,

} from '@/types/types-payroll-eoy';
import { DEPARTMENTViewInterface, RANKViewInterface } from '@/types/types-pages';





// TAXCOLLECTED SECTION
export const TAXCOLLECTEDViewAction = createAction("TAXCOLLECTED_VIEW_ACTION");
export const TAXCOLLECTEDViewActionSuccess = createAction("TAXCOLLECTED_VIEW_ACTION_SUCCESS", (SuccessMessage: TAXCOLLECTEDViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const TAXCOLLECTEDViewActionProgress = createAction<number>("TAXCOLLECTED_VIEW_ACTION_PROGRESS");
export const TAXCOLLECTEDViewActionFailure = createAction<string>("TAXCOLLECTED_VIEW_ACTION_FAILURE");
export const TAXCOLLECTEDViewActionFailureCleanup = createAction("TAXCOLLECTED_VIEW_ACTION_FAILURE_CLEANUP");


export const TAXCOLLECTEDViewSpecificEmployeeAction = createAction<{emp_no: number}>("TAXCOLLECTED_VIEW_SPECIFIC_EMPLOYEE_ACTION");
export const TAXCOLLECTEDViewSpecificEmployeeActionSuccess = createAction("TAXCOLLECTED_VIEW_SPECIFIC_EMPLOYEE_ACTION_SUCCESS", (SuccessMessage: TAXCOLLECTEDViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const TAXCOLLECTEDViewSpecificEmployeeActionProgress = createAction<number>("TAXCOLLECTED_VIEW_SPECIFIC_EMPLOYEE_ACTION_PROGRESS");
export const TAXCOLLECTEDViewSpecificEmployeeActionFailure = createAction<string>("TAXCOLLECTED_VIEW_SPECIFIC_EMPLOYEE_ACTION_FAILURE");
export const TAXCOLLECTEDViewSpecificEmployeeActionFailureCleanup = createAction("TAXCOLLECTED_VIEW_SPECIFIC_EMPLOYEE_ACTION_FAILURE_CLEANUP");



// PAY13TH SECTION
export const PAY13THViewAction = createAction("PAY13TH_VIEW_ACTION");
export const PAY13THViewActionSuccess = createAction("PAY13TH_VIEW_ACTION_SUCCESS", (SuccessMessage: PAY13THViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const PAY13THViewActionProgress = createAction<number>("PAY13TH_VIEW_ACTION_PROGRESS");
export const PAY13THViewActionFailure = createAction<string>("PAY13TH_VIEW_ACTION_FAILURE");
export const PAY13THViewActionFailureCleanup = createAction("PAY13TH_VIEW_ACTION_FAILURE_CLEANUP");


export const PAY13THViewSpecificAction = createAction<{emp_no: number}>("PAY13TH_VIEW_SPECIFIC_ACTION");
export const PAY13THViewSpecificActionSuccess = createAction("PAY13TH_VIEW_SPECIFIC_ACTION_SUCCESS", (SuccessMessage: PAY13THViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const PAY13THViewSpecificActionProgress = createAction<number>("PAY13TH_VIEW_SPECIFIC_ACTION_PROGRESS");
export const PAY13THViewSpecificActionFailure = createAction<string>("PAY13TH_VIEW_SPECIFIC_ACTION_FAILURE");
export const PAY13THViewSpecificActionFailureCleanup = createAction("PAY13TH_VIEW_SPECIFIC_ACTION_FAILURE_CLEANUP");

export const PAY13THCreateAction = createAction<PAY13THCreateInterface>("PAY13TH_CREATE_ACTION");
export const PAY13THCreateActionSuccess = createAction("PAY13TH_CREATE_ACTION_SUCCESS", (SuccessMessage: PAY13THCreateInterface) => { 
    return({ payload: {SuccessMessage} })
});
export const PAY13THCreateActionProgress = createAction<number>("PAY13TH_CREATE_ACTION_PROGRESS");
export const PAY13THCreateActionFailure = createAction<string>("PAY13TH_CREATE_ACTION_FAILURE");
export const PAY13THCreateActionFailureCleanup = createAction("PAY13TH_CREATE_ACTION_FAILURE_CLEANUP");


// BONUSLIST SECTION
export const BONUSLISTViewAction = createAction("BONUSLIST_VIEW_ACTION");
export const BONUSLISTViewActionSuccess = createAction("BONUSLIST_VIEW_ACTION_SUCCESS", (SuccessMessage: BONUSLISTViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const BONUSLISTViewActionProgress = createAction<number>("BONUSLIST_VIEW_ACTION_PROGRESS");
export const BONUSLISTViewActionFailure = createAction<string>("BONUSLIST_VIEW_ACTION_FAILURE");
export const BONUSLISTViewActionFailureCleanup = createAction("BONUSLIST_VIEW_ACTION_FAILURE_CLEANUP");


export const BONUSLISTViewSpecificAction = createAction<{bl_id: number}>("BONUSLIST_VIEW_SPECIFIC_ACTION");
export const BONUSLISTViewSpecificActionSuccess = createAction("BONUSLIST_VIEW_SPECIFIC_ACTION_SUCCESS", (SuccessMessage: BONUSLISTViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const BONUSLISTViewSpecificActionProgress = createAction<number>("BONUSLIST_VIEW_SPECIFIC_ACTION_PROGRESS");
export const BONUSLISTViewSpecificActionFailure = createAction<string>("BONUSLIST_VIEW_SPECIFIC_ACTION_FAILURE");
export const BONUSLISTViewSpecificActionFailureCleanup = createAction("BONUSLIST_VIEW_SPECIFIC_ACTION_FAILURE_CLEANUP");

export const BONUSLISTCreateAction = createAction<BONUSLISTCreateInterface>("BONUSLIST_CREATE_ACTION");
export const BONUSLISTCreateActionSuccess = createAction("BONUSLIST_CREATE_ACTION_SUCCESS", (SuccessMessage: BONUSLISTCreateInterface) => { 
    return({ payload: {SuccessMessage} })
});
export const BONUSLISTCreateActionProgress = createAction<number>("BONUSLIST_CREATE_ACTION_PROGRESS");
export const BONUSLISTCreateActionFailure = createAction<string>("BONUSLIST_CREATE_ACTION_FAILURE");
export const BONUSLISTCreateActionFailureCleanup = createAction("BONUSLIST_CREATE_ACTION_FAILURE_CLEANUP");

export const BONUSLISTEditAction = createAction<BONUSLISTEditInterface>("BONUSLIST_EDIT_ACTION");
export const BONUSLISTEditActionSuccess = createAction("BONUSLIST_EDIT_ACTION_SUCCESS", (SuccessMessage: BONUSLISTEditInterface) => { 
    return({ payload: {SuccessMessage} })
});
export const BONUSLISTEditActionProgress = createAction<number>("BONUSLIST_EDIT_ACTION_PROGRESS");
export const BONUSLISTEditActionFailure = createAction<string>("BONUSLIST_EDIT_ACTION_FAILURE");
export const BONUSLISTEditActionFailureCleanup = createAction("BONUSLIST_EDIT_ACTION_FAILURE_CLEANUP");



// BONUSENTRY SECTION
export const BONUSENTRYViewAction = createAction("BONUSENTRY_VIEW_ACTION");
export const BONUSENTRYViewActionSuccess = createAction("BONUSENTRY_VIEW_ACTION_SUCCESS", (SuccessMessage: BONUSENTRYViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const BONUSENTRYViewActionProgress = createAction<number>("BONUSENTRY_VIEW_ACTION_PROGRESS");
export const BONUSENTRYViewActionFailure = createAction<string>("BONUSENTRY_VIEW_ACTION_FAILURE");
export const BONUSENTRYViewActionFailureCleanup = createAction("BONUSENTRY_VIEW_ACTION_FAILURE_CLEANUP");


export const BONUSENTRYViewSpecificAction = createAction<{be_id: number, emp_no: number}>("BONUSENTRY_VIEW_SPECIFIC_ACTION");
export const BONUSENTRYViewSpecificActionSuccess = createAction("BONUSENTRY_VIEW_SPECIFIC_ACTION_SUCCESS", (SuccessMessage: BONUSENTRYViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const BONUSENTRYViewSpecificActionProgress = createAction<number>("BONUSENTRY_VIEW_SPECIFIC_ACTION_PROGRESS");
export const BONUSENTRYViewSpecificActionFailure = createAction<string>("BONUSENTRY_VIEW_SPECIFIC_ACTION_FAILURE");
export const BONUSENTRYViewSpecificActionFailureCleanup = createAction("BONUSENTRY_VIEW_SPECIFIC_ACTION_FAILURE_CLEANUP");


export const BONUSENTRYViewSpecificEmployeeAction = createAction<{emp_no: number}>("BONUSENTRY_VIEW_SPECIFIC_EMPLOYEE_ACTION");
export const BONUSENTRYViewSpecificEmployeeActionSuccess = createAction("BONUSENTRY_VIEW_SPECIFIC_EMPLOYEE_ACTION_SUCCESS", (SuccessMessage: BONUSENTRYViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const BONUSENTRYViewSpecificEmployeeActionProgress = createAction<number>("BONUSENTRY_VIEW_SPECIFIC_EMPLOYEE_ACTION_PROGRESS");
export const BONUSENTRYViewSpecificEmployeeActionFailure = createAction<string>("BONUSENTRY_VIEW_SPECIFIC_EMPLOYEE_ACTION_FAILURE");
export const BONUSENTRYViewSpecificEmployeeActionFailureCleanup = createAction("BONUSENTRY_VIEW_SPECIFIC_EMPLOYEE_ACTION_FAILURE_CLEANUP");


export const BONUSENTRYCreateAction = createAction<BONUSENTRYCreateInterface>("BONUSENTRY_CREATE_ACTION");
export const BONUSENTRYCreateActionSuccess = createAction("BONUSENTRY_CREATE_ACTION_SUCCESS", (SuccessMessage: BONUSENTRYCreateInterface) => { 
    return({ payload: {SuccessMessage} })
});
export const BONUSENTRYCreateActionProgress = createAction<number>("BONUSENTRY_CREATE_ACTION_PROGRESS");
export const BONUSENTRYCreateActionFailure = createAction<string>("BONUSENTRY_CREATE_ACTION_FAILURE");
export const BONUSENTRYCreateActionFailureCleanup = createAction("BONUSENTRY_CREATE_ACTION_FAILURE_CLEANUP");

export const BONUSENTRYEditAction = createAction<BONUSENTRYEditInterface>("BONUSENTRY_EDIT_ACTION");
export const BONUSENTRYEditActionSuccess = createAction("BONUSENTRY_EDIT_ACTION_SUCCESS", (SuccessMessage: BONUSENTRYEditInterface) => { 
    return({ payload: {SuccessMessage} })
});
export const BONUSENTRYEditActionProgress = createAction<number>("BONUSENTRY_EDIT_ACTION_PROGRESS");
export const BONUSENTRYEditActionFailure = createAction<string>("BONUSENTRY_EDIT_ACTION_FAILURE");
export const BONUSENTRYEditActionFailureCleanup = createAction("BONUSENTRY_EDIT_ACTION_FAILURE_CLEANUP");

// ANNOUNCEMENT SECTION
export const ANNOUNCEMENTViewAction = createAction("ANNOUNCEMENT_VIEW_ACTION");
export const ANNOUNCEMENTViewActionSuccess = createAction("ANNOUNCEMENT_VIEW_ACTION_SUCCESS", (SuccessMessage: ANNOUNCEMENTViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const ANNOUNCEMENTViewActionProgress = createAction<number>("ANNOUNCEMENT_VIEW_ACTION_PROGRESS");
export const ANNOUNCEMENTViewActionFailure = createAction<string>("ANNOUNCEMENT_VIEW_ACTION_FAILURE");
export const ANNOUNCEMENTViewActionFailureCleanup = createAction("ANNOUNCEMENT_VIEW_ACTION_FAILURE_CLEANUP");


export const ANNOUNCEMENTViewSpecificAction = createAction<{announcement_id: number}>("ANNOUNCEMENT_VIEW_SPECIFIC_ACTION");
export const ANNOUNCEMENTViewSpecificActionSuccess = createAction("ANNOUNCEMENT_VIEW_SPECIFIC_ACTION_SUCCESS", (SuccessMessage: ANNOUNCEMENTViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const ANNOUNCEMENTViewSpecificActionProgress = createAction<number>("ANNOUNCEMENT_VIEW_SPECIFIC_ACTION_PROGRESS");
export const ANNOUNCEMENTViewSpecificActionFailure = createAction<string>("ANNOUNCEMENT_VIEW_SPECIFIC_ACTION_FAILURE");
export const ANNOUNCEMENTViewSpecificActionFailureCleanup = createAction("ANNOUNCEMENT_VIEW_SPECIFIC_ACTION_FAILURE_CLEANUP");

export const ANNOUNCEMENTCreateAction = createAction<ANNOUNCEMENTCreateInterface>("ANNOUNCEMENT_CREATE_ACTION");
export const ANNOUNCEMENTCreateActionSuccess = createAction("ANNOUNCEMENT_CREATE_ACTION_SUCCESS", (SuccessMessage: ANNOUNCEMENTCreateInterface) => { 
    return({ payload: {SuccessMessage} })
});
export const ANNOUNCEMENTCreateActionProgress = createAction<number>("ANNOUNCEMENT_CREATE_ACTION_PROGRESS");
export const ANNOUNCEMENTCreateActionFailure = createAction<string>("ANNOUNCEMENT_CREATE_ACTION_FAILURE");
export const ANNOUNCEMENTCreateActionFailureCleanup = createAction("ANNOUNCEMENT_CREATE_ACTION_FAILURE_CLEANUP");

export const ANNOUNCEMENTEditAction = createAction<ANNOUNCEMENTEditInterface>("ANNOUNCEMENT_EDIT_ACTION");
export const ANNOUNCEMENTEditActionSuccess = createAction("ANNOUNCEMENT_EDIT_ACTION_SUCCESS", (SuccessMessage: ANNOUNCEMENTEditInterface) => { 
    return({ payload: {SuccessMessage} })
});
export const ANNOUNCEMENTEditActionProgress = createAction<number>("ANNOUNCEMENT_EDIT_ACTION_PROGRESS");
export const ANNOUNCEMENTEditActionFailure = createAction<string>("ANNOUNCEMENT_EDIT_ACTION_FAILURE");
export const ANNOUNCEMENTEditActionFailureCleanup = createAction("ANNOUNCEMENT_EDIT_ACTION_FAILURE_CLEANUP");


export const ACTIVEANNOUNCEMENTViewAction = createAction<{dept: number, rank: number, pin: boolean}>("ACTIVEANNOUNCEMENT_VIEW_ACTION");
export const ACTIVEANNOUNCEMENTViewActionSuccess = createAction("ACTIVEANNOUNCEMENT_VIEW_ACTION_SUCCESS", (SuccessMessage: ACTIVEANNOUNCEMENTViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const ACTIVEANNOUNCEMENTViewActionProgress = createAction<number>("ACTIVEANNOUNCEMENT_VIEW_ACTION_PROGRESS");
export const ACTIVEANNOUNCEMENTViewActionFailure = createAction<string>("ACTIVEANNOUNCEMENT_VIEW_ACTION_FAILURE");
export const ACTIVEANNOUNCEMENTViewActionFailureCleanup = createAction("ACTIVEANNOUNCEMENT_VIEW_ACTION_FAILURE_CLEANUP");

export const ANNRANKViewAction = createAction("ANNRANK_VIEW_ACTION");
export const ANNRANKViewActionSuccess = createAction("ANNRANK_VIEW_ACTION_SUCCESS", (SuccessMessage: RANKViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const ANNRANKViewActionProgress = createAction<number>("ANNRANK_VIEW_ACTION_PROGRESS");
export const ANNRANKViewActionFailure = createAction<string>("ANNRANK_VIEW_ACTION_FAILURE");
export const ANNRANKViewActionFailureCleanup = createAction("ANNRANK_VIEW_ACTION_FAILURE_CLEANUP");

export const ANNDEPARTMENTViewAction = createAction("ANNDEPARTMENT_VIEW_ACTION");
export const ANNDEPARTMENTViewActionSuccess = createAction("ANNDEPARTMENT_VIEW_ACTION_SUCCESS", (SuccessMessage: DEPARTMENTViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const ANNDEPARTMENTViewActionProgress = createAction<number>("ANNDEPARTMENT_VIEW_ACTION_PROGRESS");
export const ANNDEPARTMENTViewActionFailure = createAction<string>("ANNDEPARTMENT_VIEW_ACTION_FAILURE");
export const ANNDEPARTMENTViewActionFailureCleanup = createAction("ANNDEPARTMENT_VIEW_ACTION_FAILURE_CLEANUP");


// ASSETLIST SECTION
export const ASSETLISTViewAction = createAction("ASSETLIST_VIEW_ACTION");
export const ASSETLISTViewActionSuccess = createAction("ASSETLIST_VIEW_ACTION_SUCCESS", (SuccessMessage: ASSETLISTViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const ASSETLISTViewActionProgress = createAction<number>("ASSETLIST_VIEW_ACTION_PROGRESS");
export const ASSETLISTViewActionFailure = createAction<string>("ASSETLIST_VIEW_ACTION_FAILURE");
export const ASSETLISTViewActionFailureCleanup = createAction("ASSETLIST_VIEW_ACTION_FAILURE_CLEANUP");


export const ASSETLISTViewSpecificAction = createAction<{asset_list_id: number}>("ASSETLIST_VIEW_SPECIFIC_ACTION");
export const ASSETLISTViewSpecificActionSuccess = createAction("ASSETLIST_VIEW_SPECIFIC_ACTION_SUCCESS", (SuccessMessage: ASSETLISTViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const ASSETLISTViewSpecificActionProgress = createAction<number>("ASSETLIST_VIEW_SPECIFIC_ACTION_PROGRESS");
export const ASSETLISTViewSpecificActionFailure = createAction<string>("ASSETLIST_VIEW_SPECIFIC_ACTION_FAILURE");
export const ASSETLISTViewSpecificActionFailureCleanup = createAction("ASSETLIST_VIEW_SPECIFIC_ACTION_FAILURE_CLEANUP");

export const ASSETLISTCreateAction = createAction<ASSETLISTCreateInterface>("ASSETLIST_CREATE_ACTION");
export const ASSETLISTCreateActionSuccess = createAction("ASSETLIST_CREATE_ACTION_SUCCESS", (SuccessMessage: ASSETLISTCreateInterface) => { 
    return({ payload: {SuccessMessage} })
});
export const ASSETLISTCreateActionProgress = createAction<number>("ASSETLIST_CREATE_ACTION_PROGRESS");
export const ASSETLISTCreateActionFailure = createAction<string>("ASSETLIST_CREATE_ACTION_FAILURE");
export const ASSETLISTCreateActionFailureCleanup = createAction("ASSETLIST_CREATE_ACTION_FAILURE_CLEANUP");

export const ASSETLISTEditAction = createAction<ASSETLISTEditInterface>("ASSETLIST_EDIT_ACTION");
export const ASSETLISTEditActionSuccess = createAction("ASSETLIST_EDIT_ACTION_SUCCESS", (SuccessMessage: ASSETLISTEditInterface) => { 
    return({ payload: {SuccessMessage} })
});
export const ASSETLISTEditActionProgress = createAction<number>("ASSETLIST_EDIT_ACTION_PROGRESS");
export const ASSETLISTEditActionFailure = createAction<string>("ASSETLIST_EDIT_ACTION_FAILURE");
export const ASSETLISTEditActionFailureCleanup = createAction("ASSETLIST_EDIT_ACTION_FAILURE_CLEANUP");





// ASSETACCOUNT SECTION
export const ASSETACCOUNTViewAction = createAction("ASSETACCOUNT_VIEW_ACTION");
export const ASSETACCOUNTViewActionSuccess = createAction("ASSETACCOUNT_VIEW_ACTION_SUCCESS", (SuccessMessage: ASSETACCOUNTViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const ASSETACCOUNTViewActionProgress = createAction<number>("ASSETACCOUNT_VIEW_ACTION_PROGRESS");
export const ASSETACCOUNTViewActionFailure = createAction<string>("ASSETACCOUNT_VIEW_ACTION_FAILURE");
export const ASSETACCOUNTViewActionFailureCleanup = createAction("ASSETACCOUNT_VIEW_ACTION_FAILURE_CLEANUP");


export const ASSETACCOUNTViewSpecificEmployeeAction = createAction<{emp_no: number}>("ASSETACCOUNT_VIEW_SPECIFIC_EMPLOYEE_ACTION");
export const ASSETACCOUNTViewSpecificEmployeeActionSuccess = createAction("ASSETACCOUNT_VIEW_SPECIFIC_EMPLOYEE_ACTION_SUCCESS", (SuccessMessage: ASSETACCOUNTViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const ASSETACCOUNTViewSpecificEmployeeActionProgress = createAction<number>("ASSETACCOUNT_VIEW_SPECIFIC_EMPLOYEE_ACTION_PROGRESS");
export const ASSETACCOUNTViewSpecificEmployeeActionFailure = createAction<string>("ASSETACCOUNT_VIEW_SPECIFIC_EMPLOYEE_ACTION_FAILURE");
export const ASSETACCOUNTViewSpecificEmployeeActionFailureCleanup = createAction("ASSETACCOUNT_VIEW_SPECIFIC_EMPLOYEE_ACTION_FAILURE_CLEANUP");

export const ASSETACCOUNTViewSpecificAction = createAction<{asset_account_id: number, emp_no: number}>("ASSETACCOUNT_VIEW_SPECIFIC_ACTION");
export const ASSETACCOUNTViewSpecificActionSuccess = createAction("ASSETACCOUNT_VIEW_SPECIFIC_ACTION_SUCCESS", (SuccessMessage: ASSETACCOUNTViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const ASSETACCOUNTViewSpecificActionProgress = createAction<number>("ASSETACCOUNT_VIEW_SPECIFIC_ACTION_PROGRESS");
export const ASSETACCOUNTViewSpecificActionFailure = createAction<string>("ASSETACCOUNT_VIEW_SPECIFIC_ACTION_FAILURE");
export const ASSETACCOUNTViewSpecificActionFailureCleanup = createAction("ASSETACCOUNT_VIEW_SPECIFIC_ACTION_FAILURE_CLEANUP");

export const ASSETACCOUNTCreateAction = createAction<ASSETACCOUNTCreateInterface>("ASSETACCOUNT_CREATE_ACTION");
export const ASSETACCOUNTCreateActionSuccess = createAction("ASSETACCOUNT_CREATE_ACTION_SUCCESS", (SuccessMessage: ASSETACCOUNTCreateInterface) => { 
    return({ payload: {SuccessMessage} })
});
export const ASSETACCOUNTCreateActionProgress = createAction<number>("ASSETACCOUNT_CREATE_ACTION_PROGRESS");
export const ASSETACCOUNTCreateActionFailure = createAction<string>("ASSETACCOUNT_CREATE_ACTION_FAILURE");
export const ASSETACCOUNTCreateActionFailureCleanup = createAction("ASSETACCOUNT_CREATE_ACTION_FAILURE_CLEANUP");

export const ASSETACCOUNTEditAction = createAction<ASSETACCOUNTEditInterface>("ASSETACCOUNT_EDIT_ACTION");
export const ASSETACCOUNTEditActionSuccess = createAction("ASSETACCOUNT_EDIT_ACTION_SUCCESS", (SuccessMessage: ASSETACCOUNTEditInterface) => { 
    return({ payload: {SuccessMessage} })
});
export const ASSETACCOUNTEditActionProgress = createAction<number>("ASSETACCOUNT_EDIT_ACTION_PROGRESS");
export const ASSETACCOUNTEditActionFailure = createAction<string>("ASSETACCOUNT_EDIT_ACTION_FAILURE");
export const ASSETACCOUNTEditActionFailureCleanup = createAction("ASSETACCOUNT_EDIT_ACTION_FAILURE_CLEANUP");

