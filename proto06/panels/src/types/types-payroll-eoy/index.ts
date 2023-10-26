
export interface TAXCOLLECTEDGenericInterface {
    tax_rate_used: number,
    amount_deducted: number,
    emp_no: number | null,
    cutoff_code: number,
    allowance_entry_code: number,
}


export interface TAXCOLLECTEDViewInterface extends TAXCOLLECTEDGenericInterface{
    readonly id: number,
    readonly date_added: string,
}


// ======================================


export interface PAY13THGenericInterface {
    coverage_from: string,
    coverage_to: string,
    total_pay: number,
    is_printed: boolean,
    emp_no: number
    added_by?: number,
}


export interface PAY13THViewInterface extends PAY13THGenericInterface{
    readonly id: number,
}

export interface PAY13THCreateInterface extends Pick<PAY13THGenericInterface, "added_by">{
    emp_no: number[] | null
}


// ======================================

export interface BONUSLISTGenericInterface {
    name: string,
    description: string,
    amount: number,
    added_by?: number,
}


export interface BONUSLISTViewInterface extends BONUSLISTGenericInterface{
    readonly id: number,
    readonly date_added: string,
}


export interface BONUSLISTCreateInterface extends BONUSLISTGenericInterface{}

export interface BONUSLISTEditInterface extends BONUSLISTGenericInterface, Pick<BONUSLISTViewInterface, "id">{}


// ======================================


export interface BONUSENTRYGenericInterface {
    is_applied: boolean,
    bonus_code: number,
    emp_no: number,
    cutoff_code: number,
    added_by?: number, //added_by
}


export interface BONUSENTRYViewInterface extends BONUSENTRYGenericInterface{
    readonly id: number,
    readonly date_added: string,
}


export interface BONUSENTRYCreateInterface extends Omit<BONUSENTRYGenericInterface, "is_applied">{}

export interface BONUSENTRYEditInterface extends Omit<BONUSENTRYViewInterface, "is_applied" | "date_added">{}


// ======================================


export interface ANNOUNCEMENTGenericInterface {
    date_posted: string | null,
    expiry_date: string | null,
    order_by_no: number | null,
    message:string,
    for_departments_code: number[],
    for_ranks_code: number[],
    emp_image: string, // 
    emp_name: string, //
    emp_no?: number, //added_by
}


export interface ANNOUNCEMENTViewInterface extends ANNOUNCEMENTGenericInterface{
    readonly id: number,
    readonly date_added: string,
    readonly is_posted: boolean,
}

export interface ACTIVEANNOUNCEMENTViewInterface extends ANNOUNCEMENTViewInterface{}

export interface ANNOUNCEMENTCreateInterface extends Omit<ANNOUNCEMENTGenericInterface, "emp_name" | "emp_image">{}

export interface ANNOUNCEMENTEditInterface extends ANNOUNCEMENTGenericInterface, Pick<ANNOUNCEMENTViewInterface, "id">{}

// ======================================

export interface ASSETLISTGenericInterface {
    asset_name: string,
    model: string,
    year: number,
    batch_no: string | null,
    description: string,
    remarks: string | null,
    quantity: number,
    added_by?: number, //added_by
}


export interface ASSETLISTViewInterface extends ASSETLISTGenericInterface{
    readonly id: number,
    readonly date_added: string,
}


export interface ASSETLISTCreateInterface extends ASSETLISTGenericInterface{}

export interface ASSETLISTEditInterface extends ASSETLISTGenericInterface, Pick<ASSETLISTViewInterface, "id">{}



// ======================================

export interface ASSETACCOUNTGenericInterface {
    serial_no_manufacturer: string,
    serial_no_internal: string,
    remarks: string,
    asset_list_code: number,
    assigned_by?: number, //added_by
    assigned_to: number,
    date_assigned: string | null,
}


export interface ASSETACCOUNTViewInterface extends ASSETACCOUNTGenericInterface{
    readonly id: number,
}


export interface ASSETACCOUNTCreateInterface extends ASSETACCOUNTGenericInterface{}

export interface ASSETACCOUNTEditInterface extends ASSETACCOUNTGenericInterface, Pick<ASSETACCOUNTViewInterface, "id">{}


// ======================================