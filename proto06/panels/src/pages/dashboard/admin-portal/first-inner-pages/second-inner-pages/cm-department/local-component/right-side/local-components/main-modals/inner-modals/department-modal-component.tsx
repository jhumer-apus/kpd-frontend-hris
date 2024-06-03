import { Dispatch, Fragment, SetStateAction, useRef } from 'react';
import Typography from '@mui/joy/Typography';
import DEPARTMENTModalUI from '../../ui-components/department-modal-ui';
import { DEPARTMENTViewInterface } from '@/types/types-pages';


interface DEPARTMENTModalComponentInterface {
    singleDEPARTMENTDetailsData: DEPARTMENTViewInterface,
    setSingleDEPARTMENTOpenModal: Dispatch<SetStateAction<boolean>>,
    setSingleDEPARTMENTDetailsData: React.Dispatch<React.SetStateAction<DEPARTMENTViewInterface>>;
};

const DEPARTMENTModalComponent = ((props:DEPARTMENTModalComponentInterface) => {
    const { singleDEPARTMENTDetailsData, setSingleDEPARTMENTOpenModal, setSingleDEPARTMENTDetailsData } = props;
    const componentRef = useRef<HTMLDivElement | null>(null);

    return (
        <Fragment>
            <Typography variant='soft'>Department Data</Typography>
            <div ref={componentRef} id="printable-area" className='mt-4'>
                <DEPARTMENTModalUI 
                    setSingleDEPARTMENTDetailsData={setSingleDEPARTMENTDetailsData} 
                    singleDEPARTMENTDetailsData={singleDEPARTMENTDetailsData}
                    setSingleDEPARTMENTOpenModal={setSingleDEPARTMENTOpenModal}
                />
            </div>
        </Fragment>
    );
});

export default DEPARTMENTModalComponent;