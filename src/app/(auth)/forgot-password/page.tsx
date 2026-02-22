"use client";

import * as React from "react";
import { alpha, styled } from "@mui/material/styles";
import { Box, Stack, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import AppButton from "@/components/ui/AppButton";
import AuthTextLink from "@/components/ui/AuthTextLink";

const PageRoot = styled("main")(() => ({
  "--auth-gutter": "clamp(12px, 2.2vw, 28px)",
  minHeight: "100dvh",
  display: "grid",
  placeItems: "center",
  padding: "var(--auth-gutter)",
  background: "#eceef1",
  boxSizing: "border-box"
}));

const Frame = styled(Box)(({ theme }) => ({
  width: "min(1200px, calc(100vw - (var(--auth-gutter) * 2)))",
  height: "min(860px, calc(100dvh - (var(--auth-gutter) * 2)))",
  borderRadius: 24,
  overflow: "hidden",
  backgroundColor: "#ffffff",
  border: `1px solid ${alpha("#0f2238", 0.1)}`,
  boxShadow: "0 8px 22px rgba(17, 32, 56, 0.06)",
  display: "grid",
  gridTemplateColumns: "1fr",
  [theme.breakpoints.up("lg")]: {
    gridTemplateColumns: "1fr 1fr"
  }
}));

const Left = styled(Box)(({ theme }) => ({
  padding: theme.spacing(5, 5, 4.5),
  display: "flex",
  justifyContent: "center"
}));

const Right = styled(Box)(({ theme }) => ({
  display: "none",
  background: "linear-gradient(180deg, #d6ecfb 0%, #c2e2f8 100%)",
  padding: theme.spacing(2),
  [theme.breakpoints.up("lg")]: {
    display: "block"
  }
}));

const WorkflowShell = styled(Box)(({ theme }) => ({
  height: "100%",
  minHeight: "min(760px, calc(100dvh - 96px))",
  borderRadius: 20,
  border: `1px solid ${alpha("#0f2238", 0.08)}`,
  background: `linear-gradient(180deg, ${alpha("#ffffff", 0.9)} 0%, ${alpha("#eff7fe", 0.94)} 100%)`,
  padding: theme.spacing(2.4),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1.6),
  position: "relative",
  overflow: "hidden"
}));

const WorkflowTop = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
}));

const WorkflowChip = styled(Box)(() => ({
  borderRadius: 999,
  padding: "8px 14px",
  fontWeight: 700,
  color: "#1f70ba",
  backgroundColor: "#e5f1fb",
  fontSize: "0.9rem"
}));

const WorkflowTrack = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1.5),
  flex: 1,
  justifyContent: "space-between"
}));

const WorkflowLine = styled(Box)(() => ({
  position: "absolute",
  left: "50%",
  top: 84,
  bottom: 30,
  width: 2,
  transform: "translateX(-50%)",
  background: "linear-gradient(180deg, rgba(24,115,188,0.25) 0%, rgba(24,115,188,0.12) 100%)"
}));

const WorkflowPulseDot = styled(Box)(() => ({
  position: "absolute",
  left: "50%",
  top: 84,
  width: 12,
  height: 12,
  borderRadius: "50%",
  transform: "translate(-50%, 0)",
  backgroundColor: "#1873bc",
  boxShadow: "0 0 0 0 rgba(24,115,188,0.36)",
  animation: "workflowTravel 4.6s linear infinite, workflowPulse 1.6s ease-in-out infinite",
  "@keyframes workflowTravel": {
    "0%": { top: 84, opacity: 0.2 },
    "12%": { opacity: 1 },
    "100%": { top: "calc(100% - 44px)", opacity: 0.1 }
  },
  "@keyframes workflowPulse": {
    "0%": { boxShadow: "0 0 0 0 rgba(24,115,188,0.36)" },
    "100%": { boxShadow: "0 0 0 14px rgba(24,115,188,0)" }
  }
}));

const WorkflowStep = styled(Box)(({ theme }) => ({
  borderRadius: 16,
  border: `1px solid ${alpha("#0f2238", 0.12)}`,
  backgroundColor: "#ffffff",
  padding: theme.spacing(1.6),
  minHeight: 150,
  width: "100%",
  boxShadow: "0 8px 22px rgba(15, 35, 58, 0.06)",
  textAlign: "center",
  display: "grid",
  alignContent: "center",
  justifyItems: "center",
  rowGap: 4,
  animation: "stepFade 4.8s ease-in-out infinite",
  "@keyframes stepFade": {
    "0%, 100%": { transform: "translateY(0)", opacity: 0.88 },
    "50%": { transform: "translateY(-2px)", opacity: 1 }
  }
}));

const WorkflowMicStage = styled(Box)(({ theme }) => ({
  borderRadius: 16,
  border: `1px solid ${alpha("#1873bc", 0.2)}`,
  background: "linear-gradient(180deg, #f6fbff 0%, #edf6fd 100%)",
  minHeight: 255,
  display: "grid",
  placeItems: "center",
  textAlign: "center",
  padding: theme.spacing(1.5),
  width: "100%"
}));

const MicOrb = styled(Box)(({ theme }) => ({
  width: 140,
  height: 140,
  borderRadius: "50%",
  display: "grid",
  placeItems: "center",
  background: "linear-gradient(135deg, rgba(95, 189, 235, 0.2) 0%, rgba(14, 85, 117, 0.15) 100%)",
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  position: "relative",
  animation: "heroMicPulse 2s ease-in-out infinite",
  "@keyframes heroMicPulse": {
    "0%, 100%": {
      boxShadow: `0 0 0 0 ${alpha("#5fbdeb", 0.4)}`
    },
    "50%": {
      boxShadow: `0 0 0 20px ${alpha("#5fbdeb", 0)}`
    }
  }
}));

const MicGlyph = styled(Box)(() => ({
  fontSize: 56,
  lineHeight: 1,
  color: "#1172BA",
  userSelect: "none",
  fontFamily: '"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif'
}));

const WorkflowFooter = styled(Box)(({ theme }) => ({
  borderRadius: 14,
  padding: theme.spacing(1.5, 1.2),
  background: "linear-gradient(120deg, rgba(24,115,188,0.12) 0%, rgba(95,189,235,0.2) 100%)",
  border: `1px solid ${alpha("#1873bc", 0.25)}`,
  textAlign: "center",
  minHeight: 90,
  display: "grid",
  alignContent: "center"
}));

const LogoRow = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1.1)
}));

const Logo = styled("img")(() => ({
  width: 44,
  height: 44
}));

const InputField = styled(TextField)(() => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: 8,
    backgroundColor: "#ffffff",
    minHeight: 52,
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#c9cdd3"
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#aeb4bd"
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#8ca2b5",
      borderWidth: 1
    }
  },
  "& .MuiInputBase-input": {
    paddingTop: 14,
    paddingBottom: 14
  },
  "& .MuiInputLabel-root": {
    top: -1
  }
}));

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [sent, setSent] = React.useState(false);
  const [emailError, setEmailError] = React.useState("");

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const savedUser = window.localStorage.getItem("scanbo-user");
    if (savedUser) {
      router.replace("/dashboard");
    }
  }, [router]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedEmail = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!trimmedEmail) {
      setEmailError("Email is required.");
      setSent(false);
      return;
    }

    if (!emailRegex.test(trimmedEmail)) {
      setEmailError("Enter a valid email address.");
      setSent(false);
      return;
    }

    setEmailError("");
    setSent(true);
  };

  return (
    <PageRoot>
      <Frame>
        <Left>
          <Stack spacing={3} sx={{ width: "100%", maxWidth: 460, mx: "auto" }} component="form" onSubmit={handleSubmit}>
            <LogoRow>
              <Logo src="/scanbo-logo.svg" alt="Scanbo logo" />
              <Typography variant="h3" fontWeight={800} color="#111827" sx={{ lineHeight: 1.1 }}>
                ScanboScribe
              </Typography>
            </LogoRow>

            <Stack spacing={0.8}>
              <Typography variant="h4" fontWeight={700} color="#0f172a" sx={{ lineHeight: 1.2 }}>
                Forgot Password
              </Typography>
              <Typography variant="h6" color="#475569" fontWeight={500}>
                Enter your email and we&apos;ll send a reset link
              </Typography>
            </Stack>

            <Stack spacing={2}>
              <InputField
                fullWidth
                label="Email address"
                type="email"
                value={email}
                InputLabelProps={{ shrink: Boolean(email) }}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setEmailError("");
                  if (sent) setSent(false);
                }}
                error={Boolean(emailError)}
                helperText={emailError || undefined}
                required
              />

              <AppButton intent="primary" fullWidth type="submit">
                Send reset link
              </AppButton>

              {sent ? (
                <Typography variant="body2" color="#0f766e" textAlign="center">
                  Reset link sent. Please check your inbox.
                </Typography>
              ) : null}
            </Stack>

            <Typography variant="h6" color="#334155" textAlign="center" fontWeight={500}>
              Remember your password? <AuthTextLink href="/login">Login</AuthTextLink>
            </Typography>
          </Stack>
        </Left>

        <Right>
          <WorkflowShell>
            <WorkflowTop>
              <Typography variant="h6" fontWeight={700} color="#0f2238">
                Account Recovery
              </Typography>
              <WorkflowChip>Secure Access</WorkflowChip>
            </WorkflowTop>

            <WorkflowTrack>
              <WorkflowLine />
              <WorkflowPulseDot />

              <WorkflowStep>
                <Typography variant="h6" fontWeight={700} color="#0f2238">
                  Verify Email
                </Typography>
                <Typography variant="body2" color="#64748b">
                  We verify your account and prepare a one-time reset link.
                </Typography>
              </WorkflowStep>

              <WorkflowMicStage>
                <MicOrb>
                  <MicGlyph component="span" aria-hidden>🔐</MicGlyph>
                </MicOrb>
              </WorkflowMicStage>

              <WorkflowStep>
                <Typography variant="h6" fontWeight={700} color="#0f2238">
                  Reset Password
                </Typography>
                <Typography variant="body2" color="#64748b">
                  Create a new password and continue securely to your dashboard.
                </Typography>
              </WorkflowStep>
            </WorkflowTrack>

            <WorkflowFooter>
              <Typography variant="subtitle2" fontWeight={700} color="#0f2238">
                Fast and secure password recovery
              </Typography>
              <Typography variant="body2" color="#38506b">
                Protect your account without interrupting your workflow.
              </Typography>
            </WorkflowFooter>
          </WorkflowShell>
        </Right>
      </Frame>
    </PageRoot>
  );
}
