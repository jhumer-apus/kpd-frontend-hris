import { Dispatch, Fragment, SetStateAction, useRef } from 'react';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import DIVISIONModalUI from '../../ui-components/division-modal-ui';
import { DIVISIONViewInterface } from '@/types/types-pages';


interface DIVISIONModalComponentInterface {
    singleDIVISIONDetailsData: DIVISIONViewInterface,
    scroll: boolean,
    setScroll: Dispatch<SetStateAction<boolean>>,
    setSingleDIVISIONDetailsData: React.Dispatch<React.SetStateAction<DIVISIONViewInterface>>;
};

const DIVISIONModalComponent = ((props:DIVISIONModalComponentInterface) => {
    const { singleDIVISIONDetailsData, setSingleDIVISIONDetailsData } = props;
    const componentRef = useRef<HTMLDivElement | null>(null);

    return (
        <Fragment>
            <Typography variant='soft'>Division Data</Typography>
            <ModalClose sx={{marginTop: '4px'}}/>
            <div ref={componentRef} id="printable-area" className='mt-4'>
                <DIVISIONModalUI setSingleDIVISIONDetailsData={setSingleDIVISIONDetailsData} singleDIVISIONDetailsData={singleDIVISIONDetailsData}/>
            </div>
        </Fragment>
    );
});

export default DIVISIONModalComponent;