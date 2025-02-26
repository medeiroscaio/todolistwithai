import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "../Tasklist/Tasklist.css";

const TaskList = ({ apiUrl, text }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem("accessToken");

        const response = await axios.get(apiUrl, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        setTasks(response.data);
      } catch (error) {
        console.error(
          "Erro ao buscar tarefas:",
          error.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [apiUrl]);

  const handleToggleComplete = async (taskId) => {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await axios.patch(
        `/api/tasks/${taskId}/toggle`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, completed: !task.completed } : task
        )
      );
    } catch (error) {
      console.error(
        "Erro ao alternar status da tarefa:",
        error.response?.data?.error || error.message
      );
    }
  };

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
