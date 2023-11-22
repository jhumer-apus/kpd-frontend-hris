import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { 
    // Holiday SECTION
    HolidayCreate,
    HolidayCreateFailure,
    HolidayCreateFailureCleanup,
    HolidayCreateProgress,
    HolidayCreateSuccess,
    HolidaysGet,
    HolidaysGetFailure,
    HolidaysGetFailureCleanup,
    HolidaysGetProgress,
    HolidaysGetSuccess,
    HolidayEditSubmit,
    HolidayEditSubmitFailure,
    HolidayEditSubmitFailureCleanup,
    HolidayEditSubmitProgress,
    HolidayEditSubmitSuccess,
    // OBT SECTION
    OBTViewAction,
    OBTViewActionSuccess,
    OBTViewActionFailure,
    OBTViewActionFailureCleanup,
    OBTViewActionProgress,
    OBTViewFilterEmployeeAction,
    OBTViewFilterEmployeeActionFailure,
    OBTViewFilterEmployeeActionFailureCleanup,
    OBTViewFilterEmployeeActionProgress,
    OBTViewFilterEmployeeActionSuccess,
    OBTViewFilterEmployeeAndOBTAction,
    OBTViewFilterEmployeeAndOBTActionFailure,
    OBTViewFilterEmployeeAndOBTActionFailureCleanup,
    OBTViewFilterEmployeeAndOBTActionProgress,
    OBTViewFilterEmployeeAndOBTActionSuccess,
    OBTCreateAction,
    OBTCreateActionFailure,
    OBTCreateActionFailureCleanup,
    OBTCreateActionProgress,
    OBTCreateActionSuccess,
    OBTEditAction,
    OBTEditActionFailure,
    OBTEditActionFailureCleanup,
    OBTEditActionProgress,
    OBTEditActionSuccess,
    OBTViewFilterApproverAction,
    OBTViewFilterApproverActionFailure,
    OBTViewFilterApproverActionFailureCleanup,
    OBTViewFilterApproverActionProgress,
    OBTViewFilterApproverActionSuccess,
    // OVERTIME SECTION
    OVERTIMECreateAction,
    OVERTIMECreateActionFailure,
    OVERTIMECreateActionFailureCleanup,
    OVERTIMECreateActionProgress,
    OVERTIMECreateActionSuccess,
    OVERTIMEEditAction,
    OVERTIMEEditActionFailure,
    OVERTIMEEditActionFailureCleanup,
    OVERTIMEEditActionProgress,
    OVERTIMEEditActionSuccess,
    OVERTIMEViewAction,
    OVERTIMEViewActionFailure,
    OVERTIMEViewActionFailureCleanup,
    OVERTIMEViewActionProgress,
    OVERTIMEViewActionSuccess,
    OVERTIMEViewFilterApproverAction,
    OVERTIMEViewFilterApproverActionFailure,
    OVERTIMEViewFilterApproverActionFailureCleanup,
    OVERTIMEViewFilterApproverActionProgress,
    OVERTIMEViewFilterApproverActionSuccess,
    OVERTIMEViewFilterEmployeeAction,
    OVERTIMEViewFilterEmployeeActionFailure,
    OVERTIMEViewFilterEmployeeActionFailureCleanup,
    OVERTIMEViewFilterEmployeeActionProgress,
    OVERTIMEViewFilterEmployeeActionSuccess,
    OVERTIMEViewFilterEmployeeAndOVERTIMEAction,
    OVERTIMEViewFilterEmployeeAndOVERTIMEActionFailure,
    OVERTIMEViewFilterEmployeeAndOVERTIMEActionFailureCleanup,
    OVERTIMEViewFilterEmployeeAndOVERTIMEActionProgress,
    OVERTIMEViewFilterEmployeeAndOVERTIMEActionSuccess,
    // LEAVE SECTION
    LEAVECreateAction,
    LEAVECreateActionFailure,
    LEAVECreateActionFailureCleanup,
    LEAVECreateActionProgress,
    LEAVECreateActionSuccess,
    LEAVEEditAction,
    LEAVEEditActionFailure,
    LEAVEEditActionFailureCleanup,
    LEAVEEditActionProgress,
    LEAVEEditActionSuccess,
    LEAVEViewAction,
    LEAVEViewActionFailure,
    LEAVEViewActionFailureCleanup,
    LEAVEViewActionProgress,
    LEAVEViewActionSuccess,
    LEAVEViewFilterApproverAction,
    LEAVEViewFilterApproverActionFailure,
    LEAVEViewFilterApproverActionFailureCleanup,
    LEAVEViewFilterApproverActionProgress,
    LEAVEViewFilterApproverActionSuccess,
    LEAVEViewFilterEmployeeAction,
    LEAVEViewFilterEmployeeActionFailure,
    LEAVEViewFilterEmployeeActionFailureCleanup,
    LEAVEViewFilterEmployeeActionProgress,
    LEAVEViewFilterEmployeeActionSuccess,
    LEAVEViewFilterEmployeeAndLEAVEAction,
    LEAVEViewFilterEmployeeAndLEAVEActionFailure,
    LEAVEViewFilterEmployeeAndLEAVEActionFailureCleanup,
    LEAVEViewFilterEmployeeAndLEAVEActionProgress,
    LEAVEViewFilterEmployeeAndLEAVEActionSuccess,
    // UA SECTION
    UACreateAction,
    UACreateActionFailure,
    UACreateActionFailureCleanup,
    UACreateActionProgress,
    UACreateActionSuccess,
    UAEditAction,
    UAEditActionFailure,
    UAEditActionFailureCleanup,
    UAEditActionProgress,
    UAEditActionSuccess,
    UAViewAction,
    UAViewActionFailure,
    UAViewActionFailureCleanup,
    UAViewActionProgress,
    UAViewActionSuccess,
    UAViewFilterApproverAction,
    UAViewFilterApproverActionFailure,
    UAViewFilterApproverActionFailureCleanup,
    UAViewFilterApproverActionProgress,
    UAViewFilterApproverActionSuccess,
    UAViewFilterEmployeeAction,
    UAViewFilterEmployeeActionFailure,
    UAViewFilterEmployeeActionFailureCleanup,
    UAViewFilterEmployeeActionProgress,
    UAViewFilterEmployeeActionSuccess,
    UAViewFilterEmployeeAndUAAction,
    UAViewFilterEmployeeAndUAActionFailure,
    UAViewFilterEmployeeAndUAActionFailureCleanup,
    UAViewFilterEmployeeAndUAActionProgress,
    UAViewFilterEmployeeAndUAActionSuccess,
    // LEAVECREDIT SECTION
    LEAVECREDITCreateAction,
    LEAVECREDITCreateActionFailure,
    LEAVECREDITCreateActionFailureCleanup,
    LEAVECREDITCreateActionProgress,
    LEAVECREDITCreateActionSuccess,
    LEAVECREDITEditAction,
    LEAVECREDITEditActionFailure,
    LEAVECREDITEditActionFailureCleanup,
    LEAVECREDITEditActionProgress,
    LEAVECREDITEditActionSuccess,
    LEAVECREDITViewAction,
    LEAVECREDITViewActionFailure,
    LEAVECREDITViewActionFailureCleanup,
    LEAVECREDITViewActionProgress,
    LEAVECREDITViewActionSuccess,
    LEAVECREDITViewFilterEmployeeAction,
    LEAVECREDITViewFilterEmployeeActionFailure,
    LEAVECREDITViewFilterEmployeeActionFailureCleanup,
    LEAVECREDITViewFilterEmployeeActionProgress,
    LEAVECREDITViewFilterEmployeeActionSuccess,
    // LEAVETYPE SECTION
    LEAVETYPECreateAction,
    LEAVETYPECreateActionFailure,
    LEAVETYPECreateActionFailureCleanup,
    LEAVETYPECreateActionProgress,
    LEAVETYPECreateActionSuccess,
    LEAVETYPEEditAction,
    LEAVETYPEEditActionFailure,
    LEAVETYPEEditActionFailureCleanup,
    LEAVETYPEEditActionProgress,
    LEAVETYPEEditActionSuccess,
    LEAVETYPEViewAction,
    LEAVETYPEViewActionFailure,
    LEAVETYPEViewActionFailureCleanup,
    LEAVETYPEViewActionProgress,
    LEAVETYPEViewActionSuccess,
    LEAVETYPEViewFilterEmployeeAction,
    LEAVETYPEViewFilterEmployeeActionFailure,
    LEAVETYPEViewFilterEmployeeActionFailureCleanup,
    LEAVETYPEViewFilterEmployeeActionProgress,
    LEAVETYPEViewFilterEmployeeActionSuccess,
    LEAVETYPEDeleteAction,
    LEAVETYPEDeleteActionFailure,
    LEAVETYPEDeleteActionFailureCleanup,
    LEAVETYPEDeleteActionProgress,
    LEAVETYPEDeleteActionSuccess,
    // CUTOFFPERIOD SECTION
    CUTOFFPERIODCreateAction,
    CUTOFFPERIODCreateActionFailure,
    CUTOFFPERIODCreateActionFailureCleanup,
    CUTOFFPERIODCreateActionProgress,
    CUTOFFPERIODCreateActionSuccess,
    CUTOFFPERIODEditAction,
    CUTOFFPERIODEditActionFailure,
    CUTOFFPERIODEditActionFailureCleanup,
    CUTOFFPERIODEditActionProgress,
    CUTOFFPERIODEditActionSuccess,
    CUTOFFPERIODViewAction,
    CUTOFFPERIODViewActionFailure,
    CUTOFFPERIODViewActionFailureCleanup,
    CUTOFFPERIODViewActionProgress,
    CUTOFFPERIODViewActionSuccess,
    CUTOFFPERIODViewFilterCUTOFFPERIODAction,
    CUTOFFPERIODViewFilterCUTOFFPERIODActionFailure,
    CUTOFFPERIODViewFilterCUTOFFPERIODActionFailureCleanup,
    CUTOFFPERIODViewFilterCUTOFFPERIODActionProgress,
    CUTOFFPERIODViewFilterCUTOFFPERIODActionSuccess,
    // SCHEDULESHIFT SECTION
    SCHEDULESHIFTCreateAction,
    SCHEDULESHIFTCreateActionFailure,
    SCHEDULESHIFTCreateActionFailureCleanup,
    SCHEDULESHIFTCreateActionProgress,
    SCHEDULESHIFTCreateActionSuccess,
    SCHEDULESHIFTEditAction,
    SCHEDULESHIFTEditActionFailure,
    SCHEDULESHIFTEditActionFailureCleanup,
    SCHEDULESHIFTEditActionProgress,
    SCHEDULESHIFTEditActionSuccess,
    SCHEDULESHIFTViewAction,
    SCHEDULESHIFTViewActionFailure,
    SCHEDULESHIFTViewActionFailureCleanup,
    SCHEDULESHIFTViewActionProgress,
    SCHEDULESHIFTViewActionSuccess,
    SCHEDULESHIFTViewFilterSCHEDULESHIFTAction,
    SCHEDULESHIFTViewFilterSCHEDULESHIFTActionFailure,
    SCHEDULESHIFTViewFilterSCHEDULESHIFTActionFailureCleanup,
    SCHEDULESHIFTViewFilterSCHEDULESHIFTActionProgress,
    SCHEDULESHIFTViewFilterSCHEDULESHIFTActionSuccess,
    SCHEDULESHIFTDeleteAction,
    SCHEDULESHIFTDeleteActionFailure,
    SCHEDULESHIFTDeleteActionFailureCleanup,
    SCHEDULESHIFTDeleteActionProgress,
    SCHEDULESHIFTDeleteActionSuccess,
    // SCHEDULEDAILY SECTION
    SCHEDULEDAILYCreateAction,
    SCHEDULEDAILYCreateActionFailure,
    SCHEDULEDAILYCreateActionFailureCleanup,
    SCHEDULEDAILYCreateActionProgress,
    SCHEDULEDAILYCreateActionSuccess,
    SCHEDULEDAILYEditAction,
    SCHEDULEDAILYEditActionFailure,
    SCHEDULEDAILYEditActionFailureCleanup,
    SCHEDULEDAILYEditActionProgress,
    SCHEDULEDAILYEditActionSuccess,
    SCHEDULEDAILYViewAction,
    SCHEDULEDAILYViewActionFailure,
    SCHEDULEDAILYViewActionFailureCleanup,
    SCHEDULEDAILYViewActionProgress,
    SCHEDULEDAILYViewActionSuccess,
    SCHEDULEDAILYViewFilterEmployeeAction,
    SCHEDULEDAILYViewFilterEmployeeActionFailure,
    SCHEDULEDAILYViewFilterEmployeeActionFailureCleanup,
    SCHEDULEDAILYViewFilterEmployeeActionProgress,
    SCHEDULEDAILYViewFilterEmployeeActionSuccess,
    SCHEDULEDAILYViewFilterEmployeeAndSCHEDULEDAILYAction,
    SCHEDULEDAILYViewFilterEmployeeAndSCHEDULEDAILYActionFailure,
    SCHEDULEDAILYViewFilterEmployeeAndSCHEDULEDAILYActionFailureCleanup,
    SCHEDULEDAILYViewFilterEmployeeAndSCHEDULEDAILYActionProgress,
    SCHEDULEDAILYViewFilterEmployeeAndSCHEDULEDAILYActionSuccess,
    
} from '../actions/procedurals';
// import '../actions/procedurals.ts'; // TO DO: Optimize importing all from one ts file. 
import { 
  HolidayGetType, 
  OBTCreateInterface, 
  OBTViewInterface, 
  OBTEditInterface, 
  OVERTIMECreateInterface, 
  OVERTIMEEditInterface, 
  OVERTIMEViewInterface,
  LEAVECreateInterface, 
  LEAVEEditInterface, 
  LEAVEViewInterface, 
  UACreateInterface, 
  UAEditInterface, 
  UAViewInterface, 
  LEAVECREDITCreateInterface, 
  LEAVECREDITEditInterface, 
  LEAVECREDITViewInterface, 
  LEAVETYPECreateInterface, 
  LEAVETYPEEditInterface, 
  LEAVETYPEViewInterface, 
  CUTOFFPERIODCreateInterface, 
  CUTOFFPERIODEditInterface, 
  CUTOFFPERIODViewInterface, 
  SCHEDULESHIFTCreateInterface, 
  SCHEDULESHIFTEditInterface, 
  SCHEDULESHIFTViewInterface, 
  SCHEDULEDAILYCreateInterface, 
  SCHEDULEDAILYEditInterface, 
  SCHEDULEDAILYViewInterface, 
} from '@/types/types-pages';
import { globalReducerFailed, globalReducerLoading, globalReducerRefreshed, globalReducerSuccess } from '../configureStore';

type ProceduralsPayloads = 
string |
HolidayGetType[] | 
HolidayGetType | 
OBTViewInterface[] | 
OBTViewInterface | 
OBTCreateInterface | 
OVERTIMEViewInterface[] | 
OVERTIMEViewInterface | 
OVERTIMECreateInterface |
LEAVEViewInterface[] | 
LEAVEViewInterface | 
LEAVECreateInterface |
UAViewInterface[] | 
UAViewInterface | 
UACreateInterface | 
LEAVECREDITViewInterface[] | 
LEAVECREDITViewInterface | 
LEAVECREDITCreateInterface |
LEAVETYPEViewInterface[] | 
LEAVETYPEViewInterface | 
LEAVETYPECreateInterface | 
CUTOFFPERIODViewInterface[] | 
CUTOFFPERIODViewInterface | 
CUTOFFPERIODCreateInterface | 
SCHEDULESHIFTViewInterface[] | 
SCHEDULESHIFTViewInterface | 
SCHEDULESHIFTCreateInterface |
SCHEDULEDAILYViewInterface[] | 
SCHEDULEDAILYViewInterface | 
SCHEDULEDAILYCreateInterface |
SCHEDULEDAILYEditInterface 
;

interface CommonProceduralState {
  status: string | null;
  progress: number;
  error: string | null; 
}

interface CommonProceduralDataStringState {
  data: string | null;
}

interface HolidaysGetState extends CommonProceduralState{
  data: HolidayGetType[];
}

interface HolidayCreateState extends CommonProceduralState{
  data: HolidayGetType | null;
}

interface HolidayEditSubmitState extends CommonProceduralState{
  data: HolidayGetType | null;
}

// OBT SECTION // OBT SECTION // OBT SECTION // OBT SECTION // OBT SECTION 
interface OBTViewState extends CommonProceduralState{
  data: OBTViewInterface[] | null | [] | OBTViewInterface;
}

interface OBTCreateState extends CommonProceduralState{
  data: OBTCreateInterface | null | {};
}

interface OBTEditState extends CommonProceduralState {
  data: OBTViewState | null;
}

// OVERTIME SECTION // OVERTIME SECTION // OVERTIME SECTION // OVERTIME SECTION
interface OVERTIMEViewState extends CommonProceduralState{
  data: OVERTIMEViewInterface[] | null | [] | OVERTIMEViewInterface;
}

interface OVERTIMECreateState extends CommonProceduralState{
  data: OVERTIMECreateInterface | null | {};
}

interface OVERTIMEEditState extends CommonProceduralState {
  data: OVERTIMEViewState | null;
}

// LEAVE SECTION // LEAVE SECTION // LEAVE SECTION // LEAVE SECTION
interface LEAVEViewState extends CommonProceduralState{
  data: LEAVEViewInterface[] | null | [] | LEAVEViewInterface;
}

interface LEAVECreateState extends CommonProceduralState{
  data: LEAVECreateInterface | null | {};
}

interface LEAVEEditState extends CommonProceduralState {
  data: LEAVEViewState | null;
}

// UA SECTION // UA SECTION // UA SECTION // UA SECTION
interface UAViewState extends CommonProceduralState{
  data: UAViewInterface[] | null | [] | UAViewInterface;
}

interface UACreateState extends CommonProceduralState{
  data: UACreateInterface | null | {};
}

interface UAEditState extends CommonProceduralState {
  data: UAViewState | null;
}

// LEAVECREDIT SECTION // LEAVECREDIT SECTION // LEAVECREDIT SECTION // LEAVECREDIT SECTION
interface LEAVECREDITViewState extends CommonProceduralState{
  data: LEAVECREDITViewInterface[] | null | [] | LEAVECREDITViewInterface;
}

interface LEAVECREDITCreateState extends CommonProceduralState{
  data: LEAVECREDITCreateInterface | null | {};
}

interface LEAVECREDITEditState extends CommonProceduralState {
  data: LEAVECREDITViewState | null;
}

// LEAVETYPE SECTION // LEAVETYPE SECTION // LEAVETYPE SECTION // LEAVETYPE SECTION
interface LEAVETYPEViewState extends CommonProceduralState{
  data: LEAVETYPEViewInterface[] | null | [] | LEAVETYPEViewInterface;
}

interface LEAVETYPECreateState extends CommonProceduralState{
  data: LEAVETYPECreateInterface | null | {};
}

interface LEAVETYPEEditState extends CommonProceduralState {
  data: LEAVETYPEViewState | null;
}

interface LEAVETYPEDeleteState extends CommonProceduralState, CommonProceduralDataStringState {}

// CUTOFFPERIOD SECTION // CUTOFFPERIOD SECTION // CUTOFFPERIOD SECTION // CUTOFFPERIOD SECTION
interface CUTOFFPERIODViewState extends CommonProceduralState{
  data: CUTOFFPERIODViewInterface[] | null | [];
}

interface CUTOFFPERIODCreateState extends CommonProceduralState{
  data: CUTOFFPERIODCreateInterface | null | {};
}

interface CUTOFFPERIODEditState extends CommonProceduralState {
  data: CUTOFFPERIODViewState | null;
}

// SCHEDULESHIFT SECTION // SCHEDULESHIFT SECTION // SCHEDULESHIFT SECTION // SCHEDULESHIFT SECTION
interface SCHEDULESHIFTViewState extends CommonProceduralState{
  data: SCHEDULESHIFTViewInterface[] | null | [] | SCHEDULESHIFTViewInterface;
}

interface SCHEDULESHIFTCreateState extends CommonProceduralState{
  data: SCHEDULESHIFTCreateInterface | null | {};
}

interface SCHEDULESHIFTEditState extends CommonProceduralState {
  data: SCHEDULESHIFTViewState | null;
}

interface SCHEDULESHIFTDeleteState extends CommonProceduralState, CommonProceduralDataStringState {}

// SCHEDULEDAILY SECTION // SCHEDULEDAILY SECTION // SCHEDULEDAILY SECTION // SCHEDULEDAILY SECTION
interface SCHEDULEDAILYViewState extends CommonProceduralState{
  data: SCHEDULEDAILYViewInterface[] | null | [] | SCHEDULEDAILYViewInterface;
}

interface SCHEDULEDAILYCreateState extends CommonProceduralState{
  data: SCHEDULEDAILYCreateInterface | null | {};
}

interface SCHEDULEDAILYEditState extends CommonProceduralState {
  data: SCHEDULEDAILYViewState | null;
}


interface OverallProceduralState {
  [key: string]: 
  HolidaysGetState | 
  HolidayCreateState | 
  OBTViewState | 
  OBTCreateState | 
  OBTEditState | 
  OVERTIMEViewState | 
  OVERTIMECreateState | 
  OVERTIMEEditState |
  LEAVEViewState | 
  LEAVECreateState | 
  LEAVEEditState |
  UAViewState | 
  UACreateState | 
  UAEditState |
  LEAVECREDITViewState | 
  LEAVECREDITCreateState | 
  LEAVECREDITEditState | 
  LEAVETYPEViewState | 
  LEAVETYPECreateState | 
  LEAVETYPEEditState | 
  LEAVETYPEDeleteState | 
  CUTOFFPERIODViewState | 
  CUTOFFPERIODCreateState | 
  CUTOFFPERIODEditState | 
  SCHEDULESHIFTViewState | 
  SCHEDULESHIFTCreateState | 
  SCHEDULESHIFTEditState | 
  SCHEDULESHIFTDeleteState | 
  SCHEDULEDAILYViewState | 
  SCHEDULEDAILYCreateState | 
  SCHEDULEDAILYEditState,
  HolidaysGet: HolidaysGetState,
  HolidayCreate: HolidayCreateState,
  HolidayEditSubmit: HolidayEditSubmitState,
  //OBT SECTION
  OBTView: OBTViewState,
  OBTViewFilterEmployee: OBTViewState,
  OBTViewFilterEmployeeAndOBT: OBTViewState,
  OBTViewFilterApprover: OBTViewState,
  OBTCreate: OBTCreateState,
  OBTEdit: OBTEditState,
  //OVERTIME SECTION
  OVERTIMEView: OVERTIMEViewState,
  OVERTIMEViewFilterEmployee: OVERTIMEViewState,
  OVERTIMEViewFilterEmployeeAndOVERTIME: OVERTIMEViewState,
  OVERTIMEViewFilterApprover: OVERTIMEViewState,
  OVERTIMECreate: OVERTIMECreateState,
  OVERTIMEEdit: OVERTIMEEditState,
  //LEAVE SECTION
  LEAVEView: LEAVEViewState,
  LEAVEViewFilterEmployee: LEAVEViewState,
  LEAVEViewFilterEmployeeAndLEAVE: LEAVEViewState,
  LEAVEViewFilterApprover: LEAVEViewState,
  LEAVECreate: LEAVECreateState,
  LEAVEEdit: LEAVEEditState,
  //UA SECTION
  UAView: UAViewState,
  UAViewFilterEmployee: UAViewState,
  UAViewFilterEmployeeAndUA: UAViewState,
  UAViewFilterApprover: UAViewState,
  UACreate: UACreateState,
  UAEdit: UAEditState,
  //LEAVECREDIT SECTION
  LEAVECREDITView: LEAVECREDITViewState,
  LEAVECREDITViewFilterEmployee: LEAVECREDITViewState,
  LEAVECREDITCreate: LEAVECREDITCreateState,
  LEAVECREDITEdit: LEAVECREDITEditState,
  //LEAVETYPE SECTION
  LEAVETYPEView: LEAVETYPEViewState,
  LEAVETYPEViewFilterEmployee: LEAVETYPEViewState,
  LEAVETYPECreate: LEAVETYPECreateState,
  LEAVETYPEEdit: LEAVETYPEEditState,
  LEAVETYPEDelete: LEAVETYPEDeleteState,
  //CUTOFFPERIOD SECTION
  CUTOFFPERIODView: CUTOFFPERIODViewState,
  CUTOFFPERIODViewFilterEmployee: CUTOFFPERIODViewState,
  CUTOFFPERIODCreate: CUTOFFPERIODCreateState,
  CUTOFFPERIODEdit: CUTOFFPERIODEditState,
  //SCHEDULESHIFT SECTION
  SCHEDULESHIFTView: SCHEDULESHIFTViewState,
  SCHEDULESHIFTViewFilterEmployee: SCHEDULESHIFTViewState,
  SCHEDULESHIFTCreate: SCHEDULESHIFTCreateState,
  SCHEDULESHIFTEdit: SCHEDULESHIFTEditState,
  SCHEDULESHIFTDelete: SCHEDULESHIFTDeleteState,
  //SCHEDULEDAILY SECTION
  SCHEDULEDAILYView: SCHEDULEDAILYViewState,
  SCHEDULEDAILYViewFilterEmployee: SCHEDULEDAILYViewState,
  SCHEDULEDAILYViewFilterEmployeeAndSCHEDULEDAILY: SCHEDULEDAILYViewState,
  SCHEDULEDAILYCreate: SCHEDULEDAILYCreateState,
  SCHEDULEDAILYEdit: SCHEDULEDAILYEditState,
}

const initialState: OverallProceduralState = {
  HolidaysGet: {
    status: '',
    progress: 0,
    data: [],
    error: '',
  },
  HolidayCreate: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  HolidayEditSubmit: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  //OBT SECTION
  OBTView: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  OBTViewFilterEmployee: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  OBTViewFilterEmployeeAndOBT: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  OBTViewFilterApprover: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  OBTCreate: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  OBTEdit: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  //OVERTIME SECTION
  OVERTIMEView: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  OVERTIMEViewFilterEmployee: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  OVERTIMEViewFilterEmployeeAndOVERTIME: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  OVERTIMEViewFilterApprover: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  OVERTIMECreate: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  OVERTIMEEdit: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  //LEAVE SECTION
  LEAVEView: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  LEAVEViewFilterEmployee: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  LEAVEViewFilterEmployeeAndLEAVE: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  LEAVEViewFilterApprover: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  LEAVECreate: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  LEAVEEdit: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  //UA SECTION
  UAView: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  UAViewFilterEmployee: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  UAViewFilterEmployeeAndUA: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  UAViewFilterApprover: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  UACreate: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  UAEdit: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  //LEAVECREDIT SECTION
  LEAVECREDITView: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  LEAVECREDITViewFilterEmployee: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  LEAVECREDITCreate: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  LEAVECREDITEdit: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  //LEAVETYPE SECTION
  LEAVETYPEView: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  LEAVETYPEViewFilterEmployee: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  LEAVETYPECreate: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  LEAVETYPEEdit: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  LEAVETYPEDelete: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  //CUTOFFPERIOD SECTION
  CUTOFFPERIODView: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  CUTOFFPERIODViewFilterEmployee: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  CUTOFFPERIODCreate: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  CUTOFFPERIODEdit: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  //SCHEDULESHIFT SECTION
  SCHEDULESHIFTView: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  SCHEDULESHIFTViewFilterEmployee: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  SCHEDULESHIFTCreate: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  SCHEDULESHIFTEdit: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  SCHEDULESHIFTDelete: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  //SCHEDULEDAILY SECTION
  SCHEDULEDAILYView: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  SCHEDULEDAILYViewFilterEmployee: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  SCHEDULEDAILYViewFilterEmployeeAndSCHEDULEDAILY: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  SCHEDULEDAILYCreate: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
  SCHEDULEDAILYEdit: {
    status: '',
    progress: 0,
    data: null,
    error: '',
  },
};

const setLoadingState = (path: string) => (state: OverallProceduralState) => {
  state[path].status = `${globalReducerLoading}`;
  state[path].data = [];
  state[path].error = null;
  state[path].progress = 0;
};

const setSuccessState = (state: OverallProceduralState, payload: ProceduralsPayloads, path: string) => {
  state[path].status = `${globalReducerSuccess}`;
  state[path].data = payload;
  state[path].error = null;
};

const setProgressState = (state: OverallProceduralState, payload: number, path: string) => {
  state[path].progress = payload;
};

const setFailureState = (state: OverallProceduralState, payload: string, path: string) => {
  state[path].status = `${globalReducerFailed}`;
  state[path].data = [];
  state[path].error = payload;
};


const setRefreshedState = (path: string) => (state: OverallProceduralState) => {
  state[path].status = `${globalReducerRefreshed}`;
  state[path].data = [];
  state[path].error = null;
};


const proceduralsSlice = createSlice({
  name: 'procedurals',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(HolidaysGet, setLoadingState("HolidaysGet"))
      .addCase(HolidaysGetSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "HolidaysGet"))
      .addCase(HolidaysGetProgress, (state, action) => setProgressState(state, action.payload, "HolidaysGet"))
      .addCase(HolidaysGetFailure, (state, action) => setFailureState(state, action.payload, "HolidaysGet"))
      .addCase(HolidayCreate, setLoadingState("HolidayCreate"))
      .addCase(HolidayCreateSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "HolidayCreate"))
      .addCase(HolidayCreateProgress, (state, action) => setProgressState(state, action.payload, "HolidayCreate"))
      .addCase(HolidayCreateFailure, (state, action) => setFailureState(state, action.payload, "HolidayCreate"))
      .addCase(HolidayEditSubmit, setLoadingState("HolidayEditSubmit"))
      .addCase(HolidayEditSubmitSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "HolidayEditSubmit"))
      .addCase(HolidayEditSubmitProgress, (state, action) => setProgressState(state, action.payload, "HolidayEditSubmit"))
      .addCase(HolidayEditSubmitFailure, (state, action) => setFailureState(state, action.payload, "HolidayEditSubmit"))
      //OBT SECTION
      .addCase(OBTViewAction, setLoadingState("OBTView"))
      .addCase(OBTViewActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "OBTView"))
      .addCase(OBTViewActionProgress, (state, action) => setProgressState(state, action.payload, "OBTView"))
      .addCase(OBTViewActionFailure, (state, action) => setFailureState(state, action.payload, "OBTView"))
      .addCase(OBTViewFilterEmployeeAction, setLoadingState("OBTViewFilterEmployee"))
      .addCase(OBTViewFilterEmployeeActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "OBTViewFilterEmployee"))
      .addCase(OBTViewFilterEmployeeActionProgress, (state, action) => setProgressState(state, action.payload, "OBTViewFilterEmployee"))
      .addCase(OBTViewFilterEmployeeActionFailure, (state, action) => setFailureState(state, action.payload, "OBTViewFilterEmployee"))
      .addCase(OBTViewFilterEmployeeAndOBTAction, setLoadingState("OBTViewFilterEmployeeAndOBT"))
      .addCase(OBTViewFilterEmployeeAndOBTActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "OBTViewFilterEmployeeAndOBT"))
      .addCase(OBTViewFilterEmployeeAndOBTActionProgress, (state, action) => setProgressState(state, action.payload, "OBTViewFilterEmployeeAndOBT"))
      .addCase(OBTViewFilterEmployeeAndOBTActionFailure, (state, action) => setFailureState(state, action.payload, "OBTViewFilterEmployeeAndOBT"))
      .addCase(OBTViewFilterApproverAction, setLoadingState("OBTViewFilterApprover"))
      .addCase(OBTViewFilterApproverActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "OBTViewFilterApprover"))
      .addCase(OBTViewFilterApproverActionProgress, (state, action) => setProgressState(state, action.payload, "OBTViewFilterApprover"))
      .addCase(OBTViewFilterApproverActionFailure, (state, action) => setFailureState(state, action.payload, "OBTViewFilterApprover"))
      .addCase(OBTCreateAction, setLoadingState("OBTCreate"))
      .addCase(OBTCreateActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "OBTCreate"))
      .addCase(OBTCreateActionProgress, (state, action) => setProgressState(state, action.payload, "OBTCreate"))
      .addCase(OBTCreateActionFailure, (state, action) => setFailureState(state, action.payload, "OBTCreate"))
      .addCase(OBTCreateActionFailureCleanup, setRefreshedState("OBTCreate"))
      .addCase(OBTEditAction, setLoadingState("OBTEdit"))
      .addCase(OBTEditActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "OBTEdit"))
      .addCase(OBTEditActionProgress, (state, action) => setProgressState(state, action.payload, "OBTEdit"))
      .addCase(OBTEditActionFailure, (state, action) => setFailureState(state, action.payload, "OBTEdit"))
      //OVERTIME SECTION
      .addCase(OVERTIMEViewAction, setLoadingState("OVERTIMEView"))
      .addCase(OVERTIMEViewActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "OVERTIMEView"))
      .addCase(OVERTIMEViewActionProgress, (state, action) => setProgressState(state, action.payload, "OVERTIMEView"))
      .addCase(OVERTIMEViewActionFailure, (state, action) => setFailureState(state, action.payload, "OVERTIMEView"))
      .addCase(OVERTIMEViewFilterEmployeeAction, setLoadingState("OVERTIMEViewFilterEmployee"))
      .addCase(OVERTIMEViewFilterEmployeeActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "OVERTIMEViewFilterEmployee"))
      .addCase(OVERTIMEViewFilterEmployeeActionProgress, (state, action) => setProgressState(state, action.payload, "OVERTIMEViewFilterEmployee"))
      .addCase(OVERTIMEViewFilterEmployeeActionFailure, (state, action) => setFailureState(state, action.payload, "OVERTIMEViewFilterEmployee"))
      .addCase(OVERTIMEViewFilterEmployeeAndOVERTIMEAction, setLoadingState("OVERTIMEViewFilterEmployeeAndOVERTIME"))
      .addCase(OVERTIMEViewFilterEmployeeAndOVERTIMEActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "OVERTIMEViewFilterEmployeeAndOVERTIME"))
      .addCase(OVERTIMEViewFilterEmployeeAndOVERTIMEActionProgress, (state, action) => setProgressState(state, action.payload, "OVERTIMEViewFilterEmployeeAndOVERTIME"))
      .addCase(OVERTIMEViewFilterEmployeeAndOVERTIMEActionFailure, (state, action) => setFailureState(state, action.payload, "OVERTIMEViewFilterEmployeeAndOVERTIME"))
      .addCase(OVERTIMEViewFilterApproverAction, setLoadingState("OVERTIMEViewFilterApprover"))
      .addCase(OVERTIMEViewFilterApproverActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "OVERTIMEViewFilterApprover"))
      .addCase(OVERTIMEViewFilterApproverActionProgress, (state, action) => setProgressState(state, action.payload, "OVERTIMEViewFilterApprover"))
      .addCase(OVERTIMEViewFilterApproverActionFailure, (state, action) => setFailureState(state, action.payload, "OVERTIMEViewFilterApprover"))
      .addCase(OVERTIMECreateAction, setLoadingState("OVERTIMECreate"))
      .addCase(OVERTIMECreateActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "OVERTIMECreate"))
      .addCase(OVERTIMECreateActionProgress, (state, action) => setProgressState(state, action.payload, "OVERTIMECreate"))
      .addCase(OVERTIMECreateActionFailure, (state, action) => setFailureState(state, action.payload, "OVERTIMECreate"))
      .addCase(OVERTIMECreateActionFailureCleanup, setRefreshedState("OVERTIMECreate"))
      .addCase(OVERTIMEEditAction, setLoadingState("OVERTIMEEdit"))
      .addCase(OVERTIMEEditActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "OVERTIMEEdit"))
      .addCase(OVERTIMEEditActionProgress, (state, action) => setProgressState(state, action.payload, "OVERTIMEEdit"))
      .addCase(OVERTIMEEditActionFailure, (state, action) => setFailureState(state, action.payload, "OVERTIMEEdit"))
      //LEAVE SECTION
      .addCase(LEAVEViewAction, setLoadingState("LEAVEView"))
      .addCase(LEAVEViewActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "LEAVEView"))
      .addCase(LEAVEViewActionProgress, (state, action) => setProgressState(state, action.payload, "LEAVEView"))
      .addCase(LEAVEViewActionFailure, (state, action) => setFailureState(state, action.payload, "LEAVEView"))
      .addCase(LEAVEViewFilterEmployeeAction, setLoadingState("LEAVEViewFilterEmployee"))
      .addCase(LEAVEViewFilterEmployeeActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "LEAVEViewFilterEmployee"))
      .addCase(LEAVEViewFilterEmployeeActionProgress, (state, action) => setProgressState(state, action.payload, "LEAVEViewFilterEmployee"))
      .addCase(LEAVEViewFilterEmployeeActionFailure, (state, action) => setFailureState(state, action.payload, "LEAVEViewFilterEmployee"))
      .addCase(LEAVEViewFilterEmployeeAndLEAVEAction, setLoadingState("LEAVEViewFilterEmployeeAndLEAVE"))
      .addCase(LEAVEViewFilterEmployeeAndLEAVEActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "LEAVEViewFilterEmployeeAndLEAVE"))
      .addCase(LEAVEViewFilterEmployeeAndLEAVEActionProgress, (state, action) => setProgressState(state, action.payload, "LEAVEViewFilterEmployeeAndLEAVE"))
      .addCase(LEAVEViewFilterEmployeeAndLEAVEActionFailure, (state, action) => setFailureState(state, action.payload, "LEAVEViewFilterEmployeeAndLEAVE"))
      .addCase(LEAVEViewFilterApproverAction, setLoadingState("LEAVEViewFilterApprover"))
      .addCase(LEAVEViewFilterApproverActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "LEAVEViewFilterApprover"))
      .addCase(LEAVEViewFilterApproverActionProgress, (state, action) => setProgressState(state, action.payload, "LEAVEViewFilterApprover"))
      .addCase(LEAVEViewFilterApproverActionFailure, (state, action) => setFailureState(state, action.payload, "LEAVEViewFilterApprover"))
      .addCase(LEAVECreateAction, setLoadingState("LEAVECreate"))
      .addCase(LEAVECreateActionFailureCleanup, setRefreshedState("LEAVECreate"))
      .addCase(LEAVECreateActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "LEAVECreate"))
      .addCase(LEAVECreateActionProgress, (state, action) => setProgressState(state, action.payload, "LEAVECreate"))
      .addCase(LEAVECreateActionFailure, (state, action) => setFailureState(state, action.payload, "LEAVECreate"))
      .addCase(LEAVEEditAction, setLoadingState("LEAVEEdit"))
      .addCase(LEAVEEditActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "LEAVEEdit"))
      .addCase(LEAVEEditActionProgress, (state, action) => setProgressState(state, action.payload, "LEAVEEdit"))
      .addCase(LEAVEEditActionFailure, (state, action) => setFailureState(state, action.payload, "LEAVEEdit"))
      //UA SECTION
      .addCase(UAViewAction, setLoadingState("UAView"))
      .addCase(UAViewActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "UAView"))
      .addCase(UAViewActionProgress, (state, action) => setProgressState(state, action.payload, "UAView"))
      .addCase(UAViewActionFailure, (state, action) => setFailureState(state, action.payload, "UAView"))
      .addCase(UAViewFilterEmployeeAction, setLoadingState("UAViewFilterEmployee"))
      .addCase(UAViewFilterEmployeeActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "UAViewFilterEmployee"))
      .addCase(UAViewFilterEmployeeActionProgress, (state, action) => setProgressState(state, action.payload, "UAViewFilterEmployee"))
      .addCase(UAViewFilterEmployeeActionFailure, (state, action) => setFailureState(state, action.payload, "UAViewFilterEmployee"))
      .addCase(UAViewFilterEmployeeAndUAAction, setLoadingState("UAViewFilterEmployeeAndUA"))
      .addCase(UAViewFilterEmployeeAndUAActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "UAViewFilterEmployeeAndUA"))
      .addCase(UAViewFilterEmployeeAndUAActionProgress, (state, action) => setProgressState(state, action.payload, "UAViewFilterEmployeeAndUA"))
      .addCase(UAViewFilterEmployeeAndUAActionFailure, (state, action) => setFailureState(state, action.payload, "UAViewFilterEmployeeAndUA"))
      .addCase(UAViewFilterApproverAction, setLoadingState("UAViewFilterApprover"))
      .addCase(UAViewFilterApproverActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "UAViewFilterApprover"))
      .addCase(UAViewFilterApproverActionProgress, (state, action) => setProgressState(state, action.payload, "UAViewFilterApprover"))
      .addCase(UAViewFilterApproverActionFailure, (state, action) => setFailureState(state, action.payload, "UAViewFilterApprover"))
      .addCase(UACreateAction, setLoadingState("UACreate"))
      .addCase(UACreateActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "UACreate"))
      .addCase(UACreateActionProgress, (state, action) => setProgressState(state, action.payload, "UACreate"))
      .addCase(UACreateActionFailure, (state, action) => setFailureState(state, action.payload, "UACreate"))
      .addCase(UACreateActionFailureCleanup, setRefreshedState("UACreate"))
      .addCase(UAEditAction, setLoadingState("UAEdit"))
      .addCase(UAEditActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "UAEdit"))
      .addCase(UAEditActionProgress, (state, action) => setProgressState(state, action.payload, "UAEdit"))
      .addCase(UAEditActionFailure, (state, action) => setFailureState(state, action.payload, "UAEdit"))
      //LEAVECREDIT SECTION
      .addCase(LEAVECREDITViewAction, setLoadingState("LEAVECREDITView"))
      .addCase(LEAVECREDITViewActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "LEAVECREDITView"))
      .addCase(LEAVECREDITViewActionProgress, (state, action) => setProgressState(state, action.payload, "LEAVECREDITView"))
      .addCase(LEAVECREDITViewActionFailure, (state, action) => setFailureState(state, action.payload, "LEAVECREDITView"))
      .addCase(LEAVECREDITViewFilterEmployeeAction, setLoadingState("LEAVECREDITViewFilterEmployee"))
      .addCase(LEAVECREDITViewFilterEmployeeActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "LEAVECREDITViewFilterEmployee"))
      .addCase(LEAVECREDITViewFilterEmployeeActionProgress, (state, action) => setProgressState(state, action.payload, "LEAVECREDITViewFilterEmployee"))
      .addCase(LEAVECREDITViewFilterEmployeeActionFailure, (state, action) => setFailureState(state, action.payload, "LEAVECREDITViewFilterEmployee"))
      .addCase(LEAVECREDITCreateAction, setLoadingState("LEAVECREDITCreate"))
      .addCase(LEAVECREDITCreateActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "LEAVECREDITCreate"))
      .addCase(LEAVECREDITCreateActionProgress, (state, action) => setProgressState(state, action.payload, "LEAVECREDITCreate"))
      .addCase(LEAVECREDITCreateActionFailure, (state, action) => setFailureState(state, action.payload, "LEAVECREDITCreate"))
      .addCase(LEAVECREDITCreateActionFailureCleanup, setRefreshedState("LEAVECREDITCreate"))
      .addCase(LEAVECREDITEditAction, setLoadingState("LEAVECREDITEdit"))
      .addCase(LEAVECREDITEditActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "LEAVECREDITEdit"))
      .addCase(LEAVECREDITEditActionProgress, (state, action) => setProgressState(state, action.payload, "LEAVECREDITEdit"))
      .addCase(LEAVECREDITEditActionFailure, (state, action) => setFailureState(state, action.payload, "LEAVECREDITEdit"))
      //LEAVETYPE SECTION
      .addCase(LEAVETYPEViewAction, setLoadingState("LEAVETYPEView"))
      .addCase(LEAVETYPEViewActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "LEAVETYPEView"))
      .addCase(LEAVETYPEViewActionProgress, (state, action) => setProgressState(state, action.payload, "LEAVETYPEView"))
      .addCase(LEAVETYPEViewActionFailure, (state, action) => setFailureState(state, action.payload, "LEAVETYPEView"))
      .addCase(LEAVETYPEViewFilterEmployeeAction, setLoadingState("LEAVETYPEViewFilterEmployee"))
      .addCase(LEAVETYPEViewFilterEmployeeActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "LEAVETYPEViewFilterEmployee"))
      .addCase(LEAVETYPEViewFilterEmployeeActionProgress, (state, action) => setProgressState(state, action.payload, "LEAVETYPEViewFilterEmployee"))
      .addCase(LEAVETYPEViewFilterEmployeeActionFailure, (state, action) => setFailureState(state, action.payload, "LEAVETYPEViewFilterEmployee"))
      .addCase(LEAVETYPECreateAction, setLoadingState("LEAVETYPECreate"))
      .addCase(LEAVETYPECreateActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "LEAVETYPECreate"))
      .addCase(LEAVETYPECreateActionProgress, (state, action) => setProgressState(state, action.payload, "LEAVETYPECreate"))
      .addCase(LEAVETYPECreateActionFailure, (state, action) => setFailureState(state, action.payload, "LEAVETYPECreate"))
      .addCase(LEAVETYPECreateActionFailureCleanup, setRefreshedState("LEAVETYPECreate"))
      .addCase(LEAVETYPEEditAction, setLoadingState("LEAVETYPEEdit"))
      .addCase(LEAVETYPEEditActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "LEAVETYPEEdit"))
      .addCase(LEAVETYPEEditActionProgress, (state, action) => setProgressState(state, action.payload, "LEAVETYPEEdit"))
      .addCase(LEAVETYPEEditActionFailure, (state, action) => setFailureState(state, action.payload, "LEAVETYPEEdit"))
      .addCase(LEAVETYPEDeleteAction, setLoadingState("LEAVETYPEDelete"))
      .addCase(LEAVETYPEDeleteActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "LEAVETYPEDelete"))
      .addCase(LEAVETYPEDeleteActionProgress, (state, action) => setProgressState(state, action.payload, "LEAVETYPEDelete"))
      .addCase(LEAVETYPEDeleteActionFailure, (state, action) => setFailureState(state, action.payload, "LEAVETYPEDelete"))
      //CUTOFFPERIOD SECTION
      .addCase(CUTOFFPERIODViewAction, setLoadingState("CUTOFFPERIODView"))
      .addCase(CUTOFFPERIODViewActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "CUTOFFPERIODView"))
      .addCase(CUTOFFPERIODViewActionProgress, (state, action) => setProgressState(state, action.payload, "CUTOFFPERIODView"))
      .addCase(CUTOFFPERIODViewActionFailure, (state, action) => setFailureState(state, action.payload, "CUTOFFPERIODView"))
      .addCase(CUTOFFPERIODViewFilterCUTOFFPERIODAction, setLoadingState("CUTOFFPERIODViewFilterCUTOFFPERIOD"))
      .addCase(CUTOFFPERIODViewFilterCUTOFFPERIODActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "CUTOFFPERIODViewFilterCUTOFFPERIOD"))
      .addCase(CUTOFFPERIODViewFilterCUTOFFPERIODActionProgress, (state, action) => setProgressState(state, action.payload, "CUTOFFPERIODViewFilterCUTOFFPERIOD"))
      .addCase(CUTOFFPERIODViewFilterCUTOFFPERIODActionFailure, (state, action) => setFailureState(state, action.payload, "CUTOFFPERIODViewFilterCUTOFFPERIOD"))
      .addCase(CUTOFFPERIODCreateAction, setLoadingState("CUTOFFPERIODCreate"))
      .addCase(CUTOFFPERIODCreateActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "CUTOFFPERIODCreate"))
      .addCase(CUTOFFPERIODCreateActionProgress, (state, action) => setProgressState(state, action.payload, "CUTOFFPERIODCreate"))
      .addCase(CUTOFFPERIODCreateActionFailure, (state, action) => setFailureState(state, action.payload, "CUTOFFPERIODCreate"))
      .addCase(CUTOFFPERIODCreateActionFailureCleanup, setRefreshedState("CUTOFFPERIODCreate"))
      .addCase(CUTOFFPERIODEditAction, setLoadingState("CUTOFFPERIODEdit"))
      .addCase(CUTOFFPERIODEditActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "CUTOFFPERIODEdit"))
      .addCase(CUTOFFPERIODEditActionProgress, (state, action) => setProgressState(state, action.payload, "CUTOFFPERIODEdit"))
      .addCase(CUTOFFPERIODEditActionFailure, (state, action) => setFailureState(state, action.payload, "CUTOFFPERIODEdit"))
      //SCHEDULESHIFT SECTION
      .addCase(SCHEDULESHIFTViewAction, setLoadingState("SCHEDULESHIFTView"))
      .addCase(SCHEDULESHIFTViewActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "SCHEDULESHIFTView"))
      .addCase(SCHEDULESHIFTViewActionProgress, (state, action) => setProgressState(state, action.payload, "SCHEDULESHIFTView"))
      .addCase(SCHEDULESHIFTViewActionFailure, (state, action) => setFailureState(state, action.payload, "SCHEDULESHIFTView"))
      .addCase(SCHEDULESHIFTViewFilterSCHEDULESHIFTAction, setLoadingState("SCHEDULESHIFTViewFilterSCHEDULESHIFT"))
      .addCase(SCHEDULESHIFTViewFilterSCHEDULESHIFTActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "SCHEDULESHIFTViewFilterSCHEDULESHIFT"))
      .addCase(SCHEDULESHIFTViewFilterSCHEDULESHIFTActionProgress, (state, action) => setProgressState(state, action.payload, "SCHEDULESHIFTViewFilterSCHEDULESHIFT"))
      .addCase(SCHEDULESHIFTViewFilterSCHEDULESHIFTActionFailure, (state, action) => setFailureState(state, action.payload, "SCHEDULESHIFTViewFilterSCHEDULESHIFT"))
      .addCase(SCHEDULESHIFTCreateAction, setLoadingState("SCHEDULESHIFTCreate"))
      .addCase(SCHEDULESHIFTCreateActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "SCHEDULESHIFTCreate"))
      .addCase(SCHEDULESHIFTCreateActionProgress, (state, action) => setProgressState(state, action.payload, "SCHEDULESHIFTCreate"))
      .addCase(SCHEDULESHIFTCreateActionFailure, (state, action) => setFailureState(state, action.payload, "SCHEDULESHIFTCreate"))
      .addCase(SCHEDULESHIFTCreateActionFailureCleanup, setRefreshedState("SCHEDULESHIFTCreate"))
      .addCase(SCHEDULESHIFTEditAction, setLoadingState("SCHEDULESHIFTEdit"))
      .addCase(SCHEDULESHIFTEditActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "SCHEDULESHIFTEdit"))
      .addCase(SCHEDULESHIFTEditActionProgress, (state, action) => setProgressState(state, action.payload, "SCHEDULESHIFTEdit"))
      .addCase(SCHEDULESHIFTEditActionFailure, (state, action) => setFailureState(state, action.payload, "SCHEDULESHIFTEdit"))
      .addCase(SCHEDULESHIFTDeleteAction, setLoadingState("SCHEDULESHIFTDelete"))
      .addCase(SCHEDULESHIFTDeleteActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "SCHEDULESHIFTDelete"))
      .addCase(SCHEDULESHIFTDeleteActionProgress, (state, action) => setProgressState(state, action.payload, "SCHEDULESHIFTDelete"))
      .addCase(SCHEDULESHIFTDeleteActionFailure, (state, action) => setFailureState(state, action.payload, "SCHEDULESHIFTDelete"))
      //SCHEDULEDAILY SECTION
      .addCase(SCHEDULEDAILYViewAction, setLoadingState("SCHEDULEDAILYView"))
      .addCase(SCHEDULEDAILYViewActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "SCHEDULEDAILYView"))
      .addCase(SCHEDULEDAILYViewActionProgress, (state, action) => setProgressState(state, action.payload, "SCHEDULEDAILYView"))
      .addCase(SCHEDULEDAILYViewActionFailure, (state, action) => setFailureState(state, action.payload, "SCHEDULEDAILYView"))
      .addCase(SCHEDULEDAILYViewFilterEmployeeAction, setLoadingState("SCHEDULEDAILYViewFilterEmployee"))
      .addCase(SCHEDULEDAILYViewFilterEmployeeActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "SCHEDULEDAILYViewFilterEmployee"))
      .addCase(SCHEDULEDAILYViewFilterEmployeeActionProgress, (state, action) => setProgressState(state, action.payload, "SCHEDULEDAILYViewFilterEmployee"))
      .addCase(SCHEDULEDAILYViewFilterEmployeeActionFailure, (state, action) => setFailureState(state, action.payload, "SCHEDULEDAILYViewFilterEmployee"))
      .addCase(SCHEDULEDAILYViewFilterEmployeeAndSCHEDULEDAILYAction, setLoadingState("SCHEDULEDAILYViewFilterEmployeeAndSCHEDULEDAILY"))
      .addCase(SCHEDULEDAILYViewFilterEmployeeAndSCHEDULEDAILYActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "SCHEDULEDAILYViewFilterEmployeeAndSCHEDULEDAILY"))
      .addCase(SCHEDULEDAILYViewFilterEmployeeAndSCHEDULEDAILYActionProgress, (state, action) => setProgressState(state, action.payload, "SCHEDULEDAILYViewFilterEmployeeAndSCHEDULEDAILY"))
      .addCase(SCHEDULEDAILYViewFilterEmployeeAndSCHEDULEDAILYActionFailure, (state, action) => setFailureState(state, action.payload, "SCHEDULEDAILYViewFilterEmployeeAndSCHEDULEDAILY"))
      .addCase(SCHEDULEDAILYCreateAction, setLoadingState("SCHEDULEDAILYCreate"))
      .addCase(SCHEDULEDAILYCreateActionFailureCleanup, setRefreshedState("SCHEDULEDAILYCreate"))
      .addCase(SCHEDULEDAILYCreateActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "SCHEDULEDAILYCreate"))
      .addCase(SCHEDULEDAILYCreateActionProgress, (state, action) => setProgressState(state, action.payload, "SCHEDULEDAILYCreate"))
      .addCase(SCHEDULEDAILYCreateActionFailure, (state, action) => setFailureState(state, action.payload, "SCHEDULEDAILYCreate"))
      .addCase(SCHEDULEDAILYEditAction, setLoadingState("SCHEDULEDAILYEdit"))
      .addCase(SCHEDULEDAILYEditActionSuccess, (state, action) => setSuccessState(state, action.payload.SuccessMessage, "SCHEDULEDAILYEdit"))
      .addCase(SCHEDULEDAILYEditActionProgress, (state, action) => setProgressState(state, action.payload, "SCHEDULEDAILYEdit"))
      .addCase(SCHEDULEDAILYEditActionFailure, (state, action) => setFailureState(state, action.payload, "SCHEDULEDAILYEdit"))
  },
});


export const proceduralsReducer = proceduralsSlice.reducer;