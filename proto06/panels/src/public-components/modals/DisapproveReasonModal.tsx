import { Textarea } from "@mui/joy";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { Fragment } from "react";

interface Props {
    open: boolean
    handleClose: () => void
    title: string
    message: string
    onContinue: (e:any) => void
    onInputChange: (e:any) => void

}
export default function DisapproveReasonModal(props:Props) {

    const { open, handleClose, title, message, onContinue, onInputChange } = props

    return (
        <Fragment>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 sm:w-[500px] w-10/12 bg-white shadow-2xl p-4">
                    <form onSubmit={onContinue}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            {title}
                        </Typography>
                        
                        <div className="mt-4">
                            <label>{message}</label>
                            <Textarea
                                required
                                minRows={3}
                                onChange={onInputChange}
                            />
                        </div>
                        <div className="flex gap-4 mt-4 justify-end">
                            <Button 
                                // variant="outlined" 
                                onClick={() => handleClose()}
                            >
                                Cancel
                            </Button>
                            <Button 
                                // variant="outlined" 
                                color="error"
                                type="submit"
                            >
                                Continue
                            </Button>
                        </div>
                    </form>
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