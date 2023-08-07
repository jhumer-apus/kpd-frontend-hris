import { Fragment, useState, useEffect, CSSProperties } from 'react';
import HighlightedCalendar from './local-components/highlighted-calendar/highlighted-calendar';
import { styled } from '@mui/material/styles';
import MuiGrid from '@mui/material/Grid';
import { Paper, useTheme, useMediaQuery, Button } from '@mui/material';

import { useSelector } from 'react-redux';

import { RootState } from '@/store/configureStore';
import { Typography } from '@material-tailwind/react';
import { ScheduleDailyColor } from './local-components/list-of-holidays/list-of-schedule-daily';
import dayjs from 'dayjs';
import CreateSCHEDULEDAILYModal from './local-components/assign-shift-modal/create-schedule-daily-modal';
import ProceduralSCHEDULEDAILYPageHistory from './right-side/schedule-daily-history';
import EmployeeAutoCompleteRight from './local-components/employee-autocomplete/employee-autocomplete-right';
import CreateSCHEDULEDAILYMultipleModal from './local-components/assign-multiple-shift/create-schedule-daily-multiple-modal';


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


export default function YourSCHEDULEDAILYpage() {
  const theme = useTheme();
  const curr_emp = useSelector((state: RootState) => state.auth);
  const [value, setValue] = useState<dayjs.Dayjs | null>(dayjs());
  const matches = useMediaQuery(theme.breakpoints.down('lg'));
  const [open1, setOpen1] = useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);
  const [open2, setOpen2] = useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);
  const curr_emp_no = curr_emp.employee_detail?.emp_no;
  const [currEmployee, setCurrEmployee] = useState<number>((curr_emp_no) || 0);



    return (
        <Fragment>
        <Grid container direction={matches ? 'column' : 'row'} spacing={2}>
            <Grid item xs={6}>
                <Paper elevation={3} style={PaperStyle}>
                    <div className='flex justify-between'>
                        <div className='flex flex-col'>
                          <Typography variant={'h6'}>
                            Daily Schedule of an Employee
                          </Typography>
                          <Typography variant={'small'} className='italic'>
                            Some Restdays have schedules', make sure to be guided accordingly.
                          </Typography>
                          <Typography variant={'small'} className='italic'>
                            Hover date to check details. And make sure this is intended.
                          </Typography>
                        </div>
                        <div>
                          <Typography className='flex my-2'><p style={{background: ScheduleDailyColor._restday, borderRadius: '100px', width: '25px', opacity: '0.4'}}></p>&nbsp;&nbsp;Restday</Typography>
                          <Typography className='flex mb-2'><p style={{background: ScheduleDailyColor._workday, borderRadius: '100px', width: '25px', opacity: '0.4'}}></p>&nbsp;&nbsp;Workday</Typography>  
                        </div>
                    </div>
                    <div className='flex justify-center align-center'>
                      <HighlightedCalendar value={value} setValue={setValue} currEmployee={currEmployee} setCurrEmployee={setCurrEmployee}/>
                    </div>
                    {/* <div className='flex justify-around'>
                    <Typography variant={'paragraph'}>
                      <p>Click the list to view date</p>
                      <p>or + Assign Shift to add</p>
                    </Typography>
                    <Typography>
                      <div className='flex flex-col gap-4'>
                        <Button variant='contained' className='text-start' onClick={handleOpen1}>
                          + Assign Shift
                        </Button>
                        <Button variant='outlined' onClick={handleOpen2}>
                          + Assign Multiple
                        </Button>
                      </div>
                      <CreateSCHEDULEDAILYModal open1={open1} setOpen1={setOpen1} handleOpen1={handleOpen1} handleClose1={handleClose1}/>
                      <CreateSCHEDULEDAILYMultipleModal open2={open2} setOpen2={setOpen2} handleOpen2={handleOpen2} handleClose2={handleClose2}/>
                    </Typography>
                    </div> */}
                </Paper>
            </Grid>
            <Grid item xs={6}>
                <Paper elevation={3} style={PaperStyle}>
                    <div className='flex justify-between'>
                    <Typography variant={'h6'} style={{alignItems: 'center', display: 'flex'}}>Daily Schedule Table History</Typography>
                    <EmployeeAutoCompleteRight currEmployee={currEmployee} setCurrEmployee={setCurrEmployee}/>
                    </div>
                    <ProceduralSCHEDULEDAILYPageHistory currEmployee={currEmployee} setCurrEmployee={setCurrEmployee}/>
                </Paper>
            </Grid>
        </Grid>
        </Fragment>
    );
}