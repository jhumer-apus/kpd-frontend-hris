import React from 'react';
import {Button} from '@material-tailwind/react';


interface ExportToCsvButtonInterface {
    data: any;
    header: string[];
    isDisable: boolean;
}

function ExportToCsvButton(props: ExportToCsvButtonInterface)  {
    const {header, data, isDisable} = props;


    const convertToCSV = (header:string[], data:any):any => {

      if(data) {

        let content = [];
        const headerString = header.join(",") + "\r\n";

        content.push(headerString);

        const dataContent = data.map((row:any) => {

          let singleRow = [row.emp_no, row.full_name];

          for(let i = 0; i < header.length; i++) {
            const value = row[header[i]]? row[header[i]]: ''
            singleRow.push(value)
          }
          return singleRow.join(",") + "\r\n";
        });

        content.push(dataContent.join(","))
        return content;

      } else {

        window.alert("No Data is Found")

      }
        // const replacer = (key: string, value: any) => value === null ? '' : value;
        // if(data){
        //   const header = Object.keys(data[0]);
        //   const csv = data.map((row:any) => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
        //   csv.unshift(header.join(','));
        //   return csv.join('\r\n');
        // }else {
        //   window.alert("No Data is Found")
        // }
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
        const csv = convertToCSV(header, data);
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
          disabled={isDisable}
        >
            Export / Download as CSV
        </Button>
    );
}

export default ExportToCsvButton;