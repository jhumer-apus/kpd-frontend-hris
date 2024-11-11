import { Fragment }from 'react';
import { styled } from '@mui/material/styles';
import MuiGrid from '@mui/material/Grid';
import { Paper, Box, useTheme, useMediaQuery } from '@mui/material';
import AAANNOUNCEMENTPageHistory from './local-component/right-side/aa-announcement-configuration-history';
import AAANNOUNCEMENTCreate from './local-component/left-side/aa-announcement-configuration-create';


const PaperStyle = {
    padding: "20px",
    height: 'auto',
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

export default function AAANNOUNCEMENT() {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('xl'));

  return (
    <Fragment>
        <Grid 
            container 
            direction={matches ? 'column' : 'row'} 
            spacing={4} 
            className='!gap-3'
        >
            <Grid item xs className='!pl-0'>
                <Paper elevation={3} style={PaperStyle}>
                    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center' }}>
                        <AAANNOUNCEMENTCreate/>
                    </Box>
                </Paper>
            </Grid>
            <Grid item xs className='!pl-0'>
                <Paper elevation={3} style={PaperStyle}>
                    <AAANNOUNCEMENTPageHistory/>
                </Paper>
            </Grid>
        </Grid>
    </Fragment>
  );
}