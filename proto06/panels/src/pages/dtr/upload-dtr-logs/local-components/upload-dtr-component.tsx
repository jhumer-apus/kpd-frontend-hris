import { ChangeEvent } from 'react';
import { Button } from '@mui/material';
import { Typography } from '@material-tailwind/react';
import UploadFileIcon from "@mui/icons-material/UploadFile";
import TsvFileHelp from '../local-popovers/tsv-file-help';
import { previewDtrCsvItem } from '@/types/types-pages';


interface UploadDtrComponentProps {
  csvData?: previewDtrCsvItem[],
  setCsvData?: (key: previewDtrCsvItem[]) => void,
  fileName?: string,
  setFileName?: (key: string) => void,
  handleFileUpload: (e: ChangeEvent<HTMLInputElement>) => void,
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void,
}

export const UploadDTRComponent = (props: UploadDtrComponentProps) => {
    const {handleFileUpload, onFileChange} = props;

    const onFileChangeAndUpload = (e: ChangeEvent<HTMLInputElement>) => {
      onFileChange(e);
      handleFileUpload(e);
    };
  return (
    <div 
        className="flex flex-col justify-center items-start h-52" 
        style={{}}
    >
        <Typography
            variant="small"
            color="blue-gray"
            className="mb-4 font-medium"
            style={{textAlign: "center", width: "100%", alignItems: "center"}}

        >
            Upload TSV File of your DTR Logs
        </Typography> 
        <div className='flex'>
          <Button 
            component="label"
            variant='outlined'
            startIcon={<UploadFileIcon/>}
            sx={{marginRight: "1rem"}}
          >
            Choose Your TSV File 
          <input type="file" accept=".tsv" hidden onChange={onFileChangeAndUpload} />    
          </Button>
          <TsvFileHelp/>
        </div>


        <Typography
            variant="small"
            color="blue-gray"
            className="mt-4"

        >
            TSV is a tab-separated-value produced
        </Typography> 
        <Typography
            variant="small"
            color="blue-gray"
            className="mt-0"
            style={{textAlign: "center", width: "100%", alignItems: "center"}}
        >
            file by your Biometrics Machine
        </Typography> 
    </div>
  );
};