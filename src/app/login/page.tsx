"use client";

import * as React from "react";
import { alpha, styled } from "@mui/material/styles";
import { Box, IconButton, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import AppleIcon from "@mui/icons-material/Apple";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AppButton from "@/components/ui/AppButton";

const PageRoot = styled("main")(({ theme }) => ({
  minHeight: "100vh",
  display: "grid",
  placeItems: "center",
  padding: theme.spacing(4, 2),
  background: "#eceef1"
}));

const Frame = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: 1200,
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
  minHeight: 760,
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

const GoogleMark = styled("span")(() => ({
  fontSize: 22,
  fontWeight: 700,
  lineHeight: 1,
  background:
    "conic-gradient(from -45deg, #ea4335 0 90deg, #fbbc05 90deg 180deg, #34a853 180deg 270deg, #4285f4 270deg 360deg)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  WebkitTextFillColor: "transparent"
}));

export default function LoginPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const response = await fetch("/api/auth/password-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password })
      });

      const data = (await response.json()) as {
        ok: boolean;
        message?: string;
        user?: {
          id: number;
          username: string;
          email: string;
          name: string;
          role: string;
          specialty: string;
        };
      };

      if (!response.ok || !data.ok || !data.user) {
        setError(data.message || "Login failed. Please try again.");
        return;
      }

      localStorage.setItem("scanbo-user", JSON.stringify(data.user));
      router.push("/start-consult");
    } catch {
      setError("Unable to connect to server. Please try again.");
    } finally {
      setSubmitting(false);
    }
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
                Login
              </Typography>
              <Typography variant="h6" color="#475569" fontWeight={500}>
                Welcome back to your medical AI assistant
              </Typography>
            </Stack>

          <Stack spacing={2}>
            <InputField
              fullWidth
              label="Email or username"
              type="text"
              value={identifier}
              onChange={(event) => setIdentifier(event.target.value)}
              required
            />
            <InputField
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        size="small"
                        onClick={() => setShowPassword((prev) => !prev)}
                        edge="end"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? (
                          <VisibilityOffOutlinedIcon sx={{ color: "#64748b" }} />
                        ) : (
                          <VisibilityOutlinedIcon sx={{ color: "#64748b" }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
            />
            <Typography variant="body1" color="#64748b" textAlign="right" sx={{ pr: 1 }}>
              Forgot Password?
            </Typography>
            <AppButton intent="primary" fullWidth type="submit" disabled={submitting}>
              {submitting ? "Logging in..." : "Login"}
            </AppButton>
            {error ? (
              <Typography variant="body2" color="#dc2626" textAlign="center">
                {error}
              </Typography>
            ) : null}
          </Stack>

          <Stack spacing={1.4} sx={{ pt: 0.6 }}>
            <AppButton intent="neutral" fullWidth startIcon={<GoogleMark>G</GoogleMark>}>
              Sign in with Google
            </AppButton>
            <AppButton intent="neutral" fullWidth startIcon={<AppleIcon sx={{ fontSize: 22 }} />}>
              Sign in with Apple
            </AppButton>
          </Stack>

            <Typography variant="h6" color="#334155" textAlign="center" fontWeight={500} sx={{ mt: 0.4 }}>
              Don&apos;t have an Account? <Link href="/signup">Sign up</Link>
            </Typography>
          </Stack>
        </Left>

        <Right>
          <WorkflowShell>
            <WorkflowTop>
              <Typography variant="h6" fontWeight={700} color="#0f2238">
                Scribe AI Workflow
              </Typography>
              <WorkflowChip>3 Free Recordings</WorkflowChip>
            </WorkflowTop>

            <WorkflowTrack>
              <WorkflowLine />
              <WorkflowPulseDot />

              <WorkflowStep>
                <Typography variant="h6" fontWeight={700} color="#0f2238">Capture Audio</Typography>
                <Typography variant="body2" color="#64748b">
                  Speak naturally and capture key clinical details in seconds.
                </Typography>
              </WorkflowStep>

              <WorkflowMicStage>
                <MicOrb>
                  <MicGlyph component="span" aria-hidden>🎙️</MicGlyph>
                </MicOrb>
              </WorkflowMicStage>

              <WorkflowStep>
                <Typography variant="h6" fontWeight={700} color="#0f2238">Export Notes</Typography>
                <Typography variant="body2" color="#64748b">
                  Instantly generate polished, clinician-ready notes you can share with confidence.
                </Typography>
              </WorkflowStep>
            </WorkflowTrack>

            <WorkflowFooter>
              <Typography variant="subtitle2" fontWeight={700} color="#0f2238">
                Turn each consultation into clean documentation
              </Typography>
              <Typography variant="body2" color="#38506b">
                Start with 3 free recordings and feel the time savings from day one.
              </Typography>
            </WorkflowFooter>
          </WorkflowShell>
        </Right>
      </Frame>
    </PageRoot>
  );
}
