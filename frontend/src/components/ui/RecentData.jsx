import React from "react";
import { useState } from "react";
import Card from "./Card";
import Badge from "./Badge";

export default function RecentData({ recentTasks = [] }) {
  const [tab, setTab] = useState("tasks");

  return (
    <Card>
      <div className="flex gap-6 border-b border-white/10 pb-3">
        <Tab
          label="Recent Tasks"
          active
          onClick={() => {}}
        />
      </div>

      <div className="mt-4 space-y-3 text-sm">
        {recentTasks.length ? (
          recentTasks.map((task) => (
            <TaskRow key={task._id} task={task} />
          ))
        ) : (
          <Empty />
        )}
      </div>
    </Card>
  );
}

function TaskRow({ task }) {
  return (
    <div className="flex items-center justify-between border border-white/10 rounded-lg px-4 py-3 hover:bg-white/5 transition">
      <div>
        <p className="font-medium">{task.title}</p>
        {task.dueDate && (
          <p className="text-white/50 text-xs">
            Due {new Date(task.dueDate).toLocaleDateString()}
          </p>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Badge>{task.status}</Badge>
        {task.priority && (
          <Badge variant="outline">
            {task.priority}
          </Badge>
        )}
      </div>
    </div>
  );
}

function Tab({ label, active }) {
  return (
    <span className="text-sm font-medium text-white">
      {label}
    </span>
  );
}

function Empty() {
  return (
    <p className="text-white/50">
      No recent tasks
    </p>
  );
}
