import { Dispatch, Fragment, SetStateAction, useRef } from 'react';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import SCHEDULESHIFTModalUI from '../../ui-components/schedule-shift-modal-ui';
import { SCHEDULESHIFTViewInterface } from '@/types/types-pages';


interface SCHEDULESHIFTModalComponentInterface {
    singleSCHEDULESHIFTDetailsData: SCHEDULESHIFTViewInterface,
    scroll: boolean,
    setScroll: Dispatch<SetStateAction<boolean>>,
    setSingleSCHEDULESHIFTDetailsData: React.Dispatch<React.SetStateAction<SCHEDULESHIFTViewInterface>>;
};

const SCHEDULESHIFTModalComponent = ((props:SCHEDULESHIFTModalComponentInterface) => {
    const { singleSCHEDULESHIFTDetailsData, setSingleSCHEDULESHIFTDetailsData } = props;
    const componentRef = useRef<HTMLDivElement | null>(null);

    return (
        <Fragment>
            <Typography variant='soft'>Schedule Shift Data</Typography>
            <ModalClose sx={{marginTop: '4px'}}/>
            <div ref={componentRef} id="printable-area" className='mt-4'>
                <SCHEDULESHIFTModalUI setSingleSCHEDULESHIFTDetailsData={setSingleSCHEDULESHIFTDetailsData} singleSCHEDULESHIFTDetailsData={singleSCHEDULESHIFTDetailsData}/>
            </div>
        </Fragment>
    );
});

export default SCHEDULESHIFTModalComponent;