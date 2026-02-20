"use client";

import * as React from "react";
import styled from "@emotion/styled";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Stack,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import type { Consultation, Patient } from "@/lib/types";
import { consultationService, patientService } from "@/lib/services";
import { useRouter } from "next/navigation";

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

const ConsultationRow = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "2fr 1fr 1fr",
  gap: theme.spacing(1.5),
  alignItems: "center",
  padding: theme.spacing(1.5),
  borderRadius: 10,
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.default
}));

const PrimaryAction = styled(Button)(() => ({
  textTransform: "none",
  fontWeight: 600
}));

const StartConsultButton = styled(PrimaryAction)(({ theme }) => ({
  borderRadius: 12,
  padding: theme.spacing(1.25, 3),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  boxShadow: theme.shadows[1],
  justifyContent: "center"
}));

const CustomNotesButton = styled(PrimaryAction)(({ theme }) => ({
  borderRadius: 12,
  padding: theme.spacing(1.25, 3),
  backgroundColor: alpha(theme.palette.primary.main, 0.08),
  color: theme.palette.primary.main,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
  justifyContent: "center"
}));

const DashboardTop = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: theme.spacing(2),
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "220px 1fr"
  }
}));

const LeftActionPanel = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1.5),
  padding: theme.spacing(2),
  borderRadius: 12,
  backgroundColor: theme.palette.background.default,
  border: `1px solid ${theme.palette.divider}`
}));

const ModalForm = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(2)
}));

type DashboardMode = "dashboard" | "patients" | "consultation";

type DashboardProps = {
  mode: DashboardMode;
};

export default function Dashboard({ mode }: DashboardProps) {
  const router = useRouter();
  const [patients, setPatients] = React.useState<Patient[]>([]);
  const [consultations, setConsultations] = React.useState<Consultation[]>([]);
  const [query, setQuery] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [pageError, setPageError] = React.useState("");
  const [formError, setFormError] = React.useState("");
  const [selectedPatient, setSelectedPatient] = React.useState<Patient | null>(null);
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
    setPageError("");
    setLoading(true);

    try {
      const patientsData = await patientService.list();
      setPatients(patientsData);

      if (mode === "dashboard") {
        const consultationsData = await consultationService.list();

        setConsultations(consultationsData);
      } else {
        setConsultations([]);
      }
    } catch (error) {
      console.error(error);
      setPageError("Unable to load patient data. Please refresh and try again.");
    } finally {
      setLoading(false);
    }
  }, [mode]);

  React.useEffect(() => {
    loadData();
  }, [loadData]);

  const filteredPatients = patients.filter((p) => {
    const q = query.toLowerCase();
    return (
      p.fullName.toLowerCase().includes(q) ||
      p.phone.includes(q) ||
      (p.aadhaar || "").includes(q) ||
      (p.mrn || "").toLowerCase().includes(q)
    );
  });

  const handleCreatePatient = async () => {
    setFormError("");

    if (!form.fullName || !form.age || !form.gender || !form.phone || !form.consent) {
      setFormError("Please fill required fields and confirm consent.");
      return;
    }

    setSaving(true);

    try {
      await patientService.create({
        fullName: form.fullName,
        age: Number(form.age),
        gender: form.gender,
        phone: form.phone,
        address: form.address,
        aadhaar: form.aadhaar,
        mrn: form.mrn
      });

      await loadData();
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
    } catch (error: unknown) {
      console.error(error);
      const message = error instanceof Error ? error.message : "Unable to save patient. Please try again.";
      setFormError(message);
    } finally {
      setSaving(false);
    }
  };

  const showDashboard = mode === "dashboard";
  const showPatients = mode === "patients";
  const showConsultation = mode === "consultation";

  return (
    <Stack spacing={3}>
      {loading ? (
        <Section>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <CircularProgress size={18} />
            <Typography variant="body2" color="text.secondary">
              Loading patient data...
            </Typography>
          </Stack>
        </Section>
      ) : null}

      {pageError ? (
        <Section>
          <Typography variant="body2" color="error">
            {pageError}
          </Typography>
        </Section>
      ) : null}

      {showDashboard ? (
        <Section>
          <Stack spacing={2}>
            <SectionTitle variant="h6">Dashboard</SectionTitle>
            <DashboardTop>
              <LeftActionPanel>
                <StartConsultButton
                  variant="contained"
                  onClick={() => router.push("/start-consult")}
                >
                  + Start Consult
                </StartConsultButton>
                <CustomNotesButton variant="outlined">+ Custom Notes</CustomNotesButton>
              </LeftActionPanel>
              <SearchField
                placeholder="Search by name, phone, Aadhaar or MRN"
                fullWidth
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </DashboardTop>
          </Stack>
        </Section>
      ) : null}

      {showPatients || showConsultation ? (
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
                  <Button size="small" variant="outlined" onClick={() => setSelectedPatient(patient)}>
                    {showConsultation ? "Use" : "Select"}
                  </Button>
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
              <Button variant="contained" onClick={handleCreatePatient}>
                {saving ? "Saving..." : "Save patient"}
              </Button>
              {formError ? (
                <Typography variant="body2" color="error">
                  {formError}
                </Typography>
              ) : null}
            </ModalForm>
          </Stack>
        </Section>
      ) : null}

      {showConsultation ? (
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
              <Stack direction="row" spacing={2} alignItems="center">
                <Button variant="contained" onClick={handleCreatePatient}>
                  {saving ? "Saving..." : "Save patient"}
                </Button>
                {selectedPatient ? (
                  <Chip label={`Selected: ${selectedPatient.fullName}`} />
                ) : null}
                <Button variant="outlined">Proceed to Recording</Button>
              </Stack>
              {formError ? (
                <Typography variant="body2" color="error">
                  {formError}
                </Typography>
              ) : null}
            </ModalForm>
          </Stack>
        </Section>
      ) : null}

      {showDashboard ? (
        <Section>
          <Stack spacing={2}>
            <SectionTitle variant="subtitle1">Past Consultations</SectionTitle>
            <Stack spacing={1.5}>
              {consultations.map((consultation) => {
                const patient = patients.find((p) => p.id === consultation.patientId);
                return (
                  <ConsultationRow key={consultation.id}>
                    <Box>
                      <Typography variant="body1" fontWeight={600}>
                        {patient?.fullName || "Unknown patient"}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {consultation.summary}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {new Date(consultation.startedAt).toLocaleString()}
                    </Typography>
                    <Chip label={consultation.status} variant="outlined" />
                  </ConsultationRow>
                );
              })}
            </Stack>
          </Stack>
        </Section>
      ) : null}
    </Stack>
  );
}
