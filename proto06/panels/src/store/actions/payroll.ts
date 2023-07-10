import { createAction } from '@reduxjs/toolkit';
import { ViewPayrollPayPerEmployee, ProcessPayroll } from '@/types/types-pages';


export const viewPayrollList = createAction("VIEW_PAYROLL_LIST");
export const viewPayrollListSuccess = createAction("VIEW_PAYROLL_LIST_SUCCESS", (data: ViewPayrollPayPerEmployee[]) => { 
    // console.log
    return({ payload: data })});
export const viewPayrollListProgress = createAction<number>("VIEW_PAYROLL_LIST_PROGRESS");
export const viewPayrollListFailure = createAction<string>("VIEW_PAYROLL_LIST_FAILURE");


// export const generatePayslip = createAction("VIEW_PAYROLL_LIST");
export const generatePayslipMultiple = createAction("GENERATE_PAYSLIP_MULTIPLE", (data: number[]) => { 
    // console.log
    return({ payload: data })});
// export const viewPayrollListProgress = createAction<number>("VIEW_PAYROLL_LIST_PROGRESS");
// export const viewPayrollListFailure = createAction<string>("VIEW_PAYROLL_LIST_FAILURE");


// /* 

// */
// export const processPayroll = createAction("PROCESS_PAYROLL");
// export const processPayrollSuccess = createAction("PROCESS_PAYROLL_SUCCESS", (data: number[]) => {
// return ({payload: data})    
// });                               
// export const processPayrollProgress = createAction("PROCESS_PAYROLL_PROGRESS");
// export const processPayrollFailure = createAction("PROCESS_PAYROLL_FAILURE");


export const processPayroll = createAction<ProcessPayroll>("PROCESS_PAYROLL");
export const processPayrollSuccess = createAction("PROCESS_PAYROLL_SUCCESS", (SuccessMessage: string) => { 
    // console.log
    return({ payload: {SuccessMessage} })});
export const processPayrollProgress = createAction<number>('PROCESS_PAYROLL_PROGRESS');
export const processPayrollFailure = createAction<string>("PROCESS_PAYROLL_FAILURE");
export const processPayrollFailureCleanup = createAction("PROCESS_PAYROLL_FAILURE_CLEANUP");
