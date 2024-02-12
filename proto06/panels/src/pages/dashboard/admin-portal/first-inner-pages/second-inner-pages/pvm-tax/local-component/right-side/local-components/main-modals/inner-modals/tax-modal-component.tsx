import { Dispatch, Fragment, SetStateAction, useRef } from 'react';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import TAXModalUI from '../../ui-components/tax-modal-ui';
import { TAXViewInterface } from '@/types/types-payroll-variables';


interface TAXModalComponentInterface {
    singleTAXDetailsData: TAXViewInterface,
    scroll: boolean,
    setScroll: Dispatch<SetStateAction<boolean>>,
    setSingleTAXDetailsData: React.Dispatch<React.SetStateAction<TAXViewInterface>>;
};

const TAXModalComponent = ((props:TAXModalComponentInterface) => {
    const { singleTAXDetailsData, setSingleTAXDetailsData } = props;
    const componentRef = useRef<HTMLDivElement | null>(null);

    return (
        <Fragment>
            <Typography variant='soft'>'Tax/TIN' Data</Typography>
            <ModalClose sx={{marginTop: '4px'}}/>
            <div ref={componentRef} id="printable-area" className='mt-4'>
                <TAXModalUI setSingleTAXDetailsData={setSingleTAXDetailsData} singleTAXDetailsData={singleTAXDetailsData}/>
            </div>
        </Fragment>
    );
});

export default TAXModalComponent;