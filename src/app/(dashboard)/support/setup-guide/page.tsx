"use client";

import * as React from "react";
import { alpha } from "@mui/material/styles";
import {
  Box,
  Chip,
  Divider,
  Stack,
  Typography
} from "@mui/material";
import Link from "next/link";
import AppShell from "@/components/layout/AppShell";
import AppButton from "@/components/ui/AppButton";

/* ── Icons ─────────────────────────────────────────────────────────────── */
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import RocketLaunchRoundedIcon from "@mui/icons-material/RocketLaunchRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import LightbulbRoundedIcon from "@mui/icons-material/LightbulbRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import PersonAddRoundedIcon from "@mui/icons-material/PersonAddRounded";
import MicRoundedIcon from "@mui/icons-material/MicRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import HistoryEduRoundedIcon from "@mui/icons-material/HistoryEduRounded";
import HeadsetMicRoundedIcon from "@mui/icons-material/HeadsetMicRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import StopRoundedIcon from "@mui/icons-material/StopRounded";
import DoneAllRoundedIcon from "@mui/icons-material/DoneAllRounded";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";

/* ─── Types ──────────────────────────────────────────────────────────────── */

type Section = {
  id: string;
  number: number;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
};

/* ─── Data ───────────────────────────────────────────────────────────────── */

const sections: Section[] = [
  { id: "login",       number: 1, icon: <LoginRoundedIcon />,       title: "Log In to Your Account",       subtitle: "Access your Scanbo dashboard" },
  { id: "patient",     number: 2, icon: <PersonAddRoundedIcon />,    title: "Add Your First Patient",       subtitle: "Create a patient record" },
  { id: "consult",     number: 3, icon: <MicRoundedIcon />,         title: "Start a Consultation",         subtitle: "Record or upload audio" },
  { id: "review",      number: 4, icon: <DescriptionRoundedIcon />, title: "Review & Sign Off Notes",      subtitle: "Approve AI-generated SOAP notes" },
  { id: "settings",    number: 5, icon: <SettingsRoundedIcon />,    title: "Configure Your Settings",      subtitle: "Personalise your workspace" },
  { id: "nextsteps",   number: 6, icon: <DoneAllRoundedIcon />,     title: "Next Steps",                   subtitle: "What to explore after setup" },
];

/* ─── Sub-components ─────────────────────────────────────────────────────── */

function StepNumber({ n }: { n: number }) {
  return (
    <Box
      sx={{
        width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
        display: "grid", placeItems: "center",
        background: (theme) =>
          `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
        color: "#fff", fontWeight: 800, fontSize: "0.85rem",
        boxShadow: (theme) => `0 3px 10px ${alpha(theme.palette.primary.main, 0.32)}`
      }}
    >
      {n}
    </Box>
  );
}

function Tip({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        display: "flex", gap: 1.5, p: 1.75, borderRadius: 2.5,
        bgcolor: (theme) => alpha(theme.palette.primary.main, 0.06),
        border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.18)}`
      }}
    >
      <LightbulbRoundedIcon sx={{ fontSize: 18, color: "primary.main", flexShrink: 0, mt: "1px" }} />
      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
        {children}
      </Typography>
    </Box>
  );
}

function Warning({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        display: "flex", gap: 1.5, p: 1.75, borderRadius: 2.5,
        bgcolor: (theme) => alpha(theme.palette.warning.main, 0.07),
        border: (theme) => `1px solid ${alpha(theme.palette.warning.main, 0.22)}`
      }}
    >
      <WarningAmberRoundedIcon sx={{ fontSize: 18, color: "warning.main", flexShrink: 0, mt: "1px" }} />
      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
        {children}
      </Typography>
    </Box>
  );
}

function Step({ number, text, sub }: { number: number; text: string; sub?: string }) {
  return (
    <Stack direction="row" spacing={1.5} alignItems="flex-start">
      <Box
        sx={{
          width: 24, height: 24, borderRadius: "50%", flexShrink: 0,
          display: "grid", placeItems: "center", mt: "1px",
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
          color: "primary.main", fontWeight: 800, fontSize: "0.75rem",
          border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.2)}`
        }}
      >
        {number}
      </Box>
      <Box>
        <Typography variant="body2" fontWeight={600} color="text.primary">{text}</Typography>
        {sub && <Typography variant="caption" color="text.secondary">{sub}</Typography>}
      </Box>
    </Stack>
  );
}

function SectionCard({
  id, number, icon, title, subtitle, children
}: Section & { children: React.ReactNode }) {
  return (
    <Box
      id={id}
      sx={{
        borderRadius: 3,
        border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
        bgcolor: "background.paper",
        overflow: "hidden",
        boxShadow: (theme) => `0 4px 20px ${alpha(theme.palette.primary.main, 0.06)}`
      }}
    >
      {/* Card header */}
      <Box
        sx={{
          px: 3, py: 2,
          display: "flex", alignItems: "center", gap: 1.75,
          background: (theme) =>
            `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.06)} 0%, ${alpha(theme.palette.secondary.main, 0.03)} 100%)`,
          borderBottom: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
        }}
      >
        <StepNumber n={number} />
        <Box
          sx={{
            width: 40, height: 40, borderRadius: 2, flexShrink: 0,
            display: "grid", placeItems: "center",
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
            color: "primary.main",
            border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.14)}`
          }}
        >
          {icon}
        </Box>
        <Box flex={1}>
          <Typography variant="subtitle1" fontWeight={800} color="text.primary">{title}</Typography>
          <Typography variant="caption" color="text.secondary">{subtitle}</Typography>
        </Box>
        <Chip
          label={`Step ${number}`}
          size="small"
          sx={{
            height: 22, fontWeight: 800, fontSize: "0.68rem",
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
            color: "primary.main",
            border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
            "& .MuiChip-label": { px: 1 }
          }}
        />
      </Box>

      {/* Card body */}
      <Stack spacing={2} sx={{ px: 3, py: 2.5 }}>
        {children}
      </Stack>
    </Box>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────── */

export default function SetupGuidePage() {
  return (
    <AppShell title="Setup Guide" subtitle="" active="support">

      {/* ── Page Header ── */}
      <Box
        sx={{
          px: { xs: 2.5, sm: 3 },
          pt: 2.5, pb: 2,
          background: (theme) =>
            `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.light} 100%)`,
          borderBottom: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.14)}`
        }}
      >
        {/* Breadcrumb */}
        <Stack direction="row" spacing={0.5} alignItems="center" sx={{ mb: 1.5 }}>
          <Typography
            component={Link}
            href="/support"
            variant="caption"
            fontWeight={600}
            sx={{ color: "primary.main", textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
          >
            Help & Support
          </Typography>
          <ChevronRightRoundedIcon sx={{ fontSize: 14, color: "text.disabled" }} />
          <Typography variant="caption" fontWeight={600} color="text.secondary">
            Complete Setup Guide
          </Typography>
        </Stack>

        <Stack direction={{ xs: "column", sm: "row" }} alignItems={{ xs: "flex-start", sm: "center" }} justifyContent="space-between" spacing={2}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Box
              sx={{
                width: 52, height: 52, borderRadius: 2.5, display: "grid", placeItems: "center", flexShrink: 0,
                background: (theme) =>
                  `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
                boxShadow: (theme) => `0 6px 18px ${alpha(theme.palette.primary.main, 0.35)}`
              }}
            >
              <RocketLaunchRoundedIcon sx={{ fontSize: 26, color: "#fff" }} />
            </Box>
            <Stack spacing={0.4}>
              <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                <Typography variant="h5" fontWeight={800} color="text.primary">
                  Complete Setup Guide
                </Typography>
                <Chip
                  label="Getting Started"
                  size="small"
                  sx={{
                    height: 20, fontSize: "0.65rem", fontWeight: 800,
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                    color: "primary.main",
                    border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                    "& .MuiChip-label": { px: 1 }
                  }}
                />
              </Stack>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <AccessTimeRoundedIcon sx={{ fontSize: 13, color: "text.disabled" }} />
                  <Typography variant="caption" color="text.secondary">5 min read</Typography>
                </Stack>
                <Box sx={{ width: 3, height: 3, borderRadius: "50%", bgcolor: "text.disabled" }} />
                <Typography variant="caption" color="text.secondary">6 sections</Typography>
                <Box sx={{ width: 3, height: 3, borderRadius: "50%", bgcolor: "text.disabled" }} />
                <Typography variant="caption" color="text.secondary">Updated Feb 2026</Typography>
              </Stack>
            </Stack>
          </Stack>
          <AppButton intent="primary" startIcon={<HeadsetMicRoundedIcon />}>
            Contact Support
          </AppButton>
        </Stack>
      </Box>

      {/* ── Body ── */}
      <Box
        sx={{
          px: { xs: 2.5, sm: 3 },
          py: 2.5,
          minHeight: "calc(100vh - 145px)",
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.02)
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", xl: "minmax(0,1fr) 240px" },
            gap: 2.5,
            alignItems: "start"
          }}
        >
          {/* ── Main content column ── */}
          <Stack spacing={2.5}>

            {/* Intro card */}
            <Box
              sx={{
                p: 2.5, borderRadius: 3,
                background: (theme) =>
                  `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.07)} 0%, ${alpha(theme.palette.secondary.main, 0.04)} 100%)`,
                border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.14)}`
              }}
            >
              <Stack direction="row" spacing={1.5} alignItems="flex-start">
                <CheckCircleRoundedIcon sx={{ color: "primary.main", flexShrink: 0, mt: "2px" }} />
                <Box>
                  <Typography variant="subtitle2" fontWeight={800} color="primary.main" gutterBottom>
                    Welcome to Scanbo Scribe AI
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.75 }}>
                    This guide walks you through everything you need to start using Scanbo — from logging in
                    to reviewing your first AI-generated SOAP note. Follow the steps in order and you&apos;ll
                    be fully set up in under 10 minutes.
                  </Typography>
                </Box>
              </Stack>
            </Box>

            {/* ── STEP 1 — Log In ── */}
            <SectionCard {...sections[0]}>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.75 }}>
                Open your browser and navigate to your Scanbo instance URL. Enter your credentials
                provided by your clinic administrator.
              </Typography>
              <Stack spacing={1.25}>
                <Step number={1} text="Go to your Scanbo URL (e.g. app.scanbo.ai)" />
                <Step number={2} text="Enter your email address and password" />
                <Step number={3} text='Click "Sign In" — you will land on the Dashboard' />
                <Step number={4} text="Check the top bar confirms your name and recording credits" />
              </Stack>
              <Tip>
                If you forgot your password, click <strong>Forgot Password</strong> on the login screen.
                A reset link will be sent to your registered email within 2 minutes.
              </Tip>

              {/* Dashboard overview */}
              <Divider />
              <Typography variant="subtitle2" fontWeight={800} color="text.primary">
                Dashboard Overview
              </Typography>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
                  gap: 1.25
                }}
              >
                {[
                  { icon: <GridViewRoundedIcon sx={{ fontSize: 18 }} />, label: "Dashboard", desc: "Stats, recent activity, quick actions" },
                  { icon: <HistoryEduRoundedIcon sx={{ fontSize: 18 }} />, label: "My Recordings", desc: "All your consultations and notes" },
                  { icon: <GroupsRoundedIcon sx={{ fontSize: 18 }} />, label: "Patients", desc: "Patient records and history" },
                ].map((item) => (
                  <Box
                    key={item.label}
                    sx={{
                      p: 1.5, borderRadius: 2.5,
                      border: (theme) => `1px solid ${theme.palette.divider}`,
                      bgcolor: "background.paper"
                    }}
                  >
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
                      <Box
                        sx={{
                          width: 30, height: 30, borderRadius: 1.5,
                          display: "grid", placeItems: "center",
                          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
                          color: "primary.main"
                        }}
                      >
                        {item.icon}
                      </Box>
                      <Typography variant="caption" fontWeight={800} color="text.primary">{item.label}</Typography>
                    </Stack>
                    <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.5 }}>
                      {item.desc}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </SectionCard>

            {/* ── STEP 2 — Add Patient ── */}
            <SectionCard {...sections[1]}>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.75 }}>
                Before you can start a consultation, you need at least one patient in the system.
                You can add a patient from the Patients page or directly from the Start Consult dialog.
              </Typography>

              <Typography variant="subtitle2" fontWeight={800} color="text.primary">
                Method A — Via the Patients page
              </Typography>
              <Stack spacing={1.25}>
                <Step number={1} text='Click "Patients" in the left sidebar' />
                <Step number={2} text='Click the "New Patient" button in the page header' />
                <Step number={3} text="Fill in the required fields: Name, Age, Gender, Phone" />
                <Step number={4} text='Check "Patient consent received" and click "Create Patient"' />
              </Stack>

              <Typography variant="subtitle2" fontWeight={800} color="text.primary">
                Method B — During Start Consult flow
              </Typography>
              <Stack spacing={1.25}>
                <Step number={1} text='Click "+ Start Consult" in the sidebar or "+ New Consult" on the Dashboard' />
                <Step number={2} text='In the patient search dialog, click "Create Patient"' />
                <Step number={3} text="Fill in the patient details and click Create & Continue" />
              </Stack>

              <Tip>
                Required fields are <strong>Name, Age, Gender</strong> and <strong>Phone</strong>.
                Aadhaar / MRN are optional but recommended for deduplication.
              </Tip>

              <Warning>
                Always ensure patient consent is obtained before recording. Scanbo requires
                you to tick the consent checkbox before creating a patient record.
              </Warning>
            </SectionCard>

            {/* ── STEP 3 — Start Consultation ── */}
            <SectionCard {...sections[2]}>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.75 }}>
                Scanbo supports two consultation capture methods — live recording during the appointment,
                or uploading a pre-recorded audio file. Both produce the same AI-generated SOAP note.
              </Typography>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                  gap: 1.5
                }}
              >
                {/* Live Recording */}
                <Box
                  sx={{
                    p: 2, borderRadius: 2.5,
                    border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.18)}`,
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.04)
                  }}
                >
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                    <Box
                      sx={{
                        width: 32, height: 32, borderRadius: 1.5,
                        display: "grid", placeItems: "center",
                        bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                        color: "primary.main",
                        border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.2)}`
                      }}
                    >
                      <MicRoundedIcon sx={{ fontSize: 17 }} />
                    </Box>
                    <Typography variant="subtitle2" fontWeight={800} color="text.primary">Live Recording</Typography>
                  </Stack>
                  <Stack spacing={0.85}>
                    <Step number={1} text="Select patient → choose Live Recording" />
                    <Step number={2} text='Click "Start Recording"' sub="Mic orb will appear" />
                    <Step number={3} text="Conduct your consultation normally" />
                    <Step number={4} text='Click "Stop" when done' />
                    <Step number={5} text="AI generates the SOAP note automatically" />
                  </Stack>
                </Box>

                {/* Upload Audio */}
                <Box
                  sx={{
                    p: 2, borderRadius: 2.5,
                    border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.18)}`,
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.04)
                  }}
                >
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                    <Box
                      sx={{
                        width: 32, height: 32, borderRadius: 1.5,
                        display: "grid", placeItems: "center",
                        bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                        color: "primary.main",
                        border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.2)}`
                      }}
                    >
                      <FileUploadOutlinedIcon sx={{ fontSize: 17 }} />
                    </Box>
                    <Typography variant="subtitle2" fontWeight={800} color="text.primary">Upload Audio</Typography>
                  </Stack>
                  <Stack spacing={0.85}>
                    <Step number={1} text="Select patient → choose Upload Audio" />
                    <Step number={2} text='Click "Select File" to open your file picker' />
                    <Step number={3} text="Select an MP3, WAV, or M4A file" />
                    <Step number={4} text='Click "Process File"' />
                    <Step number={5} text="AI transcribes and generates the note" />
                  </Stack>
                </Box>
              </Box>

              <Box
                sx={{
                  p: 1.75, borderRadius: 2.5,
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.04),
                  border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.12)}`
                }}
              >
                <Typography variant="caption" fontWeight={800} color="primary.main" display="block" sx={{ mb: 0.75 }}>
                  Supported Audio Formats
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  {["MP3", "WAV", "M4A", "AAC", "OGG"].map((fmt) => (
                    <Chip
                      key={fmt} label={fmt} size="small"
                      sx={{
                        height: 22, fontWeight: 800, fontSize: "0.68rem",
                        bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
                        color: "primary.main",
                        border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                        "& .MuiChip-label": { px: 1 }
                      }}
                    />
                  ))}
                </Stack>
              </Box>

              <Tip>
                For best transcription accuracy, record in a quiet room with a directional microphone
                placed 30–50 cm from the speaker. Avoid background music or fan noise.
              </Tip>
            </SectionCard>

            {/* ── STEP 4 — Review & Sign Off ── */}
            <SectionCard {...sections[3]}>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.75 }}>
                After a consultation is processed, Scanbo generates a structured SOAP note with ICD-10
                codes and medication suggestions. You must review and sign off each note before it is
                marked as complete.
              </Typography>
              <Stack spacing={1.25}>
                <Step number={1} text='Go to "My Recordings" in the left sidebar' />
                <Step number={2} text='Find the consultation with status "Needs Review"' />
                <Step number={3} text='Click "View Note" to open the full note detail' />
                <Step
                  number={4}
                  text="Review the Subjective, Objective, Assessment, and Plan sections"
                  sub="Edit any field directly in the note editor"
                />
                <Step number={5} text='Verify the auto-suggested ICD-10 codes and medications' />
                <Step number={6} text='Click "Sign Off" to mark the note as complete' />
              </Stack>

              {/* SOAP structure explainer */}
              <Divider />
              <Typography variant="subtitle2" fontWeight={800} color="text.primary">
                Understanding the SOAP Note
              </Typography>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
                  gap: 1.25
                }}
              >
                {[
                  { letter: "S", label: "Subjective",  desc: "Patient's reported symptoms and history in their own words" },
                  { letter: "O", label: "Objective",   desc: "Measurable clinical findings, vitals, and examination results" },
                  { letter: "A", label: "Assessment",  desc: "Doctor's diagnosis or differential diagnosis based on findings" },
                  { letter: "P", label: "Plan",        desc: "Treatment plan, prescriptions, referrals, and follow-up instructions" },
                ].map((item) => (
                  <Box
                    key={item.letter}
                    sx={{
                      p: 1.5, borderRadius: 2.5,
                      border: (theme) => `1px solid ${theme.palette.divider}`,
                      bgcolor: "background.paper", display: "flex", gap: 1.25, alignItems: "flex-start"
                    }}
                  >
                    <Box
                      sx={{
                        width: 32, height: 32, borderRadius: 1.5, flexShrink: 0,
                        display: "grid", placeItems: "center",
                        background: (theme) =>
                          `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                        color: "#fff", fontWeight: 900, fontSize: "0.9rem"
                      }}
                    >
                      {item.letter}
                    </Box>
                    <Box>
                      <Typography variant="caption" fontWeight={800} color="text.primary" display="block">
                        {item.label}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.55 }}>
                        {item.desc}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>

              <Warning>
                You are responsible for verifying all AI-generated content before signing off.
                Always review ICD codes and medication suggestions against your clinical judgment.
              </Warning>
            </SectionCard>

            {/* ── STEP 5 — Settings ── */}
            <SectionCard {...sections[4]}>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.75 }}>
                Scanbo can be personalised to match your workflow. Recommended settings to configure
                on first use:
              </Typography>
              <Stack spacing={1.25}>
                {[
                  { setting: "Language & Region", detail: "Set your preferred language for note generation and transcription", path: "General" },
                  { setting: "Note Template", detail: "Choose a default SOAP template that matches your speciality", path: "Note Templates" },
                  { setting: "Auto Sign-off", detail: "Optionally enable automatic sign-off for low-complexity consultations", path: "General" },
                  { setting: "Audio Quality", detail: "Set microphone input sensitivity and noise cancellation level", path: "Recording" },
                  { setting: "Privacy & Data Retention", detail: "Configure how long recordings and transcripts are stored", path: "Privacy & Security" },
                ].map((item) => (
                  <Box
                    key={item.setting}
                    sx={{
                      p: 1.5, borderRadius: 2.5,
                      border: (theme) => `1px solid ${theme.palette.divider}`,
                      bgcolor: "background.paper",
                      display: "flex", alignItems: "center", gap: 1.5
                    }}
                  >
                    <CheckCircleRoundedIcon sx={{ fontSize: 18, color: "primary.main", flexShrink: 0 }} />
                    <Box flex={1}>
                      <Typography variant="body2" fontWeight={700} color="text.primary">{item.setting}</Typography>
                      <Typography variant="caption" color="text.secondary">{item.detail}</Typography>
                    </Box>
                    <Chip
                      label={item.path} size="small"
                      sx={{
                        height: 20, fontWeight: 700, fontSize: "0.65rem", flexShrink: 0,
                        bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
                        color: "primary.main",
                        "& .MuiChip-label": { px: 1 }
                      }}
                    />
                  </Box>
                ))}
              </Stack>
              <Tip>
                Navigate to <strong>Settings</strong> via the sidebar. Changes are saved automatically
                and synced across devices.
              </Tip>
            </SectionCard>

            {/* ── STEP 6 — Next Steps ── */}
            <SectionCard {...sections[5]}>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.75 }}>
                You&apos;re all set! Here&apos;s what to explore next to get the most out of Scanbo:
              </Typography>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
                  gap: 1.25
                }}
              >
                {[
                  { icon: <GroupsRoundedIcon sx={{ fontSize: 19 }} />,        title: "Import Patients",         desc: "Bulk-import your existing patient list via CSV" },
                  { icon: <DescriptionRoundedIcon sx={{ fontSize: 19 }} />,   title: "Note Templates",          desc: "Create custom templates for different specialities" },
                  { icon: <PlayArrowRoundedIcon sx={{ fontSize: 19 }} />,     title: "Keyboard Shortcuts",      desc: "Speed up your workflow with hotkeys" },
                  { icon: <StopRoundedIcon sx={{ fontSize: 19 }} />,          title: "Credits & Usage",         desc: "Track your recording minutes and notes generated" },
                ].map((item) => (
                  <Box
                    key={item.title}
                    sx={{
                      p: 2, borderRadius: 2.5, cursor: "pointer",
                      border: (theme) => `1px solid ${theme.palette.divider}`,
                      bgcolor: "background.paper",
                      transition: "all 0.18s ease",
                      "&:hover": {
                        borderColor: (theme) => alpha(theme.palette.primary.main, 0.3),
                        boxShadow: (theme) => `0 4px 14px ${alpha(theme.palette.primary.main, 0.08)}`,
                        transform: "translateY(-2px)"
                      }
                    }}
                  >
                    <Stack direction="row" spacing={1.25} alignItems="flex-start">
                      <Box
                        sx={{
                          width: 36, height: 36, borderRadius: 2, flexShrink: 0,
                          display: "grid", placeItems: "center",
                          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
                          color: "primary.main",
                          border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.14)}`
                        }}
                      >
                        {item.icon}
                      </Box>
                      <Box>
                        <Typography variant="subtitle2" fontWeight={800} color="text.primary" gutterBottom>
                          {item.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.55 }}>
                          {item.desc}
                        </Typography>
                      </Box>
                    </Stack>
                  </Box>
                ))}
              </Box>

              {/* CTA */}
              <Box
                sx={{
                  p: 2.5, borderRadius: 2.5,
                  background: (theme) =>
                    `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.08)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
                  border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.16)}`
                }}
              >
                <Stack direction={{ xs: "column", sm: "row" }} alignItems={{ xs: "flex-start", sm: "center" }} justifyContent="space-between" spacing={1.5}>
                  <Box>
                    <Typography variant="subtitle2" fontWeight={800} color="primary.main" gutterBottom>
                      Still have questions?
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Browse more articles or reach out to our support team directly.
                    </Typography>
                  </Box>
                  <Stack direction="row" spacing={1.25} flexShrink={0}>
                    <AppButton intent="neutral" component={Link} href="/support">
                      Browse Articles
                    </AppButton>
                    <AppButton intent="primary" startIcon={<HeadsetMicRoundedIcon />}>
                      Contact Support
                    </AppButton>
                  </Stack>
                </Stack>
              </Box>
            </SectionCard>

          </Stack>

          {/* ── Sticky Table of Contents ── */}
          <Box
            sx={{
              display: { xs: "none", xl: "block" },
              position: "sticky",
              top: 20
            }}
          >
            <Box
              sx={{
                borderRadius: 3,
                border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
                bgcolor: "background.paper",
                overflow: "hidden",
                boxShadow: (theme) => `0 4px 20px ${alpha(theme.palette.primary.main, 0.07)}`
              }}
            >
              <Box
                sx={{
                  px: 2, py: 1.5,
                  background: (theme) =>
                    `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.07)} 0%, ${alpha(theme.palette.secondary.main, 0.04)} 100%)`,
                  borderBottom: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
                }}
              >
                <Typography variant="caption" fontWeight={800} color="text.secondary" sx={{ textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  In This Guide
                </Typography>
              </Box>
              <Stack spacing={0} sx={{ p: 1 }}>
                {sections.map((s) => (
                  <Box
                    key={s.id}
                    component="a"
                    href={`#${s.id}`}
                    sx={{
                      display: "flex", alignItems: "center", gap: 1.25,
                      px: 1.25, py: 1, borderRadius: 2,
                      textDecoration: "none", cursor: "pointer",
                      transition: "all 0.15s ease",
                      "&:hover": {
                        bgcolor: (theme) => alpha(theme.palette.primary.main, 0.06),
                        "& .toc-num": { color: "primary.main" },
                        "& .toc-text": { color: "text.primary" }
                      }
                    }}
                  >
                    <Box
                      className="toc-num"
                      sx={{
                        width: 20, height: 20, borderRadius: "50%", flexShrink: 0,
                        display: "grid", placeItems: "center",
                        bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
                        color: "primary.main",
                        fontSize: "0.65rem", fontWeight: 800
                      }}
                    >
                      {s.number}
                    </Box>
                    <Typography className="toc-text" variant="caption" fontWeight={600} color="text.secondary" sx={{ lineHeight: 1.4 }}>
                      {s.title}
                    </Typography>
                  </Box>
                ))}
              </Stack>

              {/* Help link */}
              <Box sx={{ p: 1, pt: 0 }}>
                <Divider sx={{ mb: 1 }} />
                <Box
                  sx={{
                    p: 1.25, borderRadius: 2,
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.06),
                    border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.14)}`
                  }}
                >
                  <Stack direction="row" spacing={0.75} alignItems="center" sx={{ mb: 0.5 }}>
                    <HelpRoundedIcon sx={{ fontSize: 14, color: "primary.main" }} />
                    <Typography variant="caption" fontWeight={800} color="primary.main">Need help?</Typography>
                  </Stack>
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.67rem", display: "block", mb: 0.75 }}>
                    Our team replies within 2 hours on business days.
                  </Typography>
                  <Box
                    component={Link}
                    href="/support"
                    sx={{
                      display: "block", textAlign: "center",
                      py: 0.6, borderRadius: 1.5,
                      bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                      color: "primary.main",
                      textDecoration: "none",
                      fontWeight: 800, fontSize: "0.72rem"
                    }}
                  >
                    Back to Help Center →
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>

        </Box>
      </Box>
    </AppShell>
  );
}
