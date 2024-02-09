import { Dispatch, Fragment, SetStateAction, useRef } from 'react';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import PAY13THModalUI from '../../ui-components/pay-13th-modal-ui';
import { PAY13THViewInterface } from '@/types/types-payroll-eoy';


interface PAY13THModalComponentInterface {
    singlePAY13THDetailsData: PAY13THViewInterface,
    scroll: boolean,
    setScroll: Dispatch<SetStateAction<boolean>>,
    setSinglePAY13THDetailsData: React.Dispatch<React.SetStateAction<PAY13THViewInterface>>;
};

const PAY13THModalComponent = ((props:PAY13THModalComponentInterface) => {
    const { singlePAY13THDetailsData, setSinglePAY13THDetailsData } = props;
    const componentRef = useRef<HTMLDivElement | null>(null);

    return (
        <Fragment>
            <Typography variant='soft'>13th Month Pay Data</Typography>
            <ModalClose sx={{marginTop: '4px'}}/>
            <div ref={componentRef} id="printable-area" className='mt-4'>
                <PAY13THModalUI setSinglePAY13THDetailsData={setSinglePAY13THDetailsData} singlePAY13THDetailsData={singlePAY13THDetailsData}/>
            </div>
        </Fragment>
    );
});

export default PAY13THModalComponent;