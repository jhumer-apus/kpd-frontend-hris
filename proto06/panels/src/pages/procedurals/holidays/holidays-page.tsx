import React, { Fragment, useState, useEffect, CSSProperties } from 'react';
import HighlightedCalendar from './local-components/highlighted-calendar/highlighted-calendar';
import { styled } from '@mui/material/styles';
import MuiGrid from '@mui/material/Grid';
import { Paper, useTheme, useMediaQuery, Button } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { getCutoffListEmployee } from '@/store/actions/dtr';

import { CutoffListMergeSelectionState, ProcessPayroll } from '@/types/types-pages';
import { RootState } from '@/store/configureStore';
import { Typography } from '@material-tailwind/react';
import ListOfHolidaysComponent from './local-components/list-of-holidays/list-of-holidays';


const PaperStyle: CSSProperties = {
  padding: "20px",
  height: "800px",
  overflowY: 'auto'
}

const Grid = styled(MuiGrid)(({ theme }) => ({
  width: '100%',
  height: "100%",
  ...theme.typography.body2,
  '& [role="separator"]': {
    margin: theme.spacing(0, 2),
  },
}));






export default function HolidaysPage() {
  const theme = useTheme();
const matches = useMediaQuery(theme.breakpoints.down('lg'));

    return (
        <Fragment>
        <Grid container direction={matches ? 'column' : 'row'} spacing={2}>
            <Grid item xs={6}>
                <Paper elevation={3} style={PaperStyle}>
                    <Typography variant={'h6'}>
                      HRIS Calendar of Holidays
                    </Typography>
                    <div className='flex justify-center align-center'>
                      <HighlightedCalendar/>
                    </div>
                    <div className='flex justify-around'>
                    <Typography variant={'paragraph'}>
                      <p>Click the date to view</p>
                      <p>or + Create Holiday to add</p>
                    </Typography>
                    <Typography>
                      <Button variant='contained'>
                        + Create Holiday
                      </Button>
                    </Typography>
                    </div>
                </Paper>
            </Grid>
            <Grid item xs={6}>
                <Paper elevation={3} style={PaperStyle}>
                    <div>List of Holidays</div>
                    <ListOfHolidaysComponent/>
                    {/* <CutOffListEmployees employees={employees} selectedRows={selectedRows} setSelectedRows={setSelectedRows}/> */}
                </Paper>
            </Grid>
        </Grid>
          
        </Fragment>
    );
}