import React from 'react';
import { DtrData } from '@/types/types-store';
import {Button} from '@material-tailwind/react';
import { capitalize } from 'lodash';
import { convertMinutesToHHMM } from '@/helpers/utils';


interface ExportToCsvButtonInterface {
    data: DtrData
}
const colsMinToHours = [
  "total_hours",
  "nd_total_hours",
  "reg_ot_hours",
  "nd_ot_total_hours",
  "sp_holiday_total_hours",
  "sp_holiday_reg_ot_hours",
  "sp_holiday_nd_ot_hours",
  "reg_holiday_total_hours",
  "reg_holiday_nd_total_hours",
  "reg_holiday_reg_ot_hours",
  "reg_holiday_nd_ot_hours",
  "rd_total_hours",
  "rd_nd_total_hours",
  "rd_reg_ot_total_hours",
  "rd_nd_ot_total_hours",
  "rd_sphol_total_hours",
  "rd_sphol_nd_total_hours",
  "rd_sphol_reg_ot_total_hours",
  "rd_sphol_nd_ot_total_hours",
  "rd_reghol_total_hours",
  "rd_reghol_nd_total_hours",
  "rd_reghol_nd_total_hours",
  "rd_reghol_nd_ot_total_hours",
  "undertime_total"
]

function ExportToCsvButton(props: ExportToCsvButtonInterface)  {
    const {data} = props;
    
    const convertToCSV = (data: DtrData) => {
        const replacer = (key: string, value: any) => value === null ? '' : value;
        if(data){
          const header = Object.keys(data[0]);
          const cleanHeader = header.map(col => {
            const colArr = col.split("_")
            const colCap = colArr.map(title => capitalize(title))
            return  colCap.join(" ")
          })
          const csv = data.map(row => header.map(fieldName => {
            const value = colsMinToHours.includes(fieldName) ? convertMinutesToHHMM(Number(row[fieldName])): row[fieldName]
            return JSON.stringify(value, replacer)
          }).join(','));
          csv.unshift(cleanHeader.join(','));
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
        let userInput: null | string = null;
        const askInput = () => {
          userInput = window.prompt("File Name", "export_file_name");
        }
        askInput();
        userInput !== null ? downloadCSV(csv, userInput) : '';
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