import { Dispatch, SetStateAction, Fragment, useState } from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Transition } from 'react-transition-group';
import { OFFBOARDINGREQUIREMENTSViewInterface } from '@/types/types-employee-and-applicants';
import OFFBOARDINGREQUIREMENTSModalComponent from './inner-modals/offboarding-req-modal-component';


interface SingleOFFBOARDINGREQUIREMENTSInterface {
    singleOFFBOARDINGREQUIREMENTSOpenModal: boolean; 
    setSingleOFFBOARDINGREQUIREMENTSOpenModal: Dispatch<SetStateAction<boolean>>;
    singleOFFBOARDINGREQUIREMENTSDetailsData: OFFBOARDINGREQUIREMENTSViewInterface;
    setSingleOFFBOARDINGREQUIREMENTSDetailsData: Dispatch<SetStateAction<OFFBOARDINGREQUIREMENTSViewInterface>>;
}

export default function ViewOFFBOARDINGREQUIREMENTSSingleModal(props: SingleOFFBOARDINGREQUIREMENTSInterface) {
    const {singleOFFBOARDINGREQUIREMENTSOpenModal, setSingleOFFBOARDINGREQUIREMENTSOpenModal, setSingleOFFBOARDINGREQUIREMENTSDetailsData, singleOFFBOARDINGREQUIREMENTSDetailsData} = props;
  const [scroll, setScroll] = useState<boolean>(true);
  return (
    <Fragment>
      <Transition in={singleOFFBOARDINGREQUIREMENTSOpenModal} timeout={400}>
      {(state: string) => (
      <Modal
        // keepMounted
        open={!['exited', 'exiting'].includes(state)}
        onClose={() => {
          setSingleOFFBOARDINGREQUIREMENTSOpenModal(false);
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
              ...OFFBOARDINGREQUIREMENTSModalArea,
                opacity: 0,
                transition: `opacity 300ms`,
                ...{
                  entering: { opacity: 1 },
                  entered: { opacity: 1 },
                }[state],
                overflow: 'auto',
            }}
        >
          <OFFBOARDINGREQUIREMENTSModalComponent setSingleOFFBOARDINGREQUIREMENTSDetailsData={setSingleOFFBOARDINGREQUIREMENTSDetailsData} singleOFFBOARDINGREQUIREMENTSDetailsData={singleOFFBOARDINGREQUIREMENTSDetailsData} scroll={scroll} setScroll={setScroll}/>
        </ModalDialog>
      </Modal>
        )}
      </Transition>
    </Fragment>
  );
}


// Styles
const OFFBOARDINGREQUIREMENTSModalArea = {
  height: '120.5mm',
  width: '210mm',
  margin: '0 auto',
  background: 'white',
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
};