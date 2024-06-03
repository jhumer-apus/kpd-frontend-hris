import { Dispatch, Fragment, SetStateAction, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { Typography } from "@material-tailwind/react";
import { EMPHISTORYPageDescriptions, EMPHISTORYPageColumns } from '@/data/pages-data/employee-and-applicants-data/sn-employment-history-data';
import ViewEMPHISTORYSingleModal from './local-components/main-modals/view-emp-history-single-modal';
import { EMPHISTORYViewInterface } from '@/types/types-employee-and-applicants';
import { EMPHISTORYViewSpecificAction } from '@/store/actions/employee-and-applicants';
import { globalServerErrorMsg } from '@/store/configureStore';


interface EmploymentHistoryTableInterface {
  currEmployee: number,
  setCurrEmployee: Dispatch<SetStateAction<number>>,
}

export default function EmploymentHistoryTable(props: EmploymentHistoryTableInterface) {
  const {currEmployee} = props;
  const [singleEMPHISTORYOpenModal, setSingleEMPHISTORYOpenModal] = useState<boolean>(false);
  const [singleEMPHISTORYDetailsData, setSingleEMPHISTORYDetailsData] = useState<EMPHISTORYViewInterface>({
    id: NaN,
    emp_no: NaN,
    employment_position: '',
    date_promoted: '',
    added_by: NaN,
  });
  const dispatch = useDispatch();
  const { EMPHISTORYViewSpecific } = useSelector((state: RootState) => state.employeeAndApplicants);
  const { data, status, error } = EMPHISTORYViewSpecific;
  const EMPHISTORYViewData = data as EMPHISTORYViewInterface[];

  useEffect(()=> {
      dispatch(EMPHISTORYViewSpecificAction({emp_no: currEmployee}))
  }, [currEmployee]);

  return (
    <Fragment>
      <div className="my-2 flex flex-wrap justify-between items-start gap-6">
        <div>
          <ViewEMPHISTORYSingleModal 
            setSingleEMPHISTORYDetailsData={setSingleEMPHISTORYDetailsData} 
            singleEMPHISTORYDetailsData={singleEMPHISTORYDetailsData} 
            singleEMPHISTORYOpenModal={singleEMPHISTORYOpenModal} 
            setSingleEMPHISTORYOpenModal={setSingleEMPHISTORYOpenModal}
          />
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400", marginTop: '4px'}}>
          <p>{EMPHISTORYPageDescriptions}</p>
        </Typography>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400"}}>
          <i>Click on the Table Headers to Customize View, Sort, or Add/Remove Columns</i>
        </Typography>
        </div>
      </div>
      <div style={{ height: '600px', width: '100%' }}>
        <DataGrid
          rows={EMPHISTORYViewData? EMPHISTORYViewData as EMPHISTORYViewInterface[]:[]}
          columns={EMPHISTORYPageColumns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 100 },
            },
          }}
          pageSizeOptions={[25, 50, 75, 100]}
          onRowClick={(e) => {
            setSingleEMPHISTORYDetailsData(e.row);
            setSingleEMPHISTORYOpenModal(true);
          }}
          disableRowSelectionOnClick 
          localeText={{ noRowsLabel: `${status === 'loading' ? `${status?.toUpperCase()}...` : status === 'failed' ?  `${globalServerErrorMsg}` : 'Data Loaded - Showing 0 Results'}` }}
          />
      </div>
    </Fragment>
  );
}
