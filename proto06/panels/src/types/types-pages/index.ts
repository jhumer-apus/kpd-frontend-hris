export type previewDtrCsvItem = {
    bio_id: string;
    date_time: string;
    time_in: string;
    time_out: string;
    branch: string;
};


export type DTRCutoffSummaryType = {
    id: number;
    business_date_from: string;
    business_date_to: string;
    paid_leaves_total: number;
    reg_ot_total: number;
    nd_ot_total: number;
    sp_holiday_total: number;
    reg_holiday_total: number;
    absent_total: number;
    leaves_type_used?: string | null;
    overbreak_total?: string | number | null;
    lates_total: number;
    undertime_total: number;
    total_hours: number;
    is_processed: boolean;
    date_deleted?: string | null;
    emp_no: number;
    cutoff_code: number;
};

export type DTRCutoffListType = {
    id: number;
    co_name: string;
    co_description: string;
    co_date_from: string;
    co_date_to: string;
    reg_days_total: number;
    co_is_processed: boolean;
    credit_date: string;
    payroll_group_code: number;
    division_code: number;
}