"use client";

import { Box, Stack, Typography } from "@mui/material";
import { StaticPage } from "@/components/common/StaticPage";

const cardSx = {
  borderRadius: 2,
  border: "1px solid rgba(15, 23, 42, 0.08)",
  backgroundColor: "rgba(255,255,255,0.95)",
  boxShadow: "0 12px 24px rgba(15, 23, 42, 0.08)",
  padding: 3
};

export default function CareersPage() {
  return (
    <StaticPage
      eyebrow="Company"
      title="Careers at ScanboScribe AI"
      subtitle="Help clinicians reclaim time and improve care through smarter documentation."
    >
      <Stack spacing={3}>
        <Box sx={cardSx}>
          <Typography variant="subtitle1" fontWeight={600}>
            Our culture
          </Typography>
          <Typography variant="body2" color="text.secondary">
            We value ownership, clinical empathy, and shipping high‑quality, secure software.
          </Typography>
        </Box>
        <Box sx={cardSx}>
          <Typography variant="subtitle1" fontWeight={600}>
            Open roles
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Product Designer · Frontend Engineer · ML Engineer · Clinical Success Manager
          </Typography>
        </Box>
        <Box sx={cardSx}>
          <Typography variant="subtitle1" fontWeight={600}>
            Apply
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Send your resume and a short note about your interests to careers@scanboscribe.ai.
          </Typography>
        </Box>
      </Stack>
    </StaticPage>
  );
}
