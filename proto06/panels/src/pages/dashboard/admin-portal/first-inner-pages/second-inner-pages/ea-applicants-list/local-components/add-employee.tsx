import React, { Fragment, useState } from 'react';
import { UserProfile } from '../forms/AddEmployee';
import { Button } from '@mui/material';
import { Modal, Box } from '@mui/material';

function AddEmployeeComponent() {
    const [open2, setOpen2] = useState(false);
    
    const handleOpen2 = () =>{
        setOpen2(true);
    };
    
    function handleClose2(){
        setOpen2(false);
    };

    return (
        <Fragment>
            <Button 
            className='mb-4'
            variant='contained'
            color='primary'
            onClick={()=>{handleOpen2()}}
            >
            + Add Applicant
            </Button>
            <Modal
                open={open2}
                onClose={
                handleClose2
                }
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width:"80%", height: "90%", overflowY: "auto",  background: "#fff", backgroundImage: "#fff" }}>
                <UserProfile/>
                </Box>
            </Modal>
        </Fragment>
    );
}

export default AddEmployeeComponent;


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    borderRadius: '10px'
};