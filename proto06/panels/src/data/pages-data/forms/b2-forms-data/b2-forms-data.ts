import AnimationIcon from '@mui/icons-material/Animation';
import AssistantIcon from '@mui/icons-material/Assistant';
import BedroomParentOutlinedIcon from '@mui/icons-material/BedroomParentOutlined';
import Brightness4OutlinedIcon from '@mui/icons-material/Brightness4Outlined';
import ContactMailOutlinedIcon from '@mui/icons-material/ContactMailOutlined';
import ConnectWithoutContactOutlinedIcon from '@mui/icons-material/ConnectWithoutContactOutlined';
import CollectionsBookmarkOutlinedIcon from '@mui/icons-material/CollectionsBookmarkOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';

import EditLocationAltOutlinedIcon from '@mui/icons-material/EditLocationAltOutlined';
import DryCleaningOutlinedIcon from '@mui/icons-material/DryCleaningOutlined';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import { APILink } from '@/store/configureStore';


const IconColor = 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(79,9,121,1) 35%, rgba(0,240,255,1) 100%)';


export const B2FormsData = [
  {
    // color: "red",
    type: 2,
    icon: AnimationIcon,
    title: "Personnel Action Memo",
    value: "PAM",
    footer: {
    color: "text-green-500",
    value: "<",
    label: "F-HRD-01.16/REV.04/EFF.DATE: 10-01-16",
    },
    custom: IconColor,
    link: `${APILink.replace('/api/v1/', '')}/media/file/F-HRD-01.01_Personnel_Action_Memo_rev.08.pdf`,
    fileDownload: true,
    fileName: 'Action_Memo',
    customTop: 15,
    customLeft: 38,
  },
  {
    // color: "red",
    type: 2,
    icon: AssistantIcon,
    title: "Road Test & Driving Examination Form",
    value: "RTD",
    footer: {
    color: "text-green-500",
    value: "<",
    label: "F-HRD-01.17B/REV.00/EFF.DATE: 04-01-17",
    },
    custom: IconColor,
    link: `${APILink.replace('/api/v1/', '')}/F-HRD-01.10_Road_Test_&_Driving_Examination_(rev.02)`,
    fileDownload: true,
    fileName: 'F-HRD-01.10_Road_Test_&_Driving_Examination_(rev.02)',
    customTop: 15,
    customLeft: 38,
  },
  {
    // color: "red",
    type: 2,
    icon: BedroomParentOutlinedIcon,
    title: "Interviewer's Evaluation Sheet",
    value: "IES",
    footer: {
    color: "text-green-500",
    value: "<",
    label: "F-HRD-01.19/REV.04/EFF.DATE: 03-20-23",
    },
    custom: IconColor,
    link: `${APILink.replace('/api/v1/', '')}/F-HRD-01.11_Interviewers_Sheet_(rev.05).pdf`,
    fileDownload: true,
    fileName: 'F-HRD-01.11_Interviewers_Sheet_(rev.05)',
    customTop: 15,
    customLeft: 38,
  },
  {
    // color: "red",
    type: 2,
    icon: Brightness4OutlinedIcon,
    title: "Clearance Certificate",
    value: "CLC",
    footer: {
    color: "text-green-500",
    value: "<",
    label: "F-HRD-01.17/REV.04/EFF.DATE: 09-05-22",
    },
    custom: IconColor,
    link: `${APILink.replace('/api/v1/', '')}/F-HRD-01.20_Clearance_Certificate_(Rv.14-new).pdf`,
    fileDownload: true,
    fileName: 'F-HRD-01.20_Clearance_Certificate_(Rv.14-new)',
    customTop: 15,
    customLeft: 38,
  },
  {
    // color: "red",
    type: 2,
    icon: ContactMailOutlinedIcon,
    title: "Employee Exit Survey",
    value: "EES",
    footer: {
    color: "text-green-500",
    value: "<",
    label: "F-HRD-01.02/REV.08/EFF.DATE: 06-20-19",
    },
    custom: IconColor,
    link: `${APILink.replace('/api/v1/', '')}/F-HRD-01.24_Employee_Exit_Survey_(rev.01).pdf`,
    fileDownload: true,
    fileName: 'F-HRD-01.24_Employee_Exit_Survey_(rev.01)',
    customTop: 15,
    customLeft: 38,
  },
  {
    // color: "red",
    type: 2,
    icon: ConnectWithoutContactOutlinedIcon,
    title: "Employee Performance Monitoring Sheet",
    value: "EPM",
    footer: {
    color: "text-green-500",
    value: "<",
    label: "F-HRD-03.02/REV.02/EFF.DATE: 08-15-11",
    },
    custom: IconColor,
    link: `${APILink.replace('/api/v1/', '')}/F-HRD-02.02_EMPLOYEE_PERFORMANCE_MONITORING_SHEET_(PROBATIONARY).pdf`,
    fileDownload: true,
    fileName: 'F-HRD-02.02_EMPLOYEE_PERFORMANCE_MONITORING_SHEET_(PROBATIONARY)',
    customTop: 15,
    customLeft: 38,
  },
  {
    // color: "red",
    type: 2,
    icon: CollectionsBookmarkOutlinedIcon,
    title: "In-House Seminar Evaluation",
    value: "ISE",
    footer: {
    color: "text-green-500",
    value: "<",
    label: "F-HRD-01.13/REV.11/EFF.DATE: 10-07-21",
    },
    custom: IconColor,
    link: `${APILink.replace('/api/v1/', '')}/F-HRD-03.03_In-House_Seminar_Evaluation_(rev.03).pdf`,
    fileDownload: true,
    fileName: 'F-HRD-03.03_In-House_Seminar_Evaluation_(rev.03)',
    customTop: 15,
    customLeft: 38,
  },
  {
    // color: "red",
    type: 2,
    icon: DescriptionOutlinedIcon,
    title: "Public Seminar Evaluation Form",
    value: "PSE",
    footer: {
    color: "text-green-500",
    value: "<",
    label: "F-HRD-01.03/REV.04/EFF.DATE: 12-15-19",
    },
    custom: IconColor,
    link: `${APILink.replace('/api/v1/', '')}/media/file/F-HRD-03.04_Public_Seminar_Evaluation_Form_rev.03.pdf`,
    fileDownload: true,
    fileName: 'F-HRD-03.04_Public_Seminar_Evaluation_Form_(rev.03)',
    customTop: 15,
    customLeft: 38,
  },
  {
    // color: "red",
    type: 2,
    icon: EditLocationAltOutlinedIcon,
    title: "Affidavit of Undertaking",
    value: "AOU",
    footer: {
    color: "text-green-500",
    value: "<",
    label: "F-HRD-02.01/REV.06/EFF.DATE: 02-21-20",
    },
    custom: IconColor,
    link: `${APILink.replace('/api/v1/', '')}/F-HRD-03.08_Affidavit_of_Undertaking_(rev.03).pdf`,
    fileDownload: true,
    fileName: 'F-HRD-03.08_Affidavit_of_Undertaking_(rev.03)',
    customTop: 15,
    customLeft: 38,
  },
  {
    // color: "red",
    type: 2,
    icon: DryCleaningOutlinedIcon,
    title: "Authority to Deduct Health Insurance",
    value: "ATD",
    footer: {
    color: "text-green-500",
    value: "<",
    label: "F-HRD-07.15/REV.00/EFF.DATE: 07-15-21",
    },
    custom: IconColor,
    link: `${APILink.replace('/api/v1/', '')}/F-HRD-03.11_AUTHORITY_TO_DEDUCT_-_HEALTH_INSURANCE_(rev.00).pdf`,
    fileDownload: true,
    fileName: 'F-HRD-03.11_AUTHORITY_TO_DEDUCT_-_HEALTH_INSURANCE_(rev.00)',
    customTop: 15,
    customLeft: 38,
  },
];

