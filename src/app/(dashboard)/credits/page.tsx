"use client";

import * as React from "react";
import { alpha } from "@mui/material/styles";
import {
  Box,
  Chip,
  CircularProgress,
  LinearProgress,
  Stack,
  Typography
} from "@mui/material";
import AppShell from "@/components/layout/AppShell";
import AppButton from "@/components/ui/AppButton";

/* ── Icons ─────────────────────────────────────────────────────────────── */
import CreditCardRoundedIcon from "@mui/icons-material/CreditCardRounded";
import MicRoundedIcon from "@mui/icons-material/MicRounded";
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";
import RateReviewRoundedIcon from "@mui/icons-material/RateReviewRounded";
import StorageRoundedIcon from "@mui/icons-material/StorageRounded";
import TimerRoundedIcon from "@mui/icons-material/TimerRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";

/* ─── Component ──────────────────────────────────────────────────────────── */

export default function CreditsPage() {
  return (
    <AppShell title="Credits & Usage" subtitle="" active="credits">
      {/* ── Page Header ─────────────────────────────────────────────────── */}
      <Box
        sx={{
          px: { xs: 2.5, sm: 3 },
          pt: 2.5,
          pb: 2,
          background: (theme) =>
            `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.light} 100%)`,
          borderBottom: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.14)}`
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
          <Stack direction="row" alignItems="center" spacing={2}>
            {/* Icon badge */}
            <Box
              sx={{
                width: 52,
                height: 52,
                borderRadius: 2.5,
                display: "grid",
                placeItems: "center",
                background: (theme) =>
                  `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
                boxShadow: (theme) => `0 6px 18px ${alpha(theme.palette.primary.main, 0.35)}`,
                flexShrink: 0
              }}
            >
              <CreditCardRoundedIcon sx={{ fontSize: 26, color: "#fff" }} />
            </Box>
            <Stack spacing={0.25}>
              <Typography variant="h5" fontWeight={800} color="text.primary">
                Credits & Usage
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Monitor your plan usage, recordings, and billing details
              </Typography>
            </Stack>
          </Stack>

          <AppButton intent="primary" startIcon={<ArrowUpwardRoundedIcon />}>
            Upgrade Plan
          </AppButton>
        </Stack>
      </Box>

      {/* ── Body ────────────────────────────────────────────────────────── */}
      <Box
        sx={{
          px: { xs: 2, md: 4 },
          py: { xs: 2.5, md: 3 },
          minHeight: "calc(100vh - 145px)",
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.02)
        }}
      >
        <Stack spacing={3}>

          {/* ── Stats row ─────────────────────────────────────────────── */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr 1fr", md: "repeat(4,1fr)" },
              gap: 2
            }}
          >
            {[
              {
                label: "Recordings Left",
                value: "20",
                sub: "of 50 this cycle",
                icon: <MicRoundedIcon sx={{ fontSize: 22 }} />,
                color: "#1172BA",
                bg: "#EAF4FF",
                gradient: "linear-gradient(135deg,#EAF4FF 0%,#DCEBFF 100%)"
              },
              {
                label: "Notes Generated",
                value: "28",
                sub: "this billing period",
                icon: <TaskAltRoundedIcon sx={{ fontSize: 22 }} />,
                color: "#2FA77A",
                bg: "#E8F6EF",
                gradient: "linear-gradient(135deg,#E8F6EF 0%,#d4f0e5 100%)"
              },
              {
                label: "Pending Review",
                value: "2",
                sub: "notes awaiting sign-off",
                icon: <RateReviewRoundedIcon sx={{ fontSize: 22 }} />,
                color: "#F3C44E",
                bg: "#FFF3D6",
                gradient: "linear-gradient(135deg,#FFF3D6 0%,#FEEAB8 100%)"
              },
              {
                label: "Storage Used",
                value: "2.3 GB",
                sub: "of 10 GB allocated",
                icon: <StorageRoundedIcon sx={{ fontSize: 22 }} />,
                color: "#2C8AD3",
                bg: "#E6F2FD",
                gradient: "linear-gradient(135deg,#E6F2FD 0%,#cde5f9 100%)"
              }
            ].map((stat) => (
              <Box
                key={stat.label}
                sx={{
                  borderRadius: 3,
                  p: 2.2,
                  bgcolor: "background.paper",
                  border: (theme) => `1px solid ${theme.palette.divider}`,
                  boxShadow: (theme) => `0 2px 8px ${alpha(theme.palette.primary.main, 0.05)}`
                }}
              >
                <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                  <Stack spacing={0.5}>
                    <Typography variant="caption" fontWeight={700} color="text.secondary" sx={{ textTransform: "uppercase", letterSpacing: "0.06em" }}>
                      {stat.label}
                    </Typography>
                    <Typography variant="h5" fontWeight={800} color="text.primary" sx={{ lineHeight: 1.1 }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {stat.sub}
                    </Typography>
                  </Stack>
                  <Box
                    sx={{
                      width: 42,
                      height: 42,
                      borderRadius: 2,
                      display: "grid",
                      placeItems: "center",
                      bgcolor: stat.bg,
                      color: stat.color,
                      flexShrink: 0,
                      border: `1px solid ${alpha(stat.color, 0.2)}`
                    }}
                  >
                    {stat.icon}
                  </Box>
                </Stack>
              </Box>
            ))}
          </Box>

          {/* ── Usage cards ───────────────────────────────────────────── */}
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" }, gap: 2.5 }}>
            {/* Recordings Remaining */}
            <Box
              sx={{
                borderRadius: 3,
                border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.14)}`,
                bgcolor: "background.paper",
                overflow: "hidden",
                boxShadow: (theme) => `0 4px 20px ${alpha(theme.palette.primary.main, 0.07)}`
              }}
            >
              {/* Card header */}
              <Box
                sx={{
                  px: 2.5,
                  py: 1.5,
                  background: (theme) =>
                    `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.07)} 0%, ${alpha(theme.palette.secondary.main, 0.04)} 100%)`,
                  borderBottom: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
                }}
              >
                <Stack direction="row" alignItems="center" spacing={1}>
                  <MicRoundedIcon sx={{ fontSize: 18, color: "primary.main" }} />
                  <Typography variant="caption" fontWeight={800} sx={{ color: "primary.main", letterSpacing: "0.07em", textTransform: "uppercase" }}>
                    Recordings Remaining
                  </Typography>
                </Stack>
              </Box>

              <Box sx={{ p: 2.5 }}>
                <Stack direction="row" spacing={2.5} alignItems="center">
                  <Box flex={1}>
                    {/* Big number */}
                    <Stack direction="row" alignItems="baseline" spacing={0.75}>
                      <Typography variant="h2" fontWeight={800} color="primary.main" sx={{ lineHeight: 1 }}>
                        20
                      </Typography>
                      <Typography variant="h5" color="text.secondary" fontWeight={600}>
                        / 50
                      </Typography>
                    </Stack>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, mb: 2 }}>
                      30 recordings used this billing cycle
                    </Typography>

                    {/* Monthly usage bar */}
                    <Stack spacing={0.6} sx={{ mb: 1.8 }}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="caption" fontWeight={700} color="text.primary">
                          Monthly usage
                        </Typography>
                        <Typography variant="caption" fontWeight={700} color="primary.main">
                          30 / 50
                        </Typography>
                      </Stack>
                      <LinearProgress
                        variant="determinate"
                        value={60}
                        sx={{
                          height: 8,
                          borderRadius: 999,
                          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                          "& .MuiLinearProgress-bar": {
                            borderRadius: 999,
                            background: (theme) =>
                              `linear-gradient(90deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`
                          }
                        }}
                      />
                    </Stack>

                    {/* Storage bar */}
                    <Stack spacing={0.6}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="caption" fontWeight={700} color="text.primary">
                          Storage used
                        </Typography>
                        <Typography variant="caption" fontWeight={700} sx={{ color: "#2FA77A" }}>
                          2.3 GB / 10 GB
                        </Typography>
                      </Stack>
                      <LinearProgress
                        variant="determinate"
                        value={23}
                        sx={{
                          height: 8,
                          borderRadius: 999,
                          bgcolor: (theme) => alpha(theme.palette.success.main, 0.12),
                          "& .MuiLinearProgress-bar": {
                            borderRadius: 999,
                            background: "linear-gradient(90deg,#1E7A57,#2FA77A)"
                          }
                        }}
                      />
                    </Stack>
                  </Box>

                  {/* Circular gauge */}
                  <Box sx={{ position: "relative", width: 110, height: 110, flexShrink: 0 }}>
                    <CircularProgress
                      variant="determinate"
                      value={100}
                      size={110}
                      thickness={5}
                      sx={{ color: (theme) => alpha(theme.palette.primary.main, 0.12), position: "absolute", top: 0, left: 0 }}
                    />
                    <CircularProgress
                      variant="determinate"
                      value={60}
                      size={110}
                      thickness={5}
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        "& .MuiCircularProgress-circle": {
                          strokeLinecap: "round",
                          stroke: "url(#gaugeGrad)"
                        }
                      }}
                    />
                    {/* SVG gradient definition */}
                    <svg width={0} height={0} style={{ position: "absolute" }}>
                      <defs>
                        <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#0A5E9D" />
                          <stop offset="100%" stopColor="#1172BA" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <Box
                      sx={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      <Typography variant="h5" fontWeight={800} color="primary.main">
                        60%
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.62rem" }}>
                        used
                      </Typography>
                    </Box>
                  </Box>
                </Stack>
              </Box>
            </Box>

            {/* This Billing Period */}
            <Box
              sx={{
                borderRadius: 3,
                border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.14)}`,
                bgcolor: "background.paper",
                overflow: "hidden",
                boxShadow: (theme) => `0 4px 20px ${alpha(theme.palette.primary.main, 0.07)}`
              }}
            >
              {/* Card header */}
              <Box
                sx={{
                  px: 2.5,
                  py: 1.5,
                  background: (theme) =>
                    `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.07)} 0%, ${alpha(theme.palette.secondary.main, 0.04)} 100%)`,
                  borderBottom: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
                }}
              >
                <Stack direction="row" alignItems="center" spacing={1}>
                  <CalendarMonthRoundedIcon sx={{ fontSize: 18, color: "primary.main" }} />
                  <Typography variant="caption" fontWeight={800} sx={{ color: "primary.main", letterSpacing: "0.07em", textTransform: "uppercase" }}>
                    This Billing Period
                  </Typography>
                </Stack>
              </Box>

              <Box sx={{ p: 2.5 }}>
                {/* 3-col stats */}
                <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 1.5, mb: 2.5 }}>
                  {[
                    { value: "30", label: "Recordings" },
                    { value: "28", label: "Notes Generated" },
                    { value: "2", label: "Pending Review" }
                  ].map((item) => (
                    <Box
                      key={item.label}
                      sx={{
                        p: 1.5,
                        borderRadius: 2.5,
                        textAlign: "center",
                        bgcolor: (theme) => alpha(theme.palette.primary.main, 0.06),
                        border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.14)}`
                      }}
                    >
                      <Typography variant="h4" fontWeight={800} color="primary.main" sx={{ lineHeight: 1.1 }}>
                        {item.value}
                      </Typography>
                      <Typography variant="caption" fontWeight={600} color="text.secondary">
                        {item.label}
                      </Typography>
                    </Box>
                  ))}
                </Box>

                {/* Avg recording length */}
                <Stack spacing={0.6} sx={{ mb: 2 }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Stack direction="row" spacing={0.75} alignItems="center">
                      <TimerRoundedIcon sx={{ fontSize: 16, color: "warning.main" }} />
                      <Typography variant="caption" fontWeight={700} color="text.primary">
                        Avg. recording length
                      </Typography>
                    </Stack>
                    <Typography variant="caption" fontWeight={800} color="warning.dark">
                      3m 24s
                    </Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={65}
                    sx={{
                      height: 8,
                      borderRadius: 999,
                      bgcolor: (theme) => alpha(theme.palette.warning.main, 0.12),
                      "& .MuiLinearProgress-bar": {
                        borderRadius: 999,
                        background: "linear-gradient(90deg,#C9931E,#F3C44E)"
                      }
                    }}
                  />
                </Stack>

                {/* Reset notice */}
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: (theme) =>
                      `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.04)} 100%)`,
                    border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
                  }}
                >
                  <Stack direction="row" spacing={0.75} alignItems="center">
                    <CalendarMonthRoundedIcon sx={{ fontSize: 15, color: "primary.main" }} />
                    <Typography variant="caption" fontWeight={600} color="text.secondary">
                      Resets on <strong style={{ color: "#1172BA" }}>Mar 1, 2026</strong>
                    </Typography>
                  </Stack>
                  <Chip
                    label="8 days remaining"
                    size="small"
                    sx={{
                      height: 20,
                      fontSize: "0.65rem",
                      fontWeight: 800,
                      bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                      color: "primary.main",
                      border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                      "& .MuiChip-label": { px: 1 }
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </Box>

        </Stack>
      </Box>
    </AppShell>
  );
}
