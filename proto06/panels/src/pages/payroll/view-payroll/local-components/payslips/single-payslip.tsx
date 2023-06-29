import { Dispatch, Fragment, SetStateAction, useState, useRef } from 'react';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import ReactToPrint from 'react-to-print';
import { Button } from '@material-tailwind/react';
import PrintPayslipButton from './print-payslip-button';


interface SinglePayslip {
    scroll: boolean,
    setScroll: Dispatch<SetStateAction<boolean>>,
};

const SinglePayslip = ((props:SinglePayslip) => {
    const {scroll, setScroll} = props;
    const [printing, setIsPrinting] = useState(false);
    const componentRef = useRef<HTMLDivElement | null>(null);

    return (
        <Fragment>
            {/* <div>
            <ReactToPrint
            trigger={() => <Button>Hallo</Button>}
            content={() => componentRef.current}
            />
            </div> */}
            <PrintPayslipButton content={componentRef}/>
            <ModalClose />
            <div ref={componentRef} id="printable-area">
                <div className='flex border border-black justify-around text-xs p-4'>
                    <div className='flex'>
                        <div>
                            <div>
                                <span className='text-xl block border-t text-center border-l border-black font-bold bg-gray-300'>
                                    S1 TECHNOLOGIES INC.
                                </span>
                                <div className='flex border-black border-t border-l border-b'>
                                    <div className='w-32'>
                                        <p className='pl-1'>Department:</p>
                                    </div>
                                    <div>
                                        <p className='text-start pr-1'>cutoff_division_code</p>
                                    </div>
                                </div>
                            </div>
                            <div className='flex border-black border-l border-t border-b'>
                                <div className='gap-2 w-32'>
                                    <p className='pl-1'>Employee Name:</p>
                                    <p className='pl-1'>Workdays total:</p>
                                </div>
                                <div className='gap-2'>
                                    <p className='text-start pr-1'>emp_cname  </p>
                                    <p className='text-start pr-1'>work_days_total  </p>
                                </div>
                            </div>
                            <div className='flex border-black border-l justify-between border-t border-b'>
                                <div className='gap-2 w-48'>
                                    <p className='pl-1'>Basic Pay:</p>
                                    <p className='pl-1'>Allowance Pay:</p>
                                    <p className='pl-1'>Overtime Pay:</p>
                                    <p className='pl-1'>Night Diff. Pay:</p>
                                    <p className='pl-1'>LEGAL HOLIDAY PREMIUM:</p>
                                    <p className='pl-1'>Absences/Undertime:</p>
                                    <p className='pl-1'>SL/VL Encashment:</p>
                                    <p className='pl-1'>Adjustment:</p>
                                    <p className='pl-1'>Bonus:</p>
                                    <p className='pl-1'>ECOLA:</p>
                                </div>
                                <div>
                                    <p className='text-end pr-1'>0</p>
                                    <p className='text-end pr-1'>0</p>
                                    <p className='text-end pr-1'>0</p>
                                    <p className='text-end pr-1'>0</p>
                                    <p className='text-end pr-1'>0</p>
                                    <p className='text-end pr-1'>0</p>
                                    <p className='text-end pr-1'>0</p>
                                    <p className='text-end pr-1'>0</p>
                                    <p className='text-end pr-1'>0</p>
                                    <p className='text-end pr-1'>0</p>
                                </div>
                            </div>
                            <div className='flex border-black border-l justify-between border-t'>
                                <div className='gap-2 w-48'>
                                    <p className='pl-1'>Total Income:</p>
                                    <p className='pl-1'>Undertime/Late:(hh:mm)</p>
                                </div>
                                <div>
                                    <p className='text-end pr-1'>0</p>
                                    <p className='text-end pr-1'>0:00</p>
                                </div>
                            </div>
                            <div className='flex border-black border-l justify-between border-b'>
                                <div className='gap-2 w-20'>
                                    <p className='pl-1'>REG HRS:</p>
                                    <p className='pl-1'>REG OT:</p>
                                    <p className='pl-1'>ND 01:</p>
                                </div>
                                <div>
                                    <p className='text-end pr-1'>0:00</p>
                                    <p className='text-end pr-1'>0:00</p>
                                    <p className='text-end pr-1'>0:00</p>
                                </div>
                                <div className='gap-2 w-20'>
                                    <p className='pl-1'>LH OT:</p>
                                    <p className='pl-1'>SH OT:</p>
                                    <p className='pl-1'>RD OT:</p>
                                    <p className='pl-1'>RD SH OT:</p>
                                    <p className='pl-1'>RD LH OT:</p>
                                </div>
                                <div>
                                    <p className='text-end pr-1'>0:00</p>
                                    <p className='text-end pr-1'>0:00</p>
                                    <p className='text-end pr-1'>0:00</p>
                                    <p className='text-end pr-1'>0:00</p>
                                    <p className='text-end pr-1'>0:00</p>
                                </div>
                            </div>
                        </div>
                        <div className='w-2 border-black border'></div>
                        <div className='mr-2'>
                            <div>
                                <span className='text-xl text-center border-t border-r border-black font-bold block bg-gray-300'>
                                    PAYSLIP
                                </span>
                                <div className='flex border-black border-t border-r border-b'>
                                    <div className='w-32'>
                                        <p className='invisible'>.</p>
                                    </div>
                                    <div>
                                        <p className='text-start'></p>
                                    </div>
                                </div>
                            </div>
                            <div className='flex border-black border-t border-r border-b'>
                                <div className='gap-2 w-32'>
                                    <p className='pl-1'>Salary Type:</p>
                                    <p className='pl-1'>Cutoff Period:</p>
                                </div>
                                <div className='gap-2'>
                                    <p className='text-start pr-1'>salary_type</p>
                                    <p className='text-start pr-1'>cutoff.co_name</p>
                                </div>
                            </div>
                            <div className='flex border-black justify-between border-t border-r border-b'>
                                <div className='gap-2 w-48'>
                                    <p className='pl-1'>SSS Contribution:</p>
                                    <p className='pl-1'>PHIC Contribution:</p>
                                    <p className='pl-1'>HDMF Contribution:</p>
                                    <p className='pl-1'>Withheld Tax:</p>
                                    <p className='pl-1'>Other Deductions:</p>
                                </div>
                                <div>
                                    <p className='text-end pr-1'>0</p>
                                    <p className='text-end pr-1'>0</p>
                                    <p className='text-end pr-1'>0</p>
                                    <p className='text-end pr-1'>0</p>
                                    <p className='text-end pr-1'>0</p>
                                    <p className='text-end pr-1 invisible'>.</p>
                                    <p className='text-end pr-1 invisible'>.</p>
                                    <p className='text-end pr-1 invisible'>.</p>
                                    <p className='text-end pr-1 invisible'>.</p>
                                    <p className='text-end pr-1 invisible'>.</p>
                                </div>
                            </div>
                            <div className='flex border-black justify-between border-t border-b border-r'>
                                <div className='gap-2 w-48'>
                                    <p className='pl-1'>Total Deductions:</p>
                                    <p className='pl-1'>Net Pay:</p>
                                    <p className='pl-1'>LHP:</p>
                                    <p className='pl-1'>SHP:</p>
                                    <p className='pl-1'>RDP:</p>
                                    <p className='pl-1'>RDSHP:</p>
                                    <p className='pl-1'>RDLHP:</p>
                                </div>
                                <div>
                                    <p className='text-end pr-1'>0</p>
                                    <p className='text-end pr-1'>0</p>
                                    <p className='text-end pr-1'>0</p>
                                    <p className='text-end pr-1'>0</p>
                                    <p className='text-end pr-1'>0</p>
                                    <p className='text-end pr-1'>0</p>
                                    <p className='text-end pr-1'>0</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-2 border-l-2 border-dashed border-black bg-gray-300'></div>
                    <div className='flex flex-col justify between'>
                        <div>
                            <div className='w-48 text-center font-bold'style={{ overflow: 'hidden', wordWrap: 'break-word'}}>
                                SILICON VALLEY COMPUTER GROUPS PHILS INC
                            </div>
                            <div>
                                
                            </div>
                            <div></div>
                            <div></div>
                        </div>
                        <div>
                            <p>Printed: new Date()</p>
                        </div>
                    </div>
                </div>
            </div>


        </Fragment>
    );
});

export default SinglePayslip;


// Styles

  
const paySlipDetailsFont = {
    fontSize: '12px',
};