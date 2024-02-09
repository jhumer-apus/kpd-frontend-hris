import { Dispatch, Fragment, SetStateAction, useRef } from 'react';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import OBTModalUI from '../../ui-components/obt-modal-ui';
import { OBTViewInterface } from '@/types/types-pages';


interface OBTModalComponentInterface {
    singleOBTDetailsData: OBTViewInterface,
    scroll: boolean,
    setScroll: Dispatch<SetStateAction<boolean>>,
    setSingleOBTDetailsData: React.Dispatch<React.SetStateAction<OBTViewInterface>>;
};

const OBTModalComponent = ((props:OBTModalComponentInterface) => {
    const { singleOBTDetailsData, setSingleOBTDetailsData } = props;
    const componentRef = useRef<HTMLDivElement | null>(null);

    return (
        <Fragment>
            <Typography variant='soft'>Official Business Time Data</Typography>
            <ModalClose sx={{marginTop: '4px'}}/>
            <div ref={componentRef} id="printable-area" className='mt-4'>
                <OBTModalUI setSingleOBTDetailsData={setSingleOBTDetailsData} singleOBTDetailsData={singleOBTDetailsData}/>
            </div>
        </Fragment>
    );
});

export default OBTModalComponent;
