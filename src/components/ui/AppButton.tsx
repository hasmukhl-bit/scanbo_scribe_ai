"use client";

import * as React from "react";
import MuiButton, { type ButtonProps } from "@mui/material/Button";
import { alpha, styled } from "@mui/material/styles";

type AppButtonIntent = "primary" | "neutral";

type AppButtonProps = ButtonProps & {
  intent?: AppButtonIntent;
};

const StyledButton = styled(MuiButton, {
  shouldForwardProp: (prop) => prop !== "intent"
})<{ intent: AppButtonIntent }>(({ intent }) => ({
  borderRadius: 12,
  minHeight: 52,
  textTransform: "none",
  fontWeight: 700,
  boxShadow: "none",
  ...(intent === "primary"
    ? {
        backgroundColor: "#1873bc",
        color: "#ffffff",
        "&:hover": {
          backgroundColor: "#0f64a9",
          boxShadow: "none"
        }
      }
    : {
        backgroundColor: "#ffffff",
        color: "#202124",
        border: `1px solid ${alpha("#0f2238", 0.16)}`,
        "&:hover": {
          backgroundColor: "#f8f9fa",
          borderColor: alpha("#0f2238", 0.24),
          boxShadow: "none"
        }
      })
}));

export default function AppButton({
  intent = "primary",
  variant,
  ...props
}: AppButtonProps) {
  const resolvedVariant = variant ?? (intent === "primary" ? "contained" : "outlined");
  return <StyledButton intent={intent} variant={resolvedVariant} {...props} />;
}

