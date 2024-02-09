import { Dispatch, Fragment, SetStateAction, useRef } from 'react';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import ASSETACCOUNTModalUI from '../../ui-components/asset-account-modal-ui';
import { ASSETACCOUNTViewInterface } from '@/types/types-payroll-eoy';


interface ASSETACCOUNTModalComponentInterface {
    singleASSETACCOUNTDetailsData: ASSETACCOUNTViewInterface,
    scroll: boolean,
    setScroll: Dispatch<SetStateAction<boolean>>,
    setSingleASSETACCOUNTDetailsData: React.Dispatch<React.SetStateAction<ASSETACCOUNTViewInterface>>;
};

const ASSETACCOUNTModalComponent = ((props:ASSETACCOUNTModalComponentInterface) => {
    const { singleASSETACCOUNTDetailsData, setSingleASSETACCOUNTDetailsData } = props;
    const componentRef = useRef<HTMLDivElement | null>(null);

    return (
        <Fragment>
            <Typography variant='soft'>Asset Account Data</Typography>
            <ModalClose sx={{marginTop: '4px'}}/>
            <div ref={componentRef} id="printable-area" className='mt-4'>
                <ASSETACCOUNTModalUI setSingleASSETACCOUNTDetailsData={setSingleASSETACCOUNTDetailsData} singleASSETACCOUNTDetailsData={singleASSETACCOUNTDetailsData}/>
            </div>
        </Fragment>
    );
});

export default ASSETACCOUNTModalComponent;