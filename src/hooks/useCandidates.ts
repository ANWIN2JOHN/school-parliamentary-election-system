import { useMemo, useState, useCallback } from "react";
import { useElectionContext } from "@/contexts/ElectionContext";
import type { Candidate } from "@/types";

export function useCandidates() {
  const { allCandidates, chairs, leaders, addCandidate, updateCandidate, deleteCandidate } = useElectionContext();
  const [search, setSearch] = useState("");
  const [filterPos, setFilterPos] = useState("All");

  const filtered = useMemo(() => {
    return allCandidates.filter(c =>
      (filterPos === "All" || c.position === filterPos) &&
      (c.name.toLowerCase().includes(search.toLowerCase()) ||
       c.panel.toLowerCase().includes(search.toLowerCase()))
    );
  }, [allCandidates, search, filterPos]);

  const handleAdd = useCallback((candidate: Omit<Candidate, "id" | "votes" | "pct">) => {
    addCandidate(candidate);
  }, [addCandidate]);

  const handleUpdate = useCallback((id: number, updates: Partial<Candidate>) => {
    updateCandidate(id, updates);
  }, [updateCandidate]);

  const handleDelete = useCallback((id: number) => {
    deleteCandidate(id);
  }, [deleteCandidate]);

  return {
    allCandidates,
    chairs,
    leaders,
    filtered,
    search,
    setSearch,
    filterPos,
    setFilterPos,
    addCandidate: handleAdd,
    updateCandidate: handleUpdate,
    deleteCandidate: handleDelete,
  };
}
