"use client";

import dynamic from 'next/dynamic';

const Settings = dynamic(() => import("@/pages/Settings"), {
  ssr: false,
  loading: () => <div>Loading settings...</div>
});

export default function SettingsPage() {
  return <Settings />;
}
