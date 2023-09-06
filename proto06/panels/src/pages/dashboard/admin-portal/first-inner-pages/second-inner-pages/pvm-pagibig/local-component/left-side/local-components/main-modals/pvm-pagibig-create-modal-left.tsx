import { Dispatch, SetStateAction, Fragment, useState } from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Transition } from 'react-transition-group';
import { PAGIBIGCreateInterface } from '@/types/types-payroll-variables';
import PAGIBIGModalComponent from './inner-modals/pagibig-modal-component-left';


interface CreatePAGIBIGInterface {
    createPAGIBIGOpenModal: boolean; 
    setCreatePAGIBIGOpenModal: Dispatch<SetStateAction<boolean>>;
    createPAGIBIGDetailsData: PAGIBIGCreateInterface;
    setCreatePAGIBIGDetailsData: Dispatch<SetStateAction<PAGIBIGCreateInterface>>;
}

export default function DeductionsPAGIBIGCreateModal(props: CreatePAGIBIGInterface) {
    const {createPAGIBIGOpenModal, setCreatePAGIBIGOpenModal, setCreatePAGIBIGDetailsData, createPAGIBIGDetailsData} = props;
  return (
    <Fragment>
      <Transition in={createPAGIBIGOpenModal} timeout={400}>
      {(state: string) => (
      <Modal
        keepMounted
        open={!['exited', 'exiting'].includes(state)}
        onClose={() => {
          setCreatePAGIBIGOpenModal(false);
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
              ...PAGIBIGModalArea,
                opacity: 0,
                transition: `opacity 300ms`,
                ...{
                  entering: { opacity: 1 },
                  entered: { opacity: 1 },
                }[state],
                overflow: 'auto',
            }}
        >
          <PAGIBIGModalComponent setCreatePAGIBIGDetailsData={setCreatePAGIBIGDetailsData} createPAGIBIGDetailsData={createPAGIBIGDetailsData}/>
        </ModalDialog>
      </Modal>
        )}
      </Transition>
    </Fragment>
  );
}


// Styles
const PAGIBIGModalArea = {
  height: '158.5mm',
  width: '210mm',
  margin: '0 auto',
  background: 'white',
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
};