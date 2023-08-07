import { Fragment, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { Typography } from "@material-tailwind/react";
import { ProceduralLEAVEPageDescriptions, ProceduralLEAVEPageColumns } from '@/data/pages-data/procedural-data/leaves-data';
import ViewLEAVESingleModal from './local-components/main-modals/view-leaves-single-modal';
import { LEAVEViewInterface } from '@/types/types-pages';
import { LEAVEViewAction } from '@/store/actions/procedurals';


export default function ProceduralLEAVEPage() {
  const [printing, setIsPrinting] = useState(false);
  const [singleLEAVEOpenModal, setSingleLEAVEOpenModal] = useState<boolean>(false);
  const [singleLEAVEDetailsData, setSingleLEAVEDetailsData] = useState<LEAVEViewInterface>({
      leave_type: 1,
      leave_remarks: '',
      leave_date_from: '',
      leave_date_to: '',
      emp_no: NaN,
      id: NaN,
      leave_reason_disapproval: null,
      leave_date_approved1: null,
      leave_date_approved2: null,
      leave_date_filed: '',
      leave_approval_status: '',
      leave_total_hours: NaN,
      leave_approver1_empno: null,
      leave_approver2_empno: null,
      leave_number_days: 0,
      cutoff_code: NaN,
      applicant_rank: NaN,
  });
  const dispatch = useDispatch();
  const { LEAVEView } = useSelector((state: RootState) => state.procedurals);
  const { data, status } = LEAVEView;
  const LEAVEViewData = data as LEAVEViewInterface[];

  useEffect(()=> {
    dispatch(LEAVEViewAction())
  }, []);

  const printableArea = () => {
    // Calculate px; solves printable area bug, Do not easily modify
    if(LEAVEViewData?.length && LEAVEViewData?.length >= 11){
      return LEAVEViewData?.length / 25 * 1400
    } else {
      return 600
    }
  };

  return (
    <Fragment>
      <div className="my-10 flex flex-wrap justify-between items-start gap-6">
        <div>
          <ViewLEAVESingleModal setSingleLEAVEDetailsData={setSingleLEAVEDetailsData} singleLEAVEDetailsData={singleLEAVEDetailsData} singleLEAVEOpenModal={singleLEAVEOpenModal} setSingleLEAVEOpenModal={setSingleLEAVEOpenModal}/>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400", marginTop: '4px'}}>
          <p>Status: {ProceduralLEAVEPageDescriptions}</p>
        </Typography>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400"}}>
          <i>Click on the Table Headers to Customize View, Sort, or Add/Remove Columns</i>
        </Typography>
        </div>
      </div>
      <div style={{ height: `${printing? `${printableArea()}px` : '660px'}`, width: '100%' }} id="printable-area">
        <DataGrid
          rows={LEAVEViewData? LEAVEViewData as LEAVEViewInterface[]:[]}
          columns={ProceduralLEAVEPageColumns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 100 },
            },
          }}
          pageSizeOptions={[25, 50, 75, 100]}
          onRowClick={(e) => {
            setSingleLEAVEDetailsData(e.row);
            setSingleLEAVEOpenModal(true);
          }}
          disableRowSelectionOnClick 
          localeText={{ noRowsLabel: `${status === 'loading' ? `${status?.toUpperCase()}...` : status === 'failed' ?  'No cutoff lists found. Contact your administrator/support.' : (status === null || status === undefined) ? 'The caller for LEAVE Epic hasn\'t been set up, please contact your frontend developer': 'There is no LEAVE to generate. Double check with a Database Admin'}` }}
        />
        {/* <GeneratePDFButton data={LEAVEViewData} columns={ProceduralLEAVEPageColumns} /> */}
      </div>
    </Fragment>
  );
}
