import { Fragment, useState, useRef, useEffect } from 'react';
import ModalClose from '@mui/joy/ModalClose';
import PrintPayslipButton from './print-payslip-button';
import { ViewPayrollPayPerEmployee } from '@/types/types-pages';

import GenerateList from './multiple-payslip-components/generate-list';
import MultiplePreview from './multiple-payslip-components/multiple-preview';


interface MultiplePayslip {
    singlePayslipData?: ViewPayrollPayPerEmployee,
};

const MultiplePayslip = ((props:MultiplePayslip) => {
    // const isSmallScreen = window.innerWidth < 645;
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 645);

    useEffect(() => {

        // setTimeout(()=> {

        // }, 1000)
      const handleResize = () => {
        setIsSmallScreen(window.innerWidth < 645);
      };
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
    const { singlePayslipData } = props;
    const componentRef = useRef<HTMLDivElement | null>(null);

    const [multiplePayslipsData, setMultiplePayslipsData] = useState<ViewPayrollPayPerEmployee[]>([]);

    // ref={componentRef} id="printable-area"

    return (
        <Fragment>
            <PrintPayslipButton content={componentRef} multiplePayslipMode/>
            <ModalClose />
            <div className={`flex m-2 border border-gray overflow-auto flex-wrap`} style={{justifyContent: isSmallScreen ? '' : 'space-around'}}>
                <GenerateList setMultiplePayslipsData={setMultiplePayslipsData}/>
                <MultiplePreview multiplePayslipData={multiplePayslipsData} printRef={componentRef}/>
            </div>
        </Fragment>
    );
});

export default MultiplePayslip;


// Styles

  
const paySlipDetailsFont = {
    fontSize: '12px',
};