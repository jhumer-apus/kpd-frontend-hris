import { Dispatch, Fragment, SetStateAction, useRef } from 'react';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import OFFBOARDINGREQUIREMENTSModalUI from '../../ui-components/offboarding-req-modal-ui';
import { OFFBOARDINGREQUIREMENTSViewInterface } from '@/types/types-employee-and-applicants';


interface OFFBOARDINGREQUIREMENTSModalComponentInterface {
    singleOFFBOARDINGREQUIREMENTSDetailsData: OFFBOARDINGREQUIREMENTSViewInterface,
    setSingleOFFBOARDINGREQUIREMENTSOpenModal: Dispatch<SetStateAction<boolean>>,
    setSingleOFFBOARDINGREQUIREMENTSDetailsData: React.Dispatch<React.SetStateAction<OFFBOARDINGREQUIREMENTSViewInterface>>;
};

const OFFBOARDINGREQUIREMENTSModalComponent = ((props:OFFBOARDINGREQUIREMENTSModalComponentInterface) => {
    const { 
        singleOFFBOARDINGREQUIREMENTSDetailsData, 
        setSingleOFFBOARDINGREQUIREMENTSDetailsData,
        setSingleOFFBOARDINGREQUIREMENTSOpenModal 
    } = props;
    const componentRef = useRef<HTMLDivElement | null>(null);

    return (
        <Fragment>
            <Typography variant='soft'>Offboarding Requirements Data</Typography>
            {/* <ModalClose sx={{marginTop: '4px'}}/> */}
            <div ref={componentRef} id="printable-area" className='mt-4'>
                <OFFBOARDINGREQUIREMENTSModalUI 
                    setSingleOFFBOARDINGREQUIREMENTSDetailsData={setSingleOFFBOARDINGREQUIREMENTSDetailsData} 
                    singleOFFBOARDINGREQUIREMENTSDetailsData={singleOFFBOARDINGREQUIREMENTSDetailsData}
                    setSingleOFFBOARDINGREQUIREMENTSOpenModal={setSingleOFFBOARDINGREQUIREMENTSOpenModal}
                />
            </div>
        </Fragment>
    );
});

export default OFFBOARDINGREQUIREMENTSModalComponent;