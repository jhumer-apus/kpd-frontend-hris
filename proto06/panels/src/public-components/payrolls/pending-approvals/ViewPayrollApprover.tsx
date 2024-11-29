import { XMarkIcon } from "@heroicons/react/24/solid";
import { Box, IconButton, Modal, TextField, Typography } from "@mui/material";
import dayjs from "dayjs";
import { Fragment } from "react";

interface Props {
    open: boolean,
    handleClose: () => void
    data: any
}
export default function PayrollApprover(props: Props) {

    const { open, handleClose, data } = props

    console.table(data)
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
                        PAYROLL APPROVER
                    </Typography>
                    <br></br>
                    <div className="flex flex-col gap-4">
                        <TextField
                            label="Branch"
                            value={data?.branch_name}
                            inputProps={{
                                readOnly:true
                            }}
                        />
                        <TextField
                            label="Cut Off Period"
                            value={data?.cutoff_name}
                            inputProps={{
                                readOnly:true
                            }}
                        />
                        <TextField
                            label="Payroll Total"
                            value={data?.payroll_total}
                            inputProps={{
                                readOnly:true
                            }}
                        />
                        <TextField
                            label="Approver 1"
                            value={data?.approver1_name}
                            inputProps={{
                                readOnly:true
                            }}
                        />
                        <TextField
                            label="Approver 2"
                            value={data?.approver2_name}
                            inputProps={{
                                readOnly:true
                            }}
                        />
                        <TextField
                            label="Approver 3"
                            value={data?.approver3_name}
                            inputProps={{
                                readOnly:true
                            }}
                        />
                        <TextField
                            label="Date Approved by Approver 1"
                            value={data?.approved1_date? dayjs(data?.approved1_date).format("MMM DD, YYYY"): ""}
                            inputProps={{
                                readOnly:true
                            }}
                        />
                        <TextField
                            label="Date Approved by Approver 2"
                            value={data?.approved2_date? dayjs(data?.approved2_date).format("MMM DD, YYYY"): ""}
                            inputProps={{
                                readOnly:true
                            }}
                        />
                        <TextField
                            label="Date Approved by Approver 3"
                            value={data?.approved3_date? dayjs(data?.approved3_date).format("MMM DD, YYYY"): ""}
                            inputProps={{
                                readOnly:true
                            }}
                        />
                        <TextField
                            label="Disapprover"
                            value={data?.disapprover_name}
                            inputProps={{
                                readOnly:true
                            }}
                        />
                        <TextField
                            label="Disapproved Date"
                            value={data?.disapproved_date}
                            inputProps={{
                                readOnly:true
                            }}
                        />
                        <TextField
                            label="Disapprove Reason"
                            value={data?.disapproved_reason}
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