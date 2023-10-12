import { Fragment, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { Typography } from "@material-tailwind/react";
import { YourKPICOREPageDescriptions, YourKPICOREPageColumns } from '@/data/pages-data/quick-accesses-data/your-evaluation-data';
import ViewKPICORESingleModal from './local-components/main-modals/view-evaluation-single-modal';
import { KPICOREViewInterface } from '@/types/types-employee-and-applicants';
import { KPICOREViewAction } from '@/store/actions/employee-and-applicants';

export default function YourKPICOREPage() {
  const [printing, setIsPrinting] = useState(false);
  const [singleKPICOREOpenModal, setSingleKPICOREOpenModal] = useState<boolean>(false);
  const [singleKPICOREDetailsData, setSingleKPICOREDetailsData] = useState<KPICOREViewInterface>({
    id: NaN,
    date_added: '',
    emp_no: NaN,
    emp_name: '',
    sup_name: '',
    sup_no: NaN,
    eval_date: '',
    status: 'Pending',
    final_rating: '',
    self_eval_points: NaN,
    sup_eval_points: NaN,
    core_compe_points: NaN,
    percentage_total: NaN,

  });
  const dispatch = useDispatch();
  const { KPICOREView } = useSelector((state: RootState) => state.employeeAndApplicants);
  const { data, status } = KPICOREView;
  const KPICOREViewData = data as KPICOREViewInterface[];

  useEffect(()=> {
    dispatch(KPICOREViewAction())
  }, []);

  return (
    <Fragment>
      <div className="my-10 flex flex-wrap justify-between items-start gap-6">
        <div>
          <ViewKPICORESingleModal setSingleKPICOREDetailsData={setSingleKPICOREDetailsData} singleKPICOREDetailsData={singleKPICOREDetailsData} singleKPICOREOpenModal={singleKPICOREOpenModal} setSingleKPICOREOpenModal={setSingleKPICOREOpenModal}/>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400", marginTop: '4px'}}>
          <p>Status: {YourKPICOREPageDescriptions}</p>
        </Typography>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400"}}>
          <i>Click on the Table Headers to Customize View, Sort, or Add/Remove Columns</i>
        </Typography>
        </div>
      </div>
      <div style={{ height: '660px', width: '100%' }} id="printable-area">
        <DataGrid
          rows={KPICOREViewData? KPICOREViewData as KPICOREViewInterface[]:[]}
          columns={YourKPICOREPageColumns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 100 },
            },
          }}
          pageSizeOptions={[25, 50, 75, 100]}
          onRowClick={(e) => {
            setSingleKPICOREDetailsData(e.row);
            setSingleKPICOREOpenModal(true);
          }}
          disableRowSelectionOnClick 
          localeText={{ noRowsLabel: `${status === 'loading' ? `${status?.toUpperCase()}...` : status === 'failed' ?  'No KPICORE found. Contact your administrator/support.' : (status === null || status === undefined) ? 'The caller for KPICORE Epic hasn\'t been set up, please contact your frontend developer': 'There is no KPICORE to generate.'}` }}
        />
      </div>
    </Fragment>
  );
}
