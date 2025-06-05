import React from "react";
import TaskList from "../components/Tasklist/TaskList";
import { localURL } from "../assets/httpService/httpService"; // ajuste o caminho conforme necessário

function Today() {
  return (
    <TaskList
      apiUrl={`${localURL}/api/tasks/today`}
      text="Today Tasks"
      showCreateButton={false}
    />
  );
}

export default Today;
