import { CircularProgress } from "@mui/material";

export default function LoadingPage() {
  return (
    <div
      style={{
        display: "grid",
        placeItems: "center",
      }}
    >
      <CircularProgress size="5rem" color="primary" />
    </div>
  );
}
