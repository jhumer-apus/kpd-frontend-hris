import { Dispatch, Fragment, SetStateAction, useRef } from 'react';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import OVERTIMEModalUI from '../../ui-components/ot-modal-ui';
import { OVERTIMEViewInterface } from '@/types/types-pages';


interface OVERTIMEModalComponentInterface {
    singleOVERTIMEDetailsData: OVERTIMEViewInterface,
    scroll: boolean,
    setScroll: Dispatch<SetStateAction<boolean>>,
    setSingleOVERTIMEDetailsData: React.Dispatch<React.SetStateAction<OVERTIMEViewInterface>>;
};

const OVERTIMEModalComponent = ((props:OVERTIMEModalComponentInterface) => {
    const { singleOVERTIMEDetailsData, setSingleOVERTIMEDetailsData } = props;
    const componentRef = useRef<HTMLDivElement | null>(null);

    return (
        <Fragment>
            <Typography variant='soft'>Overtime Data</Typography>
            <ModalClose sx={{marginTop: '4px'}}/>
            <div ref={componentRef} id="printable-area" className='mt-4'>
                <OVERTIMEModalUI setSingleOVERTIMEDetailsData={setSingleOVERTIMEDetailsData} singleOVERTIMEDetailsData={singleOVERTIMEDetailsData}/>
            </div>
        </Fragment>
    );
});

export default OVERTIMEModalComponent;