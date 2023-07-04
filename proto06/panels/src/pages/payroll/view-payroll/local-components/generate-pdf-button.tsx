import React from 'react';
import jsPDF from 'jspdf';

import 'jspdf-autotable'; // Import the autotable plugin for tabular data

declare module 'jspdf' {
    interface jsPDF {
      autoTable: (options: any) => jsPDF;
    }
}

const GeneratePDFButton = ({ data, columns }) => {
  const handleGeneratePDF = () => {
    const doc = new jsPDF();
    const tableData = data.map(row => Object.values(row));
    const tableColumns = columns.map(column => column.headerName);
    
    doc.autoTable({
      head: [tableColumns],
      body: tableData,
    });

    doc.save('document.pdf');
  };

  return <button onClick={handleGeneratePDF} className='invisible'>Generate PDF</button>;
};

export default GeneratePDFButton;