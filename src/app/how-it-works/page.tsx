"use client";

import { Box, Chip, Stack, Typography } from "@mui/material";
import { StaticPage } from "@/components/StaticPage";

const cardSx = {
  borderRadius: 2,
  border: "1px solid rgba(15, 23, 42, 0.08)",
  backgroundColor: "rgba(255,255,255,0.9)",
  boxShadow: "0 12px 24px rgba(15, 23, 42, 0.08)",
  padding: 3
};

export default function HowItWorksPage() {
  return (
    <StaticPage
      eyebrow="Product"
      title="How ScanboScribe AI works"
      subtitle="Record the encounter, upload securely, and generate structured notes in minutes."
    >
      <Stack spacing={3}>
        <Box sx={cardSx}>
          <Typography variant="subtitle1" fontWeight={600}>
            1. Capture the encounter
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Record patient‑doctor conversations with clear speaker context and high‑quality audio.
          </Typography>
        </Box>
        <Box sx={cardSx}>
          <Typography variant="subtitle1" fontWeight={600}>
            2. Generate structured notes
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ScanboScribe AI transforms the recording into SOAP‑ready summaries and key clinical cues.
          </Typography>
        </Box>
        <Box sx={cardSx}>
          <Typography variant="subtitle1" fontWeight={600}>
            3. Review and finalize
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Edit, approve, and export documentation to fit your clinical workflow.
          </Typography>
        </Box>

        <Stack direction="row" spacing={1} flexWrap="wrap">
          <Chip label="Automatic note-writing" color="primary" />
          <Chip label="SOAP-ready outputs" variant="outlined" />
          <Chip label="Faster claim approvals" variant="outlined" />
        </Stack>
      </Stack>
    </StaticPage>
  );
}
