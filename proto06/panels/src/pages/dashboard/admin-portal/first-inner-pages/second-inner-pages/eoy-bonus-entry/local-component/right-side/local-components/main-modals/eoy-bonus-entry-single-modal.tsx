import { Dispatch, SetStateAction, Fragment, useState } from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Transition } from 'react-transition-group';
import { BONUSENTRYViewInterface } from '@/types/types-payroll-eoy';
import BONUSENTRYModalComponent from './inner-modals/bonus-entry-modal-component';


interface SingleBONUSENTRYInterface {
    singleBONUSENTRYOpenModal: boolean; 
    setSingleBONUSENTRYOpenModal: Dispatch<SetStateAction<boolean>>;
    singleBONUSENTRYDetailsData: BONUSENTRYViewInterface;
    setSingleBONUSENTRYDetailsData: Dispatch<SetStateAction<BONUSENTRYViewInterface>>;
}

export default function ViewBONUSENTRYSingleModal(props: SingleBONUSENTRYInterface) {
    const {singleBONUSENTRYOpenModal, setSingleBONUSENTRYOpenModal, setSingleBONUSENTRYDetailsData, singleBONUSENTRYDetailsData} = props;
  const [scroll, setScroll] = useState<boolean>(true);
  return (
    <Fragment>
      <Transition in={singleBONUSENTRYOpenModal} timeout={400}>
      {(state: string) => (
      <Modal
        keepMounted
        open={!['exited', 'exiting'].includes(state)}
        onClose={() => {
          setSingleBONUSENTRYOpenModal(false);
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
              ...BONUSENTRYModalArea,
                opacity: 0,
                transition: `opacity 300ms`,
                ...{
                  entering: { opacity: 1 },
                  entered: { opacity: 1 },
                }[state],
                overflow: 'auto',
            }}
        >
          <BONUSENTRYModalComponent setSingleBONUSENTRYDetailsData={setSingleBONUSENTRYDetailsData} singleBONUSENTRYDetailsData={singleBONUSENTRYDetailsData} scroll={scroll} setScroll={setScroll}/>
        </ModalDialog>
      </Modal>
        )}
      </Transition>
    </Fragment>
  );
}


// Styles
const BONUSENTRYModalArea = {
  height: '88.5mm',
  width: '210mm',
  margin: '0 auto',
  background: 'white',
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
};