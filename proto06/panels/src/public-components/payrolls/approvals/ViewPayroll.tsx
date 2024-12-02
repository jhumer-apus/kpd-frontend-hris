import axiosInstance from "@/helpers/axiosConfig"
import ConfirmationModal from "@/public-components/modals/ConfirmationModal"
import { HandleAlertAction } from "@/store/actions/components"
import { XMarkIcon } from "@heroicons/react/24/solid"
import { Box, Button, IconButton, Modal, TextField, Typography } from "@mui/material"
import { Fragment, useMemo, useState } from "react"
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

    const formattedData = useMemo(() => {
        if (payrollData) {
          return Object.keys(payrollData).reduce((acc, key) => {
            let value = payrollData[key];
            if (typeof value === "number") {
              value = value.toLocaleString();
            }
            acc[key] = value;
            return acc;
          }, {} as Record<string, any>);
        }
        return {}; 
    }, [payrollData]);

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
                            value={formattedData?.emp_no}
                            inputProps={{
                                readOnly:true
                            }}
                        />
                        <TextField
                            label="Daily Salary(₱)"
                            value={formattedData?.daily_salary}
                            inputProps={{
                                readOnly:true
                            }}
                        />
                        <TextField
                            label="Total Work Days"
                            value={formattedData?.work_days_total}
                            inputProps={{
                                readOnly:true
                            }}
                        />
                        <TextField
                            label="Total Work Pay(₱)"
                            value={formattedData?.work_days_total_pay}
                            inputProps={{
                                readOnly:true
                            }}
                        />
                        <TextField
                            label="Night Differential Pay(₱)"
                            value={formattedData?.nd_pay}
                            inputProps={{
                                readOnly:true
                            }}
                        />
                        <TextField
                            label="Overtime Pay(₱)"
                            value={formattedData?.ot_pay}
                            inputProps={{
                                readOnly:true
                            }}
                        />
                        <TextField
                            label="Night Differential Overtime Pay(₱)"
                            value={formattedData?.nd_ot_pay}
                            inputProps={{
                                readOnly:true
                            }}
                        />
                        <TextField
                            label="Total Special Holiday Days"
                            value={formattedData?.sp_holiday_days_total}
                            inputProps={{
                                readOnly:true
                            }}
                        />
                        <TextField
                            label="Special Holiday Working Pay(₱)"
                            value={formattedData?.sp_holiday_working_pay}
                            inputProps={{
                                readOnly:true
                            }}
                        />
                        <TextField
                            label="Special Holiday Night Differential Working Pay(₱)"
                            value={formattedData?.sp_holiday_nd_working_pay}
                            inputProps={{
                                readOnly:true
                            }}
                        />
                        <TextField
                            label="Special Holiday Overtime Pay(₱)"
                            value={formattedData?.sp_holiday_ot_pay}
                            inputProps={{
                                readOnly:true
                            }}
                        />
                        <TextField
                            label="Special Holiday Night Differential Overtime Pay(₱)"
                            value={formattedData?.sp_holiday_nd_ot_pay}
                            inputProps={{
                                readOnly:true
                            }}
                        />
                        <TextField
                            label="Total Regular Holiday Days"
                            value={formattedData?.reg_holiday_days_total}
                            inputProps={{
                                readOnly:true
                            }}
                        />
                        <TextField
                            label="Regular Holiday Working Pay(₱)"
                            value={formattedData?.reg_holiday_working_pay}
                            inputProps={{
                                readOnly:true
                            }}
                        />
                        <TextField
                            label="Regular Holiday Night Differential Working Pay(₱)"
                            value={formattedData?.reg_holiday_nd_working_pay}
                            inputProps={{
                                readOnly:true
                            }}
                        />
                        <TextField
                            label="Regular Holiday Overtime Pay(₱)"
                            value={formattedData?.reg_holiday_ot_pay}
                            inputProps={{
                                readOnly:true
                            }}
                        />
                        <TextField
                            label="Regular Holiday Night Differential Overtime Pay(₱)"
                            value={formattedData?.reg_holiday_nd_ot_pay}
                            inputProps={{
                                readOnly:true
                            }}
                        />
                        <TextField
                            label="Regular Holiday Night Differential Overtime Pay(₱)"
                            value={formattedData?.reg_holiday_nd_ot_pay}
                            inputProps={{
                                readOnly:true
                            }}
                        />


                        {/* RD */}

                        {/* gov contribution */}
                        <TextField
                            label="Late Deduction(₱)"
                            value={formattedData?.late_deduct}
                            inputProps={{
                                readOnly:true
                            }}
                        />
                        <TextField
                            label="Overbreak Deduct(₱)"
                            value={formattedData?.overbreak_deduct}
                            inputProps={{
                                readOnly:true
                            }}
                        />
                        <TextField
                            label="Undertime Deduction(₱)"
                            value={formattedData?.undertime_deduct}
                            inputProps={{
                                readOnly:true
                            }}
                        />
                        <TextField
                            label="Total Absent Days"
                            value={formattedData?.absent_days_total}
                            inputProps={{
                                readOnly:true
                            }}
                        />
                        <TextField
                            label="Absent Deduction(₱)"
                            value={formattedData?.absent_deduct}
                            inputProps={{
                                readOnly:true
                            }}
                        />
                        <TextField
                            label="Bonus Pay(₱)"
                            value={formattedData?.bonus_pay}
                            inputProps={{
                                readOnly:true
                            }}
                        />
                        <TextField
                            label="Allowance Pay(₱)"
                            value={formattedData?.allowance_pay}
                            inputProps={{
                                readOnly:true
                            }}
                        />
                        <TextField
                            label="Gross Pay Without Deduction(₱)"
                            value={formattedData?.gross_pay_without_deduct}
                            inputProps={{
                                readOnly:true
                            }}
                        />
                        <TextField
                            label="Gross Pay(₱)"
                            value={formattedData?.gross_pay}
                            inputProps={{
                                readOnly:true
                            }}
                        />
                        <TextField
                            label="Pagibig Contribution(₱)"
                            value={formattedData?.pagibig_contrib}
                            inputProps={{
                                readOnly:true
                            }}
                        />
                        <TextField
                            label="Philhealth Contribution(₱)"
                            value={formattedData?.philhealth_contrib}
                            inputProps={{
                                readOnly:true
                            }}
                        />
                        <TextField
                            label="SSS Contribution(₱)"
                            value={formattedData?.sss_contrib}
                            inputProps={{
                                readOnly:true
                            }}
                        />
                        <TextField
                            label="Government Contribution(₱)"
                            value={formattedData?.government_contrib}
                            inputProps={{
                                readOnly:true
                            }}
                        />
                        <TextField
                            label="Net Pay After Tax(₱)"
                            value={formattedData?.net_pay_after_tax}
                            inputProps={{
                                readOnly:true
                            }}
                        />
                         <TextField
                            label="Cash Advance Deduct(₱)"
                            value={formattedData?.cash_advance_deduct}
                            inputProps={{
                                readOnly:true
                            }}
                        />
                        <TextField
                            label="Pagibig Cash Loan(₱)"
                            value={formattedData?.pagibig_cash_loan}
                            inputProps={{
                                readOnly:true
                            }}
                        />
                        <TextField
                            label="Pagibig House Loan(₱)"
                            value={formattedData?.pagibig_house_loan}
                            inputProps={{
                                readOnly:true
                            }}
                        />
                        <TextField
                            label="SSS Cash Loan(₱)"
                            value={formattedData?.sss_cash_loan}
                            inputProps={{
                                readOnly:true
                            }}
                        />
                        <TextField
                            label="Net Pay After Loan(₱)"
                            value={formattedData?.net_pay_after_loan}
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