"use client";

import * as React from "react";
import { alpha } from "@mui/material/styles";
import {
  Box,
  Chip,
  Divider,
  MenuItem,
  Select,
  Slider,
  Snackbar,
  Alert,
  Stack,
  Switch,
  Tooltip,
  Typography
} from "@mui/material";
import AppShell from "@/components/layout/AppShell";
import AppButton from "@/components/ui/AppButton";
import { useRouter } from "next/navigation";

/* ── Icons ─────────────────────────────────────────────────────────────── */
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import MicNoneRoundedIcon from "@mui/icons-material/MicNoneRounded";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import SubtitlesRoundedIcon from "@mui/icons-material/SubtitlesRounded";
import LocalHospitalRoundedIcon from "@mui/icons-material/LocalHospitalRounded";
import MedicationRoundedIcon from "@mui/icons-material/MedicationRounded";
import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import GraphicEqRoundedIcon from "@mui/icons-material/GraphicEqRounded";
import HighQualityRoundedIcon from "@mui/icons-material/HighQualityRounded";
import TimerRoundedIcon from "@mui/icons-material/TimerRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";
import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";
import MonitorHeartRoundedIcon from "@mui/icons-material/MonitorHeartRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import CalendarTodayRoundedIcon from "@mui/icons-material/CalendarTodayRounded";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
import LockPersonRoundedIcon from "@mui/icons-material/LockPersonRounded";
import VpnKeyRoundedIcon from "@mui/icons-material/VpnKeyRounded";
import StorageRoundedIcon from "@mui/icons-material/StorageRounded";
import BiotechRoundedIcon from "@mui/icons-material/BiotechRounded";
import VerifiedUserRoundedIcon from "@mui/icons-material/VerifiedUserRounded";
import CreditCardRoundedIcon from "@mui/icons-material/CreditCardRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";

/* ─── Types ──────────────────────────────────────────────────────────────── */

type NavId = "general" | "recording" | "templates" | "privacy" | "subscription";

type ToggleSetting = {
  type: "toggle";
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  iconColor: string;
  iconBg: string;
  badge?: string;
  comingSoon?: boolean;
};

type SelectSetting = {
  type: "select";
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  iconColor: string;
  iconBg: string;
  options: { value: string; label: string }[];
};

type SliderSetting = {
  type: "slider";
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  iconColor: string;
  iconBg: string;
  min: number;
  max: number;
  step: number;
  unit: string;
  dependsOn?: string; // only show when this toggle id is enabled
};

type AnySettingDef = ToggleSetting | SelectSetting | SliderSetting;

type Section = {
  id: NavId;
  heading: string;
  subtitle: string;
  groups: { label: string; color: "primary" | "secondary" | "success" | "warning" | "error"; items: AnySettingDef[] }[];
};

/* ─── Section definitions ────────────────────────────────────────────────── */

const SECTIONS: Section[] = [
  {
    id: "general",
    heading: "General Settings",
    subtitle: "Configure your AI assistant and interface preferences",
    groups: [
      {
        label: "AI-Powered Features",
        color: "primary",
        items: [
          { type: "toggle", id: "auto_note", title: "Auto-generate note after recording stops", subtitle: "Automatically processes the transcript when you end a recording", icon: <AutoAwesomeRoundedIcon sx={{ fontSize: 20 }} />, iconColor: "#1172BA", iconBg: "#EAF4FF", badge: "AI" },
          { type: "toggle", id: "icd_suggestions", title: "ICD-10 code suggestions", subtitle: "AI suggests diagnostic codes based on note content", icon: <LocalHospitalRoundedIcon sx={{ fontSize: 20 }} />, iconColor: "#2FA77A", iconBg: "#E8F6EF", badge: "AI" }
        ]
      },
      {
        label: "Interface & Notifications",
        color: "primary",
        items: [
          { type: "toggle", id: "med_extraction", title: "Medication extraction", subtitle: "Automatically identify medications mentioned in consultation", icon: <MedicationRoundedIcon sx={{ fontSize: 20 }} />, iconColor: "#F3C44E", iconBg: "#FFF3D6", badge: "AI" },
          { type: "toggle", id: "email_notif", title: "Email notifications for pending reviews", subtitle: "Get notified when notes are ready to sign off", icon: <NotificationsActiveRoundedIcon sx={{ fontSize: 20 }} />, iconColor: "#E77B7B", iconBg: "#FDECEC" },
          { type: "toggle", id: "dark_mode", title: "Dark mode", subtitle: "Switch to dark theme (coming soon)", icon: <DarkModeRoundedIcon sx={{ fontSize: 20 }} />, iconColor: "#777E89", iconBg: "#ECF0F2", comingSoon: true }
        ]
      }
    ]
  },
  {
    id: "recording",
    heading: "Recording Settings",
    subtitle: "Configure audio quality, language, and capture behaviour",
    groups: [
      {
        label: "Audio & Quality",
        color: "primary",
        items: [
          { type: "select", id: "rec_language", title: "Recording language", subtitle: "Language used for transcription", icon: <SubtitlesRoundedIcon sx={{ fontSize: 20 }} />, iconColor: "#1172BA", iconBg: "#EAF4FF", options: [{ value: "en", label: "English" }, { value: "hi", label: "Hindi" }, { value: "ta", label: "Tamil" }, { value: "te", label: "Telugu" }, { value: "mr", label: "Marathi" }] },
          { type: "toggle", id: "high_quality", title: "High quality audio", subtitle: "Record at higher bitrate for better transcription accuracy", icon: <HighQualityRoundedIcon sx={{ fontSize: 20 }} />, iconColor: "#2FA77A", iconBg: "#E8F6EF" },
          { type: "toggle", id: "noise_filter", title: "Background noise filtering", subtitle: "Reduce ambient noise during recording", icon: <GraphicEqRoundedIcon sx={{ fontSize: 20 }} />, iconColor: "#2C8AD3", iconBg: "#E6F2FD" }
        ]
      },
      {
        label: "Capture Behaviour",
        color: "primary",
        items: [
          { type: "toggle", id: "auto_stop", title: "Auto-stop after silence", subtitle: "Automatically stop recording when silence is detected", icon: <TimerRoundedIcon sx={{ fontSize: 20 }} />, iconColor: "#F3C44E", iconBg: "#FFF3D6" },
          { type: "slider", id: "silence_duration", title: "Silence threshold", subtitle: "Seconds of silence before auto-stopping", icon: <TimerRoundedIcon sx={{ fontSize: 20 }} />, iconColor: "#F3C44E", iconBg: "#FFF3D6", min: 3, max: 30, step: 1, unit: "s", dependsOn: "auto_stop" },
          { type: "toggle", id: "save_raw", title: "Save original audio file", subtitle: "Keep a copy of the raw recording alongside the transcript", icon: <SaveRoundedIcon sx={{ fontSize: 20 }} />, iconColor: "#E77B7B", iconBg: "#FDECEC" }
        ]
      }
    ]
  },
  {
    id: "templates",
    heading: "Note Templates",
    subtitle: "Customise how clinical notes are structured and formatted",
    groups: [
      {
        label: "Default Format",
        color: "primary",
        items: [
          { type: "select", id: "note_format", title: "Default note format", subtitle: "Structure used when generating a clinical note", icon: <ArticleRoundedIcon sx={{ fontSize: 20 }} />, iconColor: "#1172BA", iconBg: "#EAF4FF", options: [{ value: "soap", label: "SOAP" }, { value: "dap", label: "DAP" }, { value: "birp", label: "BIRP" }, { value: "free", label: "Free text" }] },
          { type: "toggle", id: "formal_language", title: "Use formal medical language", subtitle: "Generate notes with clinical terminology and phrasing", icon: <SchoolRoundedIcon sx={{ fontSize: 20 }} />, iconColor: "#2C8AD3", iconBg: "#E6F2FD" }
        ]
      },
      {
        label: "Note Sections",
        color: "primary",
        items: [
          { type: "toggle", id: "include_icd", title: "Auto-include ICD-10 codes", subtitle: "Append suggested diagnostic codes to every note", icon: <LocalHospitalRoundedIcon sx={{ fontSize: 20 }} />, iconColor: "#2FA77A", iconBg: "#E8F6EF", badge: "AI" },
          { type: "toggle", id: "include_meds", title: "Include medications section", subtitle: "Add a structured medications list to each note", icon: <MedicationRoundedIcon sx={{ fontSize: 20 }} />, iconColor: "#F3C44E", iconBg: "#FFF3D6", badge: "AI" },
          { type: "toggle", id: "include_vitals", title: "Include patient vitals section", subtitle: "Reserve a section for BP, HR, SpO₂ and other vitals", icon: <MonitorHeartRoundedIcon sx={{ fontSize: 20 }} />, iconColor: "#E77B7B", iconBg: "#FDECEC" },
          { type: "toggle", id: "include_followup", title: "Include follow-up plan", subtitle: "Add a follow-up recommendation block to each note", icon: <CalendarTodayRoundedIcon sx={{ fontSize: 20 }} />, iconColor: "#2C8AD3", iconBg: "#E6F2FD" }
        ]
      }
    ]
  },
  {
    id: "privacy",
    heading: "Privacy & Security",
    subtitle: "Manage data protection, encryption, and access settings",
    groups: [
      {
        label: "Access & Authentication",
        color: "primary",
        items: [
          { type: "toggle", id: "auto_logout", title: "Auto-logout after inactivity", subtitle: "Automatically sign out after a period of inactivity", icon: <LockPersonRoundedIcon sx={{ fontSize: 20 }} />, iconColor: "#F3C44E", iconBg: "#FFF3D6" },
          { type: "slider", id: "logout_minutes", title: "Inactivity timeout", subtitle: "Minutes of inactivity before auto-logout", icon: <TimerRoundedIcon sx={{ fontSize: 20 }} />, iconColor: "#F3C44E", iconBg: "#FFF3D6", min: 5, max: 60, step: 5, unit: " min", dependsOn: "auto_logout" },
          { type: "toggle", id: "two_factor", title: "Two-factor authentication", subtitle: "Add an extra layer of security on login (coming soon)", icon: <VpnKeyRoundedIcon sx={{ fontSize: 20 }} />, iconColor: "#2FA77A", iconBg: "#E8F6EF", comingSoon: true }
        ]
      },
      {
        label: "Data & Compliance",
        color: "primary",
        items: [
          { type: "toggle", id: "encrypt_local", title: "Encrypt local recordings", subtitle: "Store audio files with AES-256 encryption at rest", icon: <StorageRoundedIcon sx={{ fontSize: 20 }} />, iconColor: "#2C8AD3", iconBg: "#E6F2FD" },
          { type: "toggle", id: "share_data", title: "Share anonymised data to improve AI", subtitle: "Contribute de-identified transcripts to improve model quality", icon: <BiotechRoundedIcon sx={{ fontSize: 20 }} />, iconColor: "#E77B7B", iconBg: "#FDECEC" },
          { type: "toggle", id: "hipaa_mode", title: "HIPAA compliance mode", subtitle: "Enforce HIPAA-aligned data handling and audit logging", icon: <VerifiedUserRoundedIcon sx={{ fontSize: 20 }} />, iconColor: "#2FA77A", iconBg: "#E8F6EF", badge: "Enterprise" }
        ]
      }
    ]
  },
  {
    id: "subscription",
    heading: "Subscription",
    subtitle: "View your current plan and manage your billing",
    groups: [] // rendered separately
  }
];

/* ─── Nav items ─────────────────────────────────────────────────────────── */

const navItems = [
  { id: "general" as NavId,      label: "General",            icon: <SettingsRoundedIcon sx={{ fontSize: 18 }} /> },
  { id: "recording" as NavId,    label: "Recording",          icon: <MicNoneRoundedIcon sx={{ fontSize: 18 }} /> },
  { id: "templates" as NavId,    label: "Note Templates",     icon: <DescriptionOutlinedIcon sx={{ fontSize: 18 }} /> },
  { id: "privacy" as NavId,      label: "Privacy & Security", icon: <LockOutlinedIcon sx={{ fontSize: 18 }} /> },
  { id: "subscription" as NavId, label: "Subscription",       icon: <FavoriteBorderRoundedIcon sx={{ fontSize: 18 }} /> }
];

/* ─── Default values ─────────────────────────────────────────────────────── */

type SettingsState = Record<string, boolean | string | number>;

const DEFAULTS: SettingsState = {
  // general
  auto_note: true, live_transcript: true, icd_suggestions: true,
  med_extraction: false, email_notif: true, dark_mode: false,
  // recording
  rec_language: "en", high_quality: false, noise_filter: true,
  auto_stop: true, silence_duration: 10, save_raw: false,
  // templates
  note_format: "soap", formal_language: true,
  include_icd: true, include_meds: true, include_vitals: false, include_followup: true,
  // privacy
  auto_logout: true, logout_minutes: 15, two_factor: false,
  encrypt_local: true, share_data: false, hipaa_mode: false
};

const STORAGE_KEY = "scanbo_settings_v1";

/* ─── Page Component ─────────────────────────────────────────────────────── */

export default function SettingsPage() {
  const router = useRouter();
  const [activeNav, setActiveNav] = React.useState<NavId>("general");
  const [values, setValues] = React.useState<SettingsState>(DEFAULTS);
  const [saved, setSaved] = React.useState(false);
  const [isDirty, setIsDirty] = React.useState(false);
  const [toastMsg, setToastMsg] = React.useState("");
  const [toastSeverity, setToastSeverity] = React.useState<"success" | "info">("success");

  /* ── Load from localStorage ── */
  React.useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setValues({ ...DEFAULTS, ...JSON.parse(stored) });
      }
    } catch { /* ignore */ }
  }, []);

  /* ── Auto-save on every change ── */
  const updateValue = (id: string, val: boolean | string | number) => {
    setValues((prev) => {
      const next = { ...prev, [id]: val };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch { /* ignore */ }
      return next;
    });
    setIsDirty(true);
  };

  const handleSave = () => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(values)); } catch { /* ignore */ }
    setIsDirty(false);
    setSaved(true);
    setToastMsg("Preferences saved successfully!");
    setToastSeverity("success");
  };

  const handleReset = () => {
    setValues(DEFAULTS);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULTS)); } catch { /* ignore */ }
    setIsDirty(false);
    setToastMsg("Settings reset to defaults.");
    setToastSeverity("info");
    setSaved(true);
  };

  /* ── Counts ── */
  const totalToggles = SECTIONS.flatMap((s) => s.groups.flatMap((g) => g.items.filter((i) => i.type === "toggle"))).length;
  const enabledToggles = Object.entries(values).filter(([, v]) => v === true).length;

  const activeSection = SECTIONS.find((s) => s.id === activeNav)!;

  /* ── Render a single setting row ── */
  const renderItem = (item: AnySettingDef, isLast: boolean) => {
    // slider dependsOn check
    if (item.type === "slider" && item.dependsOn && !values[item.dependsOn]) return null;

    return (
      <Box
        key={item.id}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          px: 1.5,
          py: 1.8,
          borderRadius: 2,
          transition: "background 0.18s ease",
          borderBottom: !isLast ? (theme) => `1px solid ${alpha(theme.palette.divider, 0.6)}` : "none",
          "&:hover": { bgcolor: (theme) => alpha(theme.palette.primary.main, 0.025) }
        }}
      >
        {/* Icon tile */}
        {item.type !== "slider" && (
          <Box
            sx={{
              width: 42,
              height: 42,
              borderRadius: 2,
              display: "grid",
              placeItems: "center",
              bgcolor: item.type === "toggle" && values[item.id] === true
                ? "primary.main"
                : (theme) => alpha(theme.palette.primary.main, 0.08),
              color: item.type === "toggle" && values[item.id] === true
                ? "#fff"
                : "primary.main",
              flexShrink: 0,
              transition: "all 0.2s ease",
              boxShadow: item.type === "toggle" && values[item.id] === true
                ? (theme) => `0 4px 12px ${alpha(theme.palette.primary.main, 0.28)}`
                : "none"
            }}
          >
            {item.icon}
          </Box>
        )}

        {/* Text + control */}
        <Box flex={1}>
          {item.type !== "slider" && (
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: item.type === "select" ? 0.75 : 0 }}>
              <Typography variant="subtitle2" fontWeight={700} color={item.type === "toggle" && (item as ToggleSetting).comingSoon ? "text.disabled" : "text.primary"}>
                {item.title}
              </Typography>
              {item.type === "toggle" && (item as ToggleSetting).badge && (
                <Chip
                  label={(item as ToggleSetting).badge}
                  size="small"
                  sx={{
                    height: 18, fontSize: "0.6rem", fontWeight: 800,
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                    color: "primary.main",
                    border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                    "& .MuiChip-label": { px: 0.8 }
                  }}
                />
              )}
              {item.type === "toggle" && (item as ToggleSetting).comingSoon && (
                <Chip label="Soon" size="small" sx={{ height: 17, fontSize: "0.6rem", fontWeight: 700, bgcolor: (theme) => alpha(theme.palette.text.primary, 0.06), "& .MuiChip-label": { px: 0.8 } }} />
              )}
            </Stack>
          )}
          <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.5, display: "block" }}>
            {item.subtitle}
          </Typography>

          {/* Slider inline */}
          {item.type === "slider" && (
            <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 1, pr: 2 }}>
              <Slider
                size="small"
                value={Number(values[item.id]) || item.min}
                min={item.min}
                max={item.max}
                step={item.step}
                onChange={(_, v) => updateValue(item.id, v as number)}
                sx={{ flex: 1 }}
              />
              <Typography variant="body2" fontWeight={700} color="primary.main" sx={{ minWidth: 40, textAlign: "right" }}>
                {values[item.id]}{item.unit}
              </Typography>
            </Stack>
          )}

          {/* Select inline */}
          {item.type === "select" && (
            <Select
              size="small"
              value={String(values[item.id] ?? item.options[0].value)}
              onChange={(e) => updateValue(item.id, e.target.value)}
              sx={{
                borderRadius: 1.5,
                fontSize: "0.82rem",
                fontWeight: 600,
                mt: 0.5,
                minWidth: 180,
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.04),
                "& .MuiOutlinedInput-notchedOutline": { borderColor: (theme) => alpha(theme.palette.primary.main, 0.2) }
              }}
            >
              {item.options.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
              ))}
            </Select>
          )}
        </Box>

        {/* Toggle control */}
        {item.type === "toggle" && (
          <Tooltip title={(item as ToggleSetting).comingSoon ? "Coming soon" : ""} placement="left">
            <span>
              <Switch
                checked={Boolean(values[item.id])}
                onChange={() => {
                  if ((item as ToggleSetting).comingSoon) {
                    setToastMsg(`"${item.title}" is coming soon!`);
                    setToastSeverity("info");
                    setSaved(true);
                    return;
                  }
                  updateValue(item.id, !values[item.id]);
                }}
                color="primary"
                size="small"
              />
            </span>
          </Tooltip>
        )}
      </Box>
    );
  };

  /* ── Subscription Panel ── */
  const renderSubscriptionPanel = () => (
    <Box sx={{ p: 3 }}>
      <Stack spacing={2.5}>
        {/* Current plan card */}
        <Box
          sx={{
            borderRadius: 3,
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
            p: 2.5,
            boxShadow: (theme) => `0 8px 24px ${alpha(theme.palette.primary.main, 0.35)}`
          }}
        >
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: 2,
                  display: "grid",
                  placeItems: "center",
                  bgcolor: "rgba(255,255,255,0.15)"
                }}
              >
                <StarRoundedIcon sx={{ fontSize: 22, color: "#FFD700" }} />
              </Box>
              <Box>
                <Typography variant="subtitle1" fontWeight={800} color="#fff">Pro Plan</Typography>
                <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.75)" }}>Active • Renews Mar 25, 2026</Typography>
              </Box>
            </Stack>
            <Chip
              label="Active"
              size="small"
              sx={{ bgcolor: "rgba(255,255,255,0.2)", color: "#fff", fontWeight: 700, border: "1px solid rgba(255,255,255,0.35)" }}
            />
          </Stack>
        </Box>

        {/* Usage stats */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 1.5
          }}
        >
          {[
            { label: "Recordings Left", value: "20", sub: "of 50 / month", color: "#1172BA", bg: "#EAF4FF" },
            { label: "Notes Generated", value: "28", sub: "this billing period", color: "#2FA77A", bg: "#E8F6EF" },
            { label: "Storage Used", value: "2.3 GB", sub: "of 10 GB", color: "#F3C44E", bg: "#FFF3D6" }
          ].map((stat) => (
            <Box
              key={stat.label}
              sx={{
                p: 1.75,
                borderRadius: 2.5,
                border: (theme) => `1px solid ${theme.palette.divider}`,
                bgcolor: "background.paper",
                textAlign: "center"
              }}
            >
              <Box
                sx={{
                  width: 36, height: 36, borderRadius: 1.5,
                  bgcolor: stat.bg, margin: "0 auto 8px",
                  display: "grid", placeItems: "center"
                }}
              >
                <CreditCardRoundedIcon sx={{ fontSize: 18, color: stat.color }} />
              </Box>
              <Typography variant="h6" fontWeight={800} color="text.primary">{stat.value}</Typography>
              <Typography variant="caption" color="text.secondary" fontWeight={600}>{stat.label}</Typography>
              <Typography variant="caption" color="text.disabled" sx={{ display: "block", fontSize: "0.65rem" }}>{stat.sub}</Typography>
            </Box>
          ))}
        </Box>

        {/* Plan features */}
        <Box
          sx={{
            p: 2,
            borderRadius: 2.5,
            border: (theme) => `1px solid ${theme.palette.divider}`,
            bgcolor: "background.paper"
          }}
        >
          <Typography variant="caption" fontWeight={800} color="primary.main" sx={{ textTransform: "uppercase", letterSpacing: "0.06em", mb: 1.5, display: "block" }}>
            Pro Plan Includes
          </Typography>
          <Stack spacing={0.75}>
            {[
              "50 recordings per month",
              "Unlimited note generation",
              "AI ICD-10 code suggestions",
              "Medication extraction",
              "10 GB audio storage",
              "Priority email support"
            ].map((feat) => (
              <Stack key={feat} direction="row" spacing={1} alignItems="center">
                <CheckCircleRoundedIcon sx={{ fontSize: 16, color: "success.main" }} />
                <Typography variant="body2" fontWeight={600} color="text.primary">{feat}</Typography>
              </Stack>
            ))}
          </Stack>
        </Box>

        {/* CTA */}
        <Stack direction="row" spacing={1.25}>
          <AppButton
            intent="primary"
            startIcon={<OpenInNewRoundedIcon />}
            onClick={() => router.push("/credits")}
            fullWidth
          >
            Manage Billing
          </AppButton>
          <AppButton intent="neutral" fullWidth onClick={() => router.push("/credits")}>
            Upgrade Plan
          </AppButton>
        </Stack>
      </Stack>
    </Box>
  );

  return (
    <AppShell title="Settings" subtitle="" active="settings">
      {/* ── Page Header ── */}
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
        <Stack direction="row" alignItems="center" spacing={2}>
          <Box
            sx={{
              width: 52, height: 52, borderRadius: 2.5, display: "grid", placeItems: "center", flexShrink: 0,
              background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
              boxShadow: (theme) => `0 6px 18px ${alpha(theme.palette.primary.main, 0.35)}`
            }}
          >
            <SettingsRoundedIcon sx={{ fontSize: 26, color: "#fff" }} />
          </Box>
          <Stack spacing={0.25} flex={1}>
            <Typography variant="h5" fontWeight={800} color="text.primary">Settings</Typography>
            <Typography variant="body2" color="text.secondary">
              Manage your preferences, recording options, and account settings
            </Typography>
          </Stack>
          <Chip
            label={`${enabledToggles} of ${totalToggles} features active`}
            size="small"
            sx={{
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
              color: "primary.main", fontWeight: 700,
              border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
              display: { xs: "none", sm: "flex" }
            }}
          />
        </Stack>
      </Box>

      {/* ── Body ── */}
      <Box
        sx={{
          px: { xs: 2.5, sm: 3 }, py: 2.5,
          minHeight: "calc(100vh - 145px)",
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.02)
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "248px minmax(0,1fr)" },
            gap: 2.5, alignItems: "start"
          }}
        >
          {/* ── Left nav ── */}
          <Box
            sx={{
              borderRadius: 3,
              border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
              bgcolor: "background.paper", overflow: "hidden",
              boxShadow: (theme) => `0 4px 20px ${alpha(theme.palette.primary.main, 0.07)}`
            }}
          >
            <Box
              sx={{
                px: 2, py: 1.5,
                background: (theme) => `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.06)} 0%, ${alpha(theme.palette.secondary.main, 0.04)} 100%)`,
                borderBottom: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
              }}
            >
              <Typography variant="caption" fontWeight={800} sx={{ color: "text.secondary", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                Navigation
              </Typography>
            </Box>

            <Stack spacing={0} sx={{ p: 1 }}>
              {navItems.map((item) => {
                const isActive = activeNav === item.id;
                return (
                  <Box
                    key={item.id}
                    onClick={() => setActiveNav(item.id)}
                    sx={{
                      borderRadius: 2, display: "flex", alignItems: "center", gap: 1.5,
                      px: 1.5, py: 1.2, cursor: "pointer", transition: "all 0.18s ease",
                      background: isActive
                        ? (theme) => `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.06)} 100%)`
                        : "transparent",
                      border: isActive
                        ? (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.18)}`
                        : "1px solid transparent",
                      "&:hover": { bgcolor: (theme) => isActive ? undefined : alpha(theme.palette.primary.main, 0.05), transform: "translateX(2px)" }
                    }}
                  >
                    <Box
                      sx={{
                        width: 32, height: 32, borderRadius: 1.5, display: "grid", placeItems: "center",
                        bgcolor: isActive
                          ? "primary.main"
                          : (theme) => alpha(theme.palette.primary.main, 0.08),
                        color: isActive ? "#fff" : "primary.main",
                        flexShrink: 0,
                        transition: "all 0.18s ease",
                        boxShadow: isActive
                          ? (theme) => `0 3px 10px ${alpha(theme.palette.primary.main, 0.35)}`
                          : "none"
                      }}
                    >
                      {item.icon}
                    </Box>
                    <Typography variant="body2" fontWeight={isActive ? 800 : 600} color={isActive ? "primary.main" : "text.primary"} sx={{ flex: 1 }}>
                      {item.label}
                    </Typography>
                    {isActive && <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: "primary.main" }} />}
                  </Box>
                );
              })}
            </Stack>

            {/* Pro Plan footer */}
            <Box
              sx={{
                mx: 1, mb: 1, mt: 0.5, borderRadius: 2,
                background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
                p: 1.5,
                boxShadow: (theme) => `0 4px 14px ${alpha(theme.palette.primary.main, 0.35)}`
              }}
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <FavoriteBorderRoundedIcon sx={{ fontSize: 18, color: "rgba(255,255,255,0.9)" }} />
                <Box flex={1}>
                  <Typography variant="caption" fontWeight={800} sx={{ color: "#fff", display: "block" }}>Pro Plan Active</Typography>
                  <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.7)", fontSize: "0.68rem" }}>20 recordings left this month</Typography>
                </Box>
              </Stack>
            </Box>
          </Box>

          {/* ── Right panel ── */}
          <Box
            sx={{
              borderRadius: 3,
              border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
              bgcolor: "background.paper", overflow: "hidden",
              boxShadow: (theme) => `0 4px 20px ${alpha(theme.palette.primary.main, 0.07)}`
            }}
          >
            {/* Panel header */}
            <Box
              sx={{
                px: 3, py: 2, display: "flex", alignItems: "center", justifyContent: "space-between",
                background: (theme) => `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.06)} 0%, ${alpha(theme.palette.secondary.main, 0.04)} 100%)`,
                borderBottom: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
              }}
            >
              <Stack spacing={0.25}>
                <Typography variant="h6" fontWeight={800} color="text.primary">
                  {activeSection.heading}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {activeSection.subtitle}
                </Typography>
              </Stack>
              {activeNav !== "subscription" && (
                <Chip
                  label={`${activeSection.groups.flatMap((g) => g.items.filter((i) => i.type === "toggle" && values[i.id] === true)).length} enabled`}
                  size="small"
                  sx={{
                    bgcolor: (theme) => alpha(theme.palette.success.main, 0.1),
                    color: "success.main", fontWeight: 700,
                    border: (theme) => `1px solid ${alpha(theme.palette.success.main, 0.2)}`
                  }}
                />
              )}
            </Box>

            {/* Panel body */}
            {activeNav === "subscription" ? (
              renderSubscriptionPanel()
            ) : (
              <>
                <Stack sx={{ px: 2, pb: 1 }}>
                  {activeSection.groups.map((group, gIdx) => {
                    const allItems = group.items.flatMap((item) => {
                      if (item.type === "slider" && item.dependsOn && !values[item.dependsOn]) return [];
                      return [item];
                    });
                    return (
                      <React.Fragment key={group.label}>
                        {/* Group label */}
                        <Box sx={{ px: 1, pt: gIdx === 0 ? 2.5 : 1.5, pb: 0.5 }}>
                          <Stack direction="row" spacing={1} alignItems="center">
                            <Box sx={{ width: 3, height: 18, borderRadius: 99, bgcolor: `${group.color}.main` }} />
                            <Typography
                              variant="caption" fontWeight={800}
                              sx={{ color: `${group.color}.main`, letterSpacing: "0.07em", textTransform: "uppercase" }}
                            >
                              {group.label}
                            </Typography>
                          </Stack>
                        </Box>

                        {/* Items */}
                        {allItems.map((item, iIdx) =>
                          renderItem(item, iIdx === allItems.length - 1 && gIdx === activeSection.groups.length - 1)
                        )}
                      </React.Fragment>
                    );
                  })}
                </Stack>

                {/* Panel footer */}
                <Box
                  sx={{
                    px: 3, py: 2, display: "flex", alignItems: "center", justifyContent: "space-between",
                    borderTop: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                    background: (theme) => `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.03)} 0%, ${alpha(theme.palette.secondary.main, 0.02)} 100%)`
                  }}
                >
                  <Stack spacing={0.2}>
                    <Typography variant="caption" color="text.secondary">
                      {isDirty ? "You have unsaved changes" : "All changes are saved"}
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={1}>
                    <AppButton intent="neutral" onClick={handleReset}>
                      Reset to Defaults
                    </AppButton>
                    <AppButton intent="primary" onClick={handleSave} disabled={!isDirty}>
                      Save Preferences
                    </AppButton>
                  </Stack>
                </Box>
              </>
            )}
          </Box>
        </Box>
      </Box>

      {/* ── Toast ── */}
      <Snackbar
        open={saved}
        autoHideDuration={3000}
        onClose={() => setSaved(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSaved(false)}
          severity={toastSeverity}
          variant="filled"
          sx={{ borderRadius: 2.5, fontWeight: 600 }}
        >
          {toastMsg}
        </Alert>
      </Snackbar>
    </AppShell>
  );
}
