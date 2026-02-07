"use client";

import AppShell from "@/components/AppShell";
import InfoPage from "@/components/InfoPage";

export default function SupportPage() {
  return (
    <AppShell title="Support" subtitle="Help and assistance" active="support">
      <InfoPage
        heading="Support"
        subheading="Get quick help for recording, transcription, and account questions."
        cards={[
          {
            title: "Help Center",
            body: "Find troubleshooting guides for common workflow issues."
          },
          {
            title: "Contact Support",
            body: "Reach our team for urgent technical or billing questions."
          },
          {
            title: "System Status",
            body: "Check real-time system availability and maintenance updates."
          }
        ]}
        footer="We typically respond within one business day."
      />
    </AppShell>
  );
}
