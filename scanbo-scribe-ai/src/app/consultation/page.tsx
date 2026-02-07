"use client";

import AppShell from "@/components/AppShell";
import Dashboard from "@/components/Dashboard";

export default function ConsultationPage() {
  return (
    <AppShell title="Start Consultation" subtitle="" active="consultation">
      <Dashboard mode="consultation" />
    </AppShell>
  );
}
