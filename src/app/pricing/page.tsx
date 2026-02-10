"use client";

import { Box, Button, Stack, Typography } from "@mui/material";
import { StaticPage } from "@/components/StaticPage";

const cardSx = {
  borderRadius: 2,
  border: "1px solid rgba(15, 23, 42, 0.08)",
  backgroundColor: "rgba(255,255,255,0.95)",
  boxShadow: "0 16px 32px rgba(15, 23, 42, 0.1)",
  padding: 3,
  display: "grid",
  gap: 1.5,
  textAlign: "center"
};

export default function PricingPage() {
  return (
    <StaticPage
      eyebrow="Pricing"
      title="Choose the plan that fits your clinic"
      subtitle="Start free and upgrade when your team is ready."
    >
      <Stack spacing={3} direction={{ xs: "column", md: "row" }}>
        <Box sx={cardSx}>
          <Typography variant="subtitle1" fontWeight={700}>
            Starter
          </Typography>
          <Typography variant="h4" color="primary" fontWeight={800}>
            Free
          </Typography>
          <Typography variant="body2" color="text.secondary">
            For trying ScanboScribe AI.
          </Typography>
          <Typography variant="body2">10 recordings/month</Typography>
          <Typography variant="body2">Basic summaries</Typography>
          <Typography variant="body2">Email support</Typography>
          <Button variant="contained">Get Started</Button>
        </Box>

        <Box sx={{ ...cardSx, border: "1px solid rgba(37, 99, 235, 0.4)" }}>
          <Typography variant="subtitle1" fontWeight={700}>
            Clinic
          </Typography>
          <Typography variant="h4" color="primary" fontWeight={800}>
            $49 / month
          </Typography>
          <Typography variant="body2" color="text.secondary">
            For busy practices and teams.
          </Typography>
          <Typography variant="body2">Unlimited recordings</Typography>
          <Typography variant="body2">SOAP‑ready notes</Typography>
          <Typography variant="body2">Priority support</Typography>
          <Button variant="contained">Start Trial</Button>
        </Box>

        <Box sx={cardSx}>
          <Typography variant="subtitle1" fontWeight={700}>
            Enterprise
          </Typography>
          <Typography variant="h4" color="primary" fontWeight={800}>
            Custom
          </Typography>
          <Typography variant="body2" color="text.secondary">
            For health systems and large groups.
          </Typography>
          <Typography variant="body2">SSO & admin controls</Typography>
          <Typography variant="body2">Custom templates</Typography>
          <Typography variant="body2">Dedicated success</Typography>
          <Button variant="outlined">Contact Sales</Button>
        </Box>
      </Stack>
    </StaticPage>
  );
}
