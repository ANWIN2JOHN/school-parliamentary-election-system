import React from "react";
import { Check, Download, Upload, Trash2 } from "lucide-react";
import { Field } from "@/components/Field";
import { Btn } from "@/components/Btn";
import { SectionHeader } from "@/components/SectionHeader";
import { useElectionContext } from "@/contexts/ElectionContext";

export function SettingsView() {
  const {
    schoolSettings, updateSchoolSettings,
    brandingSettings, updateBrandingSettings,
    selectedThemeColor, setSelectedThemeColor,
    resetSystem,
  } = useElectionContext();

  const [isResetting, setIsResetting] = React.useState(false);

  const handleReset = async () => {
    if (
      window.confirm(
        "Are you sure you want to reset the election? This will permanently delete all casted votes from Supabase and the dashboard. Candidates will NOT be deleted."
      )
    ) {
      setIsResetting(true);
      try {
        await resetSystem();
        alert("Election votes have been successfully reset.");
      } catch (error) {
        console.error(error);
        alert("Failed to reset system: " + (error instanceof Error ? error.message : String(error)));
      } finally {
        setIsResetting(false);
      }
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      {/* School Information */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <SectionHeader title="School Information" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="School Name" placeholder="Silver Hills Higher Secondary School" value={schoolSettings.schoolName} onChange={e => updateSchoolSettings({ schoolName: e.target.value })} />
          <Field label="School Code" placeholder="GIS-001" value={schoolSettings.schoolCode} onChange={e => updateSchoolSettings({ schoolCode: e.target.value })} />
          <Field label="Address" placeholder="123 Education Avenue, City" value={schoolSettings.address} onChange={e => updateSchoolSettings({ address: e.target.value })} />
          <Field label="Contact Email" placeholder="admin@greenfield.edu" value={schoolSettings.contactEmail} onChange={e => updateSchoolSettings({ contactEmail: e.target.value })} />
        </div>
        <div className="mt-5 pt-4 border-t border-slate-100">
          <Btn variant="primary"><Check className="w-4 h-4" />Save Changes</Btn>
        </div>
      </div>

      {/* System Branding */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <SectionHeader title="System Branding" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="System Title" placeholder="School Parliamentary Election System" value={brandingSettings.systemTitle} onChange={e => updateBrandingSettings({ systemTitle: e.target.value })} />
          <Field label="Footer Text" placeholder="Powered by Silver Hills HSS" value={brandingSettings.footerText} onChange={e => updateBrandingSettings({ footerText: e.target.value })} />
        </div>
        <div className="mt-5 pt-4 border-t border-slate-100">
          <Btn variant="primary"><Check className="w-4 h-4" />Save Changes</Btn>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <SectionHeader title="Theme Color" subtitle="Choose primary interface color" />
        <div className="flex flex-wrap gap-3">
          {[{ name: "Royal Blue", hex: "#2563EB" }, { name: "Emerald", hex: "#059669" },
            { name: "Purple", hex: "#7C3AED" }, { name: "Slate", hex: "#334155" }].map(({ name, hex }) => (
            <button key={name} onClick={() => setSelectedThemeColor(hex)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 transition ${selectedThemeColor === hex ? "border-blue-500" : "border-transparent hover:border-slate-200"}`}>
              <span className="w-5 h-5 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: hex }} />
              <span className="text-sm font-semibold text-slate-700">{name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <SectionHeader title="Backup & Restore" subtitle="Manage election data backups" />
        <div className="flex flex-wrap gap-3">
          <Btn variant="ghost"><Download className="w-4 h-4" />Backup Data</Btn>
          <Btn variant="ghost"><Upload className="w-4 h-4" />Restore Data</Btn>
          <Btn variant="danger" onClick={handleReset} disabled={isResetting}>
            {isResetting ? (
              <span>Resetting...</span>
            ) : (
              <>
                <Trash2 className="w-4 h-4" />Reset System
              </>
            )}
          </Btn>
        </div>
      </div>
    </div>
  );
}
