import { ChangeEvent, Fragment, useState }from 'react';
import { styled } from '@mui/material/styles';
import MuiGrid from '@mui/material/Grid';
import { Divider, Paper, Box, useTheme, useMediaQuery } from '@mui/material';

import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { UploadDTRComponent } from './local-components/upload-dtr-component';
import PreviewDtr from './local-components/preview-dtr-component';
import { previewDtrCsvItem } from '@/types/types-pages';

const PaperStyle = {
    padding: "20px",
    height: "500px",
    overflow: 'auto'
}

const steps = [
    'Upload',
    'Preview',
    'Submit',
];
const Grid = styled(MuiGrid)(({ theme }) => ({
    width: '100%',
    height: "100%",
    ...theme.typography.body2,
    '& [role="separator"]': {
      margin: theme.spacing(0, 2),
    },
}));

export default function UploadDtrLogs() {
    const content = (
        <div>
            {`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id dignissim justo.
        Nulla ut facilisis ligula. Interdum et malesuada fames ac ante ipsum primis in faucibus.
        Sed malesuada lobortis pretium. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id dignissim justo.
        Nulla ut facilisis ligula. Interdum et malesuada fames ac ante ipsum primis in faucibus.
        Sed malesuada lobortis pretium. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id dignissim justo.
        Nulla ut facilisis ligula. Interdum et malesuada fames ac ante ipsum primis in faucibus.
        Sed malesuada lobortis pretium.`}
        </div>
    );
      const theme = useTheme();
      const matches = useMediaQuery(theme.breakpoints.down('lg'));

    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set<number>());

    const isStepOptional = (step: number) => {
        return step === -1;
    };

    const isStepSkipped = (step: number) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
        // You probably want to guard against something like this,
        // it should never occur unless someone's actively trying to break something.
        throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
        const newSkipped = new Set(prevSkipped.values());
        newSkipped.add(activeStep);
        return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const [csvData, setCsvData] = useState<previewDtrCsvItem[]>([]);
    const [fileName, setFileName] = useState("");
    const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) {
        return;
      }
      const file = e.target.files[0];
      const { name } = file;
      setFileName(name);
    
      const reader = new FileReader();
      reader.onload = (evt) => {
        if (!evt?.target?.result) {
          return;
        }
        const { result } = evt.target;
        const lines = (result as string).split('\n').filter(line => line.trim() !== '');
      //   const records = lines.map(line => {
      //     const [id, value] = line.split(',');
      //     return { id: id.trim(), value: value.trim() };
      //   });
      const records = lines.map(line => {
          const values = line.split('\t');
          const emp_no = values[0].trim();
          const date_time = values[1].trim();
          const time_in = values[2].trim();
          const time_out = values[3].trim();
          const branch = values[6].trim();
          return { id: emp_no, emp_no, date_time, time_in, time_out, branch};
      });
        setCsvData(records);
      };
      reader.readAsText(file);
    };

  return (
    <Fragment>
        {/* <div style={{height: '200px'}}>haha</div> */}
        <form>
        <Grid container direction={matches ? 'column' : 'row'} spacing={2}>
            <Grid item xs>
                <Paper elevation={3} style={PaperStyle}>
                    {/* {content} */}
                    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <Stepper activeStep={activeStep}>
                            {steps.map((label, index) => {
                            const stepProps: { completed?: boolean } = {};
                            const labelProps: {
                                optional?: React.ReactNode;
                            } = {};
                            if (isStepOptional(index)) {
                                labelProps.optional = (
                                <Typography variant="caption">Optional</Typography>
                                );
                            }
                            if (isStepSkipped(index)) {
                                stepProps.completed = false;
                            }
                            return (
                                <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                                </Step>
                            );
                            })}
                        </Stepper>
                            {activeStep === steps.length ? (
                                <Fragment>
                                <Typography sx={{ mt: 2, mb: 1 }}>
                                    All steps completed - you&apos;re finished
                                </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                    <Box sx={{ flex: '1 1 auto' }} />
                                    <Button onClick={handleReset}>Back to Upload</Button>
                                </Box>
                                </Fragment>
                            ) : (
                                <Fragment>
                                <div className={"mt-2 mb-1"}>
                                    {activeStep=== 0 && 
                                    <div className="flex justify-center"> 
                                        <UploadDTRComponent handleFileUpload={handleFileUpload}/>
                                    </div>
                                    }
                                    {activeStep=== 1 && 
                                    <div> 
                                        File Instruction Preview, and Notes
                                    </div>
                                    }
                                    {activeStep=== 2 && 
                                    <div> 
                                        Oka?
                                    </div>
                                    }
                                </div>
                                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                    <Button
                                    color="inherit"
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    sx={{ mr: 1 }}
                                    >
                                    Back
                                    </Button>
                                    <Box sx={{ flex: '1 1 auto' }} />
                                    {isStepOptional(activeStep) && (
                                    <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                                        Skip
                                    </Button>
                                    )}
                                    <Button onClick={handleNext} >
                                    {activeStep === steps.length - 1 ? 'Submit' : activeStep === 0 ? 'Preview' : 'Next'}
                                    </Button>
                                </Box>
                                </Fragment>
                            )}
                    </Box>
                </Paper>
            </Grid>
            <Divider orientation="vertical" flexItem>
                Preview &gt;&gt;
            </Divider>
            <Grid item xs>
                <Paper elevation={3} style={PaperStyle}>
                    {/* {content}sds */}
                    <PreviewDtr csvData={csvData} fileName={fileName}/>
                </Paper>
            </Grid>
        </Grid>
        </form>

    </Fragment>
  );
}