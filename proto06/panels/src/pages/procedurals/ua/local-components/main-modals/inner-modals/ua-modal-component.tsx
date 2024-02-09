import { Dispatch, Fragment, SetStateAction, useRef } from 'react';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import UAModalUI from '../../ui-components/ua-modal-ui';
import { UAViewInterface } from '@/types/types-pages';


interface UAModalComponentInterface {
    singleUADetailsData: UAViewInterface,
    scroll: boolean,
    setScroll: Dispatch<SetStateAction<boolean>>,
    setSingleUADetailsData: React.Dispatch<React.SetStateAction<UAViewInterface>>;
};

const UAModalComponent = ((props:UAModalComponentInterface) => {
    const { singleUADetailsData, setSingleUADetailsData } = props;
    const componentRef = useRef<HTMLDivElement | null>(null);

    return (
        <Fragment>
            <Typography variant='soft'>Unaccounted Attendance Data</Typography>
            <ModalClose sx={{marginTop: '4px'}}/>
            <div ref={componentRef} id="printable-area" className='mt-4'>
                <UAModalUI setSingleUADetailsData={setSingleUADetailsData} singleUADetailsData={singleUADetailsData}/>
            </div>
        </Fragment>
    );
});

export default UAModalComponent;


// Styles

  
const paySlipDetailsFont = {
    fontSize: '12px',
};