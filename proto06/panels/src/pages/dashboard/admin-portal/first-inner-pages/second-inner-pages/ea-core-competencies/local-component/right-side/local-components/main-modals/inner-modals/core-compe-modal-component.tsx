import { Dispatch, Fragment, SetStateAction, useRef } from 'react';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import CORECOMPEModalUI from '../../ui-components/core-compe-modal-ui';
import { CORECOMPEViewInterface } from '@/types/types-employee-and-applicants';


interface CORECOMPEModalComponentInterface {
    singleCORECOMPEDetailsData: CORECOMPEViewInterface,
    scroll: boolean,
    setScroll: Dispatch<SetStateAction<boolean>>,
    setSingleCORECOMPEDetailsData: React.Dispatch<React.SetStateAction<CORECOMPEViewInterface>>;
};

const CORECOMPEModalComponent = ((props:CORECOMPEModalComponentInterface) => {
    const { singleCORECOMPEDetailsData, setSingleCORECOMPEDetailsData } = props;
    const componentRef = useRef<HTMLDivElement | null>(null);

    return (
        <Fragment>
            <Typography variant='soft'>Core Competency Details</Typography>
            <ModalClose sx={{marginTop: '4px'}}/>
            <div ref={componentRef} id="printable-area" className='mt-4'>
                <CORECOMPEModalUI setSingleCORECOMPEDetailsData={setSingleCORECOMPEDetailsData} singleCORECOMPEDetailsData={singleCORECOMPEDetailsData}/>
            </div>
        </Fragment>
    );
});

export default CORECOMPEModalComponent;