import React from "react";
import StrictModeDroppable from "../../components/dnd/StrictModeDroppable";
import TaskCard from "./TaskCard";

export default function TaskColumn({ status, title, tasks }) {
  return (
    <div className="flex-1 min-w-65">
      <h3 className="text-sm font-semibold text-white/70 mb-4">
        {title}
      </h3>

      <StrictModeDroppable droppableId={status}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="space-y-4 min-h-10"
          >
            {tasks.map((task, index) => (
              <TaskCard
                key={task._id}
                task={task}
                index={index}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </StrictModeDroppable>
    </div>
  );
}
