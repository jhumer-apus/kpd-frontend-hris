import { Dispatch, Fragment, SetStateAction, useRef } from 'react';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import BONUSENTRYModalUI from '../../ui-components/bonus-entry-modal-ui';
import { BONUSENTRYViewInterface } from '@/types/types-payroll-eoy';


interface BONUSENTRYModalComponentInterface {
    singleBONUSENTRYDetailsData: BONUSENTRYViewInterface,
    scroll: boolean,
    setScroll: Dispatch<SetStateAction<boolean>>,
    setSingleBONUSENTRYDetailsData: React.Dispatch<React.SetStateAction<BONUSENTRYViewInterface>>;
};

const BONUSENTRYModalComponent = ((props:BONUSENTRYModalComponentInterface) => {
    const { singleBONUSENTRYDetailsData, setSingleBONUSENTRYDetailsData } = props;
    const componentRef = useRef<HTMLDivElement | null>(null);

    return (
        <Fragment>
            <Typography variant='soft'>Bonus Entry Data</Typography>
            <ModalClose sx={{marginTop: '4px'}}/>
            <div ref={componentRef} id="printable-area" className='mt-4'>
                <BONUSENTRYModalUI setSingleBONUSENTRYDetailsData={setSingleBONUSENTRYDetailsData} singleBONUSENTRYDetailsData={singleBONUSENTRYDetailsData}/>
            </div>
        </Fragment>
    );
});

export default BONUSENTRYModalComponent;