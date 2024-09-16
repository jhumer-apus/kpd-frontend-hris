import { Typography } from "@material-tailwind/react";
import { Button, Modal } from "@mui/material";

interface Props {
    onYes: () => void
    message: string
    handleClose: () => void
    open: boolean
}
export default function ConfirmationModal(props: Props) {

    const {onYes, message, handleClose, open} = props


    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <div className="modal-content">
                    <Typography variant="h5" className="text-center text-red-700">{message}</Typography>
                    <br></br>
                    <div className="flex gap-4 justify-end">
                        <Button onClick={() => handleClose()}>No</Button>
                        <Button onClick={() => onYes()}>Yes</Button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}