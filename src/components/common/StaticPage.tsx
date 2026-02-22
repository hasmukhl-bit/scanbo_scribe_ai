"use client";

import Link from "next/link";
import { Box, Button, Container, Divider, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";

type StaticPageProps = {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  children?: React.ReactNode;
};

export function StaticPage({ title, subtitle, eyebrow, children }: StaticPageProps) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #f8fbff 0%, #eef5ff 100%)",
        pt: { xs: 10, md: 12 },
        pb: { xs: 10, md: 12 }
      }}
    >
      <Container maxWidth="md">
        <Stack spacing={4}>
          <Stack spacing={1.5} alignItems="flex-start">
            {eyebrow ? (
              <Typography variant="overline" letterSpacing={2} color="primary" fontWeight={700}>
                {eyebrow}
              </Typography>
            ) : null}
            <Typography variant="h3" fontWeight={700}>
              {title}
            </Typography>
            {subtitle ? (
              <Typography variant="body1" color="text.secondary">
                {subtitle}
              </Typography>
            ) : null}
            <Button
              component={Link}
              href="/"
              variant="outlined"
              sx={{
                alignSelf: "flex-start",
                borderRadius: 999,
                textTransform: "none",
                fontWeight: 600
              }}
            >
              Back to home
            </Button>
          </Stack>

          <Divider sx={{ borderColor: alpha("#0f172a", 0.08) }} />

          <Box>{children}</Box>
        </Stack>
      </Container>
    </Box>
  );
}
