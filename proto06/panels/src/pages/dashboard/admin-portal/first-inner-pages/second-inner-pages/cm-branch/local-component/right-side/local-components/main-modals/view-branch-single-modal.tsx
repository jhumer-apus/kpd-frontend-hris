import { Dispatch, SetStateAction, Fragment, useState } from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Transition } from 'react-transition-group';
import { BRANCHViewInterface } from '@/types/types-pages';
import BRANCHModalComponent from './inner-modals/branch-modal-component';


interface SingleBRANCHInterface {
    singleBRANCHOpenModal: boolean; 
    setSingleBRANCHOpenModal: Dispatch<SetStateAction<boolean>>;
    singleBRANCHDetailsData: BRANCHViewInterface;
    setSingleBRANCHDetailsData: Dispatch<SetStateAction<BRANCHViewInterface>>;
}

export default function ViewBRANCHSingleModal(props: SingleBRANCHInterface) {
    const {singleBRANCHOpenModal, setSingleBRANCHOpenModal, setSingleBRANCHDetailsData, singleBRANCHDetailsData} = props;
  const [scroll, setScroll] = useState<boolean>(true);
  return (
    <Fragment>
      <Transition in={singleBRANCHOpenModal} timeout={400}>
      {(state: string) => (
      <Modal
        open={!['exited', 'exiting'].includes(state)}
        onClose={() => {
          setSingleBRANCHOpenModal(false);
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
              ...BRANCHModalArea,
                opacity: 0,
                transition: `opacity 300ms`,
                ...{
                  entering: { opacity: 1 },
                  entered: { opacity: 1 },
                }[state],
                overflow: 'auto',
            }}
        >
          <BRANCHModalComponent 
            setSingleBRANCHDetailsData={setSingleBRANCHDetailsData} 
            singleBRANCHDetailsData={singleBRANCHDetailsData}
            setSingleBRANCHOpenModal={setSingleBRANCHOpenModal} 
          />
        </ModalDialog>
      </Modal>
        )}
      </Transition>
    </Fragment>
  );
}


// Styles
const BRANCHModalArea = {
  height: 'auto',
  width: '110mm',
  margin: '0 auto',
  background: 'white',
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
};