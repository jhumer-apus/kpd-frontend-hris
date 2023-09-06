import { Dispatch, SetStateAction, Fragment, useState } from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Transition } from 'react-transition-group';
import { PHILHEALTHViewInterface } from '@/types/types-payroll-variables';
import PHILHEALTHModalComponent from './inner-modals/philhealth-modal-component';


interface SinglePHILHEALTHInterface {
    singlePHILHEALTHOpenModal: boolean; 
    setSinglePHILHEALTHOpenModal: Dispatch<SetStateAction<boolean>>;
    singlePHILHEALTHDetailsData: PHILHEALTHViewInterface;
    setSinglePHILHEALTHDetailsData: Dispatch<SetStateAction<PHILHEALTHViewInterface>>;
}

export default function ViewPHILHEALTHSingleModal(props: SinglePHILHEALTHInterface) {
    const {singlePHILHEALTHOpenModal, setSinglePHILHEALTHOpenModal, setSinglePHILHEALTHDetailsData, singlePHILHEALTHDetailsData} = props;
  const [scroll, setScroll] = useState<boolean>(true);
  return (
    <Fragment>
      <Transition in={singlePHILHEALTHOpenModal} timeout={400}>
      {(state: string) => (
      <Modal
        keepMounted
        open={!['exited', 'exiting'].includes(state)}
        onClose={() => {
          setSinglePHILHEALTHOpenModal(false);
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
              ...PHILHEALTHModalArea,
                opacity: 0,
                transition: `opacity 300ms`,
                ...{
                  entering: { opacity: 1 },
                  entered: { opacity: 1 },
                }[state],
                overflow: 'auto',
            }}
        >
          <PHILHEALTHModalComponent setSinglePHILHEALTHDetailsData={setSinglePHILHEALTHDetailsData} singlePHILHEALTHDetailsData={singlePHILHEALTHDetailsData} scroll={scroll} setScroll={setScroll}/>
        </ModalDialog>
      </Modal>
        )}
      </Transition>
    </Fragment>
  );
}


// Styles
const PHILHEALTHModalArea = {
  height: '90.5mm',
  width: '210mm',
  margin: '0 auto',
  background: 'white',
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
};