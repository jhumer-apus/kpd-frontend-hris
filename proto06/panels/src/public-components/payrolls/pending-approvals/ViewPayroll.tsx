import axiosInstance from "@/helpers/axiosConfig"
import ConfirmationModal from "@/public-components/modals/ConfirmationModal"
import { HandleAlertAction } from "@/store/actions/components"
import { XMarkIcon } from "@heroicons/react/24/solid"
import { Box, Button, IconButton, Modal, TextField, Typography } from "@mui/material"
import { Fragment, useState } from "react"
import { useDispatch } from "react-redux"

interface Props {
    // payroll_id: number | null
    payrollData: any
    open: boolean
    // refreshTable: () => void
    handleClose: () => void
}

export default function ViewPayroll(props: Props) {

    const { payrollData, open, handleClose } = props
    // const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false)

    return (
        <Fragment>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-2xl p-4 overflow-auto w-11/12 md:w-[500px] max-h-[80vh]">
                    <div className="flex justify-end">
                        <IconButton  
                            aria-label="close"
                            onClick={() => handleClose()}
                        >
                            <XMarkIcon className="w-8 text-black"/>
                        </IconButton>
                    </div>
                    <Typography id="modal-modal-title" variant="h6" component="h2" className="text-center">
                        PAYROLL
                    </Typography>
                    <br></br>
                    <div className="flex flex-col gap-4">
                        <TextField
                            label="Employee No."
                            value={payrollData?.emp_no}
                            inputProps={{
                                readOnly:true
                            }}
                        />
                        <TextField
                            label="Daily Salary(₱)"
                            value={payrollData?.daily_salary}
                            inputProps={{
                                readOnly:true
                            }}
                        />
                        <TextField
                            label="Total Work Days"
                            value={payrollData?.work_days_total}
                            inputProps={{
                                readOnly:true
                            }}
                        />
                        <TextField
                            label="Total Work Pay(₱)"
                            value={payrollData?.work_days_total_pay}
                            inputProps={{
                                readOnly:true
                            }}
                        />
                        <TextField
                            label="Night Differential Pay(₱)"
                            value={payrollData?.nd_pay}
                            inputProps={{
                                readOnly:true
                            }}
                        />
                        <TextField
                            label="Overtime Pay(₱)"
                            value={payrollData?.ot_pay}
                            inputProps={{
                                readOnly:true
                            }}
                        />
                        <TextField
                            label="Night Differential Overtime Pay(₱)"
                            value={payrollData?.nd_ot_pay}
                            inputProps={{
                                readOnly:true
                            }}
                        />
                        <TextField
                            label="Total Special Holiday Days"
                            value={payrollData?.sp_holiday_days_total}
                            inputProps={{
                                readOnly:true
                            }}
                        />
                        <TextField
                            label="Special Holiday Working Pay(₱)"
                            value={payrollData?.sp_holiday_working_pay}
                            inputProps={{
                                readOnly:true
                            }}
                        />
                        <TextField
                            label="Special Holiday Night Differential Working Pay(₱)"
                            value={payrollData?.sp_holiday_nd_working_pay}
                            inputProps={{
                                readOnly:true
                            }}
                        />
                        <TextField
                            label="Special Holiday Overtime Pay(₱)"
                            value={payrollData?.sp_holiday_ot_pay}
                            inputProps={{
                                readOnly:true
                            }}
                        />
                        <TextField
                            label="Special Holiday Night Differential Overtime Pay(₱)"
                            value={payrollData?.sp_holiday_nd_ot_pay}
                            inputProps={{
                                readOnly:true
                            }}
                        />
                        <TextField
                            label="Total Regular Holiday Days"
                            value={payrollData?.reg_holiday_days_total}
                            inputProps={{
                                readOnly:true
                            }}
                        />
                        <TextField
                            label="Regular Holiday Working Pay(₱)"
                            value={payrollData?.reg_holiday_working_pay}
                            inputProps={{
                                readOnly:true
                            }}
                        />
                        <TextField
                            label="Regular Holiday Night Differential Working Pay(₱)"
                            value={payrollData?.reg_holiday_nd_working_pay}
                            inputProps={{
                                readOnly:true
                            }}
                        />
                        <TextField
                            label="Regular Holiday Overtime Pay(₱)"
                            value={payrollData?.reg_holiday_ot_pay}
                            inputProps={{
                                readOnly:true
                            }}
                        />
                        <TextField
                            label="Regular Holiday Night Differential Overtime Pay(₱)"
                            value={payrollData?.reg_holiday_nd_ot_pay}
                            inputProps={{
                                readOnly:true
                            }}
                        />
                        <TextField
                            label="Regular Holiday Night Differential Overtime Pay(₱)"
                            value={payrollData?.reg_holiday_nd_ot_pay}
                            inputProps={{
                                readOnly:true
                            }}
                        />


                        {/* RD */}

                        {/* gov contribution */}
                        <TextField
                            label="Late Deduction(₱)"
                            value={payrollData?.late_deduct}
                            inputProps={{
                                readOnly:true
                            }}
                        />
                        <TextField
                            label="Overbreak Deduct(₱)"
                            value={payrollData?.overbreak_deduct}
                            inputProps={{
                                readOnly:true
                            }}
                        />
                        <TextField
                            label="Undertime Deduction(₱)"
                            value={payrollData?.undertime_deduct}
                            inputProps={{
                                readOnly:true
                            }}
                        />
                        <TextField
                            label="Total Absent Days"
                            value={payrollData?.absent_days_total}
                            inputProps={{
                                readOnly:true
                            }}
                        />
                        <TextField
                            label="Absent Deduction(₱)"
                            value={payrollData?.absent_deduct}
                            inputProps={{
                                readOnly:true
                            }}
                        />
                        <TextField
                            label="Bonus Pay(₱)"
                            value={payrollData?.bonus_pay}
                            inputProps={{
                                readOnly:true
                            }}
                        />
                        <TextField
                            label="Allowance Pay(₱)"
                            value={payrollData?.allowance_pay}
                            inputProps={{
                                readOnly:true
                            }}
                        />
                        <TextField
                            label="Gross Pay Without Deduction(₱)"
                            value={payrollData?.gross_pay_without_deduct}
                            inputProps={{
                                readOnly:true
                            }}
                        />
                        <TextField
                            label="Gross Pay(₱)"
                            value={payrollData?.gross_pay}
                            inputProps={{
                                readOnly:true
                            }}
                        />
                        <TextField
                            label="Pagibig Contribution(₱)"
                            value={payrollData?.pagibig_contrib}
                            inputProps={{
                                readOnly:true
                            }}
                        />
                        <TextField
                            label="Philhealth Contribution(₱)"
                            value={payrollData?.philhealth_contrib}
                            inputProps={{
                                readOnly:true
                            }}
                        />
                        <TextField
                            label="SSS Contribution(₱)"
                            value={payrollData?.sss_contrib}
                            inputProps={{
                                readOnly:true
                            }}
                        />
                        <TextField
                            label="Government Contribution(₱)"
                            value={payrollData?.government_contrib}
                            inputProps={{
                                readOnly:true
                            }}
                        />
                        <TextField
                            label="Net Pay After Tax(₱)"
                            value={payrollData?.net_pay_after_tax}
                            inputProps={{
                                readOnly:true
                            }}
                        />
                         <TextField
                            label="Cash Advance Deduct(₱)"
                            value={payrollData?.cash_advance_deduct}
                            inputProps={{
                                readOnly:true
                            }}
                        />
                        <TextField
                            label="Pagibig Cash Loan(₱)"
                            value={payrollData?.pagibig_cash_loan}
                            inputProps={{
                                readOnly:true
                            }}
                        />
                        <TextField
                            label="Pagibig House Loan(₱)"
                            value={payrollData?.pagibig_house_loan}
                            inputProps={{
                                readOnly:true
                            }}
                        />
                        <TextField
                            label="SSS Cash Loan(₱)"
                            value={payrollData?.sss_cash_loan}
                            inputProps={{
                                readOnly:true
                            }}
                        />
                        <TextField
                            label="Net Pay After Loan(₱)"
                            value={payrollData?.net_pay_after_loan}
                            inputProps={{
                                readOnly:true
                            }}
                        />
                    </div>
                    <br></br>
                    {/* <div className="w-fit m-auto">
                        <Button variant="contained" onClick={() => setOpenConfirmModal(curr => true)}>Approve</Button>
                    </div> */}
                </Box>
            </Modal>

            {/* <ConfirmationModal 
                onYes={onApprove} 
                message="Are you sure you want to approve this pending payroll?"
                handleClose={handleCloseConfirm} 
                open={openConfirmModal} 
            /> */}
            
        </Fragment>
    )
}