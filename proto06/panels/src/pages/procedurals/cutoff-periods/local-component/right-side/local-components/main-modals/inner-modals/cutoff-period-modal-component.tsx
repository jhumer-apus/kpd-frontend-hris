import { Dispatch, Fragment, SetStateAction, useRef } from 'react';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import CUTOFFPERIODModalUI from '../../ui-components/cutoff-period-modal-ui';
import { CUTOFFPERIODViewInterface } from '@/types/types-pages';


interface CUTOFFPERIODModalComponentInterface {
    singleCUTOFFPERIODDetailsData: CUTOFFPERIODViewInterface,
    scroll: boolean,
    setScroll: Dispatch<SetStateAction<boolean>>,
    setSingleCUTOFFPERIODDetailsData: React.Dispatch<React.SetStateAction<CUTOFFPERIODViewInterface>>;
};

const CUTOFFPERIODModalComponent = ((props:CUTOFFPERIODModalComponentInterface) => {
    const { singleCUTOFFPERIODDetailsData, setSingleCUTOFFPERIODDetailsData } = props;
    const componentRef = useRef<HTMLDivElement | null>(null);

    return (
        <Fragment>
            <Typography variant='soft'>Cutoff Period Data</Typography>
            <ModalClose sx={{marginTop: '4px'}}/>
            <div ref={componentRef} id="printable-area" className='mt-4'>
                <CUTOFFPERIODModalUI setSingleCUTOFFPERIODDetailsData={setSingleCUTOFFPERIODDetailsData} singleCUTOFFPERIODDetailsData={singleCUTOFFPERIODDetailsData}/>
            </div>
        </Fragment>
    );
});

export default CUTOFFPERIODModalComponent;