import { Dispatch, Fragment, SetStateAction, useRef } from 'react';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import LEAVETYPEModalUI from '../../ui-components/leave-type-modal-ui';
import { LEAVETYPEViewInterface } from '@/types/types-pages';


interface LEAVETYPEModalComponentInterface {
    singleLEAVETYPEDetailsData: LEAVETYPEViewInterface,
    scroll: boolean,
    setScroll: Dispatch<SetStateAction<boolean>>,
    setSingleLEAVETYPEDetailsData: React.Dispatch<React.SetStateAction<LEAVETYPEViewInterface>>;
};

const LEAVETYPEModalComponent = ((props:LEAVETYPEModalComponentInterface) => {
    const { singleLEAVETYPEDetailsData, setSingleLEAVETYPEDetailsData } = props;
    const componentRef = useRef<HTMLDivElement | null>(null);

    return (
        <Fragment>
            <Typography variant='soft'>Leave Type Data</Typography>
            <ModalClose sx={{marginTop: '4px'}}/>
            <div ref={componentRef} id="printable-area" className='mt-6'>
                <LEAVETYPEModalUI setSingleLEAVETYPEDetailsData={setSingleLEAVETYPEDetailsData} singleLEAVETYPEDetailsData={singleLEAVETYPEDetailsData}/>
            </div>
        </Fragment>
    );
});

export default LEAVETYPEModalComponent;