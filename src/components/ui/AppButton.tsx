"use client";

import * as React from "react";
import MuiButton, { type ButtonProps } from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { alpha, styled } from "@mui/material/styles";

/**
 * AppButton — the single button primitive for the entire Scanbo Scribe AI app.
 *
 * Intents:
 *  "primary"   — solid blue,         main CTAs (New Consult, Generate Note, Create & Continue)
 *  "secondary" — outlined blue,      supporting actions (Select, Upload, Quick-Actions)
 *  "neutral"   — subtle grey border, low-emphasis (Cancel, Back, Change Patient)
 *  "danger"    — solid / outlined red, destructive (Stop Recording, Delete)
 *  "success"   — solid green,        positive completion (Review & Sign Off, Save)
 *  "ghost"     — no bg / no border,  text-only links (View All →)
 *
 * Extra props:
 *  loading     — shows a spinner and disables the button
 *  fullWidth   — stretches to container width (passed through from MUI)
 */

export type AppButtonIntent =
  | "primary"
  | "secondary"
  | "neutral"
  | "danger"
  | "success"
  | "ghost";

export type AppButtonProps = Omit<ButtonProps, "variant" | "color"> & {
  intent?: AppButtonIntent;
  loading?: boolean;
};

/* ─── per-intent token maps ─────────────────────────────────────────────── */

const INTENT_STYLES: Record<
  AppButtonIntent,
  (theme: import("@mui/material/styles").Theme) => React.CSSProperties & Record<string, unknown>
> = {
  primary: (theme) => ({
    backgroundColor: "#1873bc",
    color: "#ffffff",
    border: "1px solid transparent",
    "&:hover": {
      backgroundColor: "#0f64a9",
      boxShadow: `0 6px 18px ${alpha("#1873bc", 0.32)}`
    },
    "&:active": { backgroundColor: "#0b5a99" },
    "&.Mui-disabled": {
      backgroundColor: alpha("#1873bc", 0.38),
      color: "#ffffff"
    }
  }),

  secondary: (theme) => ({
    backgroundColor: alpha(theme.palette.primary.main, 0.06),
    color: theme.palette.primary.main,
    border: `1px solid ${alpha(theme.palette.primary.main, 0.38)}`,
    "&:hover": {
      backgroundColor: alpha(theme.palette.primary.main, 0.12),
      borderColor: theme.palette.primary.main,
      boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.16)}`
    },
    "&:active": { backgroundColor: alpha(theme.palette.primary.main, 0.18) },
    "&.Mui-disabled": {
      color: alpha(theme.palette.primary.main, 0.4),
      borderColor: alpha(theme.palette.primary.main, 0.2)
    }
  }),

  neutral: (theme) => ({
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.secondary,
    border: `1px solid ${alpha(theme.palette.text.primary, 0.18)}`,
    "&:hover": {
      backgroundColor: alpha(theme.palette.text.primary, 0.04),
      borderColor: alpha(theme.palette.text.primary, 0.28),
      color: theme.palette.text.primary
    },
    "&:active": { backgroundColor: alpha(theme.palette.text.primary, 0.08) },
    "&.Mui-disabled": {
      color: alpha(theme.palette.text.primary, 0.3),
      borderColor: alpha(theme.palette.text.primary, 0.1)
    }
  }),

  danger: () => ({
    backgroundColor: "#ef476f",
    color: "#ffffff",
    border: "1px solid transparent",
    "&:hover": {
      backgroundColor: "#d93660",
      boxShadow: `0 6px 18px ${alpha("#ef476f", 0.32)}`
    },
    "&:active": { backgroundColor: "#c22e54" },
    "&.Mui-disabled": {
      backgroundColor: alpha("#ef476f", 0.38),
      color: "#ffffff"
    }
  }),

  success: () => ({
    backgroundColor: "#10b981",
    color: "#ffffff",
    border: "1px solid transparent",
    "&:hover": {
      backgroundColor: "#059669",
      boxShadow: `0 6px 18px ${alpha("#10b981", 0.32)}`
    },
    "&:active": { backgroundColor: "#047857" },
    "&.Mui-disabled": {
      backgroundColor: alpha("#10b981", 0.38),
      color: "#ffffff"
    }
  }),

  ghost: (theme) => ({
    backgroundColor: "transparent",
    color: theme.palette.primary.main,
    border: "1px solid transparent",
    "&:hover": {
      backgroundColor: alpha(theme.palette.primary.main, 0.06),
      border: "1px solid transparent"
    },
    "&:active": { backgroundColor: alpha(theme.palette.primary.main, 0.12) },
    "&.Mui-disabled": {
      color: alpha(theme.palette.primary.main, 0.35)
    }
  })
};

/* ─── styled base ───────────────────────────────────────────────────────── */

const StyledButton = styled(MuiButton, {
  shouldForwardProp: (prop) => prop !== "intent" && prop !== "loading"
})<{ intent: AppButtonIntent }>(({ theme, intent, size }) => ({
  /* shared resets */
  textTransform: "none",
  fontWeight: 700,
  boxShadow: "none",
  lineHeight: 1.4,
  letterSpacing: 0,
  transition:
    "background-color 200ms ease, box-shadow 200ms ease, border-color 200ms ease, color 200ms ease",

  /* size-dependent shape */
  ...(size === "small"
    ? { borderRadius: 8, padding: "5px 14px", fontSize: "0.82rem", minHeight: 32 }
    : size === "large"
      ? { borderRadius: 14, padding: "12px 28px", fontSize: "1rem", minHeight: 52 }
      : { borderRadius: 10, padding: "8px 20px", fontSize: "0.9rem", minHeight: 40 }),

  /* intent-specific overrides */
  ...INTENT_STYLES[intent](theme)
}));

/* ─── component ─────────────────────────────────────────────────────────── */

export default function AppButton({
  intent = "primary",
  loading = false,
  disabled,
  children,
  startIcon,
  endIcon,
  ...rest
}: AppButtonProps) {
  const spinner = (
    <CircularProgress
      size={14}
      thickness={5}
      sx={{ color: "inherit", ml: loading && !startIcon ? 0 : 0.5 }}
    />
  );

  return (
    <StyledButton
      intent={intent}
      disabled={disabled || loading}
      disableRipple={false}
      disableElevation
      startIcon={loading && !endIcon ? spinner : startIcon}
      endIcon={loading && endIcon ? spinner : endIcon}
      {...rest}
    >
      {children}
    </StyledButton>
  );
}
