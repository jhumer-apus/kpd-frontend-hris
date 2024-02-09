import { Dispatch, Fragment, SetStateAction, useRef } from 'react';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import PAYROLLGROUPModalUI from '../../ui-components/payrollgroup-modal-ui';
import { PAYROLLGROUPViewInterface } from '@/types/types-pages';


interface PAYROLLGROUPModalComponentInterface {
    singlePAYROLLGROUPDetailsData: PAYROLLGROUPViewInterface,
    scroll: boolean,
    setScroll: Dispatch<SetStateAction<boolean>>,
    setSinglePAYROLLGROUPDetailsData: React.Dispatch<React.SetStateAction<PAYROLLGROUPViewInterface>>;
};

const PAYROLLGROUPModalComponent = ((props:PAYROLLGROUPModalComponentInterface) => {
    const { singlePAYROLLGROUPDetailsData, setSinglePAYROLLGROUPDetailsData } = props;
    const componentRef = useRef<HTMLDivElement | null>(null);

    return (
        <Fragment>
            <Typography variant='soft'>Payroll Group Data</Typography>
            <ModalClose sx={{marginTop: '4px'}}/>
            <div ref={componentRef} id="printable-area" className='mt-4'>
                <PAYROLLGROUPModalUI setSinglePAYROLLGROUPDetailsData={setSinglePAYROLLGROUPDetailsData} singlePAYROLLGROUPDetailsData={singlePAYROLLGROUPDetailsData}/>
            </div>
        </Fragment>
    );
});

export default PAYROLLGROUPModalComponent;