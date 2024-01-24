import { Fragment, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { Typography } from "@material-tailwind/react";
import { ProceduralOVERTIMEPageDescriptions, ProceduralOVERTIMEPageColumns } from '@/data/pages-data/procedural-data/overtime-data';
import ViewOVERTIMESingleModal from './local-components/main-modals/view-overtime-single-modal';
import { OVERTIMEViewInterface } from '@/types/types-pages';
import { OVERTIMEViewAction } from '@/store/actions/procedurals';
import { globalServerErrorMsg } from '@/store/configureStore';


export default function ProceduralOvertimePage() {
  const [singleOVERTIMEOpenModal, setSingleOVERTIMEOpenModal] = useState<boolean>(false);
  const [singleOVERTIMEDetailsData, setSingleOVERTIMEDetailsData] = useState<OVERTIMEViewInterface>({
      id: NaN,
      ot_reason_disapproval: null,
      ot_date_approved1: null,
      ot_date_approved2: null,
      ot_date_filed: '',
      ot_type: '',
      ot_remarks: '',
      ot_date_from: '',
      ot_date_to: '',
      ot_approval_status: '',
      ot_total_hours: NaN,
      ot_approver1_empno: null,
      ot_approver2_empno: null,
      emp_no: NaN,
      cutoff_code: NaN,
      applicant_rank: NaN,
  });
  const dispatch = useDispatch();
  const { OVERTIMEView } = useSelector((state: RootState) => state.procedurals);
  const { data, status, error } = OVERTIMEView;
  const OVERTIMEViewData = data as OVERTIMEViewInterface[];

  useEffect(()=> {
    dispatch(OVERTIMEViewAction())
  }, []);

  return (
    <Fragment>
      <div className="my-10 flex flex-wrap justify-between items-start gap-6">
        <div>
          <ViewOVERTIMESingleModal setSingleOVERTIMEDetailsData={setSingleOVERTIMEDetailsData} singleOVERTIMEDetailsData={singleOVERTIMEDetailsData} singleOVERTIMEOpenModal={singleOVERTIMEOpenModal} setSingleOVERTIMEOpenModal={setSingleOVERTIMEOpenModal}/>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400", marginTop: '4px'}}>
          <p>Status: {ProceduralOVERTIMEPageDescriptions}</p>
        </Typography>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400"}}>
          <i>Click on the Table Headers to Customize View, Sort, or Add/Remove Columns</i>
        </Typography>
        </div>
      </div>
      <div style={{ height: '660px', width: '100%' }}>
        <DataGrid
          rows={OVERTIMEViewData? OVERTIMEViewData as OVERTIMEViewInterface[]:[]}
          columns={ProceduralOVERTIMEPageColumns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 100 },
            },
          }}
          pageSizeOptions={[25, 50, 75, 100]}
          onRowClick={(e) => {
            setSingleOVERTIMEDetailsData(e.row);
            setSingleOVERTIMEOpenModal(true);
          }}
          disableRowSelectionOnClick 
          localeText={{ noRowsLabel: `${status === 'loading' ? `${status?.toUpperCase()}...` : status === 'failed' ?  `${globalServerErrorMsg}` : 'Data Loaded - Showing 0 Results'}` }}
          />
      </div>
    </Fragment>
  );
}
