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
  Divider,
  FormControlLabel,
  InputAdornment,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  TextField,
  Toolbar,
  Tooltip,
  Typography
} from "@mui/material";
import AppButton from "@/components/ui/AppButton";
import AppDialog from "@/components/ui/AppDialog";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MicNoneOutlinedIcon from "@mui/icons-material/MicNoneOutlined";
import MicRoundedIcon from "@mui/icons-material/MicRounded";
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
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import PersonSearchRoundedIcon from "@mui/icons-material/PersonSearchRounded";
import PersonAddRoundedIcon from "@mui/icons-material/PersonAddRounded";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { apiGet, apiPost } from "@/lib/api-client";
import type { Patient } from "@/lib/types";
import { ConsultDialogContext } from "@/context/ConsultDialogContext";
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
  ({ theme, active }) => ({
    width: 40,
    height: 40,
    borderRadius: 12,
    display: "grid",
    placeItems: "center",
    transition: "all 0.18s ease",
    color: active ? "#fff" : theme.palette.text.secondary,
    backgroundColor: active
      ? theme.palette.primary.main
      : alpha(theme.palette.primary.main, 0.06),
    border: `1px solid ${active ? "transparent" : alpha(theme.palette.primary.main, 0.12)}`,
    boxShadow: active ? `0 3px 10px ${alpha(theme.palette.primary.main, 0.32)}` : "none",
    "&:hover": {
      backgroundColor: active
        ? theme.palette.primary.dark
        : alpha(theme.palette.primary.main, 0.12),
      color: active ? "#fff" : theme.palette.primary.main,
      transform: "scale(1.06)"
    }
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
  borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
  top: 0,
  zIndex: theme.zIndex.appBar,
  backdropFilter: "blur(12px)",
  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.55)} 0%, ${alpha(theme.palette.background.paper, 1)} 55%)`,
  boxShadow: `0 1px 0 ${alpha(theme.palette.primary.main, 0.08)}, 0 2px 8px ${alpha(theme.palette.primary.main, 0.04)}`
}));

const HeaderToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: 60,
  justifyContent: "space-between",
  gap: theme.spacing(2),
  backgroundColor: "transparent"
}));

const HeaderTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  color: theme.palette.text.primary,
  letterSpacing: "-0.01em"
}));

const HeaderRight = styled(Stack)(() => ({
  flexDirection: "row",
  alignItems: "center",
  gap: 12
}));

const TranscriptionChip = styled(Chip)(({ theme }) => ({
  borderRadius: 999,
  backgroundColor: alpha(theme.palette.primary.main, 0.08),
  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
  color: theme.palette.primary.main,
  fontWeight: 700,
  height: 40,
  paddingLeft: theme.spacing(0.5),
  paddingRight: theme.spacing(1.25),
  boxShadow: `0 1px 4px ${alpha(theme.palette.primary.main, 0.1)}`,
  "& .MuiChip-label": { fontSize: "0.875rem" },
  "& .MuiChip-icon": { color: theme.palette.primary.main, marginLeft: theme.spacing(0.5) }
}));

const UserButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  color: theme.palette.text.primary,
  display: "flex",
  alignItems: "center",
  gap: 8,
  borderRadius: 999,
  padding: theme.spacing(0, 1.5, 0, 0.75),
  minHeight: 40,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
  backgroundColor: alpha(theme.palette.background.paper, 0.9),
  boxShadow: `0 1px 4px ${alpha(theme.palette.primary.main, 0.08)}`,
  transition: "all 0.18s ease",
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.04),
    borderColor: alpha(theme.palette.primary.main, 0.28),
    boxShadow: `0 2px 8px ${alpha(theme.palette.primary.main, 0.12)}`
  }
}));

const UserAvatar = styled(Box)(({ theme }) => ({
  width: 32,
  height: 32,
  borderRadius: "50%",
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  color: theme.palette.primary.contrastText,
  display: "grid",
  placeItems: "center",
  fontWeight: 700,
  fontSize: "0.75rem",
  boxShadow: `0 2px 6px ${alpha(theme.palette.primary.main, 0.35)}`
}));

const MenuHeaderAvatar = styled(Box)(({ theme }) => ({
  width: 64,
  height: 64,
  borderRadius: "50%",
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  border: `4px solid ${alpha(theme.palette.primary.light, 0.9)}`,
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
  const [navigatingTo, setNavigatingTo] = React.useState<string | null>(null);
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
    if (navigatingTo) return;
    setNavigatingTo(path);
    window.setTimeout(() => {
      setNavigatingTo(null);
      handleMenuClose();
      router.push(path);
    }, 600);
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
      router.push(`/consultation?${params.toString()}`);
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
                <AppButton intent="primary" startIcon={<MicRoundedIcon />} onClick={openStartConsultDialog}>
                  Start Consult
                </AppButton>
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
                {/* New Consult CTA */}
                <CollapsedActionStack>
                  <Tooltip title="New Consult" placement="right" arrow>
                    <CollapsedIconButton>
                      <IconLink
                        href="#"
                        onClick={(event) => {
                          event.preventDefault();
                          void openStartConsultDialog();
                        }}
                      >
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: 12,
                            display: "grid",
                            placeItems: "center",
                            background: (theme) =>
                              `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
                            color: "#fff",
                            boxShadow: (theme) => `0 4px 12px ${alpha(theme.palette.primary.main, 0.38)}`,
                            transition: "all 0.18s ease",
                            "&:hover": {
                              transform: "scale(1.08)",
                              boxShadow: (theme) => `0 6px 16px ${alpha(theme.palette.primary.main, 0.48)}`
                            }
                          }}
                        >
                          <MicRoundedIcon fontSize="small" />
                        </Box>
                      </IconLink>
                    </CollapsedIconButton>
                  </Tooltip>
                </CollapsedActionStack>

                {/* Divider */}
                <Box
                  sx={{
                    width: 28,
                    height: 1,
                    borderRadius: 999,
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.15)
                  }}
                />

                {/* Main nav */}
                <Tooltip title="Dashboard" placement="right" arrow>
                  <CollapsedIconButton>
                    <IconLink href="/dashboard">
                      <IconTile active={active === "dashboard"} tone="primary">
                        <GridViewIcon fontSize="small" />
                      </IconTile>
                    </IconLink>
                  </CollapsedIconButton>
                </Tooltip>
                <Tooltip title="My Recordings" placement="right" arrow>
                  <CollapsedIconButton>
                    <IconLink href="/my-recordings">
                      <IconTile active={active === "home"} tone="primary">
                        <DescriptionOutlinedIcon fontSize="small" />
                      </IconTile>
                    </IconLink>
                  </CollapsedIconButton>
                </Tooltip>
                <Tooltip title="Patients" placement="right" arrow>
                  <CollapsedIconButton>
                    <IconLink href="/patients">
                      <IconTile active={active === "patients"} tone="primary">
                        <PersonOutlineOutlinedIcon fontSize="small" />
                      </IconTile>
                    </IconLink>
                  </CollapsedIconButton>
                </Tooltip>
              </CollapsedIconStack>

              <SidebarFooter sx={{ pb: 1.5 }}>
                <Stack spacing={1.25} alignItems="center">
                  {/* Divider */}
                  <Box
                    sx={{
                      width: 28,
                      height: 1,
                      borderRadius: 999,
                      bgcolor: (theme) => alpha(theme.palette.primary.main, 0.15)
                    }}
                  />
                  <Tooltip title="Settings" placement="right" arrow>
                    <CollapsedIconButton>
                      <IconLink href="/settings">
                        <IconTile active={active === "settings"} tone="primary">
                          <SettingsOutlinedIcon fontSize="small" />
                        </IconTile>
                      </IconLink>
                    </CollapsedIconButton>
                  </Tooltip>
                  <Tooltip title="Credits & Usage" placement="right" arrow>
                    <CollapsedIconButton>
                      <IconLink href="/credits">
                        <IconTile active={active === "credits"} tone="primary">
                          <CreditCardOutlinedIcon fontSize="small" />
                        </IconTile>
                      </IconLink>
                    </CollapsedIconButton>
                  </Tooltip>
                  <Tooltip title="Help & Support" placement="right" arrow>
                    <CollapsedIconButton>
                      <IconLink href="/support">
                        <IconTile active={active === "support"} tone="primary">
                          <HelpOutlineOutlinedIcon fontSize="small" />
                        </IconTile>
                      </IconLink>
                    </CollapsedIconButton>
                  </Tooltip>
                  <Tooltip title="Upgrade to Pro" placement="right" arrow>
                    <CollapsedUpgradeButton>Pro</CollapsedUpgradeButton>
                  </Tooltip>
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
                  icon={<MicRoundedIcon sx={{ fontSize: "16px !important" }} />}
                  label={<BoldText variant="body2">20 Recordings Left</BoldText>}
                />
                <UserButton onClick={handleMenuOpen}>
                  <UserAvatar>HL</UserAvatar>
                  <BoldText variant="body2">Dr. Lohar</BoldText>
                  <ExpandMoreIcon fontSize="small" sx={{ color: "text.secondary", fontSize: 18 }} />
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
                      background: (theme) =>
                        `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.6)} 0%, ${alpha(theme.palette.secondary.light, 0.4)} 100%)`,
                      borderBottom: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.14)}`,
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
                        backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.07),
                        pointerEvents: "none"
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
                          border: (theme) => `3px solid ${alpha(theme.palette.primary.light, 0.9)}`,
                          backgroundColor: "success.main",
                          bgcolor: "success.main"
                        }}
                      />
                    </MenuHeaderAvatar>
                    <Typography variant="h6" fontWeight={800} sx={{ mt: 1 }} color="text.primary">
                      Dr. Hasmukh Lohar
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      hasmukh@scanbo.ai
                    </Typography>
                    <Chip
                      label="✦ Pro Plan"
                      size="small"
                      sx={{
                        mt: 1,
                        borderRadius: 999,
                        fontWeight: 800,
                        fontSize: "0.75rem",
                        color: (theme) => theme.palette.primary.main,
                        backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.1),
                        border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.25)}`,
                        "& .MuiChip-label": { px: 1.25 }
                      }}
                    />
                  </Box>

                  <Stack sx={{ p: 1 }}>
                    {[
                      { path: "/profile",       label: "My Profile",      icon: <PersonOutlineOutlinedIcon sx={{ fontSize: 17 }} />,  badge: null },
                      { path: "/settings",      label: "Settings",        icon: <SettingsOutlinedIcon sx={{ fontSize: 17 }} />,       badge: null },
                      { path: "/credits",       label: "Credits & Usage", icon: <CreditCardOutlinedIcon sx={{ fontSize: 17 }} />,     badge: { label: "20 left" } },
                      { path: "/my-recordings", label: "My Notes",        icon: <DescriptionOutlinedIcon sx={{ fontSize: 17 }} />,    badge: { label: "9 pending" } },
                    ].map((item) => {
                      const isLoading = navigatingTo === item.path;
                      const isDisabled = !!navigatingTo && !isLoading;
                      return (
                        <MenuItem
                          key={item.path}
                          onClick={() => handleNavigate(item.path)}
                          disabled={isDisabled}
                          sx={{
                            borderRadius: 2, py: 0.9, minHeight: 0, gap: 1.25,
                            opacity: isDisabled ? 0.45 : 1,
                            transition: "opacity 0.2s ease",
                            bgcolor: isLoading ? (theme) => alpha(theme.palette.primary.main, 0.06) : "transparent",
                            "&:hover": { bgcolor: (theme) => alpha(theme.palette.primary.main, 0.06) }
                          }}
                        >
                          <Box
                            sx={{
                              width: 30, height: 30, borderRadius: 1.5,
                              display: "grid", placeItems: "center",
                              flexShrink: 0, transition: "all 0.2s ease",
                              bgcolor: isLoading
                                ? (theme) => alpha(theme.palette.primary.main, 0.15)
                                : (theme) => alpha(theme.palette.primary.main, 0.08),
                              color: "primary.main",
                              border: isLoading
                                ? (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.3)}`
                                : "1px solid transparent"
                            }}
                          >
                            {isLoading
                              ? <CircularProgress size={14} thickness={5} sx={{ color: "primary.main" }} />
                              : item.icon
                            }
                          </Box>
                          <Typography
                            fontWeight={isLoading ? 800 : 700}
                            color={isLoading ? "primary.main" : "text.primary"}
                            sx={{ flex: 1, transition: "color 0.2s ease" }}
                          >
                            {item.label}
                          </Typography>
                          {item.badge && !isLoading && (
                            <Chip
                              size="small"
                              label={item.badge.label}
                              sx={{
                                borderRadius: 999, fontWeight: 700, fontSize: "0.68rem",
                                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                                color: "primary.main",
                                border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                                "& .MuiChip-label": { px: 1 }
                              }}
                            />
                          )}
                        </MenuItem>
                      );
                    })}
                    <Divider sx={{ my: 1 }} />
                    {[
                      { path: "/support",  label: "Help & Support",   icon: <HelpOutlineOutlinedIcon sx={{ fontSize: 17 }} /> },
                      { path: "#invite",   label: "Invite Colleague",  icon: <IosShareOutlinedIcon sx={{ fontSize: 17 }} /> },
                    ].map((item) => {
                      const isLoading = navigatingTo === item.path;
                      const isDisabled = !!navigatingTo && !isLoading;
                      const handleClick = () => {
                        if (item.path !== "#invite") {
                          handleNavigate(item.path);
                        }
                      };
                      return (
                        <MenuItem
                          key={item.path}
                          onClick={handleClick}
                          disabled={isDisabled}
                          sx={{
                            borderRadius: 2, py: 0.9, minHeight: 0, gap: 1.25,
                            opacity: isDisabled ? 0.45 : 1,
                            transition: "opacity 0.2s ease",
                            bgcolor: isLoading ? (theme) => alpha(theme.palette.primary.main, 0.06) : "transparent",
                            "&:hover": { bgcolor: (theme) => alpha(theme.palette.primary.main, 0.06) }
                          }}
                        >
                          <Box
                            sx={{
                              width: 30, height: 30, borderRadius: 1.5,
                              display: "grid", placeItems: "center",
                              flexShrink: 0, transition: "all 0.2s ease",
                              bgcolor: isLoading
                                ? (theme) => alpha(theme.palette.primary.main, 0.15)
                                : (theme) => alpha(theme.palette.primary.main, 0.08),
                              color: "primary.main",
                              border: isLoading
                                ? (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.3)}`
                                : "1px solid transparent"
                            }}
                          >
                            {isLoading
                              ? <CircularProgress size={14} thickness={5} sx={{ color: "primary.main" }} />
                              : item.icon
                            }
                          </Box>
                          <Typography
                            fontWeight={isLoading ? 800 : 700}
                            color={isLoading ? "primary.main" : "text.primary"}
                            sx={{ flex: 1, transition: "color 0.2s ease" }}
                          >
                            {item.label}
                          </Typography>
                        </MenuItem>
                      );
                    })}
                    <Divider sx={{ my: 1 }} />
                    <MenuItem
                      onClick={handleLogout}
                      disabled={loggingOut}
                      sx={{ borderRadius: 2, py: 0.9, minHeight: 0, gap: 1.25, "&:hover": { bgcolor: (theme) => alpha(theme.palette.error.main, 0.06) } }}
                    >
                      {loggingOut ? (
                        <Stack direction="row" spacing={1} alignItems="center">
                          <CircularProgress size={16} color="error" />
                          <Typography fontWeight={700} color="error.main">Signing out...</Typography>
                        </Stack>
                      ) : (
                        <>
                          <Box sx={{ width: 30, height: 30, borderRadius: 1.5, display: "grid", placeItems: "center", bgcolor: (theme) => alpha(theme.palette.error.main, 0.08), color: "error.main", flexShrink: 0 }}>
                            <LogoutRoundedIcon sx={{ fontSize: 17 }} />
                          </Box>
                          <Typography fontWeight={700} color="error.main">Sign Out</Typography>
                        </>
                      )}
                    </MenuItem>
                  </Stack>
                </Menu>
              </HeaderRight>
            </HeaderToolbar>
          </HeaderBar>

          <ContentArea>
            <ConsultDialogContext.Provider value={{ openStartConsultDialog }}>
              <ContentCard>{children}</ContentCard>
            </ConsultDialogContext.Provider>
          </ContentArea>
        </MainColumn>
      </PageLayout>

      <AppDialog
        open={startConsultOpen}
        onClose={closeStartConsultDialog}
        maxWidth="sm"
        noPadding
        title={
          modalStep === "create"
            ? "Create New Patient"
            : modalStep === "mode"
              ? "Start Scribe"
              : modalStep === "processing"
                ? "Setting up your scribe"
                : "Select Patient"
        }
        subtitle={
          modalStep === "create"
            ? "Add patient details to continue"
            : modalStep === "mode"
              ? "Choose how to capture this consultation"
              : modalStep === "processing"
                ? "Connecting AI transcription engine"
                : "Search or create a new patient to begin"
        }
        icon={
          modalStep === "create" ? (
            <PersonAddRoundedIcon fontSize="small" />
          ) : modalStep === "mode" ? (
            <TuneRoundedIcon fontSize="small" />
          ) : modalStep === "processing" ? (
            <AutoAwesomeRoundedIcon fontSize="small" />
          ) : (
            <PersonSearchRoundedIcon fontSize="small" />
          )
        }
        steps={
          modalStep !== "processing"
            ? [
                {
                  label: "1. Select Patient",
                  status:
                    modalStep === "select" || modalStep === "create"
                      ? "active"
                      : "completed"
                },
                {
                  label: "2. Choose Mode",
                  status: modalStep === "mode" ? "active" : "pending"
                }
              ]
            : undefined
        }
        hideClose={modalStep === "processing"}
        actions={
          modalStep !== "processing" ? (
            <>
              {modalStep === "select" && (
                <>
                  <Stack direction="row" spacing={1.25} alignItems="center">
                    <AppButton intent="neutral" onClick={closeStartConsultDialog}>
                      Cancel
                    </AppButton>
                    {selectedPatient && (
                      <Typography variant="caption" color="text.secondary" fontWeight={600}>
                        {selectedPatient.fullName} selected
                      </Typography>
                    )}
                  </Stack>
                  <Stack direction="row" spacing={1.25}>
                    <AppButton
                      intent="secondary"
                      startIcon={<AddIcon />}
                      onClick={() => setModalStep("create")}
                    >
                      Create Patient
                    </AppButton>
                    <AppButton
                      intent="primary"
                      endIcon={<ArrowForwardRoundedIcon />}
                      onClick={handleContinueWithSelectedPatient}
                      disabled={!selectedPatient}
                    >
                      Continue
                    </AppButton>
                  </Stack>
                </>
              )}
              {modalStep === "create" && (
                <>
                  <AppButton intent="neutral" onClick={() => setModalStep("select")}>
                    Back
                  </AppButton>
                  <AppButton
                    intent="primary"
                    endIcon={<ArrowForwardRoundedIcon />}
                    onClick={handleCreatePatientAndContinue}
                  >
                    Create &amp; Continue
                  </AppButton>
                </>
              )}
              {modalStep === "mode" && (
                <>
                  <AppButton intent="neutral" onClick={() => setModalStep("select")}>
                    Back
                  </AppButton>
                  <AppButton
                    intent="primary"
                    endIcon={<ArrowForwardRoundedIcon />}
                    onClick={handleStartConsultFlow}
                    disabled={!selectedMode}
                  >
                    {selectedMode === "upload" ? "Select File" : "Start Recording"}
                  </AppButton>
                </>
              )}
            </>
          ) : undefined
        }
      >

            {/* ── SELECT PATIENT step ── */}
            {modalStep === "select" && (
              <>
                {/* Search bar */}
                <Box sx={{ px: { xs: 2.5, sm: 3 }, pt: 2, pb: 0 }}>
                  <TextField
                    placeholder="Search by name, phone, Aadhaar or MRN"
                    fullWidth
                    value={patientQuery}
                    onChange={(event) => setPatientQuery(event.target.value)}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2.5,
                        backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.03)
                      }
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchRoundedIcon color="action" fontSize="small" />
                        </InputAdornment>
                      ),
                      endAdornment: patientQuery ? (
                        <InputAdornment position="end">
                          <IconButton size="small" onClick={() => setPatientQuery("")} edge="end">
                            <CloseRoundedIcon fontSize="small" />
                          </IconButton>
                        </InputAdornment>
                      ) : null
                    }}
                  />
                </Box>

                {/* Result count */}
                {!patientsLoading && filteredPatients.length > 0 && (
                  <Box sx={{ px: { xs: 2.5, sm: 3 }, pt: 1, pb: 0 }}>
                    <Typography variant="caption" color="text.secondary" fontWeight={600}>
                      {filteredPatients.length} patient{filteredPatients.length !== 1 ? "s" : ""} found
                    </Typography>
                  </Box>
                )}

                {/* Patient list */}
                <Box sx={{ px: { xs: 2.5, sm: 3 }, pt: 1, pb: 1.5 }}>
                  <Stack spacing={0.75} sx={{ maxHeight: 300, overflowY: "auto", pr: 0.5 }}>
                    {patientsLoading ? (
                      <Stack alignItems="center" justifyContent="center" spacing={1.5} sx={{ py: 4 }}>
                        <CircularProgress size={28} thickness={3.5} />
                        <Typography variant="body2" color="text.secondary" fontWeight={500}>
                          Loading patients...
                        </Typography>
                      </Stack>
                    ) : filteredPatients.length === 0 ? (
                      <Stack alignItems="center" justifyContent="center" spacing={0.75} sx={{ py: 4 }}>
                        <Box
                          sx={{
                            width: 52,
                            height: 52,
                            borderRadius: "50%",
                            display: "grid",
                            placeItems: "center",
                            backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.1),
                            border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.18)}`
                          }}
                        >
                          <PersonSearchRoundedIcon sx={{ fontSize: 26, color: "primary.main" }} />
                        </Box>
                        <Typography variant="body2" fontWeight={700} color="text.secondary">
                          No patients found
                        </Typography>
                        <Typography variant="caption" color="text.disabled" textAlign="center">
                          {patientQuery ? "Try a different search term" : "Create a new patient to get started"}
                        </Typography>
                      </Stack>
                    ) : (
                      filteredPatients.map((patient) => {
                        const isSelected = selectedPatientId === patient.id;
                        const initials =
                          patient.fullName
                            .split(" ")
                            .filter(Boolean)
                            .slice(0, 2)
                            .map((p) => p[0])
                            .join("")
                            .toUpperCase() || "PT";
                        return (
                          <Box
                            key={patient.id}
                            onClick={() => setSelectedPatientId(patient.id)}
                            sx={{
                              borderRadius: 2.5,
                              p: 1.5,
                              cursor: "pointer",
                              border: (theme) =>
                                `1.5px solid ${isSelected ? theme.palette.primary.main : theme.palette.divider}`,
                              borderLeft: (theme) =>
                                isSelected
                                  ? `4px solid ${theme.palette.primary.main}`
                                  : `1.5px solid ${theme.palette.divider}`,
                              backgroundColor: (theme) =>
                                isSelected
                                  ? alpha(theme.palette.primary.main, 0.06)
                                  : theme.palette.background.paper,
                              transition: "all 0.15s ease",
                              "&:hover": {
                                borderColor: (theme) => alpha(theme.palette.primary.main, 0.5),
                                borderLeftColor: "primary.main",
                                backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.04),
                                transform: "translateY(-1px)",
                                boxShadow: (theme) =>
                                  `0 4px 12px ${alpha(theme.palette.primary.main, 0.1)}`
                              }
                            }}
                          >
                            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1.5}>
                              <Stack direction="row" spacing={1.5} alignItems="center">
                                {/* Avatar */}
                                <Box
                                  sx={{
                                    width: 46,
                                    height: 46,
                                    borderRadius: "50%",
                                    flexShrink: 0,
                                    display: "grid",
                                    placeItems: "center",
                                    color: "#fff",
                                    fontWeight: 700,
                                    fontSize: "0.875rem",
                                    background: (theme) =>
                                      isSelected
                                        ? `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`
                                        : `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.7)} 0%, ${theme.palette.primary.main} 100%)`,
                                    boxShadow: (theme) =>
                                      isSelected
                                        ? `0 3px 10px ${alpha(theme.palette.primary.main, 0.38)}`
                                        : "none",
                                    transition: "all 0.15s ease"
                                  }}
                                >
                                  {initials}
                                </Box>
                                <Box minWidth={0}>
                                  <Stack direction="row" spacing={0.75} alignItems="center" flexWrap="wrap">
                                    <Typography variant="subtitle2" fontWeight={700} noWrap>
                                      {patient.fullName}
                                    </Typography>
                                    {patient.mrn && (
                                      <Chip
                                        label={patient.mrn}
                                        size="small"
                                        sx={{
                                          height: 18,
                                          fontSize: "0.65rem",
                                          borderRadius: 999,
                                          fontWeight: 700,
                                          backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.1),
                                          color: "primary.main",
                                          border: "none",
                                          "& .MuiChip-label": { px: 0.75 }
                                        }}
                                      />
                                    )}
                                  </Stack>
                                  <Typography variant="caption" color="text.secondary">
                                    {patient.age ? `${patient.age}Y` : "—"} • {patient.gender || "—"} • {patient.phone}
                                  </Typography>
                                </Box>
                              </Stack>
                              {/* Selection indicator */}
                              {isSelected ? (
                                <CheckCircleRoundedIcon
                                  color="primary"
                                  sx={{ fontSize: 22, flexShrink: 0 }}
                                />
                              ) : (
                                <Box
                                  sx={{
                                    width: 20,
                                    height: 20,
                                    flexShrink: 0,
                                    borderRadius: "50%",
                                    border: (theme) => `2px solid ${theme.palette.divider}`,
                                    transition: "border-color 0.15s ease"
                                  }}
                                />
                              )}
                            </Stack>
                          </Box>
                        );
                      })
                    )}
                  </Stack>
                </Box>
              </>
            )}

            {/* ── CREATE PATIENT step ── */}
            {modalStep === "create" && (
              <>
                <Box sx={{ px: { xs: 2.5, sm: 3 }, pt: 1.75, pb: 0.5 }}>
                  <AppButton
                    intent="neutral"
                    startIcon={<ArrowBackRoundedIcon />}
                    onClick={() => setModalStep("select")}
                  >
                    Back to search
                  </AppButton>
                </Box>
                <Stack spacing={1.25} sx={{ px: { xs: 2.5, sm: 3 }, pb: 1.5 }}>
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
                        onChange={(event) =>
                          setPatientForm((prev) => ({ ...prev, consent: event.target.checked }))
                        }
                        color="primary"
                      />
                    }
                    label={
                      <Typography variant="body2" fontWeight={600}>
                        Patient consent received
                      </Typography>
                    }
                  />
                  {patientFormError ? (
                    <Box
                      sx={{
                        p: 1.25,
                        borderRadius: 2,
                        backgroundColor: (theme) => alpha(theme.palette.error.main, 0.08),
                        border: (theme) => `1px solid ${alpha(theme.palette.error.main, 0.3)}`
                      }}
                    >
                      <Typography variant="caption" color="error.main" fontWeight={600}>
                        {patientFormError}
                      </Typography>
                    </Box>
                  ) : null}
                </Stack>
              </>
            )}

            {/* ── MODE step ── */}
            {modalStep === "mode" && (
              <Stack spacing={1.5} sx={{ px: { xs: 2.5, sm: 3 }, pt: 2, pb: 1.5 }}>
                {/* Selected patient banner */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    p: 1.5,
                    borderRadius: 2.5,
                    backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.06),
                    border: (theme) => `1.5px solid ${alpha(theme.palette.primary.main, 0.2)}`
                  }}
                >
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      flexShrink: 0,
                      display: "grid",
                      placeItems: "center",
                      fontWeight: 700,
                      fontSize: "0.8rem",
                      color: "#fff",
                      background: (theme) =>
                        `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`
                    }}
                  >
                    {selectedPatient?.fullName
                      .split(" ")
                      .filter(Boolean)
                      .slice(0, 2)
                      .map((p) => p[0])
                      .join("")
                      .toUpperCase() || "PT"}
                  </Box>
                  <Box flex={1} minWidth={0}>
                    <Typography variant="subtitle2" fontWeight={700} noWrap>
                      {selectedPatient?.fullName || "Selected patient"}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {selectedPatient ? `${selectedPatient.age}Y • ${selectedPatient.gender} • ${selectedPatient.phone}` : ""}
                    </Typography>
                  </Box>
                  <Chip
                    label="Selected"
                    size="small"
                    icon={<CheckCircleRoundedIcon sx={{ fontSize: "13px !important" }} />}
                    sx={{
                      height: 24,
                      fontWeight: 700,
                      fontSize: "0.7rem",
                      borderRadius: 999,
                      backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.12),
                      color: "primary.main",
                      border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                      "& .MuiChip-icon": { color: "primary.main" }
                    }}
                  />
                </Box>

                {/* Mode cards */}
                <Stack direction={{ xs: "column", sm: "row" }} spacing={1.25}>
                  {/* Live Recording */}
                  <Box
                    onClick={() => setSelectedMode("record")}
                    sx={{
                      flex: 1,
                      position: "relative",
                      borderRadius: 2.5,
                      border: (theme) =>
                        `2px solid ${
                          selectedMode === "record" ? theme.palette.primary.main : theme.palette.divider
                        }`,
                      backgroundColor: (theme) =>
                        selectedMode === "record"
                          ? alpha(theme.palette.primary.main, 0.07)
                          : theme.palette.background.paper,
                      p: 2.5,
                      textAlign: "center",
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                      "&:hover": {
                        borderColor: (theme) => alpha(theme.palette.primary.main, 0.6),
                        backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.04),
                        transform: "translateY(-2px)",
                        boxShadow: (theme) => `0 6px 16px ${alpha(theme.palette.primary.main, 0.12)}`
                      }
                    }}
                  >
                    {selectedMode === "record" && (
                      <CheckCircleRoundedIcon
                        color="primary"
                        sx={{ position: "absolute", top: 10, right: 10, fontSize: 18 }}
                      />
                    )}
                    <Box
                      sx={{
                        width: 52,
                        height: 52,
                        borderRadius: 2.5,
                        display: "grid",
                        placeItems: "center",
                        mx: "auto",
                        mb: 1.5,
                        border: (theme) =>
                          `1px solid ${alpha(theme.palette.primary.main, selectedMode === "record" ? 0.35 : 0.2)}`,
                        backgroundColor: (theme) =>
                          alpha(theme.palette.primary.main, selectedMode === "record" ? 0.16 : 0.08),
                        color: "primary.main",
                        transition: "all 0.15s ease"
                      }}
                    >
                      <MicNoneOutlinedIcon />
                    </Box>
                    <Typography variant="subtitle2" fontWeight={700} gutterBottom>
                      Live Recording
                    </Typography>
                    <Typography variant="caption" color="text.secondary" display="block">
                      Record consultation in real-time
                    </Typography>
                  </Box>

                  {/* Upload Audio */}
                  <Box
                    onClick={() => setSelectedMode("upload")}
                    sx={{
                      flex: 1,
                      position: "relative",
                      borderRadius: 2.5,
                      border: (theme) =>
                        `2px solid ${
                          selectedMode === "upload" ? theme.palette.primary.main : theme.palette.divider
                        }`,
                      backgroundColor: (theme) =>
                        selectedMode === "upload"
                          ? alpha(theme.palette.primary.main, 0.07)
                          : theme.palette.background.paper,
                      p: 2.5,
                      textAlign: "center",
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                      "&:hover": {
                        borderColor: (theme) => alpha(theme.palette.primary.main, 0.6),
                        backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.04),
                        transform: "translateY(-2px)",
                        boxShadow: (theme) => `0 6px 16px ${alpha(theme.palette.primary.main, 0.12)}`
                      }
                    }}
                  >
                    {selectedMode === "upload" && (
                      <CheckCircleRoundedIcon
                        color="primary"
                        sx={{ position: "absolute", top: 10, right: 10, fontSize: 18 }}
                      />
                    )}
                    <Box
                      sx={{
                        width: 52,
                        height: 52,
                        borderRadius: 2.5,
                        display: "grid",
                        placeItems: "center",
                        mx: "auto",
                        mb: 1.5,
                        border: (theme) =>
                          `1px solid ${alpha(theme.palette.primary.main, selectedMode === "upload" ? 0.35 : 0.2)}`,
                        backgroundColor: (theme) =>
                          alpha(theme.palette.primary.main, selectedMode === "upload" ? 0.16 : 0.08),
                        color: "primary.main",
                        transition: "all 0.15s ease"
                      }}
                    >
                      <FileUploadOutlinedIcon />
                    </Box>
                    <Typography variant="subtitle2" fontWeight={700} gutterBottom>
                      Upload Audio
                    </Typography>
                    <Typography variant="caption" color="text.secondary" display="block">
                      Upload a pre-recorded audio file
                    </Typography>
                  </Box>
                </Stack>
              </Stack>
            )}

            {/* ── PROCESSING step ── */}
            {modalStep === "processing" && (
              <Stack spacing={2} sx={{ px: { xs: 2.5, sm: 3 }, py: 4, alignItems: "center" }}>
                <Box sx={{ position: "relative", display: "inline-flex" }}>
                  <CircularProgress
                    size={72}
                    thickness={2.5}
                    sx={{ color: "primary.main" }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      display: "grid",
                      placeItems: "center",
                      color: "primary.main"
                    }}
                  >
                    <AutoAwesomeRoundedIcon fontSize="small" />
                  </Box>
                </Box>
                <Box textAlign="center">
                  <Typography variant="subtitle1" fontWeight={700} gutterBottom>
                    Setting up your scribe
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Connecting AI transcription engine...
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    height: 5,
                    borderRadius: 999,
                    backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.12),
                    overflow: "hidden"
                  }}
                >
                  <Box
                    sx={{
                      width: "72%",
                      height: "100%",
                      borderRadius: 999,
                      background: (theme) =>
                        `linear-gradient(90deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`
                    }}
                  />
                </Box>
              </Stack>
            )}

      </AppDialog>
    </PageRoot>
  );
}
