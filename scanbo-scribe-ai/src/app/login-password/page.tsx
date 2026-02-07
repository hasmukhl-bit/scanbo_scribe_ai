"use client";

import * as React from "react";
import styled from "@emotion/styled";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Container,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import VisibilityOutlined from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlined from "@mui/icons-material/VisibilityOffOutlined";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const PageRoot = styled("main")(() => ({
  width: "100%"
}));

const Background = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  background: `radial-gradient(1200px 600px at 5% -10%, ${alpha(
    theme.palette.primary.main,
    0.18
  )}, transparent 60%), radial-gradient(1000px 500px at 95% 10%, ${alpha(
    theme.palette.secondary.main,
    0.2
  )}, transparent 60%), linear-gradient(180deg, ${theme.palette.background.default} 0%, ${alpha(
    theme.palette.primary.light,
    0.08
  )} 100%)`
}));

const PageContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(6),
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.down("md")]: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6)
  }
}));

const TwoColumnGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(4),
  gridTemplateColumns: "1fr",
  alignItems: "stretch",
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "1.15fr 0.85fr"
  }
}));

const LeftPanel = styled(Stack)(({ theme }) => ({
  position: "relative",
  paddingRight: theme.spacing(6),
  minHeight: 520,
  [theme.breakpoints.down("md")]: {
    paddingRight: 0,
    minHeight: "auto"
  }
}));

const NetworkBg = styled(Box, {
  shouldForwardProp: (prop) => prop !== "bg"
})<{ bg: string }>(({ bg }) => ({
  position: "absolute",
  inset: "-40px 0 auto -40px",
  height: 360,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  opacity: 0.7,
  pointerEvents: "none",
  backgroundImage: `url(${bg})`
}));

const LeftContent = styled(Box)(() => ({
  position: "relative",
  zIndex: 1
}));

const Overline = styled(Typography)(() => ({
  letterSpacing: 2
}));

const SectionTitle = styled(Typography)(() => ({
  fontWeight: 700,
  marginTop: 8
}));

const LeadText = styled(Typography)(() => ({
  marginTop: 12,
  maxWidth: 520
}));

const SubText = styled(Typography)(() => ({
  marginTop: 12,
  maxWidth: 520
}));

const StepList = styled(Stack)(() => ({
  marginTop: 24,
  maxWidth: 520
}));

const StepBadge = styled(Box)(({ theme }) => ({
  width: 42,
  height: 42,
  borderRadius: 10,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: 700
}));

const StepBadgePrimary = styled(StepBadge)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.primary.main, 0.12),
  color: theme.palette.primary.main
}));

const StepBadgeSecondary = styled(StepBadge)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.secondary.main, 0.14),
  color: theme.palette.secondary.main
}));

const StepBadgeInfo = styled(StepBadge)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.info.main, 0.14),
  color: theme.palette.info.main
}));

const HighlightCardWrapper = styled(Box)(() => ({
  position: "relative",
  zIndex: 1,
  width: 540
}));

const HighlightCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3)
}));

const Bars = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(5, 1fr)",
  gap: theme.spacing(2),
  alignItems: "end"
}));

const Bar = styled(Box, {
  shouldForwardProp: (prop) => prop !== "h"
})<{ h: number }>(({ theme, h }) => ({
  borderRadius: 12,
  background: `linear-gradient(180deg, ${alpha(
    theme.palette.primary.main,
    0.2
  )}, ${alpha(theme.palette.primary.main, 0.05)})`
  ,
  height: h
}));

const DoctorBadge = styled(Box)(({ theme }) => ({
  width: 56,
  height: 56,
  borderRadius: "50%",
  backgroundColor: alpha(theme.palette.primary.main, 0.12),
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: 700,
  color: theme.palette.primary.main
}));

const LoginPanel = styled(Box)(({ theme }) => ({
  width: 540,
  marginLeft: "auto",
  borderRadius: 12,
  border: `1px solid ${alpha(theme.palette.text.primary, 0.08)}`,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[1]
}));

const PanelInner = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4)
}));

const LogoWrap = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  marginBottom: 16
}));

const LogoImg = styled("img")(() => ({
  width: 84,
  height: 84
}));

const BoldSubtitle = styled(Typography)(() => ({
  fontWeight: 600
}));

const LoginTitle = styled(Typography)(() => ({
  fontWeight: 700
}));

const LoginSubtitle = styled(Typography)(() => ({
  marginTop: 8
}));

const GoogleIcon = styled("img")(() => ({
  width: 20,
  height: 20
}));

const AppleIcon = styled("img")(() => ({
  width: 22,
  height: 22,
  display: "block"
}));

const FormLabel = styled(Typography)(() => ({
  fontWeight: 600
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: 12,
    backgroundColor: alpha(theme.palette.background.paper, 0.6)
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: alpha(theme.palette.text.primary, 0.15)
  },
  "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: alpha(theme.palette.text.primary, 0.25)
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: alpha(theme.palette.primary.main, 0.5)
  },
  "& .MuiOutlinedInput-input": {
    padding: "12px 16px"
  }
}));

const SignInButton = styled(Button)(() => ({
  textTransform: "none",
  fontWeight: 600
}));

const GoogleButton = styled(Button)(({ theme }) => ({
  borderColor: theme.palette.divider,
  backgroundColor: alpha(theme.palette.primary.main, 0.03),
  color: theme.palette.text.primary,
  fontWeight: 600,
  textTransform: "none",
  "&:hover": {
    borderColor: theme.palette.divider,
    backgroundColor: alpha(theme.palette.primary.main, 0.06)
  }
}));

const AppleButton = styled(Button)(() => ({
  backgroundColor: "#1f2937",
  color: "#ffffff",
  fontWeight: 600,
  textTransform: "none",
  overflow: "visible",
  "& .MuiButton-startIcon": {
    marginLeft: 0,
    marginRight: 8,
    overflow: "visible"
  },
  "&:hover": {
    backgroundColor: "#111827"
  }
}));

const LegalText = styled(Typography)(() => ({
  maxWidth: 360
}));

const networkPattern =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='700' height='500' viewBox='0 0 700 500'><g fill='none' stroke='%2390c7ff' stroke-width='1'><path d='M40 60 L160 30 L240 120 L120 180 Z'/><path d='M200 70 L320 40 L420 120 L300 180 Z'/><path d='M420 70 L560 40 L660 120 L520 180 Z'/><path d='M80 210 L220 190 L300 280 L160 330 Z'/><path d='M300 210 L440 190 L520 280 L380 330 Z'/><path d='M80 360 L200 340 L260 420 L120 450 Z'/></g><g fill='%2390c7ff'><circle cx='40' cy='60' r='3'/><circle cx='160' cy='30' r='3'/><circle cx='240' cy='120' r='3'/><circle cx='120' cy='180' r='3'/><circle cx='200' cy='70' r='3'/><circle cx='320' cy='40' r='3'/><circle cx='420' cy='120' r='3'/><circle cx='300' cy='180' r='3'/><circle cx='420' cy='70' r='3'/><circle cx='560' cy='40' r='3'/><circle cx='660' cy='120' r='3'/><circle cx='520' cy='180' r='3'/><circle cx='80' cy='210' r='3'/><circle cx='220' cy='190' r='3'/><circle cx='300' cy='280' r='3'/><circle cx='160' cy='330' r='3'/><circle cx='300' cy='210' r='3'/><circle cx='440' cy='190' r='3'/><circle cx='520' cy='280' r='3'/><circle cx='380' cy='330' r='3'/><circle cx='80' cy='360' r='3'/><circle cx='200' cy='340' r='3'/><circle cx='260' cy='420' r='3'/><circle cx='120' cy='450' r='3'/></g></svg>";

export default function LoginPasswordPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState("");
  const jsonServerUrl =
    process.env.NEXT_PUBLIC_JSON_SERVER_URL || "http://localhost:4000";

  const handlePasswordLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const response = await fetch(
        `${jsonServerUrl}/users?username=${encodeURIComponent(
          username
        )}&password=${encodeURIComponent(password)}`,
        { cache: "no-store" }
      );
      const users = await response.json();
      if (Array.isArray(users) && users.length > 0) {
        localStorage.setItem("scanbo-user", JSON.stringify(users[0]));
        router.push("/my-recordings");
      } else {
        setError("Invalid username or password.");
      }
    } catch {
      setError("Unable to sign in. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageRoot>
      <Background>
        <PageContainer maxWidth="lg">
          <TwoColumnGrid>
            <LeftPanel spacing={4}>
              <NetworkBg bg={networkPattern} />
              <LeftContent>
                <Overline variant="overline">Scanbo</Overline>
                <SectionTitle variant="h3">Scribe AI for faster clinical notes</SectionTitle>
                <LeadText variant="body1" color="text.secondary">
                  Dictate your encounter. Scanbo Scribe AI turns voice into
                  structured notes, captures key findings, and reduces
                  after-hours documentation.
                </LeadText>
                <SubText variant="body2" color="text.secondary">
                  Say goodbye to manual note taking, errors, and delays. With
                  automatic note-writing and AI-driven pre-authentication,
                  simplify the complexities and reduce errors to get faster
                  claim approvals.
                </SubText>
                <StepList spacing={2}>
                  <Stack direction="row" spacing={2} alignItems="flex-start">
                    <StepBadgePrimary>1</StepBadgePrimary>
                    <Box>
                      <BoldSubtitle variant="subtitle1">
                        Capture the full encounter
                      </BoldSubtitle>
                      <Typography variant="body2" color="text.secondary">
                        Real-time transcription with speaker context and key
                        clinical cues.
                      </Typography>
                    </Box>
                  </Stack>
                  <Stack direction="row" spacing={2} alignItems="flex-start">
                    <StepBadgeSecondary>2</StepBadgeSecondary>
                    <Box>
                      <BoldSubtitle variant="subtitle1">
                        Auto-generate structured notes
                      </BoldSubtitle>
                      <Typography variant="body2" color="text.secondary">
                        SOAP, assessment, and plan drafted in minutes.
                      </Typography>
                    </Box>
                  </Stack>
                  <Stack direction="row" spacing={2} alignItems="flex-start">
                    <StepBadgeInfo>3</StepBadgeInfo>
                    <Box>
                      <BoldSubtitle variant="subtitle1">
                        Reduce after-hours charting
                      </BoldSubtitle>
                      <Typography variant="body2" color="text.secondary">
                        Spend more time with patients, less on paperwork.
                      </Typography>
                    </Box>
                  </Stack>
                </StepList>
              </LeftContent>

              <HighlightCardWrapper>
                <HighlightCard elevation={1}>
                  <Stack spacing={2}>
                    <BoldSubtitle variant="subtitle1">
                      Clinician-ready summaries
                    </BoldSubtitle>
                    <Bars>
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Bar key={index} h={60 + index * 14} />
                      ))}
                    </Bars>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <DoctorBadge>DR</DoctorBadge>
                      <Box>
                        <BoldSubtitle variant="subtitle1">
                          Appointment Note Ready
                        </BoldSubtitle>
                        <Typography variant="body2" color="text.secondary">
                          SOAP + ICD suggestions in minutes
                        </Typography>
                      </Box>
                    </Stack>
                  </Stack>
                </HighlightCard>
              </HighlightCardWrapper>
            </LeftPanel>

            <LoginPanel>
              <PanelInner>
                <Stack spacing={2.5}>
                  <Box>
                    <LogoWrap>
                      <LogoImg src="/scanbo-logo.svg" alt="Scanbo logo" />
                    </LogoWrap>
                    <LoginTitle variant="h4">
                      Login
                    </LoginTitle>
                    <LoginSubtitle variant="body2" color="text.secondary">
                      Welcome back to your Scanbo Scribe AI assistant
                    </LoginSubtitle>
                  </Box>

                  <Stack spacing={2} component="form" id="login-password-form" onSubmit={handlePasswordLogin}>
                    <Stack spacing={1}>
                      <FormLabel variant="body2">Username</FormLabel>
                      <StyledTextField
                        placeholder="demo.doctor"
                        name="username"
                        autoComplete="username"
                        required
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                      />
                    </Stack>
                    <Stack spacing={1}>
                      <FormLabel variant="body2">Password</FormLabel>
                      <StyledTextField
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        name="password"
                        autoComplete="current-password"
                        required
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label={
                                  showPassword ? "Hide password" : "Show password"
                                }
                                onClick={() => setShowPassword((prev) => !prev)}
                                edge="end"
                                size="small"
                              >
                                {showPassword ? (
                                  <VisibilityOffOutlined />
                                ) : (
                                  <VisibilityOutlined />
                                )}
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
                      />
                    </Stack>
                  </Stack>

                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    justifyContent="space-between"
                    alignItems={{ xs: "flex-start", sm: "center" }}
                    spacing={1}
                  >
                    <FormControlLabel
                      control={<Checkbox defaultChecked />}
                      label="Keep me signed in"
                    />
                    <Button variant="text" size="small" component={Link} href="/forgot-password">
                      Forgot password?
                    </Button>
                  </Stack>

                  <SignInButton
                    variant="contained"
                    size="large"
                    fullWidth
                    type="submit"
                    form="login-password-form"
                    disabled={submitting}
                  >
                    {submitting ? "Signing in..." : "Sign in"}
                  </SignInButton>

                  {error ? (
                    <Typography variant="body2" color="error">
                      {error}
                    </Typography>
                  ) : null}

                  <Typography variant="body2" color="text.secondary" align="center">
                    or sign in with Google
                  </Typography>

                  <Stack spacing={1.5}>
                    <GoogleButton
                      variant="outlined"
                      size="large"
                      fullWidth
                      startIcon={
                        <GoogleIcon
                          alt="Google"
                          src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 533.5 544.3'><path fill='%234285f4' d='M533.5 278.4c0-17.4-1.4-34-4.1-50.2H272v95.1h146.9c-6.3 34.2-25 63.2-53.4 82.7v68h86.5c50.7-46.7 81.5-115.5 81.5-195.6z'/><path fill='%2334a853' d='M272 544.3c72.6 0 133.5-24.1 178-65.4l-86.5-68c-24.1 16.2-54.9 25.8-91.5 25.8-70.4 0-130.1-47.6-151.5-111.6H31.5v70.2C75.7 482.1 167.9 544.3 272 544.3z'/><path fill='%23fbbc04' d='M120.5 325.1c-10.1-30.2-10.1-62.6 0-92.8V162H31.5c-37.4 73.9-37.4 162.4 0 236.3l89-73.2z'/><path fill='%23ea4335' d='M272 107.7c39.5-.6 77.5 14 106.6 40.9l79.4-79.4C411.5 24.8 342.7-1.5 272 0 167.9 0 75.7 62.2 31.5 162l89 70.2C141.9 155.3 201.6 107.7 272 107.7z'/></svg>"
                        />
                      }
                      onClick={() => signIn("google", { callbackUrl: "/my-recordings" })}
                    >
                      Sign in with Google
                    </GoogleButton>
                    <AppleButton
                      variant="contained"
                      size="large"
                      fullWidth
                      startIcon={
                        <AppleIcon
                          alt="Apple"
                          src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 305 305'><path fill='%23ffffff' d='M40.74 188.29c-1.69 36.68 32.17 71.63 70.42 70.9 8.17-.15 16.04-1.36 23.46-4.51 6.92-2.92 13.3-7.3 21.36-7.3 8.26 0 14.16 4.22 21.29 7.21 7.67 3.2 15.73 4.5 24.03 4.2 35.51-1.35 66.77-32.28 69.44-68.16-18.65-8.41-31.76-28.12-31.52-48.84.24-20.68 13.9-39.92 32.99-47.87-9.75-14.12-28.04-22.1-45.65-22.46-17.26-.35-33.31 9.38-41.83 9.38-9.1 0-22.96-9.03-37.74-8.77-19.28.3-37.28 11.44-47.23 28.79-10.29 17.9-13.22 40.68-10.02 63.43zM204.11 40.52c9.16-11.14 15.22-26.44 13.49-41.52-13.24.54-29.09 8.81-38.51 19.69-8.58 9.86-15.65 25.75-13.7 40.9 14.75 1.1 29.63-7.48 38.72-19.07z'/></svg>"
                        />
                      }
                    >
                      Sign in with Apple
                    </AppleButton>
                  </Stack>

                  <LegalText variant="body2" color="text.secondary">
                    By continuing, you agree to secure handling of PHI and
                    compliant AI documentation workflows.
                  </LegalText>
                </Stack>
              </PanelInner>
            </LoginPanel>
          </TwoColumnGrid>
        </PageContainer>
      </Background>
    </PageRoot>
  );
}
