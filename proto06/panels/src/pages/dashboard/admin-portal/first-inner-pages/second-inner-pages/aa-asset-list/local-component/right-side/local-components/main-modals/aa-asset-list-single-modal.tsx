import { Dispatch, SetStateAction, Fragment, useState } from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Transition } from 'react-transition-group';
import { ASSETLISTViewInterface } from '@/types/types-payroll-eoy';
import ASSETLISTModalComponent from './inner-modals/asset-list-modal-component';


interface SingleASSETLISTInterface {
    singleASSETLISTOpenModal: boolean; 
    setSingleASSETLISTOpenModal: Dispatch<SetStateAction<boolean>>;
    singleASSETLISTDetailsData: ASSETLISTViewInterface;
    setSingleASSETLISTDetailsData: Dispatch<SetStateAction<ASSETLISTViewInterface>>;
}

export default function ViewASSETLISTSingleModal(props: SingleASSETLISTInterface) {
    const {singleASSETLISTOpenModal, setSingleASSETLISTOpenModal, setSingleASSETLISTDetailsData, singleASSETLISTDetailsData} = props;
  const [scroll, setScroll] = useState<boolean>(true);
  return (
    <Fragment>
      <Transition in={singleASSETLISTOpenModal} timeout={400}>
      {(state: string) => (
      <Modal
        keepMounted
        open={!['exited', 'exiting'].includes(state)}
        onClose={() => {
          setSingleASSETLISTOpenModal(false);
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
              ...ASSETLISTModalArea,
                opacity: 0,
                transition: `opacity 300ms`,
                ...{
                  entering: { opacity: 1 },
                  entered: { opacity: 1 },
                }[state],
                overflow: 'auto',
            }}
        >
          <ASSETLISTModalComponent setSingleASSETLISTDetailsData={setSingleASSETLISTDetailsData} singleASSETLISTDetailsData={singleASSETLISTDetailsData} scroll={scroll} setScroll={setScroll}/>
        </ModalDialog>
      </Modal>
        )}
      </Transition>
    </Fragment>
  );
}


// Styles
const ASSETLISTModalArea = {
  height: '120.5mm',
  width: '210mm',
  margin: '0 auto',
  background: 'white',
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
};