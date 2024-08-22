// src/customTheme.ts

import { createTheme } from '@mui/material/styles';

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#ff69b4",
      dark: "#053e85",
    },
  },
});

export const myCustomColor = {
    main: "ff69b4"
}

export default customTheme;