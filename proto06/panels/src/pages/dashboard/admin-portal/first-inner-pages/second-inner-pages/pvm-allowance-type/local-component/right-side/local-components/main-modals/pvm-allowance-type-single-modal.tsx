import { Dispatch, SetStateAction, Fragment, useState } from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Transition } from 'react-transition-group';
import { ALLOWANCETYPEViewInterface } from '@/types/types-payroll-variables';
import ALLOWANCETYPEModalComponent from './inner-modals/allowance-type-modal-component';


interface SingleALLOWANCETYPEInterface {
    singleALLOWANCETYPEOpenModal: boolean; 
    setSingleALLOWANCETYPEOpenModal: Dispatch<SetStateAction<boolean>>;
    singleALLOWANCETYPEDetailsData: ALLOWANCETYPEViewInterface;
    setSingleALLOWANCETYPEDetailsData: Dispatch<SetStateAction<ALLOWANCETYPEViewInterface>>;
}

export default function ViewALLOWANCETYPESingleModal(props: SingleALLOWANCETYPEInterface) {
    const {singleALLOWANCETYPEOpenModal, setSingleALLOWANCETYPEOpenModal, setSingleALLOWANCETYPEDetailsData, singleALLOWANCETYPEDetailsData} = props;
  const [scroll, setScroll] = useState<boolean>(true);
  return (
    <Fragment>
      <Transition in={singleALLOWANCETYPEOpenModal} timeout={400}>
      {(state: string) => (
      <Modal
        keepMounted
        open={!['exited', 'exiting'].includes(state)}
        onClose={() => {
          setSingleALLOWANCETYPEOpenModal(false);
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
              ...ALLOWANCETYPEModalArea,
                opacity: 0,
                transition: `opacity 300ms`,
                ...{
                  entering: { opacity: 1 },
                  entered: { opacity: 1 },
                }[state],
                overflow: 'auto',
            }}
        >
          <ALLOWANCETYPEModalComponent setSingleALLOWANCETYPEDetailsData={setSingleALLOWANCETYPEDetailsData} singleALLOWANCETYPEDetailsData={singleALLOWANCETYPEDetailsData} scroll={scroll} setScroll={setScroll}/>
        </ModalDialog>
      </Modal>
        )}
      </Transition>
    </Fragment>
  );
}


// Styles
const ALLOWANCETYPEModalArea = {
  height: '90.5mm',
  width: '210mm',
  margin: '0 auto',
  background: 'white',
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
};