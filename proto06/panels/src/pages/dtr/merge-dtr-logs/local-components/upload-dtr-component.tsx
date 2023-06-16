import { ChangeEvent, SetStateAction, useState } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import { Typography } from '@material-tailwind/react';
import UploadFileIcon from "@mui/icons-material/UploadFile";
import HelpIcon from '@mui/icons-material/Help';
import TsvFileHelp from '../local-popovers/tsv-file-help';
import { previewDtrCsvItem } from '@/types/types-pages';


type ImportEmployee = {
  file: any;
};

interface UploadDtrComponentProps {
  csvData?: previewDtrCsvItem[],
  setCsvData?: (key: previewDtrCsvItem[]) => void,
  fileName?: string,
  setFileName?: (key: string) => void,
  handleFileUpload: (e: ChangeEvent<HTMLInputElement>) => void,
  // setFile?: (e: SetStateAction<File | null>) => void, 
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void,
}

export const UploadDTRComponent = (props: UploadDtrComponentProps) => {
    const {handleFileUpload, onFileChange} = props;

    // const [file, setFile] = useState<File | null>(null);
    // const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setFile(event.target.files ? event.target.files[0] : null);
    // };

    
    // const onSubmit = async (event: React.FormEvent) => {
    //     event.preventDefault();
    
    //     if (!file) {
    //       return;
    //     }
    
    //     const formData = new FormData();
    //     formData.append('file', file);
    
    //     try {
    //       const response = await axios.post(
    //         'http://172.16.168.155:8000/api/upload_dtr_logs/',
    //         formData,
    //         {
    //           headers: {
    //             'Content-Type': 'multipart/form-data',
    //           },
    //         }
    //       );
    
    //       console.log(response.data);
    //       // setTimeout(() => {
    //       //   location.reload();
    //       // }, 1000);
    //     } catch (err) {
    //       console.error(err);
    //     }
    // };
    const onFileChangeAndUpload = (e: ChangeEvent<HTMLInputElement>) => {
      onFileChange(e);
      handleFileUpload(e);
    };
    // const [editMode, setEditMode] = useState(true);
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
      
        {/* <Button variant="contained" color="primary" type="submit">
            Submit
        </Button> */}
    </div>
  );
};