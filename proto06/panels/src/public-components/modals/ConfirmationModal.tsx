import { Typography } from "@material-tailwind/react";
import { Button, Modal } from "@mui/material";

interface Props {
    onYes: () => void
    message: string
}
export default function ConfirmationModal(props: Props) {

    const {onYes, message} = props

    return (
        <div>
            <Modal
                open={}
                onClose={handleClose}
            >
                <div className="modal-content">
                    <Typography>{message}</Typography>
                    <div className="flex gap-4">
                        <Button>No</Button>
                        <Button>Yes</Button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}