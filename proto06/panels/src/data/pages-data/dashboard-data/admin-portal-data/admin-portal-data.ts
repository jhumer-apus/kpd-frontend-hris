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
    // color: "red",
    type: 2,
    icon: KeyIcon,
    title: "Role Management",
    value: "RM",
    footer: {
    color: "text-green-500",
    value: "<",
    label: "Manage Roles, etc.",
    },
    // custom: "linear-gradient(315deg, #d4418e 0%, #0652c5 74%)",
    // custom: "linear-gradient(315deg, #ffcfdf 0%, #b0f3f1 74%)",
    custom: "linear-gradient(147deg, #a399b2 0%, #4d4855 74%)",
  },
  {
    icon: UserGroupIcon,
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
  },
  {
    icon: ClockIcon,
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
  },
  {
    icon: ClipboardDocumentIcon,
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
  },
  {
    icon: ComputerDesktopIcon,
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
  },
  {
    icon: Cog6ToothIcon,
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
  },
  ];
  export default adminPortalData;
