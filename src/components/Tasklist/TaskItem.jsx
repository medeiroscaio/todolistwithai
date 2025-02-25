import React from "react";

const TaskItem = ({ task, onToggleComplete }) => {
  return (
    <li className={`task-item ${task.completed ? "completed" : ""}`}>
      <span>{task.title}</span>
      <button onClick={() => onToggleComplete(task._id)}>
        {task.completed ? "Desfazer" : "Concluir"}
      </button>
    </li>
  );
};

export default TaskItem;
