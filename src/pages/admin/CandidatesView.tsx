import React, { useState } from "react";
import {
  Plus, Search, Edit2, Trash2, Upload, Check,
} from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { Badge } from "@/components/Badge";
import { Btn } from "@/components/Btn";
import { Field } from "@/components/Field";
import { Modal } from "@/components/Modal";
import { useCandidates } from "@/hooks/useCandidates";
import { useElectionContext } from "@/contexts/ElectionContext";

export function CandidatesView() {
  const [view, setView] = useState<"cards" | "table">("cards");
  const { filtered, search, setSearch, filterPos, setFilterPos, allCandidates, deleteCandidate, addCandidate } = useCandidates();
  const { chairs, leaders } = useElectionContext();
  const [showModal, setShowModal] = useState(false);

  // Add candidate form state
  const [newName, setNewName] = useState("");
  const [newClass, setNewClass] = useState("");
  const [newPosition, setNewPosition] = useState("Chairperson");
  const [newPanel, setNewPanel] = useState("");
  const [newManifesto, setNewManifesto] = useState("");

  const handleAdd = () => {
    if (!newName.trim()) return;
    addCandidate({
      name: newName,
      class: newClass,
      position: newPosition,
      panel: newPanel,
      manifesto: newManifesto,
      photo: "",
      symbolKey: "star",
    });
    setNewName("");
    setNewClass("");
    setNewPanel("");
    setNewManifesto("");
    setShowModal(false);
  };

  const handleDelete = (id: number) => {
    deleteCandidate(id);
  };

  return (
    <div className="space-y-5 max-w-7xl">
      <div className="flex flex-wrap items-center gap-3 justify-between">
        <div className="flex bg-white border border-slate-200 rounded-xl overflow-hidden">
          {(["cards", "table"] as const).map(v => (
            <button key={v} onClick={() => setView(v)}
              className={`px-4 py-2 text-sm font-semibold transition capitalize ${view === v ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-slate-50"}`}>
              {v}
            </button>
          ))}
        </div>
        <Btn variant="primary" onClick={() => setShowModal(true)}>
          <Plus className="w-4 h-4" /> Add Candidate
        </Btn>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input placeholder="Search candidates…" value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <select value={filterPos} onChange={e => setFilterPos(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium">
          <option>All</option>
          <option>Chairperson</option>
          <option>School Leader</option>
        </select>
      </div>

      {view === "cards" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map(c => (
            <div key={c.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow">
              <div className={`h-1.5 ${c.position === "Chairperson" ? "bg-blue-600" : "bg-emerald-500"}`} />
              <div className="p-5">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-200 flex-shrink-0">
                    <ImageWithFallback src={c.photo} alt={c.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-slate-900">{c.name}</h3>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      <Badge color={c.position === "Chairperson" ? "blue" : "green"}>{c.position}</Badge>
                    </div>
                  </div>
                </div>
                <p className="text-slate-500 text-xs mt-3 line-clamp-2 leading-relaxed">{c.manifesto}</p>
                <div className="flex gap-2 mt-4 pt-4 border-t border-slate-100">
                  <button className="flex items-center gap-1.5 text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg text-xs font-bold transition">
                    <Edit2 className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button onClick={() => handleDelete(c.id)} className="flex items-center gap-1.5 text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-lg text-xs font-bold transition">
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {view === "table" && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  {["Candidate", "Position", "Actions"].map((h, i) => (
                    <th key={h} className={`px-4 py-3 text-slate-500 font-bold text-xs uppercase tracking-wider ${i === 2 ? "text-right" : "text-left"}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map(c => (
                  <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <ImageWithFallback src={c.photo} alt={c.name} className="w-8 h-8 rounded-lg object-cover bg-slate-200 flex-shrink-0" />
                        <span className="font-bold text-slate-900">{c.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge color={c.position === "Chairperson" ? "blue" : "green"}>{c.position}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition"><Edit2 className="w-3.5 h-3.5" /></button>
                        <button onClick={() => handleDelete(c.id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Showing {filtered.length} of {allCandidates.length} candidates</span>
            <div className="flex gap-1">
              {[1].map(n => (
                <button key={n} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${n === 1 ? "bg-blue-600 text-white" : "border border-slate-200 hover:bg-slate-50"}`}>{n}</button>
              ))}
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <Modal title="Add Candidate" onClose={() => setShowModal(false)}>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-slate-700 block mb-1.5">Candidate Photo</label>
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/30 transition">
                <Upload className="w-7 h-7 text-slate-400 mx-auto mb-2" />
                <p className="text-sm font-medium text-slate-600">Click to upload photo</p>
                <p className="text-xs text-slate-400 mt-1">PNG, JPG up to 2 MB</p>
              </div>
            </div>
            <Field label="Full Name" placeholder="e.g. John Mensah" value={newName} onChange={e => setNewName(e.target.value)} />
            <Field label="Class" placeholder="e.g. Form 4A" value={newClass} onChange={e => setNewClass(e.target.value)} />
            <div>
              <label className="text-sm font-semibold text-slate-700 block mb-1.5">Position</label>
              <select value={newPosition} onChange={e => setNewPosition(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-700">
                <option>Chairperson</option>
                <option>School Leader</option>
              </select>
            </div>
            <Field label="Panel Name" placeholder="e.g. Unity Panel" value={newPanel} onChange={e => setNewPanel(e.target.value)} />
            <div>
              <label className="text-sm font-semibold text-slate-700 block mb-1.5">Manifesto</label>
              <textarea placeholder="Brief manifesto statement…" rows={3} value={newManifesto} onChange={e => setNewManifesto(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
            </div>
            <div className="flex gap-3 pt-1">
              <Btn variant="primary" className="flex-1 justify-center" onClick={handleAdd}><Check className="w-4 h-4" />Add Candidate</Btn>
              <Btn variant="ghost" onClick={() => setShowModal(false)}>Cancel</Btn>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
