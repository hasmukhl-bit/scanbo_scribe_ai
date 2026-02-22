"use client";

import * as React from "react";
import styled from "@emotion/styled";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 16,
    border: `1px solid ${alpha(theme.palette.text.primary, 0.1)}`,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[3]
  }
}));

const IconBadge = styled(Box)(({ theme }) => ({
  width: 48,
  height: 48,
  borderRadius: 14,
  display: "grid",
  placeItems: "center",
  background: `linear-gradient(135deg, ${alpha(
    theme.palette.primary.main,
    0.18
  )}, ${alpha(theme.palette.secondary.main, 0.18)})`,
  color: theme.palette.primary.main,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`
}));

const ActionButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  fontWeight: 600,
  borderRadius: 12,
  padding: theme.spacing(1, 2.5)
}));

type ConfirmDialogProps = {
  open: boolean;
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmDialog({
  open,
  title = "Confirm action",
  description = "Are you sure you want to continue?",
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel
}: ConfirmDialogProps) {
  return (
    <StyledDialog open={open} onClose={onCancel} maxWidth="xs" fullWidth disableScrollLock>
      <DialogTitle sx={{ paddingTop: 3, paddingBottom: 1 }}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <IconBadge>
            <AutoAwesomeOutlinedIcon fontSize="small" />
          </IconBadge>
          <Stack spacing={0.2} alignItems="flex-start">
            <Typography variant="subtitle1" fontWeight={700}>
              {title}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Please confirm to continue
            </Typography>
          </Stack>
        </Stack>
      </DialogTitle>
      <DialogContent sx={{ textAlign: "left", paddingTop: 0 }}>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ padding: 2, justifyContent: "flex-end", gap: 1 }}>
        <ActionButton onClick={onCancel} variant="outlined">
          {cancelLabel}
        </ActionButton>
        <ActionButton onClick={onConfirm} variant="contained">
          {confirmLabel}
        </ActionButton>
      </DialogActions>
    </StyledDialog>
  );
}
