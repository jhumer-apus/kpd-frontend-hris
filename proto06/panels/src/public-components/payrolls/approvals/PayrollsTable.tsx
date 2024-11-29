import { XMarkIcon } from "@heroicons/react/24/solid"
import { Box, Button, IconButton, Modal } from "@mui/material"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { Fragment, useState } from "react"
import ViewPayroll from "./ViewPayroll"
import { Typography } from "@material-tailwind/react"
import axiosInstance from "@/helpers/axiosConfig"
import { useDispatch, useSelector } from "react-redux"
import { HandleAlertAction } from "@/store/actions/components"
import { RootState } from "@/store/configureStore"
import DisapproveReasonModal from "@/public-components/modals/DisapproveReasonModal"
import ConfirmationModal from "@/public-components/modals/ConfirmationModal"
import Payslip from "./Payslip"

interface Props {
    payrollList: any[]
    open: boolean
    handleClose: () => void
    loading: boolean
    payrollApprover: any
    refreshPayrollApprovers: () => void
}
export default function PayrollsTable(props: Props) {
    
    const { payrollList, open, handleClose, loading, payrollApprover, refreshPayrollApprovers } = props

    const dispatch = useDispatch()
    const currUser = useSelector((state:RootState) => state.auth.employee_detail)
    
    const [selectedPayroll, setSelectedPayroll] = useState(null)
    const [showPayroll, setShowPayroll] = useState<boolean>(false)

    const [confirmModal, setConfirmModal] = useState(
        {
            showApproveModal: false,
            showDisapproveModal: false
        }
    )

    const [data, setData] = useState<any>(
        {
            approver_emp_no: currUser?.emp_no,
            status: "",
            disapproved_reason: null,
            added_by: currUser?.emp_no
        }
    )
    
    const columns: GridColDef[] = [
        {
            field: "emp_no",
            headerName: "Employee no.",
            flex:1,
            minWidth: 150,
            cellClassName: 'w-150 md:w-0',
        },
        {
            field: "work_days_total",
            headerName: "Total Work Days",
            flex:1,
            minWidth: 150,
            cellClassName: 'w-150 md:w-0',
        },
        {
            field: "net_pay_after_loan",
            headerName: "Net Pay After Loan (₱)",
            flex:1,
            minWidth: 150,
            cellClassName: 'w-150 md:w-0',
        }
    ]

    const handleClosePayroll = () => {
        setShowPayroll(curr => false)
    }

    const onSelectedRow = (row:any) => {
        setSelectedPayroll((curr:any) => row)
        setShowPayroll(curr => true)
    }


    const onDisapprove = (e:any) => {
        e.preventDefault()

        const payload = {
            approver_emp_no: currUser?.emp_no,
            status: "disapprove",
            disapproved_reason: data?.disapproved_reason,
            added_by: currUser?.emp_no
        }

        updatePayrollApprover(payload)
    }

    const onApprove = () => {

        const payload = {
            approver_emp_no: currUser?.emp_no,
            status: "approve",
            disapproved_reason: data?.disapproved_reason,
            added_by: currUser?.emp_no
        }

        updatePayrollApprover(payload)
    }

    const updatePayrollApprover = async(payload:any) => {
        await
            axiosInstance
                .put(`payroll_approver/${payrollApprover?.id}/`, payload)
                .then(res => {
                    refreshPayrollApprovers()
                    handleCloseModal()
                    dispatch(HandleAlertAction(
                        {
                            open:true,
                            status:"success",
                            message:"Approved Payroll Successfully"
                        }
                    ))
                })
                .catch(err => {
                    console.error(err?.response)
                    handleCloseModal()
                    dispatch(HandleAlertAction(
                        {
                            open:true,
                            status:"error",
                            message:err?.response?.data?.["Error Message"] ?? "Fail To Approve Payrolls"
                        }
                    ))
                })
    }

    const disapproveReasonChange = (e:any) => {
        setData((curr:any) => ({
            ...curr,
            disapproved_reason: e.target.value
        }))
    }

    const handleCloseModal = () => {
        setData((curr:any) => (
            {
                ...curr,
                disapproved_reason: null
            }
        ))
        setConfirmModal(curr => (
            {
                ...curr, 
                showDisapproveModal:false,
                showApproveModal: false
            }
        ))
    }
    return(
        <Fragment>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{
                    overflow: "auto",
                    paddingBottom: "20px"
                }}
            >
                <Box className="m-auto mt-10 bg-white shadow-2xl p-4 overflow-auto w-11/12">

                    <div className="flex justify-end">
                        <IconButton  
                            aria-label="close"
                            onClick={() => handleClose()}
                        >
                            <XMarkIcon className="w-8 text-black"/>
                        </IconButton>
                    </div>

                    {/* MAIN CONTENT */}
                    <Typography variant="h4" className="text-center">List Of Payrolls</Typography>
                    <div className="p-8">
                        <div className="flex flex-col md:flex-row gap-4">
                            <Button 
                                variant="outlined" 
                                onClick={() => setConfirmModal(curr => ({...curr, showDisapproveModal:true}))}
                                disabled={["APD", "DIS"].includes(payrollApprover?.status)}
                            >
                                Disapprove
                            </Button>
                            <Button 
                                variant="contained" 
                                onClick={() => setConfirmModal(curr => ({...curr, showApproveModal:true}))}
                                disabled={["APD", "DIS"].includes(payrollApprover?.status)}
                            >
                                Approve
                            </Button>
                        </div>
                        <div id="payrolls-table-wrapper" className="h-[500px] mt-8">
                            <p>Click row to view full details</p>
                            <DataGrid
                                rows={payrollList} 
                                columns={columns}
                                onRowClick={(params) => onSelectedRow(params.row)}
                                loading={loading}
                                sx={{
                                    height: "100%",
                                    width: '100%'
                                }}
                            />
                        </div>
                    </div>

                    {/* MODAL VIEW FOR SPECIFIC PAYROLL DATA */}
                    <ViewPayroll 
                        payrollData={selectedPayroll}
                        handleClose={handleClosePayroll}
                        // refreshTable={fetchPayrollByApprovers}
                        open={showPayroll}            
                    />

                    <ConfirmationModal 
                        onYes={onApprove} 
                        message="Are you sure you want to approve this pending payrolls?"
                        handleClose={() => {setConfirmModal(curr => ({...curr, showApproveModal:false}))}} 
                        open={confirmModal?.showApproveModal} 
                    />
                    <DisapproveReasonModal 
                        open={confirmModal?.showDisapproveModal}
                        handleClose={() => handleCloseModal()} 
                        title="Are You Sure You Want To Disapprove Payrolls?" 
                        message="Please state your reason for disapproving payrolls" 
                        onContinue={onDisapprove} 
                        onInputChange={disapproveReasonChange} 
                    />

                    {/* <Payslip 
                        data={selectedPayroll} 
                        open={showPayroll} 
                        handleClose={handleClosePayroll} 
                    /> */}
                </Box>
            </Modal>
        </Fragment>
    )
}