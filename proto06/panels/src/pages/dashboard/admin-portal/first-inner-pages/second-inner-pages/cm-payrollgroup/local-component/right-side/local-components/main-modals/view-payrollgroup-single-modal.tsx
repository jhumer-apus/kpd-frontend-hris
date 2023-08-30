import { Dispatch, SetStateAction, Fragment, useState } from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Transition } from 'react-transition-group';
import { PAYROLLGROUPViewInterface } from '@/types/types-pages';
import PAYROLLGROUPModalComponent from './inner-modals/payrollgroup-modal-component';


interface SinglePAYROLLGROUPInterface {
    singlePAYROLLGROUPOpenModal: boolean; 
    setSinglePAYROLLGROUPOpenModal: Dispatch<SetStateAction<boolean>>;
    singlePAYROLLGROUPDetailsData: PAYROLLGROUPViewInterface;
    setSinglePAYROLLGROUPDetailsData: Dispatch<SetStateAction<PAYROLLGROUPViewInterface>>;
}

export default function ViewPAYROLLGROUPSingleModal(props: SinglePAYROLLGROUPInterface) {
    const {singlePAYROLLGROUPOpenModal, setSinglePAYROLLGROUPOpenModal, setSinglePAYROLLGROUPDetailsData, singlePAYROLLGROUPDetailsData} = props;
  const [scroll, setScroll] = useState<boolean>(true);
  return (
    <Fragment>
      <Transition in={singlePAYROLLGROUPOpenModal} timeout={400}>
      {(state: string) => (
      <Modal
        keepMounted
        open={!['exited', 'exiting'].includes(state)}
        onClose={() => {
          setSinglePAYROLLGROUPOpenModal(false);
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
              ...PAYROLLGROUPModalArea,
                opacity: 0,
                transition: `opacity 300ms`,
                ...{
                  entering: { opacity: 1 },
                  entered: { opacity: 1 },
                }[state],
                overflow: 'auto',
            }}
        >
          <PAYROLLGROUPModalComponent setSinglePAYROLLGROUPDetailsData={setSinglePAYROLLGROUPDetailsData} singlePAYROLLGROUPDetailsData={singlePAYROLLGROUPDetailsData} scroll={scroll} setScroll={setScroll}/>
        </ModalDialog>
      </Modal>
        )}
      </Transition>
    </Fragment>
  );
}


// Styles
const PAYROLLGROUPModalArea = {
  height: '108.5mm',
  width: '210mm',
  margin: '0 auto',
  background: 'white',
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
};