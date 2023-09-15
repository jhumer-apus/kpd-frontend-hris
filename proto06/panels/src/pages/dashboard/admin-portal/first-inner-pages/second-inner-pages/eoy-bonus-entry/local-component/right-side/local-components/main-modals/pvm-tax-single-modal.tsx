import { Dispatch, SetStateAction, Fragment, useState } from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Transition } from 'react-transition-group';
import { TAXViewInterface } from '@/types/types-payroll-variables';
import TAXModalComponent from './inner-modals/tax-modal-component';


interface SingleTAXInterface {
    singleTAXOpenModal: boolean; 
    setSingleTAXOpenModal: Dispatch<SetStateAction<boolean>>;
    singleTAXDetailsData: TAXViewInterface;
    setSingleTAXDetailsData: Dispatch<SetStateAction<TAXViewInterface>>;
}

export default function ViewTAXSingleModal(props: SingleTAXInterface) {
    const {singleTAXOpenModal, setSingleTAXOpenModal, setSingleTAXDetailsData, singleTAXDetailsData} = props;
  const [scroll, setScroll] = useState<boolean>(true);
  return (
    <Fragment>
      <Transition in={singleTAXOpenModal} timeout={400}>
      {(state: string) => (
      <Modal
        keepMounted
        open={!['exited', 'exiting'].includes(state)}
        onClose={() => {
          setSingleTAXOpenModal(false);
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
              ...TAXModalArea,
                opacity: 0,
                transition: `opacity 300ms`,
                ...{
                  entering: { opacity: 1 },
                  entered: { opacity: 1 },
                }[state],
                overflow: 'auto',
            }}
        >
          <TAXModalComponent setSingleTAXDetailsData={setSingleTAXDetailsData} singleTAXDetailsData={singleTAXDetailsData} scroll={scroll} setScroll={setScroll}/>
        </ModalDialog>
      </Modal>
        )}
      </Transition>
    </Fragment>
  );
}


// Styles
const TAXModalArea = {
  height: '118.5mm',
  width: '210mm',
  margin: '0 auto',
  background: 'white',
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
};