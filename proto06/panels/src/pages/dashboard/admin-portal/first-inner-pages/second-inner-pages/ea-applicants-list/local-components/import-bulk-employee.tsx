import { Fragment, useState } from 'react';
import { Button } from '@mui/material';
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import { ImportEmployee } from '../forms/ImportEmployee';
import { Modal, Box } from '@mui/material';

function ImportBulkEmployeeComponent() {
    const [open3, setOpen3] = useState(false);
    const handleOpen3 = () => {
        setOpen3(true);
    };

    const handleClose3 = () => {
        setOpen3(false);
    };

    return (
        <Fragment>
        <Button 
          className='mb-4 flex gap-2'
          variant='outlined'
          color='primary'
          // icon={<ArrowUpTrayIcon/>}
          onClick={()=>{handleOpen3()}}
        >
          <ArrowUpTrayIcon style={{height: '15px'}}/> Import / Bulk Entry Employee CSV 
        </Button>
        <Modal
            open={open3}
            onClose={
              handleClose3
            }
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <Box sx={{ ...style, width:"80%", height: "80%", overflowY: "auto",  background: "#fff", backgroundImage: "#fff", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <ImportEmployee/>
            </Box>
        </Modal>
        </Fragment>
    );
}

export default ImportBulkEmployeeComponent;


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
  