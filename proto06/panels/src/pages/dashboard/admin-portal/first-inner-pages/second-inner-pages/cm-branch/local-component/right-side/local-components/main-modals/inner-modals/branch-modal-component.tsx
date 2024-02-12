import { Dispatch, Fragment, SetStateAction, useRef } from 'react';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import BRANCHModalUI from '../../ui-components/branch-modal-ui';
import { BRANCHViewInterface } from '@/types/types-pages';


interface BRANCHModalComponentInterface {
    singleBRANCHDetailsData: BRANCHViewInterface,
    scroll: boolean,
    setScroll: Dispatch<SetStateAction<boolean>>,
    setSingleBRANCHDetailsData: React.Dispatch<React.SetStateAction<BRANCHViewInterface>>;
};

const BRANCHModalComponent = ((props:BRANCHModalComponentInterface) => {
    const { singleBRANCHDetailsData, setSingleBRANCHDetailsData } = props;
    const componentRef = useRef<HTMLDivElement | null>(null);

    return (
        <Fragment>
            <Typography variant='soft'>Branch Data</Typography>
            <ModalClose sx={{marginTop: '4px'}}/>
            <div ref={componentRef} id="printable-area" className='mt-4'>
                <BRANCHModalUI setSingleBRANCHDetailsData={setSingleBRANCHDetailsData} singleBRANCHDetailsData={singleBRANCHDetailsData}/>
            </div>
        </Fragment>
    );
});

export default BRANCHModalComponent;