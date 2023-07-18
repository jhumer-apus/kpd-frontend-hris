import React from 'react';
import { DtrData } from '@/types/types-store';
import {Button} from '@material-tailwind/react';


interface ExportToCsvButtonInterface {
    data: DtrData
}

function ExportToCsvButton(props: ExportToCsvButtonInterface)  {
    const {data} = props;

    const convertToCSV = (data: DtrData) => {
        const replacer = (key: string, value: any) => value === null ? '' : value;
        if(data){
          const header = Object.keys(data[0]);
          const csv = data.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
          csv.unshift(header.join(','));
          return csv.join('\r\n');
        }else {
          window.alert("No Data is Found")
        }
    };
    const downloadCSV = (csv: string, filename: string) => {
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleDownload = () => {
        if(!data){
          return; //Todo: Error Handling 
        }
        const csv = convertToCSV(data);
        if(csv){
          downloadCSV(csv, `${window.prompt("Enter the file name", "default_name")}`);
        }
    };

    return (
        <Button 
          className='gap-2'
          color='indigo'
          variant='gradient'
          onClick={handleDownload}
        >
            Export / Download as CSV
        </Button>
    );
}

export default ExportToCsvButton;