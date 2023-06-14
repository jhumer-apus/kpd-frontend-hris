import { Fragment, useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridValueGetterParams, GridCellParams } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { getEmployeesList } from '@/store/actions/employees';
import { RootState } from '@/store/reducers';
import { getSpecificEmployeeInfo } from '@/store/actions/employees';
import { Modal, Box, CircularProgress } from '@mui/material';
import { UserProfile } from './forms/AddEmployee';
import { useForm } from 'react-hook-form';
import { GetEmployeesListsType, ViewAllDtrLogsType } from '@/types/types-store';
// import { Button } from '@mui/material';
import {Button} from '@material-tailwind/react';
import { DtrData } from '@/types/types-store';


import {
  Typography,
  // Card,
  // CardHeader,
  // CardBody,
  // Input,
  // Button,
  // Tabs,
  // Tab,
  // TabsHeader,
  // TabsBody,
  // TabPanel,
  // Select,
  // Option,
} from "@material-tailwind/react";
// import {
//   LockClosedIcon,
// } from "@heroicons/react/24/solid";
// import {
//   UserIcon,
//   FingerPrintIcon,
//   AcademicCapIcon,
//   TvIcon,
//   UserGroupIcon,
//   WindowIcon,
//   ShieldCheckIcon,
//   LockClosedIcon as LockClosedOutline,
//   XCircleIcon,
//   CheckCircleIcon,
//   LockOpenIcon,
//   MapIcon,
//   UserPlusIcon,
//   XMarkIcon,
//   TagIcon,
//   ArrowUpTrayIcon,
// } from "@heroicons/react/24/outline";
import { SpecificEmployee } from './forms/SpecificEmployee';


// import {Buttonicon as Button2} from '@mui/material/Button';
import SplitButton from '@/widgets/split-button/split-button';
import { viewDTROptions, viewDTRDescriptions } from '@/data/pages-data/dtr-data/view-dtr-reports';
import useDtrState from '@/custom-hooks/use-dtr-state';
import { dynamicDTRColumns } from '@/data/pages-data/dtr-data/view-dtr-reports';
import { viewAllDtrLogs, viewCutoffDtrSummary, viewMergedDtrLogs } from '@/store/actions/dtr';

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
  const dispatch = useDispatch();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<GetEmployeesListsType>();
  const { employees_list, specific_employee_info } = useSelector((state: RootState) => state.employees);
  const { spButtonIndex, spButtonStr, spButtonError, dtrStatus, dtrError, dtrData } = useDtrState();
  const [type, setType] = useState("staticInfo");

  console.log(dtrStatus, "testing?")

  // Specific Employee Modal Form 
  // States: 
  const [open, setOpen] = useState(false);
  const [modalEntranceDelay, setModalEntranceDelay] = useState(false);
  const [secondOptionModalEntranceDelay, setSecondOptionModalEntranceDelay] = useState(false);
  const [editMode, setEditMode] = useState(false);
  function handleOpen(){
    setOpen(true);
  };

  function handleClose(){
    setOpen(false);
    setType("staticInfo");
  };

  // Add Employee Modal Form
  // States:
  const [open2, setOpen2] = useState(false);
  const [modalEntranceDelay2, setModalEntranceDelay2] = useState(false);
  const [secondOptionModalEntranceDelay2, setSecondOptionModalEntranceDelay2] = useState(false);
  function handleOpen2(){
    setOpen2(true);
  };

  function handleClose2(){
    setOpen2(false);
  };

  // Import Employee Modal Form
  // States:
  const [open3, setOpen3] = useState(false);
  const [modalEntranceDelay3, setModalEntranceDelay3] = useState(false);
  const [secondOptionModalEntranceDelay3, setSecondOptionModalEntranceDelay3] = useState(false);
  function handleOpen3(){
    setOpen3(true);
  };

  function handleClose3(){
    setOpen3(false);
  };

  useEffect(() => {
    dispatch(getEmployeesList());
  }, []);

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

  function dispatchSpecificEmployeeDTRSummary(employee_number: number){
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

  const data = dtrData;
  function convertToCSV(data: DtrData) {
    const replacer = (key: string, value: any) => value === null ? '' : value;
    if(data){
      const header = Object.keys(data[0]);
      const csv = data.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
      // console.log(csv, "step1", csv.unshift(header.join(',')), "step2", csv.join('\r\n'), "step3");
      csv.unshift(header.join(','));
      return csv.join('\r\n');
    }else {
      window.alert("No Data is Found")
    }
  };
  function downloadCSV(csv: string, filename: string) {
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const handleDownload = () => {
    if(!data){
      return; //Todo: Error Handling 
    }
    const csv = convertToCSV(data);
    if(csv){
      downloadCSV(csv, `${window.prompt("Enter the file name", "default_name")}`);
    }
  };

  const [printing, setIsPrinting] = useState(false);
  
  function handlePrint(){
    setIsPrinting(true)
    setTimeout(()=> {
      window.print();
      setIsPrinting(false)
    }, 1500)
  };

  function printableArea(){
    // Calculate px; solves printable area bug, Do not easily modify
    if(dtrData?.length && dtrData?.length >= 11){
      return dtrData?.length / 25 * 1450
    } else {
      return 700
    }
  }

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
        <Button 
          className='gap-2'
          color='indigo'
          variant='gradient'
          onClick={handleDownload}>
        Export / Download as CSV
        </Button>
        <Button variant="gradient" color="indigo" style={{marginRight: "6px"}} onClick={handlePrint}>Print Table</Button>
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
        //   checkboxSelection
          pageSizeOptions={[25, 50, 75, 100]}
          // checkboxSelection
          onRowClick={(e) => {
            handleOpen()
            setModalEntranceDelay(true)
            setSecondOptionModalEntranceDelay(true)
            dispatchSpecificEmployeeInfo(e.row?.emp_no)
            // console.log(e, dispatchSpecificEmployeeInfo(e.row?.emp_no))
          }}
          style={{ cursor: 'pointer'}}
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
