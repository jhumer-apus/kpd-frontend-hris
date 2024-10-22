import { Dispatch, Fragment, SetStateAction, useRef } from 'react';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import UAModalUI from '../../ui-components/ua-modal-ui';
import { UAViewInterface } from '@/types/types-pages';
import { IconButton } from '@mui/material';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { useDispatch } from 'react-redux';
import { HandleModalAction } from '@/store/actions/components';


interface UAModalComponentInterface {
    singleUADetailsData: UAViewInterface,
    scroll: boolean,
    setScroll: Dispatch<SetStateAction<boolean>>,
    setSingleUADetailsData: React.Dispatch<React.SetStateAction<UAViewInterface>>;
};

const UAModalComponent = ((props:UAModalComponentInterface) => {
    const { singleUADetailsData, setSingleUADetailsData } = props;
    const componentRef = useRef<HTMLDivElement | null>(null);
    const dispatch = useDispatch()

    return (
        <Fragment>
            <div id="close-wrapper" className="w-full flex justify-between items-center bg-gray-100 px-2">
                <Typography>Unaccounted Attendance Data</Typography>
                <IconButton  
                    aria-label="close"
                    onClick={() => 
                    dispatch(HandleModalAction({
                        name: "viewUaModal",
                        value: false
                    }))
                    }
                >
                    <XMarkIcon className="w-8 text-black"/>
                </IconButton>
            </div>
            {/* <ModalClose sx={{marginTop: '4px'}}/> */}
            <div ref={componentRef} id="printable-area" className='mt-4'>
                <UAModalUI setSingleUADetailsData={setSingleUADetailsData} singleUADetailsData={singleUADetailsData}/>
            </div>
        </Fragment>
    );
});

export default UAModalComponent;


// Styles

  
const paySlipDetailsFont = {
    fontSize: '12px',
};