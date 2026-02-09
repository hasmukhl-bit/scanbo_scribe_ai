"use client";

import * as React from "react";
import {
  Box,
  Button,
  Card,
  Chip,
  Container,
  Stack,
  Typography
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import GraphicEqOutlinedIcon from "@mui/icons-material/GraphicEqOutlined";
import { apiGet, apiPost } from "@/lib/api";

const PageRoot = styled("main")(() => ({
  width: "100%"
}));

const Background = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
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
  padding: theme.spacing(6, 3)
}));

const ContentWrap = styled(Box)(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(3),
  alignItems: "center"
}));

const HeaderRow = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  position: "fixed",
  top: theme.spacing(2),
  left: theme.spacing(3),
  right: theme.spacing(3),
  zIndex: 1
}));

const BrandRow = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1.5)
}));

const Logo = styled("img")(() => ({
  width: 72,
  height: 72
}));

const CenterPanel = styled(Card)(({ theme }) => ({
  textAlign: "center",
  borderRadius: 18,
  padding: theme.spacing(4),
  backgroundColor: alpha(theme.palette.background.paper, 0.95),
  boxShadow: theme.shadows[3],
  border: "none"
}));

const Title = styled(Typography)(() => ({
  fontWeight: 700,
  letterSpacing: -0.2
}));

const LandingTitle = styled(Typography)(() => ({
  fontWeight: 700,
  letterSpacing: -0.3
}));

const Subtitle = styled(Typography)(() => ({
  maxWidth: 560,
  margin: "0 auto",
  textAlign: "center"
}));

const WaveformCard = styled(Box)(({ theme }) => ({
  width: 320,
  height: 180,
  borderRadius: 24,
  margin: "18px auto 16px",
  position: "relative",
  overflow: "hidden",
  background: `linear-gradient(135deg, ${alpha(
    theme.palette.primary.main,
    0.12
  )}, ${alpha(theme.palette.secondary.main, 0.1)} 60%, ${alpha(
    theme.palette.background.paper,
    0.9
  )})`,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.18)}`,
  boxShadow: theme.shadows[2],
  display: "grid",
  placeItems: "center"
}));

const WaveGlow = styled(Box)(({ theme }) => ({
  position: "absolute",
  inset: -40,
  background: `radial-gradient(closest-side, ${alpha(
    theme.palette.primary.main,
    0.18
  )}, transparent 70%)`,
  pointerEvents: "none"
}));

const WaveRow = styled(Box, {
  shouldForwardProp: (prop) => prop !== "recording"
})<{ recording: boolean }>(({ theme, recording }) => ({
  display: "flex",
  gap: 6,
  width: "85%",
  height: 70,
  alignItems: "center",
  justifyContent: "center",
  flexWrap: "nowrap",
  filter: recording ? "drop-shadow(0 0 10px rgba(56, 189, 248, 0.35))" : "none"
}));

const WaveBar = styled(Box, {
  shouldForwardProp: (prop) => prop !== "recording" && prop !== "delay"
})<{ recording: boolean; delay: number }>(({ theme, recording, delay }) => ({
  width: "100%",
  borderRadius: 999,
  background: `linear-gradient(180deg, ${alpha(
    theme.palette.primary.main,
    0.9
  )}, ${alpha(theme.palette.secondary.main, 0.6)})`,
  height: 10,
  opacity: recording ? 1 : 0.35,
  animation: recording ? `waveBounce 1.6s ${delay}ms ease-in-out infinite` : "none",
  "@keyframes waveBounce": {
    "0%, 100%": { height: 10 },
    "50%": { height: 58 }
  }
}));

const VoiceLabel = styled(Typography)(({ theme }) => ({
  fontSize: "0.7rem",
  letterSpacing: 1.2,
  textTransform: "uppercase",
  color: alpha(theme.palette.text.primary, 0.55)
}));

const PrimaryButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  fontWeight: 600,
  borderRadius: 12,
  padding: theme.spacing(1.2, 3)
}));

const MetricsRow = styled(Box)(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(2),
  marginTop: theme.spacing(4),
  gridTemplateColumns: "1fr",
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "repeat(3, 1fr)"
  }
}));

const MetricCard = styled(Box)(({ theme }) => ({
  borderRadius: 16,
  padding: theme.spacing(2.5),
  backgroundColor: alpha(theme.palette.background.paper, 0.9),
  boxShadow: theme.shadows[1],
  textAlign: "center"
}));

export default function LandingPage() {
  const [attemptsUsed, setAttemptsUsed] = React.useState(0);
  const [limitError, setLimitError] = React.useState("");
  const [showLimitError, setShowLimitError] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [isRecording, setIsRecording] = React.useState(false);
  const [audioUrl, setAudioUrl] = React.useState<string | null>(null);
  const mediaRecorderRef = React.useRef<MediaRecorder | null>(null);
  const chunksRef = React.useRef<Blob[]>([]);

  React.useEffect(() => {
    const load = async () => {
      try {
        const attempts = await apiGet<{ id: number }[]>("/guestAttempts");
        setAttemptsUsed(attempts.length);
      } catch (error) {
        console.error("Failed to load attempts", error);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const attemptsRemaining = Math.max(10 - attemptsUsed, 0);

  const handleStartRecording = async () => {
    if (isRecording) {
      mediaRecorderRef.current?.stop();
      return;
    }

    if (attemptsRemaining <= 0) {
      setLimitError("Limit reached. Please log in to continue.");
      setShowLimitError(true);
      return;
    }

    setLimitError("");
    setShowLimitError(false);
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

      recorder.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        setIsRecording(false);
        stream.getTracks().forEach((track) => track.stop());

        try {
          await apiPost("/guestAttempts", { createdAt: new Date().toISOString() });
          setAttemptsUsed((prev) => prev + 1);
          setLimitError("");
          setShowLimitError(false);
        } catch (error) {
          console.error("Failed to record attempt", error);
        }
      };

      recorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Unable to access microphone", error);
    }
  };

  return (
    <PageRoot>
      <Background>
        <Container maxWidth="lg">
          <ContentWrap>
            <HeaderRow>
              <BrandRow>
                <Logo src="/scanbo-logo.svg" alt="Scanbo logo" />
              </BrandRow>
              <Button variant="contained" size="large" href="/login-password">
                Log in
              </Button>
            </HeaderRow>

            <Stack spacing={1.5} alignItems="center">
              <Typography variant="overline" letterSpacing={2} color="primary" fontWeight={700}>
                Scanbo Scribe AI
              </Typography>
              <LandingTitle variant="h3" textAlign="center">
                Turn clinical conversations into structured notes in minutes
              </LandingTitle>
              <Typography variant="body1" color="text.secondary" textAlign="center">
                Built for clinicians. Capture the encounter, organize key findings, and
                generate SOAP-ready documentation with less after-hours work.
              </Typography>
            </Stack>

            <CenterPanel>
              <Stack spacing={2} alignItems="center">
                <Title variant="h3">Start a New Consultation</Title>
                <Subtitle variant="body1" color="text.secondary">
                  Dictate the encounter as usual. We organize key clinical details into a
                  structured note for review.
                </Subtitle>

                <WaveformCard>
                  <WaveGlow />
                  <Stack spacing={1.5} alignItems="center" sx={{ width: "100%", zIndex: 1 }}>
                    <WaveRow recording={isRecording}>
                      {Array.from({ length: 20 }).map((_, index) => (
                        <WaveBar
                          key={`wave-${index}`}
                          recording={isRecording}
                          delay={index * 55}
                        />
                      ))}
                    </WaveRow>
                  </Stack>
                </WaveformCard>

                <PrimaryButton
                  variant="contained"
                  startIcon={<GraphicEqOutlinedIcon />}
                  onClick={handleStartRecording}
                  disabled={loading}
                >
                  {isRecording ? "Stop Recording" : "Start Recording"}
                </PrimaryButton>
                <Stack spacing={0.5} alignItems="center">
                  <Typography variant="caption" color="text.secondary">
                    {attemptsRemaining} of 10 free recordings left
                  </Typography>
                  {attemptsRemaining <= 0 && showLimitError ? (
                    <Typography variant="caption" color="error">
                      {limitError || "Limit reached. Please log in to continue."}
                    </Typography>
                  ) : null}
                </Stack>
                {audioUrl ? (
                  <Box sx={{ width: "100%", maxWidth: 420 }}>
                    <audio src={audioUrl} controls style={{ width: "100%" }} />
                  </Box>
                ) : null}

                <Box sx={{ width: "100%", height: 1, backgroundColor: "divider", mt: 1 }} />

                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={1.5}
                  justifyContent="center"
                >
                  <Chip label="HIPAA-ready workflows" />
                  <Chip label="Structured summaries" />
                  <Chip label="Clinical cue highlights" />
                </Stack>
              </Stack>
            </CenterPanel>

            <MetricsRow>
              <MetricCard>
                <Typography variant="h4" fontWeight={700}>
                  99%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Summary accuracy on curated test sets
                </Typography>
              </MetricCard>
              <MetricCard>
                <Typography variant="h4" fontWeight={700}>
                  2 min
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Average time to first draft
                </Typography>
              </MetricCard>
              <MetricCard>
                <Typography variant="h4" fontWeight={700}>
                  35%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Less after-hours charting reported
                </Typography>
              </MetricCard>
            </MetricsRow>
          </ContentWrap>
        </Container>
      </Background>
    </PageRoot>
  );
}
