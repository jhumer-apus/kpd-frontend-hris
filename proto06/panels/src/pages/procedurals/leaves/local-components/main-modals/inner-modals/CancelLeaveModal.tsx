import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { APILink, RootState } from '@/store/configureStore';
import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { beautifyJSON } from '@/helpers/utils';
import { useSelector } from 'react-redux';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface Props{
    isCancelModalOpen: boolean
    setIsCancelModalOpen: any
    data: any
}

export default function CancelLeaveModal(props: Props) {

    //PROPS
    const { isCancelModalOpen, setIsCancelModalOpen, data } = props

    //REDUX
    const currUser = useSelector((state: RootState) => state.auth.employee_detail);

    //STATE
    const [cancelReason, setCancelReason] = useState<string>("")

    //FUNCTIONS
    const validateCancel = () => {

        let errors:any = {}
        !cancelReason.trim() && (errors['Cancel Reason'] = 'Cancel Reason is empty');

        if(Object.keys(errors).length > 0) {
            window.alert(beautifyJSON(errors))
            return true
        }

        return false
    }
    const cancelApprovedLeave = async () => {

        if(validateCancel()) {
            return 
        }

        const body = {
            ...data,
            leave_reason_cancelled: cancelReason,
            added_by: currUser?.emp_no
        }
        await axios.put(`${APILink}cancel_leave/${data.emp_no}/${data.id}/`, body).then((res:AxiosResponse) => {

            setIsCancelModalOpen((curr:any) => true)
            window.alert("Cancel approved leave successfully")

        }).catch((err:AxiosError) => {

            setIsCancelModalOpen((curr:any) => true)
            window.alert(beautifyJSON(err.response?.data))

        })
    }

  return (
    <div>
      <Modal
        open={isCancelModalOpen}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Cancel Approved Leave
            </Typography>
            <Typography id="modal-modal-description" className="text-red-500" sx={{ mt: 2 }}>
                Are you sure you want to <span className="font-bold">CANCEL</span> the approved leave?
            </Typography>

            <div className='mt-4'>
                <TextField 
                    className="w-full" 
                    onChange={(e) => setCancelReason(curr => e.target.value)} 
                    label="Cancel Reasons"
                />
            </div>
            <div className='m-auto'>
                <Button className="" onClick={() => setIsCancelModalOpen(false)}>No</Button>
                <Button className="" onClick={() => cancelApprovedLeave()}>Yes</Button>
            </div>
        </Box>
      </Modal>
    </div>
  );
}