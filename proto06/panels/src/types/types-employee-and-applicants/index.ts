// ======================================

export interface KPICOREGenericInterface {
	id?: number | string,
	date_added: string
	emp_no: number
	emp_name: string
	sup_name: string
	sup_no: number
	eval_date: string
	status: string
	final_rating: string
	total_self_eval_points: number
	total_sup_eval_points: number
    total_core_compe_points: number
    percentage_total: number
	added_by?: number
	questions?: Omit<EVALQUESTIONSViewInterface, "date_deleted" | "added_by" | "date_added">[] & {
		sup_eval_points: number
		sup_feedback: string | null
		self_eval_points: number
		self_comment: string | null
		date_eval: string | null,
		emp_no: number
	}[]
	core_competencies?: CORECOMPEViewInterface[] & {
		points: number | null
	}[]

}


export interface KPICOREViewInterface extends KPICOREGenericInterface{}


export interface KPICORECreateInterface extends Omit<KPICOREGenericInterface, "emp_no">{
	emp_no: number[] | number,
}

export interface KPICOREEditInterface extends KPICOREGenericInterface, Pick<KPICOREViewInterface, "id">{}


// ======================================


export interface CORECOMPEGenericInterface {
	checklist_title: string
	checklist_limit: string
	added_by?: number,
}


export interface CORECOMPEViewInterface extends CORECOMPEGenericInterface{
	readonly id?: number
    readonly date_added: string
	readonly date_deleted: string | null
}


export interface CORECOMPECreateInterface extends CORECOMPEGenericInterface{}

export interface CORECOMPEEditInterface extends CORECOMPEGenericInterface, Pick<CORECOMPEViewInterface, "id">{}

// ======================================

export interface EVALQUESTIONSGenericInterface {
	date_added: string
	added_by?: number
	question: string
}


export interface EVALQUESTIONSViewInterface extends EVALQUESTIONSGenericInterface{
    readonly id: number,
    readonly date_deleted: string | null
}

export interface EVALQUESTIONSCreateInterface extends Omit<EVALQUESTIONSGenericInterface, "date_added">{}

export interface EVALQUESTIONSEditInterface extends EVALQUESTIONSGenericInterface, Pick<EVALQUESTIONSViewInterface, "id">{}

// ======================================





export interface ONBOARDINGSTATUSGenericInterface {
	emp_no: number
	start_date: string
	status: "Pending" | "Completed"
	final_remarks: string
	date_added: string
	added_by?: number
	requirements: Omit<ONBOARDINGREQUIREMENTSViewInterface[], "id" | "added_by" |"date_added" | "date_deleted"> | []
}


export interface ONBOARDINGSTATUSViewInterface extends ONBOARDINGSTATUSGenericInterface{
    readonly id: string | number,
}

export interface ONBOARDINGSTATUSCreateInterface extends ONBOARDINGSTATUSGenericInterface{
	id: string //only on mockup, can delete after backend implementation is complete
}

export interface ONBOARDINGSTATUSEditInterface extends ONBOARDINGSTATUSGenericInterface, Pick<ONBOARDINGSTATUSViewInterface, "id">{}

// ======================================



export interface ONBOARDINGREQUIREMENTSGenericInterface {
	facilitator: number
	onboarding_title: string,
	commencement_date: string | null
	emp_remarks: string | null
	facilitator_remarks: string | null
	status: "Pending" | "Completed"
	date_added: string
	added_by?: number
}


export interface ONBOARDINGREQUIREMENTSViewInterface extends ONBOARDINGREQUIREMENTSGenericInterface{
    readonly id: number,
    readonly date_deleted: string
}

export interface ONBOARDINGREQUIREMENTSCreateInterface extends ONBOARDINGREQUIREMENTSGenericInterface{}

export interface ONBOARDINGREQUIREMENTSEditInterface extends ONBOARDINGREQUIREMENTSGenericInterface, Pick<ONBOARDINGREQUIREMENTSViewInterface, "id">{}

// ======================================




export interface OFFBOARDINGSTATUSGenericInterface {
	emp_no: number
	start_date: string
	status: "Pending" | "Completed"
	final_remarks: string
	date_added: string
	added_by?: number
	requirements: Omit<OFFBOARDINGREQUIREMENTSViewInterface[], "id" | "added_by" |"date_added" | "date_deleted"> | []
}


export interface OFFBOARDINGSTATUSViewInterface extends OFFBOARDINGSTATUSGenericInterface{
    readonly id: number | string,
}

export interface OFFBOARDINGSTATUSCreateInterface extends OFFBOARDINGSTATUSGenericInterface{
	id: string //only on mockup, can delete after backend implementation is complete
}

export interface OFFBOARDINGSTATUSEditInterface extends OFFBOARDINGSTATUSGenericInterface, Pick<OFFBOARDINGSTATUSViewInterface, "id">{}

// ======================================



export interface OFFBOARDINGREQUIREMENTSGenericInterface {
	facilitator: number
	offboarding_title: string,
	accomplished_date: string | null
	emp_remarks: string | null
	facilitator_remarks: string | null
	status: "Pending" | "Completed"
	date_added: string
	added_by?: number
}


export interface OFFBOARDINGREQUIREMENTSViewInterface extends OFFBOARDINGREQUIREMENTSGenericInterface{
    readonly id: number,
    readonly date_deleted: string
}

export interface OFFBOARDINGREQUIREMENTSCreateInterface extends OFFBOARDINGREQUIREMENTSGenericInterface{}

export interface OFFBOARDINGREQUIREMENTSEditInterface extends OFFBOARDINGREQUIREMENTSGenericInterface, Pick<OFFBOARDINGREQUIREMENTSViewInterface, "id">{}

// ======================================



export interface APPLICANTSGenericInterface {
	first_name: string
	middle_name: string
	last_name: string
	suffix: string
	birthday: string
	birth_place: string
	civil_status: string
	gender: string
	address: string
	mobile_phone: string
	email_address: string
	facebook: string
	linkedin: string
	date_applied: string
	date_next_appointment: string
	interview1_date: string | null
	interview1_result: string | null
	interview2_date: string | null
	interview2_result: string | null
	exam1_date: string | null
	exam1_score: string
	exam2_date: string | null
	exam2_score: string
	added_by?: number
}


export interface APPLICANTSViewInterface extends APPLICANTSGenericInterface{
    readonly id: number
}

export interface APPLICANTSCreateInterface extends APPLICANTSGenericInterface{}

export interface APPLICANTSEditInterface extends APPLICANTSGenericInterface, Pick<OFFBOARDINGREQUIREMENTSViewInterface, "id">{}

// ======================================






export interface JOBPOSTINGSGenericInterface {
	job_description: string
	job_salary_range: string
	qualifications: string
	objectives: string
	responsibilities: string
	position_code: number
	added_by?: number
}


export interface JOBPOSTINGSViewInterface extends JOBPOSTINGSGenericInterface{
    readonly id: number
	readonly date_added: string
	readonly date_deleted: string | null
	readonly position_title: string
}

export interface JOBPOSTINGSCreateInterface extends JOBPOSTINGSGenericInterface{}

export interface JOBPOSTINGSEditInterface extends JOBPOSTINGSGenericInterface, Pick<OFFBOARDINGREQUIREMENTSViewInterface, "id">{}

// ======================================


