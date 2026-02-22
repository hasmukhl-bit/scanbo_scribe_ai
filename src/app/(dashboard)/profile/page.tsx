"use client";

import * as React from "react";
import styled from "@emotion/styled";
import { alpha } from "@mui/material/styles";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import AppShell from "@/components/layout/AppShell";

const PageWrap = styled(Box)(({ theme }) => ({
  minHeight: "calc(100vh - 72px)",
  borderTop: `1px solid ${theme.palette.divider}`,
  backgroundColor: alpha(theme.palette.primary.main, 0.02),
  padding: theme.spacing(3)
}));

const Card = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 14,
  backgroundColor: theme.palette.background.paper
}));

const Grid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: theme.spacing(2),
  [theme.breakpoints.up("lg")]: {
    gridTemplateColumns: "280px minmax(0, 1fr)"
  }
}));

const ProfileBadge = styled(Box)(({ theme }) => ({
  borderRadius: 14,
  padding: theme.spacing(2),
  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
  backgroundColor: alpha(theme.palette.primary.main, 0.04),
  textAlign: "center"
}));

export default function ProfilePage() {
  return (
    <AppShell title="My Profile" subtitle="" active="profile">
      <PageWrap>
        <Stack spacing={2.2}>
          <Typography variant="h4" fontWeight={800}>
            My Profile
          </Typography>

          <Grid>
            <Card sx={{ p: 2 }}>
              <ProfileBadge>
                <Box sx={{ position: "relative", width: "fit-content", mx: "auto", mb: 1.3 }}>
                  <Avatar
                    sx={{
                      width: 92,
                      height: 92,
                      fontSize: 34,
                      fontWeight: 800,
                      bgcolor: "primary.main"
                    }}
                  >
                    HL
                  </Avatar>
                  <Button
                    size="small"
                    sx={{
                      position: "absolute",
                      right: -4,
                      bottom: -4,
                      minWidth: 0,
                      width: 30,
                      height: 30,
                      borderRadius: "50%",
                      bgcolor: "background.paper",
                      border: (theme) => `1px solid ${theme.palette.divider}`
                    }}
                  >
                    <CameraAltOutlinedIcon sx={{ fontSize: 16 }} />
                  </Button>
                </Box>
                <Typography variant="h6" fontWeight={800}>
                  Dr. Hasmukh Lohar
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  hasmukh@scanbo.ai
                </Typography>
                <Chip
                  icon={<VerifiedRoundedIcon />}
                  label="Pro Plan Active"
                  size="small"
                  sx={{
                    mt: 1.2,
                    borderRadius: 999,
                    color: "primary.main",
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.12),
                    fontWeight: 700
                  }}
                />
              </ProfileBadge>

              <Stack spacing={1.2} sx={{ mt: 2 }}>
                <Card sx={{ p: 1.5 }}>
                  <Typography variant="caption" color="text.secondary" fontWeight={700}>
                    MEMBER SINCE
                  </Typography>
                  <Typography variant="body1" fontWeight={700}>
                    Feb 2026
                  </Typography>
                </Card>
                <Card sx={{ p: 1.5 }}>
                  <Typography variant="caption" color="text.secondary" fontWeight={700}>
                    ROLE
                  </Typography>
                  <Typography variant="body1" fontWeight={700}>
                    Physician
                  </Typography>
                </Card>
                <Card sx={{ p: 1.5 }}>
                  <Typography variant="caption" color="text.secondary" fontWeight={700}>
                    RECORDINGS LEFT
                  </Typography>
                  <Typography variant="body1" fontWeight={700}>
                    20 this cycle
                  </Typography>
                </Card>
              </Stack>
            </Card>

            <Card sx={{ p: 2 }}>
              <Stack spacing={2}>
                <Typography variant="h5" fontWeight={800} sx={{ pb: 1.2, borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}>
                  Personal Information
                </Typography>

                <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 1.5 }}>
                  <TextField label="First Name" defaultValue="Hasmukh" InputLabelProps={{ shrink: true }} fullWidth />
                  <TextField label="Last Name" defaultValue="Lohar" InputLabelProps={{ shrink: true }} fullWidth />
                  <TextField label="Email" defaultValue="hasmukh@scanbo.ai" InputLabelProps={{ shrink: true }} fullWidth />
                  <TextField label="Phone Number" defaultValue="+91 9876543210" InputLabelProps={{ shrink: true }} fullWidth />
                </Box>

                <Typography variant="h6" fontWeight={800} sx={{ pt: 0.8 }}>
                  Professional Details
                </Typography>
                <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 1.5 }}>
                  <TextField label="Specialty" defaultValue="General Physician" InputLabelProps={{ shrink: true }} fullWidth />
                  <TextField label="Experience" defaultValue="12 years" InputLabelProps={{ shrink: true }} fullWidth />
                  <TextField label="Clinic / Hospital" defaultValue="Scanbo Health Clinic" InputLabelProps={{ shrink: true }} fullWidth />
                  <TextField label="City" defaultValue="Ahmedabad" InputLabelProps={{ shrink: true }} fullWidth />
                </Box>

                <Typography variant="h6" fontWeight={800} sx={{ pt: 0.8 }}>
                  Account Security
                </Typography>
                <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 1.5 }}>
                  <TextField label="Current Password" type="password" placeholder="••••••••" fullWidth />
                  <TextField label="New Password" type="password" placeholder="••••••••" fullWidth />
                </Box>

                <Stack direction="row" spacing={1.2} justifyContent="flex-end" sx={{ pt: 1 }}>
                  <Button variant="outlined" sx={{ textTransform: "none", borderRadius: 2, fontWeight: 700 }}>
                    Cancel
                  </Button>
                  <Button variant="contained" sx={{ textTransform: "none", borderRadius: 2, fontWeight: 700 }}>
                    Save Changes
                  </Button>
                </Stack>
              </Stack>
            </Card>
          </Grid>
        </Stack>
      </PageWrap>
    </AppShell>
  );
}
