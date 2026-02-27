"use client";

import * as React from "react";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  IconButton,
  Stack,
  Typography,
  type DialogProps
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

/**
 * AppDialog — the single dialog / modal primitive for the entire Scanbo Scribe AI app.
 *
 * ─── HEADER ──────────────────────────────────────────────────────────────────
 *  icon        — ReactNode rendered inside a themed gradient badge (top-left of header)
 *  iconColor   — controls the badge gradient: "primary" | "secondary" | "success" |
 *                "warning" | "error" | "info"  (default: "primary")
 *  title       — bold heading text
 *  subtitle    — secondary line beneath the title
 *  hideClose   — hides the × close button (use when close must be via an action)
 *
 * ─── STEPS (optional) ────────────────────────────────────────────────────────
 *  steps       — array of { label, status } objects rendered as progress pills
 *                status: "active" | "completed" | "pending"
 *                e.g. [{ label: "1. Select Patient", status: "completed" },
 *                      { label: "2. Choose Mode",   status: "active"    }]
 *
 * ─── BODY ────────────────────────────────────────────────────────────────────
 *  children    — the dialog body content
 *  noPadding   — removes default px/py padding from the body (useful when content
 *                has its own full-bleed sections, e.g. patient lists, forms)
 *
 * ─── FOOTER (optional) ───────────────────────────────────────────────────────
 *  actions     — ReactNode rendered inside a sticky footer with a top Divider.
 *                Typically a row of <AppButton> elements.
 *                Use justify="between" (default) or "end" / "center" to align them.
 *  actionsAlign — "between" | "end" | "center"  (default: "between")
 *
 * ─── SIZE & BEHAVIOUR ────────────────────────────────────────────────────────
 *  maxWidth    — "xs" | "sm" | "md" | "lg" | "xl"  (default: "sm")
 *  fullWidth   — stretches to maxWidth (default: true)
 *  disableClose — prevents backdrop-click and Escape from closing (hideClose
 *                 is automatically set to true when disableClose is true)
 *
 * ─── USAGE EXAMPLES ──────────────────────────────────────────────────────────
 *
 *  // 1 — Simple confirmation dialog
 *  <AppDialog
 *    open={open}
 *    onClose={handleClose}
 *    title="Delete Recording"
 *    subtitle="This action cannot be undone."
 *    icon={<DeleteRoundedIcon fontSize="small" />}
 *    iconColor="error"
 *    actions={
 *      <>
 *        <AppButton intent="neutral" onClick={handleClose}>Cancel</AppButton>
 *        <AppButton intent="danger"  onClick={handleDelete}>Delete</AppButton>
 *      </>
 *    }
 *  >
 *    <Typography>Are you sure you want to delete this recording?</Typography>
 *  </AppDialog>
 *
 *  // 2 — Multi-step wizard with step pills
 *  <AppDialog
 *    open={open}
 *    onClose={handleClose}
 *    title="Start Scribe"
 *    subtitle="Choose how to capture this consultation"
 *    icon={<TuneRoundedIcon fontSize="small" />}
 *    steps={[
 *      { label: "1. Select Patient", status: "completed" },
 *      { label: "2. Choose Mode",   status: "active"    },
 *    ]}
 *    noPadding
 *    actionsAlign="between"
 *    actions={
 *      <>
 *        <AppButton intent="neutral" onClick={goBack}>Back</AppButton>
 *        <AppButton intent="primary" onClick={goNext}>Continue</AppButton>
 *      </>
 *    }
 *  >
 *    {/* custom body content *\/}
 *  </AppDialog>
 *
 *  // 3 — Informational / non-closeable dialog
 *  <AppDialog
 *    open={processing}
 *    onClose={() => {}}
 *    disableClose
 *    title="Processing..."
 *    subtitle="Please wait while we set up your workspace."
 *    icon={<AutoAwesomeRoundedIcon fontSize="small" />}
 *  >
 *    <CircularProgress />
 *  </AppDialog>
 */

/* ─── Types ─────────────────────────────────────────────────────────────────── */

export type AppDialogStepStatus = "pending" | "active" | "completed";

export type AppDialogStep = {
  label: string;
  status: AppDialogStepStatus;
};

export type AppDialogIconColor =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "info";

export type AppDialogActionsAlign = "between" | "end" | "center";

export type AppDialogProps = {
  /** Whether the dialog is open */
  open: boolean;
  /** Called when the dialog requests to be closed */
  onClose: () => void;
  /** Bold heading shown in the header */
  title: string;
  /** Secondary line beneath the title */
  subtitle?: string;
  /** Icon rendered inside the gradient badge on the left of the header */
  icon?: React.ReactNode;
  /**
   * Color variant for the header icon badge.
   * @default "primary"
   */
  iconColor?: AppDialogIconColor;
  /**
   * Optional step progress pills shown below the header text.
   * Each step has a label and a status: "pending" | "active" | "completed".
   */
  steps?: AppDialogStep[];
  /** Dialog body content */
  children?: React.ReactNode;
  /**
   * Removes default horizontal + vertical padding from the body area.
   * Use when your body content has its own full-bleed sections (lists, forms, etc.).
   * @default false
   */
  noPadding?: boolean;
  /**
   * ReactNode rendered inside the sticky footer (above the Divider).
   * Typically a row of AppButton components.
   */
  actions?: React.ReactNode;
  /**
   * Controls how footer actions are aligned.
   * @default "between"
   */
  actionsAlign?: AppDialogActionsAlign;
  /**
   * Hides the × close button in the header.
   * Automatically applied when disableClose is true.
   */
  hideClose?: boolean;
  /**
   * Prevents the user from closing the dialog via backdrop-click or Escape.
   * Also hides the close button.
   */
  disableClose?: boolean;
  /** MUI Dialog maxWidth prop. @default "sm" */
  maxWidth?: DialogProps["maxWidth"];
  /** Stretches the dialog to maxWidth. @default true */
  fullWidth?: boolean;
};

/* ─── Icon badge gradient map ─────────────────────────────────────────────── */

const BADGE_GRADIENT: Record<AppDialogIconColor, string> = {
  primary:   "linear-gradient(135deg, #1172BA 0%, #0A5E9D 100%)",
  secondary: "linear-gradient(135deg, #0B84D0 0%, #0A5E9D 100%)",
  success:   "linear-gradient(135deg, #2FA77A 0%, #1E7A57 100%)",
  warning:   "linear-gradient(135deg, #F3C44E 0%, #C9931E 100%)",
  error:     "linear-gradient(135deg, #E77B7B 0%, #C45757 100%)",
  info:      "linear-gradient(135deg, #2C8AD3 0%, #1B6DA8 100%)"
};

const BADGE_SHADOW: Record<AppDialogIconColor, string> = {
  primary:   "rgba(17, 114, 186, 0.38)",
  secondary: "rgba(11, 132, 208, 0.38)",
  success:   "rgba(47, 167, 122, 0.38)",
  warning:   "rgba(243, 196, 78,  0.38)",
  error:     "rgba(231, 123, 123, 0.38)",
  info:      "rgba(44, 138, 211,  0.38)"
};

/* ─── Sub-component: StepPills ────────────────────────────────────────────── */

function StepPills({ steps }: { steps: AppDialogStep[] }) {
  return (
    <Stack direction="row" spacing={0.75} alignItems="center" sx={{ mt: 2 }}>
      {steps.map((step, idx) => {
        const isActive    = step.status === "active";
        const isCompleted = step.status === "completed";
        return (
          <React.Fragment key={step.label}>
            <Box
              sx={{
                px: 1.25,
                py: 0.4,
                borderRadius: 999,
                fontSize: "0.72rem",
                fontWeight: 700,
                lineHeight: 1.5,
                display: "flex",
                alignItems: "center",
                gap: 0.4,
                transition: "all 0.2s ease",
                color: (theme) =>
                  isCompleted
                    ? theme.palette.primary.dark
                    : isActive
                      ? "#fff"
                      : theme.palette.text.secondary,
                backgroundColor: (theme) =>
                  isCompleted
                    ? alpha(theme.palette.primary.main, 0.14)
                    : isActive
                      ? theme.palette.primary.main
                      : alpha(theme.palette.text.secondary, 0.12),
                border: (theme) =>
                  isCompleted
                    ? `1px solid ${alpha(theme.palette.primary.main, 0.3)}`
                    : "none"
              }}
            >
              {isCompleted && <CheckCircleRoundedIcon sx={{ fontSize: 11 }} />}
              {step.label}
            </Box>
            {/* Connector between pills */}
            {idx < steps.length - 1 && (
              <Box
                sx={{
                  width: 24,
                  height: 2,
                  borderRadius: 999,
                  flexShrink: 0,
                  backgroundColor: (theme) =>
                    steps[idx + 1]?.status !== "pending"
                      ? alpha(theme.palette.primary.main, 0.4)
                      : alpha(theme.palette.text.secondary, 0.18),
                  transition: "background-color 0.2s ease"
                }}
              />
            )}
          </React.Fragment>
        );
      })}
    </Stack>
  );
}

/* ─── AppDialog component ─────────────────────────────────────────────────── */

export default function AppDialog({
  open,
  onClose,
  title,
  subtitle,
  icon,
  iconColor = "primary",
  steps,
  children,
  noPadding = false,
  actions,
  actionsAlign = "between",
  hideClose = false,
  disableClose = false,
  maxWidth = "sm",
  fullWidth = true
}: AppDialogProps) {
  const showClose = !hideClose && !disableClose;

  const justifyContent: Record<AppDialogActionsAlign, string> = {
    between: "space-between",
    end:     "flex-end",
    center:  "center"
  };

  return (
    <Dialog
      open={open}
      onClose={disableClose ? undefined : onClose}
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      disableEscapeKeyDown={disableClose}
      PaperProps={{
        sx: {
          borderRadius: 3,
          overflow: "hidden",
          border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.18)}`,
          boxShadow: "0 20px 60px rgba(17, 114, 186, 0.18)"
        }
      }}
    >
      <DialogContent sx={{ p: 0 }}>
        <Stack>

          {/* ── HEADER ─────────────────────────────────────────────────── */}
          <Box
            sx={{
              px: { xs: 2.5, sm: 3 },
              pt: { xs: 2, sm: 2.5 },
              pb: 2,
              background: (theme) =>
                `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.light} 100%)`,
              borderBottom: (theme) =>
                `1px solid ${alpha(theme.palette.primary.main, 0.15)}`
            }}
          >
            <Stack direction="row" alignItems="flex-start" justifyContent="space-between">
              <Stack direction="row" spacing={1.5} alignItems="center">

                {/* Icon badge — only rendered when an icon is provided */}
                {icon && (
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: 2.5,
                      flexShrink: 0,
                      display: "grid",
                      placeItems: "center",
                      background: BADGE_GRADIENT[iconColor],
                      color: iconColor === "warning" ? "#111" : "#fff",
                      boxShadow: `0 4px 12px ${BADGE_SHADOW[iconColor]}`
                    }}
                  >
                    {icon}
                  </Box>
                )}

                {/* Title + subtitle */}
                <Box>
                  <Typography
                    variant="h5"
                    fontWeight={700}
                    color="text.primary"
                    lineHeight={1.2}
                  >
                    {title}
                  </Typography>
                  {subtitle && (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 0.25 }}
                    >
                      {subtitle}
                    </Typography>
                  )}
                </Box>
              </Stack>

              {/* Close button */}
              {showClose && (
                <IconButton
                  size="small"
                  onClick={onClose}
                  aria-label="Close dialog"
                  sx={{
                    mt: 0.25,
                    color: "text.secondary",
                    border: (theme) =>
                      `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                    "&:hover": {
                      backgroundColor: (theme) =>
                        alpha(theme.palette.primary.main, 0.1),
                      color: "primary.main"
                    }
                  }}
                >
                  <CloseRoundedIcon fontSize="small" />
                </IconButton>
              )}
            </Stack>

            {/* Step progress pills */}
            {steps && steps.length > 0 && <StepPills steps={steps} />}
          </Box>

          {/* ── BODY ───────────────────────────────────────────────────── */}
          {children && (
            <Box sx={noPadding ? undefined : { px: { xs: 2.5, sm: 3 }, py: 2.5 }}>
              {children}
            </Box>
          )}

          {/* ── FOOTER ─────────────────────────────────────────────────── */}
          {actions && (
            <>
              <Divider />
              <DialogActions
                sx={{
                  px: { xs: 2.5, sm: 3 },
                  py: 1.5,
                  justifyContent: justifyContent[actionsAlign],
                  gap: 1.25
                }}
              >
                {actions}
              </DialogActions>
            </>
          )}

        </Stack>
      </DialogContent>
    </Dialog>
  );
}
