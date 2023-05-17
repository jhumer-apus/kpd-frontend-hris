import React from "react";
import {
  Typography,
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
  Progress,
  Button,
} from "@material-tailwind/react";
import {
  ClockIcon,
  CheckIcon,
  EllipsisVerticalIcon,
  ArrowUpIcon,
  BriefcaseIcon
} from "@heroicons/react/24/outline";
import { EasyAccessCard } from "@/widgets/cards";
import { StatisticsChart } from "@/widgets/charts";
import {
  statisticsCardsData,
  statisticsChartsData,
  projectsTableData,
  ordersOverviewData,
} from "@/data";
import BirthdayCard from "@/widgets/cards/upcoming-birthday-card";
import { celebrantsData, anniversaryData } from "@/data/widgets-data";
import UpcomingAnniversary from "@/widgets/cards/upcoming-anniversary-card";
import styles from './custom-styles/home.module.scss';
import CarouselUI from "@/widgets/banner/banner";
import employeeEasyAccessData from "@/data/employee-easy-access-data";
import filedRequestsData from "@/data/filed-requests-data";



export function ChooseDashboard() {

  return (
    <div className="mt-12">
      {/* <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-1 xl:grid-cols-1">
        {statisticsCardsData.map(({ icon, title, footer, ...rest }) => (
          <EasyAccessCard
            key={title}
            {...rest}
            title={title}
            icon={React.createElement(icon, {
              className: "w-6 h-6 text-white",
            })}
            footer={
              <Typography className="font-normal text-blue-gray-600">
                <strong className={footer.color}>{footer.value}</strong>
                &nbsp;{footer.label}
              </Typography>
            }
          />
        ))}
          <EasyAccessCard
            key={"Employees"}
            // {...rest}
            value={"201 Data"}
            title={"Employees"}
            icon={React.createElement(Avatar, {
              className: "w-6 h-6 text-white",
            })}
            footer={
              <Typography className="font-normal text-blue-gray-600">
                <strong className={"text-green-500"}>{"<"}</strong>
                &nbsp;{"201, Appraisal, etc."}
              </Typography>
            }
          />
      </div>
      <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
        {statisticsChartsData.map((props) => (
          <StatisticsChart
            key={props.title}
            {...props}
            footer={
              <Typography
                variant="small"
                className="flex items-center font-normal text-blue-gray-600"
              >
                <ClockIcon strokeWidth={2} className="h-4 w-4 text-inherit" />
                &nbsp;{props.footer}
              </Typography>
            }
          />
        ))}
      </div> */}
      <div className={styles.homeWrap}>
        <Card className={styles.greetingsBar}>
          {/* <EasyAccessCard
            key={"Employees"}
            // {...rest}
            value={"201 Data"}
            title={"Employees"}
            icon={React.createElement(Avatar, {
              className: "w-6 h-6 text-white",
            })}
            footer={
              <Typography className="font-normal text-blue-gray-600">
                <strong className={"text-green-500"}>{"<"}</strong>
                &nbsp;{"201, Appraisal, etc."}
              </Typography>
            }
          /> */}
          <CarouselUI className={styles.greetingsBar}/>
        </Card>


        <Card className={styles.requestsBar}>
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 flex items-center justify-between p-6"
          >
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-1">
                FILED REQUESTS
              </Typography>
              {/* <Typography
                variant="small"
                className="flex items-center gap-1 font-normal text-blue-gray-600"
              >
                <CheckIcon strokeWidth={3} className="h-4 w-4 text-blue-500" />
                <strong>30 done</strong> this month
              </Typography> */}
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
                <MenuItem>Action</MenuItem>
                <MenuItem>Another Action</MenuItem>
                <MenuItem>Something else here</MenuItem>
              </MenuList>
            </Menu>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
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
                          variant="small"
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
                  ({ img, name, members, budget, completion }, key) => {
                    const className = `py-3 px-5 ${
                      key === projectsTableData.length - 1
                        ? ""
                        : "border-b border-blue-gray-50"
                    }`;

                    return (
                      <tr key={name}>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            <BriefcaseIcon style={{height: "36px", width: "36px"}}/>
                            {/* <Avatar src={<BriefcaseIcon/>} alt={name} size="sm" /> */}
                            <Typography
                              variant="small"
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
                            variant="small"
                            className="text-xs font-medium text-blue-gray-600"
                          >
                            {budget}
                          </Typography>
                        </td>
                        <td className={className}>
                          <div className="w-10/12">
                            <Typography
                              variant="small"
                              className="mb-1 block text-xs font-medium text-blue-gray-600"
                              style={{color: completion?.includes("Approved") ? "darkgreen": completion?.includes("Rejected") ? "maroon" : "orange"}}
                            >
                              {completion}
                            </Typography>
                            {/* <Progress
                              value={completion}
                              variant="gradient"
                              color={completion === 100 ? "green" : "blue"}
                              className="h-1"
                            /> */}
                            
                          </div>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
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
              variant="small"
              className="flex items-center gap-1 font-normal text-blue-gray-600"
            >
              <ArrowUpIcon
                strokeWidth={3}
                className="h-3.5 w-3.5 text-green-500"
              />
              For your easy access <strong>convenience</strong>
            </Typography>
          </CardHeader>
          <CardBody className="pt-0 flex flex-wrap justify-around" >
            {employeeEasyAccessData.map(
              ({ icon, color, title, description }, key) => (
                <div key={title} className="flex items-start gap-4 py-3">
                  {/* <div
                    className={`relative p-1 after:absolute after:-bottom-6 after:left-2/4 after:w-0.5 after:-translate-x-2/4 after:bg-blue-gray-50 after:content-[''] ${
                      key === ordersOverviewData.length - 1
                        ? "after:h-0"
                        : "after:h-4/6"
                    }`}
                  >
                    {React.createElement(icon, {
                      className: `!w-5 !h-5 ${color}`,
                    })}
                  </div> */}

                  <div style={{position: "relative"}} >
                    <Button variant={"text"} color="indigo" style={{height: "76px", width: "120px", padding: "unset", display: "flex", flexDirection: "column", justifyContent: "space-around", alignItems: "center", background:"rgba(235, 237, 247)" }}>
                    {/* background: "linear-gradient(to top right, #3949ab, #5c6bc0)"} */}
                    <span style={{background: "transparent"}}>
                        {React.createElement(icon, {
                        className: `!w-5 !h-5 ${color}`,
                        })}
                      </span>
                      <Tooltip key={title} content={description}>
                      <div>
                        <Typography
                          variant="small"
                          color="gray"
                          className="block font-medium text-start"
                        >
                          {title}
                        </Typography>
                        {/* <Typography
                          as="span"
                          variant="small"
                          className="text-xs font-medium text-blue-gray-500 text-start"
                        >
                          {description}
                        </Typography> */}
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

      {/* <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-1 xl:grid-cols-3">
      <Card>
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 p-6"
          >
            <Typography variant="h6" color="blue-gray" className="mb-2">
              Orders Overview
            </Typography>
            <Typography
              variant="small"
              className="flex items-center gap-1 font-normal text-blue-gray-600"
            >
              <ArrowUpIcon
                strokeWidth={3}
                className="h-3.5 w-3.5 text-green-500"
              />
              <strong>24%</strong> this month
            </Typography>
          </CardHeader>
          <CardBody className="pt-0">
            {ordersOverviewData.map(
              ({ icon, color, title, description }, key) => (
                <div key={title} className="flex items-start gap-4 py-3">
                  <div
                    className={`relative p-1 after:absolute after:-bottom-6 after:left-2/4 after:w-0.5 after:-translate-x-2/4 after:bg-blue-gray-50 after:content-[''] ${
                      key === ordersOverviewData.length - 1
                        ? "after:h-0"
                        : "after:h-4/6"
                    }`}
                  >
                    {React.createElement(icon, {
                      className: `!w-5 !h-5 ${color}`,
                    })}
                  </div>
                  <div>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="block font-medium"
                    >
                      {title}
                    </Typography>
                    <Typography
                      as="span"
                      variant="small"
                      className="text-xs font-medium text-blue-gray-500"
                    >
                      {description}
                    </Typography>
                  </div>
                </div>
              )
            )}
          </CardBody>
        </Card>
        <BirthdayCard celebrants={celebrantsData} />
        <UpcomingAnniversary celebrants={anniversaryData}/>
      </div> */}
    </div>
  );
}

export default ChooseDashboard;
