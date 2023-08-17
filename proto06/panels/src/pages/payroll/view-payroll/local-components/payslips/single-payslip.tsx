import { Dispatch, Fragment, SetStateAction, useState, useRef } from 'react';
import ModalClose from '@mui/joy/ModalClose';
import PrintPayslipButton from './print-payslip-button';
import PayslipUI from './payslip-ui';
import { ViewPayrollPayPerEmployee } from '@/types/types-pages';


interface SinglePayslip {
    singlePayslipData: ViewPayrollPayPerEmployee,
    scroll: boolean,
    setScroll: Dispatch<SetStateAction<boolean>>,
};

const SinglePayslip = ((props:SinglePayslip) => {
    const { singlePayslipData } = props;
    const componentRef = useRef<HTMLDivElement | null>(null);

    return (
        <Fragment>
            <PrintPayslipButton content={componentRef}/>
            <ModalClose />
            <div ref={componentRef} id="printable-area" className='flex justify-center m-2'>
                <PayslipUI payslipData={singlePayslipData}/>
            </div>
        </Fragment>
    );
});

export default SinglePayslip;


// Styles

  
const paySlipDetailsFont = {
    fontSize: '12px',
};