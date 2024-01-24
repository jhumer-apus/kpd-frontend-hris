import { Fragment, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { Typography } from '@mui/material';
import { EAEVALQUESTIONSPageDescriptions, EAEVALQUESTIONSPageColumns } from '@/data/pages-data/employee-and-applicants-data/ea-kpi-questions-data';
import ViewEVALQUESTIONSSingleModal from './local-components/main-modals/view-eval-questions-single-modal';
import { EVALQUESTIONSViewInterface } from '@/types/types-employee-and-applicants';
import { EVALQUESTIONSViewAction } from '@/store/actions/employee-and-applicants';
import { globalServerErrorMsg } from '@/store/configureStore';


export default function EAEVALQUESTIONSPageHistory() {
  const [singleEVALQUESTIONSOpenModal, setSingleEVALQUESTIONSOpenModal] = useState<boolean>(false);
  const [singleEVALQUESTIONSDetailsData, setSingleEVALQUESTIONSDetailsData] = useState<EVALQUESTIONSViewInterface>({
    id: NaN,
    date_deleted: '',
    date_added: '',
    added_by: NaN,
    question: '',
  });
  const dispatch = useDispatch();
  const { EVALQUESTIONSView } = useSelector((state: RootState) => state.employeeAndApplicants);
  const { data, status, error } = EVALQUESTIONSView;
  const EVALQUESTIONSViewData = data as EVALQUESTIONSViewInterface[];
  const curr_user = useSelector((state: RootState) => state.auth.employee_detail?.emp_no)

  useEffect(()=> {
    if((EVALQUESTIONSViewData?.length <= 0 || EVALQUESTIONSViewData === null || EVALQUESTIONSViewData === undefined ) && curr_user){
      dispatch(EVALQUESTIONSViewAction())
    }
  }, [curr_user]);

  return (
    <Fragment>
      <div className="my-2 flex flex-wrap justify-between items-start gap-6">
        <div>
          <ViewEVALQUESTIONSSingleModal setSingleEVALQUESTIONSDetailsData={setSingleEVALQUESTIONSDetailsData} singleEVALQUESTIONSDetailsData={singleEVALQUESTIONSDetailsData} singleEVALQUESTIONSOpenModal={singleEVALQUESTIONSOpenModal} setSingleEVALQUESTIONSOpenModal={setSingleEVALQUESTIONSOpenModal}/>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400", marginTop: '4px'}}>
          <p>{EAEVALQUESTIONSPageDescriptions}</p>
        </Typography>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400"}}>
          <i>Click on the Table Headers to Customize View, Sort, or Add/Remove Columns</i>
        </Typography>
        </div>
      </div>
      <div style={{ height: '600px', width: '100%' }}>
        <DataGrid
          rows={EVALQUESTIONSViewData? EVALQUESTIONSViewData as EVALQUESTIONSViewInterface[]:[]}
          columns={EAEVALQUESTIONSPageColumns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 100 },
            },
          }}
          pageSizeOptions={[25, 50, 75, 100]}
          onRowClick={(e) => {
            setSingleEVALQUESTIONSDetailsData(e.row);
            setSingleEVALQUESTIONSOpenModal(true);
          }}
          disableRowSelectionOnClick 
          localeText={{ noRowsLabel: `${status === 'loading' ? `${status?.toUpperCase()}...` : status === 'failed' ?  `${globalServerErrorMsg}` : 'Data Loaded - Showing 0 Results'}` }}
        />
      </div>
    </Fragment>
  );
}
