"use client";

import { Box, Stack, Typography } from "@mui/material";
import { StaticPage } from "@/components/StaticPage";

const cardSx = {
  borderRadius: 2,
  border: "1px solid rgba(15, 23, 42, 0.08)",
  backgroundColor: "rgba(255,255,255,0.9)",
  boxShadow: "0 12px 24px rgba(15, 23, 42, 0.08)",
  padding: 3
};

export default function IntegrationsPage() {
  return (
    <StaticPage
      eyebrow="Product"
      title="Integrations"
      subtitle="Export notes in formats that fit your clinic workflows and systems."
    >
      <Stack spacing={3}>
        <Box sx={cardSx}>
          <Typography variant="subtitle1" fontWeight={600}>
            EHR‑friendly exports
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Generate structured summaries that can be copied into your EHR or exported for review.
          </Typography>
        </Box>
        <Box sx={cardSx}>
          <Typography variant="subtitle1" fontWeight={600}>
            PDF and document outputs
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Download notes in clean PDF or document formats for sharing and archival needs.
          </Typography>
        </Box>
        <Box sx={cardSx}>
          <Typography variant="subtitle1" fontWeight={600}>
            Integration‑ready data
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Structured JSON outputs make it easy for your IT team to build custom workflows.
          </Typography>
        </Box>
      </Stack>
    </StaticPage>
  );
}
