import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { Typography } from '@mui/joy';
import { KPICORECreateInterface } from '@/types/types-employee-and-applicants';
import { KPICORECreateAction, KPICORECreateActionFailureCleanup } from '@/store/actions/employee-and-applicants';

import { DataGrid, GridCallbackDetails, GridRowSelectionModel } from '@mui/x-data-grid';
import { EAProcessKPICOREPageColumns } from '@/data/pages-data/employee-and-applicants-data/ea-kpi-core-data';
import { getEmployeesList } from '@/store/actions/employees';
import { EMPLOYEESViewInterface } from '@/types/types-store';
import DateFieldCreate from './inner-ui-components/date-field';


interface CreateKPICOREModalInterface {
    setOpen?: Dispatch<SetStateAction<boolean>>;
}

function EAKPICORECreate(props: CreateKPICOREModalInterface) {
    const state = useSelector((state: RootState) => state.employees)
    const dispatch = useDispatch();
    const curr_user = useSelector((state: RootState)=> state.auth.employee_detail?.emp_no);
    const KPICORECreatestate = useSelector((state: RootState)=> state.employeeAndApplicants.KPICORECreate);
    const [createKPICORE, setCreateKPICORE] = useState<KPICORECreateInterface>({
        emp_no: [],
        date_evaluation_deadline: null
    });

    const onClickSubmit = () => {
        dispatch(KPICORECreateAction(createKPICORE))
    };

    useEffect(()=> {
        if(curr_user){
            setCreateKPICORE((prevState) => {
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
        if(KPICORECreatestate.status === 'succeeded'){
            window.alert('Request Successful');
            window.location.reload();
        }else if(KPICORECreatestate.status === 'failed'){
            window.alert(`Request Failed, ${KPICORECreatestate.error}`)
            setTimeout(()=> {
                dispatch(KPICORECreateActionFailureCleanup());
            }, 1000)
        }
    }, [KPICORECreatestate.status])

    const handleSelection = (newSelection: GridRowSelectionModel, details: GridCallbackDetails) => {
        let emp_no_locale = [] as Array<number>;
        newSelection.forEach((id) => {
          const row = state.employees_list?.find((row) => row.id === id);
          if (row) {
            emp_no_locale.push(row.emp_no);
          }
        });
    
        setCreateKPICORE((prevState) => ({
          ...prevState,
          emp_no: emp_no_locale
        }));
      };

    return (
        <React.Fragment>
            <Typography style={{border: '2px solid rgb(25, 118, 210)', width: '100%', textAlign: 'center', padding: '6px', background: 'rgb(245,247,248)', boxShadow: '4px 4px 10px rgb(200, 200, 222)'}} variant='plain'>Initialize KPI Evaluation Data</Typography>
            <div className='flex flex-col gap-6 overflow-auto w-full'>
                    <p>You can choose one or more employees (or all) to initialize their KPI Evaluation.</p>
                    <div style={{ height: '450px', width: '100%' }}>
                        <DataGrid
                        rows={state.employees_list as EMPLOYEESViewInterface[]}
                        columns={EAProcessKPICOREPageColumns}
                        initialState={{
                            pagination: {
                            paginationModel: { page: 0, pageSize: 100 },
                            },
                        }}
                        pageSizeOptions={[25, 50, 75, 100]}
                        // onRowClick={(e) => {
                        //     setSingleKPICOREDetailsData(e.row);
                        //     setSingleKPICOREOpenModal(true);
                        // }}
                        onRowSelectionModelChange={handleSelection}
                        checkboxSelection
                        disableRowSelectionOnClick
                        localeText={{ noRowsLabel: `Loading...` }} // To do: when the reducer state has been optimized, this can also be optimized.
                        />
                    </div>
                <div className='flex justify-center mt-6' container-name='leave_buttons_container'>
                    <div className='flex justify-between' style={{width:'100%'}} container-name='leave_buttons'>
                        <Button variant='contained' onClick={onClickSubmit}>Initialize KPI Evaluation Data</Button>
                        <DateFieldCreate initialState={createKPICORE} setInitialState={setCreateKPICORE}/>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default EAKPICORECreate;

