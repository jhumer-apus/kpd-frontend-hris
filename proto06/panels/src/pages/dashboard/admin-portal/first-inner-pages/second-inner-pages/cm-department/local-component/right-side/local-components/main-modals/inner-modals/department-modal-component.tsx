import { Dispatch, Fragment, SetStateAction, useRef } from 'react';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import DEPARTMENTModalUI from '../../ui-components/department-modal-ui';
import { DEPARTMENTViewInterface } from '@/types/types-pages';


interface DEPARTMENTModalComponentInterface {
    singleDEPARTMENTDetailsData: DEPARTMENTViewInterface,
    scroll: boolean,
    setScroll: Dispatch<SetStateAction<boolean>>,
    setSingleDEPARTMENTDetailsData: React.Dispatch<React.SetStateAction<DEPARTMENTViewInterface>>;
};

const DEPARTMENTModalComponent = ((props:DEPARTMENTModalComponentInterface) => {
    const { singleDEPARTMENTDetailsData, setSingleDEPARTMENTDetailsData } = props;
    const componentRef = useRef<HTMLDivElement | null>(null);

    return (
        <Fragment>
            <Typography variant='soft'>Department Data</Typography>
            <ModalClose sx={{marginTop: '4px'}}/>
            <div ref={componentRef} id="printable-area" className='mt-4'>
                <DEPARTMENTModalUI setSingleDEPARTMENTDetailsData={setSingleDEPARTMENTDetailsData} singleDEPARTMENTDetailsData={singleDEPARTMENTDetailsData}/>
            </div>
        </Fragment>
    );
});

export default DEPARTMENTModalComponent;