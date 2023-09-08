import { Dispatch, SetStateAction, Fragment, useState } from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Transition } from 'react-transition-group';
import { CASHADVANCEViewInterface } from '@/types/types-payroll-variables';
import CASHADVANCEModalComponent from './inner-modals/cash-advance-modal-component';


interface SingleCASHADVANCEInterface {
    singleCASHADVANCEOpenModal: boolean; 
    setSingleCASHADVANCEOpenModal: Dispatch<SetStateAction<boolean>>;
    singleCASHADVANCEDetailsData: CASHADVANCEViewInterface;
    setSingleCASHADVANCEDetailsData: Dispatch<SetStateAction<CASHADVANCEViewInterface>>;
}

export default function ViewCASHADVANCESingleModal(props: SingleCASHADVANCEInterface) {
    const {singleCASHADVANCEOpenModal, setSingleCASHADVANCEOpenModal, setSingleCASHADVANCEDetailsData, singleCASHADVANCEDetailsData} = props;
  const [scroll, setScroll] = useState<boolean>(true);
  return (
    <Fragment>
      <Transition in={singleCASHADVANCEOpenModal} timeout={400}>
      {(state: string) => (
      <Modal
        keepMounted
        open={!['exited', 'exiting'].includes(state)}
        onClose={() => {
          setSingleCASHADVANCEOpenModal(false);
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
              ...CASHADVANCEModalArea,
                opacity: 0,
                transition: `opacity 300ms`,
                ...{
                  entering: { opacity: 1 },
                  entered: { opacity: 1 },
                }[state],
                overflow: 'auto',
            }}
        >
          <CASHADVANCEModalComponent setSingleCASHADVANCEDetailsData={setSingleCASHADVANCEDetailsData} singleCASHADVANCEDetailsData={singleCASHADVANCEDetailsData} scroll={scroll} setScroll={setScroll}/>
        </ModalDialog>
      </Modal>
        )}
      </Transition>
    </Fragment>
  );
}


// Styles
const CASHADVANCEModalArea = {
  height: '120.5mm',
  width: '210mm',
  margin: '0 auto',
  background: 'white',
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
};