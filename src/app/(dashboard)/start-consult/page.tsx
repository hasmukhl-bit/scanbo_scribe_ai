"use client";

import AppShell from "@/components/layout/AppShell";
import Dashboard from "@/components/common/Dashboard";

export default function StartConsultPage() {
  return (
    <AppShell title="Start Consultation" subtitle="" active="consultation">
      <Dashboard mode="consultation" />
    </AppShell>
  );
}
