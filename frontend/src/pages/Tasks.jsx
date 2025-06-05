import React from "react";
import TaskList from "../components/Tasklist/TaskList";
import { localURL } from "../assets/httpService";

function Tasks() {
  return (
    <TaskList
      apiUrl={`http://${localURL}:5000/api/tasks`}
      text="Tasks"
      showCreateButton={true}
    />
  );
}

export default Tasks;
