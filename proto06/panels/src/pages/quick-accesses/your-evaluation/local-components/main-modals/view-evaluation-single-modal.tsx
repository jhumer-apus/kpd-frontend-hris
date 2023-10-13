import * as React from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Transition } from 'react-transition-group';
import { KPICOREViewInterface } from '@/types/types-employee-and-applicants';
import KPICOREModalComponent from './inner-modals/evaluation-modal-component';


interface SinglePayslipInterface {
    singleKPICOREOpenModal: boolean; 
    setSingleKPICOREOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    singleKPICOREDetailsData: KPICOREViewInterface;
    setSingleKPICOREDetailsData: React.Dispatch<React.SetStateAction<KPICOREViewInterface>>;
}

export default function ViewKPICORESingleModal(props: SinglePayslipInterface) {
    const {singleKPICOREOpenModal, setSingleKPICOREOpenModal, setSingleKPICOREDetailsData, singleKPICOREDetailsData} = props;
  const [scroll, setScroll] = React.useState<boolean>(true);
  return (
    <React.Fragment>
      <Transition in={singleKPICOREOpenModal} timeout={400}>
      {(state: string) => (
      <Modal
        open={!['exited', 'exiting'].includes(state)}
        onClose={() => {
          setSingleKPICOREOpenModal(false);
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
          <KPICOREModalComponent setSingleKPICOREDetailsData={setSingleKPICOREDetailsData} singleKPICOREDetailsData={singleKPICOREDetailsData} scroll={scroll} setScroll={setScroll}/>
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