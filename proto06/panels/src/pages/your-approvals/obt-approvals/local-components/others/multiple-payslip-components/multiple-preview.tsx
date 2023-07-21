import React, { Fragment, MutableRefObject, useState } from 'react';
import { ViewPayrollPayPerEmployee } from '@/types/types-pages';
import { Box } from '@mui/material';
import PayslipUI from '../../ui-components/obt-modal-ui';
import { CSSProperties } from 'react';



interface MultiplePreview {
    multiplePayslipData: ViewPayrollPayPerEmployee[];
    printRef: MutableRefObject<HTMLDivElement | null>;
}


function MultiplePreview(props: MultiplePreview) {
    const { multiplePayslipData, printRef } = props;
    const [paySlipPreviewArea, setPaySlipPreviewArea] = useState<CSSProperties>({
        // height: '307mm',
        width: '220mm',
        margin: '20px auto',
        background: 'white',
        boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.4)',
        overflow: 'auto',
    })


    // const paySlipPreviewArea: CSSProperties = {
    //     height: '307mm',
    //     width: '220mm',
    //     margin: '20px auto',
    //     background: 'white',
    //     boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.4)',
    //     overflow: 'auto',
    // };

    const renderPayslips = () => {
        const A4Papers = [];
    
        for (let i = 0; i < multiplePayslipData.length; i += 2) {
          const A4PaperItems = multiplePayslipData.slice(i, i + 2);
    
          const items = (
            <div key={i} data-type={i} className={A4PaperItems.length > 1 ? 'justify-between' : ''} style={A4Paper}>
              {A4PaperItems.map((item) => (
                <Fragment>
                <div key={item.id} style={{margin:'30px' , marginBottom: '50px'}}>
                    <PayslipUI payslipData={item} multiplePayslipMode={true}/>
                </div>
                <div className={`border border-dashed border-2 border-black ${A4PaperItems.length < 2 && 'mt-20'}`}> </div>
                </Fragment>
              ))}
              </div>
          );
    
          A4Papers.push(items);
        }
    
        return A4Papers;
      };

    return (
        <div style={paySlipPreviewArea} ref={printRef} id="printable-area">
            {renderPayslips()}
        </div>
    );
}

export default MultiplePreview;



const A4Paper: CSSProperties = {
    height: '298mm',
    width: '210mm',
    margin: '30px auto',
    background: 'white',
    boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
};


