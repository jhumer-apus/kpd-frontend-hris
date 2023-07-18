import { useState } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import { Typography } from '@material-tailwind/react';

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
            'http://172.16.168.155:8000/api/import_employee/',
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