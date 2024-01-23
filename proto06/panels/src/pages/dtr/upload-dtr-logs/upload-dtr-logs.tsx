import { ChangeEvent, Fragment, SyntheticEvent, useState }from 'react';
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
import axios from 'axios';
import { useNavigate }  from 'react-router-dom';
import { APILink } from '@/store/configureStore';

const PaperStyle = {
    padding: "20px",
    height: "700px",
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
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/home/DTR/View-DTR');
    };

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('xl'));

    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set<number>());

    const isStepOptional = (step: number) => {
        return step === -1;
    };

    const isStepSkipped = (step: number) => {
        return skipped.has(step);
    };

    const handleNext = async (e: SyntheticEvent) => {
        e.preventDefault();
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
        }
        if (activeStep === steps.length - 1){
            if (!file) {
                return;
              }
          
              const formData = new FormData();
              formData.append('file', file);
          
              try {
                const response = await axios.post(
                  `${APILink}upload_dtr_logs/`,
                  formData,
                  {
                    headers: {
                      'Content-Type': 'multipart/form-data',
                    },
                  }
                );
                // setActiveStep((prevActiveStep) => prevActiveStep + 1);
                if(response.status >= 200){
                    window.alert(`Request Successful`);
                    setTimeout(()=> {
                        window.location.reload();
                    }, 500)
                }
              } catch (err) {
                console.error(err);
                window.alert(`DTR Logs Error in Upload ${err}`);
                setActiveStep((prevActiveStep) => prevActiveStep - 2);
              }
        }else {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
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
          const bio_id = values[0].trim();
          const date_time = values[1].trim();
          const time_in = values[2].trim();
          const time_out = values[3].trim();
          const branch = values[6].trim();
          return { id: `${bio_id}${Math.random()}`, bio_id, date_time, time_in, time_out, branch};
      });
        setCsvData(records);
      };
      reader.readAsText(file);
    };
    const [file, setFile] = useState<File | null>(null);

    const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFile(event.target.files ? event.target.files[0] : null);
    };

  return (
    <Fragment>
        <form>
        <Grid container direction={matches ? 'column' : 'row'} spacing={2}>
            <Grid item xs>
                <Paper elevation={3} style={PaperStyle}>
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
                                <Typography sx={{ mt: 2, mb: 1 , textAlign: 'center', display: 'flex', flexDirection: 'column'}}>
                                    All steps completed - you&apos;re finished!!
                                    <Button onClick={handleNavigate}>View Uploaded DTR Logs</Button>
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
                                        <UploadDTRComponent 
                                            handleFileUpload={handleFileUpload}
                                            onFileChange={onFileChange}
                                        />
                                    </div>
                                    }
                                    {activeStep=== 1 && 
                                    <div> 
                                        <ul className='text-center'>
                                            <li>
                                                Preview the <b>result</b> before submitting.
                                            </li>
                                            <li>
                                                Make sure the entries' result mirrors exactly.
                                            </li>
                                            <li>
                                                Check the dates, logs, and make sure that
                                            </li>
                                            <li>
                                                there are no immediate discrepancies. <br></br>
                                            </li>
                                        </ul>
                                        
                                    </div>
                                    }
                                    {activeStep=== 2 && 
                                    <div> 
                                        <ul className='text-center'>
                                            <li>
                                                Click <b style={{color: 'rgb(14, 165, 233)'}}>submit</b> to proceed.
                                            </li>
                                            <li>
                                                Otherwise, <b style={{color: 'rgb(14, 165, 233)'}}>back</b> to rescind.
                                            </li>
                                        </ul>
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
                                    <Button onClick={handleNext}>
                                    {activeStep === steps.length - 1 ? 'Submit' : activeStep === 0 ? 'Preview' : 'Next'}
                                    </Button>
                                </Box>
                                </Fragment>
                            )}
                    </Box>
                </Paper>
            </Grid>
            <Grid item xs>
                <Paper elevation={3} style={PaperStyle}>
                    <PreviewDtr csvData={csvData} fileName={fileName}/>
                </Paper>
            </Grid>
        </Grid>
        </form>

    </Fragment>
  );
}