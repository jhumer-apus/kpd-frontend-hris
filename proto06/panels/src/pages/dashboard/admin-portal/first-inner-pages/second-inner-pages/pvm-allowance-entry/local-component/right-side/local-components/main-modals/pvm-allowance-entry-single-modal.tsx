import { Dispatch, SetStateAction, Fragment, useState } from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Transition } from 'react-transition-group';
import { ALLOWANCEENTRYViewInterface } from '@/types/types-payroll-variables';
import ALLOWANCEENTRYModalComponent from './inner-modals/allowance-entry-modal-component';


interface SingleALLOWANCEENTRYInterface {
    singleALLOWANCEENTRYOpenModal: boolean; 
    setSingleALLOWANCEENTRYOpenModal: Dispatch<SetStateAction<boolean>>;
    singleALLOWANCEENTRYDetailsData: ALLOWANCEENTRYViewInterface;
    setSingleALLOWANCEENTRYDetailsData: Dispatch<SetStateAction<ALLOWANCEENTRYViewInterface>>;
}

export default function ViewALLOWANCEENTRYSingleModal(props: SingleALLOWANCEENTRYInterface) {
    const {singleALLOWANCEENTRYOpenModal, setSingleALLOWANCEENTRYOpenModal, setSingleALLOWANCEENTRYDetailsData, singleALLOWANCEENTRYDetailsData} = props;
  const [scroll, setScroll] = useState<boolean>(true);
  return (
    <Fragment>
      <Transition in={singleALLOWANCEENTRYOpenModal} timeout={400}>
      {(state: string) => (
      <Modal
        keepMounted
        open={!['exited', 'exiting'].includes(state)}
        onClose={() => {
          setSingleALLOWANCEENTRYOpenModal(false);
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
              ...ALLOWANCEENTRYModalArea,
                opacity: 0,
                transition: `opacity 300ms`,
                ...{
                  entering: { opacity: 1 },
                  entered: { opacity: 1 },
                }[state],
                overflow: 'auto',
            }}
        >
          <ALLOWANCEENTRYModalComponent setSingleALLOWANCEENTRYDetailsData={setSingleALLOWANCEENTRYDetailsData} singleALLOWANCEENTRYDetailsData={singleALLOWANCEENTRYDetailsData} scroll={scroll} setScroll={setScroll}/>
        </ModalDialog>
      </Modal>
        )}
      </Transition>
    </Fragment>
  );
}


// Styles
const ALLOWANCEENTRYModalArea = {
  height: '120.5mm',
  width: '210mm',
  margin: '0 auto',
  background: 'white',
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
};