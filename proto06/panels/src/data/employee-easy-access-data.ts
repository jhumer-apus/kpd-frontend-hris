import {
  BellIcon,
  PlusCircleIcon,
  ShoppingCartIcon,
  CreditCardIcon,
  LockOpenIcon,
  BanknotesIcon,
  ArchiveBoxIcon,
  AcademicCapIcon,
  ClockIcon,
  DocumentCheckIcon,
  BellAlertIcon,
  BuildingOffice2Icon,
  FingerPrintIcon,
  FolderOpenIcon,
} from "@heroicons/react/24/solid";



export const employeeEasyAccessData = [
  {
    icon: BellIcon,
    color: "text-green-500",
    title: "OBT Section",
    description: "View Summary",
    link: "/home/quick-accesses/file-OBT",
  },
  {
    icon: ArchiveBoxIcon,
    color: "text-red-500",
    title: "UA",
    description: "Apply Unaccounted Attendance",
    link: "/home/quick-accesses/file-UA",
  },
  // {
  //   icon: AcademicCapIcon,
  //   color: "text-blue-500",
  //   title: "CAF",
  //   description: "Call Approval",
  //   link: "development",
  // },
  {
    icon: ClockIcon,
    color: "text-orange-500",
    title: "Schedule",
    description: "View Schedule",
    link: "/home/quick-accesses/your-schedule",
  },
  {
    icon: DocumentCheckIcon,
    color: "text-pink-500",
    title: "Leaves",
    description: "Apply Leaves",
    link: "/home/quick-accesses/file-LEAVE",
  },
  // {
  //   icon: BanknotesIcon,
  //   color: "text-blue-gray-900",
  //   title: "Loans",
  //   description: "View Loans",
  //   link: "development",
  // },
  // {
  //   icon: BellAlertIcon,
  //   color: "text-red-500",
  //   title: "HR Advisory",
  //   description: "View HR Advisories",
  //   link: "development",
  // },
  {
    icon: BuildingOffice2Icon,
    color: "text-blue-500",
    title: "Overtime",
    description: "Apply Overtime",
    link: "/home/quick-accesses/file-OT",
  },
  // {
  //   icon: FingerPrintIcon,
  //   color: "text-green-500",
  //   title: "Biometrics",
  //   description: "Biometrics Data",
  //   link: 'development',
  //   // link: "/home/employees/201-files",
  // },
  {
    icon: FolderOpenIcon,
    color: "text-blue-gray-500",
    title: "Forms",
    description: "Downloadables",
    link: "/home/forms/B1-Forms",
  },
];

export default employeeEasyAccessData;
