export interface UserType {
    id: Number;
    is_superuser: Boolean;
    first_name: String;
    last_name: String;
    email: String;
    is_staff: Boolean;
    date_joined: Date;
    username: String;
    role: Number;
    is_active: Boolean;
    is_locked: Boolean;
    is_logged_in: Boolean;
    date_added: Date;
    date_deleted?: Date;
    failed_login_attempts: Number;
    last_login: Date;
    old_password: String;
    date_password_changed?: Date;
    employee_number: Number;
    groups: Array<Number>;
    user_permissions: Array<Number>;
};


export interface EmployeeDetailsType {
    id: Number;
    employee_image?: String;
    emp_no: number;
    first_name: String;
    middle_name?: String;
    last_name: String;
    suffix?: String;
    birthdate: Date;
    birth_place?: String;
    civil_status: String;
    gender: String;
    address: String;
    provincial_address?: String;
    mobile_phone: String;
    email_address?: String;
    date_hired: Date;
    date_resigned?: Date;
    approver: Number;
    date_added: Date;
    date_deleted?: Date;
    philhealth_code?: String;
    bio_id?: String;
    branch_code?: String;
    department_code?: String;
    division_code?: String;
    payroll_group_code?: String;
    position_code?: String;
    rank_code?: string | number;
    tax_code?: String;
    city_code?: String;
    pagibig_code?: String;
    sssid_code?: String;
};


export interface GetEmployeesListsType {
    [key: string]: any;
    id: number;
    employee_image?: String;
    emp_no: number;
    first_name: String;
    middle_name?: String;
    last_name: String;
    suffix?: String;
    birthdate: Date;
    birth_place?: String;
    civil_status: String;
    gender: String;
    address: String;
    provincial_address?: String;
    mobile_phone: String;
    email_address?: String;
    date_hired: Date;
    date_resigned?: Date;
    approver: number;
    date_added: Date;
    date_deleted?: Date;
    philhealth_code?: String;
    bio_id?: String;
    branch_code?: String;
    department_code?: String;
    division_code?: String;
    payroll_group_code?: String;
    position_code?: String;
    rank_code?: String;
    tax_code?: String;
    city_code?: String;
    pagibig_code?: String;
    sssid_code?: String;
    user?: {
        is_superuser: Boolean;
        username: String;
        role: number;
        is_active: Boolean;
        is_logged_in: Boolean;
        is_locked: Boolean;
        failed_login_attempts: number;
        last_login: Date;
        old_password: String;
        date_password_changed?: Date; 
        date_added: Date;
        date_deleted?: Date;
        emp_no: number;
        groups: Array<String>;
        user_permissions: Array<String>;
    }
};

export interface ViewAllDtrLogsType {
    [key: string]: any;
    id: number,
    datetime_bio: Date,
    flag1_in_out?: boolean,
    flag2_lout_lin?: boolean,
    entry_type: string,
    date_uploaded: Date,
    is_processed: boolean,
    emp_no: number,
    bio_id: number,
    branch_code: number,
    schedule_daily_code: number,
};

export interface ViewMergedDtrLogsType {
    [key: string]: any;
    id: number,
    business_date: Date,
    shift_name: string,
    duty_in: Date,
    dutiy_out: Date,
    sched_timein: string,
    sched_timeout: string,
    is_sched_restday: boolean,
    lunch_out?: string | boolean,
    lunch_in?: string | boolean,
    is_paid_leave?: boolean,
    paid_leave_type?: string | null,
    reg_ot_total: number,
    nd_ot_total: number,
    is_obt: boolean,
    is_sp_holiday: boolean,
    is_reg_holiday: boolean,
    is_ua: boolean,
    is_absent: boolean,
    overbreak?: number | boolean,
    lates: number,
    undertime: number,
    total_hours: number,
    adjusted_timein?: number | null,
    adjusted_timeout?: number | null,
    is_computed: boolean,
    emp_no: number,
    cutoff_code: number,
};

export interface ViewCutoffDtrSummaryType {
    [key: string]: any;
    id: number,
    business_date_from: Date,
    business_date_to: Date,
    paid_leaves_total: number,
    reg_ot_total: number,
    nd_ot_total: number,
    sp_holiday_total: number,
    reg_holiday_total: number,
    absent_total: number,
    leaves_type_used?: number | string | null,
    overbreak_total?: number | null,
    lates_total: number,
    undertime_total: number,
    total_hours: number,
    is_processed: boolean,
    date_deleted?: Date | null,
    emp_no: number,
    cutoff_code: number,
};


export type DtrData = Array<ViewAllDtrLogsType> | Array<ViewMergedDtrLogsType> | Array<ViewCutoffDtrSummaryType> | null;