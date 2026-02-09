"use client";

import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import Link from "next/link";

const PageRoot = styled("main")(() => ({
  width: "100%"
}));

const Background = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  background: `radial-gradient(1200px 600px at 10% -10%, ${alpha(
    theme.palette.primary.main,
    0.16
  )}, transparent 60%), radial-gradient(1000px 500px at 90% 10%, ${alpha(
    theme.palette.secondary.main,
    0.16
  )}, transparent 60%), linear-gradient(180deg, ${theme.palette.background.default} 0%, ${alpha(
    theme.palette.primary.light,
    0.08
  )} 100%)`
}));

const ContentStack = styled(Stack)(() => ({
  maxWidth: 720
}));

const Overline = styled(Typography)(() => ({
  letterSpacing: 2
}));


export default function LandingPage() {
  return (
    <PageRoot>
      <Background>
        <Container maxWidth="lg">
          <ContentStack spacing={4} alignItems="flex-start">
            <Overline variant="overline">Scanbo Scribe AI</Overline>
            <Typography variant="h2" component="h1" sx={{ fontWeight: 700 }}>
              Effortlessly create comprehensive and accurate patient notes from
              your voice recordings
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Turn raw audio into structured, compliant clinical documentation
              in minutes. Capture every detail, reduce burnout, and focus on
              patient care.
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Button
                variant="contained"
                size="large"
                component={Link}
                href="/login-password"
              >
                Log in
              </Button>
              <Button variant="outlined" size="large">
                Get Early Access
              </Button>
            </Stack>
          </ContentStack>
        </Container>
      </Background>
    </PageRoot>
  );
}
