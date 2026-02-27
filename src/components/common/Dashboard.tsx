"use client";

import * as React from "react";
import styled from "@emotion/styled";
import {
  Box,
  Chip,
  CircularProgress,
  Stack,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
  Divider,
  LinearProgress
} from "@mui/material";
import AppButton from "@/components/ui/AppButton";
import { alpha } from "@mui/material/styles";
import MicRoundedIcon from "@mui/icons-material/MicRounded";
import UploadFileRoundedIcon from "@mui/icons-material/UploadFileRounded";
import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import GraphicEqRoundedIcon from "@mui/icons-material/GraphicEqRounded";
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";
import HourglassBottomRoundedIcon from "@mui/icons-material/HourglassBottomRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import HistoryEduRoundedIcon from "@mui/icons-material/HistoryEduRounded";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";
import ManageAccountsRoundedIcon from "@mui/icons-material/ManageAccountsRounded";
import PendingActionsRoundedIcon from "@mui/icons-material/PendingActionsRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import WbSunnyRoundedIcon from "@mui/icons-material/WbSunnyRounded";
import RateReviewRoundedIcon from "@mui/icons-material/RateReviewRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import type { ChangeEvent, DragEvent } from "react";
import { apiGet, apiPost, apiPatch } from "@/lib/api-client";
import type { Consultation, Patient } from "@/lib/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useConsultDialog } from "@/context/ConsultDialogContext";

const Section = styled(Box)(({ theme }) => ({
  borderRadius: 12,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[1],
  padding: theme.spacing(3)
}));

const SectionTitle = styled(Typography)(() => ({
  fontWeight: 700
}));

const SearchField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: 10,
    backgroundColor: alpha(theme.palette.background.paper, 0.7)
  }
}));

const PatientRow = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "2fr 1fr 1fr 1fr auto",
  gap: theme.spacing(1.5),
  alignItems: "center",
  padding: theme.spacing(1.5),
  borderRadius: 10,
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.default
}));

const ModalForm = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(2)
}));


const MicOrb = styled(Box, {
  shouldForwardProp: (prop) => prop !== "recording"
})<{ recording?: boolean }>(({ theme, recording }) => ({
  width: 168,
  height: 168,
  borderRadius: "50%",
  flexShrink: 0,
  display: "grid",
  placeItems: "center",
  color: "#fff",
  position: "relative",
  zIndex: 1,
  background: recording
    ? `linear-gradient(180deg, ${theme.palette.error.main} 0%, ${theme.palette.error.dark} 100%)`
    : `linear-gradient(180deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  boxShadow: recording
    ? `0 0 0 12px ${alpha(theme.palette.error.main, 0.1)}, 0 24px 48px ${alpha(theme.palette.error.main, 0.3)}`
    : `0 0 0 12px ${alpha(theme.palette.primary.main, 0.1)}, 0 24px 48px ${alpha(theme.palette.primary.main, 0.25)}`
}));


const UploadDropzone = styled(Box, {
  shouldForwardProp: (prop) => prop !== "active"
})<{ active?: boolean }>(({ theme, active }) => ({
  border: `2px dashed ${active ? theme.palette.primary.main : alpha(theme.palette.primary.main, 0.25)}`,
  borderRadius: 14,
  padding: theme.spacing(3.5),
  backgroundColor: active ? alpha(theme.palette.primary.main, 0.08) : alpha(theme.palette.primary.main, 0.03),
  textAlign: "center"
}));

type DashboardMode = "dashboard" | "patients" | "consultation";
type ConsultStage = "idle" | "recording" | "ready" | "processing" | "generated";
type RecordingMode = "record" | "upload";

type DashboardProps = {
  mode: DashboardMode;
};

function formatTime(total: number) {
  const minutes = Math.floor(total / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (total % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

export default function Dashboard({ mode }: DashboardProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { openStartConsultDialog } = useConsultDialog();
  const lastStartFlowRef = React.useRef<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const [patients, setPatients] = React.useState<Patient[]>([]);
  const [consultations, setConsultations] = React.useState<Consultation[]>([]);
  const [query, setQuery] = React.useState("");
  const [selectedPatient, setSelectedPatient] = React.useState<Patient | null>(null);
  const [recordingMode, setRecordingMode] = React.useState<RecordingMode>("record");
  const [consultStage, setConsultStage] = React.useState<ConsultStage>("idle");
  const [recordSeconds, setRecordSeconds] = React.useState(0);
  const [uploadedFileName, setUploadedFileName] = React.useState<string | null>(null);
  const [processingProgress, setProcessingProgress] = React.useState(0);
  const [dragActive, setDragActive] = React.useState(false);
  const [signingOff, setSigningOff] = React.useState(false);
  const [form, setForm] = React.useState({
    fullName: "",
    age: "",
    gender: "",
    phone: "",
    address: "",
    aadhaar: "",
    mrn: "",
    consent: false
  });

  const loadData = React.useCallback(async () => {
    const [patientsData, consultationsData] = await Promise.all([
      apiGet<Patient[]>("/patients"),
      apiGet<Consultation[]>("/consultations")
    ]);
    setPatients(patientsData);
    setConsultations(consultationsData);
  }, []);

  React.useEffect(() => {
    loadData();
  }, [loadData]);

  React.useEffect(() => {
    if (mode !== "consultation" || !patients.length || selectedPatient) {
      return;
    }
    const patientIdParam = searchParams.get("patientId");
    if (!patientIdParam) {
      return;
    }
    const patientId = Number(patientIdParam);
    if (Number.isNaN(patientId)) {
      return;
    }
    const matchedPatient = patients.find((p) => p.id === patientId);
    if (matchedPatient) {
      setSelectedPatient(matchedPatient);
    }
  }, [mode, patients, searchParams, selectedPatient]);

  React.useEffect(() => {
    if (mode !== "consultation" || !selectedPatient) {
      return;
    }
    const flowKey = [
      searchParams.get("patientId") || "",
      searchParams.get("mode") || "",
      searchParams.get("autostart") || ""
    ].join("|");
    if (lastStartFlowRef.current === flowKey) {
      return;
    }
    lastStartFlowRef.current = flowKey;

    const modeParam = searchParams.get("mode");
    const autoStart = searchParams.get("autostart") === "1";
    if (modeParam === "upload") {
      setRecordingMode("upload");
      setConsultStage("idle");
      setUploadedFileName(null);
      return;
    }
    if (modeParam === "record") {
      setRecordingMode("record");
      setUploadedFileName(null);
      if (autoStart) {
        setRecordSeconds(0);
        setConsultStage("recording");
      } else {
        setConsultStage("idle");
      }
    }
  }, [mode, searchParams, selectedPatient]);

  React.useEffect(() => {
    if (consultStage !== "recording") {
      return undefined;
    }
    const timer = window.setInterval(() => {
      setRecordSeconds((prev) => prev + 1);
    }, 1000);
    return () => window.clearInterval(timer);
  }, [consultStage]);

  React.useEffect(() => {
    if (consultStage !== "processing") {
      return undefined;
    }
    setProcessingProgress(8);
    const timer = window.setInterval(() => {
      setProcessingProgress((prev) => {
        const next = Math.min(prev + 9, 100);
        if (next >= 100) {
          window.clearInterval(timer);
          setConsultStage("generated");
        }
        return next;
      });
    }, 330);
    return () => window.clearInterval(timer);
  }, [consultStage]);

  const filteredPatients = patients.filter((p) => {
    const q = query.toLowerCase();
    return (
      p.fullName.toLowerCase().includes(q) ||
      p.phone.includes(q) ||
      (p.aadhaar || "").includes(q) ||
      (p.mrn || "").toLowerCase().includes(q)
    );
  });

  const handleCreatePatient = async (autoSelect = false) => {
    if (!form.fullName || !form.age || !form.gender || !form.phone || !form.consent) {
      return;
    }

    const createdPatient = await apiPost<Patient>("/patients", {
      fullName: form.fullName,
      age: Number(form.age),
      gender: form.gender,
      phone: form.phone,
      address: form.address,
      aadhaar: form.aadhaar,
      mrn: form.mrn
    });

    await loadData();
    if (autoSelect) {
      setSelectedPatient(createdPatient);
      setConsultStage("idle");
      setRecordingMode("record");
      setUploadedFileName(null);
      setProcessingProgress(0);
      setRecordSeconds(0);
    }
    setForm({
      fullName: "",
      age: "",
      gender: "",
      phone: "",
      address: "",
      aadhaar: "",
      mrn: "",
      consent: false
    });
  };

  const setFileFromInput = (file: File | null) => {
    if (!file) {
      return;
    }
    setUploadedFileName(file.name);
    setRecordingMode("upload");
    setConsultStage("ready");
  };

  const handleUploadChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFileFromInput(event.target.files?.[0] ?? null);
    event.currentTarget.value = "";
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragActive(false);
    setFileFromInput(event.dataTransfer.files?.[0] ?? null);
  };

  const startRecording = () => {
    setRecordingMode("record");
    setUploadedFileName(null);
    setRecordSeconds(0);
    setConsultStage("recording");
  };

  const stopRecording = () => {
    setConsultStage("ready");
    setUploadedFileName(`consultation-${new Date().toISOString().slice(0, 10)}.wav`);
  };

  const startGeneration = () => {
    if (!uploadedFileName && recordingMode !== "record") {
      return;
    }
    setConsultStage("processing");
  };

  const resetConsult = () => {
    setConsultStage("idle");
    setRecordSeconds(0);
    setUploadedFileName(null);
    setProcessingProgress(0);
    setRecordingMode("record");
  };

  const handleSignOff = async () => {
    if (!selectedPatient || signingOff) return;
    setSigningOff(true);
    try {
      // Find an existing "In Progress" consultation for this patient, or create a new one
      const existing = consultations.find(
        (c) => c.patientId === selectedPatient.id && c.status === "In Progress"
      );
      if (existing) {
        await apiPatch<Consultation>("/consultations", existing.id, {
          status: "Signed",
          summary: `${selectedPatient.fullName} – ${selectedPatient.age}Y ${selectedPatient.gender}. Presents with progressive dyspnea over 3–4 days. COPD exacerbation likely. Prednisolone 40mg prescribed.`,
          duration: `${Math.max(recordSeconds, 1)}m`
        });
      } else {
        await apiPost<Consultation>("/consultations", {
          patientId: selectedPatient.id,
          startedAt: new Date().toISOString(),
          status: "Signed",
          summary: `${selectedPatient.fullName} – ${selectedPatient.age}Y ${selectedPatient.gender}. Presents with progressive dyspnea over 3–4 days. COPD exacerbation likely. Prednisolone 40mg prescribed.`,
          duration: `${Math.max(recordSeconds, 1)}m`,
          codes: ["J44.1", "I10", "H53.9"],
          soapNote: {
            subjective: `${selectedPatient.fullName}, ${selectedPatient.age}-year-old ${selectedPatient.gender.toLowerCase()}, presents with progressive dyspnea over 3–4 days. Rescue inhaler efficacy appears reduced and medication adherence concerns are noted.`,
            objective: "Vitals stable. SpO2 92% on room air. Bilateral expiratory wheeze on auscultation.",
            assessment: "COPD with acute exacerbation (J44.1). Essential hypertension (I10).",
            plan: "Prednisolone 40mg for 5 days. Review inhaler technique. Follow up in 1 week."
          },
          medications: [
            { name: "Hydrochlorothiazide", dose: "12.5mg", frequency: "Once daily", type: "Current" },
            { name: "Prednisolone", dose: "40mg", frequency: "Once daily for 5 days", type: "New" }
          ]
        });
      }
      router.push("/my-recordings");
    } catch {
      setSigningOff(false);
    }
  };

  const showDashboard = mode === "dashboard";
  const showPatients = mode === "patients";
  const showConsultation = mode === "consultation";

  const consultReady = consultStage === "ready" || consultStage === "processing" || consultStage === "generated";
  const noteReady = consultStage === "generated";
  const isRecording = consultStage === "recording";
  const confidenceValue = noteReady ? 94 : consultStage === "processing" ? processingProgress : 0;
  const todayLabel = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  });
  const recentConsultations = [...consultations]
    .sort((a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime())
    .slice(0, 5)
    .map((consultation) => {
      const patient = patients.find((p) => p.id === consultation.patientId);
      return {
        id: consultation.id,
        name: patient?.fullName || "Unknown Patient",
        meta: `${patient?.age || "-"}Y ${patient?.gender || ""}`.trim(),
        time: new Date(consultation.startedAt).toLocaleDateString("en-US"),
        status: consultation.status
      };
    });
  const dashboardStats = [
    {
      label: "Total Recordings",
      value: consultations.length || 47,
      helper: "↑ 12% this week",
      tone: "primary.main",
      icon: <GraphicEqRoundedIcon fontSize="small" />
    },
    {
      label: "Notes Signed",
      value: consultations.filter((item) => item.status === "Final").length || 38,
      helper: "↑ 8% this week",
      tone: "success.main",
      icon: <TaskAltRoundedIcon fontSize="small" />
    },
    {
      label: "Pending Review",
      value: consultations.filter((item) => item.status !== "Final").length || 9,
      helper: "Action needed",
      tone: "warning.main",
      icon: <HourglassBottomRoundedIcon fontSize="small" />
    },
    {
      label: "Total Patients",
      value: patients.length || 124,
      helper: "↑ 5 new this month",
      tone: "success.main",
      icon: <GroupsRoundedIcon fontSize="small" />
    }
  ] as const;

  return (
    <Stack spacing={3}>
      {showDashboard ? (
        <Box
          sx={{
            minHeight: "calc(100vh - 72px)",
            borderTop: (theme) => `1px solid ${theme.palette.divider}`,
            backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.02)
          }}
        >
          {/* ── HERO HEADER ── */}
          <Box
            sx={{
              px: { xs: 2.5, sm: 3 },
              pt: 2.5,
              pb: 2,
              background: (theme) =>
                `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.light} 100%)`,
              borderBottom: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.15)}`
            }}
          >
            <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ sm: "center" }} spacing={1.5}>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Box
                  sx={{
                    width: 46,
                    height: 46,
                    borderRadius: 2.5,
                    flexShrink: 0,
                    display: "grid",
                    placeItems: "center",
                    background: (theme) =>
                      `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                    color: "#fff",
                    boxShadow: (theme) => `0 4px 14px ${alpha(theme.palette.primary.main, 0.35)}`
                  }}
                >
                  <WbSunnyRoundedIcon />
                </Box>
                <Box>
                  <Typography variant="h5" fontWeight={800} lineHeight={1.2}>
                    Good morning, Dr. Lohar
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.15 }}>
                    {todayLabel}
                  </Typography>
                </Box>
              </Stack>
              <AppButton
                intent="primary"
                startIcon={<MicRoundedIcon />}
                onClick={() => openStartConsultDialog()}
              >
                New Consult
              </AppButton>
            </Stack>
          </Box>

          <Box sx={{ px: { xs: 2.5, sm: 3 }, py: 2.5 }}>
            <Stack spacing={2.5}>

              {/* ── STATS GRID ── */}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" },
                  gap: 1.6
                }}
              >
                {dashboardStats.map((item) => {
                  const colorKey = item.tone.split(".")[0] as "primary" | "success" | "warning";
                  return (
                    <Box
                      key={item.label}
                      sx={{
                        border: (theme) => `1px solid ${theme.palette.divider}`,
                        borderRadius: 2.5,
                        bgcolor: "background.paper",
                        boxShadow: (theme) => `0 2px 8px ${alpha(theme.palette.primary.main, 0.05)}`,
                        p: 2,
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        gap: 1.5
                      }}
                    >
                      <Box>
                        <Typography variant="h4" fontWeight={800} lineHeight={1} color="text.primary">
                          {item.value}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" fontWeight={600} sx={{ mt: 0.25 }}>
                          {item.label}
                        </Typography>
                        <Typography variant="caption" sx={{ color: item.tone, fontWeight: 700, mt: 0.5, display: "block" }}>
                          {item.helper}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          width: 42,
                          height: 42,
                          borderRadius: 2,
                          flexShrink: 0,
                          display: "grid",
                          placeItems: "center",
                          backgroundColor: (theme) => alpha(theme.palette[colorKey]?.main ?? theme.palette.primary.main, 0.1),
                          color: item.tone,
                          border: (theme) => `1px solid ${alpha(theme.palette[colorKey]?.main ?? theme.palette.primary.main, 0.2)}`
                        }}
                      >
                        {item.icon}
                      </Box>
                    </Box>
                  );
                })}
              </Box>

              {/* ── MAIN GRID: Consultations + Quick Actions ── */}
              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 1fr) 360px" }, gap: 2, alignItems: "start" }}>

                {/* ── RECENT CONSULTATIONS ── */}
                <Box
                  sx={{
                    border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.14)}`,
                    borderRadius: 2.5,
                    backgroundColor: "background.paper",
                    boxShadow: (theme) => `0 4px 20px ${alpha(theme.palette.primary.main, 0.06)}`,
                    overflow: "hidden"
                  }}
                >
                  {/* Card header */}
                  <Box
                    sx={{
                      px: 2.5,
                      py: 1.6,
                      background: (theme) =>
                        `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.light} 100%)`,
                      borderBottom: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.15)}`
                    }}
                  >
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Stack direction="row" spacing={1.25} alignItems="center">
                        <Box
                          sx={{
                            width: 30,
                            height: 30,
                            borderRadius: 1.5,
                            display: "grid",
                            placeItems: "center",
                            background: (theme) =>
                              `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                            color: "#fff",
                            flexShrink: 0
                          }}
                        >
                          <HistoryEduRoundedIcon sx={{ fontSize: 16 }} />
                        </Box>
                        <Typography variant="subtitle2" fontWeight={800} sx={{ letterSpacing: 0.5 }}>
                          RECENT CONSULTATIONS
                        </Typography>
                      </Stack>
                      <AppButton
                        intent="ghost"
                        size="small"
                        endIcon={<ArrowForwardRoundedIcon sx={{ fontSize: 14 }} />}
                        onClick={() => router.push("/my-recordings")}
                      >
                        View all
                      </AppButton>
                    </Stack>
                  </Box>

                  {/* Rows */}
                  <Stack divider={<Divider flexItem />}>
                    {(recentConsultations.length ? recentConsultations : [
                      { id: 1, name: "Riya Sharma",  meta: "34Y Female", time: "2h ago",      status: "In Progress" },
                      { id: 2, name: "Arjun Mehta",  meta: "52Y Male",   time: "4h ago",      status: "Final"       },
                      { id: 3, name: "Neha Kapoor",  meta: "28Y Female", time: "Yesterday",   status: "Final"       },
                      { id: 4, name: "Mehul Gupta",  meta: "45Y Male",   time: "Yesterday",   status: "Draft"       },
                      { id: 5, name: "Priya Desai",  meta: "61Y Female", time: "2 days ago",  status: "Final"       }
                    ]).map((item) => {
                      const chipLabel  = item.status === "Final" ? "Signed" : item.status === "Draft" ? "Processing" : "Review";
                      const chipColor  = item.status === "Final" ? "success" : item.status === "Draft" ? "info" : "warning";
                      const chipIcon   = item.status === "Final"
                        ? <TaskAltRoundedIcon sx={{ fontSize: 11 }} />
                        : item.status === "Draft"
                          ? <HourglassBottomRoundedIcon sx={{ fontSize: 11 }} />
                          : <RateReviewRoundedIcon sx={{ fontSize: 11 }} />;
                      return (
                        <Stack
                          key={item.id}
                          direction="row"
                          alignItems="center"
                          justifyContent="space-between"
                          sx={{
                            px: 2.5,
                            py: 1.6,
                            transition: "background-color 0.15s ease",
                            "&:hover": {
                              backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.03)
                            }
                          }}
                        >
                          <Stack direction="row" spacing={1.5} alignItems="center">
                            {/* Avatar */}
                            <Box
                              sx={{
                                width: 40,
                                height: 40,
                                borderRadius: "50%",
                                flexShrink: 0,
                                display: "grid",
                                placeItems: "center",
                                color: "#fff",
                                fontWeight: 700,
                                fontSize: "0.82rem",
                                background: (theme) =>
                                  `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                                boxShadow: (theme) => `0 3px 8px ${alpha(theme.palette.primary.main, 0.28)}`
                              }}
                            >
                              {item.name.split(" ").filter(Boolean).slice(0, 2).map((p) => p[0]).join("").toUpperCase()}
                            </Box>
                            <Box>
                              <Typography variant="subtitle2" fontWeight={700}>
                                {item.name}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {item.meta}
                              </Typography>
                            </Box>
                          </Stack>
                          <Stack direction="row" alignItems="center" spacing={1.25}>
                            <Stack direction="row" spacing={0.4} alignItems="center">
                              <AccessTimeRoundedIcon sx={{ fontSize: 12, color: "text.disabled" }} />
                              <Typography variant="caption" color="text.secondary" fontWeight={600}>
                                {item.time}
                              </Typography>
                            </Stack>
                            <Chip
                              size="small"
                              icon={chipIcon}
                              label={chipLabel}
                              color={chipColor as "success" | "info" | "warning"}
                              sx={{ fontWeight: 700, fontSize: "0.7rem", height: 22 }}
                            />
                          </Stack>
                        </Stack>
                      );
                    })}
                  </Stack>
                </Box>

                {/* ── QUICK ACTIONS ── */}
                <Box
                  sx={{
                    border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.14)}`,
                    borderRadius: 2.5,
                    backgroundColor: "background.paper",
                    boxShadow: (theme) => `0 4px 20px ${alpha(theme.palette.primary.main, 0.06)}`,
                    overflow: "hidden"
                  }}
                >
                  {/* Card header */}
                  <Box
                    sx={{
                      px: 2.5,
                      py: 1.6,
                      background: (theme) =>
                        `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.light} 100%)`,
                      borderBottom: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.15)}`
                    }}
                  >
                    <Stack direction="row" spacing={1.25} alignItems="center">
                      <Box
                        sx={{
                          width: 30,
                          height: 30,
                          borderRadius: 1.5,
                          display: "grid",
                          placeItems: "center",
                          background: (theme) =>
                            `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                          color: "#fff",
                          flexShrink: 0
                        }}
                      >
                        <BoltRoundedIcon sx={{ fontSize: 16 }} />
                      </Box>
                      <Typography variant="subtitle2" fontWeight={800} sx={{ letterSpacing: 0.5 }}>
                        QUICK ACTIONS
                      </Typography>
                    </Stack>
                  </Box>

                  {/* Action rows */}
                  {[
                    { label: "Start Live Recording", icon: <MicRoundedIcon />,            color: "primary" as const, path: null },
                    { label: "Upload Audio File",    icon: <UploadFileRoundedIcon />,      color: "info"    as const, path: null },
                    { label: "Manage Patients",      icon: <ManageAccountsRoundedIcon />,  color: "success" as const, path: "/patients"                  },
                    { label: "Pending Reviews",      icon: <PendingActionsRoundedIcon />,  color: "warning" as const, path: "/my-recordings"              }
                  ].map((action, idx, arr) => (
                    <Box
                      key={action.label}
                      onClick={() => action.path ? router.push(action.path) : openStartConsultDialog()}
                      sx={{
                        px: 2.5,
                        py: 1.6,
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        cursor: "pointer",
                        borderBottom: (theme) =>
                          idx < arr.length - 1 ? `1px solid ${theme.palette.divider}` : "none",
                        transition: "background-color 0.15s ease",
                        "&:hover": {
                          backgroundColor: (theme) => alpha(theme.palette[action.color].main, 0.04),
                          "& .action-arrow": { transform: "translateX(3px)" }
                        }
                      }}
                    >
                      <Box
                        sx={{
                          width: 38,
                          height: 38,
                          borderRadius: 1.75,
                          flexShrink: 0,
                          display: "grid",
                          placeItems: "center",
                          backgroundColor: (theme) => alpha(theme.palette[action.color].main, 0.1),
                          color: `${action.color}.main`,
                          border: (theme) => `1px solid ${alpha(theme.palette[action.color].main, 0.2)}`
                        }}
                      >
                        {action.icon}
                      </Box>
                      <Typography variant="body2" fontWeight={700} sx={{ flex: 1 }}>
                        {action.label}
                      </Typography>
                      <ArrowForwardRoundedIcon
                        className="action-arrow"
                        sx={{
                          fontSize: 16,
                          color: "text.disabled",
                          transition: "transform 0.2s ease"
                        }}
                      />
                    </Box>
                  ))}
                </Box>

              </Box>
            </Stack>
          </Box>
        </Box>
      ) : null}

      {showPatients ? (
        <Section>
          <Stack spacing={2}>
            <SectionTitle variant="subtitle1">Search Existing Patient</SectionTitle>
            <SearchField
              placeholder="Search by name, phone, Aadhaar or MRN"
              fullWidth
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Stack spacing={1.5}>
              {filteredPatients.map((patient) => (
                <PatientRow key={patient.id}>
                  <Typography variant="body1" fontWeight={600}>
                    {patient.fullName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {patient.gender}, {patient.age}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {patient.phone}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {patient.mrn || "-"}
                  </Typography>
                  <AppButton intent="secondary" size="small" onClick={() => setSelectedPatient(patient)}>
                    Select
                  </AppButton>
                </PatientRow>
              ))}
            </Stack>
          </Stack>
        </Section>
      ) : null}

      {showPatients ? (
        <Section>
          <Stack spacing={2}>
            <SectionTitle variant="subtitle1">Create New Patient</SectionTitle>
            <ModalForm>
              <TextField
                label="Full Name"
                value={form.fullName}
                onChange={(event) => setForm({ ...form, fullName: event.target.value })}
              />
              <TextField
                label="Age"
                value={form.age}
                onChange={(event) => setForm({ ...form, age: event.target.value })}
              />
              <TextField
                label="Gender"
                value={form.gender}
                onChange={(event) => setForm({ ...form, gender: event.target.value })}
              />
              <TextField
                label="Phone Number"
                value={form.phone}
                onChange={(event) => setForm({ ...form, phone: event.target.value })}
              />
              <TextField
                label="Address"
                value={form.address}
                onChange={(event) => setForm({ ...form, address: event.target.value })}
              />
              <TextField
                label="Aadhaar / Third-Party ID"
                value={form.aadhaar}
                onChange={(event) => setForm({ ...form, aadhaar: event.target.value })}
              />
              <TextField
                label="Hospital ID / MRN"
                value={form.mrn}
                onChange={(event) => setForm({ ...form, mrn: event.target.value })}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form.consent}
                    onChange={(event) => setForm({ ...form, consent: event.target.checked })}
                  />
                }
                label="Consent received"
              />
              <AppButton intent="primary" onClick={() => handleCreatePatient()}>
                Save Patient
              </AppButton>
            </ModalForm>
          </Stack>
        </Section>
      ) : null}

      {showConsultation && !selectedPatient ? (
        <Section>
          <Stack spacing={2.5}>
            <SectionTitle variant="h6">Select Patient to Start Consultation</SectionTitle>
            <Typography variant="body2" color="text.secondary">
              Choose an existing patient. If not available, create a new one and continue.
            </Typography>
            <SearchField
              placeholder="Search by name, phone, Aadhaar or MRN"
              fullWidth
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Stack spacing={1.5}>
              {filteredPatients.map((patient) => (
                <PatientRow key={patient.id}>
                  <Typography variant="body1" fontWeight={600}>
                    {patient.fullName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {patient.gender}, {patient.age}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {patient.phone}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {patient.mrn || "-"}
                  </Typography>
                  <AppButton intent="primary" size="small" onClick={() => setSelectedPatient(patient)}>
                    Use Patient
                  </AppButton>
                </PatientRow>
              ))}
            </Stack>
            <Divider />
            <SectionTitle variant="subtitle1">Create New Patient</SectionTitle>
            <ModalForm>
              <TextField
                label="Full Name"
                value={form.fullName}
                onChange={(event) => setForm({ ...form, fullName: event.target.value })}
              />
              <TextField
                label="Age"
                value={form.age}
                onChange={(event) => setForm({ ...form, age: event.target.value })}
              />
              <TextField
                label="Gender"
                value={form.gender}
                onChange={(event) => setForm({ ...form, gender: event.target.value })}
              />
              <TextField
                label="Phone Number"
                value={form.phone}
                onChange={(event) => setForm({ ...form, phone: event.target.value })}
              />
              <TextField
                label="Address"
                value={form.address}
                onChange={(event) => setForm({ ...form, address: event.target.value })}
              />
              <TextField
                label="Aadhaar / Third-Party ID"
                value={form.aadhaar}
                onChange={(event) => setForm({ ...form, aadhaar: event.target.value })}
              />
              <TextField
                label="Hospital ID / MRN"
                value={form.mrn}
                onChange={(event) => setForm({ ...form, mrn: event.target.value })}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form.consent}
                    onChange={(event) => setForm({ ...form, consent: event.target.checked })}
                  />
                }
                label="Consent received"
              />
              <AppButton intent="primary" onClick={() => handleCreatePatient(true)}>
                Create and Continue
              </AppButton>
            </ModalForm>
          </Stack>
        </Section>
      ) : null}

      {showConsultation && selectedPatient ? (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 1fr) 400px" },
            minHeight: "calc(100vh - 72px)",
            backgroundColor: "background.paper"
          }}
        >

          {/* ──────────── LEFT / CENTER PANEL ──────────── */}
          <Box sx={{ display: "flex", flexDirection: "column", borderRight: { lg: (theme) => `1px solid ${theme.palette.divider}` } }}>

            {/* Patient header */}
            <Box
              sx={{
                px: { xs: 2.5, sm: 3 },
                py: 2,
                background: (theme) =>
                  `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.light} 100%)`,
                borderBottom: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.15)}`
              }}
            >
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={1.5}
                justifyContent="space-between"
                alignItems={{ sm: "center" }}
              >
                {/* Patient info + avatar */}
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <Box
                    sx={{
                      width: 46,
                      height: 46,
                      borderRadius: "50%",
                      flexShrink: 0,
                      display: "grid",
                      placeItems: "center",
                      fontWeight: 700,
                      fontSize: "0.9rem",
                      color: "#fff",
                      background: (theme) =>
                        `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                      boxShadow: (theme) => `0 4px 10px ${alpha(theme.palette.primary.main, 0.35)}`
                    }}
                  >
                    {selectedPatient.fullName
                      .split(" ")
                      .filter(Boolean)
                      .slice(0, 2)
                      .map((p) => p[0])
                      .join("")
                      .toUpperCase()}
                  </Box>
                  <Box>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography variant="h6" fontWeight={700} color="text.primary">
                        {selectedPatient.fullName}
                      </Typography>
                      {isRecording && (
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                            px: 1,
                            py: 0.3,
                            borderRadius: 999,
                            backgroundColor: (theme) => alpha(theme.palette.error.main, 0.12),
                            border: (theme) => `1px solid ${alpha(theme.palette.error.main, 0.3)}`
                          }}
                        >
                          <Box
                            sx={{
                              width: 7,
                              height: 7,
                              borderRadius: "50%",
                              backgroundColor: "error.main",
                              "@keyframes blink": {
                                "0%, 100%": { opacity: 1 },
                                "50%": { opacity: 0.25 }
                              },
                              animation: "blink 1.2s ease-in-out infinite"
                            }}
                          />
                          <Typography
                            variant="caption"
                            fontWeight={800}
                            color="error.main"
                            sx={{ fontSize: "0.67rem", letterSpacing: 0.5 }}
                          >
                            LIVE
                          </Typography>
                        </Box>
                      )}
                    </Stack>
                    <Typography variant="body2" color="text.secondary">
                      {selectedPatient.age}Y • {selectedPatient.gender} • Today
                    </Typography>
                  </Box>
                </Stack>

                {/* Mode buttons */}
                <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap>
                  <AppButton
                    intent={recordingMode === "record" ? "primary" : "neutral"}
                    size="small"
                    startIcon={<MicRoundedIcon />}
                    onClick={() => {
                      setRecordingMode("record");
                      if (recordingMode === "upload") {
                        setConsultStage("idle");
                        setUploadedFileName(null);
                        setRecordSeconds(0);
                      }
                    }}
                  >
                    Record
                  </AppButton>
                  <AppButton
                    intent={recordingMode === "upload" ? "primary" : "neutral"}
                    size="small"
                    startIcon={<UploadFileRoundedIcon />}
                    onClick={() => {
                      setRecordingMode("upload");
                      setConsultStage("idle");
                      setUploadedFileName(null);
                    }}
                  >
                    Upload
                  </AppButton>
                  <AppButton
                    intent="neutral"
                    size="small"
                    onClick={() => setSelectedPatient(null)}
                  >
                    Change Patient
                  </AppButton>
                </Stack>
              </Stack>
            </Box>

            {/* Recording / upload / processing area */}
            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                px: { xs: 2, md: 6 },
                py: { xs: 3, md: 5 },
                textAlign: "center"
              }}
            >
              {/* ── PROCESSING STATE ── */}
              {consultStage === "processing" ? (
                <Stack spacing={3} alignItems="center" sx={{ maxWidth: 420, mx: "auto" }}>
                  <Box sx={{ position: "relative", display: "inline-flex" }}>
                    <CircularProgress
                      size={100}
                      thickness={2}
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
                      <AutoAwesomeRoundedIcon sx={{ fontSize: 36 }} />
                    </Box>
                  </Box>
                  <Box>
                    <Typography variant="h6" fontWeight={700}>
                      AI is generating your note…
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mt={0.5}>
                      Structuring SOAP sections and generating ICD recommendations.
                    </Typography>
                  </Box>
                  <Box sx={{ width: "100%" }}>
                    <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.75 }}>
                      <Typography variant="caption" color="text.secondary" fontWeight={600}>
                        Processing audio
                      </Typography>
                      <Typography variant="caption" fontWeight={800} color="primary.main">
                        {processingProgress}%
                      </Typography>
                    </Stack>
                    <LinearProgress
                      variant="determinate"
                      value={processingProgress}
                      sx={{
                        height: 8,
                        borderRadius: 999,
                        backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.1),
                        "& .MuiLinearProgress-bar": { borderRadius: 999 }
                      }}
                    />
                  </Box>
                </Stack>

              ) : recordingMode === "upload" ? (
                /* ── UPLOAD STATE ── */
                uploadedFileName && consultStage === "ready" ? (
                  /* File selected — show confirmation */
                  <Stack spacing={2.5} alignItems="center" sx={{ maxWidth: 480, mx: "auto", width: "100%" }}>
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: "50%",
                        display: "grid",
                        placeItems: "center",
                        backgroundColor: (theme) => alpha(theme.palette.success.main, 0.1),
                        border: (theme) => `2px solid ${alpha(theme.palette.success.main, 0.3)}`,
                        color: "success.main"
                      }}
                    >
                      <TaskAltRoundedIcon sx={{ fontSize: 38 }} />
                    </Box>
                    <Box textAlign="center">
                      <Typography variant="h6" fontWeight={700}>
                        File ready
                      </Typography>
                      <Typography variant="body2" color="text.secondary" mt={0.5}>
                        Your audio file has been selected and is ready to process.
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        width: "100%",
                        px: 2,
                        py: 1.5,
                        borderRadius: 2.5,
                        border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                        backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.04),
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5
                      }}
                    >
                      <Box
                        sx={{
                          width: 38,
                          height: 38,
                          borderRadius: 1.5,
                          flexShrink: 0,
                          display: "grid",
                          placeItems: "center",
                          backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.1),
                          color: "primary.main"
                        }}
                      >
                        <UploadFileRoundedIcon fontSize="small" />
                      </Box>
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography
                          variant="body2"
                          fontWeight={700}
                          noWrap
                          title={uploadedFileName}
                        >
                          {uploadedFileName}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Audio file selected
                        </Typography>
                      </Box>
                    </Box>
                    <Stack direction="row" spacing={1}>
                      <AppButton
                        intent="neutral"
                        size="small"
                        startIcon={<CloudUploadRoundedIcon />}
                        onClick={() => {
                          setUploadedFileName(null);
                          setConsultStage("idle");
                          fileInputRef.current?.click();
                        }}
                      >
                        Change file
                      </AppButton>
                      <AppButton
                        intent="danger"
                        size="small"
                        onClick={() => {
                          setUploadedFileName(null);
                          setConsultStage("idle");
                        }}
                      >
                        Remove
                      </AppButton>
                    </Stack>
                  </Stack>
                ) : (
                  /* No file yet — show dropzone */
                  <UploadDropzone
                    active={dragActive}
                    onDragOver={(event) => {
                      event.preventDefault();
                      setDragActive(true);
                    }}
                    onDragLeave={() => setDragActive(false)}
                    onDrop={handleDrop}
                    sx={{ maxWidth: 520, width: "100%", mx: "auto" }}
                  >
                    <Box
                      sx={{
                        width: 68,
                        height: 68,
                        borderRadius: "50%",
                        display: "grid",
                        placeItems: "center",
                        mx: "auto",
                        mb: 2,
                        backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.1),
                        color: "primary.main"
                      }}
                    >
                      <CloudUploadRoundedIcon sx={{ fontSize: 34 }} />
                    </Box>
                    <Typography variant="subtitle1" fontWeight={700} gutterBottom>
                      Drop audio file here
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      MP3, WAV, M4A, WEBM supported
                    </Typography>
                    <AppButton
                      intent="primary"
                      size="large"
                      sx={{ mt: 2.5 }}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      Browse device
                    </AppButton>
                  </UploadDropzone>
                )

              ) : (
                /* ── RECORD STATE ── */
                <Stack spacing={3} alignItems="center">
                  {/* Pulse rings + orb */}
                  <Box
                    sx={{
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 200,
                      height: 200
                    }}
                  >
                    {isRecording && (
                      <>
                        <Box
                          sx={{
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            borderRadius: "50%",
                            backgroundColor: (theme) => alpha(theme.palette.error.main, 0.12),
                            "@keyframes ripple1": {
                              "0%": { transform: "scale(0.9)", opacity: 0.8 },
                              "100%": { transform: "scale(1.65)", opacity: 0 }
                            },
                            animation: "ripple1 1.8s ease-out infinite"
                          }}
                        />
                        <Box
                          sx={{
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            borderRadius: "50%",
                            backgroundColor: (theme) => alpha(theme.palette.error.main, 0.08),
                            "@keyframes ripple2": {
                              "0%": { transform: "scale(0.9)", opacity: 0.6 },
                              "100%": { transform: "scale(1.65)", opacity: 0 }
                            },
                            animation: "ripple2 1.8s ease-out infinite 0.55s"
                          }}
                        />
                      </>
                    )}
                    <MicOrb recording={isRecording}>
                      <MicRoundedIcon sx={{ fontSize: 68 }} />
                    </MicOrb>
                  </Box>

                  {/* Styled timer */}
                  <Box
                    sx={{
                      px: 3.5,
                      py: 1.25,
                      borderRadius: 3,
                      backgroundColor: (theme) =>
                        isRecording
                          ? alpha(theme.palette.error.main, 0.06)
                          : alpha(theme.palette.primary.main, 0.06),
                      border: (theme) =>
                        `1.5px solid ${alpha(
                          isRecording ? theme.palette.error.main : theme.palette.primary.main,
                          0.2
                        )}`
                    }}
                  >
                    <Typography
                      variant="h3"
                      fontWeight={700}
                      sx={{
                        letterSpacing: 5,
                        fontVariantNumeric: "tabular-nums",
                        lineHeight: 1,
                        color: isRecording ? "error.main" : "primary.main"
                      }}
                    >
                      {formatTime(recordSeconds)}
                    </Typography>
                  </Box>

                  {/* Status text */}
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ maxWidth: 340 }}
                  >
                    {isRecording
                      ? "Recording in progress…"
                      : consultReady
                        ? "Recording complete. Generate your clinical note below."
                        : "Tap the button below to begin recording your consultation."}
                  </Typography>

                  {/* Stop / Start button */}
                  <AppButton
                    intent={isRecording ? "danger" : "primary"}
                    size="large"
                    startIcon={<MicRoundedIcon />}
                    onClick={isRecording ? stopRecording : startRecording}
                    sx={{ minWidth: 260, maxWidth: "100%" }}
                  >
                    {isRecording ? "Stop Recording" : "Start Recording"}
                  </AppButton>
                </Stack>
              )}
            </Box>

            {/* Generate Note footer */}
            <Box
              sx={{
                borderTop: (theme) => `1px solid ${theme.palette.divider}`,
                px: { xs: 2, md: 4 },
                py: 2,
                backgroundColor: (theme) =>
                  consultReady && !noteReady && consultStage !== "processing"
                    ? alpha(theme.palette.primary.main, 0.02)
                    : "background.paper"
              }}
            >
              <AppButton
                intent="primary"
                size="large"
                disabled={!consultReady || consultStage === "processing" || noteReady}
                loading={consultStage === "processing"}
                onClick={startGeneration}
                fullWidth
                startIcon={<AutoAwesomeRoundedIcon />}
              >
                Generate Note
              </AppButton>
            </Box>
          </Box>

          {/* ──────────── RIGHT PANEL ──────────── */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              borderLeft: (theme) => `1px solid ${theme.palette.divider}`,
              backgroundColor: "background.paper",
              minHeight: 0
            }}
          >
            {/* Panel header */}
            <Box
              sx={{
                px: 2.5,
                py: 1.8,
                background: (theme) =>
                  `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.light} 100%)`,
                borderBottom: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.15)}`
              }}
            >
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Stack direction="row" spacing={1.25} alignItems="center">
                  <Box
                    sx={{
                      width: 30,
                      height: 30,
                      borderRadius: 1.5,
                      display: "grid",
                      placeItems: "center",
                      background: (theme) =>
                        `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                      color: "#fff",
                      flexShrink: 0
                    }}
                  >
                    <HistoryEduRoundedIcon sx={{ fontSize: 16 }} />
                  </Box>
                  <Typography variant="subtitle2" fontWeight={800} sx={{ letterSpacing: 0.5 }}>
                    CLINICAL NOTE PREVIEW
                  </Typography>
                </Stack>
                <Chip
                  size="small"
                  label={
                    noteReady
                      ? `${confidenceValue}% Confidence`
                      : consultStage === "processing"
                        ? "Processing…"
                        : "Awaiting audio"
                  }
                  color={noteReady ? "primary" : consultStage === "processing" ? "primary" : "default"}
                  sx={{ fontWeight: 700 }}
                />
              </Stack>
            </Box>

            {/* SOAP tabs — pill style */}
            <Stack
              direction="row"
              sx={{
                px: 2,
                py: 1.1,
                borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
                gap: 0.5,
                flexWrap: "wrap"
              }}
            >
              {["Subjective", "Objective", "Assessment", "Plan"].map((tab, index) => (
                <Box
                  key={tab}
                  sx={{
                    px: 1.25,
                    py: 0.4,
                    borderRadius: 999,
                    cursor: "pointer",
                    fontSize: "0.78rem",
                    fontWeight: index === 0 ? 700 : 600,
                    color: index === 0 ? "primary.main" : "text.secondary",
                    backgroundColor: (theme) =>
                      index === 0 ? alpha(theme.palette.primary.main, 0.1) : "transparent",
                    border: (theme) =>
                      index === 0
                        ? `1px solid ${alpha(theme.palette.primary.main, 0.25)}`
                        : "1px solid transparent",
                    transition: "all 0.15s ease",
                    "&:hover": {
                      backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.06)
                    }
                  }}
                >
                  {tab}
                </Box>
              ))}
            </Stack>

            {/* Scrollable note content */}
            <Box sx={{ flex: 1, overflowY: "auto" }}>

              {/* HPI */}
              <Box sx={{ p: 2, borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                  <Box
                    sx={{
                      width: 4,
                      height: 14,
                      borderRadius: 999,
                      backgroundColor: "primary.main",
                      flexShrink: 0
                    }}
                  />
                  <Typography variant="caption" fontWeight={800} color="text.secondary">
                    HPI
                  </Typography>
                </Stack>
                {noteReady ? (
                  <Typography variant="body2" lineHeight={1.7}>
                    {selectedPatient.fullName},{" "}
                    {selectedPatient.age}-year-old{" "}
                    {selectedPatient.gender.toLowerCase()}, presents with progressive
                    dyspnea over 3–4 days. Rescue inhaler efficacy appears reduced and
                    medication adherence concerns are noted.
                  </Typography>
                ) : (
                  <Stack spacing={0.9} mt={0.5}>
                    <Box sx={{ height: 9, borderRadius: 1, bgcolor: (theme) => alpha(theme.palette.text.primary, 0.08) }} />
                    <Box sx={{ height: 9, borderRadius: 1, bgcolor: (theme) => alpha(theme.palette.text.primary, 0.08) }} />
                    <Box sx={{ height: 9, width: "68%", borderRadius: 1, bgcolor: (theme) => alpha(theme.palette.text.primary, 0.08) }} />
                  </Stack>
                )}
              </Box>

              {/* ICD-10 codes */}
              <Box sx={{ p: 2, borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.25 }}>
                  <Box
                    sx={{
                      width: 4,
                      height: 14,
                      borderRadius: 999,
                      backgroundColor: "info.main",
                      flexShrink: 0
                    }}
                  />
                  <Typography variant="caption" fontWeight={800} color="text.secondary">
                    SUGGESTED ICD-10 CODES
                  </Typography>
                </Stack>
                <Stack spacing={1}>
                  {[
                    { code: "J44.1", label: "COPD with exacerbation",          confidence: 98, color: "success" as const },
                    { code: "I10",   label: "Essential hypertension",           confidence: 95, color: "primary" as const },
                    { code: "H53.9", label: "Visual disturbance, unspecified",  confidence: 82, color: "info"    as const }
                  ].map((item) => (
                    <Box
                      key={item.code}
                      sx={{
                        border: (theme) => `1px solid ${theme.palette.divider}`,
                        borderLeft: (theme) => `3px solid ${theme.palette[item.color].main}`,
                        borderRadius: 1.5,
                        p: 1.25
                      }}
                    >
                      <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Chip
                            size="small"
                            color={item.color}
                            label={item.code}
                            sx={{ fontWeight: 700, fontSize: "0.7rem" }}
                          />
                          <Typography variant="body2" fontWeight={600}>
                            {item.label}
                          </Typography>
                        </Stack>
                        <Typography
                          variant="caption"
                          fontWeight={800}
                          sx={{ color: (theme) => theme.palette[item.color].main }}
                        >
                          {item.confidence}%
                        </Typography>
                      </Stack>
                    </Box>
                  ))}
                </Stack>
              </Box>

              {/* Medications */}
              <Box sx={{ p: 2 }}>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.25 }}>
                  <Box
                    sx={{
                      width: 4,
                      height: 14,
                      borderRadius: 999,
                      backgroundColor: "warning.main",
                      flexShrink: 0
                    }}
                  />
                  <Typography variant="caption" fontWeight={800} color="text.secondary">
                    MEDICATIONS MENTIONED
                  </Typography>
                </Stack>
                <Stack spacing={1}>
                  {[
                    { name: "Hydrochlorothiazide", note: "Current – compliance issue noted", type: "warning" as const },
                    { name: "Prednisolone 40mg",   note: "New – 5-day course",               type: "success" as const }
                  ].map((med) => (
                    <Box
                      key={med.name}
                      sx={{
                        border: (theme) => `1px solid ${theme.palette.divider}`,
                        borderLeft: (theme) => `3px solid ${theme.palette[med.type].main}`,
                        borderRadius: 1.5,
                        p: 1.25
                      }}
                    >
                      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                        <Box>
                          <Typography variant="body2" fontWeight={700}>{med.name}</Typography>
                          <Typography variant="caption" color="text.secondary">{med.note}</Typography>
                        </Box>
                        <Chip
                          size="small"
                          label={med.type === "warning" ? "Current" : "New"}
                          color={med.type}
                          sx={{ height: 20, fontSize: "0.65rem", fontWeight: 700, flexShrink: 0 }}
                        />
                      </Stack>
                    </Box>
                  ))}
                </Stack>
              </Box>

            </Box>

            {/* Review & Sign Off */}
            <Box
              sx={{
                p: 2,
                borderTop: (theme) => `1px solid ${theme.palette.divider}`,
                backgroundColor: (theme) =>
                  noteReady ? alpha(theme.palette.primary.main, 0.02) : "background.paper"
              }}
            >
              <AppButton
                intent="primary"
                size="large"
                disabled={!noteReady || signingOff}
                loading={signingOff}
                fullWidth
                startIcon={<TaskAltRoundedIcon />}
                onClick={handleSignOff}
              >
                Review &amp; Sign Off
              </AppButton>
            </Box>
          </Box>

        </Box>
      ) : null}

      <input
        ref={fileInputRef}
        type="file"
        accept=".mp3,.wav,.m4a,.webm,audio/*"
        hidden
        onChange={handleUploadChange}
      />
    </Stack>
  );
}
