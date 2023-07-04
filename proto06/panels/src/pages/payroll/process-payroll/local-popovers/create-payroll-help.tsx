
import {useState} from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import HelpIcon from '@mui/icons-material/Help';

export default function CreatePayrollHelp() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
      <Typography
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        sx={{marginTop: "-2px"}}
      >
        <HelpIcon color="primary" style={{height: '20px'}}/>
        <Popover
            id="mouse-over-popover"
            sx={{
            pointerEvents: 'none',
            }}
            open={open}
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
            Choose only <b>1 Cutoff List</b> you want to create payroll, then get the list  &nbsp; <br/> &nbsp;
            and then choose the employees you want to create payroll with it. <br/>&nbsp;
            The result would be Payroll of selected employees. It will be <br/>&nbsp;
            computed based on their PAYROLL SUMMARY. If they still have none, please create one. <br/>&nbsp;
            <b>Decide if deductions are to be made </b> and if need to be included in the payroll as well.
            </Typography>
        </Popover>
      </Typography>
  );
}