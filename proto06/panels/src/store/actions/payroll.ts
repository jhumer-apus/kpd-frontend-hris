import { createAction } from '@reduxjs/toolkit';
import { ViewPayrollPayPerEmployee } from '@/types/types-pages';


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
