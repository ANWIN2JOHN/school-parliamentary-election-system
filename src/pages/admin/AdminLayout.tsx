import React, { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router";
import {
  LayoutDashboard, Calendar, Award, Trophy, Settings,
  LogOut, Bell, Menu, ChevronDown, GraduationCap,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import type { AdminTab, NavItem } from "@/types";

const NAV_ITEMS: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "elections", label: "Elections", icon: Calendar },
  { id: "candidates", label: "Candidates", icon: Award },
  { id: "results", label: "Results", icon: Trophy },
  { id: "settings", label: "Settings", icon: Settings },
];

function tabFromPath(pathname: string): AdminTab {
  const segment = pathname.split("/").filter(Boolean).pop();
  const match = NAV_ITEMS.find(n => n.id === segment);
  return match ? match.id : "dashboard";
}

export function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, isAuthenticated, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [loading, isAuthenticated, navigate]);

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-slate-900">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-400 text-sm font-semibold">Verifying credentials...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const activeTab = tabFromPath(location.pathname);
  const activeLabel = NAV_ITEMS.find(n => n.id === activeTab)?.label ?? "Dashboard";

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleNavClick = (id: AdminTab) => {
    navigate(`/admin/${id}`);
    setSidebarOpen(false);
  };

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-20 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:relative z-30 flex flex-col h-full w-64 bg-slate-900 flex-shrink-0 transition-transform duration-200 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="px-5 py-6 border-b border-white/8">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-white font-bold text-sm leading-tight truncate">Silver Hills HSS</p>
              <p className="text-slate-400 text-xs font-medium">Election System</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-0.5 overflow-y-auto">
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest px-3 mb-3 mt-1">Management</p>
          {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => handleNavClick(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all
                ${activeTab === id ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-white/6 hover:text-white"}`}>
              <Icon className="w-4 h-4 flex-shrink-0" />
              {label}
            </button>
          ))}
        </nav>

      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-4">
            <button className="lg:hidden text-slate-600 hover:text-slate-900 p-1" onClick={() => setSidebarOpen(true)}>
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-base font-bold text-slate-900">{activeLabel}</h1>
              <p className="text-slate-400 text-xs hidden sm:block">2026 Student Parliament Elections</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="flex items-center gap-2 bg-slate-100 rounded-xl px-3 py-2 cursor-pointer hover:bg-slate-200 transition">
              <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0">AD</div>
              <span className="hidden sm:block text-slate-900 text-sm font-semibold">Admin</span>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </div>
            <button onClick={handleLogout} className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition" title="Logout">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
