import { RankDataInterface } from "../types-pages";


export enum Internal_User_Role {
    Developer = 1,
    HR_Super_Admin = 2,
    HR_Admin = 3,
    HR_Staff = 4,
    Employee = 5,
}

export interface UserType {
    readonly id?: number,
    is_superuser: Boolean,
    first_name: string,
    last_name: string,
    email: string,
    is_staff: Boolean,
    date_joined: Date,
    username: string,
    role: Internal_User_Role,
    is_active: Boolean,
    is_locked: Boolean,
    is_logged_in: Boolean,
    date_added: Date,
    date_deleted?: Date,
    failed_login_attempts: number,
    last_login: Date,
    old_password: string,
    date_password_changed?: Date,
    employee_number: number,
    groups: Array<number>,
    user_permissions: Array<number>,
}

export interface GetEmployeesListsType {
    [key: string]: any,
    accnt_no: string,
    address: string,
    approver1: number | null, 
    approver2: number | null, 
    bio_id: number, 
    birth_place: string,
    birthday: string,
    branch_code: number, 
    city_code: string | null, 
    civil_status: string,
    date_added: string,
    date_deleted: string | null,
    date_hired: string,
    date_resigned: string | null,
    department_code: string | null,
    division_code: string | null,
    ecola: number | string | null,
    email_address: string,
    emp_no: number,
    emp_salary_basic: number,
    emp_salary_type: string,
    employee_image: string,
    first_name: string,
    gender: string,
    readonly id?: number,
    insurance_life: string | null,
    last_name: string,
    middle_name: string | null,
    mobile_phone: string,
    other_deductible: string | null,
    pagibig_code: string | null,
    payroll_group_code: number | null,
    philhealth_code: string | null,
    position_code: string | null,
    provincial_address: string | null,
    rank_code: number,
    rank_data: RankDataInterface,
    sssid_code: string,
    suffix: string,
    tax_code: string,
    user: UserType | null,
    rank_hierarchy: number,
}

export interface ViewAllDtrLogsType {
    [key: string]: number | string | Date | boolean | undefined,
    readonly id?: number,
    datetime_bio: Date,
    flag1_in_out: boolean,
    flag2_lout_lin: boolean,
    entry_type: string,
    date_uploaded: Date,
    is_processed: boolean,
    emp_no: number,
    bio_id: number,
    branch_code: number,
    schedule_daily_code: number,
}

export interface ViewMergedDtrLogsType {
    [key: string]: number | string | Date | boolean | null | undefined,
    readonly id?: number,
    business_date: Date,
    shift_name: string,
    duty_in: Date,
    dutiy_out: Date,
    sched_timein: string,
    sched_timeout: string,
    is_sched_restday: boolean,
    lunch_out: string | boolean,
    lunch_in: string | boolean,
    is_paid_leave: boolean,
    paid_leave_type: string | null,
    reg_ot_total: number,
    nd_ot_total: number,
    is_obt: boolean,
    is_sp_holiday: boolean,
    is_reg_holiday: boolean,
    is_ua: boolean,
    is_absent: boolean,
    overbreak: number | boolean,
    lates: number,
    undertime: number,
    total_hours: number,
    adjusted_timein: number | null,
    adjusted_timeout: number | null,
    is_computed: boolean,
    emp_no: number,
    cutoff_code: number,
}

export interface ViewCutoffDtrSummaryType {
    [key: string]: number | Date | string | null | boolean | undefined,
    readonly id?: number,
    business_date_from: Date,
    business_date_to: Date,
    paid_leaves_total: number,
    reg_ot_total: number,
    nd_ot_total: number,
    sp_holiday_total: number,
    reg_holiday_total: number,
    absent_total: number,
    leaves_type_used: number | string | null,
    overbreak_total: number | null,
    lates_total: number,
    undertime_total: number,
    total_hours: number,
    is_processed: boolean,
    date_deleted: Date | null,
    emp_no: number,
    cutoff_code: number,
}


export type DtrData = Array<ViewAllDtrLogsType> | Array<ViewMergedDtrLogsType> | Array<ViewCutoffDtrSummaryType> | null;