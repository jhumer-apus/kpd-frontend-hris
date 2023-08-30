import { Dispatch, SetStateAction, Fragment, useState } from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Transition } from 'react-transition-group';
import { DEPARTMENTViewInterface } from '@/types/types-pages';
import DEPARTMENTModalComponent from './inner-modals/department-modal-component';


interface SingleDEPARTMENTInterface {
    singleDEPARTMENTOpenModal: boolean; 
    setSingleDEPARTMENTOpenModal: Dispatch<SetStateAction<boolean>>;
    singleDEPARTMENTDetailsData: DEPARTMENTViewInterface;
    setSingleDEPARTMENTDetailsData: Dispatch<SetStateAction<DEPARTMENTViewInterface>>;
}

export default function ViewDEPARTMENTSingleModal(props: SingleDEPARTMENTInterface) {
    const {singleDEPARTMENTOpenModal, setSingleDEPARTMENTOpenModal, setSingleDEPARTMENTDetailsData, singleDEPARTMENTDetailsData} = props;
  const [scroll, setScroll] = useState<boolean>(true);
  return (
    <Fragment>
      <Transition in={singleDEPARTMENTOpenModal} timeout={400}>
      {(state: string) => (
      <Modal
        keepMounted
        open={!['exited', 'exiting'].includes(state)}
        onClose={() => {
          setSingleDEPARTMENTOpenModal(false);
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
              ...DEPARTMENTModalArea,
                opacity: 0,
                transition: `opacity 300ms`,
                ...{
                  entering: { opacity: 1 },
                  entered: { opacity: 1 },
                }[state],
                overflow: 'auto',
            }}
        >
          <DEPARTMENTModalComponent setSingleDEPARTMENTDetailsData={setSingleDEPARTMENTDetailsData} singleDEPARTMENTDetailsData={singleDEPARTMENTDetailsData} scroll={scroll} setScroll={setScroll}/>
        </ModalDialog>
      </Modal>
        )}
      </Transition>
    </Fragment>
  );
}


// Styles
const DEPARTMENTModalArea = {
  height: '88.5mm',
  width: '210mm',
  margin: '0 auto',
  background: 'white',
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
};