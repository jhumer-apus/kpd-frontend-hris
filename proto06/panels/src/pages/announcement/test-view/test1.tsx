import React from 'react';
import { ViewPayrollPayPerEmployee } from '@/types/types-pages';
import { convertDaysToHHMM, convertMinutesToHHMM,  } from '@/helpers/utils';

interface PaySlipUI {
    payslipData?: ViewPayrollPayPerEmployee;
    multiplePayslipMode?: boolean;
}

function TestView(props: PaySlipUI) {
    const ThisProps = props.payslipData;
    const dateNow = new Date();
    return (
        <div style={paySlipArea}>
            <div className='flex border align-center border-black justify-between overflow-x-auto text-xs ' style={{marginTop: !props.multiplePayslipMode? '50px': '', marginLeft: !props.multiplePayslipMode? '20px':'' }}>
                <div className='flex'>
                    <div>
                        <div>
                            <span className='text-xl block border-t text-center border-l border-black font-bold bg-gray-300'>
                                SAMPLE COMPANY NAME                            </span>
                            <div className='flex border-black border-t border-l border-b'>
                                <div className='w-28'>
                                    <p className='pl-1'>Department:</p>
                                </div>
                                <div>
                                    <p className='text-start pr-1'>{ThisProps?.cutoff?.division_code !== undefined? ThisProps?.cutoff?.division_code : `...`}</p>
                                </div>
                            </div>
                        </div>
                        <div className='flex border-black border-l border-t border-b'>
                            <div className='gap-2 w-28'>
                                <p className='pl-1'>Employee Name:</p>
                                <p className='pl-1'>Workdays total:</p>
                            </div>
                            <div className='gap-2'>
                                <p className='text-start pr-1'>{ThisProps?.emp_cname || `...`}</p>
                                <p className='text-start pr-1'>{ThisProps?.work_days_total?.toFixed(2) || `...`}</p>
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
                            {/* ₱ */}
                                <p className='text-end pr-1'> {((ThisProps?.daily_salary_basic * ThisProps?.work_days_total) || 0).toFixed(2)}</p>
                                <p className='text-end pr-1'> {((ThisProps?.daily_salary_allowance * ThisProps?.work_days_total || 0)).toFixed(2)}</p>
                                <p className='text-end pr-1'> {(ThisProps?.ot_amount_a || 0).toFixed(2)}</p>
                                <p className='text-end pr-1'> {(ThisProps?.nd_amount_a || 0).toFixed(2)}</p>
                                <p className='text-end pr-1'> {(ThisProps?.reg_holiday_amount_a + ThisProps?.sp_holiday_amount_a || 0).toFixed(2)}</p>
                                <p className='text-end pr-1'>-{(ThisProps?.absent_amount + ThisProps?.utime_amount_d || 0).toFixed(2)}</p>
                                <p className='text-end pr-1'>{(ThisProps?.leaves_amount_a || 0).toFixed(2)}</p>
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
                                <p className='text-end pr-1'>{(ThisProps?.gross_pay || 0).toFixed(2)}</p>
                                <p className='text-end pr-1'>{convertMinutesToHHMM(ThisProps?.dtr_cutoff?.undertime_total + ThisProps?.dtr_cutoff?.lates_total || 0)}</p>
                            </div>
                        </div>
                        <div className='flex border-black border-l justify-between border-b'>
                            <div className='gap-2 w-20'>
                                <p className='pl-1'>REG HRS:</p>
                                <p className='pl-1'>REG OT:</p>
                                <p className='pl-1'>ND 01:</p>
                            </div>
                            <div>
                                <p className='text-end pr-1'>{convertMinutesToHHMM(ThisProps?.dtr_cutoff?.total_hours || 0)}</p>
                                <p className='text-end pr-1'>{convertMinutesToHHMM(ThisProps?.dtr_cutoff?.reg_ot_total || 0)}</p>
                                <p className='text-end pr-1'>{convertMinutesToHHMM(ThisProps?.dtr_cutoff?.nd_ot_total || 0)}</p>
                            </div>
                            <div className='gap-2 w-20'>
                                <p className='pl-1'>LH OT:</p>
                                <p className='pl-1'>SH OT:</p>
                                <p className='pl-1'>RD OT:</p>
                                <p className='pl-1'>RD SH OT:</p>
                                <p className='pl-1'>RD LH OT:</p>
                            </div>
                            <div>
                                <p className='text-end pr-1'>{convertMinutesToHHMM(ThisProps?.dtr_cutoff?.reg_ot_total || 0)}</p>
                                <p className='text-end pr-1'>{convertMinutesToHHMM(ThisProps?.dtr_cutoff?.sp_holiday_total_hours || 0)}</p>
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
                                <p className='text-start pr-1'>{ThisProps?.salary_type || `...`}</p>
                                <p className='text-start pr-1'>{ThisProps?.cutoff?.co_name || `...`}</p>
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
                                <p className='text-end pr-1'>-{((ThisProps?.sss_calloan_d + ThisProps?.sss_cashloan_d + ThisProps?.sssc_amount_d) || 0).toFixed(2)}</p>
                                <p className='text-end pr-1'>-{((ThisProps?.philhealthc_amount_d) || 0).toFixed(2)}</p>
                                <p className='text-end pr-1'>-{((ThisProps?.pagibigc_amount_d + ThisProps?.pagibig_calloan_d + ThisProps?.pagibig_hloan_d + ThisProps?.pagibig_cloan_d) || 0).toFixed(2)}</p>
                                <p className='text-end pr-1'>-{((ThisProps?.tax_amount_d) || 0).toFixed(2)}</p>
                                <p className='text-end pr-1'>-{((ThisProps?.other_d + ThisProps?.cash_advance_amount_d + ThisProps?.insurance_d) || 0).toFixed(2)}</p>
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
                                <p className='text-end pr-1 italic'>-{((ThisProps?.absent_amount + ThisProps?.cash_advance_amount_d + ThisProps?.insurance_d + ThisProps?.lates_amount_d + ThisProps?.other_d + ThisProps?.pagibig_calloan_d + ThisProps?.pagibig_cloan_d + ThisProps?.pagibig_hloan_d + ThisProps?.pagibigc_amount_d + ThisProps?.philhealthc_amount_d + ThisProps?.sss_calloan_d + ThisProps?.sss_cashloan_d + ThisProps?.sssc_amount_d + ThisProps?.tax_amount_d + ThisProps?.utime_amount_d) || 0).toFixed(2)}</p>
                                <p className='text-end pr-1 font-bold underline bg-gray-300'>₱{((ThisProps?.net_pay) || 0).toFixed(2)}</p>
                                <p className='text-end pr-1'>{((ThisProps?.reg_holiday_amount_a) || 0).toFixed(2)}</p>
                                <p className='text-end pr-1'>{((ThisProps?.sp_holiday_amount_a) || 0).toFixed(2)}</p>
                                <p className='text-end pr-1'>0</p>
                                <p className='text-end pr-1'>0</p>
                                <p className='text-end pr-1'>0</p>
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
                                <p className='text-start pr-1 mb-1'>{ThisProps?.emp_no || `...`}</p>
                                <p className='text-start pr-1 mb-1'>{ThisProps?.cutoff?.division_code !== undefined? ThisProps?.cutoff?.division_code : `...`} <p className='hidden'>_to request as division string</p></p>
                                <p className='text-start pr-1 mb-1'>{ThisProps?.salary_type || `...`}</p>
                                <p className='text-start pr-1 mb-1'>{ThisProps?.cutoff?.division_code || `...`}</p>
                                <p className='text-start pr-1 mb-1 bg-gray-300'>₱{(ThisProps?.net_pay || 0).toFixed(2)}</p>
                            </div>
                        </div>
                        <div className='h-8'></div>
                        <div className='flex'>
                            <div className='w-28'>
                                <p className='text-start pl-1 mb-4'>Received By:</p>
                            </div>
                            <div>
                                <p className='text-start pr-1 mb-0 border-b border-black'>{ThisProps?.emp_cname || `...`}</p>
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
    )
}

export default TestView;


const paySlipArea = {
    height: '148.5mm',
    width: '210mm',
    margin: '0 auto',
    background: 'white',
    boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    paddingRight: '20px'
  };