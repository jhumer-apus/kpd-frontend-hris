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
import PunchClockOutlinedIcon from '@mui/icons-material/PunchClockOutlined';
import SummarizeIcon from '@mui/icons-material/Summarize';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import MergeIcon from '@mui/icons-material/Merge';
import TableViewIcon from '@mui/icons-material/TableView';
import { ChooseDashboard, Profile, Tables, Notifications } from "@/pages";
import HRISDashboard from "./pages/dashboard/hris-portal/hrisPortal";
import AdminPortal from "./pages/dashboard/admin-portal/adminPortal";
import DataTable from "./pages/employee/Employee201";
import { SignIn, SignUp } from "@/pages/auth";
import { IRoute } from "./types";
import ViewDtrReports from "./pages/dtr/view-dtr-reports/view-dtr-reports";
// import Timekeeping from "./pages/dtr/timekeeping/Timekeeping";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes: Array<IRoute> = [
  {
    id: 1000,
    layout: "home",
    pages: [
      {
        id: 1100,
        icon: <HomeIcon {...icon} />,
        name: "Dashboards",
        path: "/Dashboards",
        element: <strong style={{height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px'}} className="text-red-500 py-1 px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">YOU SHALL NOT PASS!!</strong>,
        hasSubItems: true,
        subItems: [
          {
            id: 1110,
            icon: <HomeIcon {...icon} />,
            name: "HRIS Dashboard",
            path: "/Dashboards/HRIS-Dashboard",
            element: <HRISDashboard />,
            hasSubItems: false,
          },
          {
            id: 1120,
            icon: <HomeIcon {...icon} />,
            name: "Admin Portal",
            path: "/Dashboards/Admin-Dashboard",
            element: <AdminPortal/>,
            hasSubItems: false,
          },
          // {
          //   id: 1130,
          //   icon: <HomeIcon {...icon} />,
          //   name: "Employee Portal",
          //   path: "/Dashboards/Employee-Dashboard",
          //   element: <strong style={{height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px'}} className="text-red-500 py-1 px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">ADMIN DASHBOARD ELEMENTS UNDER DEVELOPMENT</strong>,
          //   hasSubItems: false,
          // },
        ]
      },
      {
        id: 1200,
        icon: <UserCircleIcon {...icon} />,
        name: "Employee",
        path: "/employee",
        element: <strong style={{fontSize: '24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="text-orange-500 py-1 px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">EMPLOYEE ELEMENTS UNDER DEVELOPMENT</strong>,
        hasSubItems: true,
        subItems: [
          {
            id: 1210,
            icon: <UserCircleIcon {...icon} />,
            name: "201 Files",
            path: "/employee/201-files",
            element: <DataTable/>, 
            hasSubItems: false,
          },
          {
            id: 1220,
            icon: <UserCircleIcon {...icon} />,
            name: "Appraisal",
            path: "/employee/appraisal",
            element:<strong style={{fontSize: '24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="text-green-500 py-1 px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">APPRAISAL PAGE ELEMENTS UNDER DEVELOPMENT</strong>,
            hasSubItems: false,
          },
        ]
      },
      {
        id: 1300,
        icon: <PunchClockOutlinedIcon {...icon} />,
        name: "DTR",
        path: "/DTR",
        element: <strong style={{fontSize: '24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="text-pink-500 py-1 px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">DTR PAGE ELEMENTS UNDER DEVELOPMENT</strong>,
        hasSubItems: true,
        subItems: [
          {
            id: 1310,
            icon: <SummarizeIcon {...icon} />,
            name: "View DTR Reports",
            path: "/DTR/View-DTR",
            element: <ViewDtrReports/>,
            hasSubItems: false,
          },
          {
            id: 1320,
            icon: <UploadFileIcon {...icon} />,
            name: "Upload DTR Logs",
            path: "/DTR/upload-logs",
            element: <div>Coming soon</div>,
            hasSubItems: false,
          },
          {
            id: 1330,
            icon: <MergeIcon {...icon} />,
            name: "Merge DTR Logs",
            path: "/DTR/Merge-DTR",
            element: <div>Coming Soon</div>,
            hasSubItems: false,
          },
          {
            id: 1340,
            icon: <TableViewIcon {...icon} />,
            name: "Create DTR Summary",
            path: "/DTR/create-summary",
            element: <div>Coming Soon</div>,
            hasSubItems: false,
          },
          // {
          //   id: 1350,
          //   icon: <TableCellsIcon {...icon} />,
          //   name: "Leaves",
          //   path: "/DTR/leaves",
          //   element: <strong style={{fontSize: '24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="text-yellow-800 py-1 px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">LEAVES FILING PAGE ELEMENTS UNDER DEVELOPMENT</strong>,
          //   hasSubItems: false,
          // },
          // {
          //   id: 1360,
          //   icon: <TableCellsIcon {...icon} />,
          //   name: "Overtime",
          //   path: "/DTR/overtime",
          //   element: <strong style={{fontSize: '24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="text-yellow-800 py-1 px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">OVERTIME FILING PAGE ELEMENTS UNDER DEVELOPMENT</strong>,
          //   hasSubItems: false,
          // },
          // {
          //   id: 1370,
          //   icon: <TableCellsIcon {...icon} />,
          //   name: "Official Business Trip",
          //   path: "/DTR/offical-business-trip",
          //   element: <strong style={{fontSize: '24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="text-yellow-800 py-1 h-full px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">OFFICIAL BUSINESS TRIP FILING PAGE ELEMENTS UNDER DEVELOPMENT</strong>,
          //   hasSubItems: false,
          // },
          // {
          //   id: 1380,
          //   icon: <TableCellsIcon {...icon} />,
          //   name: "U.A",
          //   path: "/DTR/unaccounted-attendance",
          //   element: <strong style={{fontSize: '24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="text-yellow-800 py-1 h-full px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">UNACCOUNTED ATTENDANCE FILING PAGE ELEMENTS UNDER DEVELOPMENT</strong>,
          //   hasSubItems: false,
          // },
          // {
          //   id: 1390,
          //   icon: <TableCellsIcon {...icon} />,
          //   name: "Maternity",
          //   path: "/DTR/maternity",
          //   element: <strong style={{fontSize: '24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="text-yellow-800 py-1 h-full px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">MATERNITY FILING PAGE ELEMENTS UNDER DEVELOPMENT</strong>,
          //   hasSubItems: false,
          // },
        ]
      },
      {
        id: 1400,
        icon: <BellIcon {...icon} />,
        name: "Reports",
        path: "/reports",
        element: <strong style={{fontSize: '24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="text-yellow-800 py-1 h-full px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">REPORTS PAGE ELEMENTS UNDER DEVELOPMENT</strong>,
        hasSubItems: false,
      },
      {
        id: 1500,
        icon: <TableCellsIcon {...icon} />,
        name: "Forms",
        path: "/forms",
        element: <strong style={{fontSize: '24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="text-yellow-800 py-1 h-full px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">FORMS PRINTING PAGE ELEMENTS UNDER DEVELOPMENT</strong>,
        hasSubItems: true,
        subItems: [
          {
            id: 1510,
            icon: <TableCellsIcon {...icon} />,
            name: "COE",
            path: "/forms/COE",
            element: <strong style={{fontSize: '24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="text-yellow-800 py-1 h-full px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">CERTIFICATE OF EMPLOYMENT FILING AND PRINTING PAGE ELEMENTS UNDER DEVELOPMENT</strong>,
            hasSubItems: false,
          },
        ]
      },
      {
        id: 1600,
        icon: <DocumentIcon {...icon} />,
        name: "Payroll",
        path: "/payroll",
        element: <strong style={{fontSize: '24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="text-yellow-800 py-1 h-full px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">PAYROLL PAGE UX UI ELEMENTS UNDER DEVELOPMENT</strong>,
        hasSubItems: true,
        subItems: [
          {
            id: 1610,
            icon: <DocumentIcon {...icon} />,
            name: "Payroll Register",
            path: "/payroll/payroll-register",
            element: <strong style={{fontSize: '24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="text-yellow-800 py-1 h-full px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">PAYROLL REGISTER PAGE UX UI ELEMENTS UNDER DEVELOPMENT</strong>,
            hasSubItems: false,
          },
          {
            id: 1620,
            icon: <DocumentIcon {...icon} />,
            name: "Print Payslip",
            path: "/payroll/print-payslip",
            element: <strong style={{fontSize: '24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="text-yellow-800 py-1 h-full px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">PRINT PAYSLIP PAGE UX UI ELEMENTS UNDER DEVELOPMENT</strong>,
            hasSubItems: false,
          },
          {
            id: 1630,
            icon: <DocumentIcon {...icon} />,
            name: "Bonus",
            path: "/payroll/bonus",
            element: <strong style={{fontSize: '24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="text-yellow-800 py-1 h-full px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">BONUS INFORMATION PAGE UX UI ELEMENTS UNDER DEVELOPMENT</strong>,
            hasSubItems: false,
          },
          {
            id: 1640,
            icon: <DocumentIcon {...icon} />,
            name: "13th Month",
            path: "/payroll/13th-month",
            element: <strong style={{fontSize: '24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="text-yellow-800 py-1 h-full px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">13TH MONTH PAGE UX UI ELEMENTS UNDER DEVELOPMENT</strong>,
            hasSubItems: false,
          },
          {
            id: 1650,
            icon: <DocumentIcon {...icon} />,
            name: "Compensation",
            path: "/payroll/compensation",
            element: <strong style={{fontSize: '24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="text-yellow-800 py-1 h-full px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">COMPENSATIONS PAGE UX UI ELEMENTS UNDER DEVELOPMENT</strong>,
            hasSubItems: false,
          },
          {
            id: 1660,
            icon: <DocumentIcon {...icon} />,
            name: "Adjustment Others",
            path: "/payroll/adjustment-others",
            element: <strong style={{fontSize: '24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="text-yellow-800 py-1 h-full px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">ADJUSTMENTS PAGE UX UI ELEMENTS UNDER DEVELOPMENT</strong>,
            hasSubItems: false,
          },
          {
            id: 1670,
            icon: <DocumentIcon {...icon} />,
            name: "Tax Refund",
            path: "/payroll/tax-refund",
            element: <strong style={{fontSize: '24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="text-yellow-800 py-1 h-full px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">TAX REFUND PAGE UX UI ELEMENTS UNDER DEVELOPMENT</strong>,
            hasSubItems: false,
          },
          {
            id: 1680,
            icon: <DocumentIcon {...icon} />,
            name: "Government Deduction",
            path: "/payroll/government-deduction",
            element: <strong style={{fontSize: '24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="text-yellow-800 py-1 h-full px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">GOVERNMENT DEDUCTION PAGE UX UI ELEMENTS UNDER DEVELOPMENT</strong>,
            hasSubItems: false,
          },
          {
            id: 1690,
            icon: <DocumentIcon {...icon} />,
            name: "Other Deduction",
            path: "/payroll/other-deduction",
            element: <strong style={{fontSize: '24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="text-yellow-800 py-1 h-full px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">OTHER DEDUCTIONS PAGE UX UI ELEMENTS UNDER DEVELOPMENT</strong>,
            hasSubItems: false,
          },
          {
            id: 1691,
            icon: <DocumentIcon {...icon} />,
            name: "SSS Loan",
            path: "/payroll/sss-loan",
            element: <strong style={{fontSize: '24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="text-yellow-800 py-1 h-full px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">SSS LOAN PAGE UX UI ELEMENTS UNDER DEVELOPMENT</strong>,
            hasSubItems: false,
          },
          {
            id: 1692,
            icon: <DocumentIcon {...icon} />,
            name: "Payroll Summary",
            path: "/payroll/payroll-summary",
            element: <strong style={{fontSize: '24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="text-yellow-800 py-1 h-full px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">PAYROLL SUMMARY PAGE UX UI ELEMENTS UNDER DEVELOPMENT</strong>,
            hasSubItems: false,
          },
          {
            id: 1693,
            icon: <TableCellsIcon {...icon} />,
            name: "Net Pay Bank Summary",
            path: "/payroll/net-pay-bank-summary",
            element: <strong style={{fontSize: '24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="text-yellow-800 py-1 h-full px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">NET PAY BANK SUMMARY PAGE UX UI ELEMENTS UNDER DEVELOPMENT</strong>,
            hasSubItems: false,
          },
          {
            id: 1694,
            icon: <TableCellsIcon {...icon} />,
            name: "Allowance Summary",
            path: "/payroll/allowance-summary",
            element: <strong style={{fontSize: '24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="text-yellow-800 py-1 h-full px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">ALLOWANCE SUMMARY PAGE UX UI ELEMENTS UNDER DEVELOPMENT</strong>,
            hasSubItems: false,
          },
          {
            id: 1695,
            icon: <TableCellsIcon {...icon} />,
            name: "Alpha List",
            path: "/payroll/alpha-list",
            element: <strong style={{fontSize: '24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="text-yellow-800 py-1 h-full px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">ALPHA LIST PAGE UX UI ELEMENTS UNDER DEVELOPMENT</strong>,
            hasSubItems: false,
          },
        ]
      },
      {
        id: 1700,
        icon: <SpeakerWaveIcon {...icon} />,
        name: "Announcement",
        path: "/announcements",
        element: <strong style={{fontSize: '24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="text-yellow-800 py-1 h-full px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">ANNOUNCEMENT PAGE UX UI ELEMENTS UNDER DEVELOPMENT</strong>,
        hasSubItems: true,
        subItems: [
          {
            id: 1710,
            icon: <SpeakerWaveIcon {...icon} />,
            name: "Post Announcements",
            path: "/announcements/post-announcements",
            element: <strong style={{fontSize: '24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="text-yellow-800 py-1 h-full px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">POST ANNOUNCEMENT PAGE UX UI ELEMENTS UNDER DEVELOPMENT</strong>,
            hasSubItems: false,
          },
        ]
      },
      {
        id: 1800,
        icon: <QuestionMarkCircleIcon {...icon} />,
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
