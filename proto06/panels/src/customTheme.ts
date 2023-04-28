// src/customTheme.ts

import { createTheme } from '@mui/material/styles';

const customTheme = createTheme({
  palette: {
    // "myCustomColor": {
    //   main: '#ff69b4', // pink color
    // },
  },
});

export const myCustomColor = {
    main: "ff69b4"
}

export default myCustomColor;