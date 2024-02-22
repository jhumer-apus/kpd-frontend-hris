import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Tooltip,
  Button,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { Typography } from "@mui/material";
import {
  EllipsisVerticalIcon,
  ArrowUpIcon,
  BriefcaseIcon
} from "@heroicons/react/24/outline";
import styles from './custom-styles/home.module.scss';
import CarouselUI from "@/widgets/banner/banner";
import employeeEasyAccessData from "@/data/employee-easy-access-data";
import { UnderDevelopmentMsg } from "./hris-portal/local-components/projects-card";
import { useNavigate } from "react-router-dom";
import PerfectAttendanceTable from "./home-components/perfect-attendance-table";
import MonthYearDropdown from "./home-components/month-year-dropdown";
import dayjs from "dayjs";
import { PERFECTATTENDANCEViewSpecificAction } from "@/store/actions/employee-and-applicants";
import { IMPERFECTATTENDANCEViewSpecificAction } from "@/store/actions/employee-and-applicants";
import AttendanceTable from  "./home-components/perfect-attendance-table"
import { useDispatch, useSelector } from "react-redux";
import { Perfect_Attendace_Filter_Interface } from "@/types/types-employee-and-applicants";
import { RootState } from "@/store/configureStore";
import ExportToCsv from "@/public-components/ExportToCSVButton";
import YearlyReminder from "./YearlyReminder";


export function ChooseDashboard() {
  const EmployeeState = useSelector((state: RootState) => state.employeeAndApplicants);
  const [currentAttendanceTab, setCurrentAttendanceTab] = useState<string>("perfect_attendance");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ filterState, setFilterState ] = useState<Perfect_Attendace_Filter_Interface>({
    month: +(dayjs(new Date()).format('MM')),
    year: +(dayjs(new Date()).format('YYYY'))
  });
  const [ forCSVExtract, setForCSVExtract ] = useState<unknown>([]);

  useEffect(()=>{
    if(filterState.month && filterState.year){
      dispatch(PERFECTATTENDANCEViewSpecificAction(filterState))
      dispatch(IMPERFECTATTENDANCEViewSpecificAction(filterState))
    }
  }, [filterState.month, filterState.year]);

  useEffect(() => {
    dispatch(PERFECTATTENDANCEViewSpecificAction(filterState))
    dispatch(IMPERFECTATTENDANCEViewSpecificAction(filterState))
  }, [currentAttendanceTab])

  useEffect(()=> {
    
    if(currentAttendanceTab == "perfect_attendance") {
      if(Array.isArray(EmployeeState?.PERFECTATTENDANCEViewSpecific?.data)){
        const data = EmployeeState?.PERFECTATTENDANCEViewSpecific?.data?.map((data)=> {
          return ({
            id: data.id,
            Employee_Name: `${data.last_name}, ${data.first_name} ${data.middle_name !== null ? data.middle_name : ''} ${data.suffix !== null? data.suffix : ''}`,
            Department_ID: `${data.department_code !== null ? data.department_code : ''}`, 
            Division_ID: `${data.division_code !== null ? data.division_code : ''}`,
            Position_ID: `${data.position_code !== null ? data.position_code : ''}`,
            Payroll_Group: `${data.payroll_group_code !== null ? data.payroll_group_code : ''}`,
          })
        });
        setForCSVExtract(data) 
      }
    } else {
      if(Array.isArray(EmployeeState?.IMPERFECTATTENDANCEViewSpecific?.data)){
        const data = EmployeeState?.IMPERFECTATTENDANCEViewSpecific?.data?.map((data)=> {
          return ({
            id: data.id,
            Employee_Name: `${data.last_name}, ${data.first_name} ${data.middle_name !== null ? data.middle_name : ''} ${data.suffix !== null? data.suffix : ''}`,
            Department_ID: `${data.department_code !== null ? data.department_code : ''}`, 
            Division_ID: `${data.division_code !== null ? data.division_code : ''}`,
            Position_ID: `${data.position_code !== null ? data.position_code : ''}`,
            Payroll_Group: `${data.payroll_group_code !== null ? data.payroll_group_code : ''}`,
          })
        });
        setForCSVExtract(data) 
      }
    }
    console.log(EmployeeState.IMPERFECTATTENDANCEViewSpecific.data.length)
  }, [EmployeeState.PERFECTATTENDANCEViewSpecific.data.length, EmployeeState.IMPERFECTATTENDANCEViewSpecific.data.length])

  const tabsAttendance = [
    {
      id: "perfect_attendance",
      name: "PERFECT ATTENDANCE",
      additional_details: "Congratulations! (No lates, absent, and leaves)"
    },
    {
      id: "imperfect_attendance",
      name: "IMPERFECT ATTENDANCE"
    }
  ]

  return (
    <div className="mt-12">
      <div className={`${styles.homeWrap} bg-red-10`}>
        <YearlyReminder /> {/* Add this line to include the YearlyReminder component */}
        <Card className={styles.greetingsBar}>
          <CarouselUI className={styles.greetingsBar}/>
        </Card>
        {/* <UnderDevelopmentMsg/> */}
        {/* <Card className={styles.requestsBar} style={{marginTop: '24px', height: '480px', overflow: 'auto'}}>
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 flex items-center justify-between p-7 z-0 mb-5"
          >
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-1">
                Perfect Attendance Attainment 
              </Typography>
              <Typography variant="subtitle1" color="blue-gray" className="mb-1">
                Congratulations! (No lates, absent, and leaves)
              </Typography>
            </div>
            <Menu placement="left-start">
              <MenuHandler>
                <IconButton size="sm" variant="text" color="blue-gray">
                  <EllipsisVerticalIcon
                    strokeWidth={3}
                    fill="currenColor"
                    className="h-6 w-6"
                  />
                </IconButton>
              </MenuHandler>
              <MenuList>
                <MenuItem><ExportToCsv data={forCSVExtract instanceof Array ? forCSVExtract : []} /></MenuItem>
              </MenuList>
            </Menu>
          </CardHeader>
          <MonthYearDropdown filter={filterState} setFilter={setFilterState}/>
          <PerfectAttendanceTable state={forCSVExtract instanceof Array ? forCSVExtract : []} status={EmployeeState.PERFECTATTENDANCEViewSpecific.status} />
        </Card> */}
        <Card className={`${styles.requestsBar} mt-4 overflow-auto h-[50opx]`}>
          <CardBody>

            <Tabs value={currentAttendanceTab}>
              <TabsHeader>
                {tabsAttendance.map(tab => (
                  <Tab 
                    key={tab.id} 
                    value={tab.id}
                    onClick={() => setCurrentAttendanceTab(tab.id)}
                  >
                    {tab.name}
                  </Tab>
                ))}
              </TabsHeader>

              <TabsBody>

                {tabsAttendance.map(tab => (
                    <TabPanel key={tab.id} value={tab.id}>
                      <div className="flex items-center justify-between my-4">
                        <div>
                          <Typography variant="h6" color="blue-gray" className="mb-1">
                            {tab.name}
                          </Typography>
                          {tab.additional_details && 
                            (
                              <Typography variant="subtitle1" color="blue-gray" className="mb-1">
                                {tab.additional_details}
                              </Typography>
                            )
                          }
                        </div>
                        <Menu placement="left-start">
                          <MenuHandler>
                            <IconButton size="sm" variant="text" color="blue-gray">
                              <EllipsisVerticalIcon
                                strokeWidth={3}
                                fill="currenColor"
                                className="h-6 w-6"
                              />
                            </IconButton>
                          </MenuHandler>
                          <MenuList>
                            <MenuItem><ExportToCsv data={forCSVExtract instanceof Array ? forCSVExtract : []} /></MenuItem>
                          </MenuList>
                        </Menu>
                      </div>
                      <MonthYearDropdown filter={filterState} setFilter={setFilterState}/>
                      <AttendanceTable state={forCSVExtract instanceof Array ? forCSVExtract : []} status={currentAttendanceTab == "perfect_attendance"? EmployeeState.PERFECTATTENDANCEViewSpecific.status: EmployeeState.IMPERFECTATTENDANCEViewSpecific.status}/>
                      {/* <PerfectAttendanceTable state={forCSVExtract instanceof Array ? forCSVExtract : []} status={EmployeeState.PERFECTATTENDANCEViewSpecific.status} /> */}
                    </TabPanel>
                  ))}
              </TabsBody>
            </Tabs>
          </CardBody>
        </Card>
        


        <Card className={styles.announcementBar}>
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 p-6"
          >
            <Typography variant="h6" color="blue-gray" className="mb-2">
              EASY ACCESS PANEL
            </Typography>
            <Typography
              variant="subtitle2"
              className="flex items-center gap-1 font-normal text-blue-gray-600"
            >
              <ArrowUpIcon
                strokeWidth={3}
                className="h-3.5 w-3.5 text-green-500"
              />
              For your easy access <strong>convenience</strong>
            </Typography>
          </CardHeader>
          <CardBody className="pt-0 flex flex-wrap justify-around gap-1" >
            {employeeEasyAccessData.map(
              ({ icon, color, title, description, link }, key) => (
                <div key={title} className="relative flex items-start gap-4 py-3">

                  <div style={{position: "relative"}} >
                    <Button variant={"text"} color="indigo" style={{height: "76px", width: "120px", padding: "unset", display: "flex", flexDirection: "column", justifyContent: "space-around", alignItems: "center", background:"rgba(235, 237, 247)" }}>
                    {
                    link === 'development' 
                    ? 
                    <UnderDevelopmentMsg fontSize={8} borderRadius={10}/> 
                    :
                    <div className="absolute w-full h-full" onClick={()=> { navigate(`${link}`) }}></div>
                    }
                    <span style={{background: "transparent"}}>
                        {React.createElement(icon, {
                        className: `!w-5 !h-5 ${color}`,
                        })}
                      </span>
                      <Tooltip key={title} content={description}>
                      <div>
                        <Typography
                          variant="subtitle1"
                          color="gray"
                          className="block font-medium text-start"
                        >
                          {title}
                        </Typography>
                      </div>

                      </Tooltip>

                    </Button>
                  </div>
                </div>
              )
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default ChooseDashboard;
