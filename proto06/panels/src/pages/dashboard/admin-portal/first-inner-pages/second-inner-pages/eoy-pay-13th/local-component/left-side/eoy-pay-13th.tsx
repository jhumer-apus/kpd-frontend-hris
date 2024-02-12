import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { Button, Typography } from '@mui/material';
import {TextField} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import EmployeeAutoComplete from './inner-ui-components/employee-autocomplete';

import { PAY13THCreateInterface } from '@/types/types-payroll-eoy';
import { PAY13THCreateAction, PAY13THCreateActionFailureCleanup } from '@/store/actions/payroll-eoy';
import CutoffAutoComplete from './inner-ui-components/cutoff-code-autocomplete';
import BonusListAutoComplete from './inner-ui-components/bonus-type-autocomplete';
import MultiEmployeeAutoCompleteLeft from './inner-ui-components/employee-autocomplete';


import { DataGrid, GridCallbackDetails, GridRowSelectionModel } from '@mui/x-data-grid';
// import { Typography } from "@material-tailwind/react";
import { EOYPAY13THPageDescriptions, EOYPAY13THPageColumns, EOYProcessPAY13THPageColumns } from '@/data/pages-data/payroll-eoy-data/eoy-pay-13th-data';
import { PAY13THViewInterface } from '@/types/types-payroll-eoy';
import { PAY13THViewAction } from '@/store/actions/payroll-eoy';
import { EMPLOYEESViewInterface } from '@/types/types-store';



interface CreatePAY13THModalInterface {
    setOpen?: Dispatch<SetStateAction<boolean>>;
}

function EOYPAY13THCreate(props: CreatePAY13THModalInterface) {
    const state = useSelector((state: RootState) => state.employees)
    const dispatch = useDispatch();
    const curr_user = useSelector((state: RootState)=> state.auth.employee_detail?.emp_no);
    const PAY13THCreatestate = useSelector((state: RootState)=> state.payrollEOY.PAY13THCreate);
    const [createPAY13TH, setCreatePAY13TH] = useState<PAY13THCreateInterface>({
        emp_no: [],
    });

    const onClickSubmit = () => {
        dispatch(PAY13THCreateAction(createPAY13TH))
    };

    useEffect(()=> {
        if(curr_user){
            setCreatePAY13TH((prevState) => {
                return (
                    {
                        ...prevState,
                        added_by: curr_user
                    }
                )
            })
        }
    }, [curr_user]) 

    useEffect(()=>{
        if(PAY13THCreatestate.status === 'succeeded'){
            window.alert('Request Successful');
            window.location.reload();
        }else if(PAY13THCreatestate.status === 'failed'){
            window.alert(`Request Failed, ${PAY13THCreatestate.error}`)
            setTimeout(()=> {
                dispatch(PAY13THCreateActionFailureCleanup());
            }, 1000)
        }
    }, [PAY13THCreatestate.status])

    const handleSelection = (newSelection: GridRowSelectionModel, details: GridCallbackDetails) => {
        let emp_no_locale = [] as Array<number>;
        newSelection.forEach((id) => {
          const row = state.employees_list?.find((row) => row.id === id);
          if (row) {
            emp_no_locale.push(row.emp_no);
          }
        });
    
        setCreatePAY13TH((prevState) => ({
          ...prevState,
          emp_no: emp_no_locale,
        }));
      };

    return (
        <React.Fragment>
            <Typography style={{border: '2px solid rgb(25, 118, 210)', width: '100%', textAlign: 'center', padding: '6px', background: 'rgb(245,247,248)', boxShadow: '4px 4px 10px rgb(200, 200, 222)'}} variant='h6'>Process 13th Month Pay Data</Typography>
            <div className='flex flex-col gap-6 overflow-auto w-full'>
                    <p>You can choose one or more employees to process their 13th month pay. Otherwise check all.</p>
                    <div style={{ height: '450px', width: '100%' }}>
                        <DataGrid
                        rows={state.employees_list as EMPLOYEESViewInterface[]}
                        columns={EOYProcessPAY13THPageColumns}
                        initialState={{
                            pagination: {
                            paginationModel: { page: 0, pageSize: 100 },
                            },
                        }}
                        pageSizeOptions={[25, 50, 75, 100]}
                        // onRowClick={(e) => {
                        //     setSinglePAY13THDetailsData(e.row);
                        //     setSinglePAY13THOpenModal(true);
                        // }}
                        onRowSelectionModelChange={handleSelection}
                        checkboxSelection
                        disableRowSelectionOnClick
                        localeText={{ noRowsLabel: `Loading...` }} // To do: after employee reducer code optimization has been done
                        />
                    </div>
                <div className='flex justify-center mt-6' container-name='leave_buttons_container'>
                    <div className='flex justify-between' style={{width:'100%'}} container-name='leave_buttons'>
                        <Button variant='contained' onClick={onClickSubmit}>Process 13th Month Pay</Button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default EOYPAY13THCreate;

