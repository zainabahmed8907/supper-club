import { CircularProgress } from "@mui/material";
function Loading() {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center ">
    <CircularProgress
      sx={{
        width: "100%",
        height: "100vh",

        display: "block",
        margin: "auto",
      }}
    />
  </div>
  );
}
export default Loading