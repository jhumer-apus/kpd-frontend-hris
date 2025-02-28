import * as React from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Transition } from 'react-transition-group';
import { OVERTIMEViewInterface, ViewPayrollPayPerEmployee } from '@/types/types-pages';
import OVERTIMEModalComponent from './inner-modals/overtime-modal-component';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { HandleModalAction } from '@/store/actions/components';
import { IconButton } from '@mui/material';
import { XMarkIcon } from '@heroicons/react/24/solid';


interface ViewOVERTIMESingleModalInterface {
    singleOVERTIMEOpenModal: boolean; 
    setSingleOVERTIMEOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    singleOVERTIMEDetailsData: OVERTIMEViewInterface;
    setSingleOVERTIMEDetailsData: React.Dispatch<React.SetStateAction<OVERTIMEViewInterface>>;
}

export default function ViewOVERTIMESingleModal(props: ViewOVERTIMESingleModalInterface) {
  const {singleOVERTIMEOpenModal, setSingleOVERTIMEOpenModal, setSingleOVERTIMEDetailsData, singleOVERTIMEDetailsData} = props;
  const [scroll, setScroll] = React.useState<boolean>(true);
  
  const viewOtModal = useSelector((state:RootState) => state.component.viewOtModal);
  const dispatch = useDispatch()
  
  return (
    <React.Fragment>
      <Transition in={viewOtModal} timeout={400}>
      {(state: string) => (
      <Modal
        open={!['exited', 'exiting'].includes(state)}
        onClose={() => {
          dispatch(HandleModalAction({
            name: "viewOtModal",
            value: false
          }))
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
              ...overtimeModalArea,
                opacity: 0,
                transition: `opacity 300ms`,
                ...{
                  entering: { opacity: 1 },
                  entered: { opacity: 1 },
                }[state],
                overflow: 'auto',
            }}
        >
          <OVERTIMEModalComponent setSingleOVERTIMEDetailsData={setSingleOVERTIMEDetailsData} singleOVERTIMEDetailsData={singleOVERTIMEDetailsData} scroll={scroll} setScroll={setScroll}/>
        </ModalDialog>
      </Modal>
        )}
      </Transition>
    </React.Fragment>
  );
}


// Styles
const overtimeModalArea = {
  height: '188.5mm',
  width: '210mm',
  margin: '0 auto',
  background: 'white',
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
};