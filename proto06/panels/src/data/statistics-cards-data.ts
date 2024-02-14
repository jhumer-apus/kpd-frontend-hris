import {
  BanknotesIcon,
  UserPlusIcon,
  UserIcon,
  ChartBarIcon,
  Cog8ToothIcon,
  CurrencyDollarIcon,
  ClockIcon,
} from "@heroicons/react/24/solid";


export const statisticsCardsData = [
  {
    color: "blue",
    icon: BanknotesIcon,
    title: "Employees",
    value: "201 Data",
    footer: {
      color: "text-green-500",
      value: "<",
      label: "201, Appraisal, etc.",
    },
    link: '/home/employees/201-files',
  },
  {
    color: "pink",
    icon: UserIcon,
    title: "Daily Time Record",
    value: "DTR",
    footer: {
      color: "text-green-500",
      value: "<",
      label: "OT, Leaves, UA, etc.",
    },
    link: '/home/DTR/View-DTR',
  },
  {
    color: "pink",
    icon: ClockIcon,
    title: "Schedule Lists",
    value: "Schedule",
    footer: {
      color: "text-green-500",
      value: "<",
      label: "Modification, etc.",
    },
    // link: 'development'
    link: '/home/procedurals/schedule-dailies'
  },
  // {
  //   color: "green",
  //   icon: UserPlusIcon,
  //   title: "Overall Reports",
  //   value: "Files",
  //   footer: {
  //     color: "text-green-500",
  //     value: "<",
  //     label: "Summaries, etc.",
  //   },
  //   link: 'development'
  // },
  // {
  //   color: "orange",
  //   icon: CurrencyDollarIcon,
  //   title: "Payroll Division",
  //   value: "Info",
  //   footer: {
  //     color: "text-green-500",
  //     value: "<",
  //     label: "Payslips, Tax, etc.",
  //   },
  //   link: '/home/payroll/view-all-payroll'
  // },
  // {
  //   color: "orange",
  //   icon: Cog8ToothIcon,
  //   title: "Table Maintenance",
  //   value: "Settings",
  //   footer: {
  //     color: "text-green-500",
  //     value: "<",
  //     label: "Pages, Tables, etc.",
  //   },
  //   link: 'development'
  // },
];

export default statisticsCardsData;
