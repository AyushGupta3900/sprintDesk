import React from "react";
import Card from "../ui/Card";
import { isAfter, parseISO } from "date-fns";

export default function WorkspaceAnalytics({ tasks = [] }) {
  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (t) => t.status === "DONE"
  ).length;

  const overdueTasks = tasks.filter((t) => {
    if (!t.dueDate || t.status === "DONE") return false;
    return isAfter(new Date(), parseISO(t.dueDate));
  }).length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <StatCard label="Total Tasks" value={totalTasks} />
      <StatCard label="Overdue Tasks" value={overdueTasks} />
      <StatCard label="Completed Tasks" value={completedTasks} />
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <Card className="p-6">
      <p className="text-white/50 text-sm">{label}</p>
      <p className="mt-2 text-3xl font-bold">{value}</p>
    </Card>
  );
}
