import React from 'react';
import { OBTViewInterface, ViewPayrollPayPerEmployee } from '@/types/types-pages';
import { convertDaysToHHMM, convertMinutesToHHMM,  } from '@/helpers/utils';
import { Button } from '@mui/material';
import dayjs from 'dayjs';

interface PaySlipUI {
    singleOBTDetailsData: OBTViewInterface;
    multiplePayslipMode?: boolean;
}

function PayslipUI(props: PaySlipUI) {
    const ThisProps = props.singleOBTDetailsData;
    const dateNow = new Date();
    // Forgive me I am noob at Grid Layout. Only can flex :D 

    return (
        <React.Fragment>
            <div className='border border-gray-600 p-4' container-name='obt_container'>
                <div className='flex' container-name='obt_fields_container'>
                    <div container-name='obt_column_left'>
                        <div className='flex mt-4' container-name='obt_col1_row1'>
                            <div className='bold' style={obt_col1_row_name} container-name='obt_col1_row_name'>
                                <div className='italic'>Official Business Time #:</div>
                                <div className='italic'>Date Filed:</div>
                            </div>
                            <div container-name='obt_col1_row_desc'>
                                <div>{ThisProps.id || 0}</div>
                                <div>{ThisProps.obt_date_filed || '...'}</div>
                            </div>
                        </div>
                        <div className='flex mt-4' container-name='obt_col1_row2'>
                            <div style={obt_col1_row_name} container-name='obt_col1_row_name'>
                                <div className='italic'>Location:</div>
                                <div className='italic'>Description:</div>
                                <div className='italic'>Total Hrs:</div>
                            </div>
                            <div container-name='obt_col1_row_desc'>
                                <div>{ThisProps.obt_location || '...'}</div>
                                <div>{ThisProps.obt_remarks || '...'}</div>
                                <div>{ThisProps.obt_total_hours || '...'}</div>
                            </div>
                        </div>
                        <div className='flex mt-4' container-name='obt_col1_row3'>
                            <div style={obt_col1_row_name} container-name='obt_col1_row_name'>
                                <div className='italic'>Approver 1:</div>
                                <div className='italic'>Approver 2:</div>
                            </div>
                            <div container-name='obt_col1_row_desc'>
                                <div>{ThisProps.obt_approver1_empno || '...'}</div>
                                <div>{ThisProps.obt_approver2_empno || '...'}</div>
                            </div>
                        </div>
                        <div className='flex mt-4' container-name='obt_col1_row4'>
                            <div style={obt_col1_row_name} container-name='obt_col1_row_name'>
                                <div className='italic'>Cutoff Code:</div>
                                <div className='italic'>Reason For Disapproval</div>
                            </div>
                            <div container-name='obt_col1_row_desc'>
                                <div>{ThisProps.cutoff_code || '...'}</div>
                                <div className='invisible'>{ThisProps.obt_remarks || '...'}</div>
                            </div>
                        </div>
                    </div>
                    <div style={{width: '20px', borderLeft: '2px solid gray', marginLeft: '20px'}} container-name='obt_column_middle'>

                    </div>
                    <div container-name='obt_column_right'>
                        <div className='flex mt-4' container-name='obt_col2_row1'>
                            <div style={obt_col2_row_name} container-name='obt_col2_row_name'>
                                <div className='italic'>OBT Type:</div>
                                <div className='italic'>Status:</div>
                            </div>
                            <div container-name='obt_col2_row_desc'>
                                <div>{ThisProps.obt_type || 0}</div>
                                <div>{ThisProps.obt_approval_status || '...'}</div>
                            </div>
                        </div>
                        <div className='flex mt-4' container-name='obt_col2_row2'>
                            <div style={obt_col2_row_name} container-name='obt_col2_row_name'>
                                <div className='italic'>Employee #:</div>
                                <div className='italic'>Date From:</div>
                                <div className='italic'>Date To:</div>
                            </div>
                            <div container-name='obt_col2_row_desc'>
                                <div>{ThisProps.emp_no || '...'}</div>
                                <div>{ThisProps.obt_date_from? dayjs(ThisProps.obt_date_from).format('MM-DD-YYYY') : '...'}</div>
                                <div>{ThisProps.obt_date_to? dayjs(ThisProps.obt_date_to).format('MM-DD-YYYY') : '...'}</div>
                            </div>
                        </div>
                        <div className='flex mt-4' container-name='obt_col2_row3'>
                            <div style={obt_col2_row_name} container-name='obt_col2_row_name'>
                                <div className='italic'>Date Approved:</div>
                                <div className='italic'>Date Approved:</div>
                            </div>
                            <div container-name='obt_col2_row_desc'>
                                <div>{ThisProps.date_approved1 || 0}</div>
                                <div>{ThisProps.date_approved2 || '...'}</div>
                            </div>
                        </div>
                        <div className='flex mt-4' container-name='obt_col2_row4'>
                            <div style={obt_col1_row_name} container-name='obt_col1_row_name'>
                                <div className='invisible'>.</div>
                                <div className='invisible'>.</div>
                            </div>
                            <div container-name='obt_col1_row_desc'>
                                <div className='invisible'>.</div>
                                <div className='invisible'>.</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='italic' container-name='obt_fields_remark'>
                    Remarks: {
                    ThisProps.obt_reason_disapproval && 
                    <i style={{color: 'red'}}>{ThisProps.obt_reason_disapproval}</i> || '...'
                    }
                </div>
                <div className='flex justify-center' container-name='obt_buttons_container'>
                    <div className='flex justify-between' style={{width:'300px'}} container-name='obt_buttons'>
                        <Button variant='contained'>Approve OBT</Button>
                        <Button variant='outlined'>Deny OBT</Button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default PayslipUI;


const obt_col1_row_name = {
    width: '200px',
}

const obt_col2_row_name = {
    width: '200px',
}