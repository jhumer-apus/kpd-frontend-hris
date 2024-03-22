import { Box, Modal, Typography } from "@mui/material";

interface Props {
    holidayId:any
    isOpenModal: boolean
    setIsOpenModal: any
}

export default function EditHolidayModal(props:Props) {

    const { isOpenModal,setIsOpenModal,  holidayId } = props
    
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'white',
        boxShadow: 24,
        p: 4,
      };
    return (
        <Modal
            open={isOpenModal}
            onClose={() => {
                setIsOpenModal((curr:boolean) => false)
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} className="rounded-lg">
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Edit Holiday
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                </Typography>
            </Box>
        </Modal>
    )
}