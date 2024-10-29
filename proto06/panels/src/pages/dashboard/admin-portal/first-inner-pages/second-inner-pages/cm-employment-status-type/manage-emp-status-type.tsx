import { Fragment }from 'react';
import { styled } from '@mui/material/styles';
import MuiGrid from '@mui/material/Grid';
import { Paper, Box, useTheme, useMediaQuery } from '@mui/material';
import EmploymentStatusTypesTable from '@/public-components/categories/employment-status-types/EmploymentStatusTypesTable';
import CreateEmploymentStatusType from '@/public-components/categories/employment-status-types/CreateEmploymentStatusType';


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

export default function ManageEmploymentStatusTypes() {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('xl'));

  return (
    <Fragment>
        <Grid container direction={matches ? 'column' : 'row'} spacing={2} className='!gap-3'>
            <Grid item xs className='!pl-0'>
                <Paper elevation={3} style={PaperStyle} className='!h-auto'>
                    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center' }}>
                        <CreateEmploymentStatusType/>
                    </Box>
                </Paper>
            </Grid>
            <Grid item xs className='!pl-0'>
                <Paper elevation={3} style={PaperStyle}>
                    <EmploymentStatusTypesTable />
                </Paper>
            </Grid>
        </Grid>
    </Fragment>
  );
}