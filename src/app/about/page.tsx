"use client";

import { Box, Stack, Typography } from "@mui/material";
import { StaticPage } from "@/components/StaticPage";

const cardSx = {
  borderRadius: 2,
  border: "1px solid rgba(15, 23, 42, 0.08)",
  backgroundColor: "rgba(255,255,255,0.95)",
  boxShadow: "0 12px 24px rgba(15, 23, 42, 0.08)",
  padding: 3
};

export default function AboutPage() {
  return (
    <StaticPage
      eyebrow="Company"
      title="About ScanboScribe AI"
      subtitle="We help clinicians turn conversations into structured notes with less after‑hours work."
    >
      <Stack spacing={3}>
        <Box sx={cardSx}>
          <Typography variant="subtitle1" fontWeight={600}>
            Our mission
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Reduce documentation burden and improve clinical clarity by transforming audio into
            reliable, clinician‑ready summaries.
          </Typography>
        </Box>
        <Box sx={cardSx}>
          <Typography variant="subtitle1" fontWeight={600}>
            Built for care teams
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ScanboScribe AI is designed for primary care, specialty practices, and hospital teams who
            need faster, more consistent documentation.
          </Typography>
        </Box>
        <Box sx={cardSx}>
          <Typography variant="subtitle1" fontWeight={600}>
            What we value
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Privacy, clinical accuracy, and workflows that respect the realities of frontline care.
          </Typography>
        </Box>
      </Stack>
    </StaticPage>
  );
}
