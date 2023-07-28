import { useState } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import { Typography } from '@material-tailwind/react';
import { APILink } from '@/store/configureStore';

type ImportEmployee = {
  file: any;
};

export const UploadDTRComponent = () => {

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
          setTimeout(() => {
            location.reload();
          }, 1000);
        } catch (err) {
          console.error(err);
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
            Upload TSV File of your DTR Logs
        </Typography> 
      <input type="file" onChange={onFileChange} />

        {editMode ? (
            <Button variant="contained" color="primary" type="submit">
                Submit
            </Button>
            ) : (
            <Button
                variant="outlined"
                color="primary"
                onClick={() => setEditMode(true)}
            >
                Edit
            </Button>
            )}
    </form>
  );
};