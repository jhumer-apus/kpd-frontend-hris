import { Dispatch, Fragment, SetStateAction, useRef } from 'react';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import EMPSEMINARSModalUI from '../../ui-components/emp-seminars-modal-ui';
import { EMPSEMINARSViewInterface } from '@/types/types-employee-and-applicants';


interface EMPSEMINARSModalComponentInterface {
    singleEMPSEMINARSDetailsData: EMPSEMINARSViewInterface,
    scroll: boolean,
    setScroll: Dispatch<SetStateAction<boolean>>,
    setSingleEMPSEMINARSDetailsData: React.Dispatch<React.SetStateAction<EMPSEMINARSViewInterface>>;
};

const EMPSEMINARSModalComponent = ((props:EMPSEMINARSModalComponentInterface) => {
    const { singleEMPSEMINARSDetailsData, setSingleEMPSEMINARSDetailsData } = props;
    const componentRef = useRef<HTMLDivElement | null>(null);

    return (
        <Fragment>
            <Typography variant='soft'>EMPSEMINARS Individual Data</Typography>
            <ModalClose sx={{marginTop: '4px'}}/>
            <div ref={componentRef} id="printable-area" className='mt-4'>
                <EMPSEMINARSModalUI setSingleEMPSEMINARSDetailsData={setSingleEMPSEMINARSDetailsData} singleEMPSEMINARSDetailsData={singleEMPSEMINARSDetailsData}/>
            </div>
        </Fragment>
    );
});

export default EMPSEMINARSModalComponent;