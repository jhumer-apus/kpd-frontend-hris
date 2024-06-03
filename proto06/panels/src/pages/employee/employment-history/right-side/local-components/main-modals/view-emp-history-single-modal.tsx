import { Dispatch, SetStateAction, Fragment, useState } from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Transition } from 'react-transition-group';
import { EMPHISTORYViewInterface } from '@/types/types-employee-and-applicants';
import EMPHISTORYModalComponent from './inner-modals/emp-history-modal-component';


interface SingleEMPHISTORYInterface {
    singleEMPHISTORYOpenModal: boolean; 
    setSingleEMPHISTORYOpenModal: Dispatch<SetStateAction<boolean>>;
    singleEMPHISTORYDetailsData: EMPHISTORYViewInterface;
    setSingleEMPHISTORYDetailsData: Dispatch<SetStateAction<EMPHISTORYViewInterface>>;
}

export default function ViewEMPHISTORYSingleModal(props: SingleEMPHISTORYInterface) {
    const {singleEMPHISTORYOpenModal, setSingleEMPHISTORYOpenModal, setSingleEMPHISTORYDetailsData, singleEMPHISTORYDetailsData} = props;
  const [scroll, setScroll] = useState<boolean>(true);
  return (
    <Fragment>
      <Transition in={singleEMPHISTORYOpenModal} timeout={400}>
      {(state: string) => (
      <Modal
        // keepMounted
        open={!['exited', 'exiting'].includes(state)}
        onClose={() => {
          setSingleEMPHISTORYOpenModal(false);
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
              ...EMPHISTORYModalArea,
                opacity: 0,
                transition: `opacity 300ms`,
                ...{
                  entering: { opacity: 1 },
                  entered: { opacity: 1 },
                }[state],
                overflow: 'auto',
            }}
        >
          <EMPHISTORYModalComponent 
            setSingleEMPHISTORYDetailsData={setSingleEMPHISTORYDetailsData} 
            singleEMPHISTORYDetailsData={singleEMPHISTORYDetailsData} 
            scroll={scroll} 
            setScroll={setScroll}
            setSingleEMPHISTORYOpenModal={setSingleEMPHISTORYOpenModal}
          />
        </ModalDialog>
      </Modal>
        )}
      </Transition>
    </Fragment>
  );
}


// Styles
const EMPHISTORYModalArea = {
  height: '128.5mm',
  width: '210mm',
  margin: '0 auto',
  background: 'white',
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
};