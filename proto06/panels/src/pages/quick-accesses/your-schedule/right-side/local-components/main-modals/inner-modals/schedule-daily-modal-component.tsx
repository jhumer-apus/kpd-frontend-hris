import { Dispatch, Fragment, SetStateAction, useRef } from 'react';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import SCHEDULEDAILYModalUI from '../../ui-components/schedule-daily-modal-ui';
import { SCHEDULEDAILYViewInterface } from '@/types/types-pages';


interface SCHEDULEDAILYModalComponentInterface {
    singleSCHEDULEDAILYDetailsData: SCHEDULEDAILYViewInterface,
    scroll: boolean,
    setScroll: Dispatch<SetStateAction<boolean>>,
    setSingleSCHEDULEDAILYDetailsData: React.Dispatch<React.SetStateAction<SCHEDULEDAILYViewInterface>>;
};

const SCHEDULEDAILYModalComponent = ((props:SCHEDULEDAILYModalComponentInterface) => {
    const { singleSCHEDULEDAILYDetailsData, setSingleSCHEDULEDAILYDetailsData } = props;
    const componentRef = useRef<HTMLDivElement | null>(null);

    return (
        <Fragment>
            <Typography variant='soft'>Daily Schedule Data</Typography>
            <ModalClose sx={{marginTop: '4px'}}/>
            <div ref={componentRef} id="printable-area" className='mt-4'>
                <SCHEDULEDAILYModalUI setSingleSCHEDULEDAILYDetailsData={setSingleSCHEDULEDAILYDetailsData} singleSCHEDULEDAILYDetailsData={singleSCHEDULEDAILYDetailsData}/>
            </div>
        </Fragment>
    );
});

export default SCHEDULEDAILYModalComponent;