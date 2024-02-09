import { Dispatch, Fragment, SetStateAction, useRef } from 'react';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import ASSETLISTModalUI from '../../ui-components/asset-list-modal-ui';
import { ASSETLISTViewInterface } from '@/types/types-payroll-eoy';


interface ASSETLISTModalComponentInterface {
    singleASSETLISTDetailsData: ASSETLISTViewInterface,
    scroll: boolean,
    setScroll: Dispatch<SetStateAction<boolean>>,
    setSingleASSETLISTDetailsData: React.Dispatch<React.SetStateAction<ASSETLISTViewInterface>>;
};

const ASSETLISTModalComponent = ((props:ASSETLISTModalComponentInterface) => {
    const { singleASSETLISTDetailsData, setSingleASSETLISTDetailsData } = props;
    const componentRef = useRef<HTMLDivElement | null>(null);

    return (
        <Fragment>
            <Typography variant='soft'>Asset List Data</Typography>
            <ModalClose sx={{marginTop: '4px'}}/>
            <div ref={componentRef} id="printable-area" className='mt-4'>
                <ASSETLISTModalUI setSingleASSETLISTDetailsData={setSingleASSETLISTDetailsData} singleASSETLISTDetailsData={singleASSETLISTDetailsData}/>
            </div>
        </Fragment>
    );
});

export default ASSETLISTModalComponent;