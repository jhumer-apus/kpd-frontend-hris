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
import { viewAllDtrLogs, viewFilterDtrLogs, viewCutoffDtrSummary, viewMergedDtrLogs, viewFilterMergedDtrLogs } from '@/store/actions/dtr';
import PrintTableButton from './local-components/print-table-button';
import ExportToCsvButton from './local-components/export-to-csv-button';

//LIBRARIES 
import { Select, Option, Input } from "@material-tailwind/react";
import dayjs from 'dayjs';

//COMPONENTS
import FilterDTR from './local-components/FilterDTR';

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
  const currUser = useSelector((state: RootState) => state.auth.employee_detail)
  const { spButtonIndex, spButtonStr, spButtonError, dtrStatus, dtrError, dtrData } = useDtrState();
  const [type, setType] = useState("staticInfo");
  const [exportDtrData, setExportDtrData] = useState<any>([])


  // Specific Employee Modal Form 
  // States: 
  const [open, setOpen] = useState(false);
  const [modalEntranceDelay, setModalEntranceDelay] = useState(false);
  const [secondOptionModalEntranceDelay, setSecondOptionModalEntranceDelay] = useState(false);

  //STATES
  const [filter, setFilter] = useState({
      year: parseInt(dayjs().format("YYYY")),
      month: parseInt(dayjs().format("MM")),
      emp_no: currUser?.user?.role? (currUser?.user?.role < 3? currUser?.emp_no: null): null,
      cutoff_id: null
  })
  
  const [viewType, setViewType] = useState<"logs" | "merged" | "cutoff">('logs')

  function handleOpen(){
    setOpen(true);
  };

  function handleClose(){
    setOpen(false);
    setType("staticInfo");
  };


  useEffect(() => {
    // dispatch(viewFilterDtrLogs({month:1,year:2024}))
    if(spButtonIndex !== null && spButtonIndex === 1 ) {

      // dispatch(viewMergedDtrLogs());
      dispatch(viewFilterMergedDtrLogs(
        {
            cutoff_id: null,
            emp_no: filter.emp_no
        }
    ))
      setViewType('merged')

    } else if (spButtonIndex !== null && spButtonIndex === 2 ) {

      dispatch(viewCutoffDtrSummary(
        {
          emp_no: filter.emp_no
        }
      ));
      
      setViewType('cutoff')

    } else {

      dispatch(viewFilterDtrLogs(
        {
          month:filter.month,
          year:filter.year,
          emp_no:filter.emp_no
        }
      ))
      setViewType('logs')
      // dispatch(viewAllDtrLogs());
    }
  }, [spButtonIndex]);

  useEffect(()=> {

    const exportDtrData = Array.isArray(dtrData)? dtrData.map(dtr => {

      //Filter columns for basic employee only using destructuring
      if((currUser?.rank_code??0) <= 3) {

        return {
          id: dtr.id,
          emp_no: dtr.emp_no,
          flag1_in_out: dtr.flag1_in_out,
          datetime_bio_date: dtr.datetime_bio_date,
          datetime_bio_time: dtr.datetime_bio_time,
          business_date: dtr.business_date,
          duty_in: dtr.duty_in,
          duty_out: dtr.duty_out,
          is_processed: dtr.is_processed
        }

      } 
      return dtr
    }) : []
    console.log(exportDtrData)
    setExportDtrData((curr:any) => exportDtrData)

  },[dtrData])

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



    const role = currUser?.user?.role;


    const isBasicEmployee = role && role == 1
    const isDepartmentManager = role && role == 2

  return (
    <Fragment>
      <div className="my-10 flex flex-wrap justify-between items-start gap-6">
        <div>
        <SplitButton options={viewDTROptions}/>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400"}}>
          <i>{viewDTRDescriptions[spButtonIndex === null ? 0 : spButtonIndex]}</i>
        </Typography>
        </div>
        {isBasicEmployee}
        {(!isBasicEmployee && !isDepartmentManager) &&
          <div className='flex justify-between gap-6'>
            {/* <ExportToCsvButton data={exportDtrData} /> */}
            <ExportToCsvButton data={exportDtrData} />
            {(currUser?.rank_code??0) > 3 && 
              <PrintTableButton printing={printing} setIsPrinting={setIsPrinting}/>
            }
          </div>
        }
      </div>
      <FilterDTR 
        viewType={viewType}
        filter={filter}
        setFilter={setFilter}
      />

      <div style={{ height: `${printing? `${printableArea()}px` : '660px'}`}} id="printable-area">
        <DataGrid
          rows={dtrData ?? []}
          columns={dynamicDTRColumns()[spButtonIndex === null ? 0 : spButtonIndex]}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 100 },
            },
          }}
          pageSizeOptions={[25, 50, 75, 100]}
          // onRowClick={(e) => {
          //   spButtonIndex === 2 ? gridRowClick(e) : null
          // }}
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
