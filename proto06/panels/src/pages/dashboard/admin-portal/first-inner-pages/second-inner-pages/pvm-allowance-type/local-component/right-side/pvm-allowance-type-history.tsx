import { Fragment, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { Typography } from "@material-tailwind/react";
import { PVMALLOWANCETYPEPageDescriptions, PVMALLOWANCETYPEPageColumns } from '@/data/pages-data/payroll-variables-data/pvm-allowance-type-data';
import ViewALLOWANCETYPESingleModal from './local-components/main-modals/pvm-allowance-type-single-modal';
import { ALLOWANCETYPEViewInterface } from '@/types/types-payroll-variables';
import { ALLOWANCETYPEViewAction } from '@/store/actions/payroll-variables';
import { globalServerErrorMsg } from '@/store/configureStore';


export default function PVMALLOWANCETYPEPageHistory() {
  const [singleALLOWANCETYPEOpenModal, setSingleALLOWANCETYPEOpenModal] = useState<boolean>(false);
  const [singleALLOWANCETYPEDetailsData, setSingleALLOWANCETYPEDetailsData] = useState<ALLOWANCETYPEViewInterface>({
    id: NaN,
    allowance_name: '',
    taxable: false,
    date_added: '',
    date_deleted: '',
  });
  const dispatch = useDispatch();
  const { ALLOWANCETYPEView } = useSelector((state: RootState) => state.payrollVariables);
  const { data, status, error } = ALLOWANCETYPEView;
  const ALLOWANCETYPEViewData = data as ALLOWANCETYPEViewInterface[];
  const curr_user = useSelector((state: RootState) => state.auth.employee_detail?.emp_no)

  useEffect(()=> {
    if((ALLOWANCETYPEViewData?.length <= 0 || ALLOWANCETYPEViewData === null || ALLOWANCETYPEViewData === undefined ) && curr_user){
      dispatch(ALLOWANCETYPEViewAction())
    }
  }, [curr_user]);

  return (
    <Fragment>
      <div className="my-2 flex flex-wrap justify-between items-start gap-6">
        <div>
          <ViewALLOWANCETYPESingleModal setSingleALLOWANCETYPEDetailsData={setSingleALLOWANCETYPEDetailsData} singleALLOWANCETYPEDetailsData={singleALLOWANCETYPEDetailsData} singleALLOWANCETYPEOpenModal={singleALLOWANCETYPEOpenModal} setSingleALLOWANCETYPEOpenModal={setSingleALLOWANCETYPEOpenModal}/>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400", marginTop: '4px'}}>
          <p>{PVMALLOWANCETYPEPageDescriptions}</p>
        </Typography>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400"}}>
          <i>Click on the Table Headers to Customize View, Sort, or Add/Remove Columns</i>
        </Typography>
        </div>
      </div>
      <div style={{ height: '600px', width: '100%' }}>
        <DataGrid
          rows={ALLOWANCETYPEViewData? ALLOWANCETYPEViewData as ALLOWANCETYPEViewInterface[]:[]}
          columns={PVMALLOWANCETYPEPageColumns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 100 },
            },
          }}
          pageSizeOptions={[25, 50, 75, 100]}
          onRowClick={(e) => {
            setSingleALLOWANCETYPEDetailsData(e.row);
            setSingleALLOWANCETYPEOpenModal(true);
          }}
          disableRowSelectionOnClick 
          localeText={{ noRowsLabel: `${status === 'loading' ? `${status?.toUpperCase()}...` : status === 'failed' ?  `${globalServerErrorMsg}` : 'Data Loaded - Showing 0 Results'}` }}
        />
      </div>
    </Fragment>
  );
}
