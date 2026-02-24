"use client";

import * as React from "react";
import styled from "@emotion/styled";
import {
  Box,
  Button,
  Chip,
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
import type { ChangeEvent, DragEvent } from "react";
import { apiGet, apiPost } from "@/lib/api-client";
import type { Consultation, Patient } from "@/lib/types";
import { useRouter, useSearchParams } from "next/navigation";

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

const ConsultationGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(2),
  gridTemplateColumns: "1fr",
  [theme.breakpoints.up("lg")]: {
    gridTemplateColumns: "minmax(0, 1fr) 420px"
  }
}));

const ConsultPanel = styled(Box)(({ theme }) => ({
  borderRadius: 14,
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.default
}));

const CenterConsultCard = styled(ConsultPanel)(({ theme }) => ({
  padding: theme.spacing(2.5),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  minHeight: 700
}));

const RightConsultCard = styled(ConsultPanel)(({ theme }) => ({
  padding: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1.75)
}));

const OptionButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "active"
})<{ active?: boolean }>(({ theme, active }) => ({
  borderRadius: 999,
  textTransform: "none",
  fontWeight: 600,
  padding: theme.spacing(0.6, 1.6),
  border: `1px solid ${active ? alpha(theme.palette.primary.main, 0.4) : theme.palette.divider}`,
  color: active ? theme.palette.primary.main : theme.palette.text.secondary,
  backgroundColor: active ? alpha(theme.palette.primary.main, 0.1) : theme.palette.background.paper
}));

const MicOrb = styled(Box, {
  shouldForwardProp: (prop) => prop !== "recording"
})<{ recording?: boolean }>(({ theme, recording }) => ({
  width: 168,
  height: 168,
  borderRadius: "50%",
  margin: "0 auto",
  display: "grid",
  placeItems: "center",
  color: "#fff",
  background: recording
    ? "linear-gradient(180deg, #ef476f 0%, #d72652 100%)"
    : "linear-gradient(180deg, #2891f5 0%, #156fbd 100%)",
  boxShadow: recording
    ? `0 0 0 10px ${alpha("#ef476f", 0.1)}, 0 24px 44px ${alpha("#ef476f", 0.35)}`
    : `0 0 0 10px ${alpha(theme.palette.primary.main, 0.1)}, 0 24px 44px ${alpha(
        theme.palette.primary.main,
        0.26
      )}`
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
            p: { xs: 2, md: 3 },
            minHeight: "calc(100vh - 72px)",
            borderTop: (theme) => `1px solid ${theme.palette.divider}`,
            backgroundColor: "background.paper"
          }}
        >
          <Stack spacing={2.5}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
              <Box>
                <Typography variant="h5" fontWeight={800}>
                  Good morning, Dr. Lohar
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.2 }}>
                  {todayLabel}
                </Typography>
              </Box>
              <AppButton
                intent="primary"
                onClick={() => router.push("/start-consult")}
              >
                + New Consult
              </AppButton>
            </Stack>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" },
                gap: 1.6
              }}
            >
              {dashboardStats.map((item) => (
                <Box
                  key={item.label}
                  sx={{
                    border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.14)}`,
                    borderRadius: 2.4,
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.04),
                    background: "linear-gradient(180deg, rgba(255,255,255,0.86) 0%, rgba(232,244,255,0.72) 100%)",
                    boxShadow: (theme) => `0 10px 24px ${alpha(theme.palette.primary.main, 0.08)}`,
                    p: 1.6,
                    position: "relative"
                  }}
                >
                  <Box
                    sx={{
                      width: 34,
                      height: 34,
                      borderRadius: 1.5,
                      display: "grid",
                      placeItems: "center",
                      color: item.tone,
                      bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1)
                      ,
                      position: "absolute",
                      top: 14,
                      right: 14
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Typography variant="h5" fontWeight={800} sx={{ mt: 0.2 }}>
                    {item.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" fontWeight={600}>
                    {item.label}
                  </Typography>
                  <Typography variant="body2" sx={{ color: item.tone, fontWeight: 700, mt: 0.7 }}>
                    {item.helper}
                  </Typography>
                </Box>
              ))}
            </Box>

            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 1fr) 380px" }, gap: 1.6, alignItems: "start" }}>
              <Box
                sx={{
                  border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.14)}`,
                  borderRadius: 2.4,
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.04),
                  background: "linear-gradient(180deg, rgba(255,255,255,0.88) 0%, rgba(236,246,255,0.74) 100%)",
                  boxShadow: (theme) => `0 12px 28px ${alpha(theme.palette.primary.main, 0.08)}`
                }}
              >
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ px: 2, py: 1.6, borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <HistoryEduRoundedIcon color="primary" fontSize="small" />
                    <Typography variant="subtitle1" fontWeight={800}>
                      RECENT CONSULTATIONS
                    </Typography>
                  </Stack>
                  <AppButton
                    intent="ghost"
                    size="small"
                    onClick={() => router.push("/my-recordings")}
                  >
                    VIEW ALL →
                  </AppButton>
                </Stack>
                <Stack divider={<Divider flexItem />}>
                  {(recentConsultations.length ? recentConsultations : [
                    { id: 1, name: "Riya Sharma", meta: "34Y Female", time: "2h ago", status: "In Progress" },
                    { id: 2, name: "Arjun Mehta", meta: "52Y Male", time: "4h ago", status: "Final" },
                    { id: 3, name: "Neha Kapoor", meta: "28Y Female", time: "Yesterday", status: "Final" },
                    { id: 4, name: "Mehul Gupta", meta: "45Y Male", time: "Yesterday", status: "Draft" },
                    { id: 5, name: "Priya Desai", meta: "61Y Female", time: "2 days ago", status: "Final" }
                  ]).map((item) => (
                    <Stack key={item.id} direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 2, py: 1.5 }}>
                      <Stack direction="row" spacing={1.3} alignItems="center">
                        <Box
                          sx={{
                            width: 38,
                            height: 38,
                            borderRadius: "50%",
                            display: "grid",
                            placeItems: "center",
                            color: "#fff",
                            fontWeight: 800,
                            fontSize: "0.95rem",
                            bgcolor: "primary.main"
                          }}
                        >
                          {item.name
                            .split(" ")
                            .filter(Boolean)
                            .slice(0, 2)
                            .map((part) => part[0])
                            .join("")
                            .toUpperCase()}
                        </Box>
                        <Box>
                          <Typography variant="subtitle1" fontWeight={700}>
                            {item.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {item.meta}
                          </Typography>
                        </Box>
                      </Stack>
                      <Stack direction="row" alignItems="center" spacing={1.2}>
                        <Typography variant="caption" color="text.secondary" fontWeight={600}>
                          {item.time}
                        </Typography>
                        <Chip
                          size="small"
                          label={item.status === "Final" ? "Signed" : item.status === "Draft" ? "Processing" : "Review"}
                          color={item.status === "Final" ? "success" : item.status === "Draft" ? "info" : "warning"}
                        />
                      </Stack>
                    </Stack>
                  ))}
                </Stack>
              </Box>

              <Box
                sx={{
                  border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.14)}`,
                  borderRadius: 2.4,
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.04),
                  background: "linear-gradient(180deg, rgba(255,255,255,0.88) 0%, rgba(236,246,255,0.74) 100%)",
                  boxShadow: (theme) => `0 12px 28px ${alpha(theme.palette.primary.main, 0.08)}`,
                  p: 1.6
                }}
              >
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.2 }}>
                  <BoltRoundedIcon color="primary" fontSize="small" />
                  <Typography variant="subtitle1" fontWeight={800}>
                    QUICK ACTIONS
                  </Typography>
                </Stack>
                <Stack spacing={1.2}>
                  <AppButton intent="secondary" startIcon={<MicRoundedIcon />} sx={{ justifyContent: "flex-start" }} fullWidth onClick={() => router.push("/start-consult?mode=record")}>
                    Start Live Recording
                  </AppButton>
                  <AppButton intent="secondary" startIcon={<UploadFileRoundedIcon />} sx={{ justifyContent: "flex-start" }} fullWidth onClick={() => router.push("/start-consult?mode=upload")}>
                    Upload Audio File
                  </AppButton>
                  <AppButton intent="secondary" startIcon={<ManageAccountsRoundedIcon />} sx={{ justifyContent: "flex-start" }} fullWidth onClick={() => router.push("/patients")}>
                    Manage Patients
                  </AppButton>
                  <AppButton intent="secondary" startIcon={<PendingActionsRoundedIcon />} sx={{ justifyContent: "flex-start" }} fullWidth onClick={() => router.push("/my-recordings")}>
                    Pending Reviews
                  </AppButton>
                </Stack>
              </Box>
            </Box>
          </Stack>
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
        <ConsultationGrid sx={{ gap: 0 }}>
          <CenterConsultCard sx={{ p: 0, minHeight: 0, borderTopRightRadius: 0, borderBottomRightRadius: 0 }}>
            <Box sx={{ p: 2.5, borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}>
              <Stack direction={{ xs: "column", md: "row" }} spacing={1.5} justifyContent="space-between" alignItems={{ md: "center" }}>
                <Box>
                  <Typography variant="h5" fontWeight={700}>
                    {selectedPatient.fullName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedPatient.age}Y • {selectedPatient.gender} • Today
                  </Typography>
                </Box>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  <OptionButton
                    active={recordingMode === "record"}
                    startIcon={<MicRoundedIcon />}
                    onClick={() => setRecordingMode("record")}
                  >
                    Record
                  </OptionButton>
                  <OptionButton
                    active={recordingMode === "upload"}
                    startIcon={<UploadFileRoundedIcon />}
                    onClick={() => setRecordingMode("upload")}
                  >
                    Upload
                  </OptionButton>
                  <OptionButton onClick={() => setSelectedPatient(null)}>Change Patient</OptionButton>
                </Stack>
              </Stack>
            </Box>

            <Box sx={{ px: 4, py: 3, textAlign: "center" }}>
              {consultStage === "processing" ? (
                <Stack spacing={1.5} alignItems="center">
                  <MicOrb>
                    <AutoAwesomeRoundedIcon fontSize="large" />
                  </MicOrb>
                  <Typography variant="h6" fontWeight={700}>
                    AI is working...
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Structuring SOAP sections and generating ICD recommendations.
                  </Typography>
                  <Box sx={{ width: "min(440px, 100%)", mt: 1 }}>
                    <LinearProgress
                      variant="determinate"
                      value={processingProgress}
                      sx={{ height: 8, borderRadius: 999 }}
                    />
                  </Box>
                </Stack>
              ) : recordingMode === "upload" && consultStage === "idle" ? (
                <UploadDropzone
                  active={dragActive}
                  onDragOver={(event) => {
                    event.preventDefault();
                    setDragActive(true);
                  }}
                  onDragLeave={() => setDragActive(false)}
                  onDrop={handleDrop}
                  sx={{ maxWidth: 580, mx: "auto" }}
                >
                  <CloudUploadRoundedIcon color="primary" sx={{ fontSize: 36, mb: 1 }} />
                  <Typography variant="subtitle1" fontWeight={700}>
                    Drop audio file here
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mt={0.5}>
                    MP3, WAV, M4A, WEBM supported
                  </Typography>
                  <AppButton
                    intent="primary"
                    size="large"
                    sx={{ mt: 2 }}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Browse device
                  </AppButton>
                </UploadDropzone>
              ) : (
                <Stack spacing={1.5} alignItems="center">
                  <MicOrb recording={isRecording} sx={{ width: 220, height: 220 }}>
                    <MicRoundedIcon sx={{ fontSize: 78 }} />
                  </MicOrb>
                  <Typography variant="h2" fontWeight={700} sx={{ letterSpacing: 4 }}>
                    {formatTime(recordSeconds)}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {isRecording
                      ? "Recording in progress..."
                      : consultReady
                        ? "Recording stopped. Generate note below."
                        : "Tap the orb or button below to begin recording."}
                  </Typography>
                  <AppButton
                    intent={isRecording ? "danger" : "primary"}
                    size="large"
                    startIcon={<MicRoundedIcon />}
                    onClick={isRecording ? stopRecording : startRecording}
                    sx={{ minWidth: 430, maxWidth: "100%" }}
                  >
                    {isRecording ? "Stop Recording" : "Start Recording"}
                  </AppButton>
                </Stack>
              )}
            </Box>
            <Box
              sx={{
                borderTop: (theme) => `1px solid ${theme.palette.divider}`,
                mt: 1,
                px: 3,
                py: 2,
                display: "flex",
                justifyContent: "center"
              }}
            >
              <AppButton
                intent="primary"
                size="large"
                disabled={!consultReady || consultStage === "processing" || noteReady}
                loading={consultStage === "processing"}
                onClick={startGeneration}
                sx={{ minWidth: 430, maxWidth: "100%" }}
              >
                Generate Note
              </AppButton>
            </Box>
          </CenterConsultCard>

          <RightConsultCard sx={{ p: 0, borderTopLeftRadius: 0, borderBottomLeftRadius: 0, minHeight: 0 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ px: 2, py: 1.8, borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}>
              <Typography variant="subtitle1" fontWeight={800}>
                CLINICAL NOTE PREVIEW
              </Typography>
              <Chip
                size="small"
                label={noteReady ? "94% Confidence" : consultStage === "processing" ? "Processing" : "Awaiting audio"}
                color={noteReady ? "success" : consultStage === "processing" ? "primary" : "default"}
              />
            </Stack>

            <Stack direction="row" sx={{ px: 2, py: 1, borderBottom: (theme) => `1px solid ${theme.palette.divider}` }} spacing={2.5}>
              {["Subjective", "Objective", "Assessment", "Plan"].map((tab, index) => (
                <Typography
                  key={tab}
                  variant="body2"
                  fontWeight={index === 0 ? 700 : 600}
                  color={index === 0 ? "primary.main" : "text.secondary"}
                  sx={{ pb: 0.8, borderBottom: index === 0 ? "2px solid" : "none", borderColor: "primary.main" }}
                >
                  {tab}
                </Typography>
              ))}
            </Stack>

            <Box sx={{ p: 2, borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}>
              <Typography variant="caption" color="text.secondary" fontWeight={800}>
                HPI
              </Typography>
              {noteReady ? (
                <Typography variant="body2" mt={1}>
                  {selectedPatient.fullName}, {selectedPatient.age}-year-old {selectedPatient.gender.toLowerCase()}, presents
                  with progressive dyspnea over 3-4 days. Rescue inhaler efficacy appears reduced and medication
                  adherence concerns are noted.
                </Typography>
              ) : (
                <Stack spacing={1} mt={1.2}>
                  <Box sx={{ height: 10, borderRadius: 1, bgcolor: (theme) => alpha(theme.palette.text.primary, 0.09) }} />
                  <Box sx={{ height: 10, borderRadius: 1, bgcolor: (theme) => alpha(theme.palette.text.primary, 0.09) }} />
                  <Box sx={{ height: 10, width: "70%", borderRadius: 1, bgcolor: (theme) => alpha(theme.palette.text.primary, 0.09) }} />
                </Stack>
              )}
            </Box>

            <Box sx={{ p: 2, borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}>
              <Typography variant="caption" color="text.secondary" fontWeight={800}>
                SUGGESTED ICD-10 CODES
              </Typography>
              <Stack spacing={1} mt={1.2}>
                {[
                  { code: "J44.1", label: "COPD with exacerbation", confidence: "98%" },
                  { code: "I10", label: "Essential hypertension", confidence: "95%" },
                  { code: "H53.9", label: "Visual disturbance, unspecified", confidence: "82%" }
                ].map((item) => (
                  <Stack
                    key={item.code}
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{ border: (theme) => `1px solid ${theme.palette.divider}`, borderRadius: 1.5, p: 1 }}
                  >
                    <Chip size="small" color="info" label={item.code} />
                    <Box>
                      <Typography variant="body2" fontWeight={600}>
                        {item.label}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {item.confidence} confidence
                      </Typography>
                    </Box>
                  </Stack>
                ))}
              </Stack>
            </Box>

            <Box sx={{ p: 2, borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}>
              <Typography variant="caption" color="text.secondary" fontWeight={800}>
                MEDICATIONS MENTIONED
              </Typography>
              <Stack spacing={1} mt={1.2}>
                <Box sx={{ border: (theme) => `1px solid ${theme.palette.divider}`, borderRadius: 1.5, p: 1.2 }}>
                  <Typography variant="body2" fontWeight={700}>
                    Hydrochlorothiazide
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Current - compliance issue noted
                  </Typography>
                </Box>
                <Box sx={{ border: (theme) => `1px solid ${theme.palette.divider}`, borderRadius: 1.5, p: 1.2 }}>
                  <Typography variant="body2" fontWeight={700}>
                    Prednisolone 40mg
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    New - 5-day course
                  </Typography>
                </Box>
              </Stack>
            </Box>

            <Box sx={{ p: 2 }}>
              <AppButton
                intent="success"
                size="large"
                disabled={!noteReady}
                fullWidth
              >
                Review &amp; Sign Off
              </AppButton>
            </Box>
          </RightConsultCard>
        </ConsultationGrid>
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
