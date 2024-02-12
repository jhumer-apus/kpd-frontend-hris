import { Dispatch, Fragment, SetStateAction, useRef } from 'react';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import ANNOUNCEMENTModalUI from '../../ui-components/announcement-modal-ui';
import { ANNOUNCEMENTViewInterface } from '@/types/types-payroll-eoy';


interface ANNOUNCEMENTModalComponentInterface {
    singleANNOUNCEMENTDetailsData: ANNOUNCEMENTViewInterface,
    scroll: boolean,
    setScroll: Dispatch<SetStateAction<boolean>>,
    setSingleANNOUNCEMENTDetailsData: React.Dispatch<React.SetStateAction<ANNOUNCEMENTViewInterface>>;
};

const ANNOUNCEMENTModalComponent = ((props:ANNOUNCEMENTModalComponentInterface) => {
    const { singleANNOUNCEMENTDetailsData, setSingleANNOUNCEMENTDetailsData } = props;
    const componentRef = useRef<HTMLDivElement | null>(null);

    return (
        <Fragment>
            <Typography variant='soft'>Announcement Data</Typography>
            <ModalClose sx={{marginTop: '4px'}}/>
            <div ref={componentRef} id="printable-area" className='mt-4'>
                <ANNOUNCEMENTModalUI setSingleANNOUNCEMENTDetailsData={setSingleANNOUNCEMENTDetailsData} singleANNOUNCEMENTDetailsData={singleANNOUNCEMENTDetailsData}/>
            </div>
        </Fragment>
    );
});

export default ANNOUNCEMENTModalComponent;