import { Dispatch, Fragment, SetStateAction, useRef } from 'react';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import EMPSEMINARSModalUI from '../../ui-components/ui-emp-training-seminars-history-modal';
import { EMPSEMINARSViewInterface } from '@/types/types-employee-and-applicants';


interface EMPSEMINARSModalComponentInterface {
    singleEMPSEMINARSDetailsData: EMPSEMINARSViewInterface,
    scroll: boolean,
    setSingleEMPSEMINARSOpenModal: Dispatch<SetStateAction<boolean>>, 
    setScroll: Dispatch<SetStateAction<boolean>>,
    setSingleEMPSEMINARSDetailsData: React.Dispatch<React.SetStateAction<EMPSEMINARSViewInterface>>;
};

const EMPSEMINARSModalComponent = ((props:EMPSEMINARSModalComponentInterface) => {
    const { singleEMPSEMINARSDetailsData, setSingleEMPSEMINARSDetailsData, setSingleEMPSEMINARSOpenModal } = props;
    const componentRef = useRef<HTMLDivElement | null>(null);

    return (
        <Fragment>
            <Typography variant='soft'>Employment History Data</Typography>
            <ModalClose sx={{marginTop: '4px'}}/>
            <div ref={componentRef} id="printable-area" className='mt-4'>
                <EMPSEMINARSModalUI 
                    setSingleEMPSEMINARSDetailsData={setSingleEMPSEMINARSDetailsData} 
                    singleEMPSEMINARSDetailsData={singleEMPSEMINARSDetailsData}
                    setSingleEMPSEMINARSOpenModal={setSingleEMPSEMINARSOpenModal}
                />
            </div>
        </Fragment>
    );
});

export default EMPSEMINARSModalComponent;