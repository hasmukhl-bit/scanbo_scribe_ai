"use client";

import * as React from "react";
import { alpha } from "@mui/material/styles";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Chip,
  Stack,
  Typography
} from "@mui/material";
import AppShell from "@/components/layout/AppShell";
import Link from "next/link";
import AppButton from "@/components/ui/AppButton";

/* ── Icons ─────────────────────────────────────────────────────────────── */
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import RocketLaunchRoundedIcon from "@mui/icons-material/RocketLaunchRounded";
import MicRoundedIcon from "@mui/icons-material/MicRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import CreditCardRoundedIcon from "@mui/icons-material/CreditCardRounded";
import SettingsSuggestRoundedIcon from "@mui/icons-material/SettingsSuggestRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import SmartphoneRoundedIcon from "@mui/icons-material/SmartphoneRounded";
import KeyboardRoundedIcon from "@mui/icons-material/KeyboardRounded";
import ContactSupportRoundedIcon from "@mui/icons-material/ContactSupportRounded";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import HeadsetMicRoundedIcon from "@mui/icons-material/HeadsetMicRounded";

/* ─── Data ───────────────────────────────────────────────────────────────── */

type NavSection = {
  label: string;
  items: { icon: React.ReactNode; text: string; active?: boolean }[];
};

const navSections: NavSection[] = [
  {
    label: "Getting Started",
    items: [
      { icon: <RocketLaunchRoundedIcon sx={{ fontSize: 17 }} />, text: "Quick Start Guide", active: true },
      { icon: <MicRoundedIcon sx={{ fontSize: 17 }} />, text: "Recording & Upload" },
      { icon: <DescriptionRoundedIcon sx={{ fontSize: 17 }} />, text: "Consultations & AI" }
    ]
  },
  {
    label: "Account",
    items: [
      { icon: <CreditCardRoundedIcon sx={{ fontSize: 17 }} />, text: "Credits & Billing" },
      { icon: <ShieldRoundedIcon sx={{ fontSize: 17 }} />, text: "Privacy & Security" }
    ]
  },
  {
    label: "Support",
    items: [
      { icon: <KeyboardRoundedIcon sx={{ fontSize: 17 }} />, text: "Keyboard Shortcuts" },
      { icon: <ContactSupportRoundedIcon sx={{ fontSize: 17 }} />, text: "Contact Support" }
    ]
  }
];

const faqs = [
  {
    q: "How do I start my first consultation recording?",
    a: "Open Start Consult, select a patient, then tap Start Recording. The AI note preview updates in real-time as you speak."
  },
  {
    q: "How do I add a new patient to the system?",
    a: "Use the + New Patient action on the Patients page or create one directly from the Start Consult flow."
  },
  {
    q: "What microphone should I use for best results?",
    a: "Use a directional USB microphone in a quiet room and keep a consistent speaking distance for the clearest transcription."
  },
  {
    q: "How do I sign off a completed note?",
    a: "Open the note from My Recordings, review the generated SOAP note, then click Review & Sign Off at the bottom of the page."
  },
  {
    q: "Can I upload a pre-recorded audio file?",
    a: "Yes. In the Start Consult flow, choose Upload Audio on the mode selection screen and pick an MP3, WAV, or M4A file."
  }
];

const articles = [
  { icon: <RocketLaunchRoundedIcon sx={{ fontSize: 18 }} />, title: "Complete Setup Guide", time: "5 min read", href: "/support/setup-guide" },
  { icon: <PersonRoundedIcon sx={{ fontSize: 18 }} />, title: "Managing Patient Records", time: "3 min read", href: "/patients" },
  { icon: <SettingsSuggestRoundedIcon sx={{ fontSize: 18 }} />, title: "Customising Your Settings", time: "2 min read", href: "/settings" },
  { icon: <SmartphoneRoundedIcon sx={{ fontSize: 18 }} />, title: "Using Scanbo on Mobile", time: "4 min read", href: "/support" }
];

/* ─── Component ──────────────────────────────────────────────────────────── */

export default function SupportPage() {
  const [activeNav, setActiveNav] = React.useState("Quick Start Guide");

  return (
    <AppShell title="Help & Support" subtitle="" active="support">
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
        <Stack direction={{ xs: "column", sm: "row" }} alignItems={{ xs: "flex-start", sm: "center" }} justifyContent="space-between" spacing={2}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Box
              sx={{
                width: 52, height: 52, borderRadius: 2.5, display: "grid", placeItems: "center", flexShrink: 0,
                background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
                boxShadow: (theme) => `0 6px 18px ${alpha(theme.palette.primary.main, 0.35)}`
              }}
            >
              <HelpRoundedIcon sx={{ fontSize: 26, color: "#fff" }} />
            </Box>
            <Stack spacing={0.25}>
              <Typography variant="h5" fontWeight={800} color="text.primary">
                Help & Support
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Browse articles, guides, and frequently asked questions
              </Typography>
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
        <Stack spacing={2.5}>

          {/* System status */}
          <Box
            sx={{
              borderRadius: 2.5, px: 2.5, py: 1.4,
              display: "flex", justifyContent: "space-between", alignItems: "center", gap: 2,
              bgcolor: (theme) => alpha(theme.palette.success.main, 0.06),
              border: (theme) => `1px solid ${alpha(theme.palette.success.main, 0.2)}`
            }}
          >
            <Stack direction="row" spacing={1.2} alignItems="center">
              <CheckCircleRoundedIcon sx={{ fontSize: 18, color: "success.main" }} />
              <Typography variant="body2" fontWeight={600} color="success.dark">
                All systems operational — AI transcription, note generation, and storage are running normally
              </Typography>
            </Stack>
            <Chip
              label="99.98% uptime"
              size="small"
              sx={{
                height: 22, fontWeight: 800, fontSize: "0.7rem", flexShrink: 0,
                bgcolor: (theme) => alpha(theme.palette.success.main, 0.1),
                color: "success.dark",
                border: (theme) => `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
                "& .MuiChip-label": { px: 1.2 }
              }}
            />
          </Box>

          {/* 2-col layout */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", lg: "230px minmax(0,1fr)" },
              gap: 2.5,
              alignItems: "start"
            }}
          >
            {/* Left nav */}
            <Box
              sx={{
                borderRadius: 3,
                border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
                bgcolor: "background.paper",
                overflow: "hidden",
                boxShadow: (theme) => `0 4px 20px ${alpha(theme.palette.primary.main, 0.07)}`
              }}
            >
              {navSections.map((section, si) => (
                <Box key={section.label}>
                  {si > 0 && (
                    <Box sx={{ mx: 1, borderTop: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.08)}` }} />
                  )}
                  <Box sx={{ px: 2, pt: si === 0 ? 2 : 1.5, pb: 0.5 }}>
                    <Typography
                      variant="caption" fontWeight={800}
                      sx={{ color: "text.secondary", letterSpacing: "0.08em", textTransform: "uppercase" }}
                    >
                      {section.label}
                    </Typography>
                  </Box>
                  <Stack spacing={0} sx={{ px: 1, pb: 1 }}>
                    {section.items.map((item) => {
                      const isActive = activeNav === item.text;
                      return (
                        <Box
                          key={item.text}
                          onClick={() => setActiveNav(item.text)}
                          sx={{
                            borderRadius: 2, display: "flex", alignItems: "center", gap: 1.4,
                            px: 1.4, py: 1.1, cursor: "pointer", transition: "all 0.18s ease",
                            background: isActive
                              ? (theme) => `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.06)} 100%)`
                              : "transparent",
                            border: isActive
                              ? (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.18)}`
                              : "1px solid transparent",
                            "&:hover": {
                              bgcolor: (theme) => isActive ? undefined : alpha(theme.palette.primary.main, 0.04),
                              transform: "translateX(2px)"
                            }
                          }}
                        >
                          <Box
                            sx={{
                              width: 30, height: 30, borderRadius: 1.5,
                              display: "grid", placeItems: "center",
                              bgcolor: isActive ? "primary.main" : (theme) => alpha(theme.palette.primary.main, 0.08),
                              color: isActive ? "#fff" : "primary.main",
                              flexShrink: 0, transition: "all 0.18s ease",
                              boxShadow: isActive ? (theme) => `0 3px 8px ${alpha(theme.palette.primary.main, 0.32)}` : "none"
                            }}
                          >
                            {item.icon}
                          </Box>
                          <Typography
                            variant="body2" fontWeight={isActive ? 800 : 600}
                            color={isActive ? "primary.main" : "text.primary"}
                            sx={{ flex: 1 }}
                          >
                            {item.text}
                          </Typography>
                          {isActive && <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: "primary.main" }} />}
                        </Box>
                      );
                    })}
                  </Stack>
                </Box>
              ))}

              {/* Support footer */}
              <Box sx={{ mx: 1, mb: 1, mt: 0.5 }}>
                <Box
                  sx={{
                    borderRadius: 2, p: 1.5,
                    background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
                    boxShadow: (theme) => `0 4px 14px ${alpha(theme.palette.primary.main, 0.35)}`
                  }}
                >
                  <Stack direction="row" spacing={1} alignItems="center">
                    <HeadsetMicRoundedIcon sx={{ fontSize: 18, color: "rgba(255,255,255,0.9)" }} />
                    <Box flex={1}>
                      <Typography variant="caption" fontWeight={800} sx={{ color: "#fff", display: "block" }}>Need more help?</Typography>
                      <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.7)", fontSize: "0.67rem" }}>Replies within 2 hours</Typography>
                    </Box>
                  </Stack>
                </Box>
              </Box>
            </Box>

            {/* Right content */}
            <Stack spacing={2.5}>
              {/* FAQ */}
              <Box
                sx={{
                  borderRadius: 3,
                  border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
                  bgcolor: "background.paper",
                  overflow: "hidden",
                  boxShadow: (theme) => `0 4px 20px ${alpha(theme.palette.primary.main, 0.07)}`
                }}
              >
                {/* FAQ header */}
                <Box
                  sx={{
                    px: 2.5, py: 1.8,
                    display: "flex", alignItems: "center", gap: 1.2,
                    background: (theme) => `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.06)} 0%, ${alpha(theme.palette.secondary.main, 0.04)} 100%)`,
                    borderBottom: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
                  }}
                >
                  <Box
                    sx={{
                      width: 36, height: 36, borderRadius: 2,
                      display: "grid", placeItems: "center",
                      bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                      color: "primary.main"
                    }}
                  >
                    <HelpRoundedIcon sx={{ fontSize: 19 }} />
                  </Box>
                  <Stack flex={1}>
                    <Typography variant="subtitle2" fontWeight={800} color="text.primary">
                      Frequently Asked Questions
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Quick answers to common questions
                    </Typography>
                  </Stack>
                </Box>

                {faqs.map((faq, idx) => (
                  <Accordion
                    key={faq.q}
                    disableGutters
                    elevation={0}
                    sx={{
                      borderBottom: (theme) =>
                        idx < faqs.length - 1 ? `1px solid ${alpha(theme.palette.primary.main, 0.08)}` : "none",
                      "&:before": { display: "none" },
                      "&.Mui-expanded": { bgcolor: (theme) => alpha(theme.palette.primary.main, 0.02) }
                    }}
                  >
                    <AccordionSummary
                      expandIcon={
                        <Box
                          sx={{
                            width: 26, height: 26, borderRadius: "50%",
                            display: "grid", placeItems: "center",
                            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
                            color: "primary.main"
                          }}
                        >
                          <ExpandMoreRoundedIcon sx={{ fontSize: 17 }} />
                        </Box>
                      }
                      sx={{ px: 2.5, py: 1.5 }}
                    >
                      <Typography variant="subtitle2" fontWeight={700} color="text.primary">
                        {faq.q}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ px: 2.5, pt: 0, pb: 2 }}>
                      <Box sx={{ borderLeft: (theme) => `3px solid ${theme.palette.primary.main}`, pl: 1.5, py: 0.5 }}>
                        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                          {faq.a}
                        </Typography>
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Box>

              {/* Popular articles */}
              <Box>
                <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1.5 }}>
                  <Box sx={{ width: 3, height: 20, borderRadius: 99, bgcolor: "primary.main" }} />
                  <Typography variant="h6" fontWeight={800} color="text.primary">
                    Popular Articles
                  </Typography>
                </Stack>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0,1fr))" },
                    gap: 1.5
                  }}
                >
                  {articles.map((article) => (
                    <Box
                      key={article.title}
                      component={Link}
                      href={article.href}
                      sx={{
                        borderRadius: 2.5, p: 1.75,
                        display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1.5,
                        bgcolor: "background.paper",
                        border: (theme) => `1px solid ${theme.palette.divider}`,
                        cursor: "pointer", transition: "all 0.2s ease",
                        textDecoration: "none",
                        boxShadow: (theme) => `0 2px 8px ${alpha(theme.palette.primary.main, 0.04)}`,
                        "&:hover": {
                          transform: "translateX(3px)",
                          borderColor: (theme) => alpha(theme.palette.primary.main, 0.25),
                          boxShadow: (theme) => `0 4px 16px ${alpha(theme.palette.primary.main, 0.1)}`
                        }
                      }}
                    >
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <Box
                          sx={{
                            width: 38, height: 38, borderRadius: 2, flexShrink: 0,
                            display: "grid", placeItems: "center",
                            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
                            color: "primary.main",
                            border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.14)}`
                          }}
                        >
                          {article.icon}
                        </Box>
                        <Box>
                          <Typography variant="body2" fontWeight={700} color="text.primary">
                            {article.title}
                          </Typography>
                          <Stack direction="row" spacing={0.5} alignItems="center">
                            <AccessTimeRoundedIcon sx={{ fontSize: 12, color: "text.disabled" }} />
                            <Typography variant="caption" color="text.secondary">
                              {article.time}
                            </Typography>
                          </Stack>
                        </Box>
                      </Stack>
                      <Box
                        sx={{
                          width: 26, height: 26, borderRadius: "50%", flexShrink: 0,
                          display: "grid", placeItems: "center",
                          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.07),
                          color: "primary.main"
                        }}
                      >
                        <ChevronRightRoundedIcon sx={{ fontSize: 16 }} />
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </AppShell>
  );
}
