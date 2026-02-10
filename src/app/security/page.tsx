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

export default function SecurityPage() {
  return (
    <StaticPage
      eyebrow="Security"
      title="Security you can trust"
      subtitle="Designed for healthcare compliance with data handling aligned to HIPAA and GDPR."
    >
      <Stack spacing={3}>
        <Box sx={cardSx}>
          <Typography variant="subtitle1" fontWeight={600}>
            Encryption end to end
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Audio and generated notes are encrypted in transit and at rest to protect patient data.
          </Typography>
        </Box>
        <Box sx={cardSx}>
          <Typography variant="subtitle1" fontWeight={600}>
            Access controls
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Role‑based access and session safeguards help keep information visible only to authorized users.
          </Typography>
        </Box>
        <Box sx={cardSx}>
          <Typography variant="subtitle1" fontWeight={600}>
            Auditability
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Activity logging supports operational visibility and clinical governance workflows.
          </Typography>
        </Box>
      </Stack>
    </StaticPage>
  );
}
