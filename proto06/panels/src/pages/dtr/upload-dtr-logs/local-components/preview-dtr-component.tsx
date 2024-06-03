import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { previewDtrCsvItem } from "@/types/types-pages";

const columns = [
  {
    field: "bio_id",
    headerName: "Bio ID"
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
  return (
    <>
      <b>Current File Previewing:</b><i><Box>{fileName? fileName: 'No File Chosen'}</Box></i>
      <div style={{ height: '600px' , width: '100%' }}>
      <DataGrid
        rows={csvData}
        columns={columns}
        sx={{ mt: 1 }}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 25 },
          },
        }}
        pageSizeOptions={[25, 50, 75, 100]}
        localeText={{ noRowsLabel: `${fileName? 'Awaiting File Preview...': 'TSV file automatically previews here.'}` }}
      />
      </div>
    </>
  );
}
