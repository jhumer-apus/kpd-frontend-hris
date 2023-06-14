import { Fragment, useState }from 'react';
import { styled } from '@mui/material/styles';
import MuiGrid from '@mui/material/Grid';
import { Divider, Paper, Box, useTheme, useMediaQuery } from '@mui/material';

import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { UploadDTRComponent } from './stepper/upload-dtr-component';


const PaperStyle = {
    padding: "20px",
    height: "500px"
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
  return (
    <Fragment>
        {/* <div style={{height: '200px'}}>haha</div> */}
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
                                <Typography sx={{ mt: 2, mb: 1 }}>
                                    {activeStep=== 0 && 
                                    <div> 
                                        <UploadDTRComponent/>
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
                                </Typography>
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
                                    <Button onClick={handleNext}>
                                    {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
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
                    {content}
                </Paper>
            </Grid>
        </Grid>
    </Fragment>
  );
}