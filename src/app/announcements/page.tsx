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

export default function AnnouncementsPage() {
  return (
    <StaticPage
      eyebrow="Company"
      title="Announcements"
      subtitle="Product releases, platform updates, and clinical workflow improvements."
    >
      <Stack spacing={3}>
        <Box sx={cardSx}>
          <Typography variant="subtitle1" fontWeight={600}>
            February 2026 · Smarter SOAP drafts
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Improved summarization quality with clearer Assessment and Plan sections.
          </Typography>
        </Box>
        <Box sx={cardSx}>
          <Typography variant="subtitle1" fontWeight={600}>
            January 2026 · Faster audio processing
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Reduced turnaround time from upload to summary for busy clinics.
          </Typography>
        </Box>
        <Box sx={cardSx}>
          <Typography variant="subtitle1" fontWeight={600}>
            December 2025 · New clinical cue highlights
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Key vitals, meds, and timelines are now surfaced as structured cues.
          </Typography>
        </Box>
      </Stack>
    </StaticPage>
  );
}
