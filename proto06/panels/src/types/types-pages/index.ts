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

export type DTRCutoffListEmployees = {
    id: number;
    user: object | null;
    employee_image: string | null;
    emp_no: number;
    first_name: string;
    middle_name: string | null;
    last_name: string;
    suffix: string | null;
    birthday: string;
    birth_place: string | null;
    civil_status: string;
    gender: string;
    address: string;
    provincial_address: string | null;
    mobile_phone: string;
    email_address: string;
    bio_id: number | null;
    date_hired: string;
    date_resigned: string | null;
    approver: number;
    date_added: string;
    date_deleted: string | null;
    city_code: number | null;
    branch_code: number | null;
    department_code: number | null;
    division_code: number | null;
    position_code: number | null;
    rank_code: number | null;
    payroll_group_code: number;
    tax_code: string | null;
    pagibig_code: string | null;
    sssid_code: string | null;
    philhealth_code: string | null;
}


export type CutoffListMergeSelectionState = {
    emp_no: number[],
    cutoff_code: number,
}



export type ViewPayrollPayPerEmployee = {
    id: number;
    emp_cname: string;
    run_date: string;
    accnt_no: string;
    salary_basic: number;
    salary_allowance: number;
    salary_other: number;
    salary_type: string;
    work_days_total: number;
    daily_salary_basic: number;
    daily_salary_allowance: number;
    daily_salary_other: number;
    leaves_amount_a: number;
    ot_amount_a: number;
    nd_amount_a: number;
    reg_holiday_amount_a: number;
    sp_holiday_amount_a: number;
    lates_amount_d: number;
    utime_amount_d: number;
    sssc_amount_d: number;
    sss_cashloan_d: number;
    sss_calloan_d: number;
    pagibigc_amount_d: number;
    pagibig_cloan_d: number;
    pagibig_hloan_d: number;
    pagibig_calloan_d: number;
    philhealthc_amount_d: number;
    cash_advance_amount_d: number;
    insurance_d: number;
    other_d: number;
    gross_pay: number;
    tax_amount_d: number;
    net_pay: number;
    absent_amount: number;
    date_deleted: string | null;
    is_payslip_printed: boolean;
    pr_cutoff_code: number;
    emp_no: number;
    cutoff_summary_code: number;
}