import { Dispatch, SetStateAction, Fragment, useState } from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Transition } from 'react-transition-group';
import { CORECOMPEViewInterface } from '@/types/types-employee-and-applicants';
import CORECOMPEModalComponent from './inner-modals/core-compe-modal-component';


interface SingleCORECOMPEInterface {
    singleCORECOMPEOpenModal: boolean; 
    setSingleCORECOMPEOpenModal: Dispatch<SetStateAction<boolean>>;
    singleCORECOMPEDetailsData: CORECOMPEViewInterface;
    setSingleCORECOMPEDetailsData: Dispatch<SetStateAction<CORECOMPEViewInterface>>;
}

export default function ViewCORECOMPESingleModal(props: SingleCORECOMPEInterface) {
    const {singleCORECOMPEOpenModal, setSingleCORECOMPEOpenModal, setSingleCORECOMPEDetailsData, singleCORECOMPEDetailsData} = props;
  const [scroll, setScroll] = useState<boolean>(true);
  return (
    <Fragment>
      <Transition in={singleCORECOMPEOpenModal} timeout={400}>
      {(state: string) => (
      <Modal
        // keepMounted <--when disabled, the onmount transition effect disappears, however, the localstate onMount bug reappears. To Do: Needs to re-evaluate if the transition can be restack to co-exist with the functionality
        open={!['exited', 'exiting'].includes(state)}
        onClose={() => {
          setSingleCORECOMPEOpenModal(false);
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
              ...CORECOMPEModalArea,
                opacity: 0,
                transition: `opacity 300ms`,
                ...{
                  entering: { opacity: 1 },
                  entered: { opacity: 1 },
                }[state],
                overflow: 'auto',
            }}
        >
          <CORECOMPEModalComponent setSingleCORECOMPEDetailsData={setSingleCORECOMPEDetailsData} singleCORECOMPEDetailsData={singleCORECOMPEDetailsData} scroll={scroll} setScroll={setScroll}/>
        </ModalDialog>
      </Modal>
        )}
      </Transition>
    </Fragment>
  );
}


// Styles
const CORECOMPEModalArea = {
  height: '120.5mm',
  width: '210mm',
  margin: '0 auto',
  background: 'white',
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
};