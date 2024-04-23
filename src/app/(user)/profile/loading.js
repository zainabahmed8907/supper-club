import { CircularProgress, } from "@mui/material";
function Loading() {
  return (
    <CircularProgress
      sx={{
        width: "100%",

        display: "block",
        margin: "auto",
      }}
    />
  );
}
export default Loading