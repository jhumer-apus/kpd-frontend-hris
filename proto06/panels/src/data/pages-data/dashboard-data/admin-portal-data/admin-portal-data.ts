import KeyboardCommandKeyOutlinedIcon from '@mui/icons-material/KeyboardCommandKeyOutlined';
import SupervisedUserCircleOutlinedIcon from '@mui/icons-material/SupervisedUserCircleOutlined';
import RecentActorsOutlinedIcon from '@mui/icons-material/RecentActorsOutlined';
import ThreePOutlinedIcon from '@mui/icons-material/ThreePOutlined';
import NoAccountsOutlinedIcon from '@mui/icons-material/NoAccountsOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';

import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import AdUnitsOutlinedIcon from '@mui/icons-material/AdUnitsOutlined';
import ArtTrackOutlinedIcon from '@mui/icons-material/ArtTrackOutlined';
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';
import Diversity3OutlinedIcon from '@mui/icons-material/Diversity3Outlined';
import Diversity2OutlinedIcon from '@mui/icons-material/Diversity2Outlined';

import AddModeratorIcon from '@mui/icons-material/AddModerator';
import AssuredWorkloadOutlinedIcon from '@mui/icons-material/AssuredWorkloadOutlined';
import AttractionsOutlinedIcon from '@mui/icons-material/AttractionsOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import ContactEmergencyOutlinedIcon from '@mui/icons-material/ContactEmergencyOutlined';
import ContactPageOutlinedIcon from '@mui/icons-material/ContactPageOutlined';
import ContentPasteSearchOutlinedIcon from '@mui/icons-material/ContentPasteSearchOutlined';


export const adminPortalData = [
  {
    type: 2,
    icon: KeyboardCommandKeyOutlinedIcon,
    title: "Categories Management",
    value: "CM",
    footer: {
    color: "text-green-500",
    value: "<",
    label: "Manage Divisions, Ranks etc.",
    },
    // custom: "linear-gradient(315deg, #d4418e 0%, #0652c5 74%)",
    // custom: "linear-gradient(315deg, #ffcfdf 0%, #b0f3f1 74%)",
    custom: "linear-gradient(147deg, #a399b2 0%, #4d4855 74%)",
    link: '/home/Dashboards/Admin-Dashboard/Categories',
    customTop: 15,
    customLeft: 38,
  },
  {
    icon: SupervisedUserCircleOutlinedIcon,
    title: "User Account Management",
    value: "UAM",
    footer: {
      color: "text-green-500",
      value: "<",
      label: "Manage User Accounts, etc.",
    },
    // custom: "linear-gradient(315deg, #d4418e 0%, #0652c5 74%)",
    // custom: "linear-gradient(315deg, #ffcfdf 0%, #b0f3f1 74%)",
    custom: "linear-gradient(147deg, #a399b2 0%, #4d4855 74%)",
    link: '/home/Dashboards/Admin-Dashboard/Users',
    customTop: 15,
    customLeft: 38,
  },
  {
    icon: RecentActorsOutlinedIcon,
    title: "Payroll Variables (Monthly)",
    value: "PVM",
    footer: {
      color: "text-green-500",
      value: "<",
      label: "Tax, Pagibig, ",
    },
    // custom: "linear-gradient(315deg, #d4418e 0%, #0652c5 74%)",
    // custom: "linear-gradient(315deg, #ffcfdf 0%, #b0f3f1 74%)",
    custom: "linear-gradient(147deg, #a399b2 0%, #4d4855 74%)",
    link: '/home/Dashboards/Admin-Dashboard/Payroll-Variables-Monthly',
    customTop: 15,
    customLeft: 38,
  },
  {
    icon: ThreePOutlinedIcon,
    title: "Directory Management",
    value: "HTLI",
    footer: {
      color: "text-green-500",
      value: "<",
      label: "Directory Manage Approvers, etc.",
    },
    // custom: "linear-gradient(315deg, #d4418e 0%, #0652c5 74%)",
    // custom: "linear-gradient(315deg, #ffcfdf 0%, #b0f3f1 74%)",
    custom: "linear-gradient(147deg, #a399b2 0%, #4d4855 74%)",
    link: 'development',
    customTop: 15,
    customLeft: 38,
  },
  {
    icon: NoAccountsOutlinedIcon,
    title: "UA Access Approvers",
    value: "UA Permissions",
    footer: {
      color: "text-green-500",
      value: "<",
      label: "Unaccounted Attendances Approvers, etc.",
    },
    // custom: "linear-gradient(315deg, #d4418e 0%, #0652c5 74%)",
    // custom: "linear-gradient(315deg, #ffcfdf 0%, #b0f3f1 74%)",
    custom: "linear-gradient(147deg, #a399b2 0%, #4d4855 74%)",
    link: 'development',
    customTop: 15,
    customLeft: 38,
  },
  {
    icon: AssessmentOutlinedIcon,
    title: "Reporting Tools",
    value: "Reports",
    footer: {
      color: "text-green-500",
      value: "<",
      label: "Add Report Themes, etc.",
    },
    // custom: "linear-gradient(315deg, #d4418e 0%, #0652c5 74%)",
    // custom: "linear-gradient(315deg, #ffcfdf 0%, #b0f3f1 74%)",
    custom: "linear-gradient(147deg, #a399b2 0%, #4d4855 74%)",
    link: 'development',
    customTop: 15,
    customLeft: 38,
  },
];

export const categoriesManagementData = [
  {
    // color: "red",
    type: 2,
    icon: AccountTreeOutlinedIcon,
    title: "Manage Branch List",
    value: "Branch",
    footer: {
    color: "text-green-500",
    value: "<",
    label: "View Branch List, Details etc.",
    },
    custom: "linear-gradient(315deg, #d4418e 0%, #0652c5 74%)",
    // custom: "linear-gradient(315deg, #ffcfdf 0%, #b0f3f1 74%)",
    // custom: "linear-gradient(147deg, #a399b2 0%, #4d4855 74%)",
    link: '/home/Dashboards/Admin-Dashboard/Categories/Branch',
    customTop: 15,
    customLeft: 38,
  },
  {
    icon: AdUnitsOutlinedIcon,
    title: "Manage Department List",
    value: "Department",
    footer: {
      color: "text-green-500",
      value: "<",
      label: "View Dept. List, Details etc.",
    },
    custom: "linear-gradient(315deg, #d4418e 0%, #0652c5 74%)",
    // custom: "linear-gradient(315deg, #ffcfdf 0%, #b0f3f1 74%)",
    // custom: "linear-gradient(147deg, #a399b2 0%, #4d4855 74%)",
    link: '/home/Dashboards/Admin-Dashboard/Categories/Department',
    customTop: 15,
    customLeft: 38,
  },
  {
    icon: ArtTrackOutlinedIcon,
    title: "Manage Division List",
    value: "Division",
    footer: {
      color: "text-green-500",
      value: "<",
      label: "View Division List, Details etc.",
    },
    custom: "linear-gradient(315deg, #d4418e 0%, #0652c5 74%)",
    // custom: "linear-gradient(315deg, #ffcfdf 0%, #b0f3f1 74%)",
    // custom: "linear-gradient(147deg, #a399b2 0%, #4d4855 74%)",
    link: '/home/Dashboards/Admin-Dashboard/Categories/Division',
    customTop: 15,
    customLeft: 38,
  },
  {
    icon: CurrencyExchangeOutlinedIcon,
    title: "Manage Payrollgroup List",
    value: "Payrollgroup",
    footer: {
      color: "text-green-500",
      value: "<",
      label: "View Payrollgroup List, Details etc.",
    },
    custom: "linear-gradient(315deg, #d4418e 0%, #0652c5 74%)",
    // custom: "linear-gradient(315deg, #ffcfdf 0%, #b0f3f1 74%)",
    // custom: "linear-gradient(147deg, #a399b2 0%, #4d4855 74%)",
    link: '/home/Dashboards/Admin-Dashboard/Categories/Payrollgroup',
    customTop: 15,
    customLeft: 38,
  },
  {
    icon: Diversity3OutlinedIcon,
    title: "Manage Position List",
    value: "Position",
    footer: {
      color: "text-green-500",
      value: "<",
      label: "View Position List, Details etc.",
    },
    custom: "linear-gradient(315deg, #d4418e 0%, #0652c5 74%)",
    // custom: "linear-gradient(315deg, #ffcfdf 0%, #b0f3f1 74%)",
    // custom: "linear-gradient(147deg, #a399b2 0%, #4d4855 74%)",
    link: '/home/Dashboards/Admin-Dashboard/Categories/Position',
    customTop: 15,
    customLeft: 38,
  },
  {
    icon: Diversity2OutlinedIcon,
    title: "Manage Rank List",
    value: "Rank",
    footer: {
      color: "text-green-500",
      value: "<",
      label: "View Rank List, Details etc.",
    },
    custom: "linear-gradient(315deg, #d4418e 0%, #0652c5 74%)",
    // custom: "linear-gradient(315deg, #ffcfdf 0%, #b0f3f1 74%)",
    // custom: "linear-gradient(147deg, #a399b2 0%, #4d4855 74%)",
    link: '/home/Dashboards/Admin-Dashboard/Categories/Rank',
    customTop: 15,
    customLeft: 38,
  },
];




export const payrollVariablesMonthlyData = [
  {
    // color: "red",
    type: 2,
    icon: AddModeratorIcon,
    title: "Employee Tax Entries",
    value: "TAX",
    footer: {
    color: "text-green-500",
    value: "<",
    label: "View List of Tax IDs, details etc.",
    },
    custom: "linear-gradient(235deg, rgba(132,25,142,1) 4%, rgba(52,9,121,0.8379726890756303) 23%, rgba(19,151,161,1) 55%)",
    link: '/home/Dashboards/Admin-Dashboard/Payroll-Variables-Monthly/Tax',
    customTop: 15,
    customLeft: 38,
  },
  {
    icon: AssuredWorkloadOutlinedIcon,
    title: "Employee PAGIBIG Entries",
    value: "PHDMF",
    footer: {
      color: "text-green-500",
      value: "<",
      label: "View PHDMF IDs, details etc.",
    },
    custom: "linear-gradient(235deg, rgba(132,25,142,1) 4%, rgba(52,9,121,0.8379726890756303) 23%, rgba(19,151,161,1) 55%)",
    link: '/home/Dashboards/Admin-Dashboard/Payroll-Variables-Monthly/Pagibig',
    customTop: 15,
    customLeft: 38,
  },
  {
    icon: AttractionsOutlinedIcon,
    title: "Employee SSS Entries",
    value: "SSS",
    footer: {
      color: "text-green-500",
      value: "<",
      label: "View Social Security IDs, details etc.",
    },
    custom: "linear-gradient(235deg, rgba(132,25,142,1) 4%, rgba(52,9,121,0.8379726890756303) 23%, rgba(19,151,161,1) 55%)",
    link: '/home/Dashboards/Admin-Dashboard/Payroll-Variables-Monthly/SSS',
    customTop: 15,
    customLeft: 38,
  },
  {
    icon: BusinessOutlinedIcon,
    title: "Employee Philhealth Entries",
    value: "PHILHEALTH",
    footer: {
      color: "text-green-500",
      value: "<",
      label: "View Philhealth IDs, details etc.",
    },
    custom: "linear-gradient(235deg, rgba(132,25,142,1) 4%, rgba(52,9,121,0.8379726890756303) 23%, rgba(19,151,161,1) 55%)",
    link: 'development',
    // link: '/home/Dashboards/Admin-Dashboard/Payroll-Variables-Monthly/Philhealth',
    customTop: 15,
    customLeft: 38,
  },
  {
    icon: ContactEmergencyOutlinedIcon,
    title: "Employee Cash Advance List",
    value: "CA",
    footer: {
      color: "text-green-500",
      value: "<",
      label: "View Cash Advance List, details etc.",
    },
    custom: "linear-gradient(235deg, rgba(132,25,142,1) 4%, rgba(52,9,121,0.8379726890756303) 23%, rgba(19,151,161,1) 55%)",
    link: 'development',
    // link: '/home/Dashboards/Admin-Dashboard/Payroll-Variables-Monthly/Cash-Advance',
    customTop: 15,
    customLeft: 38,
  },
  {
    icon: ContactPageOutlinedIcon,
    title: "Employee Allowance Entries",
    value: "AE",
    footer: {
      color: "text-green-500",
      value: "<",
      label: "View Allowance Entries, Details etc.",
    },
    custom: "linear-gradient(235deg, rgba(132,25,142,1) 4%, rgba(52,9,121,0.8379726890756303) 23%, rgba(19,151,161,1) 55%)",
    link: 'development',
    // link: '/home/Dashboards/Admin-Dashboard/Payroll-Variables-Monthly/Allowance-Entry',
    customTop: 15,
    customLeft: 38,
  },
  {
    icon: ContentPasteSearchOutlinedIcon,
    title: "Allowance Types",
    value: "AT",
    footer: {
      color: "text-green-500",
      value: "<",
      label: "View Allowance Types, Details etc.",
    },
    custom: "linear-gradient(235deg, rgba(132,25,142,1) 4%, rgba(52,9,121,0.8379726890756303) 23%, rgba(19,151,161,1) 55%)",
    link: 'development',
    // link: '/home/Dashboards/Admin-Dashboard/Payroll-Variables-Monthly/Allowance-Type',
    customTop: 15,
    customLeft: 38,
  },
];






  // export default {adminPortalData};
