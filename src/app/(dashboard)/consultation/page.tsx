"use client";

import AppShell from "@/components/layout/AppShell";
import Dashboard from "@/components/common/Dashboard";

export default function ConsultationPage() {
  return (
    <AppShell title="Consultation" subtitle="" active="consultation">
      <Dashboard mode="consultation" />
    </AppShell>
  );
}
