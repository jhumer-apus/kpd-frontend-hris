import { Dispatch, Fragment, SetStateAction, useRef } from 'react';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import ONBOARDINGSTATUSModalUI from '../../ui-components/onboarding-status-modal-ui';
import { ONBOARDINGSTATUSViewInterface } from '@/types/types-employee-and-applicants';


interface ONBOARDINGSTATUSModalComponentInterface {
    singleONBOARDINGSTATUSDetailsData: ONBOARDINGSTATUSViewInterface,
    scroll: boolean,
    setScroll: Dispatch<SetStateAction<boolean>>,
    setSingleONBOARDINGSTATUSDetailsData: React.Dispatch<React.SetStateAction<ONBOARDINGSTATUSViewInterface>>;
};

const ONBOARDINGSTATUSModalComponent = ((props:ONBOARDINGSTATUSModalComponentInterface) => {
    const { singleONBOARDINGSTATUSDetailsData, setSingleONBOARDINGSTATUSDetailsData } = props;
    const componentRef = useRef<HTMLDivElement | null>(null);

    return (
        <Fragment>
            <Typography variant='soft'>Onboarding Status Data</Typography>
            <ModalClose sx={{marginTop: '4px'}}/>
            <Typography className='italic text-center' sx={{marginTop:'10px', fontSize: '14px'}}>Onboarding lists on "view" mode only. To keep the integrity of data safe, unless data flow has been redefined, data must come from the facilitator assigned for each onboarding item.</Typography>
            <div ref={componentRef} id="printable-area" className='mt-4'>
                <ONBOARDINGSTATUSModalUI setSingleONBOARDINGSTATUSDetailsData={setSingleONBOARDINGSTATUSDetailsData} singleONBOARDINGSTATUSDetailsData={singleONBOARDINGSTATUSDetailsData}/>
            </div>

        </Fragment>
    );
});

export default ONBOARDINGSTATUSModalComponent;