import AgricultureIcon from '@mui/icons-material/Agriculture';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import CoPresentOutlinedIcon from '@mui/icons-material/CoPresentOutlined';

export const AssetAndAnnouncementData = [
  {
    // color: "red",
    type: 2,
    icon: AgricultureIcon,
    title: "Asset List (Type)",
    value: "AL",
    footer: {
    color: "text-green-500",
    value: "<",
    label: "View List of Asset Types, details etc.",
    },
    custom: "linear-gradient(22deg, rgba(9,9,121,1) 15%, rgba(70,191,4,1) 47%, rgba(2,0,36,1) 100%, rgba(0,212,255,1) 100%)",
    link: '/home/Dashboards/Admin-Portal/Assets-And-Announcement/Asset-List',
    customTop: 15,
    customLeft: 38,
  },
  {
    // color: "red",
    type: 2,
    icon: AddShoppingCartOutlinedIcon,
    title: "Asset Account",
    value: "AC",
    footer: {
    color: "text-green-500",
    value: "<",
    label: "View List Asset Accounts, details etc.",
    },
    custom: "linear-gradient(22deg, rgba(9,9,121,1) 15%, rgba(70,191,4,1) 47%, rgba(2,0,36,1) 100%, rgba(0,212,255,1) 100%)",
    link: '/home/Dashboards/Admin-Portal/Assets-And-Announcement/Asset-Account',
    customTop: 15,
    customLeft: 38,
  },
  {
    icon: CoPresentOutlinedIcon,
    title: "Announcement Configurations",
    value: "AC",
    footer: {
      color: "text-green-500",
      value: "<",
      label: "View Announcement lists, details etc.",
    },
    custom: "linear-gradient(22deg, rgba(9,9,121,1) 15%, rgba(70,191,4,1) 47%, rgba(2,0,36,1) 100%, rgba(0,212,255,1) 100%)",
    // custom: "linear-gradient(235deg, rgba(132,25,142,1) 4%, rgba(52,9,121,0.8379726890756303) 23%, rgba(19,151,161,1) 55%)",
    link: '/home/Dashboards/Admin-Portal/Assets-And-Announcement/Announcement-Configurations',
    customTop: 15,
    customLeft: 38,
  },
];
