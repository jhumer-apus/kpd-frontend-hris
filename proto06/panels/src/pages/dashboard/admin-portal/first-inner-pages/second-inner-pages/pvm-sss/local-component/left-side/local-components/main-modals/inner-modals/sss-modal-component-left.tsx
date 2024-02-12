import { Fragment, useRef } from 'react';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import SSSModalUI from '../../ui-components/pagibig-modal-ui-left';
import { SSSCreateInterface } from '@/types/types-payroll-variables';


interface SSSModalComponentInterface {
    createSSSDetailsData: SSSCreateInterface,
    setCreateSSSDetailsData: React.Dispatch<React.SetStateAction<SSSCreateInterface>>;
};

const SSSModalComponent = ((props:SSSModalComponentInterface) => {
    const { createSSSDetailsData, setCreateSSSDetailsData } = props;
    const componentRef = useRef<HTMLDivElement | null>(null);

    return (
        <Fragment>
            <Typography variant='soft'>'SSS' Data</Typography>
            <ModalClose sx={{marginTop: '4px'}}/>
            <div ref={componentRef} id="printable-area" className='mt-4'>
                <SSSModalUI setCreateSSSDetailsData={setCreateSSSDetailsData} createSSSDetailsData={createSSSDetailsData}/>
            </div>
        </Fragment>
    );
});

export default SSSModalComponent;