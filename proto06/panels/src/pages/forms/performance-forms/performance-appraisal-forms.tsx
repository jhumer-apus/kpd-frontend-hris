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
import EditLocationAltOutlinedIcon from '@mui/icons-material/EditLocationAltOutlined';
import DryCleaningOutlinedIcon from '@mui/icons-material/DryCleaningOutlined';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import { APILink, RootState } from '@/store/configureStore';
import { useSelector } from "react-redux";
import { INTERNAL_USER_ROLE } from "@/types/types-store";


const IconColor = 'linear-gradient(56deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,90,255,1) 100%)';



export interface DivAnimate {
  [key: string]: boolean
}

export function PerformanceAppraisalForms() {
  const userState = useSelector((state: RootState)=> state.auth)
  const [isVisible, setIsVisible] = useState<DivAnimate>({});
  const [pageLoaded, setPageLoaded] = useState(false);

  const performanceAppraisalFormData = [
    {
      // color: "red",
      type: 2,
      icon: ReceiptOutlinedIcon,
      title: "Employee Performance Monitoring Sheet",
      value: "EPM",
      footer: {
      color: "text-green-500",
      value: "<",
      label: "F-HRD-02.02/REV.00/EFF.DATE: 10-18-23",
      },
      custom: IconColor,
      link: `${APILink.replace('/api/v1/', '')}/media/file/F-HRD-02.02_EMPLOYEE_PERFORMANCE_MONITORING_SHEET_PROBATIONARY.pdf`,
      fileDownload: true,
      fileName: 'F-HRD-02.02_EMPLOYEE_PERFORMANCE_MONITORING_SHEET_(PROBATIONARY)',
      customTop: 15,
      customLeft: 38,
    },
    ...(userState?.user?.role !== INTERNAL_USER_ROLE.Employee ) ? [
        {
            // color: "red",
            type: 2,
            icon: EditLocationAltOutlinedIcon,
            title: "Performance Eval Form Rank & File",
            value: "PEF - R&F",
            footer: {
            color: "text-green-500",
            value: "<",
            label: "F-HRD-02.01/REV.06/EFF.DATE: 02-21-20",
            },
            custom: IconColor,
            link: `${APILink.replace('/api/v1/', '')}/media/file/F-HRD-02.01A_Performance_Evaluation_Form_Rank_and_File_rev.06.pdf`,
            fileDownload: true,
            fileName: 'F-HRD-02.01A_Performance_Evaluation_Form_Rank_and_File_rev.06.pdf',
            customTop: 15,
            customLeft: 38,
        },
        {
            // color: "red",
            type: 2,
            icon: EditLocationAltOutlinedIcon,
            title: "Performance Eval Form - Confidential",
            value: "PEF - CFD",
            footer: {
            color: "text-green-500",
            value: "<",
            label: "F-HRD-02.01/REV.08/EFF.DATE: 02-21-20",
            },
            custom: IconColor,
            link: `${APILink.replace('/api/v1/', '')}/media/file/F-HRD-02.01_Performance_Evaluation_Form_Confidential_Payroll_rev.08.pdf`,
            fileDownload: true,
            fileName: 'F-HRD-02.01_Performance_Evaluation_Form_Confidential_Payroll_rev.08.pdf',
            customTop: 15,
            customLeft: 38,
        },
        {
          // color: "red",
          type: 2,
          icon: EditLocationAltOutlinedIcon,
          title: "Performance Appraisal Tally Sheet",
          value: "PATS",
          footer: {
          color: "text-green-500",
          value: "<",
          label: "F-HRD-03.06/REV.02/EFF.DATE: 08-15-11",
          },
          custom: IconColor,
          link: `${APILink.replace('/api/v1/', '')}/media/file/F-HRD-03.06_Performance_Appraisal_Tally_Sheet_rev.02.pdf`,
          fileDownload: true,
          fileName: 'F-HRD-03.06 Performance Appraisal Tally Sheet (rev.02)',
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
        {performanceAppraisalFormData.map(({ icon, title, footer, value, ...rest }, index) => (
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

export default PerformanceAppraisalForms;
