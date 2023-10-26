

export interface TAXGenericInterface {
    tin_no: number,
    tax_form: string,
    tax_description: string,
    tax_percentage: number,
    payment_frequency: number,
    emp_no: number,
    added_by?: number,
}


export interface TAXViewInterface extends TAXGenericInterface{
    readonly id: number,
}


export interface TAXCreateInterface extends TAXGenericInterface{}

export interface TAXEditInterface extends TAXGenericInterface{}


// ======================================

export interface PAGIBIGGenericInterface {
    pagibig_no: number,
    pagibig_contribution_month: number,
    pagibig_with_cloan_amount: number | null,
    pagibig_rem_cloan_amount: number | null,
    pagibig_with_hloan_amount: number | null,
    pagibig_rem_hloan_amount: number | null,
    pagibig_with_calloan_amount: number | null,
    pagibig_rem_calloan_amount: number | null,
    emp_no: number,
    added_by?: number,
}


export interface PAGIBIGViewInterface extends PAGIBIGGenericInterface{
    readonly id: number,
}


export interface PAGIBIGCreateInterface extends PAGIBIGGenericInterface{}

export interface PAGIBIGEditInterface extends PAGIBIGGenericInterface{}


// ======================================

export interface SSSGenericInterface {
    sss_no: number,
    sss_contribution_month: number,
    sss_with_cashloan_amount: number | null,
    sss_rem_cashloan_amount: number | null,
    sss_with_calloan_amount: number | null,
    sss_rem_calloan_amount: number | null,
    emp_no: number,
    added_by?: number,
}


export interface SSSViewInterface extends SSSGenericInterface{
    readonly id: number,
}


export interface SSSCreateInterface extends SSSGenericInterface{}

export interface SSSEditInterface extends SSSGenericInterface{}




// ======================================

export interface PHILHEALTHGenericInterface {
    ph_no: number,
    ph_contribution_month: number,
    ph_category: string | null,
    emp_no: number,
    added_by?: number,
}


export interface PHILHEALTHViewInterface extends PHILHEALTHGenericInterface{
    readonly id: number,
}


export interface PHILHEALTHCreateInterface extends PHILHEALTHGenericInterface{}

export interface PHILHEALTHEditInterface extends Omit<PHILHEALTHGenericInterface, "ph_category">{}



// ======================================

export interface CASHADVANCEGenericInterface {
    readonly id: number,
    cash_advance_total: number,
    cash_advance_remaining: number,
    payment_monthly: number,
    is_fully_paid: boolean,
    last_payment_amount: number,
    date_last_payment: string | null,
    emp_no: number,
    added_by?: number,
}


export interface CASHADVANCEViewInterface extends CASHADVANCEGenericInterface{
    readonly date_added: string,
}


export interface CASHADVANCECreateInterface extends Pick<CASHADVANCEGenericInterface, "cash_advance_total" | "payment_monthly" | "emp_no" | "added_by">{}

export interface CASHADVANCEEditInterface extends Pick<CASHADVANCEGenericInterface, "payment_monthly" | "emp_no" | "id" | "added_by">{}


// ======================================

export interface ALLOWANCETYPEGenericInterface {
    readonly id: number,
    allowance_name: string,
    taxable: boolean,
    added_by?: number,
}


export interface ALLOWANCETYPEViewInterface extends ALLOWANCETYPEGenericInterface{
    readonly date_added: string,
    readonly date_deleted: string | null,
}


export interface ALLOWANCETYPECreateInterface extends Omit<ALLOWANCETYPEGenericInterface, "id">{}

export interface ALLOWANCETYPEEditInterface extends ALLOWANCETYPEGenericInterface{}



// ======================================

export interface ALLOWANCEENTRYGenericInterface {
    amount: number,
    tax_rate: number,
    emp_no: number,
    allowance_code: number,
    added_by?: number,
}


export interface ALLOWANCEENTRYViewInterface extends ALLOWANCEENTRYGenericInterface{
    readonly id: number,
    readonly date_added: string,
    readonly date_deleted: string | null,
}


export interface ALLOWANCEENTRYCreateInterface extends ALLOWANCEENTRYGenericInterface{}

export interface ALLOWANCEENTRYEditInterface extends Omit<ALLOWANCEENTRYViewInterface, "date_added" | "date_deleted">{}

