import React from "react";
import TaskList from "../components/Tasklist/TaskList";
import { localURL } from "../assets/httpService/httpService"; // ajuste o caminho conforme necessário

function Tasks() {
  return (
    <TaskList
      apiUrl={`${localURL}/api/tasks`}
      text="Tasks"
      showCreateButton={true}
    />
  );
}

export default Tasks;
