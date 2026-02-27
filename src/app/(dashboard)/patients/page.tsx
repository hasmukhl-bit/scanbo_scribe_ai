"use client";

import * as React from "react";
import { alpha } from "@mui/material/styles";
import {
  Box,
  Chip,
  CircularProgress,
  Dialog,
  DialogContent,
  Divider,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  Skeleton,
  Stack,
  TextField,
  Tooltip,
  Typography
} from "@mui/material";
import AppButton from "@/components/ui/AppButton";
import AppShell from "@/components/layout/AppShell";
import { useConsultDialog } from "@/context/ConsultDialogContext";
import { apiGet, apiPost, apiDelete } from "@/lib/api-client";
import type { Patient, Consultation, NoteStatus } from "@/lib/types";

/* ── Icons ─────────────────────────────────────────────────────────────── */
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";
import RateReviewRoundedIcon from "@mui/icons-material/RateReviewRounded";
import HourglassBottomRoundedIcon from "@mui/icons-material/HourglassBottomRounded";
import MicRoundedIcon from "@mui/icons-material/MicRounded";
import CalendarTodayRoundedIcon from "@mui/icons-material/CalendarTodayRounded";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import FingerprintRoundedIcon from "@mui/icons-material/FingerprintRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import HistoryEduRoundedIcon from "@mui/icons-material/HistoryEduRounded";
import SortRoundedIcon from "@mui/icons-material/SortRounded";

/* ─── Helpers ────────────────────────────────────────────────────────────── */

type PatientStatus = NoteStatus | "No Visit";
type SortKey = "name-asc" | "name-desc" | "visit-desc" | "visit-asc";

function toNoteStatus(raw: string): NoteStatus {
  if (raw === "Final" || raw === "Signed") return "Signed";
  if (raw === "In Progress" || raw === "Processing") return "Processing";
  return "Review";
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();
}

function statusMeta(status: PatientStatus) {
  switch (status) {
    case "Review":
      return { color: "warning" as const, icon: <RateReviewRoundedIcon sx={{ fontSize: 11 }} />, label: "Needs Review" };
    case "Processing":
      return { color: "info" as const, icon: <HourglassBottomRoundedIcon sx={{ fontSize: 11 }} />, label: "Processing" };
    case "Signed":
      return { color: "success" as const, icon: <TaskAltRoundedIcon sx={{ fontSize: 11 }} />, label: "Signed" };
    default:
      return { color: "default" as const, icon: <PersonRoundedIcon sx={{ fontSize: 11 }} />, label: "No Visit" };
  }
}

/* ─── Enriched patient row ────────────────────────────────────────────── */
type EnrichedPatient = Patient & {
  initials: string;
  status: PatientStatus;
  lastVisit: string | null;
  consultCount: number;
};

function buildEnrichedPatients(
  patients: Patient[],
  consultations: Consultation[]
): EnrichedPatient[] {
  return patients.map((p) => {
    const pConsults = consultations
      .filter((c) => c.patientId === p.id)
      .sort((a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime());

    // Status: prefer Review > Processing > Signed
    let status: PatientStatus = "No Visit";
    if (pConsults.length > 0) {
      const statuses = pConsults.map((c) => toNoteStatus(c.status));
      if (statuses.includes("Review")) status = "Review";
      else if (statuses.includes("Processing")) status = "Processing";
      else status = "Signed";
    }

    const lastVisit = pConsults[0]
      ? new Date(pConsults[0].startedAt).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric"
        })
      : null;

    return {
      ...p,
      initials: getInitials(p.fullName),
      status,
      lastVisit,
      consultCount: pConsults.length
    };
  });
}

/* ─── StatCard ───────────────────────────────────────────────────────────── */
function StatCard({
  label,
  value,
  color,
  icon,
  loading
}: {
  label: string;
  value: number;
  color: "primary" | "success" | "warning" | "info";
  icon: React.ReactNode;
  loading?: boolean;
}) {
  return (
    <Box
      sx={{
        flex: 1,
        minWidth: 110,
        px: 2,
        py: 1.5,
        borderRadius: 2.5,
        border: (theme) => `1px solid ${theme.palette.divider}`,
        bgcolor: "background.paper",
        boxShadow: (theme) => `0 2px 8px ${alpha(theme.palette.primary.main, 0.05)}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 1.25
      }}
    >
      <Box>
        {loading ? (
          <Skeleton width={32} height={28} />
        ) : (
          <Typography variant="h5" fontWeight={800} lineHeight={1} color="text.primary">
            {value}
          </Typography>
        )}
        <Typography variant="caption" color="text.secondary" fontWeight={600}>
          {label}
        </Typography>
      </Box>
      <Box
        sx={{
          width: 38,
          height: 38,
          borderRadius: 1.5,
          flexShrink: 0,
          display: "grid",
          placeItems: "center",
          backgroundColor: (theme) => alpha(theme.palette[color].main, 0.1),
          color: `${color}.main`,
          border: (theme) => `1px solid ${alpha(theme.palette[color].main, 0.2)}`
        }}
      >
        {icon}
      </Box>
    </Box>
  );
}

/* ─── New Patient Dialog ─────────────────────────────────────────────────── */
function NewPatientDialog({
  open,
  onClose,
  onCreated
}: {
  open: boolean;
  onClose: () => void;
  onCreated: (p: Patient) => void;
}) {
  const [form, setForm] = React.useState({
    fullName: "",
    age: "",
    gender: "Male",
    phone: "",
    address: "",
    aadhaar: "",
    mrn: ""
  });
  const [saving, setSaving] = React.useState(false);
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const set = (key: string, val: string) => {
    setForm((f) => ({ ...f, [key]: val }));
    if (errors[key]) setErrors((e) => { const n = { ...e }; delete n[key]; return n; });
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.fullName.trim()) e.fullName = "Full name is required";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(form.phone.trim())) e.phone = "Enter a valid 10-digit phone number";
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setSaving(true);
    try {
      const payload = {
        fullName: form.fullName.trim(),
        age: form.age ? Number(form.age) : null,
        gender: form.gender,
        phone: form.phone.trim(),
        address: form.address.trim() || undefined,
        aadhaar: form.aadhaar.trim() || undefined,
        mrn: form.mrn.trim() || undefined
      };
      const created = await apiPost<Patient>("/patients", payload);
      onCreated(created);
      setForm({ fullName: "", age: "", gender: "Male", phone: "", address: "", aadhaar: "", mrn: "" });
      onClose();
    } catch {
      setErrors({ submit: "Failed to create patient. Please try again." });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
          boxShadow: "0 20px 60px rgba(0,0,0,0.15)"
        }
      }}
    >
      {/* Header */}
      <Box
        sx={{
          px: 3,
          py: 2,
          background: (theme) =>
            `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.light} 100%)`,
          borderBottom: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Box
            sx={{
              width: 38,
              height: 38,
              borderRadius: 2,
              display: "grid",
              placeItems: "center",
              background: (theme) =>
                `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
              color: "#fff",
              boxShadow: (theme) => `0 4px 10px ${alpha(theme.palette.primary.main, 0.35)}`
            }}
          >
            <PersonRoundedIcon fontSize="small" />
          </Box>
          <Box>
            <Typography variant="subtitle1" fontWeight={800}>New Patient</Typography>
            <Typography variant="caption" color="text.secondary">Register a new patient record</Typography>
          </Box>
        </Stack>
        <IconButton
          size="small"
          onClick={onClose}
          sx={{ "&:hover": { bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1) } }}
        >
          <CloseRoundedIcon fontSize="small" />
        </IconButton>
      </Box>

      <DialogContent sx={{ p: 3 }}>
        <Stack spacing={2.5}>
          {errors.submit && (
            <Box
              sx={{
                p: 1.5,
                borderRadius: 2,
                bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
                border: (theme) => `1px solid ${alpha(theme.palette.error.main, 0.2)}`
              }}
            >
              <Typography variant="body2" color="error.main" fontWeight={600}>
                {errors.submit}
              </Typography>
            </Box>
          )}

          {/* Row 1: Full name + MRN */}
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              label="Full Name *"
              value={form.fullName}
              onChange={(e) => set("fullName", e.target.value)}
              error={!!errors.fullName}
              helperText={errors.fullName}
              fullWidth
              size="small"
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
            />
            <TextField
              label="MRN"
              value={form.mrn}
              onChange={(e) => set("mrn", e.target.value)}
              fullWidth
              size="small"
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
            />
          </Stack>

          {/* Row 2: Age + Gender */}
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              label="Age"
              type="number"
              value={form.age}
              onChange={(e) => set("age", e.target.value)}
              fullWidth
              size="small"
              inputProps={{ min: 0, max: 150 }}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
            />
            <TextField
              select
              label="Gender"
              value={form.gender}
              onChange={(e) => set("gender", e.target.value)}
              fullWidth
              size="small"
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
            >
              {["Male", "Female", "Other"].map((g) => (
                <MenuItem key={g} value={g}>{g}</MenuItem>
              ))}
            </TextField>
          </Stack>

          {/* Row 3: Phone */}
          <TextField
            label="Phone *"
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
            error={!!errors.phone}
            helperText={errors.phone}
            fullWidth
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocalPhoneRoundedIcon sx={{ fontSize: 16, color: "text.disabled" }} />
                </InputAdornment>
              )
            }}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
          />

          {/* Row 4: Address */}
          <TextField
            label="Address"
            value={form.address}
            onChange={(e) => set("address", e.target.value)}
            fullWidth
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationOnRoundedIcon sx={{ fontSize: 16, color: "text.disabled" }} />
                </InputAdornment>
              )
            }}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
          />

          {/* Row 5: Aadhaar */}
          <TextField
            label="Aadhaar"
            value={form.aadhaar}
            onChange={(e) => set("aadhaar", e.target.value)}
            fullWidth
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FingerprintRoundedIcon sx={{ fontSize: 16, color: "text.disabled" }} />
                </InputAdornment>
              )
            }}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
          />
        </Stack>
      </DialogContent>

      {/* Footer */}
      <Box
        sx={{
          px: 3,
          py: 2,
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          display: "flex",
          justifyContent: "flex-end",
          gap: 1.25
        }}
      >
        <AppButton intent="neutral" onClick={onClose} disabled={saving}>
          Cancel
        </AppButton>
        <AppButton intent="primary" onClick={handleSubmit} loading={saving}>
          Create Patient
        </AppButton>
      </Box>
    </Dialog>
  );
}

/* ─── View Patient Dialog ────────────────────────────────────────────────── */
function ViewPatientDialog({
  patient,
  consultations,
  onClose,
  onConsult
}: {
  patient: EnrichedPatient | null;
  consultations: Consultation[];
  onClose: () => void;
  onConsult: () => void;
}) {
  if (!patient) return null;
  const pConsults = consultations
    .filter((c) => c.patientId === patient.id)
    .sort((a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime());

  return (
    <Dialog
      open={!!patient}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
          boxShadow: "0 20px 60px rgba(0,0,0,0.15)"
        }
      }}
    >
      {/* Header */}
      <Box
        sx={{
          px: 3,
          py: 2.5,
          background: (theme) =>
            `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.light} 100%)`,
          borderBottom: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.15)}`
        }}
      >
        <Stack direction="row" alignItems="flex-start" justifyContent="space-between">
          <Stack direction="row" spacing={1.75} alignItems="center">
            <Box
              sx={{
                width: 52,
                height: 52,
                borderRadius: "50%",
                flexShrink: 0,
                display: "grid",
                placeItems: "center",
                fontWeight: 800,
                fontSize: "1.1rem",
                color: "#fff",
                background: (theme) =>
                  `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                boxShadow: (theme) => `0 4px 14px ${alpha(theme.palette.primary.main, 0.35)}`
              }}
            >
              {patient.initials}
            </Box>
            <Box>
              <Typography variant="h6" fontWeight={800} lineHeight={1.2}>
                {patient.fullName}
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.4 }}>
                <Chip
                  size="small"
                  icon={statusMeta(patient.status).icon}
                  label={statusMeta(patient.status).label}
                  color={statusMeta(patient.status).color as "warning" | "success" | "info" | "default"}
                  sx={{ fontWeight: 700, fontSize: "0.7rem", height: 20 }}
                />
                <Typography variant="caption" color="text.secondary">
                  {pConsults.length} consultation{pConsults.length !== 1 ? "s" : ""}
                </Typography>
              </Stack>
            </Box>
          </Stack>
          <IconButton
            size="small"
            onClick={onClose}
            sx={{ "&:hover": { bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1) } }}
          >
            <CloseRoundedIcon fontSize="small" />
          </IconButton>
        </Stack>
      </Box>

      <DialogContent sx={{ p: 0 }}>
        <Box sx={{ p: 3 }}>
          <Stack spacing={2.5}>
            {/* Patient details */}
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                border: (theme) => `1px solid ${theme.palette.divider}`,
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.02)
              }}
            >
              <Typography variant="caption" fontWeight={800} color="primary.main" sx={{ textTransform: "uppercase", letterSpacing: "0.06em", mb: 1.5, display: "block" }}>
                Patient Info
              </Typography>
              <Stack spacing={1}>
                {[
                  { icon: <PersonRoundedIcon sx={{ fontSize: 14 }} />, label: "Age / Gender", value: patient.age ? `${patient.age}Y • ${patient.gender}` : patient.gender || "—" },
                  { icon: <LocalPhoneRoundedIcon sx={{ fontSize: 14 }} />, label: "Phone", value: patient.phone || "—" },
                  { icon: <BadgeRoundedIcon sx={{ fontSize: 14 }} />, label: "MRN", value: patient.mrn || "—" },
                  { icon: <LocationOnRoundedIcon sx={{ fontSize: 14 }} />, label: "Address", value: patient.address || "—" },
                  { icon: <FingerprintRoundedIcon sx={{ fontSize: 14 }} />, label: "Aadhaar", value: patient.aadhaar || "—" }
                ].map(({ icon, label, value }) => (
                  <Stack key={label} direction="row" spacing={1} alignItems="center">
                    <Box sx={{ color: "text.disabled", width: 20, display: "grid", placeItems: "center" }}>
                      {icon}
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ width: 90, flexShrink: 0 }}>
                      {label}
                    </Typography>
                    <Typography variant="body2" fontWeight={600} color="text.primary">
                      {value}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Box>

            {/* Consultation history */}
            <Box>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.25 }}>
                <Box sx={{ width: 3, height: 16, borderRadius: 99, bgcolor: "primary.main" }} />
                <Typography variant="caption" fontWeight={800} color="primary.main" sx={{ textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  Consultation History
                </Typography>
              </Stack>

              {pConsults.length === 0 ? (
                <Box
                  sx={{
                    py: 3,
                    textAlign: "center",
                    border: (theme) => `1px dashed ${theme.palette.divider}`,
                    borderRadius: 2
                  }}
                >
                  <HistoryEduRoundedIcon sx={{ fontSize: 28, color: "text.disabled", mb: 0.5 }} />
                  <Typography variant="body2" color="text.secondary">No consultations yet</Typography>
                </Box>
              ) : (
                <Stack spacing={1}>
                  {pConsults.map((c) => {
                    const st = toNoteStatus(c.status);
                    const sm = statusMeta(st);
                    return (
                      <Box
                        key={c.id}
                        sx={{
                          p: 1.5,
                          borderRadius: 2,
                          border: (theme) => `1px solid ${theme.palette.divider}`,
                          borderLeft: (theme) => `3px solid ${theme.palette.primary.main}`,
                          bgcolor: "background.paper"
                        }}
                      >
                        <Stack direction="row" alignItems="flex-start" justifyContent="space-between" spacing={1}>
                          <Box sx={{ minWidth: 0 }}>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
                            >
                              {c.summary}
                            </Typography>
                            <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.5 }}>
                              <CalendarTodayRoundedIcon sx={{ fontSize: 11, color: "text.disabled" }} />
                              <Typography variant="caption" color="text.secondary">
                                {new Date(c.startedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                              </Typography>
                              {c.duration && (
                                <>
                                  <Typography variant="caption" color="text.disabled">·</Typography>
                                  <Typography variant="caption" color="text.secondary">{c.duration} min</Typography>
                                </>
                              )}
                            </Stack>
                          </Box>
                          <Chip
                            size="small"
                            icon={sm.icon}
                            label={sm.label}
                            color={sm.color as "warning" | "success" | "info" | "default"}
                            sx={{ fontWeight: 700, fontSize: "0.68rem", height: 20, flexShrink: 0 }}
                          />
                        </Stack>
                      </Box>
                    );
                  })}
                </Stack>
              )}
            </Box>
          </Stack>
        </Box>
      </DialogContent>

      {/* Footer */}
      <Box
        sx={{
          px: 3,
          py: 2,
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          display: "flex",
          justifyContent: "flex-end",
          gap: 1.25
        }}
      >
        <AppButton intent="neutral" onClick={onClose}>Close</AppButton>
        <AppButton intent="primary" startIcon={<MicRoundedIcon />} onClick={onConsult}>
          Start Consult
        </AppButton>
      </Box>
    </Dialog>
  );
}

/* ─── Delete Confirm Dialog ──────────────────────────────────────────────── */
function DeleteConfirmDialog({
  patient,
  onConfirm,
  onCancel
}: {
  patient: EnrichedPatient | null;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <Dialog
      open={!!patient}
      onClose={onCancel}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          border: (theme) => `1px solid ${alpha(theme.palette.error.main, 0.2)}`,
          boxShadow: "0 14px 40px rgba(0,0,0,0.12)"
        }
      }}
    >
      <Box sx={{ p: 3, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 2 }}>
        <Box
          sx={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            display: "grid",
            placeItems: "center",
            bgcolor: (theme) => alpha(theme.palette.error.main, 0.1)
          }}
        >
          <WarningAmberRoundedIcon sx={{ fontSize: 26, color: "error.main" }} />
        </Box>
        <Box>
          <Typography variant="h6" fontWeight={800} sx={{ mb: 0.5 }}>
            Delete Patient?
          </Typography>
          <Typography variant="body2" color="text.secondary">
            This will permanently remove <strong>{patient?.fullName}</strong> and all their data. This action cannot be undone.
          </Typography>
        </Box>
        <Stack direction="row" spacing={1.5} sx={{ width: "100%" }}>
          <AppButton intent="neutral" fullWidth onClick={onCancel}>Cancel</AppButton>
          <AppButton intent="danger" fullWidth onClick={onConfirm}>Delete</AppButton>
        </Stack>
      </Box>
    </Dialog>
  );
}

/* ─── Table column template ──────────────────────────────────────────────── */
const COL = "minmax(220px, 1.8fr) minmax(120px, 0.8fr) minmax(140px, 0.9fr) minmax(130px, 0.8fr) minmax(200px, auto)";

/* ─── Page ───────────────────────────────────────────────────────────────── */
export default function PatientsPage() {
  const { openStartConsultDialog } = useConsultDialog();

  const [patients, setPatients] = React.useState<Patient[]>([]);
  const [consultations, setConsultations] = React.useState<Consultation[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const [query, setQuery] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<PatientStatus | "All">("All");
  const [sortKey, setSortKey] = React.useState<SortKey>("name-asc");

  const [newPatientOpen, setNewPatientOpen] = React.useState(false);
  const [viewPatient, setViewPatient] = React.useState<EnrichedPatient | null>(null);
  const [deleteTarget, setDeleteTarget] = React.useState<EnrichedPatient | null>(null);

  /* ── Load ── */
  const loadData = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [pData, cData] = await Promise.all([
        apiGet<Patient[]>("/patients"),
        apiGet<Consultation[]>("/consultations")
      ]);
      setPatients(pData);
      setConsultations(cData);
    } catch {
      setError("Failed to load patients. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => { loadData(); }, [loadData]);

  /* ── Enriched + filtered + sorted ── */
  const enriched = React.useMemo(
    () => buildEnrichedPatients(patients, consultations),
    [patients, consultations]
  );

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return enriched
      .filter((p) => {
        const matchesSearch =
          !q ||
          p.fullName.toLowerCase().includes(q) ||
          (p.phone || "").includes(q) ||
          (p.mrn || "").toLowerCase().includes(q);
        const matchesStatus = statusFilter === "All" || p.status === statusFilter;
        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        if (sortKey === "name-asc") return a.fullName.localeCompare(b.fullName);
        if (sortKey === "name-desc") return b.fullName.localeCompare(a.fullName);
        if (sortKey === "visit-desc") {
          if (!a.lastVisit) return 1;
          if (!b.lastVisit) return -1;
          return new Date(b.lastVisit).getTime() - new Date(a.lastVisit).getTime();
        }
        if (sortKey === "visit-asc") {
          if (!a.lastVisit) return 1;
          if (!b.lastVisit) return -1;
          return new Date(a.lastVisit).getTime() - new Date(b.lastVisit).getTime();
        }
        return 0;
      });
  }, [enriched, query, statusFilter, sortKey]);

  const counts = React.useMemo(() => ({
    total: enriched.length,
    signed: enriched.filter((p) => p.status === "Signed").length,
    review: enriched.filter((p) => p.status === "Review").length,
    processing: enriched.filter((p) => p.status === "Processing").length
  }), [enriched]);

  /* ── Handlers ── */
  const handlePatientCreated = (p: Patient) => {
    setPatients((prev) => [...prev, p]);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await apiDelete("/patients", deleteTarget.id);
      setPatients((prev) => prev.filter((p) => p.id !== deleteTarget.id));
    } catch {
      /* silent */
    } finally {
      setDeleteTarget(null);
    }
  };

  /* ── Render ── */
  return (
    <AppShell title="Patients" subtitle="" active="patients">
      <Box
        sx={{
          minHeight: "calc(100vh - 72px)",
          backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.02),
          borderTop: (theme) => `1px solid ${theme.palette.divider}`
        }}
      >
        {/* ── PAGE HEADER ── */}
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
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems={{ sm: "center" }}
            justifyContent="space-between"
            spacing={1.5}
          >
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Box
                sx={{
                  width: 42,
                  height: 42,
                  borderRadius: 2,
                  flexShrink: 0,
                  display: "grid",
                  placeItems: "center",
                  background: (theme) =>
                    `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                  color: "#fff",
                  boxShadow: (theme) => `0 4px 12px ${alpha(theme.palette.primary.main, 0.35)}`
                }}
              >
                <GroupsRoundedIcon />
              </Box>
              <Box>
                <Typography variant="h5" fontWeight={800} lineHeight={1.2}>
                  Patients
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Manage and view all registered patients
                </Typography>
              </Box>
            </Stack>

            <Stack direction="row" spacing={0.75} alignItems="center">
              <Select
                value={sortKey}
                onChange={(e) => setSortKey(e.target.value as SortKey)}
                startAdornment={<SortRoundedIcon sx={{ fontSize: 16, mr: 0.5, color: "text.secondary" }} />}
                sx={{
                  height: 40,
                  borderRadius: 2,
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  bgcolor: "background.paper",
                  "& .MuiOutlinedInput-notchedOutline": { borderColor: (theme) => theme.palette.divider },
                  "& .MuiSelect-select": { py: 0, pl: 1 }
                }}
              >
                <MenuItem value="name-asc">Name A–Z</MenuItem>
                <MenuItem value="name-desc">Name Z–A</MenuItem>
                <MenuItem value="visit-desc">Latest Visit</MenuItem>
                <MenuItem value="visit-asc">Oldest Visit</MenuItem>
              </Select>
              <AppButton
                intent="primary"
                startIcon={<AddRoundedIcon />}
                onClick={() => setNewPatientOpen(true)}
              >
                New Patient
              </AppButton>
            </Stack>
          </Stack>
        </Box>

        <Box sx={{ px: { xs: 2.5, sm: 3 }, py: 2.5 }}>
          <Stack spacing={2.5}>

            {/* ── STATS ROW ── */}
            <Stack direction="row" spacing={1.25} flexWrap="wrap" useFlexGap>
              <StatCard label="Total Patients" value={counts.total}      color="primary" icon={<GroupsRoundedIcon fontSize="small" />}          loading={loading} />
              <StatCard label="Signed"          value={counts.signed}     color="success" icon={<TaskAltRoundedIcon fontSize="small" />}          loading={loading} />
              <StatCard label="Needs Review"    value={counts.review}     color="warning" icon={<RateReviewRoundedIcon fontSize="small" />}       loading={loading} />
              <StatCard label="Processing"      value={counts.processing}  color="info"   icon={<HourglassBottomRoundedIcon fontSize="small" />}   loading={loading} />
            </Stack>

            {/* ── SEARCH + FILTER ── */}
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.25} alignItems={{ sm: "center" }}>
              <TextField
                fullWidth
                size="small"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, phone or MRN…"
                sx={{
                  flex: 1,
                  "& .MuiOutlinedInput-root": { borderRadius: 2.5, backgroundColor: "background.paper" }
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchRoundedIcon fontSize="small" sx={{ color: "text.disabled" }} />
                    </InputAdornment>
                  ),
                  endAdornment: query ? (
                    <InputAdornment position="end">
                      <IconButton size="small" onClick={() => setQuery("")}>
                        <CloseRoundedIcon fontSize="small" />
                      </IconButton>
                    </InputAdornment>
                  ) : null
                }}
              />

              {/* Status filter pills */}
              <Stack direction="row" spacing={0.6} flexShrink={0}>
                {(["All", "Signed", "Review", "Processing", "No Visit"] as const).map((s) => (
                  <Box
                    key={s}
                    onClick={() => setStatusFilter(s)}
                    sx={{
                      px: 1.25,
                      py: 0.5,
                      borderRadius: 999,
                      cursor: "pointer",
                      fontSize: "0.78rem",
                      fontWeight: 700,
                      transition: "all 0.15s ease",
                      userSelect: "none",
                      color: statusFilter === s ? "#fff" : "text.secondary",
                      backgroundColor: (theme) =>
                        statusFilter === s
                          ? s === "All" || s === "No Visit"
                            ? theme.palette.primary.main
                            : theme.palette[statusMeta(s).color === "default" ? "primary" : statusMeta(s).color as "warning" | "success" | "info"].main
                          : alpha(theme.palette.text.primary, 0.06),
                      "&:hover": {
                        backgroundColor: (theme) =>
                          statusFilter !== s ? alpha(theme.palette.primary.main, 0.08) : undefined
                      }
                    }}
                  >
                    {s === "No Visit" ? "No Visit" : s}
                  </Box>
                ))}
              </Stack>
            </Stack>

            {/* ── RESULTS LABEL ── */}
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="body2" color="text.secondary" fontWeight={600}>
                {loading ? "Loading patients…" : `${filtered.length} patient${filtered.length !== 1 ? "s" : ""}${query || statusFilter !== "All" ? " found" : " registered"}`}
              </Typography>
            </Stack>

            {/* ── ERROR STATE ── */}
            {error && (
              <Stack alignItems="center" spacing={1.5} sx={{ py: 6 }}>
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    display: "grid",
                    placeItems: "center",
                    bgcolor: (theme) => alpha(theme.palette.error.main, 0.1)
                  }}
                >
                  <WarningAmberRoundedIcon sx={{ fontSize: 26, color: "error.main" }} />
                </Box>
                <Typography variant="body2" color="text.secondary">{error}</Typography>
                <AppButton intent="neutral" startIcon={<RefreshRoundedIcon />} onClick={loadData}>
                  Retry
                </AppButton>
              </Stack>
            )}

            {/* ── LOADING SKELETON ── */}
            {loading && !error && (
              <Box
                sx={{
                  border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.14)}`,
                  borderRadius: 3,
                  overflow: "hidden",
                  backgroundColor: "background.paper"
                }}
              >
                {[...Array(5)].map((_, i) => (
                  <Box
                    key={i}
                    sx={{
                      display: "grid",
                      gridTemplateColumns: COL,
                      gap: 1,
                      alignItems: "center",
                      px: 2.5,
                      py: 1.75,
                      borderBottom: (theme) => i < 4 ? `1px solid ${theme.palette.divider}` : "none"
                    }}
                  >
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Skeleton variant="circular" width={40} height={40} />
                      <Box>
                        <Skeleton width={120} height={18} />
                        <Skeleton width={80} height={14} sx={{ mt: 0.5 }} />
                      </Box>
                    </Stack>
                    <Skeleton width={80} height={16} />
                    <Skeleton width={100} height={16} />
                    <Skeleton width={90} height={16} />
                    <Stack direction="row" spacing={1}>
                      <Skeleton width={55} height={28} sx={{ borderRadius: 1.5 }} />
                      <Skeleton width={55} height={28} sx={{ borderRadius: 1.5 }} />
                      <Skeleton width={70} height={28} sx={{ borderRadius: 1.5 }} />
                    </Stack>
                  </Box>
                ))}
              </Box>
            )}

            {/* ── TABLE ── */}
            {!loading && !error && (
              <>
                {filtered.length === 0 ? (
                  <Stack alignItems="center" spacing={1.5} sx={{ py: 8 }}>
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: "50%",
                        display: "grid",
                        placeItems: "center",
                        backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.1),
                        border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                        color: "primary.main"
                      }}
                    >
                      <SearchRoundedIcon sx={{ fontSize: 28 }} />
                    </Box>
                    <Box textAlign="center">
                      <Typography variant="subtitle1" fontWeight={700}>No patients found</Typography>
                      <Typography variant="body2" color="text.secondary">Try adjusting your search or filter</Typography>
                    </Box>
                    <AppButton intent="neutral" onClick={() => { setQuery(""); setStatusFilter("All"); }}>
                      Clear filters
                    </AppButton>
                  </Stack>
                ) : (
                  <Box
                    sx={{
                      border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.14)}`,
                      borderRadius: 3,
                      overflow: "hidden",
                      backgroundColor: "background.paper",
                      boxShadow: (theme) => `0 4px 20px ${alpha(theme.palette.primary.main, 0.06)}`
                    }}
                  >
                    {/* Table header */}
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: COL,
                        gap: 1,
                        alignItems: "center",
                        px: 2.5,
                        py: 1.4,
                        background: (theme) =>
                          `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.light} 100%)`,
                        borderBottom: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.15)}`
                      }}
                    >
                      {["Patient", "Age / Gender", "Phone", "Last Visit", "Status & Actions"].map((col) => (
                        <Typography
                          key={col}
                          variant="caption"
                          fontWeight={800}
                          color="text.secondary"
                          sx={{ letterSpacing: 0.5, textTransform: "uppercase", fontSize: "0.7rem" }}
                        >
                          {col}
                        </Typography>
                      ))}
                    </Box>

                    {/* Table rows */}
                    {filtered.map((row, idx) => {
                      const meta = statusMeta(row.status);
                      return (
                        <Box
                          key={row.id}
                          sx={{
                            display: "grid",
                            gridTemplateColumns: COL,
                            gap: 1,
                            alignItems: "center",
                            px: 2.5,
                            py: 1.75,
                            borderLeft: (theme) => `3px solid ${theme.palette.primary.main}`,
                            borderBottom: (theme) =>
                              idx < filtered.length - 1
                                ? `1px solid ${theme.palette.divider}`
                                : "none",
                            transition: "background-color 0.15s ease",
                            "&:hover": {
                              backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.03)
                            }
                          }}
                        >
                          {/* Patient */}
                          <Stack direction="row" spacing={1.5} alignItems="center">
                            <Box
                              sx={{
                                width: 40,
                                height: 40,
                                borderRadius: "50%",
                                flexShrink: 0,
                                display: "grid",
                                placeItems: "center",
                                fontWeight: 700,
                                fontSize: "0.82rem",
                                color: "#fff",
                                background: (theme) =>
                                  `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                                boxShadow: (theme) => `0 3px 8px ${alpha(theme.palette.primary.main, 0.28)}`
                              }}
                            >
                              {row.initials}
                            </Box>
                            <Box>
                              <Typography variant="subtitle2" fontWeight={700}>
                                {row.fullName}
                              </Typography>
                              <Stack direction="row" spacing={0.5} alignItems="center">
                                <BadgeRoundedIcon sx={{ fontSize: 11, color: "text.disabled" }} />
                                <Typography variant="caption" color="text.secondary">
                                  {row.mrn || "—"}
                                </Typography>
                              </Stack>
                            </Box>
                          </Stack>

                          {/* Age / Gender */}
                          <Typography variant="body2" fontWeight={600} color="text.primary">
                            {row.age ? `${row.age}Y • ${row.gender}` : row.gender || "—"}
                          </Typography>

                          {/* Phone */}
                          <Stack direction="row" spacing={0.5} alignItems="center">
                            <LocalPhoneRoundedIcon sx={{ fontSize: 13, color: "text.disabled" }} />
                            <Typography variant="body2" fontWeight={600}>
                              {row.phone || "—"}
                            </Typography>
                          </Stack>

                          {/* Last Visit */}
                          <Stack direction="row" spacing={0.5} alignItems="center">
                            <CalendarTodayRoundedIcon sx={{ fontSize: 13, color: "text.disabled" }} />
                            <Typography variant="body2" fontWeight={600}>
                              {row.lastVisit || "No visits"}
                            </Typography>
                          </Stack>

                          {/* Status + Actions */}
                          <Stack direction="row" spacing={0.75} alignItems="center">
                            <Chip
                              size="small"
                              icon={meta.icon}
                              label={meta.label}
                              color={meta.color as "warning" | "success" | "info" | "default"}
                              sx={{ fontWeight: 700, fontSize: "0.7rem", height: 22 }}
                            />
                            <Tooltip title="View patient">
                              <span>
                                <AppButton
                                  intent="secondary"
                                  size="small"
                                  endIcon={<OpenInNewRoundedIcon sx={{ fontSize: 13 }} />}
                                  onClick={() => setViewPatient(row)}
                                >
                                  View
                                </AppButton>
                              </span>
                            </Tooltip>
                            <Tooltip title="Start new consult">
                              <span>
                                <AppButton
                                  intent="primary"
                                  size="small"
                                  startIcon={<MicRoundedIcon sx={{ fontSize: 13 }} />}
                                  onClick={openStartConsultDialog}
                                >
                                  Consult
                                </AppButton>
                              </span>
                            </Tooltip>
                            <Tooltip title="Delete patient">
                              <IconButton
                                size="small"
                                onClick={() => setDeleteTarget(row)}
                                sx={{
                                  color: "text.disabled",
                                  "&:hover": {
                                    color: "error.main",
                                    bgcolor: (theme) => alpha(theme.palette.error.main, 0.08)
                                  }
                                }}
                              >
                                <DeleteOutlineRoundedIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </Stack>
                        </Box>
                      );
                    })}

                    {/* Table footer */}
                    <Box
                      sx={{
                        px: 2.5,
                        py: 1.1,
                        borderTop: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                        background: (theme) => alpha(theme.palette.primary.main, 0.02)
                      }}
                    >
                      <Typography variant="caption" color="text.secondary" fontWeight={600}>
                        Showing {filtered.length} of {enriched.length} patients
                      </Typography>
                    </Box>
                  </Box>
                )}
              </>
            )}
          </Stack>
        </Box>
      </Box>

      {/* ── Dialogs ── */}
      <NewPatientDialog
        open={newPatientOpen}
        onClose={() => setNewPatientOpen(false)}
        onCreated={handlePatientCreated}
      />
      <ViewPatientDialog
        patient={viewPatient}
        consultations={consultations}
        onClose={() => setViewPatient(null)}
        onConsult={() => { setViewPatient(null); openStartConsultDialog(); }}
      />
      <DeleteConfirmDialog
        patient={deleteTarget}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </AppShell>
  );
}
