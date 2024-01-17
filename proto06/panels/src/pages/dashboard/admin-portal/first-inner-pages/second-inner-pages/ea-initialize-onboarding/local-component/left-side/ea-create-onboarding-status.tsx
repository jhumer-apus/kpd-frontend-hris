import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { Typography } from '@mui/joy';
import { ONBOARDINGSTATUSCreateInterface } from '@/types/types-employee-and-applicants';
import { ONBOARDINGSTATUSCreateAction, ONBOARDINGSTATUSCreateActionFailureCleanup } from '@/store/actions/employee-and-applicants';
import { DataGrid, GridCallbackDetails, GridRowSelectionModel } from '@mui/x-data-grid';
import { EAProcessONBOARDINGSTATUSPageColumns } from '@/data/pages-data/employee-and-applicants-data/ea-initialize-onboarding-data';
import { getEmployeesList } from '@/store/actions/employees';
import { EMPLOYEESViewInterface } from '@/types/types-store';
import DateFieldCreate from './inner-ui-components/date-field';

interface CreateONBOARDINGSTATUSModalInterface {
    setOpen?: Dispatch<SetStateAction<boolean>>;
}

function EAONBOARDINGSTATUSCreate(props: CreateONBOARDINGSTATUSModalInterface) {
    const state = useSelector((state: RootState) => state.employees)
    const SelectorContainer = useSelector((state: RootState) => state.employeeAndApplicants.ONBOARDINGSTATUSCreate);
    const dispatch = useDispatch();
    const curr_user = useSelector((state: RootState)=> state.auth.employee_detail?.emp_no);

    const [ createONBOARDINGSTATUSPayload, setCreateONBOARDINGSTATUSPayload ] = useState<ONBOARDINGSTATUSCreateInterface>({
        emp_no: [],
        date_start: null,
    });

    useEffect(()=> {
        if(state.employees_list?.length === 0 || !state.employees_list ){
            getEmployeesList()
        }

        if(SelectorContainer.status === 'succeeded'){
            window.alert('Request Successful');
            window.location.reload();
        }else if (SelectorContainer.status === 'failed'){
            window.alert(`Request Failed, ${SelectorContainer.error}`)
            setTimeout(()=> {
                dispatch(ONBOARDINGSTATUSCreateActionFailureCleanup());
            }, 500)
        }

    }, [SelectorContainer.status])

    useEffect(()=> {
        if(curr_user){
            setCreateONBOARDINGSTATUSPayload((prevState) => {
                return (
                    {
                        ...prevState,
                        added_by: curr_user
                    }
                )
            })
        }
    }, [curr_user]) 

    const handleSelection = (newSelection: GridRowSelectionModel, details: GridCallbackDetails) => {
        let emp_no_locale = [] as Array<number>;
        newSelection.forEach((id) => {
          const row = state.employees_list?.find((row) => row.id === id);
          if (row) {
            emp_no_locale.push(row.emp_no);
          }
        });
        setCreateONBOARDINGSTATUSPayload((prevState) => ({
          ...prevState,
          emp_no: emp_no_locale,
        }));
    };

    return (
        <React.Fragment>
            <Typography style={{border: '2px solid rgb(25, 118, 210)', width: '100%', textAlign: 'center', padding: '6px', background: 'rgb(245,247,248)', boxShadow: '4px 4px 10px rgb(200, 200, 222)'}} variant='plain' level="h6">Initialize Onboarding Status Data</Typography>
            <div className='flex flex-col gap-6 overflow-auto w-full'>
                    <Typography level="body2" className='flex justify-center text-center align-center italic'>You can choose one or more employees to notify facilitators the ongoing employee's onboarding requirements. You may also filter and check all that applies.</Typography>
                    <div style={{ height: '450px', width: '100%' }}>
                        <DataGrid
                        rows={state.employees_list as EMPLOYEESViewInterface[]}
                        columns={EAProcessONBOARDINGSTATUSPageColumns}
                        initialState={{
                            pagination: {
                            paginationModel: { page: 0, pageSize: 100 },
                            },
                        }}
                        pageSizeOptions={[25, 50, 75, 100]}
                        onRowSelectionModelChange={handleSelection}
                        checkboxSelection
                        disableRowSelectionOnClick
                        localeText={{ noRowsLabel: `Loading...` }} // To do: reducer needs to be updated with status state
                        />
                    </div>
                <div className='flex justify-center mt-6' container-name='leave_buttons_container'>
                    <div className='flex justify-between' style={{width:'100%'}} container-name='leave_buttons'>
                        <Button variant='contained' onClick={() => dispatch(ONBOARDINGSTATUSCreateAction(createONBOARDINGSTATUSPayload)) }>Initialize Onboarding Status</Button>
                        <DateFieldCreate initialState={createONBOARDINGSTATUSPayload} setInitialState={setCreateONBOARDINGSTATUSPayload}/>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default EAONBOARDINGSTATUSCreate;

