import { Dispatch, SetStateAction, Fragment, useState } from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Transition } from 'react-transition-group';
import { PAY13THViewInterface } from '@/types/types-payroll-eoy';
import PAY13THModalComponent from './inner-modals/pay-13th-modal-component';


interface SinglePAY13THInterface {
    singlePAY13THOpenModal: boolean; 
    setSinglePAY13THOpenModal: Dispatch<SetStateAction<boolean>>;
    singlePAY13THDetailsData: PAY13THViewInterface;
    setSinglePAY13THDetailsData: Dispatch<SetStateAction<PAY13THViewInterface>>;
}

export default function ViewPAY13THSingleModal(props: SinglePAY13THInterface) {
    const {singlePAY13THOpenModal, setSinglePAY13THOpenModal, setSinglePAY13THDetailsData, singlePAY13THDetailsData} = props;
  const [scroll, setScroll] = useState<boolean>(true);
  return (
    <Fragment>
      <Transition in={singlePAY13THOpenModal} timeout={400}>
      {(state: string) => (
      <Modal
        keepMounted
        open={!['exited', 'exiting'].includes(state)}
        onClose={() => {
          setSinglePAY13THOpenModal(false);
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
              ...PAY13THModalArea,
                opacity: 0,
                transition: `opacity 300ms`,
                ...{
                  entering: { opacity: 1 },
                  entered: { opacity: 1 },
                }[state],
                overflow: 'auto',
            }}
        >
          <PAY13THModalComponent setSinglePAY13THDetailsData={setSinglePAY13THDetailsData} singlePAY13THDetailsData={singlePAY13THDetailsData} scroll={scroll} setScroll={setScroll}/>
        </ModalDialog>
      </Modal>
        )}
      </Transition>
    </Fragment>
  );
}


// Styles
const PAY13THModalArea = {
  height: '88.5mm',
  width: '210mm',
  margin: '0 auto',
  background: 'white',
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
};