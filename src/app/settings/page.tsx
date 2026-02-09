"use client";

import AppShell from "@/components/AppShell";
import InfoPage from "@/components/InfoPage";

export default function SettingsPage() {
  return (
    <AppShell title="Settings" subtitle="Configure Scanbo Scribe AI" active="settings">
      <InfoPage
        heading="Settings"
        subheading="Personalize your scribe experience, devices, and language preferences."
        cards={[
          {
            title: "Audio & Devices",
            body: "Choose microphone input, enable noise suppression, and test audio levels."
          },
          {
            title: "Language & Accent",
            body: "Select dictation language, specialty vocabulary, and accent model."
          },
          {
            title: "Note Style",
            body: "Pick summary depth and preferred formatting for clinical notes."
          }
        ]}
        footer="Changes are saved automatically to your account."
      />
    </AppShell>
  );
}
