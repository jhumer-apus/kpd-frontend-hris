import { Dispatch, Fragment, SetStateAction, useState, useRef } from 'react';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import ReactToPrint from 'react-to-print';
import { Button } from '@material-tailwind/react';
import PrintPayslipButton from './print-payslip-button';
import OBTModalUI from './obt-modal-ui';
import { OBTViewInterface, ViewPayrollPayPerEmployee } from '@/types/types-pages';
import { GridRowParams } from '@mui/x-data-grid';


interface SinglePayslip {
    singleOBTDetailsData: OBTViewInterface,
    scroll: boolean,
    setScroll: Dispatch<SetStateAction<boolean>>,
    setSingleOBTDetailsData: React.Dispatch<React.SetStateAction<OBTViewInterface>>;
};

const SinglePayslip = ((props:SinglePayslip) => {
    const { singleOBTDetailsData, setSingleOBTDetailsData } = props;
    const componentRef = useRef<HTMLDivElement | null>(null);

    return (
        <Fragment>
            <Typography variant='soft'>Official Business Time Individual Data</Typography>
            {/* <div>Department</div>
            <div>Company Address</div> */}
            {/* <PrintPayslipButton content={componentRef}/> */}
            <ModalClose sx={{marginTop: '4px'}}/>
            <div ref={componentRef} id="printable-area" className='mt-4'>
                <OBTModalUI setSingleOBTDetailsData={setSingleOBTDetailsData} singleOBTDetailsData={singleOBTDetailsData}/>
            </div>
        </Fragment>
    );
});

export default SinglePayslip;


// Styles

  
const paySlipDetailsFont = {
    fontSize: '12px',
};