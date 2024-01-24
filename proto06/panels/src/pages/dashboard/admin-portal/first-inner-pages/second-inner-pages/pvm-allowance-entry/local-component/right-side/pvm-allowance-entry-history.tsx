import { Fragment, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { Typography } from "@material-tailwind/react";
import { PVMALLOWANCEENTRYPageDescriptions, PVMALLOWANCEENTRYPageColumns } from '@/data/pages-data/payroll-variables-data/pvm-allowance-entry-data';
import ViewALLOWANCEENTRYSingleModal from './local-components/main-modals/pvm-allowance-entry-single-modal';
import { ALLOWANCEENTRYViewInterface } from '@/types/types-payroll-variables';
import { ALLOWANCEENTRYViewAction } from '@/store/actions/payroll-variables';
import { globalServerErrorMsg } from '@/store/configureStore';



export default function PVMALLOWANCEENTRYPageHistory() {
  const [singleALLOWANCEENTRYOpenModal, setSingleALLOWANCEENTRYOpenModal] = useState<boolean>(false);
  const [singleALLOWANCEENTRYDetailsData, setSingleALLOWANCEENTRYDetailsData] = useState<ALLOWANCEENTRYViewInterface>({
    id: NaN,
    amount: NaN,
    tax_rate: NaN,
    allowance_code: NaN,
    date_added: '',
    date_deleted: null,
    emp_no: NaN,
  });
  const dispatch = useDispatch();
  const { ALLOWANCEENTRYView } = useSelector((state: RootState) => state.payrollVariables);
  const { data, status, error } = ALLOWANCEENTRYView;
  const ALLOWANCEENTRYViewData = data as ALLOWANCEENTRYViewInterface[];
  const curr_user = useSelector((state: RootState) => state.auth.employee_detail?.emp_no)

  useEffect(()=> {
    if((ALLOWANCEENTRYViewData?.length <= 0 || ALLOWANCEENTRYViewData === null || ALLOWANCEENTRYViewData === undefined ) && curr_user){
      dispatch(ALLOWANCEENTRYViewAction())
    }
  }, [curr_user]);

  return (
    <Fragment>
      <div className="my-2 flex flex-wrap justify-between items-start gap-6">
        <div>
          <ViewALLOWANCEENTRYSingleModal setSingleALLOWANCEENTRYDetailsData={setSingleALLOWANCEENTRYDetailsData} singleALLOWANCEENTRYDetailsData={singleALLOWANCEENTRYDetailsData} singleALLOWANCEENTRYOpenModal={singleALLOWANCEENTRYOpenModal} setSingleALLOWANCEENTRYOpenModal={setSingleALLOWANCEENTRYOpenModal}/>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400", marginTop: '4px'}}>
          <p>{PVMALLOWANCEENTRYPageDescriptions}</p>
        </Typography>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400"}}>
          <i>Click on the Table Headers to Customize View, Sort, or Add/Remove Columns</i>
        </Typography>
        </div>
      </div>
      <div style={{ height: '600px', width: '100%' }}>
        <DataGrid
          rows={ALLOWANCEENTRYViewData? ALLOWANCEENTRYViewData as ALLOWANCEENTRYViewInterface[]:[]}
          columns={PVMALLOWANCEENTRYPageColumns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 100 },
            },
          }}
          pageSizeOptions={[25, 50, 75, 100]}
          onRowClick={(e) => {
            setSingleALLOWANCEENTRYDetailsData(e.row);
            setSingleALLOWANCEENTRYOpenModal(true);
          }}
          disableRowSelectionOnClick 
          localeText={{ noRowsLabel: `${status === 'loading' ? `${status?.toUpperCase()}...` : status === 'failed' ?  `${globalServerErrorMsg}` : 'Data Loaded - Showing 0 Results'}` }}
        />
      </div>
    </Fragment>
  );
}
