import { Fragment, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { Typography } from "@material-tailwind/react";
import { ProceduralCUTOFFPERIODPageDescriptions, ProceduralCUTOFFPERIODPageColumns } from '@/data/pages-data/procedural-data/cutoff-period-data';
import ViewCUTOFFPERIODSingleModal from './local-components/main-modals/view-cutoff-period-single-modal';
import { CUTOFFPERIODViewInterface } from '@/types/types-pages';
import { CUTOFFPERIODViewAction } from '@/store/actions/procedurals';
import { globalServerErrorMsg } from '@/store/configureStore';


export default function ProceduralCUTOFFPERIODPageHistory() {
  const [singleCUTOFFPERIODOpenModal, setSingleCUTOFFPERIODOpenModal] = useState<boolean>(false);
  const [singleCUTOFFPERIODDetailsData, setSingleCUTOFFPERIODDetailsData] = useState<CUTOFFPERIODViewInterface>({
    id: NaN,
    co_is_processed: false,
    co_name: null,
    co_description: null,
    co_date_from: null,
    co_date_to: null,
    reg_days_total: null,
    credit_date: null,
    payroll_group_code: null,
    division_code: null, 
  });
  const dispatch = useDispatch();
  const { CUTOFFPERIODView } = useSelector((state: RootState) => state.procedurals);
  const { data, status, error } = CUTOFFPERIODView;
  const CUTOFFPERIODViewData = data as CUTOFFPERIODViewInterface[];
  const curr_user = useSelector((state: RootState) => state.auth.employee_detail?.emp_no)

  useEffect(()=> {
    if((CUTOFFPERIODViewData?.length <= 0 || CUTOFFPERIODViewData === null || CUTOFFPERIODViewData === undefined ) && curr_user){
      dispatch(CUTOFFPERIODViewAction())
    }
  }, [curr_user]);

  return (
    <Fragment>
      <div className="my-2 flex flex-wrap justify-between items-start gap-6">
        <div>
          <ViewCUTOFFPERIODSingleModal setSingleCUTOFFPERIODDetailsData={setSingleCUTOFFPERIODDetailsData} singleCUTOFFPERIODDetailsData={singleCUTOFFPERIODDetailsData} singleCUTOFFPERIODOpenModal={singleCUTOFFPERIODOpenModal} setSingleCUTOFFPERIODOpenModal={setSingleCUTOFFPERIODOpenModal}/>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400", marginTop: '4px'}}>
          <p>{ProceduralCUTOFFPERIODPageDescriptions}</p>
        </Typography>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400"}}>
          <i>Click on the Table Headers to Customize View, Sort, or Add/Remove Columns</i>
        </Typography>
        </div>
      </div>
      <div style={{ height: '600px', width: '100%' }}>
        <DataGrid
          rows={CUTOFFPERIODViewData? CUTOFFPERIODViewData as CUTOFFPERIODViewInterface[]:[]}
          columns={ProceduralCUTOFFPERIODPageColumns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 100 },
            },
          }}
          pageSizeOptions={[25, 50, 75, 100]}
          onRowClick={(e) => {
            setSingleCUTOFFPERIODDetailsData(e.row);
            setSingleCUTOFFPERIODOpenModal(true);
          }}
          disableRowSelectionOnClick 
          localeText={{ noRowsLabel: `${status === 'loading' ? `${status?.toUpperCase()}...` : status === 'failed' ?  `${globalServerErrorMsg}` : 'Data Loaded - Showing 0 Results'}` }}
          />
      </div>
    </Fragment>
  );
}
