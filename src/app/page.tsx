"use client";

import * as React from "react";
import {
  Box,
  Button,
  Card,
  Chip,
  Container,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import MicNoneOutlinedIcon from "@mui/icons-material/MicNoneOutlined";
import GraphicEqOutlinedIcon from "@mui/icons-material/GraphicEqOutlined";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";
import AddIcon from "@mui/icons-material/Add";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import XIcon from "@mui/icons-material/X";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import { apiGet, apiPost } from "@/lib/api";

const PageRoot = styled("main")(() => ({
  width: "100%"
}));

const Background = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  background: `radial-gradient(1200px 600px at 15% -10%, ${alpha(
    theme.palette.primary.main,
    0.18
  )}, transparent 60%), radial-gradient(1000px 500px at 90% 10%, ${alpha(
    theme.palette.secondary.main,
    0.18
  )}, transparent 60%), linear-gradient(180deg, ${theme.palette.background.default} 0%, ${alpha(
    theme.palette.primary.light,
    0.06
  )} 100%)`,
  paddingBottom: 0
}));

const TopBar = styled(Box)(({ theme }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  zIndex: 10,
  backdropFilter: "blur(8px)",
  backgroundColor: alpha(theme.palette.background.default, 0.9),
  borderBottom: `1px solid ${alpha(theme.palette.text.primary, 0.08)}`
}));

const TopBarInner = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(1.5, 3)
}));

const BrandRow = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1.5)
}));

const Logo = styled("img")(() => ({
  width: 55,
  height: 55
}));

const CardLogo = styled("img")(() => ({
  width: 64,
  height: 64,
  filter: "drop-shadow(0 4px 12px rgba(15, 23, 42, 0.25))"
}));

const BrandText = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  letterSpacing: 2,
  textTransform: "uppercase",
  color: theme.palette.primary.main
}));

const Hero = styled(Box)(({ theme }) => ({
  padding: theme.spacing(10, 0, 4)
}));

const HeroGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(4),
  gridTemplateColumns: "1fr",
  alignItems: "center",
  justifyItems: "center",
  [theme.breakpoints.up("lg")]: {
    gridTemplateColumns: "1.05fr 0.95fr",
    alignItems: "center",
    justifyItems: "stretch"
  }
}));

const HeroTitle = styled(Typography)(() => ({
  fontWeight: 700,
  letterSpacing: -0.3,
  maxWidth: 720,
  margin: "0 auto"
}));

const HeroLead = styled(Typography)(() => ({
  maxWidth: 720,
  margin: "0 auto"
}));

const BenefitRow = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  gap: theme.spacing(1.5),
  flexWrap: "wrap",
  justifyContent: "center"
}));

const BenefitPill = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0.8, 1.6),
  borderRadius: 999,
  backgroundColor: alpha(theme.palette.primary.main, 0.08),
  color: theme.palette.primary.main,
  fontWeight: 600,
  fontSize: "0.85rem"
}));

const StatRow = styled(Box)(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(2),
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  width: "100%",
  maxWidth: 520,
  margin: "0 auto",
  [theme.breakpoints.up("sm")]: {
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))"
  }
}));

const StatCard = styled(Box)(({ theme }) => ({
  borderRadius: 14,
  padding: theme.spacing(1.5),
  textAlign: "center",
  backgroundColor: alpha(theme.palette.background.paper, 0.85),
  border: `1px solid ${alpha(theme.palette.text.primary, 0.08)}`
}));

const HeroCard = styled(Card)(({ theme }) => ({
  borderRadius: 20,
  padding: theme.spacing(3),
  backgroundColor: alpha(theme.palette.background.paper, 0.96),
  boxShadow: "none",
  border: "none"
}));

const WaveformCard = styled(Box)(({ theme }) => ({
  width: "100%",
  height: 180,
  borderRadius: 20,
  margin: "16px auto",
  position: "relative",
  overflow: "hidden",
  background: `linear-gradient(135deg, ${alpha(
    theme.palette.primary.main,
    0.12
  )}, ${alpha(theme.palette.secondary.main, 0.1)} 60%, ${alpha(
    theme.palette.background.paper,
    0.9
  )})`,
  border: "none",
  boxShadow: "none",
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

const PrimaryButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  fontWeight: 600,
  borderRadius: 12,
  padding: theme.spacing(1.2, 3)
}));

const OutlineButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  fontWeight: 600,
  borderRadius: 12,
  padding: theme.spacing(1.1, 2.5)
}));

const Section = styled(Box)(({ theme }) => ({
  padding: theme.spacing(6, 0, 0)
}));

const SectionTitle = styled(Typography)(() => ({
  fontWeight: 700
}));

const AppSection = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(6),
  borderRadius: 24,
  background: "linear-gradient(180deg, #151a22 0%, #0f141b 100%)",
  color: "#e5e7eb",
  padding: theme.spacing(5, 4),
  display: "grid",
  gap: theme.spacing(4),
  alignItems: "center",
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "1.1fr 0.9fr"
  }
}));

const PhoneMock = styled(Box)(({ theme }) => ({
  justifySelf: "center",
  width: 260,
  height: 460,
  borderRadius: 28,
  background: "linear-gradient(180deg, #111827 0%, #0b1220 100%)",
  border: "1px solid #2b3648",
  boxShadow: "0 18px 40px rgba(0,0,0,0.35)",
  position: "relative",
  overflow: "hidden"
}));

const PhoneScreen = styled(Box)(() => ({
  position: "absolute",
  inset: 16,
  borderRadius: 20,
  background: "#0b1220",
  border: "1px solid rgba(56,189,248,0.25)",
  overflow: "hidden"
}));

const PhonePreview = styled("img")(() => ({
  width: "100%",
  height: "100%",
  objectFit: "cover"
}));

const StoreButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  fontWeight: 600,
  borderRadius: 12,
  padding: theme.spacing(1.2, 2.5),
  backgroundColor: "#0b0f16",
  color: "#e5e7eb",
  border: "1px solid #2b3648",
  "&:hover": {
    backgroundColor: "#111827"
  }
}));

const QrGrid = styled(Stack)(({ theme }) => ({
  marginTop: theme.spacing(2),
  gap: theme.spacing(2),
  flexDirection: "row",
  flexWrap: "wrap"
}));

const QrCard = styled(Box)(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(1),
  justifyItems: "center",
  padding: theme.spacing(1.5),
  borderRadius: 16,
  backgroundColor: "rgba(15, 23, 42, 0.75)",
  border: "1px solid #283449",
  minWidth: 150
}));

const QrImage = styled("img")(() => ({
  width: 120,
  height: 120,
  borderRadius: 12,
  backgroundColor: "#f8fafc"
}));

const HowGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(3),
  gridTemplateColumns: "1fr",
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "1.1fr 0.9fr"
  }
}));

const StepCard = styled(Box)(({ theme }) => ({
  borderRadius: 16,
  padding: theme.spacing(2.5),
  backgroundColor: alpha(theme.palette.background.paper, 0.96),
  border: `1px solid ${alpha(theme.palette.text.primary, 0.08)}`,
  boxShadow: theme.shadows[1]
}));

const ImagePlaceholder = styled(Box)(({ theme }) => ({
  borderRadius: 20,
  minHeight: 260,
  background: `linear-gradient(135deg, ${alpha(
    theme.palette.primary.main,
    0.08
  )}, ${alpha(theme.palette.secondary.main, 0.1)})`,
  border: `1px solid ${alpha(theme.palette.text.primary, 0.08)}`,
  padding: theme.spacing(3),
  display: "grid",
  gap: theme.spacing(2),
  gridTemplateColumns: "1fr",
  [theme.breakpoints.up("sm")]: {
    gridTemplateColumns: "repeat(2, 1fr)"
  }
}));

const FlowCard = styled(Box)(({ theme }) => ({
  borderRadius: 18,
  backgroundColor: alpha(theme.palette.background.paper, 0.96),
  padding: theme.spacing(2.5),
  boxShadow: theme.shadows[1],
  display: "grid",
  gap: theme.spacing(2),
  justifyItems: "center"
}));

const FlowCircle = styled(Box)(({ theme }) => ({
  width: 140,
  height: 140,
  borderRadius: "50%",
  background: `radial-gradient(circle at center, ${alpha(
    theme.palette.primary.main,
    0.5
  )} 0%, ${alpha(theme.palette.primary.main, 0.2)} 45%, ${alpha(
    theme.palette.primary.main,
    0.08
  )} 100%)`,
  display: "grid",
  placeItems: "center"
}));

const FlowWave = styled(Box)(({ theme }) => ({
  width: "100%",
  height: 90,
  borderRadius: 16,
  backgroundColor: alpha(theme.palette.primary.main, 0.08),
  display: "grid",
  placeItems: "center"
}));

const WaveLine = styled(Box)(({ theme }) => ({
  width: "75%",
  height: 2,
  background: `linear-gradient(90deg, transparent, ${alpha(
    theme.palette.primary.main,
    0.8
  )}, transparent)`
}));

const FlowButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  fontWeight: 600,
  borderRadius: 14,
  padding: theme.spacing(0.8, 2.4),
  fontSize: "0.85rem"
}));

const PricingGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(3),
  gridTemplateColumns: "1fr",
  width: "100%",
  // maxWidth: 1100,
  margin: "0 auto",
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "repeat(3, 1fr)"
  }
}));

const PricingCard = styled(Box)(({ theme }) => ({
  borderRadius: 18,
  padding: theme.spacing(3),
  backgroundColor: alpha(theme.palette.background.paper, 0.96),
  border: `1px solid ${alpha(theme.palette.text.primary, 0.08)}`,
  boxShadow: "0 16px 40px rgba(15, 23, 42, 0.08)",
  transition: "transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease",
  "&:hover": {
    transform: "translateY(-6px)",
    boxShadow: "0 22px 50px rgba(15, 23, 42, 0.18)",
    borderColor: alpha(theme.palette.primary.main, 0.35)
  }
}));

const PricingBadge = styled(Chip)(({ theme }) => ({
  borderRadius: 999,
  fontWeight: 600,
  backgroundColor: alpha(theme.palette.primary.main, 0.12),
  color: theme.palette.primary.main,
  alignSelf: "center"
}));

const PlanTitle = styled(Typography)(() => ({
  fontWeight: 700,
  textAlign: "center"
}));

const PriceText = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  fontSize: "2rem",
  textAlign: "center",
  color: theme.palette.primary.main
}));

const PriceSub = styled(Typography)(() => ({
  textAlign: "center"
}));

const PricingCTA = styled(Button)(({ theme }) => ({
  textTransform: "none",
  fontWeight: 700,
  borderRadius: 999,
  padding: theme.spacing(1.1, 3),
  alignSelf: "center",
  minWidth: 180
}));

const PricingContent = styled(Stack)(() => ({
  alignItems: "center",
  textAlign: "center"
}));

const FeatureList = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(1),
  marginTop: theme.spacing(1),
  alignItems: "center"
}));

const FeatureItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: theme.spacing(1)
}));

const FeatureDot = styled(Box)(({ theme }) => ({
  width: 6,
  height: 6,
  borderRadius: "50%",
  backgroundColor: theme.palette.primary.main
}));

const TrustGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(2),
  gridTemplateColumns: "1fr",
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "repeat(3, 1fr)"
  }
}));

const TrustCard = styled(Box)(({ theme }) => ({
  borderRadius: 16,
  padding: theme.spacing(2.5),
  backgroundColor: alpha(theme.palette.background.paper, 0.96),
  border: `1px solid ${alpha(theme.palette.text.primary, 0.08)}`,
  boxShadow: theme.shadows[1]
}));

const Footer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(6),
  width: "100%",
  background: "linear-gradient(180deg, #0f172a 0%, #0b1220 100%)",
  color: "#e5e7eb"
}));

const FooterInner = styled(Box)(({ theme }) => ({
  width: "100%",
  margin: "0 auto",
  padding: theme.spacing(5, 3, 4),
  maxWidth: 1280
}));

const FooterTop = styled(Box)(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(3),
  gridTemplateColumns: "1fr",
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "1.3fr 1fr 1fr 1.2fr"
  }
}));

const FooterBrandRow = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1.5)
}));

const FooterLogo = styled("img")(() => ({
  width: 40,
  height: 40
}));

const FooterLink = styled(Typography)(() => ({
  color: "#cbd5f5"
}));

const SocialRow = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(1),
  alignItems: "center"
}));

const FooterBar = styled(Box)(({ theme }) => ({
  width: "100%",
  textAlign: "center",
  padding: theme.spacing(2, 0),
  marginTop: theme.spacing(3),
  borderTop: "1px solid #1f2a44",
  color: "#94a3b8"
}));

const FAQList = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(2)
}));

const FAQCard = styled(Accordion)(({ theme }) => ({
  borderRadius: 16,
  backgroundColor: alpha(theme.palette.background.paper, 0.96),
  border: `1px solid ${alpha(theme.palette.text.primary, 0.08)}`,
  boxShadow: "none",
  "&:before": {
    display: "none"
  }
}));

const FAQSummary = styled(AccordionSummary)(({ theme }) => ({
  padding: theme.spacing(1.5, 2),
  "& .MuiAccordionSummary-content": {
    margin: 0
  }
}));

const FAQDetails = styled(AccordionDetails)(({ theme }) => ({
  padding: theme.spacing(0, 2, 2)
}));

const attemptsLimit = 10;

export default function LandingPage() {
  const heroRef = React.useRef<HTMLDivElement | null>(null);
  const [attemptsUsed, setAttemptsUsed] = React.useState(0);
  const [limitError, setLimitError] = React.useState("");
  const [showLimitError, setShowLimitError] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [isRecording, setIsRecording] = React.useState(false);
  const [audioUrl, setAudioUrl] = React.useState<string | null>(null);
  const mediaRecorderRef = React.useRef<MediaRecorder | null>(null);
  const chunksRef = React.useRef<Blob[]>([]);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const [menuAnchor, setMenuAnchor] = React.useState<null | HTMLElement>(null);
  const [showHeaderBrand, setShowHeaderBrand] = React.useState(true);

  const menuOpen = Boolean(menuAnchor);

  React.useEffect(() => {
    const element = heroRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowHeaderBrand(entry.intersectionRatio < 1);
      },
      { threshold: [1] }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

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

  React.useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.style.scrollbarGutter = "stable";
      document.documentElement.style.scrollbarGutter = "stable";
      document.documentElement.style.overflowY = "scroll";
    }
    return () => {
      if (typeof document !== "undefined") {
        document.body.style.scrollbarGutter = "";
        document.documentElement.style.scrollbarGutter = "";
        document.documentElement.style.overflowY = "";
      }
    };
  }, []);

  const attemptsRemaining = Math.max(attemptsLimit - attemptsUsed, 0);

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

  const handleUploadClick = () => {
    if (attemptsRemaining <= 0) {
      setLimitError("Limit reached. Please log in to continue.");
      setShowLimitError(true);
      return;
    }
    fileInputRef.current?.click();
  };

  const handleUploadChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (attemptsRemaining <= 0) {
      setLimitError("Limit reached. Please log in to continue.");
      setShowLimitError(true);
      return;
    }

    try {
      await apiPost("/guestAttempts", { createdAt: new Date().toISOString() });
      setAttemptsUsed((prev) => prev + 1);
      setLimitError("");
      setShowLimitError(false);
    } catch (error) {
      console.error("Failed to record attempt", error);
    }
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  return (
    <PageRoot>
      <Background>
        <TopBar>
          <TopBarInner>
            <BrandRow>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  opacity: showHeaderBrand ? 1 : 0,
                  visibility: showHeaderBrand ? "visible" : "hidden",
                  transition: "opacity 200ms ease"
                }}
              >
                <Logo src="/scanbo-logo.svg" alt="Scanbo logo" />
                <Typography variant="h5" fontWeight={700} textAlign="center">
                  ScanboScribe AI
                </Typography>
              </Box>
            </BrandRow>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <OutlineButton variant="outlined" href="/login-password">
                Login
              </OutlineButton>
              <PrimaryButton variant="contained" href="/login-password">
                Sign up
              </PrimaryButton>
              <IconButton onClick={handleMenuOpen} aria-label="Open menu">
                <MenuIcon />
              </IconButton>
            </Stack>
          </TopBarInner>
        </TopBar>

        <Menu
          anchorEl={menuAnchor}
          open={menuOpen}
          onClose={handleMenuClose}
          disableScrollLock
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <MenuItem onClick={handleMenuClose}>Start New Consult</MenuItem>
          <MenuItem onClick={handleMenuClose}>Upload Recording</MenuItem>
          <MenuItem onClick={handleMenuClose}>Download the App</MenuItem>
          <MenuItem onClick={handleMenuClose}>About Scanbo Scribe AI</MenuItem>
          <MenuItem onClick={handleMenuClose}>Pricing</MenuItem>
          <MenuItem onClick={handleMenuClose}>Support</MenuItem>
        </Menu>

        <Container maxWidth={false} sx={{ maxWidth: 1280 }}>
          <Hero>
            <HeroGrid>
              <Stack spacing={2.5} alignItems={{ xs: "center", lg: "flex-start" }} textAlign={{ xs: "center", lg: "left" }} sx={{ mt: { lg: 1 } }}>
                {/* <Typography variant="overline" letterSpacing={2} color="primary" fontWeight={700}>
                  ScanboScribe AI
                </Typography> */}
                <HeroTitle variant="h3">
                  Turn clinical conversations into structured notes in minutes
                </HeroTitle>
                <HeroLead variant="body1" color="text.secondary">
                  Say goodbye to manual note taking, errors and delays.
                </HeroLead>
                <HeroLead variant="body1" color="text.secondary">
                  With automatic note‑writing and AI‑driven pre‑authentication, simplify complexities
                  and reduce errors to get faster claim approvals.
                </HeroLead>
                <BenefitRow>
                  <BenefitPill>Automatic note‑writing</BenefitPill>
                  <BenefitPill>AI pre‑auth</BenefitPill>
                  <BenefitPill>Faster approvals</BenefitPill>
                </BenefitRow>
                <StatRow>
                  <StatCard>
                    <Typography variant="h6" fontWeight={700}>2 min</Typography>
                    <Typography variant="caption" color="text.secondary">First draft</Typography>
                  </StatCard>
                  <StatCard>
                    <Typography variant="h6" fontWeight={700}>35%</Typography>
                    <Typography variant="caption" color="text.secondary">Less charting</Typography>
                  </StatCard>
                  <StatCard>
                    <Typography variant="h6" fontWeight={700}>99%</Typography>
                    <Typography variant="caption" color="text.secondary">Accuracy</Typography>
                  </StatCard>
                </StatRow>
              </Stack>

              <HeroCard ref={heroRef} sx={{ width: "100%", maxWidth: 560, justifySelf: { lg: "end" } }}>
                <Stack spacing={2} alignItems="center">
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <CardLogo src="/scanbo-logo.svg" alt="Scanbo logo" />
                    <Typography variant="h4" fontWeight={700}>
                      ScanboScribe AI
                    </Typography>
                  </Stack>

                  <WaveformCard>
                    <WaveGlow />
                    <WaveRow recording={isRecording}>
                      {Array.from({ length: 20 }).map((_, index) => (
                        <WaveBar key={`wave-${index}`} recording={isRecording} delay={index * 55} />
                      ))}
                    </WaveRow>
                  </WaveformCard>

                  <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                    <PrimaryButton
                      variant="contained"
                      startIcon={<GraphicEqOutlinedIcon />}
                      onClick={handleStartRecording}
                      disabled={loading}
                    >
                      {isRecording ? "Stop Recording" : "Start Recording"}
                    </PrimaryButton>
                    <OutlineButton variant="outlined" startIcon={<CloudUploadOutlinedIcon />} onClick={handleUploadClick}>
                      Upload Audio
                    </OutlineButton>
                  </Stack>

                  <Typography variant="caption" color="text.secondary">
                    {attemptsRemaining} of {attemptsLimit} free recordings left
                  </Typography>
                  {attemptsRemaining <= 0 && showLimitError ? (
                    <Typography variant="caption" color="error">
                      {limitError || "Limit reached. Please log in to continue."}
                    </Typography>
                  ) : null}

                  {audioUrl ? (
                    <Box sx={{ width: "100%" }}>
                      <audio src={audioUrl} controls style={{ width: "100%" }} />
                    </Box>
                  ) : null}
                </Stack>
              </HeroCard>
            </HeroGrid>
          </Hero>

          <Section>
            <AppSection>
              <Stack spacing={2}>
                <Typography variant="h4" fontWeight={700}>
                  Get ScanboScribe AI on iOS and Android
                </Typography>
                <Typography variant="body2" sx={{ color: "#cbd5f5" }}>
                  Record on the go, sync securely, and generate summaries from any device.
                  Available to verified clinicians.
                </Typography>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                  <StoreButton>Download on the App Store</StoreButton>
                  <StoreButton>Get it on Google Play</StoreButton>
                </Stack>
                <QrGrid>
                  <QrCard>
                    <QrImage src="/qr-ios.svg" alt="iOS app QR code placeholder" />
                    <Typography variant="caption" sx={{ color: "#cbd5f5" }}>
                      Scan for iOS
                    </Typography>
                  </QrCard>
                  <QrCard>
                    <QrImage src="/qr-android.svg" alt="Android app QR code placeholder" />
                    <Typography variant="caption" sx={{ color: "#cbd5f5" }}>
                      Scan for Android
                    </Typography>
                  </QrCard>
                </QrGrid>
              </Stack>
              <PhoneMock>
                <PhoneScreen>
                  <PhonePreview
                    src="/scanbo-scribeai-mobile-ui.png"
                    alt="ScanboScribe AI mobile preview"
                  />
                </PhoneScreen>
              </PhoneMock>
            </AppSection>
          </Section>

          <Section>
            <HowGrid>
              <Stack spacing={2}>
                <SectionTitle variant="h4">How it works</SectionTitle>
                <StepCard>
                  <Typography variant="subtitle1" fontWeight={600}>
                    1. Capture the encounter
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Record patient‑doctor conversations securely with speaker separation.
                  </Typography>
                </StepCard>
                <StepCard>
                  <Typography variant="subtitle1" fontWeight={600}>
                    2. Generate structured notes
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ScanboScribe creates SOAP‑ready summaries with key findings and plans.
                  </Typography>
                </StepCard>
                <StepCard>
                  <Typography variant="subtitle1" fontWeight={600}>
                    3. Review and finalize
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Edit, approve, and export to your clinical workflow in minutes.
                  </Typography>
                </StepCard>
              </Stack>
              <ImagePlaceholder>
                <FlowCard>
                  <FlowCircle>
                    <MicNoneOutlinedIcon color="primary" fontSize="large" />
                  </FlowCircle>
                  <FlowButton variant="outlined">Start Consultation</FlowButton>
                </FlowCard>
                <FlowCard>
                  <FlowWave>
                    <WaveLine />
                  </FlowWave>
                  <FlowButton variant="contained">Generate Summary</FlowButton>
                  <Typography variant="caption" color="text.secondary" textAlign="center">
                    View the structured clinical summary
                  </Typography>
                </FlowCard>
              </ImagePlaceholder>
            </HowGrid>
          </Section>

          <Section>
            <Stack spacing={2} alignItems="center">
              <SectionTitle variant="h4">Pricing plans</SectionTitle>
              <Typography variant="body2" color="text.secondary" textAlign="center">
                Enhance your clinical scribing experience at a price that fits your budget.
              </Typography>
              <PricingGrid>
                <PricingCard>
                  <PricingContent spacing={1.5}>
                    <PlanTitle variant="subtitle1">Starter</PlanTitle>
                    <PriceText>FREE</PriceText>
                    <PriceSub variant="body2" color="text.secondary">
                      No credit card needed
                    </PriceSub>
                    <Typography variant="body2" color="text.secondary" textAlign="center">
                      For trying ScanboScribe AI.
                    </Typography>
                    <FeatureList>
                      <FeatureItem>
                        <FeatureDot />
                        <Typography variant="body2">10 recordings/month</Typography>
                      </FeatureItem>
                      <FeatureItem>
                        <FeatureDot />
                        <Typography variant="body2">Basic summaries</Typography>
                      </FeatureItem>
                      <FeatureItem>
                        <FeatureDot />
                        <Typography variant="body2">Email support</Typography>
                      </FeatureItem>
                    </FeatureList>
                    <PricingCTA variant="contained">Get Started</PricingCTA>
                  </PricingContent>
                </PricingCard>
                <PricingCard>
                  <PricingContent spacing={1.5}>
                    <PlanTitle variant="subtitle1">Clinic</PlanTitle>
                    <PriceText>$49 / month</PriceText>
                    <PriceSub variant="body2" color="text.secondary">
                      $499 billed annually
                    </PriceSub>
                    <Typography variant="body2" color="text.secondary" textAlign="center">
                      For busy practices and teams.
                    </Typography>
                    <FeatureList>
                      <FeatureItem>
                        <FeatureDot />
                        <Typography variant="body2">Unlimited recordings</Typography>
                      </FeatureItem>
                      <FeatureItem>
                        <FeatureDot />
                        <Typography variant="body2">SOAP-ready notes</Typography>
                      </FeatureItem>
                      <FeatureItem>
                        <FeatureDot />
                        <Typography variant="body2">Priority support</Typography>
                      </FeatureItem>
                    </FeatureList>
                    <PricingCTA variant="contained">Start Trial</PricingCTA>
                  </PricingContent>
                </PricingCard>
                <PricingCard>
                  <PricingContent spacing={1.5}>
                    <PlanTitle variant="subtitle1">Enterprise</PlanTitle>
                    <PriceText>Custom</PriceText>
                    <PriceSub variant="body2" color="text.secondary">
                      Dedicated onboarding
                    </PriceSub>
                    <Typography variant="body2" color="text.secondary" textAlign="center">
                      For health systems and large groups.
                    </Typography>
                    <FeatureList>
                      <FeatureItem>
                        <FeatureDot />
                        <Typography variant="body2">SSO & admin controls</Typography>
                      </FeatureItem>
                      <FeatureItem>
                        <FeatureDot />
                        <Typography variant="body2">Custom templates</Typography>
                      </FeatureItem>
                      <FeatureItem>
                        <FeatureDot />
                        <Typography variant="body2">Dedicated success</Typography>
                      </FeatureItem>
                    </FeatureList>
                    <PricingCTA variant="outlined">Contact Sales</PricingCTA>
                  </PricingContent>
                </PricingCard>
              </PricingGrid>
            </Stack>
          </Section>

          <Section>
            <Stack spacing={2} alignItems="center">
              <SectionTitle variant="h4">Security you can trust</SectionTitle>
              <Typography variant="body2" color="text.secondary" textAlign="center">
                Designed for healthcare compliance with data handling aligned to HIPAA and GDPR.
              </Typography>
              <TrustGrid>
                <TrustCard>
                  <Stack spacing={1}>
                    <SecurityOutlinedIcon color="primary" />
                    <Typography variant="subtitle1" fontWeight={600}>
                      HIPAA‑aligned workflows
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Secure handling of PHI with audit trails and access controls.
                    </Typography>
                  </Stack>
                </TrustCard>
                <TrustCard>
                  <Stack spacing={1}>
                    <VerifiedUserOutlinedIcon color="primary" />
                    <Typography variant="subtitle1" fontWeight={600}>
                      GDPR‑ready privacy
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Data minimization, encryption, and retention controls.
                    </Typography>
                  </Stack>
                </TrustCard>
                <TrustCard>
                  <Stack spacing={1}>
                    <GppGoodOutlinedIcon color="primary" />
                    <Typography variant="subtitle1" fontWeight={600}>
                      Clinical‑grade reliability
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Consistent outputs across specialties and templates.
                    </Typography>
                  </Stack>
                </TrustCard>
              </TrustGrid>
            </Stack>
          </Section>

          <Section>
            <Stack spacing={2} alignItems="center">
              <SectionTitle variant="h4">FAQs</SectionTitle>
              <Typography variant="body2" color="text.secondary" textAlign="center">
                Find answers about ScanboScribe AI, privacy, and clinical workflows.
              </Typography>
              <FAQList sx={{ width: "100%"}}>
                <FAQCard>
                  <FAQSummary expandIcon={<AddIcon />}>
                    <Typography variant="subtitle1">What is ScanboScribe AI?</Typography>
                  </FAQSummary>
                  <FAQDetails>
                    <Typography variant="body2" color="text.secondary">
                      ScanboScribe AI transforms recorded encounters into structured summaries and
                      SOAP‑ready notes for clinical review.
                    </Typography>
                  </FAQDetails>
                </FAQCard>
                <FAQCard>
                  <FAQSummary expandIcon={<AddIcon />}>
                    <Typography variant="subtitle1">How does it work?</Typography>
                  </FAQSummary>
                  <FAQDetails>
                    <Typography variant="body2" color="text.secondary">
                      Upload or record audio, and ScanboScribe extracts key findings, assessments,
                      and plans into clinician‑ready formats.
                    </Typography>
                  </FAQDetails>
                </FAQCard>
                <FAQCard>
                  <FAQSummary expandIcon={<AddIcon />}>
                    <Typography variant="subtitle1">Is patient data secure?</Typography>
                  </FAQSummary>
                  <FAQDetails>
                    <Typography variant="body2" color="text.secondary">
                      Yes. Data is encrypted and handled with HIPAA and GDPR aligned practices.
                    </Typography>
                  </FAQDetails>
                </FAQCard>
                <FAQCard>
                  <FAQSummary expandIcon={<AddIcon />}>
                    <Typography variant="subtitle1">Can I customize the note format?</Typography>
                  </FAQSummary>
                  <FAQDetails>
                    <Typography variant="body2" color="text.secondary">
                      Choose SOAP depth, specialty templates, and preferred formatting for your
                      workflow.
                    </Typography>
                  </FAQDetails>
                </FAQCard>
                <FAQCard>
                  <FAQSummary expandIcon={<AddIcon />}>
                    <Typography variant="subtitle1">Do you offer a free trial?</Typography>
                  </FAQSummary>
                  <FAQDetails>
                    <Typography variant="body2" color="text.secondary">
                      Guest users can try limited recordings. Log in to unlock full access.
                    </Typography>
                  </FAQDetails>
                </FAQCard>
              </FAQList>
            </Stack>
          </Section>
        </Container>

          <Footer>
            <FooterInner>
              <FooterTop>
                <Box>
                  <FooterBrandRow>
                    <FooterLogo src="/scanbo-logo.svg" alt="Scanbo logo" />
                    <Typography variant="subtitle1" fontWeight={700}>
                      ScanboScribe AI
                    </Typography>
                  </FooterBrandRow>
                  <Typography variant="body2" sx={{ color: "#b8c2d0", mt: 1 }}>
                    Clinician‑ready summaries for faster, safer documentation.
                  </Typography>
                  <SocialRow sx={{ mt: 2 }}>
                    <IconButton size="small" sx={{ color: "#cbd5f5" }}>
                      <LinkedInIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" sx={{ color: "#cbd5f5" }}>
                      <XIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" sx={{ color: "#cbd5f5" }}>
                      <YouTubeIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" sx={{ color: "#cbd5f5" }}>
                      <InstagramIcon fontSize="small" />
                    </IconButton>
                  </SocialRow>
                </Box>

                <Box>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Product
                  </Typography>
                  <Stack spacing={1} sx={{ mt: 1 }}>
                    <FooterLink variant="body2">How it works</FooterLink>
                    <FooterLink variant="body2">Security</FooterLink>
                    <FooterLink variant="body2">Integrations</FooterLink>
                    <FooterLink variant="body2">Pricing</FooterLink>
                  </Stack>
                </Box>

                <Box>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Company
                  </Typography>
                  <Stack spacing={1} sx={{ mt: 1 }}>
                    <FooterLink variant="body2">About</FooterLink>
                    <FooterLink variant="body2">Announcements</FooterLink>
                    <FooterLink variant="body2">Careers</FooterLink>
                    <FooterLink variant="body2">Contact</FooterLink>
                  </Stack>
                </Box>

                <Box>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Newsletter
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#b8c2d0", mt: 1 }}>
                    Monthly updates on clinical features and templates.
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                    <TextField
                      size="small"
                      placeholder="Email"
                      sx={{
                        flex: 1,
                        backgroundColor: "#111827",
                        borderRadius: 1,
                        input: { color: "#e5e7eb" }
                      }}
                    />
                    <Button variant="contained">Subscribe</Button>
                  </Stack>
                </Box>
              </FooterTop>

              <FooterBar>
                <Typography variant="caption">
                  © 2026 ScanboScribe AI. All rights reserved.
                </Typography>
              </FooterBar>
            </FooterInner>
          </Footer>
      </Background>
    </PageRoot>
  );
}
