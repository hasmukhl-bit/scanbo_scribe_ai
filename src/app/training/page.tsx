"use client";

import AppShell from "@/components/AppShell";
import InfoPage from "@/components/InfoPage";

export default function TrainingPage() {
  return (
    <AppShell title="Training Resources" subtitle="Learn Scanbo Scribe AI" active="training">
      <InfoPage
        heading="Training Resources"
        subheading="Guided resources to help you adopt audio-first documentation."
        cards={[
          {
            title: "Quick Start",
            body: "Learn the fastest way to record and generate notes."
          },
          {
            title: "Best Practices",
            body: "Tips for clearer dictation and better clinical summaries."
          },
          {
            title: "Video Walkthroughs",
            body: "Step-by-step demos for the full consultation workflow."
          }
        ]}
        footer="New tutorials are added regularly."
      />
    </AppShell>
  );
}
