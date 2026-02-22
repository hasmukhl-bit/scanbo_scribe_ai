"use client";

import * as React from "react";
import { alpha, keyframes, styled } from "@mui/material/styles";
import { Box, Stack, Typography } from "@mui/material";

const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 0.9; }
  50% { transform: scale(1.06); opacity: 1; }
`;

const ripple = keyframes`
  0% { transform: scale(0.8); opacity: 0.45; }
  100% { transform: scale(1.25); opacity: 0; }
`;

const wave = keyframes`
  0%, 100% { height: 10px; }
  50% { height: 44px; }
`;

const LoaderRoot = styled("main")(({ theme }) => ({
  minHeight: "100dvh",
  display: "grid",
  placeItems: "center",
  background: `radial-gradient(1000px 520px at 12% -10%, ${alpha(
    theme.palette.primary.main,
    0.2
  )}, transparent 60%), linear-gradient(180deg, #f4f8fc 0%, #e8f1f8 100%)`,
  padding: theme.spacing(3)
}));

const Card = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: 420,
  borderRadius: 24,
  padding: theme.spacing(3.5, 3),
  backgroundColor: alpha("#ffffff", 0.9),
  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
  boxShadow: "0 24px 56px rgba(17, 114, 186, 0.14)",
  display: "grid",
  justifyItems: "center",
  gap: theme.spacing(2.2)
}));

const Logo = styled("img")(() => ({
  width: 56,
  height: 56
}));

const MicOrb = styled(Box)(({ theme }) => ({
  width: 128,
  height: 128,
  borderRadius: "50%",
  display: "grid",
  placeItems: "center",
  position: "relative",
  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.2)} 0%, ${alpha(
    theme.palette.info.main,
    0.2
  )} 100%)`,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.28)}`,
  animation: `${pulse} 2s ease-in-out infinite`
}));

const Ripple = styled(Box)(({ theme }) => ({
  position: "absolute",
  inset: 0,
  borderRadius: "50%",
  border: `2px solid ${alpha(theme.palette.primary.main, 0.35)}`,
  animation: `${ripple} 1.9s ease-out infinite`
}));

const MicGlyph = styled(Box)(() => ({
  fontSize: 48,
  lineHeight: 1,
  color: "#1172BA",
  userSelect: "none",
  fontFamily: '"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif'
}));

const WaveRow = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 5,
  minHeight: 44
}));

const WaveBar = styled(Box, {
  shouldForwardProp: (prop) => prop !== "delay"
})<{ delay: number }>(({ theme, delay }) => ({
  width: 5,
  height: 10,
  borderRadius: 999,
  backgroundColor: alpha(theme.palette.primary.main, 0.88),
  animation: `${wave} 1s ease-in-out infinite`,
  animationDelay: `${delay}ms`
}));

export default function AppLoader() {
  return (
    <LoaderRoot>
      <Card>
        <Logo src="/scanbo-logo.svg" alt="Scanbo logo" />
        <Typography variant="h5" fontWeight={800} color="#0f2238" textAlign="center">
          ScanboScribe AI
        </Typography>
        <MicOrb>
          <Ripple />
          <MicGlyph component="span" aria-hidden>
            🎙️
          </MicGlyph>
        </MicOrb>
        <WaveRow>
          {Array.from({ length: 9 }).map((_, index) => (
            <WaveBar key={`wave-bar-${index}`} delay={index * 90} />
          ))}
        </WaveRow>
        <Stack spacing={0.5} alignItems="center">
          <Typography variant="subtitle1" fontWeight={700} color="#0f2238">
            Preparing your Scribe workspace
          </Typography>
          <Typography variant="body2" color="text.secondary" textAlign="center">
            Structuring clinical context and loading your latest workflow.
          </Typography>
        </Stack>
      </Card>
    </LoaderRoot>
  );
}
