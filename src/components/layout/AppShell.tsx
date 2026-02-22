"use client";

import * as React from "react";
import { alpha, styled } from "@mui/material/styles";
import {
  AppBar,
  Box,
  Button,
  Checkbox,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  FormControlLabel,
  InputAdornment,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  TextField,
  Toolbar,
  Typography
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MicNoneOutlinedIcon from "@mui/icons-material/MicNoneOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import GridViewIcon from "@mui/icons-material/GridView";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import AddIcon from "@mui/icons-material/Add";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import IosShareOutlinedIcon from "@mui/icons-material/IosShareOutlined";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { apiGet, apiPost } from "@/lib/api-client";
import type { Patient } from "@/lib/types";

const PageRoot = styled("main")(() => ({
  width: "100%",
  height: "100vh",
  overflow: "hidden"
}));

const PageLayout = styled(Box, {
  shouldForwardProp: (prop) => prop !== "collapsed"
})<{ collapsed: boolean }>(({ theme, collapsed }) => ({
  height: "100vh",
  minHeight: 0,
  display: "grid",
  gridTemplateColumns: "1fr",
  transition: "grid-template-columns 0.28s ease",
  backgroundColor: theme.palette.background.paper,
  overflow: "hidden",
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: collapsed ? "96px 1fr" : "260px 1fr"
  }
}));

const Sidebar = styled(Box, {
  shouldForwardProp: (prop) => prop !== "collapsed"
})<{ collapsed: boolean }>(({ theme, collapsed }) => ({
  borderRight: "1px solid",
  borderColor: alpha(theme.palette.primary.main, 0.2),
  background:
    "radial-gradient(220px 180px at 20% 8%, rgba(61, 148, 227, 0.16) 0%, rgba(61, 148, 227, 0) 72%), radial-gradient(240px 180px at 85% 92%, rgba(46, 136, 223, 0.14) 0%, rgba(46, 136, 223, 0) 75%), linear-gradient(180deg, #f7fbff 0%, #eef6ff 50%, #e5f0ff 100%)",
  padding: collapsed ? theme.spacing(3, 2.5, 0) : theme.spacing(3, 3, 0),
  display: "none",
  flexDirection: "column",
  gap: theme.spacing(3),
  transition: "padding 0.28s ease",
  willChange: "padding",
  position: "sticky",
  top: 0,
  height: "100vh",
  overflow: "hidden",
  [theme.breakpoints.up("md")]: {
    display: "flex"
  }
}));

const SidebarHeader = styled(Stack, {
  shouldForwardProp: (prop) => prop !== "collapsed"
})<{ collapsed: boolean }>(({ collapsed }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: 12,
  justifyContent: collapsed ? "center" : "flex-start"
}));

const SidebarText = styled(Box)(() => ({
  minWidth: 0,
  display: "flex",
  flexDirection: "column"
}));

const Logo = styled("img")(() => ({
  width: 64,
  height: 64
}));

const SidebarTitle = styled(Typography)(() => ({
  fontWeight: 700,
  fontSize: "1.25rem"
}));

const SidebarSubtitle = styled(Typography)(() => ({
  fontSize: "0.85rem",
  lineHeight: 1.2
}));

const SidebarActions = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(1.5)
}));

const SidebarContent = styled(Stack)(() => ({
  flex: 1,
  display: "flex",
  flexDirection: "column"
}));

const ActionButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  fontWeight: 600,
  borderRadius: 12,
  padding: theme.spacing(1, 2)
}));

const PrimaryActionButton = styled(ActionButton)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  "&:hover": {
    backgroundColor: theme.palette.primary.dark
  }
}));

const SecondaryActionButton = styled(ActionButton)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.primary.main, 0.08),
  color: theme.palette.primary.main,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`
}));

const NavSection = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(1)
}));

const NavLabel = styled(Typography)(() => ({
  fontWeight: 600
}));

const NavItemRow = styled(Link, {
  shouldForwardProp: (prop) => prop !== "active" && prop !== "tone"
})<{ active?: boolean; tone: "primary" | "secondary" | "info" | "success" }>(
  ({ theme, active, tone }) => ({
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1.5),
    padding: theme.spacing(1, 1.5),
    borderRadius: 10,
    color: active ? theme.palette[tone].main : theme.palette.text.secondary,
  backgroundColor: active ? alpha(theme.palette[tone].main, 0.12) : "transparent",
  "&:hover": {
    backgroundColor: active ? alpha(theme.palette[tone].main, 0.12) : theme.palette.action.hover
  }
  })
);

const NavIcon = styled(Box, {
  shouldForwardProp: (prop) => prop !== "active" && prop !== "tone"
})<{ active?: boolean; tone: "primary" | "secondary" | "info" | "success" }>(
  ({ theme, active, tone }) => ({
    width: 28,
    height: 28,
    borderRadius: 8,
    display: "grid",
    placeItems: "center",
    color: theme.palette[tone].main,
    border: `1px solid ${alpha(theme.palette[tone].main, 0.25)}`,
    backgroundColor: "transparent"
  })
);

const NavItem = styled(Link, {
  shouldForwardProp: (prop) => prop !== "active"
})<{ active?: boolean }>(({ theme, active }) => ({
  textDecoration: "none",
  padding: theme.spacing(1.5, 2),
  borderRadius: 12,
  border: `1px solid ${theme.palette.divider}`,
  color: active ? theme.palette.primary.main : theme.palette.text.secondary,
  backgroundColor: active ? alpha(theme.palette.primary.main, 0.12) : "transparent",
  fontWeight: active ? 600 : 400
}));

const CollapsedIconStack = styled(Stack)(() => ({
  alignItems: "center",
  gap: 12
}));

const CollapsedActionStack = styled(Stack)(({ theme }) => ({
  alignItems: "center",
  gap: theme.spacing(1.25)
}));

const CollapsedIconButton = styled(IconButton)(() => ({
  width: 44,
  height: 44
}));

const IconTile = styled(Box, {
  shouldForwardProp: (prop) => prop !== "active" && prop !== "tone"
})<{ active?: boolean; tone: "primary" | "secondary" | "info" | "success" }>(
  ({ theme, active, tone }) => ({
    width: 40,
    height: 40,
    borderRadius: 12,
    display: "grid",
    placeItems: "center",
    color: theme.palette[tone].main,
    backgroundColor: active ? alpha(theme.palette[tone].main, 0.16) : "transparent",
    border: `1px solid ${alpha(theme.palette[tone].main, 0.2)}`
  })
);

const IconLink = styled(Link)(() => ({
  textDecoration: "none",
  display: "grid",
  placeItems: "center",
  width: 40,
  height: 40
}));

const MainColumn = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  minWidth: 0,
  minHeight: 0,
  height: "100vh",
  overflow: "hidden"
}));

const HeaderBar = styled(AppBar)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  top: 0,
  zIndex: theme.zIndex.appBar,
  backdropFilter: "blur(8px)",
  backgroundColor: alpha(theme.palette.background.paper, 0.9)
}));

const HeaderToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: 72,
  justifyContent: "space-between",
  gap: theme.spacing(2),
  backgroundColor: theme.palette.background.paper
}));

const HeaderTitle = styled(Typography)(() => ({
  fontWeight: 700,
  color: "#111111"
}));

const HeaderRight = styled(Stack)(() => ({
  flexDirection: "row",
  alignItems: "center",
  gap: 12
}));

const TranscriptionChip = styled(Chip)(({ theme }) => ({
  borderRadius: 999,
  backgroundColor: alpha(theme.palette.primary.main, 0.1),
  border: "none",
  color: theme.palette.primary.main,
  fontWeight: 600,
  paddingLeft: theme.spacing(0.75),
  paddingRight: theme.spacing(0.75)
}));


const UserButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  color: theme.palette.text.primary,
  display: "flex",
  alignItems: "center",
  gap: 8,
  borderRadius: 999,
  padding: theme.spacing(0.5, 1),
  border: "none",
  backgroundColor: "transparent"
}));

const UserAvatar = styled(Box)(({ theme }) => ({
  width: 28,
  height: 28,
  borderRadius: "50%",
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  display: "grid",
  placeItems: "center"
}));

const MenuHeaderAvatar = styled(Box)(({ theme }) => ({
  width: 64,
  height: 64,
  borderRadius: "50%",
  background: "linear-gradient(135deg, #2f8ce7 0%, #1f71bd 100%)",
  border: `4px solid ${alpha("#9ed0ff", 0.95)}`,
  color: "#fff",
  display: "grid",
  placeItems: "center",
  fontSize: "1.6rem",
  fontWeight: 800,
  position: "relative",
  lineHeight: 1
}));

const UpgradeButton = styled(Button)(({ theme }) => ({
  marginTop: "auto",
  textTransform: "none",
  fontWeight: 600,
  borderRadius: 10,
  backgroundColor: theme.palette.warning.main,
  color: theme.palette.warning.contrastText,
  padding: theme.spacing(1, 2.5),
  width: "100%",
  boxShadow: theme.shadows[1]
}));

const CollapsedUpgradeButton = styled(Button)(({ theme }) => ({
  marginTop: "auto",
  width: 44,
  height: 44,
  minWidth: 44,
  borderRadius: 10,
  backgroundColor: theme.palette.warning.main,
  color: theme.palette.warning.contrastText,
  fontWeight: 700,
  boxShadow: theme.shadows[1],
  "&:hover": {
    backgroundColor: theme.palette.warning.dark
  }
}));

const SupportCard = styled(Box)(({ theme }) => ({
  borderRadius: 12,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
  backgroundColor: alpha(theme.palette.primary.main, 0.08),
  padding: theme.spacing(1.5),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(0.5)
}));

const SupportTitle = styled(Typography)(() => ({
  fontWeight: 600
}));

const SupportSubtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary
}));

const SupportIcon = styled(Box)(({ theme }) => ({
  width: 28,
  height: 28,
  borderRadius: 8,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  display: "grid",
  placeItems: "center",
  marginLeft: "auto"
}));

const SidebarFooter = styled(Box)(() => ({
  marginTop: "auto",
  display: "flex",
  justifyContent: "center",
  paddingBottom: 0
}));

const ContentArea = styled(Box)(({ theme }) => ({
  flex: 1,
  minHeight: 0,
  overflowY: "auto",
  overflowX: "hidden",
  padding: 0,
  [theme.breakpoints.down("md")]: {
    padding: 0
  }
}));

const ContentCard = styled(Box)(({ theme }) => ({
  minHeight: "100%",
  borderRadius: 0,
  backgroundColor: theme.palette.background.paper,
  boxShadow: "none",
  padding: 0
}));

const BoldText = styled(Typography)(() => ({
  fontWeight: 600
}));

type AppShellProps = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  active: "dashboard" | "home" | "patients" | "consultation" | "settings" | "credits" | "support" | "profile";
};

type ModalFlowStep = "select" | "create" | "mode" | "processing";
type CaptureMode = "record" | "upload";

export default function AppShell({ title, subtitle, children, active }: AppShellProps) {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [loggingOut, setLoggingOut] = React.useState(false);
  const [startConsultOpen, setStartConsultOpen] = React.useState(false);
  const [patientsLoading, setPatientsLoading] = React.useState(false);
  const [patients, setPatients] = React.useState<Patient[]>([]);
  const [selectedPatientId, setSelectedPatientId] = React.useState<number | null>(null);
  const [patientQuery, setPatientQuery] = React.useState("");
  const [modalStep, setModalStep] = React.useState<ModalFlowStep>("select");
  const [selectedMode, setSelectedMode] = React.useState<CaptureMode | null>(null);
  const [patientForm, setPatientForm] = React.useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    phone: "",
    address: "",
    aadhaar: "",
    mrn: "",
    consent: false
  });
  const [patientFormError, setPatientFormError] = React.useState("");
  const menuOpen = Boolean(anchorEl);
  const sidebarOpen = false;

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (path: string) => {
    handleMenuClose();
    router.push(path);
  };

  const handleLogout = async () => {
    if (loggingOut) return;
    setLoggingOut(true);
    handleMenuClose();
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("scanbo-user");
    }
    try {
      await signOut({ redirect: false });
    } catch {
      // Ignore sign-out errors and continue local logout flow.
    } finally {
      setLoggingOut(false);
    }
    router.push("/login");
  };

  const loadPatients = React.useCallback(async () => {
    setPatientsLoading(true);
    try {
      const data = await apiGet<Patient[]>("/patients");
      setPatients(data);
    } finally {
      setPatientsLoading(false);
    }
  }, []);

  const openStartConsultDialog = async () => {
    setStartConsultOpen(true);
    setModalStep("select");
    setSelectedPatientId(null);
    setSelectedMode(null);
    setPatientQuery("");
    if (patients.length === 0) {
      await loadPatients();
    }
  };

  const handleContinueWithSelectedPatient = () => {
    if (!selectedPatientId) return;
    setModalStep("mode");
  };

  const handleCreatePatientAndContinue = async () => {
    if (!patientForm.firstName || !patientForm.age || !patientForm.gender || !patientForm.phone || !patientForm.consent) {
      setPatientFormError("Please fill required fields and consent.");
      return;
    }
    setPatientFormError("");
    const fullName = `${patientForm.firstName} ${patientForm.lastName}`.trim();
    const created = await apiPost<Patient>("/patients", {
      fullName,
      age: Number(patientForm.age),
      gender: patientForm.gender,
      phone: patientForm.phone,
      address: patientForm.address,
      aadhaar: patientForm.aadhaar,
      mrn: patientForm.mrn
    });
    setPatients((prev) => [created, ...prev]);
    setPatientForm({
      firstName: "",
      lastName: "",
      age: "",
      gender: "",
      phone: "",
      address: "",
      aadhaar: "",
      mrn: "",
      consent: false
    });
    setSelectedPatientId(created.id);
    setModalStep("mode");
  };

  const closeStartConsultDialog = () => {
    setStartConsultOpen(false);
    setModalStep("select");
    setSelectedMode(null);
  };

  const handleStartConsultFlow = () => {
    if (!selectedPatientId || !selectedMode) return;
    setModalStep("processing");
    window.setTimeout(() => {
      closeStartConsultDialog();
      const params = new URLSearchParams({
        patientId: String(selectedPatientId),
        mode: selectedMode
      });
      if (selectedMode === "record") {
        params.set("autostart", "1");
      }
      router.push(`/start-consult?${params.toString()}`);
    }, 1700);
  };

  const filteredPatients = patients.filter((p) => {
    const q = patientQuery.trim().toLowerCase();
    if (!q) return true;
    return (
      p.fullName.toLowerCase().includes(q) ||
      p.phone.includes(q) ||
      (p.mrn || "").toLowerCase().includes(q) ||
      (p.aadhaar || "").includes(q)
    );
  });
  const selectedPatient = patients.find((patient) => patient.id === selectedPatientId) ?? null;

  return (
    <PageRoot>
      <PageLayout collapsed={!sidebarOpen}>
        <Sidebar collapsed={!sidebarOpen}>
          <SidebarHeader collapsed={!sidebarOpen}>
            <Logo src="/scanbo-logo.svg" alt="Scanbo logo" />
            {sidebarOpen ? (
              <SidebarText>
                <SidebarTitle variant="subtitle1">Scanbo</SidebarTitle>
                <SidebarSubtitle variant="caption" color="text.secondary">
                  Scribe AI
                </SidebarSubtitle>
              </SidebarText>
            ) : null}
          </SidebarHeader>

          {sidebarOpen ? (
            <SidebarContent spacing={2}>
              <SidebarActions>
                <Button
                  variant="contained"
                  onClick={openStartConsultDialog}
                  sx={{
                    textTransform: "none",
                    fontWeight: 600,
                    borderRadius: 12,
                    padding: (theme) => theme.spacing(1, 2),
                    backgroundColor: "primary.main",
                    "&:hover": { backgroundColor: "primary.dark" }
                  }}
                >
                  + Start Consult
                </Button>
              </SidebarActions>

              <NavSection>
                <NavItemRow href="/dashboard" active={active === "dashboard"} tone="primary">
                  <NavIcon active={active === "dashboard"} tone="primary">
                    <GridViewIcon fontSize="small" />
                  </NavIcon>
                  <NavLabel variant="body2">Dashboard</NavLabel>
                </NavItemRow>
                <NavItemRow href="/my-recordings" active={active === "home"} tone="primary">
                  <NavIcon active={active === "home"} tone="primary">
                    <DescriptionOutlinedIcon fontSize="small" />
                  </NavIcon>
                  <NavLabel variant="body2">My Recording</NavLabel>
                </NavItemRow>
                <NavItemRow href="/patients" active={active === "patients"} tone="secondary">
                  <NavIcon active={active === "patients"} tone="secondary">
                    <PersonOutlineOutlinedIcon fontSize="small" />
                  </NavIcon>
                  <NavLabel variant="body2">Patients</NavLabel>
                </NavItemRow>
                <NavItemRow href="/settings" active={active === "settings"} tone="info">
                  <NavIcon active={active === "settings"} tone="info">
                    <SettingsOutlinedIcon fontSize="small" />
                  </NavIcon>
                  <NavLabel variant="body2">Settings</NavLabel>
                </NavItemRow>
                <NavItemRow href="/credits" active={active === "credits"} tone="secondary">
                  <NavIcon active={active === "credits"} tone="secondary">
                    <CreditCardOutlinedIcon fontSize="small" />
                  </NavIcon>
                  <NavLabel variant="body2">Credits & Usage</NavLabel>
                </NavItemRow>
                <NavItemRow href="/support" active={active === "support"} tone="primary">
                  <NavIcon active={active === "support"} tone="primary">
                    <HelpOutlineOutlinedIcon fontSize="small" />
                  </NavIcon>
                  <NavLabel variant="body2">Support</NavLabel>
                </NavItemRow>
              </NavSection>

              <SidebarFooter>
                <Stack spacing={1.5} width="100%">
                  <UpgradeButton>Upgrade to Pro</UpgradeButton>
                  <SupportCard>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Box>
                        <SupportTitle variant="body2">Ask Scanbo</SupportTitle>
                        <SupportSubtitle variant="caption">
                          Clinical Decision Support
                        </SupportSubtitle>
                      </Box>
                      <SupportIcon>
                        <SupportAgentOutlinedIcon fontSize="small" />
                      </SupportIcon>
                    </Stack>
                  </SupportCard>
                </Stack>
              </SidebarFooter>
            </SidebarContent>
          ) : (
            <SidebarContent sx={{ justifyContent: "space-between", height: "100%" }}>
              <CollapsedIconStack>
                <CollapsedActionStack>
                  <CollapsedIconButton>
                    <IconLink
                      href="/start-consult"
                      onClick={(event) => {
                        event.preventDefault();
                        void openStartConsultDialog();
                      }}
                    >
                      <IconTile active tone="primary">
                        <AddIcon fontSize="small" />
                      </IconTile>
                    </IconLink>
                  </CollapsedIconButton>
                </CollapsedActionStack>

                <CollapsedIconButton>
                  <IconLink href="/dashboard">
                    <IconTile active={active === "dashboard"} tone="primary">
                      <GridViewIcon fontSize="small" />
                    </IconTile>
                  </IconLink>
                </CollapsedIconButton>
                <CollapsedIconButton>
                  <IconLink href="/my-recordings">
                    <IconTile active={active === "home"} tone="primary">
                      <DescriptionOutlinedIcon fontSize="small" />
                    </IconTile>
                  </IconLink>
                </CollapsedIconButton>
                <CollapsedIconButton>
                  <IconLink href="/patients">
                    <IconTile active={active === "patients"} tone="secondary">
                      <PersonOutlineOutlinedIcon fontSize="small" />
                    </IconTile>
                  </IconLink>
                </CollapsedIconButton>
              </CollapsedIconStack>
              <SidebarFooter sx={{ pb: 1 }}>
                <Stack spacing={1.25} alignItems="center">
                  <CollapsedIconButton>
                    <IconLink href="/settings">
                      <IconTile active={active === "settings"} tone="info">
                        <SettingsOutlinedIcon fontSize="small" />
                      </IconTile>
                    </IconLink>
                  </CollapsedIconButton>
                  <CollapsedIconButton>
                    <IconLink href="/credits">
                      <IconTile active={active === "credits"} tone="secondary">
                        <CreditCardOutlinedIcon fontSize="small" />
                      </IconTile>
                    </IconLink>
                  </CollapsedIconButton>
                  <CollapsedIconButton>
                    <IconLink href="/support">
                      <IconTile active={active === "support"} tone="primary">
                        <HelpOutlineOutlinedIcon fontSize="small" />
                      </IconTile>
                    </IconLink>
                  </CollapsedIconButton>
                  <CollapsedUpgradeButton>Pro</CollapsedUpgradeButton>
                </Stack>
              </SidebarFooter>
            </SidebarContent>
          )}
        </Sidebar>

        <MainColumn>
          <HeaderBar position="sticky" color="inherit" elevation={0}>
            <HeaderToolbar>
              <HeaderTitle variant="h6">{title}</HeaderTitle>

              <HeaderRight>
                <TranscriptionChip
                  label={<BoldText variant="body2">Recordings Left: 20</BoldText>}
                />
                <UserButton onClick={handleMenuOpen}>
                  <UserAvatar>
                    <PersonOutlineOutlinedIcon fontSize="small" />
                  </UserAvatar>
                  <BoldText variant="body2">Hasmukh Lohar</BoldText>
                  <ExpandMoreIcon fontSize="small" />
                </UserButton>
                <Menu
                  anchorEl={anchorEl}
                  open={menuOpen}
                  onClose={handleMenuClose}
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                  PaperProps={{
                    sx: {
                      mt: 1.2,
                      width: 340,
                      borderRadius: 3,
                      border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                      overflow: "hidden",
                      backgroundColor: "background.paper",
                      boxShadow: "0 14px 36px rgba(29, 78, 137, 0.14)"
                    }
                  }}
                >
                  <Box
                    sx={{
                      px: 2,
                      py: 1.8,
                      color: "text.primary",
                      background: "linear-gradient(135deg, #eef5ff 0%, #deecff 100%)",
                      borderBottom: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.18)}`,
                      position: "relative",
                      overflow: "hidden"
                    }}
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        right: -50,
                        top: -30,
                        width: 180,
                        height: 180,
                        borderRadius: "50%",
                        backgroundColor: "rgba(66, 150, 232, 0.14)"
                      }}
                    />
                    <MenuHeaderAvatar>
                      HL
                      <Box
                        sx={{
                          position: "absolute",
                          right: 2,
                          bottom: 5,
                          width: 16,
                          height: 16,
                          borderRadius: "50%",
                          border: "3px solid #deecff",
                          backgroundColor: "#10b981"
                        }}
                      />
                    </MenuHeaderAvatar>
                    <Typography variant="h6" fontWeight={800} sx={{ mt: 1 }}>
                      Dr. Hasmukh Lohar
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.88 }}>
                      hasmukh@scanbo.ai
                    </Typography>
                    <Chip
                      icon={<StarRoundedIcon sx={{ color: "#f59e0b !important" }} />}
                      label="Pro Plan"
                      sx={{
                        mt: 1,
                        borderRadius: 999,
                        fontWeight: 700,
                        color: "#f59e0b",
                        backgroundColor: "rgba(245, 158, 11, 0.16)",
                        border: "1px solid rgba(245, 158, 11, 0.35)"
                      }}
                    />
                  </Box>

                  <Stack sx={{ p: 1 }}>
                    <MenuItem onClick={() => handleNavigate("/profile")} sx={{ borderRadius: 2, py: 0.9, minHeight: 0, gap: 1.1 }}>
                      <PersonOutlineOutlinedIcon color="action" />
                      <Typography fontWeight={700}>My Profile</Typography>
                    </MenuItem>
                    <MenuItem onClick={() => handleNavigate("/settings")} sx={{ borderRadius: 2, py: 0.9, minHeight: 0, gap: 1.1 }}>
                      <SettingsOutlinedIcon color="action" />
                      <Typography fontWeight={700}>Settings</Typography>
                    </MenuItem>
                    <MenuItem onClick={() => handleNavigate("/credits")} sx={{ borderRadius: 2, py: 0.9, minHeight: 0, gap: 1.1 }}>
                      <CreditCardOutlinedIcon color="action" />
                      <Typography fontWeight={700} sx={{ flex: 1 }}>Credits & Usage</Typography>
                      <Chip size="small" label="20 left" sx={{ borderRadius: 999, fontWeight: 700, bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16), color: "primary.main" }} />
                    </MenuItem>
                    <MenuItem onClick={() => handleNavigate("/my-recordings")} sx={{ borderRadius: 2, py: 0.9, minHeight: 0, gap: 1.1 }}>
                      <DescriptionOutlinedIcon color="action" />
                      <Typography fontWeight={700} sx={{ flex: 1 }}>My Notes</Typography>
                      <Chip size="small" label="9 pending" sx={{ borderRadius: 999, fontWeight: 700, bgcolor: (theme) => alpha(theme.palette.error.main, 0.14), color: "error.main" }} />
                    </MenuItem>
                    <Divider sx={{ my: 1 }} />
                    <MenuItem onClick={() => handleNavigate("/support")} sx={{ borderRadius: 2, py: 0.9, minHeight: 0, gap: 1.1 }}>
                      <HelpOutlineOutlinedIcon color="action" />
                      <Typography fontWeight={700}>Help & Support</Typography>
                    </MenuItem>
                    <MenuItem sx={{ borderRadius: 2, py: 0.9, minHeight: 0, gap: 1.1 }}>
                      <IosShareOutlinedIcon color="action" />
                      <Typography fontWeight={700}>Invite Colleague</Typography>
                    </MenuItem>
                    <Divider sx={{ my: 1 }} />
                    <MenuItem
                      onClick={handleLogout}
                      disabled={loggingOut}
                      sx={{ borderRadius: 2, py: 0.9, minHeight: 0, gap: 1.1, color: "error.main" }}
                    >
                      {loggingOut ? (
                        <Stack direction="row" spacing={1} alignItems="center">
                          <CircularProgress size={16} />
                          <span>Signing out...</span>
                        </Stack>
                      ) : (
                        <>
                          <LogoutRoundedIcon />
                          <Typography fontWeight={700}>Sign Out</Typography>
                        </>
                      )}
                    </MenuItem>
                  </Stack>
                </Menu>
              </HeaderRight>
            </HeaderToolbar>
          </HeaderBar>

          <ContentArea>
            <ContentCard>{children}</ContentCard>
          </ContentArea>
        </MainColumn>
      </PageLayout>

      <Dialog
        open={startConsultOpen}
        onClose={closeStartConsultDialog}
        fullWidth
        maxWidth="sm"
        PaperProps={{ sx: { borderRadius: 3, overflow: "hidden" } }}
      >
        <DialogContent sx={{ p: 0 }}>
          <Stack spacing={0}>
            <Box sx={{ px: { xs: 2, sm: 3 }, pt: { xs: 2, sm: 2.5 }, pb: 1.25 }}>
              <Stack direction="row" alignItems="flex-start" justifyContent="space-between">
                <Box>
                  <Typography variant="h5" fontWeight={700}>
                    {modalStep === "create"
                      ? "Create New Patient"
                      : modalStep === "mode"
                        ? "Start Scribe"
                        : modalStep === "processing"
                          ? "Setting up your scribe"
                          : "Select Patient"}
                  </Typography>
                  <Typography variant="h6" color="text.secondary" fontWeight={500} sx={{ fontSize: "1.1rem" }}>
                    {modalStep === "create"
                      ? "Add patient details to continue"
                      : modalStep === "mode"
                        ? "Choose how to capture this consultation"
                        : modalStep === "processing"
                          ? "Connecting AI transcription engine"
                          : "Search or create a new patient to begin"}
                  </Typography>
                </Box>
                <IconButton
                  onClick={closeStartConsultDialog}
                >
                  <CloseRoundedIcon />
                </IconButton>
              </Stack>
            </Box>

            {modalStep === "select" ? (
              <>
                <TextField
                  placeholder="Search by name, phone, Aadhaar or MRN"
                  fullWidth
                  value={patientQuery}
                  onChange={(event) => setPatientQuery(event.target.value)}
                  sx={{
                    px: { xs: 2, sm: 3 },
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2.5,
                      backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.03)
                    }
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchRoundedIcon color="action" />
                      </InputAdornment>
                    )
                  }}
                />
                <Box sx={{ px: { xs: 2, sm: 3 }, py: 1.25 }}>
                  <Stack spacing={0.9} sx={{ maxHeight: 280, overflowY: "auto", pr: 0.5 }}>
                    {patientsLoading ? (
                      <Typography variant="body2" color="text.secondary">
                        Loading patients...
                      </Typography>
                    ) : filteredPatients.length === 0 ? (
                      <Typography variant="body2" color="text.secondary">
                        No patient found. Create a new patient.
                      </Typography>
                    ) : (
                      filteredPatients.map((patient) => (
                        <Box
                          key={patient.id}
                          onClick={() => setSelectedPatientId(patient.id)}
                          sx={{
                            border: (theme) =>
                              `2px solid ${
                                selectedPatientId === patient.id ? theme.palette.primary.main : theme.palette.divider
                              }`,
                            borderRadius: 2.5,
                            p: 1.75,
                            backgroundColor: (theme) =>
                              selectedPatientId === patient.id
                                ? alpha(theme.palette.primary.main, 0.08)
                                : theme.palette.background.paper,
                            cursor: "pointer"
                          }}
                        >
                          <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
                            <Stack direction="row" spacing={1.75} alignItems="center">
                              <Box
                                sx={{
                                  width: 56,
                                  height: 56,
                                  borderRadius: "50%",
                                  display: "grid",
                                  placeItems: "center",
                                  color: "#fff",
                                  fontWeight: 700,
                                  background: "linear-gradient(135deg, #3aa8f3 0%, #1f7bc7 100%)"
                                }}
                              >
                                {patient.fullName
                                  .split(" ")
                                  .filter(Boolean)
                                  .slice(0, 2)
                                  .map((part) => part[0])
                                  .join("")
                                  .toUpperCase() || "PT"}
                              </Box>
                              <Box>
                                <Typography variant="subtitle1" fontWeight={700}>
                                  {patient.fullName}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {patient.age}Y • {patient.gender} • {patient.phone}
                                </Typography>
                              </Box>
                            </Stack>
                            {selectedPatientId === patient.id ? (
                              <CheckCircleRoundedIcon color="primary" />
                            ) : (
                              <Box
                                sx={{
                                  width: 22,
                                  height: 22,
                                  borderRadius: "50%",
                                  border: (theme) => `2px solid ${theme.palette.divider}`
                                }}
                              />
                            )}
                          </Stack>
                        </Box>
                      ))
                    )}
                  </Stack>
                </Box>
              </>
            ) : (
              modalStep === "create" ? (
                <>
                <Box sx={{ px: { xs: 2, sm: 3 }, pb: 1.25 }}>
                  <Button startIcon={<ArrowBackRoundedIcon />} onClick={() => setModalStep("select")} sx={{ textTransform: "none", px: 0 }}>
                    Back to search
                  </Button>
                </Box>
                <Stack spacing={1.25} sx={{ px: { xs: 2, sm: 3 }, pb: 1.25 }}>
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                    <TextField
                      label="First Name *"
                      placeholder="e.g. Anjali"
                      value={patientForm.firstName}
                      onChange={(event) => setPatientForm((prev) => ({ ...prev, firstName: event.target.value }))}
                      fullWidth
                    />
                    <TextField
                      label="Last Name"
                      placeholder="e.g. Singh"
                      value={patientForm.lastName}
                      onChange={(event) => setPatientForm((prev) => ({ ...prev, lastName: event.target.value }))}
                      fullWidth
                    />
                  </Stack>
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                    <TextField
                      label="Age *"
                      placeholder="e.g. 32"
                      value={patientForm.age}
                      onChange={(event) => setPatientForm((prev) => ({ ...prev, age: event.target.value }))}
                      fullWidth
                    />
                    <TextField
                      label="Gender *"
                      select
                      value={patientForm.gender}
                      onChange={(event) => setPatientForm((prev) => ({ ...prev, gender: event.target.value }))}
                      fullWidth
                    >
                      <MenuItem value="">Select</MenuItem>
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </TextField>
                  </Stack>
                  <TextField
                    label="Phone Number *"
                    placeholder="e.g. 9876543210"
                    value={patientForm.phone}
                    onChange={(event) => setPatientForm((prev) => ({ ...prev, phone: event.target.value }))}
                  />
                  <TextField
                    label="Address"
                    value={patientForm.address}
                    onChange={(event) => setPatientForm((prev) => ({ ...prev, address: event.target.value }))}
                  />
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                    <TextField
                      label="Aadhaar / Third-Party ID"
                      value={patientForm.aadhaar}
                      onChange={(event) => setPatientForm((prev) => ({ ...prev, aadhaar: event.target.value }))}
                      fullWidth
                    />
                    <TextField
                      label="Hospital ID / MRN"
                      value={patientForm.mrn}
                      onChange={(event) => setPatientForm((prev) => ({ ...prev, mrn: event.target.value }))}
                      fullWidth
                    />
                  </Stack>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={patientForm.consent}
                        onChange={(event) => setPatientForm((prev) => ({ ...prev, consent: event.target.checked }))}
                      />
                    }
                    label="Consent received"
                  />
                  {patientFormError ? (
                    <Typography variant="caption" color="error.main">
                      {patientFormError}
                    </Typography>
                  ) : null}
                </Stack>
                </>
              ) : modalStep === "mode" ? (
                <Stack spacing={1.25} sx={{ px: { xs: 2, sm: 3 }, pb: 1.25 }}>
                  <Box
                    sx={{
                      border: (theme) => `1.5px solid ${alpha(theme.palette.primary.main, 0.28)}`,
                      backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.06),
                      borderRadius: 2,
                      px: 1.5,
                      py: 1.2
                    }}
                  >
                    <Typography variant="subtitle2" fontWeight={700}>
                      {selectedPatient?.fullName || "Selected patient"}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {selectedPatient ? `${selectedPatient.age}Y • ${selectedPatient.gender}` : ""}
                    </Typography>
                  </Box>
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={1.25}>
                    <Box
                      onClick={() => setSelectedMode("record")}
                      sx={{
                        flex: 1,
                        borderRadius: 2,
                        border: (theme) =>
                          `2px solid ${
                            selectedMode === "record" ? theme.palette.primary.main : theme.palette.divider
                          }`,
                        backgroundColor: (theme) =>
                          selectedMode === "record"
                            ? alpha(theme.palette.primary.main, 0.08)
                            : theme.palette.background.paper,
                        p: 2,
                        textAlign: "center",
                        cursor: "pointer"
                      }}
                    >
                      <Typography variant="h6">Live Recording</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Record consultation in real-time
                      </Typography>
                    </Box>
                    <Box
                      onClick={() => setSelectedMode("upload")}
                      sx={{
                        flex: 1,
                        borderRadius: 2,
                        border: (theme) =>
                          `2px solid ${
                            selectedMode === "upload" ? theme.palette.primary.main : theme.palette.divider
                          }`,
                        backgroundColor: (theme) =>
                          selectedMode === "upload"
                            ? alpha(theme.palette.primary.main, 0.08)
                            : theme.palette.background.paper,
                        p: 2,
                        textAlign: "center",
                        cursor: "pointer"
                      }}
                    >
                      <Typography variant="h6">Upload Audio</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Upload a pre-recorded audio file
                      </Typography>
                    </Box>
                  </Stack>
                </Stack>
              ) : (
                <Stack spacing={1.25} sx={{ px: { xs: 2, sm: 3 }, pb: 2.5, pt: 0.5, alignItems: "center" }}>
                  <Box
                    sx={{
                      width: 74,
                      height: 74,
                      borderRadius: "50%",
                      display: "grid",
                      placeItems: "center",
                      color: "#fff",
                      background: "linear-gradient(135deg, #1A7DC4, #4FACFE)",
                      boxShadow: (theme) => `0 8px 22px ${alpha(theme.palette.primary.main, 0.35)}`
                    }}
                  >
                    <ArrowForwardRoundedIcon />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Preparing consultation workspace...
                  </Typography>
                  <Box
                    sx={{
                      width: "100%",
                      height: 6,
                      borderRadius: 999,
                      bgcolor: (theme) => alpha(theme.palette.primary.main, 0.12),
                      overflow: "hidden"
                    }}
                  >
                    <Box
                      sx={{
                        width: "70%",
                        height: "100%",
                        borderRadius: 999,
                        background: "linear-gradient(90deg, #1A7DC4, #4FACFE)"
                      }}
                    />
                  </Box>
                </Stack>
              )
            )}
            {modalStep !== "processing" ? <Divider /> : null}
            {modalStep !== "processing" ? (
            <DialogActions sx={{ px: { xs: 2, sm: 3 }, py: 1.25, gap: 1.2, justifyContent: "space-between" }}>
              {modalStep === "select" ? (
                <>
                  <Button
                    color="inherit"
                    onClick={closeStartConsultDialog}
                    sx={{ textTransform: "none" }}
                  >
                    Cancel
                  </Button>
                  <Stack direction="row" spacing={1.5}>
                    <Button
                      variant="outlined"
                      startIcon={<AddIcon />}
                      onClick={() => setModalStep("create")}
                      sx={{ textTransform: "none", borderRadius: 2.2, px: 2.4 }}
                    >
                      Create Patient
                    </Button>
                    <Button
                      variant="contained"
                      endIcon={<ArrowForwardRoundedIcon />}
                      onClick={handleContinueWithSelectedPatient}
                      disabled={!selectedPatient}
                      sx={{ textTransform: "none", borderRadius: 2.2, px: 2.8 }}
                    >
                      Continue
                    </Button>
                  </Stack>
                </>
              ) : modalStep === "create" ? (
                <>
                  <Button color="inherit" onClick={() => setModalStep("select")} sx={{ textTransform: "none" }}>
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    endIcon={<ArrowForwardRoundedIcon />}
                    onClick={handleCreatePatientAndContinue}
                    sx={{ textTransform: "none", borderRadius: 2.2, px: 2.8 }}
                  >
                    Create & Continue
                  </Button>
                </>
              ) : (
                <>
                  <Button color="inherit" onClick={() => setModalStep("select")} sx={{ textTransform: "none" }}>
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    endIcon={<ArrowForwardRoundedIcon />}
                    onClick={handleStartConsultFlow}
                    disabled={!selectedMode}
                    sx={{ textTransform: "none", borderRadius: 2.2, px: 2.8 }}
                  >
                    {selectedMode === "upload" ? "Select File" : "Start Recording"}
                  </Button>
                </>
              )}
            </DialogActions>
            ) : null}
          </Stack>
        </DialogContent>
      </Dialog>
    </PageRoot>
  );
}
