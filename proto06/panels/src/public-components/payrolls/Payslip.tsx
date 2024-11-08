import React from 'react';
import { convertDaysToHHMM, convertMinutesToHHMM,  } from '@/helpers/utils';
import { Box, Modal } from '@mui/material';

interface PaySlipUI {
    data: any;
    open: boolean;
    handleClose: () => void;
    multiplePayslipMode?: boolean;
}

export default function Payslip(props: PaySlipUI) {
    const { data, open, handleClose } = props
    const dateNow = new Date();

    console.log(data)

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >   
            <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-2xl p-4 overflow-auto w-11/12 md:w-[500px] max-h-[80vh]">
                <div style={paySlipArea}>
                    <div className='flex border align-center border-black justify-between overflow-x-auto text-xs ' style={{marginTop: !props.multiplePayslipMode? '50px': '', marginLeft: !props.multiplePayslipMode? '20px':'' }}>
                        <div className='flex'>
                            <div>
                                <div>
                                    <span className='text-xl block border-t text-center border-l border-black font-bold bg-gray-300'>
                                        KP Development                         
                                    </span>
                                    <div className='flex border-black border-t border-l border-b'>
                                        <div className='w-28'>
                                            <p className='pl-1'>Department:</p>
                                        </div>
                                        <div>
                                            <p className='text-start pr-1'>{data?.cutoff?.division_code !== undefined? data?.cutoff?.division_code : `...`}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex border-black border-l border-t border-b'>
                                    <div className='gap-2 w-28'>
                                        <p className='pl-1'>Employee No:</p>
                                        <p className='pl-1'>Total Workdays:</p>
                                    </div>
                                    <div className='gap-2'>
                                        <p className='text-start pr-1'>{data?.emp_no || ``}</p>
                                        <p className='text-start pr-1'>{Number(data?.work_days_total)?.toFixed(2) || ``}</p>
                                    </div>
                                </div>
                                <div className='flex border-black border-l justify-between border-t border-b'>
                                    <div className='gap-2 w-48'>
                                        <p className='pl-1'>Basic Pay:</p>
                                        <p className='pl-1'>Allowance Pay:</p>
                                        <p className='pl-1'>Overtime Pay:</p>
                                        <p className='pl-1'>Night Diff. Pay:</p>
                                        <p className='pl-1'>REGULAR HOLIDAY PREMIUM:</p>
                                        <p className='pl-1'>Absences/Undertime:</p>
                                        <p className='pl-1'>SL/VL Encashment:</p>
                                        <p className='pl-1'>Adjustment:</p>
                                        <p className='pl-1'>Bonus:</p>
                                        <p className='pl-1'>ECOLA:</p>
                                    </div>
                                    <div>
                                    {/* ₱ */}
                                        <p className='text-end pr-1'> {((Number(data?.daily_salary_basic) * data?.work_days_total) || 0).toFixed(2)}</p>
                                        <p className='text-end pr-1'> {Number(data?.allowance_pay)?.toFixed(2) || 0.00}</p>
                                        <p className='text-end pr-1'> {(Number(data?.ot_pay) || 0).toFixed(2) || 0.00}</p>
                                        <p className='text-end pr-1'> {(Number(data?.nd_pay) || 0).toFixed(2) || 0.00}</p>
                                        <p className='text-end pr-1'> {(data?.reg_holiday_working_pay + data?.sp_holiday_working_pay || 0).toFixed(2)}</p>
                                        <p className='text-end pr-1'>-{(data?.absent_deduct + data?.undertime_deduct || 0).toFixed(2)}</p>
                                        <p className='text-end pr-1'>{(data?.leaves_amount_a || 0).toFixed(2)}</p>
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
                                        <p className='text-end pr-1'>{(data?.gross_pay || 0).toFixed(2)}</p>
                                        <p className='text-end pr-1'>{convertMinutesToHHMM(data?.undertime_total + data?.lates_total || 0)}</p>
                                    </div>
                                </div>
                                <div className='flex border-black border-l justify-between border-b'>
                                    <div className='gap-2 w-20'>
                                        <p className='pl-1'>REG HRS:</p>
                                        <p className='pl-1'>REG OT:</p>
                                        <p className='pl-1'>ND 01:</p>
                                    </div>
                                    <div>
                                        <p className='text-end pr-1'>{convertMinutesToHHMM(data?.total_hours || 0)}</p>
                                        <p className='text-end pr-1'>{convertMinutesToHHMM(data?.reg_ot_total || 0)}</p>
                                        <p className='text-end pr-1'>{convertMinutesToHHMM(data?.nd_ot_total || 0)}</p>
                                    </div>
                                    <div className='gap-2 w-20'>
                                        <p className='pl-1'>LH OT:</p>
                                        <p className='pl-1'>SH OT:</p>
                                        <p className='pl-1'>RD OT:</p>
                                        <p className='pl-1'>RD SH OT:</p>
                                        <p className='pl-1'>RD LH OT:</p>
                                    </div>
                                    <div>
                                        <p className='text-end pr-1'>{convertMinutesToHHMM(data?.reg_ot_total || 0)}</p>
                                        <p className='text-end pr-1'>{convertMinutesToHHMM(data?.sp_holiday_total_hours || 0)}</p>
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
                                        <div className='w-28'>
                                            <p className='invisible'>.</p>
                                        </div>
                                        <div>
                                            <p className='text-start'></p>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex border-black border-t border-r border-b'>
                                    <div className='gap-2 w-28'>
                                        <p className='pl-1'>Salary Type:</p>
                                        <p className='pl-1'>Cutoff Period:</p>
                                    </div>
                                    <div className='gap-2'>
                                        <p className='text-start pr-1'>{data?.salary_type || `...`}</p>
                                        <p className='text-start pr-1'>{data?.cutoff?.co_name || `...`}</p>
                                    </div>
                                </div>
                                <div className='flex border-black justify-between border-t border-r border-b'>
                                    <div className='gap-2 w-40'>
                                        <p className='pl-1'>SSS Contribution:</p>
                                        <p className='pl-1'>PHIC Contribution:</p>
                                        <p className='pl-1'>HDMF Contribution:</p>
                                        <p className='pl-1'>Withheld Tax:</p>
                                        <p className='pl-1'>Other Deductions:</p>
                                    </div>
                                    <div>
                                        <p className='text-end pr-1'>-{((data?.sss_cal_loan + data?.sss_cash_loan + data?.sss_contrib) || 0).toFixed(2)}</p>
                                        <p className='text-end pr-1'>-{((data?.philhealth_contrib) || 0).toFixed(2)}</p>
                                        <p className='text-end pr-1'>-{((data?.pagibig_cal_loan + data?.pagibig_cash_loan + data?.pagibig_house_loan) || 0).toFixed(2)}</p>
                                        <p className='text-end pr-1'>-{((data?.tax_contrib) || 0).toFixed(2)}</p>
                                        <p className='text-end pr-1'>-{(data?.cash_advance_deduct || 0).toFixed(2)}</p>
                                        <p className='text-end pr-1 invisible'>.</p>
                                        <p className='text-end pr-1 invisible'>.</p>
                                        <p className='text-end pr-1 invisible'>.</p>
                                        <p className='text-end pr-1 invisible'>.</p>
                                        <p className='text-end pr-1 invisible'>.</p>
                                    </div>
                                </div>
                                <div className='flex border-black justify-between border-t border-b border-r'>
                                    <div className='gap-2 w-40'>
                                        <p className='pl-1'>Total Deductions:</p>
                                        <p className='pl-1 font-bold bg-gray-300'>Net Pay:</p>
                                        <p className='pl-1'>LHP:</p>
                                        <p className='pl-1'>SHP:</p>
                                        <p className='pl-1'>RDP:</p>
                                        <p className='pl-1'>RDSHP:</p>
                                        <p className='pl-1'>RDLHP:</p>
                                    </div>
                                    <div>
                                        <p className='text-end pr-1 italic'>-{((data?.undertime_deduct + data?.overbreak_deduct + data?.absent_deduct + data?.cash_advance_deduct + data?.pagibig_cal_loan + data?.pagibig_cash_loan + data?.pagibig_house_loan + data?.sss_cash_loan + data?.sss_cal_loan + data?.tax_contrib + data?.government_contrib) || 0).toFixed(2)}</p>
                                        <p className='text-end pr-1 font-bold underline bg-gray-300'>₱{((data?.net_pay_before_tax) || 0).toFixed(2)}</p>
                                        <p className='text-end pr-1'>{((data?.reg_holiday_working_pay + data?.reg_holiday_nd_working_pay + data?.reg_holiday_ot_pay + data?.reg_holiday_nd_ot_pay) || 0).toFixed(2)}</p>
                                        <p className='text-end pr-1'>{((data?.sp_holiday_working_pay + data?.sp_holiday_nd_working_pay + data?.sp_holiday_ot_pay + data?.sp_holiday_nd_ot_pay) || 0).toFixed(2)}</p>
                                        <p className='text-end pr-1'>{((data?.rd_working_pay) || 0).toFixed(2)}</p>
                                        <p className='text-end pr-1'>{((data?.rd_sp_holiday_working_pay) || 0).toFixed(2)}</p>
                                        <p className='text-end pr-1'>{((data?.rd_reg_holiday_working_pay) || 0).toFixed(2)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='w-2 border-l-2 border-dashed border-black bg-gray-300'></div>
                        <div className='flex flex-col justify-between h-100'>
                            <div>
                                <div className='w-48 text-center font-bold overflow-hidden break-words'>
                                    {/* SILICON VALLEY COMPUTER GROUPS PHILS INC */}
                                    SAMPLE COMPANY NAME
                                </div>
                                <div className='flex'>
                                    <div className='w-28'>
                                        <p className='text-start pl-1 font-bold italic my-1'>Payroll Receipt:</p>
                                        <p className='text-start pl-1 mb-1'>Emp. No:</p>
                                        <p className='text-start pl-1 mb-1'>Department:</p>
                                        <p className='text-start pl-1 mb-1'>Salary Type:</p>
                                        <p className='text-start pl-1 mb-1'>Cutoff Period:</p>
                                        <p className='text-start pl-1 mb-1'>Amount:</p>
                                    </div>
                                    <div>
                                        <p className='text-start pr-1 font-bold italic my-1'>Employer's Copy</p>
                                        <p className='text-start pr-1 mb-1'>{data?.emp_no || `...`}</p>
                                        <p className='text-start pr-1 mb-1'>{data?.cutoff?.division_code !== undefined? data?.cutoff?.division_code : `...`} <p className='hidden'>_to request as division string</p></p>
                                        <p className='text-start pr-1 mb-1'>{data?.salary_type || `...`}</p>
                                        <p className='text-start pr-1 mb-1'>{data?.cutoff?.division_code || `...`}</p>
                                        <p className='text-start pr-1 mb-1 bg-gray-300'>₱{(data?.net_pay || 0).toFixed(2)}</p>
                                    </div>
                                </div>
                                <div className='h-8'></div>
                                <div className='flex'>
                                    <div className='w-28'>
                                        <p className='text-start pl-1 mb-4'>Received By:</p>
                                    </div>
                                    <div>
                                        <p className='text-start pr-1 mb-0 border-b border-black'>{data?.emp_cname || `...`}</p>
                                        <p className='text-center pr-1 text-xs italic'>Signature</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p className='text-start pl-1'>Generated:</p>
                                <p className='text-start pl-1'>{`${dateNow.toLocaleDateString()} - ${dateNow.toLocaleTimeString()}`}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Box>
        </Modal>
        
    )
}

const paySlipArea = {
    height: '148.5mm',
    width: '210mm',
    margin: '0 auto',
    background: 'white',
    boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    paddingRight: '20px'
  };