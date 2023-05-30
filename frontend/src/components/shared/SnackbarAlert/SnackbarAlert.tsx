import React from "react";
import { Alert, Snackbar, Typography } from "@mui/material";
import { ErrorsList, ErrorItem } from "./SnackbarAlert.styled";

export const SnackbarAlert = ({
  isSnackbarVisible,
  onClose,
  errorMessage,
}: OwnProps) => {
  return (
    <Snackbar
      open={isSnackbarVisible}
      autoHideDuration={6000}
      onClose={onClose}
    >
      <Alert severity="error" onClose={onClose}>
        {Array.isArray(errorMessage) ? (
          <>
            <Typography variant="body2" sx={{ marginBottom: "10px" }}>
              There are some issues. Let's check below list:
            </Typography>
            <ErrorsList>
              {errorMessage.map((singleMessage: string) => (
                <ErrorItem key={singleMessage}>
                  <Typography variant="body2">{singleMessage}</Typography>
                </ErrorItem>
              ))}
            </ErrorsList>
          </>
        ) : (
          errorMessage
        )}
      </Alert>
    </Snackbar>
  );
};

interface OwnProps {
  isSnackbarVisible: boolean;
  onClose: () => void;
  errorMessage: string | string[] | null;
}
