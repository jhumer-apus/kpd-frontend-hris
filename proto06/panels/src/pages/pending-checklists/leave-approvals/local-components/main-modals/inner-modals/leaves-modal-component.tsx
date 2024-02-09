import { Dispatch, Fragment, SetStateAction, useRef } from 'react';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import LEAVEModalUI from '../../ui-components/leaves-modal-ui';
import { LEAVEViewInterface } from '@/types/types-pages';


interface LEAVEModalComponentInterface {
    singleLEAVEDetailsData: LEAVEViewInterface,
    scroll: boolean,
    setScroll: Dispatch<SetStateAction<boolean>>,
    setSingleLEAVEDetailsData: React.Dispatch<React.SetStateAction<LEAVEViewInterface>>;
};

const LEAVEModalComponent = ((props:LEAVEModalComponentInterface) => {
    const { singleLEAVEDetailsData, setSingleLEAVEDetailsData } = props;
    const componentRef = useRef<HTMLDivElement | null>(null);

    return (
        <Fragment>
            <Typography variant='soft'>Leave Data</Typography>
            <ModalClose sx={{marginTop: '4px'}}/>
            <div ref={componentRef} id="printable-area" className='mt-4'>
                <LEAVEModalUI setSingleLEAVEDetailsData={setSingleLEAVEDetailsData} singleLEAVEDetailsData={singleLEAVEDetailsData}/>
            </div>
        </Fragment>
    );
});

export default LEAVEModalComponent;


// Styles

  
const paySlipDetailsFont = {
    fontSize: '12px',
};