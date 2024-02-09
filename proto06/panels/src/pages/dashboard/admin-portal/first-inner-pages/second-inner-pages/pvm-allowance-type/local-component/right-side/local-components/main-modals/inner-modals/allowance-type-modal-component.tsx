import { Dispatch, Fragment, SetStateAction, useRef } from 'react';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import ALLOWANCETYPEModalUI from '../../ui-components/allowance-type-modal-ui';
import { ALLOWANCETYPEViewInterface } from '@/types/types-payroll-variables';


interface ALLOWANCETYPEModalComponentInterface {
    singleALLOWANCETYPEDetailsData: ALLOWANCETYPEViewInterface,
    scroll: boolean,
    setScroll: Dispatch<SetStateAction<boolean>>,
    setSingleALLOWANCETYPEDetailsData: React.Dispatch<React.SetStateAction<ALLOWANCETYPEViewInterface>>;
};

const ALLOWANCETYPEModalComponent = ((props:ALLOWANCETYPEModalComponentInterface) => {
    const { singleALLOWANCETYPEDetailsData, setSingleALLOWANCETYPEDetailsData } = props;
    const componentRef = useRef<HTMLDivElement | null>(null);

    return (
        <Fragment>
            <Typography variant='soft'>Allowance Type Data</Typography>
            <ModalClose sx={{marginTop: '4px'}}/>
            <div ref={componentRef} id="printable-area" className='mt-4'>
                <ALLOWANCETYPEModalUI setSingleALLOWANCETYPEDetailsData={setSingleALLOWANCETYPEDetailsData} singleALLOWANCETYPEDetailsData={singleALLOWANCETYPEDetailsData}/>
            </div>
        </Fragment>
    );
});

export default ALLOWANCETYPEModalComponent;