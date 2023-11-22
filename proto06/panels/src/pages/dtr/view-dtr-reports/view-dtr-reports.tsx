import { Fragment, useEffect, useState } from 'react';
import { DataGrid, GridRowParams } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
// import { RootState } from '@/store/reducers';
import { RootState } from '@/store/configureStore';
import { getSpecificEmployeeInfo } from '@/store/actions/employees';
import { Modal, Box, } from '@mui/material';

import {
  Typography,
} from "@material-tailwind/react";

import { SpecificEmployee } from './forms/SpecificEmployee';
import SplitButton from '@/widgets/split-button/split-button';
import { viewDTROptions, viewDTRDescriptions } from '@/data/pages-data/dtr-data/view-dtr-reports';
import useDtrState from '@/custom-hooks/use-dtr-state';
import { dynamicDTRColumns } from '@/data/pages-data/dtr-data/view-dtr-reports';
import { viewAllDtrLogs, viewCutoffDtrSummary, viewMergedDtrLogs } from '@/store/actions/dtr';
import PrintTableButton from './local-components/print-table-button';
import ExportToCsvButton from './local-components/export-to-csv-button';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};


export default function ViewDtrReports() {
  const [printing, setIsPrinting] = useState(false);
  const dispatch = useDispatch();
  const { specific_employee_info } = useSelector((state: RootState) => state.employees);
  const { spButtonIndex, spButtonStr, spButtonError, dtrStatus, dtrError, dtrData } = useDtrState();
  const [type, setType] = useState("staticInfo");


  // Specific Employee Modal Form 
  // States: 
  const [open, setOpen] = useState(false);
  const [modalEntranceDelay, setModalEntranceDelay] = useState(false);
  const [secondOptionModalEntranceDelay, setSecondOptionModalEntranceDelay] = useState(false);
  function handleOpen(){
    setOpen(true);
  };

  function handleClose(){
    setOpen(false);
    setType("staticInfo");
  };


  useEffect(() => {
    if(spButtonIndex !== null && spButtonIndex === 1 ){
      dispatch(viewMergedDtrLogs());
    } else if (spButtonIndex !== null && spButtonIndex === 2 ){
      dispatch(viewCutoffDtrSummary());
    } else {
      dispatch(viewAllDtrLogs());
    }
  }, [spButtonIndex]);
  function dispatchSpecificEmployeeInfo(employee_number: number){
    return dispatch(getSpecificEmployeeInfo({employee_id: employee_number}));   
  }

  // Side Effects
  const handleModalEntranceDelay = () => {
    setModalEntranceDelay(true);
    setSecondOptionModalEntranceDelay(true);
    setTimeout(() => {
      setModalEntranceDelay(false);
    }, 1000);
    setTimeout(() => {
      setSecondOptionModalEntranceDelay(false);
    }, 1200);
  };

  useEffect(()=>{
      setTimeout(() => {
        setModalEntranceDelay(false);
      }, 1000);
      setTimeout(() => {
        setSecondOptionModalEntranceDelay(false);
      }, 1200);
  }, [specific_employee_info])

  const printableArea = () => {
    // Calculate px; solves printable area bug, Do not easily modify
    if(dtrData?.length && dtrData?.length >= 11){
      return dtrData?.length / 25 * 1400
    } else {
      return 700
    }
  };

  const gridRowClick = (e: GridRowParams) => {
    handleOpen()
    setModalEntranceDelay(true)
    setSecondOptionModalEntranceDelay(true)
    dispatchSpecificEmployeeInfo(e.row?.emp_no)
  };

  return (
    <Fragment>
      <div className="my-10 flex flex-wrap justify-between items-start gap-6">
        <div>
        <SplitButton options={viewDTROptions}/>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400"}}>
          <i>{viewDTRDescriptions[spButtonIndex === null ? 0 : spButtonIndex]}</i>
        </Typography>
        </div>
        <div className='flex justify-between gap-6'>
        <ExportToCsvButton data={dtrData} />
        <PrintTableButton setIsPrinting={setIsPrinting}/>
        </div>
      </div>
      <div style={{ height: `${printing? `${printableArea()}px` : '660px'}`, width: '100%' }} id="printable-area">
        <DataGrid
          rows={dtrData ?? []}
          columns={dynamicDTRColumns[spButtonIndex === null ? 0 : spButtonIndex]}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 100 },
            },
          }}
          pageSizeOptions={[25, 50, 75, 100]}
          onRowClick={(e) => {
            spButtonIndex === 2 ? gridRowClick(e) : null
          }}
          style={{ cursor: spButtonIndex === 2 ? 'pointer': 'default'}}
          localeText={{ noRowsLabel: `${dtrStatus === 'loading' ? `${dtrStatus?.toUpperCase()}...` : dtrStatus === 'failed' ?  `${dtrError}` : 'Data Loaded - Showing 0 Results'}` }}
          />
        <Modal
          open={open}
          onClose={
            handleClose
          }
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box sx={{ ...style, width:"100%", maxHeight: "80%", overflowY: "auto",  background: "#e9bcb7", backgroundImage: "linear-gradient(315deg, #e9bcb7 0%, #29524a 74%)" }}>
            <SpecificEmployee modalEntranceDelay={modalEntranceDelay} secondOptionModalEntranceDelay={secondOptionModalEntranceDelay} loadingEffect={handleModalEntranceDelay}/>
          </Box>
        </Modal>
      </div>
    </Fragment>
  );
}
