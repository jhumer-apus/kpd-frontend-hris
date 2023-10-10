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
	self_eval_points: number
	sup_eval_points: number
    core_compe_points: number
    percentage_total: number
	current_user?: number
	questions?: {
		question: string
		answer: string
		sup_eval_points: number
		self_eval_points: number
	}[]
	core_competencies?: {
		checklist_title: string
		checklist_limits: string
		points: number
	}[]

}


export interface KPICOREViewInterface extends KPICOREGenericInterface{}


export interface KPICORECreateInterface extends KPICOREGenericInterface{}

export interface KPICOREEditInterface extends KPICOREGenericInterface, Pick<KPICOREViewInterface, "id">{}


// ======================================


export interface CORECOMPEGenericInterface {
	date_added: string
	checklist_title: string
	checklist_limits: string
	points: number
	added_by?: number,
}


export interface CORECOMPEViewInterface extends CORECOMPEGenericInterface{
    readonly id: number
    readonly date_deleted: string | null
}


export interface CORECOMPECreateInterface extends CORECOMPEGenericInterface{}

export interface CORECOMPEEditInterface extends CORECOMPEGenericInterface, Pick<CORECOMPEViewInterface, "id">{}

// ======================================

export interface EVALQUESTIONSGenericInterface {
	date_added: string
	added_by?: number
	question: string
	answer: string 
}


export interface EVALQUESTIONSViewInterface extends EVALQUESTIONSGenericInterface{
    readonly id: number,
    readonly date_deleted: string
}

export interface EVALQUESTIONSCreateInterface extends EVALQUESTIONSGenericInterface{}

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
	requirements: Omit<OFFBOARDINGREQUIREMENTSViewInterface[], "id" | "added_by" |"date_added" | "date_deleted">
}


export interface OFFBOARDINGSTATUSViewInterface extends OFFBOARDINGSTATUSGenericInterface{
    readonly id: number,
}

export interface OFFBOARDINGSTATUSCreateInterface extends OFFBOARDINGSTATUSGenericInterface{}

export interface OFFBOARDINGSTATUSEditInterface extends OFFBOARDINGSTATUSGenericInterface, Pick<OFFBOARDINGSTATUSViewInterface, "id">{}

// ======================================



export interface OFFBOARDINGREQUIREMENTSGenericInterface {
	facilitator: number
	onboarding_title: string,
	commencement_date: string | null
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


