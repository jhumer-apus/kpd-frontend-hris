import { ChangeEvent, Fragment, useEffect, useState }from 'react';
import { styled } from '@mui/material/styles';
import MuiGrid from '@mui/material/Grid';
import { Paper, useTheme, useMediaQuery } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { getCutoffListEmployee } from '@/store/actions/dtr';
import CutOffListTable from './local-components/cutoff-list-table';
import CutOffListEmployees from './local-components/cutoff-list-employees';
import { CutoffListMergeSelectionState, ProcessPayroll } from '@/types/types-pages';
import { RootState } from '@/store/configureStore';
import Box from '@mui/joy/Box';
import Checkbox, { checkboxClasses } from '@mui/joy/Checkbox';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Typography from '@mui/joy/Typography';
import Done from '@mui/icons-material/Done';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

import CircleIcon from '@mui/icons-material/Circle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Popover from '@mui/material/Popover';

const PaperStyle = {
    padding: "20px",
    height: "700px",
    overflow: 'hidden'
}

const Grid = styled(MuiGrid)(({ theme }) => ({
    width: '100%',
    height: "100%",
    ...theme.typography.body2,
    '& [role="separator"]': {
      margin: theme.spacing(0, 2),
    },
}));

export default function ProcessPayrollPage() {
  const dispatch = useDispatch();
  const [selectedRows, setSelectedRows] = useState<ProcessPayroll>({
    emp_no: null,
    cutoff_code: NaN,
    is_disabled_loan: false,
    is_ca: false,
    is_pagibig_house: false,
    is_pagibig_cal: false,
    is_pagibig_cash: false,
    is_sss_cal: false,
    is_sss_cash: false,
    is_disabled_deduction: false,
    is_30: false,
    is_70: false,
  });
  const { employees } = useSelector((state: RootState) => state.dtr.getCutoffListEmployees);
  console.log(selectedRows, "haha???11")
  const checkboxLabel = (key: keyof ProcessPayroll): string => {
    const keyProcessor: Record<keyof ProcessPayroll, string> = {
      emp_no: 'null',
      cutoff_code: 'haha',
      is_disabled_loan: 'Disable Loan Deduction',
      is_ca: 'Cash Advance',
      is_pagibig_house: 'HDMF House Loan',
      is_pagibig_cal: 'HDMF Calamity Loan',
      is_pagibig_cash: 'HDMF Cash Loan',
      is_sss_cal: 'SSS Calamity Loan',
      is_sss_cash: 'SSS Cash Loan',
      is_disabled_deduction: 'Disable Government Deduction',
      is_30: '30% Deduction',
      is_70: '70% Deduction',
    };
    return keyProcessor[key]
  };
  useEffect(()=> {
      dispatch(getCutoffListEmployee({cutoff_period:selectedRows?.cutoff_code}));
  }, [selectedRows?.cutoff_code])

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('lg'));


  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    switch (name) {
      case 'is_disabled_loan':
        setSelectedRows((prevSelectedRows) => ({
          ...prevSelectedRows,
          [name]: checked,
          is_ca: false,
          is_pagibig_house: false,
          is_pagibig_cal: false,
          is_pagibig_cash: false,
          is_sss_cal: false,
          is_sss_cash: false,
        }));
        break;
        
      case 'is_disabled_deduction':
        setSelectedRows((prevSelectedRows) => ({
          ...prevSelectedRows,
          [name]: checked,
          is_30: false,
          is_70: false,
        }));
        break;
        
      default:
        setSelectedRows((prevSelectedRows) => ({
          ...prevSelectedRows,
          [name]: checked,
        }));
        break;
    }
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const id = open ? 'simple-popover' : undefined;

  return (
    <Fragment>
        <form>
        <Button aria-describedby={id} sx={{margin: '14px'}} variant="outlined" onClick={handleClick}>
          Deductions
        </Button>
        <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        >
          <div className='p-4 mb-6' style={{width: '99%'}}>
          <div className='ml-2'>
            <Typography id="topping" level="body2" fontWeight="lg" mb={2}>Additional Options Deduction</Typography>
          </div>
          <div className='flex'>
            <div className='flex flex-col ml-2' style={{width: '50%'}}>
              <div>
                <Checkbox
                  key={'is_disabled_loan'}
                  label={checkboxLabel('is_disabled_loan' as keyof ProcessPayroll)}
                  checked={selectedRows['is_disabled_loan']}
                  onChange={handleCheckboxChange}
                  name={'is_disabled_loan'}
                  // overlay
                  color="primary"
                  // slotProps={{ action: { className: checkboxClasses.focusVisible } }}
                />
              </div>
              <Typography id="topping" level="body2" fontWeight="lg" mb={2}>Loan Deductions</Typography>
              <div className='flex flex-wrap gap-2' style={{width: '100%'}}>
              <List
                orientation="horizontal"
                wrap
                sx={{
                  '--List-gap': '6px',
                  '--ListItem-radius': '20px',
                }}
              >
                {Object.entries(selectedRows).map(([key, value], index) => {
                  console.log(key, value, "eto un besh")
                if (typeof value === 'boolean' && (key !== 'is_disabled_loan' && key !== 'is_disabled_deduction' && key !== 'is_30' && key !== 'is_70' ) ) {
                  return (
                    <ListItem key={key}>
                      {value ? 
                        <CheckCircleIcon
                          fontSize="medium"
                          color="primary"
                          sx={{ ml: -0.5, mr: 0.5, zIndex: 2, pointerEvents: 'none' }}
                        /> :
                        <CircleOutlinedIcon
                        fontSize="medium"
                        color={selectedRows.is_disabled_loan ? "disabled" : "action"}
                        sx={{ ml: -0.5, mr: 0.5, zIndex: 2, pointerEvents: 'none' }}
                        />
                      }
                      <Checkbox
                        label={checkboxLabel(key as keyof ProcessPayroll)}
                        checked={value}
                        overlay
                        variant="soft"
                        disabled={selectedRows.is_disabled_loan}
                        // slotProps={{ action: { className: checkboxClasses.focusVisible } }}
                        disableIcon
                        onChange={handleCheckboxChange}
                        name={key}
                      />
                    </ListItem>
                  );
                }
                return null;
                })}
                 </List>
              </div>
            </div>
            <div className='flex flex-col' style={{width: '50%'}}>
            <div>
                <Checkbox
                  key={'is_disabled_deduction'}
                  label={checkboxLabel('is_disabled_deduction' as keyof ProcessPayroll)}
                  checked={selectedRows['is_disabled_deduction']}
                  onChange={handleCheckboxChange}
                  name={'is_disabled_deduction'}
                  // overlay
                  color="primary"
                  // slotProps={{ action: { className: checkboxClasses.focusVisible } }}
                />
              </div>
              <Typography id="topping" level="body2" fontWeight="lg" mb={2}>Govt. Deductions</Typography>
              <div className='flex flex-wrap gap-2' style={{width: '100%'}}>
              <List
                orientation="horizontal"
                wrap
                sx={{
                  '--List-gap': '6px',
                  '--ListItem-radius': '20px',
                }}
              >
                {Object.entries(selectedRows).map(([key, value], index) => {
                if (typeof value === 'boolean' && (key !== 'is_disabled_loan' && key !== 'is_disabled_deduction' && (key === 'is_30' || key === 'is_70') ) ) {
                  return (
                    <ListItem key={key}>
                      {value ? 
                        <CheckCircleIcon
                          fontSize="medium"
                          color="primary"
                          sx={{ ml: -0.5, mr: 0.5, zIndex: 2, pointerEvents: 'none' }}
                        /> :
                        <CircleOutlinedIcon
                        fontSize="medium"
                        color={selectedRows.is_disabled_deduction ? "disabled" : "action"}
                        sx={{ ml: -0.5, mr: 0.5, zIndex: 2, pointerEvents: 'none' }}
                        />
                      }
                      <Checkbox
                        label={checkboxLabel(key as keyof ProcessPayroll)}
                        checked={value}
                        overlay
                        variant="soft"
                        disabled={selectedRows.is_disabled_deduction || ((selectedRows.is_30 || selectedRows.is_70) && !selectedRows[key] )  }
                        // slotProps={{ action: { className: checkboxClasses.focusVisible } }}
                        disableIcon
                        onChange={handleCheckboxChange}
                        name={key}
                      />
                    </ListItem>
                  );
                }
                return null;
                })}
                 </List>
              </div>
            </div>
          </div>
          </div>
        </Popover>

        <Grid container direction={matches ? 'column' : 'row'} spacing={2}>
            <Grid item xs={6}>
                <Paper elevation={3} style={PaperStyle}>
                    <CutOffListTable selectedRows={selectedRows} setSelectedRows={setSelectedRows}/>
                </Paper>
            </Grid>
            <Grid item xs={6}>
                <Paper elevation={3} style={PaperStyle}>
                    <CutOffListEmployees employees={employees} selectedRows={selectedRows} setSelectedRows={setSelectedRows}/>
                </Paper>
            </Grid>
        </Grid>
        </form>
    </Fragment>
  );
}