import { CircularProgress } from "@mui/material";

export default function LoadingPage() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "grid",
        placeItems: "center",
      }}
    >
      <CircularProgress size="large" />
    </div>
  );
}
