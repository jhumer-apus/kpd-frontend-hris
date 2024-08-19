import { useEffect, useState, createElement } from "react";
import {
  Typography,
} from "@material-tailwind/react";
// import { Typography } from "@mui/material";
import { EasyAccessCard } from "@/widgets/cards";
import AnimationIcon from '@mui/icons-material/Animation';
import AssistantIcon from '@mui/icons-material/Assistant';
import BedroomParentOutlinedIcon from '@mui/icons-material/BedroomParentOutlined';
import Brightness4OutlinedIcon from '@mui/icons-material/Brightness4Outlined';
import ContactMailOutlinedIcon from '@mui/icons-material/ContactMailOutlined';
import ConnectWithoutContactOutlinedIcon from '@mui/icons-material/ConnectWithoutContactOutlined';
import CollectionsBookmarkOutlinedIcon from '@mui/icons-material/CollectionsBookmarkOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import AirplayOutlinedIcon from '@mui/icons-material/AirplayOutlined';
import EditLocationAltOutlinedIcon from '@mui/icons-material/EditLocationAltOutlined';
import DryCleaningOutlinedIcon from '@mui/icons-material/DryCleaningOutlined';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import AdfScannerOutlinedIcon from '@mui/icons-material/AdfScannerOutlined';

import { APILink, RootState } from '@/store/configureStore';
import { useSelector } from "react-redux";
import { INTERNAL_USER_ROLE } from "@/types/types-store";


const IconColor = 'linear-gradient(56deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,90,255,1) 100%)';



export interface DivAnimate {
  [key: string]: boolean
}

export function TrainingForms() {
  const userState = useSelector((state: RootState)=> state.auth)
  const [isVisible, setIsVisible] = useState<DivAnimate>({});
  const [pageLoaded, setPageLoaded] = useState(false);

  const trainingFormsData = [
    {
      // color: "red",
      type: 2,
      icon: MenuBookOutlinedIcon,
      title: "Affidavit of Undertaking",
      value: "AOU",
      footer: {
      color: "text-green-500",
      value: "<",
      label: "F-HRD-03.08/REV.03/EFF.DATE: 11-04-22",
      },
      custom: IconColor,
      link: ``,
      fileDownload: false,
      fileName: 'F-HRD-03.08_Affidavit_of_Undertaking_(rev.03)',
      customTop: 15,
      customLeft: 38,
    },
    {
      // color: "red",
      type: 2,
      icon: AirplayOutlinedIcon,
      title: "In-House Seminar Evaluation",
      value: "ISE",
      footer: {
      color: "text-green-500",
      value: "<",
      label: "F-HRD-03.03/REV.03/EFF.DATE: 08-15-11",
      },
      custom: IconColor,
      link: ``,
      fileDownload: false,
      fileName: 'F-HRD-03.03_In-House_Seminar_Evaluation_(rev.03)',
      customTop: 15,
      customLeft: 38,
    },
    {
      // color: "red",
      type: 2,
      icon: AdfScannerOutlinedIcon,
      title: "Public Seminar Evaluation Form",
      value: "PSE",
      footer: {
      color: "text-green-500",
      value: "<",
      label: "F-HRD-03.04/REV.03/EFF.DATE: 08-15-11",
      },
      custom: IconColor,
      link: ``,
      fileDownload: false,
      fileName: 'F-HRD-03.04_Public_Seminar_Evaluation_Form_(rev.03)',
      customTop: 15,
      customLeft: 38,
    },
    // {
    //   // color: "red",
    //   type: 2,
    //   icon: AdfScannerOutlinedIcon,
    //   title: "Employee's Training Record",
    //   value: "ETR",
    //   footer: {
    //   color: "text-green-500",
    //   value: "<",
    //   label: "F-HRD-03.04/REV.03/EFF.DATE: 08-15-11",
    //   },
    //   custom: IconColor,
    //   link: ``,
    //   fileDownload: false,
    //   fileName: 'F-HRD-03.02_Employees_Training_Record_rev.02.pdf',
    //   customTop: 15,
    //   customLeft: 38,
    // },
    ...(userState?.user?.role !== INTERNAL_USER_ROLE.Employee ) ? [
        {
            // color: "red",
            type: 2,
            icon: ConnectWithoutContactOutlinedIcon,
            title: "Employee's Training Record",
            value: "ETR",
            footer: {
            color: "text-green-500",
            value: "<",
            label: "F-HRD-03.02/REV.02/EFF.DATE: 08-15-11",
            },
            custom: IconColor,
            link: ``,
            fileDownload: false,
            fileName: 'F-HRD-03.02_Employees_Training_Record_rev.02.pdf',
            customTop: 15,
            customLeft: 38,
        },
        {
          // color: "red",
          type: 2,
          icon: ConnectWithoutContactOutlinedIcon,
          title: "Training Attendance Record",
          value: "TAR",
          footer: {
          color: "text-green-500",
          value: "<",
          label: "F-HRD-03.01/REV.02/EFF.DATE: 08-15-11",
          },
          custom: IconColor,
          link: ``,
          fileDownload: false,
          fileName: 'Training Attendance Record.pdf',
          customTop: 15,
          customLeft: 38,
        },
        {
          // color: "red",
          type: 2,
          icon: ConnectWithoutContactOutlinedIcon,
          title: "Training Evaluation Form",
          value: "TEF",
          footer: {
          color: "text-green-500",
          value: "<",
          label: "F-HRD-03.10/REV.04/EFF. DATE: 08-15-11",
          },
          custom: IconColor,
          link: ``,
          fileDownload: false,
          fileName: 'F-HRD-03.10 Training Evaluation Form (rev.04)',
          customTop: 15,
          customLeft: 38,
        },
    ] : []
  ]

  const handleOnClick = (key: string) => {
    const thisKey = key;
    setIsVisible((prevState)=>{
      return{
        ...prevState,
        [thisKey]: true
      }
    });
  };

  useEffect(()=> {
    setTimeout(()=>{
        setPageLoaded(true)
    }, 100)
  }, [])

  return (
    <div className="mt-12" style={{height: '90vh'}}>
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
        {trainingFormsData.map(({ icon, title, footer, value, ...rest }, index) => (
          <div style={{
            transition: 'transform 0.5s ease, opacity 0.5s ease',
            transform: !isVisible[`${value}${index}`] && pageLoaded ? 'translateY(0)' : 'translateY(-100%)',
            opacity: !isVisible[`${value}${index}`] && pageLoaded ? 1 : 0,
          }} data-type={index}>
            <EasyAccessCard
              value={value}
              // onClickHandler={handleOnClick}
              onClickDetails={`${value}${index}`}
              key={title}
              {...rest}
              title={title}
              icon={createElement(icon, {
                className: "w-6 h-6 text-white",
              })}
              footer={
                <Typography className="font-normal text-blue-gray-600">
                  <strong className={footer.color}>{footer.value}</strong>
                  &nbsp;{footer.label}
                </Typography>
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrainingForms;
