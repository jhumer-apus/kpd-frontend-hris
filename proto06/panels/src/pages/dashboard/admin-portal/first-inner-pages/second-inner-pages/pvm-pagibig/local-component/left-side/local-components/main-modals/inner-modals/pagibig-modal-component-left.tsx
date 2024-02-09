import { Fragment, useRef } from 'react';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import PAGIBIGModalUI from '../../ui-components/pagibig-modal-ui-left';
import { PAGIBIGCreateInterface } from '@/types/types-payroll-variables';


interface PAGIBIGModalComponentInterface {
    createPAGIBIGDetailsData: PAGIBIGCreateInterface,
    setCreatePAGIBIGDetailsData: React.Dispatch<React.SetStateAction<PAGIBIGCreateInterface>>;
};

const PAGIBIGModalComponent = ((props:PAGIBIGModalComponentInterface) => {
    const { createPAGIBIGDetailsData, setCreatePAGIBIGDetailsData } = props;
    const componentRef = useRef<HTMLDivElement | null>(null);

    return (
        <Fragment>
            <Typography variant='soft'>'Pagibig' Data</Typography>
            <ModalClose sx={{marginTop: '4px'}}/>
            <div ref={componentRef} id="printable-area" className='mt-4'>
                <PAGIBIGModalUI setCreatePAGIBIGDetailsData={setCreatePAGIBIGDetailsData} createPAGIBIGDetailsData={createPAGIBIGDetailsData}/>
            </div>
        </Fragment>
    );
});

export default PAGIBIGModalComponent;