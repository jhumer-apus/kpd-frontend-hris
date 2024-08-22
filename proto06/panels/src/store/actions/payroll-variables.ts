import { createAction } from '@reduxjs/toolkit';
import { 
    TAXCreateInterface,
    TAXEditInterface,
    TAXGenericInterface,
    TAXViewInterface,
    PAGIBIGCreateInterface,
    PAGIBIGEditInterface,
    PAGIBIGGenericInterface,
    PAGIBIGViewInterface,
    PHILHEALTHCreateInterface,
    PHILHEALTHEditInterface,
    PHILHEALTHGenericInterface,
    PHILHEALTHViewInterface,
    SSSCreateInterface,
    SSSEditInterface,
    SSSGenericInterface,
    SSSViewInterface,
    CASHADVANCECreateInterface,
    CASHADVANCEEditInterface,
    CASHADVANCEGenericInterface,
    CASHADVANCEViewInterface,
    ALLOWANCEENTRYCreateInterface,
    ALLOWANCEENTRYEditInterface,
    ALLOWANCEENTRYGenericInterface,
    ALLOWANCEENTRYViewInterface,
    ALLOWANCETYPECreateInterface,
    ALLOWANCETYPEEditInterface,
    ALLOWANCETYPEGenericInterface,
    ALLOWANCETYPEViewInterface,
} from '@/types/types-payroll-variables';




// TAX SECTION
export const TAXViewAction = createAction("TAX_VIEW_ACTION");
export const TAXViewActionSuccess = createAction("TAX_VIEW_ACTION_SUCCESS", (SuccessMessage: TAXViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const TAXViewActionProgress = createAction<number>("TAX_VIEW_ACTION_PROGRESS");
export const TAXViewActionFailure = createAction<string>("TAX_VIEW_ACTION_FAILURE");
export const TAXViewActionFailureCleanup = createAction("TAX_VIEW_ACTION_FAILURE_CLEANUP");


export const TAXViewSpecificAction = createAction<{emp_no: number}>("TAX_VIEW_SPECIFIC_ACTION");
export const TAXViewSpecificActionSuccess = createAction("TAX_VIEW_SPECIFIC_ACTION_SUCCESS", (SuccessMessage: TAXViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const TAXViewSpecificActionProgress = createAction<number>("TAX_VIEW_SPECIFIC_ACTION_PROGRESS");
export const TAXViewSpecificActionFailure = createAction<string>("TAX_VIEW_SPECIFIC_ACTION_FAILURE");
export const TAXViewSpecificActionFailureCleanup = createAction("TAX_VIEW_SPECIFIC_ACTION_FAILURE_CLEANUP");

export const TAXCreateAction = createAction<TAXCreateInterface>("TAX_CREATE_ACTION");
export const TAXCreateActionSuccess = createAction("TAX_CREATE_ACTION_SUCCESS", (SuccessMessage: TAXCreateInterface) => { 
    return({ payload: {SuccessMessage} })
});
export const TAXCreateActionProgress = createAction<number>("TAX_CREATE_ACTION_PROGRESS");
export const TAXCreateActionFailure = createAction<string>("TAX_CREATE_ACTION_FAILURE");
export const TAXCreateActionFailureCleanup = createAction("TAX_CREATE_ACTION_FAILURE_CLEANUP");

export const TAXEditAction = createAction<TAXEditInterface>("TAX_EDIT_ACTION");
export const TAXEditActionSuccess = createAction("TAX_EDIT_ACTION_SUCCESS", (SuccessMessage: TAXEditInterface) => { 
    return({ payload: {SuccessMessage} })
});
export const TAXEditActionProgress = createAction<number>("TAX_EDIT_ACTION_PROGRESS");
export const TAXEditActionFailure = createAction<string>("TAX_EDIT_ACTION_FAILURE");
export const TAXEditActionFailureCleanup = createAction("TAX_EDIT_ACTION_FAILURE_CLEANUP");



// PAGIBIG SECTION
export const PAGIBIGViewAction = createAction("PAGIBIG_VIEW_ACTION");
export const PAGIBIGViewActionSuccess = createAction("PAGIBIG_VIEW_ACTION_SUCCESS", (SuccessMessage: PAGIBIGViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const PAGIBIGViewActionProgress = createAction<number>("PAGIBIG_VIEW_ACTION_PROGRESS");
export const PAGIBIGViewActionFailure = createAction<string>("PAGIBIG_VIEW_ACTION_FAILURE");
export const PAGIBIGViewActionFailureCleanup = createAction("PAGIBIG_VIEW_ACTION_FAILURE_CLEANUP");


export const PAGIBIGViewSpecificAction = createAction<{emp_no: number}>("PAGIBIG_VIEW_SPECIFIC_ACTION");
export const PAGIBIGViewSpecificActionSuccess = createAction("PAGIBIG_VIEW_SPECIFIC_ACTION_SUCCESS", (SuccessMessage: PAGIBIGViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const PAGIBIGViewSpecificActionProgress = createAction<number>("PAGIBIG_VIEW_SPECIFIC_ACTION_PROGRESS");
export const PAGIBIGViewSpecificActionFailure = createAction<string>("PAGIBIG_VIEW_SPECIFIC_ACTION_FAILURE");
export const PAGIBIGViewSpecificActionFailureCleanup = createAction("PAGIBIG_VIEW_SPECIFIC_ACTION_FAILURE_CLEANUP");

export const PAGIBIGCreateAction = createAction<PAGIBIGCreateInterface>("PAGIBIG_CREATE_ACTION");
export const PAGIBIGCreateActionSuccess = createAction("PAGIBIG_CREATE_ACTION_SUCCESS", (SuccessMessage: PAGIBIGCreateInterface) => { 
    return({ payload: {SuccessMessage} })
});
export const PAGIBIGCreateActionProgress = createAction<number>("PAGIBIG_CREATE_ACTION_PROGRESS");
export const PAGIBIGCreateActionFailure = createAction<string>("PAGIBIG_CREATE_ACTION_FAILURE");
export const PAGIBIGCreateActionFailureCleanup = createAction("PAGIBIG_CREATE_ACTION_FAILURE_CLEANUP");

export const PAGIBIGEditAction = createAction<PAGIBIGEditInterface>("PAGIBIG_EDIT_ACTION");
export const PAGIBIGEditActionSuccess = createAction("PAGIBIG_EDIT_ACTION_SUCCESS", (SuccessMessage: PAGIBIGEditInterface) => { 
    return({ payload: {SuccessMessage} })
});
export const PAGIBIGEditActionProgress = createAction<number>("PAGIBIG_EDIT_ACTION_PROGRESS");
export const PAGIBIGEditActionFailure = createAction<string>("PAGIBIG_EDIT_ACTION_FAILURE");
export const PAGIBIGEditActionFailureCleanup = createAction("PAGIBIG_EDIT_ACTION_FAILURE_CLEANUP");


// SSS SECTION
export const SSSViewAction = createAction("SSS_VIEW_ACTION");
export const SSSViewActionSuccess = createAction("SSS_VIEW_ACTION_SUCCESS", (SuccessMessage: SSSViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const SSSViewActionProgress = createAction<number>("SSS_VIEW_ACTION_PROGRESS");
export const SSSViewActionFailure = createAction<string>("SSS_VIEW_ACTION_FAILURE");
export const SSSViewActionFailureCleanup = createAction("SSS_VIEW_ACTION_FAILURE_CLEANUP");


export const SSSViewSpecificAction = createAction<{emp_no: number}>("SSS_VIEW_SPECIFIC_ACTION");
export const SSSViewSpecificActionSuccess = createAction("SSS_VIEW_SPECIFIC_ACTION_SUCCESS", (SuccessMessage: SSSViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const SSSViewSpecificActionProgress = createAction<number>("SSS_VIEW_SPECIFIC_ACTION_PROGRESS");
export const SSSViewSpecificActionFailure = createAction<string>("SSS_VIEW_SPECIFIC_ACTION_FAILURE");
export const SSSViewSpecificActionFailureCleanup = createAction("SSS_VIEW_SPECIFIC_ACTION_FAILURE_CLEANUP");

export const SSSCreateAction = createAction<SSSCreateInterface>("SSS_CREATE_ACTION");
export const SSSCreateActionSuccess = createAction("SSS_CREATE_ACTION_SUCCESS", (SuccessMessage: SSSCreateInterface) => { 
    return({ payload: {SuccessMessage} })
});
export const SSSCreateActionProgress = createAction<number>("SSS_CREATE_ACTION_PROGRESS");
export const SSSCreateActionFailure = createAction<string>("SSS_CREATE_ACTION_FAILURE");
export const SSSCreateActionFailureCleanup = createAction("SSS_CREATE_ACTION_FAILURE_CLEANUP");

export const SSSEditAction = createAction<SSSEditInterface>("SSS_EDIT_ACTION");
export const SSSEditActionSuccess = createAction("SSS_EDIT_ACTION_SUCCESS", (SuccessMessage: SSSEditInterface) => { 
    return({ payload: {SuccessMessage} })
});
export const SSSEditActionProgress = createAction<number>("SSS_EDIT_ACTION_PROGRESS");
export const SSSEditActionFailure = createAction<string>("SSS_EDIT_ACTION_FAILURE");
export const SSSEditActionFailureCleanup = createAction("SSS_EDIT_ACTION_FAILURE_CLEANUP");


// PHILHEALTH SECTION
export const PHILHEALTHViewAction = createAction("PHILHEALTH_VIEW_ACTION");
export const PHILHEALTHViewActionSuccess = createAction("PHILHEALTH_VIEW_ACTION_SUCCESS", (SuccessMessage: PHILHEALTHViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const PHILHEALTHViewActionProgress = createAction<number>("PHILHEALTH_VIEW_ACTION_PROGRESS");
export const PHILHEALTHViewActionFailure = createAction<string>("PHILHEALTH_VIEW_ACTION_FAILURE");
export const PHILHEALTHViewActionFailureCleanup = createAction("PHILHEALTH_VIEW_ACTION_FAILURE_CLEANUP");


export const PHILHEALTHViewSpecificAction = createAction<{emp_no: number}>("PHILHEALTH_VIEW_SPECIFIC_ACTION");
export const PHILHEALTHViewSpecificActionSuccess = createAction("PHILHEALTH_VIEW_SPECIFIC_ACTION_SUCCESS", (SuccessMessage: PHILHEALTHViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const PHILHEALTHViewSpecificActionProgress = createAction<number>("PHILHEALTH_VIEW_SPECIFIC_ACTION_PROGRESS");
export const PHILHEALTHViewSpecificActionFailure = createAction<string>("PHILHEALTH_VIEW_SPECIFIC_ACTION_FAILURE");
export const PHILHEALTHViewSpecificActionFailureCleanup = createAction("PHILHEALTH_VIEW_SPECIFIC_ACTION_FAILURE_CLEANUP");

export const PHILHEALTHCreateAction = createAction<PHILHEALTHCreateInterface>("PHILHEALTH_CREATE_ACTION");
export const PHILHEALTHCreateActionSuccess = createAction("PHILHEALTH_CREATE_ACTION_SUCCESS", (SuccessMessage: PHILHEALTHCreateInterface) => { 
    return({ payload: {SuccessMessage} })
});
export const PHILHEALTHCreateActionProgress = createAction<number>("PHILHEALTH_CREATE_ACTION_PROGRESS");
export const PHILHEALTHCreateActionFailure = createAction<string>("PHILHEALTH_CREATE_ACTION_FAILURE");
export const PHILHEALTHCreateActionFailureCleanup = createAction("PHILHEALTH_CREATE_ACTION_FAILURE_CLEANUP");

export const PHILHEALTHEditAction = createAction<PHILHEALTHEditInterface>("PHILHEALTH_EDIT_ACTION");
export const PHILHEALTHEditActionSuccess = createAction("PHILHEALTH_EDIT_ACTION_SUCCESS", (SuccessMessage: PHILHEALTHEditInterface) => { 
    return({ payload: {SuccessMessage} })
});
export const PHILHEALTHEditActionProgress = createAction<number>("PHILHEALTH_EDIT_ACTION_PROGRESS");
export const PHILHEALTHEditActionFailure = createAction<string>("PHILHEALTH_EDIT_ACTION_FAILURE");
export const PHILHEALTHEditActionFailureCleanup = createAction("PHILHEALTH_EDIT_ACTION_FAILURE_CLEANUP");




// CASHADVANCE SECTION
export const CASHADVANCEViewAction = createAction("CASHADVANCE_VIEW_ACTION");
export const CASHADVANCEViewActionSuccess = createAction("CASHADVANCE_VIEW_ACTION_SUCCESS", (SuccessMessage: CASHADVANCEViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const CASHADVANCEViewActionProgress = createAction<number>("CASHADVANCE_VIEW_ACTION_PROGRESS");
export const CASHADVANCEViewActionFailure = createAction<string>("CASHADVANCE_VIEW_ACTION_FAILURE");
export const CASHADVANCEViewActionFailureCleanup = createAction("CASHADVANCE_VIEW_ACTION_FAILURE_CLEANUP");

export const CASHADVANCEViewSpecificEmployeeAction = createAction<{emp_no: number}>("CASHADVANCE_VIEW_SPECIFIC_EMPLOYEE_ACTION");
export const CASHADVANCEViewSpecificEmployeeActionSuccess = createAction("CASHADVANCE_VIEW_SPECIFIC_EMPLOYEE_ACTION_SUCCESS", (SuccessMessage: CASHADVANCEViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const CASHADVANCEViewSpecificEmployeeActionProgress = createAction<number>("CASHADVANCE_VIEW_SPECIFIC_EMPLOYEE_ACTION_PROGRESS");
export const CASHADVANCEViewSpecificEmployeeActionFailure = createAction<string>("CASHADVANCE_VIEW_SPECIFIC_EMPLOYEE_ACTION_FAILURE");
export const CASHADVANCEViewSpecificEmployeeActionFailureCleanup = createAction("CASHADVANCE_VIEW_SPECIFIC_EMPLOYEE_ACTION_FAILURE_CLEANUP");


export const CASHADVANCEViewSpecificAction = createAction<{emp_no: number, ca_no: number}>("CASHADVANCE_VIEW_SPECIFIC_ACTION");
export const CASHADVANCEViewSpecificActionSuccess = createAction("CASHADVANCE_VIEW_SPECIFIC_ACTION_SUCCESS", (SuccessMessage: CASHADVANCEViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const CASHADVANCEViewSpecificActionProgress = createAction<number>("CASHADVANCE_VIEW_SPECIFIC_ACTION_PROGRESS");
export const CASHADVANCEViewSpecificActionFailure = createAction<string>("CASHADVANCE_VIEW_SPECIFIC_ACTION_FAILURE");
export const CASHADVANCEViewSpecificActionFailureCleanup = createAction("CASHADVANCE_VIEW_SPECIFIC_ACTION_FAILURE_CLEANUP");

export const CASHADVANCECreateAction = createAction<CASHADVANCECreateInterface>("CASHADVANCE_CREATE_ACTION");
export const CASHADVANCECreateActionSuccess = createAction("CASHADVANCE_CREATE_ACTION_SUCCESS", (SuccessMessage: CASHADVANCECreateInterface) => { 
    return({ payload: {SuccessMessage} })
});
export const CASHADVANCECreateActionProgress = createAction<number>("CASHADVANCE_CREATE_ACTION_PROGRESS");
export const CASHADVANCECreateActionFailure = createAction<string>("CASHADVANCE_CREATE_ACTION_FAILURE");
export const CASHADVANCECreateActionFailureCleanup = createAction("CASHADVANCE_CREATE_ACTION_FAILURE_CLEANUP");

export const CASHADVANCEEditAction = createAction<CASHADVANCEEditInterface>("CASHADVANCE_EDIT_ACTION");
export const CASHADVANCEEditActionSuccess = createAction("CASHADVANCE_EDIT_ACTION_SUCCESS", (SuccessMessage: CASHADVANCEViewInterface) => { 
    return({ payload: {SuccessMessage} })
});
export const CASHADVANCEEditActionProgress = createAction<number>("CASHADVANCE_EDIT_ACTION_PROGRESS");
export const CASHADVANCEEditActionFailure = createAction<string>("CASHADVANCE_EDIT_ACTION_FAILURE");
export const CASHADVANCEEditActionFailureCleanup = createAction("CASHADVANCE_EDIT_ACTION_FAILURE_CLEANUP");




// ALLOWANCETYPE SECTION
export const ALLOWANCETYPEViewAction = createAction("ALLOWANCETYPE_VIEW_ACTION");
export const ALLOWANCETYPEViewActionSuccess = createAction("ALLOWANCETYPE_VIEW_ACTION_SUCCESS", (SuccessMessage: ALLOWANCETYPEViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const ALLOWANCETYPEViewActionProgress = createAction<number>("ALLOWANCETYPE_VIEW_ACTION_PROGRESS");
export const ALLOWANCETYPEViewActionFailure = createAction<string>("ALLOWANCETYPE_VIEW_ACTION_FAILURE");
export const ALLOWANCETYPEViewActionFailureCleanup = createAction("ALLOWANCETYPE_VIEW_ACTION_FAILURE_CLEANUP");

export const ALLOWANCETYPEViewSpecificAction = createAction<{at_no: number}>("ALLOWANCETYPE_VIEW_SPECIFIC_ACTION");
export const ALLOWANCETYPEViewSpecificActionSuccess = createAction("ALLOWANCETYPE_VIEW_SPECIFIC_ACTION_SUCCESS", (SuccessMessage: ALLOWANCETYPEViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const ALLOWANCETYPEViewSpecificActionProgress = createAction<number>("ALLOWANCETYPE_VIEW_SPECIFIC_ACTION_PROGRESS");
export const ALLOWANCETYPEViewSpecificActionFailure = createAction<string>("ALLOWANCETYPE_VIEW_SPECIFIC_ACTION_FAILURE");
export const ALLOWANCETYPEViewSpecificActionFailureCleanup = createAction("ALLOWANCETYPE_VIEW_SPECIFIC_ACTION_FAILURE_CLEANUP");

export const ALLOWANCETYPECreateAction = createAction<ALLOWANCETYPECreateInterface>("ALLOWANCETYPE_CREATE_ACTION");
export const ALLOWANCETYPECreateActionSuccess = createAction("ALLOWANCETYPE_CREATE_ACTION_SUCCESS", (SuccessMessage: ALLOWANCETYPECreateInterface) => { 
    return({ payload: {SuccessMessage} })
});
export const ALLOWANCETYPECreateActionProgress = createAction<number>("ALLOWANCETYPE_CREATE_ACTION_PROGRESS");
export const ALLOWANCETYPECreateActionFailure = createAction<string>("ALLOWANCETYPE_CREATE_ACTION_FAILURE");
export const ALLOWANCETYPECreateActionFailureCleanup = createAction("ALLOWANCETYPE_CREATE_ACTION_FAILURE_CLEANUP");

export const ALLOWANCETYPEEditAction = createAction<ALLOWANCETYPEEditInterface>("ALLOWANCETYPE_EDIT_ACTION");
export const ALLOWANCETYPEEditActionSuccess = createAction("ALLOWANCETYPE_EDIT_ACTION_SUCCESS", (SuccessMessage: ALLOWANCETYPEEditInterface) => { 
    return({ payload: {SuccessMessage} })
});
export const ALLOWANCETYPEEditActionProgress = createAction<number>("ALLOWANCETYPE_EDIT_ACTION_PROGRESS");
export const ALLOWANCETYPEEditActionFailure = createAction<string>("ALLOWANCETYPE_EDIT_ACTION_FAILURE");
export const ALLOWANCETYPEEditActionFailureCleanup = createAction("ALLOWANCETYPE_EDIT_ACTION_FAILURE_CLEANUP");


// ALLOWANCEENTRY SECTION
export const ALLOWANCEENTRYViewAction = createAction("ALLOWANCEENTRY_VIEW_ACTION");
export const ALLOWANCEENTRYViewActionSuccess = createAction("ALLOWANCEENTRY_VIEW_ACTION_SUCCESS", (SuccessMessage: ALLOWANCEENTRYViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const ALLOWANCEENTRYViewActionProgress = createAction<number>("ALLOWANCEENTRY_VIEW_ACTION_PROGRESS");
export const ALLOWANCEENTRYViewActionFailure = createAction<string>("ALLOWANCEENTRY_VIEW_ACTION_FAILURE");
export const ALLOWANCEENTRYViewActionFailureCleanup = createAction("ALLOWANCEENTRY_VIEW_ACTION_FAILURE_CLEANUP");

export const ALLOWANCEENTRYViewSpecificAction = createAction<{ae_no: number}>("ALLOWANCEENTRY_VIEW_SPECIFIC_ACTION");
export const ALLOWANCEENTRYViewSpecificActionSuccess = createAction("ALLOWANCEENTRY_VIEW_SPECIFIC_ACTION_SUCCESS", (SuccessMessage: ALLOWANCEENTRYViewInterface[]) => { 
    return({ payload: {SuccessMessage} })});
export const ALLOWANCEENTRYViewSpecificActionProgress = createAction<number>("ALLOWANCEENTRY_VIEW_SPECIFIC_ACTION_PROGRESS");
export const ALLOWANCEENTRYViewSpecificActionFailure = createAction<string>("ALLOWANCEENTRY_VIEW_SPECIFIC_ACTION_FAILURE");
export const ALLOWANCEENTRYViewSpecificActionFailureCleanup = createAction("ALLOWANCEENTRY_VIEW_SPECIFIC_ACTION_FAILURE_CLEANUP");

export const ALLOWANCEENTRYCreateAction = createAction<ALLOWANCEENTRYCreateInterface>("ALLOWANCEENTRY_CREATE_ACTION");
export const ALLOWANCEENTRYCreateActionSuccess = createAction("ALLOWANCEENTRY_CREATE_ACTION_SUCCESS", (SuccessMessage: ALLOWANCEENTRYCreateInterface) => { 
    return({ payload: {SuccessMessage} })
});
export const ALLOWANCEENTRYCreateActionProgress = createAction<number>("ALLOWANCEENTRY_CREATE_ACTION_PROGRESS");
export const ALLOWANCEENTRYCreateActionFailure = createAction<string>("ALLOWANCEENTRY_CREATE_ACTION_FAILURE");
export const ALLOWANCEENTRYCreateActionFailureCleanup = createAction("ALLOWANCEENTRY_CREATE_ACTION_FAILURE_CLEANUP");

export const ALLOWANCEENTRYEditAction = createAction<ALLOWANCEENTRYEditInterface>("ALLOWANCEENTRY_EDIT_ACTION");
export const ALLOWANCEENTRYEditActionSuccess = createAction("ALLOWANCEENTRY_EDIT_ACTION_SUCCESS", (SuccessMessage: ALLOWANCEENTRYEditInterface) => { 
    return({ payload: {SuccessMessage} })
});
export const ALLOWANCEENTRYEditActionProgress = createAction<number>("ALLOWANCEENTRY_EDIT_ACTION_PROGRESS");
export const ALLOWANCEENTRYEditActionFailure = createAction<string>("ALLOWANCEENTRY_EDIT_ACTION_FAILURE");
export const ALLOWANCEENTRYEditActionFailureCleanup = createAction("ALLOWANCEENTRY_EDIT_ACTION_FAILURE_CLEANUP");









