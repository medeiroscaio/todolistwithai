import React from "react";
import TaskList from "../components/Tasklist/TaskList";

function Tasks() {
  return <TaskList apiUrl="http://localhost:5000/api/tasks" text="All Tasks" />;
}

export default Tasks;
