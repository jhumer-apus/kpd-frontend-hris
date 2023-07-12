import { createAction } from '@reduxjs/toolkit';
import { HolidayGetType } from '@/types/types-pages';


export const HolidaysGet = createAction("HOLIDAYS_GET");
export const HolidaysGetSuccess = createAction("HOLIDAYS_GET_SUCCESS", (SuccessMessage: HolidayGetType[]) => { 
    // console.log
    return({ payload: {SuccessMessage} })});
export const HolidaysGetProgress = createAction<number>("HOLIDAYS_GET_PROGRESS");
export const HolidaysGetFailure = createAction<string>("HOLIDAYS_GET_FAILURE");
export const HolidaysGetFailureCleanup = createAction("HOLIDAYS_GET_FAILURE_CLEANUP");


export const HolidayCreate = createAction<HolidayGetType>("HOLIDAY_CREATE");
export const HolidayCreateSuccess = createAction("HOLIDAY_CREATE_SUCCESS", (SuccessMessage: HolidayGetType) => { 
    // console.log
    return({ payload: {SuccessMessage} })
});
export const HolidayCreateProgress = createAction<number>("HOLIDAY_CREATE_PROGRESS");
export const HolidayCreateFailure = createAction<string>("HOLIDAY_CREATE_FAILURE");
export const HolidayCreateFailureCleanup = createAction("HOLIDAY_CREATE_FAILURE_CLEANUP");


export const HolidayEditSubmit = createAction<HolidayGetType>("HOLIDAY_EDIT_SUBMIT");
export const HolidayEditSubmitSuccess = createAction("HOLIDAY_EDIT_SUBMIT_SUCCESS", (SuccessMessage: HolidayGetType) => { 
    // console.log
    return({ payload: {SuccessMessage} })
});
export const HolidayEditSubmitProgress = createAction<number>("HOLIDAY_EDIT_SUBMIT_PROGRESS");
export const HolidayEditSubmitFailure = createAction<string>("HOLIDAY_EDIT_SUBMIT_FAILURE");
export const HolidayEditSubmitFailureCleanup = createAction("HOLIDAY_EDIT_SUBMIT_FAILURE_CLEANUP");
