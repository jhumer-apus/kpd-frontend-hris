import { Dispatch, SetStateAction, Fragment, useState } from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Transition } from 'react-transition-group';
import { OFFBOARDINGSTATUSViewInterface } from '@/types/types-employee-and-applicants';
import OFFBOARDINGSTATUSModalComponent from './inner-modals/initialize-offboarding-modal-component';


interface SingleOFFBOARDINGSTATUSInterface {
    singleOFFBOARDINGSTATUSOpenModal: boolean; 
    setSingleOFFBOARDINGSTATUSOpenModal: Dispatch<SetStateAction<boolean>>;
    singleOFFBOARDINGSTATUSDetailsData: OFFBOARDINGSTATUSViewInterface;
    setSingleOFFBOARDINGSTATUSDetailsData: Dispatch<SetStateAction<OFFBOARDINGSTATUSViewInterface>>;
}

export default function ViewOFFBOARDINGSTATUSSingleModal(props: SingleOFFBOARDINGSTATUSInterface) {
    const {singleOFFBOARDINGSTATUSOpenModal, setSingleOFFBOARDINGSTATUSOpenModal, setSingleOFFBOARDINGSTATUSDetailsData, singleOFFBOARDINGSTATUSDetailsData} = props;
  const [scroll, setScroll] = useState<boolean>(true);
  return (
    <Fragment>
      <Transition in={singleOFFBOARDINGSTATUSOpenModal} timeout={400}>
      {(state: string) => (
      <Modal
        open={!['exited', 'exiting'].includes(state)}
        onClose={() => {
          setSingleOFFBOARDINGSTATUSOpenModal(false);
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
              ...OFFBOARDINGSTATUSModalArea,
                opacity: 0,
                transition: `opacity 300ms`,
                ...{
                  entering: { opacity: 1 },
                  entered: { opacity: 1 },
                }[state],
                overflow: 'auto',
            }}
        >
          <OFFBOARDINGSTATUSModalComponent 
            setSingleOFFBOARDINGSTATUSDetailsData={setSingleOFFBOARDINGSTATUSDetailsData} 
            singleOFFBOARDINGSTATUSDetailsData={singleOFFBOARDINGSTATUSDetailsData} 
            setSingleOFFBOARDINGSTATUSOpenModal={setSingleOFFBOARDINGSTATUSOpenModal}
          />
        </ModalDialog>
      </Modal>
        )}
      </Transition>
    </Fragment>
  );
}


// Styles
const OFFBOARDINGSTATUSModalArea = {
  height: '88.5mm',
  width: '210mm',
  margin: '0 auto',
  background: 'white',
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
};