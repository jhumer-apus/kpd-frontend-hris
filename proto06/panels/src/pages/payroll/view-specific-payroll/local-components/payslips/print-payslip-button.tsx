import React, {useState, MutableRefObject, JSXElementConstructor, Fragment} from 'react';
import {Button} from '@material-tailwind/react';
import {Typography, Popover} from '@mui/material';
import ReactToPrint from 'react-to-print';

interface PrintTableButton {
    setIsPrinting?: (value: React.SetStateAction<boolean>) => void,
    content: MutableRefObject<HTMLDivElement | null>,
    multiplePayslipMode?: boolean,
}


function PrintPayslipButton(props: PrintTableButton) {
    const {content} = props;
    const [ anchorEl, setAnchorEl ] = useState<HTMLElement | null>(null);
    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    }
  
    const handlePopoverClose = ()=> {
      setAnchorEl(null);
    }

    const popoverOpen = Boolean(anchorEl);

    const modalDesc = (): JSX.Element =>{

      if(props.multiplePayslipMode){
        return(
          <Fragment>
          Print Preview Multiple Payslips. 
          </Fragment>
        )
      } else {
          return (
          <Fragment>
          Print Single Payslip is only available <b>For this Individual's Payslip.</b> <br/> &nbsp;
          If you wish to generate multiple individuals, go back to the table <br/>&nbsp;
          and check the checkboxes you wanted to generate payslips for. <br/>&nbsp;
          For more information and UX customization, please contact your administrator <br/>&nbsp;
          <b>for a developer's analysis.</b>
          </Fragment>
        )
      }
    }

    return (
        <div
          aria-owns={popoverOpen ? 'mouse-over-popover' : undefined}
          aria-haspopup='true'
        >
        <ReactToPrint
            trigger={() => <Button onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose} variant="gradient" color="indigo" style={{marginRight: "6px"}}>Print Preview {props.multiplePayslipMode ? 'Multiple' : 'Single'} Payslip</Button>}
            content={() => content.current}
            />
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
            {modalDesc()}
            </Typography>
        </Popover>
        </div>
    );
}

export default PrintPayslipButton;