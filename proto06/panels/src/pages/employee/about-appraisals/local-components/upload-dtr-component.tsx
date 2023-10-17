import { ChangeEvent, Dispatch, Fragment, SetStateAction } from 'react';
import { Button } from '@mui/material';
// import { Typography } from '@material-tailwind/react';
import { Typography } from '@mui/material';
import UploadFileIcon from "@mui/icons-material/UploadFile";
import TsvFileHelp from '../local-popovers/tsv-file-help';
import { previewDtrCsvItem } from '@/types/types-pages';
import { useNavigate } from 'react-router-dom';


interface UploadDtrComponentProps {
  csvData?: previewDtrCsvItem[],
  setCsvData?: (key: previewDtrCsvItem[]) => void,
  fileName?: string,
  setFileName?: (key: string) => void,
  handleFileUpload?: (e: ChangeEvent<HTMLInputElement>) => void,
  onFileChange?: (e: ChangeEvent<HTMLInputElement>) => void,
  activeStep?: number,
  setActiveStep?: Dispatch<SetStateAction<number>>;
}

export const UploadDTRComponent = (props: UploadDtrComponentProps) => {
    const navigate = useNavigate();
  return (
    <Fragment>
      <div className='flex justify-between overflow'>
        <div style={{border: '0px solid red', width: '100%'}}>
          <Typography variant='h6' className='text-center'>Monthly KPI Details and Description</Typography>
          <Typography variant='subtitle2' style={{margin: '8px 0'}} className='text-center'>Procedures and Instructions</Typography>
          <Typography variant='body2' style={{margin: '8px 0 30px 0'}} className='italic text-center'>Every month, there is an evaluation of performances and traditionally, it is distributed using the MS Tools, Words or Excel. The move to have this process to the HRIS makes the overall procedure much more seamless.</Typography>
          <Typography variant='body2' className='text-left'>1.) Under the 'Quick Accesses' tab, every month, when the administrator or supervisor have given the notice of evaluation, an empty form will be created. You will be given few days to check and answer each evaluation. Failure to comply with said deadline would automatically warrant a 'C' performance or the lowest rating. Be mindful of the words and entry used and make sure to not include entries that have been already submitted in the past, as these are all recorded in the database.</Typography>
          <div className='flex justify-center my-4 '>
            <img className='hover:cursor-pointer' onClick={(()=> {navigate('/home/quick-accesses/Your-Evaluation')})} src={'/img/kpi_hris.png'} style={{width: '50%'}}></img>
          </div>
          <Typography variant='body2' className='text-left'>2.) Be sure to click the item that has a 'Pending' status and check the form accordingly. Inside, you'll see that there are fields for answering, one for yourself and the other for your manager/supervisor. Be mindful that only the items that has 'Pending' status can be edited and once the supervisor has confirmed of the item and changed its status, it can no longer be reversed. </Typography>
          <div className='flex justify-center my-4 hover:cursor-pointer' onClick={(()=> {navigate('/home/quick-accesses/Your-Evaluation')})}>
            <img src={'/img/kpi_hris_modal.png'} style={{width: '50%'}}></img>
          </div>
          <Typography variant='body2' className='text-left'>3.) Here are some of the criterias created beforehand. First part is Self-Evaluation with Supervisor Confirmation and the second part is the core competencies. The rating chart is as follows:</Typography>
          <div className='flex justify-center my-4 hover:cursor-pointer' onClick={(()=> {navigate('/home/quick-accesses/Your-Evaluation')})}>
            <img src={'/img/core_compe.png'} style={{width: '50%'}}></img>
          </div>
        </div>
      </div>

    </Fragment>
  );
};