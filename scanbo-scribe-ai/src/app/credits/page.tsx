"use client";

import AppShell from "@/components/AppShell";
import InfoPage from "@/components/InfoPage";

export default function CreditsPage() {
  return (
    <AppShell title="Credits & Usage" subtitle="Track your remaining credits" active="credits">
      <InfoPage
        heading="Credits & Usage"
        subheading="Monitor transcription minutes, AI summaries, and billing status."
        cards={[
          {
            title: "Transcription Credits",
            body: "View remaining minutes and recent transcription usage."
          },
          {
            title: "AI Summary Credits",
            body: "Track generated summaries and review consumption trends."
          },
          {
            title: "Billing & Plans",
            body: "Review your current plan, invoices, and upgrade options."
          }
        ]}
        footer="Need more credits? Upgrade to Pro from the sidebar."
      />
    </AppShell>
  );
}
