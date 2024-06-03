import { APILink } from '@/store/configureStore';

import AirlineSeatFlatOutlinedIcon from '@mui/icons-material/AirlineSeatFlatOutlined';
import RvHookupOutlinedIcon from '@mui/icons-material/RvHookupOutlined';
import HistoryEduOutlinedIcon from '@mui/icons-material/HistoryEduOutlined';
import PlagiarismOutlinedIcon from '@mui/icons-material/PlagiarismOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import AirplayOutlinedIcon from '@mui/icons-material/AirplayOutlined';
import AdfScannerOutlinedIcon from '@mui/icons-material/AdfScannerOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import BeenhereOutlinedIcon from '@mui/icons-material/BeenhereOutlined';

const IconColor = 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(79,9,121,1) 35%, rgba(0,240,255,1) 100%)';


export const B2FormsData = [
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
    link: `${APILink.replace('/api/v1/', '')}/media/file/F-HRD-01.01_Personnel_Action_Memo_rev.08.pdf`,
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
    link: `${APILink.replace('/api/v1/', '')}/media/file/F-HRD-01.10_Road_Test__Driving_Examination_rev.02.pdf`,
    fileDownload: true,
    fileName: 'F-HRD-01.10_Road_Test_&_Driving_Examination_(rev.02)',
    customTop: 15,
    customLeft: 38,
  },
  {
    // color: "red",
    type: 2,
    icon: HistoryEduOutlinedIcon,
    title: "Interviewer's Evaluation Sheet",
    value: "IES",
    footer: {
    color: "text-green-500",
    value: "<",
    label: "F-HRD-01.11/REV.05/EFF.DATE: 08-15-11",
    },
    custom: IconColor,
    link: `${APILink.replace('/api/v1/', '')}/media/file/F-HRD-01.11_Interviewers_Sheet_rev.05.pdf`,
    fileDownload: true,
    fileName: 'F-HRD-01.11_Interviewers_Sheet_(rev.05)',
    customTop: 15,
    customLeft: 38,
  },
  {
    // color: "red",
    type: 2,
    icon: PlagiarismOutlinedIcon,
    title: "Clearance Certificate",
    value: "CLC",
    footer: {
    color: "text-green-500",
    value: "<",
    label: "F-HRD-01.20/REV.14/EFF.DATE: 07-05-23",
    },
    custom: IconColor,
    link: `${APILink.replace('/api/v1/', '')}/media/file/F-HRD-01.20_Clearance_Certificate_Rv.14-new.pdf`,
    fileDownload: true,
    fileName: 'F-HRD-01.20_Clearance_Certificate_(Rv.14-new)',
    customTop: 15,
    customLeft: 38,
  },
  {
    // color: "red",
    type: 2,
    icon: ReceiptLongOutlinedIcon,
    title: "Employee Exit Survey",
    value: "EES",
    footer: {
    color: "text-green-500",
    value: "<",
    label: "F-HRD-01.24/REV.01/EFF.DATE: 08-15-11",
    },
    custom: IconColor,
    link: `${APILink.replace('/api/v1/', '')}/media/file/F-HRD-01.24_Employee_Exit_Survey_rev.01.pdf`,
    fileDownload: true,
    fileName: 'F-HRD-01.24_Employee_Exit_Survey_(rev.01)',
    customTop: 15,
    customLeft: 38,
  },
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
    link: `${APILink.replace('/api/v1/', '')}/media/file/F-HRD-03.03_In-House_Seminar_Evaluation_rev.03.pdf`,
    fileDownload: true,
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
    link: `${APILink.replace('/api/v1/', '')}/media/file/F-HRD-03.04_Public_Seminar_Evaluation_Form_rev.03.pdf`,
    fileDownload: true,
    fileName: 'F-HRD-03.04_Public_Seminar_Evaluation_Form_(rev.03)',
    customTop: 15,
    customLeft: 38,
  },
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
    link: `${APILink.replace('/api/v1/', '')}/media/file/F-HRD-03.08_Affidavit_of_Undertaking_rev.03.pdf`,
    fileDownload: true,
    fileName: 'F-HRD-03.08_Affidavit_of_Undertaking_(rev.03)',
    customTop: 15,
    customLeft: 38,
  },
  {
    // color: "red",
    type: 2,
    icon: BeenhereOutlinedIcon,
    title: "Authority to Deduct Health Insurance",
    value: "ATD",
    footer: {
    color: "text-green-500",
    value: "<",
    label: "F-HRD-03.11/REV.00/EFF.DATE: 08-03-22",
    },
    custom: IconColor,
    link: `${APILink.replace('/api/v1/', '')}/media/file/F-HRD-03.11_AUTHORITY_TO_DEDUCT_-_HEALTH_INSURANCE_rev.00.pdf`,
    fileDownload: true,
    fileName: 'F-HRD-03.11_AUTHORITY_TO_DEDUCT_-_HEALTH_INSURANCE_(rev.00)',
    customTop: 15,
    customLeft: 38,
  },
];

