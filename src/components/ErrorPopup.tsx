import React, { useEffect, useState } from "react";
import { Snackbar, Alert } from "@mui/material";

interface ErrorPopupProps {
  error: any;
  autoHideDuration?: number;
}

const ErrorPopup: React.FC<ErrorPopupProps> = ({ error, autoHideDuration = 6000 }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (error) {
      setOpen(true);
    }
  }, [error]);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
        {error}
      </Alert>
    </Snackbar>
  );
};

export default ErrorPopup;