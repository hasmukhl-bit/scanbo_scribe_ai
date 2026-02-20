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
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import MicNoneOutlinedIcon from "@mui/icons-material/MicNoneOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";
import AddIcon from "@mui/icons-material/Add";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import XIcon from "@mui/icons-material/X";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import Link from "next/link";
import { apiGet, apiPost } from "@/lib/api";
import ConfirmDialog from "@/components/ConfirmDialog";

const PageRoot = styled("main")(() => ({
  width: "100%"
}));

const Background = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  background: `radial-gradient(900px 520px at 14% 6%, ${alpha(
    "#58b8ff",
    0.18
  )} 0%, transparent 72%), radial-gradient(860px 540px at 84% 22%, ${alpha(
    "#a5dcff",
    0.26
  )} 0%, transparent 72%), linear-gradient(180deg, #f6f9fc 0%, #eaf3f9 60%, #f3f9fd 100%)`,
  paddingBottom: 0
}));

const TopBar = styled(Box)(({ theme }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  zIndex: 20,
  padding: theme.spacing(2, 2.5, 0),
  boxSizing: "border-box"
}));

const TopBarInner = styled(Box)(({ theme }) => ({
  maxWidth: 1400,
  margin: "0 auto",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: theme.spacing(3),
  padding: theme.spacing(1.8, 2.8),
  borderRadius: 20,
  backgroundColor: alpha("#ffffff", 0.95),
  boxShadow: "0 12px 40px rgba(31, 85, 132, 0.12)",
  border: `1px solid ${alpha("#86abd1", 0.18)}`
}));

const BrandRow = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1.2)
}));

const NavLinks = styled(Stack)(({ theme }) => ({
  display: "none",
  alignItems: "center",
  gap: theme.spacing(3.5),
  [theme.breakpoints.up("md")]: {
    display: "flex",
    flexDirection: "row"
  }
}));

const NavAnchor = styled("a", {
  shouldForwardProp: (prop) => prop !== "active"
})<{ active?: boolean }>(({ active }) => ({
  color: active ? "#1172BA" : "#1f2937",
  textDecoration: "none",
  fontSize: "0.98rem",
  fontWeight: active ? 700 : 500,
  position: "relative",
  transition: "color 0.2s ease",
  "&::after": {
    content: '""',
    position: "absolute",
    left: 0,
    bottom: -6,
    width: active ? "100%" : 0,
    height: 2,
    backgroundColor: "#1172BA",
    transition: "width 0.2s ease"
  },
  "&:hover": {
    color: "#1172BA"
  },
  "&:hover::after": {
    width: "100%"
  }
}));

const Logo = styled("img")(() => ({
  width: 42,
  height: 42
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
  padding: theme.spacing(15, 0, 4),
  position: "relative",
  zIndex: 1,
  [theme.breakpoints.down("sm")]: {
    paddingTop: theme.spacing(13)
  }
}));

const HeroGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(4),
  gridTemplateColumns: "1fr",
  alignItems: "center",
  justifyItems: "stretch",
  position: "relative",
  zIndex: 1,
  pointerEvents: "auto",
  [theme.breakpoints.up("lg")]: {
    gridTemplateColumns: "1fr 1fr",
    gap: theme.spacing(6)
  }
}));

const HeroTitle = styled(Typography)(() => ({
  fontFamily: "'Playfair Display', 'Times New Roman', serif",
  fontWeight: 700,
  letterSpacing: -1.1,
  lineHeight: 1.03,
  fontSize: "clamp(2.55rem, 5.3vw, 5rem)",
  color: "#0f2238",
  maxWidth: 640
}));

const HeroLead = styled(Typography)(() => ({
  maxWidth: 640,
  color: "#5f6f82",
  lineHeight: 1.55
}));

const BenefitRow = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  gap: theme.spacing(1.5),
  flexWrap: "wrap",
  justifyContent: "flex-start"
}));

const BenefitPill = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0.85, 1.9),
  borderRadius: 999,
  backgroundColor: alpha("#f9f7de", 0.95),
  color: "#1e6cc4",
  border: `1px solid ${alpha("#d0c56e", 0.55)}`,
  fontWeight: 700,
  fontSize: "0.95rem"
}));

const StatRow = styled(Box)(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(3),
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  width: "100%",
  maxWidth: 620,
  [theme.breakpoints.up("sm")]: {
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))"
  }
}));

const StatCard = styled(Box)(({ theme }) => ({
  textAlign: "left"
}));

const HeroCard = styled(Card)(({ theme }) => ({
  borderRadius: 28,
  padding: theme.spacing(4),
  background: `linear-gradient(120deg, ${alpha("#ffffff", 0.7)} 0%, ${alpha("#d9edfa", 0.82)} 100%)`,
  boxShadow: "0 26px 64px rgba(36, 93, 141, 0.16)",
  border: `1px solid ${alpha("#90b8dd", 0.26)}`,
  position: "relative",
  zIndex: 1,
  pointerEvents: "auto"
}));

const HeroPanel = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: 620,
  borderRadius: 24,
  padding: theme.spacing(3.5),
  backgroundColor: alpha(theme.palette.background.paper, 0.9),
  border: `1px solid ${alpha(theme.palette.text.primary, 0.06)}`,
  boxShadow: "0 24px 50px rgba(15, 23, 42, 0.08)"
}));

const StepList = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(2),
  marginTop: theme.spacing(2)
}));

const StepItem = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "32px 1fr",
  gap: theme.spacing(1.5),
  alignItems: "center",
  padding: theme.spacing(1.5),
  borderRadius: 16,
  backgroundColor: alpha(theme.palette.primary.main, 0.06),
  border: `1px solid ${alpha(theme.palette.primary.main, 0.12)}`
}));

const StepIndex = styled(Box)(({ theme }) => ({
  width: 32,
  height: 32,
  borderRadius: 10,
  display: "grid",
  placeItems: "center",
  fontWeight: 700,
  color: theme.palette.primary.main,
  backgroundColor: alpha(theme.palette.primary.main, 0.15)
}));

const LimitBadge = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(1.2, 1.6),
  borderRadius: 14,
  backgroundColor: alpha(theme.palette.secondary.main, 0.12),
  color: theme.palette.text.primary,
  fontWeight: 600
}));

const PdfCard = styled(Box)(({ theme }) => ({
  width: "100%",
  borderRadius: 16,
  padding: theme.spacing(1.8),
  backgroundColor: alpha(theme.palette.primary.main, 0.08),
  border: `1px dashed ${alpha(theme.palette.primary.main, 0.35)}`,
  display: "grid",
  gap: theme.spacing(1)
}));

const HighlightBand = styled(Box)(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing(3),
  scrollMarginTop: theme.spacing(16),
  borderRadius: 28,
  padding: theme.spacing(3),
  background: `linear-gradient(180deg, ${alpha(theme.palette.primary.main, 0.08)} 0%, rgba(255,255,255,0.85) 100%)`,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.12)}`
}));

const HighlightGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(2),
  gridTemplateColumns: "1fr",
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "repeat(3, 1fr)"
  }
}));

const HighlightCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2.5),
  borderRadius: 18,
  backgroundColor: "rgba(255,255,255,0.92)",
  border: `1px solid ${alpha(theme.palette.text.primary, 0.06)}`,
  boxShadow: "0 12px 24px rgba(15, 23, 42, 0.08)"
}));

const TestimonialTrack = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  overflow: "hidden",
  padding: theme.spacing(1, 0)
}));

const TestimonialRow = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(3),
  width: "max-content",
  animation: "testimonialScroll 35s linear infinite",
  "@keyframes testimonialScroll": {
    "0%": { transform: "translateX(0)" },
    "100%": { transform: "translateX(-50%)" }
  },
  "&:hover": {
    animationPlayState: "paused"
  }
}));

const TestimonialCard = styled(Box)(({ theme }) => ({
  minWidth: 360,
  maxWidth: 420,
  padding: theme.spacing(3),
  borderRadius: 24,
  backgroundColor: alpha(theme.palette.background.paper, 0.95),
  border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
  boxShadow: "0 20px 45px rgba(15, 23, 42, 0.1)",
  display: "grid",
  gap: theme.spacing(2)
}));

const TestimonialHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2)
}));

const AvatarCircle = styled(Box)(({ theme }) => ({
  width: 56,
  height: 56,
  borderRadius: "50%",
  display: "grid",
  placeItems: "center",
  fontWeight: 700,
  color: theme.palette.primary.main,
  background: alpha(theme.palette.primary.main, 0.12),
  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`
}));

const RatingRow = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(0.5),
  color: theme.palette.warning.main
}));

const WaveformCard = styled(Box)(({ theme }) => ({
  width: "100%",
  minHeight: 230,
  borderRadius: 20,
  margin: "16px auto",
  position: "relative",
  overflow: "hidden",
  background: "linear-gradient(135deg, #e3f2fd 0%, #f0f8ff 100%)",
  border: "none",
  boxShadow: "none",
  display: "grid",
  placeItems: "center",
  padding: theme.spacing(2)
}));

const SpeakerPulse = styled(Box, {
  shouldForwardProp: (prop) => prop !== "recording"
})<{ recording: boolean }>(({ theme, recording }) => ({
  position: "relative",
  width: 140,
  height: 140,
  borderRadius: "50%",
  display: "grid",
  placeItems: "center",
  background: "linear-gradient(135deg, rgba(95, 189, 235, 0.2) 0%, rgba(14, 85, 117, 0.15) 100%)",
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  animation: recording ? "none" : "heroMicPulse 2s ease-in-out infinite",
  "@keyframes heroMicPulse": {
    "0%, 100%": {
      boxShadow: `0 0 0 0 ${alpha("#5fbdeb", 0.4)}`
    },
    "50%": {
      boxShadow: `0 0 0 20px ${alpha("#5fbdeb", 0)}`
    }
  },
  "@keyframes speakerRipple": {
    "0%": { transform: "scale(0.8)", opacity: 0.7 },
    "100%": { transform: "scale(1.1)", opacity: 0 }
  }
}));

const MicGlyph = styled(Box)(() => ({
  fontSize: 56,
  lineHeight: 1,
  color: "#1172BA",
  userSelect: "none",
  fontFamily: '"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif'
}));

const SpeakerDot = styled(Box)(({ theme }) => ({
  width: 12,
  height: 12,
  borderRadius: "50%",
  background: theme.palette.primary.main,
  position: "absolute",
  bottom: 25,
  left: "50%",
  transform: "translateX(-50%)",
  animation: "heroMicBlink 1.5s ease-in-out infinite",
  "@keyframes heroMicBlink": {
    "0%, 100%": { opacity: 1 },
    "50%": { opacity: 0.3 }
  }
}));

const WaveRow = styled(Box, {
  shouldForwardProp: (prop) => prop !== "recording"
})<{ recording: boolean }>(({ recording }) => ({
  display: "flex",
  gap: 4,
  width: "90%",
  height: 120,
  alignItems: "center",
  justifyContent: "center",
  opacity: recording ? 1 : 0.4
}));

const WaveBar = styled(Box, {
  shouldForwardProp: (prop) => prop !== "recording" && prop !== "delay"
})<{ recording: boolean; delay: number }>(({ theme }) => ({
  width: 4,
  borderRadius: 999,
  height: 12,
  background: alpha(theme.palette.primary.main, 0.9),
  transition: "height 90ms ease",
  willChange: "height"
}));

const PrimaryButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  fontWeight: 700,
  borderRadius: 12,
  padding: theme.spacing(1.35, 3.2),
  minWidth: 190,
  boxShadow: "0 12px 26px rgba(32, 112, 186, 0.26)",
  transition:
    "background-color 260ms ease, box-shadow 260ms ease, filter 260ms ease",
  "&:hover": {
    boxShadow: "0 14px 30px rgba(32, 112, 186, 0.3)",
    filter: "brightness(0.96)"
  },
  "&:active": {
    filter: "brightness(0.92)"
  }
}));

const OutlineButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  fontWeight: 700,
  borderRadius: 12,
  padding: theme.spacing(1.2, 3),
  minWidth: 180,
  transition:
    "background-color 260ms ease, box-shadow 260ms ease, border-color 260ms ease",
  "&:hover": {
    backgroundColor: alpha("#ffffff", 0.98),
    boxShadow: "0 10px 24px rgba(35, 92, 145, 0.16)"
  },
  "&:active": {
    backgroundColor: alpha("#ffffff", 0.9)
  }
}));

const RecordingButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  fontWeight: 600,
  fontSize: "1rem",
  borderRadius: 12,
  padding: theme.spacing(1.25, 3),
  minWidth: 215,
  height: 56,
  boxSizing: "border-box",
  transition: "all 0.3s ease",
  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
  transform: "none",
  "&:hover": {
    transform: "none"
  },
  "&:active": {
    transform: "none"
  },
  "&:focus-visible": {
    transform: "none"
  }
}));

const RecordingPrimaryButton = styled(RecordingButton)(() => ({
  backgroundColor: "#1873bc",
  color: "#ffffff",
  "&:hover": {
    backgroundColor: "#0f64a9",
    transform: "none",
    boxShadow: "0 6px 20px rgba(14, 85, 117, 0.3)"
  }
}));

const RecordingSecondaryButton = styled(RecordingButton)(() => ({
  backgroundColor: "#ffffff",
  color: "#1172BA",
  border: "2px solid rgba(14, 85, 117, 0.2)",
  "&:hover": {
    borderColor: "#1172BA",
    transform: "none",
    backgroundColor: "#ffffff"
  }
}));

const Section = styled(Box)(({ theme }) => ({
  padding: theme.spacing(6, 0, 0),
  scrollMarginTop: theme.spacing(16)
}));

const SectionTitle = styled(Typography)(() => ({
  fontWeight: 700
}));

const AppSection = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(6),
  borderRadius: 24,
  background: "linear-gradient(180deg, #151a22 0%, #0f141b 100%)",
  color: "#e5e7eb",
  padding: theme.spacing(3.5, 4),
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
  maxWidth: 1400
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

const FooterLink = styled(Link)(() => ({
  color: "#cbd5f5",
  textDecoration: "none"
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

const attemptsLimit = 3;

export default function LandingPage() {
  const heroRef = React.useRef<HTMLDivElement | null>(null);
  const [attemptsUsed, setAttemptsUsed] = React.useState(0);
  const [limitError, setLimitError] = React.useState("");
  const [showLimitError, setShowLimitError] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [isRecording, setIsRecording] = React.useState(false);
  const [audioUrl, setAudioUrl] = React.useState<string | null>(null);
  const [statusMessage, setStatusMessage] = React.useState("");
  const [activeNav, setActiveNav] = React.useState("#features");
  const barCount = 58;
  const [levels, setLevels] = React.useState<number[]>(
    Array.from({ length: barCount }, () => 0)
  );
  const [confirmState, setConfirmState] = React.useState<{
    open: boolean;
    title: string;
    description: string;
    onConfirm: () => void;
  }>({
    open: false,
    title: "Confirm action",
    description: "",
    onConfirm: () => {}
  });
  const mediaRecorderRef = React.useRef<MediaRecorder | null>(null);
  const chunksRef = React.useRef<Blob[]>([]);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const audioContextRef = React.useRef<AudioContext | null>(null);
  const analyserRef = React.useRef<AnalyserNode | null>(null);
  const animationRef = React.useRef<number | null>(null);

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

  const attemptsRemaining = Math.max(attemptsLimit - attemptsUsed, 0);

  const openConfirm = (title: string, description: string, onConfirm: () => void) => {
    setConfirmState({ open: true, title, description, onConfirm });
  };

  const handleConfirmClose = () => {
    setConfirmState((prev) => ({ ...prev, open: false }));
  };

  const stopWaveform = React.useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close().catch(() => undefined);
      audioContextRef.current = null;
    }
    analyserRef.current = null;
    setLevels(Array.from({ length: barCount }, () => 0));
  }, []);

  const createDummyPdf = React.useCallback(() => {
    const escapeText = (value: string) =>
      value.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");

    const lines = [
      "ScanboScribe AI Summary (Demo)",
      "Patient-Doctor conversation summary will appear here.",
      "Key findings: cough, sore throat, low-grade fever.",
      "Assessment: Viral upper respiratory infection.",
      "Plan: Rest, hydration, follow-up in 3 days."
    ];

    const contentLines = lines
      .map((line, index) => `${index === 0 ? "" : "0 -24 Td\n"}(${escapeText(line)}) Tj`)
      .join("\n");

    const encoder = new TextEncoder();
    const byteLength = (text: string) => encoder.encode(text).length;
    const content = `BT\n/F1 18 Tf\n72 720 Td\n${contentLines}\nET`;
    const obj1 = "1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj";
    const obj2 = "2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj";
    const obj3 =
      "3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >> endobj";
    const obj4 = `4 0 obj << /Length ${byteLength(content)} >> stream\n${content}\nendstream\nendobj`;
    const obj5 =
      "5 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> endobj";

    const objects = [obj1, obj2, obj3, obj4, obj5];

    let pdf = "%PDF-1.4\n";
    const offsets: number[] = [0];
    objects.forEach((obj) => {
      offsets.push(byteLength(pdf));
      pdf += `${obj}\n`;
    });

    const xrefPosition = byteLength(pdf);
    pdf += `xref\n0 ${objects.length + 1}\n`;
    pdf += "0000000000 65535 f \n";
    for (let i = 1; i < offsets.length; i += 1) {
      pdf += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
    }
    pdf += `trailer << /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefPosition}\n%%EOF`;

    return new Blob([pdf], { type: "application/pdf" });
  }, []);

  const handleStartRecording = async () => {
    setStatusMessage("Requesting microphone access...");
    if (isRecording) {
      openConfirm(
        "Stop recording?",
        "Stop recording and generate the summary PDF?",
        () => {
          mediaRecorderRef.current?.stop();
          setStatusMessage("Recording stopped. Generating summary...");
          stopWaveform();
        }
      );
      return;
    }

    if (attemptsRemaining <= 0) {
      setLimitError("Limit reached. Please log in to continue.");
      setShowLimitError(true);
      setStatusMessage("");
      return;
    }

    if (!navigator.mediaDevices?.getUserMedia) {
      setLimitError("Recording is not supported in this browser.");
      setShowLimitError(true);
      setStatusMessage("");
      return;
    }

    if (typeof window !== "undefined" && !window.isSecureContext) {
      setLimitError("Microphone access requires HTTPS or localhost.");
      setShowLimitError(true);
      setStatusMessage("");
      return;
    }

    setLimitError("");
    setShowLimitError(false);
    setAudioUrl(null);
    chunksRef.current = [];

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioContext = new AudioContext();
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      audioContextRef.current = audioContext;
      analyserRef.current = analyser;

      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      const smoothing = 0.75;
      let smoothedLevels = Array.from({ length: barCount }, () => 0);
      const updateWave = () => {
        if (!analyserRef.current) return;
        analyserRef.current.getByteTimeDomainData(dataArray);
        const nextLevels = Array.from({ length: barCount }, (_, index) => {
          const sampleIndex = Math.floor((index / barCount) * dataArray.length);
          const value = Math.abs(dataArray[sampleIndex] - 128) / 128;
          return Math.min(1, value * 2.5);
        });
        smoothedLevels = smoothedLevels.map(
          (prev, index) => prev * smoothing + nextLevels[index] * (1 - smoothing)
        );
        setLevels(smoothedLevels);
        animationRef.current = requestAnimationFrame(updateWave);
      };
      updateWave();

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
        const pdfBlob = createDummyPdf();
        setIsRecording(false);
        const pdfUrl = URL.createObjectURL(pdfBlob);
        const anchor = document.createElement("a");
        anchor.href = pdfUrl;
        anchor.download = "scanboscribe-summary.pdf";
        anchor.click();
        setTimeout(() => URL.revokeObjectURL(pdfUrl), 5000);
        setStatusMessage("Summary downloaded.");
        stream.getTracks().forEach((track) => track.stop());
        stopWaveform();

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
      setStatusMessage("Recording...");
    } catch (error) {
      console.error("Unable to access microphone", error);
      setLimitError("Microphone access was denied. Please allow access and try again.");
      setShowLimitError(true);
      setStatusMessage("");
      stopWaveform();
    }
  };

  const handleUploadClick = () => {
    if (attemptsRemaining <= 0) {
      setLimitError("Limit reached. Please log in to continue.");
      setShowLimitError(true);
      setStatusMessage("");
      return;
    }
    setLimitError("");
    setShowLimitError(false);
    setStatusMessage("");
    fileInputRef.current?.click();
  };

  const processUpload = async (file: File) => {
    try {
      setStatusMessage("Uploading audio...");
      const url = URL.createObjectURL(file);
      setAudioUrl(url);
      const pdfBlob = createDummyPdf();
      const pdfUrl = URL.createObjectURL(pdfBlob);
      const anchor = document.createElement("a");
      anchor.href = pdfUrl;
      anchor.download = "scanboscribe-summary.pdf";
      anchor.click();
      setTimeout(() => URL.revokeObjectURL(pdfUrl), 5000);
      await apiPost("/guestAttempts", { createdAt: new Date().toISOString() });
      setAttemptsUsed((prev) => prev + 1);
      setLimitError("");
      setShowLimitError(false);
      setStatusMessage("Upload complete. Summary downloaded.");
    } catch (error) {
      console.error("Failed to record attempt", error);
      setLimitError("Upload failed. Please try again.");
      setShowLimitError(true);
      setStatusMessage("");
    }
  };

  const handleUploadChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (attemptsRemaining <= 0) {
      setLimitError("Limit reached. Please log in to continue.");
      setShowLimitError(true);
      setStatusMessage("");
      return;
    }

    openConfirm(
      "Generate summary?",
      "Do you want to generate the summary PDF for this audio file?",
      () => processUpload(file)
    );
    event.target.value = "";
  };

  const handleResetAttempts = () => {
    try {
      localStorage.removeItem("scanboScribeData");
    } catch (error) {
      console.error("Failed to reset attempts", error);
    }
    setAttemptsUsed(0);
    setLimitError("");
    setShowLimitError(false);
  };

  const handleNavLinkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const targetId = event.currentTarget.getAttribute("href");
    if (!targetId || !targetId.startsWith("#")) return;

    const target = document.querySelector(targetId);
    if (!target) return;

    event.preventDefault();
    setActiveNav(targetId);
    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  };

  return (
    <PageRoot>
      <Background>
        <TopBar>
          <TopBarInner>
            <BrandRow>
              <Logo src="/scanbo-logo.svg" alt="Scanbo logo" />
              <Typography
                variant="h5"
                sx={{
                  fontFamily: "'Playfair Display', 'Times New Roman', serif",
                  fontWeight: 700,
                  color: "#1f70ba",
                  fontSize: { xs: "1.2rem", sm: "2rem" }
                }}
              >
                Scanbo Scribe AI
              </Typography>
            </BrandRow>
            <NavLinks>
              <NavAnchor href="#features" active={activeNav === "#features"} onClick={handleNavLinkClick}>
                Features
              </NavAnchor>
              <NavAnchor
                href="#how-it-works"
                active={activeNav === "#how-it-works"}
                onClick={handleNavLinkClick}
              >
                How It Works
              </NavAnchor>
              <NavAnchor
                href="#testimonials"
                active={activeNav === "#testimonials"}
                onClick={handleNavLinkClick}
              >
                Testimonials
              </NavAnchor>
              <NavAnchor href="#faq" active={activeNav === "#faq"} onClick={handleNavLinkClick}>
                FAQ
              </NavAnchor>
              <NavAnchor href="#pricing" active={activeNav === "#pricing"} onClick={handleNavLinkClick}>
                Pricing
              </NavAnchor>
            </NavLinks>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <OutlineButton
                variant="outlined"
                href="/login"
                sx={{ minWidth: { xs: 112, sm: 124 } }}
              >
                Login
              </OutlineButton>
              <PrimaryButton
                variant="contained"
                href="/signup"
                sx={{
                  minWidth: { xs: 168, sm: 186 },
                  backgroundColor: "#1873bc",
                  "&:hover": {
                    backgroundColor: "#0f64a9"
                  }
                }}
              >
                SignUp - It&apos;s Free
              </PrimaryButton>
            </Stack>
          </TopBarInner>
        </TopBar>

        <Container maxWidth={false} sx={{ maxWidth: 1400 }}>
          <Hero id="recording">
            <HeroGrid>
              <Stack spacing={3} sx={{ pt: { xs: 1.5, md: 3 } }}>
                <BenefitRow>
                  <BenefitPill>✨ AI-Powered Medical Documentation</BenefitPill>
                </BenefitRow>
                <HeroTitle>
                  More Time for{" "}
                  <Box component="span" sx={{ color: "#2d8fd5" }}>
                    Patients
                  </Box>
                  , Less Time on{" "}
                  <Box component="span" sx={{ color: "#2d8fd5" }}>
                    Paperwork
                  </Box>
                </HeroTitle>
                <HeroLead variant="h6" fontWeight={400}>
                  Scanbo Scribe AI transforms doctor-patient conversations into comprehensive
                  medical notes instantly. Powered by advanced AI, we help clinicians save up to 3
                  hours daily on documentation.
                </HeroLead>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={1.8}>
                  <PrimaryButton
                    variant="contained"
                    href="/login"
                    sx={{
                      backgroundColor: "#1873bc",
                      "&:hover": {
                        backgroundColor: "#0f64a9"
                      }
                    }}
                  >
                    Get Started Free
                  </PrimaryButton>
                  <OutlineButton
                    variant="outlined"
                    href="#how-it-works"
                    sx={{
                      borderColor: "#1873bc",
                      color: "#1873bc",
                      backgroundColor: alpha("#ffffff", 0.9)
                    }}
                  >
                    Watch Demo
                  </OutlineButton>
                </Stack>
                <Divider sx={{ borderColor: alpha("#7ea2c7", 0.34), maxWidth: 620 }} />
                <StatRow>
                  <StatCard>
                    <Typography variant="h3" sx={{ color: "#1873bc", fontWeight: 700 }}>
                      3hrs
                    </Typography>
                    <Typography variant="h6" sx={{ color: "#5f6f82", fontWeight: 400 }}>
                      Saved Daily
                    </Typography>
                  </StatCard>
                  <StatCard>
                    <Typography variant="h3" sx={{ color: "#1873bc", fontWeight: 700 }}>
                      99%
                    </Typography>
                    <Typography variant="h6" sx={{ color: "#5f6f82", fontWeight: 400 }}>
                      Accuracy
                    </Typography>
                  </StatCard>
                  <StatCard>
                    <Typography variant="h3" sx={{ color: "#1873bc", fontWeight: 700 }}>
                      5k+
                    </Typography>
                    <Typography variant="h6" sx={{ color: "#5f6f82", fontWeight: 400 }}>
                      Clinicians
                    </Typography>
                  </StatCard>
                </StatRow>
              </Stack>

              <HeroCard ref={heroRef} sx={{ width: "100%", maxWidth: 620 }}>
                <Stack sx={{ height: "100%" }} justifyContent="space-between" spacing={2.5}>
                  <Stack spacing={1.4} alignItems="center">
                    <Typography
                      variant="h3"
                      sx={{ fontWeight: 700, color: "#0f2238", textAlign: "center", mb: 0.8 }}
                    >
                      We write the notes while you see the patient.
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{ color: "#5f6f82", textAlign: "center", fontWeight: 400 }}
                    >
                      Upload or record your patient-doctor conversation. We generate a PDF summary
                      with key findings, assessment, and plan.
                    </Typography>
                  </Stack>

                  <Stack spacing={2.2} alignItems="center" sx={{ flex: 1, justifyContent: "center" }}>
                    <WaveformCard>
                      {isRecording ? (
                        <WaveRow recording={isRecording}>
                          {Array.from({ length: barCount }).map((_, index) => {
                            return (
                              <WaveBar
                                key={`wave-${index}`}
                                recording={isRecording}
                                delay={index * 25}
                                style={{
                                  height: 10 + levels[index] * 90
                                }}
                              />
                            );
                          })}
                        </WaveRow>
                      ) : (
                        <SpeakerPulse recording={isRecording}>
                          <MicGlyph component="span" aria-hidden>
                            🎙️
                          </MicGlyph>
                          <SpeakerDot />
                        </SpeakerPulse>
                      )}
                    </WaveformCard>
                  </Stack>

                  <Stack spacing={1.5} alignItems="center">
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                    <RecordingPrimaryButton
                      variant="contained"
                      href="/login"
                      startIcon={
                        <Box
                          component="svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M19 10V12C19 15.866 15.866 19 12 19M5 10V12C5 15.866 8.13401 19 12 19M12 19V23M8 23H16M12 15C10.3431 15 9 13.6569 9 12V5C9 3.34315 10.3431 2 12 2C13.6569 2 15 3.34315 15 5V12C15 13.6569 13.6569 15 12 15Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </Box>
                      }
                    >
                      Start Recording
                    </RecordingPrimaryButton>
                    <RecordingSecondaryButton
                      variant="outlined"
                      href="/login"
                      startIcon={
                        <Box
                          component="svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M7 18C7 18.5523 7.44772 19 8 19H16C16.5523 19 17 18.5523 17 18V10H7V18Z" stroke="currentColor" strokeWidth="2" />
                          <path d="M17 6L17 6C17.9319 6.19904 18.7645 6.70487 19.3792 7.43259C19.9939 8.16031 20.3553 9.06612 20.4098 10.0099L21 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                          <path d="M7 6L7 6C6.06812 6.19904 5.23549 6.70487 4.62079 7.43259C4.00609 8.16031 3.64467 9.06612 3.59016 10.0099L3 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                          <path d="M12 3V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </Box>
                      }
                    >
                      Upload Audio
                    </RecordingSecondaryButton>
                    </Stack>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="audio/*"
                      style={{ display: "none" }}
                      onChange={handleUploadChange}
                    />

                    <Typography variant="subtitle1" sx={{ color: "#5f6f82", textAlign: "center" }}>
                      Free trial includes 3 uploads • No credit card required
                    </Typography>
                    {statusMessage ? (
                      <Typography variant="caption" color="text.secondary">
                        {statusMessage}
                      </Typography>
                    ) : null}
                    {showLimitError ? (
                      <Typography variant="caption" color="error">
                        {limitError || "Limit reached. Please log in to continue."}
                      </Typography>
                    ) : null}
                  </Stack>
                </Stack>
              </HeroCard>
            </HeroGrid>
          </Hero>

          <HighlightBand id="features">
            <Stack spacing={1} alignItems="center" textAlign="center" sx={{ mb: 2 }}>
              <Typography variant="overline" letterSpacing={2} color="primary" fontWeight={700}>
                Built for clinicians
              </Typography>
              <Typography variant="h5" fontWeight={700}>
                Turn conversations into compliant documentation
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Accurate summaries, faster approvals, and less after‑hours charting.
              </Typography>
            </Stack>
            <HighlightGrid>
              <HighlightCard>
                <Typography variant="subtitle1" fontWeight={700} gutterBottom>
                  Structured summary
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Clear Assessment and Plan sections generated from the encounter.
                </Typography>
              </HighlightCard>
              <HighlightCard>
                <Typography variant="subtitle1" fontWeight={700} gutterBottom>
                  Clinical cue highlights
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Key vitals, meds, and timelines surfaced for quick review.
                </Typography>
              </HighlightCard>
              <HighlightCard>
                <Typography variant="subtitle1" fontWeight={700} gutterBottom>
                  Claim‑ready notes
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Reduce errors and delays with consistent, complete documentation.
                </Typography>
              </HighlightCard>
            </HighlightGrid>
          </HighlightBand>

          <Section id="download-app">
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

          <Section id="how-it-works">
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

          <Section id="pricing">
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

          <Section id="testimonials">
            <Stack spacing={2} alignItems="center" textAlign="center">
              <SectionTitle variant="h4">What clinicians say</SectionTitle>
              <Typography variant="body2" color="text.secondary">
                Real feedback from doctors using ScanboScribe AI in daily practice.
              </Typography>
              <TestimonialTrack>
                <TestimonialRow>
                  {[
                    {
                      initials: "DR",
                      name: "Dr. Riya Menon",
                      role: "Internal Medicine · Bengaluru",
                      quote:
                        "ScanboScribe AI cut my after‑hours charting in half. The summaries are clean and SOAP‑ready."
                    },
                    {
                      initials: "AK",
                      name: "Dr. Arjun Khanna",
                      role: "Family Medicine · Pune",
                      quote:
                        "It captures the encounter accurately and organizes key findings with minimal edits."
                    },
                    {
                      initials: "MS",
                      name: "Dr. Meera Shah",
                      role: "Cardiology · Mumbai",
                      quote:
                        "The structured notes and cue highlights save me time and reduce missed details."
                    },
                    {
                      initials: "VK",
                      name: "Dr. Vivek Kumar",
                      role: "Pediatrics · Delhi",
                      quote:
                        "I can focus on patients while ScanboScribe handles documentation in the background."
                    }
                  ].map((item, index) => (
                    <TestimonialCard key={`testimonial-${index}`}>
                      <TestimonialHeader>
                        <AvatarCircle>{item.initials}</AvatarCircle>
                        <Box>
                          <Typography variant="subtitle1" fontWeight={700}>
                            {item.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {item.role}
                          </Typography>
                          <RatingRow>
                            {Array.from({ length: 5 }).map((_, starIndex) => (
                              <StarRoundedIcon key={`star-${index}-${starIndex}`} fontSize="small" />
                            ))}
                          </RatingRow>
                        </Box>
                      </TestimonialHeader>
                      <Typography variant="body1">“{item.quote}”</Typography>
                    </TestimonialCard>
                  ))}
                  {[
                    {
                      initials: "DR",
                      name: "Dr. Riya Menon",
                      role: "Internal Medicine · Bengaluru",
                      quote:
                        "ScanboScribe AI cut my after‑hours charting in half. The summaries are clean and SOAP‑ready."
                    },
                    {
                      initials: "AK",
                      name: "Dr. Arjun Khanna",
                      role: "Family Medicine · Pune",
                      quote:
                        "It captures the encounter accurately and organizes key findings with minimal edits."
                    },
                    {
                      initials: "MS",
                      name: "Dr. Meera Shah",
                      role: "Cardiology · Mumbai",
                      quote:
                        "The structured notes and cue highlights save me time and reduce missed details."
                    },
                    {
                      initials: "VK",
                      name: "Dr. Vivek Kumar",
                      role: "Pediatrics · Delhi",
                      quote:
                        "I can focus on patients while ScanboScribe handles documentation in the background."
                    }
                  ].map((item, index) => (
                    <TestimonialCard key={`testimonial-dup-${index}`}>
                      <TestimonialHeader>
                        <AvatarCircle>{item.initials}</AvatarCircle>
                        <Box>
                          <Typography variant="subtitle1" fontWeight={700}>
                            {item.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {item.role}
                          </Typography>
                          <RatingRow>
                            {Array.from({ length: 5 }).map((_, starIndex) => (
                              <StarRoundedIcon key={`star-dup-${index}-${starIndex}`} fontSize="small" />
                            ))}
                          </RatingRow>
                        </Box>
                      </TestimonialHeader>
                      <Typography variant="body1">“{item.quote}”</Typography>
                    </TestimonialCard>
                  ))}
                </TestimonialRow>
              </TestimonialTrack>
            </Stack>
          </Section>

          <Section id="faq">
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
                    <FooterLink href="/how-it-works">How it works</FooterLink>
                    <FooterLink href="/security">Security</FooterLink>
                    <FooterLink href="/integrations">Integrations</FooterLink>
                    <FooterLink href="/pricing">Pricing</FooterLink>
                  </Stack>
                </Box>

                <Box>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Company
                  </Typography>
                  <Stack spacing={1} sx={{ mt: 1 }}>
                    <FooterLink href="/about">About</FooterLink>
                    <FooterLink href="/announcements">Announcements</FooterLink>
                    <FooterLink href="/careers">Careers</FooterLink>
                    <FooterLink href="/contact">Contact</FooterLink>
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
      <ConfirmDialog
        open={confirmState.open}
        title={confirmState.title}
        description={confirmState.description}
        confirmLabel="Generate"
        cancelLabel="Cancel"
        onCancel={handleConfirmClose}
        onConfirm={() => {
          confirmState.onConfirm();
          handleConfirmClose();
        }}
      />
    </PageRoot>
  );
}
