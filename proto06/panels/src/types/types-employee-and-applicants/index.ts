// ======================================

import { SCHEDULEDAILYViewInterface, USERViewInterface } from "../types-pages"
import { EMPLOYEESViewInterface } from "../types-store"

export interface KPICOREGenericInterface {
	questions?: Array<KPICOREQuestions>
	core_competencies?: Array<KPICORECoreCompetencies>
	emp_name: string
	approver_name: string
	date_evaluation_deadline: string | null // If created with no value, defaults to 28th of the month,
	status: "Pending" | "Confirmed"
	total_self_eval_points: number | null
	total_approver_eval_points: number | null
	total_core_compe_points: number | null
    percentage_total: number | null
	final_rating: "A" | "B" | "C" | null 
	emp_no: number
	emp_no_approver: number
	added_by?: number
	kpi_codes: number[] //pk of kpi questions 
	corecompe_codes: number [] //pk of core competencies
}


export interface KPICOREQuestions extends Pick<EVALQUESTIONSViewInterface, "question" | "id" > {
	[key: string]: number | null | string
	self_eval_point: number | null
	self_comment: string | null
	approver_eval_point: number | null
	approver_eval_comment: string | null
	sup_feedback: string | null
	date_eval: string | null,
	emp_no: number
}

export interface KPICORECoreCompetencies extends CORECOMPEViewInterface {
	[key: string]: number | null | string | undefined
	points: number | null
}
export interface KPICOREViewInterface extends KPICOREGenericInterface{
	readonly id: number
	readonly date_added: string
}


export interface KPICORECreateInterface extends Pick<KPICOREGenericInterface, "date_evaluation_deadline" | "added_by">{
	emp_no: number[] | number,
}

export interface KPICOREEditInterface extends Pick<KPICOREGenericInterface, "emp_no_approver" | "date_evaluation_deadline" | "added_by">, Pick<KPICOREViewInterface, "id">{}

export interface KPICOREUpdateSelfInterface extends Pick<KPICOREGenericInterface, "emp_no" | "added_by">{
	kpi_question_code_array: number[]
	self_eval_point_array: number[]
	self_eval_comment_array: string[]
}

export interface KPICOREUpdateSupervisorInterface extends Pick<KPICOREGenericInterface, "emp_no" | "added_by">{
	kpi_question_code_array: number[]
	approver_eval_point_array: number[]
	approver_feedback_array: string[]
	corecompe_code_array: number[]
	corecompe_points: number[]
}

// ======================================


export interface CORECOMPEGenericInterface {
	checklist_title: string
	checklist_limit: string
	added_by?: number,
}


export interface CORECOMPEViewInterface extends CORECOMPEGenericInterface{
	readonly id: number
    readonly date_added: string
	readonly date_deleted: string | null
}


export interface CORECOMPECreateInterface extends CORECOMPEGenericInterface{}

export interface CORECOMPEEditInterface extends CORECOMPEGenericInterface, Pick<CORECOMPEViewInterface, "id">{}

// ======================================

export interface EVALQUESTIONSGenericInterface {
	added_by?: number
	question: string
}


export interface EVALQUESTIONSViewInterface extends EVALQUESTIONSGenericInterface{
    readonly id: number
    readonly date_deleted: string | null
	readonly date_added: string
}

export interface EVALQUESTIONSCreateInterface extends Omit<EVALQUESTIONSGenericInterface, "date_added">{}

export interface EVALQUESTIONSEditInterface extends EVALQUESTIONSGenericInterface, Pick<EVALQUESTIONSViewInterface, "id">{}

// ======================================





export interface ONBOARDINGSTATUSGenericInterface {
	date_start: string | null
	status: "Pending" | "Completed"
	final_remarks: string | null
	emp_no: number
	emp_onboard_reqs?: Array<EMP_ONBOARD_REQS_Interface>
	added_by?: number
	onboarding_codes?: number[]
}

export interface EMP_ONBOARD_REQS_Interface extends Omit<ONBOARDINGREQUIREMENTSViewInterface, "date_deleted" | "facilitator"> {
	[key: string]: string | null | number | undefined
	emp_remarks: string | null
	facilitator_remarks: string | null
	date_commencement: string | null
	status: "Pending" | "Completed"
	emp_no: number
	onboarding_requirement_code: number
	onboarding_facilitator: number
} 


export interface ONBOARDINGSTATUSViewInterface extends ONBOARDINGSTATUSGenericInterface{
    readonly id: number
	readonly date_added: string
}

export interface ONBOARDINGSTATUSCreateInterface extends Omit<ONBOARDINGSTATUSGenericInterface, "status" | "final_remarks" | "emp_no" | "onboarding_codes" >{
	emp_no: number[]
}

export interface ONBOARDINGSTATUSEditInterface extends ONBOARDINGSTATUSGenericInterface, Pick<ONBOARDINGSTATUSViewInterface, "id" >{}


export interface ONBOARDINGSTATUSUpdateInterface extends Pick <ONBOARDINGSTATUSGenericInterface, "emp_no" | "added_by">{
	onboarding_requirement_code_array: number[]
	date_commencement_array: (string | null)[]
	emp_remarks_array: string[]
	facilitator_remarks_array: string[]
	status_array: string[]
}


// ======================================



export interface ONBOARDINGREQUIREMENTSGenericInterface {
	facilitator: number
	onboarding_title: string,
	added_by?: number
}


export interface ONBOARDINGREQUIREMENTSViewInterface extends ONBOARDINGREQUIREMENTSGenericInterface{
    readonly id: number,
    readonly date_deleted: string
	readonly date_added: string
}

export interface ONBOARDINGREQUIREMENTSCreateInterface extends ONBOARDINGREQUIREMENTSGenericInterface{}

export interface ONBOARDINGREQUIREMENTSEditInterface extends ONBOARDINGREQUIREMENTSGenericInterface, Pick<ONBOARDINGREQUIREMENTSViewInterface, "id">{}

// ======================================




export interface OFFBOARDINGSTATUSGenericInterface {
	date_offboard: string | null
	status: "Pending" | "Completed"
	final_remarks: string | null
	emp_no: number
	emp_offboard_reqs?: Array<EMP_OFFBOARD_REQS_Interface>
	added_by?: number
	date_added?: string | null
	offboarding_codes?: number[]
}

export interface EMP_OFFBOARD_REQS_Interface extends Omit<OFFBOARDINGREQUIREMENTSViewInterface, "date_deleted" | "facilitator"> {
	[key: string]: string | null | number | undefined
	emp_remarks: string | null
	facilitator_remarks: string | null
	date_accomplished: string | null
	status: "Pending" | "Completed"
	emp_no: number
	offboarding_requirement_code: number
	offboarding_facilitator: number
} 

export interface OFFBOARDINGSTATUSViewInterface extends OFFBOARDINGSTATUSGenericInterface{
    readonly id: number
	readonly date_added: string
}

export interface OFFBOARDINGSTATUSCreateInterface extends Omit<OFFBOARDINGSTATUSGenericInterface, "emp_no" | "status" | "final_remarks" | "offboarding_codes" | "id" | "date_added">{
	emp_no: number[]
}

export interface OFFBOARDINGSTATUSEditInterface extends OFFBOARDINGSTATUSGenericInterface, Pick<OFFBOARDINGSTATUSViewInterface, "id">{

}

export interface OFFBOARDINGSTATUSUpdateInterface extends Pick <OFFBOARDINGSTATUSGenericInterface, "emp_no" | "added_by">{
	offboarding_requirement_code_array: number[]
	date_accomplished_array: (string | null)[]
	emp_remarks_array: string[]
	facilitator_remarks_array: string[]
	status_array: string[]
}


// ======================================



export interface OFFBOARDINGREQUIREMENTSGenericInterface {
	offboarding_title: string
	facilitator: number
	added_by?: number
}


export interface OFFBOARDINGREQUIREMENTSViewInterface extends OFFBOARDINGREQUIREMENTSGenericInterface{
    readonly id: number
	readonly date_added: string
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


export interface PERFECTATTENDANCEViewInterface extends EMPLOYEESViewInterface {}

export interface Perfect_Attendace_Filter_Interface {
	month: number,
	year: number
};
  
export interface ALLSCHEDULEViewInterface extends SCHEDULEDAILYViewInterface{}

export interface All_Schedule_Filter_Interface {
	month: number,
	year: number
};




// ======================================

export interface EMPHISTORYGenericInterface {
	emp_no: number
	employment_position: string
	date_promoted: string | null
    added_by: number
}


export interface EMPHISTORYViewInterface extends EMPHISTORYGenericInterface{
	readonly id: number
}


export interface EMPHISTORYCreateInterface extends EMPHISTORYGenericInterface{}
export interface EMPHISTORYEditInterface extends EMPHISTORYViewInterface{}
export interface EMPHISTORYDeleteInterface extends EMPHISTORYGenericInterface, Pick<EMPHISTORYGenericInterface, "added_by">{}


// ======================================

export interface EMPSEMINARSGenericInterface {
	emp_no: number
	subject: string
	date_accomplished: string | null
	category: string | "Seminar" | "Training"
    added_by: number
}


export interface EMPSEMINARSViewInterface extends EMPSEMINARSGenericInterface{
	readonly id: number
}


export interface EMPSEMINARSCreateInterface extends EMPSEMINARSGenericInterface{}
export interface EMPSEMINARSEditInterface extends EMPSEMINARSViewInterface{}
export interface EMPSEMINARSDeleteInterface extends EMPSEMINARSGenericInterface, Pick<EMPHISTORYGenericInterface, "added_by">{}
