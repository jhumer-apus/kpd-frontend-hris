import { Dispatch, Fragment, SetStateAction, useRef } from 'react';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import ONBOARDINGREQUIREMENTSModalUI from '../../ui-components/onboarding-req-modal-ui';
import { ONBOARDINGREQUIREMENTSViewInterface } from '@/types/types-employee-and-applicants';


interface ONBOARDINGREQUIREMENTSModalComponentInterface {
    singleONBOARDINGREQUIREMENTSDetailsData: ONBOARDINGREQUIREMENTSViewInterface,
    scroll: boolean,
    setScroll: Dispatch<SetStateAction<boolean>>,
    setSingleONBOARDINGREQUIREMENTSDetailsData: React.Dispatch<React.SetStateAction<ONBOARDINGREQUIREMENTSViewInterface>>;
};

const ONBOARDINGREQUIREMENTSModalComponent = ((props:ONBOARDINGREQUIREMENTSModalComponentInterface) => {
    const { singleONBOARDINGREQUIREMENTSDetailsData, setSingleONBOARDINGREQUIREMENTSDetailsData } = props;
    const componentRef = useRef<HTMLDivElement | null>(null);

    return (
        <Fragment>
            <Typography variant='soft'>Onboarding Requirements Details</Typography>
            <ModalClose sx={{marginTop: '4px'}}/>
            <div ref={componentRef} id="printable-area" className='mt-4'>
                <ONBOARDINGREQUIREMENTSModalUI setSingleONBOARDINGREQUIREMENTSDetailsData={setSingleONBOARDINGREQUIREMENTSDetailsData} singleONBOARDINGREQUIREMENTSDetailsData={singleONBOARDINGREQUIREMENTSDetailsData}/>
            </div>
        </Fragment>
    );
});

export default ONBOARDINGREQUIREMENTSModalComponent;