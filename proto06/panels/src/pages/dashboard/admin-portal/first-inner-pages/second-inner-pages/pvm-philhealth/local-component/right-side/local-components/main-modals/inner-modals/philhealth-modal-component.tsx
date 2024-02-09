import { Dispatch, Fragment, SetStateAction, useRef } from 'react';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import PHILHEALTHModalUI from '../../ui-components/philhealth-modal-ui';
import { PHILHEALTHViewInterface } from '@/types/types-payroll-variables';


interface PHILHEALTHModalComponentInterface {
    singlePHILHEALTHDetailsData: PHILHEALTHViewInterface,
    scroll: boolean,
    setScroll: Dispatch<SetStateAction<boolean>>,
    setSinglePHILHEALTHDetailsData: React.Dispatch<React.SetStateAction<PHILHEALTHViewInterface>>;
};

const PHILHEALTHModalComponent = ((props:PHILHEALTHModalComponentInterface) => {
    const { singlePHILHEALTHDetailsData, setSinglePHILHEALTHDetailsData } = props;
    const componentRef = useRef<HTMLDivElement | null>(null);

    return (
        <Fragment>
            <Typography variant='soft'>'Philhealth' Data</Typography>
            <ModalClose sx={{marginTop: '4px'}}/>
            <div ref={componentRef} id="printable-area" className='mt-4'>
                <PHILHEALTHModalUI setSinglePHILHEALTHDetailsData={setSinglePHILHEALTHDetailsData} singlePHILHEALTHDetailsData={singlePHILHEALTHDetailsData}/>
            </div>
        </Fragment>
    );
});

export default PHILHEALTHModalComponent;