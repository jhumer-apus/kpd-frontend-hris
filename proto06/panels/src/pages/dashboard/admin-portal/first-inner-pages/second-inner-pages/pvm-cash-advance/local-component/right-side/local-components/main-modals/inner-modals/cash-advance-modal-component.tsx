import { Dispatch, Fragment, SetStateAction, useRef } from 'react';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import CASHADVANCEModalUI from '../../ui-components/cash-advance-modal-ui';
import { CASHADVANCEViewInterface } from '@/types/types-payroll-variables';


interface CASHADVANCEModalComponentInterface {
    singleCASHADVANCEDetailsData: CASHADVANCEViewInterface,
    scroll: boolean,
    setScroll: Dispatch<SetStateAction<boolean>>,
    setSingleCASHADVANCEDetailsData: React.Dispatch<React.SetStateAction<CASHADVANCEViewInterface>>;
};

const CASHADVANCEModalComponent = ((props:CASHADVANCEModalComponentInterface) => {
    const { singleCASHADVANCEDetailsData, setSingleCASHADVANCEDetailsData } = props;
    const componentRef = useRef<HTMLDivElement | null>(null);

    return (
        <Fragment>
            <Typography variant='soft'>Cash Advance Data</Typography>
            <ModalClose sx={{marginTop: '4px'}}/>
            <div ref={componentRef} id="printable-area" className='mt-4'>
                <CASHADVANCEModalUI setSingleCASHADVANCEDetailsData={setSingleCASHADVANCEDetailsData} singleCASHADVANCEDetailsData={singleCASHADVANCEDetailsData}/>
            </div>
        </Fragment>
    );
});

export default CASHADVANCEModalComponent;