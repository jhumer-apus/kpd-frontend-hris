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

import MultiplePayslip from './payslips/multiple-payslip';

export default function GeneratePayslipMultiple() {
  const [scroll, setScroll] = React.useState<boolean>(true);
  const [open, setOpen] = React.useState<boolean>(false);
  return (
    <React.Fragment>
      <Button
          variant="solid"
          color="neutral"
          onClick={() => {
            setOpen(true);
          }}
        >
          GENERATE PAYSLIP - MULTIPLE
      </Button>
      <Transition in={open} timeout={400}>
      {(state: string) => (
      <Modal
        keepMounted
        open={!['exited', 'exiting'].includes(state)}
        onClose={() => {
            setOpen(false);
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
            layout={'fullscreen'}
            sx={{
                opacity: 0,
                transition: `opacity 300ms`,
                ...{
                  entering: { opacity: 1 },
                  entered: { opacity: 1 },
                }[state],
                // border: '1px solid red'
            }}
        >
          <MultiplePayslip/>
        </ModalDialog>
      </Modal>
        )}
      </Transition>
    </React.Fragment>
  );
}