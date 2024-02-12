import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
// import { Typography } from '@mui/joy';

import { OFFBOARDINGSTATUSCreateInterface } from '@/types/types-employee-and-applicants';
import { OFFBOARDINGREQUIREMENTSViewAction, OFFBOARDINGSTATUSCreateAction, OFFBOARDINGSTATUSCreateActionFailureCleanup } from '@/store/actions/employee-and-applicants';


import { DataGrid, GridCallbackDetails, GridRowSelectionModel } from '@mui/x-data-grid';
// import { Typography } from "@material-tailwind/react";
import { EAProcessOFFBOARDINGSTATUSPageColumns } from '@/data/pages-data/employee-and-applicants-data/ea-initialize-offboarding-data';
import { getEmployeesList } from '@/store/actions/employees';
import { EMPLOYEESViewInterface } from '@/types/types-store';
import DateFieldCreate from './inner-ui-components/date-field';



interface CreateOFFBOARDINGSTATUSModalInterface {
    setOpen?: Dispatch<SetStateAction<boolean>>;
}

function EAOFFBOARDINGSTATUSCreate(props: CreateOFFBOARDINGSTATUSModalInterface) {
    const state = useSelector((state: RootState) => state.employees)
    const OFFBOARDINGREQUIREMENTSViewData = useSelector((state: RootState) => state.employeeAndApplicants.OFFBOARDINGREQUIREMENTSView.data);
    const dispatch = useDispatch();
    const curr_user = useSelector((state: RootState)=> state.auth.employee_detail?.emp_no);
    const OFFBOARDINGSTATUSCreatestate = useSelector((state: RootState)=> state.employeeAndApplicants.OFFBOARDINGSTATUSCreate);
    // const [createOFFBOARDINGSTATUS, setCreateOFFBOARDINGSTATUS] = useState<{emp_no: number[]}>({
    //     emp_no: [],
    // });
    const { status, error, data } = OFFBOARDINGSTATUSCreatestate

    const [ createOFFBOARDINGSTATUSPayload, setCreateOFFBOARDINGSTATUSPayload ] = useState<OFFBOARDINGSTATUSCreateInterface>({
        emp_no: [],
        date_offboard: null,
        added_by: NaN,
    })

    const onClickSubmit = () => {
        dispatch(OFFBOARDINGSTATUSCreateAction(createOFFBOARDINGSTATUSPayload))
    };


    useEffect(()=>{
        if(status === 'succeeded'){
            window.alert('Request Successful');
            window.location.reload();
        }else if(status === 'failed'){
            window.alert(`Request Failed, ${error}`)
            setTimeout(()=> {
                dispatch(OFFBOARDINGSTATUSCreateActionFailureCleanup());
            }, 500)
        }
    }, [status])

    useEffect(()=> {
        if((OFFBOARDINGREQUIREMENTSViewData?.length <= 0 || OFFBOARDINGREQUIREMENTSViewData === null || OFFBOARDINGREQUIREMENTSViewData === undefined ) && curr_user){
          dispatch(OFFBOARDINGREQUIREMENTSViewAction())
        }
      }, [curr_user]);

    useEffect(()=> {
        if(curr_user){
            setCreateOFFBOARDINGSTATUSPayload((prevState) => {
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
    
        setCreateOFFBOARDINGSTATUSPayload((prevState) => ({
          ...prevState,
          emp_no: emp_no_locale,
        }));
      };

    return (
        <React.Fragment>
            <Typography style={{border: '2px solid rgb(25, 118, 210)', width: '100%', textAlign: 'center', padding: '6px', background: 'rgb(245,247,248)', boxShadow: '4px 4px 10px rgb(200, 200, 222)'}}  variant='subtitle2'>Initialize Offboarding Requirements Data</Typography>
            <div className='flex flex-col gap-6 overflow-auto w-full'>
                    <Typography variant='body2' className='flex justify-center text-center align-center italic'>You can choose one or more employees to notify facilitators the ongoing employee's offboarding requirements. You may also filter and check all that applies.</Typography>
                    <div style={{ height: '450px', width: '100%' }}>
                        <DataGrid
                        rows={state.employees_list as EMPLOYEESViewInterface[]}
                        columns={EAProcessOFFBOARDINGSTATUSPageColumns}
                        initialState={{
                            pagination: {
                            paginationModel: { page: 0, pageSize: 100 },
                            },
                        }}
                        pageSizeOptions={[25, 50, 75, 100]}
                        // onRowClick={(e) => {
                        //     setSingleOFFBOARDINGSTATUSDetailsData(e.row);
                        //     setSingleOFFBOARDINGSTATUSOpenModal(true);
                        // }}
                        onRowSelectionModelChange={handleSelection}
                        checkboxSelection
                        disableRowSelectionOnClick
                        localeText={{ noRowsLabel: `Data Loaded - Showing 0 Results` }}
                        />
                    </div>
                <div className='flex justify-center mt-6' container-name='leave_buttons_container'>
                    <div className='flex justify-between' style={{width:'100%'}} container-name='leave_buttons'>
                        <Button variant='contained' onClick={onClickSubmit}>Initialize Offboarding Requirements</Button>
                        <DateFieldCreate initialState={createOFFBOARDINGSTATUSPayload} setInitialState={setCreateOFFBOARDINGSTATUSPayload}/>

                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default EAOFFBOARDINGSTATUSCreate;

