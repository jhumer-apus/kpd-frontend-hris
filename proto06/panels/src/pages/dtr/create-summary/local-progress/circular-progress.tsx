
import * as React from 'react';
import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number },
) {
  return (
    <>
    <Box sx={{ position: 'relative', display: 'inline-flex', marginRight: '30px', opacity: props.value=== 0 ? 0 : 1, transition: 'opacity 500ms ease'  }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
    <span style={{textAlign: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column', padding: '10px', opacity: props.value=== 100 ? 1 : 0, transition: 'opacity 500ms ease'}}>Summarize done!</span>
    </>

  );
}

export default function CircularStatic() {
    const progress = useSelector ((state: RootState)=> state?.dtr?.summarizeCutoffListAndEmployee?.progress);
    // const [progress, setProgress] = React.useState(10);


    // React.useEffect(() => {
    //     const timer = setInterval(() => {
    //     setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
    //     }, 800);
    //     return () => {
    //     clearInterval(timer);
    //     };
    // }, []);

    return <CircularProgressWithLabel value={progress} />;
}