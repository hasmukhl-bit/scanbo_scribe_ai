"use client";

import * as React from "react";
import styled from "@emotion/styled";
import { Box, Button, Chip, Stack, Typography, Card, Divider } from "@mui/material";
import { alpha } from "@mui/material/styles";
import MicNoneOutlinedIcon from "@mui/icons-material/MicNoneOutlined";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import GraphicEqOutlinedIcon from "@mui/icons-material/GraphicEqOutlined";
import AppShell from "@/components/AppShell";
import ConfirmDialog from "@/components/ConfirmDialog";

const PageRoot = styled(Box)(({ theme }) => ({
  minHeight: "calc(100vh - 72px)",
  background: `radial-gradient(1000px 500px at 15% -10%, ${alpha(
    theme.palette.primary.main,
    0.2
  )}, transparent 60%), radial-gradient(900px 500px at 90% 0%, ${alpha(
    theme.palette.secondary.main,
    0.18
  )}, transparent 55%), linear-gradient(180deg, ${theme.palette.background.default} 0%, ${alpha(
    theme.palette.primary.light,
    0.08
  )} 100%)`,
  padding: theme.spacing(4, 3, 6),
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(3, 2, 5)
  }
}));

const Grid = styled(Box)(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(3),
  gridTemplateColumns: "1fr",
  [theme.breakpoints.up("lg")]: {
    gridTemplateColumns: "1fr 1.4fr 1fr"
  }
}));

const Panel = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  padding: theme.spacing(3),
  backgroundColor: alpha(theme.palette.background.paper, 0.92),
  border: `1px solid ${alpha(theme.palette.text.primary, 0.08)}`,
  boxShadow: theme.shadows[1]
}));

const CenterPanel = styled(Panel)(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  textAlign: "center"
}));

const Halo = styled(Box)(({ theme }) => ({
  position: "absolute",
  inset: "-40% -30% auto -30%",
  height: 360,
  background: `radial-gradient(closest-side, ${alpha(
    theme.palette.primary.main,
    0.35
  )}, transparent 70%)`,
  pointerEvents: "none"
}));

const SpeakerRing = styled(Box)(({ theme }) => ({
  width: 200,
  height: 200,
  borderRadius: "50%",
  margin: "24px auto 20px",
  alignSelf: "center",
  border: `1px dashed ${alpha(theme.palette.primary.main, 0.5)}`,
  display: "grid",
  placeItems: "center",
  position: "relative"
}));

const SpeakerCore = styled(Box, {
  shouldForwardProp: (prop) => prop !== "recording"
})<{ recording: boolean }>(({ theme, recording }) => ({
  width: 120,
  height: 120,
  borderRadius: "50%",
  background: `linear-gradient(135deg, ${alpha(
    theme.palette.primary.main,
    0.25
  )}, ${alpha(theme.palette.secondary.main, 0.25)})`,
  display: "grid",
  placeItems: "center",
  boxShadow: `0 0 0 14px ${alpha(theme.palette.primary.main, 0.08)}`,
  transition: "transform 200ms ease",
  animation: recording ? "pulseCore 1.4s ease-in-out infinite" : "none",
  "@keyframes pulseCore": {
    "0%, 100%": {
      transform: "scale(1)"
    },
    "50%": {
      transform: "scale(1.05)"
    }
  }
}));

const PulseDot = styled(Box, {
  shouldForwardProp: (prop) => prop !== "recording"
})<{ recording: boolean }>(({ theme, recording }) => ({
  width: 14,
  height: 14,
  borderRadius: "50%",
  backgroundColor: theme.palette.primary.main,
  boxShadow: `0 0 0 8px ${alpha(theme.palette.primary.main, 0.2)}`,
  animation: recording ? "pulseDot 1s ease-in-out infinite" : "none",
  "@keyframes pulseDot": {
    "0%, 100%": {
      transform: "scale(1)",
      boxShadow: `0 0 0 6px ${alpha(theme.palette.primary.main, 0.15)}`
    },
    "50%": {
      transform: "scale(1.35)",
      boxShadow: `0 0 0 12px ${alpha(theme.palette.primary.main, 0.28)}`
    }
  }
}));

const Title = styled(Typography)(() => ({
  fontWeight: 700,
  letterSpacing: -0.2
}));

const Subtitle = styled(Typography)(({ theme }) => ({
  maxWidth: 520,
  margin: "0 auto",
  textAlign: "center",
  display: "block"
}));

const AssistCard = styled(Box)(({ theme }) => ({
  borderRadius: 14,
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
  border: `1px solid ${theme.palette.divider}`
}));

const StatChip = styled(Chip)(({ theme }) => ({
  borderRadius: 999,
  fontWeight: 600,
  backgroundColor: alpha(theme.palette.primary.main, 0.12),
  color: theme.palette.primary.main
}));

const PrimaryButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  fontWeight: 600,
  borderRadius: 12,
  padding: theme.spacing(1.2, 3)
}));

const SecondaryButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  fontWeight: 600,
  borderRadius: 12,
  padding: theme.spacing(1.1, 2.5),
  backgroundColor: alpha(theme.palette.primary.main, 0.08),
  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
  color: theme.palette.primary.main
}));

export default function StartConsultPage() {
  const [isRecording, setIsRecording] = React.useState(false);
  const [audioUrl, setAudioUrl] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const [confirmState, setConfirmState] = React.useState<{
    open: boolean;
    title: string;
    description: string;
    onConfirm: () => void;
  }>({
    open: false,
    title: "Confirm action",
    description: "Are you sure you want to continue?",
    onConfirm: () => {}
  });
  const mediaRecorderRef = React.useRef<MediaRecorder | null>(null);
  const chunksRef = React.useRef<Blob[]>([]);

  const handleRecordToggle = async () => {
    if (isRecording) {
      mediaRecorderRef.current?.stop();
      return;
    }

    setAudioUrl(null);
    chunksRef.current = [];
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        setIsRecording(false);
        stream.getTracks().forEach((track) => track.stop());
      };

      recorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Unable to access microphone", error);
    }
  };

  const openConfirm = (title: string, description: string, onConfirm: () => void) => {
    setConfirmState({ open: true, title, description, onConfirm });
  };

  const handleConfirmClose = () => {
    setConfirmState((prev) => ({ ...prev, open: false }));
  };

  const handleStartNew = () => {
    const start = () => {
      setAudioUrl(null);
      if (!isRecording) {
        void handleRecordToggle();
      }
    };

    if (audioUrl) {
      openConfirm(
        "Start a new recording?",
        "Your current recording will be replaced. Continue?",
        start
      );
      return;
    }

    start();
  };

  const handleUploadClick = () => {
    const proceed = () => fileInputRef.current?.click();
    if (audioUrl) {
      openConfirm(
        "Upload a recording?",
        "This will replace your current recording. Continue?",
        proceed
      );
      return;
    }
    proceed();
  };

  const handleUploadChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setAudioUrl(url);
  };

  return (
    <AppShell title="Start Consultation" subtitle="" active="consultation">
      <PageRoot>
        <Grid>
          <Panel>
            <Stack spacing={2} >
              <Stack direction="row" spacing={1} alignItems="center">
                <AutoAwesomeOutlinedIcon fontSize="small" />
                <Typography variant="subtitle1" fontWeight={700}>
                  AI Signals
                </Typography>
              </Stack>
              <AssistCard>
                <Stack spacing={1}>
                  <Typography variant="body2" color="text.secondary">
                    Listening for key details
                  </Typography>
                  <Typography variant="body1" fontWeight={600}>
                    Symptoms, vitals, meds, timelines
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    <StatChip label="HPI cues" />
                    <StatChip label="Dx hints" />
                  </Stack>
                </Stack>
              </AssistCard>
              <AssistCard>
                <Stack spacing={1}>
                  <Typography variant="body2" color="text.secondary">
                    Auto-structure
                  </Typography>
                  <Typography variant="body1" fontWeight={600}>
                    SOAP sections will draft live
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Updates every 20 seconds while you speak
                  </Typography>
                </Stack>
              </AssistCard>
            </Stack>
          </Panel>

          <CenterPanel>
            <Halo />
            <Stack spacing={2}>
              <Stack spacing={1} alignItems="center">
                <Title variant="h3">Start a New Consultation</Title>
                <Subtitle variant="body1" color="text.secondary" sx={{ textAlign: "center" }}>
                  Dictate the encounter as usual. We organize key clinical details into a
                  structured note for review.
                </Subtitle>
              </Stack>

              <SpeakerRing>
                <SpeakerCore recording={isRecording}>
                  <MicNoneOutlinedIcon fontSize="large" />
                </SpeakerCore>
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    display: "grid",
                    placeItems: "center",
                    transform: "translateY(64px)"
                  }}
                >
                  <PulseDot recording={isRecording} />
                </Box>
              </SpeakerRing>

              <Stack spacing={1.5} alignItems="center">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="audio/*"
                  style={{ display: "none" }}
                  onChange={handleUploadChange}
                />
                {isRecording || !audioUrl ? (
                  <PrimaryButton
                    variant="contained"
                    startIcon={<GraphicEqOutlinedIcon />}
                    onClick={handleRecordToggle}
                  >
                    {isRecording ? "Stop Recording" : "Start Recording"}
                  </PrimaryButton>
                ) : (
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
                    <PrimaryButton variant="contained" onClick={handleStartNew}>
                      Start New Recording
                    </PrimaryButton>
                    <SecondaryButton variant="outlined" onClick={handleUploadClick}>
                      Upload Recording
                    </SecondaryButton>
                  </Stack>
                )}
                {audioUrl ? (
                  <Stack spacing={1.5} alignItems="center" sx={{ width: "100%", maxWidth: 420 }}>
                    <audio src={audioUrl} controls style={{ width: "100%" }} />
                  </Stack>
                ) : null}
              </Stack>

              <Divider />

              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} justifyContent="center">
                <Chip label="Structured encounter note" />
                <Chip label="SOAP-ready sections" />
                <Chip label="Clinical cue highlights" />
              </Stack>
            </Stack>
          </CenterPanel>

          <Panel>
            <Stack spacing={2}>
              <Stack direction="row" spacing={1} alignItems="center">
                <AutoAwesomeOutlinedIcon fontSize="small" />
                <Typography variant="subtitle1" fontWeight={700}>
                  Draft Preview
                </Typography>
              </Stack>
              <AssistCard>
                <Typography variant="overline" color="text.secondary">
                  Assessment
                </Typography>
                <Typography variant="body1" fontWeight={600}>
                  AI draft will appear here
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Continue speaking to enrich this section.
                </Typography>
              </AssistCard>
              <AssistCard>
                <Typography variant="overline" color="text.secondary">
                  Plan
                </Typography>
                <Typography variant="body1" fontWeight={600}>
                  Suggested next steps
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Based on encounter context and labs.
                </Typography>
              </AssistCard>
            </Stack>
          </Panel>
        </Grid>
        <ConfirmDialog
          open={confirmState.open}
          title={confirmState.title}
          description={confirmState.description}
          confirmLabel="Confirm"
          cancelLabel="Cancel"
          onCancel={handleConfirmClose}
          onConfirm={() => {
            confirmState.onConfirm();
            handleConfirmClose();
          }}
        />
      </PageRoot>
    </AppShell>
  );
}
