import { Dispatch, SetStateAction, Fragment, useState } from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Transition } from 'react-transition-group';
import { SSSCreateInterface } from '@/types/types-payroll-variables';
import SSSModalComponent from './inner-modals/sss-modal-component-left';


interface CreateSSSInterface {
    createSSSOpenModal: boolean; 
    setCreateSSSOpenModal: Dispatch<SetStateAction<boolean>>;
    createSSSDetailsData: SSSCreateInterface;
    setCreateSSSDetailsData: Dispatch<SetStateAction<SSSCreateInterface>>;
}

export default function DeductionsSSSCreateModal(props: CreateSSSInterface) {
    const {createSSSOpenModal, setCreateSSSOpenModal, setCreateSSSDetailsData, createSSSDetailsData} = props;
  return (
    <Fragment>
      <Transition in={createSSSOpenModal} timeout={400}>
      {(state: string) => (
      <Modal
        keepMounted
        open={!['exited', 'exiting'].includes(state)}
        onClose={() => {
          setCreateSSSOpenModal(false);
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
              ...SSSModalArea,
                opacity: 0,
                transition: `opacity 300ms`,
                ...{
                  entering: { opacity: 1 },
                  entered: { opacity: 1 },
                }[state],
                overflow: 'auto',
            }}
        >
          <SSSModalComponent setCreateSSSDetailsData={setCreateSSSDetailsData} createSSSDetailsData={createSSSDetailsData}/>
        </ModalDialog>
      </Modal>
        )}
      </Transition>
    </Fragment>
  );
}


// Styles
const SSSModalArea = {
  height: '128.5mm',
  width: '210mm',
  margin: '0 auto',
  background: 'white',
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
};