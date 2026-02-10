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

export default function ContactPage() {
  return (
    <StaticPage
      eyebrow="Company"
      title="Contact ScanboScribe AI"
      subtitle="We would love to hear from you. Reach out for demos, support, or partnerships."
    >
      <Stack spacing={3}>
        <Box sx={cardSx}>
          <Typography variant="subtitle1" fontWeight={600}>
            General inquiries
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Email support@scanboscribe.ai for product questions or help getting started.
          </Typography>
        </Box>
        <Box sx={cardSx}>
          <Typography variant="subtitle1" fontWeight={600}>
            Sales and demos
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Reach sales@scanboscribe.ai to schedule a walkthrough for your clinic or health system.
          </Typography>
        </Box>
        <Box sx={cardSx}>
          <Typography variant="subtitle1" fontWeight={600}>
            Partnerships
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Interested in integrations or pilots? Contact partnerships@scanboscribe.ai.
          </Typography>
        </Box>
      </Stack>
    </StaticPage>
  );
}
