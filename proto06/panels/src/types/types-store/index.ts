import { RankDataInterface } from "../types-pages";

export interface UserType {
    id: number;
    is_superuser: Boolean;
    first_name: string;
    last_name: string;
    email: string;
    is_staff: Boolean;
    date_joined: Date;
    username: string;
    role: number;
    is_active: Boolean;
    is_locked: Boolean;
    is_logged_in: Boolean;
    date_added: Date;
    date_deleted?: Date;
    failed_login_attempts: number;
    last_login: Date;
    old_password: string;
    date_password_changed?: Date;
    employee_number: number;
    groups: Array<number>;
    user_permissions: Array<number>;
};




export interface EmployeeDetailsType {
    id: number;
    employee_image?: string;
    emp_no: number;
    first_name: string;
    middle_name?: string;
    last_name: string;
    suffix?: string;
    birthdate: Date;
    birth_place?: string;
    civil_status: string;
    gender: string;
    address: string;
    provincial_address?: string;
    mobile_phone: string;
    email_address?: string;
    date_hired: Date;
    date_resigned?: Date;
    approver: number;
    date_added: Date;
    date_deleted?: Date;
    philhealth_code?: string;
    bio_id?: string;
    branch_code?: string;
    department_code?: string;
    division_code?: string;
    payroll_group_code?: string;
    position_code?: string;
    rank_code?: string | number;
    tax_code?: string;
    city_code?: string;
    pagibig_code?: string;
    sssid_code?: string;
    rank_data: RankDataInterface;
};


export interface GetEmployeesListsType {
    [key: string]: any;
    id: number;
    employee_image: string;
    emp_no: number;
    first_name: string;
    middle_name: string;
    last_name: string;
    suffix: string;
    birthdate: Date;
    birth_place: string;
    civil_status: string;
    gender: string;
    address: string;
    provincial_address: string;
    mobile_phone: string;
    email_address: string;
    date_hired: Date;
    date_resigned: Date;
    approver: number;
    date_added: Date;
    date_deleted: Date;
    philhealth_code: string;
    bio_id: string;
    branch_code: string;
    department_code: string;
    division_code: string;
    payroll_group_code: string;
    position_code: string;
    rank_code: string;
    tax_code: string;
    city_code: string;
    pagibig_code: string;
    sssid_code: string;
    user: {
        is_superuser: boolean;
        username: string;
        role: number;
        is_active: boolean;
        is_logged_in: boolean;
        is_locked: boolean;
        failed_login_attempts: number;
        last_login: Date;
        old_password: string;
        date_password_changed: Date; 
        date_added: Date;
        date_deleted: Date;
        emp_no: number;
        groups: Array<string>;
        user_permissions: Array<string>;
    }
};

export interface ViewAllDtrLogsType {
    [key: string]: number | string | Date | boolean;
    id: number,
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
};

export interface ViewMergedDtrLogsType {
    [key: string]: number | string | Date | boolean | null;
    id: number,
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
};

export interface ViewCutoffDtrSummaryType {
    [key: string]: number | Date | string | null | boolean;
    id: number,
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
};


export type DtrData = Array<ViewAllDtrLogsType> | Array<ViewMergedDtrLogsType> | Array<ViewCutoffDtrSummaryType> | null;