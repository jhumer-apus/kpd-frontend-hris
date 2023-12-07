import * as React from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Transition } from 'react-transition-group';
import { ONBOARDINGSTATUSViewInterface } from '@/types/types-employee-and-applicants';
import ONBOARDINGSTATUSModalComponent from './inner-modals/onboarding-status-modal-component';


interface SinglePayslipInterface {
    singleONBOARDINGSTATUSOpenModal: boolean; 
    setSingleONBOARDINGSTATUSOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    singleONBOARDINGSTATUSDetailsData: ONBOARDINGSTATUSViewInterface;
    setSingleONBOARDINGSTATUSDetailsData: React.Dispatch<React.SetStateAction<ONBOARDINGSTATUSViewInterface>>;
}

export default function ViewONBOARDINGSTATUSSingleModal(props: SinglePayslipInterface) {
    const {singleONBOARDINGSTATUSOpenModal, setSingleONBOARDINGSTATUSOpenModal, setSingleONBOARDINGSTATUSDetailsData, singleONBOARDINGSTATUSDetailsData} = props;
  const [scroll, setScroll] = React.useState<boolean>(true);
  return (
    <React.Fragment>
      <Transition in={singleONBOARDINGSTATUSOpenModal} timeout={400}>
      {(state: string) => (
      <Modal
        open={!['exited', 'exiting'].includes(state)}
        onClose={() => {
          setSingleONBOARDINGSTATUSOpenModal(false);
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
              ...paySlipArea,
                opacity: 0,
                transition: `opacity 300ms`,
                ...{
                  entering: { opacity: 1 },
                  entered: { opacity: 1 },
                }[state],
                overflow: 'auto',
            }}
        >
          <ONBOARDINGSTATUSModalComponent setSingleONBOARDINGSTATUSDetailsData={setSingleONBOARDINGSTATUSDetailsData} singleONBOARDINGSTATUSDetailsData={singleONBOARDINGSTATUSDetailsData} scroll={scroll} setScroll={setScroll}/>
        </ModalDialog>
      </Modal>
        )}
      </Transition>
    </React.Fragment>
  );
}


// Styles
const paySlipArea = {
  height: '208.5mm',
  width: '210mm',
  margin: '0 auto',
  background: 'white',
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
};