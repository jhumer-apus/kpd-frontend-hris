import { Dispatch, SetStateAction, Fragment, useState } from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Transition } from 'react-transition-group';
import { EMPSEMINARSViewInterface } from '@/types/types-employee-and-applicants';
import EMPSEMINARSModalComponent from './inner-modals/emp-training-seminars-modal-component';


interface SingleEMPSEMINARSInterface {
    singleEMPSEMINARSOpenModal: boolean; 
    setSingleEMPSEMINARSOpenModal: Dispatch<SetStateAction<boolean>>;
    singleEMPSEMINARSDetailsData: EMPSEMINARSViewInterface;
    setSingleEMPSEMINARSDetailsData: Dispatch<SetStateAction<EMPSEMINARSViewInterface>>;
}

export default function ViewEMPSEMINARSSingleModal(props: SingleEMPSEMINARSInterface) {
    const {singleEMPSEMINARSOpenModal, setSingleEMPSEMINARSOpenModal, setSingleEMPSEMINARSDetailsData, singleEMPSEMINARSDetailsData} = props;
  const [scroll, setScroll] = useState<boolean>(true);
  return (
    <Fragment>
      <Transition in={singleEMPSEMINARSOpenModal} timeout={400}>
      {(state: string) => (
      <Modal
        // keepMounted
        open={!['exited', 'exiting'].includes(state)}
        onClose={() => {
          setSingleEMPSEMINARSOpenModal(false);
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
              ...EMPSEMINARSModalArea,
                opacity: 0,
                transition: `opacity 300ms`,
                ...{
                  entering: { opacity: 1 },
                  entered: { opacity: 1 },
                }[state],
                overflow: 'auto',
            }}
        >
          <EMPSEMINARSModalComponent 
            setSingleEMPSEMINARSDetailsData={setSingleEMPSEMINARSDetailsData} 
            singleEMPSEMINARSDetailsData={singleEMPSEMINARSDetailsData} 
            scroll={scroll} 
            setScroll={setScroll}
            setSingleEMPSEMINARSOpenModal={setSingleEMPSEMINARSOpenModal}
          />
        </ModalDialog>
      </Modal>
        )}
      </Transition>
    </Fragment>
  );
}


// Styles
const EMPSEMINARSModalArea = {
  height: '128.5mm',
  width: '210mm',
  margin: '0 auto',
  background: 'white',
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
};