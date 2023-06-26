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

interface SinglePayslipInterface {
    singlePayslipOpen: boolean; 
    setSinglePayslipOpen: (key: boolean) => void;
}

export default function GeneratePayslipSingle(props: SinglePayslipInterface) {
    const {singlePayslipOpen, setSinglePayslipOpen} = props;
//   const [layout, setLayout] = React.useState<ModalDialogProps['layout'] | undefined>(
//     undefined,
//   );
  const [scroll, setScroll] = React.useState<boolean>(true);
//   const [singlePayslipOpen, setSinglePayslipOpen] = React.useState<boolean>(false);
  return (
    <React.Fragment>
      {/* <Stack direction="row" spacing={1}>
        <Button
          variant="solid"
          color="neutral"
          onClick={() => {
            setLayout('center');
            setOpen(true);
          }}
        >
          Center
        </Button>
        <Button
          variant="solid"
          color="neutral"
          onClick={() => {
            setLayout('fullscreen');
            setOpen(true);
          }}
        >
          Full screen
        </Button>
      </Stack> */}
      {/* <Button
          variant="solid"
          color="neutral"
          onClick={() => {
            setOpen(true);
          }}
        >
          GENERATE PAYSLIP - MULTIPLE
        </Button> */}
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
                opacity: 0,
                transition: `opacity 300ms`,
                ...{
                  entering: { opacity: 1 },
                  entered: { opacity: 1 },
                }[state],
                border: '1px solid red'
            }}
        >
          
          <Typography id="dialog-vertical-scroll-title" component="h2">
            Payslip
            <ModalClose />
          </Typography>
          <FormControl
            orientation="horizontal"
            sx={{ bgcolor: 'background.level3', p: 1, borderRadius: 'sm' }}
          >
            <FormLabel>Print</FormLabel>
            <Switch
              checked={scroll}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setScroll(event.target.checked)
              }
              sx={{ ml: 'auto' }}
            />
          </FormControl>
          <List
            sx={{
            //   overflow: scroll ? 'scroll' : 'initial',
              mx: 'calc(-1 * var(--ModalDialog-padding))',
              px: 'var(--ModalDialog-padding)',
            }}
          >
            <div>asds?</div>
            {/* {[...Array(10)].map((item, index) => {
                return(
                    <React.Fragment>
                        <div>asds?</div>
                        <ListItem key={index}> I&apos;m in a scrollable area. Pneumonoultramicroscopic keke keme keme. Hello all?</ListItem>
                    </React.Fragment>
      
            )})} */}
          </List>
        </ModalDialog>
      </Modal>
        )}
      </Transition>
    </React.Fragment>
  );
}