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
    link: 'development',
    customTop: 15,
    customLeft: 38,
  },
  {
    icon: RecentActorsOutlinedIcon,
    title: "Attendance Access",
    value: "AA Permission",
    footer: {
      color: "text-green-500",
      value: "<",
      label: "Attendance Edit Approvers, etc.",
    },
    // custom: "linear-gradient(315deg, #d4418e 0%, #0652c5 74%)",
    // custom: "linear-gradient(315deg, #ffcfdf 0%, #b0f3f1 74%)",
    custom: "linear-gradient(147deg, #a399b2 0%, #4d4855 74%)",
    link: 'development',
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



  // export default {adminPortalData};
