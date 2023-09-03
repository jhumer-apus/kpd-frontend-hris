

export interface TAXGenericInterface {
    tin_no: string,
    tax_form: string,
    tax_description: string,
    tax_percentage: number,
    payment_frequency: number,
    emp_no: number,
}


export interface TAXViewInterface extends TAXGenericInterface{
    readonly id: number,
}


export interface TAXCreateInterface extends Omit<TAXGenericInterface, "tax_percentage">{
    current_user?: number,
}

export interface TAXEditInterface extends TAXGenericInterface{}


// ======================================

export interface PAGIBIGGenericInterface {
    pagibig_no: string,
    pagibig_contribution_month: number,
    pagibig_with_cloan_amount: number | null,
    pagibig_rem_cloan_amount: number | null,
    pagibig_with_hloan_amount: number | null,
    pagibig_rem_hloan_amount: number | null,
    pagibig_with_calloan_amount: number | null,
    pagibig_rem_calloan_amount: number | null,
    emp_no: number
}


export interface PAGIBIGViewInterface extends PAGIBIGGenericInterface{
    readonly id: number,
}


export interface PAGIBIGCreateInterface extends PAGIBIGGenericInterface{
    current_user?: number,
}

export interface PAGIBIGEditInterface extends PAGIBIGGenericInterface{}


// ======================================

export interface SSSGenericInterface {
    sss_no: string,
    sss_contribution_month: number,
    sss_with_cashloan_amount: number | null,
    sss_rem_cashloan_amount: number | null,
    sss_with_calloan_amount: number | null,
    sss_rem_calloan_amount: number | null,
    emp_no: number
}


export interface SSSViewInterface extends SSSGenericInterface{
    readonly id: number,
}


export interface SSSCreateInterface extends SSSGenericInterface{
    current_user?: number,
}

export interface SSSEditInterface extends SSSGenericInterface{}




// ======================================

export interface PHILHEALTHGenericInterface {
    ph_no: string,
    ph_contribution_month: number,
    ph_category: string | null,
    emp_no: number
}


export interface PHILHEALTHViewInterface extends PHILHEALTHGenericInterface{
    readonly id: number,
}


export interface PHILHEALTHCreateInterface extends PHILHEALTHGenericInterface{
    current_user?: number,
}

export interface PHILHEALTHEditInterface extends Omit<PHILHEALTHGenericInterface, "ph_category">{}



// ======================================

export interface CASHADVANCEGenericInterface {
    cash_advance_total: number,
    cash_advance_remaining: number,
    payment_monthly: number,
    is_fully_paid: boolean,
    last_payment_amount: number,
    date_last_payment: string | null,
    emp_no: number,
}


export interface CASHADVANCEViewInterface extends CASHADVANCEGenericInterface{
    readonly id: number,
    readonly date_added: string,
}


export interface CASHADVANCECreateInterface extends CASHADVANCEGenericInterface{
    current_user?: number,
}

export interface CASHADVANCEEditInterface extends Pick<CASHADVANCEGenericInterface, "cash_advance_total" | "payment_monthly" | "cash_advance_remaining" | "emp_no">{}


