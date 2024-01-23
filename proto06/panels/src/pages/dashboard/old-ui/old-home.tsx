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
  Avatar,
  Tooltip,
  Button,
} from "@material-tailwind/react";
import { Typography } from "@mui/material";
import {
  EllipsisVerticalIcon,
  ArrowUpIcon,
  BriefcaseIcon
} from "@heroicons/react/24/outline";
import {
  projectsTableData,
} from "@/data";
import styles from './custom-styles/home.module.scss';
import CarouselUI from "@/widgets/banner/banner";
import employeeEasyAccessData from "@/data/employee-easy-access-data";
import filedRequestsData from "@/data/filed-requests-data";
import { UnderDevelopmentMsg } from "./hris-portal/local-components/projects-card";
import { useNavigate } from "react-router-dom";
import PerfectAttendanceTable from "./home-components/perfect-attendance-table";
import MonthYearDropdown from "./home-components/month-year-dropdown";
import dayjs from "dayjs";
import { PERFECTATTENDANCEViewSpecificAction } from "@/store/actions/employee-and-applicants";
import { useDispatch, useSelector } from "react-redux";
import { Perfect_Attendace_Filter_Interface } from "@/types/types-employee-and-applicants";
import { RootState } from "@/store/configureStore";

// NOTE: THIS IS THE OLD "home.tsx" <Not Being Used, can delete if no use> 

export function ChooseDashboard() {
  const EmployeeState = useSelector((state: RootState) => state.employeeAndApplicants);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ filter, setFilter ] = useState<Perfect_Attendace_Filter_Interface>({
    month: +(dayjs(new Date()).format('MM')),
    year: +(dayjs(new Date()).format('YYYY'))
  });

  useEffect(()=>{
    if(filter.month && filter.year){
      dispatch(PERFECTATTENDANCEViewSpecificAction(filter))
    }
  }, [filter.month, filter.year]);

  return (
    <div className="mt-12">
      <div className={styles.homeWrap}>
        <Card className={styles.greetingsBar}>
          <CarouselUI className={styles.greetingsBar}/>
        </Card>
        <Card className={styles.requestsBar} style={{marginTop: '24px', height: '480px'}}>
          {/* <UnderDevelopmentMsg/> */}
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 flex items-center justify-between p-6 z-50"
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
                <MenuItem>Extract as CSV</MenuItem>
              </MenuList>
            </Menu>
          </CardHeader>
          {/* <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["File-Type", "Approvers", "Date", "Status"].map(
                    (el) => (
                      <th
                        key={el}
                        className="border-b border-blue-gray-50 py-3 px-6 text-left"
                      >
                        <Typography
                          variant="subtitle2"
                          className="text-[11px] font-medium uppercase text-blue-gray-400"
                        >
                          {el}
                        </Typography>
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {filedRequestsData.map(
                  ({ img, name, members, month, completion, icon }, key) => {
                    const className = `py-3 px-5 ${
                      key === projectsTableData.length - 1
                        ? ""
                        : "border-b border-blue-gray-50"
                    }`;

                    return (
                      <tr key={name}>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            {icon}
                            <Typography
                              variant="subtitle1"
                              color="blue-gray"
                              className="font-bold"
                            >
                              {name}
                            </Typography>
                          </div>
                        </td>
                        <td className={className}>
                          {members.map(({ img, name }, key) => (
                            <Tooltip key={name} content={name}>
                              <Avatar
                                src={img}
                                alt={name}
                                size="xs"
                                variant="circular"
                                className={`cursor-pointer border-2 border-white ${
                                  key === 0 ? "" : "-ml-2.5"
                                }`}
                              />
                            </Tooltip>
                          ))}
                        </td>
                        <td className={className}>
                          <Typography
                            variant="subtitle2"
                            className="text-xs font-medium text-blue-gray-600"
                          >
                            {month}
                          </Typography>
                        </td>
                        <td className={className}>
                          <div className="w-10/12">
                            <Typography
                              variant="subtitle2"
                              className="mb-1 block text-xs font-medium text-blue-gray-600"
                              style={{color: completion?.includes("Approved") ? "darkgreen": completion?.includes("Rejected") ? "maroon" : "orange"}}
                            >
                              {completion}
                            </Typography>
                            
                          </div>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </CardBody> */}
          <MonthYearDropdown/>
          <PerfectAttendanceTable/>
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
