import React, { Fragment, ChangeEvent, useState, Dispatch, SetStateAction, useEffect} from 'react';
import Checkbox from '@mui/joy/Checkbox';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Typography from '@mui/joy/Typography';
import { Paper } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import Popover from '@mui/material/Popover';
import useScreenSize from '@/custom-hooks/use-screen-size';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { ProcessPayroll } from '@/types/types-pages';
import { useRef } from 'react';



interface ApplyPayrollDeductions {
    selectedRows: ProcessPayroll;
    setSelectedRows: Dispatch<SetStateAction<ProcessPayroll>>;
}

function ApplyPayrollDeductions(props: ApplyPayrollDeductions) {
    const disRefBoy = useRef(null);
    const {selectedRows, setSelectedRows} = props;
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [rotate, setRotate] = useState(0);
    const screenSize = useScreenSize();
    const checkboxLabel = (key: keyof ProcessPayroll): string => {
        const keyProcessor: Record<keyof ProcessPayroll, string> = {
          emp_no: '',
          cutoff_code: '',
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

    const open = Boolean(anchorEl);
    const handleClick = () => {
        setAnchorEl(disRefBoy.current);
        setRotate(90);
    };
    const handleClose = () => {
        setAnchorEl(null);
        setRotate(0);
    };
    const id = open ? 'simple-popover' : undefined;
    const DeductionLabel = (): string => {
        let label = '';
        if (screenSize.width <= 608){
          label = 'Deductions';
        } else if (screenSize.width <= 800 && screenSize.width > 608){
          label = 'Apply Deductions'
        } else {
          label = 'Apply Payroll Deductions'
        }
        return label;
    };
    const DeductionIconStyle = {
    transform: `rotate(${rotate}deg)`,
    transition: 'transform 0.3s ease',
    };

    return (
        <Fragment>
        <div className="flex justify-end">
          <Paper ref={disRefBoy} elevation={3} aria-describedby={id} sx={{marginBottom: '14px', marginRight: '24px', width: '30%'}} variant="elevation" onClick={handleClick}>
            <Typography id="payroll deductions" variant="solid" style={{background: HRISGradientBar, cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }} level="body1" fontWeight="400">
              <p>{DeductionLabel()}</p>
              <p style={DeductionIconStyle}><ArrowRightIcon/></p>
            </Typography>
          </Paper>
        </div>
        <Popover
        id={id}
        open={open}
        anchorEl={disRefBoy.current}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        >
          <div className='p-4 mb-6' style={{width: '99%'}}>
          <div className='ml-2'>
            <Typography id="additional_options" level="body2" fontWeight="lg" mb={2}>Additional Options Deduction</Typography>
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
                  color="primary"
                />
              </div>
              <Typography id="loan_deductions" level="body2" fontWeight="lg" mb={2}>Loan Deductions</Typography>
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
        </Fragment>
    );
}

export default ApplyPayrollDeductions;


export const HRISGradientBar = 'linear-gradient(to right, rgb(55, 59, 68), rgb(66, 134, 244))';
