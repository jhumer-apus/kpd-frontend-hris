import { Dispatch, Fragment, SetStateAction, useRef } from 'react';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import LEAVECREDITModalUI from '../../ui-components/leave-credit-modal-ui';
import { LEAVECREDITViewInterface } from '@/types/types-pages';


interface LEAVECREDITModalComponentInterface {
    singleLEAVECREDITDetailsData: LEAVECREDITViewInterface,
    scroll: boolean,
    setScroll: Dispatch<SetStateAction<boolean>>,
    setSingleLEAVECREDITDetailsData: React.Dispatch<React.SetStateAction<LEAVECREDITViewInterface>>;
};

const LEAVECREDITModalComponent = ((props:LEAVECREDITModalComponentInterface) => {
    const { singleLEAVECREDITDetailsData, setSingleLEAVECREDITDetailsData } = props;
    const componentRef = useRef<HTMLDivElement | null>(null);

    return (
        <Fragment>
            <Typography variant='soft'>Leave Credit Data</Typography>
            <ModalClose sx={{marginTop: '4px'}}/>
            <div ref={componentRef} id="printable-area" className='mt-4'>
                <LEAVECREDITModalUI setSingleLEAVECREDITDetailsData={setSingleLEAVECREDITDetailsData} singleLEAVECREDITDetailsData={singleLEAVECREDITDetailsData}/>
            </div>
        </Fragment>
    );
});

export default LEAVECREDITModalComponent;