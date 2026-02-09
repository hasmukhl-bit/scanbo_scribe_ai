"use client";

import AppShell from "@/components/AppShell";
import Dashboard from "@/components/Dashboard";

export default function PatientsPage() {
  return (
    <AppShell title="Patients" subtitle="Manage your patient records" active="patients">
      <Dashboard mode="patients" />
    </AppShell>
  );
}
