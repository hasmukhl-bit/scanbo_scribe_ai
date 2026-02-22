"use client";

import * as React from "react";
import styled from "@emotion/styled";
import { alpha } from "@mui/material/styles";
import {
  Box,
  Button,
  Chip,
  InputAdornment,
  OutlinedInput,
  Stack,
  Typography
} from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useRouter } from "next/navigation";
import AppShell from "@/components/layout/AppShell";

const PageWrap = styled(Box)(({ theme }) => ({
  minHeight: "calc(100vh - 72px)",
  borderTop: `1px solid ${theme.palette.divider}`,
  backgroundColor: alpha(theme.palette.primary.main, 0.02),
  padding: theme.spacing(3)
}));

const TableWrap = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 14,
  overflow: "hidden",
  backgroundColor: theme.palette.background.paper
}));

const HeaderRow = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "minmax(230px, 1.8fr) minmax(140px, 0.9fr) minmax(140px, 0.9fr) minmax(140px, 0.9fr) minmax(160px, 0.8fr)",
  gap: theme.spacing(1),
  alignItems: "center",
  padding: theme.spacing(1.35, 2),
  borderBottom: `1px solid ${theme.palette.divider}`,
  backgroundColor: alpha(theme.palette.primary.main, 0.03)
}));

const BodyRow = styled(HeaderRow)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  "&:last-of-type": {
    borderBottom: "none"
  }
}));

const AvatarDot = styled(Box, {
  shouldForwardProp: (prop) => prop !== "tone"
})<{ tone: string }>(({ tone }) => ({
  width: 38,
  height: 38,
  borderRadius: "50%",
  backgroundColor: tone,
  color: "#fff",
  display: "grid",
  placeItems: "center",
  fontWeight: 700
}));

type PatientRow = {
  id: string;
  initials: string;
  name: string;
  mrn: string;
  ageGender: string;
  phone: string;
  lastVisit: string;
  status: "Review" | "Signed" | "Processing";
};

const rows: PatientRow[] = [
  {
    id: "1",
    initials: "RS",
    name: "Riya Sharma",
    mrn: "00124",
    ageGender: "34Y • Female",
    phone: "9876543210",
    lastVisit: "Feb 5, 2026",
    status: "Review"
  },
  {
    id: "2",
    initials: "AM",
    name: "Arjun Mehta",
    mrn: "00098",
    ageGender: "52Y • Male",
    phone: "9123456789",
    lastVisit: "Feb 4, 2026",
    status: "Signed"
  },
  {
    id: "3",
    initials: "NK",
    name: "Neha Kapoor",
    mrn: "00211",
    ageGender: "28Y • Female",
    phone: "9988776655",
    lastVisit: "Feb 3, 2026",
    status: "Signed"
  },
  {
    id: "4",
    initials: "MG",
    name: "Mehul Gupta",
    mrn: "00176",
    ageGender: "45Y • Male",
    phone: "8877665544",
    lastVisit: "Feb 2, 2026",
    status: "Processing"
  },
  {
    id: "5",
    initials: "PD",
    name: "Priya Desai",
    mrn: "00088",
    ageGender: "61Y • Female",
    phone: "7788990011",
    lastVisit: "Jan 30, 2026",
    status: "Signed"
  }
];

function statusColor(status: PatientRow["status"]): "warning" | "success" | "info" {
  if (status === "Review") return "warning";
  if (status === "Processing") return "info";
  return "success";
}

export default function PatientsPage() {
  const router = useRouter();
  const [query, setQuery] = React.useState("");

  const filtered = rows.filter((row) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      row.name.toLowerCase().includes(q) ||
      row.phone.includes(q) ||
      row.mrn.includes(q)
    );
  });

  return (
    <AppShell title="Patients" subtitle="" active="patients">
      <PageWrap>
        <Stack spacing={2.2}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="h4" fontWeight={800}>
              Patients
            </Typography>
            <Stack direction="row" spacing={1}>
              <Button
                variant="outlined"
                startIcon={<FilterListRoundedIcon />}
                sx={{ textTransform: "none", borderRadius: 2, fontWeight: 700 }}
              >
                Filter
              </Button>
              <Button
                variant="contained"
                startIcon={<AddRoundedIcon />}
                sx={{ textTransform: "none", borderRadius: 2, fontWeight: 700 }}
              >
                New Patient
              </Button>
            </Stack>
          </Stack>

          <OutlinedInput
            fullWidth
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by name, phone, Aadhaar or MRN..."
            sx={{ borderRadius: 2.1, bgcolor: "background.paper" }}
            startAdornment={
              <InputAdornment position="start">
                <SearchRoundedIcon color="action" />
              </InputAdornment>
            }
          />

          <TableWrap>
            <HeaderRow>
              <Typography variant="body2" color="text.secondary" fontWeight={700}>
                PATIENT
              </Typography>
              <Typography variant="body2" color="text.secondary" fontWeight={700}>
                AGE / GENDER
              </Typography>
              <Typography variant="body2" color="text.secondary" fontWeight={700}>
                PHONE
              </Typography>
              <Typography variant="body2" color="text.secondary" fontWeight={700}>
                LAST VISIT
              </Typography>
              <Typography variant="body2" color="text.secondary" fontWeight={700}>
                STATUS
              </Typography>
            </HeaderRow>

            {filtered.map((row) => (
              <BodyRow key={row.id}>
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <AvatarDot tone="#1172BA">{row.initials}</AvatarDot>
                  <Box>
                    <Typography variant="subtitle1" fontWeight={800}>
                      {row.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      MRN: {row.mrn}
                    </Typography>
                  </Box>
                </Stack>
                <Typography variant="body1" fontWeight={600}>
                  {row.ageGender}
                </Typography>
                <Typography variant="body1" fontWeight={600}>
                  {row.phone}
                </Typography>
                <Typography variant="body1" fontWeight={600}>
                  {row.lastVisit}
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Chip size="small" label={row.status} color={statusColor(row.status)} />
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => router.push(`/consultation?patientId=${row.id}&mode=record`)}
                    sx={{ textTransform: "none", borderRadius: 999, minWidth: 56 }}
                  >
                    View
                  </Button>
                </Stack>
              </BodyRow>
            ))}
          </TableWrap>
        </Stack>
      </PageWrap>
    </AppShell>
  );
}
