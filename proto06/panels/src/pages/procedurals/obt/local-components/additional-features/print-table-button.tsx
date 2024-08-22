import React, {useState} from 'react';
import {Button} from '@material-tailwind/react';
import {Typography, Popover} from '@mui/material';

interface PrintTableButton {
    setIsPrinting: (value: React.SetStateAction<boolean>) => void,
}


function PrintTableButton(props: PrintTableButton) {
    const {setIsPrinting} = props;
    function handlePrint(){
      setIsPrinting(true)
      setTimeout(()=> {
        window.print();
        setIsPrinting(false)
      }, 1500)
    };
    const [ anchorEl, setAnchorEl ] = useState<HTMLElement | null>(null);
    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    }
  
    const handlePopoverClose = ()=> {
      setAnchorEl(null);
    }
  
  
    const popoverOpen = Boolean(anchorEl);

    
    return (
        <Typography
          aria-owns={popoverOpen ? 'mouse-over-popover' : undefined}
          aria-haspopup='true'
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
          // sx={{marginTop}}
        >
        <Button variant="gradient" color="indigo" style={{marginRight: "6px"}} onClick={handlePrint}>Print Table</Button>
        <Popover
            id="mouse-over-popover"
            sx={{
            pointerEvents: 'none',
            }}
            open={popoverOpen}
            anchorEl={anchorEl}
            anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
            }}
            transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
            }}
            onClose={handlePopoverClose}
            disableRestoreFocus
        >
            <Typography variant={"overline"} sx={{ p: 1 }}>
            Print function is only available <b>100 item rows at a time.</b> For the next 100 items &nbsp; <br/> &nbsp;
            you'd print, you'd have to view the 101st item in the table first <br/>&nbsp;
            and then press print to have it reflected. For customization of designs <br/>&nbsp;
            of the printables, with logo, and etc. Please contact your administrator <br/>&nbsp;
            <b>for a developer's analysis.</b>
            </Typography>
        </Popover>
        </Typography>
    );
}

export default PrintTableButton;