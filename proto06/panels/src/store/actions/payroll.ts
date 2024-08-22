import { createAction } from '@reduxjs/toolkit';
import { ViewPayrollPayPerEmployee, ProcessPayroll } from '@/types/types-pages';


export const viewPayrollList = createAction("VIEW_PAYROLL_LIST");
export const viewPayrollListSuccess = createAction("VIEW_PAYROLL_LIST_SUCCESS", (data: ViewPayrollPayPerEmployee[]) => { 
    return({ payload: data })});
export const viewPayrollListProgress = createAction<number>("VIEW_PAYROLL_LIST_PROGRESS");
export const viewPayrollListFailure = createAction<string>("VIEW_PAYROLL_LIST_FAILURE");


// export const generatePayslip = createAction("VIEW_PAYROLL_LIST");
export const generatePayslipMultiple = createAction("GENERATE_PAYSLIP_MULTIPLE", (data: number[]) => { 
    return({ payload: data })});
// export const viewPayrollListProgress = createAction<number>("VIEW_PAYROLL_LIST_PROGRESS");
// export const viewPayrollListFailure = createAction<string>("VIEW_PAYROLL_LIST_FAILURE");


export const processPayroll = createAction<ProcessPayroll>("PROCESS_PAYROLL");
export const processPayrollSuccess = createAction("PROCESS_PAYROLL_SUCCESS", (SuccessMessage: string) => { 
    return({ payload: {SuccessMessage} })});
export const processPayrollProgress = createAction<number>('PROCESS_PAYROLL_PROGRESS');
export const processPayrollFailure = createAction<string>("PROCESS_PAYROLL_FAILURE");
export const processPayrollFailureCleanup = createAction("PROCESS_PAYROLL_FAILURE_CLEANUP");

export const viewSpecificPayrollList = createAction<{emp_no: number}>("VIEW_SPECIFIC_PAYROLL_LIST");
export const viewSpecificPayrollListSuccess = createAction("VIEW_SPECIFIC_PAYROLL_LIST_SUCCESS", (data: ViewPayrollPayPerEmployee[]) => { 
    return({ payload: data })});
export const viewSpecificPayrollListProgress = createAction<number>("VIEW_SPECIFIC_PAYROLL_LIST_PROGRESS");
export const viewSpecificPayrollListFailure = createAction<string>("VIEW_SPECIFIC_PAYROLL_LIST_FAILURE");
