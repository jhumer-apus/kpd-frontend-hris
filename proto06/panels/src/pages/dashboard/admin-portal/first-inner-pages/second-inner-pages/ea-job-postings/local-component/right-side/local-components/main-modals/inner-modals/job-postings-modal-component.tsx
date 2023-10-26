import { Dispatch, Fragment, SetStateAction, useRef } from 'react';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import JOBPOSTINGSModalUI from '../../ui-components/asset-list-modal-ui';
import { JOBPOSTINGSViewInterface } from '@/types/types-employee-and-applicants';


interface JOBPOSTINGSModalComponentInterface {
    singleJOBPOSTINGSDetailsData: JOBPOSTINGSViewInterface,
    scroll: boolean,
    setScroll: Dispatch<SetStateAction<boolean>>,
    setSingleJOBPOSTINGSDetailsData: React.Dispatch<React.SetStateAction<JOBPOSTINGSViewInterface>>;
};

const JOBPOSTINGSModalComponent = ((props:JOBPOSTINGSModalComponentInterface) => {
    const { singleJOBPOSTINGSDetailsData, setSingleJOBPOSTINGSDetailsData } = props;
    const componentRef = useRef<HTMLDivElement | null>(null);

    return (
        <Fragment>
            <Typography variant='soft'>Job Posting Data</Typography>
            <ModalClose sx={{marginTop: '4px'}}/>
            <div ref={componentRef} id="printable-area" className='mt-4'>
                <JOBPOSTINGSModalUI setSingleJOBPOSTINGSDetailsData={setSingleJOBPOSTINGSDetailsData} singleJOBPOSTINGSDetailsData={singleJOBPOSTINGSDetailsData}/>
            </div>
        </Fragment>
    );
});

export default JOBPOSTINGSModalComponent;