import { Dispatch, SetStateAction, Fragment, useState } from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Transition } from 'react-transition-group';
import { POSITIONViewInterface } from '@/types/types-pages';
import POSITIONModalComponent from './inner-modals/position-modal-component';


interface SinglePOSITIONInterface {
    singlePOSITIONOpenModal: boolean; 
    setSinglePOSITIONOpenModal: Dispatch<SetStateAction<boolean>>;
    singlePOSITIONDetailsData: POSITIONViewInterface;
    setSinglePOSITIONDetailsData: Dispatch<SetStateAction<POSITIONViewInterface>>;
}

export default function ViewPOSITIONSingleModal(props: SinglePOSITIONInterface) {
  const {singlePOSITIONOpenModal, setSinglePOSITIONOpenModal, setSinglePOSITIONDetailsData, singlePOSITIONDetailsData} = props;
  const [scroll, setScroll] = useState<boolean>(true);
  return (
    <Fragment>
      <Transition in={singlePOSITIONOpenModal} timeout={400}>
      {(state: string) => (
      <Modal
        open={!['exited', 'exiting'].includes(state)}
        onClose={() => {
          setSinglePOSITIONOpenModal(false);
        }}
        slotProps={{
            backdrop: {
              sx: {
                opacity: 0,
                backdropFilter: 'none',
                transition: `opacity 400ms, backdrop-filter 400ms`,
                ...{
                  entering: { opacity: 1, backdropFilter: 'blur(8px)' },
                  entered: { opacity: 1, backdropFilter: 'blur(8px)' },
                }[state],
              },
            },
          }}
          sx={{
            visibility: state === 'exited' ? 'hidden' : 'visible',
          }}
      >
        <ModalDialog 
            aria-labelledby="dialog-vertical-scroll-title" 
            layout={'center'}
            sx={{
              ...POSITIONModalArea,
                opacity: 0,
                transition: `opacity 300ms`,
                ...{
                  entering: { opacity: 1 },
                  entered: { opacity: 1 },
                }[state],
                overflow: 'auto',
            }}
        >
          <POSITIONModalComponent 
            setSinglePOSITIONDetailsData={setSinglePOSITIONDetailsData} 
            singlePOSITIONDetailsData={singlePOSITIONDetailsData} 
            setSinglePOSITIONOpenModal={setSinglePOSITIONOpenModal}
          />
        </ModalDialog>
      </Modal>
        )}
      </Transition>
    </Fragment>
  );
}


// Styles
const POSITIONModalArea = {
  height: '108.5mm',
  width: '150mm',
  margin: '0 auto',
  background: 'white',
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
};