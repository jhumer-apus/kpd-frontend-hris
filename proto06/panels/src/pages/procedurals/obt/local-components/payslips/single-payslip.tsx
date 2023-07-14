import { Dispatch, Fragment, SetStateAction, useState, useRef } from 'react';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import ReactToPrint from 'react-to-print';
import { Button } from '@material-tailwind/react';
import PrintPayslipButton from './print-payslip-button';
import PayslipUI from './payslip-ui';
import { OBTViewInterface, ViewPayrollPayPerEmployee } from '@/types/types-pages';
import { GridRowParams } from '@mui/x-data-grid';


interface SinglePayslip {
    singleOBTDetailsData: OBTViewInterface,
    scroll: boolean,
    setScroll: Dispatch<SetStateAction<boolean>>,
};

const SinglePayslip = ((props:SinglePayslip) => {
    const { singleOBTDetailsData } = props;
    const componentRef = useRef<HTMLDivElement | null>(null);

    return (
        <Fragment>
            <Typography variant='soft'>Official Business Time Individual Data</Typography>
            {/* <div>Department</div>
            <div>Company Address</div> */}
            {/* <PrintPayslipButton content={componentRef}/> */}
            <ModalClose sx={{marginTop: '4px'}}/>
            <div ref={componentRef} id="printable-area" className='flex justify-center m-2'>
                <PayslipUI singleOBTDetailsData={singleOBTDetailsData}/>
            </div>
        </Fragment>
    );
});

export default SinglePayslip;


// Styles

  
const paySlipDetailsFont = {
    fontSize: '12px',
};