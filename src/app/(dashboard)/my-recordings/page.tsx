"use client";

import * as React from "react";
import styled from "@emotion/styled";
import { alpha } from "@mui/material/styles";
import {
  Box,
  Button,
  Chip,
  IconButton,
  Stack,
  Typography
} from "@mui/material";
import ViewModuleRoundedIcon from "@mui/icons-material/ViewModuleRounded";
import ViewListRoundedIcon from "@mui/icons-material/ViewListRounded";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import AppShell from "@/components/layout/AppShell";

const PageWrap = styled(Box)(({ theme }) => ({
  minHeight: "calc(100vh - 72px)",
  borderTop: `1px solid ${theme.palette.divider}`,
  backgroundColor: alpha(theme.palette.primary.main, 0.02),
  padding: theme.spacing(3)
}));

const NotesGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: theme.spacing(1.8),
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))"
  },
  [theme.breakpoints.up("xl")]: {
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))"
  }
}));

const NoteCard = styled(Box)(({ theme }) => ({
  borderRadius: 14,
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1.3)
}));

const NotesList = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(1.2)
}));

const NoteListItem = styled(Box)(({ theme }) => ({
  borderRadius: 14,
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1.8),
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr) auto",
  alignItems: "center",
  gap: theme.spacing(1.5)
}));

type ViewMode = "grid" | "list";

type Note = {
  id: string;
  patient: string;
  date: string;
  summary: string;
  codes: string[];
  duration: string;
  status: "Review" | "Signed" | "Processing";
};

const notes: Note[] = [
  {
    id: "1",
    patient: "Riya Sharma",
    date: "Feb 5, 2026 · 10:24 AM",
    summary:
      "Patient presents with progressive dyspnea on exertion, decreased rescue inhaler efficacy. BP 152/86. COPD exacerbation suspected...",
    codes: ["J44.1", "I10"],
    duration: "2:34 min",
    status: "Review"
  },
  {
    id: "2",
    patient: "Arjun Mehta",
    date: "Feb 4, 2026 · 2:12 PM",
    summary:
      "Follow-up for type 2 diabetes and hypertension. HbA1c 7.8%. Medication adjustment discussed, metformin dose increased...",
    codes: ["E11", "I10"],
    duration: "4:12 min",
    status: "Signed"
  },
  {
    id: "3",
    patient: "Neha Kapoor",
    date: "Feb 3, 2026 · 11:05 AM",
    summary:
      "Asthma follow-up. Symptoms well-controlled on current regimen. Peak flow 380L/min. Advised to continue budesonide...",
    codes: ["J45.20"],
    duration: "1:48 min",
    status: "Signed"
  },
  {
    id: "4",
    patient: "Mehul Gupta",
    date: "Feb 2, 2026 · 3:40 PM",
    summary:
      "Acute bronchitis. Productive cough for 5 days. Afebrile. Chest clear. No antibiotics indicated at this time...",
    codes: ["J20.9"],
    duration: "2:05 min",
    status: "Processing"
  },
  {
    id: "5",
    patient: "Priya Desai",
    date: "Jan 30, 2026 · 9:30 AM",
    summary:
      "Colon polyp follow-up. Colonoscopy result reviewed. No new polyps identified. Repeat in 3 years recommended...",
    codes: ["K63.5"],
    duration: "3:20 min",
    status: "Signed"
  }
];

function statusColor(status: Note["status"]): "warning" | "success" | "info" {
  if (status === "Review") return "warning";
  if (status === "Processing") return "info";
  return "success";
}

export default function MyRecordingsPage() {
  const [view, setView] = React.useState<ViewMode>("grid");

  return (
    <AppShell title="Consultations" subtitle="" active="home">
      <PageWrap>
        <Stack spacing={2.2}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="h4" fontWeight={800}>
              Consultations
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton
                onClick={() => setView("grid")}
                sx={{
                  width: 48,
                  height: 48,
                  border: (theme) => `1px solid ${theme.palette.divider}`,
                  borderRadius: "50%",
                  bgcolor: view === "grid" ? "primary.main" : "background.paper",
                  color: view === "grid" ? "primary.contrastText" : "text.secondary",
                  "& .MuiSvgIcon-root": { fontSize: 22 }
                }}
              >
                <ViewModuleRoundedIcon fontSize="small" />
              </IconButton>
              <IconButton
                onClick={() => setView("list")}
                sx={{
                  width: 48,
                  height: 48,
                  border: (theme) => `1px solid ${theme.palette.divider}`,
                  borderRadius: "50%",
                  bgcolor: view === "list" ? "primary.main" : "background.paper",
                  color: view === "list" ? "primary.contrastText" : "text.secondary",
                  "& .MuiSvgIcon-root": { fontSize: 22 }
                }}
              >
                <ViewListRoundedIcon fontSize="small" />
              </IconButton>
              <Button
                variant="outlined"
                startIcon={<FilterListRoundedIcon />}
                sx={{ textTransform: "none", borderRadius: 2, fontWeight: 700 }}
              >
                Filter
              </Button>
            </Stack>
          </Stack>

          {view === "grid" ? (
            <NotesGrid>
              {notes.map((note) => (
                <NoteCard key={note.id}>
                  <Stack direction="row" alignItems="flex-start" justifyContent="space-between" spacing={1}>
                    <Box>
                      <Typography variant="h6" fontWeight={800}>
                        {note.patient}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {note.date}
                      </Typography>
                    </Box>
                    <Chip size="small" label={note.status} color={statusColor(note.status)} />
                  </Stack>
                  <Typography variant="body1" color="text.secondary">
                    {note.summary}
                  </Typography>
                  <Box sx={{ borderTop: (theme) => `1px solid ${theme.palette.divider}`, pt: 1.2 }}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Stack direction="row" spacing={0.8}>
                        {note.codes.map((code) => (
                          <Chip key={code} size="small" label={code} color="info" />
                        ))}
                      </Stack>
                      <Typography variant="body2" color="text.secondary">
                        {note.duration}
                      </Typography>
                    </Stack>
                  </Box>
                </NoteCard>
              ))}
            </NotesGrid>
          ) : (
            <NotesList>
              {notes.map((note) => (
                <NoteListItem key={note.id}>
                  <Box>
                    <Stack direction="row" spacing={1.2} alignItems="center">
                      <Typography variant="h6" fontWeight={800}>
                        {note.patient}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {note.date}
                      </Typography>
                    </Stack>
                    <Typography variant="body1" color="text.secondary" sx={{ mt: 0.8 }}>
                      {note.summary}
                    </Typography>
                    <Stack direction="row" spacing={0.8} sx={{ mt: 1.1 }}>
                      {note.codes.map((code) => (
                        <Chip key={code} size="small" label={code} color="info" />
                      ))}
                    </Stack>
                  </Box>
                  <Stack spacing={1} alignItems="flex-end">
                    <Chip size="small" label={note.status} color={statusColor(note.status)} />
                    <Typography variant="body2" color="text.secondary">
                      {note.duration}
                    </Typography>
                  </Stack>
                </NoteListItem>
              ))}
            </NotesList>
          )}
        </Stack>
      </PageWrap>
    </AppShell>
  );
}
