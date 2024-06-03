
import {useState} from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import HelpIcon from '@mui/icons-material/Help';

export default function MergeDTRHelp() {
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
            Choose only <b>1 Cutoff List</b> you want to merge, then get the list  &nbsp; <br/> &nbsp;
            and then choose the employees you want to merge with it. <br/>&nbsp;
            The result would be DTR Logs of selected employees will be <br/>&nbsp;
            computed based on how much hours/time they entered daily. <br/>&nbsp;
            <b>Lates, undertimes, and OBT</b> will be included in the merge as well.
            </Typography>
        </Popover>
      </Typography>
  );
}