import { Dispatch, Fragment, SetStateAction, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { Typography } from "@material-tailwind/react";
import { EMPSEMINARSPageDescriptions, EMPSEMINARSPageColumns } from '@/data/pages-data/employee-and-applicants-data/sn-emp-seminars-data';
import ViewEMPSEMINARSSingleModal from './local-components/main-modals/view-emp-training-seminars-single-modal';
import { EMPSEMINARSViewInterface } from '@/types/types-employee-and-applicants';
import { EMPSEMINARSViewSpecificAction } from '@/store/actions/employee-and-applicants';
import { globalServerErrorMsg } from '@/store/configureStore';


interface EmploymentHistoryTableInterface {
  currEmployee: number,
  setCurrEmployee: Dispatch<SetStateAction<number>>,
}

export default function EmploymentHistoryTable(props: EmploymentHistoryTableInterface) {
  const {currEmployee} = props;
  const [singleEMPSEMINARSOpenModal, setSingleEMPSEMINARSOpenModal] = useState<boolean>(false);
  const [singleEMPSEMINARSDetailsData, setSingleEMPSEMINARSDetailsData] = useState<EMPSEMINARSViewInterface>({
    id: NaN,
    emp_no: NaN,
    subject: '',
    date_accomplished: '',
    category: '',
    added_by: NaN,
  });
  const dispatch = useDispatch();
  const { EMPSEMINARSViewSpecific } = useSelector((state: RootState) => state.employeeAndApplicants);
  const { data, status, error } = EMPSEMINARSViewSpecific;
  const EMPSEMINARSViewData = data as EMPSEMINARSViewInterface[];

  useEffect(()=> {
      dispatch(EMPSEMINARSViewSpecificAction({emp_no: currEmployee}))
  }, [currEmployee]);

  return (
    <Fragment>
      <div className="my-2 flex flex-wrap justify-between items-start gap-6">
        <div>
          <ViewEMPSEMINARSSingleModal 
            setSingleEMPSEMINARSDetailsData={setSingleEMPSEMINARSDetailsData} 
            singleEMPSEMINARSDetailsData={singleEMPSEMINARSDetailsData} 
            singleEMPSEMINARSOpenModal={singleEMPSEMINARSOpenModal} 
            setSingleEMPSEMINARSOpenModal={setSingleEMPSEMINARSOpenModal}
          />
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400", marginTop: '4px'}}>
          <p>{EMPSEMINARSPageDescriptions}</p>
        </Typography>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400"}}>
          <i>Click on the Table Headers to Customize View, Sort, or Add/Remove Columns</i>
        </Typography>
        </div>
      </div>
      <div style={{ height: '600px', width: '100%' }}>
        <DataGrid
          rows={EMPSEMINARSViewData? EMPSEMINARSViewData as EMPSEMINARSViewInterface[]:[]}
          columns={EMPSEMINARSPageColumns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 100 },
            },
          }}
          pageSizeOptions={[25, 50, 75, 100]}
          onRowClick={(e) => {
            setSingleEMPSEMINARSDetailsData(e.row);
            setSingleEMPSEMINARSOpenModal(true);
          }}
          disableRowSelectionOnClick 
          localeText={{ noRowsLabel: `${status === 'loading' ? `${status?.toUpperCase()}...` : status === 'failed' ?  `${globalServerErrorMsg}` : 'Data Loaded - Showing 0 Results'}` }}
          />
      </div>
    </Fragment>
  );
}
