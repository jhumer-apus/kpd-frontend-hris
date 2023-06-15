import { ChangeEvent, useState } from "react";
import { Button, Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { previewDtrCsvItem } from "@/types/types-pages";

const columns = [
  {
    field: "emp_no",
    headerName: "Employee #"
  },
  {
    field: "date_time",
    headerName: "Date & Time",
    width: 142,
  },
  {
    field: "time_in",
    headerName: "Time In"
  },
  {
    field: "time_out",
    headerName: "Time Out"
  },
  {
    field: "branch",
    headerName: "Branch"
  },
];

interface PreviewDtrType {
    csvData: previewDtrCsvItem[],
    setCsvData?: (key: previewDtrCsvItem[]) => void,
    fileName: string,
    setFileName?: (key: string) => void,
}

export default function PreviewDtr(props: PreviewDtrType) {
    const {csvData, setCsvData, fileName, setFileName} = props; 
//   const [csvData, setCsvData] = useState<previewDtrCsvItem[]>([]);
//   const [filename, setFilename] = useState("");

//   const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
//     if (!e.target.files) {
//       return;
//     }
//     const file = e.target.files[0];
//     const { name } = file;
//     setFileName(name);
  
//     const reader = new FileReader();
//     reader.onload = (evt) => {
//       if (!evt?.target?.result) {
//         return;
//       }
//       const { result } = evt.target;
//       const lines = (result as string).split('\n').filter(line => line.trim() !== '');
//     //   const records = lines.map(line => {
//     //     const [id, value] = line.split(',');
//     //     return { id: id.trim(), value: value.trim() };
//     //   });
//     const records = lines.map(line => {
//         const values = line.split('\t');
//         const emp_no = values[0].trim();
//         const date_time = values[1].trim();
//         const time_in = values[2].trim();
//         const time_out = values[3].trim();
//         const branch = values[6].trim();
//         return { id: emp_no, emp_no, date_time, time_in, time_out, branch};
//     });
//       setCsvData(records);
//     };
//     reader.readAsText(file);
//   };

  return (
    <>
      <Button
        component="label"
        variant="outlined"
        startIcon={<UploadFileIcon />}
        sx={{ marginRight: "1rem" }}
      >
        Upload TSV
        {/* <input type="file" accept=".tsv" hidden onChange={handleFileUpload} /> */}
      </Button>
      testFile.tsv in <i>src dir</i>
      <Box>{fileName}</Box>
      <DataGrid
        autoHeight
        rows={csvData}
        columns={columns}
        hideFooter
        sx={{ mt: 1 }}
      />
    </>
  );
}
