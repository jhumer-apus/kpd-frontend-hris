import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { useDispatch } from 'react-redux';
import { processPayrollFailureCleanup } from '@/store/actions/payroll';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars() {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const state = useSelector((state: RootState) => state.payroll);
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  React.useEffect(()=>{
    if(state.processPayroll.error || state.viewPayroll.error){
        handleClick();
        setTimeout(()=> {
          dispatch(processPayrollFailureCleanup());
        }, 4000);
    }
  },[state.processPayroll.error])


  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      {/* <Button variant="outlined" onClick={handleClick}>
        Open success snackbar
      </Button> */}
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {state.viewPayroll.error || state.processPayroll.error}
        </Alert>
      </Snackbar>
      {/* <Alert severity="error">This is an error message!</Alert>
      <Alert severity="warning">This is a warning message!</Alert>
      <Alert severity="info">This is an information message!</Alert>
      <Alert severity="success">This is a success message!</Alert> */}
    </Stack>
  );
}