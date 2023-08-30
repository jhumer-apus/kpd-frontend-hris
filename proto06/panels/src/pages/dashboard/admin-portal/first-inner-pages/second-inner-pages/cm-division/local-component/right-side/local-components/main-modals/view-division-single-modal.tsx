import { Dispatch, SetStateAction, Fragment, useState } from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Transition } from 'react-transition-group';
import { DIVISIONViewInterface } from '@/types/types-pages';
import DIVISIONModalComponent from './inner-modals/division-modal-component';


interface SingleDIVISIONInterface {
    singleDIVISIONOpenModal: boolean; 
    setSingleDIVISIONOpenModal: Dispatch<SetStateAction<boolean>>;
    singleDIVISIONDetailsData: DIVISIONViewInterface;
    setSingleDIVISIONDetailsData: Dispatch<SetStateAction<DIVISIONViewInterface>>;
}

export default function ViewDIVISIONSingleModal(props: SingleDIVISIONInterface) {
    const {singleDIVISIONOpenModal, setSingleDIVISIONOpenModal, setSingleDIVISIONDetailsData, singleDIVISIONDetailsData} = props;
  const [scroll, setScroll] = useState<boolean>(true);
  return (
    <Fragment>
      <Transition in={singleDIVISIONOpenModal} timeout={400}>
      {(state: string) => (
      <Modal
        keepMounted
        open={!['exited', 'exiting'].includes(state)}
        onClose={() => {
          setSingleDIVISIONOpenModal(false);
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
              ...DIVISIONModalArea,
                opacity: 0,
                transition: `opacity 300ms`,
                ...{
                  entering: { opacity: 1 },
                  entered: { opacity: 1 },
                }[state],
                overflow: 'auto',
            }}
        >
          <DIVISIONModalComponent setSingleDIVISIONDetailsData={setSingleDIVISIONDetailsData} singleDIVISIONDetailsData={singleDIVISIONDetailsData} scroll={scroll} setScroll={setScroll}/>
        </ModalDialog>
      </Modal>
        )}
      </Transition>
    </Fragment>
  );
}


// Styles
const DIVISIONModalArea = {
  height: '88.5mm',
  width: '210mm',
  margin: '0 auto',
  background: 'white',
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
};