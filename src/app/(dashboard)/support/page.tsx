"use client";

import * as React from "react";
import styled from "@emotion/styled";
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
import CircleRoundedIcon from "@mui/icons-material/CircleRounded";
import AppShell from "@/components/layout/AppShell";

const PageWrap = styled(Box)(({ theme }) => ({
  minHeight: "calc(100vh - 72px)",
  borderTop: `1px solid ${theme.palette.divider}`,
  backgroundColor: alpha(theme.palette.primary.main, 0.02),
  padding: theme.spacing(3)
}));

const Surface = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 14,
  backgroundColor: theme.palette.background.paper
}));

const TopicCard = styled(Surface)(({ theme }) => ({
  textAlign: "center",
  padding: theme.spacing(2),
  minHeight: 132,
  display: "grid",
  placeItems: "center"
}));

const LeftNav = styled(Surface)(({ theme }) => ({
  padding: theme.spacing(1.3),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(0.9)
}));

const NavItem = styled(Box, {
  shouldForwardProp: (prop) => prop !== "active"
})<{ active?: boolean }>(({ theme, active }) => ({
  borderRadius: 10,
  padding: theme.spacing(1.05, 1.2),
  color: active ? theme.palette.primary.main : theme.palette.text.primary,
  backgroundColor: active ? alpha(theme.palette.primary.main, 0.12) : "transparent",
  fontWeight: active ? 700 : 600,
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1)
}));

const ArticleCard = styled(Surface)(({ theme }) => ({
  padding: theme.spacing(1.35, 1.4),
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: theme.spacing(1.25)
}));

const TopicIconWrap = styled(Box)(({ theme }) => ({
  width: 50,
  height: 50,
  borderRadius: 14,
  display: "grid",
  placeItems: "center",
  color: theme.palette.primary.main,
  backgroundColor: alpha(theme.palette.primary.main, 0.1)
}));

const TopicTitle = styled(Typography)(() => ({
  fontWeight: 800
}));

const TopicSub = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary
}));

export default function SupportPage() {
  const faqs: Array<{ q: string; a: string }> = [
    {
      q: "How do I start my first consultation recording?",
      a: "Open Start Consult, select patient, then tap Start Recording. The note preview updates while recording."
    },
    {
      q: "How do I add a new patient to the system?",
      a: "Use the + New Patient action on Patients page or create one directly from Start Consult flow."
    },
    {
      q: "What microphone should I use for best results?",
      a: "Use a directional USB microphone in a quiet room and keep a consistent speaking distance."
    }
  ];

  const topics = [
    {
      icon: <RocketLaunchRoundedIcon />,
      title: "Getting Started",
      text: "Set up your account and record your first consultation"
    },
    {
      icon: <MicRoundedIcon />,
      title: "Recording & Upload",
      text: "Live recording, file uploads, and audio tips"
    },
    {
      icon: <DescriptionRoundedIcon />,
      title: "Consultations",
      text: "SOAP notes, ICD codes, templates and sign-off"
    },
    {
      icon: <CreditCardRoundedIcon />,
      title: "Credits & Billing",
      text: "Plans, credit usage, invoices and upgrades"
    }
  ];

  const articles = [
    { icon: <RocketLaunchRoundedIcon />, title: "Complete Setup Guide", time: "5 min read" },
    { icon: <PersonRoundedIcon />, title: "Managing Patient Records", time: "3 min read" },
    { icon: <SettingsSuggestRoundedIcon />, title: "Customising Your Settings", time: "2 min read" },
    { icon: <SmartphoneRoundedIcon />, title: "Using Scanbo on Mobile", time: "4 min read" }
  ];

  return (
    <AppShell title="Help & Support" subtitle="" active="support">
      <PageWrap>
        <Stack spacing={2.05}>
          <Box
            sx={{
              borderRadius: 2.4,
              background: "linear-gradient(90deg, #0e2240 0%, #1a4e83 56%, #2b88de 100%)",
              color: "#fff",
              px: 3.2,
              py: 2.1,
              position: "relative",
              overflow: "hidden"
            }}
          >
            <Box
              sx={{
                position: "absolute",
                right: -90,
                top: -26,
                width: 230,
                height: 230,
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.16)"
              }}
            />
            <Box
              sx={{
                position: "absolute",
                right: 30,
                top: -70,
                width: 160,
                height: 160,
                borderRadius: "50%",
                backgroundColor: "rgba(255,255,255,0.06)"
              }}
            />
            <Typography variant="h6" sx={{ letterSpacing: 1.2, opacity: 0.8 }} fontWeight={700}>
              HELP CENTER
            </Typography>
            <Typography variant="h4" fontWeight={800} sx={{ mt: 0.35 }}>
              How can we help you today?
            </Typography>
          </Box>

          <Box
            sx={{
              border: "1px solid #71d7a6",
              borderRadius: 2,
              bgcolor: "#d8f8e7",
              px: 2.2,
              py: 1.2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <Typography variant="body1" fontWeight={700} color="#0b7750" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <CircleRoundedIcon sx={{ fontSize: 10 }} />
              All systems operational — AI transcription, note generation, and storage are running normally
            </Typography>
            <Typography variant="body2" fontWeight={700} color="#0b7750">
              99.98% uptime
            </Typography>
          </Box>

          <Typography variant="h5" fontWeight={800}>
            Browse by Topic
          </Typography>

          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))", xl: "repeat(4, minmax(0, 1fr))" }, gap: 1.5 }}>
            {topics.map((topic) => (
              <TopicCard key={topic.title}>
                <Stack spacing={0.9} alignItems="center">
                  <TopicIconWrap>{topic.icon}</TopicIconWrap>
                  <TopicTitle variant="h6">{topic.title}</TopicTitle>
                  <TopicSub variant="body2">{topic.text}</TopicSub>
                </Stack>
              </TopicCard>
            ))}
          </Box>

          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "250px minmax(0, 1fr)" }, gap: 1.5 }}>
            <LeftNav>
              <Typography variant="body2" color="text.secondary" fontWeight={800}>
                GETTING STARTED
              </Typography>
              <NavItem active>
                <RocketLaunchRoundedIcon fontSize="small" />
                Quick Start Guide
              </NavItem>
              <NavItem>
                <MicRoundedIcon fontSize="small" />
                Recording & Upload
              </NavItem>
              <NavItem>
                <DescriptionRoundedIcon fontSize="small" />
                Consultations & AI
              </NavItem>
              <Box sx={{ borderTop: (theme) => `1px solid ${theme.palette.divider}`, my: 0.6 }} />
              <Typography variant="body2" color="text.secondary" fontWeight={800}>
                ACCOUNT
              </Typography>
              <NavItem>
                <CreditCardRoundedIcon fontSize="small" />
                Credits & Billing
              </NavItem>
              <NavItem>
                <ShieldRoundedIcon fontSize="small" />
                Privacy & Security
              </NavItem>
              <Box sx={{ borderTop: (theme) => `1px solid ${theme.palette.divider}`, my: 0.6 }} />
              <Typography variant="body2" color="text.secondary" fontWeight={800}>
                SUPPORT
              </Typography>
              <NavItem>
                <KeyboardRoundedIcon fontSize="small" />
                Keyboard Shortcuts
              </NavItem>
              <NavItem>
                <ContactSupportRoundedIcon fontSize="small" />
                Contact Support
              </NavItem>
            </LeftNav>

            <Stack spacing={1.4}>
              <Stack direction="row" spacing={1} alignItems="center">
                <RocketLaunchRoundedIcon color="primary" />
                <Typography variant="h5" fontWeight={800}>
                  Getting Started
                </Typography>
                <Chip
                  size="small"
                  label="Quick Guide"
                  sx={{ borderRadius: 999, bgcolor: (theme) => alpha(theme.palette.primary.main, 0.12), color: "primary.main", fontWeight: 700 }}
                />
              </Stack>
              <Surface sx={{ overflow: "hidden" }}>
                {faqs.map((faq) => (
                  <Accordion key={faq.q} disableGutters elevation={0} sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}`, "&:last-of-type": { borderBottom: "none" } }}>
                    <AccordionSummary expandIcon={<ExpandMoreRoundedIcon />}>
                      <Typography variant="h6" fontWeight={700}>
                        {faq.q}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="body1" color="text.secondary">
                        {faq.a}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Surface>

              <Typography variant="h5" fontWeight={800}>
                Popular Articles
              </Typography>
              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" }, gap: 1.2 }}>
                {articles.map((article) => (
                  <ArticleCard key={article.title}>
                    <Stack direction="row" spacing={1.2} alignItems="center">
                      <Box sx={{ width: 42, height: 42, borderRadius: 1.5, bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1), display: "grid", placeItems: "center" }}>
                        {article.icon}
                      </Box>
                      <Box>
                        <Typography variant="h6" fontWeight={700}>
                          {article.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {article.time}
                        </Typography>
                      </Box>
                    </Stack>
                    <ChevronRightRoundedIcon sx={{ color: "text.secondary" }} />
                  </ArticleCard>
                ))}
              </Box>
            </Stack>
          </Box>
        </Stack>
      </PageWrap>
    </AppShell>
  );
}
