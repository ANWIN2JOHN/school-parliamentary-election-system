import React from "react";
import { Routes, Route, Navigate } from "react-router";
import { LoginPage } from "@/pages/LoginPage";
import { AdminLayout } from "@/pages/admin/AdminLayout";
import { DashboardView } from "@/pages/admin/DashboardView";
import { ElectionsView } from "@/pages/admin/ElectionsView";
import { CandidatesView } from "@/pages/admin/CandidatesView";
import { ResultsView } from "@/pages/admin/ResultsView";
import { SettingsView } from "@/pages/admin/SettingsView";
import { StudentVotingApp } from "@/pages/student/StudentVotingApp";

export function AppRouter() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<LoginPage />} />

      {/* Admin */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<DashboardView />} />
        <Route path="elections" element={<ElectionsView />} />
        <Route path="candidates" element={<CandidatesView />} />
        <Route path="results" element={<ResultsView />} />
        <Route path="settings" element={<SettingsView />} />
      </Route>

      {/* Student Voting Portal */}
      <Route path="/vote" element={<StudentVotingApp />} />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
