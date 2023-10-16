import { Dispatch, Fragment, SetStateAction, useRef } from 'react';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import KPICOREModalUI from '../../ui-components/obt-modal-ui';
import { KPICOREViewInterface } from '@/types/types-employee-and-applicants';


interface KPICOREModalComponentInterface {
    singleKPICOREDetailsData: KPICOREViewInterface,
    scroll: boolean,
    setScroll: Dispatch<SetStateAction<boolean>>,
    setSingleKPICOREDetailsData: React.Dispatch<React.SetStateAction<KPICOREViewInterface>>;
};

const KPICOREModalComponent = ((props:KPICOREModalComponentInterface) => {
    const { singleKPICOREDetailsData, setSingleKPICOREDetailsData } = props;
    const componentRef = useRef<HTMLDivElement | null>(null);

    return (
        <Fragment>
            <Typography variant='solid'>KPI and Core Competencies Evaluation Data</Typography>
            <ModalClose sx={{marginTop: '4px'}}/>
            <div ref={componentRef} id="printable-area" className='mt-4'>
                <KPICOREModalUI setSingleKPICOREDetailsData={setSingleKPICOREDetailsData} singleKPICOREDetailsData={singleKPICOREDetailsData}/>
            </div>
        </Fragment>
    );
});

export default KPICOREModalComponent;


// Styles

  
const paySlipDetailsFont = {
    fontSize: '12px',
};