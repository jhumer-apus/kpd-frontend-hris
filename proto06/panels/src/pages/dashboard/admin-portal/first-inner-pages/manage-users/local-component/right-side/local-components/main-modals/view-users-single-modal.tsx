import { Dispatch, SetStateAction, Fragment, useState } from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Transition } from 'react-transition-group';
import { USERViewInterface } from '@/types/types-pages';
import USERModalComponent from './inner-modals/users-modal-component';


interface SingleUSERInterface {
    singleUSEROpenModal: boolean; 
    setSingleUSEROpenModal: Dispatch<SetStateAction<boolean>>;
    singleUSERDetailsData: USERViewInterface;
    setSingleUSERDetailsData: Dispatch<SetStateAction<USERViewInterface>>;
}

export default function ViewUSERSingleModal(props: SingleUSERInterface) {
  const {singleUSEROpenModal, setSingleUSEROpenModal, setSingleUSERDetailsData, singleUSERDetailsData} = props;
  const [scroll, setScroll] = useState<boolean>(true);
  return (
    <Fragment>
      <Transition in={singleUSEROpenModal} timeout={400}>
      {(state: string) => (
      <Modal
        open={!['exited', 'exiting'].includes(state)}
        onClose={() => {
          setSingleUSEROpenModal(false);
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
              ...USERModalArea,
                opacity: 0,
                transition: `opacity 300ms`,
                ...{
                  entering: { opacity: 1 },
                  entered: { opacity: 1 },
                }[state],
                overflow: 'auto',
            }}
        >
          <USERModalComponent 
            setSingleUSERDetailsData={setSingleUSERDetailsData} 
            singleUSERDetailsData={singleUSERDetailsData} 
            setSingleUSEROpenModal={setSingleUSEROpenModal}
            />
        </ModalDialog>
      </Modal>
        )}
      </Transition>
    </Fragment>
  );
}


// Styles
const USERModalArea = {
  height: '148.5mm',
  width: '210mm',
  margin: '0 auto',
  background: 'white',
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
};