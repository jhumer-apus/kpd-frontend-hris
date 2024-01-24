import { Fragment, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { Typography } from '@mui/material';
import { EACORECOMPEPageDescriptions, EACORECOMPEPageColumns } from '@/data/pages-data/employee-and-applicants-data/ea-core-competencies-data';
import ViewCORECOMPESingleModal from './local-components/main-modals/ea-core-compe-history-single-modal';
import { CORECOMPEViewInterface } from '@/types/types-employee-and-applicants';
import { CORECOMPEViewAction } from '@/store/actions/employee-and-applicants';
import { globalServerErrorMsg } from '@/store/configureStore';


export default function EACORECOMPEPageHistory() {
  const [singleCORECOMPEOpenModal, setSingleCORECOMPEOpenModal] = useState<boolean>(false);
  const [singleCORECOMPEDetailsData, setSingleCORECOMPEDetailsData] = useState<CORECOMPEViewInterface>({
    id: NaN,
    date_deleted: '',
    date_added: '',
    added_by: NaN,
    checklist_limit: '',
    checklist_title: '',
  });
  const dispatch = useDispatch();
  const { CORECOMPEView } = useSelector((state: RootState) => state.employeeAndApplicants);
  const { data, status, error } = CORECOMPEView;
  const CORECOMPEViewData = data as CORECOMPEViewInterface[];
  const curr_user = useSelector((state: RootState) => state.auth.employee_detail?.emp_no)

  useEffect(()=> {
    if((CORECOMPEViewData?.length <= 0 || CORECOMPEViewData === null || CORECOMPEViewData === undefined ) && curr_user){
      dispatch(CORECOMPEViewAction())
    }
  }, [curr_user]);

  return (
    <Fragment>
      <div className="my-2 flex flex-wrap justify-between items-start gap-6">
        <div>
          <ViewCORECOMPESingleModal setSingleCORECOMPEDetailsData={setSingleCORECOMPEDetailsData} singleCORECOMPEDetailsData={singleCORECOMPEDetailsData} singleCORECOMPEOpenModal={singleCORECOMPEOpenModal} setSingleCORECOMPEOpenModal={setSingleCORECOMPEOpenModal}/>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400", marginTop: '4px'}}>
          <p>{EACORECOMPEPageDescriptions}</p>
        </Typography>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400"}}>
          <i>Click on the Table Headers to Customize View, Sort, or Add/Remove Columns</i>
        </Typography>
        </div>
      </div>
      <div style={{ height: '600px', width: '100%' }}>
        <DataGrid
          rows={CORECOMPEViewData? CORECOMPEViewData as CORECOMPEViewInterface[]:[]}
          columns={EACORECOMPEPageColumns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 100 },
            },
          }}
          pageSizeOptions={[25, 50, 75, 100]}
          onRowClick={(e) => {
            setSingleCORECOMPEDetailsData(e.row);
            setSingleCORECOMPEOpenModal(true);
          }}
          disableRowSelectionOnClick 
          localeText={{ noRowsLabel: `${status === 'loading' ? `${status?.toUpperCase()}...` : status === 'failed' ?  `${globalServerErrorMsg}` : 'Data Loaded - Showing 0 Results'}` }}
        />
      </div>
    </Fragment>
  );
}
