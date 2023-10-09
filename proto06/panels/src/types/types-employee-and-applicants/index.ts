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
	added_by: number
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



