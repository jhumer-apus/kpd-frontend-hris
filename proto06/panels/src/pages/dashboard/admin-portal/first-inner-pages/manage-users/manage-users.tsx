import { Fragment }from 'react';
import { styled } from '@mui/material/styles';
import MuiGrid from '@mui/material/Grid';
import { Paper, Box, useTheme, useMediaQuery } from '@mui/material';
import ManageUSERSPageHistory from './local-component/right-side/manage-users-history';
import ManageUSERSCreate from './local-component/left-side/manage-users-create';


const PaperStyle = {
    padding: "20px",
    height: "700px",
    overflow: 'auto'
}

const Grid = styled(MuiGrid)(({ theme }) => ({
    width: '100%',
    height: "100%",
    margin: 0,
    ...theme.typography.body2,
    '& [role="separator"]': {
      margin: theme.spacing(0, 2),
    },
}));

export default function ManageUSERS() {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('xl'));

  return (
    <Fragment>
        <Grid container direction={matches ? 'column' : 'row'} spacing={2} className='!gap-x-3'>
            <Grid item xs className='!pl-0'>
                <Paper elevation={3} style={PaperStyle} className='!h-auto'>
                    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center' }}>
                        <ManageUSERSCreate/>
                    </Box>
                </Paper>
            </Grid>
            <Grid item xs className='!pl-0'>
                <Paper elevation={3} style={PaperStyle}>
                    <ManageUSERSPageHistory/>
                </Paper>
            </Grid>
        </Grid>
    </Fragment>
  );
}