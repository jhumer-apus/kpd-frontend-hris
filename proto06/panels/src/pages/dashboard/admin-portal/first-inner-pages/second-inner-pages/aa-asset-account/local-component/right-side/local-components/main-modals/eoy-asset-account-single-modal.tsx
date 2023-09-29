import { Dispatch, SetStateAction, Fragment, useState } from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Transition } from 'react-transition-group';
import { ASSETACCOUNTViewInterface } from '@/types/types-payroll-eoy';
import ASSETACCOUNTModalComponent from './inner-modals/asset-account-modal-component';


interface SingleASSETACCOUNTInterface {
    singleASSETACCOUNTOpenModal: boolean; 
    setSingleASSETACCOUNTOpenModal: Dispatch<SetStateAction<boolean>>;
    singleASSETACCOUNTDetailsData: ASSETACCOUNTViewInterface;
    setSingleASSETACCOUNTDetailsData: Dispatch<SetStateAction<ASSETACCOUNTViewInterface>>;
}

export default function ViewASSETACCOUNTSingleModal(props: SingleASSETACCOUNTInterface) {
    const {singleASSETACCOUNTOpenModal, setSingleASSETACCOUNTOpenModal, setSingleASSETACCOUNTDetailsData, singleASSETACCOUNTDetailsData} = props;
  const [scroll, setScroll] = useState<boolean>(true);
  return (
    <Fragment>
      <Transition in={singleASSETACCOUNTOpenModal} timeout={400}>
      {(state: string) => (
      <Modal
        keepMounted
        open={!['exited', 'exiting'].includes(state)}
        onClose={() => {
          setSingleASSETACCOUNTOpenModal(false);
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
              ...ASSETACCOUNTModalArea,
                opacity: 0,
                transition: `opacity 300ms`,
                ...{
                  entering: { opacity: 1 },
                  entered: { opacity: 1 },
                }[state],
                overflow: 'auto',
            }}
        >
          <ASSETACCOUNTModalComponent setSingleASSETACCOUNTDetailsData={setSingleASSETACCOUNTDetailsData} singleASSETACCOUNTDetailsData={singleASSETACCOUNTDetailsData} scroll={scroll} setScroll={setScroll}/>
        </ModalDialog>
      </Modal>
        )}
      </Transition>
    </Fragment>
  );
}


// Styles
const ASSETACCOUNTModalArea = {
  height: '120.5mm',
  width: '210mm',
  margin: '0 auto',
  background: 'white',
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
};