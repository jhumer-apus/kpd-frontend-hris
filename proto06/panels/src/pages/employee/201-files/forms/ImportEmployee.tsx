import { useState } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import { Typography } from '@material-tailwind/react';
import { APILink } from '@/store/configureStore';
import { beautifyJSON } from '@/helpers/utils';
import { BeautifyObject } from '@/types/index';

type ImportEmployee = {
  file: any;
};

export const ImportEmployee = () => {

    const [file, setFile] = useState<File | null>(null);
    const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFile(event.target.files ? event.target.files[0] : null);
    };
    const [editMode, setEditMode] = useState(true);
    const onSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
  
        if (!file) {
          return;
        }
    
        const formData = new FormData();
        formData.append('file', file);
    
        try {
          const response = await axios.post(
            `${APILink}import_employee/`,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            }
          );
          window.alert(`${response.status}: ${beautifyJSON(response.data)}`)
          setTimeout(()=>{
              location.reload();
          }, 800)
        } catch (err: any) {
          console.error(err);
          window.alert(`${beautifyJSON(err.response?.data)}`)
        }
    };
  return (
    <form 
        onSubmit={onSubmit} 
        className="flex flex-col justify-between items-center h-52" 
        style={{}}
    >
        <Typography
            variant="small"
            color="blue-gray"
            className="mb-4 font-medium"
        >
            Bulk Import CSV File to Employee Records
        </Typography> 
      <input type="file" onChange={onFileChange} />
      <Button variant="contained" color="primary" type="submit">
          Submit
      </Button>
      <div>
    </div>
      
    </form>
  );
};