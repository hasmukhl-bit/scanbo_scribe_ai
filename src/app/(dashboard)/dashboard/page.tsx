"use client";

import AppShell from "@/components/layout/AppShell";
import Dashboard from "@/components/common/Dashboard";

export default function DashboardPage() {
  return (
    <AppShell title="Dashboard" subtitle="" active="dashboard">
      <Dashboard mode="dashboard" />
    </AppShell>
  );
}
