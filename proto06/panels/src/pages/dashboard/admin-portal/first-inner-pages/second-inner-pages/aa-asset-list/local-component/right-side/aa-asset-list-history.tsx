import { Fragment, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { Typography } from '@mui/material';
import { AAASSETLISTPageDescriptions, AAASSETLISTPageColumns } from '@/data/pages-data/payroll-eoy-data/aa-asset-list-data';
import ViewASSETLISTSingleModal from './local-components/main-modals/aa-asset-list-single-modal';
import { ASSETLISTViewInterface } from '@/types/types-payroll-eoy';
import { ASSETLISTViewAction } from '@/store/actions/payroll-eoy';

export default function AAASSETLISTPageHistory() {
  const [singleASSETLISTOpenModal, setSingleASSETLISTOpenModal] = useState<boolean>(false);
  const [singleASSETLISTDetailsData, setSingleASSETLISTDetailsData] = useState<ASSETLISTViewInterface>({
    id: NaN,
    name: '',
    description: '',
    amount: NaN,
    date_added: '',
  });
  const dispatch = useDispatch();
  const { ASSETLISTView } = useSelector((state: RootState) => state.payrollEOY);
  const { data, status } = ASSETLISTView;
  const ASSETLISTViewData = data as ASSETLISTViewInterface[];
  const curr_user = useSelector((state: RootState) => state.auth.employee_detail?.emp_no)

  useEffect(()=> {
    if((ASSETLISTViewData?.length <= 0 || ASSETLISTViewData === null || ASSETLISTViewData === undefined ) && curr_user){
      dispatch(ASSETLISTViewAction())
    }
  }, [curr_user]);

  return (
    <Fragment>
      <div className="my-2 flex flex-wrap justify-between items-start gap-6">
        <div>
          <ViewASSETLISTSingleModal setSingleASSETLISTDetailsData={setSingleASSETLISTDetailsData} singleASSETLISTDetailsData={singleASSETLISTDetailsData} singleASSETLISTOpenModal={singleASSETLISTOpenModal} setSingleASSETLISTOpenModal={setSingleASSETLISTOpenModal}/>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400", marginTop: '4px'}}>
          <p>{AAASSETLISTPageDescriptions}</p>
        </Typography>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400"}}>
          <i>Click on the Table Headers to Customize View, Sort, or Add/Remove Columns</i>
        </Typography>
        </div>
      </div>
      <div style={{ height: '600px', width: '100%' }}>
        <DataGrid
          rows={ASSETLISTViewData? ASSETLISTViewData as ASSETLISTViewInterface[]:[]}
          columns={AAASSETLISTPageColumns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 100 },
            },
          }}
          pageSizeOptions={[25, 50, 75, 100]}
          onRowClick={(e) => {
            setSingleASSETLISTDetailsData(e.row);
            setSingleASSETLISTOpenModal(true);
          }}
          disableRowSelectionOnClick 
          localeText={{ noRowsLabel: `${status === 'loading' ? `${status?.toUpperCase()}...` : status === 'failed' ?  'No Asset Lists found. Contact your administrator/support.' : (status === null || status === undefined) ? 'The caller for Asset List Epic hasn\'t been set up, please contact your frontend developer': 'There is no ASSETLIST to generate.'}` }}
        />
      </div>
    </Fragment>
  );
}
