export const modalStyle = {
  position: "absolute",
  top: "80%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  borderRadius: 5,

  "@media screen and (min-width:1460px)": {
    top: "60%",

    width: "34.6rem",
    "&::-webkit-scrollbar": {
      width: "12px",
    },
  },
  "@media screen and (max-width:1280px)": {
    top: "60%",
    paddingBottom: "2%",
    maxHeight: "550px",
    overflowY: "scroll",
    left: "50%",
    width: "29.6rem",
    "&::-webkit-scrollbar": {
      width: "12px",
    },
  },
 
  
  "@media screen and (max-width:920px)": {
    top: "90%",
    paddingBottom: "2%",
    maxHeight: "800px",
    overflowY: "scroll",
    left: "45%",
    width: "29.6rem",
    "&::-webkit-scrollbar": {
      width: "12px",
    },
  },
  "@media screen and (max-width:620px)": {
    top: "90%",
    paddingBottom: "2%",
    maxHeight: "500px",
    overflowY: "scroll",
    left: "50%",
    width: "24.6rem",
    "&::-webkit-scrollbar": {
      width: "7px",
    },
  },

  "@media screen and (min-width:1620px)": {
    top: "60%",
    paddingBottom: "2%",
    maxHeight: "800px",
    overflowY: "scroll",
    width: "40.6rem",
    "&::-webkit-scrollbar": {
      width: "12px",
    },
  },
};
export const errorPill = {
  background:
    "linear-gradient(0deg, rgba(195, 157, 99, 0.05) 0%, rgba(195, 157, 99, 0.05) 100%), #FFF",
  padding: "1rem",
  borderRadius: "12px",
};

