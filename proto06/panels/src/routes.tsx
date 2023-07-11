import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  BellIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
  HeartIcon,
  DocumentIcon,
  SpeakerWaveIcon,
  QuestionMarkCircleIcon
} from "@heroicons/react/24/solid";
import SummarizeIcon from '@mui/icons-material/Summarize';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import MergeIcon from '@mui/icons-material/Merge';
import TableViewIcon from '@mui/icons-material/TableView';
import HRISDashboard from "./pages/dashboard/hris-portal/hrisPortal";
import AdminPortal from "./pages/dashboard/admin-portal/adminPortal";
import DataTable from "./pages/employee/Employee201";
import { SignIn, SignUp } from "@/pages/auth";
import { IRoute } from "./types";
import ViewDtrReports from "./pages/dtr/view-dtr-reports/view-dtr-reports";
import UploadDtrLogs from "./pages/dtr/upload-dtr-logs/upload-dtr-logs";
import MergeDtrLogs from "./pages/dtr/merge-dtr-logs/merge-dtr-logs";
import CreateSummaryPage from "./pages/dtr/create-summary/create-summary";
import ViewPayroll from "./pages/payroll/view-payroll/view-payroll";
import ProcessPayrollPage from "./pages/payroll/process-payroll/process-payroll";
import ApprovalOutlinedIcon from '@mui/icons-material/ApprovalOutlined';
import AlarmOnOutlinedIcon from '@mui/icons-material/AlarmOnOutlined';
import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined';
import AppsOutageOutlinedIcon from '@mui/icons-material/AppsOutageOutlined';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import SurfingOutlinedIcon from '@mui/icons-material/SurfingOutlined';
import HolidaysPage from "./pages/procedurals/holidays/holidays-page";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes: Array<IRoute> = [
  {
    id: 10000,
    layout: "home",
    pages: [
      {
        id: 11000,
        icon: null,
        name: "Dashboards",
        path: "/Dashboards",
        element: <strong style={{height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px'}} className="text-red-500 py-1 px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">YOU SHALL NOT PASS!!</strong>,
        hasSubItems: true,
        subItems: [
          {
            id: 11100,
            icon: <HomeIcon {...icon} />,
            name: "HRIS Dashboard",
            path: "/Dashboards/HRIS-Dashboard",
            element: <HRISDashboard />,
            hasSubItems: false,
          },
          {
            id: 11200,
            icon: <HomeIcon {...icon} />,
            name: "Admin Portal",
            path: "/Dashboards/Admin-Dashboard",
            element: <AdminPortal/>,
            hasSubItems: false,
          },
          // {
          //   id: 11300,
          //   icon: <HomeIcon {...icon} />,
          //   name: "Employee Portal",
          //   path: "/Dashboards/Employee-Dashboard",
          //   element: <strong style={{height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px'}} className="text-red-500 py-1 px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">ADMIN DASHBOARD ELEMENTS UNDER DEVELOPMENT</strong>,
          //   hasSubItems: false,
          // },
        ]
      },
      {
        id: 12000,
        icon: null,
        name: "Employee",
        path: "/employee",
        element: <strong style={{fontSize: '24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="text-orange-500 py-1 px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">EMPLOYEE ELEMENTS UNDER DEVELOPMENT</strong>,
        hasSubItems: true,
        subItems: [
          {
            id: 12100,
            icon: <UserCircleIcon {...icon} />,
            name: "201 Files",
            path: "/employee/201-files",
            element: <DataTable/>, 
            hasSubItems: false,
          },
          {
            id: 12200,
            icon: <UserCircleIcon {...icon} />,
            name: "Appraisal",
            path: "/employee/appraisal",
            element:<strong style={{fontSize: '24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="text-green-500 py-1 px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">APPRAISAL PAGE ELEMENTS UNDER DEVELOPMENT</strong>,
            hasSubItems: false,
          },
        ]
      },
      {
        id: 13000,
        icon: null,
        name: "Procedurals",
        path: "/procedurals",
        element: <strong style={{fontSize: '24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="text-orange-500 py-1 px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">EMPLOYEE ELEMENTS UNDER DEVELOPMENT</strong>,
        hasSubItems: true,
        subItems: [
          {
            id: 13100,
            icon: <SurfingOutlinedIcon {...icon}/>,
            name: "Holidays",
            path: "/procedurals/holidays",
            element: <HolidaysPage date={new Date()}/>, 
            hasSubItems: false,
          },
          {
            id: 13200,
            icon: <ApprovalOutlinedIcon  {...icon} />,
            name: "OBT",
            path: "/procedurals/obt",
            element:<strong style={{fontSize: '24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="text-green-500 py-1 px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">APPRAISAL PAGE ELEMENTS UNDER DEVELOPMENT</strong>,
            hasSubItems: false,
          },
          {
            id: 13300,
            icon: <AlarmOnOutlinedIcon  {...icon} />,
            name: "Overtime",
            path: "/procedurals/overtime",
            element:<strong style={{fontSize: '24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="text-green-500 py-1 px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">APPRAISAL PAGE ELEMENTS UNDER DEVELOPMENT</strong>,
            hasSubItems: false,
          },
          {
            id: 13400,
            icon: <AppRegistrationOutlinedIcon {...icon} />,
            name: "Leaves",
            path: "/procedurals/leaves",
            element:<strong style={{fontSize: '24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="text-green-500 py-1 px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">APPRAISAL PAGE ELEMENTS UNDER DEVELOPMENT</strong>,
            hasSubItems: false,
          },
          {
            id: 13500,
            icon: <AppsOutageOutlinedIcon {...icon} />,
            name: "Leave Credits",
            path: "/procedurals/leave-credits",
            element:<strong style={{fontSize: '24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="text-green-500 py-1 px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">APPRAISAL PAGE ELEMENTS UNDER DEVELOPMENT</strong>,
            hasSubItems: false,
          },
          {
            id: 13600,
            icon: <AppsOutlinedIcon {...icon} />,
            name: "Leave Types",
            path: "/procedurals/leave-types",
            element:<strong style={{fontSize: '24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="text-green-500 py-1 px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">APPRAISAL PAGE ELEMENTS UNDER DEVELOPMENT</strong>,
            hasSubItems: false,
          },
          {
            id: 13700,
            icon: <AssignmentIndOutlinedIcon {...icon} />,
            name: "Cutoff Periods",
            path: "/procedurals/cutoff-periods",
            element:<strong style={{fontSize: '24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="text-green-500 py-1 px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">APPRAISAL PAGE ELEMENTS UNDER DEVELOPMENT</strong>,
            hasSubItems: false,
          },
          {
            id: 13800,
            icon: <BadgeOutlinedIcon {...icon} />,
            name: "Unaccounted Attendances",
            path: "/procedurals/unaccounted-attendances",
            element:<strong style={{fontSize: '24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="text-green-500 py-1 px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">APPRAISAL PAGE ELEMENTS UNDER DEVELOPMENT</strong>,
            hasSubItems: false,
          },
          {
            id: 13900,
            icon: <CalendarTodayOutlinedIcon {...icon} />,
            name: "Schedule Shifts",
            path: "/procedurals/schedule-shifts",
            element:<strong style={{fontSize: '24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="text-green-500 py-1 px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">APPRAISAL PAGE ELEMENTS UNDER DEVELOPMENT</strong>,
            hasSubItems: false,
          },
          {
            id: 13110,
            icon: <CalendarMonthOutlinedIcon {...icon} />,
            name: "Schedule Dailies",
            path: "/procedurals/schedule-dailies",
            element:<strong style={{fontSize: '24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="text-green-500 py-1 px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">APPRAISAL PAGE ELEMENTS UNDER DEVELOPMENT</strong>,
            hasSubItems: false,
          },
        ]
      },
      {
        id: 14000,
        icon: null,
        name: "DTR",
        path: "/DTR",
        element: <strong style={{fontSize: '24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="text-pink-500 py-1 px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">DTR PAGE ELEMENTS UNDER DEVELOPMENT</strong>,
        hasSubItems: true,
        subItems: [
          {
            id: 14100,
            icon: <SummarizeIcon {...icon} />,
            name: "View DTR Reports",
            path: "/DTR/View-DTR",
            element: <ViewDtrReports/>,
            hasSubItems: false,
          },
          {
            id: 14200,
            icon: <UploadFileIcon {...icon} />,
            name: "Upload DTR Logs",
            path: "/DTR/upload-logs",
            element: <UploadDtrLogs/>,
            hasSubItems: false,
          },
          {
            id: 14300,
            icon: <MergeIcon {...icon} />,
            name: "Merge DTR Logs",
            path: "/DTR/Merge-DTR",
            element: <MergeDtrLogs/>,
            hasSubItems: false,
          },
          {
            id: 14400,
            icon: <TableViewIcon {...icon} />,
            name: "Create DTR Summary",
            path: "/DTR/create-summary",
            element: <CreateSummaryPage/>,
            hasSubItems: false,
          },
          // {
          //   id: 14500,
          //   icon: <TableCellsIcon {...icon} />,
          //   name: "Leaves",
          //   path: "/DTR/leaves",
          //   element: <strong style={{fontSize: '24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="text-yellow-800 py-1 px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">LEAVES FILING PAGE ELEMENTS UNDER DEVELOPMENT</strong>,
          //   hasSubItems: false,
          // },
          // {
          //   id: 14600,
          //   icon: <TableCellsIcon {...icon} />,
          //   name: "Overtime",
          //   path: "/DTR/overtime",
          //   element: <strong style={{fontSize: '24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="text-yellow-800 py-1 px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">OVERTIME FILING PAGE ELEMENTS UNDER DEVELOPMENT</strong>,
          //   hasSubItems: false,
          // },
          // {
          //   id: 14700,
          //   icon: <TableCellsIcon {...icon} />,
          //   name: "Official Business Trip",
          //   path: "/DTR/offical-business-trip",
          //   element: <strong style={{fontSize: '24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="text-yellow-800 py-1 h-full px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">OFFICIAL BUSINESS TRIP FILING PAGE ELEMENTS UNDER DEVELOPMENT</strong>,
          //   hasSubItems: false,
          // },
          // {
          //   id: 14800,
          //   icon: <TableCellsIcon {...icon} />,
          //   name: "U.A",
          //   path: "/DTR/unaccounted-attendance",
          //   element: <strong style={{fontSize: '24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="text-yellow-800 py-1 h-full px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">UNACCOUNTED ATTENDANCE FILING PAGE ELEMENTS UNDER DEVELOPMENT</strong>,
          //   hasSubItems: false,
          // },
          // {
          //   id: 14900,
          //   icon: <TableCellsIcon {...icon} />,
          //   name: "Maternity",
          //   path: "/DTR/maternity",
          //   element: <strong style={{fontSize: '24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="text-yellow-800 py-1 h-full px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">MATERNITY FILING PAGE ELEMENTS UNDER DEVELOPMENT</strong>,
          //   hasSubItems: false,
          // },
        ]
      },
      {
        id: 15000,
        icon: null,
        name: "Reports",
        path: "/reports",
        element: <strong style={{fontSize: '24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="text-yellow-800 py-1 h-full px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">REPORTS PAGE ELEMENTS UNDER DEVELOPMENT</strong>,
        hasSubItems: false,
      },
      {
        id: 16000,
        icon: null,
        name: "Forms",
        path: "/forms",
        element: <strong style={{fontSize: '24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="text-yellow-800 py-1 h-full px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">FORMS PRINTING PAGE ELEMENTS UNDER DEVELOPMENT</strong>,
        hasSubItems: true,
        subItems: [
          {
            id: 16100,
            icon: <TableCellsIcon {...icon} />,
            name: "COE",
            path: "/forms/COE",
            element: <strong style={{fontSize: '24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="text-yellow-800 py-1 h-full px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">CERTIFICATE OF EMPLOYMENT FILING AND PRINTING PAGE ELEMENTS UNDER DEVELOPMENT</strong>,
            hasSubItems: false,
          },
        ]
      },
      {
        id: 17000,
        icon: null,
        name: "Payroll",
        path: "/payroll",
        element: null,
        hasSubItems: true,
        subItems: [
          {
            id: 17100,
            icon: <DocumentIcon {...icon} />,
            name: "View Payroll",
            path: "/payroll/view-payroll",
            element: <ViewPayroll/>,
            hasSubItems: false,
          },
          {
            id: 17200,
            icon: <DocumentIcon {...icon} />,
            name: "Process Payroll",
            path: "/payroll/process-payroll",
            element: <ProcessPayrollPage/>,
            hasSubItems: false,
          },
          // {
          //   id: 17300,
          //   icon: <DocumentIcon {...icon} />,
          //   name: "Generate Payslip",
          //   path: "/payroll/generate-payslip",
          //   element: <strong style={{fontSize: '24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="text-yellow-800 py-1 h-full px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">PAYROLL REGISTER PAGE UX UI ELEMENTS UNDER DEVELOPMENT</strong>,
          //   hasSubItems: false,
          // },
          // {
          //   id: 17400,
          //   icon: <DocumentIcon {...icon} />,
          //   name: "Payroll Register",
          //   path: "/payroll/payroll-register",
          //   element: <strong style={{fontSize: '24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="text-yellow-800 py-1 h-full px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">PAYROLL REGISTER PAGE UX UI ELEMENTS UNDER DEVELOPMENT</strong>,
          //   hasSubItems: false,
          // },
          // {
          //   id: 17500,
          //   icon: <DocumentIcon {...icon} />,
          //   name: "Print Payslip",
          //   path: "/payroll/print-payslip",
          //   element: <strong style={{fontSize: '24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="text-yellow-800 py-1 h-full px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">PRINT PAYSLIP PAGE UX UI ELEMENTS UNDER DEVELOPMENT</strong>,
          //   hasSubItems: false,
          // },
          // {
          //   id: 17600,
          //   icon: <DocumentIcon {...icon} />,
          //   name: "Bonus",
          //   path: "/payroll/bonus",
          //   element: <strong style={{fontSize: '24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="text-yellow-800 py-1 h-full px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">BONUS INFORMATION PAGE UX UI ELEMENTS UNDER DEVELOPMENT</strong>,
          //   hasSubItems: false,
          // },
          // {
          //   id: 17700,
          //   icon: <DocumentIcon {...icon} />,
          //   name: "13th Month",
          //   path: "/payroll/13th-month",
          //   element: <strong style={{fontSize: '24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="text-yellow-800 py-1 h-full px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">13TH MONTH PAGE UX UI ELEMENTS UNDER DEVELOPMENT</strong>,
          //   hasSubItems: false,
          // },
          // {
          //   id: 17800,
          //   icon: <DocumentIcon {...icon} />,
          //   name: "Compensation",
          //   path: "/payroll/compensation",
          //   element: <strong style={{fontSize: '24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="text-yellow-800 py-1 h-full px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">COMPENSATIONS PAGE UX UI ELEMENTS UNDER DEVELOPMENT</strong>,
          //   hasSubItems: false,
          // },
          // {
          //   id: 17900,
          //   icon: <DocumentIcon {...icon} />,
          //   name: "Adjustment Others",
          //   path: "/payroll/adjustment-others",
          //   element: <strong style={{fontSize: '24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="text-yellow-800 py-1 h-full px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">ADJUSTMENTS PAGE UX UI ELEMENTS UNDER DEVELOPMENT</strong>,
          //   hasSubItems: false,
          // },
          // {
          //   id: 17100,
          //   icon: <DocumentIcon {...icon} />,
          //   name: "Tax Refund",
          //   path: "/payroll/tax-refund",
          //   element: <strong style={{fontSize: '24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="text-yellow-800 py-1 h-full px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">TAX REFUND PAGE UX UI ELEMENTS UNDER DEVELOPMENT</strong>,
          //   hasSubItems: false,
          // },
          // {
          //   id: 17110,
          //   icon: <DocumentIcon {...icon} />,
          //   name: "Government Deduction",
          //   path: "/payroll/government-deduction",
          //   element: <strong style={{fontSize: '24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="text-yellow-800 py-1 h-full px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">GOVERNMENT DEDUCTION PAGE UX UI ELEMENTS UNDER DEVELOPMENT</strong>,
          //   hasSubItems: false,
          // },
          // {
          //   id: 17120,
          //   icon: <DocumentIcon {...icon} />,
          //   name: "Other Deduction",
          //   path: "/payroll/other-deduction",
          //   element: <strong style={{fontSize: '24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="text-yellow-800 py-1 h-full px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">OTHER DEDUCTIONS PAGE UX UI ELEMENTS UNDER DEVELOPMENT</strong>,
          //   hasSubItems: false,
          // },
          // {
          //   id: 17130,
          //   icon: <DocumentIcon {...icon} />,
          //   name: "SSS Loan",
          //   path: "/payroll/sss-loan",
          //   element: <strong style={{fontSize: '24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="text-yellow-800 py-1 h-full px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">SSS LOAN PAGE UX UI ELEMENTS UNDER DEVELOPMENT</strong>,
          //   hasSubItems: false,
          // },
          // {
          //   id: 17140,
          //   icon: <DocumentIcon {...icon} />,
          //   name: "Payroll Summary",
          //   path: "/payroll/payroll-summary",
          //   element: <strong style={{fontSize: '24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="text-yellow-800 py-1 h-full px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">PAYROLL SUMMARY PAGE UX UI ELEMENTS UNDER DEVELOPMENT</strong>,
          //   hasSubItems: false,
          // },
          // {
          //   id: 17150,
          //   icon: <TableCellsIcon {...icon} />,
          //   name: "Net Pay Bank Summary",
          //   path: "/payroll/net-pay-bank-summary",
          //   element: <strong style={{fontSize: '24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="text-yellow-800 py-1 h-full px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">NET PAY BANK SUMMARY PAGE UX UI ELEMENTS UNDER DEVELOPMENT</strong>,
          //   hasSubItems: false,
          // },
          // {
          //   id: 17160,
          //   icon: <TableCellsIcon {...icon} />,
          //   name: "Allowance Summary",
          //   path: "/payroll/allowance-summary",
          //   element: <strong style={{fontSize: '24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="text-yellow-800 py-1 h-full px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">ALLOWANCE SUMMARY PAGE UX UI ELEMENTS UNDER DEVELOPMENT</strong>,
          //   hasSubItems: false,
          // },
          // {
          //   id: 17170,
          //   icon: <TableCellsIcon {...icon} />,
          //   name: "Alpha List",
          //   path: "/payroll/alpha-list",
          //   element: <strong style={{fontSize: '24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="text-yellow-800 py-1 h-full px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">ALPHA LIST PAGE UX UI ELEMENTS UNDER DEVELOPMENT</strong>,
          //   hasSubItems: false,
          // },
        ]
      },
      {
        id: 18000,
        icon: null,
        name: "Announcement",
        path: "/announcements",
        element: <strong style={{fontSize: '24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="text-yellow-800 py-1 h-full px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">ANNOUNCEMENT PAGE UX UI ELEMENTS UNDER DEVELOPMENT</strong>,
        hasSubItems: true,
        subItems: [
          {
            id: 18100,
            icon: <SpeakerWaveIcon {...icon} />,
            name: "Post Announcements",
            path: "/announcements/post-announcements",
            element: <strong style={{fontSize: '24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="text-yellow-800 py-1 h-full px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">POST ANNOUNCEMENT PAGE UX UI ELEMENTS UNDER DEVELOPMENT</strong>,
            hasSubItems: false,
          },
        ]
      },
      {
        id: 18200,
        icon: null,
        name: "Help",
        path: "/help",
        element: <strong style={{fontSize: '24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="text-yellow-800 py-1 h-full px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">HELP PAGE UX UI ELEMENTS UNDER DEVELOPMENT</strong>,
        hasSubItems: false,
      },
    ],
  },
  {
    // title: "auth pages",
    id: 9000,
    layout: "auth",
    pages: [
      {
        id: 9100,
        icon: <ArrowRightOnRectangleIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
        hasSubItems: false,
      },
      {
        id: 9200,
        icon: <UserPlusIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
        hasSubItems: false,
      },
    ],
  },
];

export default routes;
