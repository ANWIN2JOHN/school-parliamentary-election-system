import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import type { Candidate, VoteRecord, VotingProgressEntry } from "@/types";

export function exportToExcel(
  chairs: Candidate[],
  leaders: Candidate[],
  votes: VoteRecord[],
  progress: VotingProgressEntry[],
  schoolName: string
) {
  const wb = XLSX.utils.book_new();

  // Sheet 1: Candidates Standings
  const standingsHeader = ["Position", "Candidate Name", "Class", "Panel", "Votes Received", "Percentage"];
  const standingsRows = [
    ...chairs.map(c => [c.position, c.name, c.class, c.panel, c.votes, `${c.pct}%`]),
    ...leaders.map(c => [c.position, c.name, c.class, c.panel, c.votes, `${c.pct}%`])
  ];
  const wsStandings = XLSX.utils.aoa_to_sheet([standingsHeader, ...standingsRows]);
  XLSX.utils.book_append_sheet(wb, wsStandings, "Candidate Standings");

  // Sheet 2: Voting Progress
  const progressHeader = ["Time Slot", "Votes Cast"];
  const progressRows = progress.map(p => [p.time, p.votes]);
  const wsProgress = XLSX.utils.aoa_to_sheet([progressHeader, ...progressRows]);
  XLSX.utils.book_append_sheet(wb, wsProgress, "Voting Progress");

  // Sheet 3: Anonymous Audit Log
  const auditHeader = ["Vote ID", "Vote Reference", "Chairperson Choice", "School Leader Choice", "Timestamp"];
  const auditRows = votes.map(v => {
    const chair = chairs.find(c => c.id === v.chairpersonId)?.name || v.chairpersonSupabaseId || "None";
    const leader = leaders.find(c => c.id === v.schoolLeaderId)?.name || v.schoolLeaderSupabaseId || "None";
    return [v.id, v.reference, chair, leader, new Date(v.timestamp).toLocaleString()];
  });
  const wsAudit = XLSX.utils.aoa_to_sheet([auditHeader, ...auditRows]);
  XLSX.utils.book_append_sheet(wb, wsAudit, "Anonymous Audit Log");

  // Write file
  const dateStr = new Date().toISOString().slice(0, 10);
  XLSX.writeFile(wb, `${schoolName.replace(/\s+/g, "_")}_Election_Report_${dateStr}.xlsx`);
}

export function exportToPDF(
  chairs: Candidate[],
  leaders: Candidate[],
  votes: VoteRecord[],
  schoolName: string
) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const dateStr = new Date().toLocaleString();

  // Colors
  const primaryColor = [30, 58, 138]; // #1E3A8A
  const secondaryColor = [100, 116, 139]; // #64748B
  const darkTextColor = [15, 23, 42]; // #0F172A

  // Header Title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text(schoolName.toUpperCase(), pageWidth / 2, 20, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  doc.text("OFFICIAL ELECTION RESULTS REPORT", pageWidth / 2, 27, { align: "center" });

  // Divider Line
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(1);
  doc.line(15, 33, pageWidth - 15, 33);

  // Metadata
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  doc.text(`Generated: ${dateStr}`, 15, 40);
  doc.text(`System: School Parliamentary Election System`, pageWidth - 15, 40, { align: "right" });

  // Summary Metrics Section
  const totalVotes = votes.length;
  const turnoutPct = Math.round((totalVotes / 1200) * 100);

  doc.setFillColor(248, 250, 252); // bg-slate-50
  doc.rect(15, 45, pageWidth - 30, 22, "F");
  doc.setDrawColor(241, 245, 249);
  doc.rect(15, 45, pageWidth - 30, 22, "S");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text("ELECTION SUMMARY METRICS", 20, 52);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(darkTextColor[0], darkTextColor[1], darkTextColor[2]);
  doc.text(`Total Eligible Voters: 1,200`, 20, 60);
  doc.text(`Total Votes Cast: ${totalVotes.toLocaleString()}`, 90, 60);
  doc.text(`Overall Turnout: ${turnoutPct}%`, 160, 60);

  // Chairperson Standings Title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text("1. CHAIRPERSON ELECTION STANDINGS", 15, 76);

  // Chairperson Table
  const chairHeaders = [["Rank", "Candidate Name", "Class", "Panel", "Votes", "Percentage"]];
  const sortedChairs = [...chairs].sort((a, b) => b.votes - a.votes);
  const chairRows = sortedChairs.map((c, index) => [
    (index + 1).toString(),
    c.name,
    c.class,
    c.panel,
    c.votes.toLocaleString(),
    `${c.pct}%`
  ]);

  autoTable(doc, {
    head: chairHeaders,
    body: chairRows,
    startY: 81,
    theme: "striped",
    headStyles: { fillColor: primaryColor as [number, number, number], halign: "left" },
    columnStyles: {
      0: { cellWidth: 15 },
      4: { halign: "right" },
      5: { halign: "right" }
    },
    styles: { fontSize: 9, font: "helvetica" }
  });

  // School Leader Standings Title
  const finalYOfChairTable = (doc as any).lastAutoTable?.finalY || 130;
  
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text("2. SCHOOL LEADER ELECTION STANDINGS", 15, finalYOfChairTable + 12);

  // School Leader Table
  const leaderHeaders = [["Rank", "Candidate Name", "Class", "Panel", "Votes", "Percentage"]];
  const sortedLeaders = [...leaders].sort((a, b) => b.votes - a.votes);
  const leaderRows = sortedLeaders.map((c, index) => [
    (index + 1).toString(),
    c.name,
    c.class,
    c.panel,
    c.votes.toLocaleString(),
    `${c.pct}%`
  ]);

  autoTable(doc, {
    head: leaderHeaders,
    body: leaderRows,
    startY: finalYOfChairTable + 17,
    theme: "striped",
    headStyles: { fillColor: [16, 185, 129], halign: "left" },
    columnStyles: {
      0: { cellWidth: 15 },
      4: { halign: "right" },
      5: { halign: "right" }
    },
    styles: { fontSize: 9, font: "helvetica" }
  });

  const finalYOfLeaderTable = (doc as any).lastAutoTable?.finalY || 200;

  // Add Verification / Signature Block
  const sigY = Math.min(finalYOfLeaderTable + 20, doc.internal.pageSize.getHeight() - 40);

  if (sigY > doc.internal.pageSize.getHeight() - 35) {
    doc.addPage();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text("3. ELECTION VERIFICATION SIGNATURES", 15, 20);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(darkTextColor[0], darkTextColor[1], darkTextColor[2]);
    doc.text("This document constitutes the official certified report of the school parliamentary election.", 15, 28);
    
    doc.line(15, 60, 85, 60);
    doc.text("Presiding Officer Signature", 15, 65);
    doc.text("Date: ________________________", 15, 72);

    doc.line(120, 60, 190, 60);
    doc.text("School Principal Signature", 120, 65);
    doc.text("Date: ________________________", 120, 72);
  } else {
    doc.setDrawColor(226, 232, 240);
    doc.line(15, sigY - 5, pageWidth - 15, sigY - 5);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(darkTextColor[0], darkTextColor[1], darkTextColor[2]);
    doc.text("This document constitutes the official certified report of the school parliamentary election.", 15, sigY + 5);

    doc.setDrawColor(200, 200, 200);
    doc.line(15, sigY + 25, 85, sigY + 25);
    doc.text("Presiding Officer Signature", 15, sigY + 30);
    doc.text("Date: ________________________", 15, sigY + 36);

    doc.line(120, sigY + 25, 190, sigY + 25);
    doc.text("School Principal Signature", 120, sigY + 30);
    doc.text("Date: ________________________", 120, sigY + 36);
  }

  // Footer on all pages
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
    doc.text(
      `Page ${i} of ${totalPages}  |  Certified By School Parliamentary Election System`,
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: "center" }
    );
  }

  doc.save(`${schoolName.replace(/\s+/g, "_")}_Election_Report_${new Date().toISOString().slice(0, 10)}.pdf`);
}

export function printPage() {
  window.print();
}
