import * as React from 'react';
import Button from '@mui/joy/Button';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Switch from '@mui/joy/Switch';
import Modal from '@mui/joy/Modal';
import ModalDialog, { ModalDialogProps } from '@mui/joy/ModalDialog';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import { Transition } from 'react-transition-group';
import { ViewPayrollPayPerEmployee } from '@/types/types-pages';
import { GridRowParams } from '@mui/x-data-grid';
import SinglePayslip from './payslips/single-payslip';

interface SinglePayslipInterface {
    singlePayslipOpen: boolean; 
    setSinglePayslipOpen: (key: boolean) => void;
    singlePayslipData: GridRowParams<ViewPayrollPayPerEmployee> | null;
}

export default function GeneratePayslipSingle(props: SinglePayslipInterface) {
    const {singlePayslipOpen, setSinglePayslipOpen, singlePayslipData} = props;
  const [scroll, setScroll] = React.useState<boolean>(true);
  return (
    <React.Fragment>
      <Transition in={singlePayslipOpen} timeout={400}>
      {(state: string) => (
      <Modal
        keepMounted
        open={!['exited', 'exiting'].includes(state)}
        onClose={() => {
            setSinglePayslipOpen(false);
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
              ...paySlipArea,
                opacity: 0,
                transition: `opacity 300ms`,
                ...{
                  entering: { opacity: 1 },
                  entered: { opacity: 1 },
                }[state],
                border: '1px solid red'
            }}
        >
          <SinglePayslip scroll={scroll} setScroll={setScroll}/>
        </ModalDialog>
      </Modal>
        )}
      </Transition>
    </React.Fragment>
  );
}


// Styles
const paySlipArea = {
  height: '148.5mm',
  width: '210mm',
  margin: '0 auto',
  background: 'white',
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
};