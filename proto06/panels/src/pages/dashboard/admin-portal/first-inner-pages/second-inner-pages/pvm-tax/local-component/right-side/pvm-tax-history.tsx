import { Fragment, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { Typography } from "@material-tailwind/react";
import { PVMTAXPageDescriptions, PVMTAXPageColumns } from '@/data/pages-data/payroll-variables-data/pvm-tax-data';
import ViewTAXSingleModal from './local-components/main-modals/pvm-tax-single-modal';
import { TAXViewInterface } from '@/types/types-payroll-variables';
import { TAXViewAction } from '@/store/actions/payroll-variables';
import { globalServerErrorMsg } from '@/store/configureStore';


export default function PVMTAXPageHistory() {
  const [singleTAXOpenModal, setSingleTAXOpenModal] = useState<boolean>(false);
  const [singleTAXDetailsData, setSingleTAXDetailsData] = useState<TAXViewInterface>({
    id: NaN,
    tin_no: NaN,
    tax_form: '',
    tax_description: '',
    tax_percentage: NaN,
    payment_frequency: NaN,
    emp_no: NaN,
  });
  const dispatch = useDispatch();
  const { TAXView } = useSelector((state: RootState) => state.payrollVariables);
  const { data, status, error } = TAXView;
  const TAXViewData = data as TAXViewInterface[];
  const curr_user = useSelector((state: RootState) => state.auth.employee_detail?.emp_no)

  useEffect(()=> {
    if((TAXViewData?.length <= 0 || TAXViewData === null || TAXViewData === undefined ) && curr_user){
      dispatch(TAXViewAction())
    }
  }, [curr_user]);

  return (
    <Fragment>
      <div className="my-2 flex flex-wrap justify-between items-start gap-6">
        <div>
          <ViewTAXSingleModal setSingleTAXDetailsData={setSingleTAXDetailsData} singleTAXDetailsData={singleTAXDetailsData} singleTAXOpenModal={singleTAXOpenModal} setSingleTAXOpenModal={setSingleTAXOpenModal}/>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400", marginTop: '4px'}}>
          <p>{PVMTAXPageDescriptions}</p>
        </Typography>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400"}}>
          <i>Click on the Table Headers to Customize View, Sort, or Add/Remove Columns</i>
        </Typography>
        </div>
      </div>
      <div style={{ height: '600px', width: '100%' }}>
        <DataGrid
          rows={TAXViewData? TAXViewData as TAXViewInterface[]:[]}
          columns={PVMTAXPageColumns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 100 },
            },
          }}
          pageSizeOptions={[25, 50, 75, 100]}
          onRowClick={(e) => {
            setSingleTAXDetailsData(e.row);
            setSingleTAXOpenModal(true);
          }}
          disableRowSelectionOnClick 
          localeText={{ noRowsLabel: `${status === 'loading' ? `${status?.toUpperCase()}...` : status === 'failed' ?  `${globalServerErrorMsg}` : 'Data Loaded - Showing 0 Results'}` }}
        />
      </div>
    </Fragment>
  );
}
