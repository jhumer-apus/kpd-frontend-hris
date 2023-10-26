import { Dispatch, SetStateAction, Fragment, useState } from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Transition } from 'react-transition-group';
import { ANNOUNCEMENTViewInterface } from '@/types/types-payroll-eoy';
import ANNOUNCEMENTModalComponent from './inner-modals/announcement-modal-component';


interface SingleANNOUNCEMENTInterface {
    singleANNOUNCEMENTOpenModal: boolean; 
    setSingleANNOUNCEMENTOpenModal: Dispatch<SetStateAction<boolean>>;
    singleANNOUNCEMENTDetailsData: ANNOUNCEMENTViewInterface;
    setSingleANNOUNCEMENTDetailsData: Dispatch<SetStateAction<ANNOUNCEMENTViewInterface>>;
}

export default function ViewANNOUNCEMENTSingleModal(props: SingleANNOUNCEMENTInterface) {
    const {singleANNOUNCEMENTOpenModal, setSingleANNOUNCEMENTOpenModal, setSingleANNOUNCEMENTDetailsData, singleANNOUNCEMENTDetailsData} = props;
  const [scroll, setScroll] = useState<boolean>(true);
  return (
    <Fragment>
      <Transition in={singleANNOUNCEMENTOpenModal} timeout={400}>
      {(state: string) => (
      <Modal
        open={!['exited', 'exiting'].includes(state)}
        onClose={() => {
          setSingleANNOUNCEMENTOpenModal(false);
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
              ...ANNOUNCEMENTModalArea,
                opacity: 0,
                transition: `opacity 300ms`,
                ...{
                  entering: { opacity: 1 },
                  entered: { opacity: 1 },
                }[state],
                overflow: 'auto',
            }}
        >
          <ANNOUNCEMENTModalComponent setSingleANNOUNCEMENTDetailsData={setSingleANNOUNCEMENTDetailsData} singleANNOUNCEMENTDetailsData={singleANNOUNCEMENTDetailsData} scroll={scroll} setScroll={setScroll}/>
        </ModalDialog>
      </Modal>
        )}
      </Transition>
    </Fragment>
  );
}


// Styles
const ANNOUNCEMENTModalArea = {
  height: '120.5mm',
  width: '210mm',
  margin: '0 auto',
  background: 'white',
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
};