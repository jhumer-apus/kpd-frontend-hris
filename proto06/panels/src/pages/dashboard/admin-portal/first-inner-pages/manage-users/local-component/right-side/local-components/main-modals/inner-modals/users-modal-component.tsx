import { Dispatch, Fragment, SetStateAction, useRef } from 'react';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import USERModalUI from '../../ui-components/users-modal-ui';
import { USERViewInterface } from '@/types/types-pages';


interface USERModalComponentInterface {
    singleUSERDetailsData: USERViewInterface,
    scroll: boolean,
    setScroll: Dispatch<SetStateAction<boolean>>,
    setSingleUSERDetailsData: React.Dispatch<React.SetStateAction<USERViewInterface>>;
};

const USERModalComponent = ((props:USERModalComponentInterface) => {
    const { singleUSERDetailsData, setSingleUSERDetailsData } = props;
    const componentRef = useRef<HTMLDivElement | null>(null);

    return (
        <Fragment>
            <Typography variant='soft'>HRIS User Data</Typography>
            <ModalClose sx={{marginTop: '4px'}}/>
            <div ref={componentRef} id="printable-area" className='mt-4'>
                <USERModalUI setSingleUSERDetailsData={setSingleUSERDetailsData} singleUSERDetailsData={singleUSERDetailsData}/>
            </div>
        </Fragment>
    );
});

export default USERModalComponent;