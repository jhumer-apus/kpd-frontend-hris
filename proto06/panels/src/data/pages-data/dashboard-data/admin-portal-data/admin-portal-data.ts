import {
    BanknotesIcon,
    UserPlusIcon,
    UserIcon,
    ChartBarIcon,
    Cog8ToothIcon,
    ClockIcon,
    KeyIcon,
    UserGroupIcon,
    ClipboardDocumentIcon,
    ComputerDesktopIcon,
    Cog6ToothIcon,
  } from "@heroicons/react/24/solid";
  
  
  export const adminPortalData = [
    {
    //   color: "blue",
    type: 2,
      icon: KeyIcon,
      title: "Role Management",
      value: "RM",
      footer: {
        color: "text-green-500",
        value: "<",
        label: "Manage Roles, etc.",
      },
    },
    {
    //   color: "pink",
      icon: UserGroupIcon,
      title: "User Account Management",
      value: "UAM",
      footer: {
        color: "text-green-500",
        value: "<",
        label: "Manage User Accounts, etc.",
      },
    },
    {
    //   color: "green",
      icon: ClockIcon,
      title: "Attendance Access",
      value: "AA Permission",
      footer: {
        color: "text-green-500",
        value: "<",
        label: "Attendance Edit Approvers, etc.",
      },
    },
    {
    //   color: "orange",
      icon: ClipboardDocumentIcon,
      title: "Directory Management",
      value: "HTLI",
      footer: {
        color: "text-green-500",
        value: "<",
        label: "Directory Manage Approvers, etc.",
      },
    },
    {
    //   color: "orange",
      icon: ComputerDesktopIcon,
      title: "UA Access Approvers",
      value: "UA Permissions",
      footer: {
        color: "text-green-500",
        value: "<",
        label: "Unaccounted Attendances Approvers, etc.",
      },
    },
    {
    //   color: "pink",
      icon: Cog6ToothIcon,
      title: "Reporting Tools",
      value: "Reports",
      footer: {
        color: "text-green-500",
        value: "<",
        label: "Add Report Themes, etc.",
      },
    },
  ];
  
  export default adminPortalData;