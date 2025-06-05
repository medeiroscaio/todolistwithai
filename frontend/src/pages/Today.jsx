import React from "react";
import TaskList from "../components/Tasklist/TaskList";
import { localURL } from "../assets/httpService"; // ajuste o caminho conforme necessário

function Today() {
  return (
    <TaskList
      apiUrl={`http://${localURL}:5000/api/tasks/today`}
      text="Today Tasks"
      showCreateButton={false}
    />
  );
}

export default Today;
