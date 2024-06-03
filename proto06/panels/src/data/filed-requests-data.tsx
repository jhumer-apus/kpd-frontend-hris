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
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import NoCrashOutlinedIcon from '@mui/icons-material/NoCrashOutlined';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import PublishedWithChangesOutlinedIcon from '@mui/icons-material/PublishedWithChangesOutlined';
import CreditScoreOutlinedIcon from '@mui/icons-material/CreditScoreOutlined';
import CloudSyncSharpIcon from '@mui/icons-material/CloudSyncSharp';
import SettingsAccessibilitySharpIcon from '@mui/icons-material/SettingsAccessibilitySharp';
import DifferenceOutlinedIcon from '@mui/icons-material/DifferenceOutlined';

const icon = {
  className: "w-5 h-5 text-inherit",
};


export const filedRequestsData = [
    {
      img: "/img/logo-xd.svg",
      name: "Leave Request",
      members: [
        { img: "/img/team-1.jpeg", name: "Romina Hadid" },
        { img: "/img/team-2.jpeg", name: "Ryan Tompson" },
        { img: "/img/team-3.jpeg", name: "Jessica Doe" },
        { img: "/img/team-4.jpeg", name: "Alexander Smith" },
      ],
      month: "05/15/2023",
      completion: "Approved",
      icon: <AppRegistrationOutlinedIcon {...icon} />
    },
    {
      img: "/img/logo-atlassian.svg",
      name: "UA Request",
      members: [
        { img: "/img/team-2.jpeg", name: "Ryan Tompson" },
        { img: "/img/team-4.jpeg", name: "Alexander Smith" },
      ],
      month: "05/10/2023",
      completion: "Pending",
      icon: <BadgeOutlinedIcon {...icon} />
    },
    {
      img: "/img/logo-slack.svg",
      name: "Material Request",
      members: [
        { img: "/img/team-3.jpeg", name: "Jessica Doe" },
        { img: "/img/team-1.jpeg", name: "Romina Hadid" },
      ],
      month: "05/05/2023",
      completion: "Pending",
      icon: <CalendarTodayOutlinedIcon {...icon} />
    },
    {
      img: "/img/logo-spotify.svg",
      name: "Budget Request",
      members: [
        { img: "/img/team-4.jpeg", name: "Alexander Smith" },
        { img: "/img/team-3.jpeg", name: "Jessica Doe" },
        { img: "/img/team-2.jpeg", name: "Ryan Tompson" },
        { img: "/img/team-1.jpeg", name: "Romina Hadid" },
        { img: "/img/team-1.jpeg", name: "Romina Hadid" },
        { img: "/img/team-1.jpeg", name: "Romina Hadid" },
        { img: "/img/team-1.jpeg", name: "Romina Hadid" },
        { img: "/img/team-1.jpeg", name: "Romina Hadid" },
      ],
      month: "05/02/2023",
      completion: "Rejected",
      icon: <ApprovalOutlinedIcon  {...icon} />
    },
    {
      img: "/img/logo-jira.svg",
      name: "Leave Request",
      members: [{ img: "/img/team-4.jpeg", name: "Alexander Smith" }],
      month: "04/25/2023",
      completion: "Rejected",
      icon: <AppRegistrationOutlinedIcon {...icon} />
    },
    {
      img: "/img/logo-invision.svg",
      name: "Training Request",
      members: [
        { img: "/img/team-1.jpeg", name: "Romina Hadid" },
        { img: "/img/team-4.jpeg", name: "Alexander Smith" },
      ],
      month: "04/22/2023",
      completion: "Approved",
      icon: <PublishedWithChangesOutlinedIcon {...icon} />
    },
    
];
  
  export default filedRequestsData;
  