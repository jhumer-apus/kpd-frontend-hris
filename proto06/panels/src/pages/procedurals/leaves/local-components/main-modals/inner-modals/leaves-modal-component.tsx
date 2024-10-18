import { Dispatch, Fragment, SetStateAction, useRef } from 'react';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import LEAVEModalUI from '../../ui-components/leaves-modal-ui';
import { LEAVEViewInterface } from '@/types/types-pages';
import { IconButton } from '@mui/material';
import { useDispatch } from 'react-redux';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { HandleModalAction } from '@/store/actions/components';


interface LEAVEModalComponentInterface {
    singleLEAVEDetailsData: LEAVEViewInterface,
    scroll: boolean,
    setScroll: Dispatch<SetStateAction<boolean>>,
    setSingleLEAVEDetailsData: React.Dispatch<React.SetStateAction<LEAVEViewInterface>>;
};

const LEAVEModalComponent = ((props:LEAVEModalComponentInterface) => {
    const { singleLEAVEDetailsData, setSingleLEAVEDetailsData } = props;
    const componentRef = useRef<HTMLDivElement | null>(null);
    const dispatch = useDispatch()
    
    return (
        <Fragment>
            {/* <ModalClose sx={{marginTop: '4px'}}/> */}
            <div id="close-wrapper" className="w-full flex justify-between items-center bg-gray-100 px-2">
                <Typography>Leave Data</Typography>
                <IconButton  
                    aria-label="close"
                    onClick={() => 
                    dispatch(HandleModalAction({
                        name: "viewLeaveModal",
                        value: false
                        }))
                    }
                >
                    <XMarkIcon className="w-8 text-black"/>
                </IconButton>
            </div>
            <div ref={componentRef} id="printable-area" className='mt-4'>
                <LEAVEModalUI setSingleLEAVEDetailsData={setSingleLEAVEDetailsData} singleLEAVEDetailsData={singleLEAVEDetailsData}/>
            </div>
        </Fragment>
    );
});

export default LEAVEModalComponent;


// Styles

  
const paySlipDetailsFont = {
    fontSize: '12px',
};