"use client";

import * as React from "react";
import { alpha, styled } from "@mui/material/styles";
import { Box, IconButton, InputAdornment, MenuItem, Stack, TextField, Typography } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
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

const WorkflowTop = styled(Box)(({ theme }) => ({
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

const WorkflowLine = styled(Box)(({ theme }) => ({
  position: "absolute",
  left: "50%",
  top: 84,
  bottom: 30,
  width: 2,
  transform: "translateX(-50%)",
  background: `linear-gradient(180deg, ${alpha("#1873bc", 0.25)} 0%, ${alpha("#1873bc", 0.12)} 100%)`
}));

const WorkflowPulseDot = styled(Box)(({ theme }) => ({
  position: "absolute",
  left: "50%",
  top: 84,
  width: 12,
  height: 12,
  borderRadius: "50%",
  transform: "translate(-50%, 0)",
  backgroundColor: "#1873bc",
  boxShadow: `0 0 0 0 ${alpha("#1873bc", 0.36)}`,
  animation: "workflowTravel 4.6s linear infinite, workflowPulse 1.6s ease-in-out infinite",
  "@keyframes workflowTravel": {
    "0%": { top: 84, opacity: 0.2 },
    "12%": { opacity: 1 },
    "100%": { top: "calc(100% - 44px)", opacity: 0.1 }
  },
  "@keyframes workflowPulse": {
    "0%": { boxShadow: `0 0 0 0 ${alpha("#1873bc", 0.36)}` },
    "100%": { boxShadow: `0 0 0 14px ${alpha("#1873bc", 0)}` }
  }
}));

const WorkflowStep = styled(Box)(({ theme }) => ({
  borderRadius: 16,
  border: `1px solid ${alpha("#0f2238", 0.12)}`,
  backgroundColor: "#ffffff",
  padding: theme.spacing(1.6),
  minHeight: 150,
  width: "100%",
  boxShadow: "0 10px 24px rgba(15, 35, 58, 0.08)",
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

export default function SignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = React.useState("");
  const [specialty, setSpecialty] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Password and confirm password do not match.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/auth/password-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, specialty, email, password })
      });

      const data = (await response.json()) as { ok: boolean; message?: string };
      if (!response.ok || !data.ok) {
        setError(data.message || "Unable to create account. Please try again.");
        return;
      }

      router.push("/login");
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
          <Stack spacing={3} sx={{ width: "100%", maxWidth: 500 }} component="form" onSubmit={handleSubmit}>
            <LogoRow>
              <Logo src="/scanbo-logo.svg" alt="Scanbo logo" />
              <Typography variant="h3" fontWeight={800} color="#111827" sx={{ lineHeight: 1.1 }}>
                ScanboScribe
              </Typography>
            </LogoRow>

            <Stack spacing={0.8}>
              <Typography variant="h4" fontWeight={700} color="#0f172a" sx={{ lineHeight: 1.2 }}>
                Welcome to ScanboScribe
              </Typography>
              <Typography variant="h6" color="#475569" fontWeight={500}>
                Your medical AI assistant with 3 free recordings
              </Typography>
            </Stack>

            <Stack spacing={2}>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.3}>
                <InputField
                  fullWidth
                  label="Full name"
                  type="text"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  required
                />
                <InputField
                  select
                  fullWidth
                  value={specialty}
                  onChange={(event) => setSpecialty(event.target.value)}
                  label="Specialty"
                  required
                >
                  <MenuItem value="">Select Specialty</MenuItem>
                  <MenuItem value="family">Family Medicine</MenuItem>
                  <MenuItem value="internal">Internal Medicine</MenuItem>
                  <MenuItem value="pediatrics">Pediatrics</MenuItem>
                </InputField>
              </Stack>

              <InputField
                fullWidth
                label="Email address"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />

              <InputField
                fullWidth
                label="Create your Password"
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

              <Stack spacing={0.2} sx={{ pl: 1 }}>
                <Typography variant="body2" color="#334155">× 8 or more characters</Typography>
                <Typography variant="body2" color="#334155">× At least one number</Typography>
                <Typography variant="body2" color="#334155">× At least one special character (!@#? etc.)</Typography>
                <Typography variant="body2" color="#334155">× At least one uppercase letter</Typography>
              </Stack>

              <InputField
                fullWidth
                label="Confirm your Password"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        size="small"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        edge="end"
                        aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                      >
                        {showConfirmPassword ? (
                          <VisibilityOffOutlinedIcon sx={{ color: "#64748b" }} />
                        ) : (
                          <VisibilityOutlinedIcon sx={{ color: "#64748b" }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />

              <AppButton intent="primary" fullWidth type="submit" disabled={submitting}>
                {submitting ? "Creating account..." : "SignUp - It&apos;s Free"}
              </AppButton>
              {error ? (
                <Typography variant="body2" color="#dc2626" textAlign="center">
                  {error}
                </Typography>
              ) : null}
            </Stack>

            <Typography variant="body2" color="#64748b" textAlign="center" sx={{ mt: 0.6 }}>
              By signing up, you agree to the <Link href="#">terms of Use</Link>, <Link href="#">Privacy Policy</Link>.
            </Typography>

            <Typography variant="h6" color="#334155" textAlign="center" fontWeight={500} sx={{ mt: 0.2 }}>
              Already have an Account? <Link href="/login">Login</Link>
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
