import React from "react";
import TaskList from "../components/Tasklist/TaskList";
import { localURL } from "../assets/httpService/httpService"; // ajuste o caminho conforme necessário

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
