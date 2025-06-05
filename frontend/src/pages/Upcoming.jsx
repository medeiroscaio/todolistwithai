import React from "react";
import TaskList from "../components/Tasklist/TaskList";
import { localURL } from "../assets/httpService/httpService"; // ajuste o caminho conforme necessário

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
