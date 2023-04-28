import {
  BanknotesIcon,
  UserPlusIcon,
  UserIcon,
  ChartBarIcon,
  Cog8ToothIcon,
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
  },
  {
    color: "green",
    icon: UserPlusIcon,
    title: "Overall Reports",
    value: "Files",
    footer: {
      color: "text-green-500",
      value: "<",
      label: "Summaries, etc.",
    },
  },
  {
    color: "orange",
    icon: ChartBarIcon,
    title: "Payroll Division",
    value: "Info",
    footer: {
      color: "text-green-500",
      value: "<",
      label: "Payslips, Tax, etc.",
    },
  },
  {
    color: "orange",
    icon: Cog8ToothIcon,
    title: "Table Maintenance",
    value: "Settings",
    footer: {
      color: "text-green-500",
      value: "<",
      label: "Pages, Tables, etc.",
    },
  },
  {
    color: "pink",
    icon: ClockIcon,
    title: "Schedule Approval",
    value: "Employees",
    footer: {
      color: "text-green-500",
      value: "<",
      label: "Modification, etc.",
    },
  },
];

export default statisticsCardsData;
