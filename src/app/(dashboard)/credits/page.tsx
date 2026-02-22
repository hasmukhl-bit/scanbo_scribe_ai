"use client";

import styled from "@emotion/styled";
import { alpha } from "@mui/material/styles";
import {
  Box,
  Button,
  LinearProgress,
  Stack,
  Typography
} from "@mui/material";
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

const PlanCard = styled(Surface, {
  shouldForwardProp: (prop) => prop !== "active"
})<{ active?: boolean }>(({ theme, active }) => ({
  padding: theme.spacing(2.2),
  borderColor: active ? theme.palette.primary.main : theme.palette.divider,
  backgroundColor: active ? alpha(theme.palette.primary.main, 0.05) : theme.palette.background.paper,
  position: "relative"
}));

export default function CreditsPage() {
  return (
    <AppShell title="Credits & Usage" subtitle="" active="credits">
      <PageWrap>
        <Stack spacing={2}>
          <Box
            sx={{
              borderRadius: 2.5,
              background: "linear-gradient(90deg, #155A95 0%, #2B8AE2 100%)",
              color: "#fff",
              px: 3,
              py: 1.6,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <Typography variant="h4" fontWeight={800}>
              Credits & Usage
            </Typography>
            <Button variant="contained" sx={{ textTransform: "none", fontWeight: 700, borderRadius: 2, bgcolor: "#fff", color: "#155A95", "&:hover": { bgcolor: "#f4f8ff" } }}>
              Upgrade Plan
            </Button>
          </Box>

          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" }, gap: 2 }}>
            <Surface sx={{ p: 2.2 }}>
              <Typography variant="h6" color="text.secondary" fontWeight={700}>
                RECORDINGS REMAINING
              </Typography>
              <Stack direction="row" spacing={2.5} alignItems="center" mt={1.2}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h1" fontWeight={800} sx={{ lineHeight: 1 }}>
                    20 <Typography component="span" variant="h4" color="text.secondary">/ 50</Typography>
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mt: 0.6 }}>
                    30 recordings used this billing cycle
                  </Typography>
                  <Typography variant="body1" fontWeight={700} sx={{ mt: 1.6 }}>
                    Monthly usage <Typography component="span" color="text.secondary">30 / 50</Typography>
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={60}
                    sx={{ height: 9, borderRadius: 999, mt: 0.7 }}
                  />
                  <Typography variant="body1" fontWeight={700} sx={{ mt: 1.5 }}>
                    Storage used <Typography component="span" color="text.secondary">2.3 GB / 10 GB</Typography>
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={23}
                    color="success"
                    sx={{ height: 9, borderRadius: 999, mt: 0.7 }}
                  />
                </Box>
                <Box
                  sx={{
                    width: 130,
                    height: 130,
                    borderRadius: "50%",
                    display: "grid",
                    placeItems: "center",
                    border: (theme) => `10px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                    boxShadow: (theme) => `inset 0 0 0 10px ${alpha(theme.palette.primary.main, 0.95)}`
                  }}
                >
                  <Typography variant="h4" fontWeight={800} color="primary.main">
                    60%
                  </Typography>
                </Box>
              </Stack>
            </Surface>

            <Surface sx={{ p: 2.2 }}>
              <Typography variant="h6" color="text.secondary" fontWeight={700}>
                THIS BILLING PERIOD
              </Typography>
              <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1.4, mt: 1.5 }}>
                {[
                  { value: "30", label: "Recordings", color: "#1A7DC4" },
                  { value: "28", label: "Notes Generated", color: "#10B981" },
                  { value: "2", label: "Pending Review", color: "#F59E0B" }
                ].map((item) => (
                  <Box key={item.label} sx={{ p: 1.6, borderRadius: 1.8, bgcolor: (theme) => alpha(theme.palette.primary.main, 0.05), textAlign: "center" }}>
                    <Typography variant="h3" fontWeight={800} sx={{ color: item.color }}>
                      {item.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.label}
                    </Typography>
                  </Box>
                ))}
              </Box>
              <Stack direction="row" justifyContent="space-between" mt={2} mb={0.6}>
                <Typography variant="h6" fontWeight={700}>Avg. recording length</Typography>
                <Typography variant="h6" fontWeight={700}>3m 24s</Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={65}
                color="warning"
                sx={{ height: 9, borderRadius: 999 }}
              />
              <Box sx={{ mt: 1.8, p: 1.2, borderRadius: 1.5, bgcolor: (theme) => alpha(theme.palette.primary.main, 0.05), display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body1" color="text.secondary" fontWeight={600}>
                  Resets on Mar 1, 2026
                </Typography>
                <Typography variant="body2" color="text.secondary" fontWeight={700}>
                  8 days remaining
                </Typography>
              </Box>
            </Surface>
          </Box>

          <Typography variant="h5" fontWeight={800} sx={{ pt: 0.8 }}>
            AVAILABLE PLANS
          </Typography>

          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "repeat(3, minmax(0, 1fr))" }, gap: 2 }}>
            <PlanCard>
              <Typography variant="h6" color="text.secondary" fontWeight={700}>STARTER</Typography>
              <Typography variant="h2" fontWeight={800} sx={{ mt: 1 }}>₹0</Typography>
              <Typography variant="body1" color="text.secondary">Free forever</Typography>
              <Box sx={{ mt: 1.6, p: 1.2, borderRadius: 1.3, bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08) }}>
                <Typography variant="h6" fontWeight={700} color="primary.main">10 recordings / month</Typography>
              </Box>
              <Stack spacing={0.8} mt={1.5}>
                {["Live recording", "Basic SOAP notes", "ICD-10 suggestions", "7-day note history"].map((item) => (
                  <Typography key={item} variant="body1" color="text.secondary">✓ {item}</Typography>
                ))}
              </Stack>
              <Button fullWidth variant="outlined" sx={{ mt: 2, textTransform: "none", borderRadius: 1.6, fontWeight: 700 }}>
                Downgrade
              </Button>
            </PlanCard>

            <PlanCard active>
              <Box sx={{ position: "absolute", top: 0, right: 0, px: 1.2, py: 0.45, borderTopRightRadius: 12, borderBottomLeftRadius: 10, bgcolor: "primary.main", color: "#fff", fontSize: 12, fontWeight: 800 }}>
                CURRENT
              </Box>
              <Typography variant="h6" color="text.secondary" fontWeight={700}>PRO</Typography>
              <Typography variant="h2" fontWeight={800} sx={{ mt: 1 }}>₹1,499</Typography>
              <Typography variant="body1" color="text.secondary">per month + GST</Typography>
              <Box sx={{ mt: 1.6, p: 1.2, borderRadius: 1.3, bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08) }}>
                <Typography variant="h6" fontWeight={700} color="primary.main">50 recordings / month</Typography>
              </Box>
              <Stack spacing={0.8} mt={1.5}>
                {["Everything in Starter", "Audio file uploads", "Medication extraction", "Unlimited note history", "Priority AI processing"].map((item) => (
                  <Typography key={item} variant="body1" color="text.secondary">✓ {item}</Typography>
                ))}
              </Stack>
              <Button fullWidth variant="contained" disabled sx={{ mt: 2, textTransform: "none", borderRadius: 1.6, fontWeight: 700 }}>
                Current Plan
              </Button>
            </PlanCard>

            <PlanCard>
              <Typography variant="h6" color="text.secondary" fontWeight={700}>ENTERPRISE</Typography>
              <Typography variant="h2" fontWeight={800} sx={{ mt: 1 }}>₹4,999</Typography>
              <Typography variant="body1" color="text.secondary">per month + GST</Typography>
              <Box sx={{ mt: 1.6, p: 1.2, borderRadius: 1.3, bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08) }}>
                <Typography variant="h6" fontWeight={700} color="primary.main">Unlimited recordings</Typography>
              </Box>
              <Stack spacing={0.8} mt={1.5}>
                {["Everything in Pro", "Multi-doctor clinic", "EMR integrations", "Custom note templates", "Dedicated support"].map((item) => (
                  <Typography key={item} variant="body1" color="text.secondary">✓ {item}</Typography>
                ))}
              </Stack>
              <Button fullWidth variant="contained" sx={{ mt: 2, textTransform: "none", borderRadius: 1.6, fontWeight: 700 }}>
                Contact Sales
              </Button>
            </PlanCard>
          </Box>
        </Stack>
      </PageWrap>
    </AppShell>
  );
}
