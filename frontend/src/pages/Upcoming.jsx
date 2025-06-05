import React from "react";
import TaskList from "../components/Tasklist/TaskList";
import { localURL } from "../assets/httpService"; // ajuste o caminho se necessário

function Upcoming() {
  return (
    <TaskList
      apiUrl={`http://${localURL}:5000/api/tasks/upcoming`}
      text="Upcoming Tasks"
      showCreateButton={false}
    />
  );
}

export default Upcoming;
