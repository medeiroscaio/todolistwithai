import React from "react";
import * as Checkbox from "@radix-ui/react-checkbox";
import "../Tasklist/TaskItem.css";

const TaskItem = ({ task, onToggleComplete }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "Sem data";
    const localDate = new Date(dateString);
    localDate.setMinutes(
      localDate.getMinutes() + localDate.getTimezoneOffset()
    );

    return localDate.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };
  return (
    <div className={`task-card ${task.completed ? "completed" : ""}`}>
      <div className="task-header">
        <Checkbox.Root
          className="task-checkbox"
          checked={task.completed}
          onCheckedChange={() => onToggleComplete(task._id)}
        >
          <Checkbox.Indicator className="task-checkbox-indicator"></Checkbox.Indicator>
        </Checkbox.Root>
        <h3>{task.title}</h3>
      </div>
      <p className="task-desc">{task.description}</p>
      <p className="task-date">Vence em: {formatDate(task.dueDate)}</p>
    </div>
  );
};

export default TaskItem;
