import { Dispatch, Fragment, SetStateAction, useRef } from 'react';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import EVALQUESTIONSModalUI from '../../ui-components/eval-questions-modal-ui';
import { EVALQUESTIONSViewInterface } from '@/types/types-employee-and-applicants';


interface EVALQUESTIONSModalComponentInterface {
    singleEVALQUESTIONSDetailsData: EVALQUESTIONSViewInterface,
    scroll: boolean,
    setScroll: Dispatch<SetStateAction<boolean>>,
    setSingleEVALQUESTIONSDetailsData: React.Dispatch<React.SetStateAction<EVALQUESTIONSViewInterface>>;
};

const EVALQUESTIONSModalComponent = ((props:EVALQUESTIONSModalComponentInterface) => {
    const { singleEVALQUESTIONSDetailsData, setSingleEVALQUESTIONSDetailsData } = props;
    const componentRef = useRef<HTMLDivElement | null>(null);

    return (
        <Fragment>
            <Typography variant='soft'>Evaluation Question Details</Typography>
            <ModalClose sx={{marginTop: '4px'}}/>
            <div ref={componentRef} id="printable-area" className='mt-4'>
                <EVALQUESTIONSModalUI setSingleEVALQUESTIONSDetailsData={setSingleEVALQUESTIONSDetailsData} singleEVALQUESTIONSDetailsData={singleEVALQUESTIONSDetailsData}/>
            </div>
        </Fragment>
    );
});

export default EVALQUESTIONSModalComponent;