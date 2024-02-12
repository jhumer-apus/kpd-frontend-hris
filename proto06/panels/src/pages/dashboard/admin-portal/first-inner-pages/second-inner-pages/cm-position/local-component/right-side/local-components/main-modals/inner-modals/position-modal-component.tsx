import { Dispatch, Fragment, SetStateAction, useRef } from 'react';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import POSITIONModalUI from '../../ui-components/position-modal-ui';
import { POSITIONViewInterface } from '@/types/types-pages';


interface POSITIONModalComponentInterface {
    singlePOSITIONDetailsData: POSITIONViewInterface,
    scroll: boolean,
    setScroll: Dispatch<SetStateAction<boolean>>,
    setSinglePOSITIONDetailsData: React.Dispatch<React.SetStateAction<POSITIONViewInterface>>;
};

const POSITIONModalComponent = ((props:POSITIONModalComponentInterface) => {
    const { singlePOSITIONDetailsData, setSinglePOSITIONDetailsData } = props;
    const componentRef = useRef<HTMLDivElement | null>(null);
    return (
        <Fragment>
            <Typography variant='soft'>Position Data</Typography>
            <ModalClose sx={{marginTop: '4px'}}/>
            <div ref={componentRef} id="printable-area" className='mt-4'>
                <POSITIONModalUI setSinglePOSITIONDetailsData={setSinglePOSITIONDetailsData} singlePOSITIONDetailsData={singlePOSITIONDetailsData}/>
            </div>
        </Fragment>
    );
});

export default POSITIONModalComponent;