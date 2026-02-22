"use client";

import * as React from "react";
import styled from "@emotion/styled";
import { alpha } from "@mui/material/styles";
import { Box, Stack, Switch, Typography } from "@mui/material";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import MicNoneRoundedIcon from "@mui/icons-material/MicNoneRounded";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import AppShell from "@/components/layout/AppShell";

const PageWrap = styled(Box)(({ theme }) => ({
  minHeight: "calc(100vh - 72px)",
  borderTop: `1px solid ${theme.palette.divider}`,
  backgroundColor: alpha(theme.palette.primary.main, 0.02),
  padding: theme.spacing(3)
}));

const Layout = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: theme.spacing(2),
  [theme.breakpoints.up("lg")]: {
    gridTemplateColumns: "250px minmax(0, 1fr)"
  }
}));

const MenuCard = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 14,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1.1)
}));

const Panel = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 14,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(2)
}));

const MenuItem = styled(Box, {
  shouldForwardProp: (prop) => prop !== "active"
})<{ active?: boolean }>(({ theme, active }) => ({
  borderRadius: 10,
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1.2),
  padding: theme.spacing(1.1, 1.2),
  color: active ? theme.palette.primary.main : theme.palette.text.primary,
  backgroundColor: active ? alpha(theme.palette.primary.main, 0.12) : "transparent",
  fontWeight: active ? 700 : 600
}));

const SettingRow = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: theme.spacing(2),
  padding: theme.spacing(2, 0),
  borderBottom: `1px solid ${theme.palette.divider}`,
  "&:last-of-type": {
    borderBottom: "none"
  }
}));

type SettingItem = {
  id: string;
  title: string;
  subtitle: string;
  enabled: boolean;
};

const initialSettings: SettingItem[] = [
  {
    id: "auto",
    title: "Auto-generate note after recording stops",
    subtitle: "Automatically processes the transcript when you end a recording",
    enabled: true
  },
  {
    id: "live",
    title: "Show live transcript during recording",
    subtitle: "Display real-time transcription on screen",
    enabled: true
  },
  {
    id: "icd",
    title: "ICD-10 code suggestions",
    subtitle: "AI suggests diagnostic codes based on note content",
    enabled: true
  },
  {
    id: "meds",
    title: "Medication extraction",
    subtitle: "Automatically identify medications mentioned in consultation",
    enabled: false
  },
  {
    id: "email",
    title: "Email notifications for pending reviews",
    subtitle: "Get notified when notes are ready to sign off",
    enabled: true
  },
  {
    id: "dark",
    title: "Dark mode",
    subtitle: "Switch to dark theme (coming soon)",
    enabled: false
  }
];

export default function SettingsPage() {
  const [settings, setSettings] = React.useState<SettingItem[]>(initialSettings);

  const toggleSetting = (id: string) => {
    setSettings((prev) =>
      prev.map((item) => (item.id === id ? { ...item, enabled: !item.enabled } : item))
    );
  };

  return (
    <AppShell title="Settings" subtitle="" active="settings">
      <PageWrap>
        <Stack spacing={2.2}>
          <Typography variant="h4" fontWeight={800}>
            Settings
          </Typography>

          <Layout>
            <MenuCard>
              <Stack spacing={0.3}>
                <MenuItem active>
                  <SettingsRoundedIcon fontSize="small" />
                  <Typography variant="body1">General</Typography>
                </MenuItem>
                <MenuItem>
                  <MicNoneRoundedIcon fontSize="small" />
                  <Typography variant="body1">Recording</Typography>
                </MenuItem>
                <MenuItem>
                  <DescriptionOutlinedIcon fontSize="small" />
                  <Typography variant="body1">Note Templates</Typography>
                </MenuItem>
                <MenuItem>
                  <LockOutlinedIcon fontSize="small" />
                  <Typography variant="body1">Privacy & Security</Typography>
                </MenuItem>
                <MenuItem>
                  <FavoriteBorderRoundedIcon fontSize="small" />
                  <Typography variant="body1">Subscription</Typography>
                </MenuItem>
              </Stack>
            </MenuCard>

            <Panel>
              <Typography variant="h5" fontWeight={800} sx={{ pb: 1.6, borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}>
                General Settings
              </Typography>
              {settings.map((item) => (
                <SettingRow key={item.id}>
                  <Box>
                    <Typography variant="h6" fontWeight={700}>
                      {item.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {item.subtitle}
                    </Typography>
                  </Box>
                  <Switch
                    checked={item.enabled}
                    onChange={() => toggleSetting(item.id)}
                    color="primary"
                  />
                </SettingRow>
              ))}
            </Panel>
          </Layout>
        </Stack>
      </PageWrap>
    </AppShell>
  );
}
