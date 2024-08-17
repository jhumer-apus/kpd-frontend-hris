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
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import RvHookupOutlinedIcon from '@mui/icons-material/RvHookupOutlined';
import EditLocationAltOutlinedIcon from '@mui/icons-material/EditLocationAltOutlined';
import AirlineSeatFlatOutlinedIcon from '@mui/icons-material/AirlineSeatFlatOutlined';
import DryCleaningOutlinedIcon from '@mui/icons-material/DryCleaningOutlined';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import { APILink, RootState } from '@/store/configureStore';
import { useSelector } from "react-redux";
import { INTERNAL_USER_ROLE } from "@/types/types-store";


const IconColor = 'linear-gradient(56deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,90,255,1) 100%)';



export interface DivAnimate {
  [key: string]: boolean
}

export function RecruitmentForms() {
  const userState = useSelector((state: RootState)=> state.auth)
  const [isVisible, setIsVisible] = useState<DivAnimate>({});
  const [pageLoaded, setPageLoaded] = useState(false);

  const recruitmentFormsData = [
    {
      // color: "red",
      type: 2,
      icon: AirlineSeatFlatOutlinedIcon,
      title: "Personnel Action Memo",
      value: "PAM",
      footer: {
      color: "text-green-500",
      value: "<",
      label: "F-HRD-01.01/REV.08/EFF.DATE: 07-05-23",
      },
      custom: IconColor,
      link: ``,
      fileDownload: true,
      fileName: 'F-HRD-01.01_Personnel_Action_Memo_(rev.08)',
      customTop: 15,
      customLeft: 38,
    },
    {
      // color: "red",
      type: 2,
      icon: RvHookupOutlinedIcon,
      title: "Road Test & Driving Examination Form",
      value: "RTD",
      footer: {
      color: "text-green-500",
      value: "<",
      label: "F-HRD-01.10/REV.02/EFF.DATE: 08-15-11",
      },
      custom: IconColor,
      link: ``,
      fileDownload: true,
      fileName: 'F-HRD-01.10_Road_Test_&_Driving_Examination_(rev.02)',
      customTop: 15,
      customLeft: 38,
    },
    ...(userState?.user?.role !== INTERNAL_USER_ROLE.Employee ) ? [
      {
        // color: "red",
        type: 2,
        icon: DescriptionOutlinedIcon,
        title: "Application Form",
        value: "APF",
        footer: {
        color: "text-green-500",
        value: "<",
        label: "F-HRD-01.03/REV.04/EFF.DATE: 12-15-19",
        },
        custom: IconColor,
        link: ``,
        fileDownload: true,
        fileName: 'F-HRD-01.03_Application_Form_rev.04.pdf',
        customTop: 15,
        customLeft: 38,
      },
      {
        // color: "red",
        type: 2,
        icon: ContactMailOutlinedIcon,
        title: "Employee Requirement Slip",
        value: "ERS",
        footer: {
        color: "text-green-500",
        value: "<",
        label: "F-HRD-01.04/REV.05/EFF.DATE: 09-05-22",
        },
        custom: IconColor,
        link: ``,
        fileDownload: true,
        fileName: 'F-HRD-01.04_Employment_Requirement_Slip_rev.05.pdf',
        customTop: 15,
        customLeft: 38,
      },
      {
        // color: "red",
        type: 2,
        icon: DryCleaningOutlinedIcon,
        title: "Employee Uniform Responsibility Form",
        value: "URF",
        footer: {
        color: "text-green-500",
        value: "<",
        label: "F-HRD-07.15/REV.00/EFF.DATE: 07-15-21",
        },
        custom: IconColor,
        link: ``,
        fileDownload: true,
        fileName: 'F-HRD-07.15_EMPLOYEE_UNIFORM_RESPONSIBILITY_FORM.pdf',
        customTop: 15,
        customLeft: 38,
      },
      {
        // color: "red",
        type: 2,
        icon: CollectionsBookmarkOutlinedIcon,
        title: "Orientation Checklist Form",
        value: "OCF",
        footer: {
        color: "text-green-500",
        value: "<",
        label: "F-HRD-01.13/REV.11/EFF.DATE: 10-07-21",
        },
        custom: IconColor,
        link: ``,
        fileDownload: true,
        fileName: 'F-HRD-01.13_ORIENTATION_CHECKLIST_rev.11.pdf',
        customTop: 15,
        customLeft: 38,
      },
      {
        // color: "red",
        type: 2,
        icon: DryCleaningOutlinedIcon,
        title: "Employee Requisition Form",
        value: "ERF",
        footer: {
        color: "text-green-500",
        value: "<",
        label: "F-HRD-01.02/REV.08/EFF.DATE: 06-20-19",
        },
        custom: IconColor,
        link: ``,
        fileDownload: true,
        fileName: 'F-HRD-01.02_Personnel_Requisition_Form_rev.08.pdf',
        customTop: 15,
        customLeft: 38,
      },
      {
        // color: "red",
        type: 2,
        icon: DryCleaningOutlinedIcon,
        title: "Interviewer's Evaluation Sheet",
        value: "IES",
        footer: {
        color: "text-green-500",
        value: "<",
        label: "F-HRD-01.11/REV.05/EFF.DATE: 08-15-11",
        },
        custom: IconColor,
        link: ``,
        fileDownload: true,
        fileName: 'F-HRD-01.11_Interviewers_Sheet_rev.05.pdf',
        customTop: 15,
        customLeft: 38,
      },
      {
        // color: "red",
        type: 2,
        icon: DryCleaningOutlinedIcon,
        title: "Request for Registration of Non-Compete Agreement SFFI",
        value: "RRNA-SFFI",
        footer: {
        color: "text-green-500",
        value: "<",
        label: "F-HRD-01.43/ REV.00/EFF.DATE:06-03-24",
        },
        custom: IconColor,
        link: ``,
        fileDownload: true,
        fileName: 'F-HRD-01.43 Non-compete Agreement (SFFI)',
        customTop: 15,
        customLeft: 38,
      },
      {
        // color: "red",
        type: 2,
        icon: DryCleaningOutlinedIcon,
        title: "Request for Registration of Non-Compete Agreement SFBI",
        value: "RRNA-SFBI",
        footer: {
        color: "text-green-500",
        value: "<",
        label: "F-HRD-01.43(a)/ REV.00/EFF.DATE:06-03-24",
        },
        custom: IconColor,
        link: ``,
        fileDownload: true,
        fileName: 'F-HRD-01.43(a) Non-compete Agreement (SFBI)',
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
        {recruitmentFormsData.map(({ icon, title, footer, value, ...rest }, index) => (
          <div style={{
            transition: 'transform 0.5s ease, opacity 0.5s ease',
            transform: !isVisible[`${value}${index}`] && pageLoaded ? 'translateY(0)' : 'translateY(-100%)',
            opacity: !isVisible[`${value}${index}`] && pageLoaded ? 1 : 0,
          }} data-type={index}>
            <EasyAccessCard
              value={value}
              onClickHandler={handleOnClick}
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

export default RecruitmentForms;
