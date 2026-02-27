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
import { apiGet, apiPatch, apiDelete } from "@/lib/api-client";
import type { Consultation, Patient, NoteStatus, SoapNote, Medication } from "@/lib/types";

/* ── Icons ─────────────────────────────────────────────────────────────── */
import ViewModuleRoundedIcon from "@mui/icons-material/ViewModuleRounded";
import ViewListRoundedIcon from "@mui/icons-material/ViewListRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";
import HourglassBottomRoundedIcon from "@mui/icons-material/HourglassBottomRounded";
import RateReviewRoundedIcon from "@mui/icons-material/RateReviewRounded";
import HistoryEduRoundedIcon from "@mui/icons-material/HistoryEduRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import GraphicEqRoundedIcon from "@mui/icons-material/GraphicEqRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import MicRoundedIcon from "@mui/icons-material/MicRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import SortRoundedIcon from "@mui/icons-material/SortRounded";
import MedicationRoundedIcon from "@mui/icons-material/MedicationRounded";
import LocalHospitalRoundedIcon from "@mui/icons-material/LocalHospitalRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import CalendarTodayRoundedIcon from "@mui/icons-material/CalendarTodayRounded";

/* ─── Helpers ────────────────────────────────────────────────────────────── */

type SortKey = "date-desc" | "date-asc" | "patient-asc";
type ViewMode = "grid" | "list";

/** Map db status → UI status */
function toNoteStatus(raw: string): NoteStatus {
  if (raw === "Final" || raw === "Signed") return "Signed";
  if (raw === "In Progress" || raw === "Processing") return "Processing";
  return "Review"; // Draft / Review
}

function statusMeta(status: NoteStatus) {
  switch (status) {
    case "Review":
      return {
        color: "warning" as const,
        icon: <RateReviewRoundedIcon sx={{ fontSize: 11 }} />,
        label: "Needs Review"
      };
    case "Processing":
      return {
        color: "info" as const,
        icon: <HourglassBottomRoundedIcon sx={{ fontSize: 11 }} />,
        label: "Processing"
      };
    case "Signed":
      return {
        color: "success" as const,
        icon: <TaskAltRoundedIcon sx={{ fontSize: 11 }} />,
        label: "Signed"
      };
  }
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

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  }) + " · " + d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
}

/* ─── Enriched note type ─────────────────────────────────────────────────── */

type EnrichedNote = Consultation & {
  patientName: string;
  patientInitials: string;
  noteStatus: NoteStatus;
  formattedDate: string;
};

function enrichNote(c: Consultation, patients: Patient[]): EnrichedNote {
  const patient = patients.find((p) => p.id === c.patientId);
  const patientName = patient?.fullName ?? "Unknown Patient";
  return {
    ...c,
    patientName,
    patientInitials: getInitials(patientName),
    noteStatus: toNoteStatus(c.status),
    formattedDate: formatDate(c.startedAt)
  };
}

/* ─── Skeleton loader ────────────────────────────────────────────────────── */

function CardSkeleton() {
  return (
    <Box
      sx={{
        borderRadius: 2.5,
        border: (theme) => `1px solid ${theme.palette.divider}`,
        p: 2.25,
        display: "flex",
        flexDirection: "column",
        gap: 1.5,
        bgcolor: "background.paper"
      }}
    >
      <Stack direction="row" spacing={1.5} alignItems="center">
        <Skeleton variant="circular" width={40} height={40} />
        <Box flex={1}>
          <Skeleton width="55%" height={20} />
          <Skeleton width="38%" height={14} sx={{ mt: 0.5 }} />
        </Box>
        <Skeleton width={72} height={22} sx={{ borderRadius: 99 }} />
      </Stack>
      <Skeleton height={14} />
      <Skeleton height={14} width="80%" />
      <Stack direction="row" justifyContent="space-between" sx={{ mt: 0.5 }}>
        <Stack direction="row" spacing={0.5}>
          <Skeleton width={48} height={20} sx={{ borderRadius: 99 }} />
          <Skeleton width={36} height={20} sx={{ borderRadius: 99 }} />
        </Stack>
        <Skeleton width={60} height={20} />
      </Stack>
      <Skeleton height={32} sx={{ borderRadius: 1.5 }} />
    </Box>
  );
}

/* ─── Note grid card ─────────────────────────────────────────────────────── */

function NoteGridCard({
  note,
  onView,
  onSignOff,
  onDelete
}: {
  note: EnrichedNote;
  onView: () => void;
  onSignOff: () => void;
  onDelete: () => void;
}) {
  const meta = statusMeta(note.noteStatus);
  return (
    <Box
      sx={{
        borderRadius: 2.5,
        border: (theme) => `1px solid ${theme.palette.divider}`,
        borderLeft: (theme) => `3px solid ${theme.palette.primary.main}`,
        backgroundColor: "background.paper",
        p: 2.25,
        display: "flex",
        flexDirection: "column",
        gap: 1.5,
        cursor: "default",
        transition: "box-shadow 0.2s ease, transform 0.2s ease",
        "&:hover": {
          boxShadow: (theme) => `0 8px 24px ${alpha(theme.palette.primary.main, 0.1)}`,
          transform: "translateY(-2px)"
        }
      }}
    >
      {/* Header */}
      <Stack direction="row" alignItems="flex-start" justifyContent="space-between" spacing={1}>
        <Stack direction="row" spacing={1.25} alignItems="center">
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
              boxShadow: (theme) => `0 3px 8px ${alpha(theme.palette.primary.main, 0.3)}`
            }}
          >
            {note.patientInitials}
          </Box>
          <Box>
            <Typography variant="subtitle2" fontWeight={700} lineHeight={1.2}>
              {note.patientName}
            </Typography>
            <Stack direction="row" spacing={0.5} alignItems="center">
              <AccessTimeRoundedIcon sx={{ fontSize: 12, color: "text.disabled" }} />
              <Typography variant="caption" color="text.secondary">
                {note.formattedDate}
              </Typography>
            </Stack>
          </Box>
        </Stack>
        <Chip
          size="small"
          icon={meta.icon}
          label={meta.label}
          color={meta.color}
          sx={{ fontWeight: 700, fontSize: "0.7rem", height: 22, flexShrink: 0 }}
        />
      </Stack>

      {/* Summary */}
      <Typography
        variant="body2"
        color="text.secondary"
        lineHeight={1.65}
        sx={{
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          flex: 1
        }}
      >
        {note.summary}
      </Typography>

      {/* Footer row */}
      <Box sx={{ borderTop: (theme) => `1px solid ${theme.palette.divider}`, pt: 1.25 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction="row" spacing={0.6} flexWrap="wrap">
            {(note.codes ?? []).map((code) => (
              <Chip
                key={code}
                size="small"
                label={code}
                sx={{
                  height: 20,
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  backgroundColor: (theme) => alpha(theme.palette.info.main, 0.1),
                  color: "info.dark",
                  border: (theme) => `1px solid ${alpha(theme.palette.info.main, 0.25)}`
                }}
              />
            ))}
          </Stack>
          {note.duration && (
            <Stack direction="row" spacing={0.6} alignItems="center">
              <GraphicEqRoundedIcon sx={{ fontSize: 13, color: "text.disabled" }} />
              <Typography variant="caption" color="text.secondary" fontWeight={600}>
                {note.duration} min
              </Typography>
            </Stack>
          )}
        </Stack>
      </Box>

      {/* Actions */}
      <Stack direction="row" spacing={1}>
        <AppButton
          intent="secondary"
          size="small"
          endIcon={<OpenInNewRoundedIcon sx={{ fontSize: 14 }} />}
          fullWidth
          onClick={onView}
        >
          View Note
        </AppButton>
        {note.noteStatus === "Review" && (
          <Tooltip title="Sign off this note">
            <Box sx={{ flexShrink: 0 }}>
              <AppButton
                intent="primary"
                size="small"
                startIcon={<TaskAltRoundedIcon sx={{ fontSize: 14 }} />}
                onClick={onSignOff}
              >
                Sign Off
              </AppButton>
            </Box>
          </Tooltip>
        )}
        <Tooltip title="Delete consultation">
          <IconButton
            size="small"
            onClick={onDelete}
            sx={{
              flexShrink: 0,
              color: "text.disabled",
              "&:hover": { color: "error.main", bgcolor: (theme) => alpha(theme.palette.error.main, 0.08) }
            }}
          >
            <DeleteOutlineRoundedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Stack>
    </Box>
  );
}

/* ─── Note list item ─────────────────────────────────────────────────────── */

function NoteListItem({
  note,
  onView,
  onSignOff,
  onDelete
}: {
  note: EnrichedNote;
  onView: () => void;
  onSignOff: () => void;
  onDelete: () => void;
}) {
  const meta = statusMeta(note.noteStatus);
  return (
    <Box
      sx={{
        borderRadius: 2.5,
        border: (theme) => `1px solid ${theme.palette.divider}`,
        borderLeft: (theme) => `3px solid ${theme.palette.primary.main}`,
        backgroundColor: "background.paper",
        px: 2.25,
        py: 1.75,
        display: "grid",
        gridTemplateColumns: "minmax(0, 1fr) auto",
        alignItems: "center",
        gap: 2,
        transition: "box-shadow 0.2s ease, transform 0.2s ease",
        "&:hover": {
          boxShadow: (theme) => `0 4px 16px ${alpha(theme.palette.primary.main, 0.08)}`,
          transform: "translateX(2px)"
        }
      }}
    >
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
            boxShadow: (theme) => `0 3px 8px ${alpha(theme.palette.primary.main, 0.3)}`
          }}
        >
          {note.patientInitials}
        </Box>
        <Box sx={{ minWidth: 0 }}>
          <Stack direction="row" spacing={1.5} alignItems="center" flexWrap="wrap">
            <Typography variant="subtitle2" fontWeight={700}>
              {note.patientName}
            </Typography>
            <Stack direction="row" spacing={0.5} alignItems="center">
              <AccessTimeRoundedIcon sx={{ fontSize: 12, color: "text.disabled" }} />
              <Typography variant="caption" color="text.secondary">
                {note.formattedDate}
              </Typography>
            </Stack>
          </Stack>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 0.3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
          >
            {note.summary}
          </Typography>
          <Stack direction="row" spacing={0.6} sx={{ mt: 0.8 }} flexWrap="wrap">
            {(note.codes ?? []).map((code) => (
              <Chip
                key={code}
                size="small"
                label={code}
                sx={{
                  height: 20,
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  backgroundColor: (theme) => alpha(theme.palette.info.main, 0.1),
                  color: "info.dark",
                  border: (theme) => `1px solid ${alpha(theme.palette.info.main, 0.25)}`
                }}
              />
            ))}
          </Stack>
        </Box>
      </Stack>

      <Stack spacing={1} alignItems="flex-end">
        <Chip
          size="small"
          icon={meta.icon}
          label={meta.label}
          color={meta.color}
          sx={{ fontWeight: 700, fontSize: "0.7rem", height: 22 }}
        />
        {note.duration && (
          <Stack direction="row" spacing={0.5} alignItems="center">
            <GraphicEqRoundedIcon sx={{ fontSize: 13, color: "text.disabled" }} />
            <Typography variant="caption" color="text.secondary" fontWeight={600}>
              {note.duration} min
            </Typography>
          </Stack>
        )}
        <Stack direction="row" spacing={0.75}>
          <AppButton intent="secondary" size="small" endIcon={<OpenInNewRoundedIcon sx={{ fontSize: 13 }} />} onClick={onView}>
            View
          </AppButton>
          {note.noteStatus === "Review" && (
            <AppButton intent="primary" size="small" startIcon={<TaskAltRoundedIcon sx={{ fontSize: 13 }} />} onClick={onSignOff}>
              Sign Off
            </AppButton>
          )}
          <Tooltip title="Delete">
            <IconButton
              size="small"
              onClick={onDelete}
              sx={{
                color: "text.disabled",
                "&:hover": { color: "error.main", bgcolor: (theme) => alpha(theme.palette.error.main, 0.08) }
              }}
            >
              <DeleteOutlineRoundedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>
    </Box>
  );
}

/* ─── Note Detail Dialog ─────────────────────────────────────────────────── */

function NoteDetailDialog({ note, onClose, onSignOff }: { note: EnrichedNote | null; onClose: () => void; onSignOff: (id: number) => void }) {
  if (!note) return null;
  const meta = statusMeta(note.noteStatus);
  const soap = note.soapNote;
  const meds = note.medications ?? [];

  const soapSections: { key: keyof SoapNote; label: string; color: string }[] = [
    { key: "subjective", label: "Subjective", color: "#1172BA" },
    { key: "objective", label: "Objective", color: "#2FA77A" },
    { key: "assessment", label: "Assessment", color: "#F3C44E" },
    { key: "plan", label: "Plan", color: "#2C8AD3" }
  ];

  return (
    <Dialog
      open={!!note}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          overflow: "hidden",
          border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.18)}`,
          boxShadow: "0 14px 40px rgba(17,114,186,0.14)"
        }
      }}
    >
      {/* Dialog header */}
      <Box
        sx={{
          px: 3,
          py: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: (theme) =>
            `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.light} 100%)`,
          borderBottom: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.15)}`
        }}
      >
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              flexShrink: 0,
              display: "grid",
              placeItems: "center",
              fontWeight: 700,
              fontSize: "0.85rem",
              color: "#fff",
              background: (theme) =>
                `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
              boxShadow: (theme) => `0 3px 10px ${alpha(theme.palette.primary.main, 0.35)}`
            }}
          >
            {note.patientInitials}
          </Box>
          <Stack spacing={0.2}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="subtitle1" fontWeight={800} color="text.primary">
                {note.patientName}
              </Typography>
              <Chip
                size="small"
                icon={meta.icon}
                label={meta.label}
                color={meta.color}
                sx={{ fontWeight: 700, fontSize: "0.7rem", height: 22 }}
              />
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <CalendarTodayRoundedIcon sx={{ fontSize: 12, color: "text.secondary" }} />
              <Typography variant="caption" color="text.secondary">
                {note.formattedDate}
              </Typography>
              {note.duration && (
                <>
                  <GraphicEqRoundedIcon sx={{ fontSize: 12, color: "text.secondary" }} />
                  <Typography variant="caption" color="text.secondary">
                    {note.duration} min
                  </Typography>
                </>
              )}
            </Stack>
          </Stack>
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center">
          {note.noteStatus === "Review" && (
            <AppButton
              intent="primary"
              size="small"
              startIcon={<TaskAltRoundedIcon />}
              onClick={() => { onSignOff(note.id); onClose(); }}
            >
              Sign Off
            </AppButton>
          )}
          <IconButton
            size="small"
            onClick={onClose}
            sx={{
              "&:hover": {
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                color: "primary.main"
              }
            }}
          >
            <CloseRoundedIcon fontSize="small" />
          </IconButton>
        </Stack>
      </Box>

      <DialogContent sx={{ p: 0 }}>
        <Box sx={{ p: 3 }}>
          <Stack spacing={2.5}>
            {/* ICD codes */}
            {(note.codes ?? []).length > 0 && (
              <Box
                sx={{
                  p: 1.8,
                  borderRadius: 2,
                  background: (theme) => `linear-gradient(135deg, ${alpha(theme.palette.info.main, 0.06)} 0%, ${alpha(theme.palette.info.main, 0.03)} 100%)`,
                  border: (theme) => `1px solid ${alpha(theme.palette.info.main, 0.15)}`
                }}
              >
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                  <LocalHospitalRoundedIcon sx={{ fontSize: 16, color: "info.main" }} />
                  <Typography variant="caption" fontWeight={800} color="info.main" sx={{ textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    ICD-10 Codes
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={0.75} flexWrap="wrap">
                  {note.codes!.map((code) => (
                    <Chip
                      key={code}
                      label={code}
                      size="small"
                      sx={{
                        height: 24,
                        fontWeight: 700,
                        bgcolor: (theme) => alpha(theme.palette.info.main, 0.1),
                        color: "info.dark",
                        border: (theme) => `1px solid ${alpha(theme.palette.info.main, 0.25)}`
                      }}
                    />
                  ))}
                </Stack>
              </Box>
            )}

            {/* Summary */}
            <Box>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                <Box sx={{ width: 3, height: 18, borderRadius: 99, bgcolor: "primary.main" }} />
                <Typography variant="caption" fontWeight={800} color="primary.main" sx={{ textTransform: "uppercase", letterSpacing: "0.07em" }}>
                  Summary
                </Typography>
              </Stack>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                {note.summary}
              </Typography>
            </Box>

            {/* SOAP Note */}
            {soap && (
              <Box>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
                  <Box sx={{ width: 3, height: 18, borderRadius: 99, bgcolor: "secondary.main" }} />
                  <Typography variant="caption" fontWeight={800} color="secondary.main" sx={{ textTransform: "uppercase", letterSpacing: "0.07em" }}>
                    SOAP Note
                  </Typography>
                </Stack>
                <Stack spacing={1.5}>
                  {soapSections.map(({ key, label, color }) =>
                    soap[key] ? (
                      <Box
                        key={key}
                        sx={{
                          borderRadius: 2,
                          border: `1px solid ${alpha(color, 0.18)}`,
                          borderLeft: `3px solid ${color}`,
                          overflow: "hidden"
                        }}
                      >
                        <Box
                          sx={{
                            px: 1.75,
                            py: 0.75,
                            bgcolor: alpha(color, 0.06),
                            borderBottom: `1px solid ${alpha(color, 0.12)}`
                          }}
                        >
                          <Typography variant="caption" fontWeight={800} sx={{ color, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                            {label}
                          </Typography>
                        </Box>
                        <Box sx={{ px: 1.75, py: 1.25 }}>
                          <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                            {soap[key]}
                          </Typography>
                        </Box>
                      </Box>
                    ) : null
                  )}
                </Stack>
              </Box>
            )}

            {/* Medications */}
            {meds.length > 0 && (
              <Box>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
                  <Box sx={{ width: 3, height: 18, borderRadius: 99, bgcolor: "success.main" }} />
                  <Typography variant="caption" fontWeight={800} color="success.main" sx={{ textTransform: "uppercase", letterSpacing: "0.07em" }}>
                    Medications
                  </Typography>
                </Stack>
                <Stack spacing={1}>
                  {meds.map((med: Medication, idx: number) => (
                    <Box
                      key={idx}
                      sx={{
                        borderRadius: 2,
                        border: (theme) => `1px solid ${alpha(theme.palette.success.main, 0.15)}`,
                        borderLeft: (theme) => `3px solid ${theme.palette.success.main}`,
                        px: 1.75,
                        py: 1.1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 1
                      }}
                    >
                      <Stack direction="row" spacing={1.2} alignItems="center">
                        <MedicationRoundedIcon sx={{ fontSize: 16, color: "success.main" }} />
                        <Box>
                          <Typography variant="subtitle2" fontWeight={700}>
                            {med.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {med.dose} · {med.frequency}
                          </Typography>
                        </Box>
                      </Stack>
                      <Chip
                        label={med.type}
                        size="small"
                        sx={{
                          height: 20,
                          fontSize: "0.65rem",
                          fontWeight: 800,
                          bgcolor: med.type === "New"
                            ? (theme) => alpha(theme.palette.primary.main, 0.1)
                            : (theme) => alpha(theme.palette.success.main, 0.1),
                          color: med.type === "New" ? "primary.main" : "success.main",
                          border: med.type === "New"
                            ? (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.2)}`
                            : (theme) => `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
                          "& .MuiChip-label": { px: 0.8 }
                        }}
                      />
                    </Box>
                  ))}
                </Stack>
              </Box>
            )}
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

/* ─── Delete Confirm Dialog ──────────────────────────────────────────────── */

function DeleteConfirmDialog({
  note,
  onConfirm,
  onCancel
}: {
  note: EnrichedNote | null;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <Dialog
      open={!!note}
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
      <Box
        sx={{
          p: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: 2
        }}
      >
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
            Delete Consultation?
          </Typography>
          <Typography variant="body2" color="text.secondary">
            This will permanently remove the consultation for{" "}
            <strong>{note?.patientName}</strong>. This action cannot be undone.
          </Typography>
        </Box>
        <Stack direction="row" spacing={1.5} sx={{ width: "100%" }}>
          <AppButton intent="neutral" fullWidth onClick={onCancel}>
            Cancel
          </AppButton>
          <AppButton intent="danger" fullWidth onClick={onConfirm}>
            Delete
          </AppButton>
        </Stack>
      </Box>
    </Dialog>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────── */

export default function MyRecordingsPage() {
  const { openStartConsultDialog } = useConsultDialog();

  const [view, setView] = React.useState<ViewMode>("grid");
  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<NoteStatus | "All">("All");
  const [sortKey, setSortKey] = React.useState<SortKey>("date-desc");

  const [rawConsultations, setRawConsultations] = React.useState<Consultation[]>([]);
  const [patients, setPatients] = React.useState<Patient[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const [viewNote, setViewNote] = React.useState<EnrichedNote | null>(null);
  const [deleteTarget, setDeleteTarget] = React.useState<EnrichedNote | null>(null);

  /* ── Load data ── */
  const loadData = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [pData, cData] = await Promise.all([
        apiGet<Patient[]>("/patients"),
        apiGet<Consultation[]>("/consultations")
      ]);
      setPatients(pData);
      setRawConsultations(cData);
    } catch (e) {
      setError((e as Error).message ?? "Failed to load data");
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => { loadData(); }, [loadData]);

  /* ── Derived enriched notes ── */
  const allNotes: EnrichedNote[] = React.useMemo(
    () => rawConsultations.map((c) => enrichNote(c, patients)),
    [rawConsultations, patients]
  );

  /* ── Filter + sort ── */
  const filtered = React.useMemo(() => {
    let list = allNotes.filter((n) => {
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        n.patientName.toLowerCase().includes(q) ||
        n.summary.toLowerCase().includes(q) ||
        (n.codes ?? []).some((c) => c.toLowerCase().includes(q));
      const matchStatus = statusFilter === "All" || n.noteStatus === statusFilter;
      return matchSearch && matchStatus;
    });

    list = [...list].sort((a, b) => {
      if (sortKey === "date-asc") return new Date(a.startedAt).getTime() - new Date(b.startedAt).getTime();
      if (sortKey === "patient-asc") return a.patientName.localeCompare(b.patientName);
      return new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime(); // date-desc
    });

    return list;
  }, [allNotes, search, statusFilter, sortKey]);

  const counts = React.useMemo(() => ({
    total: allNotes.length,
    signed: allNotes.filter((n) => n.noteStatus === "Signed").length,
    review: allNotes.filter((n) => n.noteStatus === "Review").length,
    processing: allNotes.filter((n) => n.noteStatus === "Processing").length
  }), [allNotes]);

  /* ── Actions ── */
  const handleSignOff = async (id: number) => {
    await apiPatch<Consultation>("/consultations", id, { status: "Signed" });
    setRawConsultations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: "Signed" } : c))
    );
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    await apiDelete("/consultations", deleteTarget.id);
    setRawConsultations((prev) => prev.filter((c) => c.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  /* ── Render ── */
  return (
    <AppShell title="Consultations" subtitle="" active="home">
      <Box
        sx={{
          minHeight: "calc(100vh - 72px)",
          backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.02),
          borderTop: (theme) => `1px solid ${theme.palette.divider}`
        }}
      >
        {/* ── Header ── */}
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
          <Stack direction={{ xs: "column", sm: "row" }} alignItems={{ sm: "center" }} justifyContent="space-between" spacing={1.5}>
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
                    `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                  color: "#fff",
                  boxShadow: (theme) => `0 4px 14px ${alpha(theme.palette.primary.main, 0.35)}`
                }}
              >
                <HistoryEduRoundedIcon />
              </Box>
              <Box>
                <Typography variant="h5" fontWeight={800} lineHeight={1.2}>
                  Consultations
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  All recorded consultations and generated notes
                </Typography>
              </Box>
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center">
              {/* View toggle */}
              <Box
                sx={{
                  display: "flex",
                  gap: 0.5,
                  p: 0.5,
                  height: 40,
                  alignItems: "center",
                  borderRadius: 2,
                  bgcolor: "background.paper",
                  border: (theme) => `1px solid ${theme.palette.divider}`
                }}
              >
                {(["grid", "list"] as ViewMode[]).map((v) => (
                  <Tooltip key={v} title={v === "grid" ? "Grid view" : "List view"}>
                    <IconButton
                      onClick={() => setView(v)}
                      sx={{
                        width: 30,
                        height: 30,
                        borderRadius: 1.5,
                        bgcolor: view === v ? "primary.main" : "transparent",
                        color: view === v ? "#fff" : "text.secondary",
                        "&:hover": {
                          bgcolor: (theme) => view === v ? theme.palette.primary.dark : alpha(theme.palette.primary.main, 0.07)
                        }
                      }}
                    >
                      {v === "grid" ? <ViewModuleRoundedIcon sx={{ fontSize: 18 }} /> : <ViewListRoundedIcon sx={{ fontSize: 18 }} />}
                    </IconButton>
                  </Tooltip>
                ))}
              </Box>

              <Divider orientation="vertical" flexItem />

              {/* Sort */}
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
                <MenuItem value="date-desc">Newest first</MenuItem>
                <MenuItem value="date-asc">Oldest first</MenuItem>
                <MenuItem value="patient-asc">Patient A–Z</MenuItem>
              </Select>

              <AppButton intent="primary" startIcon={<MicRoundedIcon />} onClick={openStartConsultDialog}>
                New Consult
              </AppButton>
            </Stack>
          </Stack>
        </Box>

        <Box sx={{ px: { xs: 2.5, sm: 3 }, py: 2.5 }}>
          <Stack spacing={2.5}>

            {/* ── Stat cards ── */}
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr 1fr", md: "repeat(4,1fr)" }, gap: 1.5 }}>
              {[
                { label: "Total", value: counts.total, icon: <HistoryEduRoundedIcon sx={{ fontSize: 20 }} />, accent: "#1172BA", iconBg: "#EAF4FF" },
                { label: "Signed", value: counts.signed, icon: <TaskAltRoundedIcon sx={{ fontSize: 20 }} />, accent: "#2FA77A", iconBg: "#E8F6EF" },
                { label: "Needs Review", value: counts.review, icon: <RateReviewRoundedIcon sx={{ fontSize: 20 }} />, accent: "#F3C44E", iconBg: "#FFF3D6" },
                { label: "Processing", value: counts.processing, icon: <HourglassBottomRoundedIcon sx={{ fontSize: 20 }} />, accent: "#2C8AD3", iconBg: "#E6F2FD" }
              ].map((s) => (
                <Box
                  key={s.label}
                  sx={{
                    borderRadius: 2.5,
                    p: 2,
                    bgcolor: "background.paper",
                    border: (theme) => `1px solid ${theme.palette.divider}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 1.5,
                    boxShadow: (theme) => `0 2px 8px ${alpha(theme.palette.primary.main, 0.05)}`
                  }}
                >
                  <Box>
                    {loading ? <Skeleton width={32} height={28} /> : (
                      <Typography variant="h5" fontWeight={800} color="text.primary" sx={{ lineHeight: 1 }}>
                        {s.value}
                      </Typography>
                    )}
                    <Typography variant="caption" fontWeight={600} color="text.secondary">
                      {s.label}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: 42,
                      height: 42,
                      borderRadius: 2,
                      display: "grid",
                      placeItems: "center",
                      bgcolor: s.iconBg,
                      color: s.accent,
                      flexShrink: 0,
                      border: `1px solid ${alpha(s.accent, 0.2)}`
                    }}
                  >
                    {s.icon}
                  </Box>
                </Box>
              ))}
            </Box>

            {/* ── Search + filter ── */}
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.25} alignItems={{ sm: "center" }}>
              <TextField
                placeholder="Search by patient, summary or ICD code…"
                size="small"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
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
                  endAdornment: search ? (
                    <InputAdornment position="end">
                      <IconButton size="small" onClick={() => setSearch("")}>
                        <CloseRoundedIcon fontSize="small" />
                      </IconButton>
                    </InputAdornment>
                  ) : null
                }}
              />

              {/* Status pills */}
              <Stack direction="row" spacing={0.6}>
                {(["All", "Signed", "Review", "Processing"] as const).map((s) => {
                  const active = statusFilter === s;
                  const c = s !== "All" ? statusMeta(s as NoteStatus).color : null;
                  return (
                    <Box
                      key={s}
                      onClick={() => setStatusFilter(s)}
                      sx={{
                        px: 1.4,
                        py: 0.5,
                        borderRadius: 999,
                        cursor: "pointer",
                        fontSize: "0.78rem",
                        fontWeight: 700,
                        transition: "all 0.15s ease",
                        color: active ? "#fff" : "text.secondary",
                        bgcolor: (theme) =>
                          active
                            ? s === "All"
                              ? theme.palette.primary.main
                              : theme.palette[c!].main
                            : alpha(theme.palette.text.primary, 0.06),
                        "&:hover": {
                          bgcolor: (theme) =>
                            !active ? alpha(theme.palette.primary.main, 0.08) : undefined
                        }
                      }}
                    >
                      {s === "Review" ? "Needs Review" : s}
                    </Box>
                  );
                })}
              </Stack>
            </Stack>

            {/* ── Result count ── */}
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="body2" color="text.secondary" fontWeight={600}>
                {loading ? "Loading…" : `${filtered.length} consultation${filtered.length !== 1 ? "s" : ""}${search || statusFilter !== "All" ? " found" : ""}`}
              </Typography>
              {error && (
                <AppButton intent="neutral" size="small" startIcon={<RefreshRoundedIcon />} onClick={loadData}>
                  Retry
                </AppButton>
              )}
            </Stack>

            {/* ── Error ── */}
            {error && (
              <Box
                sx={{
                  p: 2.5,
                  borderRadius: 2.5,
                  bgcolor: (theme) => alpha(theme.palette.error.main, 0.06),
                  border: (theme) => `1px solid ${alpha(theme.palette.error.main, 0.2)}`,
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5
                }}
              >
                <WarningAmberRoundedIcon sx={{ color: "error.main" }} />
                <Typography variant="body2" color="error.main" fontWeight={600}>
                  {error}
                </Typography>
              </Box>
            )}

            {/* ── Loading skeletons ── */}
            {loading && (
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0,1fr))", xl: "repeat(3, minmax(0,1fr))" },
                  gap: 2
                }}
              >
                {Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)}
              </Box>
            )}

            {/* ── Empty state ── */}
            {!loading && !error && filtered.length === 0 && (
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
                  <PersonRoundedIcon sx={{ fontSize: 28 }} />
                </Box>
                <Box textAlign="center">
                  <Typography variant="subtitle1" fontWeight={700}>No consultations found</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {search || statusFilter !== "All" ? "Try adjusting your search or filter" : "Start a new consultation to see it here"}
                  </Typography>
                </Box>
                <Stack direction="row" spacing={1}>
                  {(search || statusFilter !== "All") && (
                    <AppButton intent="neutral" size="small" onClick={() => { setSearch(""); setStatusFilter("All"); }}>
                      Clear filters
                    </AppButton>
                  )}
                  <AppButton intent="primary" size="small" startIcon={<AddRoundedIcon />} onClick={openStartConsultDialog}>
                    New Consult
                  </AppButton>
                </Stack>
              </Stack>
            )}

            {/* ── Cards ── */}
            {!loading && !error && filtered.length > 0 && (
              view === "grid" ? (
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0,1fr))", xl: "repeat(3, minmax(0,1fr))" },
                    gap: 2
                  }}
                >
                  {filtered.map((note) => (
                    <NoteGridCard
                      key={note.id}
                      note={note}
                      onView={() => setViewNote(note)}
                      onSignOff={() => handleSignOff(note.id)}
                      onDelete={() => setDeleteTarget(note)}
                    />
                  ))}
                </Box>
              ) : (
                <Stack spacing={1.25}>
                  {filtered.map((note) => (
                    <NoteListItem
                      key={note.id}
                      note={note}
                      onView={() => setViewNote(note)}
                      onSignOff={() => handleSignOff(note.id)}
                      onDelete={() => setDeleteTarget(note)}
                    />
                  ))}
                </Stack>
              )
            )}

          </Stack>
        </Box>
      </Box>

      {/* ── Note detail dialog ── */}
      <NoteDetailDialog
        note={viewNote}
        onClose={() => setViewNote(null)}
        onSignOff={handleSignOff}
      />

      {/* ── Delete confirm dialog ── */}
      <DeleteConfirmDialog
        note={deleteTarget}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </AppShell>
  );
}
