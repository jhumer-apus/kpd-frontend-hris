import { Dispatch, Fragment, SetStateAction, useRef } from 'react';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import OFFBOARDINGSTATUSModalUI from '../../ui-components/offboarding-status-modal-ui';
import { OFFBOARDINGSTATUSViewInterface } from '@/types/types-employee-and-applicants';


interface OFFBOARDINGSTATUSModalComponentInterface {
    singleOFFBOARDINGSTATUSDetailsData: OFFBOARDINGSTATUSViewInterface,
    scroll: boolean,
    setScroll: Dispatch<SetStateAction<boolean>>,
    setSingleOFFBOARDINGSTATUSDetailsData: React.Dispatch<React.SetStateAction<OFFBOARDINGSTATUSViewInterface>>;
};

const OFFBOARDINGSTATUSModalComponent = ((props:OFFBOARDINGSTATUSModalComponentInterface) => {
    const { singleOFFBOARDINGSTATUSDetailsData, setSingleOFFBOARDINGSTATUSDetailsData } = props;
    const componentRef = useRef<HTMLDivElement | null>(null);

    return (
        <Fragment>
            <Typography variant='solid'>Offboarding Data</Typography>
            <ModalClose sx={{marginTop: '4px'}}/>
            <div ref={componentRef} id="printable-area" className='mt-4'>
                <OFFBOARDINGSTATUSModalUI setSingleOFFBOARDINGSTATUSDetailsData={setSingleOFFBOARDINGSTATUSDetailsData} singleOFFBOARDINGSTATUSDetailsData={singleOFFBOARDINGSTATUSDetailsData}/>
            </div>
        </Fragment>
    );
});

export default OFFBOARDINGSTATUSModalComponent;


// Styles

  
const paySlipDetailsFont = {
    fontSize: '12px',
};