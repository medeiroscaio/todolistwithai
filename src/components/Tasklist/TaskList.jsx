import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const TaskList = ({ apiUrl, text }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const response = await axios.get(apiUrl, { withCredentials: true });
        setTasks(response.data);
      } catch (error) {
        console.error("Erro ao buscar tarefas", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [apiUrl]);

  return (
    <div className="tasks-container">
      <h1 className="tasks-title">{text}</h1>
      {loading && <p>Carregando...</p>}
      {!loading && tasks.length === 0 && <p>Nenhuma tarefa encontrada.</p>}
      <ul className="task-list">
        {tasks.map((task) => (
          <TaskItem
            key={task._id}
            task={task}
            onToggleComplete={handleToggleComplete}
          />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
