import { Dispatch, Fragment, SetStateAction, useRef } from 'react';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import BONUSLISTModalUI from '../../ui-components/bonus-list-modal-ui';
import { BONUSLISTViewInterface } from '@/types/types-payroll-eoy';


interface BONUSLISTModalComponentInterface {
    singleBONUSLISTDetailsData: BONUSLISTViewInterface,
    scroll: boolean,
    setScroll: Dispatch<SetStateAction<boolean>>,
    setSingleBONUSLISTDetailsData: React.Dispatch<React.SetStateAction<BONUSLISTViewInterface>>;
};

const BONUSLISTModalComponent = ((props:BONUSLISTModalComponentInterface) => {
    const { singleBONUSLISTDetailsData, setSingleBONUSLISTDetailsData } = props;
    const componentRef = useRef<HTMLDivElement | null>(null);

    return (
        <Fragment>
            <Typography variant='soft'>Bonus List Data</Typography>
            <ModalClose sx={{marginTop: '4px'}}/>
            <div ref={componentRef} id="printable-area" className='mt-4'>
                <BONUSLISTModalUI setSingleBONUSLISTDetailsData={setSingleBONUSLISTDetailsData} singleBONUSLISTDetailsData={singleBONUSLISTDetailsData}/>
            </div>
        </Fragment>
    );
});

export default BONUSLISTModalComponent;