import axiosInstance from "@/helpers/axiosConfig"
import ConfirmationModal from "@/public-components/modals/ConfirmationModal"
import { HandleAlertAction } from "@/store/actions/components"
import { Box, Button, Modal, TextField, Typography } from "@mui/material"
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
    const dispatch = useDispatch()
    const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false)

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
      };

    const handleCloseConfirm = () => {
        setOpenConfirmModal(curr => false)
    }

    const onApprove = () => {
        approvePayrolls()
        handleCloseConfirm()
    }

    const approvePayrolls = async () => {
        await
            axiosInstance
                .put(`payroll_approver/${payrollData?.id}/`)
                .then(res => {
                    // refreshTable()
                    dispatch(HandleAlertAction(
                        {
                            open:true,
                            status:"success",
                            message:"Approved Payroll Successfully"
                        }
                    ))
                })
                .catch(err => {
                    console.error(err?.res?.data)
                    dispatch(HandleAlertAction(
                        {
                            open:true,
                            status:"error",
                            message:"Failed To Approve Payroll"
                        }
                    ))
                })
    }

    return (
        <Fragment>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
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
                    </div>
                    <br></br>
                    <div className="w-fit m-auto">
                        <Button variant="contained" onClick={() => setOpenConfirmModal(curr => true)}>Approve</Button>
                    </div>
                </Box>
            </Modal>

            <ConfirmationModal 
                onYes={onApprove} 
                message="Are you sure you want to approve this pending payroll?"
                handleClose={handleCloseConfirm} 
                open={openConfirmModal} 
            />
            
        </Fragment>
    )
}