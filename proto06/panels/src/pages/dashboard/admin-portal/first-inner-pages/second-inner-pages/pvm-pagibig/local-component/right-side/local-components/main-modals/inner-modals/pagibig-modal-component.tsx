import { Dispatch, Fragment, SetStateAction, useRef } from 'react';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import PAGIBIGModalUI from '../../ui-components/pagibig-modal-ui';
import { PAGIBIGViewInterface } from '@/types/types-payroll-variables';


interface PAGIBIGModalComponentInterface {
    singlePAGIBIGDetailsData: PAGIBIGViewInterface,
    scroll: boolean,
    setScroll: Dispatch<SetStateAction<boolean>>,
    setSinglePAGIBIGDetailsData: React.Dispatch<React.SetStateAction<PAGIBIGViewInterface>>;
};

const PAGIBIGModalComponent = ((props:PAGIBIGModalComponentInterface) => {
    const { singlePAGIBIGDetailsData, setSinglePAGIBIGDetailsData } = props;
    const componentRef = useRef<HTMLDivElement | null>(null);

    return (
        <Fragment>
            <Typography variant='soft'>'Pagibig' Data</Typography>
            <ModalClose sx={{marginTop: '4px'}}/>
            <div ref={componentRef} id="printable-area" className='mt-4'>
                <PAGIBIGModalUI setSinglePAGIBIGDetailsData={setSinglePAGIBIGDetailsData} singlePAGIBIGDetailsData={singlePAGIBIGDetailsData}/>
            </div>
        </Fragment>
    );
});

export default PAGIBIGModalComponent;