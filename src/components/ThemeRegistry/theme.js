import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#C39D63",
      contrastText: "#fff",
    },
    success: {
      main: "#2BAE68",
    },
    warning: {
      main: "#FFBB00",
    },
    error: {
      main: "#D61C2A",
    },
    text: {
      primary: "#444237",
      secondary: "#7E7E7E",
    },
  },
  components: {
    // Name of the component
    MuiButton: {
      defaultProps: {
        // disableElevation: true
      },
      styleOverrides: {
        root: {
          // Some CSS
          borderRadius: 20,
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        underline: {
          "&:before": {
            borderBottom: "none",
          },
          "&:after": {
            borderBottom: "none",
          },
          "&:hover": {
            borderBottom: "none",
          },
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        width: "200px",
     
       
        option: {
          padding: "20px !important",
          margin: "10px",
          fontSize:"14px",
          fontWeight:"bold",
          '&[aria-selected="true"]': {
            backgroundColor: "#FCFAF7",
            padding: "20px",
          },

          "&:hover": {
            backgroundColor: "#FCFAF7",
            padding: "20px",

          },
        },
      },
    },
  },
});
