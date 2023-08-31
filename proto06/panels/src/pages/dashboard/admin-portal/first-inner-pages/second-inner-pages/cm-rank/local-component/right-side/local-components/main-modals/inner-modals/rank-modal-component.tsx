import { Dispatch, Fragment, SetStateAction, useRef } from 'react';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import RANKModalUI from '../../ui-components/rank-modal-ui';
import { RANKViewInterface } from '@/types/types-pages';


interface RANKModalComponentInterface {
    singleRANKDetailsData: RANKViewInterface,
    scroll: boolean,
    setScroll: Dispatch<SetStateAction<boolean>>,
    setSingleRANKDetailsData: React.Dispatch<React.SetStateAction<RANKViewInterface>>;
};

const RANKModalComponent = ((props:RANKModalComponentInterface) => {
    const { singleRANKDetailsData, setSingleRANKDetailsData } = props;
    const componentRef = useRef<HTMLDivElement | null>(null);
    console.log("123??",singleRANKDetailsData )
    return (
        <Fragment>
            <Typography variant='soft'>RANK Individual Data</Typography>
            <ModalClose sx={{marginTop: '4px'}}/>
            <div ref={componentRef} id="printable-area" className='mt-4'>
                <RANKModalUI setSingleRANKDetailsData={setSingleRANKDetailsData} singleRANKDetailsData={singleRANKDetailsData}/>
            </div>
        </Fragment>
    );
});

export default RANKModalComponent;