import { Dispatch, Fragment, SetStateAction, useRef } from 'react';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import ALLOWANCEENTRYModalUI from '../../ui-components/allowance-entry-modal-ui';
import { ALLOWANCEENTRYViewInterface } from '@/types/types-payroll-variables';


interface ALLOWANCEENTRYModalComponentInterface {
    singleALLOWANCEENTRYDetailsData: ALLOWANCEENTRYViewInterface,
    scroll: boolean,
    setScroll: Dispatch<SetStateAction<boolean>>,
    setSingleALLOWANCEENTRYDetailsData: React.Dispatch<React.SetStateAction<ALLOWANCEENTRYViewInterface>>;
};

const ALLOWANCEENTRYModalComponent = ((props:ALLOWANCEENTRYModalComponentInterface) => {
    const { singleALLOWANCEENTRYDetailsData, setSingleALLOWANCEENTRYDetailsData } = props;
    const componentRef = useRef<HTMLDivElement | null>(null);

    return (
        <Fragment>
            <Typography variant='soft'>Allowance Entry Data</Typography>
            <ModalClose sx={{marginTop: '4px'}}/>
            <div ref={componentRef} id="printable-area" className='mt-4'>
                <ALLOWANCEENTRYModalUI setSingleALLOWANCEENTRYDetailsData={setSingleALLOWANCEENTRYDetailsData} singleALLOWANCEENTRYDetailsData={singleALLOWANCEENTRYDetailsData}/>
            </div>
        </Fragment>
    );
});

export default ALLOWANCEENTRYModalComponent;