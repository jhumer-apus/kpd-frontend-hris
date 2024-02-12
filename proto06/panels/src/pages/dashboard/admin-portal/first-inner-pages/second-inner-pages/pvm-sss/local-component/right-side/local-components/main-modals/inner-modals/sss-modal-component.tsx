import { Dispatch, Fragment, SetStateAction, useRef } from 'react';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import SSSModalUI from '../../ui-components/sss-modal-ui';
import { SSSViewInterface } from '@/types/types-payroll-variables';


interface SSSModalComponentInterface {
    singleSSSDetailsData: SSSViewInterface,
    scroll: boolean,
    setScroll: Dispatch<SetStateAction<boolean>>,
    setSingleSSSDetailsData: React.Dispatch<React.SetStateAction<SSSViewInterface>>;
};

const SSSModalComponent = ((props:SSSModalComponentInterface) => {
    const { singleSSSDetailsData, setSingleSSSDetailsData } = props;
    const componentRef = useRef<HTMLDivElement | null>(null);

    return (
        <Fragment>
            <Typography variant='soft'>'SSS' Data</Typography>
            <ModalClose sx={{marginTop: '4px'}}/>
            <div ref={componentRef} id="printable-area" className='mt-4'>
                <SSSModalUI setSingleSSSDetailsData={setSingleSSSDetailsData} singleSSSDetailsData={singleSSSDetailsData}/>
            </div>
        </Fragment>
    );
});

export default SSSModalComponent;