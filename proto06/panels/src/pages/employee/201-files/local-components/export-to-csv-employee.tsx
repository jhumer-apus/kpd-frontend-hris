import { EMPLOYEESViewInterface } from "@/types/types-store";
import { Button } from "@material-tailwind/react";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import { flattenObject } from "@/helpers/utils";
import { ObjectFlat } from "@/types/index";


interface EmployeeExportToCsvButtonInterface<T> {
    data: T[];    
}

function EmployeeExportToCsvButton<T extends ObjectFlat>(props: EmployeeExportToCsvButtonInterface<T>) {
    const { data } = props;


    function convertToCSV(data: T[]) {
        const replacer = (key: string, value: any) => value === null ? '' : value;
        // const header = Object.keys(data[0]);
        // const csv = data.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
        // csv.unshift(header.join(','));
        // return csv.join('\r\n');
        if(data){
            const flattenedData = data.map(item => flattenObject(item));
            const header = Object.keys(flattenedData[0]);
            const csv = flattenedData.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
            csv.unshift(header.join(','));
            return csv.join('\r\n');
          }else {
            window.alert("No Data is Found")
          }
    };
    function downloadCSV(csv: string, filename: string) {
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
          downloadCSV(csv, `${window.prompt("File Name", "export_file_name")}`);
        }
    };

    return (
        <Button 
          className='mb-4 flex gap-2'
          color='indigo'
          variant='gradient'
          onClick={handleDownload}>
        
        <ArrowUpTrayIcon style={{height: '15px'}}/> Export / Download as CSV
        </Button>
    );
}

export default EmployeeExportToCsvButton;