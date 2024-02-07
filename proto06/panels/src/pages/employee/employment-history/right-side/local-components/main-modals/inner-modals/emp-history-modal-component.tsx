import { Dispatch, Fragment, SetStateAction, useRef } from 'react';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import EMPHISTORYModalUI from '../../ui-components/emp-history-modal-ui';
import { EMPHISTORYViewInterface } from '@/types/types-employee-and-applicants';


interface EMPHISTORYModalComponentInterface {
    singleEMPHISTORYDetailsData: EMPHISTORYViewInterface,
    scroll: boolean,
    setScroll: Dispatch<SetStateAction<boolean>>,
    setSingleEMPHISTORYDetailsData: React.Dispatch<React.SetStateAction<EMPHISTORYViewInterface>>;
};

const EMPHISTORYModalComponent = ((props:EMPHISTORYModalComponentInterface) => {
    const { singleEMPHISTORYDetailsData, setSingleEMPHISTORYDetailsData } = props;
    const componentRef = useRef<HTMLDivElement | null>(null);

    return (
        <Fragment>
            <Typography variant='soft'>EMPHISTORY Individual Data</Typography>
            <ModalClose sx={{marginTop: '4px'}}/>
            <div ref={componentRef} id="printable-area" className='mt-4'>
                <EMPHISTORYModalUI setSingleEMPHISTORYDetailsData={setSingleEMPHISTORYDetailsData} singleEMPHISTORYDetailsData={singleEMPHISTORYDetailsData}/>
            </div>
        </Fragment>
    );
});

export default EMPHISTORYModalComponent;