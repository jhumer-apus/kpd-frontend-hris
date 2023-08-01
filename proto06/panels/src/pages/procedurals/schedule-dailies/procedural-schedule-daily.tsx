import { Fragment, useState, useEffect, CSSProperties } from 'react';
import HighlightedCalendar from './local-components/highlighted-calendar/highlighted-calendar';
import { styled } from '@mui/material/styles';
import MuiGrid from '@mui/material/Grid';
import { Paper, useTheme, useMediaQuery, Button } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { getCutoffListEmployee } from '@/store/actions/dtr';

import { CutoffListMergeSelectionState, ProcessPayroll } from '@/types/types-pages';
import { RootState } from '@/store/configureStore';
import { Typography } from '@material-tailwind/react';
import ListOfHolidaysComponent from './local-components/list-of-holidays/list-of-schedule-daily';
import { ScheduleDailyColor } from './local-components/list-of-holidays/list-of-schedule-daily';
import dayjs from 'dayjs';
import CreateHolidayModal from './local-components/create-holiday-modal/create-schedule-daily-modal';


const PaperStyle: CSSProperties = {
  padding: "20px",
  height: "800px",
  // overflowY: 'auto'
}

const Grid = styled(MuiGrid)(({ theme }) => ({
  width: '100%',
  height: "100%",
  ...theme.typography.body2,
  '& [role="separator"]': {
    margin: theme.spacing(0, 2),
  },
}));






export default function ProceduralSCHEDULEDAILYpage() {
  const theme = useTheme();
  const curr_emp = useSelector((state: RootState) => state.auth);
  const [value, setValue] = useState<dayjs.Dayjs | null>(dayjs());
  const matches = useMediaQuery(theme.breakpoints.down('lg'));
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const curr_emp_no = curr_emp.employee_detail?.emp_no;
  const [currEmployee, setCurrEmployee] = useState<number>((curr_emp_no) || 0);
  const handleClose = () => setOpen(false);


    return (
        <Fragment>
        <Grid container direction={matches ? 'column' : 'row'} spacing={2}>
            <Grid item xs={6}>
                <Paper elevation={3} style={PaperStyle}>
                    <Typography variant={'h6'}>
                      Daily Schedule of an Employee
                    </Typography>
                    <div className='flex justify-center align-center'>
                      <HighlightedCalendar value={value} setValue={setValue} currEmployee={currEmployee} setCurrEmployee={setCurrEmployee}/>
                    </div>
                    <div className='flex justify-around'>
                    <Typography variant={'paragraph'}>
                      <p>Click the list to view date</p>
                      <p>or + Assign Shift to add</p>
                    </Typography>
                    <Typography>
                      <Button variant='contained' onClick={handleOpen}>
                        + Assign Shift
                      </Button>
                      <CreateHolidayModal open={open} setOpen={setOpen} handleOpen={handleOpen} handleClose={handleClose}/>
                    </Typography>
                    </div>
                </Paper>
            </Grid>
            <Grid item xs={6}>
                <Paper elevation={3} style={PaperStyle}>
                    <div className='flex justify-between'>
                    <Typography variant={'h6'} style={{alignItems: 'center', display: 'flex', paddingLeft: '10px'}}>List of Holidays</Typography>
                    <div>
                      {/* <Typography>Legends</Typography> */}
                      <Typography className='flex my-2'><p style={{background: ScheduleDailyColor._restday, borderRadius: '100px', width: '25px'}}></p>&nbsp;&nbsp;Restday</Typography>
                      <Typography className='flex mb-2'><p style={{background: ScheduleDailyColor._workday, borderRadius: '100px', width: '25px'}}></p>&nbsp;&nbsp;Workday</Typography>  
                    </div>
                    </div>
                    <ListOfHolidaysComponent value={value} setValue={setValue}  currEmployee={currEmployee} setCurrEmployee={setCurrEmployee}/>
                </Paper>
            </Grid>
        </Grid>
        </Fragment>
    );
}