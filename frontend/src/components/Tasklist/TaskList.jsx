import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskItem from "./TaskItem";
import "../Tasklist/Tasklist.css";
import { ToastContainer, toast } from "react-toastify";
import { localURL } from "../assets/httpService/httpService"; // ajuste o caminho conforme necessário

const TaskList = ({ apiUrl, text, showCreateButton }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [title, setTitle] = useState({ value: "", dirty: false });
  const [info, setInfo] = useState({ value: "", dirty: false });
  const [category, setCategory] = useState({ value: "none", dirty: false });
  const [dueDate, setDueDate] = useState({
    value: new Date().toISOString().split("T")[0],
    dirty: false,
  });

  const resetFields = () => {
    setTitle({ value: "", dirty: false });
    setInfo({ value: "", dirty: false });
    setCategory({ value: "none", dirty: false });
    setDueDate({
      value: new Date().toISOString().split("T")[0],
      dirty: false,
    });
  };

  const notifySuccess = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);

  const handleCreateTask = async () => {
    const fields = [title, info, category, dueDate];

    if (fields.some((field) => field.value.trim() === "")) {
      notifyError("Por favor, preencha todos os campos.");
      return;
    }

    try {
      const response = await axios.post(
        `http://${localURL}:5000/api/tasks`,
        {
          title: title.value,
          description: info.value,
          category: category.value,
          dueDate: dueDate.value,
        },
        {
          withCredentials: true,
        }
      );
      notifySuccess("Criado com sucesso!");
      setTasks((prevTasks) => [...prevTasks, response.data]);
      resetFields();
    } catch (error) {
      if (error.response && error.response.data) {
        console.log(error.response.data.error);
      } else {
        console.log("Erro desconhecido", error);
      }
      notifyError("Erro na criação, tente novamente.");
    } finally {
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);

        const response = await axios.get(apiUrl, {
          withCredentials: true,
        });
        console.log(response.data);
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
      await axios.patch(
        `http://${localURL}:5000/api/tasks/${taskId}/toggle`,
        {},
        {
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

  const toggleOverlay = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="tasks-container">
      <h1 className="tasks-title">{text}</h1>

      {showCreateButton && (
        <button className="create-button" onClick={toggleOverlay}>
          Add a new Task +
        </button>
      )}

      {loading && <p>Carregando...</p>}
      {!loading && tasks.length === 0 && <p>Nenhuma tarefa encontrada.</p>}

      {isModalOpen && (
        <>
          <div className={`sidebar-overlay ${isModalOpen ? "open" : ""}`}>
            <div className="form-container">
              <span className="form-title">Create Task</span>

              <label htmlFor="create-title">Title</label>
              <input
                type="text"
                id="create-title"
                placeholder="Enter title"
                value={title.value}
                onChange={(e) =>
                  setTitle({ value: e.target.value, dirty: true })
                }
              />

              <label htmlFor="create-input">Description</label>
              <input
                type="text"
                id="create-input"
                placeholder="Enter description"
                value={info.value}
                onChange={(e) =>
                  setInfo({ value: e.target.value, dirty: true })
                }
              />

              <label htmlFor="duedate-input">Due Date</label>
              <input
                type="date"
                id="duedate-input"
                value={dueDate.value}
                onChange={(e) =>
                  setDueDate({ value: e.target.value, dirty: true })
                }
              />

              <label htmlFor="category-select">Category</label>
              <select
                id="category-select"
                value={category.value}
                onChange={(e) =>
                  setCategory({ value: e.target.value, dirty: true })
                }
              >
                <option value="none">None</option>
              </select>

              <div className="button-container">
                <button
                  className="create-task-button"
                  onClick={handleCreateTask}
                >
                  Create
                </button>
                <button className="cancel-task-button" onClick={toggleOverlay}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
          <div
            className={`overlay-background ${isModalOpen ? "visible" : ""}`}
          ></div>
        </>
      )}

      <ul className="task-list">
        {tasks.map((task) => (
          <TaskItem
            key={task._id}
            task={task}
            onToggleComplete={handleToggleComplete}
          />
        ))}
      </ul>
      <ToastContainer />
    </div>
  );
};

export default TaskList;
