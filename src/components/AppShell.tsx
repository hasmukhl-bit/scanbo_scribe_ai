"use client";

import * as React from "react";
import { alpha, styled } from "@mui/material/styles";
import {
  AppBar,
  Box,
  Button,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MicNoneOutlinedIcon from "@mui/icons-material/MicNoneOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import ViewListOutlinedIcon from "@mui/icons-material/ViewListOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import AddIcon from "@mui/icons-material/Add";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import Link from "next/link";
import { useSidebar } from "@/components/SidebarState";

const PageRoot = styled("main")(() => ({
  width: "100%"
}));

const PageLayout = styled(Box, {
  shouldForwardProp: (prop) => prop !== "collapsed"
})<{ collapsed: boolean }>(({ theme, collapsed }) => ({
  minHeight: "100vh",
  display: "grid",
  gridTemplateColumns: "1fr",
  transition: "grid-template-columns 0.28s ease",
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: collapsed ? "96px 1fr" : "260px 1fr"
  }
}));

const Sidebar = styled(Box, {
  shouldForwardProp: (prop) => prop !== "collapsed"
})<{ collapsed: boolean }>(({ theme, collapsed }) => ({
  borderRight: "1px solid",
  borderColor: theme.palette.divider,
  backgroundColor: theme.palette.background.paper,
  padding: collapsed ? theme.spacing(3, 2.5, 0) : theme.spacing(3, 3, 0),
  display: "none",
  flexDirection: "column",
  gap: theme.spacing(3),
  transition: "padding 0.28s ease",
  willChange: "padding",
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
  textDecoration: "none"
}));

const MainColumn = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  minWidth: 0
}));

const HeaderBar = styled(AppBar)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`
}));

const HeaderToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: 72,
  justifyContent: "space-between",
  gap: theme.spacing(2),
  backgroundColor: theme.palette.background.paper
}));

const HeaderLeft = styled(Stack)(() => ({
  flexDirection: "row",
  alignItems: "center",
  gap: 16
}));


const ToggleButton = styled(IconButton)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`
}));

const HeaderTitle = styled(Typography)(() => ({
  fontWeight: 700
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
  padding: 0,
  [theme.breakpoints.down("md")]: {
    padding: 0
  }
}));

const ContentCard = styled(Box)(({ theme }) => ({
  height: "100%",
  minHeight: 360,
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
  active: "home" | "patients" | "consultation" | "settings" | "credits" | "support" | "training";
};

export default function AppShell({ title, subtitle, children, active }: AppShellProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);
  const { open: sidebarOpen, toggle: toggleSidebar } = useSidebar();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

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
                <Link href="/start-consult" passHref legacyBehavior>
                  <Button
                    component="a"
                    variant="contained"
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
                </Link>
              </SidebarActions>

              <NavSection>
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
                <NavItemRow href="/training" active={active === "training"} tone="info">
                  <NavIcon active={active === "training"} tone="info">
                    <SchoolOutlinedIcon fontSize="small" />
                  </NavIcon>
                  <NavLabel variant="body2">Training Resources</NavLabel>
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
            <SidebarContent spacing={2}>
              <CollapsedIconStack>
                <CollapsedActionStack>
                  <CollapsedIconButton>
                    <IconLink href="/start-consult">
                      <IconTile active tone="primary">
                        <AddIcon fontSize="small" />
                      </IconTile>
                    </IconLink>
                  </CollapsedIconButton>
                </CollapsedActionStack>

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
                <CollapsedIconButton>
                  <IconLink href="/training">
                    <IconTile active={active === "training"} tone="info">
                      <SchoolOutlinedIcon fontSize="small" />
                    </IconTile>
                  </IconLink>
                </CollapsedIconButton>
              </CollapsedIconStack>
              <SidebarFooter>
                <CollapsedUpgradeButton>Pro</CollapsedUpgradeButton>
              </SidebarFooter>
            </SidebarContent>
          )}
        </Sidebar>

        <MainColumn>
          <HeaderBar position="static" color="inherit" elevation={0}>
            <HeaderToolbar>
              <HeaderLeft>
                <ToggleButton size="small" onClick={toggleSidebar}>
                  <MenuIcon fontSize="small" />
                </ToggleButton>
                <Box />
              </HeaderLeft>

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
                >
                  <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
                </Menu>
              </HeaderRight>
            </HeaderToolbar>
          </HeaderBar>

          <ContentArea>
            <ContentCard>{children}</ContentCard>
          </ContentArea>
        </MainColumn>
      </PageLayout>
    </PageRoot>
  );
}
