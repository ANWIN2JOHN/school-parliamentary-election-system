import React from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import { ElectionProvider } from "@/contexts/ElectionContext";
import { AppRouter } from "@/routes/AppRouter";

export default function App() {
  return (
    <AuthProvider>
      <ElectionProvider>
        <div className="min-h-screen bg-background">
          <AppRouter />
        </div>
      </ElectionProvider>
    </AuthProvider>
  );
}
