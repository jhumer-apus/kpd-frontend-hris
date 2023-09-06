import { Dispatch, SetStateAction, Fragment, useState } from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Transition } from 'react-transition-group';
import { SSSViewInterface } from '@/types/types-payroll-variables';
import SSSModalComponent from './inner-modals/sss-modal-component';


interface SingleSSSInterface {
    singleSSSOpenModal: boolean; 
    setSingleSSSOpenModal: Dispatch<SetStateAction<boolean>>;
    singleSSSDetailsData: SSSViewInterface;
    setSingleSSSDetailsData: Dispatch<SetStateAction<SSSViewInterface>>;
}

export default function ViewSSSSingleModal(props: SingleSSSInterface) {
    const {singleSSSOpenModal, setSingleSSSOpenModal, setSingleSSSDetailsData, singleSSSDetailsData} = props;
  const [scroll, setScroll] = useState<boolean>(true);
  return (
    <Fragment>
      <Transition in={singleSSSOpenModal} timeout={400}>
      {(state: string) => (
      <Modal
        keepMounted
        open={!['exited', 'exiting'].includes(state)}
        onClose={() => {
          setSingleSSSOpenModal(false);
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
              ...SSSModalArea,
                opacity: 0,
                transition: `opacity 300ms`,
                ...{
                  entering: { opacity: 1 },
                  entered: { opacity: 1 },
                }[state],
                overflow: 'auto',
            }}
        >
          <SSSModalComponent setSingleSSSDetailsData={setSingleSSSDetailsData} singleSSSDetailsData={singleSSSDetailsData} scroll={scroll} setScroll={setScroll}/>
        </ModalDialog>
      </Modal>
        )}
      </Transition>
    </Fragment>
  );
}


// Styles
const SSSModalArea = {
  height: '118.5mm',
  width: '210mm',
  margin: '0 auto',
  background: 'white',
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
};