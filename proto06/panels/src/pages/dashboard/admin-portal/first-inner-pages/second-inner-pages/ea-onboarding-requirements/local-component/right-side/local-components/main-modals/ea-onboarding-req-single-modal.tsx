import { Dispatch, SetStateAction, Fragment, useState } from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Transition } from 'react-transition-group';
import { ONBOARDINGREQUIREMENTSViewInterface } from '@/types/types-employee-and-applicants';
import ONBOARDINGREQUIREMENTSModalComponent from './inner-modals/onboarding-req-modal-component';


interface SingleONBOARDINGREQUIREMENTSInterface {
    singleONBOARDINGREQUIREMENTSOpenModal: boolean; 
    setSingleONBOARDINGREQUIREMENTSOpenModal: Dispatch<SetStateAction<boolean>>;
    singleONBOARDINGREQUIREMENTSDetailsData: ONBOARDINGREQUIREMENTSViewInterface;
    setSingleONBOARDINGREQUIREMENTSDetailsData: Dispatch<SetStateAction<ONBOARDINGREQUIREMENTSViewInterface>>;
}

export default function ViewONBOARDINGREQUIREMENTSSingleModal(props: SingleONBOARDINGREQUIREMENTSInterface) {
    const {singleONBOARDINGREQUIREMENTSOpenModal, setSingleONBOARDINGREQUIREMENTSOpenModal, setSingleONBOARDINGREQUIREMENTSDetailsData, singleONBOARDINGREQUIREMENTSDetailsData} = props;
  const [scroll, setScroll] = useState<boolean>(true);
  return (
    <Fragment>
      <Transition in={singleONBOARDINGREQUIREMENTSOpenModal} timeout={400}>
      {(state: string) => (
      <Modal
        keepMounted
        open={!['exited', 'exiting'].includes(state)}
        onClose={() => {
          setSingleONBOARDINGREQUIREMENTSOpenModal(false);
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
              ...ONBOARDINGREQUIREMENTSModalArea,
                opacity: 0,
                transition: `opacity 300ms`,
                ...{
                  entering: { opacity: 1 },
                  entered: { opacity: 1 },
                }[state],
                overflow: 'auto',
            }}
        >
          <ONBOARDINGREQUIREMENTSModalComponent setSingleONBOARDINGREQUIREMENTSDetailsData={setSingleONBOARDINGREQUIREMENTSDetailsData} singleONBOARDINGREQUIREMENTSDetailsData={singleONBOARDINGREQUIREMENTSDetailsData} scroll={scroll} setScroll={setScroll}/>
        </ModalDialog>
      </Modal>
        )}
      </Transition>
    </Fragment>
  );
}


// Styles
const ONBOARDINGREQUIREMENTSModalArea = {
  height: '120.5mm',
  width: '210mm',
  margin: '0 auto',
  background: 'white',
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
};